import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTinme: [],

  allRequiredDoctorInfor: [],

};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //case-gender
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      console.log("hoi dan IT fire fetch gender start: ", action);
      return {
        ...copyState,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_FAILDED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    //case-position
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_FAILDED:
      state.positions = [];
      return {
        ...state,
      };

    //case-role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_FAILDED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
        state.users = action.users;
        return {
          ...state,
        };

    case actionTypes.FETCH_ALL_USER_FAILDED:
        state.users = [];
        return {
          ...state,
        };
    
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
        state.topDoctors = action.dataDoctors;
        return {
          ...state,
        };

    case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
        state.topDoctors = [];
        return {
          ...state,
        };

      case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
          state.allDoctors = action.dataDr;
          return {
            ...state,
          };
  
      case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
          state.allDoctors = [];
          return {
            ...state,
          };       


          case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTinme = action.dataTime;
            return {
              ...state,
            };
    
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
            state.allScheduleTinme = [];
            return {
              ...state,
            };   

            case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
              ...state,
            };
    
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILDED:
            state.allRequiredDoctorInfor = [];
            return {
              ...state,
            };   
            
    default:
      return state;
  }
};

export default adminReducer;
