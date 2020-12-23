import React from 'react';

import ViewText from '../../../../../components/form/ViewText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import moment from 'moment';

const FinancialOverviewDetailsFormGeneralView = ({
    year,
    administrationId,
    statusId,
    dateProcessed,
    switchToEdit,
    administrations,
}) => {
    let status = '';
    switch (statusId) {
        case 'concept':
            status = 'Concept';
            break;
        case 'definitive':
            status = 'Definitief';
            break;
        case 'processed':
            status = 'Verwerkt';
            break;
    }
    const dateProcessedFormated = dateProcessed ? moment(dateProcessed).format('DD-MM-Y') : '';

    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Jaar'} value={year} />
                        <ViewText label={'Status'} value={status} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Administratie'}
                            value={
                                administrationId
                                    ? administrations.find(administration => administration.id == administrationId).name
                                    : ''
                            }
                        />
                        <ViewText label={'Datum verwerkt'} value={dateProcessedFormated} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default FinancialOverviewDetailsFormGeneralView;
