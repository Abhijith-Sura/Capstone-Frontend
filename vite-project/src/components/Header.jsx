import React from 'react'
import { NavLink } from 'react-router-dom'
import * as styles from "../styles/common"

function Header() {
  return (
    <header className={styles.navbarClass}>
      <div className={styles.navContainerClass}>

        <p className={styles.navBrandClass}>LOGO</p>

        <nav>
          <ul className={styles.navLinksClass}>

            <li>
              <NavLink to="/" className={({ isActive }) =>
                isActive ? styles.navLinkActiveClass : styles.navLinkClass
              }>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/register" className={({ isActive }) =>
                isActive ? styles.navLinkActiveClass : styles.navLinkClass
              }>
                Register
              </NavLink>
            </li>

            <li>
              <NavLink to="/login" className={({ isActive }) =>
                isActive ? styles.navLinkActiveClass : styles.navLinkClass
              }>
                Login
              </NavLink>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  )
}

export default Header