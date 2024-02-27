export function getDaysOfWeek(dateOneDay: string) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateOneDay);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
}

export async function importSVG(iconName: string) {
    const { default: Icon } = await import(`../assets/weather/${iconName}.svg`);
    return Icon;
  }