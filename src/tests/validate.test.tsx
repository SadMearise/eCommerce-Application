import { addressValidationSchema, postalCodeValidation } from "../utils/registerValidationSchema";

describe("Postal Code Validation", () => {
  it("should validate Russian postal code", async () => {
    const schema = postalCodeValidation.Russia;
    expect(await schema.isValid("123456")).toBe(true);
    expect(await schema.isValid("12345")).toBe(false);
  });

  it("should validate Georgian postal code", async () => {
    const schema = postalCodeValidation.Georgia;
    expect(await schema.isValid("1234")).toBe(true);
    expect(await schema.isValid("12345")).toBe(false);
  });
});

describe("Address Validation Schema", () => {
  it("should validate valid data", async () => {
    const validData = {
      country: "Russia",
      city: "Moscow",
      streetName: "MainStreet",
      streetNumber: "123",
      postalCode: "123456",
    };

    const isValid = await addressValidationSchema.isValid(validData);
    expect(isValid).toBe(true);
  });

  it("should not validate invalid data", async () => {
    const invalidData = {
      country: "USA",
      city: "123",
      streetName: "Main Street",
      streetNumber: "abc",
      postalCode: "123",
    };

    const isValid = await addressValidationSchema.isValid(invalidData);
    expect(isValid).toBe(false);
  });

  it("should show validation error", async () => {
    const invalidData = {
      country: "USA",
      city: "123",
      streetName: "Main Street",
      streetNumber: "abc",
      postalCode: "123",
    };

    const isValid = await addressValidationSchema.isValid(invalidData);
    expect(isValid).toBe(false);
  });
});
