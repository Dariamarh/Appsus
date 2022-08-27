const { Link, NavLink, withRouter } = ReactRouterDOM



export function Home() {

    return <section className="home">
        <h1 className="home-title">APPSUS</h1>
        <h2>
            <span>Take  </span>
            <span>Your</span>
            <span>Productivity</span>
            <span>To </span>
            <span>The</span>
            <span>Highest</span>
            <span>Level</span>
        </h2>
        <div className="homepage-menu">
            <NavLink to="/mail">
                <img className="logo-mail" src="assets/img/logo-mail.png" />
            </NavLink>
            <NavLink to="/note">
                <img className="logo-keep" src="assets/img/logo-keep.png" />
            </NavLink>
            <NavLink to="/book">
                <img className="logo-book" src="assets/img/logo-book.png" />
            </NavLink>
        </div>
    </section>
}