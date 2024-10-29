// app/[lang]/guide/[group]/[slug]/page.tsx
import { getAllDocuments, getDocumentBySlug } from "@/lib/mdx";
import { Metadata } from "next";
import GuidePage from "@/components/docs/guide-page";

interface GuidePageProps {
  params: {
    lang: string;
    group: string;
    slug: string;
  };
}

// Since we're using `fs` during build time, we should avoid the Edge runtime
// export const runtime = 'edge';

// Generate static params at build time
export async function generateStaticParams() {
  const supportedLanguages = ["en", "ko"];
  const params: GuidePageProps["params"][] = [];

  for (const lang of supportedLanguages) {
    const allDocuments = getAllDocuments(lang);
    allDocuments.forEach((doc) => {
      params.push({
        lang,
        group: doc.group,
        slug: doc.slug,
      });
    });
  }

  return params;
}

// Generate metadata at build time
export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { lang, group, slug } = params;
  const allDocuments = getAllDocuments(lang);
  const document = getDocumentBySlug(lang, group, slug, allDocuments);

  return {
    title: `${document.title} | react-notion-custom Docs`,
    description: document.content.slice(0, 160),
    openGraph: {
      title: `${document.title} | react-notion-custom Docs`,
      description: document.content.slice(0, 160),
      // url: "",
    },
    alternates: {
      // canonical: "",
    },
  };
}

export default async function Page({ params }: GuidePageProps) {
  const { lang, group, slug } = params;

  // Fetch data during the rendering of the page
  const allDocuments = getAllDocuments(lang);
  const { content, title, prevDocument, nextDocument } = getDocumentBySlug(
    lang,
    group,
    slug,
    allDocuments,
  );

  return (
    <GuidePage
      params={params}
      content={content}
      title={title}
      prevDocument={prevDocument}
      nextDocument={nextDocument}
      allDocuments={allDocuments}
    />
  );
}
