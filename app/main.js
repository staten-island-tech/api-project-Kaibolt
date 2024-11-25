//
//gets data
//shows data
import { themeChange } from "theme-change";
themeChange();
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
      document.querySelector("#container").insertAdjacentHTML(
        "beforeend",
        `<div class="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
        <img src="${article.multimedia[1].url}"alt="${article.multimedia[1].caption}" />
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
document.querySelector("#All").addEventListener("click", function () {
  console.log("All Articles");
  document.querySelector("#container").innerHTML = "";
  getData(URL);
  console.log(articleCount);
});

document.querySelector("#Art").addEventListener("click", function () {
  console.log("Art Articles");
  document.querySelector("#container").innerHTML = "";
  const artArticles = data.results.filter(
    (article) => article.section == "arts"
  );
  console.log(artArticles.length);
  for (let i = 0; i < artArticles.length; i++) {
    document.querySelector("#container").insertAdjacentHTML(
      "beforeend",
      `<div class="card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
    <img src="${artArticles[i].multimedia[1].url}"alt="${artArticles[i].multimedia[1].caption}" />
    </figure>
    <div class="card-body">
    <h2 class="card-title"><a class="text-teal-700", href="${artArticles[i].url}">${artArticles[i].title}</a></h2>
    <p>${artArticles[i].abstract}</p>
    </div>
    </div>`
    );
  }
});

document.querySelector("#Movie").addEventListener("click", function () {
  console.log("Movie Articles");
  document.querySelector("#container").innerHTML = "";
  const movieArticles = data.results.filter(
    (article) => article.section == "movies"
  );
  console.log(movieArticles.length);
  for (let i = 0; i < movieArticles.length; i++) {
    document.querySelector("#container").insertAdjacentHTML(
      "beforeend",
      `<div class="card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
    <img src="${movieArticles[i].multimedia[1].url}"alt="${movieArticles[i].multimedia[1].caption}" />
    </figure>
    <div class="card-body">
    <h2 class="card-title"><a class="text-teal-700", href="${movieArticles[i].url}">${movieArticles[i].title}</a></h2>
    <p>${movieArticles[i].abstract}</p>
    </div>
    </div>`
    );
  }
});
