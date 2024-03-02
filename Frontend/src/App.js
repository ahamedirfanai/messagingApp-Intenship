import SideBar from "./components/Sidebar";
import "./App.css";
import Login from './components/Login';
import Chat from "./components/chat";
import React, { useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import axios from './components/axios'
import { useStateValue } from "./StateProvider";

function App() {
   const [messages, setMessages] =useState([])
   /* eslint-disable */

   const [{ user }, dispatch] = useStateValue()

/* eslint-enable */
   useEffect(()=>{
    axios.get("messages/sync").then(res=>{
      setMessages(res.data)
    })
   },[])

   useEffect(()=>{
    const pusher = new Pusher('4c5f2b31146bf666a163',{
      cluster: 'ap2'
    });


    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(data)=>{
       setMessages([...messages, data])
    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
   },[messages])

console.log(messages)

  return (
    <div className="App">
      { !user ? <Login /> : (
       <div className="app__body">
        <SideBar messages={messages}/>
        <Chat messages={messages}/>
       </div>
       )}
    </div>
  );
}

export default App;