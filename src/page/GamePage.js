import {
  h,
  defineComponent,
  reactive,
  onMounted,
  onUnmounted
} from "@vue/runtime-core"
import Map from '../component/Map'
import Plane from '../component/Plane';
import EnemyPlane from '../component/EnemyPlane'
import Bullet from '../component/Bullet'
import {
  hitTestObject
} from '../utils/index'
import {
  game
} from '../Game'

export default defineComponent({
  setup(props, ctx) {
    const {
      planeInfo
    } = useCreatePlane()
    //敌方飞机数组
    const {
      enemyplanes
    } = useCreateEmyPlanes()
    //我方子弹
    const {
      bullets,
      addBullet
    } = useCreateBullets()
    const onAttack = (bulletinfo) => {
      addBullet(bulletinfo)
    }
    useFighting(enemyplanes, bullets, planeInfo, ctx.emit)

    return {
      onAttack,
      bullets,
      planeInfo,
      enemyplanes
    }
  },
  render(ctx) {
    const creatEnemyPlanes = () => {
      return ctx.enemyplanes.map(item => {
        return h(EnemyPlane, {
          x: item.x,
          y: item.y
        })
      })
    }
    const createBullets = () => {
      return ctx.bullets.map(item => {
        return h(Bullet, {
          x: item.x,
          y: item.y
        })
      })
    }
    return h("Container", [h(Map), h(Plane, {
        x: ctx.planeInfo.x,
        y: ctx.planeInfo.y,
        onAttack: ctx.onAttack
      }), ...creatEnemyPlanes(),
      ...createBullets()
    ])
  }
})

function useCreatePlane() {
  //我方飞机
  const planeInfo = reactive({
    x: 150,
    y: 450,
    width: 258,
    height: 364
  })
  const speed = 15
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        planeInfo.y -= speed;
        break;
      case "ArrowDown":
        planeInfo.y += speed;
        break;
      case "ArrowLeft":
        planeInfo.x -= speed;
        break;
      case "ArrowRight":
        planeInfo.x += speed;
        break;
    }
  })
  return {
    planeInfo
  }
}

function useCreateEmyPlanes() {
  const enemyplanes = reactive([{
    x: 50,
    y: 0,
    width: 308,
    height: 207
  }])
  return {
    enemyplanes
  }
}

function useCreateBullets() {
  const bullets = reactive([])
  const addBullet = (bulletinfo) => {
    bullets.push({
      ...bulletinfo,
      width: 61,
      height: 99
    })
  }
  return {
    bullets,
    addBullet
  }
}

function useFighting(enemyplanes, bullets, planeInfo, emit) {
  const handlerTicker = () => {
    //敌方飞机移送
    enemyplanes.forEach((item) => {
      item.y++
    })
    //敌我飞机碰撞检测
    enemyplanes.forEach((item) => {
      if (hitTestObject(item, planeInfo)) {
        // console.log("hit")
        emit("changePage", "EndPage")
      }
    })
    //子弹移动
    bullets.forEach((bullet) => {
      bullet.y--
    })
    //敌机子弹碰撞检测
    bullets.forEach((bulletinfo, bulletindex) => {
      enemyplanes.forEach((enemyInfo, enemyIndex) => {
        if (hitTestObject(bulletinfo, enemyInfo)) {
          //子弹、敌机消失
          bullets.splice(bulletindex, 1)
          enemyplanes.splice(enemyIndex, 1)
        }
      })

    })
  }
  onMounted(() => {
    game.ticker.add(handlerTicker)
  })
  onUnmounted(() => {
    game.ticker.remove(handlerTicker)
  })

}