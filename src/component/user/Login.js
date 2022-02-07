import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Alert,} from 'react-bootstrap'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from "react-router-dom";
import { Redirect, Route } from "react-router";
import axios from 'axios';
import '../../style/Utilities.css'
import moment from 'moment';
import { useParams } from "react-router-dom";


function Login() {
  
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const submitValue = () => {
        var data = JSON.stringify({"username":username, "password":password});
        var config = {
            method: 'post',
            url: 'http://103.55.38.115:3000/users/signin',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            localStorage.setItem('loggedIn', response.data.token)
            window.location.href = "/";
        })
        .catch(function (error) {
            swal({
                title: "Opss!",
                text: "Your password or username is incorrect!",
                icon: "error",
                buttons: false,
                timer: 1000
            });
        });
    }

    return (
        <Container className="product mt-5">
            
            <Row className="d-flex justify-content-center">
                <Col sm={8}>
                    <h1 className = "col-title">LOGIN</h1>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col sm={8}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="@Usernmae"  onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="@Password"  onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm={10} className="d-flex justify-content-end"><Button onClick={submitValue} variant="success">Submit</Button></Col>
            </Row>
        </Container>
    );
}

export default Login;
