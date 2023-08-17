export function validateEmail(value: string): string | undefined {
  if (!value) {
    return "Required";
  }
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (!emailRegex.test(value)) {
    return "Improperly formatted email address(e.g., user@example.com), mustn't contain whitespace)";
  }
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) {
    return "Required";
  }
  const passwordRegex = /^(\S)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])(\S).{8,}/;
  if (!passwordRegex.test(value)) {
    return (
      "Weak password: mustn't contain leading or trailing whitespace, must be at least 8 characters, " +
      "contain uppercase letter (A-Z), lowercase letter (a-z), digit (0-9), special character (e.g., !@#$%^&*)."
    );
  }
  if (value.trim() !== value) {
    return "Mustn't contain leading or trailing whitespace";
  }
  return undefined;
}
