import React,{useState} from 'react';
import Form from '../../components/form';
import FormInput from '../../components/formInput';
import axios from 'axios';
import {Navigate} from 'react-router-dom'

export default function Login({setUser}){
  const [authMessage, setAuthMessage] = useState('');
  const [navigateTo, setNavigation] = useState('');

  const [formType, setFormType ] = useState('login')
  function validate(username) {
    return username.length < 3 || username.length > 12 ? 'username length must be between 3, 12': '';
  }

  const passwordValidator = {
    regExp: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/,
    message: 'must contain alphanumeric character, length between 8, 12'
  }

  function confirmPassword(password){
    const actualPassword = document.querySelector('input[name=password]').value;
    if(password !== actualPassword){
      return "password doesn't match"
    }
  }
  
  function toggleForm(){
    setFormType(formType ==='login'? 'signup' : 'login')
  }

  async function handleSubmit(form){
    try {
      // const url = new URL(`${window.location.origin}/api/auth/${formType}`)
      const url = new URL(`http://localhost:5000/api/auth/${formType}`)
      const response = await axios.post(url.href, {
        ...form
      },
      {
        withCredentials: true
      })
      console.log(response);
      if(response.status === 200 && formType == 'signup'){
        setAuthMessage('Signed Up, Now login')
        return setTimeout(()=> {
          setFormType('login')
          setAuthMessage('')
        }, 2000);
        
      }
      window.localStorage.setItem('user', JSON.stringify(response.data.user))
      setUser(response.data.user);
      setNavigation('/chat');
    } catch (e){
      console.log(e);
      let {error } = e.response?.data;
      setAuthMessage(error)
    }
  }
  // function 
  return (
    <div className="login">
      {navigateTo ? <Navigate to={navigateTo}/> : null}
      <div className="login__form">
        {formType === 'login' ? 
          <h1 className="login__heading">Login</h1>
            :
          <h1 className="login__heading">Sign Up</h1>
        }
        {<span className="auth__message">{ authMessage }</span>}
        <Form className="form" submit={handleSubmit}>
          <FormInput label="User Name" name="username" validator={validate} className="form__group"/>
          <FormInput label="Password" name="password" validator={passwordValidator} type="password" className="form__group"/>

          {formType !== 'login' ?
            <FormInput 
                label="Confirm Password" 
                name="confirmPassword" 
                validator={confirmPassword} 
                type="password" 
                className="form__group"
                validateOnChange={true}
              /> 
            : null
          } 
          
          <button className="btn btn__submit form__submit">Submit</button>
        </Form> 
        <div className="login__option">
          <a href="#" className="login__signup" onClick={toggleForm}>
            {formType === 'login'? 'signup instead': 'already member? login'}
          </a>
        </div>
      </div>
    </div>
  
  )
}