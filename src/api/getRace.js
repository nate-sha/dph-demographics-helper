// Get the state names and ids from the Census API
import objToArray from '../Utils/objToArray';
export async function getHispanicData(state, place) {
  const { id: stateId } = state;
  const placeIds = await objToArray(place);
  const response = await fetch(
    `https://api.census.gov/data/2020/dec/pl?get=P2_001N,P2_002N&for=place:${placeIds}&in=state:${stateId}`
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

export async function getRaceData(state, place) {
  const { id: stateId } = state;
  const placeIds = await objToArray(place);
  const response = await fetch(
    `https://api.census.gov/data/2020/dec/pl?get=P1_002N,P1_005N,P1_006N,P1_004N,P1_007N,P1_003N,P1_008N&for=place:${placeIds}&in=state:${stateId}`
  ).then((response) => response.json());
  // Sum up the values in the array
  const aggregate = await response.slice(1).reduce(
    (acc, item) => {
      return [
        acc[0] + parseInt(item[0]), // total population
        acc[1] + parseInt(item[1]), // American Indian and Alaska Native
        acc[2] + parseInt(item[2]), // Asian
        acc[3] + parseInt(item[3]), // Black
        acc[4] + parseInt(item[4]), // Native Hawaiian and Other Pacific Islander
        acc[5] + parseInt(item[5]), // White
        acc[6] + parseInt(item[6]) // Other
      ];
    },
    [0, 0, 0, 0, 0, 0, 0]
  );
  return [
    {
      name: 'American Indian and Alaska Native',
      numberOfResidents: aggregate[1],
      percentOfTotalResidents: Math.round(parseInt((aggregate[1] / aggregate[0]) * 100))
    },
    {
      name: 'Asian',
      numberOfResidents: aggregate[2],
      percentOfTotalResidents: Math.round(parseInt((aggregate[2] / aggregate[0]) * 100))
    },
    {
      name: 'Black',
      numberOfResidents: aggregate[3],
      percentOfTotalResidents: Math.round(parseInt((aggregate[3] / aggregate[0]) * 100))
    },
    {
      name: 'Native Hawaiian and Other Pacific Islander',
      numberOfResidents: aggregate[4],
      percentOfTotalResidents: Math.round(parseInt((aggregate[4] / aggregate[0]) * 100))
    },
    {
      name: 'White',
      numberOfResidents: aggregate[5],
      percentOfTotalResidents: Math.round(parseInt((aggregate[5] / aggregate[0]) * 100))
    },
    {
      name: 'Other',
      numberOfResidents: aggregate[6],
      percentOfTotalResidents: Math.round(parseInt((aggregate[6] / aggregate[0]) * 100))
    }
  ];
}
