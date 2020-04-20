import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const showCancelButton = (showCancel) => {
    if (showCancel) {
      return (
        <button onClick={toggleVisibility}>Cancel</button>
      )
    }
  }

  return (
    <>
      <div style={hideWhenVisible}>
        {props.tempText}<button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children} {showCancelButton(props.showCancel)}
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  showCancel: PropTypes.bool.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable