class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector) //если selector строка, то происходит поиск по нему в дом структуре и присвоение в $el
        : selector  //если selector DOM node, то сразу присваивается в $el
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this; //нужен для выполнения чейнинга 
        }
        return this.$el.outerHTML.trim()
    }

    on(eventType, callback) { //тип события(click, input)/ функция которая выполняется
        this.$el.addEventListener(eventType, callback)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node)
        }

        return this.$el; 
    }

    clear() {
        this.html('');
        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

//метод, которы является абстрактной оберткой для создания новых DOM узлов с указанным тэгом и классом
$.create = (tagName, classes = '') => {  
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }

    return $(el);  //Оборачивается в функцию $, чтобы создаваемый в .create элемент имел доступ к методам класса Dom
}