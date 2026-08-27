import React, { Component } from 'react';

import VatCodeDetailsToolbar from './VatCodeDetailsToolbar';
import VatCodeDetailsForm from './VatCodeDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import VatCodeDetailsAPI from '../../../api/vat-code/VatCodeDetailsAPI';
import moment from 'moment';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const VatCodeDetailsAppWrapper = props => {
    const params = useParams();
    return <VatCodeDetailsApp {...props} params={params} />;
};

class VatCodeDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vatCode: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchVatCodeDetails();
    }

    callFetchVatCodeDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        VatCodeDetailsAPI.fetchVatCodeDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    vatCode: {
                        ...payload.data.data,
                        startDate: payload.data.data.startDate
                            ? moment(payload.data.data.startDate).format('Y-MM-DD')
                            : '',
                    },
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = vatCode => {
        this.setState({ vatCode });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <VatCodeDetailsToolbar description={this.state.vatCode.description || ''} />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <VatCodeDetailsForm
                            vatCode={this.state.vatCode}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            updateState={this.updateState}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default VatCodeDetailsAppWrapper;
