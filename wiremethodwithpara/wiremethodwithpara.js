import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/LWC_Controller_wire_withparameter.getAccount';

export default class Wiremethodwithpara extends LightningElement {
    value; // Variable to hold the account name input value.

    changeHandler(ev) {
        this.value = ev.target.value; // Update 'value' when the input field changes.
    }

    @wire(getAccount, { accName: '$value' })
    accountList;
}