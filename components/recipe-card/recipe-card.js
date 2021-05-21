import styles from "../recipe-card/recipe-card.module.css";
import React from "react";
import { Icon } from "semantic-ui-react";
import Swal from "sweetalert2";
import { deleteRecipe } from "../../pages/api/recipe";
import Link from "next/link";
import { connect, useDispatch } from "react-redux";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const deleteAttempt = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(recipe.id, dispatch);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className={styles.cont_photo}>
      <div className={styles.cont_img_back}>
        <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
          <img src={recipe.image} alt="" />
        </Link>
      </div>
      <div className={styles.cont_mins}>
        <div className={styles.sub_mins}>
          <h3 style={{ paddingBottom: "10%" }}>{recipe.times}</h3>
          <span>MINS</span>
        </div>
        <div className={styles.cont_icon_top}>
          {" "}
          <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
            <Icon
              name="expand arrows alternate"
              size="large"
              inverted
              className={styles.icon}
            />
          </Link>
        </div>
      </div>
      <div className={styles.cont_servings}>
        <h3>{recipe.stars}</h3>
        <span>STARS</span>
      </div>

      <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
        <div className={styles.cont_detalles}>
          <br />
          <br />
          <h3 style={{ color: "white" }}>{recipe.title}</h3>
        </div>
      </Link>

      <div className={styles.cont_icon_bottom}>
        <Icon
          name="trash alternate outline"
          size="large"
          inverted
          className={styles.icon}
          onClick={() => deleteAttempt()}
        />
      </div>
    </div>
  );
};

export default connect()(RecipeCard);
