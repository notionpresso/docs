import { NotionRenderer } from "@/components/notion-renderer";
//TODO: dynamic import is needed for better performance (don't need to import all the content at once)
import * as ko from "@/content/tutorial/ko/126ce18c-fd83-80a5-8260-d757c56405b2.json";
import * as en from "@/content/tutorial/en/12ace18c-fd83-8071-b3a5-dd8d21da61cf.json";
import type { Metadata } from "next";

export const runtime = "edge";

export { generateStaticParams } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const content = params.lang === "ko" ? ko : en;
  const title = content.properties.title.title[0].plain_text;

  return {
    title,
    description:
      params.lang === "ko"
        ? "Notionpresso 튜토리얼 페이지입니다."
        : "Notionpresso tutorial page",
    openGraph: {
      title,
      description:
        params.lang === "ko"
          ? "Notionpresso로 노션 페이지를 쉽게 웹사이트로 변환하세요"
          : "Convert your Notion pages to websites easily with Notionpresso",
      locale: params.lang,
      type: "website",
    },
  };
}

export default function TutorialPage({ params }: { params: { lang: string } }) {
  const content = params.lang === "ko" ? ko : en;
  const title = content.properties.title.title[0].plain_text;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <NotionRenderer blocks={content.blocks} title={title} />
    </div>
  );
}
