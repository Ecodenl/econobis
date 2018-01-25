import React, { Component } from 'react';

import CampaignDetailsOrganisationsList from './CampaignDetailsOrganisationsList';
import CampaignDetailsOrganisationNew from './CampaignDetailsOrganisationNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

    class CampaignDetailsOrganisations extends Component {
        constructor(props) {
            super(props);

            this.state = {
                showNew: false,
            };
        }

        toggleShowNew = () => {
            this.setState({
                showNew: !this.state.showNew,
            })
        };

        render() {
            return (
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Betrokken bedrijven</span>
                        {this.props.permissions.manageMarketing &&
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}><span
                            className="glyphicon glyphicon-plus"/></a>
                        }
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12">
                            <CampaignDetailsOrganisationsList/>
                        </div>
                        <div className="col-md-12 margin-10-top">
                            {this.state.showNew &&
                            <CampaignDetailsOrganisationNew toggleShowNew={this.toggleShowNew}/>}
                        </div>
                    </PanelBody>
                </Panel>
            );
        }
    }

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(CampaignDetailsOrganisations);