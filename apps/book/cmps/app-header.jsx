const { NavLink, withRouter } = ReactRouterDOM
import { UserMsg } from '../cmps/user-msg.jsx'

export function AppHeader() {
    return <header className="full main-layout">
        <div className="main-header-container">

            <h1 className="main-header">
                Miss Book📚
            </h1>

            <nav className="main-nav-bar">
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book"  activeClassName="my-active">Books</NavLink>
            </nav>
        </div>
        <UserMsg />
    </header>
}