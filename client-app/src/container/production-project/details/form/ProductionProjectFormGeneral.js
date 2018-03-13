import React, {Component} from 'react';
import {connect} from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import ProductionProjectFormEdit from './ProductionProjectFormEdit';
import ProductionProjectFormView from './ProductionProjectFormView';

class ProductionProjectFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        })
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        this.setState({
            activeDiv: '',
        });
    };

    render() {
        return (
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()}
                   onMouseLeave={() => this.onDivLeave()}>
                <PanelBody>
                    {
                        this.state.showEdit && this.props.permissions.manageProductionProject ?
                            <ProductionProjectFormEdit switchToView={this.switchToView}/>
                            :
                            <ProductionProjectFormView switchToEdit={this.switchToEdit}/>
                    }
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

export default connect(mapStateToProps)(ProductionProjectFormGeneral);