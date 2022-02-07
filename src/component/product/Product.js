import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import './Product.css'
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
    axios.get('http://103.55.38.115:3000/product',{
      headers: { 
        'authorization': loggedIn
      },
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
          url: 'http://103.55.38.115:3000/product/'+id,
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
            <h1 className = "col-title">PRODUCT</h1>
          </Col>
        </Row>
        <Row className = "mt-3">
          <Col><Button variant="success" href="add/product"> <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon> ADD PRODUCT</Button></Col>
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
                        <td>
                          <Col><Button variant="success" href={'edit/product/' + data.id}> <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> EDIT PRODUCT</Button></Col>
                          <Col onClick={() => {delData(data.id)}} className='mt-2'><Button > <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> DELETE PRODUCT</Button></Col>
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
