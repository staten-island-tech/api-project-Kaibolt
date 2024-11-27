// This is a test for the optimalJS.md

const URL =
  "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=tmOTqwdrNCT4wJ218FAcoGKribFSalPv";
// Fetch data from the API
async function getData() {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    // Get unique sections from the articles
    const sections = [
      ...new Set(data.results.map((article) => article.section)),
    ];

    // Generate dropdown menu options dynamically
    const dropdown = document.querySelector(".menu");
    dropdown.innerHTML = ""; // Clear existing options

    // Add a general "All Articles" option first
    const allOption = document.createElement("li");
    allOption.id = "All";
    allOption.innerHTML = `<a>All Articles</a>`;
    dropdown.appendChild(allOption);

    // Add event listener for "All Articles"
    allOption.addEventListener("click", () => {
      console.log("All Articles");
      document.querySelector("#container").innerHTML = "";
      displayArticles(data.results);
    });

    // Append section options dynamically
    sections.forEach((section) => {
      const li = document.createElement("li");
      li.id = section;

      // Capitalize the first letter of the section
      const capitalizedSection =
        section.charAt(0).toUpperCase() + section.slice(1);

      li.innerHTML = `<a>${capitalizedSection}</a>`;
      dropdown.appendChild(li);

      // Add event listener for each section
      li.addEventListener("click", () => {
        console.log(`${capitalizedSection} Articles`);
        document.querySelector("#container").innerHTML = "";
        const filteredArticles = data.results.filter(
          (article) => article.section === section
        );
        displayArticles(filteredArticles);
      });
    });
    // Display all articles by default and highlight "All Articles"
    displayArticles(data.results);
  } catch (error) {
    console.log(error);
  }
}

// Function to display articles
function displayArticles(articles) {
  const container = document.querySelector("#container");
  container.innerHTML = ""; // Clear container
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

// Fetch and display data on page load
getData();
