import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { isEmpty } from 'lodash';

export default function DataCleanupContactsDetails({ contactsToDeleteData, contactsSoftDeletedData, isLoading }) {
    console.log('contactsToDeleteData');
    console.log(contactsToDeleteData);
    console.log('contactsSoftDeletedData');
    console.log(contactsSoftDeletedData);
    return (
        <>
            <div>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <ViewText
                                label={'Contacten om te verwijderen'}
                                value={
                                    isLoading
                                        ? 'Bezig...'
                                        : contactsToDeleteData?.numberOfItemsToDelete ?? 'Geen gegevens gevonden.'
                                }
                                divSize={'col-sm-8'}
                                className={'col-sm-8 form-group'}
                            />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Verwijderde contacten opschonen'}
                                value={
                                    isLoading
                                        ? 'Bezig...'
                                        : contactsSoftDeletedData?.numberOfItemsToDelete ?? 'Geen gegevens gevonden.'
                                }
                                divSize={'col-sm-8'}
                                className={'col-sm-8 form-group'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </div>
        </>
    );
}
