import { eventBusService } from "../services/event-bus.service.js"
const { Link } = ReactRouterDOM

export class UserMsg extends React.Component {
    unsubscribe
    state = {
        msg: null
    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('show-user-msg',
            (msg) => {
                this.setState({ msg })
                setTimeout(this.closeMsg, 3000)
                console.log('msg', msg)
            })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    closeMsg = () => {
        this.setState({ msg: null })
    }

    render() {
        const { msg } = this.state

        if (!msg) return <span></span>
        return <section className={'user-msg ' + msg.type}>
            <Link to={"/book/" + msg.id}
            >Book details</Link>
            {msg.txt}
        </section>

    }
}