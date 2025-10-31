import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchContactDetails } from '../../../actions/contact/ContactDetailsActions';
import IntakeNewForm from './IntakeNewForm';
import IntakeNewToolbar from './IntakeNewToolbar';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const IntakeNewAppWrapper = props => {
    const params = useParams();
    return <IntakeNewApp {...props} params={params} />;
};

class IntakeNewApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (isEmpty(this.props.contactDetails)) {
            this.props.fetchContactDetails(this.props.params.contactId);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <IntakeNewToolbar contactId={this.props.params.contactId} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <IntakeNewForm
                            contactId={this.props.params.contactId}
                            addressId={this.props.params.addressId}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IntakeNewAppWrapper);
