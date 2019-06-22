export const login = ({ user, token, refreshToken }) => {
    localStorage.setItem('USER', JSON.stringify(user))
    localStorage.setItem('access_token', token)
    localStorage.setItem('refresh_token', refreshToken)
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
    localStorage.removeItem('USER')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }