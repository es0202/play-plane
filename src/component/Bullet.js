import {
  h,
  defineComponent,
  ref,
  reactive,
  toRefs
} from "@vue/runtime-core"
import bulletImg from '../../assets/bullet.png'

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
      texture: bulletImg,
      x: ctx.x,
      y: ctx.y
    })])
  }
})