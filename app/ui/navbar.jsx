import React from 'react';
import styles from './Navbar.module.css'; // Importing the CSS module
import logo from './assets/Icon.png'; // Make sure the icon has a transparent background
import Image from 'next/image'; // Importing Next.js Image component

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Image
          className={styles.logo}
          src={logo} // Using the imported image
          alt="Shell Logo"
          height={50} // Adjust the height as needed
          width={50}  // Adjust the width as needed
        />
        <span className={styles.logoText}>ShellFi</span>
      </div>

      <ul className={styles.navbarMenu}>
        <li className={styles.navbarItem}>Dashboard</li>
      </ul>
      
      <div className={styles.navbarMenu}>
        <div className={styles.iconItem}>
          {/* Notifications or icons can be added here */}
        </div>
        
        <div className={styles.userProfile}>
          <span className={styles.navbarItem}>Accounts</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;