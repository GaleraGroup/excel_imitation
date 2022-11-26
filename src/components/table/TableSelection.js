
export class TableSelection {
    static className = 'selected'
    static classSelectCell = 'move-selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.deselectAll()
        this.current = $el
        this.group.push($el)
        $el.addClass(TableSelection.className)
    }

    selectInMove($el) {
        this.current.addClass(TableSelection.classSelectCell)
        $el.addClass(TableSelection.classSelectCell)
    }

    selectGroup(group) {
        this.deselectAll()
        group.map($el => {
            this.group.push($el)
            $el.addClass(TableSelection.classSelectCell)
        })
    }

    deselectAll() {
        this.group.forEach($cell => $cell.removeClass([TableSelection.className, TableSelection.classSelectCell]))
        this.group = []
    }
}


