import { Observable } from 'rxjs' // eslint-disable-line
import TWEEN, { Tween } from '@tweenjs/tween.js'

let _animate = 0
const tweenAnimate = () => {
  _animate = requestAnimationFrame(tweenAnimate)
  TWEEN.update()
}
export function createTween(): [Observable<number>, Tween<{ x: number; y: number }> | null] {
  const position = { x: -1, y: 0 }
  const [num, dur] = [8, 3000]
  const tween: Tween<{ x: number; y: number }> | null = new TWEEN.Tween(position)
  const observable = new Observable<number>(subscriber => {
    tweenAnimate()
    tween
      .to({ x: num * 2 - 1 }, dur) // 2圈
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(({ x }) => {
        subscriber.next(Math.round(x) % num)
      })
      .onStop(() => {
        cancelAnimationFrame(_animate)
      })
      .onComplete(() => {
        // subscriber.next(-1)
        // console.log('on complete', endIndex)
        cancelAnimationFrame(_animate)
      })
    tween.start()
  })
  const updateTweenEnd = () => {}
  return [observable, tween]
}

export default createTween
