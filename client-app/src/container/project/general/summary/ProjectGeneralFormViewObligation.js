import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const ProjectGeneralFormViewObligation = ({ project, projectTypes }) => {
    const {
        name,
        dateStart,
        projectStatus,
        participationsDefinitive,
        participationsGranted,
        participationsOptioned,
        participationsInteressed,
        totalParticipations,
        projectTypeId,
        projectType,
    } = project;

    const formatParticipation =
        projectTypes.find(projectType => projectType.codeRef === 'obligation').id == projectTypeId
            ? 'obligatie'
            : 'participatie';

    const participationsAvailable = totalParticipations - participationsDefinitive;

    return (
        <Panel>
            <PanelBody>
                <div className="row">
                    <ViewText label={'Project'} value={name} />
                    <ViewText label={'Obligaties interesse'} value={participationsInteressed} />
                </div>

                <div className="row">
                    <ViewText label={'Type project'} value={projectType && projectType.name} />
                    <ViewText label={'Obligaties ingeschreven'} value={participationsOptioned} />
                </div>

                <div className="row">
                    <ViewText label={'Status'} value={projectStatus && projectStatus.name} />
                    <ViewText label={'Obligaties toegekend'} value={participationsGranted} />
                </div>

                <div className="row">
                    <ViewText label={'Start project'} value={dateStart ? moment(dateStart).format('L') : ''} />
                    <ViewText label={'Uitgegeven obligaties'} value={participationsDefinitive} />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <ViewText label={'Uit te geven obligaties'} value={participationsAvailable} />
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
        projectTypes: state.systemData.projectTypes,
    };
};

export default connect(mapStateToProps)(ProjectGeneralFormViewObligation);
