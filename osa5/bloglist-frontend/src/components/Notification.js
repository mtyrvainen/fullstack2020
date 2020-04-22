import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ text, type }) => {
  if (text === null) {
    return null
  }

  return (
    <div className={type}>
      {text}
    </div>
  )
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification