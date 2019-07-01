import React from 'react'
import Link from 'next/link'
import Tagline from './Tagline'

export default () => (
  <div className="contactSection">
    <div className="info">
      <Link href="mailto:roh.woohyeon@gmail.com">
        <a>roh.woohyeon@gmail.com</a>
      </Link>
      <p className="text">Seoul, Korea</p>
    </div>
    <div className="contact">
      <ul className="links">
        <li>
          <Link href="https://github.com/whroh">
            <a target="_blank">Github →</a>
          </Link>
        </li>
        <li>
          <Link href="https://www.youtube.com/channel/UCFDbz39kFPvU0AUpgHx4ICw">
            <a target="_blank">Youtube →</a>
          </Link>
        </li>
      </ul>
      <Tagline />
    </div>
    <p className="year">
      2016/2019 <sup>®</sup>
    </p>
  </div>
)
