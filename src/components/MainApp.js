import React, {useState, useEffect} from 'react'
import Header from './Header'
import Map from "./Map"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from './RightSidebar'
import CircleLoader from "react-spinners/CircleLoader";

const MainApp = () => {

    let [loading, setLoading] = useState(true);
    let [animation, setAnimation] = useState(false);
    let [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
        setAnimation(true)
        setTimeout(() => {
            setAnimation(false)
        }, 4000)
    }, [])

    if (loading) {
        return (
            <div className="loading-screen">
                <CircleLoader color={color} />
            </div>
        )
    }
    else {
        if (animation) {
            return (
                <div className="animation">
                    <div className="left-container"></div>
                    <div className="right-container"></div>
                </div>
            )
        }
        else {  
            return (
                <div className="mainapp"> 
                    <Header/>
                    <div className="main-app-body">
                        <LeftSidebar/>
                        <Map/>
                        <RightSidebar/>
                    </div>
                </div>
            )
        }
        
    }
    
}

export default MainApp
