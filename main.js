const renderJokes = Handlebars.compile($("#jokes-template").html());
const renderLoading = Handlebars.compile($("#loading-template").html());

let term;
let previousPage;
let nextPage;

function fetchJokes(term, page) {
  let url = `https://icanhazdadjoke.com/search?term=${term}&page=${page}`;

  $("#results").html(renderLoading());

  $.ajax({
    type: "GET",
    url,
    headers: { Accept: "application/json" },
  }).then((data) => {
    previousPage = data.previous_page;
    nextPage = data.next_page;

    const html = renderJokes(data);
    $("#results").html(html);
  });
}

$("form").on("submit", function (event) {
  event.preventDefault(); // prevents the form from submitting to another page
  term = $(this).find("input").val();
  fetchJokes(term, 1);
});

$("#results").on("click", "#previous-page-button", function () {
  fetchJokes(term, previousPage);
});

$("#results").on("click", "#next-page-button", function () {
  fetchJokes(term, nextPage);
});
