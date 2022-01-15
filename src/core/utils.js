//Pure functions - не взаимодействуют с глобальными переменными, реагируют только на входящие параметры и возвращают результа (изолированы от основного кода)
export function capitalize(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}