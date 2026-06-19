import React from 'react';
import { connect } from 'react-redux';

import TeamDetailsDocumentCreatedFromsItem from './TeamDetailsDocumentCreatedFromsItem';

const TeamDetailsDocumentCreatedFromsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Document gemaakt vanuit</div>
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
                <div>
                    Geen documenten gemaakt vanuit gekoppeld. Gebruikers van dit team geautoriseerd voor alle documenten
                    gemaakt vanuit!
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentCreatedFroms: state.teamDetails.documentCreatedFroms,
    };
};
export default connect(mapStateToProps)(TeamDetailsDocumentCreatedFromsList);
