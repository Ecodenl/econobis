import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import MeasureAPI from '../../../../api/measure/MeasureAPI';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { fetchMeasure } from '../../../../actions/measure/MeasureDetailsActions';

class MeasureDetailsSupplierNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organisationId: '',
            organisations: [],
            errors: {
                organisation: false,
                hasErrors: true,
            },
        };
    }

    UNSAFE_componentWillMount() {
        OrganisationAPI.getOrganisationPeek().then(payload => {
            this.setState({
                organisations: payload,
            });
        });
    }

    handleOrganisationChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        if (value === '') {
            this.setState({
                ...this.state,
                organisationId: '',
                errors: {
                    organisation: true,
                    hasErrors: true,
                },
            });
        } else {
            this.setState({
                ...this.state,
                organisationId: value,
                errors: {
                    organisation: false,
                    hasErrors: false,
                },
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.errors.hasErrors) {
            MeasureAPI.attachSupplier(this.props.measureId, this.state.organisationId).then(() => {
                this.props.fetchMeasure(this.props.measureId);
                this.props.toggleShowNew();
            });
        } else {
            this.setState({
                ...this.state,
                errors: {
                    organisation: true,
                    hasErrors: true,
                },
            });
        }
    };

    render() {
        const { organisationId } = this.state;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Maatregel'}
                                name={'measure'}
                                value={this.props.measureName}
                                readOnly={true}
                            />
                            <InputSelect
                                label={'Organisatie'}
                                size={'col-sm-6'}
                                name={'organisationId'}
                                options={this.state.organisations}
                                value={organisationId}
                                onChangeAction={this.handleOrganisationChange}
                                required={'required'}
                                error={this.state.errors.organisation}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        measureId: state.measureDetails.id,
        measureName: state.measureDetails.name,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMeasure: id => {
        dispatch(fetchMeasure(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasureDetailsSupplierNew);
