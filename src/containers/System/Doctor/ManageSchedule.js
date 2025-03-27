//Quản lý kế hoạch khám bệnh của bác sĩ

//Khi user là bác sĩ login
import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from 'react-intl';
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import { getDetailInforDoctor } from "../../../services/userService"
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _, { range } from 'lodash';
class ManageSchedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedDoctor: {},
            listDoctors: [],
            currentDate: '',
            rangeTime: []
        }
    }
componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime()
}
buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if(inputData && inputData.length > 0 ) {
      inputData.map((item, index)=> {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object)
      })
    }
    return result
  }
componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
          listDoctors: dataSelect
      })
    }
    if(prevProps.allScheduleTinme !== this.props.allScheduleTinme) {
        let data = this.props.allScheduleTinme
        if(data && data.length > 0) {
            data = data.map(item => ({...item, isSelected: false}))
        }
        this.setState({
            rangeTime: data
        })
    }
    // if(prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
    //   this.setState({
    //       listDoctors: dataSelect
    //   })
    // }
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor })
  };

handleOnChangeDatePicker = (date) => {
    this.setState({
        currentDate: date[0]
    })
  }
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if(rangeTime && rangeTime.length > 0 ) {
        rangeTime = rangeTime.map(item => {
            if(item.id === time.id) item.isSelected = !item.isSelected
            return item
        })
        this.setState({
            rangeTime: rangeTime
        })
    }
  }
  handleClickSaveSchedule = () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state
    let result = [];
    if(!currentDate ){
        toast.error('Invalid date !')
        return
    }
    if(selectedDoctor && _.isEmpty(selectedDoctor)) {
        toast.error('Invalid selected Doctor !')
        return
    }
    let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
    
    if(rangeTime && rangeTime.length > 0 ) {
        let selectedTime = rangeTime.filter(item => item.isSelected === true)
        if(selectedTime && selectedTime.length > 0) {
            selectedTime.map(schedule =>  {
                let object = {}
                object.doctorId = selectedDoctor.value //value : label
                object.date = formatedDate
                object.time = schedule.keyMap
                result.push(object)
            })
           
        }else {
            toast.error('Invalid selected time !')
            return
        }
        
    }
    console.log('A$AP playboii check: result: ', result)
  }
    render() {
       
        let { rangeTime } = this.state;
        let { language } = this.props;
        // console.log('tanloi check state all time schedule: ', rangeTime)
        return (
            <React.Fragment>
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label>
                            <FormattedMessage id='manage-schedule.choose-doctor' />
                            </label>
                            <Select
                            value={this.state.selectedDoctor}
                            onChange={ this.handleChangeSelect}
                            options={this.state.listDoctors}
                            />
                            
                        </div>
                        <div className='col-6'>
                            <label>
                            <FormattedMessage id='manage-schedule.choose-date' />
                            </label>
                            <DatePicker
                            onChange = {this.handleOnChangeDatePicker}
                            className = "form-control" 
                            value = {this.state.currentDate}
                            minDate = {new Date()}                                                       
                             />
                        </div>
                        <div className='col-12 pick-hour-container'>
                           {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) =>{
                            return(
                                <button 
                                className={
                                item.isSelected === true 
                                ? 'btn btn-schedule active' : 'btn btn-schedule'
                                }
                                key={index}
                                onClick={() => this.handleClickBtnTime(item)}
                                >    
                                { language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                </button>
                            )
                           })
                           }
                        </div>
                        <div className='col-12'>
                            <button 
                            className='btn btn-primary btn-save-schedule'
                            onClick={() => this.handleClickSaveSchedule()}
                            >
                            <FormattedMessage id='manage-schedule.save' />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTinme: state.admin.allScheduleTinme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
