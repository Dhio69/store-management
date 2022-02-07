import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Alert,} from 'react-bootstrap'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import '../../style/Utilities.css'
import moment from 'moment';
import { useParams } from "react-router-dom";


function EditEmployee() {

    let history = useHistory();
    const [datas, setData] = useState([])
    const [name, setName] = useState('');
    const [uid, setUid] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [pob, setPob] = useState('');
    const [gender, setGender] = useState('');
   
    const [err, setErr] = useState('');
    const { id } = useParams();
    const loggedIn = localStorage.getItem('loggedIn');

    useEffect(() => {
        getEmployee()
    },[])

    const getEmployee = () => {
        axios.get('http://103.55.38.115:3000/employee/' + id, {
            headers: {
                'authorization': loggedIn
            }
        })
        .then(res =>{
            setName(res.data.data.name)
            setUid(res.data.data.uid)
            setAddress(res.data.data.address)
            setPhone(res.data.data.phone)
            setGender(res.data.data.gender)
            setPob(res.data.data.pob)
            setDob(res.data.data.dob)
        })
        .catch (err => {
          console.log(err);
        })
    }



    const submitValue = () => {

        if ( !name || !uid || !phone ) {
            swal({
                title: "Opss!",
                text: "Please fill all blank field!",
                icon: "error",
                buttons: false,
                timer: 1000
            });
        } else {
            setErr("")
            let date = new Date(dob)
            let data = JSON.stringify({
                'name' : name,
                'uid' : uid,
                'address' : address,
                'phone' : phone,
                'dob' : moment(date).format('YYYY-MM-DD'),
                'pob': pob,
                'gender' : gender
            })
            axios({
                method: "put",
                url: "http://103.55.38.115:3000/employee/" + id,
                data: data,
                headers: { 
                    'Content-Type': 'application/json',
                    'authorization': loggedIn
                },
            })
            .then(response => {
                swal({
                    title: "Good job!",
                    text: "Edit Employee Success!",
                    icon: "success",
                    buttons: false,
                    timer: 1000
                });
                setInterval(() => {
                    history.push("/employee");
                }, 2000);
               
            })
            .catch(err => {
                swal({
                    title: "Opss!",
                    text: "Error Edit Employee !",
                    icon: "error",
                    buttons: false,
                    timer: 1000
                });
            })
            
        }

       
    }
    return (
        <Container className="product mt-5">
            
            <Row>
                <Col>
                    <h1 className = "col-title">EDIT EMPLOYEE</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={8} >
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="@John" value={name}  onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Uid</Form.Label>
                            <Form.Control type="text" placeholder="@M100" value={uid}  onChange={e => setUid(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="@Pakapura road" value={address}  onChange={e => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="number" placeholder="@0898899000" value={phone}  onChange={e => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" placeholder="@1996-11-11" value={dob}  onChange={e => setDob(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Place of Birth</Form.Label>
                            <Form.Control type="text" placeholder="@Jakarta" value={pob}  onChange={e => setPob(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                value={gender}
                                onChange={e => {
                                    setGender(e.target.value);
                                }}
                                >
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm={8} className="d-flex justify-content-end"><Button onClick={submitValue} variant="success">Submit</Button></Col>
            </Row>
        </Container>
    );
}

export default EditEmployee;
