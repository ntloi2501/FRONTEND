//Header Homepage
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

import { LANGUAGE } from '../../../utils/constant'
import { changeLanguageApp } from '../../../store/actions'


class Specialty extends Component {
    changeLanguague = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                    {/* <div><b> <FormattedMessage id='specialty.popular-specialties'/></b></div> */}
                        <span className='title-section'>
                            <FormattedMessage id='homepage.popular-specialties' />
                        </span>
                        <button className='btn-section'>
                        <FormattedMessage id='homepage.more-info' />
                        </button>
                    </div>
                    <div className='section-body'>
                    <Slider {...this.props.settings}>
                    <div className='section-customize'>
                        <div className='bg-image section-specialty'/>
                        <div>cơ xương khớp</div>
                    </div>
                    <div className='section-customize'>
                        <div className='bg-image section-specialty'/>
                        <div> hô hấp</div>
                    </div>
                    <div className='section-customize'>
                        <div className='bg-image section-specialty'/>
                        <div> tiêu hóa</div>
                    </div>
                    <div className='section-customize'>
                        <div className='bg-image section-specialty'/>
                        <div> tai mũi họng</div>
                    </div>
                    <div className='section-customize'>
                        <div className='bg-image section-specialty'/>
                        <div> thần kinh</div>
                    </div>
                    <div className='section-customize'>
                        <div className='bg-image section-specialty'/>
                        <div> tim mạch</div>
                    </div>
                </Slider>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
