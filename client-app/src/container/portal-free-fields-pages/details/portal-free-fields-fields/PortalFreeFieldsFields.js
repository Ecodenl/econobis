import React, { Component } from 'react';

import PortalFreeFieldsFieldsList from './PortalFreeFieldsFieldsList';
import PortalFreeFieldsFieldsNew from './PortalFreeFieldsFieldsNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class PortalFreeFieldsFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalFreeFieldsFields: props.portalFreeFieldsFields,
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    addResult = portalFreeFieldsField => {
        this.setState({
            portalFreeFieldsFields: [
                ...this.state.portalFreeFieldsFields,
                {
                    ...portalFreeFieldsField,
                },
            ],
        });
    };
    removeResult = portalFreeFieldsFieldId => {
        this.setState({
            portalFreeFieldsFields: this.state.portalFreeFieldsFields.filter(
                portalFreeFieldsField => portalFreeFieldsField.id !== portalFreeFieldsFieldId
            ),
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Vrije velden</span>
                    {this.props.showEditPage && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    {this.state.showNew && (
                        <div className="col-md-12 margin-10-top">
                            <PortalFreeFieldsFieldsNew
                                pageId={this.props.pageId}
                                toggleShowNew={this.toggleShowNew}
                                addResult={this.addResult}
                            />
                        </div>
                    )}
                    <div className="col-md-12">
                        <PortalFreeFieldsFieldsList
                            pageId={this.props.pageId}
                            showEditPage={this.props.showEditPage}
                            portalFreeFieldsFields={this.state.portalFreeFieldsFields}
                            removeResult={this.removeResult}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default PortalFreeFieldsFields;
