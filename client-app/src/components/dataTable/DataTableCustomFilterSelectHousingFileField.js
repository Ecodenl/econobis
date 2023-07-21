import React from 'react';
import DataTableCustomFilterSelectNumber from './DataTableCustomFilterSelectNumber';
import DataTableCustomFilterSelectDropdown from './DataTableCustomFilterSelectDropdown';
import DataTableCustomFilterSelectBoolean from './DataTableCustomFilterSelectBoolean';

const DataTableBody = props => {
    const arraySelectNumberFields = [
        'build-year',
        'surface',
        'building-layers',
        'wall-surface',
        'total-window-surface',
        'floor-surface',
        'resident-count',
        'amount-gas',
        'amount-electricity',
    ];
    const arraySelectDropdownFields = [
        'building-type-category',
        'roof-type',
        'energy-label',
        'energy-label-status',
        // 'frame-type',
        'cook-type',
        'heat-source',
        'water-comfort',
        // 'pitched-roof-heating',
        // 'flat-roof-heating',
        // 'hr3p-glass-frame-current-glass',
        // 'glass-in-lead-replace-rooms-heated',
        'boiler-setting-comfort-heat',
        'crack-sealing-type',
        'current-floor-insulation',
        // 'building-heating-application',
        'ventilation-type',
        'current-living-rooms-windows',
        'current-wall-insulation',
        'current-roof-insulation',
        'current-sleeping-rooms-windows',
        'has-cavity-wall',
        'has-solar-panels',
        'heat-source-warm-tap-water',
    ];

    const arraySelectBooleanFields = ['monument', 'building-contract-type'];

    return (
        <>
            {arraySelectNumberFields.includes(props.housingFileField) ? (
                <DataTableCustomFilterSelectNumber
                    handleInputChange={props.handleInputChange}
                    type={props.type}
                    readOnly={props.readOnly}
                />
            ) : arraySelectDropdownFields.includes(props.housingFileField) ? (
                <DataTableCustomFilterSelectDropdown
                    handleInputChange={props.handleInputChange}
                    type={props.type}
                    readOnly={props.readOnly}
                />
            ) : arraySelectBooleanFields.includes(props.housingFileField) ? (
                <DataTableCustomFilterSelectBoolean
                    handleInputChange={props.handleInputChange}
                    type={props.type}
                    readOnly={props.readOnly}
                />
            ) : null}
        </>
    );
};

export default DataTableBody;
