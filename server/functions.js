import crypto from 'crypto';
const idList = [];

export const generateID = (type) => {
  let newID = crypto.randomBytes(4).toString('hex');
  while (idList.indexOf(newID) >= 0) newID = crypto.randomBytes(4).toString('hex');
  idList.push(`${type}${newID}`);
  return `${type}${newID}`;
}