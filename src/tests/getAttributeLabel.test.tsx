import { Attribute } from "@commercetools/platform-sdk/";
import getAttributeLabel from "../utils/getAttributeLabel";

test("The getAttributeLabel function returns the correct label", async () => {
  const attribute: Attribute = {
    name: "color",
    value: {
      key: "red",
      label: "red",
    },
  };
  const label = getAttributeLabel(attribute);
  expect(label).toBe("red");
});
