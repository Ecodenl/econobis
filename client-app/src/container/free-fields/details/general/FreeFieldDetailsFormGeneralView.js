import React from 'react';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FreeFieldsDefaultValueView from '../../defaultValue/FreeFieldsDefaultValueView';

const FreeFieldDetailsFormGeneralView = ({
    fieldName,
    fieldNameWebform,
    mandatory,
    visiblePortal,
    changePortal,
    defaultValue,
    switchToEdit,
    table,
    tablePrefixFieldNameWebform,
    fieldFormat,
    exportable,
    sortOrder,
    mask,
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
                        <ViewText label={'Veldnaam'} value={fieldName} />
                        <ViewText label={'Verplicht'} value={Boolean(mandatory) ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <ViewText label={'Zichtbaar in portaal'} value={Boolean(visiblePortal) ? 'Ja' : 'Nee'} />
                        <ViewText label={'Aan te passen in portaal'} value={Boolean(changePortal) ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        {/*<ViewText label={'Standaard waarde x'} value={defaultValue} />*/}
                        <FreeFieldsDefaultValueView
                            fieldFormatType={fieldFormat.formatType}
                            defaultValue={defaultValue}
                        />
                        <ViewText label={'Exporteerbaar'} value={Boolean(exportable) ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <ViewText label={'Volgorde'} value={sortOrder} />
                    </div>

                    {tablePrefixFieldNameWebform != null ? (
                        <div className="row">
                            <ViewText
                                label={'Veldnaam webformulier'}
                                value={fieldNameWebform ? tablePrefixFieldNameWebform + fieldNameWebform : ''}
                            />
                        </div>
                    ) : null}

                    <div className="row">
                        <ViewText label={'Masker'} value={mask} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default FreeFieldDetailsFormGeneralView;
