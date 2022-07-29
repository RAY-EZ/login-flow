import React,{ useState, useContext, createContext} from 'react';

export default function Form(props){
  const { children, submit = ()=>{} , className, formChange = ()=>{}} = props;

  async function handleSubmit(event){
    event.persist();
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = Object.fromEntries(formData.entries());
    console.log(form);
    await submit(form);
  }

  function handleChange(event){
    event.persist();
    event.preventDefault();
    formChange(event)
  }

  return (
    <form onSubmit={handleSubmit} className={className} onChange={handleChange}>
        {children}
    </form>
  )
}