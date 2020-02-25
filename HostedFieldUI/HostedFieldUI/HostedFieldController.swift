//
//  BraintreeHostedFieldsControllerViewController.swift
//  BraintreeHostedFields
//
//  Created by Adam Venturella on 2/21/20.
//  Copyright © 2020 Adam Venturella. All rights reserved.
//

import UIKit
import WebKit

public class HostedFieldController: UIViewController, WKUIDelegate, WKScriptMessageHandler {
    
    var webView: WKWebView!
    
    override public func loadView() {
        
        let preferences = WKPreferences()
        
        // The default is true, but it's always
        // nice to make thinks explicit for ourselves later.
        preferences.javaScriptEnabled = true
        
        let configuration = WKWebViewConfiguration()
        let contentController = WKUserContentController()
        configuration.preferences = preferences
        configuration.userContentController = contentController
        
        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.uiDelegate = self
        registerPostbacks(webView)
        
        view = webView
    }
    
    override public func viewDidLoad() {
        super.viewDidLoad()
    }
    
    
    public func loadUsing(token: String){
        let script =    """
        var BRAINTREE_INIT_TOKEN = "\(token)";
        """
        let userScript = WKUserScript(source: script, injectionTime: .atDocumentStart, forMainFrameOnly: true)

        webView.configuration.userContentController.addUserScript(userScript)
        
        let bundle = Bundle(for: HostedFieldController.self)
        
        if let url = bundle.url(forResource: "index", withExtension: "html", subdirectory: "dist") {
            let request = URLRequest(url: url);
            webView.load(request)
        }
    }
    
    func registerPostbacks(_ webView: WKWebView){
        webView.configuration.userContentController.add(
            self, name: HostedFieldPostback.sendToken.rawValue
        )
    }
    
    public func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == HostedFieldPostback.sendToken.rawValue{
            guard let value = message.body as? String else {
                return
            }
            
            received(token: value)
        }
    }
    
    public func received(token: String){
        print("GOT THE TOKEN: \(token)")
    }
}
