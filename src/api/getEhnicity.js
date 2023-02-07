export async function getEthnicity(state, place) {
  const { id: stateId } = state;
  const placeIds = await objToArray(place);
  const response = await fetch(
    `https://api.census.gov/data/2021/acs/acs1?get=P2_001N,P2_002N&for=place:${placeIds}&in=state:${stateId}`
  ).then((response) => response.json());
  const sum = await response.slice(1).reduce((acc, item) => {
    return acc + parseInt(item[1]);
  }, 0);
  const total = await response.slice(1).reduce((acc, item) => {
    return acc + parseInt(item[0]);
  }, 0);
  return [
    {
      name: '11-2. Residents of Hispanic origin in the facility service area?',
      numberOfResidents: sum,
      percentOfTotalResidents: Math.round(parseInt((sum / total) * 100))
    }
  ];
}
