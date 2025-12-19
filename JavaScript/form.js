// form.js

// Get form and message element
const form = document.getElementById("contactForm"); // Event Listener
const msg = document.getElementById("formMessage"); // Variables
let Valid = false;
// Base shirt price
const basePrice = 25; // Constant
function calculateShirtCost(optionCost, sizeCost) {
  var singleShirtValue = basePrice + optionCost + sizeCost;
  return singleShirtValue; // Function 1
}

function formatText(text) {
  return text + "<br>"; // Use HTML line breaks and Function 2
}

form.addEventListener("submit", function (e) {
  // prevent defalt submission
  e.preventDefault();

  //Get text inputs
  const firstName = form.querySelector('input[name="firstName"]').value.trim(); // String Methods
  const lastName = form.querySelector('input[name="lastName"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();

  //Get num of shirts
  const quantityInput = form.querySelector('input[name="quantity"]').value;
  const quantity = quantityInput ? Number(quantityInput) : 0; // Arithmetic Operators

  // promo code
  const promo = form.querySelector('input[name="promo"]').value.trim();

  // Get checkbox stuff
  const checkboxes = form.querySelectorAll('input[name="options"]:checked'); //Loop
  let optionsTotal = 0; // Let
  let optionsNames = []; // Let
  checkboxes.forEach(function (box) {
    // Loop
    optionsTotal += Number(box.value); // Arithmetic Operators
    optionsNames.push(box.parentElement.textContent.trim()); // String Methods and Array
  });

  // Get size
  const sizeSelected = form.querySelector('input[name="size"]:checked');
  let sizeValue = 0; // Let
  let sizeName = ""; // Let
  if (sizeSelected) {
    sizeValue = Number(sizeSelected.value);
    sizeName = sizeSelected.parentElement.textContent.trim();
  }

  // Valdiaton
  //  If and else
  if (!firstName) {
    alert("Please enter your first name."); // Form Validation
    return;
  } else if (!lastName) {
    alert("Please enter your last name."); // Form Validation
    return;
  } else if (!email) {
    alert("Please enter your email."); // Form Validation
    return;
  } else if (!quantity || quantity < 1) {
    alert("Please enter a valid number of shirts (1 or more)."); // Form Validation
    return;
  } else if (!sizeSelected) {
    alert("Please select a size."); // Form Validation
    return;
  } else {
    Valid = true; // Boolean
  }

  const singleShirtCost = calculateShirtCost(optionsTotal, sizeValue);

  // calc total price
  const totalPrice = singleShirtCost * quantity; // Arithmetic Operators

  // Order summary
  let summary = "";
  summary += formatText("Order Summary:");
  summary += formatText("Name: " + firstName + " " + lastName);
  summary += formatText("Email: " + email);
  summary += formatText("Quantity: " + quantity);
  summary += formatText("Size: " + sizeName);
  summary += formatText(
    "Options: " + (optionsNames.length ? optionsNames.join(", ") : "None")
  );
  summary += promo ? formatText("Promo Code: " + promo) : "";
  summary += formatText("Total Price: $" + totalPrice);
  //Display page summary
  if (Valid) {
    msg.innerHTML = summary;
  }
  msg.style.display = "block";
  form.reset();
});
