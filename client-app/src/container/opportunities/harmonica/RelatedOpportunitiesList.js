import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchOpportunity, clearOpportunity } from '../../../actions/OpportunitiesActions';
class RelatedOpportunitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedOpportunities: '',
        };
    }

    openItem = (id) => {
        this.props.clearOpportunity();
        this.props.fetchOpportunity(id);
        hashHistory.push(`/kans/${id}`);
    };

    render() {
        const {relatedOpportunities} = this.props;
        return (
            <div>
                {relatedOpportunities == '' &&
                <div>Geen kansen gevonden</div>
                }

                {relatedOpportunities != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {relatedOpportunities.map((relatedOpportunity, i) => {
                        return (
                            <tr key={i}>
                                <td className='col-xs-10 clickable'
                                    onClick={() => this.openItem(relatedOpportunity.id)}>{moment(relatedOpportunity.created_at).format('L')} - {relatedOpportunity.measure.name} - {relatedOpportunity.status.name}</td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
                }
            </div>
        );
    };
}
const mapDispatchToProps = dispatch => ({
    fetchOpportunity: (id) => {
        dispatch(fetchOpportunity(id));
    },
    clearOpportunity: () => {
        dispatch(clearOpportunity());
    },
});

const mapStateToProps = (state) => {
    return {
        relatedOpportunities: state.opportunity.relatedOpportunities,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedOpportunitiesList);
