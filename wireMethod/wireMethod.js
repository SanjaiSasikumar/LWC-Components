import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/LWC_Controller.getAccount';

export default class WireMethod extends LightningElement {
    @wire(getAccount)
    accountList;
}