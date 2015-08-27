function submitIdea(event) {
  console.log("hit");
  event.preventDefault();
  postIdeaData();
}

function ideaData() {
  return {
    idea: {
      title: $("#title-input").val(),
      body:  $("#body-input").val()
    }
  };
}

function clearForm() {
   $("#title-input").val("");
   $("#body-input").val("");
}

function postIdeaData() {
  $.post("/ideas", ideaData(), function(data) {
    $("#ideas-list").prepend(data);
    $(".delete-button").click(deleteIdea);
    $(".upvote").click(increaseQuality);
    $(".downvote").click(decreaseQuality);
    clearForm();
  });
}

function deleteIdea(event) {
  var idea = $(this).parent();
  var ideaId = $(this).parent().attr("id");

  $.ajax({
    url: "/ideas/" + ideaId,
    type: 'DELETE',
    success: function(result) {
      $(idea).remove();
    }
  });
}

function increaseQuality() {
  var idea = $(this).parent()
  var quality = $(this).parent().find(".quality");
  if($(quality).text() === "swill") {
    $(quality).text("plausible");
    updateIdeaQuality(idea, "plausible");
  } else if($(quality).text() === "plausible") {
    $(quality).text("genius")
    updateIdeaQuality(idea, "genius");
  };
}

function decreaseQuality() {
  var idea = $(this).parent()
  var quality = $(this).parent().find(".quality");
  if($(quality).text() === "genius") {
    $(quality).text("plausible")
    updateIdeaQuality(idea, "plausible");
  } else if($(quality).text() === "plausible") {
    $(quality).text("swill")
    updateIdeaQuality(idea, "swill");
  };
}

function updateIdeaQuality(idea, value) {
  $.ajax({
    url: '/ideas/' + $(idea).attr("id") + "/quality",
    type: 'PUT',
    data: "quality=" + value,
  });
}


$(document).ready(function() {

  $("#idea-form").submit(submitIdea);

  $(".delete-button").click(deleteIdea);

  $("#idea-filter").keyup(function() {
    var search = $("#idea-filter").val().toLowerCase();
    $(".idea").each(function(index, element) {
      if($(element).text().toLowerCase().indexOf(search) === -1 && search != "") {
        $(element).hide();
      } else {
        $(element).show();
      };
    });
  });

  $(".upvote").click(increaseQuality);
  $(".downvote").click(decreaseQuality);
});
