import { $ } from '../../core/dom'
import { matrix } from './table.functions'

export function selectHandler($el, startOffsetX, startOffsetY) {

    const IdStringSet = new Set() //сэт для автоматического удаления одинковых строк id массивов
    IdStringSet.add($el.data.id)

    document.onmousemove = event => {
        //при ведении мыши, если смещение курсора относительно текущего элемента по оси X < чем самое первое зафиксированное смещение
        if (event.offsetX < startOffsetX || event.offsetY < startOffsetY) {
            const $moveTarget = $(event.target) //таргет при перемещении курсора
            this.selection.selectInMove($moveTarget) //визуальное выделение мув таргета
            IdStringSet.add($moveTarget.id()) //сэт с id ячеек по которым был проведен курсор
            
            const res = matrix(IdStringSet)
                .map(id => this.$root.find(`[data-id="${id.row}:${id.col}"]`))

            this.selection.selectGroup(res)
        }

        document.onmouseup = () => {
            document.onmousemove = null
        }
    }
}