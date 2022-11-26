import { ids } from "webpack"

export function isCell(event) {
   return event.target.dataset.type === 'cell'
}

export function matrix(IdSet) {
   const objId = []
   const rowSet = new Set()
   const colSet = new Set()
   const result = []

   //console.log(IdSet)

   Array.from(IdSet)
      .map(item => {
         const [row, col] = item.split(':')
         objId.push({'row':row, 'col':col})
      })

   objId
      .forEach(coords => {
         rowSet.add(coords.row)
         colSet.add(coords.col)
   })



   const firstCol = Array.from(colSet)[0]
   const firstRow = Array.from(rowSet)[0]
   const lastCol = Array.from(colSet).length-1
   const lastRow = Array.from(rowSet).length-1

   // console.log('col:', firstCol, lastCol)
   // console.log('row:', firstRow, lastRow)

   for (let i = +firstRow; i <= lastRow; i++) {

      for (let j = +firstCol; j <= lastCol; j++) {
         result.push( {'row': i, 'col': j} )
      }
   }

   return result

}