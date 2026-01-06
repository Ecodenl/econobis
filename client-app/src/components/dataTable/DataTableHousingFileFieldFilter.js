import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HousingFileDetailsAPI from '../../api/housing-file/HousingFileDetailsAPI';

class DataTableHousingFileFieldFilter extends Component {
    constructor(props) {
        super(props);

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
        // Laat je niet foppen:
        // building-contract-type is hoomdossier naam voor wat in econobis is_house_for_sale heet
        // (en monument heet in econobis is_monument)
        const arraySelectNoYesUnknownFields = ['monument', 'building-contract-type'];

        this.state = {
            housingFileField: '',
            optionsToSelect: [],
            value: [],
            arraySelectNumberFields,
            arraySelectDropdownFields,
            arraySelectNoYesUnknownFields,
            optionKeyAsId: false,
            noYesUnknownOptions: [
                {
                    id: 0,
                    name: 'Nee',
                },
                {
                    id: 1,
                    name: 'Ja',
                },
                {
                    id: 2,
                    name: 'Onbekend',
                },
            ],
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.housingFileField !== prevProps.housingFileField) {
            this.setState({ ...this.state, optionsToSelect: [], housingFileField: this.props.housingFileField });
            this.getOptionsToSelect(this.props.housingFileField);
        }
    }

    getOptionsToSelect(housingFileField) {
        switch (housingFileField) {
            case 'building-type-category':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('building-types')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'roof-type':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('roof-types')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'energy-label':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('energy-labels')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, hasError: true });
                    });
                break;
            case 'energy-label-status':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('energy-label-status')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            // case 'frame-type':
            //     HousingFileDetailsAPI.fetchHousingFileSelectionPerType('frame-type-selection')
            //         .then(payload => {
            //             this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
            //         })
            //         .catch(error => {
            //             this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
            //         });
            //     break;

            case 'cook-type':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('cook-type-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'heat-source':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('heat-source-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'water-comfort':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('water-comfort-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;

            // case 'pitched-roof-heating':
            //     HousingFileDetailsAPI.fetchHousingFileSelectionPerType('pitched-roof-heating-selection')
            //         .then(payload => {
            //             this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
            //         })
            //         .catch(error => {
            //             this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
            //         });
            //     break;
            // case 'flat-roof-heating':
            //     HousingFileDetailsAPI.fetchHousingFileSelectionPerType('flat-roof-heating-selection')
            //         .then(payload => {
            //             this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
            //         })
            //         .catch(error => {
            //             this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
            //         });
            //     break;
            // case 'hr3p-glass-frame-current-glass':
            //     HousingFileDetailsAPI.fetchHousingFileSelectionPerType('hr3p-glass-frame-current-glass-selection')
            //         .then(payload => {
            //             this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
            //         })
            //         .catch(error => {
            //             this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
            //         });
            //     break;
            // case 'glass-in-lead-replace-rooms-heated':
            //     HousingFileDetailsAPI.fetchHousingFileSelectionPerType('glass-in-lead-replace-rooms-heated-selection')
            //         .then(payload => {
            //             this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
            //         })
            //         .catch(error => {
            //             this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
            //         });
            //     break;

            case 'boiler-setting-comfort-heat':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('boiler-setting-comfort-heat-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'crack-sealing-type':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('crack-sealing-type-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'current-floor-insulation':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('current-floor-insulation-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            // case 'building-heating-application':
            //     HousingFileDetailsAPI.fetchHousingFileSelectionPerType('building-heating-application-selection')
            //         .then(payload => {
            //             this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
            //         })
            //         .catch(error => {
            //             this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
            //         });
            //     break;
            case 'ventilation-type':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('ventilation-type-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'current-living-rooms-windows':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('current-living-rooms-windows-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'current-wall-insulation':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('current-wall-insulation-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'current-roof-insulation':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('current-roof-insulation-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'current-sleeping-rooms-windows':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('current-sleeping-rooms-windows-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'has-cavity-wall':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('has-cavity-wall-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'has-solar-panels':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('has-solar-panels-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;
            case 'heat-source-warm-tap-water':
                HousingFileDetailsAPI.fetchHousingFileSelectionPerType('heat-source-warm-tap-water-selection')
                    .then(payload => {
                        this.setState({ ...this.state, optionsToSelect: payload, housingFileField: housingFileField });
                    })
                    .catch(error => {
                        this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                    });
                break;

            default:
                this.setState({ ...this.state, optionsToSelect: [], housingFileField: housingFileField });
                break;
        }
    }

    render() {
        const { id, name, value, handleInputChange, readOnly } = this.props;
        // console.log('render - this state: ');
        // console.log(this.state);
        // console.log('render - this props: ');
        // console.log(this.props);
        // console.log('render - housingFileField this state: ');
        // console.log(this.state.housingFileField);
        // console.log('render - optionsToSelect this state: ');
        // console.log(this.state.optionsToSelect);

        const {
            optionsToSelect,
            housingFileField,
            arraySelectNumberFields,
            arraySelectDropdownFields,
            arraySelectNoYesUnknownFields,
        } = this.state;

        // console.log('render - value: ');
        // console.log(value);
        // console.log('render - housingFileField: ');
        // console.log(housingFileField);
        // console.log('render - optionsToSelect: ');
        // console.log(optionsToSelect);

        return (
            <>
                {!housingFileField ? (
                    <span>Kies eerst een kenmerk</span>
                ) : arraySelectNumberFields.includes(housingFileField) ? (
                    <input
                        className={'form-control input-sm'}
                        type="text"
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        readOnly={readOnly}
                    />
                ) : arraySelectDropdownFields.includes(housingFileField) ? (
                    <select
                        className={`form-control input-sm`}
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        disabled={readOnly}
                    >
                        <option value="">--Kies een status/waarde--</option>
                        {optionsToSelect &&
                            optionsToSelect.map(option => {
                                // console.log(option.id);
                                // console.log(option.key);
                                // console.log(option.name);
                                return (
                                    <option
                                        key={option.key != null ? option.key : option.id}
                                        value={option.key != null ? option.key : option.id}
                                    >
                                        {option.name}
                                    </option>
                                );
                            })}
                    </select>
                ) : arraySelectNoYesUnknownFields.includes(housingFileField) ? (
                    <select
                        className={`form-control input-sm`}
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        disabled={readOnly}
                    >
                        <option value="">--Kies een status/waarde--</option>
                        {this.state.noYesUnknownOptions.map(option => {
                            return (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            );
                        })}
                    </select>
                ) : (
                    <span>Geen waarden: {housingFileField}</span>
                )}
            </>
        );
    }
}

DataTableHousingFileFieldFilter.defaultProps = {
    className: '',
    readOnly: false,
    value: null,
};

DataTableHousingFileFieldFilter.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    readOnly: PropTypes.bool,
};

export default DataTableHousingFileFieldFilter;
