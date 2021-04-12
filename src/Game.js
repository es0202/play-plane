import {
  Application
} from 'pixi.js'

export const game = new Application({
  width: 750,
  height: 1080,
})
document.body.append(game.view)
// console.log(game)
export function getRootContainer() {
  return game.stage
}