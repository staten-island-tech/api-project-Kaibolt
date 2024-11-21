//
//gets data
//shows data
const URL =
  "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=tmOTqwdrNCT4wJ218FAcoGKribFSalPv";
const response = await fetch(URL);
const data = await response.json();
async function getData(URL) {
  try {
    //    console.log(data.results);
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
        <h2 class="card-title"><a class="text-teal-700", href="${article.url}">${article.title}</a></h2>
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
console.log(data.results.length);
const articleCount = data.results.length;
for (let i = 0; i < articleCount; i++) {
  if (data.results[i].section == "arts") {
    console.log(data.results[i]);
  }
}
