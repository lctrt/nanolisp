const Library = require('./library.js')
const Parser = require('./parser.js')

module.exports = (context) => {
  const library = new Library(context)
  return new Parser(library)
}
