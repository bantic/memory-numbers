// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(document).ready(function() {
  
});

var row_length = 20;

function startNumbers() {
  var rows = $("#row_count").val();
  
  var numbers_data = {};
  var numbers_html = "";
  for (var i = 0; i < rows; i++) {
    var digits_in_row = [];
    var row_html = "<div id='row" + i + "' class='row rownumbers";
    if (i == (rows - 1)) {
      row_html += " last";
    }
    row_html += "'>";
    
    for (var j = 0; j < row_length; j++) {
      var num = parseInt(Math.random() * 10);
      digits_in_row.push(num);
      row_html += "<div class='number " + num + "'>" + num + "</div>";
    }
    numbers_data["row" + i] = digits_in_row;
    row_html += "</div>";
    row_html += "<div class='row rowinput'><input type='text' name='row" + i + "' id='rowinput" + i + "' /></div>";
    numbers_html += row_html;
  }
  $("#numbers").html(numbers_html);
  $("#numbers").data("numbers", numbers_data);
}

var start_time;
var max_seconds = 10;

function startTimer() {
  start_time = getSeconds();
  setTimeout(monitorTimer, 100);
}

function getSeconds() {
  var d = new Date()
  return d.getTime() / 1000;
}

function monitorTimer() {
  var elapsed = getSeconds() - start_time;
  $("#timer").html(Math.round(elapsed));
  if (elapsed < max_seconds) {
    setTimeout(monitorTimer, 100);
  } else {
    startGuessing();
  }
}

function startGuessing() {
  var rows = $("#row_count").val();
  
  $(".rownumbers").hide();
  $(".rowinput").show();
}

function checkScore() {
  var rows = $("#row_count").val();
  var numbers_data = $("#numbers").data("numbers");
  
  for (var i = 0; i < rows; i++) {
    var row_data = numbers_data["row" + i];
    var input_data = $("#rowinput" + i).val();
    if (input_data != "") {
      for (var j = 0; j < row_length; j++) {
        if (row_data[j] != parseInt(input_data[j])) {
          console.log("missed row " + i + " position " + j);
        }
      }
    }
  }
}