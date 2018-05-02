import React, {Component} from 'react';
import {connect} from 'react-redux';

import FinancialToolbar from './FinancialToolbar';
import FinancialForm from './FinancialForm';
import FinancialTree from './FinancialTree';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';

class FinancialApp extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-finincial-tree'}>
                                <FinancialTree/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={"panel-small"}>
                                < FinancialToolbar/>
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <FinancialForm/>
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        // productDetails: state.productDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    // fetchProductDetails: (id) => {
    //     dispatch(fetchProductDetails(id));
    // },
});

export default connect(mapStateToProps, mapDispatchToProps)(FinancialApp);
