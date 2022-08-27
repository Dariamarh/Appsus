const { Link, NavLink, withRouter } = ReactRouterDOM
import { UserMsg } from "../apps/book/cmps/user-msg.jsx"
export function AppHeader() {

    return <header className="app-header main-layout">
        <Link to="/"
            className="logo-container flex">

            <img src="assets/img/logo.svg"
                // height="60px" width="105px"
                className="img-logo" />
            <h3 className="text-logo-container">
                <span className="text-logo">Appsus</span></h3>
        </Link>
        <nav className="app-menu flex">
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mister-Mail</NavLink>
            <NavLink to="/note">Miss-Keep</NavLink>
            <NavLink to="/book">Miss-Book</NavLink>
        </nav>
        <UserMsg />
    </header>
}
