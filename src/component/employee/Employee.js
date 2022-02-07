import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import moment from 'moment';
import '../../style/Utilities.css'
import swal from 'sweetalert';



function Product() {
  const [datas, setData] = useState([])
  const loggedIn = localStorage.getItem('loggedIn');
  let num = 1
  useEffect(() => {
    getData()
  },[])

  const getData = () => {
    axios.get('http://103.55.38.115:3000/employee', {
      headers: {
        'authorization': loggedIn
      }
    })
    .then(res =>{
      setData(res.data.data)
    })
    .catch (err => {
      console.log(err);
    })
  }

  function delData(id){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        var config = {
          method: 'delete',
          url: 'http://103.55.38.115:3000/employee/'+id,
          headers: {
            'authorization': loggedIn
           },
        };
        
        axios(config)
        .then(function (response) {
          getData()
          swal("Poof! Your product has been deleted!", {
            icon: "success",
          });
        })
        .catch(function (error) {
          swal("Poof! Your product not deleted!", {
            icon: "alert",
          });
        });
       
      } else {
        swal("Poof! Your product not deleted!");
      }
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
          <Col><Button variant="success" href="add/employee"> <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon> ADD EMPLOYEE</Button></Col>
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
                        <td>
                          <Col><Button variant="success" href={'edit/employee/' + data.id_emp}> <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> EDIT EMPLOYEE</Button></Col>
                          <Col onClick={() => {delData(data.id_emp)}} className='mt-2'><Button > <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> DELETE PRODUCT</Button></Col>
                        </td>
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
