import { LandingHero } from "@/components/landing/hero";

export const runtime = "edge";

export { generateStaticParams } from "@/i18n";

export default function Home() {
  return <LandingHero />;
}
