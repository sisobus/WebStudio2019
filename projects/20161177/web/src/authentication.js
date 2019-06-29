import { io } from './_components/ChatServer';
import {history} from './_components/History';

export const login = ({ user, token, refreshToken }) => {
    localStorage.setItem('USER', JSON.stringify(user))
    localStorage.setItem('access_token', token)
    localStorage.setItem('refresh_token', refreshToken)
    io.emit('login_list')
    console.log("login successfully")
  }
  
  export const getUser = () => {
    const user = localStorage.getItem('USER')
    try {
      return JSON.parse(user)
    } catch (e) {
      return null
    }
  }
  
  export const logout = () => {
    const user = getUser()
    io.emit('user_logout', user)
    localStorage.removeItem('USER')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('new message')
    localStorage.removeItem('saved messages')
    history.push('/')
    console.log("logout successfully")
  }