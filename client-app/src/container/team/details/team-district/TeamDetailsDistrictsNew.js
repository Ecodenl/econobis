import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import TeamDetailsAPI from '../../../../api/team/TeamDetailsAPI';
import { newTeamDistrict } from '../../../../actions/team/TeamDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import DistrictAPI from '../../../../api/district/DistrictAPI';

class TeamDetailsDistrictsNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            districtId: '',
            districtsToSelect: [],
            errors: {
                districtId: false,
                hasErrors: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({ districtId: value });
    }

    componentDidMount() {
        DistrictAPI.peekDistrictsForTeam().then(payload => {
            this.setState({ districtsToSelect: payload });
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const teamDistrict = {
            teamId: this.props.teamId,
            districtId: this.state.districtId,
        };

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(teamDistrict.districtId)) {
            errors.districtId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            TeamDetailsAPI.newTeamDistrict(teamDistrict)
                .then(payload => {
                    this.props.newTeamDistrict(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }

    render() {
        const selectedIds = (this.props.selectedDistricts || []).map(d => String(d.id));

        const districtsToSelectFiltered = (this.state.districtsToSelect || []).filter(
            d => !selectedIds.includes(String(d.id))
        );

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText label={'Team'} name={'team'} value={this.props.teamName} readOnly={true} />
                            <InputSelect
                                label={'Afspraakkalender'}
                                size={'col-sm-6'}
                                name={'districtId'}
                                options={districtsToSelectFiltered}
                                optionName={'name'}
                                value={this.state.districtId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.districtId}
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
        teamId: state.teamDetails.id,
        teamName: state.teamDetails.name,
        selectedDistricts: state.teamDetails.districts,
    };
};

const mapDispatchToProps = dispatch => ({
    newTeamDistrict: teamDistrict => {
        dispatch(newTeamDistrict(teamDistrict));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsDistrictsNew);
