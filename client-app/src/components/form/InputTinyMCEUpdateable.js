import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Import TinyMCE
import tinymce from 'tinymce/tinymce';
// A theme is also required
import 'tinymce/themes/modern/theme';
// Any plugins you want to use has to be imported
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/paste';
//import 'tinymce/plugins/forecolor';
import 'tinymce/plugins/textcolor';
import { Editor } from '@tinymce/tinymce-react';
import {isEqual} from "lodash";

class InputTinyMCEUpdateable extends Component {
    constructor(props) {
        super(props);
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.value !== nextProps.value) {
            const editor = window.tinymce.EditorManager.get('tinyMCEUpdateable');
            if (nextProps.value && !isEqual(editor.getContent({format: 'raw'}), nextProps.value)) {
                editor.setContent(nextProps.value);
                editor.selection.select(editor.getBody(), true);
                editor.selection.collapse(false);
            }
        }
    };

    render() {
        const {label, className, size, value, onChangeAction, readOnly} = this.props;

        return (
            <div>
                <div className="col-sm-3">
                    <label htmlFor="quotationText" className="col-sm-12">{label}</label>
                </div>
                <div className="col-sm-9">
                    <Editor
                        id={'tinyMCEUpdateable'}
                        initialValue={value}
                        init={{
                            // images_upload_url : 'youruploadscript.php',
                            branding: false,
                            language: 'nl',
                            menubar: false,
                            plugins: 'paste lists advlist link image code table textcolor',
                            toolbar: 'undo redo | formatselect fontselect | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | table | link image | code',
                            height: "300",
                            browser_spellcheck : true,
                        }}
                        onChange={onChangeAction}
                    />
                </div>
            </div>
        );
    };
}

InputTinyMCEUpdateable.defaultProps = {
    className: '',
    size: 'col-sm-6',
    value: '',
    readOnly: false,
    errorMessage: '',
};

InputTinyMCEUpdateable.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeAction: PropTypes.func,
    readOnly: PropTypes.bool,
};

export default InputTinyMCEUpdateable;

