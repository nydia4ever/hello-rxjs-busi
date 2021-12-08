import { Subject, of, combineLatest, from } from 'rxjs'
import { switchMap, timeout, catchError, take, share, startWith } from 'rxjs/operators'
import { ObservableResource } from 'observable-hooks'

export type LotteryResult = {
  giftId: number
}

export async function fakeLotteryFetch(query: Record<string, number>): Promise<LotteryResult> {
  const { result } = query
  console.log(`fetch lottery ${result} ...`)
  await timer(2000 * Math.random())
  console.log(`fetched lottery ${result}`)
  if (result) {
    return {
      giftId: /^[1-9]$/.test(result + '') ? result : -1
    }
  } else {
    // throw new Error('No result')
    return { giftId: -1 }
  }
}
function timer(delay = 1000) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
