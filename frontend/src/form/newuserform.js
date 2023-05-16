import React from 'react';
import { useState } from "react";
import ReactDOM from "react-dom/client";


import './style.css'
function NewUserForm() {
    const [dept, setDept] = useState("GIT");

    const handleChange = (event) => {
        setDept(event.target.value)
    }

    return(
      <div className="form">
          <div className="form-body">
              <div className="userid">
                  <label className="form__label" for="userId">ユーザーID</label>
                  <input className="form__input" type="text" id="userId" placeholder=""/>
              </div>
              <div className="name">
                  <label className="form__label" for="name">名前</label>
                  <input  type="text" name="" id="name"  className="form__input"placeholder=""/>
              </div>
              <div className="userdept">
                <label className="form__label" for="userDept">ユーザー区分 </label>
                <select value={dept} onChange={handleChange}>
                    <option value="JMAdmin">JM Admin</option>
                    <option value="GIT">GIT</option>
                </select>
              </div>
              <div className="password">
                  <label className="form__label" for="password">新しいパスワード </label>
                  <input className="form__input" type="password"  id="password" placeholder=""/>
              </div>
              <div className="confirmpassword">
                  <label className="form__label" for="confirmPassword">再入力パスワード</label>
                  <input className="form__input" type="password" id="confirmPassword" placeholder=""/>
              </div>
          </div>
          <div class="footer">
              <button type="submit" class="btn">Register</button>
          </div>
      </div>      
    )       
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NewUserForm/>);
export default NewUserForm;

