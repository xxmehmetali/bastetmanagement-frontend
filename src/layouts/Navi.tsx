import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navi() {


    return (
        <div className='naviContainer'>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home" as={NavLink} to={"/"}>Bastet Management System</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Link to="/cart">Go to Cart</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
