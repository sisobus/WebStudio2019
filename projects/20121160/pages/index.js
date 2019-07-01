import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import DefaultLayout from '../src/components/layout/DefaultLayout'
import CommitChart from '../src/components/commit/CommitChart'
// /repos/:owner/:repo/stats/contributors

const OWNER = 'whroh'
export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commits: []
    }
  }

  componentDidMount() {
    const commitData = axios
      .get('https://apis.github.com/repos/whroh/documented/commits')
      .then(({ data }) => {
        return data.reduce((acc, { commit }) => {
          const author = commit.author

          const name = author.name

          const date = author.date

          const message = commit.message

          acc[date] = {
            name,

            message
          }

          return acc
        }, {})
      })
      .then(commits => this.setState({ commits }))
  }

  render() {
    return (
      <>
        <Head>
          <title>Roh Woohyeon®</title>
        </Head>
        <DefaultLayout pathname="/">
          {JSON.stringify(this.state.commits, null, 2)}
        </DefaultLayout>
      </>
    )
  }
}
