import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserDetails } from '../../../actions/user/UserDetailsActions';
import UserDetailsToolbar from './UserDetailsToolbar';
import UserDetailsForm from './UserDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const UserDetailsAppWrapper = props => {
    const params = useParams();
    return <UserDetailsApp {...props} params={params} />;
};

class UserDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUserDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <UserDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <UserDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUserDetails: id => {
        dispatch(fetchUserDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsAppWrapper);
