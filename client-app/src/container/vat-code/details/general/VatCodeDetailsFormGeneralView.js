import React from 'react';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const VatCodeDetailsFormGeneralView = ({
    startDate,
    description,
    percentage,
    twinfieldCode,
    twinfieldLedgerCode,
    switchToEdit,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Startdatum'} value={startDate && moment(startDate).format('L')} />
                        <ViewText label={'Omschrijving'} value={description} />
                    </div>

                    <div className="row">
                        <ViewText label={'Percentage'} value={`${percentage}%`} />
                        <ViewText label={'Twinfield code'} value={twinfieldCode} />
                    </div>

                    <div className="row">
                        <ViewText label={'Twinfield grootboek code'} value={twinfieldLedgerCode} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default VatCodeDetailsFormGeneralView;
