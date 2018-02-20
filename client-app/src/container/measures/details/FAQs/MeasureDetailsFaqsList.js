import React from 'react';
import {connect} from 'react-redux';

import MeasureDetailsFaqItem from "./MeasureDetailsFaqItem";

const MeasureDetailsFaqsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-5">Vraag</div>
                <div className="col-sm-6">Antwoord</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.faqs.length > 0 ?
                    props.faqs.map(faq => {
                        return <MeasureDetailsFaqItem
                            key={faq.id}
                            faq={faq}
                        />;
                    })
                    :
                    <div>Geen FAQs bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        faqs: state.measureDetails.faqs,
    };
};
export default connect(mapStateToProps)(MeasureDetailsFaqsList);

