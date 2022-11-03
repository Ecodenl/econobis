import React, {Component} from 'react';

import ButtonEmails from './../../buttons/ButtonEmails';
import ButtonTasks from './../../buttons/ButtonTasks';
import JobLogs from '../../jobs-log/JobLogs';
import {connect} from "react-redux";
import MeAPI from "../../../../api/general/MeAPI";
import TwoFactorSettings from "../../../global/TwoFactorSettings";

class DashboardDefaultApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTwoFactorNotification: props.meDetails.showTwoFactorNotification && !props.meDetails.requireTwoFactorAuthentication,
            twoFactorSettingsActive: false,
        };

        this.handleHideTwoFactorNotification = this.handleHideTwoFactorNotification.bind(this);
    }

    handleHideTwoFactorNotification = () => {
        MeAPI.hideTwoFactorNotification().then(() => {
            this.setState({showTwoFactorNotification: false});
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.showTwoFactorNotification ? (
                        <>
                            <div className={'row'}>
                                <div className="col-xs-6">
                                    <div className="alert alert-info"
                                         style={{display: 'flex', justifyContent: 'space-between'}} role="alert">
                                        <div style={{flex: '1 1 auto'}}><a href="#"
                                                                           onClick={() => this.setState({twoFactorSettingsActive: true})}>Om de toegang van Econobis beter te beveiligen kan je nu kiezen voor 2 factor authenticatie bij het inloggen op Econobis. Deze functie is optioneel. Als je 2 factor authenticatie wilt instellen klik dan op deze tekst. Wil je geen gebruik maken van 2 factor authenticatie klik dan op het kruisje. Als je later alsnog 2 factor authenticatie wilt instellen kan je rechtsboven op je naam klikken en de optie “2 factor authenticatie” aanklikken</a></div>
                                        <div>
                                            <a href="#" onClick={this.handleHideTwoFactorNotification}
                                               className="btn btn-sm">x</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <TwoFactorSettings active={this.state.twoFactorSettingsActive}
                                               closeModal={() => this.setState({twoFactorSettingsActive: false})}/>
                        </>
                    ) : null
                }
                <div className={'row'}>
                    <ButtonEmails size={'col-xs-3'}/>
                    <ButtonTasks size={'col-xs-3'}/>
                </div>
                {/*<DashboardMain/>*/}
                <div className={'row'}>
                    <JobLogs size={'col-xs-6'}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        meDetails: state.meDetails,
    };
}

export default connect(mapStateToProps, null)(DashboardDefaultApp);