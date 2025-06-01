import Image from "next/image";
import { Poppins, Geist_Mono } from "next/font/google";
import PageMain from "@/components/Main";

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function Home() {
  return (
    <div
      className={`${poppinsSans.className} grid grid-rows-[20px_1fr_20px] min-h-screen bg-[#ffbfbf]`}
    >
      <PageMain />
    </div>
  );
}
