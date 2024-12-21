import { Roboto_Condensed } from "next/font/google";
import Image from "next/image";

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  display: "swap",
  fallback: ["sans-serif"],
});

export default function Header({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <header
      className={`${roboto.className} flex size-fit flex-col items-center justify-center gap-4`}
    >
      <span className="text-3xl font-bold dark:text-white">{title}</span>
      <span className="text-lg italic dark:text-white">{description}</span>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="aspect-auto object-cover"
        priority
      />
    </header>
  );
}
