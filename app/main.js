//
//gets data
//shows data
const URL =
  "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=tmOTqwdrNCT4wJ218FAcoGKribFSalPv";
async function getData(URL) {
  // fetch returns a promise
  try {
    const response = await fetch(URL);
    const data = await response.json();
<<<<<<< HEAD
    console.log(data.results);
    // This all works fine for now
    // map through data.results for articles, then run a function to insert everything into the document
    //Or I can go through the results and for each article, , insert it as HTML. I like this idea as it's simple.
    data.results.forEach((article) => {
      document.body.insertAdjacentHTML(
        "beforeend",
        `<b>${article.title}</b> <br>`
      );
    });
=======
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
