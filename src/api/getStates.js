// Get the state names and ids from the Census API
export default async function getStates() {
  const response = await fetch('https://api.census.gov/data/2020/dec/pl?get=NAME&for=state:*').then(
    (response) => response.json()
  );
  // Map the response to an array of objects after removing the first element (the header)
  const data = await response.slice(1).map((state) => {
    return {
      id: state[1],
      name: state[0]
    };
  });
  return data;
}
