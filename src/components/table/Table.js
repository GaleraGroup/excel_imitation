import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'

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
      console.log('click', event.target)
    }

    onMousedown() {
      if (event.target.dataset.resize) {
        console.log("start resizing")
      }
    }

    onMousemove() {
      //console.log('mousemove')
    }

    onMouseup() {
      console.log('mouseup')
    }
}