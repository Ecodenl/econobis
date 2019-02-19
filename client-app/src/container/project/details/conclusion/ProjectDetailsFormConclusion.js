import React from 'react';

import ProjectDetailsFormConclusionView from './ProjectDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const ProjectDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <ProjectDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default ProjectDetailsFormConclusion;
