import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Alert,} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Product.css'
import '../../style/Utilities.css'


function AddProduct() {

    let history = useHistory();
    const [datas, setData] = useState([])
    const [product, setProduct] = useState([])
    const [file, setFile] = useState(null);
    const [filepath, setFilepath] = useState(null);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('1');
    const [stock, setStock] = useState('');
    const [err, setErr] = useState('');
    const [succ, setSucc] = useState('');
    const { id } = useParams();



    useEffect(() => {
        getProductType();
        getProduct();
    },[])


    const getProduct = () => {
        axios.get('http://103.55.38.115:3000/product/' + id)
        .then(res =>{
          setName(res.data.data.name)
          setBrand(res.data.data.brand)
          setDescription(res.data.data.description)
          setStock(res.data.data.stock)
          setImage(res.data.data.image)
          res.data.data.id_type == null ? setType("") : setType(res.data.data.id_type)
          console.log(res)
        })
        .catch (err => {
          console.log(err);
        })
    }

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

            let formData = JSON.stringify({
                'name' : name,
                'brand' : brand,
                'description' : description,
                'stock' : parseInt(stock),
                'id_type' : parseInt(type),
                'image' : image
            })
            axios({
                method: "put",
                url: "http://103.55.38.115:3000/product/" + id,
                data: formData,
                headers: { 
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                console.log(response);
                swal({
                    title: "Good job!",
                    text: "Update Product Success!",
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
                    text: "Update Create Product!",
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
                    <h1 className = "col-title">EDIT PRODUCT</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={8} >
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name Product</Form.Label>
                            <Form.Control type="text" placeholder="@iphone12" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="@apple" value = {brand} onChange={e => setBrand(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="@desc" value = {description} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="number" placeholder="@12" value = {stock} onChange={e => setStock(e.target.value)} />
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
