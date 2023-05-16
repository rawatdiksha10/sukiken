import React from 'react';
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';


function EngineerInfo() {

    const [show, setShow] = useState(false);

    const [allenggData, setAllEnggData] = useState({});
    const [enggData, setEnggData] = useState<any>({});

    const handleClose = () => setShow(false);

    const handleSubmit = (id: any) => {

        fetchEnggInfoByID(id);
    };

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


    const fetchEnggInfoByID = async (userid:any) => {
        
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
        }
        else{
            setShow(true);
            setEnggData(data);
        }
    };
    
    console.log(enggData);
    console.log("hhh", enggData && enggData.specExp && Array.isArray(enggData.specExp) && enggData.specExp.length > 0 );
    
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
                                <Form.Control type="text"  name="status" id="status" readOnly  value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.statusname}/>
                            </Col>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <Form.Label>
                                    時給
                                </Form.Label>
                            </Col>
                            <Col sm={2}>
                                <Form.Control type="text" placeholder=""  name="wage" id="wage" readOnly value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.hourlywage}  />
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
                        
                        <Row className="mb-3"></Row>
                        <hr/>
                        <Row className="mb-1"></Row>
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
                                    </thead>
                                    <tbody>
                                        {
                                            enggData && enggData.specExp && Array.isArray(enggData.specExp) && enggData.specExp.length > 0?
                                                enggData.specExp.map((engg: any, index: any) => {
                                                    return (
                                                    <tr key={index}>
                                                        {
                                                        Object.keys(engg).map((cell: any, key) => {
                                                            return(
                                                                (cell === "content" || cell === "specexp" || cell === "exptypeflg") &&
                                                            <td key={key}
                                                                className='tableData'
                                                                >
                                                                {
                                                                    engg[cell]
                                                                }
                                                                </td>
                                                            )
                                                        })
                                                        }
                                                    </tr>
                                                )}
                                            ):
                                            <tr className='text-center text-white'>
                                                <td colSpan={6}>表示する情報がありません</td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="mb-3"></Row>
                        <hr/>
                        <Row className="mb-1"></Row>
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
                        <Row className="mb-3"></Row>
                        <hr/>
                        <Row className="mb-1"></Row>
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
                        <Row className="mb-3"></Row>
                        <hr/>
                        <Row className="mb-1"></Row>
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
                                        <th>内容</th>
                                        <th>使用技術（システム環境・言語等）</th>
                                        <th>役割・規模</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                        <td colSpan={2}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.jobcontent}</td>
                                        <td>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.tech}</td>
                                        <td>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.roleandscale}</td>
                                        </tr> */}
                                        {
                                            enggData && enggData.techSkill && Array.isArray(enggData.techSkill) && enggData.techSkill.length > 0?
                                                enggData.techSkill.map((engg: any, index: any) => {
                                                    return (
                                                    <tr key={index}>
                                                        {
                                                        Object.keys(engg).map((cell: any, key) => {
                                                            return(
                                                                (cell === "content" || cell === "tech" || cell === "roleandscale") &&
                                                            <td key={key}
                                                                className='tableData'
                                                                >
                                                                {
                                                                    engg[cell]
                                                                }
                                                                </td>
                                                            )
                                                        })
                                                        }
                                                    </tr>
                                                )}
                                            ):
                                            <tr className='text-center text-white'>
                                                <td colSpan={6}>表示する情報がありません</td>
                                            </tr>
                                        }
                                    
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="mb-3"></Row>
                        <Row>
                            <Col sm={9} lg={10}></Col>
                            <Col sm={3} lg={2}>
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

export default EngineerInfo;