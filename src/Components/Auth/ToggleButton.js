import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const ToggleButton = ({ isLogin, toggleForm }) => {
    const activeStyle = {
        backgroundColor: '#f0a42c',
        color: '#201c1c',
        border: '1px solid #f0a42c', 
        padding: '12px 24px', 
        fontSize: '18px', 
    };

    const inactiveStyle = {
        backgroundColor: '#201c1c',
        color: 'white',
        border: '1px solid #f0a42c',
        padding: '12px 24px', 
        fontSize: '18px', 
    };

    return (
        <ButtonGroup className="w-100">
            <Button 
                style={isLogin ? activeStyle : inactiveStyle} 
                onClick={toggleForm} 
                className="flex-fill">
                Log In
            </Button>
            <Button 
                style={!isLogin ? activeStyle : inactiveStyle} 
                onClick={toggleForm} 
                className="flex-fill">
                Sign Up
            </Button>
        </ButtonGroup>
    );
};

export default ToggleButton;
