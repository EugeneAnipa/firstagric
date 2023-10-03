function myWithdraw() {
  document.getElementById("demo").innerHTML = "Hello World";
}

function myTransfer() {
  document.getElementById("demo").innerHTML = "Hello World";
}

function mySettings() {
  document.getElementById("demo").innerHTML = "Hello World";
}

document.getElementById("today").innerHTML = displayDate();

function displayDate() {
  let d = new Date();
  return d;
}

document.getElementById("total").innerHTML = total();

function total() {
  // Get the value of the input field with id="firstnumber"
  i = document.getElementById("balance").value;

  // Get the value of the input field with id="secondnumber"
  x = document.getElementById("secondnumber").value;

  // If x is Not a Number or less than one or greater than 10

  let sum = 0;

  for (i = 0; i <= balance.length; i++) {
    sum = sum + i;
  }

  return 12222;
}
