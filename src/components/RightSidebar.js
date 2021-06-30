import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {changeCourseCodeSelection, changeViewStudySpot} from '../actions/actions'
import {useSelector, useDispatch} from 'react-redux'

const RightSidebar = () => {

    const options = [
        { value: 'All', label: 'All'},{ value: 'CSC104H', label: 'CSC104H' },{ value: 'CSC108H', label: 'CSC108H' },{ value: 'CSC110Y1', label: 'CSC110Y1' },
        { value: 'CSC111H', label: 'CSC111H'},{ value: 'CSC120H', label: 'CSC120H' },{ value: 'CSC148H', label: 'CSC148H' },{ value: 'CSC165H', label: 'CSC165H' },
        { value: 'CSC196H', label: 'CSC196H'},{ value: 'CSC197H', label: 'CSC197H' },{ value: 'CSC199H', label: 'CSC199H' },{ value: 'CSC207H', label: 'CSC207H' },
        { value: 'CSC209H', label: 'CSC209H'},{ value: 'CSC236H', label: 'CSC236H' },{ value: 'CSC240H', label: 'CSC240H' },{ value: 'CSC258H', label: 'CSC258H' },
        { value: 'CSC263H', label: 'CSC263H'},{ value: 'CSC265H', label: 'CSC265H' },{ value: 'CSC300H', label: 'CSC300H' },{ value: 'CSC301H', label: 'CSC301H' },
        { value: 'CSC302H', label: 'CSC302H'},{ value: 'CSC303H', label: 'CSC303H' },{ value: 'CSC304H', label: 'CSC304H' },{ value: 'CSC309H', label: 'CSC309H' },
        { value: 'CSC311H', label: 'CSC311H'},{ value: 'CSC317H', label: 'CSC317H' },{ value: 'CSC318H', label: 'CSC318H' },{ value: 'CSC320H', label: 'CSC320H' },
        { value: 'CSC324H', label: 'CSC324H'},{ value: 'CSC336H', label: 'CSC336H' },{ value: 'CSC343H', label: 'CSC343H' },{ value: 'CSC367H', label: 'CSC367H' },
        { value: 'CSC369H', label: 'CSC369H'},{ value: 'CSC373H', label: 'CSC373H' },{ value: 'CSC384H', label: 'CSC384H' },{ value: 'CSC385H', label: 'CSC385H' },
        { value: 'CSC401H', label: 'CSC401H'},{ value: 'CSC404H', label: 'CSC404H' },{ value: 'CSC410H', label: 'CSC412H' },{ value: 'CSC413H', label: 'CSC413H' },
        { value: 'CSC417H', label: 'CSC417H'},{ value: 'CSC419H', label: 'CSC419H' },{ value: 'CSC420H', label: 'CSC420H' },{ value: 'CSC428H', label: 'CSC428H' },
        
    ]

    const dispatch = useDispatch()
    const studySpots = useSelector(state => state.studySpotsReducer).studySpots

    const handleCourseCodeChange = (selectedCourse) => {
        dispatch(changeCourseCodeSelection(selectedCourse.value))
    }

    const handleClick = (studySpot) => {
        dispatch(changeViewStudySpot(studySpot))
    }

    const [markers, setMarkers] = useState([])

    useEffect(() => {
        const newMarkers = []
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
    }, [studySpots])

    return (
        <div className="right-sidebar-container">
            <div className="map-controls-container">
                <h1>View StudySpots with course:</h1>
                <Select onChange={handleCourseCodeChange} className="select-bar" options={options}  defaultValue={{value: 'All', label: 'All'}} />
            </div>
            <div className="all-current-studyspots-container">
               <h1 className="all-current-studyspots-title">All Current StudySpots</h1>
               <div className="all-current-studyspots">
                    {markers.map((marker) => (
                        <div className="location-with-corresponding-studyspots-container">
                            <h1 className="location-name">{marker.location}</h1>
                            {marker.studySpots.map((studySpot) => (
                                <div className="studyspot-info-container" onClick={() => handleClick(studySpot)}>
                                    <h2 className="studyspot-info-container-coursecode">Course: {studySpot.courseCode}</h2>
                                    <h2 className="studyspot-info-container-floor"> Floor: {studySpot.floor}</h2>
                                    <h2 className="studyspot-info-container-seats">Seats Occupied: {studySpot.occupiedSeats}/{studySpot.totalSeats}</h2>
                                    
                                </div>
                            ))}
                        </div>
                        
                    ))}
               </div>
            </div>
        </div>
    )
}

export default RightSidebar
