import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const UserDetailsToolbar = props => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={"panel-small"}>
                        <div className="col-md-2">
                            <div className="btn-group" role="group">
                                <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                            </div>
                        </div>
                        <div className="col-md-8"><h4 className="text-center">{props.name}</h4></div>
                        <div className="col-md-2" />
                    </PanelBody>
                </Panel>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        name: state.contactGroupDetails.name,
    };
};

export default connect(mapStateToProps, null)(UserDetailsToolbar);