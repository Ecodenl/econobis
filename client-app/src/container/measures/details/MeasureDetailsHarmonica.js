import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import DocumentHarmonica from './harmonica/DocumentHarmonica';

// Functionele wrapper voor de class component
const MeasureDetailsHarmonicaWrapper = props => {
    const navigate = useNavigate();
    return <MeasureDetailsHarmonica {...props} navigate={navigate} />;
};

class MeasureDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                documents: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
        this.newDocument = this.newDocument.bind(this);
    }

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            },
        });
    }

    newDocument(type) {
        this.props.navigate(`/document/nieuw/${type}/maatregel/${this.props.measureDetails.id}`);
    }

    render() {
        return (
            <div className="col-md-12 margin-10-top">
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.measureDetails.documentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        measureDetails: state.measureDetails,
    };
};

export default connect(mapStateToProps)(MeasureDetailsHarmonicaWrapper);
