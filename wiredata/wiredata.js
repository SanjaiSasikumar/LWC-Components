import { LightningElement, wire } from 'lwc';
import getAccountContactOpportunity from '@salesforce/apex/LWC_Controller_wire_withparameter.getAccountContactOpportunity';

export default class Wiredata extends LightningElement {
    value;
    accounts;
    contacts;
    opportunities;

    // Handler to update the value when user types in the input
    changeHandler(ev) {
        this.value = ev.target.value;
    }

    // Wire method to fetch Accounts, Contacts, and Opportunities from Apex
    @wire(getAccountContactOpportunity, { searchName: '$value' })
    result({ data }) {
        if (data) {
            this.accounts = data.accounts;
            this.contacts = data.contacts;
            this.opportunities = data.opportunities;
        } else {
            // Reset the values if no data is available
            this.accounts = [];
            this.contacts = [];
            this.opportunities = [];
        }
    }
}