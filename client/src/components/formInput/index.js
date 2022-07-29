import {useState } from 'react';

function FormInput(props) {
  const {
    label, 
    type = 'text', 
    name,
    className,
    validator,
    validateOnChange,
    value
  } = props;
  const [focused, setFocused] = useState(false);
  const [error, setError ] = useState('');
  let handleBlur; // Do validation on Blur
  let handleFocus;
  if(Object.prototype.toString.call(validator) === '[object Function]'){
    handleBlur = function (e){
      const err = validator(e.target.value);
      if(err){
        setError(err)
        setFocused(true);
        return;
      }
      
      setFocused(false);
      setError('');
    }

    handleFocus = handleBlur;
  }

  if(Object.prototype.toString.call(validator) === '[object Object]'){
    handleBlur = function(e){
      const {regExp, message} = validator;

      if(!regExp.test(e.target.value)){
        setFocused(true);
        setError(message)
        return;
      }

      setFocused(false);
      setError('');
    }
  }

  const inputProps = {
    type,
    name,
    onBlur: handleBlur,
    focused: focused.toString(),
    onChange:  validateOnChange ? handleBlur : ()=>{},
    ...(value !== undefined && {value})
  }

  return (
    <div className={className}>
      <label>{label}</label>
      <div>
        <input {...inputProps}/>

      </div>
      <span className="form__input__error">{error}</span>
    </div>
  ) 
}

export default FormInput;