import React, { Component } from 'react';

import CleanupItemsList from './CleanupItemsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class CleanupItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cleanupItems: props.cleanupItems,
            showNew: false,
        };
    }

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12">
                        <CleanupItemsList
                            cooperationId={this.props.cooperationId}
                            showEditCooperation={this.props.showEditCooperation}
                            cleanupItems={this.state.cleanupItems}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default CleanupItems;
