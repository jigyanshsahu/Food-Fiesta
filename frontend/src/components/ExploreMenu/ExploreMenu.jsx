import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu" id="exploremenu">
      <div className="explore-menu__header">
        <h2 className="explore-menu__title">Explore Our Menu</h2>
        <p className="explore-menu__text">
          Choose from a diverse selection of cuisines crafted with the finest
          ingredients
        </p>
      </div>

      <div className="explore-menu__list-wrapper">
        <div className="explore-menu__list">
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name;
            const displayName = item.menu_name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "all" : item.menu_name,
                  )
                }
                key={index}
                className={`explore-menu__item ${isActive ? "explore-menu__item--active" : ""}`}
              >
                <div
                  className={`explore-menu__img-wrap ${isActive ? "explore-menu__img-wrap--active" : ""}`}
                >
                  <img src={item.menu_Image} alt={displayName} />
                </div>
                <span className="explore-menu__label">{displayName}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="explore-menu__divider" />
    </section>
  );
};

export default ExploreMenu;
