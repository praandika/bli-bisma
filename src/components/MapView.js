"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useState } from "react"
import L from "leaflet"
import { useMap } from "react-leaflet"

delete L.Icon.Default.prototype._getIconUrl

const redIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
})

const blueIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32],
})

const greenIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
})

const getIcon = (role) => {
    if (role === "SALESMAN") return redIcon
    if (role === "SPV") return blueIcon
    if (role === "KACAB") return greenIcon
    return redIcon
}

// AUTO FIT BOUNDS
function FitBounds({ locations }) {
    const map = useMap()

    useEffect(() => {
        if (locations.length > 0) {
            const bounds = locations.map((loc) => [
                loc.latitude, 
                loc.longitude
            ])

            map.fitBounds(bounds)
        }
    }, [locations])

    return null
}

export default function MapView() {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchData = () => {
            fetch("/api/location")
                .then((res) => res.json())
                .then((data) => setLocations(data))
                .catch((error) => console.error("Error fetching locations:", error))
        }
        
        fetchData() //Pertama kali load

        const interval = setInterval(fetchData, 5000) // Fetch setiap 5 detik

        return () => clearInterval(interval)
    }, [])

    return (
        <MapContainer center={[-8.6638, 115.2001]} zoom={10} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Auto Zoom ke Data */}
            <FitBounds locations={locations} />

            {/* Markers */}
            {locations.map((location) => (
                <Marker 
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                    icon={getIcon(location.user?.role)}>
                    <Popup>
                        <b>{location.user?.name}</b> <br />
                        Role: {location.user?.role} <br />
                        Prospect: {location.prospect ?? "-"} <br />
                        Deal: {location.deal ?? "-"}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}