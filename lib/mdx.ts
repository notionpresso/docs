// lib/mdx.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
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
      const processedContent = remark().use(gfm).use(html).processSync(content);
      const contentHtml = processedContent.toString();

      documents.push({
        slug: data.slug,
        title: data.title || "Untitled",
        group: data.group || "",
        content: contentHtml,
      });
    }
  });

  return documents;
}

export function getDocumentBySlug(
  lang: string,
  group: string,
  slug: string,
  allDocuments: Document[]
): DocumentData {
  const notFoundDocument: DocumentData = {
    slug: "",
    content: "<p>Document not found</p>",
    title: "Not Found",
    group: "",
    prevDocument: null,
    nextDocument: null,
  };

  if (!lang || !group || !slug) {
    return notFoundDocument;
  }

  // Filter documents in the same group and sort them if necessary
  const documentsInGroup = allDocuments.filter((doc) => doc.group === group);

  const currentIndex = documentsInGroup.findIndex((doc) => doc.slug === slug);

  if (currentIndex === -1) {
    return notFoundDocument;
  }

  const document = documentsInGroup[currentIndex];
  const prevDocument = currentIndex > 0 ? documentsInGroup[currentIndex - 1] : null;
  const nextDocument =
    currentIndex < documentsInGroup.length - 1
      ? documentsInGroup[currentIndex + 1]
      : null;

  return {
    ...document,
    prevDocument,
    nextDocument,
  };
}
