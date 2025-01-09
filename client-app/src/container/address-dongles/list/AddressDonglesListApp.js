import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAddressDongles, clearAddressDongles } from '../../../actions/address-dongle/AddressDonglesActions';
import AddressDonglesListToolbar from './AddressDonglesListToolbar';
import AddressDonglesList from './AddressDonglesList';

class AddressDonglesListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAddressDongles();
    }

    componentWillUnmount() {
        this.props.clearAddressDongles();
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <AddressDonglesListToolbar />
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <AddressDonglesList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchAddressDongles: () => {
        dispatch(fetchAddressDongles());
    },
    clearAddressDongles: () => {
        dispatch(clearAddressDongles());
    },
});
export default connect(null, mapDispatchToProps)(AddressDonglesListApp);
