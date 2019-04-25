import React from 'react';

const DataTable = props => {
    return <table className="table table-condensed table-hover table-striped col-xs-12">{props.children}</table>;
};

export default DataTable;
