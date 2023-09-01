import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { TSortValues } from "../../pages/catalog/types";
import { TSortingOptions } from "./types";

const options: TSortingOptions[] = [
  { label: "Default", method: "asc", key: "default" },
  { label: "Price-low to high", method: "asc", key: "price" },
  { label: "Price-high to low", method: "desc", key: "price" },
  { label: "Name-A to Z", method: "asc", key: "name" },
  { label: "Name-Z to A", method: "desc", key: "name" },
];

export default function CatalogSortingDopdownMenu({
  setSortValues,
}: {
  setSortValues: React.Dispatch<React.SetStateAction<TSortValues>>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number, key: string, method: string) => {
    setSortValues({ key, method });
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: "background.paper" }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Sort by"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Sort by"
            secondary={options[selectedIndex].label}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.label}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index, option.key, option.method)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
