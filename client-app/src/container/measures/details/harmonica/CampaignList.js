import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class CampaignList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedCampaigns: '',
        };
    }

    openItem = (id) => {
        hashHistory.push(`/campagne/${id}`);
    };

    render() {
        const {relatedCampaigns} = this.props;
        return (
            <div>
                {relatedCampaigns == '' &&
                <div>Geen campagnes gevonden</div>
                }

                {relatedCampaigns != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {relatedCampaigns.map((relatedCampaign, i) => {
                        return (
                            <tr onClick={() => this.openItem(relatedCampaign.id)} key={i}>
                                <td className='col-xs-5 clickable'>{moment(relatedCampaign.created_at).format('L')}</td>
                                <td className='col-xs-1 clickable'>-</td>
                                <td className='col-xs-6 clickable'>{relatedCampaign.name}</td>
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
        relatedCampaigns: state.measureDetails.relatedCampaigns,
    };
};

export default connect(mapStateToProps)(CampaignList);
