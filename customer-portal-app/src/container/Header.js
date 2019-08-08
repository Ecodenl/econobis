import React from 'react'
import { AuthConsumer } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const headerStyle = {
    display: 'flex',
    backgroundColor: '#26c6da',
    justifyContent: 'space-between',
    padding: 10
}

const linkStyle = {
    color: 'white',
    textDecoration: 'underline'
}

export default () => (
    <header>
        <AuthConsumer>
            {({ isAuth, login, logout }) => {
                return (
                <div style={headerStyle}>
                    <h3>
                        <Link style={linkStyle} to="/">
                            HOME
                        </Link>
                    </h3>

                    {isAuth ? (
                        <ul>
                            <Link style={linkStyle} to="/dashboard">
                                Dashboard
                            </Link>
                            <button onClick={logout}>logout</button>
                        </ul>
                    ) : (
                        <button onClick={login}>login</button>
                    )}
                </div>
            )}}
        </AuthConsumer>
    </header>
)
