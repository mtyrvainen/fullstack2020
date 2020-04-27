import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

//Material UI
import { Button } from '@material-ui/core'

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
        <Button variant="outlined" color="secondary" onClick={toggleVisibility}>Cancel</Button>
      )
    }
  }

  return (
    <div>
      <div className="initialToggleContent" style={hideWhenVisible}>
        <Button variant="outlined" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div className="alternativeToggleContent" style={showWhenVisible}>
        {props.children} {showCancelButton(props.showCancel)}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  showCancel: PropTypes.bool.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable