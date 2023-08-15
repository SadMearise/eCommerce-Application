export function validateEmail(value: string): string | undefined {
  if (!value) {
    return "Required";
  }
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (!emailRegex.test(value)) {
    return "Improperly formatted email address";
  }
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) {
    return "Required";
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/;
  if (!passwordRegex.test(value)) {
    return "Weak password";
  }
  return undefined;
}
