import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Allows for a separate CSS file

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  // In JSX we must use className rather than class
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  //const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  return (
    //<h1 style={style}>
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
  // CSS can be written in {{}}s, mixed with the markup (unlike with HTML, CSS, JS), or as a js object, and then included as JS.
}

function Menu() {
  /*
   * When using short circuiting, ensure that a true/false value is being used
   * within the and statement.
   * An empty array will count as truthy, and so here we are using a numerical value to test
   * whether there is data within the array or not.
   * However, if we just checked using the value 0 or 1, then the value 0 would get printed
   * as it is falsey, but not the boolean false.
   *
   * const pizzas = pizzaData;
   * const numPizzas = pizzas.length;
   *
   * {numPizzas > 0 && (
   *    <ul className="pizzas">
   *       {pizzas.map((pizza) => (
   *         <Pizza pizzaObj={pizza} key={pizza.name} />
   *       ))}
   *     </ul>
   *   )}
   *
   * Using the ternary operator here instead will allow for an alternative to be rendered, e.g. a note on the page explaining
   * the absence of the menu.
   *
   * IF/ELSE IF/ELSE blocks can also be used with multiple returns to allow for further conditions to be set on the rendering within
   * the page.
   */

  const pizzas = pizzaData;
  //const pizzas = [];
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {/* 
        REACT FRAGMENT: Empty <> </> tags that allow elements to be rendered together
        without effecting the DOM. If we need to use a key for whatever reason, then we
        can also use <React.Fragment> </React.Fragment.
      */}
      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {/* 
            Each child in a list should have a unique key property. In this case, the names of the pizzas
            are the unique identifier for them, and so they should be passed as a key for better
            list optimisation.
          */}
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :) </p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={12}
      /> */}
      {/* Properties can be passed through to another function similar to normal
      properties in HTML
      Other variable types can be passed in through JavaScript mode (e.g. numbers, arrays, objects)
      */}
      {/* <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mozarella, mushrooms, and onion"
        price={10}
        photoName="pizzas/funghi.jpg"
      /> */}
      {/* Property order is irrelevent */}
    </main>
  );
}

// Function name must start with an uppercase letter, and return some form of markup.
// Properties passed through as a parameter object.
// We can immediately destructure a props object to allow for cleaner/less generic code.
function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) return null;

  // Template literals and ternary operators can be used to allow for conditional classes
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "Sold Out" : `£${pizzaObj.price}`}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // else alert("Sorry, we're closed");

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer> // JavaScript can be written in {}s
  );
  // return React.createElement("footer", null, "We're currently open!");
  // Much less clean than using JSX, but another way of creating components
}

// When a piece of JSX is geting a bit too big, we can split it apart into a separate component.
// e.g. this order component was originally part of the footer component, but as it got larger,
// we moved it across to a new "order" component.
function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 until {closeHour}:00. Come visit us or
        order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {
      // Strictmode use for development, renders components twice to find certain bugs/check for outdated modules"
    }
    <App />
  </React.StrictMode>
);
