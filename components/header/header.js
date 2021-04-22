import React from "react";
import { Icon, Input, Menu, Image, Container } from "semantic-ui-react";
import styles from "../header/header.module.css";
import Link from "next/link";
import { signOut } from "next-auth/client";

const Header = () => {
  const [activeItem, setActiveItem] = React.useState("saved");
  return (
    <Menu vertical className={styles.menu} fluid>
      <Menu.Item className={styles.head}>
        <Image
          src="/cute_chef.png"
          size="small"
          centered="true"
          verticalAlign="bottom"
          className={styles.pd}
        />
        <h2 className={styles.logo}>RECIPE THIEF</h2>
        <h4 className={styles.description}>裏 MENU</h4>
      </Menu.Item>

      <Menu.Item className={styles.item}>
        <Input placeholder="Search (Coming Soon)" />
      </Menu.Item>
      <Link href="/">
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
      </Link>
      <Link href="/gallery">
        <Menu.Item
          name="saved"
          active={activeItem === "saved"}
          onClick={() => {
            setActiveItem("saved");
          }}
          className={styles.item}
        >
          <Icon name="food" />
          Saved Recipes
        </Menu.Item>
      </Link>

      <Link href="/collections">
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
      </Link>

      <Link href="/grocery">
        <Menu.Item
          name="saved"
          active={activeItem === "saved"}
          onClick={() => {
            setActiveItem("saved");
          }}
          className={styles.item}
        >
          <Icon name="shopping cart" />
          Grocery
        </Menu.Item>
      </Link>

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

export default Header;
