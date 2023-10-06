import React from 'react';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const FreeFieldDetailsFormGeneralView = ({
    fieldName,
    mandatory,
    visiblePortal,
    changePortal,
    defaultValue,
    switchToEdit,
    table,
    fieldFormat,
    exportable,
    sortOrder,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Op onderdeel'} value={table.name} />
                        <ViewText label={'Type'} value={fieldFormat.formatName} />
                    </div>

                    <div className="row">
                        <ViewText label={'Veld naam'} value={fieldName} />
                        <ViewText label={'Verplicht'} value={mandatory ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <ViewText label={'Zichtbaar in portaal'} value={visiblePortal ? 'Ja' : 'Nee'} />
                        <ViewText label={'Aan te passen in portaal'} value={changePortal ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <ViewText label={'Standaardwaarde'} value={defaultValue} />
                        <ViewText label={'Exporteerbaar'} value={exportable ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <ViewText label={'Volgorde'} value={sortOrder} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default FreeFieldDetailsFormGeneralView;
