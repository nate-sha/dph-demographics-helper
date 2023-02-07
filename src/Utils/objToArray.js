// Transfors an array of objects into an array of strings
export default async function objToArray(obj) {
  // If the array is empty, return a * to get all the data
  if (obj.length === 0) return '*';
  const itemsIds = await obj.reduce((acc, item) => {
    return acc + item.id + ',';
  }, '');
  // Remove the last comma from the string
  const itemsIdsString = itemsIds.slice(0, -1);
  return itemsIdsString;
}
