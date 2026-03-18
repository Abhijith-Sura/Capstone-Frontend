import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import * as styles from '../styles/common'

function RootLayout() {
  return (
    <div className={styles.pageBackground}>
      <Header />
      <div className={styles.pageWrapper}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout