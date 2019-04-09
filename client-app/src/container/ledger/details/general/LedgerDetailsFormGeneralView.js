import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const VatCodeDetailsFormGeneralView = ({ description, vatCodeId, twinfieldLedgerCode, switchToEdit, vatCodes }) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Omschrijving'} value={description} />
                        <ViewText
                            label={'BTW code'}
                            value={vatCodeId ? vatCodes.find(vatCode => vatCode.id == vatCodeId).description : 'Geen'}
                        />
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
