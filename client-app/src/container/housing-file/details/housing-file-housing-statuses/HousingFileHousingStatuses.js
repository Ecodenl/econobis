import React, { Component } from 'react';

import HousingFileHousingStatusList from './HousingFileHousingStatusList';
import HousingFileHousingStatusNew from './HousingFileHousingStatusNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

class HousingFileHousingStatuses extends Component {
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
                    <span className="h5 text-bold">Woningstatus</span>
                    {/*todo WM: new housingfile housingstatus*/}
                    {/*todo WM: glyphicon aanpassen in master-release-440*/}
                    {/*{this.props.permissions.manageHousingFile && (*/}
                    {/*    <a role="button" className="pull-right" onClick={this.toggleShowNew}>*/}
                    {/*        <span className="glyphicon glyphicon-plus" />*/}
                    {/*    </a>*/}
                    {/*)}*/}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <HousingFileHousingStatusList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <HousingFileHousingStatusNew toggleShowNew={this.toggleShowNew} />}
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

export default connect(mapStateToProps)(HousingFileHousingStatuses);