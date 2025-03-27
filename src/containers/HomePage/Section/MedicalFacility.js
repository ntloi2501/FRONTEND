import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';

class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-share section-medical-facility'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>
                        <FormattedMessage id='homepage.medical-facility' />
                    </span>
                    <button className='btn-section'>
                    <FormattedMessage id='homepage.more-info' />
                    </button>
                </div>
                <div className='section-body'>
                <Slider {...this.props.settings}>
                <div className='section-customize'>
                    <div className='bg-image section-medical-facility'/>
                    <div>Bệnh viện ĐH y dược HCM</div>
                </div>
                <div className='section-customize'>
                    <div className='bg-image section-medical-facility'/>
                    <div>Bệnh viện 175</div>
                </div>
                <div className='section-customize'>
                    <div className='bg-image section-medical-facility'/>
                    <div>Bệnh viện Bạch Mai</div>
                </div>
                <div className='section-customize'>
                    <div className='bg-image section-medical-facility'/>
                    <div>Bệnh viện ĐH y dược Cần Thơ</div>
                </div>
                <div className='section-customize'>
                    <div className='bg-image section-medical-facility'/>
                    <div>Bệnh viện chợ rẫy</div>
                </div>
                <div className='section-customize'>
                    <div className='bg-image section-medical-facility'/>
                    <div>Bệnh viện đa khoa An Giang</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
