import React from 'react'
import AddMarker from './AddMarker'
import MarkerDescription from './MarkerDescription'

const LeftSidebar = () => {
    return (
        <div className="left-sidebar-container">
            
            <AddMarker/>
            <MarkerDescription/>
        </div>
    )
}

export default LeftSidebar
