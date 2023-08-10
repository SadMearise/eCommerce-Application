import getApiRoot from "../services/BuildClient";

test("Commercetools SDK test", async () => {
  const apiRoot = getApiRoot();
  const categories = await apiRoot.categories().get().execute();
  expect(categories.body.count).toBeGreaterThan(0);
});
