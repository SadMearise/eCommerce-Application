import { useState } from "react";

type CheckboxState = {
  [key: string]: boolean;
  shipping: boolean;
  billing: boolean;
  defaultShipping: boolean;
  defaultBilling: boolean;
};

type CheckboxActions = {
  handleCheckboxChange: (name: string) => void;
  resetCheckboxes: () => void;
};

export default function useCheckboxesState(): [CheckboxState, CheckboxActions] {
  const [checkboxesState, setCheckboxesState] = useState<CheckboxState>({
    shipping: false,
    billing: false,
    defaultShipping: false,
    defaultBilling: false,
  });

  const handleCheckboxChange = (name: string): void => {
    setCheckboxesState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const resetCheckboxes = (): void => {
    setCheckboxesState({
      shipping: false,
      billing: false,
      defaultShipping: false,
      defaultBilling: false,
    });
  };

  const actions: CheckboxActions = {
    handleCheckboxChange,
    resetCheckboxes,
  };

  return [checkboxesState, actions];
}
