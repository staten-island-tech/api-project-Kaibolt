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
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
