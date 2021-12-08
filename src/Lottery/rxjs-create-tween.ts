import { Observable } from 'rxjs' // eslint-disable-line
import TWEEN, { Tween } from '@tweenjs/tween.js'

type ITween = Tween<{ x: number; y: number }> | null
export type ITweenProcess = { idx: number; isLastRound: boolean }

let _animate = 0
const tweenAnimate = () => {
  _animate = requestAnimationFrame(tweenAnimate)
  TWEEN.update()
}
export function createTween(): [Observable<ITweenProcess>, ITween] {
  const position = { x: 0, y: 0 }
  const [num, round, dur] = [8, 3, 3500]
  const tween: ITween = new TWEEN.Tween(position)
  const observable = new Observable<ITweenProcess>(subscriber => {
    tweenAnimate()
    tween
      .to({ x: num * round - 1 }, dur)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(({ x }) => {
        subscriber.next({ idx: Math.round(x) % num, isLastRound: Math.ceil(x / 8) === round })
      })
      .onStop(() => {
        cancelAnimationFrame(_animate)
      })
      .onComplete(() => {
        cancelAnimationFrame(_animate)
      })
    tween.start()
  })
  return [observable, tween]
}

export default createTween
