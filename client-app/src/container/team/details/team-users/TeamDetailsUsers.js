import React, { Component } from 'react';

import TeamDetailsUsersList from './TeamDetailsUsersList';
import TeamDetailsUsersNew from './TeamDetailsUsersNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import TeamDetailsGroupsList from '../team-contact-groups/TeamDetailsGroupsList';
import TeamDetailsGroupsNew from '../team-contact-groups/TeamDetailsGroupsNew';

class TeamDetailsUsers extends Component {
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
                    <span className="h5 text-bold">Gekoppelde gebruikers</span>
                    {this.props.permissions.createTeam && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <span className="glyphicon glyphicon-plus" />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <TeamDetailsUsersList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <TeamDetailsUsersNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                </PanelBody>

                {/*<PanelHeader>*/}
                {/*    <span className="h5 text-bold">Gekoppelde gebruikers</span>*/}
                {/*    {this.props.permissions.createTeam && (*/}
                {/*        <a role="button" className="pull-right" onClick={this.toggleShowNew}>*/}
                {/*            <span className="glyphicon glyphicon-plus" />*/}
                {/*        </a>*/}
                {/*    )}*/}
                {/*</PanelHeader>*/}
                {/*<PanelBody>*/}
                {/*    <div className="col-md-12">*/}
                {/*        <TeamDetailsGroupsList />*/}
                {/*    </div>*/}
                {/*    <div className="col-md-12 margin-10-top">*/}
                {/*        {this.state.showNew && <TeamDetailsGroupsNew toggleShowNew={this.toggleShowNew} />}*/}
                {/*    </div>*/}
                {/*</PanelBody>*/}
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(TeamDetailsUsers);
