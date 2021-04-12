import {
  h,
  defineComponent
} from "@vue/runtime-core"
import startPageImg from '../../assets/startPage.png'
import startBtnImg from '../../assets/startBtn.png'

export default defineComponent({
  setup(props, ctx) {
    const onClick = () => {
      console.log("click")
      ctx.emit("changePage","GamePage")
    }

    //挂载在render 的 ctx上
    return {
      onClick
    }
  },
  render(ctx) {
    return h("Container", [h("Sprite", {
      texture: startPageImg
    }), h("Sprite", {
      texture: startBtnImg,
      x: 227,
      y: 510,
      interactive: true,
      onClick: ctx.onClick
    })])
  }
})