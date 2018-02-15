import React, {Component} from 'react';
import { connect } from 'react-redux';

class TaskDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowList: {
                documents: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.id !== nextProps.id) {
            this.setState({
                toggleShowList: {
                    documents: false,
                },
            })
        }
    };

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            }
        });
    };

    render() {
        return (
            <div className="margin-10-top">

            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        taskDetails: state.taskDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(TaskDetailsHarmonica);
