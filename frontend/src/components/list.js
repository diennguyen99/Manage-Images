import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export const List = ({ images, onDelete }) => {
    const [selectedDelete, setSelectedDelete] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setSelectedDelete('');
    };

    const handleShow = imageUrl => {
        setShow(true);
        setSelectedDelete(imageUrl);
    };

    const handleDelete = () => {
        setShow(false);
        images.map((value) => {
            return value === selectedDelete
        });
        
        fetch(`http://localhost:9000/api/images/${selectedDelete}`, {
            method: 'DELETE'
        })

        onDelete(images.filter(obj => obj.id !== selectedDelete));

        setSelectedDelete('');

        toast.success("Delete Images Success!");
    }

    return (
        <div className="py-4">
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="row">
                {images.length > 0 ?
                    images.map((value, index) => (
                        <div key={index} className="col-sm-3 pb-4">
                            <Card>
                                <Card.Img variant="top" src={value.original} />
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Card.Title>{value.thumbnailLabel}</Card.Title>
                                        <Button variant="danger" onClick={() => handleShow(value.id)}>Delete</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )) :
                    <div className="d-flex col-12 justify-content-center">
                        <span>Emplty</span>
                    </div>
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}