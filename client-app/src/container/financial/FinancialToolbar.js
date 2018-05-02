import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';

class ProductToolbar  extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">Administratie: test</h4></div>
                <div className="col-md-4"/>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        // name: state.productDetails.name,
    };
};

export default connect(mapStateToProps, null)(ProductToolbar);