// validation
/**
 * Firstname should contain at least five characters
 * and at most 30 and should contain only letters
 *
 * Lastname should contain at least five characters
 * and at most 30 and should contain only letters
 *
 * Email should be a valid email
 *
 * Password should contain at least 8 characters
 * Must contain at least one uppercase letter, one lowercase letter, 1digit and one
 * special character.
 */

// function validateFirstName(name) {
//     let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     let lettersArr = letters.split("");

//     let nameArr = name.split("");

//    for(let i = 0; i < nameArr.length; i++) {
//     if(!lettersArr.includes(nameArr[i])) {
//         return "Invalid";
//     }
//    }

//    return "valid";
// }

// Get form input
const first = document.querySelector("#fname");
const last = document.querySelector("#lname");
const email = document.querySelector("#email");
const password = document.querySelector("#pass");
const form = document.querySelector(".form-controller");

let error = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  error = [];
  validateInput();
});

function validateInput() {
    const fName = validateName(first.value.trim(), "firstName");
    const lName = validateName(last.value.trim(), "lastName");
    const mail = validateEmail(email.value.trim(), "email");
    const pass = validatePassword(password.value.trim(), "password");

    console.log(fName,lName,mail,pass);

    const message = error.map(err => `<li>${err.type}: ${err.msg}</li>`)
    document.querySelector(".error-desc").innerHTML = message;
    if(error.length === 0) {
        first.value = "";
        last.value = "";
        email.value = "";
        password.value = "";
        alert("Form Submitted Successfully!");
    }
}

function validateName(value, name) {
  const regEx = /^[a-z]{5,}$/gi;
  return validate(regEx, value, name);
}

function validateEmail(value, name) {
  // ANYTHING@ANYTHING.ANYTHING

  /**
   * /^\S+@\S+\.\S+$/
   * /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   */
  const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
  return validate(regEx, value, name)
}

function validatePassword(value, name) {
  /**
   * 1. at least one letter
   * /(?=.*[a-z])/
   * /(?=.*[A-Z])/
   * /(?=.*\d)/
   * /(?=.*[!@#$%^&*])/
   * /(?=.{8,})/
   */
    const regEx =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/g;
    return validate(regEx, value, name)
}

function validate(exp, value, type) {
    const isValid = exp.test(value);
    if(isValid) {
        return value;
    } else {
        let err = {}
        err.type = type;
        err.msg = `Invalid input for ${type}`;

        error.push(err);
    }
}
