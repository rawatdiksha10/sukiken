import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdWork, MdPassword, MdNumbers } from 'react-icons/md';
import { validPassword } from './formValidationRegex';
import Select from "react-select";
import './style.css'



function TestFile() {
    const options = [
        { value: "1", label: "GIT" },
        { value: "2", label: "JM ADMIN" },
      ];

      const handleSelect = (selectedOption: any) => {
        setFormValues({ ...formValues, "role": selectedOption.value });
        console.log(`Option selected:`, selectedOption);
      };

    // const toastOptions = {
    //     position : "bottom-right",
    //     autoClose : 8000,
    //     pauseOnHover: true,
    //     draggable: true,
    //     theme: "dark",
    //   };

    //   <ToastContainer
    //   position="bottom-right"
    //   autoClose={8000}
    //   draggable
    //   pauseOnHover
    //   theme="dark"
    //   />
    //   // eslint-disable-next-line no-lone-blocks
    //   {/* Same as */}
    //   <ToastContainer />
//   const navigate = useNavigate();

  const [formValues, setFormValues] = useState({ userid:"", name: "", role: "", password: "", cpassword: "" });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // console.log(formValues);

  const handleSubmit = (e: any) => {
    e.preventDefault(); 
    if(validate()){
      console.log("call the api");
      createUser(e);
      // const { name, email, password } = formValues;
      // localStorage.setItem("skype-chat", JSON.stringify({name, email, password}));
      // navigate("/signup/selectAvatar");
    }
    else{
        console.log("Couldn't call the API");
        console.log(formValues);
    }
  };


  const validate = () => {
    const { password, cpassword, name, role, userid } = formValues;

    if (userid === "") {
        toast.error("Please Fill your id");
        return false;
        // document.querySelector(".userid-error").innerHTML = "Please enter a username";
        // document.querySelector(".userid-error").style.display = "block";
        // return false;
    }

    if (name === "") {
        toast.error("Please Fill your name");
        return false;
    }

    else if (role === "") {
        toast.error("Please Fill your role");
        return false;
    }

    else if (password === "") {
        toast.error("Please Fill the password");
        return false;
    }
    // else if (!validPassword.test(password)) {
    else if (password.length<5 && password.length>8) {
        toast.error("Password should have a length between 5 to 8 characters");
        return false;
    }
    else if (cpassword === "") {
        toast.error("Please confirm your password");
        return false;
    }  
    else if (password !== cpassword) {
        toast.error("Passwords does not match!");
        return false;
    }
    return true;
  };

//   function select_option (role,2) {

//     var select; 
//     select = document.getElementById(role);
//     if (select == null) return 0;
    
//     var option;
//     option = select.options.namedItem(2);
//     if (option == null) return 0;
   
//     option.selected = "selected";
//     return true;
//    } 

  const createUser = async (e:any) => {
    e.preventDefault();
    console.log("APIIIIIIIIIII");
    const { userid, name, role, password, cpassword } = formValues;
    // console.log(role);

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
        // console.log("User already Registered ",data);
        toast.error("User already Registered", data);
        // localStorage.clear();
        // navigate("/",{state: 'success'});
    }
    else{
        toast.success("User registered successfully");
    }
  };

  return (
  <>
    <div className='form-container container-fluid'>
      <div className="row">
        <form method='POST' noValidate onSubmit={(event) => handleSubmit(event)}>
          <h2 className='mb-3 text-center'>Create A New Account</h2>
          {/* <p className='mb-5 text-center'>Get started by creating your new account</p> */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><MdNumbers /></span>
            <input type="text" className="form-control" name="userid" id="userid" placeholder="" aria-label="" aria-describedby="basic-addon1" 
                  value={formValues.userid}
                  onChange={(e) => handleChange(e)}/>
                  
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><FaUserAlt /></span>
            <input type="text" className="form-control" name="name" id="name" placeholder="" aria-label="" aria-describedby="basic-addon1" 
                  value={formValues.name}
                  onChange={(e) => handleChange(e)}/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><MdWork /></span>
            {/* <select className="form-control" name="role" id="role"  value={formValues.role}
                  onChange={(e) => handleChange(e)}>
                <option id="1" value="1">GIT</option>
                <option  id="2" value="2">JM ADMIN</option>
            </select> */}
            <Select  className="form-control basic-single" defaultValue={options[0]}
            options={options} onChange={handleSelect} autoFocus={true} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><MdPassword /></span>
            <input type="password" className="form-control" name="password" id="password" placeholder="" aria-label="" aria-describedby="basic-addon1" 
                    value={formValues.password}
                    onChange={(e) => handleChange(e)}/>
          </div>
          <div className="input-group mb-5">
            <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
            <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="" aria-label="" aria-describedby="basic-addon1" 
                    value={formValues.cpassword}
                    onChange={(e) => handleChange(e)}/>
          </div>
          <div className='text-center  mb-3'>
              <button type="submit" className="text-white btn btn-success w-100"><span>Register </span></button>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer />
  </>
  )
}

