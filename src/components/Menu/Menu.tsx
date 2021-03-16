import {
  IconButton,
  ListItemIcon,
  Menu as MuiMenu,
  MenuItem,
} from '@material-ui/core';
import {
  AddCircleOutline,
  Menu as MenuIcon,
  Settings,
  ViewList,
} from '@material-ui/icons';
import Add from '@material-ui/icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

export default function Menu() {
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>(
    undefined
  );
  return (
    <div>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <MuiMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClick={() => setAnchorEl(undefined)}
      >
        <MenuItem>
          <ListItemIcon className={styles.listItemIcon}>
            <Add />
          </ListItemIcon>
          <Link className={styles.link} to="/add-feed">
            Add feed
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon className={styles.listItemIcon}>
            <AddCircleOutline />
          </ListItemIcon>
          <Link className={styles.link} to="/add-feed-batch">
            Add a batch of feeds
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon className={styles.listItemIcon}>
            <ViewList />
          </ListItemIcon>
          <Link className={styles.link} to="/">
            Unread
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon className={styles.listItemIcon}>
            <Settings />
          </ListItemIcon>
          <Link className={styles.link} to="/settings">
            Settings
          </Link>
        </MenuItem>
      </MuiMenu>
    </div>
  );
}
