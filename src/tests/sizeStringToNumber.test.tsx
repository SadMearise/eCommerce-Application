import { ProductVariant } from "@commercetools/platform-sdk/";
import sizeStringToNumber from "../utils/sizeStringToNumber";

test("The sizeStringToNumber function returns the correct size number", async () => {
  const variant: ProductVariant = {
    id: 2,
    sku: "W-TS-GRAY-M",
    key: "w-ts-gray-medium",
    prices: [
      {
        id: "bbfbe6dd-8cc0-410c-84c2-5179d2655aea",
        value: {
          type: "centPrecision",
          currencyCode: "EUR",
          centAmount: 2000,
          fractionDigits: 2,
        },
        discounted: {
          value: {
            type: "centPrecision",
            currencyCode: "EUR",
            centAmount: 1800,
            fractionDigits: 2,
          },
          discount: {
            typeId: "product-discount",
            id: "60365b07-7dee-47c3-ac7c-5851bf05c7e1",
          },
        },
      },
    ],
    images: [
      {
        url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-t-shirt-gray-01-J-AYdu7l.jpg",
        label: "w-t-shirt-gray-01",
        dimensions: {
          w: 500,
          h: 651,
        },
      },
      {
        url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-t-shirt-gray-02-DXgzF7JX.jpg",
        label: "w-t-shirt-gray-02",
        dimensions: {
          w: 500,
          h: 602,
        },
      },
    ],
    attributes: [
      {
        name: "brand",
        value: "Kratkoe",
      },
      {
        name: "color",
        value: "gray",
      },
      {
        name: "size",
        value: "m",
      },
    ],
    assets: [],
  };
  const size = sizeStringToNumber(variant);
  expect(size).toBe(2);
});
