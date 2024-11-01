import { NotionRenderer } from "@/components/notion-renderer";
import * as kr from "@/content/tutorial/ko/126ce18c-fd83-80a5-8260-d757c56405b2.json";
import * as en from "@/content/tutorial/en/12ace18c-fd83-8071-b3a5-dd8d21da61cf.json";

export const runtime = "edge";
export async function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = lang === "ko" ? kr : en;
  const title = content.properties.title.title[0].plain_text;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <NotionRenderer blocks={content.blocks} title={title} />
    </div>
  );
}
