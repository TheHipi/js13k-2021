const { makeHtmlAttributes } = require('@rollup/plugin-html')
const template = async ({ attributes, files, meta, publicPath, title }) => {
  const metas = meta.map((input) => {
    const attrs = makeHtmlAttributes(input)
    return `<meta${attrs}>`
  })
    .join('\n')

  const scripts = (files.js || []).map(({ fileName }) => {
    const attrs = makeHtmlAttributes(attributes.script)
    return `<script src="${publicPath}${fileName}"${attrs}></script>`
  })
    .join('\n')

  return `<!doctype html>
    <html${makeHtmlAttributes(attributes.html)}>
        <head>
            ${metas}
            <title>${title}</title>
        </head>
        <body>
            <canvas id="canvas" class="wrapper" width="600" height="200"></canvas>
            ${scripts}
        </body>
    </html>`
}

export default template
