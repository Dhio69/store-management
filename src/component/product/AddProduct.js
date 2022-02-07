import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Alert,} from 'react-bootstrap'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Product.css'
import '../../style/Utilities.css'


function AddProduct() {

    let history = useHistory();
    const [datas, setData] = useState([])
    const [file, setFile] = useState(null);
    const [filepath, setFilepath] = useState(null);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [stock, setStock] = useState('');
    const [err, setErr] = useState('');
    const [succ, setSucc] = useState('');
    const loggedIn = localStorage.getItem('loggedIn');



    useEffect(() => {
        getProductType()
    },[])

    const getProductType = () => {
        axios.get('http://103.55.38.115:3000/producttype')
        .then(res =>{
          setData(res.data.data)
        })
        .catch (err => {
          console.log(err);
        })
    }

    const submitValue = () => {

        if ( !name || !brand ) {
            swal({
                title: "Opss!",
                text: "Please fill all blank field!",
                icon: "error",
                buttons: false,
                timer: 1000
            });
        } else {
            setErr("")
            const formData = new FormData();
            formData.append("file", file);
            try {
                axios({
                    method: "post",
                    url: "http://103.55.38.115:3000/upload",
                    data: formData,
                    headers: { 
                      "Content-Type": "multipart/form-data" ,
                      'authorization': loggedIn
                    },
                })
                .then(res =>{
                    let data = JSON.stringify({
                        'name' : name,
                        'brand' : brand,
                        'description' : description,
                        'stock' : parseInt(stock),
                        'id_type' : parseInt(type),
                        'image' : res.data.path
                    })

                    axios({
                        method: "post",
                        url: "http://103.55.38.115:3000/product",
                        data: data,
                        headers: { 
                            'Content-Type': 'application/json',
                            'authorization': loggedIn
                        },
                    })
                    .then(response => {
                        swal({
                            title: "Good job!",
                            text: "Create Product Success!",
                            icon: "success",
                            buttons: false,
                            timer: 1000
                        });
                        setInterval(() => {
                            history.push("/");
                        }, 2000);
                       
                    })
                    .catch(err => {
                        swal({
                            title: "Opss!",
                            text: "Error Create Product!",
                            icon: "error",
                            buttons: false,
                            timer: 1000
                        });
                    })

                   
                })
                .catch (err => {
                    console.log(err);
                    swal({
                        title: "Opss!",
                        text: "Error Upload File!",
                        icon: "error",
                        buttons: false,
                        timer: 1000
                    });
                })
            } catch(error) {
                console.log(error)
                swal({
                    title: "Opss!",
                    text: "Error Upload File!",
                    icon: "error",
                    buttons: false,
                    timer: 1000
                });
            }  
        }

       
    }

    const handleFileSelect = (event) => {
        setFile(event.target.files[0])
     }

    return (
        <Container className="product mt-5">
            
            <Row>
                <Col>
                    <h1 className = "col-title">ADD PRODUCT</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={8} >
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Image Product</Form.Label>
                            <Form.Control type="file" onChange={handleFileSelect} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name Product</Form.Label>
                            <Form.Control type="text" placeholder="@iphone12"  onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="@apple" onChange={e => setBrand(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="@desc" onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="number" placeholder="@12" onChange={e => setStock(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={type}
                                onChange={e => {
                                    setType(e.target.value);
                                }}
                                >
                                 <option value="">Pick Type of Product</option>
                                {
                                    datas.map(data => 
                                        <option value={data.id_type}>{data.name}</option>
                                    )
                                }
                               
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

export default AddProduct;
