import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu" id="exploremenu">
      <div className="explore-menu__header">
        <div className="explore-menu__title-wrap">
          <span className="explore-menu__badge">CATEGORIES</span>
          <h2 className="explore-menu__title">Explore What You Crave</h2>
        </div>
        <p className="explore-menu__text">
          Browse through our hand-crafted menu categories — click any category to filter top dishes.
        </p>
      </div>

      <div className="explore-menu__list-wrapper">
        <div className="explore-menu__list">
          {/* ALL Categories Pill */}
          <div
            onClick={() => setCategory("all")}
            className={`explore-menu__item ${category === "all" ? "explore-menu__item--active" : ""}`}
          >
            <div className={`explore-menu__img-wrap ${category === "all" ? "explore-menu__img-wrap--active" : ""}`}>
              <span className="explore-menu__all-icon">🍽️</span>
            </div>
            <span className="explore-menu__label">All Dishes</span>
          </div>

          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name;
            const displayName = item.menu_name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "all" : item.menu_name
                  )
                }
                key={index}
                className={`explore-menu__item ${isActive ? "explore-menu__item--active" : ""}`}
              >
                <div
                  className={`explore-menu__img-wrap ${isActive ? "explore-menu__img-wrap--active" : ""}`}
                >
                  <img src={item.menu_Image} alt={displayName} loading="lazy" />
                </div>
                <span className="explore-menu__label">{displayName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreMenu;
