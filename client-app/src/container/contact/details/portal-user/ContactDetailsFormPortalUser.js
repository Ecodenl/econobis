import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactDetailsFormPortalUserEdit from './ContactDetailsFormPortalUserEdit';
import ContactDetailsFormPortalUserView from './ContactDetailsFormPortalUserView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsFormPortalUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelHeader>
                    <span className="h5 text-bold">Portal gebruiker gegevens</span>
                </PanelHeader>
                <PanelBody>
                    <p>**Under construction**</p>
                    {/*{!props.portalUser ? <p>Niet geactiveerd</p> : null}*/}
                    {/*{props.portalUser && this.state.showEdit ? (*/}
                    {/*<ContactDetailsFormPortalUserView switchToEdit={this.switchToEdit} />*/}
                    {/*) : null}*/}
                    {/*{props.portalUser && !this.state.showEdit ? (*/}
                    {/*<ContactDetailsFormPortalUserEdit switchToView={this.switchToView} />*/}
                    {/*) : null}*/}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        portalUser: state.contactDetails.portalUser,
    };
};

export default connect(
    mapStateToProps,
    null
)(ContactDetailsFormPortalUser);
