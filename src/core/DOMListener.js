import { capitalize } from "./utils";

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DOMListener!`)
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if (!this[method]) {
                const name = this.name || '';
                throw new Error(`Method ${method} is not implemented in ${name} Component`)
            }
            //Абстракция над addEventListener
            this.$root.on(listener, this[method].bind(this));
        })
    }

    removeDOMListeners() {
        
    }
}

function getMethodName(name) {
    return 'on' + capitalize(name)
}