import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    clearFilterAddressDongles,
    setFilterAddressDongleFullName,
    setFilterAddressDongleAddress,
    setFilterAddressDonglePostalCode,
    setFilterAddressDongleCity,
    setFilterAddressDongleTypeReadOutId,
    setFilterAddressDongleDateStartStart,
    setFilterAddressDongleDateStartEnd,
    setFilterAddressDongleDateEndStart,
    setFilterAddressDongleDateEndEnd,
    setFilterAddressDongleTypeDongleId,
    setFilterAddressDongleEnergyId,
    // setFilterAddressDongleMacNumber,
    // setFilterAddressDongleDateSignedStart,
    // setFilterAddressDongleDateSignedEnd,
} from '../../../actions/address-dongle/AddressDonglesFiltersActions';
import DataTableFilterDateStartEndTwoRows from '../../../components/dataTable/DataTableFilterDateStartEndTwoRows';

const AddressDonglesListFilter = props => {
    const onFullNameChange = e => {
        props.setFilterAddressDongleFullName(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onAddressChange = e => {
        props.setFilterAddressDongleAddress(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onPostalCodeChange = e => {
        props.setFilterAddressDonglePostalCode(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onCityChange = e => {
        props.setFilterAddressDongleCity(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onTypeReadOutIdChange = e => {
        props.setFilterAddressDongleTypeReadOutId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onDateStartStartChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterAddressDongleDateStartStart('');
        } else {
            props.setFilterAddressDongleDateStartStart(moment(selectedDay).format('Y-MM-DD'));
        }
    };
    const onDateStartEndChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterAddressDongleDateStartEnd('');
        } else {
            props.setFilterAddressDongleDateStartEnd(moment(selectedDay).format('Y-MM-DD'));
        }
    };
    const onDateEndStartChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterAddressDongleDateEndStart('');
        } else {
            props.setFilterAddressDongleDateEndStart(moment(selectedDay).format('Y-MM-DD'));
        }
    };
    const onDateEndEndChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterAddressDongleDateEndEnd('');
        } else {
            props.setFilterAddressDongleDateEndEnd(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onTypeDongleIdChange = e => {
        props.setFilterAddressDongleTypeDongleId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onEnergyIdChange = e => {
        props.setFilterAddressDongleEnergyId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.fullName.data}
                    onChange={onFullNameChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.address.data}
                    onChange={onAddressChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.postalCode.data}
                    onChange={onPostalCodeChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.city.data}
                    onChange={onCityChange}
                />
            </th>
            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.typeReadOutId.data}
                    onChange={onTypeReadOutIdChange}
                >
                    <option />
                    {props.typesReadOut.map(typeReadOut => {
                        return (
                            <option key={typeReadOut.id} value={typeReadOut.id}>
                                {typeReadOut.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <DataTableFilterDateStartEndTwoRows
                startDate={props.filters.dateStartStart.data && props.filters.dateStartStart.data}
                endDate={props.filters.dateStartEnd.data && props.filters.dateStartEnd.data}
                onChangeActionStart={onDateStartStartChange}
                onChangeActionEnd={onDateStartEndChange}
            />
            <DataTableFilterDateStartEndTwoRows
                startDate={props.filters.dateEndStart.data && props.filters.dateEndStart.data}
                endDate={props.filters.dateEndEnd.data && props.filters.dateEndEnd.data}
                onChangeActionStart={onDateEndStartChange}
                onChangeActionEnd={onDateEndEndChange}
            />
            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.typeDongleId.data}
                    onChange={onTypeDongleIdChange}
                >
                    <option />
                    {props.typesDongle.map(typeDongle => {
                        return (
                            <option key={typeDongle.id} value={typeDongle.id}>
                                {typeDongle.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.energyId.data}
                    onChange={onEnergyIdChange}
                />
            </th>

            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.addressDongles.filters,
    typesReadOut: state.systemData.dongleTypeReadOuts,
    typesDongle: state.systemData.dongleTypeDongles,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            clearFilterAddressDongles,
            setFilterAddressDongleFullName,
            setFilterAddressDongleAddress,
            setFilterAddressDonglePostalCode,
            setFilterAddressDongleCity,
            setFilterAddressDongleTypeReadOutId,
            setFilterAddressDongleDateStartStart,
            setFilterAddressDongleDateStartEnd,
            setFilterAddressDongleDateEndStart,
            setFilterAddressDongleDateEndEnd,
            setFilterAddressDongleTypeDongleId,
            setFilterAddressDongleEnergyId,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressDonglesListFilter);
