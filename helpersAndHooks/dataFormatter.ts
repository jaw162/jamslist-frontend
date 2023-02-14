import type { CountyApiResponse } from "..";

export function byCountry(arr: CountyApiResponse[]) {
  let format: {
    [key: string]: CountyApiResponse[];
  } = {};

  arr.forEach(county => {
    const { country } = county;

    format[country]
      ? format[country].push(county)
      : (format[country] = [county]);
  });

  for (const country in format) {
    format[country].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  return format;
}

export type byCountryReturnType = ReturnType<typeof byCountry>;
