const ArrayNatureIterators = [
  "es.object.to-string",
  "es.array.iterator",
  "web.dom-collections.iterator",
];

const CommonIterators = ["es.string.iterator"].concat(ArrayNatureIterators);

const TypedArrayDependencies = [
  "es.array.iterator",
  "es.array-buffer.slice",
  "es.object.to-string",
  "es.typed-array.copy-within",
  "es.typed-array.every",
  "es.typed-array.fill",
  "es.typed-array.filter",
  "es.typed-array.find",
  "es.typed-array.find-index",
  "es.typed-array.for-each",
  "es.typed-array.includes",
  "es.typed-array.index-of",
  "es.typed-array.iterator",
  "es.typed-array.join",
  "es.typed-array.last-index-of",
  "es.typed-array.map",
  "es.typed-array.reduce",
  "es.typed-array.reduce-right",
  "es.typed-array.reverse",
  "es.typed-array.set",
  "es.typed-array.slice",
  "es.typed-array.some",
  "es.typed-array.sort",
  "es.typed-array.subarray",
  "es.typed-array.to-locale-string",
  "es.typed-array.to-string",
];

const TypedArrayStaticMethods = {
  from: "es.typed-array.from",
  of: "es.typed-array.of",
};

const PromiseDependencies = [
  "es.object.to-string",
  "es.promise.finally",
  "es.promise",
];

