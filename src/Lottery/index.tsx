import React, { useState } from 'react'
import { fakeLotteryFetch, LotteryResult } from '../services/fake-api'
import { merge, reduce, from, map } from 'rxjs'
import createTween, { ITweenProcess } from './rxjs-create-tween'
import styles from './index.module.scss'
import cx from 'classnames'
/**
 * 动画与请求同时开始，
 * 动画时间会设置比请求结果返回时间长，
 * 等到请求结果后更新动画告诉数据游戏抽奖结果，
 * 返回结果错误、超时，动画停留在非发奖区域
 * @returns
 */
export default function Lottery() {
  const [animateIndex, setAnimateIndex] = useState(-1)
  const [lotteryResult, setLotteryResult] = useState(-1)
  const doLottery = () => {
    const query = { result: lotteryResult }
    const result$$ = from(fakeLotteryFetch(query))
    const [tween$$, tween] = createTween()
    // 动画与抽奖合并
    merge(result$$, tween$$).pipe(reduce((acc, one) => {
      if ((one as ITweenProcess).idx !== undefined) {
        const { idx, isLastRound } = one as ITweenProcess
        if (isLastRound && acc.giftId === idx) {
          tween?.stop()
        } else {
          setAnimateIndex(idx)
        }
        return { ...acc, ...one }
      } else {
        return { ...acc, giftId: (one as LotteryResult).giftId }
      }
    }, { giftId: -1, idx: 0, isLastRound: false })).subscribe()
  }

  return (
    <div className={styles.container}>
      <header>
        <input
          type="number"
          onChange={e => {
            setLotteryResult(+e.target.value)
          }}
        />
        <label>抽奖结果(1-8)</label>
        <button onClick={doLottery}>抽奖</button>
      </header>

      <div>{animateIndex + 1}</div>
      <div className={styles.content}>
        {Array.from({ length: 9 }, (i, idx) => idx).map((item, i) => (
          <div key={i} className={cx(styles.item, item === animateIndex && styles['is--active'])}>
            {item + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
