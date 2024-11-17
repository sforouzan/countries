import { useEffect, useState } from "react";
import "./App.css";

import { Countries } from "./components/Countries";

function App() {
  const [originData, setOriginData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [continent, setContinent] = useState("all");
  const [subregion, setSubregion] = useState("all");
  const [isSort, setIsSort] = useState(false);
  const [onTop10Population, setOnTop10Population] = useState(false);
  const [onTop10Area, setOnTop10Area] = useState(false);

  const fetchData = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    const refinedData = data.map((c) => {
      if (c.borders) {
        const borderFullNames = c.borders.reduce((acc, b) => {
          const findedCountry = data.find((country) => {
            return country.cioc === b;
          });
          if (findedCountry) acc.push(findedCountry.name.common);
          return acc;
        }, []);
        c.borderFullNames = borderFullNames;
      } else {
        c.borderFullNames = [];
      }
      return c;
    });

    setOriginData(refinedData);
    setCountries(refinedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sort = (data) => {
    if (onTop10Population) {
      const top10Population = [...data]
        .sort((a, b) => {
          return b.population - a.population;
        })
        .slice(0, 10);
      return top10Population;
    } else if (onTop10Area) {
      const top10Area = [...data]
        .sort((a, b) => {
          return b.area - a.area;
        })
        .slice(0, 10);
      return top10Area;
    } else {
      if (isSort) {
        const sorted = [...data].sort((a, b) => {
          if (a.name.common > b.name.common) return 1;
          if (a.name.common < b.name.common) return -1;
          else return 0;
        });
        return sorted;
      } else {
        return data;
      }
    }
  };

  useEffect(() => {
    if (continent != "all") {
      return setCountries(
        [...originData].filter((c) => {
          return c.continents.includes(continent);
        }),
      );
    }
    if (subregion != "all") {
      return setCountries(
        [...originData].filter((c) => {
          return c.subregion === subregion;
        }),
      );
    }
    setCountries(originData);
  }, [continent, subregion, originData]);

  useEffect(() => {
    if (onTop10Population) return setOnTop10Area(false);
  }, [onTop10Population]);

  useEffect(() => {
    if (onTop10Area) return setOnTop10Population(false);
  }, [onTop10Area]);

  return (
    <main>
      <h1 className="page-title">Countries of the World</h1>
      <div className="filter-sort">
        <h3>Filter & Sort</h3>
        <div className="filters">
          <div>
            <p>By continent</p>
            <select
              onChange={(e) => {
                setContinent(e.target.value);
                setSubregion("all");
              }}
              value={continent}
            >
              <option value="all">All</option>
              <option value="Antarctica">Antarctica</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
            </select>
          </div>
          <div>
            <p>By subregion</p>
            <select
              onChange={(e) => {
                setSubregion(e.target.value);
                setContinent("all");
              }}
              value={subregion}
            >
              <option value="all">Choose region</option>
              <option value="Caribbean">Caribbean</option>
              <option value="Western Europe">Western Europe</option>
              <option value="Western Africa">Western Africa</option>
              <option value="Central Europe">Central Europe</option>
              <option value="Eastern Asia">Eastern Asia</option>
              <option value="Polynesia">Polynesia</option>
              <option value="Northern Africa">Northern Africa</option>
              <option value="Southern Europe">Southern Europe</option>
              <option value="South-Eastern Asia">South-Eastern Asia</option>
              <option value="Eastern Africa">Eastern Africa</option>
              <option value="Southern Africa">Southern Africa</option>
              <option value="North America">North America</option>
              <option value="Middle Africa">Middle Africa</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Southeast Europe">Southeast Europe</option>
              <option value="Western Asia">Western Asia</option>
              <option value="Northern Europe">Northern Europe</option>
              <option value="Melanesia">Melanesia</option>
              <option value="Central Asia">Central Asia</option>
              <option value="Southern Asia">Southern Asia</option>
              <option value="South America">South America</option>
              <option value="Australia and New Zealand">
                Australia and New Zealand
              </option>
              <option value="Central America">Central America</option>
              <option value="Eastern Europe">Eastern Europe</option>
            </select>
          </div>
          <div className="sort-option">
            <p>Sort</p>
            <div>
              <input
                type="checkbox"
                checked={isSort}
                onChange={() => {
                  setIsSort(!isSort);
                }}
                id="alpha-sort"
              />
              <label htmlFor="alpha-sort">A-Z</label>
            </div>
          </div>
          <div className="sort-option top10-sort">
            <p>Top 10</p>
            <div>
              <input
                type="checkbox"
                checked={onTop10Population}
                onChange={() => {
                  setOnTop10Population(!onTop10Population);
                }}
                id="top10pop-sort"
              />
              <label htmlFor="top10pop-sort">By population</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={onTop10Area}
                onChange={() => {
                  setOnTop10Area(!onTop10Area);
                }}
                id="top10area-sort"
              />
              <label htmlFor="top10area-sort">By area</label>
            </div>
          </div>
        </div>
      </div>
      <Countries countries={sort(countries)} />
    </main>
  );
}

export default App;
