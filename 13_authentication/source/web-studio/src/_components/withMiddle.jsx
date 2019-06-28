import React from 'react'

import classNames from 'classnames/bind'
import _styles from './withMiddle.module.scss'
const cx = classNames.bind(_styles)

const withMiddle = (WrappedComponent, variables) => {
  return class extends React.Component {
    render() {
      const { styles } = variables || {}
      return (
        <div className={cx('table')} style={styles}>
          <div className={cx('table-cell')}>
            <WrappedComponent />
          </div>
        </div>
      )
    }
  }
}

export default withMiddle
