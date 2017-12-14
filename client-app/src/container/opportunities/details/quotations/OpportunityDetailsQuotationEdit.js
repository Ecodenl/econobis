import React, {Component} from 'react';

import OrganisationAPI from '../../../../api/OrganisationAPI';

import InputText from '../../../../components/form/InputText';
import InputDate from '../../../../components/form/InputDate';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class ContactDetailsQuotationEdit extends Component {
    constructor(props) {
        super(props);

        const {organisation, dateRequested, dateTaken, dateValidTill, dateRealised} = props.quotation;

        this.state = {
            quotation: {
                organisationId: organisation ? organisation.id : '',
                dateRequested: dateRequested ? dateRequested : '',
                dateTaken: dateTaken ? dateTaken : '',
                dateValidTill: dateValidTill ? dateValidTill : '',
                dateRealised: dateRealised ? dateRealised : '',
            },
            organisations: [],
            errors: {
                organisation: false,
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

    handleOrganisationChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const organisationName = target[target.selectedIndex].innerHTML;

        if (value === '') {
            this.setState({
                ...this.state,
                quotation: {
                    ...this.state.quotation,
                    [name]: value
                },
                errors: {
                    organisation: true
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
                    organisation: false
                },
            });
        }

        this.props.setOrganisationIdAndName(value, organisationName);
    };

    handleSubmit = event => {
        event.preventDefault();

        if(!this.state.errors.organisation){
            this.props.handleSubmit();
        }
    };

    render() {
        const {organisationId, dateRequested, dateTaken, dateValidTill, dateRealised} = this.state.quotation;
        return (
            <div>
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
                                    onChangeAction={this.props.handleDateRequested}
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
                                    onChangeAction={this.props.handleDateTaken}
                                />
                                <InputDate
                                    label={"Geldig tot"}
                                    name="dateValidTill"
                                    value={dateValidTill}
                                    onChangeAction={this.props.handleDateValidTill}
                                />
                            </div>

                            <div className="row">
                                <InputDate
                                    label={"Datum uitvoering"}
                                    name="dateRealised"
                                    value={dateRealised}
                                    onChangeAction={this.props.handleDateRealised}
                                />
                            </div>

                            <div className="pull-right btn-group" role="group">
                                <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                            onClickAction={this.props.cancelEdit}/>
                                <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}
                                            type={"submit"} value={"Submit"}/>
                            </div>
                        </PanelBody>
                    </Panel>
                </form>
            </div>
        );
    }
}

export default ContactDetailsQuotationEdit;
