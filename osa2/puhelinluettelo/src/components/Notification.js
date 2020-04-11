import React from 'react'

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

export default Notification