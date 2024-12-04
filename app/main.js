async function defaultGrab() {
  const URL =
    "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=tmOTqwdrNCT4wJ218FAcoGKribFSalPv";
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const sections = [
      ...new Set(data.results.map((article) => article.section)),
    ];
    const dropdown = document.querySelector(".menu");
    dropdown.innerHTML = "";
    const allOption = document.createElement("li");
    allOption.id = "All";
    allOption.innerHTML = `<a>All Articles</a>`;
    dropdown.appendChild(allOption);
    allOption.addEventListener("click", () => {
      console.log("All Articles");
      document.querySelector("#container").innerHTML = "";
      displayArticles(data.results);
    });
    sections.forEach((section) => {
      const li = document.createElement("li");
      li.id = section;
      const capitalizedSection =
        section.charAt(0).toUpperCase() + section.slice(1);
      li.innerHTML = `<a>${capitalizedSection}</a>`;
      dropdown.appendChild(li);
      li.addEventListener("click", () => {
        console.log(`${capitalizedSection} Articles`);
        document.querySelector("#container").innerHTML = "";
        const filteredArticles = data.results.filter(
          (article) => article.section === section
        );
        displayArticles(filteredArticles);
      });
    });
    displayArticles(data.results);
  } catch (error) {
    console.log(error);
  }
}
function displayArticles(articles) {
  const container = document.querySelector("#container");
  container.innerHTML = "";
  articles.forEach((article) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img src="${article.multimedia[1]?.url || ""}" alt="${
        article.multimedia[1]?.caption || "Image"
      }" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            <a class="text-teal-700" href="${article.url}" target="_blank">${
        article.title
      }</a>
          </h2>
          <p>${article.abstract}</p>
        </div>
      </div>`
    );
  });
}

async function defaultSearch() {
  const URL =
    "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=tmOTqwdrNCT4wJ218FAcoGKribFSalPv";
  try {
    const response = await fetch(URL);
    const data = await response.json();
    document
      .querySelector("#searchButton")
      .addEventListener("click", function () {
        console.log(document.querySelector("#searchBar").value);
        let userImput = document.querySelector("#searchBar").value;
        const searchedArticles = data.results.filter((article) =>
          article.title.includes(userImput)
        );
        console.log(searchedArticles);
        if ((userImput = "All Articles" || "all articles" || "")) {
          displayArticles(data.results);
        }
        if (userImput != "All Articles" || "all articles" || "") {
          displayArticles(searchedArticles);
        }
        document.querySelector("#searchBar").value = "";
      });
  } catch (error) {
    console.log(error);
  }
}

defaultGrab();
defaultSearch();
