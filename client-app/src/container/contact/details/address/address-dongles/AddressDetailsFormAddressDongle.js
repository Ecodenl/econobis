import React, { Component } from 'react';

import AddressDetailsFormAddressDongleList from './AddressDetailsFormAddressDongleList';
// import AddressDetailsFormAddressDongleNew from './AddressDetailsFormAddressDongleNew';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import ButtonText from '../../../../../components/button/ButtonText';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class AddressDetailsFormAddressDongle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        const currentShowNew = this.state.showNew;
        this.setState({
            showNew: !currentShowNew,
        });
        this.props.setAddressDongleNewOrEditOpen(!currentShowNew);
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Monitoring</span>
                    {/*{this.props.permissions.createContactAddressDongle && (*/}
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                        <Icon size={14} icon={plus} />
                    </a>
                    {/*)}*/}

                    {/*{this.props.permissions.createContactAddress &&*/}
                    {/*    (this.props.permissions.updatePerson || this.props.permissions.updateOrganisation) &&*/}
                    {/*    this.props.addressDongleNewOrEditOpen == false && (*/}
                    {/*        <a role="button" className="pull-right" onClick={this.toggleShowNew}>*/}
                    {/*            <Icon size={14} icon={plus} />*/}
                    {/*        </a>*/}
                    {/*    )}*/}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <AddressDetailsFormAddressDongleList
                            address={this.props.address}
                            setAddressDongleNewOrEditOpen={this.props.setAddressDongleNewOrEditOpen}
                            addressDongleNewOrEditOpen={this.props.addressDongleNewOrEditOpen}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {/*{this.props.permissions.createContactAddress && this.state.showNew && (*/}
                        {/*    <AddressDetailsFormAddressDongleNew*/}
                        {/*        contactId={this.props.address.contactId}*/}
                        {/*        addressId={this.props.address.id}*/}
                        {/*        memberSinceGasDisabledBefore={this.props.address.memberSinceGasDisabledBefore}*/}
                        {/*        memberSinceElectricityDisabledBefore={*/}
                        {/*            this.props.address.memberSinceElectricityDisabledBefore*/}
                        {/*        }*/}
                        {/*        memberSinceGasAndElectricityDisabledBefore={*/}
                        {/*            this.props.address.memberSinceGasAndElectricityDisabledBefore*/}
                        {/*        }*/}
                        {/*        toggleShowNew={this.toggleShowNew}*/}
                        {/*    />*/}
                        {/*)}*/}
                    </div>
                    <div className="pull-right btn-group" role="group">
                        {/*<ButtonText*/}
                        {/*    buttonClassName={'btn-default'}*/}
                        {/*    buttonText={'Annuleren'}*/}
                        {/*    onClickAction={this.props.closeAddressDongle}*/}
                        {/*/>*/}
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
