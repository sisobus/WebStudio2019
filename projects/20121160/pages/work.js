import React from 'react'
import fetch from 'isomorphic-fetch'
import DefaultLayout from '../src/components/layout/DefaultLayout'
import MarkdownRenderer from '../src/components/markdown/MarkdownRenderer'
const PORT = 3000

export default class WorkPage extends React.Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps(ctx) {
    const { workId } = ctx.query
    const hostname =
      typeof window === 'undefined'
        ? `http://localhost:${PORT}`
        : window.location.origin
    const res = await fetch(`${hostname}/static/works/${workId}.md`)
    const source = await res.text()

    return {
      source
    }
  }

  render() {
    return (
      <DefaultLayout>
        <MarkdownRenderer source={this.props.source} />
      </DefaultLayout>
    )
  }
}
