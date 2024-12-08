// lib/mdx.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getGroupOrder, GroupId } from "@/constants/group";

const contentDirectory = path.join(process.cwd(), "content", "guide");

export interface Document {
  slug: string;
  title: string;
  group: string;
  content: string;
}

export interface DocumentData extends Document {
  prevDocument: Document | null;
  nextDocument: Document | null;
}

export function getAllDocuments(lang: string): Document[] {
  const langDir = path.join(contentDirectory, lang);
  const documents = getAllDocumentsRecursive(langDir, lang);
  return documents;
}

function getAllDocumentsRecursive(dir: string, lang: string): Document[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir);
  let documents: Document[] = [];

  entries.forEach((entry) => {
    const entryPath = path.join(dir, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) {
      documents = documents.concat(getAllDocumentsRecursive(entryPath, lang));
    } else if (entry.endsWith(".md")) {
      const fileContents = fs.readFileSync(entryPath, "utf8");
      const { data, content } = matter(fileContents);
      const groupOrder = getGroupOrder(data.group as GroupId);

      documents.push({
        slug: data.slug,
        title: data.title || "Untitled",
        group: data.group || "",
        content: content,
      });
    }
  });

  return documents;
}

export function getDocumentBySlug(
  lang: string,
  group: string,
  slug: string,
  allDocuments: Document[],
): DocumentData {
  const NOT_FOUND_DOCUMENT: DocumentData = {
    slug: "",
    content: "<p>Document not found</p>",
    title: "Not Found",
    group: "",
    prevDocument: null,
    nextDocument: null,
  };

  if (!lang || !group || !slug) {
    return NOT_FOUND_DOCUMENT;
  }

  // Filter documents in the same group and sort them if necessary
  const documentsInGroup = allDocuments.filter((doc) => doc.group === group);

  const currentIndex = documentsInGroup.findIndex((doc) => doc.slug === slug);

  if (currentIndex === -1) {
    return NOT_FOUND_DOCUMENT;
  }

  const document = documentsInGroup[currentIndex];

  let prevDocument =
    currentIndex > 0 ? documentsInGroup[currentIndex - 1] : null;
  let nextDocument =
    currentIndex < documentsInGroup.length - 1
      ? documentsInGroup[currentIndex + 1]
      : null;

  const allGroups = Array.from(new Set(allDocuments.map((doc) => doc.group)));
  const currentGroupIndex = allGroups.indexOf(group);

  if (!prevDocument && currentGroupIndex > 0) {
    const prevGroup = allGroups[currentGroupIndex - 1];
    const prevGroupDocs = allDocuments.filter((doc) => doc.group === prevGroup);
    prevDocument = prevGroupDocs[prevGroupDocs.length - 1];
  }

  if (!nextDocument && currentGroupIndex < allGroups.length - 1) {
    const nextGroup = allGroups[currentGroupIndex + 1];
    const nextGroupDocs = allDocuments.filter((doc) => doc.group === nextGroup);
    nextDocument = nextGroupDocs[0];
  }

  return {
    ...document,
    prevDocument,
    nextDocument,
  };
}
