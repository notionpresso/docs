import { NotionRenderer } from "@/components/notion-renderer";
import * as kr from "@/content/contributing/ko/130ce18c-fd83-8040-8015-eaa450df6523.json";
import * as en from "@/content/contributing/en/130ce18c-fd83-8017-9202-fdf73b9f1c9c.json";

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
