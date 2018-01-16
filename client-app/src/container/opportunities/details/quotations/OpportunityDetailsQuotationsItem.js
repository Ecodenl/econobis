import React, {Component} from 'react';
import moment from 'moment';

import OpportunityDetailsAPI from '../../../../api/opportunity/OpportunityDetailsAPI';
import OpportunityDetailsQuotationView from './OpportunityDetailsQuotationView';
import OpportunityDetailsQuotationEdit from './OpportunityDetailsQuotationEdit';
import {connect} from "react-redux";

class OpportunityDetailsQuotationsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,

            quotation: {
                ...props.quotation,
                organisationId: props.quotation.organisation.id,
                organisationName: props.quotation.organisation.name,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        if(this.props.permissions.manageOpportunity) {
            this.setState({showEdit: true});
        }
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            quotation: {
                ...this.props.quotation,
                organisationId: this.props.quotation.organisation.id,
                organisationName: this.props.quotation.organisation.name,}
        });

        this.closeEdit();
    };

    setOrganisationIdAndName = (id, name) => {
        this.setState({
            ...this.state,
            quotation: {
                ...this.state.quotation,
                organisationId: id,
                organisationName: name
            },
        });
    };

    handleDateRequested = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            quotation: {
                ...this.state.quotation,
                dateRequested: formattedDate
            },
        });
    };

    handleDateTaken = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            quotation: {
                ...this.state.quotation,
                dateTaken: formattedDate
            },
        });
    };
    handleDateValidTill = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            quotation: {
                ...this.state.quotation,
                dateValidTill: formattedDate
            },
        });
    };
    handleDateRealised = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            quotation: {
                ...this.state.quotation,
                dateRealised: formattedDate
            },
        });
    };

    handleSubmit = () => {
        const { quotation } = this.state;

        OpportunityDetailsAPI.updateOpportunityQuotation(quotation).then(() => {
            this.closeEdit();
        });
    };

    render() {
        return (
            <div>
                <OpportunityDetailsQuotationView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    quotation={this.state.quotation}
                    opportunityMeasure={this.props.opportunityMeasure}
                    opportunityStatus={this.props.opportunityStatus}
                />
                {
                    this.state.showEdit &&
                    <OpportunityDetailsQuotationEdit
                        quotation={this.state.quotation}
                        opportunityMeasure={this.props.opportunityMeasure}
                        opportunityStatus={this.props.opportunityStatus}
                        setOrganisationIdAndName={this.setOrganisationIdAndName}
                        handleDateRealised={this.handleDateRealised}
                        handleDateRequested={this.handleDateRequested}
                        handleDateTaken={this.handleDateTaken}
                        handleDateValidTill={this.handleDateValidTill}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}

                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(OpportunityDetailsQuotationsItem);
