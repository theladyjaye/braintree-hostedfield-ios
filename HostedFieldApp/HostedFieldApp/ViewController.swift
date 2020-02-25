//
//  ViewController.swift
//  HostedFieldApp
//
//  Created by Adam Venturella on 2/25/20.
//

import UIKit
import HostedFieldUI

class ViewController: UIViewController {

    var hostedFieldController: HostedFieldController!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Your sandbox tokenization key
        // from https://sandbox.braintreegateway.com/
        // - Click the gear in the upper right
        // - select API
        // - Locate the Tokenization Keys section
        // - Copy an existing valid value or click the  `+ Generate New Tokenization Key`
        //   button and use the resulting generated key. It will be in the format
        //   of "sandbox_xxxxxxxx_xxxxxxxxxxxxxxxx"
        //
        let token = "sandbox_xxxxxxxx_xxxxxxxxxxxxxxxx"
        
        hostedFieldController.loadUsing(token: token)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "hostedFieldEmbedSegue"{
            
            guard let hostedFieldController = segue.destination as? HostedFieldController else{
                return
            }
            
            self.hostedFieldController = hostedFieldController
        }
    }

}

