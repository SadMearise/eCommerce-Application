export function validateEmail(value: string) {
  let error;
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (!value) {
    error = "Required";
  } else if (!re.test(value)) {
    error = "Improperly formatted email address";
  }
  return error;
}

export function validatePassword(value: string) {
  let error;
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/;

  if (!value) {
    error = "Required";
  } else if (!re.test(value)) {
    error = "Weak password";
  }
  return error;
}
