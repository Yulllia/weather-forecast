import { getDaysOfWeek, importSVG, compareDates } from "../utils/utils";

describe("getDaysOfWeek", () => {
  test("returns the correct day of the week", () => {
    const dayOfWeek = getDaysOfWeek("2024-03-01T00:00:00Z");
    expect(dayOfWeek).toBe("Friday");
  });
});

describe("importSVG", () => {
  test("imports the correct SVG icon", async () => {
    const iconName = "cloudy";
    const Icon = await importSVG(iconName);
    expect(Icon).toBeDefined();
  });
});

describe("compareDates", () => {
  test("correctly compares two dates", () => {
    const dateA = "2024-03-01T00:00:00Z";
    const dateB = "2024-03-02T00:00:00Z";
    const result = compareDates(dateA, dateB);
    expect(result).toBeLessThan(0);
  });
});
