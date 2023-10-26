import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';
// Any plugins you want to use has to be imported
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/autolink';
import { Editor } from '@tinymce/tinymce-react';

class InputTinyMCEUpdateable extends Component {
    render() {
        const { label, initialValue, value, onChangeAction, onBlur } = this.props;

        return (
            <div>
                <div className="col-sm-3">
                    <label htmlFor="quotationText" className="col-sm-12">
                        {label}
                    </label>
                </div>
                <div className="col-sm-9">
                    <Editor
                        id={'tinyMCEUpdateable'}
                        initialValue={initialValue}
                        value={value}
                        init={{
                            skin: false,
                            content_css: false,
                            branding: false,
                            language: 'nl',
                            menubar: false,
                            plugins: 'paste lists advlist link image code table pagebreak autolink',
                            toolbar:
                                'undo redo | formatselect fontselect | bold italic forecolor | alignleft aligncenter alignright | pagebreak | bullist numlist outdent indent | table | link image | code',
                            paste_data_images: true,
                            contextmenu: false,
                            height: '300',
                            browser_spellcheck: true,
                            font_formats:
                                'Courier New=courier new;Tahoma=tahoma;Times New Roman=times new roman;Verdana=verdana;',
                            default_link_target: '_blank',
                            link_default_protocol: 'https',
                        }}
                        onEditorChange={onChangeAction}
                        onBlur={onBlur}
                    />
                </div>
            </div>
        );
    }
}

InputTinyMCEUpdateable.defaultProps = {
    initialValue: '',
    value: '',
    errorMessage: '',
};

InputTinyMCEUpdateable.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    value: PropTypes.string,
    onChangeAction: PropTypes.func,
    onBlur: PropTypes.func,
};

export default InputTinyMCEUpdateable;
