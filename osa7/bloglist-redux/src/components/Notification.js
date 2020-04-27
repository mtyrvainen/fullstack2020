import React from 'react'
import PropTypes from 'prop-types'

//Material UI
import { Alert } from '@material-ui/lab'

const Notification = ({ text, type }) => {
  if (!text) {
    return null
  }

  if (type === 'notification') {
    return (
      <div>
        <Alert severity="success">{text}</Alert>
      </div>
    )
  } else {
    return (
      <div>
        <Alert severity="error">{text}</Alert>
      </div>
    )
  }
}

Notification.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
}

export default Notification