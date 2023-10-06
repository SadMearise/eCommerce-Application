import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import styles from "./CatalogCategories.module.scss";
import { ICatalogBreadcrumbsProps } from "./types";
import locale from "../../settings";
import getCategories from "../../services/categories.service";

export default function CatalogCategories({
  setCategoriesBreadcrumbs,
  categories,
  setCategories,
  currentId,
  setCurrentId,
  setCurrentPage,
}: ICatalogBreadcrumbsProps) {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.target as HTMLInputElement;

    const category = target.closest("button");

    if (!category) {
      return;
    }

    setCurrentPage(1);
    setCurrentId(category.id);
    setCategoriesBreadcrumbs((prev) => [...prev, { name: category.name, id: category.id }]);
  };

  useEffect(() => {
    const updateCategories = async () => {
      const categoriesResp = await getCategories({ queryArgs: { expand: "parent" } });
      setCategories([]);

      categoriesResp.results.forEach((result) => {
        if (!currentId) {
          if (!result.parent) {
            setCategories((prev) => [...prev, { name: result.name[locale], id: result.id }]);
          }
        } else if (currentId) {
          if (result.parent?.id === currentId) {
            setCategories((prev) => [...prev, { name: result.name[locale], id: result.id }]);
          }
        }
      });
    };

    updateCategories();
  }, [currentId, setCategories]);

  return (
    <Box
      className={styles.wrapper}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        className={styles["button-group"]}
        variant="text"
        aria-label="text button group"
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            name={category.name}
            id={category.id}
            onClick={(event) => handleButtonClick(event)}
          >
            {category.name}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
