import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notificationText = props.notification.text
  let style

  if (notificationText !== '') {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  } else {
    style = {
      display: 'none'
    }
  }
  return (
    <div style={style}>
      {notificationText}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification