import PropTypes from 'prop-types';
// Get the cities from the Census API
export default async function getCities(stateObj) {
  const { id: stateId } = stateObj;
  const response = await fetch(
    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`
  ).then((response) => response.json());
  // Map the response to an array of objects after removing the first element (the header)
  const data = await response.slice(1).map((city) => {
    return {
      id: city[2],
      name: city[0]
    };
  });
  return data;
}

getCities.propTypes = {
  stateId: PropTypes.array
};
