import {
  h,
  defineComponent,
  ref,
  reactive,
  toRefs
} from "@vue/runtime-core"
import enemyPlaneImg from '../../assets/enemy.png'
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
    return {
      x,
      y
    }
  },
  render(ctx) {
    return h("Container", [h("Sprite", {
      texture: enemyPlaneImg,
      x: ctx.x,
      y: ctx.y
    })])
  }
})