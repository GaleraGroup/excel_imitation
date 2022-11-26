import { ExcelComponent } from '@core/ExcelComponent'
import {$} from '../../core/dom'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { selectHandler } from './table.select'
import { TableSelection } from './TableSelection'
import { isCell } from './table.functions'



export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', ]
      //listeners: ['mousedown', 'mousemove' 'mouseup']
    })
  }

  toHTML() {
    return createTable(200)
  }

  prepare() {
    this.selection = new TableSelection()
  }


  init() {
    super.init() //вызов родительского метода Init из ExcelComponent
    
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onClick(event) {
    event.preventDefault()
  }

  onMousedown(event) {
    event.preventDefault()
    const $target = $(event.target)

    //функционал ресайза
    const resize = resizeHandler.bind(this)
    resize(event)
    
    //функционал выделения ячеек
    if (isCell(event)) {
      this.selection.select($target)

      const startOffsetX = event.offsetX
      const startOffsetY = event.offsetY
       
      const selectRange = selectHandler.bind(this)
      selectRange($target, startOffsetX, startOffsetY)
    }
  }

  onMousemove(event) {
    
  }

  onMouseup() {
  }
}