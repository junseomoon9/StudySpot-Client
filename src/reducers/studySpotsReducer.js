
const INITIAL_STATE = {
    studySpots:[],
    courseCode: "All",
    myStudySpot: {},
    viewStudySpot: {}
}

const studySpotsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case "CREATE_STUDYSPOT":
          return {
              ...state,
              studySpots: [...state.studySpots, action.payload],
              myStudySpot: action.payload
            }
      case "DELETE_STUDYSPOT":
          return {
            ...state,
            myStudySpot: {},
            studySpots: [...state.studySpots.filter(studySpot => studySpot._id !== action.payload._id)]
          }
      case "INCREASE_OCCUPIED_SEATS":
          return {
              ...state,
              myStudySpot: {...state.myStudySpot,
                            occupiedSeats: state.myStudySpot.occupiedSeats + 1},
              studySpots: state.studySpots.map(studySpot => {
                  if (studySpot._id !== action.payload){
                      return studySpot
                  } else {
                      return {
                          ...studySpot,
                          occupiedSeats: studySpot.occupiedSeats + 1
                      }
                  }
              })
          }
      case "DECREASE_OCCUPIED_SEATS":
          return {
              ...state,
              myStudySpot: {...state.myStudySpot,
                            occupiedSeats: state.myStudySpot.occupiedSeats - 1},
              studySpots: state.studySpots.map(studySpot => {
                  if (studySpot._id !== action.payload){
                      return studySpot
                  } else {
                      return {
                          ...studySpot,
                          occupiedSeats: studySpot.occupiedSeats - 1
                      }
                  }
              })
          }
      case "CHANGE_COURSE_CODE_SELECTION":
          return {...state, courseCode: action.payload}
      case "CHANGE_VIEW_STUDYSPOT":
          return {...state, viewStudySpot: action.payload}
     default: 
        return state
    }
  }

  export default studySpotsReducer