# PDF Server

This little next.js app lets you stream/download text and vector based Figma templates with your own content.
[Demo](https://pdf.blooob.co)

## Usage

1. Login/signup to Figma and create a developer token: https://www.figma.com/developers/api
2. Copy a draft of the preview templates or create a new one (make sure you follow some of the guidelines)

[FDS Demo](https://www.figma.com/file/w4qFtzyCX2fYT3x6CQDFQF/FDS-Demo)
[Keys](https://www.figma.com/file/HEIPkFgqKYFeCtO7Ri9s7r/Keys)

3. Deploy as a server-side app to DigitalOcean/Vercel etc

[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/madhenry/pdf-server/tree/main&refcode=5fc6d2f5bf61)

Use it through the frontend or via /api/PDF endpoint using query string variables or POST vars.

API endpoint parameters (don't use ase layer names in Figma):

file - the Figma file ID
fileName - when defined the api forces a download with the specified file name
debug - when defined, react-pdf debug mode is enabled

Everything else defined is used to replace contents with matching figma layer names.

## ENV

```sh
# required
FIGMA_TOKEN=
# optional
# comma separated list of figma file id-s or empty to allow all
NEXT_PUBLIC_ALLOWED_FILES=
MAX_VECTORS=100 # too many vectors in a file can crash the server
```

## LICENSE

MIT License

Copyright (c) 2020 Henry Kehlmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
