import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import './Product.css'
import '../../style/Utilities.css'



function Product() {
  const [datas, setData] = useState([])
  let num = 1
  useEffect(() => {
    getData()
  },[])

  const getData = () => {
    axios.get('http://103.55.38.115:3000/product')
    .then(res =>{
      setData(res.data.data)
     
    })
    .catch (err => {
      console.log(err);
    })
  }
  return (
      <Container className="product mt-5">
        <Row>
          <Col>
            <h1 className = "col-title">PRODUCT</h1>
          </Col>
        </Row>
        <Row className = "mt-3">
          <Col><Button variant="success" href="add/product"> <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> ADD PRODUCT</Button></Col>
        </Row>
        <Row>
          <Col className="mt-3">
          <Table className="table" responsive bordered hover>
            <thead>
              <tr>
                <th>NO</th>
                <th>PICTURE</th>
                <th>NAME</th>
                <th>BRAND</th>
                <th>DESCRIPTION</th>
                <th>STOCK</th>
                <th>PRODUCT TYPE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
                {
                  datas.map(data => 
                    <tr>
                        <td>{num++}</td>
                        <td><img src={data.image} alt="Paris"/></td>
                        <td>{data.name}</td>
                        <td>{data.brand}</td>
                        <td>{data.description}</td>
                        <td>{data.stock}</td>
                        <td>{!data.ProductType ? "" : data.ProductType.name}</td>
                        <td><Col><Button variant="success" href={'edit/product/' + data.id}> <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> EDIT PRODUCT</Button></Col></td>
                    </tr>
                  )
                }
            </tbody>
          </Table>
          </Col>
        </Row>
      </Container>
  );
}

export default Product;
