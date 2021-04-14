import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import { Button, Input, Header, Image, Icon, Rating } from "semantic-ui-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { scrapeRecipe } from "./api/scraper";
import anime from "animejs";
import Head from "next/head";

function Home() {
  const dispatch = useDispatch();
  const [session, loading] = useSession();

  // Input
  const [url, setUrl] = React.useState();
  // need to make it async
  const handleClick = () => {
    scrapeRecipe(url, dispatch).then(() => {
      setFlipped(true);
      anime({
        ...common,
        points: [{ value: "215,110 0,110 186,86 215,0" }],
      });
    });
  };
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  // Redux recipe
  const scraped = useSelector((state) => state.recipe.scraped);
  const isScraping = useSelector((state) => state.recipe.isScraping);
  const scrapeError = useSelector((state) => state.recipe.scrapeError);
  const recipe = scraped["recipe"];

  console.log(isScraping);

  // Flipping animation
  const [flipped, setFlipped] = React.useState(false);
  const common = {
    targets: ".polymorph",
    easing: "easeOutQuad",
    duration: 600,
    loop: false,
  };

  return (
    <div>
      <Head>
        <title>Recipe Thief</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <section id="my-section">
        <div className={flipped ? "" : "active"} id="wrap-cta">
          <div style={{ textAlign: "center" }}>
            <Image src="/logo_white.png" size="small" centered />
            <Header inverted as="h1">
              Recipe Thief{" "}
            </Header>
            <p>
              No more scrolling just to find out bruh bruh bruh! Bruh Bruuuuhh
              bruh bruh.{" "}
            </p>

            <Input
              {...(!isScraping ? "" : loading)}
              fluid
              id="cta"
              placeholder="C+P Recipe url"
              defaultValue={url}
              onChange={handleInputChange}
              icon={!isScraping ? "search" : "spinner"}
              action={{
                onClick: () => handleClick(),
              }}
            />
          </div>
        </div>
        <svg viewBox="0 0 215 110" preserveAspectRatio="none">
          <polygon class="polymorph" points="215,110 0,110 0,0 215,0"></polygon>
        </svg>
        {!recipe ? (
          <></>
        ) : (
          <div class="container">
            <div id="content" className={flipped ? "active" : ""}>
              <Image size="small" src={recipe.image} wrapped />

              <h1>{recipe.title}</h1>
              <p>By {recipe.host}</p>
              <div>
                <Rating
                  maxRating={5}
                  defaultRating={3}
                  icon="star"
                  size="tiny"
                />
              </div>

              {!session && (
                <>
                  <Button id="close" onClick={signIn}>
                    Sign in to save
                  </Button>
                </>
              )}
              {session && (
                <>
                  <Button id="close">Save</Button>
                  <Button id="close">Edit</Button>
                </>
              )}
              <Icon
                id="close"
                circular
                name="undo"
                onClick={() => {
                  setFlipped(false);
                  anime({
                    ...common,
                    points: [{ value: "215,110 0,110 0,0 215,0" }],
                  });
                }}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
export default connect()(Home);
