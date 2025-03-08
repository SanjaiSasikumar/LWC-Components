import { LightningElement, track } from 'lwc';
import insertOpportunity from '@salesforce/apex/LWC_Controller.insertOpportunity';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Oppertunitydatalwc extends LightningElement {

    @track showpopup = false;
    opportunityName;
    amount;
    closeDate;
    nextStep;
    probability;
    stage;
    leadSource;
    private;
    description;
    parentId; // For Account Name
    campaignId;

    handleshowPopup() {
        this.showpopup = !this.showpopup;
    }
    

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    get options1()
    {
        return [
            { label: 'Phone Inquiry', value: 'Phone Inquiry' }, 
            { label: 'Partner Referral', value: 'Partner Referral' },
            { label: 'Purchased List', value: 'Purchased List' },
            { label: 'Other', value: 'Other' },
        ]; 
    }

    get options2()
    {
        return [
            { label: 'Prospecting', value: 'Prospecting' }, 
            { label: 'Qualification', value: 'Qualification' },
            { label: 'Needs Analysis', value: 'Needs Analysis' },
            { label: 'Value Proposition', value: 'Value Proposition' },
            { label: 'ld. Decision Makers', value: 'ld. Decision Makers' }, 
            { label: 'Perception Analysis', value: 'Perception Analysis' },
            { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
            { label: 'Negotiation/Review', value: 'Negotiation/Review' },
            { label: 'Closed Won', value: 'Closed Won' },
            { label: 'Closed Lost', value: 'Closed Lost' },

        ]; 
    }
    
    get options3()
    {
        return [
            { label: 'In progress', value: 'In progress' }, 
            { label: 'Yet to begin', value: 'Yet to begin' },
            { label: 'Completed', value: 'Completed' },
        ]; 
    }



    get checkrequired(){
        return this.opportunityName && this.Stage ? false :true;
    }

    handleshowPopup() {
        this.showpopup = !this.showpopup;
    }

    handleChange(event) {

        if (event.target.name === 'OpportunityName') {
            this.opportunityName = event.target.value;
        } else if (event.target.name === 'Amount') {
            this.amount = parseFloat(event.target.value); 
        } else if (event.target.name === 'CloseDate') {
            this.closeDate = event.target.value; 
        } else if (event.target.name === 'NextStep') {
            this.nextStep = event.target.value;
        } else if (event.target.name === 'Probability') {
            this.probability = parseFloat(event.target.value); 
        } else if (event.target.name === 'Stage') {
            this.stage = event.target.value;
        } else if (event.target.name === 'LeadSource') {
            this.leadSource = event.target.value;
        } else if (event.target.name === 'Private') {
            this.private = event.target.checked; 
        } else if (event.target.name === 'Description') {
            this.description = event.target.value; 
        } else if (event.target.name === 'parentId') {
            this.parentId = event.detail.recordId; 
        } else if (event.target.name === 'Campagin') {
            this.campaignId = event.detail.recordId; 
        }
    }

    handleSave() {
        insertOpportunity({
            oppName: this.opportunityName,
            oppAmount: this.amount,
            oppCloseDate: this.closeDate,
            oppNextStep: this.nextStep,
            oppProbability: this.probability,
            oppStage: this.stage,
            oppLeadSource: this.leadSource,
            oppPrivate: this.private,
            oppDescription: this.description,
            parentAccountId: this.parentId,
            campaignId: this.campaignId
        })
        .then(result => {
            this.showpopup = false;
            const evt = new ShowToastEvent({
                title: 'Opportunity Created Successfully',
                message: 'Opportunity Id: ' + result,
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }

}