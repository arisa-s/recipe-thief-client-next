import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import {
  Button,
  Input,
  Header,
  Image,
  Icon,
  Menu,
  Container,
  Divider,
} from "semantic-ui-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { scrapeRecipe } from "../pages/api/scraper";
import anime from "animejs";
import Head from "next/head";
import { createRecipe } from "./api/recipe";
import Rating from "@material-ui/lab/Rating";
import { resetRecipe } from "../redux/actions/recipe";
import Swal from "sweetalert2";

function Home() {
  const dispatch = useDispatch();
  const [session, loading] = useSession();

  // Scrape Recipe
  const [url, setUrl] = React.useState();

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };
  const handleClick = () => {
    scrapeRecipe(url, dispatch);
  };

  // Redux recipe
  const scraped = useSelector((state) => state.recipe.scraped);
  const isScraping = useSelector((state) => state.recipe.isScraping);
  const scrapeError = useSelector((state) => state.recipe.scrapeError);
  const recipe = scraped;
  //const [scrapeError, setScrapeError] = React.useState(false);

  React.useEffect(() => {
    if (scraped) {
      setFlipped(true);

      anime({
        ...common,
        points: [{ value: "215,110 0,110 186,86 215,0" }],
      });
    }
  }, [scraped]);

  // Flipping animation
  const [flipped, setFlipped] = React.useState(false);
  const common = {
    targets: ".polymorph",
    easing: "easeOutQuad",
    duration: 600,
    loop: false,
  };
  console.log(scraped);
  console.log(scrapeError);

  // Rating
  const [rating, setRating] = React.useState(0);

  // Save recipe
  const saveRecipe = () => {
    createRecipe(session.user.email, {
      ...recipe,
      rating,
    }).then(
      Swal.fire({
        title: "Recipe Saved!",
        text: "Go to home page to view the details!",
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      })
    );
  };

  return (
    <div>
      <Head>
        <title>Recipe Thief</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <section id="my-section">
        <div className="wrapper">
          <Container as="nav">
            <Menu borderless compact inverted>
              {session && (
                <>
                  <Menu.Item active>Scraper</Menu.Item>
                  <Link href="/gallery">
                    <Menu.Item className="menuitem">Home</Menu.Item>
                  </Link>
                  <Menu.Item className="menuitem" onClick={() => signOut()}>
                    Sign out
                  </Menu.Item>
                </>
              )}
              {!session && (
                <>
                  <Menu.Item active>Scraper</Menu.Item>
                  <Menu.Item onClick={() => signIn()}>Sign in</Menu.Item>
                </>
              )}
            </Menu>
          </Container>
        </div>

        <div className={flipped ? "" : "active"} id="wrap-cta">
          <div style={{ textAlign: "center" }}>
            <Image src="/logo_white_alt.png" size="small" centered />

            <Header inverted="true" as="h1">
              Recipe Thief{" "}
            </Header>
            <h4 className="greentxt">
              Sign in first, then copy and paste your favorite recipe page url in the input
              below.
            </h4>
 

            <Input
              loading={!isScraping ? false : true}
              className={scrapeError ? "error" : ""}
              fluid="true"
              id="cta"
              placeholder="C+P Recipe url"
              defaultValue={url}
              onChange={handleInputChange}
              icon={!isScraping ? "search" : "spinner"}
              action={{
                onClick: () => handleClick(),
              }}
            />
            {scrapeError && (
              <>
                <br />

                <p className="redtxt2">
                  erroorrr: plase make sure the url contains recipe
                </p>
              </>
            )}
          </div>
        </div>
        <svg viewBox="0 0 215 110" preserveAspectRatio="none">
          <polygon
            className="polymorph"
            points="215,110 0,110 0,0 215,0"
          ></polygon>
        </svg>
        {!recipe ? (
          <></>
        ) : (
          <div class="container">
            <div id="content" className={flipped ? "active" : ""}>
              <Icon
                id="close"
                style={{ float: "right" }}
                circular
                name="undo"
                onClick={() => {
                  setFlipped(false);
                  anime({
                    ...common,
                    points: [{ value: "215,110 0,110 0,0 215,0" }],
                  });
                  dispatch(resetRecipe());
                  setRating(0);
                }}
              />
              <h1 style={{ textAlign: "center" }} className="redtxt">
                {recipe.title}
              </h1>
              <p style={{ textAlign: "center" }}>By {recipe.host}</p>
              <Image src={recipe.image} size="small" centered />

              <br />
              <p style={{ textAlign: "center" }} className="cntertxt">
                <Icon name="time" /> {recipe.total_time} minutes{"   "}
                <Icon name="food" />
                {recipe.yields}
              </p>

              <p style={{ textAlign: "center" }}>
                <Divider />
                <Rating
                  name="half-rating"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </p>

              <p style={{ textAlign: "center" }}>
                {!session && (
                  <Button id="close" onClick={signIn}>
                    Sign in to save
                  </Button>
                )}

                {session && (
                  <>
                    <Button
                      id="close"
                      onClick={() => {
                        saveRecipe();
                      }}
                    >
                      Save
                    </Button>
                    <Button id="close">Edit</Button>
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
export default connect()(Home);
