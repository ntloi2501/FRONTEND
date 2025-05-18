import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService, getAllUsers, 
  deleteUserService, editUserService, getTopDoctorHomeService, 
  getAllDoctors, saveDetailDoctorService, getAllSpecialty } 
  from "../../services/userService";
import { Toast } from "reactstrap";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});
//POSITION
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

//ROLE
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log("fetchPositionFail error", e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("fetchRoleFail error", e);
    }
  };
};

export const createNewUser = (data) => {
  return async  (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log('check create user redux: ', res)
      if (res && res.errCode === 0) {
        toast.success("Create a new user success !")
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed error", e);
    }
  };
}

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFail());
      }
    } catch (e) {
      dispatch(fetchAllUserFail());
      console.log("fetchAllUser error", e);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data
})

export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILDED
})


export const deleteAUser = (userId) => {
  return async  (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete user success !")
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete user Failed !")
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Fetch All user Failed !")
      dispatch(deleteUserFailed());
      console.log("delete User Failed error", e);
    }
  };
}

export const deleteUserSuccess =() => ({
  type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed =() => ({
  type: actionTypes.DELETE_USER_FAIDED
})



export const editAUser = (data) => {
  return async  (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update user success !")
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Update user Failed !")
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Fetch All user Failed !")
      dispatch(editUserFailed());
      console.log("Update User Failed error", e);
    }
  };
}

export const editUserSuccess =() => ({
  type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed =() => ({
  type: actionTypes.EDIT_USER_FAIDED
})

export const fetchTopDoctor = () => {
  return async  (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService('');
      if(res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data
        })
      }else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILDED
        })
      }
    } catch (e) {
      console.log('FETCH_TOP_DOCTORS_FAILDED', e)
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILDED
      })
    }
  }
}

export const fetchAllDoctors = () => {
  return async  (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if(res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data
        })
      }else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
        })
      }
    } catch (e) {
      console.log('FETCH_ALL_DOCTORS_FAILDED', e)
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
      })
    }
  }
}

export const saveDetailDoctorAct = (data) => {
  return async  (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if(res && res.errCode === 0) {
        toast.success("Save infor detail doctor success !")
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        })
      }else {
        console.log('check save info doctor: ', res)
        toast.error("Save infor detail doctor fail !")
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
        })
      }
    } catch (e) {
      toast.error("Save infor detail doctor fail !")
      console.log('SAVE_DETAIL_DOCTOR_FAILDED', e)
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
      })
    }
  }
}

export const fetchAllScheduleTime = () => {
  return async  (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if(res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data
        })
      }else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
        })
      }
    } catch (e) {
      console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILDED', e)
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
      })
    }
  }
}


export const getRequireDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty()

      if (resPrice && resPrice.errCode === 0 
        && resPayment && resPayment.errCode === 0 
        && resProvince && resProvince.errCode === 0
        && resSpecialty && resSpecialty.errCode ===0 ) {
          let data = {
            resPrice: resPrice.data,
            resPayment: resPayment.data,
            resProvince: resProvince.data,
            resSpecialty: resSpecialty.data
          }
        dispatch(fetchAllRequireDoctorInforSuccess(data));
      } else {
        dispatch(fetchAllRequireDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchAllRequireDoctorInforFailed());
      console.log("fetchAllRequireDoctorInforFailed error", e);
    }
  };
};

export const fetchAllRequireDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchAllRequireDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILDED,
});
