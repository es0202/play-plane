//根组件

import {
  defineComponent,
  h,
  computed,
  ref
} from '@vue/runtime-core'
// import Circle from './component/Circle'
import StartPage from './page/StartPage'
import GamePage from './page/GamePage'
import EndPage from './page/EndPage'

export default defineComponent({
  setup() {
    const currentPageName = ref("GamePage");
    const currentPage = computed(() => {
      if (currentPageName.value === "StartPage") {
        return StartPage
      } else if (currentPageName.value === "GamePage") {
        return GamePage
      } else if (currentPageName.value === "EndPage") {
        return EndPage
      }
    })

    return {
      currentPage,
      currentPageName
    }
  },
  render(ctx) {
    //<rect x=100 y=100>hello world</rect>
    // const vnode = h('rect',{x:100,y:100},[
    //   'hello world',
    //   h(Circle)
    // ])

    // console.log(vnode)
    // return vnode;
    return h("Container", [h(ctx.currentPage, {
      onChangePage(page) {
        ctx.currentPageName = page
      }
    })])
  },
})