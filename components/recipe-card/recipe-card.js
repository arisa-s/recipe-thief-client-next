import styles from "../recipe-card/recipe-card.module.css";
import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import Link from "next/link";

const RecipeCard = ({ recipe }) => {
  //[clicked, setClicked];
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className={styles.card}>
        <div className={styles.cont_photo}>
          <div className={styles.cont_img_back}>
            <img src={recipe.image} alt="" />
          </div>
          <div className={styles.cont_mins}>
            <div className={styles.sub_mins}>
              <h3 style={{ paddingBottom: "10%" }}>{recipe.times}</h3>
              <span>MINS</span>
            </div>
            <div className={styles.cont_icon_right}>
              {" "}
              <Icon name="expand arrows alternate" size="large" inverted />
            </div>
          </div>
          <div className={styles.cont_servings}>
            <h3>{recipe.stars}</h3>
            <span>STARS</span>
          </div>
          <div className={styles.cont_detalles}>
            <br />
            <br />
            <h3 style={{ color: "white" }}>{recipe.title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