export default TestFile;


// import React from 'react';
// import { useState } from "react";
// import ReactDOM from "react-dom/client";
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Card from 'react-bootstrap/Card';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import { FaAlignCenter, FaEyeSlash, FaEye, FaUserAlt } from 'react-icons/fa';
// import { RiLockPasswordFill } from 'react-icons/ri';
// import { MdWork, MdPassword, MdNumbers } from 'react-icons/md';
// import { validPassword } from './formValidationRegex';
// import Select from "react-select";
// import './style.css'
// import { FormSelect } from 'react-bootstrap';

// function NewRegistrationForm() {
    
//     // const options = [
//     //     { value: "1", label: "GIT" },
//     //     { value: "2", label: "JM ADMIN" },
//     // ];

//     // const handleSelect = (selectedOption: any) => {
//     //     setFormValues({ ...formValues, "role": selectedOption.value });
//     //     console.log(`Option selected:`, selectedOption);
//     // };

    
//     const handleSelect = (selectedOption: any) => {
//         setFormValues({ ...formValues, "role": selectedOption.target.value });
//         // console.log(`Option selected:`, selectedOption.target.value );
//     };


//     const [passwordType, setPasswordType] = useState("password");
//     const [cpasswordType, setCPasswordType] = useState("password");

//     const togglePassword =()=>{
//         if(passwordType==="password")
//         {
//             setPasswordType("text")
//             return;
//         }
//         setPasswordType("password")
//     }

//     const toggleCPassword =()=>{
//         if(cpasswordType==="password")
//         {
//             setCPasswordType("text")
//             return;
//         }
//         setCPasswordType("password")
//     }



//     const [formValues, setFormValues] = useState({ userid:"", name: "", role: "1", password: "", cpassword: "" });

//     const handleChange = (e:any) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//     };

 
//     const [validated, setValidated] = useState(false);

//     const handleSubmit = (e: any) => {
//         const { password, cpassword, name, role, userid } = formValues;
//         const form = e.currentTarget;
        
//         if ((form.checkValidity() === false) ||  (password !== cpassword)) 
//         {
//             e.preventDefault();
//             e.stopPropagation();
//             setValidated(true);

//             toast.error("パスワードが一致しません！");
            
//         }
//         else{
//             createUser(e);
//         }
//     };

//     const defaultPassword = () => {
//         setFormValues({ ...formValues, "password": "Human" , "cpassword":"Human"});
//     };


//     //   function select_option (role,2) {

//     //     var select; 
//     //     select = document.getElementById(role);
//     //     if (select == null) return 0;
        
//     //     var option;
//     //     option = select.options.namedItem(2);
//     //     if (option == null) return 0;
    
//     //     option.selected = "selected";
//     //     return true;
//     //    } 

//     const createUser = async (e:any) => {
//         e.preventDefault();
//         const { userid, name, role, password, cpassword } = formValues;
//         console.log(formValues);
        
//         const res = await fetch("/register", {
//             method: "POST",
//             headers: { 
//                     "Content-Type": "application/json" 
//                 },
//             body: JSON.stringify({ userid, name, role, password, cpassword })
//         })

//         if(res.status === 400){
//             // console.log(res.status);
//             const data = await res.json();
//             toast.error("ユーザーはすでに登録されています！", data);
//             // localStorage.clear();
//             // navigate("/",{state: 'success'});
//         }
//         else{
//             toast.success("ユーザー登録完了しました！");
//         }
//     };
  
