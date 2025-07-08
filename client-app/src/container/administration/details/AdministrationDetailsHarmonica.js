import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DocumentHarmonica from './harmonica/DocumentHarmonica';

function AdministrationDetailsHarmonica({ administration }) {
    const navigate = useNavigate();

    const [showList, setShowList] = useState({
        documents: false,
    });

    function toggleShowList(name) {
        setShowList(prev => {
            return { ...prev, [name]: !prev[name] };
        });
    }

    function newDocumentNotOnPortal(type) {
        navigate(`/document/nieuw/${type}/eco/administratie/${administration.id}`);
    }
    function newDocumentOnPortal(type) {
        navigate(`/document/nieuw/${type}/portal/administratie/${administration.id}`);
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
