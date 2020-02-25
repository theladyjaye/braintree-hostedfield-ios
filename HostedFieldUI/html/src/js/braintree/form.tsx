import * as React from "react";
import * as hostedFields from 'braintree-web/hosted-fields';
import {HostedFieldService} from './service';
import {Field} from './field';
import * as webkit from '../webkit'

class Props{
    hostedFieldService!: HostedFieldService
}

class State{
    hostedFields?: any
}


export class HostedFieldForm extends React.Component<Props, State>{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        this.prepareHostedFields()
    }

    async prepareHostedFields(){
        const client = this.props.hostedFieldService.client;
        try{
            let result = await hostedFields.create({
                client,
                styles: {
                    input: {
                        'font-size': '14px',
                        'font-family': 'helvetica, tahoma, calibri, sans-serif',
                        color: '#7d6b6b',
                        
                    },
                    
                    ':focus': {
                        color: 'black'
                    },

                    'input.invalid': {
                        'color': 'red'
                    },
                    'input.valid': {
                        'color': 'green'
                    }
                },
                fields: {
                    number: {
                        selector: '#card-number',
                        placeholder: '4111 1111 1111 1111'
                    },
                    cvv: {
                        selector: '#cvv',
                        placeholder: '123'
                    },
                    expirationDate: {
                        selector: '#expiration-date',
                        placeholder: '10/2019'
                    }
                }
            });
            // see: https://braintree.github.io/braintree-web/3.57.0/HostedFields.html#on
            // for grabbing events from the registered fields
            // result.on('focus', function (event) {
            //     console.log(event.emittedBy, 'gained focus');
            // });
            this.setState(Object.assign({}, this.state, {hostedFields: result}));
        } catch(e){
            console.log("ERROR: " + e)
        }
    }

    onSubmit = () => {
        this.tokenize();
    }

    tokenize() {
        // webkit.sendToken("TESTING")
        // https://braintree.github.io/braintree-web/3.57.0/HostedFields.html#tokenize
        console.log(this.props.hostedFieldService.client.getVersion())
        try{
            this.state.hostedFields?.tokenize()
            .then((payload) => {
                console.log(payload);
            })
            .catch((e) => {
                console.log("ERROR", e)
            })
            // this.state.hostedFields?.tokenize((tokenizeErr, payload) => {  
            //     if(tokenizeErr){
            //         webkit.sendToken("GOT ERROR")
            //         webkit.sendToken(tokenizeErr.code)
            //         webkit.sendToken(tokenizeErr.toString())
                    
            //     }
            //     webkit.sendToken(payload.nonce)
            //     console.log(payload.nonce)
            // })
        } catch(e){
            webkit.sendToken("ERROR" + e)
        }
    }

    render(){
        return (
        <div>
            <div>
                <div>Credit Card</div>
                <Field id="card-number" />
                <div>CVV</div>
                <Field id="cvv" />
                <div>Expiration Date</div>
                <Field id="expiration-date" />
            </div>
            <div>
                <input type="submit" onClick={this.onSubmit} />
            </div>
        </div>
        )
        
    }
}