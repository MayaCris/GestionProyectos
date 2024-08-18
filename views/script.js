import { ControllerUser } from '../controller/controllerUser.js';

export class dashboardView {
    constructor(){
        this.controllerUser = new ControllerUser();
        this.bindEvents();
    }
    
    bindEvents(){
        window.addEventListener('load', () => this.controllerUser.checkAuthentication());
        window.addEventListener('hashchange', () => this.controllerUser.checkAuthentication());
    }
}

$(document).ready(() => new dashboardView());