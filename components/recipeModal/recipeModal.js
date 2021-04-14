import React from "react";
import { Button, Icon, Image, Modal } from "semantic-ui-react";
import { connect, useSelector } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/client";

const RecipeModal = () => {
  const scraped = useSelector((state) => state.recipe.scraped);
  console.log(scraped["recipe"]);

  const [open, setOpen] = React.useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (isScrapedEmpty(scraped)) {
      setOpen(true);
    }
  }, [scraped, setOpen]);
  const [session, loading] = useSession();

  const recipe = scraped["recipe"];

  if (!recipe) {
    return <></>;
  }
  return (
    <Modal open={open} onClose={() => closeModal()}>
      <Modal.Header>{recipe.title}</Modal.Header>
      <Modal.Content image scrolling>
        <Image size="medium" src={recipe.image} wrapped />

        <Modal.Description>
          <p>
            This is an example of expanded content that will cause the modal's
            dimmer to scroll.
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {!session && (
          <>
            <Button onClick={signIn}>Sign in to save</Button>
          </>
        )}
        {session && (
          <>
            <Button onClick={signOut}>Save</Button>
          </>
        )}
      </Modal.Actions>
    </Modal>
  );
};

function isScrapedEmpty(object) {
  if (JSON.stringify(object) == JSON.stringify({})) {
    return false;
  }
  return true;
}

export default connect()(RecipeModal);
