import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRegistrationDetails } from '../../../actions/registration/RegistrationDetailsActions';
import RegistrationDetailsToolbar from './RegistrationDetailsToolbar';
import RegistrationDetailsForm from './RegistrationDetailsForm';

class RegistrationDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRegistrationDetails(this.props.params.id);
    }

    render() {
        return (
          <div className="row">
              <div className="col-md-9">
              <div className="col-md-12">
                      <RegistrationDetailsToolbar />
                    </div>

              <div className="col-md-12">
                      <RegistrationDetailsForm />
                    </div>
                </div>
              <div className="col-md-3" />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchRegistrationDetails: (id) => {
        dispatch(fetchRegistrationDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(RegistrationDetailsApp);
