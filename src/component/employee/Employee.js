import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import moment from 'moment';
import '../../style/Utilities.css'



function Product() {
  const [datas, setData] = useState([])
  let num = 1
  useEffect(() => {
    getData()
  },[])

  const getData = () => {
    axios.get('http://103.55.38.115:3000/employee')
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
            <h1 className = "col-title">EMPLOYEE</h1>
          </Col>
        </Row>
        <Row className = "mt-3">
          <Col><Button variant="success" href="add/employee"> <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> ADD EMPLOYEE</Button></Col>
        </Row>
        <Row>
          <Col className="mt-3">
          <Table className="table" responsive bordered hover>
            <thead>
              <tr>
                <th>NO</th>
                <th>NAME</th>
                <th>ID EMPLOYEE</th>
                <th>ADDRESS</th>
                <th>PHONE</th>
                <th>GENDER</th>
                <th>DATE OF BIRTH</th>
                <th>PLACE OF BIRTH</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
                {
                  datas.map(data => 
                    <tr>
                        <td>{num++}</td>
                        <td>{data.name}</td>
                        <td>{data.uid}</td>
                        <td>{data.address}</td>
                        <td>{data.phone}</td>
                        <td>{data.gender}</td>
                        <td>{moment(new Date(data.dob)).format('MMM Do YY')}</td>
                        <td>{data.pob}</td>
                        <td><Col><Button variant="success" href={'edit/employee/' + data.id_emp}> <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> EDIT EMPLOYEE</Button></Col></td>
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
