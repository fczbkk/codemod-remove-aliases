/**
 * Converts aliased paths to relative paths:
 * components/MyComponent -> ../components/MyComponent
 */

const path = require('path')
const adapt = require('vue-jscodeshift-adapter')
const { rootDir, aliases } = require('./transform.config.js')

module.exports = adapt(function transformer (file, api) {
  const j = api.jscodeshift
  const fileDirectory = path.dirname(path.resolve(rootDir, file.path))

  const convertAliasToRelativePath = (componentPath) => {
    Object.entries(aliases).forEach(([key, val]) => {
      const fullComponentPath = path.relative(fileDirectory, val)
      componentPath.node.value = componentPath.node.value.replace(
        new RegExp(`^${key}/`),
        `${fullComponentPath}/`
      )
    })
  }

  const importPaths = j(file.source)
    .find(j.ImportDeclaration)
    .find(j.Literal)

  const result = importPaths
    .forEach(convertAliasToRelativePath)
    .toSource({ quote: 'single' })

  return result
})
