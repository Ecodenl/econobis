import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';

class EmailDetailsToolbar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { from }  = this.props.email;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={"panel-small"}>
                            <div className="col-md-2">
                                <div className="btn-group margin-small" role="group">
                                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                                </div>
                            </div>
                            <div className="col-md-8"><h4 className="text-center text-success margin-small"><strong>{ from ? 'Email van: ' + from : '' }</strong></h4></div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>

            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        email: state.email,
        // permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(EmailDetailsToolbar);
