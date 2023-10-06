export type TPriceSliderDefaultValues = {
  min: number;
  max: number;
};

export type TQueryArgs = {
  "text.en": string;
  fuzzy: boolean;
  filter: string[];
  limit: number;
  offset: number;
  sort?: string;
};

export type TSortValues = {
  method: string;
  key: string;
};

export type TCategories = {
  name: string;
  id: string;
};
