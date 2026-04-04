"use client"

import dynamic from "next/dynamic"

const MapView = dynamic(() => import("@/components/MapView"), { 
  ssr: false 
})

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Monitoring Sales</h1>
      <MapView />
    </div>
  )
}