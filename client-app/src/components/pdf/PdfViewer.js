import React from 'react';
import PropTypes from 'prop-types';
import PDFViewer  from "mgr-pdf-viewer-react";

const PdfViewer = props => {
    const {file} = props;
    return (
        <div className={`panel-heading`}>
            <PDFViewer document={{
                file: file
            }} />
        </div>

    );
};

PDFViewer.defaultProps = {
    file: '',
};

PDFViewer.propTypes = {
    file: PropTypes.string,
};

export default PdfViewer