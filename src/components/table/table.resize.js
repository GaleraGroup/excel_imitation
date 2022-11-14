import {$} from '../../core/dom'

export function resizeHandler(event) {

    if (event.target.dataset.resize) {
    const $resizer = $(event.target)
    const shiftX = event.clientX - $resizer.getCoords().left
    const shiftY = event.clientY - $resizer.getCoords().top
    const $parent = $resizer.closest('[data-type="resizable"]')
    const $rowInfo = $(this.$root.$el.querySelector('[data-info="info"')).getCoords()
    const coords = $parent.getCoords()
    const resizerOrient = event.target.dataset.resize
    const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
    let value
    let delta


    document.onmousemove = e => {
      if (resizerOrient === 'col') {
        if (e.pageX >= (coords.left + $rowInfo.width - shiftX)) {
          delta = e.pageX - coords.right
          value = coords.width + delta
          $resizer.css({left: `${value}px`})
        }
      } else {
        if (e.pageY >= (coords.top + $rowInfo.height - shiftY)) {
          delta = e.pageY - coords.top
          value = coords.height + delta
          $resizer.css({top: `${delta}px`})
        }
      }
    }

    document.onmouseup = () => {
      document.onmouseup = null
      document.onmousemove = null

      if (resizerOrient === 'col') {
        $parent.css({
          width: `${value}px`
        })
        cells.forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({
          height: `${delta}px`
        })
      }
    }
  } 
}
