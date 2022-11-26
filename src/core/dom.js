// Класс содержащий методы-абстракции над нативными Js методами для работы с DOM объектами.
// Реализована обертка элемента. Элемент становится инстансом класса Dom, с доступом ко всем его методам.

export class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    addClass(className) {
        this.$el.classList.add(className)
    }

    removeClass(classNames) {
        const [...rest] = classNames
        rest
            .forEach(name => this.$el.classList.remove(name))
    }

    //returned parent element by selector
    closest(selector) {
        return $(this.$el.closest(selector))
    }

    //returned coodrs for dom-element
    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    //getter
    get data() {
        return this.$el.dataset
    }


    id(parse) {
        if (parse) {
            // const [row, col] = this.data.id
            // return({'row': row, 'col': col})

        }
        return this.data.id
    }


    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => this.$el.style[key] = styles[key])
    }

}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }

    return $(el)
}