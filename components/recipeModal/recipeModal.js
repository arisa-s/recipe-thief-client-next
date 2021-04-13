import React from "react";
import { Button, Icon, Image, Modal } from "semantic-ui-react";
import { connect, useSelector } from "react-redux";

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

          <Image
            src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            style={{ marginBottom: 10 }}
          />
          <Image
            src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            style={{ marginBottom: 10 }}
          />
          <Image
            src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            style={{ marginBottom: 10 }}
          />
          <Image
            src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            style={{ marginBottom: 10 }}
          />
          <Image
            src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            style={{ marginBottom: 10 }}
          />
          <Image
            src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            style={{ marginBottom: 10 }}
          />
          <Image
            src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            style={{ marginBottom: 10 }}
          />
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Proceed <Icon name="chevron right" />
        </Button>
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
