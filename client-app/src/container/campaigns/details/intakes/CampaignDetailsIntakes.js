import React, { Component } from 'react';

import CampaignDetailsIntakesList from './CampaignDetailsIntakesList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

    class CampaignDetailsIntakes extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Gerelateerde intakes</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12">
                            <CampaignDetailsIntakesList/>
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

export default connect(mapStateToProps)(CampaignDetailsIntakes);