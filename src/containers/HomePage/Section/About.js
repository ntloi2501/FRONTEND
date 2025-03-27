//Header Homepage
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
               <div className='section-about-header'>
                    <FormattedMessage id='homepage.who' />
               </div>
               <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="100%" height="400px"
                    src="https://www.youtube.com/embed/Qqo3L-MdIxE" 
                    title="WHO xác nhận HMPV không phải là loại virus mới | VTV24" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                        Cụ thể, theo WHO, tại nhiều quốc gia ở Bắc bán cầu, 
                        các bệnh lây truyền qua đường hô hấp cấp tính có xu hướng gia tăng theo mùa 
                        vào thời điểm này trong năm do các tác nhân gây bệnh hô hấp như virus cúm mùa, 
                        RSV và các virus phổ biến khác như hMPV, mycoplasma pneumoniae. 
                        Trong đó, tỷ lệ mắc các hội chứng cúm (ILI) hoặc nhiễm trùng đường hô hấp cấp tính (ARI) 
                        ở một số quốc gia ở Bắc bán cầu đã tăng lên trong những tuần gần đây và vượt qua mức 
                        cơ sở theo mùa thông thường. 
                        Bệnh cúm mùa cũng đang gia tăng ở nhiều quốc gia ở châu Âu, Trung Mỹ và Caribbean, Tây Phi, 
                        Trung Phi và nhiều quốc gia ở châu Á, phù hợp với xu hướng điển hình cho thời điểm này trong năm.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
