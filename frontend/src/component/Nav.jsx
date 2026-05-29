import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Usercontext } from '../userContext'
import { isLoggedIn } from './ProtectedRoute'

export default function Nav() {
    const [userdata, setUserdata] = useContext(Usercontext)
    const navigate = useNavigate()
    const authed = isLoggedIn(userdata)

    const logout = () => {
        setUserdata('')
        navigate('/signin')
    }

    const lockHint = !authed ? 'Sign in to view this page' : undefined
    const protectedClass = !authed ? 'nav-link nav-link-protected-guest' : 'nav-link'

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={protectedClass} to="/" title={lockHint}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="signin">signin</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={protectedClass} to="profile" title={lockHint}>profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={protectedClass} to="imageupload" title={lockHint}>imageupload</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={protectedClass} to="view" title={lockHint}>view</Link>
                            </li>
                            {authed && (
                                <li className="nav-item">
                                    <button type="button" className="nav-link btn btn-link border-0 p-0 ms-lg-2 text-start" onClick={logout}>
                                        Log out
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
