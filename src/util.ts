export const numOfCoins = 21;
export const arr = Array.from(Array(numOfCoins).keys());
export const set = new Set(arr);


export type coinMeta = {
    id: number;
    variable: boolean
}
export const coinArray: coinMeta[] = Array(21)
  .fill(null)
  .map((_, index) => ({ id: index, variable: false }));