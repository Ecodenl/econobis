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
//import 'tinymce/plugins/forecolor';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/contextmenu';

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
                const bookmark = editor.selection.getBookmark();//workaround voor enter -> naar einde pagina bug
                editor.setContent(nextProps.value, {format: 'raw'});
                editor.selection.select(editor.getBody(), true);
                editor.selection.collapse(false);
                editor.selection.moveToBookmark(bookmark);
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
                            branding: false,
                            language: 'nl',
                            menubar: false,
                            plugins: 'link image code table textcolor contextmenu',
                            toolbar: 'undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | table | link image | code',
                            height: "300",
                        }}
                        onChange={this.onChangeAction}
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

