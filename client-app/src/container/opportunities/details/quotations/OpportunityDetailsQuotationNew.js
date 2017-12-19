import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import OrganisationAPI from '../../../../api/OrganisationAPI';
import OpportunityAPI from '../../../../api/OpportunityAPI';
import InputText from '../../../../components/form/InputText';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { fetchOpportunity } from '../../../../actions/OpportunitiesActions';

class OpportunityDetailsQuotationNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotation: {
                organisationId:'',
                dateRequested:'',
                dateTaken:'',
                dateValidTill:'',
                dateRealised:'',
            },
            organisations: [],
            errors: {
                organisation: false,
                hasErrors: true,
            },
        };
    };

    componentWillMount() {
        OrganisationAPI.getOrganisationPeek().then(payload => {
            this.setState({
                organisations: payload
            });
        });
    }

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

    handleOrganisationChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (value === '') {
            this.setState({
                ...this.state,
                quotation: {
                    ...this.state.quotation,
                    [name]: value
                },
                errors: {
                    organisation: true,
                    hasErrors: true
                },
            });
        }
        else {
            this.setState({
                ...this.state,
                quotation: {
                    ...this.state.quotation,
                    [name]: value
                },
                errors: {
                    organisation: false,
                    hasErrors: false
                },
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const { quotation } = this.state;

        if(!this.state.errors.hasErrors){
            OpportunityAPI.storeOpportunityQuotation(this.props.opportunityId, quotation).then(() => {
               this.props.fetchOpportunity(this.props.opportunityId);
               this.props.toggleShowNew();
            });
        }
        else{
            this.setState({
                ...this.state,
                errors: {
                    organisation: true,
                    hasErrors: true
                },
            });
        }
    };

    render() {
        const {organisationId, dateRequested, dateTaken, dateValidTill, dateRealised} = this.state.quotation;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Kans"}
                                name={"opportunityMeasure"}
                                value={this.props.opportunityMeasure}
                                readOnly={true}
                            />
                            <InputSelect
                                label={"Organisatie"}
                                size={"col-sm-6"}
                                name={"organisationId"}
                                options={this.state.organisations}
                                value={organisationId}
                                onChangeAction={this.handleOrganisationChange}
                                required={"required"}
                                error={this.state.errors.organisation}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label={"Datum aanvraag"}
                                name="dateRequested"
                                value={dateRequested}
                                onChangeAction={this.handleDateRequested}
                            />
                            <InputText
                                label={"Offerte status"}
                                name={"opportunityStatus"}
                                value={this.props.opportunityStatus}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label={"Datum opname"}
                                name="dateTaken"
                                value={dateTaken}
                                onChangeAction={this.handleDateTaken}
                            />
                            <InputDate
                                label={"Geldig tot"}
                                name="dateValidTill"
                                value={dateValidTill}
                                onChangeAction={this.handleDateValidTill}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label={"Datum uitvoering"}
                                name="dateRealised"
                                value={dateRealised}
                                onChangeAction={this.handleDateRealised}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        opportunityMeasure: state.opportunity.measure.name,
        opportunityStatus: state.opportunity.status.name,
        opportunityId: state.opportunity.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOpportunity: (id) => {
        dispatch(fetchOpportunity(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDetailsQuotationNew);

