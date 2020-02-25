
export function sendToken(value: string){
    if(!window.webkit) {
        console.log(value); 
        return;
    }
    
    window.webkit.messageHandlers.sendToken.postMessage(value)
}