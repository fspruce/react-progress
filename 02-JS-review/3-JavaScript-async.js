// Fetching APIS using fetch/then
// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// A cleaner way of calling this API is using Async/Await
async function getToDos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos"); // Waits for this line to complete fetching data before moving onto the next
  const data = await res.json();
  console.log(data);

  return data;
}

const toDos = getToDos();
console.log(toDos);

console.log("Fintan");
