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
