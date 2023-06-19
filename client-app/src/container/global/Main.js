import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import {toggleSidebarClose, toggleSidebarOpen} from '../../actions/general/SidebarActions';
import {fetchMeDetails} from '../../actions/general/MeDetailsActions';
import {fetchSystemData} from '../../actions/general/SystemDataActions';
import NavHeader from '../../components/navigationHeader/NavHeader';
import Sidebar from '../../components/navigationSidebar/Sidebar';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import Content from './Content';
import {EmailModalProvider} from "../../context/EmailModalContext";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: false,
            menuStuck: false,
            changePasswordActive: false,
            twoFactorSettingsActive: false,
            showAboutUs: false,
        };

        const token = localStorage.getItem('access_token');

        if (this.props.authenticated && token) {
            props.fetchMeDetails();
        }

        this.onMenuEnter = this.onMenuEnter.bind(this);
        this.onMenuLeave = this.onMenuLeave.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleChangePassword = this.toggleChangePassword.bind(this);
        this.toggleTwoFactorSettings = this.toggleTwoFactorSettings.bind(this);
        this.toggleAboutUs = this.toggleAboutUs.bind(this);
        this.toggleMenuStuck = this.toggleMenuStuck.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('access_token');

        if (this.props.authenticated && token) {
            this.props.fetchSystemData();
        }
    }

    onMenuEnter() {
        this.setState({
            menuActive: true,
        });
    }

    onMenuLeave() {
        this.setState({
            menuActive: false,
        });
    }

    toggleMenu() {
        this.setState({
            menuActive: !this.state.menuActive,
        });
    }

    toggleMenuStuck() {
        this.setState({
            menuStuck: !this.state.menuStuck,
        });
    }

    toggleChangePassword() {
        this.setState({
            changePasswordActive: !this.state.changePasswordActive,
        });
    }

    toggleTwoFactorSettings() {
        this.setState({
            twoFactorSettingsActive: !this.state.twoFactorSettingsActive,
        });
    }

    toggleAboutUs() {
        this.setState({
            showAboutUs: !this.state.showAboutUs,
        });
    }

    render() {
        const contentClass = this.state.menuActive ? 'content open' : 'content';

        return (
            <div>
                {this.props.systemDataHasError || this.props.meDetailsHasError ? (
                    <ErrorPage/>
                ) : this.props.systemDataLoaded && this.props.meDetailsLoaded ? (
                    <BlockUi
                        tag="div"
                        blocking={this.props.blockUI}
                        className={'full-screen-loading'}
                        message={'Moment geduld, de gegevens worden opgehaald'}
                    >
                        <EmailModalProvider>
                            <div className="wrapper">
                                <div>
                                    <NavHeader
                                        menuStuck={this.state.menuStuck}
                                        toggleMenuStuck={this.toggleMenuStuck}
                                        toggleChangePassword={this.toggleChangePassword}
                                        toggleTwoFactorSettings={this.toggleTwoFactorSettings}
                                        toggleAboutUs={this.toggleAboutUs}
                                    />
                                    <Sidebar
                                        onMenuEnter={this.onMenuEnter}
                                        onMenuLeave={this.onMenuLeave}
                                        menuActive={this.state.menuActive}
                                        menuStuck={this.state.menuStuck}
                                    />
                                </div>

                                <div className={contentClass}>
                                    <div className="container-fluid">
                                        <div className="col-md-12">
                                            <Content
                                                children={this.props.children}
                                                toggleChangePassword={this.toggleChangePassword}
                                                toggleTwoFactorSettings={this.toggleTwoFactorSettings}
                                                changePasswordActive={this.state.changePasswordActive}
                                                twoFactorSettingsActive={this.state.twoFactorSettingsActive}
                                                toggleAboutUs={this.toggleAboutUs}
                                                showAboutUs={this.state.showAboutUs}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </EmailModalProvider>
                    </BlockUi>
                ) : (
                    <LoadingPage/>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        systemDataLoaded: state.systemData.isLoaded,
        systemDataHasError: state.systemData.hasError,
        meDetailsLoaded: state.meDetails.isLoaded,
        meDetailsHasError: state.meDetails.hasError,
        blockUI: state.blockUI.blocked,
        appName: state.systemData.appName,
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({fetchMeDetails, fetchSystemData, toggleSidebarClose, toggleSidebarOpen}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
