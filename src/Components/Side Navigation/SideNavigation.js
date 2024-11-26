import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import { Modal, Button } from 'react-bootstrap';

const SideNavigation = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    const handleConfirmLogout = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        // all tooltips when the component mounts
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipElements.forEach((element) => {
            new window.bootstrap.Tooltip(element);
        });

        // Clean up the tooltips on component unmount
        return () => {
            tooltipElements.forEach((element) => {
                const tooltip = window.bootstrap.Tooltip.getInstance(element);
                if (tooltip) tooltip.dispose();
            });
        };
    }, []);

    return (
        <>
            <nav className="navbar flex-column" style={{ height: '100vh', width: '60px', background: 'blue' }}>
                <div className="navbar-nav" style={{ flex: 1 }}>
                    <div className="d-flex justify-content-center mt-2" style={{ marginBottom: '80px' }}>
                        <i className="bi bi-person-workspace" style={{ fontSize: '32px', color: 'yellow' }}></i>
                    </div>

                    <div
                        className="nav-link d-flex justify-content-center mb-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="Dashboard" >

                        <Link to="/dashboard">
                            <i
                                className="bi bi-grid-1x2-fill"
                                style={{ fontSize: '24px', color: 'yellow' }}
                                onMouseEnter={(e) => e.target.style.color = 'gray'}
                                onMouseLeave={(e) => e.target.style.color = 'yellow'} >
                            </i>
                        </Link>
                    </div>

                    <div
                        className="nav-link d-flex justify-content-center"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="Inventory" >

                        <Link to="/inventory">
                            <i
                                className="bi bi-box-seam-fill"
                                style={{ fontSize: '24px', color: 'yellow' }}
                                onMouseEnter={(e) => e.target.style.color = 'gray'}
                                onMouseLeave={(e) => e.target.style.color = 'yellow'}
                            ></i>
                        </Link>
                    </div>

                    <div
                        className="nav-link d-flex justify-content-center mb-5"
                        style={{ marginTop: 'auto', cursor: 'pointer' }}
                        onClick={handleConfirmLogout}
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="Logout" >

                        <i
                            className="bi bi-box-arrow-left"
                            style={{ fontSize: '24px', color: 'yellow' }}
                            onMouseEnter={(e) => e.target.style.color = 'gray'}
                            onMouseLeave={(e) => e.target.style.color = 'yellow'} >
                        </i>
                    </div>
                </div>
            </nav>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-center">
                    <p>Are you sure you want to log out?</p>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SideNavigation;