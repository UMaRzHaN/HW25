export const fetchData = async () => {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s");
    const json = await response.json();
    return json;
  };