// TODO: this is the opposite of built-in-features so maybe generate one from the other?
export const definitions = {
  builtins: {
    Number: ["es.number.constructor"],
    RegExp: ["es.regexp.constructor"],
    Symbol: ["es.object.to-string", "es.symbol"],
    Promise: PromiseDependencies,
    Map: ["es.map"].concat(CommonIterators),
    Set: ["es.set"].concat(CommonIterators),
    WeakMap: ["es.weak-map"].concat(CommonIterators),
    WeakSet: ["es.weak-set"].concat(CommonIterators),
    ArrayBuffer: [
      "es.object.to-string",
      "es.array-buffer.constructor",
      "es.array-buffer.slice",
    ],
    DataView: ["es.object.to-string", "es.data-view", "es.array-buffer.slice"],
    Int8Array: ["es.typed-array.int8-array"].concat(TypedArrayDependencies),
    Uint8Array: ["es.typed-array.uint8-array"].concat(TypedArrayDependencies),
    Uint8ClampedArray: ["es.typed-array.uint8-clamped-array"].concat(
      TypedArrayDependencies,
    ),
    Int16Array: ["es.typed-array.int16-array"].concat(TypedArrayDependencies),
    Uint16Array: ["es.typed-array.uint16-array"].concat(TypedArrayDependencies),
    Int32Array: ["es.typed-array.int32-array"].concat(TypedArrayDependencies),
    Uint32Array: ["es.typed-array.uint32-array"].concat(TypedArrayDependencies),
    Float32Array: ["es.typed-array.float32-array"].concat(
      TypedArrayDependencies,
    ),
    Float64Array: ["es.typed-array.float64-array"].concat(
      TypedArrayDependencies,
    ),
    setTimeout: ["web.timers"],
    setInterval: ["web.timers"],
    setImmediate: ["web.immediate"],
    clearImmediate: ["web.immediate"],
  },

  instanceMethods: {
    anchor: ["es.string.anchor"],
    big: ["es.string.big"],
    bind: ["es.function.bind"],
    blink: ["es.string.blink"],
    bold: ["es.string.bold"],
    codePointAt: ["es.string.code-point-at"],
    concat: ["es.array.concat"],
    copyWithin: ["es.array.copy-within"],
    endsWith: ["es.string.ends-with"],
    entries: ArrayNatureIterators,
    every: ["es.array.every"],
    fill: ["es.array.fill"],
    filter: ["es.array.filter"],
    finally: PromiseDependencies,
    find: ["es.array.find"],
    findIndex: ["es.array.find-index"],
    fixed: ["es.string.fixed"],
    flags: ["es.regexp.flags"],
    fontcolor: ["es.string.fontcolor"],
    fontsize: ["es.string.fontsize"],
    forEach: ["es.array.for-each", "web.dom-collections.for-each"],
    includes: ["es.string.includes", "es.array.includes"],
    indexOf: ["es.array.index-of"],
    italic: ["es.string.italics"],
    keys: ArrayNatureIterators,
    lastIndexOf: ["es.array.last-index-of"],
    link: ["es.string.link"],
    match: ["es.string.match"],
    map: ["es.array.map"],
    name: ["es.function.name"],
    padStart: ["es.string.pad-start"],
    padEnd: ["es.string.pad-end"],
    reduce: ["es.array.reduce"],
    reduceRight: ["es.array.reduce-right"],
    repeat: ["es.string.repeat"],
    replace: ["es.string.replace"],
    search: ["es.string.search"],
    slice: ["es.array.slice"],
    small: ["es.string.small"],
    some: ["es.array.some"],
    sort: ["es.array.sort"],
    splice: ["es.array.splice"],
    split: ["es.string.split"],
    startsWith: ["es.string.starts-with"],
    strike: ["es.string.strike"],
    sub: ["es.string.sub"],
    sup: ["es.string.sup"],
    toISOString: ["es.date.to-iso-string"],
    toJSON: ["es.date.to-json"],
    toString: [
      "es.object.to-string",
      "es.date.to-string",
      "es.regexp.to-string",
    ],
    values: ArrayNatureIterators,
    __defineGetter__: ["es.object.define-getter"],
    __defineSetter__: ["es.object.define-setter"],
    __lookupGetter__: ["es.object.lookup-getter"],
    __lookupSetter__: ["es.object.lookup-setter"],
  },

  staticMethods: {
    Array: {
      from: ["es.array.from", "es.string.iterator"],
      isArray: "es.array.is-array",
      of: "es.array.of",
    },

    Date: {
      now: "es.date.now",
    },

    Object: {
      assign: "es.object.assign",
      create: "es.object.create",
      defineProperty: "es.object.define-property",
      defineProperties: "es.object.define-properties",
      entries: "es.object.entries",
      freeze: "es.object.freeze",
      getOwnPropertyDescriptor: "es.object.get-own-property-descriptor",
      getOwnPropertyDescriptors: "es.object.get-own-property-descriptors",
      getOwnPropertyNames: "es.object.get-own-property-names",
      getOwnPropertySymbols: "es.symbol",
      getPrototypeOf: "es.object.get-prototype-of",
      is: "es.object.is",
      isExtensible: "es.object.is-extensible",
      isFrozen: "es.object.is-frozen",
      isSealed: "es.object.is-sealed",
      keys: "es.object.keys",
      preventExtensions: "es.object.prevent-extensions",
      seal: "es.object.seal",
      setPrototypeOf: "es.object.set-prototype-of",
      values: "es.object.values",
    },

    Math: {
      acosh: "es.math.acosh",
      asinh: "es.math.asinh",
      atanh: "es.math.atanh",
      cbrt: "es.math.cbrt",
      clz32: "es.math.clz32",
      cosh: "es.math.cosh",
      expm1: "es.math.expm1",
      fround: "es.math.fround",
      hypot: "es.math.hypot",
      imul: "es.math.imul",
      log1p: "es.math.log1p",
      log10: "es.math.log10",
      log2: "es.math.log2",
      sign: "es.math.sign",
      sinh: "es.math.sinh",
      tanh: "es.math.tanh",
      trunc: "es.math.trunc",
    },

    String: {
      fromCodePoint: "es.string.from-code-point",
      raw: "es.string.raw",
    },

    Number: {
      EPSILON: "es.number.epsilon",
      MIN_SAFE_INTEGER: "es.number.min-safe-integer",
      MAX_SAFE_INTEGER: "es.number.max-safe-integer",
      isFinite: "es.number.is-finite",
      isInteger: "es.number.is-integer",
      isSafeInteger: "es.number.is-safe-integer",
      isNaN: "es.number.is-nan",
      parseFloat: "es.number.parse-float",
      parseInt: "es.number.parse-int",
    },

    Promise: {
      all: CommonIterators,
      race: CommonIterators,
    },

    Reflect: {
      apply: "es.reflect.apply",
      construct: "es.reflect.construct",
      defineProperty: "es.reflect.define-property",
      deleteProperty: "es.reflect.delete-property",
      get: "es.reflect.get",
      getOwnPropertyDescriptor: "es.reflect.get-own-property-descriptor",
      getPrototypeOf: "es.reflect.get-prototype-of",
      has: "es.reflect.has",
      isExtensible: "es.reflect.is-extensible",
      ownKeys: "es.reflect.own-keys",
      preventExtensions: "es.reflect.prevent-extensions",
      set: "es.reflect.set",
      setPrototypeOf: "es.reflect.set-prototype-of",
    },

    Symbol: {
      asyncIterator: "es.symbol.async-iterator",
      hasInstance: ["es.function.has-instance", "es.symbol.has-instance"],
      isConcatSpreadable: ["es.array.concat", "es.symbol.is-concat-spreadable"],
      iterator: CommonIterators.concat("es.symbol.iterator"),
      match: ["es.string.match", "es.symbol.match"],
      replace: ["es.string.replace", "es.symbol.replace"],
      search: ["es.string.search", "es.symbol.search"],
      species: "es.symbol.species",
      split: ["es.string.split", "es.symbol.split"],
      toPrimitive: ["es.date.to-primitive", "es.symbol.to-primitive"],
      toStringTag: ["es.object.to-string", "es.symbol.to-string-tag"],
      unscopables: "es.symbol.unscopables",
    },

    ArrayBuffer: {
      isView: ["es.array-buffer.is-view"],
    },

    Int8Array: TypedArrayStaticMethods,

    Uint8Array: TypedArrayStaticMethods,

    Uint8ClampedArray: TypedArrayStaticMethods,

    Int16Array: TypedArrayStaticMethods,

    Uint16Array: TypedArrayStaticMethods,

    Int32Array: TypedArrayStaticMethods,

    Uint32Array: TypedArrayStaticMethods,

    Float32Array: TypedArrayStaticMethods,

    Float64Array: TypedArrayStaticMethods,
  },
};
