import React, {Component} from 'react';
import Modal from 'react-modal';


class DeleteDialog extends Component {
    state = {
        modalOpen: true
    };

    constructor(props){
        super(props);
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDialog(){
        this.setState({modalOpen: true});
    }

    closeDialog(){
        this.setState({modalOpen: false});
    }

    render(){
        return (
            <div>
                <Modal
                       contentLabel="Remove"
                       onRequestClose={this.closeDialog}
                       isOpen={this.state.modalOpen}>
                    <button onClick={this.closeDialog}>Remove</button>
                </Modal>
            </div>
        );
    }
}

export default DeleteDialog;