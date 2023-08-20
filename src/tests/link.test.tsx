import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Link, MemoryRouter } from "react-router-dom";
import { Button } from "@mui/material";
import RouterPaths from "../router/routes";

test("Button renders with correct link", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Button
        component={Link}
        to={RouterPaths.Login}
        type="submit"
      >
        Already have an account? Login here
      </Button>
    </MemoryRouter>
  );

  const loginLink = getByText("Already have an account? Login here");
  expect(loginLink).toBeInTheDocument();

  expect(loginLink.closest("a")).toHaveAttribute("href", RouterPaths.Login);
});
