import { NotionRenderer } from "@/components/notion-renderer";
//TODO: dynamic import is needed for better performance (don't need to import all the content at once)
import * as ko from "@/content/contributing/ko/130ce18c-fd83-8040-8015-eaa450df6523.json";
import * as en from "@/content/contributing/en/130ce18c-fd83-8017-9202-fdf73b9f1c9c.json";

export const runtime = "edge";

export { generateStaticParams } from "@/i18n";

export default function TutorialPage({ params }: { params: { lang: string } }) {
  const content = params.lang === "ko" ? ko : en;
  const title = content.properties.title.title[0].plain_text;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <NotionRenderer blocks={content.blocks} title={title} />
    </div>
  );
}
