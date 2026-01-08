// Emojis can be used with windows shortcut: windows + .

import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]); //Needed both in Form and packingList components, and so has been brought up to the common parent component.

  function handleAddItems(item) {
    setItems((items) => [...items, item]); //Since we are setting the new value based on the old value, we need to use a callback function to create a new array by spreading the values of the original.
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id)); //Sets the items array as a new array by filtering out the item with the id passed through the function.
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page reloading upon form submission.
    if (!description) return; // Prevents users submitting a blank item

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItem(newItem);

    // Reset states back to initial values
    setDescription("");
    setQuantity(1);
  }

  return (
    // When handling a form submit, we use onSubmit within the form element to pass through a handle function.
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))} // We need the Number() function here, else when we change the quantity value, it will return a string.
      >
        {/*
          Using the Array.from() function allows us to create an array of specified length, incremented by
          a specified value each time (here it is 1 to 20). We can then map over this array in order to use
          the numbers, in this case as options within a dropdown element.
        */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/*
        When we set the value of the input as the description state, it will not let the user
        override the the contents of the input box. This is because the value of the state is 
        not changing, and React is causing the value of the input box to always be the value of
        the state. Therefore, by ensuring that upon a change within this input box, the state is
        also updated to reflect the change, both the state and the value within the input box can
        be update upon the user typing within the box.
      */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value.trimStart())}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul className="list">
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>{" "}
      {/*Must remember to have onDeleteItem() as a callback function, else it will call instantly */}
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
