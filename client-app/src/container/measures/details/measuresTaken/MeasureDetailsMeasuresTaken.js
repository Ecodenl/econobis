import React, { Component } from 'react';
import {hashHistory} from 'react-router';

import MeasureDetailsMeasuresTakenList from './MeasureDetailsMeasuresTakenList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

    class MeasureDetailsMeasuresTaken extends Component {
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
                    <Panel>
                        <PanelHeader>
                            <span className="h5 text-bold">Aanmelding maatregel genomen</span>
                            {this.props.permissions.manageRegistration &&
                            <a role="button" className="pull-right" onClick={() => hashHistory.push(`/contacten`)}><span
                                className="glyphicon glyphicon-plus"/></a>
                            }
                        </PanelHeader>
                        <PanelBody>
                            <div className="col-md-12">
                                <MeasureDetailsMeasuresTakenList/>
                            </div>
                        </PanelBody>
                    </Panel>
                </Panel>
            );
        }
    }

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(MeasureDetailsMeasuresTaken);