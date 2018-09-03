import React, {Component} from 'react';

import ContactGroupComposedGroupsList from './ContactGroupComposedGroupsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import ContactGroupComposedGroupAddGroup from "./ContactGroupComposedGroupAddGroup";
import {connect} from "react-redux";

class ContactGroupComposedGroups extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddGroup: false
        };

    }

    showAddGroup = () => {
        this.setState({showAddGroup: !this.state.showAddGroup});
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Samengesteld uit</span>
                    <a role="button" className="pull-right" onClick={this.showAddGroup}><span className="glyphicon glyphicon-plus"/></a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactGroupComposedGroupsList/>
                    </div>
                </PanelBody>
                {
                    this.state.showAddGroup &&
                    <ContactGroupComposedGroupAddGroup
                        closeDeleteItemModal={this.showAddGroup}
                        contactGroupId={this.props.contactGroupId}
                    />
                }
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contactGroupId: state.contactGroupDetails.id,
    };
};
export default connect(mapStateToProps)(ContactGroupComposedGroups);