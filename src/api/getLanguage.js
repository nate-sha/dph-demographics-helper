import objToArray from '../Utils/objToArray';
import { languageVariables } from './languageVariables';
export async function getLanguage(state, place) {
  // variables to use in the API call
  const languageVars = languageVariables.map((item) => item.variable);
  // Group Name: B04006. Ancestry
  const { id: stateId } = state;
  const placeIds = await objToArray(place);
  const response = await fetch(
    `https://api.census.gov/data/2015/acs/acs5?get=${languageVars}&for=place:${placeIds}&in=state:${stateId}`
  ).then((response) => response.json());
  // Loop through the index and sum up the total population, the item is the header
  const language = await response.reduce((acc, item, index) => {
    if (index === 0) {
      return acc;
    }
    // Loop through the languageVariables and add the values to the acc
    languageVariables.forEach((languageVariable, i) => {
      // If the acc has the language, add the value to it
      if (acc[languageVariable.label]) {
        acc[languageVariable.label] += parseInt(item[i], 10);
      } else {
        // If the acc doesn't have the language, add it and set the value
        acc[languageVariable.label] = parseInt(item[i], 10);
      }
    });
    return acc;
  }, {});

  // Map the language array to an object
  const languageObj = Object.keys(language).map((key) => {
    return {
      label: key,
      numberOfResidents: language[key],
      percentOfTotalResidents: Math.round((language[key] / language['Total']) * 100)
    };
  });
  // Remove the total from the array
  languageObj.shift();
  // Sort the array by the number of residents
  languageObj.sort((a, b) => b.numberOfResidents - a.numberOfResidents);

  return languageObj;
}
