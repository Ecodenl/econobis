import React, {Component} from 'react';
import { connect } from 'react-redux';

class Content extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const contentClass = (this.props.toggleSidebar ? 'content open col-md-10' : 'content col-md-12');

        return (
            <div className={ contentClass }>
                {this.props.children}
            </div>
        );
    }
};

function mapStateToProps(state) {
    return { toggleSidebar: state.toggleSidebar };
}

export default connect(mapStateToProps)(Content);