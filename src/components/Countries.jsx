import { Country } from "./Country";

export const Countries = ({ countries }) => {
  return (
    <div className="countries">
      {countries.map((country) => {
        return <Country key={country.name.official} country={country} />;
      })}
    </div>
  );
};
