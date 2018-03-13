import React from 'react';
import { connect } from 'react-redux';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from "../../../../components/form/InputDate";
import moment from "moment/moment";
import InputToggle from "../../../../components/form/InputToggle";
moment.locale('nl');

const ContactDetailsFormOccupationsEdit = props => {
    const { organisationId, occupationId, startDate, endDate, primary } = props.occupation;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={"Verbonden met"}
                                size={"col-sm-6"}
                                name={"organisationId"}
                                options={props.organisations}
                                value={organisationId}
                                onChangeAction={props.handleInputChange}
                                required={"required"}
                                error={props.organisationIdError}
                            />
                            <InputSelect
                                label={"Rol"}
                                size={"col-sm-6"}
                                name={"occupationId"}
                                options={props.occupations}
                                value={occupationId}
                                onChangeAction={props.handleInputChange}
                                required={"required"}
                                error={props.occupationIdError}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label={"Begin datum"}
                                size={"col-sm-6"}
                                name={"startDate"}
                                value={startDate}
                                onChangeAction={props.handleStartDate}
                            />
                            <InputDate
                                label={"Eind datum"}
                                size={"col-sm-6"}
                                name={"endDate"}
                                value={endDate}
                                onChangeAction={props.handleEndDate}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label={"Primair"}
                                name={"primary"}
                                value={primary}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={props.cancelEdit}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        occupations: state.systemData.occupations
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormOccupationsEdit);
