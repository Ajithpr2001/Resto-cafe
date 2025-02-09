import React, { useState } from "react";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
const Menu = ({ items, setCartCount }) => {
  const [quantities, setQuantities] = useState({});

  const handleIncrease = (id) => {
    setQuantities((prev) => {
      const newQty = (prev[id] || 0) + 1;
      console.log({ ...prev, [id]: newQty });
      return { ...prev, [id]: newQty };
    });

    setCartCount((prev) => prev + 1); 
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => {
      if (!prev[id] || prev[id] === 0) return prev;
      const newQty = prev[id] - 1;

      setCartCount((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative cart count

      return { ...prev, [id]: newQty };
    });
  };

  const itemTemplate = (dish, index) => {
    return (
      <div className="col-12" key={dish.dish_id}>
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">
                {dish.dish_name}
              </div>
              <p className="text-sm text-gray-600 m-0">
                {dish.dish_description}
              </p>
              <p className="text-green-600 font-bold m-0">
                {dish.dish_currency} {dish.dish_price}
              </p>

              {/* Order Controls */}
              <div className="flex items-center gap-2">
                {dish.dish_Availability ? (
                  <div className="flex items-center gap-3 bg-green-600  rounded-full shadow-lg">
                    <Button
                      icon="pi pi-minus"
                      className="p-button-rounded p-button-sm text-white bg-green-600 border-none focus:outline-none active:outline-none shadow-none"
                      onClick={() => handleDecrease(dish.dish_id)}
                      disabled={!quantities[dish.dish_id]}
                    />
                    <span className="text-xl font-bold text-white mt-2">
                      {quantities[dish.dish_id] || 0}
                    </span>
                    <Button
                      icon="pi pi-plus"
                      className="p-button-rounded p-button-sm text-white bg-green-600 border-none focus:outline-none active:outline-none shadow-none"
                      onClick={() => handleIncrease(dish.dish_id)}
                    />
                  </div>
                ) : (
                  <Tag value="Not available" severity="danger" />
                )}
              </div>
              {dish.addonCat.length > 0 && (
                <Tag value="Customization available" severity="warning" />
              )}
            </div>
          </div>

            {/* Calories */}
          {/* <div className="text-right">
            <p className="text-gray-500">{dish.dish_calories} calories</p>
          </div> */}

          {/* Dish Image */}

          {dish.dish_image && (
            <img
              className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              src={dish.dish_image}
              alt={dish.dish_name}
            />
          )}
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;
    return <div className="grid grid-nogutter">{items.map(itemTemplate)}</div>;
  };

  return (
    <div className="card">
      <DataView value={items} listTemplate={listTemplate} />
    </div>
  );
};

export default Menu;
