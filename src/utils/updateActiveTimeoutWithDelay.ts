import React from "react";

const updateActiveTimeoutWithDelay = (
  isActiveTimeout: boolean,
  setActionError: React.Dispatch<React.SetStateAction<string>>,
  setIsActiveTimeout: React.Dispatch<React.SetStateAction<boolean>>,
  delay: number
) => {
  if (!isActiveTimeout) {
    setTimeout(() => {
      setActionError("");
      setIsActiveTimeout(false);
    }, delay);
  }

  setIsActiveTimeout(true);
};

export default updateActiveTimeoutWithDelay;
