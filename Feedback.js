const form = document.querySelector("#form");
const fullName = document.querySelector("#fullname");
const email = document.querySelector("#email");
const rating = document.getElementsByName("satisfiedLevel");
const feedback = document.querySelector("#comments");


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isNameValid = userNameValidator(); //calling the name validator
  const isEmailValid = userEmailValidator(); //calling the email validator

  if (isNameValid && isEmailValid) {
    popUp();
    form.reset(); // resetting the form
  }
});



function userNameValidator() {
  const userName = fullName.value.trim();
  const nameValidator = /^[A-Za-z\s]*$/;  //https://www.w3resource.com/javascript/form/all-letters-field.php
  const errorDiv = fullName.parentElement;
  const item = errorDiv.querySelector(".errorMessage");

  if (userName === "") {
    item.innerText = "* Name required.";
    return false;
  } else if (!nameValidator.test(userName)) {
    item.innerText = "* Invalid name.";
    return false;
  } else {
    item.innerText = "";
    return true;
  }
}

function userEmailValidator() {
  const userEmail = email.value.trim();
  const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //https://www.w3resource.com/javascript/form/email-validation.php
  const errorDiv = email.parentElement;
  const item = errorDiv.querySelector(".errorMessage");


  if (userEmail === "") {
    item.innerText = "* Email required.";
    return false;
  } else if (!emailValidator.test(userEmail)) {
    item.innerText = "* Invalid email address.";
    return false;
  } else if (userEmail.length < 5 || userEmail.length > 255) {
    item.innerText = "* Invalid email address.";
    return false;
  } else {
    item.innerText = "";
    return true;
  }
}


//to display a popup message
function popUp() {
  var popMessage = document.querySelector(".popUp");
  popMessage.classList.toggle("active");

  const userEmail = email.value.trim();
  const encodedEmail = encodeURIComponent(userEmail);

  const subject = "Feedback form details"
  const body = `+Name : ${fullName.value}  +Email : ${encodedEmail}  +Rating : ${customerRatingChecker()}  +Feedback :${feedback.value}`

  const mailtoLink = `mailto:manoharan.20220196@iit.ac.lk?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;

}

//Check and return the index of the rating
function customerRatingChecker() {
  for (let i = 0; i < rating.length; i++) {
    if (rating[i].checked) {
      return rating[i].value;
    }
  }
  return null;
}

//function to close the popup
function popUpClose() {
  var popMessage = document.querySelector(".popUp");
  popMessage.classList.remove("active");
}
