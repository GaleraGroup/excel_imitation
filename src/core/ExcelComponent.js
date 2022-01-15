import { DOMListener } from '@core/DOMListener';

//Наследование ExcelComponent от DOMListener
export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners),
        this.name = options.name || ''
    }

    //Возвращает шаблон компонента 
    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners(); //приходит из DOMlistener через наследование
    }

    remove() {
        this.removeDOMListeners();
    }
}