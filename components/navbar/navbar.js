import React from "react";
import { Icon, Input, Menu, Image, Container } from "semantic-ui-react";
import styles from "../navbar/navbar.module.css";
import { signOut } from "next-auth/client";

const Navbar = () => {
  const [activeItem, setActiveItem] = React.useState("saved");
  return (
    <Menu vertical className={styles.menu} fluid>
      <Menu.Item className={styles.head}>
        <Image
          src="/cute_chef.png"
          size="small"
          centered={true}
          verticalalign="bottom"
          className={styles.pd}
        />
        <h2 className={styles.logo}>RECIPE THIEF</h2>
        <h4 className={styles.description}>裏 MENU</h4>
      </Menu.Item>

      <Menu.Item className={styles.item}>
        <Input placeholder="Search (Coming Soon)" />
      </Menu.Item>

      <Menu.Item
        name="new"
        active={activeItem === "new"}
        onClick={() => {
          setActiveItem("new");
        }}
        className={styles.item}
        href="/"
      >
        <Icon name="add" />
        New Recipe
      </Menu.Item>

      <Menu.Item
        name="saved"
        active={activeItem === "saved"}
        onClick={() => {
          setActiveItem("saved");
        }}
        className={styles.item}
        href="/gallery"
      >
        <Icon name="food" />
        Saved Recipes
      </Menu.Item>

      <Menu.Item className={styles.item}>
        <Icon name="book" />
        Collections
        <Menu.Menu>
          <Menu.Item
            name="collection1"
            active={activeItem === "collection1"}
            onClick={() => {
              setActiveItem("collection1");
            }}
            className={styles.item}
            href="/collections"
          >
            coming soon...
          </Menu.Item>
          <Menu.Item
            name="collection2"
            active={activeItem === "collection2"}
            onClick={() => {
              setActiveItem("collection2");
            }}
            className={styles.item}
          >
            coming soon...
          </Menu.Item>
          <Menu.Item
            name="collection3"
            active={activeItem === "collection3"}
            onClick={() => {
              setActiveItem("collection3");
            }}
            className={styles.item}
          >
            coming soon...
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item
        name="saved"
        active={activeItem === "saved"}
        onClick={() => {
          setActiveItem("saved");
        }}
        className={styles.item}
        href="/grocery"
      >
        <Icon name="shopping cart" />
        Grocery
      </Menu.Item>

      <Menu.Item
        name="saved"
        active={activeItem === "saved"}
        onClick={() => {
          signOut();
        }}
        className={styles.item}
      >
        <Icon name="log out" />
        Sign out
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
