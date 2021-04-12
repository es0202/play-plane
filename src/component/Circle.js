import {
  defineComponent,
  h
} from '@vue/runtime-core'
export default defineComponent({
  render() {
    const vnode = h('circle', {
      x: 150,
      y: 150
    })
    return vnode;
  }
})