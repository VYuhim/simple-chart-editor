import React, { useState } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { SandboxChart } from 'src/components/SandboxChart/SandboxChart';
import { Menu } from 'src/components/Menu/Menu';

import styles from './App.module.scss';

export const App: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const menuOpenHandler = () => setMenuOpen(!isMenuOpen);

  return (
    <div className={styles.container}>
      <header className={classNames(styles.header, { [styles.headerShift]: isMenuOpen })}>
        <IconButton className={styles.menuButton} onClick={menuOpenHandler}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <h1 className={styles.title}>Simple chart editor</h1>
      </header>
      <Drawer
        open={isMenuOpen}
        anchor={'left'}
        variant={'persistent'}
        className={styles.menu}
        classes={{ paper: styles.menu }}
      >
        <Menu />
      </Drawer>
      <main className={classNames(styles.main, { [styles.mainShift]: isMenuOpen })}>
        <SandboxChart />
      </main>
    </div>
  );
};
