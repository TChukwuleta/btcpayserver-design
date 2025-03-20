const { readFileSync, writeFileSync } = require('fs')
const { join, relative, resolve } = require('path')
const { globSync } = require('glob')
const { optimize } = require('svgo')

const dir = resolve(__dirname, '../src/icons')
const dst = resolve(__dirname, '../dist/svg/icons')
const svgOpts = { multipass: true }
const slugify = str => str.toLowerCase().replace(/\W/gi, '-')

const svgs = globSync(join(dir, '**/*.svg')).sort()

svgs.forEach(path => {
  const rel = relative(dir, path)
  const id = slugify(rel).replace(/-svg$/gi, '')
  const svg = readFileSync(path, 'utf8')
  const optimized = optimize(svg, { path, ...svgOpts });
  const filePath = join(dst, `${id}.svg`)
  writeFileSync(filePath, optimized.data)
})
