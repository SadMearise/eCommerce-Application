import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import styles from "./CatalogCategories.module.scss";
import { ICatalogBreadcrumbsProps } from "./types";
import locale from "../../settings";

export default function CatalogCategories({
  setCategoriesBreadcrumbs,
  categories,
  setCategories,
  currentId,
  setCurrentId,
  apiRoot,
}: ICatalogBreadcrumbsProps) {
  const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = event.target as HTMLInputElement;

    const category = target.closest("button");

    if (!category) {
      return;
    }

    setCurrentId(category.id);
    setCategoriesBreadcrumbs((prev) => [...prev, { name: category.name, id: category.id }]);
  };

  useEffect(() => {
    apiRoot
      .categories()
      .get({ queryArgs: { expand: "parent" } })
      .execute()
      .then((response) => {
        setCategories([]);
        response.body.results.forEach((result) => {
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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  return (
    <Box
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
          >
            <Link
              onClick={(event) => handleButtonClick(event)}
              className={styles.link}
              to={`category/${category.name}`}
            >
              {category.name}
            </Link>
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
