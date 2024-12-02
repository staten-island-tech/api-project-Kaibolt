// This is a test for the optimalJS.md
// The code that was in main.js before this will be put in a markdown file called [previousMain.md]
// The final version of this code will be put in [main.js] without comments
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

    // Generate dropdown menu options
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
      document.querySelector("#container").innerHTML = ""; // Empty again
      displayArticles(data.results); // Show all the articles
    });

    // Append section options dynamically
    sections.forEach((section) => {
      // From the map of sections, for each section
      const li = document.createElement("li"); // Make a list element
      li.id = section; // With an id corresponding to the section it came from

      // Capitalize the first letter of the section
      const capitalizedSection =
        section.charAt(0).toUpperCase() + section.slice(1); // The first character becomes an uppercase, and it adds the rest of the section

      li.innerHTML = `<a>${capitalizedSection}</a>`; // The list text is the capitalized word
      dropdown.appendChild(li); //Add the list elements to the dropdown

      // Add event listener for each section
      li.addEventListener("click", () => {
        // When you click on a list element
        console.log(`${capitalizedSection} Articles`); // Log the list content (word)
        document.querySelector("#container").innerHTML = ""; // empty the article container
        const filteredArticles = data.results.filter(
          // filter the article for each section
          (article) => article.section === section // the filtered articles are the results
        );
        displayArticles(filteredArticles); // Display the filtered articles
      });
    });

    // Display all articles by default and highlight "All Articles"
    // DEFAULT!!!!
    displayArticles(data.results); // Display all articles
  } catch (error) {
    // Otherwise catch the error
    console.log(error); // Log the error in the console
  }
}

// Function to display articles
function displayArticles(articles) {
  const container = document.querySelector("#container"); // Div with the id of container
  container.innerHTML = ""; // Clear container
  articles.forEach((article) => {
    // for each article
    container.insertAdjacentHTML(
      // insert the cards in the container
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
