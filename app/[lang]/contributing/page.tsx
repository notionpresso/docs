import { NotionRenderer } from "@/components/notion-renderer";
import * as kr from "@/content/contributing/ko/130ce18c-fd83-8040-8015-eaa450df6523.json";
import * as en from "@/content/contributing/en/130ce18c-fd83-8017-9202-fdf73b9f1c9c.json";
import { SUPPORTED_LANGUAGES } from "@/i18n/supported-languages";

export const runtime = "edge";

export const generateStaticParams = () => {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
};

export default function TutorialPage({ params }: { params: { lang: string } }) {
  const content = params.lang === "ko" ? kr : en;
  const title = content.properties.title.title[0].plain_text;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <NotionRenderer blocks={content.blocks} title={title} />
    </div>
  );
}
