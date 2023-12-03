export function splitAddress(address) {
  const splitAddressInfo = [];

  const firstCommaIndex = address.indexOf(",");

  const addressLine = address.substring(0, firstCommaIndex);
  splitAddressInfo.push(addressLine);
  const cityStateZip = address.substring(firstCommaIndex + 1);
  splitAddressInfo.push(cityStateZip.trim());

  return splitAddressInfo;
}

export function convertMillisecondsToReadableDate(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export function generateStarIcons(rating) {
  const maxRating = 5;
  const starIcons = [];

  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      starIcons.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    } else if (i - rating <= 0.5) {
      starIcons.push(<i key={i} className="bi bi-star-half text-warning"></i>);
    } else {
      starIcons.push(<i key={i} className="bi bi-star text-warning"></i>);
    }
  }

  return starIcons;
}
