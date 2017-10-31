import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';

class ContactDetailsToolbar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={"glyphicon-trash"} />
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">{this.props.fullName || 'Nieuw'}</h4></div>
                <div className="col-md-4" />
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        fullName: state.contactDetails.fullName,
    }
};

export default connect(mapStateToProps)(ContactDetailsToolbar);