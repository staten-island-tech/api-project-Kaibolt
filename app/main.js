//
//gets data
//shows data
async function getData() {
  // fetch returns a promise
  try {
    const response = await fetch(
      "https://inshorts.deta.dev/news?category=science"
    );
    //guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      document.querySelector("h1").textContent = data.category;
    }
  } catch (error) {
    console.log(error);
    console.log("Article not found");
  }
}
getData();
//not working
