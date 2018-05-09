import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import OrdersList from "./order/list/OrdersList";
import Panel from "../../components/panel/Panel";
import PanelBody from "../../components/panel/PanelBody";

class ProductDetailsForm extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.administrationDetails) ?
                <div></div>
                :
                <div>
                    {this.props.type === 'orders' &&
                    <Panel>
                        <PanelBody>
                            <OrdersList
                                administrationId={this.props.administrationDetails.id}
                                filter={this.props.filter}
                            />
                        </PanelBody>
                    </Panel>
                    }
                    {this.props.type === 'facturen' &&
                    <div>Facturen</div>
                    }
                    {this.props.type === undefined &&
                    <div>Selecteer orders of facturen.</div>
                    }
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

export default connect(mapStateToProps)(ProductDetailsForm);
