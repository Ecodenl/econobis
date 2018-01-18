import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import DocumentFormGeneral from './general/DocumentFormGeneral';

class DocumentDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.documentDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <DocumentFormGeneral />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        documentDetails: state.documentDetails,
    };
};

export default connect(mapStateToProps, null)(DocumentDetailsForm);
