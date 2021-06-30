export const createStudySpot = (studySpot) => {
    return {
        type: 'CREATE_STUDYSPOT', payload: studySpot
    }
}

export const deleteStudySpot = (studySpot) => {
    return {
        type: 'DELETE_STUDYSPOT', payload: studySpot
    }
}

export const increaseOccupiedSeats = (_id) => {
    return {
        type: 'INCREASE_OCCUPIED_SEATS', payload: _id
    }
}

export const decreaseOccupiedSeats = (_id) => {
    return {
        type: 'DECREASE_OCCUPIED_SEATS', payload: _id
    }
}

export const changeCourseCodeSelection = (courseCode) => {
    return {
        type: 'CHANGE_COURSE_CODE_SELECTION', payload: courseCode
    }
}

export const changeViewStudySpot = (studySpot) => {
    return {
        type: 'CHANGE_VIEW_STUDYSPOT', payload: studySpot
    }
}