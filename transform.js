/**
 * Converts aliased paths to relative paths:
 * components/MyComponent -> ../components/MyComponent
 */

const path = require('path')
const adapt = require('vue-jscodeshift-adapter')

const rootDir = path.resolve(__dirname)

const aliases = {
  'components': path.resolve(rootDir, 'components'),
  'filters': path.resolve(rootDir, 'components')
}

module.exports = adapt(function transformer (file, api) {
  const j = api.jscodeshift
  const fileDirectory = path.dirname(path.resolve(rootDir, file.path))

  const convertAliasToRelativePath = (componentPath) => {
    Object.entries(aliases).forEach(([key, val]) => {
      const fullComponentPath = path.relative(fileDirectory, val)
      const newPath = componentPath.node.value.replace(
        new RegExp(`^${key}/`),
        `${fullComponentPath}/`
      )
      componentPath.node.value = newPath
    })
  }

  const importPaths = j(file.source)
    .find(j.ImportDeclaration)
    .find(j.Literal)

  const result = importPaths
    .forEach(convertAliasToRelativePath)
    .toSource()

  console.log(result)

  return result
})
