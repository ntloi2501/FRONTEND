//Header Homepage
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant'
import {changeLanguageApp} from '../../store/actions'

class HomeHeader extends Component {
    changeLanguague = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment> 
            <div className='home-header-container'>
                <div className='home-header-content'>
                    {/* LOGO HEADER */}
                    <div className='left-content'>
                        <i className='fas fa-bars'></i>
                        <img className='header-logo' src={logo}/>
                    </div>
                    {/* CENTER HEADER  */}
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b> <FormattedMessage id='homeheader.speciality'/></b></div>
                            <div className='subs-title'><FormattedMessage id='homeheader.searchdoctor'/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id='homeheader.health-facility'/></b></div>
                            <div className='subs-title'><FormattedMessage id='homeheader.select-room'/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id='homeheader.doctor'/></b></div>
                            <div className='subs-title'><FormattedMessage id='homeheader.select-doctor'/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id='homeheader.fee'/></b></div>
                            <div className='subs-title'><FormattedMessage id='homeheader.check-health'/></div>
                        </div>
                    </div>

                    {/* RIGHT HEADER */}
                    <div className='right-content'>
                        <div className='support'><i className='fas fa-question-circle'></i>
                            <FormattedMessage id='homeheader.support'/>
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}> <span onClick={() => this.changeLanguague(LANGUAGES.VI)}>VN</span></div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguague(LANGUAGES.EN)}>EN</span></div>
                    </div>
                </div>
            </div>
            <div className='home-header-banner'>
                <div className='content-up'>
                    <div className='title1'> <FormattedMessage id='banner.title1'/> </div>
                    <div className='title2'> <FormattedMessage id='banner.title2'/></div>
                    <div className='search'>
                        <i className='fas fa-search'></i>
                        <input type='text' placeholder='tìm chuyên khoa khám bệnh'/>
                    </div>
                </div>
                <div className='content-down'>
                    <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'><i className='fas fa-hospital'></i></div>
                            <div className='text-child'> <FormattedMessage id='options.specialist'/> </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className='fas fa-phone'></i></div>
                            <div className='text-child'> <FormattedMessage id='options.specialist-onl'/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className='fas fa-procedures'></i></div>
                            <div className='text-child'> <FormattedMessage id='options.specialist-ex'/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className='fa fa-flask'></i></div>
                            <div className='text-child'> <FormattedMessage id='options.medical-test'/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i className='fas fa-user-md'></i></div>
                            <div className='text-child'> <FormattedMessage id='options.medical-health'/></div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'><i class="fas fa-briefcase-medical"></i></div>
                            <div className='text-child'> <FormattedMessage id='options.tooth'/></div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
