import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert } from '@material-ui/icons'
import { SearchOutlined, InsertEmoticon } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import './Chat.css'
import { useStateValue } from '../StateProvider'
import axios from './axios'


const Chat =({messages})=>{
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
     /* eslint-disable */
    

    const [{user}, dispatch] = useStateValue()
         /* eslint-enable */
   
    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/messages/new', {
                message: input,
                name: user.displayName,
                timestamp: new Date().toUTCString(),
                received: true
            });
            setInput(""); 
        } catch (error) {
            console.error("Error sending message:", error);
           
        }
    };

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))

    },[])

    return(
      <div className='chat'>
         <div className='chat__header'>
           <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
               <div className="chat__headerInfo">
                  <h3>Dev Help</h3>
                  <p>Last seen at{" "}{messages[messages.length -1]?.timestamp}
                  </p>
               </div>

               <div className='chat__headerRight'>
                <IconButton>
                < SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
               </div>
               
         </div>  
         <div className='chat__body'>
         {messages.map((message, index) => (
    <p key={index} className={`chat__message ${message.received && 'chat__receiver'}`}>
        <span className="chat__name">{message.name}</span>
        {message.message}
        <span className="chat__timestamp">{message.timestamp}</span>
    </p>
))}



           
                    
               
         </div>
                <div className='chat__footer'>
                   <InsertEmoticon />
                   <form>
                       <input value={input}
                       onChange={e => setInput(e.target.value)}
                       placeholder='Type a message'
                       type="text"
                       
                        />
                        <button onClick={sendMessage} type="submit">Send a message</button>
                   </form>
                    <MicIcon />
                </div>
      </div>
    )
}

export default Chat