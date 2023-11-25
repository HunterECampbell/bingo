import "@/i18n";

import Head from "next/head";
import Bingo from "@/pages/bingo/bingo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hcnureth&apos;s Bingo App</title>
        <meta name="description" content="Bingo app created by Hcnureth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Bingo />
    </>
  );
}
