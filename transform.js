/**
 * Converts aliased paths to relative paths:
 * components/MyComponent -> ../components/MyComponent
 */

const path = require('path')
const adapt = require('vue-jscodeshift-adapter')

const rootDir = (
  // process.env.CODEMOD_REMOVE_ALIASES_ROOT_PATH ||
  path.resolve(__dirname)
)

// TODO generated dynamically based on root directory
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
