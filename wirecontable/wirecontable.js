import { LightningElement, wire } from 'lwc';
import getContact from '@salesforce/apex/LWC_Controller.getContact';

export default class WireMethod extends LightningElement {
    @wire(getContact) 
    conList;
}