import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import RouterPaths from "../../router/routes";
import { ICatalogBreadcrumbsProps } from "./types";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function CatalogBreadcrumbs({
  breadcrumbs,
  setCategoriesBreadcrumbs,
  setCurrentId,
}: ICatalogBreadcrumbsProps) {
  const removeBreadcrumbs = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
        <Link
          underline="hover"
          color="inherit"
          to={RouterPaths.Catalog}
          component={RouterLink}
          onClick={(event) => {
            setCurrentId("");
            removeBreadcrumbs(event);
          }}
        >
          Catalog
        </Link>
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
            <Link
              key={breadcrumb.id}
              underline="hover"
              color="inherit"
              to={`category/${breadcrumb.name}`}
              id={breadcrumb.id}
              component={RouterLink}
              onClick={(event) => {
                const target = event.target as HTMLInputElement;

                setCurrentId(target.id);
                removeBreadcrumbs(event);
              }}
            >
              {breadcrumb.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
