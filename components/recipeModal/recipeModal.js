import React from "react";
import { Button, Icon, Image, Modal } from "semantic-ui-react";

export default RecipeModal = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Scrolling Content Modal</Button>}
    >
      <Modal.Header>Profile Picture</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size="medium"
          src="https://react.semantic-ui.com/images/wireframe/image.png"
          wrapped
        />

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
