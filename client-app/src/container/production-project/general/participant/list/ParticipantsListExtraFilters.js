import React, {Component} from 'react';

import Modal from '../../../../../components/modal/Modal';
import DataTableCustomFilter from "../../../../../components/dataTable/DataTableCustomFilter";
import ButtonText from "../../../../../components/button/ButtonText";

class ParticipantsListExtraFilters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amountOfFilters: 1,
            filters: [],
        };
    };

    closeModal = () => {
        this.props.toggleShowExtraFilters();
    };

    confirmAction = () => {
        this.props.handleExtraFiltersChange(this.state.filters);
        this.props.toggleShowExtraFilters();
    };

    handleFilterChange = (field, type, data, filterNumber) => {
        let filters = this.state.filters;

        filters[filterNumber] =
            {
                field: field,
                type: type,
                data: data,
            };

        this.setState({
            ...this.state,
            filters: filters
        });
    };

    addFilterRow = () => {
        this.setState({
            amountOfFilters: this.state.amountOfFilters + 1,
        });
    };

    render() {
        const fields = {
            'id': {
             'name': 'Id',
             'type': 'number'
            },
            'name': {
                'name': 'Naam',
                'type': 'string'
            },
            'postalCode': {
                'name': 'Postcode',
                'type': 'string'
            },
            'currentParticipations': {
                'name': 'Aantal participaties',
                'type': 'number'
            },
        };

        let filters = [];

        for (let i = 0; i < this.state.amountOfFilters; i++) {
            filters.push(<DataTableCustomFilter key={i} filterNumber={i} fields={fields} handleFilterChange={this.handleFilterChange}/>);
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


export default ParticipantsListExtraFilters;
