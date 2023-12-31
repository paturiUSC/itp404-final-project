export default function validateReviewInput(firstName, lastName, reviewText) {
  const specialCharacters = /[/0123456789!@#$%^&*(),.?":{}|<>]/;
  let output = {};

  if (firstName.length < 2 && specialCharacters.test(firstName)) {
    output.firstName =
      "Ensure at least 2 characters for first name. Ensure there are no special characters or numbers too!";
  } else if (firstName.length < 2) {
    output.firstName = "Ensure at least 2 characters for first name!";
  } else if (specialCharacters.test(firstName)) {
    output.firstName =
      "Ensure there are no special characters or numbers in the first name!";
  }

  if (lastName.length < 2 && specialCharacters.test(lastName)) {
    output.lastName =
      "Ensure at least 2 characters for last name. Ensure there are no special characters or numbers too!";
  } else if (lastName.length < 2) {
    output.lastName = "Ensure at least 2 characters for last name!";
  } else if (specialCharacters.test(lastName)) {
    output.lastName =
      "Ensure there are no special characters or numbers in the last name!";
  }

  if (reviewText.length < 6) {
    output.reviewText =
      "Ensure the review text is at least 5 characters long. Remember, these reviews are for your fellow students!";
  }

  return output;
}
