# Nanolisp

`nanolisp` is a *small, extensible lisp* to embed in JavaScript applications. 

## Installation and usage

```
npm install nanolisp
```

```javascript

const lisp = require('nanolisp')();

lisp.run(`
(def foobar (add 1 2))
(echo foobar)
`);
```

## Embedding custom libraries

To make this useful, you'll typically want to include libraries that are connected to your application context.

```javascript
const nanolisp = require('nanolisp');

const appContext = {
    health: 400
};

const library = {
    takeDamage: (hit) => {
        appContext.health -= hit;
    },
    life: () => appContext.health
};

const lisp = nanolisp(library);

const result = lisp.run(`
    (echo life)
    (takeDamage 100)
    (echo life)
`);
```

## Inspiration

This lisp is a fork from what was built for [Ronin](https://github.com/hundredrabbits/Ronin).

