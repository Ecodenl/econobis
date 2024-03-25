import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const MailgunDomainDetailsFormGeneralView = props => {
    // const { domain, secret, isVerified } = props.mailgunDomainDetails;
    const { domain, isVerified } = props.mailgunDomainDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Domein'} value={domain} />
                        {/*<ViewText label={'Mailgun API Key'} value={secret} />*/}
                    </div>

                    <div className="row">
                        <ViewText label={'Geverifieerd'} value={isVerified ? 'Ja' : 'Nee'} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        mailgunDomainDetails: state.mailgunDomainDetails,
    };
};

export default connect(mapStateToProps)(MailgunDomainDetailsFormGeneralView);
