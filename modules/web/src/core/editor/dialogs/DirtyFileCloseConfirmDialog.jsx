import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Grid, Col } from 'react-bootstrap';
import Dialog from './../../view/Dialog';

/**
 * Confirm Dialog when closing dirty files
 * @extends React.Component
 */
class DirtyFileCloseConfirmDialog extends React.Component {

    /**
     * @inheritdoc
     */
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            showDialog: true,
        };
        this.onDialogHide = this.onDialogHide.bind(this);
    }

    /**
     * Called when user hides the dialog
     */
    onDialogHide() {
        this.setState({
            error: '',
            showDialog: false,
        });
    }

    /**
     * @inheritdoc
     */
    render() {
        return (
            <Dialog
                show={this.state.showDialog}
                title="Save Unsaved Content"
                actions={
                [
                    <Button
                        key='dirty-file-close-confirm-dialog-dont-save'
                        onClick={(evt) => {
                            this.onDialogHide();
                            this.props.onConfirm();
                            evt.stopPropagation();
                            evt.preventDefault();
                        }}
                    >
                        Don&#39;t Save
                    </Button>,
                    <Button
                        key='dirty-file-close-confirm-dialog-save'
                        onClick={(evt) => {
                            this.onDialogHide();
                            this.props.onSave();
                            evt.stopPropagation();
                            evt.preventDefault();
                        }}
                    >
                        Save
                    </Button>,
                ]}
                closeAction
                onHide={this.onDialogHide}
                onAfterHide={this.props.onAfterHide}
                error={this.state.error}
            >
                <Grid fluid>
                    <Row>
                        <Col md={2}>
                            <i className="fw fw-4x fw-warning danger" />
                        </Col>
                        <Col md={10}>
                            <h4 style={{ marginTop: 0 }}>
                                Do you want to save the changes you made to 
                                {' "' + this.props.file.name + '.' + this.props.file.extension + '" '}?
                            </h4>
                            <p>
                                Your changes will be lost if you don't save them.
                            </p>
                        </Col>
                    </Row>
                </Grid>
            </Dialog>
        );
    }
}

DirtyFileCloseConfirmDialog.propTypes = {
    file: PropTypes.objectOf(Object).isRequired,
    onConfirm: PropTypes.func.isRequired,
    onAfterHide: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    editorPlugin: PropTypes.objectOf(Object).isRequired,
};

DirtyFileCloseConfirmDialog.defaultProps = {
    onAfterHide: () => {},
};

export default DirtyFileCloseConfirmDialog;
