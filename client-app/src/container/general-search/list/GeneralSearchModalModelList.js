import React from 'react';

import GeneralSearchModalList from "./GeneralSearchModalList";

const GeneralSearchModalModelList = props => {

    return (
        <div>
            {
                props.records.length === 0 ? (

                    <span>Niet gevonden!</span>

                ) : (
                Object.keys(props.records).map((record) => {
                    return <GeneralSearchModalList
                        key={record}
                        modelName={record}
                        records={props.records[record]}
                        closeModal={props.closeModal}
                    />
                    })
                )
            }
        </div>
    );
};

export default GeneralSearchModalModelList;