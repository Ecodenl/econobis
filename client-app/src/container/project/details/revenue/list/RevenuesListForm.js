import React, { Component } from 'react';

import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

class RevenuesListForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengsten</span>
                    {this.props.permissions.manageFinancial && (
                        <ButtonIcon
                            buttonClassName={'pull-right btn btn-link'}
                            onClickAction={() => hashHistory.push(`/project/opbrengst/nieuw/${this.props.projectId}`)}
                            disabled={this.props.projectStatus.codeRef !== 'active'}
                            title={
                                this.props.projectStatus.codeRef !== 'active'
                                    ? 'Opbrengst verdeling kan alleen bij status actief worden toegevoegd'
                                    : 'Nieuwe opbrengst verdeling maken'
                            }
                            iconName={'glyphicon-plus'}
                        />
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <RevenuesListFormList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        projectStatus: state.projectDetails.projectStatus,
    };
};

export default connect(mapStateToProps)(RevenuesListForm);
