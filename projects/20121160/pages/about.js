import React from 'react'
import Head from 'next/head'
import DefaultLayout from '../src/components/layout/DefaultLayout'

function AboutPage() {
  return (
    <>
      <DefaultLayout pathname="/">
        <Head>
          <title>About Roh Woohyeon</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
      </DefaultLayout>
    </>
  )
}

export default AboutPage
