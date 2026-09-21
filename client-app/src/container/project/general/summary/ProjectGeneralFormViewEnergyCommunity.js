import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const ProjectGeneralFormViewEnergyCommunity = ({ project }) => {
    const {
        name,
        dateStart,
        projectStatus,
        projectType,
        participationsDefinitive,
        participationsGranted,
        participationsOptioned,
        participationsInteressed,
        totalParticipationsPowerKwAvailable,
        totalParticipationsPowerKwhConsumption,
    } = project;

    return (
        <Panel>
            <PanelBody>
                <div className="row">
                    <ViewText label={'Project'} value={name} />
                    <ViewText label={'Deelnemers interesse'} value={participationsInteressed} />
                </div>

                <div className="row">
                    <ViewText label={'Type project'} value={projectType && projectType.name} />
                    <ViewText label={'Deelnemers ingeschreven'} value={participationsOptioned} />
                </div>

                <div className="row">
                    <ViewText label={'Status'} value={projectStatus && projectStatus.name} />
                    <ViewText label={'Deelnemers toegekend'} value={participationsGranted} />
                </div>

                <div className="row">
                    <ViewText label={'Start project'} value={dateStart ? moment(dateStart).format('L') : ''} />
                    <ViewText label={'Deelnemers definitief'} value={participationsDefinitive} />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <ViewText
                        label={'Totaal opgesteld vermogen deelnemers'}
                        value={totalParticipationsPowerKwAvailable}
                    />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <ViewText label={'Totaal verbruik deelnemers'} value={totalParticipationsPowerKwhConsumption} />
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectGeneralFormViewEnergyCommunity);
