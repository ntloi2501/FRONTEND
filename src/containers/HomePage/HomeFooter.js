//Header Homepage
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; More infomation, please visit my project video. 
                    <a target='_blank' href='https://github.com/ntloi2501'>
                    &#8594; Click here &#8592;</a>  
                 </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
