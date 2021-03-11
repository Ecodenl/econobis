import React from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ViewText from '../../../components/form/ViewText';
import PanelHeader from '../../../components/panel/PanelHeader';

function CooperationDetailsFormView({ formData, toggleEdit }) {
    return (
        <section className={'panel-hover'} onClick={toggleEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Naam'} value={formData.name} />
                        <ViewText label={'KvK'} value={formData.kvkNumber} />
                    </div>
                    <div className="row">
                        <ViewText label={'Adres'} value={formData.address} />
                        <ViewText label={'Btw nummer'} value={formData.btwNumber} />
                    </div>
                    <div className="row">
                        <ViewText label={'Postcode'} value={formData.postalCode} />
                        <ViewText label={'IBAN'} value={formData.iban} />
                    </div>
                    <div className="row">
                        <ViewText label={'Plaats'} value={formData.city} />
                        <ViewText label={'IBAN t.n.v.'} value={formData.ibanAttn} />
                    </div>
                    <div className="row">
                        <ViewText label={'Email'} value={formData.email} />
                        <ViewText label={'Website'} value={formData.website} />
                    </div>
                    <div className="row">
                        <ViewText label={'Logo'} value={formData.logoName} />
                    </div>
                </PanelBody>
                <PanelHeader>
                    <span className="h5 text-bold">Hoom gegevens</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Hoom link'} value={formData.hoomLink} />
                        <ViewText label={'Hoom key'} value={formData.hoomKey} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Home e-mail template'}
                            value={formData.hoomEmailTemplate && formData.hoomEmailTemplate.name}
                        />
                        <ViewText label={'Hoom groep'} value={formData.hoomGroup && formData.hoomGroup.name} />
                    </div>
                </PanelBody>
            </Panel>
        </section>
    );
}

export default CooperationDetailsFormView;
