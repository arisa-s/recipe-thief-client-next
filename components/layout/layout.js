import { Container, Header, Menu, Segment, Image } from "semantic-ui-react";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Recipe Thief</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Segment inverted vertical textAlign="center">
        <Container as="nav">
          <Header inverted as="h1">
            <Image src="/logo_white.png" />
            Recipe Thief.
          </Header>
          <Menu borderless compact inverted>
            <Menu.Item active>Home</Menu.Item>
            <Menu.Item>Feature</Menu.Item>
            <Menu.Item>Contact</Menu.Item>
          </Menu>
        </Container>
        <Container className="content">{children}</Container>
      </Segment>
    </div>
  );
}
