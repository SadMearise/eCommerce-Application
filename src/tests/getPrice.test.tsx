import { ProductProjection } from "@commercetools/platform-sdk/";
import getPrice from "../utils/getPrice";
import Prices from "../pages/product/types";

test("The getPrice function returns the correct price value", async () => {
  const product: ProductProjection = {
    id: "213eda80-7abb-49cc-8d3f-d6d58532f277",
    version: 148,
    productType: {
      typeId: "product-type",
      id: "bc5ff7c0-79f8-4b78-a8e6-cb101892faf9",
    },
    name: {
      en: "Women's Gray T-shirt",
    },
    description: {
      en: "Classic casual t-shirt for women on the move.\nRound neck, half sleeves Women's Grey T-shirt. 100% cotton, preshrunk. Regular fit with just the right balance of style and comfort. Looks really cool.",
    },
    categories: [
      {
        typeId: "category",
        id: "ab2b90bc-c8bd-4ffa-9cb4-3dd3fbdfbfc9",
      },
      {
        typeId: "category",
        id: "ba14b538-5f50-40e2-9a45-e715c3de667b",
      },
    ],
    categoryOrderHints: {},
    slug: {
      en: "grey-t-shirt",
    },
    metaTitle: {
      en: "",
      ru: "",
    },
    metaDescription: {
      en: "",
      ru: "",
    },
    masterVariant: {
      id: 1,
      sku: "W-TS-GRAY-S",
      key: "w-ts-gray-small",
      prices: [
        {
          id: "20ecb59f-54e7-48a0-80fa-5bdf510fa45f",
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
          url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-t-shirt-gray-01-WQJAa_PS.jpg",
          label: "w-t-shirt-gray-01",
          dimensions: {
            w: 500,
            h: 651,
          },
        },
        {
          url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-t-shirt-gray-02-YIYG7Fwb.jpg",
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
          name: "size",
          value: "s",
        },
        {
          name: "color",
          value: "gray",
        },
      ],
      assets: [],
    },
    variants: [
      {
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
      },
      {
        id: 3,
        sku: "W-TS-GRAY-L",
        key: "w-ts-gray-large",
        prices: [
          {
            id: "09605fea-59d6-4169-8683-917b51f7784f",
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
            url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-t-shirt-gray-01-kaus1SBu.jpg",
            label: "w-t-shirt-gray-01",
            dimensions: {
              w: 500,
              h: 651,
            },
          },
          {
            url: "https://9cc648903f46797d26b4-5645e54697106a948ca0e20f3486fc59.ssl.cf3.rackcdn.com/w-t-shirt-gray-02-tZZrLYWe.jpg",
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
            name: "size",
            value: "l",
          },
          {
            name: "color",
            value: "gray",
          },
        ],
        assets: [],
      },
    ],
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: "women-t-shirt-gray",
    priceMode: "Embedded",
    createdAt: "2023-08-22T07:25:39.278Z",
    lastModifiedAt: "2023-08-30T18:59:16.217Z",
  };
  const type: Prices = Prices.Current;

  const price = getPrice(product, type);
  expect(price).toBe("€18.00");
});
