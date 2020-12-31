import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import * as snippet from '@segment/snippet'

const {
  NEXT_PUBLIC_SEGMENT_TOKEN
} = process.env
export default class Document extends NextDocument {
  renderSnippet() {
    const opts = {
      apiKey: NEXT_PUBLIC_SEGMENT_TOKEN,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true,
    }

    return snippet.min(opts)
  }
  render() {
    return (
      <Html>
        <Head>
          {NEXT_PUBLIC_SEGMENT_TOKEN && <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />}
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
