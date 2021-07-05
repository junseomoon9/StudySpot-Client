import React, {useState, useRef, useEffect} from 'react'
import Select from 'react-select'
import {createStudySpot, deleteStudySpot, increaseOccupiedSeats, decreaseOccupiedSeats} from '../actions/actions'
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios"
import {FaPlus} from 'react-icons/fa'
import {FaMinus} from 'react-icons/fa'

const AddMarker = () => {

    const locationOptions = [
        { value: 'John P. Robarts Research Library', label: 'John P. Robarts Research Library' },
        { value: 'University of Toronto Physics Library', label: 'University of Toronto Physics Library' },
        { value: 'A.D. Allen Chemistry Library', label: 'A.D. Allen Chemistry Library' },
        { value: 'Gerstein Science Information Centre', label: 'Gerstein Science Information Centre' },
        { value: 'Department of Art Library', label: 'Department of Art Library'},
        { value: 'University College Library', label: 'University College Library'},
        { value: 'John W. Graham Library, Trinity College', label: 'John W. Graham Library, Trinity College' },
        { value: 'Engineering & Computer Science Library', label: 'Engineering & Computer Science Library' },
        { value: 'Dentistry Library', label: 'Dentistry Library' },
        { value: 'Astronomy & Astrophysics Library', label: 'Astronomy & Astrophysics Library' },
        { value: 'Earth Sciences Library (Noranda)', label: 'Earth Sciences Library (Noranda)' },
        { value: 'Hart House Library', label: 'Hart House Library' },
        { value: 'Innis College Library', label: 'Innis College Library' },
        { value: 'Knox College Library (Caven)', label: 'Knox College Library(Caven)' },
        { value: 'Law Library (Bora Laskin)', label: 'Law Library (Bora Laskin)' },
        { value: 'Massey College Library (Robertson Davies)', label: 'Massey College Library (Robertson Davies)' },
        { value: 'Music Library', label: 'Music Library' },
        { value: 'New College Library (Ivey)', label: 'New College Library (Ivey)' },
        { value: 'Regis College Library', label: 'Regis College Library' },
        { value: 'St. Michael’s College - John M. Kelly Library', label: 'St. Michael’s College - John M. Kelly Library' },
        { value: 'Victoria University - E J Pratt Library', label: 'Victoria University - E J Pratt Library' },
    ]

    const locationsWithCoordinates = [
        {name: "John P. Robarts Research Library", coordinates: {lat: "43.66463", lon: "-79.39969"}},
        {name: "University of Toronto Physics Library", coordinates: {lat: "43.66076", lon: "-79.39815"}},
        {name: "A.D. Allen Chemistry Library", coordinates: {lat: "43.66165", lon: "-79.39746"}},
        {name: "Gerstein Science Information Centre", coordinates: {lat: "43.66220", lon: "-79.39335"}},
        {name: "Department of Art Library", coordinates: {lat: "43.66290", lon: "-79.39842"}},
        {name: "University College Library", coordinates: {lat: "43.66344", lon: "-79.39512"}},
        {name: "John W. Graham Library, Trinity College", coordinates: {lat: "43.66521", lon: "-79.39610"}},
        {name: "Engineering & Computer Science Library", coordinates: {lat: "43.66056", lon: "-79.39461"}},
        {name: "Dentistry Library", coordinates: {lat: "43.65644", lon: "-79.38632"}},
        {name: "Astronomy & Astrophysics Library", coordinates: {lat: "43.66083", lon: "-79.39690"}},
        {name: "Earth Sciences Library (Noranda)", coordinates: {lat: "43.66054", lon: "-79.39936"}},
        {name: "Hart House Library", coordinates: {lat: "43.66370", lon: "-79.39459"}},
        {name: "Innis College Library", coordinates: {lat: "43.66567", lon: "-79.39897"}},
        {name: "Knox College Library (Caven)", coordinates: {lat: "43.66170", lon: "-79.39596"}},
        {name: "Law Library (Bora Laskin)", coordinates: {lat: "43.66617", lon: "-79.39355"}},
        {name: "Massey College Library (Robertson Davies)", coordinates: {lat: "43.66490", lon: "-79.39601"}},
        {name: "Music Library", coordinates: {lat: "43.66650", lon: "-79.39404"}},
        {name: "New College Library (Ivey)", coordinates: {lat: "43.66177", lon: "-79.40022"}},
        {name: "Regis College Library", coordinates: {lat: "43.66426", lon: "-79.38931"}},
        {name: "St. Michael’s College - John M. Kelly Library", coordinates: {lat: "43.66520", lon: "-79.38837"}},
        {name: "Victoria University - E J Pratt Library", coordinates: {lat: "43.66622", lon: "-79.39115"}}
    ]

    const courseOptions = [
        { value: 'CSC104H', label: 'CSC104H' },{ value: 'CSC108H', label: 'CSC108H' },{ value: 'CSC110Y1', label: 'CSC110Y1' },
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

    const seatOptions = [
        {value: 1, label: "1"},
        {value: 2, label: "2"},
        {value: 3, label: "3"},
        {value: 4, label: "4"},
        {value: 5, label: "5"},
        {value: 6, label: "6"},
    ]

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: '#fff',
            borderColor: '#9e9e9e',
            minHeight: '25px',
            height: '25px',
            boxShadow: state.isFocused ? null : null,
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            height: '25px',
            
            
        }),

        input: (provided, state) => ({
            ...provided,
            margin: '0px',
        }),
        indicatorSeparator: state => ({
            display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '25px',
        }),
    };

    const [location, setLocation] = useState("")
    const [floor, setFloor] = useState("")
    const [course, setCourse] = useState("")
    const [occupiedSeats, setOccupiedSeats] = useState(0)
    const [totalSeats, setTotalSeats] = useState(0)
    const [description, setDescription] = useState("")

    const [createdStudySpot, setCreatedStudySpot] = useState(false)

    const locationInput = useRef();
    const floorInput = useRef();
    const courseInput = useRef();
    const occupiedSeatsInput = useRef();
    const totalSeatsInput = useRef();
    const descriptionTextArea = useRef();

    const dispatch = useDispatch()
    const myStudySpot = useSelector(state => state.studySpotsReducer).myStudySpot

    const handleLocationChange = (selectedOption) => {
        setLocation(selectedOption.value)
    }

    const handleFloorChange = (e) => {
        setFloor(e.target.value)
    }

    const handleCourseChange = (selectedOption) => {
        setCourse(selectedOption.value)
    }

    const handleOccupiedSeatsChange = (selectedOption) => {
        setOccupiedSeats(selectedOption.value)
    }

    const handleTotalSeatsChange = (selectedOption) => {
        setTotalSeats(selectedOption.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const coord = locationsWithCoordinates.find(el => el.name === location).coordinates
        const studySpot = {location: location, floor: floor, courseCode: course, occupiedSeats: occupiedSeats, totalSeats: totalSeats, description: description, coordinates: coord}
        axios.post("https://salty-temple-96430.herokuapp.com/studyspot/addStudySpot", studySpot)
        .then(res => {
            
            dispatch(createStudySpot(res.data))
            setCreatedStudySpot(!createdStudySpot)
        })
        .catch(err => {
            console.log(err)
        })
        

    }

    const removeStudySpot = (e) => {
        e.preventDefault()

        axios.post("https://salty-temple-96430.herokuapp.com/studyspot/deleteStudySpot", myStudySpot)
        .then(res => {
            setCreatedStudySpot(!createdStudySpot)
            dispatch(deleteStudySpot(myStudySpot))
        }).catch(err => {
            console.log(err)
        })
    }

    const handleIncreaseOccupiedSeats = () => {
        if (myStudySpot.occupiedSeats !== myStudySpot.totalSeats){
            axios.post("https://salty-temple-96430.herokuapp.com/studyspot/increaseOccupiedSeats", myStudySpot)
            .then(res => {
                
                dispatch(increaseOccupiedSeats(myStudySpot._id))
                
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const handleDecreaseOccupiedSeats = () => {
        if (myStudySpot.occupiedSeats !== 1 ){
            axios.post("https://salty-temple-96430.herokuapp.com/studyspot/decreaseOccupiedSeats", myStudySpot)
            .then(res => {
                
                dispatch(decreaseOccupiedSeats(myStudySpot._id))
                
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        axios.post("https://salty-temple-96430.herokuapp.com/studyspot/getAllStudySpots", {})
        .then(res => {
            const studyspots = res.data.studyspots
            console.log(studyspots)
            studyspots.forEach(studySpot => dispatch(createStudySpot(studySpot)))
        })
    }, [])

    if (!createdStudySpot) { 
        return (
        <div className="add-marker-container">
            <h1>Create Your StudySpot</h1>
            <form >
                <div className="location-container">
                    <p><b>Location: </b></p>
                    <Select ref={locationInput} className="location-select-bar" styles={customStyles} options={locationOptions} onChange={handleLocationChange} />
                </div>
                <div className="floor-container">
                    <p><b>Floor: </b></p>
                    <input ref={floorInput} className="floor-input-bar" placeholder="Type in a number..." onChange={handleFloorChange}></input>
                </div>
                <div className="course-code-container">
                    <p><b>Course Code: </b></p>
                    <Select ref={courseInput} className="course-code-select-bar" styles={customStyles} options={courseOptions} onChange={handleCourseChange} />
                </div>
                <div className="seats-container">
                    <p><b>Occupied Seats: </b></p>
                    <Select ref={occupiedSeatsInput} className="occupied-seats-select-bar" styles={customStyles} options={seatOptions} onChange={handleOccupiedSeatsChange} />
                </div>
                <div className="seats-container">
                    <p><b>Total Seats: </b></p>
                    <Select ref={totalSeatsInput} className="total-seats-select-bar" styles={customStyles} options={seatOptions} onChange={handleTotalSeatsChange} />
                </div>
                <div className="description-container">
                    <p><b>Description: </b></p>
                    <textarea ref={descriptionTextArea} onChange={handleDescriptionChange} placeholder="Describe exactly where you are inside the building, an article of clothing you're wearing, or an item near you..."></textarea>
                </div>
                <div className="create-button-container">
                    <button className="create-button" onClick={handleSubmit}>
                        <p>Create</p>
                    </button>
                </div>
            </form>
        </div>
        )
    } else {
        return (
            <div className="created-studyspot-container">
                <h1 className="created-studyspot-container-title">Your StudySpot</h1>
                <div className="created-studyspot-info-container">
                    <div className="location-container">
                        <p><b>Location: </b></p>
                        <div className="value-container">
                            <p>{myStudySpot.location}</p>
                        </div> 
                        
                    </div>
                    <div className="floor-container">
                        <p><b>Floor: </b></p>
                        <div className="value-container">
                            <p>{myStudySpot.floor}</p>
                        </div> 
                    </div>
                    <div className="course-code-container">
                        <p><b>Course Code: </b></p>
                        <div className="value-container">
                            <p>{myStudySpot.courseCode}</p>
                        </div> 
                    </div>
                    <div className="seats-container">
                        <p><b>Occupied Seats: </b></p>
                        <div className="value-container">
                            <FaMinus className="minus-icon" onClick={handleDecreaseOccupiedSeats}/>
                            <p>{myStudySpot.occupiedSeats}/{myStudySpot.totalSeats}</p>
                            <FaPlus className="plus-icon" onClick={handleIncreaseOccupiedSeats}/>
                        </div> 
                    </div>
                    <div className="description-container">
                        <p><b>Description: </b></p>
                        <div className="value-container">
                            <p>{myStudySpot.description}</p>
                        </div> 
                    </div>
                    <div className="remove-studyspot-button-container">
                        <button className="remove-studyspot-button" onClick={removeStudySpot}>Remove StudySpot</button>
                    </div>
                    
                </div>
                
            </div>   
        )
    }
    
}

export default AddMarker
