import React from 'react'
import Header from './Header'
import Map from "./Map"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from './RightSidebar'

const MainApp = () => {
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

export default MainApp
