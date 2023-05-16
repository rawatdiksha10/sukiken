import React from 'react';
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'



function MyPageForm() {

    const [show, setShow] = useState(false);

    const [formValues, setFormValues] = useState({ userid:""});


    const [validated, setValidated] = useState(false);

    const [allenggData, setAllEnggData] = useState({});
    const [enggData, setEnggData] = useState<any>({});

    const handleClose = () => setShow(false);

    const handleSubmit = (id: any) => {
        console.log("id is"+id);

        fetchEnggInfoByID(id);
        
        
    };

    

    // const [formValues, setFormValues] = useState({ userid:"", name: "", role: "1", password: "", cpassword: "" });

    // const handleChange = (e:any) => {
    //     const { name, value } = e.target;
    //     setFormValues({ ...formValues, [name]: value });
    // };
   
    

    const showEnggInfo = async () => {
        const res = await fetch("/fetchEnggInfo", {
          method: "GET",
          headers: { 
                  'Accept': 'application/json',
              },
        });

        const data = await res.json()
        if(data.success === false){
            console.log(data.message);
            return null
        }else{
            setAllEnggData(data)
        }
      }

      useEffect(() => {
        showEnggInfo()
      }, [])

    // const [enggData, setEnggData] = useState({});

    const fetchEnggInfoByID = async (userid:any) => {
        console.log("userid is "+userid);
        
        const res = await fetch("/fetchEnggInfoByID", {
            method: "POST",
            headers: { 
                    "Content-Type": "application/json" 
                },
            body: JSON.stringify({userid})
        })

        const data = await res.json()

        if(data.success === false){
            console.log(data.message);
            return null
        }else{
           
            setShow(true);
            setEnggData(data)

            
        }
    };
    
        console.log(enggData);
      console.log("hhh", typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.userid);
    return (
        <>
            {/* <Button variant="link" onClick={() => {
                  handleSubmit(e);

                }}>
                takada10
            </Button> */}
            <li>
                <ul>
             {
          allenggData && Array.isArray(allenggData) && allenggData.length > 0 &&
          allenggData.map((engg, index) => {
                  return (
                    <Button variant="link" key={index} onClick={() => handleSubmit(engg.userid)}>
                        {engg.userid}
                    </Button>
                  )
            })}
            </ul>
            </li>

            <Modal scrollable={true} size="lg" show={show} onHide={() => setShow(false)} dialogClassName="modal-100w" aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                       インジニア情報
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container>
                        <Row className="mb-3">
                            <Col sm={3}>
                                <Form.Label>
                                    ステータス
                                </Form.Label>
                            </Col>
                            <Col sm={2}>
                                <Form.Control type="text"  name="status" id="status" readOnly  />
                            </Col>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <Form.Label>
                                    時給
                                </Form.Label>
                            </Col>
                            <Col sm={2}>
                                <Form.Control type="text" placeholder=""  name="wage" id="wage"   />
                            </Col>
                        </Row>
                        <Row className="mb-3"></Row>
                        <Row className="mb-3">
                            <Col sm={3}>
                                <Form.Label>
                                    実務経験
                                </Form.Label>
                            </Col>
                            <Col sm={2}>
                                <Form.Control type="text" placeholder=""  name="exp1" id="exp1" readOnly value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.totalexp} />
                            </Col>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <Form.Label>
                                    日本企業勤務経験
                                </Form.Label>
                            </Col>
                            <Col sm={2}>
                                <Form.Control type="text" placeholder=""  name="exp2" id="exp2" readOnly value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.jpexp} />
                            </Col>
                        </Row>
                        <Row className="mb-5"></Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    得意とする経験・分野・スキル
                                </Form.Label>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        {/* <tr>
                                        <th colSpan={3}>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        </tr> */}
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td colSpan={3}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.userid}</td>
                                        <td>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.name}</td>
                                        <td>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.name}</td>
                                        </tr>
                                        <tr>
                                        <td colSpan={3}></td>
                                        <td>b</td>
                                        <td>b</td>
                                        </tr>
                                        <tr>
                                        <td colSpan={3}>c</td>
                                        <td>c</td>
                                        <td>c</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="mb-4"></Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    語学スキル
                                </Form.Label>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Table striped bordered hover size="sm">
                                    {/* <thead>
                                        <tr>
                                            <th colSpan={3}>First Name</th>
                                        </tr>
                                        <tr>
                                            <th colSpan={3}>First Name</th>
                                        </tr>
                                        <tr>
                                            <th colSpan={3}>First Name</th>
                                        </tr>
                                    </thead> */}
                                    <tbody>
                                        <tr>
                                            <td>日本語</td>
                                            <td colSpan={3}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.japanese}</td>
                                            <td >{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.jpexamname}</td>
                                            <td >{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.jppassedlevel}</td>
                                        </tr>
                                        <tr>
                                            <td>英語</td>
                                            <td colSpan={6}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.english}</td>
                                        </tr>
                                        <tr>
                                            <td>その他</td>
                                            <td colSpan={6}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.otherlang}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="mb-4"></Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    技術スキル
                                </Form.Label>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Control as="textarea" rows={4} name="itskill" id="itskill" readOnly value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.techskill}/>
                            </Col>
                        </Row>
                        <Row className="mb-4"></Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    技術スキル習得歴
                                </Form.Label>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <Table striped bordered hover size="lg">
                                    <thead>
                                        <tr>
                                        <th colSpan={2}>内容</th>
                                        <th>使用技術（システム環境・言語等）</th>
                                        <th>役割・規模</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td colSpan={2}>a</td>
                                        <td>a</td>
                                        <td>a</td>
                                        </tr>
                                        <tr>
                                        <td colSpan={2}>b</td>
                                        <td>b</td>
                                        <td>b</td>
                                        </tr>
                                        <tr>
                                        <td colSpan={2}>c</td>
                                        <td>c</td>
                                        <td>c</td>
                                        </tr>
                                        <tr>
                                        <td colSpan={2}>d</td>
                                        <td>d</td>
                                        <td>d</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="mb-3"></Row>
                        <Row>
                            <Col sm={10}></Col>
                            <Col sm={2}>
                                <Button variant="primary" onClick={handleClose}>
                                    閉じる
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
              
    
    );
}

export default MyPageForm;