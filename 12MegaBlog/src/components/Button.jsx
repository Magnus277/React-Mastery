import React from 'react'

function Button({
  children, // the children is the text provided to the button here
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props // whatever properties given will be taken
}) {
  return (
    <button className= {`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>  
  )
}

export default Button
