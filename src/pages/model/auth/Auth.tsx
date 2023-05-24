
import React from 'react'
import { Button, Card, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { useDispatch } from 'react-redux';

export default function Auth() {
    const dispatch = useDispatch()
    // dispatch(setUserLoggedIn(true))

    return (
        <>
            <Card className='mt-4'>
                <Card.Header>
                    <h3 className='p-1'>Bastet Management Systems</h3>

                </Card.Header>
                <Card.Body>
                    <NavLink to={navigationUrlProvider.login}>
                        <Button variant="primary" className='btn btn-primary btn-lg me-4 w-25'>Login</Button>
                    </NavLink>

                    <NavLink to={navigationUrlProvider.register}>
                        <Button variant="primary" className='btn btn-primary btn-lg w-25'>Register</Button>
                    </NavLink>
                </Card.Body>
            </Card>
        </>
    );
}
