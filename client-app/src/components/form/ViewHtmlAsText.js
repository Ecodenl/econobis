import React from 'react';
import Frame from 'react-frame-component';
import PropTypes from 'prop-types';
import Panel from '../panel/Panel';
import ButtonText from '../button/ButtonText';

const ViewHtmlAsText = props => {
    const { label, className, id, value, switchToEdit } = props;

    const createMarkup = () => {
        return { __html: value };
    };

    return (
        <div className={className}>
            <label htmlFor={id} className="col-sm-3">
                {label}
                {switchToEdit ? (
                    <span>
                        <br />
                        <ButtonText
                            buttonClassName={'btn-success btn-padding-small'}
                            buttonText={'Wijzig'}
                            onClickAction={switchToEdit}
                        />
                    </span>
                ) : (
                    ''
                )}
            </label>
            <Panel className="col-sm-9">
                <Frame>
                    <div id={id} dangerouslySetInnerHTML={createMarkup()} />
                </Frame>
            </Panel>
        </div>
    );
};

ViewHtmlAsText.defaultProps = {
    className: 'col-sm-12',
    value: '',
};

ViewHtmlAsText.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViewHtmlAsText;
