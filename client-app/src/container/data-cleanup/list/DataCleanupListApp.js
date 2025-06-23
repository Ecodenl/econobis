import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import DataCleanupListToolbar from './DataCleanupListToolbar';

import DataCleanupListItems from './DataCleanupListItems';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';

// Functionele wrapper voor de class component
const DataCleanupListAppWrapper = props => {
    const params = useParams();
    return <DataCleanupListApp {...props} params={params} />;
};

class DataCleanupListApp extends Component {
    render() {
        const dataCleanupType = this.props.params.type;
        const dataCleanupTypeText = () => {
            switch (dataCleanupType) {
                case 'items':
                    return 'items';
                case 'e-mail':
                    return 'e-mailcorrespondentie';
                case 'contacten':
                    return 'contacten';
            }
        };

        const renderContent = () => {
            switch (dataCleanupType) {
                case 'items':
                    return <DataCleanupListItems />;
                case 'e-mail':
                    return 'e-mailcorrespondentie';
                case 'contacten':
                    return 'contacten';
            }
        };

        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <DataCleanupListToolbar title={dataCleanupTypeText} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        {renderContent()}
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DataCleanupListAppWrapper);
