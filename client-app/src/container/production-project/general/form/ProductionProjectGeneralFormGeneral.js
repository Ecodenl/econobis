import React, {Component} from 'react';
import {connect} from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import ProductionProjectGeneralFormView from './ProductionProjectGeneralFormView';

class ProductionProjectGeneralFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDiv: '',
        };
    }

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        if(!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    };

    render() {
        return (
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()}
                   onMouseLeave={() => this.onDivLeave()}>
                <PanelBody>
                    <ProductionProjectGeneralFormView/>
                </PanelBody>
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(ProductionProjectGeneralFormGeneral);