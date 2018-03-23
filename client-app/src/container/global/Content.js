import React, {Component} from 'react';
import ChangePassword from "./ChangePassword";
import ErrorModal from "../../components/modal/ErrorModal";
import {clearError} from "../../actions/general/ErrorActions";
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import AboutUs from "./AboutUs";

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        return (
            <div>
                {this.props.children}
                {this.props.changePasswordActive &&
                <ChangePassword closeModal={this.props.toggleChangePassword}/>
                }

                {this.props.showAboutUs &&
                <AboutUs closeModal={this.props.toggleAboutUs}/>
                }
                {!isEmpty(this.props.error) &&
                <ErrorModal error={this.props.error} closeModal={this.props.clearError}/>
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
};

const mapDispatchToProps = dispatch => ({
    clearError: () => {
        dispatch(clearError());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);