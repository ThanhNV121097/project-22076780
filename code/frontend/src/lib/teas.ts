/** A blend as the pages read it, and a pot at the table. */
export interface Tea {
  id: string;
  name: string;
  english: string;
  note: string;
  leaf: string;
  brewing: string;
  image: string;
  scene: string;
  price_100: number;
  price_250: number;
}

export interface Pot {
  id: string;
  name: string;
  note: string;
  price: number;
}

export interface Photograph {
  id: string;
  caption: string;
  image: string;
}

export interface Said {
  id: string;
  quote: string;
  who: string;
}

export interface Chapter {
  id: string;
  heading: string;
  body: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
}

/** The lowest price in a list, for "a pot from …". */
export function lowest(prices: readonly number[]): number | undefined {
  return prices.length ? Math.min(...prices) : undefined;
}
