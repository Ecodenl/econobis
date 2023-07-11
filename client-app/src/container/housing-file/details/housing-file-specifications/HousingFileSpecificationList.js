import React, { Component } from 'react';
import { connect } from 'react-redux';

import HousingFileSpecificationItem from './HousingFileSpecificationItem';

class HousingFileSpecificationList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row border header">
                    {this.props.showCheckboxList && (
                        <div className="col-sm-1">
                            <input type="checkbox" onChange={this.props.toggleCheckedAll} />
                        </div>
                    )}
                    <div className="col-sm-3">Specificatie</div>
                    <div className="col-sm-3">Categorie</div>
                    <div className={this.props.showCheckboxList ? 'col-sm-2' : 'col-sm-3'}>Status</div>
                    <div className="col-sm-2">Datum realisatie</div>
                    <div className="col-sm-1" />
                </div>
                {this.props.housingFileSpecifications.length > 0 ? (
                    this.props.housingFileSpecifications.map((housingFileSpecification, i) => {
                        return (
                            <HousingFileSpecificationItem
                                key={i}
                                housingFileSpecification={housingFileSpecification}
                                showCheckboxList={this.props.showCheckboxList}
                                toggleSpecificationCheck={this.props.toggleSpecificationCheck}
                                specificationIds={this.props.specificationIds}
                            />
                        );
                    })
                ) : (
                    <div>Geen specificaties bekend.</div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        housingFileSpecifications: state.housingFileDetails.housingFileSpecifications,
    };
};

export default connect(mapStateToProps)(HousingFileSpecificationList);
