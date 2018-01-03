import React, { Component } from 'react';
import { connect } from 'react-redux';

import OpportunityAPI from '../../../../api/opportunity/OpportunityAPI';
import MeasureAPI from '../../../../api/measure/MeasureAPI';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { fetchMeasure } from '../../../../actions/measure/MeasureActions';

class MeasureDetailsOpportunityNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opportunityId:'',
            opportunities: [],
            errors: {
                opportunity: false,
                hasErrors: true,
            },
        };
    };

    componentWillMount() {
        OpportunityAPI.peekOpportunities().then(payload => {
            this.setState({
                opportunities: payload
            });
        });
    }

    handleOpportunityChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        if (value === '') {
            this.setState({
                ...this.state,
                opportunityId: '',
                errors: {
                    opportunity: true,
                    hasErrors: true
                },
            });
        }
        else {
            this.setState({
                ...this.state,
                opportunityId: value,
                errors: {
                    opportunity: false,
                    hasErrors: false
                },
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        if(!this.state.errors.hasErrors){
            MeasureAPI.associateOpportunity(this.props.measureId, this.state.opportunityId).then(() => {
               this.props.fetchMeasure(this.props.measureId);
               this.props.toggleShowNew();
            });
        }
        else{
            this.setState({
                ...this.state,
                errors: {
                    opportunity: true,
                    hasErrors: true
                },
            });
        }
    };

    render() {
        const {opportunityId} = this.state;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Maatregel"}
                                name={"measure"}
                                value={this.props.measureName}
                                readOnly={true}
                            />
                            <InputSelect
                                label={"Kans"}
                                size={"col-sm-6"}
                                name={"opportunityId"}
                                options={this.state.opportunities}
                                value={opportunityId}
                                onChangeAction={this.handleOpportunityChange}
                                required={"required"}
                                error={this.state.errors.opportunity}
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
        measureId: state.measure.id,
        measureName: state.measure.name,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMeasure: (id) => {
        dispatch(fetchMeasure(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasureDetailsOpportunityNew);

