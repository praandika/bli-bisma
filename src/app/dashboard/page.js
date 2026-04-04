"use client"

import { useEffect, useState } from "react"

export default function DashboardPage() {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("/api/dashboard")
        .then((res) => res.json())
        .then(setData)
    }, [])

    return (
        <div style={{ padding: "20px" }}>
            <h1>📊 Dashboard</h1>

            <div style={{ marginTop: "20px" }}>
                <h3>Total Activity: {data.totalActivity}</h3>
                <h3>Total Prospect: {data.totalProspect}</h3>
                <h3>Total Deal: {data.totalDeal}</h3>
            </div>
        </div>
    )
}