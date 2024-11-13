//
//gets data
//shows data
async function getData() {
  // fetch returns a promise
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    //guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      document.querySelector("h1").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
    console.log("Pokemon not found");
  }
}
getData();
