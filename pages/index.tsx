import { Poppins, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import Head from "next/head";
const PageMain = dynamic(() => import('@/components/Main'), { ssr: false });

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
      <Head>
        <title>Happy Birthday, Araaa!</title>
        <meta name="description" content="Hari ini adalah hari ulang tahun ke-21 araa. ini adalah hadiah dari Ahmed buat araa... Semoga araa suka yeay!!!" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PageMain />
    </div>
  );
}
