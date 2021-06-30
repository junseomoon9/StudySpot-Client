import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {changeViewStudySpot} from '../actions/actions'
import {useSelector, useDispatch} from 'react-redux'
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';



import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {

    const studySpots = useSelector(state => state.studySpotsReducer).studySpots
    const courseCode = useSelector(state => state.studySpotsReducer).courseCode;
    const dispatch = useDispatch()

    const [markers, setMarkers] = useState([])
    
    const handleClick = (studySpot) => {
        dispatch(changeViewStudySpot(studySpot))
    }

    useEffect(() => {
       
        var newMarkers = []
        if (courseCode === "All") {
            for (var i=0; i < studySpots.length; i++){
                const markerIndex = newMarkers.findIndex(el => el.location === studySpots[i].location)
     
                if (markerIndex === -1) {
                    const newLocationMarker = {location: studySpots[i].location, coordinates: studySpots[i].coordinates, studySpots: []}
                    newLocationMarker.studySpots.push(studySpots[i])
                    newMarkers.push(newLocationMarker)
                } else {
                    newMarkers[markerIndex].studySpots.push(studySpots[i])
                }
            }
            setMarkers(newMarkers)
        } else {
            for (var i=0; i < studySpots.length; i++){
                const markerIndex = newMarkers.findIndex(el => el.location === studySpots[i].location)
     
                if (markerIndex === -1) {
                    if (studySpots[i].courseCode === courseCode) {
                        const newLocationMarker = {location: studySpots[i].location, coordinates: studySpots[i].coordinates, studySpots: []}
                        newLocationMarker.studySpots.push(studySpots[i])
                        newMarkers.push(newLocationMarker)
                    }
                } else {
                    if (studySpots[i].courseCode === courseCode) {
                        newMarkers[markerIndex].studySpots.push(studySpots[i])
                    }
                }
            }
            setMarkers(newMarkers)
        }
        
        
    }, [studySpots, courseCode])

  

    return (

        <div className="map-container">
            <div className="map">
                <MapContainer
                    center={[43.66312, -79.39561]}
                    zoom={15.5}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                    >
                  
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((marker) => (
                        <Marker position={marker.coordinates}>
                            <Popup>
                                <div className="popup-container">
                                    <h1 className="map-marker-popup-location">{marker.location}</h1>
                                    {marker.studySpots.map((studySpot) => (
                                    
                                        <div className="studySpot-popup-info-container" onClick={() => handleClick(studySpot)}>
                                            <h2 className="studyspot-info-container-coursecode">Course: {studySpot.courseCode}</h2>
                                            <h2 className="studyspot-info-container-floor"> Floor: {studySpot.floor}</h2>
                                            <h2 className="studyspot-info-container-seats">Seats Occupied: {studySpot.occupiedSeats}/{studySpot.totalSeats}</h2>
                                        </div>
                                    ))}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
        
    )
}

export default Map
