import React from 'react';
import PropTypes from 'prop-types';
import PDFViewer  from "mgr-pdf-viewer-react";
import CustomNavigation from "./CustomNavigation";

const PdfViewer = props => {
    const {file, scale} = props;
    return (
        <div className={`panel-heading`}>
            <PDFViewer document={{
                file: file,
            }}
                       navigation={CustomNavigation}
                       scale={scale}
            />
        </div>

    );
};

PDFViewer.defaultProps = {
    file: '',
    scale: 1,
};

PDFViewer.propTypes = {
    file: PropTypes.string,
    scale: PropTypes.number,
};

export default PdfViewer