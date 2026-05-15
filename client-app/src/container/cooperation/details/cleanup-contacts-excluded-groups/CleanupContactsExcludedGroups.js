import React, { Component } from 'react';

import CleanupContactsExcludedGroupList from './CleanupContactsExcludedGroupList';
import CleanupContactsExcludedGroupNew from './CleanupContactsExcludedGroupNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class CleanupContactsExcludedGroups extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cleanupContactsExcludedGroups: props.cleanupContactsExcludedGroups,
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    addResult = cleanupContactsExcludedGroup => {
        this.setState({
            cleanupContactsExcludedGroups: [
                ...this.state.cleanupContactsExcludedGroups,
                {
                    ...cleanupContactsExcludedGroup,
                },
            ],
        });
    };
    removeResult = cleanupContactsExcludedGroupId => {
        this.setState({
            cleanupContactsExcludedGroups: this.state.cleanupContactsExcludedGroups.filter(
                cleanupContactsExcludedGroup => cleanupContactsExcludedGroup.id !== cleanupContactsExcludedGroupId
            ),
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opschonen contacten uitzonderingsgroepen</span>
                    {this.props.showEditCooperation && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    {this.state.showNew && (
                        <div className="col-md-12 margin-10-top">
                            <CleanupContactsExcludedGroupNew
                                cooperationId={this.props.cooperationId}
                                toggleShowNew={this.toggleShowNew}
                                addResult={this.addResult}
                            />
                        </div>
                    )}
                    <div className="col-md-12">
                        <CleanupContactsExcludedGroupList
                            cooperationId={this.props.cooperationId}
                            showEditCooperation={this.props.showEditCooperation}
                            cleanupContactsExcludedGroups={this.state.cleanupContactsExcludedGroups}
                            removeResult={this.removeResult}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default CleanupContactsExcludedGroups;
