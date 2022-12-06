import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactDetailsFormOtherEdit from './ContactDetailsFormOtherEdit';
import ContactDetailsFormOtherView from './ContactDetailsFormOtherView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsFormOther extends Component {
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
                    <span className="h5 text-bold">Overige gegevens</span>
                </PanelHeader>
                <PanelBody>
                    {this.props.permissions.updateContactOther && this.state.showEdit ? (
                        <ContactDetailsFormOtherEdit switchToView={this.switchToView} />
                    ) : (
                        <ContactDetailsFormOtherView switchToEdit={this.switchToEdit} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        typeId: state.contactDetails.typeId,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormOther);
