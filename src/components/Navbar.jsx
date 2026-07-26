import React from 'react';
import { styles } from '../styles';

const Navbar = ({ onHomeClick, onFilmsClick, onTvClick, onSearchClick, onProfileClick }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={onHomeClick}>NERDOUT</div>
      <div style={styles.navLinks}>
        <span style={styles.navLink} onClick={onFilmsClick}>Films</span>
        <span style={styles.navLink} onClick={onTvClick}>TV Shows</span>
        {/* Кнопка Search теперь ведет на нашу новую страницу */}
        <span style={styles.navLink} onClick={onSearchClick}>Search</span>
        <span style={styles.navLink} onClick={onProfileClick}>Account</span>
      </div>
    </nav>
  );
};

export default Navbar;