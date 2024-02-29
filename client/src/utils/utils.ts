export function getDaysOfWeek(dateOneDay: string) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateOneDay);
  const dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
}

export async function importSVG(iconName: string) {
  const { default: Icon } = await import(`../assets/weather/${iconName}.svg`);
  return Icon;
}

export const compareDates = (dateA: string, dateB: string) => {
  if (dateA && dateB) {
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  } else if (dateA) {
    return -1;
  } else if (dateB) {
    return 1;
  } else {
    return 0;
  }
};

export const mockTripList = [
  {
    _id: "65de3736f215d7bad0b3a065",
    city: "London",
    image:
      "https://media.istockphoto.com/id/1294454411/photo/london-symbols-with-...",
    endDate: "2024-03-02T00:00:00.000+00:00",
    startDate: "2024-02-29T00:00:00.000+00:00",
    __v: 0,
    googleId: "107709627174640587543",
  },
  {
    _id: "65de3758f215d7bad0b3a069",
    city: "Kyiv",
    image: "https://turpoisk.ua/images/blog/kyiv/kyiv-maidan-nezalezhnosti.jpg",
    endDate: "2024-03-02T00:00:00.000+00:00",
    startDate: "2024-02-29T00:00:00.000+00:00",
    __v: 0,
    defaultValue: "static",
  },
];

export const card = {
  _id: "65de3758f215d7bad0b3a069",
  city: "Kyiv",
  image: "https://turpoisk.ua/images/blog/kyiv/kyiv-maidan-nezalezhnosti.jpg",
  endDate: "2024-03-02T00:00:00.000+00:00",
  startDate: "2024-02-29T00:00:00.000+00:00",
  __v: 0,
  defaultValue: "static",
};
export const weekForeCast = [
  { tempmax: 21, tempmin: 23, temp: 21, datetime: "2024-02-28", icon: "rain" },
  {
    tempmax: 24,
    tempmin: 5,
    temp: 22,
    datetime: "2024-02-29",
    icon: "cloudy",
  },
];

export const mockTodayForeCast = {
  tempmax: 21,
  tempmin: 23,
  temp: 21,
  datetime: "2024-02-28",
  icon: "rain",
};
