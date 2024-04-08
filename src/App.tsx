/*
	Potrebno je napraviti React hook za filtriranje, sortiranje i pretrazivanje podataka.
	Hook treba da prima array objekata odredjene strukture. U ovom slucaju koristimo array user-a iz users.json fajla.
	Hook treba da vraca formatirane podatke kao i funkcije za sortiranje, pretrazivanje i filtriranje.
  Omoguciti ulancano pozivanje implementiranih funkcija.
	
	Funkcija za pretrazivanje prima string i pretrazuje sve propertije na user objektu.
	Funkcija za filtriranje prima funkciju koju poziva za svaki entry u array-u.
	Funkcija za sortiranje moze da primi string (property name) po kojem treba da odradi standardni sort
	ili da primi funkciju za sortiranje (slicno kao i filter funkcija).

	Za zadatak kreirati poseban projekat gdje ce sadrzaj App.tsx fajla biti ovaj fajl.
	
	Koristiti React i TypeScript.

	Puno srece ;-)
*/

import { useEffect } from "react";
import { useFormattedData } from "./useFormattedData";
import users from "./users.json";
import "./App.css";

const App = () => {
  const { formatted, sortBy, filter, search } = useFormattedData(users);

  useEffect(() => {
    search("");
    filter(({ zip }) => zip > 970);
    sortBy("gender");
  }, []);

  return (
    <ul className="user-list">
      {formatted.map(
        ({ id, firstName, lastName, birthdate, zip, gender, city }) => (
          <li key={id} className="user-item">
            <div className="user-name">
              {firstName} {lastName}
            </div>
            <div className="user-birthdate">{birthdate}</div>
            <div className="user-birthdate">{zip}</div>
            <div className="user-birthdate">{gender}</div>
            <div className="user-birthdate">{city}</div>
          </li>
        )
      )}
    </ul>
  );
};

export default App;
