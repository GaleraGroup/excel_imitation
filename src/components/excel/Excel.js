import {$} from '@core/Dom'; //импорт класса для работы с DOM элементами

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector); // element назван через $, потому что содержимое является DOM элементом, для наглядности
        this.components = options.components || [];  
    }

    getRoot() {
        const $root = $.create('div', 'excel'); //создание вложенного в корневой #app diva с классом 

        //Здесь создаются уже непосредственно инстансы передаваемых классов компонентов
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.html(component.toHTML());  
            $root.append($el);
            return component; 
        })

        return $root;
    }

    render() {
        //Здесь в корень всего приложения контейнер с тегом #app добавляется результат выполнения getRoot()
        this.$el.append(this.getRoot());
        this.components.forEach(component => component.init());
        //this.components.forEach(component => component.remove());
    }
}
