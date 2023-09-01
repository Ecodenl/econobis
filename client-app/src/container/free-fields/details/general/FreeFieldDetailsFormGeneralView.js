import React from 'react';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const FreeFieldDetailsFormGeneralView = ({
    table_id,
    field_format_id,
    field_name,
    mandatory,
    visible_portal,
    change_portal,
    default_value,
    switchToEdit,
    free_fields_table,
    free_fields_field_format,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Op onderdeel'} value={free_fields_table.name} />
                        <ViewText label={'Type'} value={free_fields_field_format.format_name} />
                    </div>

                    <div className="row">
                        <ViewText label={'Veld naam'} value={field_name} />
                        <ViewText label={'Verplicht'} value={mandatory ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <ViewText label={'Zichtbaar in portaal'} value={visible_portal ? 'Ja' : 'Nee'} />
                        <ViewText label={'Aan te passen in portaal'} value={change_portal ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <ViewText label={'Standaardwaarde'} value={default_value} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default FreeFieldDetailsFormGeneralView;
