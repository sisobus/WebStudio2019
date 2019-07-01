import React from 'react'
import renderMarkdown from '../../lib/renderMarkdown'

export default ({ source }) => {
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(source) }}
    />
  )
}
