import Showcase from "@/components/showcase";
import { SUPPORTED_LANGUAGES } from "@/i18n/supported-languages";

export const runtime = "edge";
export const generateStaticParams = () => {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
};

export default function ShowcasePage() {
  return <Showcase />;
}
