import {
  h,
  defineComponent
} from "@vue/runtime-core"
import endPageImg from '../../assets/endPage.png'
import restartBtnImg from '../../assets/restartBtn.png'

export default defineComponent({
  setup(props, ctx) {
    const onClick = () => {
      ctx.emit("changePage","GamePage")
    }

    //挂载在render 的 ctx上
    return {
      onClick
    }
  },
  render(ctx) {
    return h("Container", [h("Sprite", {
      texture: endPageImg
    }), h("Sprite", {
      texture: restartBtnImg,
      x: 227,
      y: 510,
      interactive: true,
      onClick: ctx.onClick
    })])
  }
})