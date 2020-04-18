import React, { useState, useImperativeHandle } from 'react'

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

    const blogElement = (showCancel) => {
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
                {props.children} {blogElement(props.showCancel)}
            </div>
        </>
        
    )
})

export default Togglable