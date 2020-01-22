import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

//Context
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [products] = useState(data);
  //   const [cart, setCart] = useState([]);
  const [cart, setCart] = useLocalStorage("Cart", []);

  const addItem = item => {
    // add the given item to the cart
    const newItem = {
      id: Math.floor(Math.random() * Date.now()),
      title: item.title,
      price: item.price,
      image: item.image
    };
    setCart([...cart, newItem]);
  };
  console.log(cart);

  const removeItem = item => {
    setCart(cart.filter(e => e.id !== item.id));
  };

  return (
    <div className='App'>
      <Switch>
        <ProductContext.Provider value={{ products, addItem }}>
          <CartContext.Provider value={{ cart, removeItem }}>
            <Navigation />

            {/* Routes */}
            <Route path='/cart'>
              <ShoppingCart />
            </Route>
            <Route exact path='/'>
              <Products />
            </Route>
          </CartContext.Provider>
        </ProductContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
