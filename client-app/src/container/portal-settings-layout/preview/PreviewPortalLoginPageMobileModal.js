import React, { Component } from 'react';
import '../../../../../public/portal/portal.css';
class PreviewPortalLoginPageMobileModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const url = this.props.attachmentImageBgLogin.preview
            ? this.props.attachmentImageBgLogin.preview
            : this.props.imageBgLoginUrl;

        document.documentElement.style.setProperty('--main-login-background-image-url', 'url(' + url + ')');
    }

    render() {
        const customStyles = {
            closeModal: {
                cursor: 'pointer',
                float: 'right',
                backgroundColor: '#fff',
                padding: '5px 10px',
                color: 'red',
                marginTop: '10px',
            },
            authorizationContainer: {
                maxHeight: '700px',
                width: '370px',
                overflow: 'hidden',
                borderRadius: '25px',
                border: '5px solid #000',
                padding: '10px 10px',
            },
            justifyAlignRowCenter: {
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                marginRight: '-15px',
                marginLeft: '-15px',
            },
        };

        return (
            <div
                className="modal col-md-10 margin-50-top"
                onClick={this.props.closeModal}
                title={'Klik om preview te sluiten'}
            >
                <div className="authorization-container container-fluid" style={customStyles.authorizationContainer}>
                    <div className="full-height" style={customStyles.justifyAlignRowCenter}>
                        {/*<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">*/}
                        <div>
                            <img
                                src={
                                    this.props.attachmentLogo.preview
                                        ? this.props.attachmentLogo.preview
                                        : this.props.logoUrl
                                }
                                alt=""
                                className="image logo-container"
                            />
                            <form>
                                <input
                                    type="text"
                                    className="text-input w-input   "
                                    id="username"
                                    name="username"
                                    placeholder="E-mailadres"
                                    value=""
                                    readOnly={true}
                                />
                                <input
                                    type="password"
                                    className="text-input w-input   "
                                    id="password"
                                    name="password"
                                    placeholder="Wachtwoord"
                                    value=""
                                    readOnly={true}
                                />
                                <button className="authorization-button btn btn-primary btn-sm">
                                    <span>Log in</span>
                                </button>
                            </form>
                            <div style={customStyles.justifyAlignRowCenter}>
                                <a className="authorization-link">Wachtwoord vergeten?</a>
                            </div>
                            <div style={customStyles.justifyAlignRowCenter}>
                                <a className="authorization-link">Nieuw bij ...</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PreviewPortalLoginPageMobileModal;
