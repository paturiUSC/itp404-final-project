import validateReviewInput from "../validateInput";

test("identifying that the validate function outputs key-value pairs given invalid input", () => {
  const reviewSpecialCharactersAndNumbersResult = validateReviewInput(
    "@2$",
    "D!e",
    "Bad @Property Managers"
  );
  expect(reviewSpecialCharactersAndNumbersResult).toEqual({
    firstName:
      "Ensure there are no special characters or numbers in the first name!",
    lastName:
      "Ensure there are no special characters or numbers in the last name!",
  });

  const reviewImproperLengthResult = validateReviewInput("a", "p", "bad");
  expect(reviewImproperLengthResult).toEqual({
    firstName: "Ensure at least 2 characters for first name!",
    lastName: "Ensure at least 2 characters for last name!",
    reviewText:
      "Ensure the review text is at least 5 characters long. Remember, these reviews are for your fellow students!",
  });

  const reviewSomeSpecialCharactersAndNumbersAndSomeImproperLengthResult =
    validateReviewInput("4!", "h", "bad");
  expect(
    reviewSomeSpecialCharactersAndNumbersAndSomeImproperLengthResult
  ).toEqual({
    firstName:
      "Ensure there are no special characters or numbers in the first name!",
    lastName: "Ensure at least 2 characters for last name!",
    reviewText:
      "Ensure the review text is at least 5 characters long. Remember, these reviews are for your fellow students!",
  });

  const reviewSpecialCharactersAndNumbersAndImproperLengthResult =
    validateReviewInput("0", "^", "good");
  expect(reviewSpecialCharactersAndNumbersAndImproperLengthResult).toEqual({
    firstName:
      "Ensure at least 2 characters for first name. Ensure there are no special characters or numbers too!",
    lastName:
      "Ensure at least 2 characters for last name. Ensure there are no special characters or numbers too!",
    reviewText:
      "Ensure the review text is at least 5 characters long. Remember, these reviews are for your fellow students!",
  });
});

test("the function output, which should be an empty dictionary, given valid input", () => {
  const reviewNoSpecialCharactersAndNoNumbersAndProperLengthResult =
    validateReviewInput(
      "Abhi",
      "Paturi",
      "The property managers were amazing! I apperciated how quick they were with responding to service requests."
    );
  expect(reviewNoSpecialCharactersAndNoNumbersAndProperLengthResult).toEqual(
    {}
  );
});
