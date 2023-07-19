// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var textID;
  var userText;

  $(".saveBtn").click(function () {
    textID = $(this).parents().attr("id");
    userText = $(this).parents().find("> textarea").val();
    //
    //https://api.jquery.com/child-selector/
    localStorage.setItem(textID, userText);

    console.log(textID);
    console.log(userText);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  var timeBlockID;
  var timeBlockHour;

  $(document).ready(function () {
    $(".time-block").each(function () {
      var currentHour = dayjs().hour();
      console.log(currentHour);

      timeBlockID = $(this).attr("id");
      timeBlockHour = parseInt(timeBlockID.replace("hour-",""));
      console.log(timeBlockHour);

      if (timeBlockHour < currentHour) {
        $(this).addClass("past");
      } else if (timeBlockHour > currentHour) {
        $(this).addClass("future");
      } else if (timeBlockHour = currentHour) {
        $(this).addClass("present");
      }

      var savedUserText = localStorage.getItem(timeBlockID);
      console.log(savedUserText);

      var userTextBox = $(this).find("> textarea");
      $(userTextBox).val(savedUserText);
    });
  });
  
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  var todayDate = dayjs();
  $("#currentDay").text(todayDate.format("dddd, MMMM D, YYYY - h A"));
  console.log(todayDate);
});
