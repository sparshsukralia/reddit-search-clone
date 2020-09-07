import redditapi from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  // Get search term
  const searchTerm = searchInput.value;
  // Get sort
  // Using query selector checkbox method to select
  const sortBy = document.querySelector("input[name='sortby']:checked").value;
  // Get the search limit
  const searchLimit = document.getElementById("limit").value;

  // Check empty input
  if (searchTerm == "") {
    // Alert message
    showMessage("Please add a search term", "alert-danger");
  }

  // Reddit Search
  redditapi(searchTerm, searchLimit, sortBy).then((results) => {
    let output = "<div class='card-columns'>";
    // Loop through the reddit posts
    results.forEach((post) => {
      output += `<div class="card">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100) + "..."}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  // Clear the search input
  searchInput.value = "";

  e.preventDefault();
});

// showMessage function
function showMessage(message, className) {
  // creating a div for the message
  const div = document.createElement("div");
  // Adding class to the div
  div.className = `alert ${className}`;
  // Adding text to the alert
  div.appendChild(document.createTextNode(message));
  // Get the parent div
  const searchContainer = document.getElementById("search-container");
  // Get the div we want to alert to show before of
  const search = document.getElementById("search");

  // Insert the message to the alert div
  searchContainer.insertBefore(div, search);

  // Timeout for the alert message
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

// Truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
