import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';
import CooperationDetailsAPI from '../../../api/cooperation/CooperationDetailsAPI';

class CooperationDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            syncingFromLaposta: false,
        };
    }

    syncStateAllMembersFromLaposta = () => {
        this.setState({ syncingFromLaposta: true });
        CooperationDetailsAPI.syncStateAllMembersLaposta(this.props.formData.id).then(payload => {
            this.setState({ syncingFromLaposta: false });
            this.props.setError(200, payload.data);
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        {this.props.formData.useLaposta == true && (
                            <ButtonText
                                loading={this.state.syncingFromLaposta}
                                loadText={'Status relaties van Laposta aan het ophalen'}
                                buttonText={
                                    <span>
                                        <span
                                            className="glyphicon glyphicon-refresh"
                                            title="Status relaties van Laposta ophalen"
                                        />
                                        &nbsp;Status relaties van Laposta
                                    </span>
                                }
                                onClickAction={this.syncStateAllMembersFromLaposta}
                            />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Coöperatie instellingen</h4>
                </div>
                <div className="col-md-4" />
            </div>
        );
    }
}

export default CooperationDetailsToolbar;
