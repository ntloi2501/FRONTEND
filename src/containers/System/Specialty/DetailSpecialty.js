import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import Home from '../../../routes/Home';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
async componentDidMount() {

}

async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language){

    }
    

}


    render() {

        return (
            <>
            <HomeHeader />
                <div>
                    Hello world from detail specialty 
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
