import MouseImageEffect from "@/components/effects/mouse-image-effect";

export const runtime = 'edge';

export default function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return <MouseImageEffect />;
}
