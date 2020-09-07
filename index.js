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
      // Check if image is availabe
      let image = post.preview
        ? post.preview.images[0].source.url
        : "https://lh3.googleusercontent.com/8Vw-7MAm558750a4M55fiOlUf7lP2cYnFuqSWynrygIiyEEiQQDa_xxHKYOX83L0UD2T";

      output += `<div class="card">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100) + "..."}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
    <hr>
    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
    <span class="badge badge-dark">Score: ${post.score}</span>
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
