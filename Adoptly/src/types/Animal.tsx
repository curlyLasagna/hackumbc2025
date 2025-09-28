export type Animal = {
  id: number | string;
  name: string;
  age: string;
  distance: number | string;
  description: string;
  url: string;
  photos: { medium?: string; large?: string; full?: string }[];
}
