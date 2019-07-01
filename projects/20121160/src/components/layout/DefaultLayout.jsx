import React from 'react'
import Wh from './Wh'
import Navbar from './Navbar'
import Contact from './Contact'
import ContentArea from './ContentArea'

const DefaultLayout = ({ pathname, children }) => {
  return (
    <div className="wrap">
      <Wh />
      <header id="pageHeader">
        <Navbar pathname={pathname} />
      </header>

      <div className="container">
        <div className="row">
          <Contact />
          <main id="main">
            <ContentArea>{children}</ContentArea>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
