import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';
import PropTypes from 'prop-types';

const customStyles = {
    content: {
        top: '40%',
        left: '40%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px'
    }
};

const DeleteDialog = ({isOpen, modalLabel, title, successBtnLabel, body, successFn, closeFn}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeFn}
            contentLabel={modalLabel}
            style={customStyles}
        >
            <div style={{marginRight: '10px', marginTop: '3px'}}>
                <button type="button" className="close" onClick={closeFn}>
                    <span>&times;</span>
                </button>
            </div>

            <div className="content-group m-4">
                <h3 className="mb-5">{title ? title : 'Remove dialog'}</h3>
                <hr/>
                Do you wish to delete: <br/>
                {body ? _.truncate(body, {length: 35}) : ''}
                <hr/>
                <button type="submit" onClick={successFn}
                        className="btn btn-lg btn-outline-primary">{successBtnLabel ? successBtnLabel : 'Remove'}
                </button>
                <button onClick={closeFn}
                        className="ml-2 btn btn-lg btn-outline-danger">Cancel
                </button>
            </div>

        </Modal>
    );

};

DeleteDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    modalLabel: PropTypes.string.isRequired,
    title: PropTypes.string,
    successBtnLabel: PropTypes.string,
    body: PropTypes.string,
    successFn: PropTypes.func.isRequired,
    closeFn: PropTypes.func.isRequired
};

export default DeleteDialog;