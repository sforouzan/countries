export const Country = ({ country }) => {
  const lng = country.languages ? Object.values(country.languages) : [];
  const curr = country.currencies;
  const currKeys = Object.keys(curr ?? {});
  const currStringArr = currKeys.reduce((acc, key) => {
    acc.push(`${curr[key].name}(${curr[key].symbol})`);
    return acc;
  }, []);

  return (
    <div className="country">
      <div className="title">
        <img src={country.flags.svg} alt={country.name.official} />
        <span>{country.name.common}</span>
      </div>
      <div className="fields">
        <p className="field">
          <span>Official name:</span>
          <span>{country.name.official}</span>
        </p>

        <p className="field">
          <span>Caspanital:</span>
          <span>{country.capital}</span>
        </p>

        <p className="field">
          <span>Population:</span>
          <span>{country.population.toLocaleString()}</span>
        </p>

        <p className="field">
          <span>Languages:</span>
          <span>{lng.join(",")}</span>
        </p>

        <p className="field">
          <span>Currency:</span>
          <span className="field-items">
            {currStringArr.map((curr) => (
              <span key={curr}>{curr}</span>
            ))}
          </span>
        </p>

        <p className="field">
          <span>
            Area (mi<sup>2</sup>):
          </span>
          <span>{country.area.toLocaleString()}</span>
        </p>

        <p className="field">
          <span>Subregion:</span>
          <span>{country.subregion}</span>
        </p>

        <p className="field">
          <span>Continents:</span>
          <span>{country.continents}</span>
        </p>

        <p className="field">
          <span>Borders:</span>
          <span className="field-items">
            {country.borderFullNames.map((name) => (
              <span>{name}</span>
            ))}
          </span>
        </p>

        <p>
          <a href={country.maps.googleMaps} target="_blank">
            Show on Google Maps
          </a>
        </p>
      </div>
    </div>
  );
};
