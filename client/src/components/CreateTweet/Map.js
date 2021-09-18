import React,{useState} from "react"
import { MapContainer , TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

function LocationMarker(props) {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
      
     
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>

      {console.log(position)}
    {props.setLocation(`latitude is ${position.lat} and longitude  is ${position.lng}`)} 
     
    </Marker>
  )
}

function Map(props){
  const [location,setLocation]=useState("")
  return(
  <MapContainer
  style={{width:"550px", height:"500px"}}
    center={{ lat: 51.505, lng: -0.09 }}
    zoom={13}
    scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     
    <LocationMarker setLocation ={setLocation} />
    {props.setLoc(location)}
    
  </MapContainer>
  )
}
export default Map;
