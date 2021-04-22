import React from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/client";
import {
  Button,
  Input,
  Header,
  Image,
  Icon,
  List,
  Checkbox,
  Grid,
} from "semantic-ui-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { scrapeRecipe } from "./api/scraper";
import anime from "animejs";
import Head from "next/head";
import { createRecipe } from "./api/recipe";
import Rating from "@material-ui/lab/Rating";
import styles from "./scraper.module.css";

function Scraper() {
  const dispatch = useDispatch();
  const [session, loading] = useSession();

  // Scrape Recipe
  const [url, setUrl] = React.useState();
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };
  const handleClick = () => {
    scrapeRecipe(url, dispatch).then(() => {
      setFlipped(true);
      anime({
        ...common,
        points: [{ value: "215,110 0,110 186,86 215,0" }],
      });
    });
  };

  // Rating
  const [rating, setRating] = React.useState(0);

  // Redux recipe
  const scraped = useSelector((state) => state.recipe.scraped);
  const isScraping = useSelector((state) => state.recipe.isScraping);
  const scrapeError = useSelector((state) => state.recipe.scrapeError);
  const recipe = scraped;

  console.log(recipe);

  // Flipping animation
  const [flipped, setFlipped] = React.useState(false);
  const common = {
    targets: ".polymorph",
    easing: "easeOutQuad",
    duration: 600,
    loop: false,
  };

  return (
    <section className={styles["my-section"]}>
      <div className={flipped ? "" : "active"} id="wrap-cta">
        {session && (
          <Link href="/user-home">
            <h1 style={{ color: "white" }}>Home</h1>
          </Link>
        )}
        {!session && (
          <>
            <h1 style={{ color: "white" }} onClick={signIn}>
              Home
            </h1>
          </>
        )}
        <div style={{ textAlign: "center" }}>
          <Image src="/logo_white_alt.png" size="small" centered />

          <Header inverted as="h1">
            Recipe Thief{" "}
          </Header>
          <p>
            bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh
            bruh bruh bruh bruh bruh
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
            <h1>{recipe.title}</h1>
            <p>By {recipe.host}</p>
            <Grid stackable columns={2} verticalAlign="middle">
              <Grid.Column width={7} textAlign="left">
                <h3>Ingridients : </h3>
                <List>
                  {recipe.ingredients.map((ingredient) => (
                    <List.Item>
                      <Checkbox label={ingredient} />
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
              <Grid.Column width={8} textAlign="left">
                <h3>Instructions : </h3>
                <List ordered>
                  {recipe.instructions.map((instruction) => (
                    <List.Item>
                      <p style={{ color: "black" }}>{instruction}</p>
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
            </Grid>
            {/* <Rating
                  maxRating={5}
                  defaultRating={3}
                  icon="star"
                  size="tiny"
                /> */}
            <br />
            <p>
              <Icon name="time" /> {recipe.total_time} minutes{"   "}
              <Icon name="food" />
              {recipe.yields}
            </p>

            <Rating
              name="half-rating"
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />

            <br />

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
                    createRecipe(session.user.email, {
                      ...recipe,
                      rating,
                    });
                  }}
                >
                  Save
                </Button>
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
  );
}

export default connect()(Scraper);
