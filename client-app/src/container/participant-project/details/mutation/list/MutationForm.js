import React, { Component } from 'react';

import MutationFormList from './MutationFormList';
import MutationNew from '../new/MutationNew';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class MutationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNew: false,
            successNewMessage: '',
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
            successNewMessage: '',
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Mutaties</span>
                    {this.props.permissions.manageFinancial && !this.props.isTerminated && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <MutationNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                    <div className="col-md-12">
                        <MutationFormList />
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

export default connect(mapStateToProps)(MutationForm);
