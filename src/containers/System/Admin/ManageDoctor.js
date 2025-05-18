//page quan ly danh muc bac si
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
// import { components } from "react-select";
import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //save to doctor infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic:"",
      selectedSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequireDoctorInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
        console.log("check input price: ", inputData);
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
        console.log("check input price: ", inputData);
      }

      if( type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name
          object.value = item.id;
          result.push(object);
        });
      }
    }

    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPrice, resPayment, resProvince, resSpecialty } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      let dataSelectSpecialty =this.buildDataInputSelect(resSpecialty, "SPECIALTY")

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty
      });
    }
    //chuyển đổi ngôn ngữ
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailDoctorAct({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic: '',
      specialtyId: this.state.selectedSpecialty.value
    });
  };

  handleChangeSelect = async (selectedOption, name) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince } = this.state;
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "";
      //-----------------------\\
      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        //-----------------------\\
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
      }

      //gọi api get data ở page quản lý bs
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true, //bs đã có thông tin --> sửa tt
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false, //bs chưa có thông tin --> lưu tt
        addressClinic: "",
        nameClinic: "",
        note: "",
      });
    }
    console.log(`tanloi channel:`, res);
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;

    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let { hasOldData, listSpecialty } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="manage-doctor.create-info-doctor" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="manage-doctor.choose-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="manage-doctor.choose-doctor" />
              }
              name={"SelectedOption"}
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="manage-doctor.intro-info" />
            </label>
            <textarea
              className="form-control"
              rows={"4"}
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            >
              Trân trọng giới thiệu, phó GS tiến sĩ
            </textarea>
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="manage-doctor.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={<FormattedMessage id="manage-doctor.payment" />}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id="manage-doctor.province" />}
              name="selectedProvince"
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.name-clinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.address-clinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="row">
              <div className="col-4 form-group">
                <label> <FormattedMessage id="manage-doctor.specialty" /></label>
                <Select
                  value={this.state.selectedSpecialty}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listSpecialty}
                  placeholder={
                    <FormattedMessage id="manage-doctor.specialty" />
                  }
                  name={"selectedSpecialty"}
               />
              </div>

              <div className="col-4 form-group">
                <label><FormattedMessage id="manage-doctor.clinic" /></label>
                <Select
                  value={this.state.selectedClinic}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listClinic}
                  placeholder={
                    <FormattedMessage id="manage-doctor.clinic" />
                  }
                  name={"selectedClinic"}
               />
              </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          //kiểm tra điều kiện user_doctor( đã có data & chưa có data)
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true ? (
            <span>Lưu thay đổi</span>
          ) : (
            <span>Tạo thông tin</span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    saveDetailDoctorAct: (data) => dispatch(actions.saveDetailDoctorAct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
