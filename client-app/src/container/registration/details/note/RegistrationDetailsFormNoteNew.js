import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegistrationDetailsAPI from '../../../../api/registration/RegistrationDetailsAPI';
import { fetchRegistrationDetails } from '../../../../actions/registration/RegistrationDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class RegistrationDetailsFormNoteNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registrationId: this.props.id,
            note: '',
        }
    };

    handleInputChange = event => {
        this.setState({note: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();

        const note = this.state;

        RegistrationDetailsAPI.newRegistrationNote(note).then((payload) => {
            this.props.fetchRegistrationDetails(this.state.registrationId);

            this.props.toggleShowNew();
        });
    };

    render() {
        const {note} = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <div className="col-sm-12">
                                <textarea name={note} value={note} onChange={this.handleInputChange} className="form-control input-sm" />
                            </div>
                        </div>

                        <div className="pull-right btn-group margin-10-top" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Bewaren"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        id: state.registrationDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchRegistrationDetails: (id) => {
        dispatch(fetchRegistrationDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationDetailsFormNoteNew);