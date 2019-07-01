import React from 'react'
import Link from 'next/link'

export default ({ pathname }) => {
  return (
    <nav className="navbar">
      <h1 className="srOnly">Menu</h1>
      <Link href="/about">
        <a className="link">About</a>
      </Link>
      <Link href="/works">
        <a className="link">Works</a>
      </Link>
    </nav>
  )
}
