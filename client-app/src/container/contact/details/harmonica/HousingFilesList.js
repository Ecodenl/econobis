import React, { Component } from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
moment.locale('nl');

import HousingFilesAPI from '../../../../api/housing-file/HousingFilesAPI';

class HousingFileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            housingFiles: '',
            loading: true,
        };
    };

    componentDidMount() {
        HousingFilesAPI.fetchHousingFilesByContact(this.props.contactDetailsId).then((payload) => {
            this.setState({housingFiles: payload, loading: false});
        });
    }

    openItem = (id) => {
        hashHistory.push(`/woningdossier/${id}`);
    };

    render() {
        const {housingFiles, loading} = this.state;

        return (
            <div>
                { loading &&
                <div>Laden...</div>
                }

                {housingFiles == '' && !loading &&
                <div>Geen woningdossiers bekend</div>
                }

                {housingFiles != '' && !loading &&

                <table className="table">
                    <tbody>
                    {housingFiles.map((housingFile, i) => {
                        return (
                            <tr key={i} onClick={() => this.openItem(housingFile.id)}>
                                <td className='col-xs-12 clickable'>
                                    { housingFile.createdAt ? moment(housingFile.createdAt.date).format('DD-MM-Y') : '' } - {housingFile.addressName}
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        contactDetailsId: state.contactDetails.id,
    };
};

export default connect(mapStateToProps, null)(HousingFileList);