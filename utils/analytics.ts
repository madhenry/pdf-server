import { v4 as uuid } from 'uuid'
import Analytics from 'analytics-node'

const token = process.env.SEGMENT_TOKEN as string

const customAnalytics = {
  track: (data: any) => {
    try {
      if (!token) return
      if (!data.userId && !data.anonymousId) {
        data.anonymousId = uuid()
      }
      const analytics = new Analytics(token)
      return analytics.track(data)
    } catch (error) {
      console.log('analytics error', error)
    }
  }
}

export default customAnalytics
