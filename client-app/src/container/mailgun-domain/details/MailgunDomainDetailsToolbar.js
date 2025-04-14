import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

// Functionele wrapper voor de class component
const MailgunDomainDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <MailgunDomainDetailsToolbar {...props} navigate={navigate} />;
};

class MailgunDomainDetailsToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Mailgun domein: {this.props.domain}</h4>
                </div>
                <div className="col-md-4" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        domain: state.mailgunDomainDetails.domain,
        id: state.mailgunDomainDetails.id,
    };
};

export default connect(mapStateToProps, null)(MailgunDomainDetailsToolbarWrapper);
