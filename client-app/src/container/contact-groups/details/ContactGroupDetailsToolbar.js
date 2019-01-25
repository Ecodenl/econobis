import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonText from '../../../components/button/ButtonText';
import { hashHistory } from 'react-router';
import ContactGroupDetailsDelete from './ContactGroupDetailsDelete';

class UserDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        const { id, name, numberOfContacts = 0, composedOf } = this.props.contactGroup;
        let composedOfType = '';
        if (composedOf === 'contacts') {
            composedOfType = '(Contacten)';
        } else if (composedOf === 'participants') {
            composedOfType = '(Deelnemers)';
        } else if (composedOf === 'both') {
            composedOfType = '(Samengesteld)';
        }

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group" role="group">
                                    <ButtonIcon
                                        iconName={'glyphicon-arrow-left'}
                                        onClickAction={browserHistory.goBack}
                                    />
                                    {this.props.permissions.manageGroup &&
                                        !this.props.contactGroup.isUsedInComposedGroup && (
                                            <ButtonIcon
                                                iconName={'glyphicon-trash'}
                                                onClickAction={this.toggleDelete}
                                            />
                                        )}
                                    <ButtonText
                                        buttonText={`Open lijst (${numberOfContacts})`}
                                        onClickAction={() => hashHistory.push(`/contacten-in-groep/${id}`)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center">
                                    {name}
                                    {composedOfType}
                                </h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>
                {this.state.showDelete && (
                    <ContactGroupDetailsDelete closeDeleteItemModal={this.toggleDelete} name={name} id={id} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactGroup: state.contactGroupDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(
    mapStateToProps,
    null
)(UserDetailsToolbar);
