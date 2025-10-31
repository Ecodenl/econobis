import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import OpportunitiesList from './OpportunitiesList';

const OpportunityHarmonica = ({
    toggleShowList,
    showOpportunitiesList,
    newOpportunity,
    opportunityCount,
    permissions,
}) => {
    return (
        permissions.viewOpportunity && (
            <Panel className={'harmonica-button'}>
                <PanelBody>
                    <div className="col-sm-12" onClick={toggleShowList} role="button">
                        <span className="">
                            KANSEN <span className="badge">{opportunityCount}</span>
                        </span>
                    </div>
                    <div className="col-sm-12">{showOpportunitiesList && <OpportunitiesList />}</div>
                </PanelBody>
            </Panel>
        )
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(OpportunityHarmonica);
