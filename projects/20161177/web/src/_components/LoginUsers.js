import React from 'react'
import { io } from './ChatServer'

class LoginUsers extends React.Component {
    state = {
        users : [
            {
                id : null,
                email : null,
                password : null,
                nickname : null,
                login : null                                
            }
        ]
    }

    callLoginUsers() {
        var {users} = this.state
        io.on('login_users', (data) => {
            if (users.id != null) {
                this.setState({
                    users : users.concat(data)
                })
            } else {
                this.setState({
                    users : data
                })
            }
        })
    }
    
    componentDidMount() {
        this.callLoginUsers()
    }

    render() {
        
        const { users } = this.state
  
        if (users !== null) {
            return(
                <div>
                    {users.map((data, i) => {
                        return(
                            <li key = {i}> {data.nickname} </li>
                        )
                    })}
                </div>
            );
        } else {
        
            return(
                <div>
                    No User
                </div>
            )
        }
    }
}

export {LoginUsers}

