export const login = ({ user, token, refreshToken }) => {
  localStorage.setItem('USER', JSON.stringify(user))
  localStorage.setItem('access_token', token)
  localStorage.setItem('refresh_token', refreshToken)
}

export const getUser = () => {
  const user = localStorage.getItem('USER')
  try {
    return JSON.parse(user)
  } catch (error) {
    return null
  }
}

export const getAToken = () => {
  const access_token = localStorage.getItem('access_token')
  try {
    return access_token
  } catch (error) {
    return null
  }
}

export const getRToken = () => {
  const refresh_token = localStorage.getItem('refresh_token')
  try {
    return refresh_token
  } catch (error) {
    return null
  }
}

export const logout = () => {
  localStorage.removeItem('USER')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
