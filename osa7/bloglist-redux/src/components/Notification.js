import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ text, type }) => {
  if (!text) {
    return null
  }

  return (
    <div className={type}>
      {text}
    </div>
  )
}

Notification.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
}

export default Notification