import client from 'braintree-web/client'

let _clientInstance: any;

export class HostedFieldService{
    private _client: any
    
    private constructor({client}: {client: any}){
        this._client = client;
    }

    get client(): any {
        return this._client;
    }

    public static create(): Promise<HostedFieldService>{
        return new Promise<HostedFieldService>((resolve, reject) => {
            if (!_clientInstance) {
                 HostedFieldService.initializeClient()
                .catch(reject)
                .then(() => resolve(new HostedFieldService({client: _clientInstance})))
            } else {
                return resolve(new HostedFieldService({client: _clientInstance}))
            }
        })
    }

    private static initializeClient(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            client.create({
                authorization: window.BRAINTREE_INIT_TOKEN
            }, (err, clientInstance) => {
                if(err){ reject(err) }
                _clientInstance = clientInstance
                resolve();
            });
        })
    }
}