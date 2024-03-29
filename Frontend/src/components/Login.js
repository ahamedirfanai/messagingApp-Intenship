import React from 'react'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'
import { actionTypes} from '../Reducer'
import { useStateValue } from '../StateProvider'

import './Login.css'

const Login =()=>{
    /* eslint-disable */
    const [{}, dispatch]= useStateValue()

    /* eslint-enable */
    const signIn =()=>{
       auth.signInWithPopup(provider)
       .then(result =>{
        
        dispatch({
            type: actionTypes.SET_USER,
            user: result.user
        })

       }) 
       .catch(error => alert(error.message))
    }
    return (
        <div className='login'>
            <div className='login__container'>
                <img src ="logo512.png" alt="whatsapp" />
                <div className='login__text'>
                    <h1>Sign in to Messaging App</h1>
                </div>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}
export default Login

