import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import { Input, Header } from "semantic-ui-react";
import Layout from "../components/layout/layout";
import { connect, useDispatch } from "react-redux";
import { scrapeRecipe } from "./api/scraper";

function Home() {
  const dispatch = useDispatch();

  const [session, loading] = useSession();
  const [url, setUrl] = React.useState();

  const handleClick = () => {
    scrapeRecipe(url, dispatch);
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <Layout>
      <Header inverted as="h1">
        Your recipes in one place
      </Header>
      <p>
        Cover is a one-page template for building simple and beautiful home
        pages. Download, edit the text, and add your own fullscreen background
        photo to make it your own.
      </p>

      <Input
        placeholder="C+P Recipe url"
        action={{
          onClick: () => handleClick(),
          color: "teal",
          labelPosition: "right",
          icon: "hand scissors outline",
          content: "Scrape",
          size: "huge",
        }}
        defaultValue={url}
        onChange={handleInputChange}
      />

      <div id="load" visible="flase">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </Layout>
  );
}

export default connect()(Home);
