import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '../pages/Login';
import Menu from '../layouts/Menu';
import EmployeeList from '../pages/EmployeeList';

export default function Dashboard() {
    return (
        <div>
            <ToastContainer position="bottom-right" />
            DASHBOARD

            {/* burda eğer login olmadıysa menuyu göster  */}
{/* <Menu /> */}


            {/* LOGİN OLDUYSA AŞAĞIYI GÖSTER */}

            {(() => {
                if (true) {
                    return (
                        <Container>
                        <Row>
                            <Col md="3">
                                <Login />
                            </Col>
                            <Col md="9">
                            <Routes>
                            <Route path='/' element={<EmployeeList />} />
                            {/* <Route path='/products' element={} />
                            <Route path='/products/:productId' element={<ProductDetail />} />
                            <Route path='/cart' element={<CartDetail />} /> */}
                        </Routes>
                            </Col>
                        </Row>
                    </Container>
                    )
                }else{
                    return (
""
                    )
                }
            })()}

            <Container>
                <Row>
                    <Col md="3">
                        <Menu />
                    </Col>
                    <Col md="9">
                        <Routes>
                            {/* <Route path='/' element={<ProductList />} />
                            <Route path='/products' element={<ProductList />} />
                            <Route path='/products/:productId' element={<ProductDetail />} />
                            <Route path='/cart' element={<CartDetail />} /> */}
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
