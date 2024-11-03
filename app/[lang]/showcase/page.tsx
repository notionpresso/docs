import Showcase from "@/components/showcase";

export const runtime = "edge";

export { generateStaticParams } from "@/i18n";

export default function ShowcasePage() {
  return <Showcase />;
}
