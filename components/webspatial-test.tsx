'use client'

import { useEffect, useState } from 'react'

export default function WebSpatialTest() {
  const [isSpatial, setIsSpatial] = useState(false)

  useEffect(() => {
    // Check if we're in WebSpatial mode
    const checkSpatial = () => {
      const isWebSpatial = typeof window !== 'undefined' && 
        (window.location.pathname.includes('/webspatial/') || 
         process.env.XR_ENV === 'avp')
      setIsSpatial(isWebSpatial)
    }
    
    checkSpatial()
  }, [])

  if (!isSpatial) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg m-4">
        <p className="text-white">Standard Web Mode</p>
        <p className="text-sm text-gray-400">
          Visit http://localhost:3000/webspatial/avp to see spatial mode
        </p>
      </div>
    )
  }

  return (
    <div className="p-8 bg-purple-900/50 rounded-xl m-4 border border-purple-500">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">
        🚀 WebSpatial Mode Active!
      </h2>
      <p className="text-white">
        This content is now running in WebSpatial mode and can be spatialized!
      </p>
    </div>
  )
}