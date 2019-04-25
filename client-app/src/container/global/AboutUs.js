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
                                Zie voor meer informatie: <a href="https://econobis.nl">https://econobis.nl</a>{' '}
                            </i>
                        </p>
                    </div>
                    <div className="col-xs-12">
                        <p>
                            Econobis maakt gebruik maakt van Pico Geodan.
                            <br />
                            <i>
                                Zie voor meer informatie: <a href="https://pico.geodan.nl">https://pico.geodan.nl</a>/
                            </i>
                        </p>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default AboutUs;
