import { useState, useEffect } from "react";
interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  zip: number;
  birthdate: string;
  city: string;
  [key: string]: any;
}

type SortCriteria = string | ((a: User, b: User) => number);

export const useFormattedData = (initialData: User[]) => {
  const [data, setData] = useState<User[]>(initialData);
  const [formatted, setFormatted] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const search = (query: string) => {
    setSearchQuery(query);
  };

  const filter = (predicate: (user: User) => boolean) => {
    setData((prevData) => prevData.filter(predicate));
  };

  const sortBy = (criteria: SortCriteria) => {
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        if (typeof criteria === "string") {
          if (
            typeof a[criteria] === "number" &&
            typeof b[criteria] === "number"
          ) {
            return a[criteria] - b[criteria];
          } else {
            return ("" + a[criteria]).localeCompare(b[criteria]);
          }
        } else {
          return criteria(a, b);
        }
      })
    );
  };

  useEffect(() => {
    const filteredData = data.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFormatted(filteredData);
  }, [data, searchQuery]);

  return { formatted, sortBy, filter, search };
};
