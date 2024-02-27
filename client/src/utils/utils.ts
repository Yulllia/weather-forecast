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
