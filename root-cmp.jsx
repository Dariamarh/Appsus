import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import{MailSent} from "./apps/mail/views/mail-sent.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { BookIndex } from "./apps/book/views/book-index.jsx"
import { BookDetails } from "./apps/book/views/book-details.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <Switch>
                <Route path="/mail/sent" component={MailSent}/>
                <Route path="/mail" component={MailIndex} />
                <Route path="/mail/:folder?" component={MailIndex} />
                <Route path="/note" component={NoteIndex} />
                <Route path="/book/:bookId" component={BookDetails}></Route>
                <Route path="/book" component={BookIndex} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
