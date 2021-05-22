import Scraper from "./scraper/scraper";
import Head from "next/head";

function Home() {
  return (
    <div>
      <Head>
        <title>Recipe Thief</title>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Scraper />
    </div>
  );
}
export default Home;
