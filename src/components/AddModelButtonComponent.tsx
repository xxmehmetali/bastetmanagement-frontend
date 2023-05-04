import Button from 'react-bootstrap/Button';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

export default function AddModelButtonComponent({ buttonName="UndefinedButtonName", redirectionUrl="/404" }: any) {

    return (
        <>
            <NavLink to={redirectionUrl} className="addModelButton" >
                <Button variant="primary">{buttonName}</Button>{' '}
            </NavLink>
        </>
    );
}