//     return (
//         <Container style={{width:'60%'}} fluid="md">
//             <Row>
//                 {/* <Col></Col> */}
//                 <Col>
//                     <Card className="shadow-lg p-3 mb-5 bg-white rounded">
//                         <Card.Body>
//                             <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event)}>
//                                 <Form.Group as={Row} className="mb-3" >
//                                     <Form.Label column sm={3}>
//                                     ユーザーID
//                                     </Form.Label>
//                                     <Col sm={9}>
//                                     <Form.Control type="text" placeholder=""  required minLength={9} pattern="^[a-zA-Z0-9]+$" name="userid" id="userid" value={formValues.userid} onChange={(e) => handleChange(e)} />
//                                     <Form.Control.Feedback type="invalid">入力したユーザーIDが間違っています</Form.Control.Feedback>
//                                     </Col>
//                                 </Form.Group>

//                                 <Form.Group as={Row} className="mb-3" >
//                                     <Form.Label column sm={3}>
//                                     名前
//                                     </Form.Label>
//                                     <Col sm={9}>
//                                     <Form.Control type="text" placeholder="" required pattern="^[a-zA-Z ]*$" name="name" id="name" value={formValues.name} onChange={(e) => handleChange(e)}/>
//                                     <Form.Control.Feedback type="invalid">名前を入力してください</Form.Control.Feedback>
//                                     </Col>
//                                 </Form.Group>

//                                 <Form.Group as={Row} className="mb-3" >
//                                     <Form.Label column sm={3}>
//                                     ユーザー区分
//                                     </Form.Label>
//                                     <Col sm={9}>
//                                     <Form.Select value={formValues.role}  onChange={handleSelect}>
//                                         <option value="1">GIT</option>
//                                         <option value="2">JM Admin</option>
//                                     </Form.Select>

//                                     {/* <Form.Control as="select" value={formValues.role} onChange={handleSelect}>
//                                         <option value="1">GIT</option>
//                                         <option value="2">JM Admin</option>
//                                     </Form.Control> */}
                                    
//                                     {/* <Select  className="mb-3" defaultValue={options[0]}
//                                         options={options} onChange={handleSelect} /> */}
//                                     </Col>
//                                 </Form.Group>

//                                 <Form.Group as={Row} className="mb-3" >
//                                     <Form.Label column sm={3}>
//                                     新しいパスワード
//                                     </Form.Label>
//                                     <Col sm={9}>
//                                     <InputGroup>
//                                         <Form.Control type={passwordType} placeholder="" required maxLength={8} minLength={5} name="password" id="password" value={formValues.password} onChange={(e) => handleChange(e)} />
//                                         <Button variant="outline-secondary" onClick={togglePassword} >
//                                         { passwordType==="password"? <span className="mb-3" id="basic-addon1"><FaEyeSlash/></span>:<FaEye/> }
//                                         </Button>
//                                     </InputGroup>
//                                     <Form.Control.Feedback type="invalid">パスワードを5文字以上8文字以内で入力してください</Form.Control.Feedback>
//                                     </Col>
//                                 </Form.Group>

//                                 <Form.Group as={Row} className="mb-1" >
//                                     <Form.Label column sm={3}>
//                                     再入力パスワード
//                                     </Form.Label>
//                                     <Col sm={9}>
//                                     <InputGroup>
//                                         <Form.Control type={cpasswordType}  placeholder="" required name="cpassword" id="cpassword" value={formValues.cpassword} onChange={(e) => handleChange(e)}/>
//                                         <Button variant="outline-secondary" onClick={toggleCPassword} id="button-addon2">
//                                             { cpasswordType==="password"? <FaEyeSlash/>:<FaEye/> }
//                                         </Button>
//                                     </InputGroup>
//                                     <Form.Control.Feedback type="invalid" >パスワードもう一度確認してください</Form.Control.Feedback>
//                                     </Col>
//                                 </Form.Group>

//                                 <Form.Group as={Row} className="mb-3">
//                                     <Col sm={9}></Col>
//                                     <Col sm={3}>
//                                         <Button onClick={defaultPassword} variant="link">既定値パスワード</Button>
//                                     </Col>
//                                 </Form.Group>

//                                 <Form.Group as={Row} className="mb-3"></Form.Group>

//                                 <Form.Group as={Row}>
//                                     <Col sm={10}></Col>
//                                     <Col sm={2}>
//                                         <Button type="submit" variant="primary" size="lg" >Register</Button>
//                                     </Col>
//                                     {/* <Col sm={{ span: 6, offset: 2 }}>
//                                     <Button type="submit" variant="danger">Cancel</Button>
//                                     </Col> */}
//                                 </Form.Group>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 {/* <Col></Col> */}
//             </Row>

//         <ToastContainer />
//         </Container>
    
//     );
// }

// export default NewRegistrationForm;