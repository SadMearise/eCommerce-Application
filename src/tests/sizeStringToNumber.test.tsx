import { ProductVariant } from "@commercetools/platform-sdk/";
import sizeStringToNumber from "../utils/sizeStringToNumber";

test("The sizeStringToNumber function returns the correct size number", async () => {
  const variant: ProductVariant = {
    attributes: [
      { name: "color", value: { key: "black", label: "black" } },
      { name: "size", value: { key: "m", label: "M" } },
      { name: "brand", value: { key: "sadees", label: "Sadees" } },
    ],
    assets: [],
    images: [
      {
        url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-drs-black-01-OPk3hZsf.jpg",
        label: "w-drs-black-medium-01",
        dimensions: { w: 500, h: 602 },
      },
      {
        url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-drs-black-02-fGEH5wb7.jpg",
        label: "w-drs-black-medium-02",
        dimensions: { w: 500, h: 603 },
      },
      {
        url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-drs-black-03-jlw2VPpP.jpg",
        label: "w-drs-black-medium-03",
        dimensions: { w: 500, h: 598 },
      },
    ],
    prices: [
      {
        id: "703389fe-75b8-4006-898b-b4a236f8ab04",
        value: { type: "centPrecision", currencyCode: "EUR", centAmount: 2990, fractionDigits: 2 },
      },
    ],
    key: "w-drs-black-medium",
    sku: "W-DRS-BLACK-M",
    id: 2,
  };
  const size = sizeStringToNumber(variant);
  expect(size).toBe(2);
});
