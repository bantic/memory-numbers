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
var max_mins = 0;
var max_seconds = 10;
var max_total = 60*max_mins + max_seconds;

function startTimer() {
  max_mins = parseInt($("#minutes").val(), 10);
  max_seconds = parseInt($("#seconds").val(), 10);
  max_total = max_mins * 60 + max_seconds;
  console.log("max total: " + max_total);
  start_time = getSeconds();
  setTimeout(monitorTimer, 100);
}

function getSeconds() {
  var d = new Date()
  return d.getTime() / 1000;
}

function padNum(num, spaces, padding) {
  padding = padding || "0";
  spaces  = spaces  || 2;
  num_str = num.toString();
  while (num_str.length < spaces) {
    num_str = padding + num_str;
  }
  return num_str;
}

function monitorTimer() {
  var elapsed = getSeconds() - start_time;
  
  var remaining = max_total - elapsed;
  
  var mins_remaining = parseInt(remaining / 60);
  var secs_remaining = Math.round(remaining % 60);
  secs_remaining = secs_remaining == 60 ? 0 : secs_remaining;
  
  $("#minutes").val(mins_remaining);
  $("#seconds").val(padNum(Math.round(secs_remaining)));
  
  if (remaining > 0) {
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
  var missed_any = false;
  var consecutive_correct = 0;
  
  for (var i = 0; i < rows; i++) {
    var row_data = numbers_data["row" + i];
    var input_data = $("#rowinput" + i).val();
    if (input_data != "") {
      for (var j = 0; j < row_length; j++) {
        if (row_data[j] != parseInt(input_data[j])) {
          missed_any = true;
          var missed_elem = $("#row" + i + " .number")[j];
          $(missed_elem).css({border: "2px solid red"});
          console.log("missed row " + i + " position " + j);
        } else {
          if (!missed_any) {
            consecutive_correct += 1;
          }
        }
      }
    }
  }
  
  console.log("missed_any: " + missed_any);
  console.log("consecutive_correct: " + consecutive_correct);
  $(".rownumbers").show();
}