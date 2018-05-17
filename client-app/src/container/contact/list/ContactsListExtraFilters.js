import React, {Component} from 'react';

import Modal from '../../../components/modal/Modal';
import DataTableCustomFilter from "../../../components/dataTable/DataTableCustomFilter";
import ButtonText from "../../../components/button/ButtonText";
import {connect} from "react-redux";

class ContactsListExtraFilters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amountOfFilters: props.amountOfFilters !== undefined ? props.amountOfFilters : 1,
            filters: props.extraFilters !== undefined ? props.extraFilters : [{
                field: 'name',
                type: 'eq',
                data: ''
            }],
        };
    };

    closeModal = () => {
        this.props.toggleShowExtraFilters();
    };

    confirmAction = () => {
        this.props.handleExtraFiltersChange(this.state.filters, this.state.amountOfFilters);
        this.props.toggleShowExtraFilters();
    };

    handleFilterChange = (field, data, filterNumber) => {
        let filters = this.state.filters;

        filters[filterNumber][field] = data;

        this.setState({
            ...this.state,
            filters: filters
        });
    };

    addFilterRow = () => {

        let filters = this.state.filters;

        filters[this.state.amountOfFilters] =
            {
                field: 'name',
                type: 'eq',
                data: ''
            };

        setTimeout(() => {
            this.setState({
                ...this.state,
                filters: filters
            });
        }, 300);

        setTimeout(() => {
        this.setState({
            amountOfFilters: this.state.amountOfFilters + 1,
        });
        }, 300);
    };

    render() {
        const fields = {
            'name': {
                'name': 'Naam',
                'type': 'string'
            },
            'postalCodeNumber': {
                'name': 'Postcode nummer',
                'type': 'number'
            },
            'statusId': {
                'name': 'Status',
                'type': 'dropdown',
                'dropDownOptions': this.props.contactStatuses
            },
            'createdAt': {
                'name': 'Gemaakt op',
                'type': 'date'
            },
            'currentParticipations': {
                'name': 'Aantal participaties',
                'type': 'number'
            },
            'occupation': {
                'name': 'Verbinding',
                'type': 'dropdownHas',
                'dropDownOptions': this.props.occupations
            },
            'opportunity': {
                'name': 'Kans',
                'type': 'dropdownHas',
                'dropDownOptions': this.props.measureCategories
            },
        };

        let filters = [];

        for (let i = 0; i < this.state.amountOfFilters; i++) {
            filters.push(<DataTableCustomFilter key={i} filter={this.state.filters[i]} filterNumber={i} fields={fields} handleFilterChange={this.handleFilterChange}/>);
        }

        return (
            <Modal
                title="Extra filters"
                buttonConfirmText="Toepassen"
                confirmAction={this.confirmAction}
                closeModal={this.closeModal}
            >
                <table className="table">
                    <thead>
                    <tr>
                        <th className="col-md-4">Zoekveld</th>
                        <th className="col-md-4"/>
                        <th className="col-md-4">Waarde</th>
                    </tr>
                    </thead>
                    <tbody>
                     {filters}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-xs-12 text-right'>
                        <ButtonText buttonText={'Extra filter'} onClickAction={this.addFilterRow}/>
                    </div>
                </div>
            </Modal>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        participantProductionProjectStatus: state.systemData.participantProductionProjectStatus,
        contactStatuses: state.systemData.contactStatuses,
        occupations: state.systemData.occupations,
        measureCategories: state.systemData.measureCategories,
    };
};

export default connect(mapStateToProps)(ContactsListExtraFilters);