import React from 'react';
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEyeSlash, FaEye} from 'react-icons/fa';
import './style.css'

function NewRegistrationForm() {
    
    // const options = [
    //     { value: "1", label: "GIT" },
    //     { value: "2", label: "JM ADMIN" },
    // ];

    // const handleSelect = (selectedOption: any) => {
    //     setFormValues({ ...formValues, "role": selectedOption.value });
    //     console.log(`Option selected:`, selectedOption);
    // };

    
    const handleSelect = (selectedOption: any) => {
        setFormValues({ ...formValues, "role": selectedOption.target.value });
    };


    const [passwordType, setPasswordType] = useState("password");
    const [cpasswordType, setCPasswordType] = useState("password");

    const togglePassword =()=>{
        if(passwordType==="password")
        {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const toggleCPassword =()=>{
        if(cpasswordType==="password")
        {
            setCPasswordType("text")
            return;
        }
        setCPasswordType("password")
    }


    const [formValues, setFormValues] = useState({ userid:"", name: "", role: "1", password: "", cpassword: "" });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

 
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e: any) => {
        const { password, cpassword, name, role, userid } = formValues;
        const form = e.currentTarget;
        
        if ((form.checkValidity() === false) ||  (password !== cpassword)) 
        {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);

            toast.error("パスワードが一致しません！");
            
        }
        else{
            createUser(e);
        }
    };

    const defaultPassword = () => {
        setFormValues({ ...formValues, "password": "Human" , "cpassword":"Human"});
    };

    const createUser = async (e:any) => {
        e.preventDefault();
        const { userid, name, role, password, cpassword } = formValues;
        console.log(formValues);
        
        const res = await fetch("/register", {
            method: "POST",
            headers: { 
                    "Content-Type": "application/json" 
                },
            body: JSON.stringify({ userid, name, role, password, cpassword })
        })

        if(res.status === 400){
            // console.log(res.status);
            const data = await res.json();
            toast.error("ユーザーはすでに登録されています！", data);
            // localStorage.clear();
            // navigate("/",{state: 'success'});
        }
        else{
            toast.success("ユーザー登録完了しました！");
        }
    };
  
    return (
        <Container style={{width:'60%'}} fluid="md">
            <Row>
                {/* <Col></Col> */}
                <Col>
                    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event)}>
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm={3}>
                                    ユーザーID
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" placeholder=""  required minLength={9} pattern="^[a-zA-Z0-9]+$" name="userid" id="userid" value={formValues.userid} onChange={(e) => handleChange(e)} />
                                    <Form.Control.Feedback type="invalid">入力したユーザーIDが間違っています</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm={3}>
                                    名前
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" placeholder="" required pattern="^[a-zA-Z ]*$" name="name" id="name" value={formValues.name} onChange={(e) => handleChange(e)}/>
                                    <Form.Control.Feedback type="invalid">名前を入力してください</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm={3}>
                                    ユーザー区分
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Select value={formValues.role}  onChange={handleSelect}>
                                        <option value="1">GIT</option>
                                        <option value="2">JM Admin</option>
                                    </Form.Select>

                                    {/* <Form.Control as="select" value={formValues.role} onChange={handleSelect}>
                                        <option value="1">GIT</option>
                                        <option value="2">JM Admin</option>
                                    </Form.Control> */}
                                    
                                    {/* <Select  className="mb-3" defaultValue={options[0]}
                                        options={options} onChange={handleSelect} /> */}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm={3}>
                                    新しいパスワード
                                    </Form.Label>
                                    <Col sm={9}>
                                    <InputGroup>
                                        <Form.Control type={passwordType} placeholder="" required maxLength={8} minLength={5} name="password" id="password" value={formValues.password} onChange={(e) => handleChange(e)} />
                                        <Button variant="outline-secondary" onClick={togglePassword} >
                                        { passwordType==="password"? <span className="mb-3" id="basic-addon1"><FaEyeSlash/></span>:<FaEye/> }
                                        </Button>
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">パスワードを5文字以上8文字以内で入力してください</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-1" >
                                    <Form.Label column sm={3}>
                                    再入力パスワード
                                    </Form.Label>
                                    <Col sm={9}>
                                    <InputGroup>
                                        <Form.Control type={cpasswordType}  placeholder="" required name="cpassword" id="cpassword" value={formValues.cpassword} onChange={(e) => handleChange(e)}/>
                                        <Button variant="outline-secondary" onClick={toggleCPassword} id="button-addon2">
                                            { cpasswordType==="password"? <FaEyeSlash/>:<FaEye/> }
                                        </Button>
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid" >パスワードもう一度確認してください</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={9}></Col>
                                    <Col sm={3}>
                                        <Button onClick={defaultPassword} variant="link">既定値パスワード</Button>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3"></Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={10}></Col>
                                    <Col sm={2}>
                                        <Button type="submit" variant="primary" size="lg" >登録</Button>
                                    </Col>
                                    {/* <Col sm={{ span: 6, offset: 2 }}>
                                    <Button type="submit" variant="danger">Cancel</Button>
                                    </Col> */}
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col></Col> */}
            </Row>

        <ToastContainer />
        </Container>
    
    );
}

export default NewRegistrationForm;