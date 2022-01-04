import React, { useState } from 'react';
import { hashHistory } from 'react-router';

import DocumentHarmonica from './harmonica/DocumentHarmonica';

function AdministrationDetailsHarmonica({ administration }) {
    const [showList, setShowList] = useState({
        documents: false,
    });

    function toggleShowList(name) {
        setShowList(prev => {
            return { ...prev, [name]: !prev[name] };
        });
    }

    function newDocumentNotOnPortal(type) {
        hashHistory.push(`/document/nieuw/${type}/eco/administratie/${administration.id}`);
    }
    function newDocumentOnPortal(type) {
        hashHistory.push(`/document/nieuw/${type}/portal/administratie/${administration.id}`);
    }

    return (
        <div className="margin-10-top">
            <DocumentHarmonica
                title={'DOCUMENTEN ALLEEN IN ECONOBIS'}
                toggleShowList={() => toggleShowList('documentsNotOnPortal')}
                showDocumentsList={showList.documentsNotOnPortal}
                documentCount={administration.documentCountNotOnPortal}
                newDocument={newDocumentNotOnPortal}
                relatedDocuments={administration.relatedDocumentsNotOnPortal}
            />

            <DocumentHarmonica
                title={'DOCUMENTEN PORTAL'}
                toggleShowList={() => toggleShowList('documentsOnPortal')}
                showDocumentsList={showList.documentsOnPortal}
                documentCount={administration.documentCountOnPortal}
                newDocument={newDocumentOnPortal}
                relatedDocuments={administration.relatedDocumentsOnPortal}
            />
        </div>
    );
}

export default AdministrationDetailsHarmonica;
