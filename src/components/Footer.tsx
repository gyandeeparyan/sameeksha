import React from 'react'

const Footer = () => {
  if (typeof window === 'undefined'){
    return null
}
  return (
    <div>
    <footer className='text-center p-4 md:p-3 bg-white dark:bg-mainDark dark:text-white'>
    darkest of nights , account for the brightest of  morning hero
  </footer>
  </div>
  )
}

export default Footer