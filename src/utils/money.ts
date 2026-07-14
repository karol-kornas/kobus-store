export const money = {
  add: (...values: number[]) =>
    Math.round(values.reduce((sum, value) => sum + value, 0) * 100) / 100,

  equals: (a: number, b: number) =>
    Math.round(a * 100) === Math.round(b * 100),

  greater: (a: number, b: number) =>
    Math.round(a * 100) > Math.round(b * 100),
};
