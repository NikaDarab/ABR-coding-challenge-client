import React from "react";

const ShoppingCart = ({ shoppingList }) => {
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {Object.entries(shoppingList).map(([fishName, quantity]) => (
          <li key={fishName}>
            {fishName} - Total Serving: {quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
