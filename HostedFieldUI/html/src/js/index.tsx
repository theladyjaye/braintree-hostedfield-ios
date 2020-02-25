import * as React from "react";
import * as ReactDOM from "react-dom";
import {HostedFieldService} from "./braintree/service";
import {HostedFieldForm} from "./braintree/form";

declare global {
    interface WebkitHandler{
        postMessage(value: any)
    }

    interface WebKit {
        messageHandlers: {
            sendToken: WebkitHandler
        }
    }

    interface Window {
        BRAINTREE_INIT_TOKEN: string
        webkit: WebKit
    }
}

class Props{}
class State{
    hostedFieldService?: HostedFieldService
    initializeError?: Error
}

class App extends React.Component<Props, State>
{
    constructor(props){
        super(props)
        this.state = {};
        this.initHostedFieldService();
    }

    componentDidMount(){}

    async initHostedFieldService(){
        try{
            let hostedFieldService = await HostedFieldService.create();
            this.setState(Object.assign({}, this.state, {hostedFieldService}));
        } catch(err){
            this.setState(Object.assign({}, this.state, {initializeError: err}));
        }
    }

    renderReady(){
        return (
            <div>
                <HostedFieldForm hostedFieldService={this.state.hostedFieldService!}/>
            </div>
            
        )
    }

    renderLoading(){
        return (
            <div>Getting things ready...</div>
        )
    }

    renderError(){
        const message = this.state.initializeError?.toString();
        return (
        <div>We had a problem, try again later: {message}</div>
        )
    }

    render(){
        // todo: consider dropping React Router in here instad of these
        // separate render functions.. Then again, it's just one more
        // dependency to load so maybe not, since this is pretty straight 
        // forward
        const hostedFieldService = this.state.hostedFieldService
        const hasInitializeError = this.state.initializeError
        
        if (hasInitializeError){
            return this.renderError()
        }

        return hostedFieldService ? this.renderReady() : this.renderLoading();
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("react")
);
