
export function generateNameFromEmail(email) {
  // get part before @
  let namePart = email.split('@')[0];

  // keep only letters (remove numbers, special chars)
  namePart = namePart.replace(/[^a-zA-Z]+/g, ' ');

  // capitalize each word and remove extra spaces
  const formattedName = namePart
    .split(' ')
    .join('');

  return formattedName;
}
