"use client"
import React from 'react'

export default function About() {
  if (typeof window === 'undefined'){
    return null
} 
  return (
    <div>
        {/* app introduction with carasual */}
        <div>
          <h1>About</h1>
        </div>
        {/* how to use app */}
        <div>
        </div>
        {/* meet the developer */}
        <div>
        </div>
    </div>
  )
}
