import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

class ProjectGeneralToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { project } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group btn-group-flex  margin-small" role="group">
                                    <ButtonIcon
                                        iconName={'glyphicon-arrow-left'}
                                        onClickAction={browserHistory.goBack}
                                    />
                                    <ButtonText
                                        buttonText={`Open detailformulier`}
                                        onClickAction={() => hashHistory.push(`/project/details/${this.props.id}`)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center text-success margin-small">
                                    <strong>Productieproject {project ? project.name : ''}</strong>
                                </h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ProjectGeneralToolbar);
