import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import FinancialOverviewCreateConfirm from './FinancialOverviewCreateConfirm';
import ButtonText from '../../../../components/button/ButtonText';
import FinancialOverviewCreateConfirmPost from './FinancialOverviewCreateConfirmPost';

// Functionele wrapper voor de class component
const FinancialOverviewCreateToolbarWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewCreateToolbar {...props} navigate={navigate} />;
};

class FinancialOverviewCreateToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSend: false,
        };
    }

    showSend = () => {
        this.setState({ showSend: !this.state.showSend });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => this.props.navigate(-1)} />
                        {this.props.amountOfFinancialOverviewContacts > 0 && this.props.type === 'email' && (
                            <ButtonText buttonText={'Waardestaten e-mailen'} onClickAction={this.showSend} />
                        )}
                        {this.props.amountOfFinancialOverviewContacts > 0 && this.props.type === 'post' && (
                            <ButtonText buttonText={'Waardestaten downloaden'} onClickAction={this.showSend} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">
                        Te verzenden waardestaten versturen ({this.props.amountOfFinancialOverviewContacts})
                    </h4>
                </div>
                <div className="col-md-4" />
                {this.state.showSend && this.props.type === 'email' && (
                    <FinancialOverviewCreateConfirm
                        type={this.props.type}
                        financialOverviewContactIds={this.props.selectedIds}
                        closeModal={this.showSend}
                        financialOverviewId={this.props.financialOverviewId}
                    />
                )}
                {this.state.showSend && this.props.type === 'post' && (
                    <FinancialOverviewCreateConfirmPost
                        type={this.props.type}
                        financialOverviewContactIds={this.props.selectedIds}
                        closeModal={this.showSend}
                        financialOverviewId={this.props.financialOverviewId}
                    />
                )}
            </div>
        );
    }
}

export default FinancialOverviewCreateToolbarWrapper;
