import { v4 as uuid } from 'uuid'
import Analytics from 'analytics-node'

const token = process.env.SEGMENT_TOKEN
let analytics
if (token) {
  analytics = new Analytics(token)
}

const customAnalytics = {
  track: (data) => {
    if (!analytics) return
    if (!data.userId && !data.anonymousId) {
      data.anonymousId = uuid()
    }
    return analytics.track(data)
  }
}

export default customAnalytics
