import {
  splitAddress,
  generateStarIcons,
  convertMillisecondsToReadableDate,
} from "../widelyUsedFunctions";

test("the splitting of an address into 2 different strings", () => {
  const splitAddressResultList = splitAddress(
    "1437 W. 36th Pl, Los Angeles, CA 90007"
  );
  expect(splitAddressResultList[0]).toEqual("1437 W. 36th Pl");

  expect(splitAddressResultList[1]).toEqual("Los Angeles, CA 90007");
});

test("the generation of 3 stars dependent on a rating of 3", () => {
  const generate3StarRating = generateStarIcons(3);

  const filledStarClassName = "bi-star-fill";
  const halfStarClassName = "bi-star-half";
  const unfilledStarClassName = "bi bi-star text-warning";

  const filledStarCount = generate3StarRating.filter((starIcon) =>
    starIcon.props.className.includes(filledStarClassName)
  ).length;

  const halfFilledStarCount = generate3StarRating.filter((starIcon) =>
    starIcon.props.className.includes(halfStarClassName)
  ).length;

  const unfilledStarCount = generate3StarRating.filter((starIcon) =>
    starIcon.props.className.includes(unfilledStarClassName)
  ).length;

  expect(filledStarCount).toEqual(3);
  expect(halfFilledStarCount).toEqual(0);
  expect(unfilledStarCount).toEqual(2);
});

test("the generation of 4.5 stars dependent on a rating of 4.5", () => {
  const generate3StarRating = generateStarIcons(4.5);

  const filledStarClassName = "bi-star-fill";
  const halfStarClassName = "bi-star-half";
  const unfilledStarClassName = "bi bi-star text-warning";

  const filledStarCount = generate3StarRating.filter((starIcon) =>
    starIcon.props.className.includes(filledStarClassName)
  ).length;

  const halfFilledStarCount = generate3StarRating.filter((starIcon) =>
    starIcon.props.className.includes(halfStarClassName)
  ).length;

  const unfilledStarCount = generate3StarRating.filter((starIcon) =>
    starIcon.props.className.includes(unfilledStarClassName)
  ).length;

  expect(filledStarCount).toEqual(4);
  expect(halfFilledStarCount).toEqual(1);
  expect(unfilledStarCount).toEqual(0);
});

test("the conversion of milliseconds into a human-readable date and time", () => {
  const readableTimestamp = convertMillisecondsToReadableDate(1701561354662);
  expect(readableTimestamp).toEqual("2023-12-02 at 15:55:54");
});
