import * as React from "react";

class Props{
    id!: string
    className?: string 
}

class State{}


export class Field extends React.Component<Props, State>{
    constructor(props){
        super(props)
    }
    
    get className() {
        const list = ['braintree-hosted-field'];
        if (this.props.className) { list.push(this.props.className); }
        return list.join(' ');
    }

    render() {
        return <div id={this.props.id} className={this.className} />;
    }
}