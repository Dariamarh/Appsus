const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mister-Mail</NavLink>
            <NavLink to="/note">Miss-Keep</NavLink>
            <NavLink to="/book">Miss-Book</NavLink>
        </nav>
    </header>
}
