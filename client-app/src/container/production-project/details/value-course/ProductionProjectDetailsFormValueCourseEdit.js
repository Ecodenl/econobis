import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputToggle from "../../../../components/form/InputToggle";
import InputDate from "../../../../components/form/InputDate";
import moment from "moment/moment";

const ProductionProjectDetailsFormValueCourseEdit = props => {
    const { productionProject, date, bookWorth, transferWorth, createdAt, createdBy } = props.valueCourse;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={"Project"}
                            id={"productionProject"}
                            name={"productionProject"}
                            value={productionProject ? productionProject.name : ''}
                            readOnly={true}
                        />

                        <InputDate
                            label={"Datum"}
                            id="date"
                            name={"date"}
                            value={date}
                            onChangeAction={props.handleInputChangeDate}
                            required={'required'}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            label={"Boekwaarde"}
                            id={"bookWorth"}
                            name={"bookWorth"}
                            value={bookWorth}
                            onChangeAction={props.handleInputChange}
                            required={'required'}
                            error={props.bookWorthError}
                        />
                        <InputText
                            label={"Overdrachtswaarde"}
                            id={"transferWorth"}
                            name={"transferWorth"}
                            value={transferWorth ? transferWorth : ''}
                            onChangeAction={props.handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            label={"Gemaakt op"}
                            name={"createdAt"}
                            value={createdAt ? moment(createdAt.date).format('L') : ''}
                            readOnly={true}
                        />
                        <InputText
                            label={"Gemaakt door"}
                            name={"createdBy"}
                            value={createdBy ? createdBy.fullName : ''}
                            readOnly={true}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={props.cancelEdit}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        phoneNumberTypes: state.systemData.phoneNumberTypes
    };
};

export default connect(mapStateToProps, null)(ProductionProjectDetailsFormValueCourseEdit);