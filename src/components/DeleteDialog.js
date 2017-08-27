import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';

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

const DeleteDialog = ({ isOpen, modalLabel, successBtnLabel, body, successFn, closeFn}) => {
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
                <h3 className="mb-5">Delete Comment</h3>
                <hr/>
                Do you wish to delete: <br/>
                { body ? _.truncate(body, {length: 35}) : ''}
                <hr/>
                <button type="submit" onClick={successFn}
                        className="btn btn-lg btn-outline-primary">{successBtnLabel}
                </button>
                <button onClick={closeFn}
                        className="ml-2 btn btn-lg btn-outline-danger">Cancel
                </button>
            </div>

        </Modal>
    );

};

export default DeleteDialog;