import React, { Component } from 'react';

import AddressDetailsFormAddressDongleList from './AddressDetailsFormAddressDongleList';
import AddressDetailsFormAddressDongleNew from './AddressDetailsFormAddressDongleNew';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class AddressDetailsFormAddressDongle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewDongle: false,
            addressDongleNewOrEditOpen: false,
        };
    }

    toggleShowNewDongle = () => {
        const currentShowNewDongle = this.state.showNewDongle;
        this.setState({
            showNewDongle: !currentShowNewDongle,
        });
        this.props.setAddressDongleNewOrEditOpen(!currentShowNewDongle);
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Monitoring</span>
                    {this.props.permissions.manageDongles && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNewDongle}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        {this.props.permissions.manageDongles && this.state.showNewDongle && (
                            <AddressDetailsFormAddressDongleNew
                                contactId={this.props.address.contactId}
                                addressId={this.props.address.id}
                                toggleShowNewDongle={this.toggleShowNewDongle}
                            />
                        )}
                    </div>
                    <div className={`col-md-12 ${this.state.showNewDongle ? ' margin-10-top' : ''}`}>
                        <AddressDetailsFormAddressDongleList
                            address={this.props.address}
                            setAddressDongleNewOrEditOpen={this.props.setAddressDongleNewOrEditOpen}
                            addressDongleNewOrEditOpen={this.state.addressDongleNewOrEditOpen}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(AddressDetailsFormAddressDongle);
