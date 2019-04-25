import React from 'react';
import { connect } from 'react-redux';

import ObligationNumberFormListItem from './ObligationNumberFormListItem';

const ObligationNumberFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Nummer</div>
                <div className="col-sm-1" />
            </div>
            {props.obligationNumbers.length > 0 ? (
                props.obligationNumbers.map(obligationNumber => {
                    return (
                        <ObligationNumberFormListItem key={obligationNumber.id} obligationNumber={obligationNumber} />
                    );
                })
            ) : (
                <div>Geen obligatienummers bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        obligationNumbers: state.participantProductionProjectDetails.obligationNumbers,
    };
};

export default connect(mapStateToProps)(ObligationNumberFormList);
