import React, {Component} from 'react';
import validator from 'validator';

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from "../../../components/panel/PanelBody";
import Panel from "../../../components/panel/Panel";
import PostalCodeLinkAPI from '../../../api/postal-code-link/PostalCodeLinkAPI';

class PostalCodeLinkNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postalCodeLink: {
                id: '',
                postalCodeMain: '',
                postalCodeLink: '',

            },
            errors: {
                postalCodeMain: false,
                postalCodeLink: false,
            },
        };
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            postalCodeLink: {
                ...this.state.postalCodeLink,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { postalCodeLink }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(postalCodeLink.postalCodeMain) || postalCodeLink.postalCodeMain < 999 || postalCodeLink.postalCodeMain > 9999){
            errors.postalCodeMain = true;
            hasErrors = true;
        };

        if(validator.isEmpty(postalCodeLink.postalCodeLink) || postalCodeLink.postalCodeLink < 999 || postalCodeLink.postalCodeLink > 9999){
            errors.postalCodeLink = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PostalCodeLinkAPI.newPostalCodeLink(postalCodeLink).then((payload) => {
                this.props.toggleShowNew();
                this.props.refreshPostalCodeLinksData();
            }).catch(function (error) {
                console.log(error)
            });
    };

    render() {
        const { postalCodeMain, postalCodeLink } = this.state.postalCodeLink;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Kern postcode"
                                type="number"
                                min={'999'}
                                max={'9999'}
                                name={"postalCodeMain"}
                                value={postalCodeMain}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.postalCodeMain}
                            />
                            <InputText
                                label="Link postcode"
                                type="number"
                                min={'999'}
                                max={'9999'}
                                name={"postalCodeLink"}
                                value={postalCodeLink}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.postalCodeLink}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    };
};


export default PostalCodeLinkNewForm;
