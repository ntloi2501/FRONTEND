import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'
class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
async componentDidMount() {
    if(this.props.location && this.props.location.search) {

        let urlParams = new URLSearchParams(this.props.location.search)
        let token = urlParams.get('token')
        let doctorId = urlParams.get('doctorId')
        let res = await postVerifyBookingAppointment({
            token: token,
            doctorId: doctorId
        }) 
        if(res && res.errCode === 0) {
            this.setState({
                statusVerify: true,
                errCode: res.errCode
            }) 
        }else {
            this.setState({
                statusVerify: true,
                errCode: res && res.errCode ? res.errCode : -1
            })
           
        }

    }
    if (this.props.match && this.props.match.params && this.props.match.params.id) {

      }
}


async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language){

    }
    

}

    render() {
        let { statusVerify, errCode } = this.state
        return (
           <>
            <HomeHeader />
            {statusVerify === false ? 
                <div>
                    Loading data...
                </div>
            :
            <div className='container'>
                {+errCode === 0 ?
                    <div className='toast-success'>
                        <FormattedMessage id='patient.confirm-email.success' />
                    </div>
                :
                    <div className='toast-fail'>
                    <FormattedMessage id='patient.confirm-email.fail' />
                    </div>
                }    
            </div> 
            }
           </>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
