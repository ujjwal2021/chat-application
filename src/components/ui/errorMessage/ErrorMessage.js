import React from 'react'
import "./error.css"

const ErrorMessage = ({error }) => {
  return (
    <div className="error">{error?.msg || "Unidentified error occured"}</div>
  )
}

export default ErrorMessage