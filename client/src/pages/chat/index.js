import React,{useState, useEffect} from 'react';
import Form from '../../components/form';
import FormInput from '../../components/formInput';
import axios from 'axios'
export default function Chat(){
  const [menuVisible, setMenuVisibility] = useState(false);
  const [theme, setTheme ] = useState({
    chatColor: '#FFFFFF',
    bgColor1: '#DDEEED',
    bgColor2: '#FDF1E0'
  })
  
  useEffect(()=>{
    const savedTheme = window.localStorage.getItem('theme');
    console.log(savedTheme)
    if(savedTheme){
      setTheme(JSON.parse(savedTheme));
    } else {
      (async ()=>{
        try {
          // const url = new URL(`${window.location.origin}/api/user`)
          const url = new URL(`http://localhost:5000/api/user/theme`)
          const response = await axios(url.href,{withCredentials: true});

          if(response.status === 200){
            let {theme } = response.data;
            setTheme({
              chatColor: theme[0],
              bgColor1: theme[1],
              bgColor2: theme[2]
            });
          }
        } catch (e){
          console.log(e);
        }
      })()
    }
  },[])
  
  function formChange(event){
    setTheme({
      ...theme,
      [event.target.name]: event.target.value
    })
    window.localStorage.setItem('theme',JSON.stringify(theme));
  }

  function toggleVisibility(){
    setMenuVisibility(!menuVisible);
    (async ()=>{
      try {
        // const url = new URL(`${window.location.origin}/api/user`)
        const url = new URL(`http://localhost:5000/api/user`)
        const response = await axios.patch(url.href, {
          theme
        },
        {
          withCredentials: true
        })
        console.log(response);
      } catch (e){
        console.log(e);
      }
    })()
  }
  if(!theme){
    return (<h1>Loading</h1>)
  }
  return (
    <div className="chat" style={{backgroundImage: `linear-gradient(239.26deg, ${theme.bgColor1} 63.17%, ${theme.bgColor2} 94.92%)`}}>
      <header className="chat__header">
        <div className="chat__setting">
          <button className="btn btn__round chat__setting__button" onClick={toggleVisibility}>
            <svg width="17" height="17" viewBox="0 0 17 17" className="setting__icon" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M14.9946 9.333C15.0296 9.061 15.0558 8.789 15.0558 8.5C15.0558 8.211 15.0296 7.939 14.9946 7.667L16.8384 6.2645C17.0044 6.137 17.0481 5.9075 16.9433 5.7205L15.1956 2.7795C15.1169 2.6435 14.9684 2.567 14.8111 2.567C14.7587 2.567 14.7062 2.5755 14.6625 2.5925L12.4867 3.4425C12.0323 3.1025 11.5429 2.822 11.0099 2.6095L10.6778 0.357C10.6516 0.153 10.4681 0 10.2496 0H6.75424C6.53578 0 6.35227 0.153 6.32606 0.357L5.99399 2.6095C5.46095 2.822 4.9716 3.111 4.5172 3.4425L2.34132 2.5925C2.28889 2.5755 2.23646 2.567 2.18403 2.567C2.03548 2.567 1.88692 2.6435 1.80828 2.7795L0.0605851 5.7205C-0.0530148 5.9075 -0.000583993 6.137 0.165447 6.2645L2.00926 7.667C1.97431 7.939 1.94809 8.2195 1.94809 8.5C1.94809 8.7805 1.97431 9.061 2.00926 9.333L0.165447 10.7355C-0.000583993 10.863 -0.0442764 11.0925 0.0605851 11.2795L1.80828 14.2205C1.88692 14.3565 2.03548 14.433 2.19277 14.433C2.2452 14.433 2.29763 14.4245 2.34132 14.4075L4.5172 13.5575C4.9716 13.8975 5.46095 14.178 5.99399 14.3905L6.32606 16.643C6.35227 16.847 6.53578 17 6.75424 17H10.2496C10.4681 17 10.6516 16.847 10.6778 16.643L11.0099 14.3905C11.5429 14.178 12.0323 13.889 12.4867 13.5575L14.6625 14.4075C14.715 14.4245 14.7674 14.433 14.8198 14.433C14.9684 14.433 15.1169 14.3565 15.1956 14.2205L16.9433 11.2795C17.0481 11.0925 17.0044 10.863 16.8384 10.7355L14.9946 9.333ZM13.2644 7.8795C13.2993 8.143 13.3081 8.3215 13.3081 8.5C13.3081 8.6785 13.2906 8.8655 13.2644 9.1205L13.142 10.081L13.9198 10.676L14.8635 11.39L14.2518 12.4185L13.142 11.985L12.2332 11.628L11.4468 12.206C11.071 12.478 10.7128 12.682 10.3545 12.8265L9.42821 13.192L9.28839 14.1525L9.11362 15.3H7.89024L7.72421 14.1525L7.58439 13.192L6.65812 12.8265C6.28236 12.6735 5.93282 12.478 5.58329 12.223L4.78809 11.628L3.86181 11.9935L2.75203 12.427L2.14034 11.3985L3.08409 10.6845L3.86181 10.0895L3.73947 9.129C3.71326 8.8655 3.69578 8.67 3.69578 8.5C3.69578 8.33 3.71326 8.1345 3.73947 7.8795L3.86181 6.919L3.08409 6.324L2.14034 5.61L2.75203 4.5815L3.86181 5.015L4.77061 5.372L5.55707 4.794C5.93283 4.522 6.2911 4.318 6.64938 4.1735L7.57565 3.808L7.71547 2.8475L7.89024 1.7H9.10488L9.27091 2.8475L9.41073 3.808L10.337 4.1735C10.7128 4.3265 11.0623 4.522 11.4118 4.777L12.207 5.372L13.1333 5.0065L14.2431 4.573L14.8548 5.6015L13.9198 6.324L13.142 6.919L13.2644 7.8795ZM8.50193 5.1C6.57073 5.1 5.00655 6.6215 5.00655 8.5C5.00655 10.3785 6.57073 11.9 8.50193 11.9C10.4331 11.9 11.9973 10.3785 11.9973 8.5C11.9973 6.6215 10.4331 5.1 8.50193 5.1ZM8.50193 10.2C7.5407 10.2 6.75424 9.435 6.75424 8.5C6.75424 7.565 7.5407 6.8 8.50193 6.8C9.46316 6.8 10.2496 7.565 10.2496 8.5C10.2496 9.435 9.46316 10.2 8.50193 10.2Z"></path></svg>
          </button>
          <div className="chat__setting__menu" style={{opacity: menuVisible ? 1:0}}>
            <Form className="preferences" formChange={formChange}>
              <FormInput label="Chat Color" name="chatColor" className="preferences__item" type="color" value={theme.chatColor}/>
              <FormInput label="Background Color 1" name="bgColor1" className="preferences__item" type="color" value={theme.bgColor1}/>
              <FormInput label="Background Color 2" name="bgColor2" className="preferences__item" type="color" value={theme.bgColor2}/>
            </Form>
          </div>
        </div>
      </header>
      <main className="chat__area">
       <div className="chat__messages">
        <div className="message" style={{backgroundColor: theme.chatColor}}>
          <p className="message__text">Hi there👋🏼</p>
        </div>
        <div className="message"  style={{backgroundColor: theme.chatColor}}>
          <p className="message__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.😄</p>
        </div>
        <div className="message"  style={{backgroundColor: theme.chatColor}}>
          <p className="message__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, mollitia doloribus deleniti autem nesciunt reprehenderit facere error perferendis tenetur ducimus provident pariatur! Omnis, officia deserunt. Quae excepturi voluptatum officiis ad!</p>
        </div>
       </div>
      </main>
    </div>
  )
}