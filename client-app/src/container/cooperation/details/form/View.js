import React from 'react';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ViewText from '../../../../components/form/ViewText';
import PanelHeader from '../../../../components/panel/PanelHeader';

function CooperationDetailsFormView({ formData, toggleEdit }) {
    return (
        <section className={'panel-hover'} onClick={toggleEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Naam'} value={formData.name} />
                        <ViewText label={'Adres'} value={formData.address} />
                    </div>
                    <div className="row">
                        <ViewText label={'Postcode'} value={formData.postalCode} />
                        <ViewText label={'Plaats'} value={formData.city} />
                    </div>
                    <div className="row">
                        <ViewText label={'KvK'} value={formData.kvkNumber} />
                        <ViewText label={'Btw nummer'} value={formData.btwNumber} />
                    </div>
                    <div className="row">
                        <ViewText label={'IBAN'} value={formData.iban} />
                        <ViewText label={'IBAN t.n.v.'} value={formData.ibanAttn} />
                    </div>
                    <div className="row">
                        <ViewText label={'Email'} value={formData.email} />
                        <ViewText label={'Website'} value={formData.website} />
                    </div>
                    <div className="row">
                        <ViewText label={'Logo'} value={formData.logoName} />
                        {/*<ViewText*/}
                        {/*    label={'Logo'}*/}
                        {/*    divSize={'col-sm-8'}*/}
                        {/*    value={'logo.png'}*/}
                        {/*    className={'col-sm-8 form-group'}*/}
                        {/*/>*/}
                        {/*<Image*/}
                        {/*    src={`${URL_API}/portal/images/logo.png?${imageHash}`}*/}
                        {/*    style={{*/}
                        {/*        backgroundColor: backgroundImageColor,*/}
                        {/*        color: backgroundImageTextColor,*/}
                        {/*        border: '1px solid #999',*/}
                        {/*        display: 'inline-block',*/}
                        {/*        padding: '1px',*/}
                        {/*        borderRadius: '1px',*/}
                        {/*        height: '50px',*/}
                        {/*        boxShadow: '0 0 0 1px #fff inset',*/}
                        {/*    }}*/}
                        {/*/>*/}
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
                        <ViewText label={'Home e-mail template'} value={formData.hoomEmailTemplateId} />
                        <ViewText label={'Hoom groep'} value={formData.hoomGroupId} />
                    </div>
                </PanelBody>
            </Panel>
        </section>
    );
}

export default CooperationDetailsFormView;
