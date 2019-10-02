module.exports = function Library (includes) {
  Object.keys(includes).forEach(key => {
    this[key] = includes[key]
  })

  // Debug
  this.echo = console.log

  // Strings

  this.concat = function (...items) { // Concat multiple strings.
    return items.reduce((acc, item) => { return `${acc}${item}` }, '')
  }

  // Math

  this.add = (...args) => { // Adds values.
    return args.reduce((sum, val) => sum + val)
  }

  this.sub = (...args) => { // Subtracts values.
    return args.reduce((sum, val) => sum - val)
  }

  this.mul = (...args) => { // Multiplies values.
    return args.reduce((sum, val) => sum * val)
  }

  this.div = (...args) => { // Divides values.
    return args.reduce((sum, val) => sum / val)
  }

  this.mod = (a, b) => { // Returns the modulo of a and b.
    return a % b
  }

  this.clamp = (val, min, max) => { // Clamps a value between min and max.
    return Math.min(max, Math.max(min, val))
  }

  this.step = (val, step) => {
    return Math.round(val / step) * step
  }

  this.min = Math.min

  this.max = Math.max

  this.ceil = Math.ceil

  this.floor = Math.floor // round down to the nearest integer.

  this.sin = Math.sin

  this.cos = Math.cos

  this.log = Math.log // caclulates on the base of e.

  this.pow = (a, b) => { // calculates a^b.
    return Math.pow(a, b)
  }

  this.sqrt = Math.sqrt // calculate the square root.

  this.sq = (a) => { // calculate the square.
    return a * a
  }

  this.PI = Math.PI

  this.TWO_PI = Math.PI * 2

  this.random = (...args) => {
    if (args.length >= 2) {
      // (random start end)
      return args[0] + Math.random() * (args[1] - args[0])
    } else if (args.length === 1) {
      // (random max)
      return Math.random() * args[0]
    }
    return Math.random()
  }

  // Logic

  this.gt = (a, b) => { // Returns true if a is greater than b, else false.
    return a > b
  }

  this.lt = (a, b) => { // Returns true if a is less than b, else false.
    return a < b
  }

  this.eq = (a, b) => { // Returns true if a is equal to b, else false.
    return a === b
  }

  this.and = (a, b, ...rest) => { // Returns true if all conditions are true.
    const args = [a, b].concat(rest)
    for (let i = 0; i < args.length; i++) {
      if (!args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  this.or = (a, b, ...rest) => { // Returns true if at least one condition is true.
    const args = [a, b].concat(rest)
    for (let i = 0; i < args.length; i++) {
      if (args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  // Arrays

  this.map = async (fn, arr) => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      const arg = arr[i]
      res.push(await fn(arr[i],i));
    }
    return res;
  }

  this.filter = (fn, arr) => {
    const list = Array.from(arr)
    return Promise.all(list.map((element, index) => fn(element, index, list)))
      .then(result => {
        return list.filter((_, index) => {
          return result[index]
        })
      })
  }

  this.reduce = async (fn, arr, acc) => {
    const length = arr.length
    let result = acc === undefined ? subject[0] : acc
    for (let i = acc === undefined ? 1 : 0; i < length; i++) {
      result = await fn(result, arr[i], i, arr)
    }
    return result
  }

  this.len = (item) => { // Returns the length of a list.
    return item.length
  }

  this.first = (arr) => { // Returns the first item of a list.
    return arr[0]
  }

  this.last = (arr) => { // Returns the last
    return arr[arr.length - 1]
  }

  this.rest = ([_, ...arr]) => {
    return arr
  }

  this.range = (start, end, step = 1) => {
    const arr = []
    if (step > 0) {
      for (let i = start; i <= end; i += step) {
        arr.push(i)
      }
    } else {
      for (let i = start; i >= end; i += step) {
        arr.push(i)
      }
    }
    return arr
  }

  // Objects

  this.get = (item, key) => { // Gets an object's parameter with name.
    return item[key]
  }

  this.set = (item, ...args) => { // Sets an object's parameter with name as value.
    for (let i = 0; i < args.length; i += 2) {
      const key = args[i]
      const val = args[i + 1]
      item[key] = val
    }
    return item
  }

  this.of = (h, ...keys) => { // Gets object parameters with names.
    return keys.reduce((acc, key) => {
      return acc[key]
    }, h)
  }

  this.keys = (item) => { // Returns a list of the object's keys
    return Object.keys(item)
  }

  this.values = (item) => { // Returns a list of the object's values
    return Object.values(item)
  }

  // File System

  this.dir = (path = this.dirpath()) => { // Returns the content of a directory.
    return fs.existsSync(path) ? fs.readdirSync(path) : []
  }

  this.file = (path = this.filepath()) => { // Returns the content of a file.
    return fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : ''
  }

  this.dirpath = (path = this.filepath()) => { // Returns the path of a directory.
    return require('path').dirname(path)
  }

  this.table = (arg) => {
    console.table(arg)
    return arg
  }

  this.debug = (arg) => {
    console.log(arg)
    return arg
  }

  this.time = (rate = 1) => { // Returns timestamp in milliseconds.
    return (Date.now() * rate)
  }

  this.js = () => { // Javascript interop.
    return window
  }

  this.test = (name, a, b) => {
    if (`${a}` !== `${b}`) {
      console.warn('failed ' + name, a, b)
    } else {
      console.log('passed ' + name, a)
    }
    return a === b
  }

  this.benchmark = async (fn) => { // logs time taken to execute a function.
    const start = Date.now()
    const result = await fn()
    console.log(`time taken: ${Date.now() - start}ms`)
    return result
  }
}
