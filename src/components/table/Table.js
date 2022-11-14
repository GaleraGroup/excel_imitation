import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onClick(event) {
    event.preventDefault()
  }

  onMousedown(event) {
    event.preventDefault()
    const resize = resizeHandler.bind(this)
    resize(event)
  }

  onMousemove(event) {
  }

  onMouseup() {
  }
}