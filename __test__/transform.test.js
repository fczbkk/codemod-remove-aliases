jest.autoMockOff()
const { defineTest } = require('jscodeshift/dist/testUtils')

defineTest(__dirname, 'transform', null, 'SimpleImport')
defineTest(__dirname, 'transform', null, 'AliasImport')
defineTest(__dirname, 'transform', null, 'MixedImport')
defineTest(__dirname, 'transform', null, 'MultipleImports')
defineTest(__dirname, 'transform', null, 'subdirectory/DeepComponent')
