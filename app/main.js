//
//gets data
//shows data
const URL =
  "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=tmOTqwdrNCT4wJ218FAcoGKribFSalPv";
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data.results);
    // This all works fine for now
    // map through data.results for articles, then run a function to insert everything into the document
    //Or I can go through the results and for each article, , insert it as HTML. I like this idea as it's simple.
    data.results.forEach((article) => {
      document.querySelector(".flex").insertAdjacentHTML(
        "beforeend",
        `<div class="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="${article.multimedia[1].url}"
            alt="${article.multimedia[1].caption}" />
        </figure>
        <div class="card-body">
          <h2 class="card-title"><a href="${article.url}">${article.title}</a></h2>
          <p>${article.abstract}</p>
        </div>
      </div>`
      );
    });
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
