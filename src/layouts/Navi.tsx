import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserLoggedIn } from '../features/slices/userSlice';
import { RootState } from '../app/store';
import { setUser } from '../features/slices/userSlice';
import { EmptyConcreteJwtResponse } from '../models/authDtos/EmptyConcreteJwtResponse';
import navigationUrlProvider from '../providers/navigationUrlProvider';

export default function Navi() {

    const navigate = useNavigate();
    const { isUserLoggedIn } = useSelector((state: RootState) => state.userSlice);

    const dispatch = useDispatch();
    function handleSignOut() {
        const emptyJwtResponse =
            dispatch(setIsUserLoggedIn(false))
        dispatch(setUser(EmptyConcreteJwtResponse))
        //delete userinfo from localstorage
        localStorage.setItem(
            "loggedInUserInfo",
            JSON.stringify(EmptyConcreteJwtResponse)
        )
        navigate(navigationUrlProvider.auth)

    }

    function handleNavigateToProfilePage() {
        navigate(navigationUrlProvider.profile)
    }

    return (
        <div className='naviContainer'>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home" as={NavLink} to={"/"}>Bastet Management System</Navbar.Brand>
                    <Nav className="me-auto">

                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        {/* <Nav.Link href="#pricing" onClick={x}>Pricing</Nav.Link> */}

                        {
                            isUserLoggedIn &&
                            isUserLoggedIn == true && (
                                <>
                                    <Nav.Link onClick={handleNavigateToProfilePage}>My Profile</Nav.Link>
                                    <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
                                </>
                            )
                        }

                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
