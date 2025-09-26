import React, { Component } from 'react';

import ProjectDetailsFormValueCourseList from './ProjectDetailsFormValueCourseList';
import ProjectDetailsFormValueCourseNew from './ProjectDetailsFormValueCourseNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import ButtonIcon from '../../../../components/button/ButtonIcon';

class ProjectDetailsFormValueCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Waardeverloop deelnames</span>
                    {this.props.permissions.manageProject && (
                        <ButtonIcon
                            buttonClassName={'pull-right btn btn-link'}
                            onClickAction={this.toggleShowNew}
                            iconName={'plus'}
                        />
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ProjectDetailsFormValueCourseList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && (
                            <ProjectDetailsFormValueCourseNew
                                toggleShowNew={this.toggleShowNew}
                                lastYearFinancialOverviewDefinitive={this.props.lastYearFinancialOverviewDefinitive}
                            />
                        )}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        lastYearFinancialOverviewDefinitive: state.projectDetails.lastYearFinancialOverviewDefinitive,
    };
};

export default connect(mapStateToProps)(ProjectDetailsFormValueCourse);
