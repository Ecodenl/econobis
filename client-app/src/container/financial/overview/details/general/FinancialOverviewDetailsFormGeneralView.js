import React from 'react';

import ViewText from '../../../../../components/form/ViewText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';

const FinancialOverviewDetailsFormGeneralView = ({ year, administrationId, switchToEdit, administrations }) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Jaar'} value={year} />
                        <ViewText
                            label={'Administratie'}
                            value={
                                administrationId
                                    ? administrations.find(administration => administration.id == administrationId).name
                                    : ''
                            }
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default FinancialOverviewDetailsFormGeneralView;
