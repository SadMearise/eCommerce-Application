import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import RouterPaths from "../../router/routes";
import { ICatalogBreadcrumbsProps } from "./types";
import styles from "./CatalogBreadcrumbs.module.scss";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function CatalogBreadcrumbs({
  breadcrumbs,
  setCategoriesBreadcrumbs,
  setCurrentId,
}: ICatalogBreadcrumbsProps) {
  const removeBreadcrumbs = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = event.target as HTMLInputElement;

    for (let i = 0; i < breadcrumbs.length; i += 1) {
      if (breadcrumbs[i].id === target.id) {
        setCategoriesBreadcrumbs((prev) => prev.slice(0, i + 1));

        break;
      }
    }
  };

  return (
    <div
      role="presentation"
      onClick={handleClick}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          className={[styles.link, styles["link-default"]].join(" ")}
          color="inherit"
          to={RouterPaths.Catalog}
          component={RouterLink}
          onClick={(event) => {
            setCurrentId("");
            removeBreadcrumbs(event);
          }}
        >
          Catalog
        </Typography>
        {breadcrumbs.map((breadcrumb, index) => {
          if (index === breadcrumbs.length - 1) {
            return (
              <Typography
                key={breadcrumb.id}
                color="text.primary"
              >
                {breadcrumb.name}
              </Typography>
            );
          }

          return (
            <Typography
              className={styles.link}
              color="inherit"
              key={breadcrumb.id}
              id={breadcrumb.id}
              onClick={(event) => {
                const target = event.target as HTMLInputElement;

                setCurrentId(target.id);
                removeBreadcrumbs(event);
              }}
            >
              {breadcrumb.name}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
