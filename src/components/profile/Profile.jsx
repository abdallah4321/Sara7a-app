import React, { useEffect } from 'react';
import avatar from '../../img/avatar.png';
import jwtDecode from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/apiSlice';

function Profile() {
    let dispatch = useDispatch()
    let { messages } = useSelector((state) => state.apiCall)
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const host = window.location.origin;
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
   
    useEffect(() => { 
        console.log(messages)
    }, [messages])
    useEffect(() => {
        dispatch(getMessages())
    }, [])
    return (
        <>
            <div className="container text-center py-5 my-5 text-center">
                <div className="card pt-5">
                    <a href="" data-toggle="modal" data-target="#profile">
                        <img src={avatar} className="avatar " alt="" />
                    </a>
                    <h3 className="py-2">{decoded.name}</h3>
                    <Button variant="btn btn-default-outline share" onClick={handleShow}>
                        <i className="fas fa-share-alt me-2"></i>Share Profile
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Link Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{`${host}/SendMessage/${decoded.id}`}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="container text-center my-5 text-center">
                <div className="row">
                   
                        { messages?.length === 0 ? (
                            <div className="col-md-12">
                                <div className="card py-5">
                                    <p>You don't have any messages...</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((ele) => (
                                <div key={ele._id} className="col-md-12 mb-4">
                                    <div className="card py-5">
                                        <p>{ele.messageContent}</p>
                                    </div>
                                </div>
                            ))
                        )}
                </div>
            </div>
        </>
    );
}

export default Profile;
