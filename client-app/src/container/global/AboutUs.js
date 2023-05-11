import React, { Component } from 'react';

import Modal from '../../components/modal/Modal';

class AboutUs extends Component {
    render() {
        return (
            <Modal
                closeModal={this.props.closeModal}
                title="Over ons"
                showConfirmAction={false}
                buttonCancelText={'Ok'}
            >
                <div className="row">
                    <div className="col-xs-12">
                        <p>
                            Econobis is een administratiesysteem van energie-initiatieven in Nederland.
                            <br />
                            <i>
                                Zie voor meer informatie:{' '}
                                <a href="https://econobis.nl" target="_blank">
                                    https://econobis.nl
                                </a>{' '}
                            </i>
                        </p>
                    </div>
                    <div className="col-xs-12">
                        <p>
                            Econobis maakt gebruik maakt van BAG API Individuele Bevragingen.
                            <br />
                            <i>
                                Zie voor meer informatie:{' '}
                                <a href="https://zakelijk.kadaster.nl/-/bag-api" target="_blank">
                                    https://zakelijk.kadaster.nl/-/bag-api
                                </a>
                                /
                            </i>
                        </p>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default AboutUs;
