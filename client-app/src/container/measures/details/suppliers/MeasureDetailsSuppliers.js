import React, { Component } from 'react';

import MeasureDetailsSuppliersList from './MeasureDetailsSuppliersList';
import MeasureDetailsSupplierNew from './MeasureDetailsSupplierNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

    class MeasureDetailsSuppliers extends Component {
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
                            <span className="h5 text-bold">Mogelijke leveranciers</span>
                            {this.props.permissions.manageMeasure &&
                            <a role="button" className="pull-right" onClick={this.toggleShowNew}><span
                                className="glyphicon glyphicon-plus"/></a>
                            }
                        </PanelHeader>
                        <PanelBody>
                            <div className="col-md-12">
                                <MeasureDetailsSuppliersList/>
                            </div>
                            <div className="col-md-12 extra-space-above">
                                {this.state.showNew &&
                                <MeasureDetailsSupplierNew toggleShowNew={this.toggleShowNew}/>}
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

export default connect(mapStateToProps)(MeasureDetailsSuppliers);