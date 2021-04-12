import {
  h,
  defineComponent,
  ref,
  reactive,
  toRefs
} from "@vue/runtime-core"
import planeImg from '../../assets/plane.png'
import {
  game
} from '../Game'

export default defineComponent({
  props: ["x", "y"],
  setup(props, ctx) {
    const {
      x,
      y
    } = toRefs(props)

    window.addEventListener('keydown', (e) => {
      if (e.code === "Space") {
        // console.log("space")
        ctx.emit("attack", {
          x: x.value + 100,
          y: y.value
        })
      }
    })
    return {
      x,
      y
    }
  },
  render(ctx) {
    return h("Container", [h("Sprite", {
      texture: planeImg,
      x: ctx.x,
      y: ctx.y
    })])
  }
})