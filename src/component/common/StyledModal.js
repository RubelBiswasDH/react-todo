import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const StyledModal = ({ children, title, isOpen, onClose, onOk }) => {
    
    return (
        <Modal show={ isOpen } onHide={ onClose }>
            <Modal.Header closeButton>
                <Modal.Title>{ title ?? '' }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { children }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ onClose }>
                    { 'Cancel' }
                </Button>
                <Button variant="primary" onClick={ onOk }>
                    { 'Save' }
                </Button>
            </Modal.Footer>
        </Modal>  
    )
}

export default StyledModal;