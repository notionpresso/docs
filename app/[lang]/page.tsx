import { LandingHero } from "@/components/landing/hero";
import { SUPPORTED_LANGUAGES } from "@/i18n/supported-languages";

export const runtime = "edge";

export const generateStaticParams = () => {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
};

export default function Home() {
  return <LandingHero />;
}
