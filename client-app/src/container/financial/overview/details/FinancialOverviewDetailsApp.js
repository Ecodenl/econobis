import React, { Component } from 'react';

import FinancialOverviewDetailsToolbar from './FinancialOverviewDetailsToolbar';
import FinancialOverviewDetailsForm from './FinancialOverviewDetailsForm';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewDetailsAPI from '../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import { setError } from '../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const FinancialOverviewDetailsAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();
    return <FinancialOverviewDetailsApp {...props} navigate={navigate} params={params} />;
};

class FinancialOverviewDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverview: {},
            isLoading: true,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchFinancialOverviewDetails();
    }

    callFetchFinancialOverviewDetails = () => {
        FinancialOverviewDetailsAPI.fetchFinancialOverviewDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    hasError: false,
                    financialOverview: payload.data.data,
                });
            })
            .catch(error => {
                const status = error?.response?.status ?? 500;
                const message =
                    status === 429
                        ? 'Er zijn te veel verzoeken kort na elkaar uitgevoerd. Wacht ongeveer één minuut en laad daarna de pagina opnieuw.'
                        : error?.response?.data?.message ?? 'Fout bij het ophalen van de waardestaat.';

                this.setState(prevState => ({
                    isLoading: false,
                    hasError: !prevState.financialOverview.id,
                }));

                this.props.setError(status, message);
            });
    };
    deleteFinancialOverview = id => {
        // Api aanroepen met delete
        FinancialOverviewDetailsAPI.deleteFinancialOverview(id)
            .then(payload => {
                this.props.navigate(`/waardestaten`);
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    render() {
        // list of administration ids that the current user has access to
        const administrationIds = this.props.administrations.map(administration => administration.id);

        if (this.state.isLoading) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div>Gegevens aan het laden.</div>
                    </div>
                </div>
            );
        }

        if (this.state.hasError) {
            return (
                <div className="row">
                    <div className="col-md-9 margin-10-top">
                        <div>De waardestaat kon niet worden opgehaald.</div>
                    </div>
                </div>
            );
        }

        if (administrationIds.indexOf(this.state.financialOverview.administrationId) > -1) {
            return (
                <div className="row">
                    <div className="col-md-9">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-small'}>
                                    <FinancialOverviewDetailsToolbar
                                        financialOverview={this.state.financialOverview}
                                        deleteFinancialOverview={this.deleteFinancialOverview}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <FinancialOverviewDetailsForm
                                financialOverview={this.state.financialOverview}
                                callFetchFinancialOverviewDetails={this.callFetchFinancialOverviewDetails}
                            />
                        </div>
                    </div>
                    <div className="col-md-3" />
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-md-9 margin-10-top text-center">
                    Je hebt geen recht om deze administratie in te zien. Vraag je administrator/beheerder jou toe te
                    voegen aan deze administratie via instellingen &gt; administraties
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

const mapStateToProps = state => {
    return {
        administrations: state.meDetails.administrations,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(FinancialOverviewDetailsAppWrapper);
