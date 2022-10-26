import React from 'react';
import { connect } from 'react-redux';

import TeamDetailsDocumentCreatedFromsItem from './TeamDetailsDocumentCreatedFormsItem';

const TeamDetailsDocumentCreatedFormsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Document naam</div>
                <div className="col-sm-1" />
            </div>
            {props.documentCreatedFroms && props.documentCreatedFroms.length > 0 ? (
                props.documentCreatedFroms.map(documentCreatedFrom => {
                    return (
                        <TeamDetailsDocumentCreatedFromsItem
                            key={documentCreatedFrom.id}
                            documentCreatedFrom={documentCreatedFrom}
                        />
                    );
                })
            ) : (
                <div>Geen documenten gekoppeld.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentCreatedFroms: state.teamDetails.documentCreatedFroms,
    };
};
export default connect(mapStateToProps)(TeamDetailsDocumentCreatedFormsList);
