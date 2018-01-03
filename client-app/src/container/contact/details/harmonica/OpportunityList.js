import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class OpportunitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedOpportunities: '',
        };
    }

    openItem = (id) => {
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

const mapStateToProps = (state) => {
    return {
        relatedOpportunities: state.contactDetails.relatedOpportunities,
    };
};

export default connect(mapStateToProps)(OpportunitiesList);
