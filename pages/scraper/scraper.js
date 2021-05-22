import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import {
  Button,
  Header,
  Image,
  Icon,
  Menu,
  Container,
  Divider,
  Input,
  Modal,
} from "semantic-ui-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { scrapeRecipe } from "../api/scraper";
import anime from "animejs";
import { createRecipe } from "../api/recipe";
import Rating from "@material-ui/lab/Rating";
import { resetRecipe } from "../../redux/actions/recipe";
import Swal from "sweetalert2";
import RecipeModalContent from "../../components/recipe-modal/recipe-modal";

const Scraper = () => {
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

  // Recipe detail modal
  const [open, setOpen] = React.useState(false);

  return (
    <section id="my-section">
      <div className="wrapper">
        <Container as="nav" textAlign="center">
          {!flipped && (
            <Menu borderless={true} compact={true} inverted={true}>
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
                  <Menu.Item className="menuitem" onClick={signIn}>
                    Sign in
                  </Menu.Item>
                </>
              )}
            </Menu>
          )}
        </Container>
      </div>

      <div id="wrap-cta" className={flipped ? "" : "active"}>
        <Image src="/logo_white_alt.png" size="small" centered={true} />
        <Header inverted={true} as="h1">
          Recipe Thief{" "}
        </Header>
        <h4 className="greentxt">
          Copy and paste your favorite recipe page url in the input below.
        </h4>
        <Input
          loading={!isScraping ? false : true}
          // className={scrapeError ? "error" : ""}
          fluid={true}
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
              error: plase make sure the url contains recipe
            </p>
          </>
        )}
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
        <div className="container">
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
            <h2 className="redtxt">{recipe.title}</h2>
            <p>By {recipe.host}</p>
            <Image src={recipe.image} size="small" centered />

            <br />
            <p className="cntertxt">
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
            <Divider />
            <div>
              <Modal
                size="tiny"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button id="close">Detail</Button>}
              >
                <RecipeModalContent recipe={recipe} />
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>Go back</Button>
                  {!session && (
                    <Button
                      color="blue"
                      onClick={() => {
                        signIn({
                          callbackUrl: "/gallery",
                        });
                      }}
                    >
                      Sign in to save
                    </Button>
                  )}

                  {session && (
                    <Button
                      id="close"
                      onClick={() => {
                        saveRecipe();
                      }}
                    >
                      Save
                    </Button>
                  )}
                </Modal.Actions>
              </Modal>
              {!session && (
                <Button
                  id="close"
                  onClick={() => {
                    signIn({
                      callbackUrl: "/gallery",
                    });
                  }}
                >
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default connect()(Scraper);
