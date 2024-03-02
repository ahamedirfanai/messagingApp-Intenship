import React from 'react'
import './Slidebar.css'
import { SearchOutlined } from '@material-ui/icons'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Avatar, IconButton } from '@material-ui/core'
import SidebarChat from './SidebarChat'
import { useStateValue } from '../StateProvider'

const Sidebar = ({messages}) => {
    /* eslint-disable */
    const [{user}, dispatch]=useStateValue()
    /* eslint-enable */
    return (
        <div className='sidebar'>
             <div className='sidebar__header'>
             <Avatar alt="Remy Sharp" src={user?.photoURL}/>

           <div className="sidebar__headerRight">
               <IconButton>
                <DonutLargeIcon />
               </IconButton>

               <IconButton>
                <ChatIcon />
               </IconButton>

               <IconButton>
                <MoreVertIcon />
               </IconButton>
                </div>
             </div>

            <div className='sidebar__search'>

                <div className='sidebar__searchContainer'>
                  <SearchOutlined />
                  <input placeholder="search or start new chat" type="text" />
                </div>

            </div>
           <div className='sidebar__chats'>
            <SidebarChat messages={messages}/>
            </div>
        </div>
    )
}
export default Sidebar