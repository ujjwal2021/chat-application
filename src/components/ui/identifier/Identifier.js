import React from 'react'
import "./identifier.css"

const Identifier = ({title1="chat-app", title2}) => {
  return (
        <span className='identifier-title'><span className='identifier-title1'>{ title1}:<span className='identifier-title2'>~{title2} </span></span>$ &nbsp;</span>
  )
}

export default Identifier