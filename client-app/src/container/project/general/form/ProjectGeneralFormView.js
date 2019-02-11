import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import { startCase } from 'lodash';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const ProjectGeneralFormView = ({ project, projectTypes }) => {
    const {
        name,
        dateStart,
        projectStatus,
        issuedParticipations,
        participationsInOption,
        issuableParticipations,
        projectTypeId,
    } = project;

    const formatParticipation =
        projectTypes.find(projectType => projectType.codeRef === 'obligation').id == projectTypeId
            ? 'obligatie'
            : 'participatie';

    return (
        <Panel>
            <PanelBody>
                <div className="row">
                    <ViewText label={'Project'} value={name} />
                    <ViewText
                        label={`Uitgegeven ${formatParticipation}s`}
                        value={issuedParticipations && issuedParticipations}
                    />
                </div>

                <div className="row">
                    <ViewText label={'Status'} value={projectStatus && projectStatus.name} />
                    <ViewText
                        label={`${startCase(formatParticipation)}s in optie`}
                        value={participationsInOption && participationsInOption}
                    />
                </div>

                <div className="row">
                    <ViewText label={'Start project'} value={dateStart ? moment(dateStart).format('L') : ''} />
                    <ViewText
                        label={`Uit te geven ${formatParticipation}s`}
                        value={issuableParticipations && issuableParticipations}
                    />
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

export default connect(mapStateToProps)(ProjectGeneralFormView);
