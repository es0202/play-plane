import {
  createRenderer
} from '@vue/runtime-core'
import {
  Container,
  Graphics,
  Sprite,
  Text,
  Texture
} from 'pixi.js'

const render = createRenderer({
  createElement(type) {
    let element;
    switch (type) {
      case "Container":
        element = new Container();
        break;
      case "Sprite":
        element = new Sprite()
        break;
    }
    return element
  },
  patchProp(el, key, prevValue, nextValue) {
    //h 第二个参数
    // el[key] = nextValue;
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        el.on("pointertap", nextValue)
      default:
        el[key] = nextValue;
    }
  },
  setElementText(node, text) {
    //h 第三个参数
    const cText = new Text(text)
    node.addChild(cText)
  },
  createText(text) {
    //h 第三个参数数组中嵌套 h 子元素
    return new Text(text)
  },
  insert(el, parent) {
    // console.log(el)
    // console.log(parent)
    parent.addChild(el)
  },
  createComment() {

  },
  parentNode() {

  },
  nextSibling() {

  },
  remove(el) {
    const parent = el.parent
    if (parent) {
      parent.removeChild(el)
    }
  }
})

export function createApp(rootComponent) {
  return render.createApp(rootComponent)
}