import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setFilterDocumentNumber,
    setFilterDocumentDate,
    setFilterDocumentFilename,
    setFilterDocumentContact,
    setFilterDocumentDocumentCreatedFrom,
    setFilterDocumentDocumentType,
    setFilterDocumentDocumentGroup,
} from '../../../actions/document/DocumentFiltersActions';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';

const DocumentsListFilter = props => {
    const onNumberChange = e => {
        props.setFilterDocumentNumber(e.target.value);
    };

    const onDateChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterDocumentDate('');
        } else {
            props.setFilterDocumentDate(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onFilenameChange = e => {
        props.setFilterDocumentFilename(e.target.value);
    };

    const onContactChange = e => {
        props.setFilterDocumentContact(e.target.value);
    };

    const onDocumentCreatedFromChange = e => {
        props.setFilterDocumentDocumentCreatedFrom(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onDocumentTypeChange = e => {
        props.setFilterDocumentDocumentType(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onDocumentGroupChange = e => {
        props.setFilterDocumentDocumentGroup(e.target.value);

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
                    value={props.filters.number.data}
                    onChange={onNumberChange}
                />
            </th>

            <DataTableFilterDate
                value={props.filters.date.data && props.filters.date.data}
                onChangeAction={onDateChange}
            />

            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.filename.data}
                    onChange={onFilenameChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.contact.data}
                    onChange={onContactChange}
                />
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.documentCreatedFrom.data}
                    onChange={onDocumentCreatedFromChange}
                >
                    <option />
                    {props.documentCreatedFroms.map(documentCreatedFrom => {
                        return (
                            <option key={documentCreatedFrom.id} value={documentCreatedFrom.id}>
                                {documentCreatedFrom.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.documentType.data}
                    onChange={onDocumentTypeChange}
                >
                    <option />
                    {props.documentTypes.map(documentType => {
                        return (
                            <option key={documentType.id} value={documentType.id}>
                                {documentType.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.documentGroup.data}
                    onChange={onDocumentGroupChange}
                >
                    <option />
                    {props.documentGroups.map(documentGroup => {
                        return (
                            <option key={documentGroup.id} value={documentGroup.id}>
                                {documentGroup.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.documents.filters,
    documentCreatedFroms: state.systemData.documentCreatedFroms,
    documentTypes: state.systemData.documentTypes,
    documentGroups: state.systemData.documentGroups,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFilterDocumentNumber,
            setFilterDocumentDate,
            setFilterDocumentFilename,
            setFilterDocumentContact,
            setFilterDocumentDocumentCreatedFrom,
            setFilterDocumentDocumentType,
            setFilterDocumentDocumentGroup,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsListFilter);
