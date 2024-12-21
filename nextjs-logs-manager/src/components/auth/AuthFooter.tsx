import SpaceIcon from "../shared/icons/SpaceIcon";
import { Inter } from "next/font/google";
const font = Inter({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "700"],
  display: "swap",
});

export default function AuthFooter() {
  return (
    <footer
      className={`${font.className} flex flex-row place-items-center gap-2 text-sm`}
    >
      <SpaceIcon />
      <b>LogSpace </b>by Isaias Trujillo
    </footer>
  );
}
