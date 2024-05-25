(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  function aa() {
    return function () {};
  }
  function m(a) {
    return function () {
      return this[a];
    };
  }
  function ca(a) {
    return function () {
      return a;
    };
  }
  var n;
  function da(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  var ea =
    'function' == typeof Object.defineProperties
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) return a;
          a[b] = c.value;
          return a;
        };
  function fa(a) {
    a = [
      'object' == typeof globalThis && globalThis,
      a,
      'object' == typeof window && window,
      'object' == typeof self && self,
      'object' == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error('Cannot find global object');
  }
  var ha = fa(this);
  function ja(a, b) {
    if (b)
      a: {
        var c = ha;
        a = a.split('.');
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d &&
          null != b &&
          ea(c, a, { configurable: !0, writable: !0, value: b });
      }
  }
  ja('Symbol', function (a) {
    function b(f) {
      if (this instanceof b) throw new TypeError('Symbol is not a constructor');
      return new c(d + (f || '') + '_' + e++, f);
    }
    function c(f, g) {
      this.g = f;
      ea(this, 'description', { configurable: !0, writable: !0, value: g });
    }
    if (a) return a;
    c.prototype.toString = m('g');
    var d = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      e = 0;
    return b;
  });
  ja('Symbol.iterator', function (a) {
    if (a) return a;
    a = Symbol('Symbol.iterator');
    for (
      var b =
          'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
            ' ',
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = ha[b[c]];
      'function' === typeof d &&
        'function' != typeof d.prototype[a] &&
        ea(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return ka(da(this));
          },
        });
    }
    return a;
  });
  function ka(a) {
    a = { next: a };
    a[Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  function la(a) {
    var b =
      'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : { next: da(a) };
  }
  function ma(a) {
    for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
    return c;
  }
  function na(a) {
    return a instanceof Array ? a : ma(la(a));
  }
  var oa =
      'function' == typeof Object.create
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    pa;
  if ('function' == typeof Object.setPrototypeOf) pa = Object.setPrototypeOf;
  else {
    var qa;
    a: {
      var ra = { a: !0 },
        sa = {};
      try {
        sa.__proto__ = ra;
        qa = sa.a;
        break a;
      } catch (a) {}
      qa = !1;
    }
    pa = qa
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible');
          return a;
        }
      : null;
  }
  var ta = pa;
  function q(a, b) {
    a.prototype = oa(b.prototype);
    a.prototype.constructor = a;
    if (ta) ta(a, b);
    else
      for (var c in b)
        if ('prototype' != c)
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d);
          } else a[c] = b[c];
    a.fa = b.prototype;
  }
  function ua(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  ja('WeakMap', function (a) {
    function b(k) {
      this.g = (h += Math.random() + 1).toString();
      if (k) {
        k = la(k);
        for (var l; !(l = k.next()).done; ) (l = l.value), this.set(l[0], l[1]);
      }
    }
    function c() {}
    function d(k) {
      var l = typeof k;
      return ('object' === l && null !== k) || 'function' === l;
    }
    function e(k) {
      if (!ua(k, g)) {
        var l = new c();
        ea(k, g, { value: l });
      }
    }
    function f(k) {
      var l = Object[k];
      l &&
        (Object[k] = function (p) {
          if (p instanceof c) return p;
          Object.isExtensible(p) && e(p);
          return l(p);
        });
    }
    if (
      (function () {
        if (!a || !Object.seal) return !1;
        try {
          var k = Object.seal({}),
            l = Object.seal({}),
            p = new a([
              [k, 2],
              [l, 3],
            ]);
          if (2 != p.get(k) || 3 != p.get(l)) return !1;
          p.delete(k);
          p.set(l, 4);
          return !p.has(k) && 4 == p.get(l);
        } catch (t) {
          return !1;
        }
      })()
    )
      return a;
    var g = '$jscomp_hidden_' + Math.random();
    f('freeze');
    f('preventExtensions');
    f('seal');
    var h = 0;
    b.prototype.set = function (k, l) {
      if (!d(k)) throw Error('Invalid WeakMap key');
      e(k);
      if (!ua(k, g)) throw Error('WeakMap key fail: ' + k);
      k[g][this.g] = l;
      return this;
    };
    b.prototype.get = function (k) {
      return d(k) && ua(k, g) ? k[g][this.g] : void 0;
    };
    b.prototype.has = function (k) {
      return d(k) && ua(k, g) && ua(k[g], this.g);
    };
    b.prototype.delete = function (k) {
      return d(k) && ua(k, g) && ua(k[g], this.g) ? delete k[g][this.g] : !1;
    };
    return b;
  });
  ja('Map', function (a) {
    function b() {
      var h = {};
      return (h.qa = h.next = h.head = h);
    }
    function c(h, k) {
      var l = h.g;
      return ka(function () {
        if (l) {
          for (; l.head != h.g; ) l = l.qa;
          for (; l.next != l.head; )
            return (l = l.next), { done: !1, value: k(l) };
          l = null;
        }
        return { done: !0, value: void 0 };
      });
    }
    function d(h, k) {
      var l = k && typeof k;
      'object' == l || 'function' == l
        ? f.has(k)
          ? (l = f.get(k))
          : ((l = '' + ++g), f.set(k, l))
        : (l = 'p_' + k);
      var p = h.j[l];
      if (p && ua(h.j, l))
        for (h = 0; h < p.length; h++) {
          var t = p[h];
          if ((k !== k && t.key !== t.key) || k === t.key)
            return { id: l, list: p, index: h, ea: t };
        }
      return { id: l, list: p, index: -1, ea: void 0 };
    }
    function e(h) {
      this.j = {};
      this.g = b();
      this.size = 0;
      if (h) {
        h = la(h);
        for (var k; !(k = h.next()).done; ) (k = k.value), this.set(k[0], k[1]);
      }
    }
    if (
      (function () {
        if (
          !a ||
          'function' != typeof a ||
          !a.prototype.entries ||
          'function' != typeof Object.seal
        )
          return !1;
        try {
          var h = Object.seal({ x: 4 }),
            k = new a(la([[h, 's']]));
          if (
            's' != k.get(h) ||
            1 != k.size ||
            k.get({ x: 4 }) ||
            k.set({ x: 4 }, 't') != k ||
            2 != k.size
          )
            return !1;
          var l = k.entries(),
            p = l.next();
          if (p.done || p.value[0] != h || 's' != p.value[1]) return !1;
          p = l.next();
          return p.done ||
            4 != p.value[0].x ||
            't' != p.value[1] ||
            !l.next().done
            ? !1
            : !0;
        } catch (t) {
          return !1;
        }
      })()
    )
      return a;
    var f = new WeakMap();
    e.prototype.set = function (h, k) {
      h = 0 === h ? 0 : h;
      var l = d(this, h);
      l.list || (l.list = this.j[l.id] = []);
      l.ea
        ? (l.ea.value = k)
        : ((l.ea = {
            next: this.g,
            qa: this.g.qa,
            head: this.g,
            key: h,
            value: k,
          }),
          l.list.push(l.ea),
          (this.g.qa.next = l.ea),
          (this.g.qa = l.ea),
          this.size++);
      return this;
    };
    e.prototype.delete = function (h) {
      h = d(this, h);
      return h.ea && h.list
        ? (h.list.splice(h.index, 1),
          h.list.length || delete this.j[h.id],
          (h.ea.qa.next = h.ea.next),
          (h.ea.next.qa = h.ea.qa),
          (h.ea.head = null),
          this.size--,
          !0)
        : !1;
    };
    e.prototype.clear = function () {
      this.j = {};
      this.g = this.g.qa = b();
      this.size = 0;
    };
    e.prototype.has = function (h) {
      return !!d(this, h).ea;
    };
    e.prototype.get = function (h) {
      return (h = d(this, h).ea) && h.value;
    };
    e.prototype.entries = function () {
      return c(this, function (h) {
        return [h.key, h.value];
      });
    };
    e.prototype.keys = function () {
      return c(this, function (h) {
        return h.key;
      });
    };
    e.prototype.values = function () {
      return c(this, function (h) {
        return h.value;
      });
    };
    e.prototype.forEach = function (h, k) {
      for (var l = this.entries(), p; !(p = l.next()).done; )
        (p = p.value), h.call(k, p[1], p[0], this);
    };
    e.prototype[Symbol.iterator] = e.prototype.entries;
    var g = 0;
    return e;
  });
  function va(a, b) {
    a instanceof String && (a += '');
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++;
            return { value: b(f, a[f]), done: !1 };
          }
          d = !0;
          return { done: !0, value: void 0 };
        },
      };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  }
  ja('Array.from', function (a) {
    return a
      ? a
      : function (b, c, d) {
          c =
            null != c
              ? c
              : function (h) {
                  return h;
                };
          var e = [],
            f =
              'undefined' != typeof Symbol &&
              Symbol.iterator &&
              b[Symbol.iterator];
          if ('function' == typeof f) {
            b = f.call(b);
            for (var g = 0; !(f = b.next()).done; )
              e.push(c.call(d, f.value, g++));
          } else
            for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
          return e;
        };
  });
  ja('Object.is', function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
        };
  });
  ja('Array.prototype.values', function (a) {
    return a
      ? a
      : function () {
          return va(this, function (b, c) {
            return c;
          });
        };
  });
  ja('Math.imul', function (a) {
    return a
      ? a
      : function (b, c) {
          b = Number(b);
          c = Number(c);
          var d = b & 65535,
            e = c & 65535;
          return (
            (d * e +
              (((((b >>> 16) & 65535) * e + d * ((c >>> 16) & 65535)) << 16) >>>
                0)) |
            0
          );
        };
  });
  ja('Array.prototype.keys', function (a) {
    return a
      ? a
      : function () {
          return va(this, function (b) {
            return b;
          });
        };
  });
  ja('Promise', function (a) {
    function b(g) {
      this.g = 0;
      this.o = void 0;
      this.j = [];
      this.F = !1;
      var h = this.v();
      try {
        g(h.resolve, h.reject);
      } catch (k) {
        h.reject(k);
      }
    }
    function c() {
      this.g = null;
    }
    function d(g) {
      return g instanceof b
        ? g
        : new b(function (h) {
            h(g);
          });
    }
    if (a) return a;
    c.prototype.j = function (g) {
      if (null == this.g) {
        this.g = [];
        var h = this;
        this.o(function () {
          h.A();
        });
      }
      this.g.push(g);
    };
    var e = ha.setTimeout;
    c.prototype.o = function (g) {
      e(g, 0);
    };
    c.prototype.A = function () {
      for (; this.g && this.g.length; ) {
        var g = this.g;
        this.g = [];
        for (var h = 0; h < g.length; ++h) {
          var k = g[h];
          g[h] = null;
          try {
            k();
          } catch (l) {
            this.v(l);
          }
        }
      }
      this.g = null;
    };
    c.prototype.v = function (g) {
      this.o(function () {
        throw g;
      });
    };
    b.prototype.v = function () {
      function g(l) {
        return function (p) {
          k || ((k = !0), l.call(h, p));
        };
      }
      var h = this,
        k = !1;
      return { resolve: g(this.K), reject: g(this.A) };
    };
    b.prototype.K = function (g) {
      if (g === this)
        this.A(new TypeError('A Promise cannot resolve to itself'));
      else if (g instanceof b) this.M(g);
      else {
        a: switch (typeof g) {
          case 'object':
            var h = null != g;
            break a;
          case 'function':
            h = !0;
            break a;
          default:
            h = !1;
        }
        h ? this.J(g) : this.C(g);
      }
    };
    b.prototype.J = function (g) {
      var h = void 0;
      try {
        h = g.then;
      } catch (k) {
        this.A(k);
        return;
      }
      'function' == typeof h ? this.N(h, g) : this.C(g);
    };
    b.prototype.A = function (g) {
      this.B(2, g);
    };
    b.prototype.C = function (g) {
      this.B(1, g);
    };
    b.prototype.B = function (g, h) {
      if (0 != this.g)
        throw Error(
          'Cannot settle(' +
            g +
            ', ' +
            h +
            '): Promise already settled in state' +
            this.g,
        );
      this.g = g;
      this.o = h;
      2 === this.g && this.L();
      this.D();
    };
    b.prototype.L = function () {
      var g = this;
      e(function () {
        if (g.G()) {
          var h = ha.console;
          'undefined' !== typeof h && h.error(g.o);
        }
      }, 1);
    };
    b.prototype.G = function () {
      if (this.F) return !1;
      var g = ha.CustomEvent,
        h = ha.Event,
        k = ha.dispatchEvent;
      if ('undefined' === typeof k) return !0;
      'function' === typeof g
        ? (g = new g('unhandledrejection', { cancelable: !0 }))
        : 'function' === typeof h
          ? (g = new h('unhandledrejection', { cancelable: !0 }))
          : ((g = ha.document.createEvent('CustomEvent')),
            g.initCustomEvent('unhandledrejection', !1, !0, g));
      g.promise = this;
      g.reason = this.o;
      return k(g);
    };
    b.prototype.D = function () {
      if (null != this.j) {
        for (var g = 0; g < this.j.length; ++g) f.j(this.j[g]);
        this.j = null;
      }
    };
    var f = new c();
    b.prototype.M = function (g) {
      var h = this.v();
      g.Va(h.resolve, h.reject);
    };
    b.prototype.N = function (g, h) {
      var k = this.v();
      try {
        g.call(h, k.resolve, k.reject);
      } catch (l) {
        k.reject(l);
      }
    };
    b.prototype.then = function (g, h) {
      function k(x, u) {
        return 'function' == typeof x
          ? function (N) {
              try {
                l(x(N));
              } catch (ba) {
                p(ba);
              }
            }
          : u;
      }
      var l,
        p,
        t = new b(function (x, u) {
          l = x;
          p = u;
        });
      this.Va(k(g, l), k(h, p));
      return t;
    };
    b.prototype.catch = function (g) {
      return this.then(void 0, g);
    };
    b.prototype.Va = function (g, h) {
      function k() {
        switch (l.g) {
          case 1:
            g(l.o);
            break;
          case 2:
            h(l.o);
            break;
          default:
            throw Error('Unexpected state: ' + l.g);
        }
      }
      var l = this;
      null == this.j ? f.j(k) : this.j.push(k);
      this.F = !0;
    };
    b.resolve = d;
    b.reject = function (g) {
      return new b(function (h, k) {
        k(g);
      });
    };
    b.race = function (g) {
      return new b(function (h, k) {
        for (var l = la(g), p = l.next(); !p.done; p = l.next())
          d(p.value).Va(h, k);
      });
    };
    b.all = function (g) {
      var h = la(g),
        k = h.next();
      return k.done
        ? d([])
        : new b(function (l, p) {
            function t(N) {
              return function (ba) {
                x[N] = ba;
                u--;
                0 == u && l(x);
              };
            }
            var x = [],
              u = 0;
            do
              x.push(void 0),
                u++,
                d(k.value).Va(t(x.length - 1), p),
                (k = h.next());
            while (!k.done);
          });
    };
    return b;
  });
  ja('Promise.prototype.finally', function (a) {
    return a
      ? a
      : function (b) {
          return this.then(
            function (c) {
              return Promise.resolve(b()).then(function () {
                return c;
              });
            },
            function (c) {
              return Promise.resolve(b()).then(function () {
                throw c;
              });
            },
          );
        };
  });
  ja('Array.prototype.includes', function (a) {
    return a
      ? a
      : function (b, c) {
          var d = this;
          d instanceof String && (d = String(d));
          var e = d.length;
          c = c || 0;
          for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0;
          }
          return !1;
        };
  });
  ja('String.prototype.includes', function (a) {
    return a
      ? a
      : function (b, c) {
          if (null == this)
            throw new TypeError(
              "The 'this' value for String.prototype.includes must not be null or undefined",
            );
          if (b instanceof RegExp)
            throw new TypeError(
              'First argument to String.prototype.includes must not be a regular expression',
            );
          return -1 !== this.indexOf(b, c || 0);
        };
  });
  ja('Set', function (a) {
    function b(c) {
      this.g = new Map();
      if (c) {
        c = la(c);
        for (var d; !(d = c.next()).done; ) this.add(d.value);
      }
      this.size = this.g.size;
    }
    if (
      (function () {
        if (
          !a ||
          'function' != typeof a ||
          !a.prototype.entries ||
          'function' != typeof Object.seal
        )
          return !1;
        try {
          var c = Object.seal({ x: 4 }),
            d = new a(la([c]));
          if (
            !d.has(c) ||
            1 != d.size ||
            d.add(c) != d ||
            1 != d.size ||
            d.add({ x: 4 }) != d ||
            2 != d.size
          )
            return !1;
          var e = d.entries(),
            f = e.next();
          if (f.done || f.value[0] != c || f.value[1] != c) return !1;
          f = e.next();
          return f.done ||
            f.value[0] == c ||
            4 != f.value[0].x ||
            f.value[1] != f.value[0]
            ? !1
            : e.next().done;
        } catch (g) {
          return !1;
        }
      })()
    )
      return a;
    b.prototype.add = function (c) {
      c = 0 === c ? 0 : c;
      this.g.set(c, c);
      this.size = this.g.size;
      return this;
    };
    b.prototype.delete = function (c) {
      c = this.g.delete(c);
      this.size = this.g.size;
      return c;
    };
    b.prototype.clear = function () {
      this.g.clear();
      this.size = 0;
    };
    b.prototype.has = function (c) {
      return this.g.has(c);
    };
    b.prototype.entries = function () {
      return this.g.entries();
    };
    b.prototype.values = function () {
      return this.g.values();
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function (c, d) {
      var e = this;
      this.g.forEach(function (f) {
        return c.call(d, f, f, e);
      });
    };
    return b;
  });
  ja('Object.values', function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b) ua(b, d) && c.push(b[d]);
          return c;
        };
  });
  var wa = wa || {},
    r = this || self;
  function xa(a) {
    a = a.split('.');
    for (var b = r, c = 0; c < a.length; c++)
      if (((b = b[a[c]]), null == b)) return null;
    return b;
  }
  function ya() {}
  function za(a) {
    var b = typeof a;
    b = 'object' != b ? b : a ? (Array.isArray(a) ? 'array' : b) : 'null';
    return 'array' == b || ('object' == b && 'number' == typeof a.length);
  }
  function Aa(a) {
    var b = typeof a;
    return ('object' == b && null != a) || 'function' == b;
  }
  function Ba(a) {
    return (
      (Object.prototype.hasOwnProperty.call(a, Ca) && a[Ca]) || (a[Ca] = ++Ea)
    );
  }
  var Ca = 'closure_uid_' + ((1e9 * Math.random()) >>> 0),
    Ea = 0;
  function Fa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function Ga(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b, e);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function v(a, b, c) {
    Function.prototype.bind &&
    -1 != Function.prototype.bind.toString().indexOf('native code')
      ? (v = Fa)
      : (v = Ga);
    return v.apply(null, arguments);
  }
  function Ha(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  function Ia(a) {
    (0, eval)(a);
  }
  function w(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.fa = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.fd = function (d, e, f) {
      for (
        var g = Array(arguments.length - 2), h = 2;
        h < arguments.length;
        h++
      )
        g[h - 2] = arguments[h];
      return b.prototype[e].apply(d, g);
    };
  }
  function Ja(a) {
    return a;
  }
  function y(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, y);
    else {
      var c = Error().stack;
      c && (this.stack = c);
    }
    a && (this.message = String(a));
    b && (this.Ia = b);
    this.g = !0;
  }
  w(y, Error);
  y.prototype.name = 'CustomError';
  var Ka;
  function La(a, b) {
    return Array.prototype.indexOf.call(a, b, void 0);
  }
  function Ma(a, b, c) {
    Array.prototype.forEach.call(a, b, c);
  }
  function Na(a, b) {
    return Array.prototype.some.call(a, b, void 0);
  }
  function Oa(a) {
    a: {
      var b = Pa;
      for (
        var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0;
        e < c;
        e++
      )
        if (e in d && b.call(void 0, d[e], e, a)) {
          b = e;
          break a;
        }
      b = -1;
    }
    return 0 > b ? null : 'string' === typeof a ? a.charAt(b) : a[b];
  }
  function Qa(a, b) {
    b = La(a, b);
    var c;
    (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
    return c;
  }
  function Ra(a) {
    return Array.prototype.concat.apply([], arguments);
  }
  function Sa(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function Ta(a, b) {
    for (var c = 1; c < arguments.length; c++) {
      var d = arguments[c];
      if (za(d)) {
        var e = a.length || 0,
          f = d.length || 0;
        a.length = e + f;
        for (var g = 0; g < f; g++) a[e + g] = d[g];
      } else a.push(d);
    }
  }
  function Ua(a) {
    for (var b = 0, c = 0, d = {}; c < a.length; ) {
      var e = a[c++],
        f = Aa(e) ? 'o' + Ba(e) : (typeof e).charAt(0) + e;
      Object.prototype.hasOwnProperty.call(d, f) || ((d[f] = !0), (a[b++] = e));
    }
    a.length = b;
  }
  function Va(a, b) {
    if (!za(a) || !za(b) || a.length != b.length) return !1;
    for (var c = a.length, d = Wa, e = 0; e < c; e++)
      if (!d(a[e], b[e])) return !1;
    return !0;
  }
  function Wa(a, b) {
    return a === b;
  }
  function Xa(a) {
    var b = b || 0;
    return function () {
      return a.apply(this, Array.prototype.slice.call(arguments, 0, b));
    };
  }
  function Ya(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a);
  }
  function Za(a) {
    var b = [],
      c = 0,
      d;
    for (d in a) b[c++] = a[d];
    return b;
  }
  function $a(a) {
    var b = [],
      c = 0,
      d;
    for (d in a) b[c++] = d;
    return b;
  }
  function ab(a, b) {
    return null !== a && b in a;
  }
  function bb(a) {
    var b = cb,
      c;
    for (c in b) if (a.call(void 0, b[c], c, b)) return c;
  }
  function db(a) {
    for (var b in a) return !1;
    return !0;
  }
  function eb(a) {
    var b = {},
      c;
    for (c in a) b[c] = a[c];
    return b;
  }
  var fb =
    'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
      ' ',
    );
  function gb(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (var f = 0; f < fb.length; f++)
        (c = fb[f]),
          Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  var hb;
  function ib(a, b) {
    this.g = b === jb ? a : '';
  }
  ib.prototype.Mc = !0;
  ib.prototype.kc = function () {
    return this.g.toString();
  };
  ib.prototype.toString = function () {
    return this.g + '';
  };
  function kb(a) {
    return a instanceof ib && a.constructor === ib
      ? a.g
      : 'type_error:TrustedResourceUrl';
  }
  var jb = {};
  function lb(a, b) {
    return 0 == a.lastIndexOf(b, 0);
  }
  var mb = String.prototype.trim
    ? function (a) {
        return a.trim();
      }
    : function (a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
      };
  function nb(a, b) {
    var c = 0;
    a = mb(String(a)).split('.');
    b = mb(String(b)).split('.');
    for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
      var f = a[e] || '',
        g = b[e] || '';
      do {
        f = /(\d*)(\D*)(.*)/.exec(f) || ['', '', '', ''];
        g = /(\d*)(\D*)(.*)/.exec(g) || ['', '', '', ''];
        if (0 == f[0].length && 0 == g[0].length) break;
        c =
          ob(
            0 == f[1].length ? 0 : parseInt(f[1], 10),
            0 == g[1].length ? 0 : parseInt(g[1], 10),
          ) ||
          ob(0 == f[2].length, 0 == g[2].length) ||
          ob(f[2], g[2]);
        f = f[3];
        g = g[3];
      } while (0 == c);
    }
    return c;
  }
  function ob(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  var pb;
  a: {
    var qb = r.navigator;
    if (qb) {
      var rb = qb.userAgent;
      if (rb) {
        pb = rb;
        break a;
      }
    }
    pb = '';
  }
  function z(a) {
    return -1 != pb.indexOf(a);
  }
  function sb() {
    return z('Firefox') || z('FxiOS');
  }
  function tb() {
    return (z('Chrome') || z('CriOS')) && !z('Edge');
  }
  function ub(a) {
    a: {
      var b = ((a.ownerDocument && a.ownerDocument.defaultView) || r).document;
      if (
        b.querySelector &&
        (b = b.querySelector('script[nonce]')) &&
        (b = b.nonce || b.getAttribute('nonce')) &&
        vb.test(b)
      )
        break a;
      b = '';
    }
    b && a.setAttribute('nonce', b);
  }
  var vb = /^[\w+/_-]+[=]{0,2}$/;
  function wb(a, b) {
    for (
      var c = a.split('%s'),
        d = '',
        e = Array.prototype.slice.call(arguments, 1);
      e.length && 1 < c.length;

    )
      d += c.shift() + e.shift();
    return d + c.join('%s');
  }
  function xb(a) {
    return encodeURIComponent(String(a));
  }
  function yb(a) {
    return decodeURIComponent(a.replace(/\+/g, ' '));
  }
  var zb = String.prototype.repeat
    ? function (a, b) {
        return a.repeat(b);
      }
    : function (a, b) {
        return Array(b + 1).join(a);
      };
  function Ab(a) {
    return Array.prototype.join.call(arguments, '');
  }
  function Bb(a) {
    return a.replace(/(^|[\s]+)([a-z])/g, function (b, c, d) {
      return c + d.toUpperCase();
    });
  }
  function Cb() {
    return z('iPhone') && !z('iPod') && !z('iPad');
  }
  function Db() {
    return Cb() || z('iPad') || z('iPod');
  }
  function Eb() {
    var a = pb;
    if (z('Windows')) {
      var b = /Windows (?:NT|Phone) ([0-9.]+)/;
      b.exec(a);
    } else
      Db()
        ? ((b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/), b.exec(a))
        : z('Macintosh')
          ? ((b = /Mac OS X ([0-9_.]+)/), b.exec(a))
          : -1 != pb.toLowerCase().indexOf('kaios')
            ? ((b = /(?:KaiOS)\/(\S+)/i), b.exec(a))
            : z('Android')
              ? ((b = /Android\s+([^\);]+)(\)|;)/), b.exec(a))
              : z('CrOS') &&
                ((b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/), b.exec(a));
  }
  function Fb(a, b, c, d) {
    d = d ? d(b) : b;
    return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : (a[d] = c(b));
  }
  var Gb = z('Macintosh'),
    Hb = z('Windows'),
    Ib = z('Linux') || z('CrOS'),
    Jb,
    Kb = '',
    Lb = /WebKit\/(\S+)/.exec(pb);
  Lb && (Kb = Lb ? Lb[1] : '');
  Jb = Kb;
  var Mb = {};
  function Nb(a) {
    return Fb(Mb, a, function () {
      return 0 <= nb(Jb, a);
    });
  }
  var Ob = sb(),
    Pb = Cb() || z('iPod'),
    Qb = z('iPad'),
    Rb = z('Android') && !(tb() || sb() || z('Opera') || z('Silk')),
    Sb = tb(),
    Tb =
      z('Safari') &&
      !(
        tb() ||
        z('Coast') ||
        z('Opera') ||
        z('Edge') ||
        z('Edg/') ||
        z('OPR') ||
        sb() ||
        z('Silk') ||
        z('Android')
      ) &&
      !Db();
  var Ub = {},
    Vb = null;
  var Wb = 'function' === typeof Uint8Array;
  function Xb(a) {
    if (Array.isArray(a)) {
      for (var b = Array(a.length), c = 0; c < a.length; c++) {
        var d = a[c];
        null != d && (b[c] = 'object' == typeof d ? Xb(d) : d);
      }
      return b;
    }
    if (Wb && a instanceof Uint8Array) return new Uint8Array(a);
    b = {};
    for (c in a)
      (d = a[c]), null != d && (b[c] = 'object' == typeof d ? Xb(d) : d);
    return b;
  }
  function A() {}
  var Yb;
  function B(a, b, c, d) {
    a.g = null;
    Yb && (b || (b = Yb), (Yb = null));
    var e = a.constructor.messageId,
      f = a.constructor.nd;
    f = e || f;
    b || (b = f ? [e] : []);
    a.v = f ? 0 : -1;
    a.o = b;
    a: {
      e = a.o.length;
      b = -1;
      if (
        e &&
        ((b = e - 1),
        (e = a.o[b]),
        !(
          null === e ||
          'object' != typeof e ||
          Array.isArray(e) ||
          (Wb && e instanceof Uint8Array)
        ))
      ) {
        a.A = b - a.v;
        a.j = e;
        break a;
      }
      -1 < c
        ? ((a.A = Math.max(c, b + 1 - a.v)), (a.j = null))
        : (a.A = Number.MAX_VALUE);
    }
    a.C = {};
    if (d)
      for (c = 0; c < d.length; c++)
        (b = d[c]),
          b < a.A
            ? ((b += a.v), (a.o[b] = a.o[b] || $b))
            : (ac(a), (a.j[b] = a.j[b] || $b));
  }
  var $b = [];
  function ac(a) {
    var b = a.A + a.v;
    a.o[b] || (a.j = a.o[b] = {});
  }
  function C(a, b) {
    if (b < a.A) {
      b += a.v;
      var c = a.o[b];
      return c !== $b ? c : (a.o[b] = []);
    }
    if (a.j) return (c = a.j[b]), c === $b ? (a.j[b] = []) : c;
  }
  function D(a, b) {
    return null != C(a, b);
  }
  function bc(a, b) {
    a = C(a, b);
    return null == a ? a : !!a;
  }
  function cc(a, b, c) {
    a = C(a, b);
    return null == a ? c : a;
  }
  function dc(a, b, c) {
    return cc(a, b, void 0 === c ? 0 : c);
  }
  function ec(a, b, c) {
    return cc(a, b, void 0 === c ? '' : c);
  }
  function E(a, b, c) {
    b < a.A ? (a.o[b + a.v] = c) : (ac(a), (a.j[b] = c));
    return a;
  }
  function F(a, b, c) {
    a.g || (a.g = {});
    if (!a.g[c]) {
      var d = C(a, c);
      d && (a.g[c] = new b(d));
    }
    return a.g[c];
  }
  function fc(a, b, c) {
    a.g || (a.g = {});
    if (!a.g[c]) {
      for (var d = C(a, c), e = [], f = 0; f < d.length; f++)
        e[f] = new b(d[f]);
      a.g[c] = e;
    }
    b = a.g[c];
    b == $b && (b = a.g[c] = []);
    return b;
  }
  function G(a, b, c) {
    a.g || (a.g = {});
    var d = c ? c.ha() : c;
    a.g[b] = c;
    return E(a, b, d);
  }
  function gc(a, b, c) {
    a.g || (a.g = {});
    c = c || [];
    for (var d = [], e = 0; e < c.length; e++) d[e] = c[e].ha();
    a.g[b] = c;
    return E(a, b, d);
  }
  A.prototype.ha = function () {
    if (this.g)
      for (var a in this.g) {
        var b = this.g[a];
        if (Array.isArray(b)) for (var c = 0; c < b.length; c++);
      }
    return this.o;
  };
  A.prototype.R = Wb
    ? function () {
        var a = Uint8Array.prototype.toJSON;
        Uint8Array.prototype.toJSON = function () {
          var b;
          void 0 === b && (b = 0);
          if (!Vb) {
            Vb = {};
            for (
              var c =
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
                    '',
                  ),
                d = ['+/=', '+/', '-_=', '-_.', '-_'],
                e = 0;
              5 > e;
              e++
            ) {
              var f = c.concat(d[e].split(''));
              Ub[e] = f;
              for (var g = 0; g < f.length; g++) {
                var h = f[g];
                void 0 === Vb[h] && (Vb[h] = g);
              }
            }
          }
          b = Ub[b];
          c = [];
          for (d = 0; d < this.length; d += 3) {
            var k = this[d],
              l = (e = d + 1 < this.length) ? this[d + 1] : 0;
            h = (f = d + 2 < this.length) ? this[d + 2] : 0;
            g = k >> 2;
            k = ((k & 3) << 4) | (l >> 4);
            l = ((l & 15) << 2) | (h >> 6);
            h &= 63;
            f || ((h = 64), e || (l = 64));
            c.push(b[g], b[k], b[l] || '', b[h] || '');
          }
          return c.join('');
        };
        try {
          return JSON.stringify(this.o && this.ha(), hc);
        } finally {
          Uint8Array.prototype.toJSON = a;
        }
      }
    : function () {
        return JSON.stringify(this.o && this.ha(), hc);
      };
  function hc(a, b) {
    return 'number' !== typeof b ||
      (!isNaN(b) && Infinity !== b && -Infinity !== b)
      ? b
      : String(b);
  }
  function ic(a, b) {
    Yb = b = b ? JSON.parse(b) : null;
    a = new a(b);
    Yb = null;
    return a;
  }
  A.prototype.toString = function () {
    return this.ha().toString();
  };
  function jc(a, b) {
    ac(a);
    a.g || (a.g = {});
    var c = b.j;
    return b.g
      ? (!a.g[c] && a.j[c] && (a.g[c] = new b.g(a.j[c])), a.g[c])
      : a.j[c];
  }
  function kc(a, b, c) {
    a.g || (a.g = {});
    ac(a);
    var d = b.j;
    b.g ? ((a.g[d] = c), (a.j[d] = c ? c.ha() : c)) : (a.j[d] = c);
  }
  function lc(a) {
    var b = Xb(a.ha());
    Yb = b;
    a = new a.constructor(b);
    Yb = null;
    return a;
  }
  function mc(a) {
    B(this, a, -1, null);
  }
  q(mc, A);
  function nc(a) {
    B(this, a, -1, null);
  }
  q(nc, A);
  function oc(a) {
    B(this, a, -1, pc);
  }
  q(oc, A);
  var pc = [1];
  function qc(a) {
    B(this, a, -1, null);
  }
  q(qc, A);
  function rc(a, b) {
    return E(a, 1, b);
  }
  function tc(a, b) {
    return E(a, 2, b);
  }
  function uc(a) {
    B(this, a, -1, null);
  }
  q(uc, A);
  uc.prototype.getType = function () {
    return ec(this, 1, 'applications_for_file');
  };
  uc.prototype.getData = function () {
    return F(this, oc, 3);
  };
  function vc(a) {
    B(this, a, -1, null);
  }
  q(vc, A);
  function wc(a, b, c, d) {
    this.j = a;
    this.o = b;
    this.g = c;
    this.v = d;
  }
  function xc(a) {
    if (!a) return '';
    a = a.split('#')[0].split('?')[0];
    a = a.toLowerCase();
    0 == a.indexOf('//') && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf('://') + 3),
      c = b.indexOf('/');
    -1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf('://'));
    if (!c) throw Error('URI is missing protocol: ' + a);
    if (
      'http' !== c &&
      'https' !== c &&
      'chrome-extension' !== c &&
      'moz-extension' !== c &&
      'file' !== c &&
      'android-app' !== c &&
      'chrome-search' !== c &&
      'chrome-untrusted' !== c &&
      'chrome' !== c &&
      'app' !== c &&
      'devtools' !== c
    )
      throw Error('Invalid URI scheme in origin: ' + c);
    a = '';
    var d = b.indexOf(':');
    if (-1 != d) {
      var e = b.substring(d + 1);
      b = b.substring(0, d);
      if (('http' === c && '80' !== e) || ('https' === c && '443' !== e))
        a = ':' + e;
    }
    return c + '://' + b + a;
  }
  function yc(a) {
    return Fb(a.prototype, '$$generatedClassName', function () {
      return (
        'Class$obf_' +
        {
          valueOf: function () {
            return ++zc;
          },
        }
      );
    });
  }
  var zc = 1e3;
  function Ac(a, b) {
    this.v = a;
    this.o = b;
    this.j = 0;
    this.g = null;
  }
  Ac.prototype.get = function () {
    if (0 < this.j) {
      this.j--;
      var a = this.g;
      this.g = a.next;
      a.next = null;
    } else a = this.v();
    return a;
  };
  function Bc(a, b) {
    a.o(b);
    100 > a.j && (a.j++, (b.next = a.g), (a.g = b));
  }
  var Cc = [],
    Dc = [],
    Ec = !1;
  function Fc(a) {
    Cc[Cc.length] = a;
    if (Ec) for (var b = 0; b < Dc.length; b++) a(v(Dc[b].g, Dc[b]));
  }
  function Gc(a, b) {
    return a + Math.random() * (b - a);
  }
  function Hc() {
    return Ka || (Ka = new Ic());
  }
  function Jc(a, b) {
    Ya(b, function (c, d) {
      c && 'object' == typeof c && c.Mc && (c = c.kc());
      'style' == d
        ? (a.style.cssText = c)
        : 'class' == d
          ? (a.className = c)
          : 'for' == d
            ? (a.htmlFor = c)
            : Kc.hasOwnProperty(d)
              ? a.setAttribute(Kc[d], c)
              : lb(d, 'aria-') || lb(d, 'data-')
                ? a.setAttribute(d, c)
                : (a[d] = c);
    });
  }
  var Kc = {
    cellpadding: 'cellPadding',
    cellspacing: 'cellSpacing',
    colspan: 'colSpan',
    frameborder: 'frameBorder',
    height: 'height',
    maxlength: 'maxLength',
    nonce: 'nonce',
    role: 'role',
    rowspan: 'rowSpan',
    type: 'type',
    usemap: 'useMap',
    valign: 'vAlign',
    width: 'width',
  };
  function Lc(a, b) {
    b = String(b);
    'application/xhtml+xml' === a.contentType && (b = b.toLowerCase());
    return a.createElement(b);
  }
  function Mc(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null;
  }
  function Ic(a) {
    this.g = a || r.document || document;
  }
  function Nc(a, b) {
    return Lc(a.g, b);
  }
  Ic.prototype.j = Mc;
  var Oc;
  function Pc() {
    var a = r.MessageChannel;
    'undefined' === typeof a &&
      'undefined' !== typeof window &&
      window.postMessage &&
      window.addEventListener &&
      !z('Presto') &&
      (a = function () {
        var e = Lc(document, 'IFRAME');
        e.style.display = 'none';
        document.documentElement.appendChild(e);
        var f = e.contentWindow;
        e = f.document;
        e.open();
        e.close();
        var g = 'callImmediate' + Math.random(),
          h =
            'file:' == f.location.protocol
              ? '*'
              : f.location.protocol + '//' + f.location.host;
        e = v(function (k) {
          if (('*' == h || k.origin == h) && k.data == g)
            this.port1.onmessage();
        }, this);
        f.addEventListener('message', e, !1);
        this.port1 = {};
        this.port2 = {
          postMessage: function () {
            f.postMessage(g, h);
          },
        };
      });
    if ('undefined' !== typeof a && !z('Trident') && !z('MSIE')) {
      var b = new a(),
        c = {},
        d = c;
      b.port1.onmessage = function () {
        if (void 0 !== c.next) {
          c = c.next;
          var e = c.ub;
          c.ub = null;
          e();
        }
      };
      return function (e) {
        d.next = { ub: e };
        d = d.next;
        b.port2.postMessage(0);
      };
    }
    return function (e) {
      r.setTimeout(e, 0);
    };
  }
  function Qc(a) {
    return a;
  }
  Fc(function (a) {
    Qc = a;
  });
  function Rc(a) {
    r.setTimeout(function () {
      throw a;
    }, 0);
  }
  function Sc() {
    this.j = this.g = null;
  }
  Sc.prototype.add = function (a, b) {
    var c = Tc.get();
    c.set(a, b);
    this.j ? (this.j.next = c) : (this.g = c);
    this.j = c;
  };
  function Uc() {
    var a = Vc,
      b = null;
    a.g && ((b = a.g), (a.g = a.g.next), a.g || (a.j = null), (b.next = null));
    return b;
  }
  var Tc = new Ac(
    function () {
      return new Wc();
    },
    function (a) {
      return a.reset();
    },
  );
  function Wc() {
    this.next = this.scope = this.g = null;
  }
  Wc.prototype.set = function (a, b) {
    this.g = a;
    this.scope = b;
    this.next = null;
  };
  Wc.prototype.reset = function () {
    this.next = this.scope = this.g = null;
  };
  function Xc(a, b) {
    Yc || Zc();
    $c || (Yc(), ($c = !0));
    Vc.add(a, b);
  }
  var Yc;
  function Zc() {
    if (r.Promise && r.Promise.resolve) {
      var a = r.Promise.resolve(void 0);
      Yc = function () {
        a.then(ad);
      };
    } else
      Yc = function () {
        var b = ad;
        b = Qc(b);
        'function' !== typeof r.setImmediate ||
        (r.Window &&
          r.Window.prototype &&
          !z('Edge') &&
          r.Window.prototype.setImmediate == r.setImmediate)
          ? (Oc || (Oc = Pc()), Oc(b))
          : r.setImmediate(b);
      };
  }
  var $c = !1,
    Vc = new Sc();
  function ad() {
    for (var a; (a = Uc()); ) {
      try {
        a.g.call(a.scope);
      } catch (b) {
        Rc(b);
      }
      Bc(Tc, a);
    }
    $c = !1;
  }
  function bd(a) {
    if (!a) return !1;
    try {
      return !!a.$goog_Thenable;
    } catch (b) {
      return !1;
    }
  }
  function H(a) {
    this.g = 0;
    this.F = void 0;
    this.v = this.j = this.o = null;
    this.A = this.C = !1;
    if (a != ya)
      try {
        var b = this;
        a.call(
          void 0,
          function (c) {
            dd(b, 2, c);
          },
          function (c) {
            dd(b, 3, c);
          },
        );
      } catch (c) {
        dd(this, 3, c);
      }
  }
  function ed() {
    this.next = this.context = this.j = this.v = this.g = null;
    this.o = !1;
  }
  ed.prototype.reset = function () {
    this.context = this.j = this.v = this.g = null;
    this.o = !1;
  };
  var fd = new Ac(
    function () {
      return new ed();
    },
    function (a) {
      a.reset();
    },
  );
  function gd(a, b, c) {
    var d = fd.get();
    d.v = a;
    d.j = b;
    d.context = c;
    return d;
  }
  function hd(a) {
    if (a instanceof H) return a;
    var b = new H(ya);
    dd(b, 2, a);
    return b;
  }
  function id(a) {
    return new H(function (b, c) {
      c(a);
    });
  }
  function jd(a, b, c) {
    kd(a, b, c, null) || Xc(Ha(b, a));
  }
  function ld(a) {
    return new H(function (b, c) {
      a.length || b(void 0);
      for (var d = 0, e; d < a.length; d++) (e = a[d]), jd(e, b, c);
    });
  }
  function md(a) {
    return new H(function (b, c) {
      var d = a.length,
        e = [];
      if (d)
        for (
          var f = function (l, p) {
              d--;
              e[l] = p;
              0 == d && b(e);
            },
            g = function (l) {
              c(l);
            },
            h = 0,
            k;
          h < a.length;
          h++
        )
          (k = a[h]), jd(k, Ha(f, h), g);
      else b(e);
    });
  }
  function nd(a) {
    return new H(function (b) {
      var c = a.length,
        d = [];
      if (c)
        for (
          var e = function (h, k, l) {
              c--;
              d[h] = k ? { fc: !0, value: l } : { fc: !1, reason: l };
              0 == c && b(d);
            },
            f = 0,
            g;
          f < a.length;
          f++
        )
          (g = a[f]), jd(g, Ha(e, f, !0), Ha(e, f, !1));
      else b(d);
    });
  }
  function od() {
    var a,
      b,
      c = new H(function (d, e) {
        a = d;
        b = e;
      });
    return new pd(c, a, b);
  }
  H.prototype.then = function (a, b, c) {
    return qd(
      this,
      'function' === typeof a ? a : null,
      'function' === typeof b ? b : null,
      c,
    );
  };
  H.prototype.$goog_Thenable = !0;
  function rd(a, b) {
    b = gd(b, b, void 0);
    b.o = !0;
    sd(a, b);
    return a;
  }
  function td(a, b, c) {
    return qd(a, null, b, c);
  }
  H.prototype.cancel = function (a) {
    if (0 == this.g) {
      var b = new ud(a);
      Xc(function () {
        vd(this, b);
      }, this);
    }
  };
  function vd(a, b) {
    if (0 == a.g)
      if (a.o) {
        var c = a.o;
        if (c.j) {
          for (
            var d = 0, e = null, f = null, g = c.j;
            g && (g.o || (d++, g.g == a && (e = g), !(e && 1 < d)));
            g = g.next
          )
            e || (f = g);
          e &&
            (0 == c.g && 1 == d
              ? vd(c, b)
              : (f
                  ? ((d = f),
                    d.next == c.v && (c.v = d),
                    (d.next = d.next.next))
                  : wd(c),
                xd(c, e, 3, b)));
        }
        a.o = null;
      } else dd(a, 3, b);
  }
  function sd(a, b) {
    a.j || (2 != a.g && 3 != a.g) || yd(a);
    a.v ? (a.v.next = b) : (a.j = b);
    a.v = b;
  }
  function qd(a, b, c, d) {
    var e = gd(null, null, null);
    e.g = new H(function (f, g) {
      e.v = b
        ? function (h) {
            try {
              var k = b.call(d, h);
              f(k);
            } catch (l) {
              g(l);
            }
          }
        : f;
      e.j = c
        ? function (h) {
            try {
              var k = c.call(d, h);
              void 0 === k && h instanceof ud ? g(h) : f(k);
            } catch (l) {
              g(l);
            }
          }
        : g;
    });
    e.g.o = a;
    sd(a, e);
    return e.g;
  }
  H.prototype.D = function (a) {
    this.g = 0;
    dd(this, 2, a);
  };
  H.prototype.G = function (a) {
    this.g = 0;
    dd(this, 3, a);
  };
  function dd(a, b, c) {
    0 == a.g &&
      (a === c &&
        ((b = 3), (c = new TypeError('Promise cannot resolve to itself'))),
      (a.g = 1),
      kd(c, a.D, a.G, a) ||
        ((a.F = c),
        (a.g = b),
        (a.o = null),
        yd(a),
        3 != b || c instanceof ud || zd(a, c)));
  }
  function kd(a, b, c, d) {
    if (a instanceof H) return sd(a, gd(b || ya, c || null, d)), !0;
    if (bd(a)) return a.then(b, c, d), !0;
    if (Aa(a))
      try {
        var e = a.then;
        if ('function' === typeof e) return Ad(a, e, b, c, d), !0;
      } catch (f) {
        return c.call(d, f), !0;
      }
    return !1;
  }
  function Ad(a, b, c, d, e) {
    function f(k) {
      h || ((h = !0), d.call(e, k));
    }
    function g(k) {
      h || ((h = !0), c.call(e, k));
    }
    var h = !1;
    try {
      b.call(a, g, f);
    } catch (k) {
      f(k);
    }
  }
  function yd(a) {
    a.C || ((a.C = !0), Xc(a.B, a));
  }
  function wd(a) {
    var b = null;
    a.j && ((b = a.j), (a.j = b.next), (b.next = null));
    a.j || (a.v = null);
    return b;
  }
  H.prototype.B = function () {
    for (var a; (a = wd(this)); ) xd(this, a, this.g, this.F);
    this.C = !1;
  };
  function xd(a, b, c, d) {
    if (3 == c && b.j && !b.o) for (; a && a.A; a = a.o) a.A = !1;
    if (b.g) (b.g.o = null), Bd(b, c, d);
    else
      try {
        b.o ? b.v.call(b.context) : Bd(b, c, d);
      } catch (e) {
        Cd.call(null, e);
      }
    Bc(fd, b);
  }
  function Bd(a, b, c) {
    2 == b ? a.v.call(a.context, c) : a.j && a.j.call(a.context, c);
  }
  function zd(a, b) {
    a.A = !0;
    Xc(function () {
      a.A && Cd.call(null, b);
    });
  }
  var Cd = Rc;
  function ud(a) {
    y.call(this, a);
    this.g = !1;
  }
  w(ud, y);
  ud.prototype.name = 'cancel';
  function pd(a, b, c) {
    this.promise = a;
    this.resolve = b;
    this.reject = c;
  } /*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
  function Dd(a, b) {
    this.A = [];
    this.P = a;
    this.K = b || null;
    this.v = this.g = !1;
    this.o = void 0;
    this.J = this.W = this.F = !1;
    this.C = 0;
    this.j = null;
    this.B = 0;
  }
  n = Dd.prototype;
  n.cancel = function (a) {
    if (this.g) this.o instanceof Dd && this.o.cancel();
    else {
      if (this.j) {
        var b = this.j;
        delete this.j;
        a ? b.cancel(a) : (b.B--, 0 >= b.B && b.cancel());
      }
      this.P ? this.P.call(this.K, this) : (this.J = !0);
      this.g || this.aa(new Ed(this));
    }
  };
  n.wb = function (a, b) {
    this.F = !1;
    Fd(this, a, b);
  };
  function Fd(a, b, c) {
    a.g = !0;
    a.o = c;
    a.v = !b;
    Gd(a);
  }
  function Hd(a) {
    if (a.g) {
      if (!a.J) throw new Id(a);
      a.J = !1;
    }
  }
  n.T = function (a) {
    Hd(this);
    Fd(this, !0, a);
  };
  n.aa = function (a) {
    Hd(this);
    Fd(this, !1, a);
  };
  function Jd(a) {
    throw a;
  }
  function Kd(a, b, c) {
    return a.ba(b, null, c);
  }
  function Ld(a, b) {
    a.ba(null, b, void 0);
  }
  function Md(a, b) {
    return a.ba(b, b, void 0);
  }
  function Nd(a, b, c) {
    a.ba(
      b,
      function (d) {
        var e = b.call(this, d);
        if (void 0 === e) throw d;
        return e;
      },
      c,
    );
  }
  n.ba = function (a, b, c) {
    this.A.push([a, b, c]);
    this.g && Gd(this);
    return this;
  };
  n.then = function (a, b, c) {
    var d,
      e,
      f = new H(function (g, h) {
        e = g;
        d = h;
      });
    this.ba(e, function (g) {
      g instanceof Ed ? f.cancel() : d(g);
    });
    return f.then(a, b, c);
  };
  Dd.prototype.$goog_Thenable = !0;
  function Od(a) {
    return Na(a.A, function (b) {
      return 'function' === typeof b[1];
    });
  }
  function Gd(a) {
    if (a.C && a.g && Od(a)) {
      var b = a.C,
        c = Pd[b];
      c && (r.clearTimeout(c.g), delete Pd[b]);
      a.C = 0;
    }
    a.j && (a.j.B--, delete a.j);
    b = a.o;
    for (var d = (c = !1); a.A.length && !a.F; ) {
      var e = a.A.shift(),
        f = e[0],
        g = e[1];
      e = e[2];
      if ((f = a.v ? g : f))
        try {
          var h = f.call(e || a.K, b);
          void 0 !== h &&
            ((a.v = a.v && (h == b || h instanceof Error)), (a.o = b = h));
          if (
            bd(b) ||
            ('function' === typeof r.Promise && b instanceof r.Promise)
          )
            (d = !0), (a.F = !0);
        } catch (k) {
          (b = k), (a.v = !0), Od(a) || (c = !0);
        }
    }
    a.o = b;
    d &&
      ((h = v(a.wb, a, !0)),
      (d = v(a.wb, a, !1)),
      b instanceof Dd ? (b.ba(h, d), (b.W = !0)) : b.then(h, d));
    c && ((b = new Qd(b)), (Pd[b.g] = b), (a.C = b.g));
  }
  function Rd(a) {
    var b = new Dd();
    b.T(a);
    return b;
  }
  function Sd(a) {
    var b = new Dd();
    a.then(
      function (c) {
        b.T(c);
      },
      function (c) {
        b.aa(c);
      },
    );
    return b;
  }
  function Td(a) {
    var b = new Dd();
    b.aa(a);
    return b;
  }
  function Id() {
    y.call(this);
  }
  w(Id, y);
  Id.prototype.message = 'Deferred has already fired';
  Id.prototype.name = 'AlreadyCalledError';
  function Ed() {
    y.call(this);
  }
  w(Ed, y);
  Ed.prototype.message = 'Deferred was canceled';
  Ed.prototype.name = 'CanceledError';
  function Qd(a) {
    this.g = r.setTimeout(v(this.o, this), 0);
    this.j = a;
  }
  Qd.prototype.o = function () {
    delete Pd[this.g];
    Jd(this.j);
  };
  var Pd = {};
  function I() {}
  I.prototype.ja = function (a) {
    return Ud(this, a);
  };
  I.prototype.Ma = function () {
    return Vd(this);
  };
  I.prototype.toString = function () {
    return (
      K(Wd(Xd(this.constructor))) + '@' + K((this.Ma() >>> 0).toString(16))
    );
  };
  function Yd() {}
  q(Yd, I);
  function Zd(a, b) {
    $d(a);
    a.C = b;
    ae(a);
  }
  Yd.prototype.j = function (a) {
    this.g = a;
    be(this, a);
  };
  function ae(a) {
    a.g instanceof Error &&
      (Error.captureStackTrace
        ? Error.captureStackTrace(a.g)
        : (a.g.stack = Error().stack));
  }
  Yd.prototype.v = m('C');
  Yd.prototype.toString = function () {
    var a = Wd(Xd(this.constructor)),
      b = this.v();
    return null == b ? a : K(a) + ': ' + K(b);
  };
  function ce(a) {
    if (null != a) {
      var b = a.Ub;
      if (null != b) return b;
    }
    a instanceof TypeError
      ? ((b = new de()),
        Zd(b, K(a)),
        ee(b),
        (b.o = a),
        b.j(new TypeError(b)),
        (a = b))
      : ((b = new fe()), Zd(b, K(a)), ee(b), (b.o = a), b.j(Error(b)), (a = b));
    return a;
  }
  function $d(a) {
    a.F = ge([0], Yd, he, Yd.g);
  }
  function he(a) {
    return a instanceof Yd;
  }
  function be(a, b) {
    if (b instanceof Object)
      try {
        (b.Ub = a),
          Object.defineProperties(b, {
            Ia: {
              get: function () {
                return a.A && a.A.g;
              },
            },
          });
      } catch (c) {}
  }
  function ie() {}
  q(ie, Yd);
  function je() {}
  q(je, ie);
  function M(a) {
    var b = new je();
    Zd(b, a);
    b.j(Error(b));
    return b;
  }
  function ke(a, b) {
    $d(this);
    this.A = b;
    this.C = a;
    ae(this);
    this.j(Error(this));
  }
  q(ke, je);
  function le(a) {
    a = new ke(a, null);
    a.j(Error(a));
    return a;
  }
  ke.prototype.v = function () {
    return je.prototype.v.call(this);
  };
  ha.Object.defineProperties(ke.prototype, {
    error: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        var a = Error(),
          b = this.g;
        a.fileName = b.fileName;
        a.lineNumber = b.lineNumber;
        a.columnNumber = b.columnNumber;
        a.message = b.message;
        a.name = b.name;
        a.stack = b.stack;
        a.toSource = b.toSource;
        a.cause = b.Ia;
        for (var c in b) 0 != c.indexOf('__java$') && (a[c] = b[c]);
        return a;
      },
    },
  });
  function Ud(a, b) {
    return Object.is(a, b) || (null == a && null == b);
  }
  function me() {}
  q(me, Yd);
  function ne(a, b) {
    this.j = a | 0;
    this.g = b | 0;
  }
  function oe(a) {
    return 4294967296 * a.g + (a.j >>> 0);
  }
  n = ne.prototype;
  n.toString = function (a) {
    a = a || 10;
    if (2 > a || 36 < a) throw Error('radix out of range: ' + a);
    var b = this.g >> 21;
    if (0 == b || (-1 == b && (0 != this.j || -2097152 != this.g)))
      return (b = oe(this)), 10 == a ? '' + b : b.toString(a);
    b = 14 - (a >> 2);
    var c = Math.pow(a, b),
      d = pe(c, c / 4294967296);
    c = qe(this, d);
    d = Math.abs(oe(this.add(re(se(c, d)))));
    var e = 10 == a ? '' + d : d.toString(a);
    e.length < b && (e = '0000000000000'.substr(e.length - b) + e);
    d = oe(c);
    return (10 == a ? d : d.toString(a)) + e;
  };
  function te(a) {
    return 0 == a.j && 0 == a.g;
  }
  n.ja = function (a) {
    return this.j == a.j && this.g == a.g;
  };
  function ue(a, b) {
    return a.g == b.g
      ? a.j == b.j
        ? 0
        : a.j >>> 0 > b.j >>> 0
          ? 1
          : -1
      : a.g > b.g
        ? 1
        : -1;
  }
  function re(a) {
    var b = (~a.j + 1) | 0;
    return pe(b, (~a.g + !b) | 0);
  }
  n.add = function (a) {
    var b = this.g >>> 16,
      c = this.g & 65535,
      d = this.j >>> 16,
      e = a.g >>> 16,
      f = a.g & 65535,
      g = a.j >>> 16;
    a = (this.j & 65535) + (a.j & 65535);
    g = (a >>> 16) + (d + g);
    d = g >>> 16;
    d += c + f;
    b = ((d >>> 16) + (b + e)) & 65535;
    return pe(((g & 65535) << 16) | (a & 65535), (b << 16) | (d & 65535));
  };
  function se(a, b) {
    if (te(a)) return a;
    if (te(b)) return b;
    var c = a.g >>> 16,
      d = a.g & 65535,
      e = a.j >>> 16;
    a = a.j & 65535;
    var f = b.g >>> 16,
      g = b.g & 65535,
      h = b.j >>> 16;
    b = b.j & 65535;
    var k = a * b;
    var l = (k >>> 16) + e * b;
    var p = l >>> 16;
    l = (l & 65535) + a * h;
    p += l >>> 16;
    p += d * b;
    var t = p >>> 16;
    p = (p & 65535) + e * h;
    t += p >>> 16;
    p = (p & 65535) + a * g;
    t = (t + (p >>> 16) + (c * b + d * h + e * g + a * f)) & 65535;
    return pe(((l & 65535) << 16) | (k & 65535), (t << 16) | (p & 65535));
  }
  function qe(a, b) {
    if (te(b)) throw Error('division by zero');
    if (0 > a.g) {
      if (a.ja(ve)) {
        if (b.ja(we) || b.ja(ye)) return ve;
        if (b.ja(ve)) return we;
        var c = 1;
        if (0 == c) c = a;
        else {
          var d = a.g;
          c =
            32 > c
              ? pe((a.j >>> c) | (d << (32 - c)), d >> c)
              : pe(d >> (c - 32), 0 <= d ? 0 : -1);
        }
        c = qe(c, b);
        d = 1;
        if (0 != d) {
          var e = c.j;
          c =
            32 > d
              ? pe(e << d, (c.g << d) | (e >>> (32 - d)))
              : pe(0, e << (d - 32));
        }
        if (c.ja(ze)) return 0 > b.g ? we : ye;
        a = a.add(re(se(b, c)));
        return c.add(qe(a, b));
      }
      return 0 > b.g ? qe(re(a), re(b)) : re(qe(re(a), b));
    }
    if (te(a)) return ze;
    if (0 > b.g) return b.ja(ve) ? ze : re(qe(a, re(b)));
    for (d = ze; 0 <= ue(a, b); ) {
      c = Math.max(1, Math.floor(oe(a) / oe(b)));
      e = Math.ceil(Math.log(c) / Math.LN2);
      e = 48 >= e ? 1 : Math.pow(2, e - 48);
      for (var f = Ae(c), g = se(f, b); 0 > g.g || 0 < ue(g, a); )
        (c -= e), (f = Ae(c)), (g = se(f, b));
      te(f) && (f = we);
      d = d.add(f);
      a = a.add(re(g));
    }
    return d;
  }
  n.and = function (a) {
    return pe(this.j & a.j, this.g & a.g);
  };
  n.or = function (a) {
    return pe(this.j | a.j, this.g | a.g);
  };
  n.xor = function (a) {
    return pe(this.j ^ a.j, this.g ^ a.g);
  };
  function Ae(a) {
    return 0 < a
      ? 0x7fffffffffffffff <= a
        ? Be
        : new ne(a, a / 4294967296)
      : 0 > a
        ? -9223372036854775808 >= a
          ? ve
          : re(new ne(-a, -a / 4294967296))
        : ze;
  }
  function pe(a, b) {
    return new ne(a, b);
  }
  var ze = pe(0, 0),
    we = pe(1, 0),
    ye = pe(-1, -1),
    Be = pe(4294967295, 2147483647),
    ve = pe(0, 2147483648);
  function Ce() {}
  var De;
  q(Ce, I);
  function Ee() {}
  q(Ee, I);
  function Fe() {}
  q(Fe, je);
  function Ge(a) {
    var b = new Fe();
    Zd(b, a);
    b.j(Error(b));
    return b;
  }
  function fe() {}
  q(fe, je);
  fe.prototype.j = function (a) {
    je.prototype.j.call(this, '__noinit__' === this.o ? a : this.o);
  };
  function ee(a) {
    a.o = '__noinit__';
  }
  function de() {}
  q(de, fe);
  function He(a) {
    switch (typeof a) {
      case 'string':
        for (var b = 0, c = 0; c < a.length; c = (c + 1) | 0)
          b = ((b << 5) - b + a.charCodeAt(c)) | 0;
        return b;
      case 'number':
        return Ie(a);
      case 'boolean':
        return a ? 1231 : 1237;
      default:
        return null == a ? 0 : Vd(a);
    }
  }
  var Je = 0;
  function Vd(a) {
    return (
      a.rb ||
      (Object.defineProperties(a, {
        rb: { value: (Je = (Je + 1) | 0), enumerable: !1 },
      }),
      a.rb)
    );
  }
  function Ke() {}
  function Le() {}
  q(Le, I);
  function Me(a, b) {
    return a.ja ? a.ja(b) : Object.is(a, b);
  }
  function Ne(a) {
    var b = typeof a;
    if ('number' == b) return Xd(Oe);
    if ('boolean' == b) return Xd(Ee);
    if ('string' == b) return Xd(Pe);
    if (Array.isArray(a)) return (a = a.Kb) ? Xd(a.ob, a.ib) : Xd(I, 1);
    if (a instanceof I) return Xd(a.constructor);
    if (a) return Xd('function' == b ? Ke : Le);
    throw new TypeError('null.getClass');
  }
  function Qe() {}
  q(Qe, I);
  Qe.prototype.toString = m('g');
  function Re(a, b) {
    return 'string' == typeof a ? a.charCodeAt(b) : a.g.charCodeAt(b);
  }
  function Se() {}
  q(Se, Qe);
  function Te() {}
  q(Te, je);
  function Ue(a) {
    var b = new Te();
    Zd(b, a);
    b.j(Error(b));
    return b;
  }
  function Ve(a) {
    return 56320 <= a && 57343 >= a;
  }
  function We() {}
  q(We, Te);
  function Oe() {}
  q(Oe, Ce);
  function Ie(a) {
    return Math.max(Math.min(a, 2147483647), -2147483648) | 0;
  }
  function Xe() {}
  q(Xe, me);
  function ge(a, b, c, d) {
    return Ye(a, d, { ob: b, Eb: c, ib: a.length });
  }
  function Ye(a, b, c) {
    var d = a[0];
    if (null == d) return null;
    var e = [];
    c && (e.Kb = c);
    if (1 < a.length) {
      a = a.slice(1);
      c = c && { ob: c.ob, Eb: c.Eb, ib: c.ib - 1 };
      for (var f = 0; f < d; f++) e[f] = Ye(a, b, c);
    } else if (void 0 !== b) for (a = 0; a < d; a++) e[a] = b;
    else e.length = d;
    return e;
  }
  var Ze;
  function $e() {
    $e = aa();
    Ze = ge([256], af, bf, af.g);
  }
  function af() {
    this.g = 0;
  }
  q(af, Ce);
  function cf(a) {
    if (-129 < a && 128 > a) {
      var b = (a + 128) | 0,
        c = ($e(), Ze)[b];
      c || (c = Ze[b] = df(a));
      return c;
    }
    return df(a);
  }
  function df(a) {
    var b = new af();
    b.g = a;
    return b;
  }
  af.prototype.ja = function (a) {
    return bf(a) && a.g == this.g;
  };
  af.prototype.Ma = m('g');
  af.prototype.toString = function () {
    return '' + this.g;
  };
  function bf(a) {
    return a instanceof af;
  }
  function Pe() {}
  q(Pe, I);
  function K(a) {
    return null == a ? 'null' : a.toString();
  }
  function ef(a, b) {
    var c = a.length,
      d,
      e = Re(a, ((d = b), (b = (b + 1) | 0), d)),
      f,
      g;
    55296 <= e && 56319 >= e && b < c && Ve((f = Re(a, b)))
      ? (g = (65536 + ((e & 1023) << 10) + (f & 1023)) | 0)
      : (g = e);
    return g;
  }
  function ff(a, b) {
    return Ud(a, b);
  }
  function gf(a, b) {
    this.g = a;
    this.j = b;
  }
  q(gf, I);
  function Wd(a) {
    if (0 != a.j) {
      for (var b = '', c = 0; c < a.j; c = (c + 1) | 0) b = K(b) + '[';
      a = K(b) + String('L' + K(yc(a.g)) + ';');
    } else a = yc(a.g);
    return a;
  }
  gf.prototype.toString = function () {
    return 'class ' + K(Wd(this));
  };
  function Xd(a, b) {
    var c = b || 0;
    return Fb(a.prototype, '$$class/' + c, function () {
      return new gf(a, c);
    });
  }
  function hf(a) {
    return new H(function (b, c) {
      a.ba(
        function (d) {
          b(d);
        },
        function (d) {
          d || (d = le("XDeferred errback'd without a cause."));
          c(d);
        },
      );
    });
  }
  function jf() {
    this.g = !1;
  }
  q(jf, I);
  jf.prototype.X = function () {
    this.g || ((this.g = !0), this.H());
  };
  jf.prototype.Ba = m('g');
  function kf(a, b) {
    b && !b.Ba() && (a.Ba() ? b.X() : (a.B || (a.B = []), a.B.push(b)));
  }
  jf.prototype.H = function () {
    if (this.B) {
      var a = this.B;
      for (var b = 0; b < a.length; b++) a[b].X();
      this.B.length = 0;
    }
  };
  function lf() {
    this.g = !1;
    this.j = 1;
    this.o = !1;
    this.v = [];
    this.A = [];
  }
  q(lf, jf);
  function mf(a, b) {
    nf(4 != a.j, 'Cannot fire a disposed XDeferred');
    nf(1 == a.j, 'Cannot fire a XDeferred more than once');
    a.F = b;
    of(a, !0);
  }
  function pf(a, b) {
    nf(4 != a.j, 'Cannot fire a disposed XDeferred');
    nf(1 == a.j, 'Cannot fire a XDeferred more than once');
    a.C = b;
    of(a, !1);
  }
  lf.prototype.ba = function (a, b) {
    nf(4 != this.j, 'Cannot add callback to disposed XDeferred');
    nf(
      !this.o,
      'Cannot add callback to XDeferred that is firing its callback/errback queue',
    );
    if (1 != this.j) {
      this.o = !0;
      2 == this.j && a ? a(this.F) : 3 == this.j && b && b(this.C);
      this.o = !1;
      var c = !0;
    } else c = !1;
    c || (a && this.v.push(a), b && this.A.push(b));
  };
  lf.prototype.transform = function (a) {
    var b = new lf();
    this.ba(
      function (c) {
        try {
          var d = a(c);
        } catch (e) {
          e = ce(e);
          pf(b, e);
          return;
        }
        mf(b, d);
      },
      function (c) {
        pf(b, c);
      },
    );
    return b;
  };
  lf.prototype.H = function () {
    this.j = 4;
    this.v.length = 0;
    this.A.length = 0;
    jf.prototype.H.call(this);
  };
  function of(a, b) {
    a.o = !0;
    if (b) {
      a.j = 2;
      b = a.v;
      for (var c = 0; c < b.length; c++) (0, b[c])(a.F);
    } else for (a.j = 3, b = a.A, c = 0; c < b.length; c++) (0, b[c])(a.C);
    a.o = !1;
    a.v.length = 0;
    a.A.length = 0;
  }
  function nf(a, b) {
    if (!a) throw Ge(K(b)).g;
  }
  function qf(a, b) {
    a = K(a);
    if (b)
      for (var c = 0; c < b.length; c = (c + 1) | 0) {
        var d = b,
          e = c;
        var f = b[c];
        if (null == f) var g = 'null';
        else
          try {
            g = f.toString();
          } catch (k) {
            if (((k = ce(k)), k instanceof ie))
              (g = k),
                (f =
                  K(Wd(Ne(f))) +
                  String.fromCharCode(64) +
                  K((He(f) >>> 0).toString(16))),
                (g = '<' + K(f) + ' threw ' + K(Wd(Ne(g))) + '>');
            else throw k.g;
          }
        d[e] = g;
      }
    else b = ['(Object[])null'];
    c = new Se();
    c.g = '';
    for (d = g = 0; d < b.length; ) {
      e = void 0;
      f = a.indexOf('%s', g);
      if (-1 == f) break;
      c.g = K(c.g) + K(K(a).substr(g, (f - g) | 0));
      g = b[((e = d), (d = (d + 1) | 0), e)];
      c.g = K(c.g) + K(g);
      g = (f + 2) | 0;
    }
    c.g = K(c.g) + K(K(a).substr(g, (a.length - g) | 0));
    if (d < b.length) {
      var h;
      c.g = K(c.g) + ' [';
      a = b[((h = d), (d = (d + 1) | 0), h)];
      for (c.g = K(c.g) + K(a); d < b.length; )
        (h = void 0),
          (c.g = K(c.g) + ', '),
          (a = b[((h = d), (d = (d + 1) | 0), h)]),
          (c.g = K(c.g) + K(a));
      c.g = K(c.g) + String.fromCharCode(93);
    }
    return c.toString();
  }
  function rf(a, b) {
    if (null == b)
      for (b = 0; b < a.length; b = (b + 1) | 0) {
        if (null == a[b]) return b;
      }
    else
      for (var c = 0; c < a.length; c = (c + 1) | 0) if (Me(b, a[c])) return c;
    return -1;
  }
  function sf(a, b) {
    for (var c = 0, d = b.length; c < d; c = (c + 1) | 0) a.push(b[c]);
  }
  function tf(a) {
    if (null == a) return 'null';
    var b = typeof a;
    return 'object' === b ? (Array.isArray(a) ? 'array' : b) : b;
  }
  function uf(a, b, c) {
    a[b] = void 0 !== c ? c : null;
  }
  function vf(a) {
    for (var b in a) return !1;
    return !0;
  }
  function wf(a) {
    var b = {},
      c;
    for (c in a) b[c] = a[c];
    return b;
  }
  function xf(a, b, c) {
    a[b] = bf(c) ? c.g : null != c ? c : null;
  }
  function yf(a, b, c) {
    var d = tf(a[c]);
    if (!Ud(d, tf(b[c]))) return !1;
    switch (d) {
      case 'null':
        return !0;
      case 'boolean':
        return a[c] == b[c];
      case 'number':
        return a[c] == b[c];
      case 'string':
        return Ud(a[c], b[c]);
      case 'object':
        return zf(a[c], b[c]);
      case 'array':
        return Af(a[c], b[c]);
      default:
        throw M('Unsupported type ' + K(d) + ' for key ' + K(c)).g;
    }
  }
  function zf(a, b) {
    if (Ud(a, b)) return !0;
    if (!a || !b) return !1;
    var c = Object.keys(a).length,
      d = Object.keys(b).length;
    if (c != d) return !1;
    for (d = 0; d < c; d = (d + 1) | 0) {
      var e = Object.keys(a)[d];
      if (!yf(a, b, e)) return !1;
    }
    return !0;
  }
  function Af(a, b) {
    if (Ud(a, b)) return !0;
    if (!a || !b) return !1;
    var c = a.length;
    if (c != b.length) return !1;
    for (var d = 0; d < c; d = (d + 1) | 0) if (!Bf(a, b, d)) return !1;
    return !0;
  }
  function Bf(a, b, c) {
    var d = tf(a[c]);
    if (!Ud(d, tf(b[c]))) return !1;
    switch (d) {
      case 'null':
        return !0;
      case 'boolean':
        return a[c] == b[c];
      case 'number':
        return a[c] == b[c];
      case 'string':
        return Ud(a[c], b[c]);
      case 'array':
        return Af(a[c], b[c]);
      case 'object':
        return zf(a[c], b[c]);
      default:
        throw M('Unsupported type ' + K(d)).g;
    }
  }
  function Cf() {
    var a = a
      ? a
      : function (c) {
          return Ie(Math.floor(Math.random() * c));
        };
    var b = (a(2147483647) >>> 0).toString(16);
    b = K(Df('0', Math.max(0, (8 - b.length) | 0))) + K(b);
    a = (a(2147483647) >>> 0).toString(16);
    return K(a) + K(b);
  }
  var Df = String.prototype.repeat
    ? function (a, b) {
        return a.repeat(b);
      }
    : function (a, b) {
        return Array(b + 1).join(a);
      };
  function Ef(a, b) {
    return Ff(b) in a;
  }
  function Ff(a) {
    if (null == a)
      throw (
        ((a = new de()),
        Zd(a, "can't identity hash null"),
        ee(a),
        a.j(new TypeError(a)),
        a.g)
      );
    return ':' + He(a);
  }
  function Gf(a) {
    this.g = a;
  }
  q(Gf, I);
  Gf.prototype.getType = m('g');
  var Hf = {
    Xc: 'clientLog',
    Yc: 'docId',
    bd: 'mobile-app-version',
    ed: 'severity',
    Zc: 'isArrayPrototypeIntact',
    dd: 'reportName',
    ad: 'locale',
  };
  function If(a) {
    this.g = a;
  }
  q(If, I);
  If.prototype.info = function (a, b, c) {
    b && null != c
      ? this.g.info(a.g, b, c)
      : b
        ? this.g.info(a.g, b)
        : this.g.info(a.g);
  };
  If.prototype.log = function (a, b, c) {
    b && null != c
      ? this.g.log(a.g, b, c)
      : b
        ? this.g.log(a.g, b)
        : this.g.log(a.g);
  };
  var Jf = 'closure_listenable_' + ((1e6 * Math.random()) | 0);
  function Kf(a) {
    return !(!a || !a[Jf]);
  }
  function Lf() {}
  q(Lf, I);
  Lf.prototype.init = aa();
  Lf.prototype.log = aa();
  var Mf;
  function Nf() {
    Nf = aa();
    Mf = new Of(null);
  }
  function Pf() {
    Pf = aa();
    Qf = Math.floor(-2147483648 * Math.random());
  }
  var Qf = 0;
  function Of(a) {
    this.o = a ? a : Rf();
    this.g = {};
    this.v = new Lf();
    this.j = {};
  }
  q(Of, I);
  Of.prototype.C = function (a, b) {
    a = this.j = b;
    b = [];
    for (var c in a) b.push([c, a[c]]);
  };
  Of.prototype.A = function () {
    return JSON.stringify(this.j);
  };
  function Sf(a, b, c) {
    var d = (Pf(), Qf);
    Qf = (Qf + 1) | 0;
    d = 'goog_' + d;
    var e = O(P(), 'docs-ipmmp'),
      f = new Tf(),
      g = a.o,
      h = e ? (a.o.g ? performance.now() : Date.now()) : Date.now(),
      k = a.F;
    f.j = !1;
    f.A = 0;
    f.J = a;
    f.D = g;
    f.g = h;
    f.G = b;
    f.F = !0 === c;
    f.v = void 0;
    f.C = !1;
    f.B = e;
    f.o = k;
    uf(a.g, d, f);
    return d;
  }
  function Uf(a, b) {
    var c = a.g[b];
    if (c) {
      var d = void 0;
      if (c.j) throw Ge('Timing events should only be completed once').g;
      c.j = !0;
      if (null == d || null == c.v) {
        var e = c.A + (null != c.g ? Vf(c) - c.g : 0);
        c.g = null;
        null == d && (d = c.v);
        c.o && (d = c.o.g(d));
        c.J.v.log(c.G, e, c.F, d, c.C);
      }
      delete a.g[b];
    }
  }
  function Wf(a, b) {
    b in a.g && delete a.g[b];
  }
  Of.prototype.saveInitialLoadStats = Of.prototype.C;
  Of.prototype.getInitialLoadStats = Of.prototype.A;
  function Tf() {
    this.j = this.C = this.B = this.F = !1;
    this.A = 0;
  }
  q(Tf, I);
  Tf.prototype.start = function () {
    if (this.j) throw Ge('Cannot start a completed event.').g;
    if (null != this.g) throw Ge('Event is already in progress').g;
    this.g = Vf(this);
  };
  function Vf(a) {
    return a.B ? (a.D.g ? performance.now() : Date.now()) : Date.now();
  }
  function Xf() {}
  q(Xf, I);
  Xf.prototype.get = function () {
    if (!this.g) {
      var a = r._docs_flag_initialData;
      this.g = a ? a : {};
    }
    return this.g;
  };
  function Yf(a) {
    this.g = new Xf();
    if (a)
      for (var b in a) {
        var c = b,
          d = a[b];
        xf(this.g.get(), c, d);
      }
  }
  q(Yf, I);
  Yf.prototype.get = function (a) {
    return this.g.get()[a];
  };
  function Zf(a, b) {
    a = a.g.get();
    return b in a;
  }
  function O(a, b) {
    a = a.get(b);
    return 'string' == typeof a ? 'true' == a || '1' == a : !!a;
  }
  function $f(a, b) {
    if (!Zf(a, b) || null == a.get(b)) return NaN;
    try {
      var c = K(a.get(b));
      De ||
        (De =
          /^\s*[+-]?(NaN|Infinity|((\d+\.?\d*)|(\.\d+))([eE][+-]?\d+)?[dDfF]?)\s*$/);
      if (!De.test(c)) {
        var d = new We();
        Zd(d, 'For input string: "' + K(c) + '"');
        d.j(Error(d));
        throw d.g;
      }
      return parseFloat(c);
    } catch (e) {
      e = ce(e);
      if (e instanceof We) return NaN;
      throw e.g;
    }
  }
  function Q(a, b) {
    if (!Zf(a, b)) return '';
    a = a.get(b);
    return null == a
      ? ''
      : 'number' === typeof a && Ie(a) == Ie(a)
        ? '' + Ie(a)
        : K(a);
  }
  var ag;
  function P() {
    ag || (ag = new Yf(null));
    return ag;
  }
  function bg() {
    this.g = !1;
  }
  var cg;
  q(bg, I);
  function Rf() {
    dg();
    return cg;
  }
  function eg() {
    dg();
    var a = new bg();
    a.g = 'performance' in r && !!performance.now;
    return a;
  }
  function dg() {
    dg = aa();
    cg = eg();
  }
  function fg(a) {
    B(this, a, -1, gg);
  }
  q(fg, A);
  function hg(a) {
    B(this, a, -1, null);
  }
  q(hg, A);
  var gg = [3, 42];
  function ig(a) {
    this.g = {};
    a || Rf();
  }
  q(ig, I);
  ig.prototype.j = function (a) {
    jg(this, a, Date.now());
    this.v && this.v.g(a);
  };
  ig.prototype.o = function (a, b) {
    a in this.g || uf(this.g, a, 0);
    uf(this.g, a, this.g[a] + b);
  };
  function jg(a, b, c) {
    if (b in a.g) throw M('Field ' + K(b) + ' is already set.').g;
    uf(a.g, b, c);
  }
  ig.prototype.A = function (a) {
    if (!O(P(), 'icso')) {
      if (a) for (var b in a) jg(this, b, a[b]);
      jg(this, 'sldummy', 0);
    }
  };
  ig.prototype.setTime = ig.prototype.j;
  ig.prototype.incrementTime = ig.prototype.o;
  ig.prototype.setServerValues = ig.prototype.A;
  function kg() {
    lg();
  }
  var mg;
  q(kg, I);
  function ng() {
    lg();
    mg || (mg = new ig(null));
    return mg;
  }
  function lg() {
    lg = aa();
    mg = null;
  }
  r._getTimingInstance = ng;
  r._docsTiming = kg;
  function og(a) {
    B(this, a, -1, null);
  }
  q(og, A);
  og.messageId = 'docs.security.access_capabilities';
  function pg() {
    this.g = !1;
  }
  q(pg, jf);
  function qg() {
    this.g = !1;
    this.j = {};
    this.o = null;
  }
  q(qg, pg);
  qg.prototype.H = function () {
    pg.prototype.H.call(this);
    var a = this.j,
      b;
    for (b in a) delete a[b];
    this.o = null;
  };
  function rg(a, b) {
    if (!a.o) {
      var c = a.j,
        d = [],
        e;
      for (e in c) d.push(c[e]);
      a.o = d;
    }
    a = a.o;
    for (c = 0; c < a.length; c = (c + 1) | 0) (0, a[c])(b);
  }
  function R() {
    this.g = !1;
  }
  q(R, jf);
  n = R.prototype;
  n.xb = function (a) {
    if (!(0 <= rf(this.Y(), a.o)))
      throw M(
        'Cannot create operations for an unsupported record type ' + K(a.o),
      ).g;
    return this.Ca(a);
  };
  n.ia = function (a, b) {
    var c = this.ca(a),
      d = [];
    a = new sg(c, a, b, null);
    d.push(a);
    return d;
  };
  n.Ca = function (a) {
    return this.ia(a, null);
  };
  n.ca = function (a) {
    throw M('Key cannot be obtained for record of type ' + K(a.o)).g;
  };
  n.V = function (a) {
    return tg(a) ? 0 <= rf(this.Y(), a.A) : !1;
  };
  function ug(a) {
    this.o = a;
  }
  q(ug, I);
  ug.prototype.getType = m('o');
  function tg(a) {
    a = a.getType();
    return 'update-record' === a || 'delete-record' === a;
  }
  function vg(a, b, c) {
    this.o = a;
    this.F = b;
    this.A = c;
  }
  q(vg, ug);
  function S(a) {
    if (null == a.F)
      throw M('Cannot getKey of operation for singleton record.').g;
    return a.F;
  }
  function wg(a, b) {
    this.g = a;
    this.j = b;
  }
  q(wg, I);
  function xg(a, b) {
    this.o = a;
    this.g = {};
    this.j = {};
    this.C = !0 === b;
    this.v = !this.C;
  }
  q(xg, I);
  xg.prototype.Na = function () {
    return this.C || !vf(this.j);
  };
  function yg(a, b) {
    a = zg(a, b);
    return null == a ? null : a instanceof Array ? a.concat() : wf(a);
  }
  function Cg(a, b) {
    a = Dg(a, b);
    return null == a || 0 == a ? null : a;
  }
  function Dg(a, b) {
    a = zg(a, b);
    return null == a ? null : a;
  }
  function Eg(a, b) {
    a = zg(a, b);
    return null == a ? null : a;
  }
  function Fg(a, b) {
    return null == zg(a, b) ? null : 0 != a.g[b].length;
  }
  function Gg(a, b, c) {
    T(a, b, c ? 'true' : '');
  }
  function Hg(a) {
    a = zg(a, 'docosKeyData');
    return null == a ? null : a.concat();
  }
  function zg(a, b) {
    a = a.g[b];
    return null != a ? a : null;
  }
  function T(a, b, c) {
    if (
      (bf(c) ||
      'string' === typeof c ||
      'number' === typeof c ||
      'boolean' === typeof c
        ? 0
        : Aa(c)) &&
      !Array.isArray(c)
    )
      Ig(c, []),
        (null != a.g[b] && zf(a.g[b], c)) ||
          ((c = wf(c)),
          (a.g[b] = c ? c : null),
          a.v || (a.j[b] = c ? c : null));
    else if (Array.isArray(c))
      O(P(), 'docs-anlpfdo') || Jg(c, []),
        Ig(c, []),
        (null != a.g[b] && Af(a.g[b], c)) ||
          ((c = c.concat()),
          (a.g[b] = c ? c : null),
          a.v || (a.j[b] = c ? c : null));
    else {
      var d = a.g[b];
      (null == d ? null == c : bf(c) ? Me(d, c.g) : Me(d, c)) ||
        (xf(a.g, b, c), a.v || xf(a.j, b, c));
    }
  }
  function Kg(a, b, c, d) {
    Lg(a.g, b, c, d);
    a.v || Lg(a.j, b, c, d);
  }
  function Mg(a, b, c) {
    return (a = zg(a, b)) ? (c in a ? a[c] : null) : null;
  }
  function Lg(a, b, c, d) {
    var e = a[b];
    e = null != e ? e : null;
    if (!e) {
      var f = (e = {});
      a[b] = f ? f : null;
    }
    null == d ? (e[c] = null) : xf(e, c, d);
  }
  xg.prototype.B = function () {
    this.j = {};
    this.C = !1;
  };
  xg.prototype.mb = ca(null);
  function Jg(a, b) {
    b.push(a);
    for (var c = 0; c < a.length; c = (c + 1) | 0)
      if (Array.isArray(a[c])) {
        if (O(P(), 'docs-anlpfdo')) rf(b, a[c]);
        else if (0 <= rf(b, a[c])) throw M('Circular reference detected').g;
        Jg(a[c], b);
      }
    b.pop();
  }
  function Ig(a, b) {
    var c = O(P(), 'docs-anlpfdo');
    b.push(a);
    if (a instanceof Array)
      for (var d = 0; d < a.length; d++) {
        var e = a[d];
        if (null != e) {
          if (c) rf(b, e);
          else if (0 <= rf(b, e)) throw M('Circular reference detected').g;
          Ig(e, b);
        }
      }
    else if (a instanceof Object)
      for (d = Object.keys(a), e = 0; e < d.length; e++) {
        var f = d[e];
        if (null != a[f]) {
          if (c) rf(b, a[f]);
          else if (0 <= rf(b, a[f])) throw M('Circular reference detected').g;
          Ig(a[f], b);
        }
      }
    b.pop();
  }
  function sg(a, b, c, d) {
    vg.call(this, d ? d : 'update-record', a, b.o);
    a = c;
    this.j = b.C;
    this.g = {};
    c = b.j;
    a = a ? a : [];
    for (var e in c) xf(this.g, e, 0 <= rf(a, e) ? zg(b, e) : b.g[e]);
  }
  q(sg, vg);
  function Ng(a) {
    var b = new og();
    a = Og.indexOf(a);
    var c = a >= Og.indexOf(5),
      d = a >= Og.indexOf(4),
      e = a >= Og.indexOf(2),
      f = a >= Og.indexOf(3);
    E(b, 1, a >= Og.indexOf(1));
    E(b, 2, c);
    E(b, 3, d);
    E(b, 4, e);
    E(b, 8, e);
    E(b, 5, f);
    E(b, 7, f);
    E(b, 6, f);
    E(b, 9, e);
    E(b, 10, e);
    E(b, 11, e);
    E(b, 12, e);
    E(b, 13, e);
    E(b, 14, f);
    E(b, 15, f);
    E(b, 17, f);
    E(b, 18, d);
    E(b, 16, !1);
    return b;
  }
  function Pg(a) {
    return !0 === bc(a, 6) && !0 === bc(a, 4)
      ? 3
      : !0 === bc(a, 4)
        ? 2
        : !0 === bc(a, 3)
          ? 4
          : !0 === bc(a, 2)
            ? 5
            : !0 === bc(a, 1)
              ? 1
              : 0;
  }
  function Qg() {
    this.g = !1;
    this.j = ng();
  }
  q(Qg, jf);
  Qg.prototype.qb = function (a, b) {
    for (
      var c = oe(Ae(Date.now())), d = [], e = 0;
      e < a.length;
      e = (e + 1) | 0
    )
      d.push(new Rg(a[e]));
    !0 === b && this.j.o('md', oe(Ae(Date.now())) - c);
    return d;
  };
  function Sg() {
    this.j = !1;
    this.g = [];
  }
  q(Sg, I);
  function Tg(a) {
    var b = a.g;
    a.g = [];
    a.j = !1;
    return b;
  }
  function Ug(a, b, c) {
    xg.call(this, 'document', c);
    this.A = new Sg();
    this.F = new Vg();
    T(this, 'id', a);
    T(this, 'documentType', b);
  }
  var Og = [0, 1, 5, 4, 2, 3];
  q(Ug, xg);
  n = Ug.prototype;
  n.I = function () {
    return this.g.id;
  };
  n.getType = function () {
    return this.g.documentType;
  };
  n.mb = function () {
    var a = 0 == this.A.g.length;
    if (a) return xg.prototype.mb.call(this);
    a = a ? 1 : 2;
    return new wg(this.I(), a);
  };
  function Wg(a) {
    var b = a.getType();
    return new Xg(
      b,
      Eg(a, 'jobset'),
      null == zg(a, 'isFastTrack') ? !1 : 0 != a.g.isFastTrack.length,
    );
  }
  n.Qa = function (a) {
    Gg(this, 'ip', a);
  };
  function Yg(a, b) {
    T(a, 'initialPinSourceApp', b);
  }
  n.Na = function () {
    return xg.prototype.Na.call(this) || 0 != this.A.g.length;
  };
  function Zg(a, b, c) {
    this.o = a;
    this.v = b;
    this.C = c;
  }
  q(Zg, ug);
  function $g(a, b, c, d) {
    Zg.call(this, 'append-commands', a, b);
    this.A = c;
    this.F = d;
  }
  q($g, Zg);
  function ah(a, b) {
    this.g = !1;
    this.cc = a;
    this.Wa = b;
    this.ac = new Qg(this.Wa);
    new bh('mr');
  }
  q(ah, jf);
  ah.prototype.oa = m('cc');
  ah.prototype.qb = function (a, b) {
    return this.ac.qb(a, b);
  };
  ah.prototype.hb = function (a) {
    var b = new Sg(),
      c = a.A,
      d = c.g;
    for (var e = 0; e < d.length; e++) {
      var f = b,
        g = d[e];
      !0 === c.j && ((f.g = []), (f.j = !0));
      f.g.push(g);
      c.j = !1;
    }
    c.g = [];
    if (0 == b.g.length) return [];
    c = b.j;
    return [new $g(a.I(), a.getType(), Tg(b), c)];
  };
  function ch(a, b, c) {
    ke.call(this, 'Local storage error: ' + K(b), null);
    this.type = 0;
    this.type = a;
    this.Ia = c;
    this.j(Error(this));
  }
  q(ch, ke);
  function bh() {
    this.g = !1;
    ng();
  }
  q(bh, jf);
  function Xg(a, b, c) {
    this.o = a;
    this.j = b;
    this.g = c;
  }
  q(Xg, I);
  Xg.prototype.getType = m('o');
  function dh(a) {
    this.g = a;
  }
  q(dh, I);
  function Vg() {}
  q(Vg, I);
  Vg.prototype.R = function (a) {
    return a ? [a.g] : null;
  };
  function eh(a, b, c, d) {
    this.o = 'append-template-commands';
    this.v = a;
    this.C = b;
    this.A = c;
    this.F = d;
  }
  q(eh, ug);
  eh.prototype.oa = m('C');
  function fh(a, b) {
    xg.call(this, 'applicationMetadata', b);
    this.A = !1;
    T(this, 'dt', a);
    this.F = [];
  }
  q(fh, xg);
  fh.prototype.oa = function () {
    return this.g.dt;
  };
  fh.prototype.B = function () {
    xg.prototype.B.call(this);
    this.A = !1;
  };
  fh.prototype.Na = function () {
    return this.A || xg.prototype.Na.call(this);
  };
  var gh = ['c', 'oc', 'ou', 'u'];
  function hh(a, b) {
    ke.call(this, a, b);
    this.j(Error(this));
  }
  q(hh, ke);
  function ih(a, b, c) {
    a.__closure__error__context__984382 ||
      (a.__closure__error__context__984382 = {});
    a.__closure__error__context__984382[b] = c;
  }
  function jh(a) {
    return a.__closure__error__context__984382 || {};
  }
  function kh(a) {
    var b = xa('window.location.href');
    null == a && (a = 'Unknown Error of type "null/undefined"');
    if ('string' === typeof a)
      return {
        message: a,
        name: 'Unknown error',
        lineNumber: 'Not available',
        fileName: b,
        stack: 'Not available',
      };
    var c = !1;
    try {
      var d = a.lineNumber || a.line || 'Not available';
    } catch (f) {
      (d = 'Not available'), (c = !0);
    }
    try {
      var e = a.fileName || a.filename || a.sourceURL || r.$googDebugFname || b;
    } catch (f) {
      (e = 'Not available'), (c = !0);
    }
    b = lh(a);
    if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name))
      return (
        (c = a.message),
        null == c &&
          ((c =
            a.constructor && a.constructor instanceof Function
              ? 'Unknown Error of type "' +
                (a.constructor.name ? a.constructor.name : mh(a.constructor)) +
                '"'
              : 'Unknown Error of unknown type'),
          'function' === typeof a.toString &&
            Object.prototype.toString !== a.toString &&
            (c += ': ' + a.toString())),
        {
          message: c,
          name: a.name || 'UnknownError',
          lineNumber: d,
          fileName: e,
          stack: b || 'Not available',
        }
      );
    a.stack = b;
    return {
      message: a.message,
      name: a.name,
      lineNumber: a.lineNumber,
      fileName: a.fileName,
      stack: a.stack,
    };
  }
  function lh(a, b) {
    b || (b = {});
    b[nh(a)] = !0;
    var c = a.stack || '';
    (a = a.Ia) &&
      !b[nh(a)] &&
      ((c += '\nCaused by: '),
      (a.stack && 0 == a.stack.indexOf(a.toString())) ||
        (c += 'string' === typeof a ? a : a.message + '\n'),
      (c += lh(a, b)));
    return c;
  }
  function nh(a) {
    var b = '';
    'function' === typeof a.toString && (b = '' + a);
    return b + a.stack;
  }
  function oh(a, b) {
    a instanceof Error ||
      ((a = Error(a)),
      Error.captureStackTrace && Error.captureStackTrace(a, oh));
    a.stack || (a.stack = ph(oh));
    if (b) {
      for (var c = 0; a['message' + c]; ) ++c;
      a['message' + c] = String(b);
    }
    return a;
  }
  function qh(a, b) {
    a = oh(a);
    if (b) for (var c in b) ih(a, c, b[c]);
    return a;
  }
  function ph(a) {
    var b = Error();
    if (Error.captureStackTrace)
      Error.captureStackTrace(b, a || ph), (b = String(b.stack));
    else {
      try {
        throw b;
      } catch (c) {
        b = c;
      }
      b = (b = b.stack) ? String(b) : null;
    }
    b || (b = rh(a || arguments.callee.caller, []));
    return b;
  }
  function rh(a, b) {
    var c = [];
    if (0 <= La(b, a)) c.push('[...circular reference...]');
    else if (a && 50 > b.length) {
      c.push(mh(a) + '(');
      for (var d = a.arguments, e = 0; d && e < d.length; e++) {
        0 < e && c.push(', ');
        var f = d[e];
        switch (typeof f) {
          case 'object':
            f = f ? 'object' : 'null';
            break;
          case 'string':
            break;
          case 'number':
            f = String(f);
            break;
          case 'boolean':
            f = f ? 'true' : 'false';
            break;
          case 'function':
            f = (f = mh(f)) ? f : '[fn]';
            break;
          default:
            f = typeof f;
        }
        40 < f.length && (f = f.substr(0, 40) + '...');
        c.push(f);
      }
      b.push(a);
      c.push(')\n');
      try {
        c.push(rh(a.caller, b));
      } catch (g) {
        c.push('[exception trying to get caller]\n');
      }
    } else a ? c.push('[...long stack...]') : c.push('[end]');
    return c.join('');
  }
  function mh(a) {
    if (sh[a]) return sh[a];
    a = String(a);
    if (!sh[a]) {
      var b = /function\s+([^\(]+)/m.exec(a);
      sh[a] = b ? b[1] : '[Anonymous]';
    }
    return sh[a];
  }
  var sh = {};
  function th() {
    this.g = !1;
  }
  q(th, R);
  n = th.prototype;
  n.Y = function () {
    return [];
  };
  n.ia = function () {
    throw M('No operation is supported.').g;
  };
  n.Ca = function (a) {
    return this.ia(a, null);
  };
  n.ca = function () {
    throw M('No record is supported.').g;
  };
  n.V = ca(!1);
  function uh() {
    this.g = !1;
  }
  q(uh, R);
  uh.prototype.Y = function () {
    return ['comment'];
  };
  uh.prototype.ca = function (a) {
    return [a.g.di, a.I()];
  };
  function vh(a) {
    this.g = !1;
    this.kb = a;
  }
  q(vh, R);
  n = vh.prototype;
  n.Y = function () {
    return ['document'];
  };
  n.sa = function (a) {
    var b = this.kb[a];
    if (!b) throw M('No adapter found for this type: ' + K(a)).g;
    return b;
  };
  n.createDocument = function (a, b, c) {
    a = new Ug(a, b, !0, this.kb[b]);
    null == c ||
      (null == Dg(a, 'initialSyncReason') && T(a, 'initialSyncReason', c));
    return a;
  };
  n.V = function (a) {
    var b = a.getType();
    return 'append-commands' === b || 'write-trix' === b
      ? !0
      : R.prototype.V.call(this, a);
  };
  n.ia = function (a) {
    var b = R.prototype.ia.call(
      this,
      a,
      'lastModifiedClientTimestamp lastWarmStartedTimestamp ic odocid relevancyRank rev rai snapshotProtocolNumber snapshotVersionNumber fileLockedReason mimeType resourceKey initialPinSourceApp quotaStatus'.split(
        ' ',
      ),
    );
    a = this.sa(a.getType()).hb(a);
    return b.concat(a);
  };
  n.ca = function (a) {
    return a.I();
  };
  function wh(a) {
    this.g = !1;
    this.bc = a;
  }
  q(wh, R);
  n = wh.prototype;
  n.Y = function () {
    return ['applicationMetadata'];
  };
  n.ca = function (a) {
    return a.oa();
  };
  n.V = function (a) {
    return ff(a.getType(), 'update-application-metadata');
  };
  n.ia = function (a) {
    var b = this.ca(a);
    return [new xh(b, a, a.A ? a.F.slice(0) : null)];
  };
  n.sa = function (a) {
    var b = this.bc[a];
    if (!b) throw M('No adapter found for this type: ' + K(a)).g;
    return b;
  };
  function xh(a, b, c) {
    sg.call(this, a, b, null, 'update-application-metadata');
    this.v = c;
  }
  q(xh, sg);
  function yh() {
    this.g = !1;
  }
  q(yh, R);
  yh.prototype.Y = function () {
    return ['documentEntity'];
  };
  yh.prototype.ca = function (a) {
    return [a.g.documentId, a.getType(), a.I()];
  };
  function zh() {
    this.g = !1;
  }
  q(zh, R);
  zh.prototype.Y = function () {
    return [];
  };
  function Ah(a, b) {
    this.o = 'document-lock';
    this.v = a;
    this.A = b;
  }
  q(Ah, ug);
  function Bh(a, b) {
    hh.call(this, a, null);
    this.o = b;
    this.j(Error(this));
  }
  q(Bh, hh);
  ha.Object.defineProperties(Bh.prototype, {
    type: { configurable: !0, enumerable: !0, get: m('o') },
  });
  function Ch() {
    this.g = !1;
  }
  q(Ch, jf);
  function Dh(a, b, c, d, e) {
    xg.call(this, 'impressionBatch', e);
    T(this, 'di', a);
    T(this, 'dt', b);
    T(this, 'ibt', c);
    T(this, 'iba', d);
  }
  q(Dh, xg);
  function Eh() {
    this.g = !1;
  }
  q(Eh, R);
  Eh.prototype.Y = function () {
    return ['impressionBatch'];
  };
  Eh.prototype.ca = function (a) {
    var b = [];
    b.push(Eg(a, 'di'));
    b.push(a.g.ibt);
    return b;
  };
  Eh.prototype.V = function (a) {
    return (
      R.prototype.V.call(this, a) &&
      ((ff(a.getType(), 'update-record') && a.j) ||
        ff(a.getType(), 'delete-record'))
    );
  };
  function Fh() {
    this.g = !1;
  }
  q(Fh, R);
  Fh.prototype.Y = function () {
    return [];
  };
  function Gh(a, b, c) {
    this.g = a;
    this.changeType = b;
    this.j = c;
  }
  q(Gh, I);
  function Hh(a) {
    this.g = a;
  }
  q(Hh, I);
  function Ih(a) {
    this.o = this.g = !1;
    this.j = a;
    this.v = new qg();
  }
  q(Ih, jf);
  function Jh(a) {
    if (a.o) throw M('Called setWritable on an already writable localstore.').g;
    a.o = !0;
  }
  Ih.prototype.write = function (a, b, c) {
    var d = this;
    if (!this.o) throw M('Cannot write to read-only local store.').g;
    var e = Kh(a);
    a = Lh(this, a);
    0 == a.length
      ? b()
      : Mh(
          this.j,
          a,
          function () {
            rg(d.v, e);
            b();
          },
          c,
        );
  };
  function Kh(a) {
    var b = [];
    for (var c = 0; c < a.length; c++) {
      var d = a[c];
      b.push(new Gh(d, d.C ? 'new' : 'update', d.j));
    }
    return new Hh(b, null);
  }
  function Lh(a, b) {
    var c = [],
      d = null;
    for (var e = 0; e < b.length; e++) {
      var f = b[e];
      if (f.Na()) {
        var g = a.j;
        var h = f.o;
        if ((g = h in g.F ? g.F[h] : null)) {
          g = g.xb(f);
          sf(c, g);
          if ((g = f.mb()) && d) {
            if (!Ud(d.g, g.g))
              throw M('Cannot compare two requirements with different doc id.')
                .g;
            d = d.j > g.j ? d : g;
          } else d = d ? d : g;
          f.B();
        } else throw M('No Capability for record :' + K(f.o)).g;
      }
    }
    d && c.unshift(new Ah(d.g, d.j));
    return c;
  }
  function Nh() {
    this.g = !1;
  }
  q(Nh, R);
  Nh.prototype.Y = function () {
    return [];
  };
  function Oh() {
    this.g = !1;
  }
  q(Oh, R);
  Oh.prototype.Y = function () {
    return ['blobMetadata'];
  };
  Oh.prototype.ia = function (a) {
    return R.prototype.ia.call(this, a, gh);
  };
  Oh.prototype.Ca = function (a) {
    return this.ia(a, null);
  };
  Oh.prototype.ca = function (a) {
    return [a.g.d, a.g.p];
  };
  var Ph = [
    'revisionAccessInfo',
    'unsentBundleMetadata',
    'selection',
    'sentBundlesSavedRevision',
    'snapshotBundleIndex',
  ];
  function Qh(a) {
    return a.g.docId;
  }
  function Rh(a, b) {
    T(a, 'unsentBundleMetadata', b);
  }
  function Sh(a, b, c) {
    this.g = a;
    this.j = b;
    this.o = c;
  }
  q(Sh, I);
  Sh.prototype.R = function () {
    var a = {};
    a.rid = this.g;
    var b = this.j;
    a.sid = null != b ? b : null;
    a.lei = this.o;
    return a;
  };
  function Th(a, b) {
    this.j = a;
    this.g = b;
  }
  q(Th, I);
  Th.prototype.Y = function () {
    return ['pendingQueue'];
  };
  Th.prototype.ca = function (a) {
    return Qh(a);
  };
  Th.prototype.xb = function (a) {
    var b = a.getType();
    var c = this.j[b];
    if (!c) throw M('No document adapter available for type ' + K(b)).g;
    var d = a.J;
    b = [];
    switch (d) {
      case 7:
        d = c;
        b = Qh(a);
        var e = a.F,
          f = a.D;
        c = [];
        for (var g = 0; g < f.length; g++) {
          var h = f[g];
          e = (e + 1) | 0;
          h = Uh(this, h.g(), d, Qh(a), e, !0);
          if (!h) throw M('Unexpected null operation').g;
          c.push(h);
        }
        f = (a.F + c.length) | 0;
        g = a.G ? a.G : [];
        h = [];
        e = [];
        for (var k = 0; k < g.length; k++) {
          var l = g[k];
          var p = l.g();
          if ((p = Uh(this, p, d, b, (f + 1) | 0, null)))
            e.push(p),
              (l = new Sh(l.j(), l.o(), (f + 1) | 0)),
              h.push(l),
              (f = (f + 1) | 0);
        }
        Rh(a, Vh(h));
        d = new Wh(a);
        c.push(d);
        sf(c, e);
        0 <= a.F && c.push(new Xh(b, a.F));
        b = c;
        break;
      case 1:
        d = (a.F + 1) | 0;
        e = Qh(a);
        b = [];
        f = a.K;
        g = a.A ? cf(a.A.g) : null;
        h = a.A ? a.A.j : null;
        if ((k = yg(a, 'unsentBundleMetadata'))) {
          l = [];
          for (p = 0; p < k.length; p = (p + 1) | 0)
            l.push(new Sh(k[p].rid, k[p].sid, k[p].lei));
          k = l;
        } else k = [];
        if (g && null != h) k.push(new Sh(g.g, h, d));
        else {
          if (0 == k.length) throw M('Bundles and metadata do not match!').g;
          g = k[(k.length - 1) | 0];
          k[(k.length - 1) | 0] = new Sh(g.g, g.j, d);
        }
        f && Rh(a, Vh(k));
        vf(a.j) || ((a = new sg(e, a, Ph, null)), b.push(a));
        (a = Uh(this, f, c, e, d, null)) && b.push(a);
        break;
      case 5:
        Rh(a, null);
        a = new Wh(a);
        b.push(a);
        break;
      case 2:
        Rh(a, null);
        a = new Yh(a);
        b.push(a);
        break;
      case 3:
        a = new Zh(a);
        b.push(a);
        break;
      case 4:
        a = new $h(a);
        b.push(a);
        break;
      case 6:
        a = new sg(Qh(a), a, Ph, null);
        b.push(a);
        break;
      default:
        throw M('Unknown Pending Queue operation type: ' + d).g;
    }
    return b;
  };
  function Uh(a, b, c, d, e, f) {
    if (!(!0 === f || (b && 0 != b.length))) return null;
    f = [];
    if (b) {
      var g = [];
      for (var h = 0; h < b.length; h++) {
        var k = c.Wa.R(b[h]);
        f.push(k);
        k = JSON.stringify(k);
        for (var l = [], p = 0; p < k.length; p = (p + 1) | 0) {
          var t = ef(k, p),
            x = !1,
            u = k.charCodeAt(p),
            N = Ve(k.charCodeAt(p));
          55296 <= u && 56319 >= u
            ? (x = !(65536 <= t && 1114111 >= t))
            : N &&
              (0 < p
                ? ((x = ef(k, (p - 1) | 0)),
                  (x = !(65536 <= x && 1114111 >= x)))
                : (x = !0));
          x &&
            ((t = '\\u' + K((t >>> 0).toString(16))),
            (x = ai(k, (p - 1) | 0)),
            (u = ai(k, (p + 1) | 0)),
            l.push(new bi(t, p, k.length, x, u)));
        }
        sf(g, l);
      }
      0 < g.length &&
        ((b = {}),
        (c = '{' + K(g.join('; ')) + '}'),
        (b.command_malformedCharacterContext = null != c ? c : null),
        (a = a.g),
        (c = new ie()),
        Zd(
          c,
          'Serializing commands containing malformed surrogate characters.',
        ),
        c.j(Error(c)),
        a.info(c, b, null));
    }
    return new ci(d, f, e);
  }
  function Vh(a) {
    if (0 == a.length) return null;
    var b = [];
    for (var c = 0; c < a.length; c++) b.push(a[c].R());
    return b;
  }
  function Yh(a) {
    sg.call(this, Qh(a), a, Ph, 'pq-clear');
  }
  q(Yh, sg);
  function $h(a) {
    sg.call(this, Qh(a), a, Ph, 'pq-clear-sent-bundle');
  }
  q($h, sg);
  function Zh(a) {
    sg.call(this, Qh(a), a, Ph, 'pq-clear-sent');
  }
  q(Zh, sg);
  function Xh(a, b) {
    this.o = 'pq-delete-commands';
    this.v = a;
    this.A = b;
  }
  q(Xh, ug);
  function di(a, b, c) {
    this.o = a;
    this.j = b;
    this.g = c;
  }
  q(di, I);
  function Wh(a) {
    sg.call(this, Qh(a), a, Ph, 'pq-mark-sent');
    this.C = !1;
    this.v = [];
    var b = a.F;
    if (7 == a.J) {
      this.C = !0;
      a = a.D;
      for (var c = 0; c < a.length; c++) {
        var d = a[c];
        b = (b + 1) | 0;
        d = new di(d.o(), d.j(), b);
        this.v.push(d);
      }
    } else
      (this.C = !1),
        (b = new di(a.A ? a.A.j : null, (a.A ? cf(a.A.g) : null).g, b)),
        this.v.push(b);
  }
  q(Wh, sg);
  function ci(a, b, c) {
    this.o = 'pq-write-commands';
    this.C = a;
    this.A = b;
    this.v = c;
  }
  q(ci, ug);
  function bi(a, b, c, d, e) {
    this.A = a;
    this.o = b;
    this.v = c;
    this.j = d;
    this.g = e;
  }
  q(bi, I);
  bi.prototype.toString = function () {
    var a =
      'MalformedCharacterContext(unicodeChar: ' +
      K(this.A) +
      ', index: ' +
      this.o +
      ', textLength: ' +
      this.v;
    null != this.j && (a = K(a) + (', prev: ' + K(this.j)));
    null != this.g && (a = K(a) + (', next: ' + K(this.g)));
    return K(a) + ')';
  };
  bi.prototype.ja = function (a) {
    return a instanceof bi && Ud(this.toString(), a.toString());
  };
  bi.prototype.Ma = function () {
    for (
      var a = [this.A, cf(this.o), cf(this.v), this.j, this.g], b = 1, c = 0;
      c < a.length;
      c++
    ) {
      b = Math.imul(31, b);
      var d = a[c];
      null != d ? (d = d.Ma ? d.Ma() : He(d)) : (d = 0);
      b = (b + d) | 0;
    }
    return b;
  };
  function ai(a, b) {
    return 0 > b || b >= a.length
      ? null
      : '\\u' + K((ef(a, b) >>> 0).toString(16));
  }
  function ei(a) {
    this.newVersion = 0;
    this.newVersion = a;
  }
  q(ei, I);
  function fi() {
    this.g = !1;
    this.U = new qg();
    this.F = {};
  }
  q(fi, jf);
  function gi(a, b) {
    var c = b.Y();
    for (var d = 0; d < c.length; d++) {
      var e = c[d];
      if (a.F[e])
        throw M(
          'Record type ' + K(e) + 'already handled by another capability.',
        ).g;
      uf(a.F, e, b);
    }
  }
  fi.prototype.bb = ca(null);
  fi.prototype.tb = ca(null);
  fi.prototype.J = ca(null);
  fi.prototype.sb = ca(null);
  function hi(a, b, c) {
    xg.call(this, a, c);
    T(this, 'dataType', b);
  }
  q(hi, xg);
  function ii(a, b) {
    this.g = a;
    this.j = b;
  }
  q(ii, I);
  ii.prototype.R = function () {
    var a = {},
      b = this.g;
    a.docId = null != b ? b : null;
    b = this.j;
    a.resourceKey = null != b ? b : null;
    return a;
  };
  function ji(a, b) {
    hi.call(this, 'syncHints', ['synchints', '' + b], a);
    T(this, 'docIds', []);
    a = cf(b);
    T(this, 'sourceApp', a);
    T(this, 'docIdentifiers', []);
  }
  q(ji, hi);
  function ki(a, b) {
    for (var c = [], d = 0; d < b.length; d = (d + 1) | 0) c.push(b[d].R());
    T(a, 'docIdentifiers', c);
    T(a, 'docIds', []);
  }
  function li(a, b) {
    var c = [];
    for (var d = 0; d < b.length; d++) {
      var e = c,
        f = b[d];
      bf(f) ? e.push(f.g) : e.push(f);
    }
    T(a, 'docIds', c);
    T(a, 'docIdentifiers', []);
  }
  function mi() {
    this.g = !1;
  }
  q(mi, R);
  mi.prototype.Y = function () {
    return ['syncHints'];
  };
  mi.prototype.ca = function (a) {
    a = Dg(a, 'sourceApp');
    return ['synchints', '' + (null == a ? 0 : Ie(a))];
  };
  mi.prototype.V = function (a) {
    return R.prototype.V.call(this, a) && ff(a.getType(), 'update-record');
  };
  function ni() {
    this.g = !1;
  }
  q(ni, R);
  ni.prototype.Y = function () {
    return ['syncObject'];
  };
  ni.prototype.ca = function (a) {
    a = a.g.keyPath.concat();
    for (var b = [], c = 0; c < a.length; c = (c + 1) | 0) b.push(a[c]);
    return b;
  };
  ni.prototype.V = function (a) {
    return (
      R.prototype.V.call(this, a) && ff(a.getType(), 'update-record') && a.j
    );
  };
  function oi() {
    this.g = !1;
  }
  q(oi, R);
  oi.prototype.Y = function () {
    return ['syncStats'];
  };
  oi.prototype.ca = ca(null);
  oi.prototype.V = function (a) {
    return R.prototype.V.call(this, a) && !ff(a.getType(), 'delete-record');
  };
  function pi(a, b) {
    this.g = !1;
    this.j = a;
    this.o = b;
  }
  q(pi, jf);
  pi.prototype.hb = function (a) {
    var b = Tg(a.A);
    return 0 == b.length ? [] : [new eh(a.I(), a.oa(), b, !0)];
  };
  pi.prototype.oa = m('j');
  function qi(a) {
    this.g = !1;
    this.dc = a;
  }
  q(qi, R);
  n = qi.prototype;
  n.Y = function () {
    return ['templateCreationMetadata', 'templateMetadata'];
  };
  n.ca = function (a) {
    return 'templateCreationMetadata' === a.o ? [a.I()] : [a.I()];
  };
  n.Ca = function (a) {
    var b = R.prototype.Ca.call(this, a);
    'templateCreationMetadata' === a.o &&
      ((a = this.sa(a.oa()).hb(a)), sf(b, a));
    return b;
  };
  n.sa = function (a) {
    var b = this.dc[a];
    if (!b) throw M('No adapter found for this type: ' + K(a)).g;
    return b;
  };
  n.V = function (a) {
    return 'append-template-commands' === a.getType()
      ? !0
      : R.prototype.V.call(this, a);
  };
  function ri(a, b) {
    xg.call(this, 'user', b);
    T(this, 'id', a);
    Gg(this, 'fastTrack', !0);
  }
  q(ri, xg);
  ri.prototype.I = function () {
    return this.g.id;
  };
  function si(a, b) {
    T(a, 'emailAddress', b);
  }
  function ti(a, b) {
    T(a, 'locale', b);
  }
  function ui(a, b) {
    Gg(a, 'fastTrack', b);
  }
  function vi(a, b) {
    Gg(a, 'internal', b);
  }
  function wi() {
    this.g = !1;
  }
  q(wi, R);
  n = wi.prototype;
  n.Y = function () {
    return ['user'];
  };
  function xi(a) {
    var b = new lf();
    yi(
      a,
      function (c) {
        mf(b, c);
      },
      function (c) {
        pf(b, c);
      },
    );
    return b.transform(function (c) {
      if (1 > c.length) throw le('Expected an offline user in localstore').g;
      return c[0];
    });
  }
  n.ia = function (a, b) {
    return R.prototype.ia.call(this, a, b);
  };
  n.Ca = function (a) {
    return this.ia(a, null);
  };
  n.ca = function (a) {
    return a.I();
  };
  n.V = function (a) {
    return R.prototype.V.call(this, a) && !ff(a.getType(), 'delete-record');
  };
  function zi() {
    this.g = !1;
  }
  q(zi, R);
  zi.prototype.Y = function () {
    return ['fontMetadata'];
  };
  zi.prototype.ca = function (a) {
    return a.g.fontFamily;
  };
  zi.prototype.V = function (a) {
    return R.prototype.V.call(this, a)
      ? ff(a.getType(), 'update-record')
        ? a.j
        : !0
      : !1;
  };
  function Rg(a) {
    this.g = 'offline-oc';
    this.j = a;
  }
  q(Rg, Gf);
  function Ai() {}
  q(Ai, I);
  Ai.prototype.R = function (a) {
    if (!ff(a.getType(), 'offline-oc')) throw M('Invalid Type').g;
    return a.j;
  };
  function Bi() {}
  q(Bi, I);
  function Ci() {
    this.g = !1;
    this.j = [];
  }
  q(Ci, jf);
  function Di(a, b, c) {
    a = a.j;
    if (null == c)
      throw ((b = new de()), $d(b), ae(b), ee(b), b.j(new TypeError(b)), b.g);
    if (Ef(b.j, c)) throw Ge(qf('Observer %s previously registered.', [c])).g;
    uf(b.j, Ff(c), c);
    b.o = null;
    var d = new Bi();
    d.g = b;
    d.j = c;
    a.push(d);
  }
  Ci.prototype.H = function () {
    for (var a = this.j.pop(); a; ) {
      if (Ef(a.g.j, a.j)) {
        var b = a.g,
          c = (a = a.j);
        if (!Ef(b.j, c))
          throw Ue(qf('Trying to remove inexistant Observer %s.', [a])).g;
        a = Ff(c);
        delete b.j[a];
        b.o = null;
      }
      a = this.j.pop();
    }
    jf.prototype.H.call(this);
  };
  function Ei() {
    function a() {
      e[0] = 1732584193;
      e[1] = 4023233417;
      e[2] = 2562383102;
      e[3] = 271733878;
      e[4] = 3285377520;
      p = l = 0;
    }
    function b(t) {
      for (var x = g, u = 0; 64 > u; u += 4)
        x[u / 4] = (t[u] << 24) | (t[u + 1] << 16) | (t[u + 2] << 8) | t[u + 3];
      for (u = 16; 80 > u; u++)
        (t = x[u - 3] ^ x[u - 8] ^ x[u - 14] ^ x[u - 16]),
          (x[u] = ((t << 1) | (t >>> 31)) & 4294967295);
      t = e[0];
      var N = e[1],
        ba = e[2],
        J = e[3],
        U = e[4];
      for (u = 0; 80 > u; u++) {
        if (40 > u)
          if (20 > u) {
            var L = J ^ (N & (ba ^ J));
            var Y = 1518500249;
          } else (L = N ^ ba ^ J), (Y = 1859775393);
        else
          60 > u
            ? ((L = (N & ba) | (J & (N | ba))), (Y = 2400959708))
            : ((L = N ^ ba ^ J), (Y = 3395469782));
        L =
          ((((t << 5) | (t >>> 27)) & 4294967295) + L + U + Y + x[u]) &
          4294967295;
        U = J;
        J = ba;
        ba = ((N << 30) | (N >>> 2)) & 4294967295;
        N = t;
        t = L;
      }
      e[0] = (e[0] + t) & 4294967295;
      e[1] = (e[1] + N) & 4294967295;
      e[2] = (e[2] + ba) & 4294967295;
      e[3] = (e[3] + J) & 4294967295;
      e[4] = (e[4] + U) & 4294967295;
    }
    function c(t, x) {
      if ('string' === typeof t) {
        t = unescape(encodeURIComponent(t));
        for (var u = [], N = 0, ba = t.length; N < ba; ++N)
          u.push(t.charCodeAt(N));
        t = u;
      }
      x || (x = t.length);
      u = 0;
      if (0 == l)
        for (; u + 64 < x; ) b(t.slice(u, u + 64)), (u += 64), (p += 64);
      for (; u < x; )
        if (((f[l++] = t[u++]), p++, 64 == l))
          for (l = 0, b(f); u + 64 < x; )
            b(t.slice(u, u + 64)), (u += 64), (p += 64);
    }
    function d() {
      var t = [],
        x = 8 * p;
      56 > l ? c(h, 56 - l) : c(h, 64 - (l - 56));
      for (var u = 63; 56 <= u; u--) (f[u] = x & 255), (x >>>= 8);
      b(f);
      for (u = x = 0; 5 > u; u++)
        for (var N = 24; 0 <= N; N -= 8) t[x++] = (e[u] >> N) & 255;
      return t;
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var l, p;
    a();
    return {
      reset: a,
      update: c,
      digest: d,
      $b: function () {
        for (var t = d(), x = '', u = 0; u < t.length; u++)
          x +=
            '0123456789ABCDEF'.charAt(Math.floor(t[u] / 16)) +
            '0123456789ABCDEF'.charAt(t[u] % 16);
        return x;
      },
    };
  }
  function Fi(a, b, c) {
    var d = String(r.location.href);
    return d && a && b ? [b, Gi(xc(d), a, c || null)].join(' ') : null;
  }
  function Gi(a, b, c) {
    var d = [],
      e = [];
    if (1 == (Array.isArray(c) ? 2 : 1))
      return (
        (e = [b, a]),
        Ma(d, function (h) {
          e.push(h);
        }),
        Hi(e.join(' '))
      );
    var f = [],
      g = [];
    Ma(c, function (h) {
      g.push(h.key);
      f.push(h.value);
    });
    c = Math.floor(new Date().getTime() / 1e3);
    e = 0 == f.length ? [c, b, a] : [f.join(':'), c, b, a];
    Ma(d, function (h) {
      e.push(h);
    });
    a = Hi(e.join(' '));
    a = [c, a];
    0 == g.length || a.push(g.join(''));
    return a.join('_');
  }
  function Hi(a) {
    var b = Ei();
    b.update(a);
    return b.$b().toLowerCase();
  }
  var Ii = {};
  function Ji(a) {
    this.g = a || { cookie: '' };
  }
  Ji.prototype.set = function (a, b, c) {
    var d = !1;
    if ('object' === typeof c) {
      var e = c.sd;
      d = c.secure || !1;
      var f = c.domain || void 0;
      var g = c.path || void 0;
      var h = c.Fb;
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    this.g.cookie =
      a +
      '=' +
      b +
      (f ? ';domain=' + f : '') +
      (g ? ';path=' + g : '') +
      (0 > h
        ? ''
        : 0 == h
          ? ';expires=' + new Date(1970, 1, 1).toUTCString()
          : ';expires=' + new Date(Date.now() + 1e3 * h).toUTCString()) +
      (d ? ';secure' : '') +
      (null != e ? ';samesite=' + e : '');
  };
  Ji.prototype.get = function (a, b) {
    for (
      var c = a + '=', d = (this.g.cookie || '').split(';'), e = 0, f;
      e < d.length;
      e++
    ) {
      f = mb(d[e]);
      if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
      if (f == a) return '';
    }
    return b;
  };
  function Ki(a) {
    var b = Li;
    b.get(a);
    b.set(a, '', { Fb: 0, path: '/', domain: void 0 });
  }
  Ji.prototype.ma = function () {
    return Mi(this).keys;
  };
  Ji.prototype.ka = function () {
    return Mi(this).values;
  };
  function Mi(a) {
    a = (a.g.cookie || '').split(';');
    for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
      (e = mb(a[f])),
        (d = e.indexOf('=')),
        -1 == d
          ? (b.push(''), c.push(e))
          : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    return { keys: b, values: c };
  }
  var Ni = new Ji('undefined' == typeof document ? null : document);
  function Oi(a) {
    return !!Ii.FPA_SAMESITE_PHASE2_MOD || !(void 0 === a || !a);
  }
  function Pi(a, b, c, d) {
    (a = r[a]) || (a = new Ji(document).get(b));
    return a ? Fi(a, c, d) : null;
  }
  function Qi(a, b) {
    b = void 0 === b ? !1 : b;
    var c = xc(String(r.location.href)),
      d = [];
    var e = b;
    e = void 0 === e ? !1 : e;
    var f = r.__SAPISID || r.__APISID || r.__3PSAPISID || r.__OVERRIDE_SID;
    Oi(e) && (f = f || r.__1PSAPISID);
    if (f) e = !0;
    else {
      var g = new Ji(document);
      f =
        g.get('SAPISID') ||
        g.get('APISID') ||
        g.get('__Secure-3PAPISID') ||
        g.get('SID');
      Oi(e) && (f = f || g.get('__Secure-1PAPISID'));
      e = !!f;
    }
    e &&
      ((e = (c =
        0 == c.indexOf('https:') ||
        0 == c.indexOf('chrome-extension:') ||
        0 == c.indexOf('moz-extension:'))
        ? r.__SAPISID
        : r.__APISID),
      e ||
        ((e = new Ji(document)),
        (e = e.get(c ? 'SAPISID' : 'APISID') || e.get('__Secure-3PAPISID'))),
      (e = e ? Fi(e, c ? 'SAPISIDHASH' : 'APISIDHASH', a) : null) && d.push(e),
      c &&
        Oi(b) &&
        ((b = Pi('__1PSAPISID', '__Secure-1PAPISID', 'SAPISID1PHASH', a)) &&
          d.push(b),
        (a = Pi('__3PSAPISID', '__Secure-3PAPISID', 'SAPISID3PHASH', a)) &&
          d.push(a)));
    return 0 == d.length ? null : d.join(' ');
  }
  function Ri(a) {
    var b = {},
      c;
    for (c in a.icons) {
      var d = Sa(a.icons[c]);
      d.sort(Si);
      b[c] = d;
    }
    this.icons = b;
  }
  function Ti(a) {
    this.size = a;
  }
  function Si(a, b) {
    return a.size - b.size;
  }
  function Ui() {
    this.icons = {};
  }
  function Vi(a) {
    this.absoluteScore = a.absoluteScore || 0;
    this.mimeTypeScores = Wi(a.mimeTypeScores || []);
    this.fileExtensionScores = Wi(a.fileExtensionScores || []);
  }
  function Wi(a) {
    var b = {};
    Ma(a, function (c) {
      var d = c.type;
      c = c.score;
      null != d && null != c && (b[d] = c);
    });
    return b;
  }
  function Xi(a) {
    var b, c;
    this.appId = null !== (b = a.id) && void 0 !== b ? b : '';
    this.type = a.type || 'WEB_ONLY';
    this.objectType = a.objectType || '';
    this.installed = a.installed || !1;
    this.removable = a.removable || !1;
    this.authorized = a.authorized || !1;
    this.productUrl = null !== (c = a.productUrl) && void 0 !== c ? c : '';
    this.hasGsmListing = a.hasGsmListing || !1;
    Yi(a.icons);
    this.shortDescription = a.shortDescription || '';
    this.longDescription = a.longDescription || '';
    this.rankingInfo = new Vi(a.rankingInfo || {});
    this.chromeExtensionIds = a.chromeExtensionIds || [];
    this.supportsMobileBrowser = a.supportsMobileBrowser || !1;
    this.supportsTeamDrives = a.supportsTeamDrives || !1;
  }
  function Yi(a) {
    var b = new Ui();
    void 0 !== a &&
      Ma(a, function (c) {
        var d = c.iconUrl;
        if (null != d && 0 < d.length) {
          d = c.category;
          c = c.size;
          var e = b.icons[d];
          e || ((e = []), (b.icons[d] = e));
          e.push(new Ti(c));
        }
      });
    new Ri(b);
  }
  Xi.prototype.I = m('appId');
  Xi.prototype.getType = m('type');
  Xi.prototype.isInstalled = m('installed');
  function Zi(a, b) {
    var c = {};
    c.id = a;
    c.name = b;
    Xi.call(this, c);
  }
  q(Zi, Xi);
  function $i() {
    y.apply(this, arguments);
  }
  q($i, y);
  function aj() {
    y.apply(this, arguments);
  }
  q(aj, y);
  function bj() {
    y.apply(this, arguments);
  }
  q(bj, y);
  function cj() {
    y.apply(this, arguments);
  }
  q(cj, y);
  function dj(a) {
    this.g = a;
    a = this.g.Ea;
    this.o = ec(a, 9, '') || '';
    this.j = dc(a, 8, 0) || 0;
  }
  dj.prototype.Xa = function (a) {
    return this.g
      .fetch(
        a + ',applications_for_file',
        'native_opener/list_apps/' + this.o + '/' + a,
        this.j,
      )
      .then(function (b) {
        return ej(b);
      });
  };
  function ej(a) {
    if (!a) throw new aj('No response from Sync Client');
    if (!a.success) throw Error('Response from Sync Client failed');
    var b = a.data;
    if (!b)
      throw Error('Invalid response from Sync Client: data field missing');
    if (0 == a.reason_code) throw new bj('Sync Client not enabled');
    a = b.applications;
    if (!a || 0 == a.length) throw new aj();
    var c = [],
      d = [];
    a.forEach(function (e) {
      e['default'] ? c.push(e) : d.push(e);
    });
    a = fj(c);
    return { Qc: fj(d), Zb: 0 < a.length ? a[0] : void 0 };
  }
  function fj(a) {
    var b = [];
    a.forEach(function (c) {
      var d = c.application_id;
      if (d) {
        var e = c.icon;
        b.push(
          new Zi(
            d,
            c.name,
            /^[\s\xa0]*$/.test(null == e ? '' : String(e))
              ? void 0
              : 'data:image/png;base64,' + c.icon,
          ),
        );
      }
    });
    return b;
  }
  function gj(a) {
    this.g = a;
    a = this.g.Ea;
    this.o = ec(a, 9, '');
    this.j = dc(a, 8, 0) || 0;
  }
  gj.prototype.Xa = function (a) {
    var b = tc(rc(new qc(), this.o), a);
    return hj(this, '2/' + a, b, this.j).then(function (c) {
      return ij(c);
    });
  };
  function hj(a, b, c, d) {
    (D(c, 1) && C(c, 1)) ||
      Promise.reject(Error('Invalid request: missing required email field'));
    c = 'native_opener/v2/2/' + btoa(c.R());
    return a.g.fetch(b, c, d).then(function (e) {
      if (!e) throw new $i('No response from Sync Client fetch');
      e = new uc(e);
      if (!e) throw new $i('Unable to parse response from Sync Client fetch');
      if (!bc(e, 2)) throw new $i('Sync Client fetch was unsuccessful');
      if (D(e, 3) && 0 == C(e.getData(), 3))
        throw new bj('Unspecified error: Sync Client not enabled');
      if (!D(e, 3)) throw new $i('Expected data field missing');
      e = e.getData();
      if (!e) throw new $i('The data field was unexpectedly empty');
      return e;
    });
  }
  function ij(a) {
    a = fc(a, nc, 1);
    if (!a || 0 == a.length) throw new aj();
    var b = [],
      c = [];
    a.forEach(function (d) {
      var e = C(d, 1);
      e &&
        ((e = new Zi(
          e,
          C(d, 2),
          C(d, 3) ? 'data:image/png;base64,' + C(d, 3) : void 0,
        )),
        bc(d, 4) ? b.push(e) : c.push(e));
    });
    return { Qc: c, Zb: 0 < b.length ? b[0] : void 0 };
  }
  function jj(a) {
    a && 'function' == typeof a.X && a.X();
  }
  function kj(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
      var d = arguments[b];
      za(d) ? kj.apply(null, d) : jj(d);
    }
  }
  function W() {
    this.F = this.F;
    this.C = this.C;
  }
  W.prototype.F = !1;
  W.prototype.Ba = m('F');
  W.prototype.X = function () {
    this.F || ((this.F = !0), this.H());
  };
  function X(a, b) {
    lj(a, Ha(jj, b));
  }
  function lj(a, b, c) {
    a.F
      ? void 0 !== c
        ? b.call(c)
        : b()
      : (a.C || (a.C = []), a.C.push(void 0 !== c ? v(b, c) : b));
  }
  W.prototype.H = function () {
    if (this.C) for (; this.C.length; ) this.C.shift()();
  };
  function mj(a, b) {
    this.type = a;
    this.g = this.target = b;
    this.defaultPrevented = this.j = !1;
  }
  mj.prototype.stopPropagation = function () {
    this.j = !0;
  };
  mj.prototype.o = function () {
    this.defaultPrevented = !0;
  };
  var nj = (function () {
    if (!r.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, 'passive', {
        get: function () {
          a = !0;
        },
      });
    try {
      r.addEventListener('test', ya, b), r.removeEventListener('test', ya, b);
    } catch (c) {}
    return a;
  })();
  function oj(a, b) {
    mj.call(this, a ? a.type : '');
    this.relatedTarget = this.g = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = '';
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = '';
    this.na = null;
    a && this.init(a, b);
  }
  w(oj, mj);
  var pj = { 2: 'touch', 3: 'pen', 4: 'mouse' };
  oj.prototype.init = function (a, b) {
    var c = (this.type = a.type),
      d =
        a.changedTouches && a.changedTouches.length
          ? a.changedTouches[0]
          : null;
    this.target = a.target || a.srcElement;
    this.g = b;
    b = a.relatedTarget;
    b ||
      ('mouseover' == c
        ? (b = a.fromElement)
        : 'mouseout' == c && (b = a.toElement));
    this.relatedTarget = b;
    d
      ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
        (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
        (this.screenX = d.screenX || 0),
        (this.screenY = d.screenY || 0))
      : ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
        (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
        (this.screenX = a.screenX || 0),
        (this.screenY = a.screenY || 0));
    this.button = a.button;
    this.key = a.key || '';
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType =
      'string' === typeof a.pointerType
        ? a.pointerType
        : pj[a.pointerType] || '';
    this.state = a.state;
    this.na = a;
    a.defaultPrevented && oj.fa.o.call(this);
  };
  oj.prototype.stopPropagation = function () {
    oj.fa.stopPropagation.call(this);
    this.na.stopPropagation
      ? this.na.stopPropagation()
      : (this.na.cancelBubble = !0);
  };
  oj.prototype.o = function () {
    oj.fa.o.call(this);
    var a = this.na;
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  };
  var qj = 0;
  function rj(a, b, c, d, e) {
    this.listener = a;
    this.g = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.Za = e;
    this.key = ++qj;
    this.Pa = this.xa = !1;
  }
  function sj(a) {
    a.Pa = !0;
    a.listener = null;
    a.g = null;
    a.src = null;
    a.Za = null;
  }
  function tj(a) {
    this.src = a;
    this.g = {};
    this.j = 0;
  }
  tj.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.g[f];
    a || ((a = this.g[f] = []), this.j++);
    var g = uj(a, b, d, e);
    -1 < g
      ? ((b = a[g]), c || (b.xa = !1))
      : ((b = new rj(b, this.src, f, !!d, e)), (b.xa = c), a.push(b));
    return b;
  };
  function vj(a, b) {
    var c = b.type;
    c in a.g &&
      Qa(a.g[c], b) &&
      (sj(b), 0 == a.g[c].length && (delete a.g[c], a.j--));
  }
  function wj(a, b, c, d, e) {
    a = a.g[b.toString()];
    b = -1;
    a && (b = uj(a, c, d, e));
    return -1 < b ? a[b] : null;
  }
  function uj(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.Pa && f.listener == b && f.capture == !!c && f.Za == d) return e;
    }
    return -1;
  }
  var xj = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    yj = {},
    zj = 0;
  function Aj(a, b, c, d, e) {
    if (d && d.once) return Bj(a, b, c, d, e);
    if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) Aj(a, b[f], c, d, e);
      return null;
    }
    c = Cj(c);
    return Kf(a)
      ? a.j(b, c, Aa(d) ? !!d.capture : !!d, e)
      : Dj(a, b, c, !1, d, e);
  }
  function Dj(a, b, c, d, e, f) {
    if (!b) throw Error('Invalid event type');
    var g = Aa(e) ? !!e.capture : !!e,
      h = Ej(a);
    h || (a[xj] = h = new tj(a));
    c = h.add(b, c, d, g, f);
    if (c.g) return c;
    d = Fj();
    c.g = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener)
      nj || (e = g),
        void 0 === e && (e = !1),
        a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(Gj(b.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error('addEventListener and attachEvent are unavailable.');
    zj++;
    return c;
  }
  function Fj() {
    function a(c) {
      return b.call(a.src, a.listener, c);
    }
    var b = Hj;
    return a;
  }
  function Bj(a, b, c, d, e) {
    if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) Bj(a, b[f], c, d, e);
      return null;
    }
    c = Cj(c);
    return Kf(a)
      ? a.v.add(String(b), c, !0, Aa(d) ? !!d.capture : !!d, e)
      : Dj(a, b, c, !0, d, e);
  }
  function Ij(a, b, c, d, e) {
    if (Array.isArray(b))
      for (var f = 0; f < b.length; f++) Ij(a, b[f], c, d, e);
    else
      (d = Aa(d) ? !!d.capture : !!d),
        (c = Cj(c)),
        Kf(a)
          ? ((a = a.v),
            (b = String(b).toString()),
            b in a.g &&
              ((f = a.g[b]),
              (c = uj(f, c, d, e)),
              -1 < c &&
                (sj(f[c]),
                Array.prototype.splice.call(f, c, 1),
                0 == f.length && (delete a.g[b], a.j--))))
          : a && (a = Ej(a)) && (c = wj(a, b, c, d, e)) && Jj(c);
  }
  function Jj(a) {
    if ('number' !== typeof a && a && !a.Pa) {
      var b = a.src;
      if (Kf(b)) vj(b.v, a);
      else {
        var c = a.type,
          d = a.g;
        b.removeEventListener
          ? b.removeEventListener(c, d, a.capture)
          : b.detachEvent
            ? b.detachEvent(Gj(c), d)
            : b.addListener && b.removeListener && b.removeListener(d);
        zj--;
        (c = Ej(b))
          ? (vj(c, a), 0 == c.j && ((c.src = null), (b[xj] = null)))
          : sj(a);
      }
    }
  }
  function Gj(a) {
    return a in yj ? yj[a] : (yj[a] = 'on' + a);
  }
  function Hj(a, b) {
    if (a.Pa) a = !0;
    else {
      b = new oj(b, this);
      var c = a.listener,
        d = a.Za || a.src;
      a.xa && Jj(a);
      a = c.call(d, b);
    }
    return a;
  }
  function Ej(a) {
    a = a[xj];
    return a instanceof tj ? a : null;
  }
  var Kj = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0);
  function Cj(a) {
    if ('function' === typeof a) return a;
    a[Kj] ||
      (a[Kj] = function (b) {
        return a.handleEvent(b);
      });
    return a[Kj];
  }
  Fc(function (a) {
    Hj = a(Hj);
  });
  function Lj() {
    W.call(this);
    this.v = new tj(this);
    this.Ua = this;
    this.W = null;
  }
  w(Lj, W);
  Lj.prototype[Jf] = !0;
  Lj.prototype.removeEventListener = function (a, b, c, d) {
    Ij(this, a, b, c, d);
  };
  function Mj(a, b) {
    var c = a.W;
    if (c) {
      var d = [];
      for (var e = 1; c; c = c.W) d.push(c), ++e;
    }
    a = a.Ua;
    c = b.type || b;
    'string' === typeof b
      ? (b = new mj(b, a))
      : b instanceof mj
        ? (b.target = b.target || a)
        : ((e = b), (b = new mj(c, a)), gb(b, e));
    e = !0;
    if (d)
      for (var f = d.length - 1; !b.j && 0 <= f; f--) {
        var g = (b.g = d[f]);
        e = Nj(g, c, !0, b) && e;
      }
    b.j ||
      ((g = b.g = a),
      (e = Nj(g, c, !0, b) && e),
      b.j || (e = Nj(g, c, !1, b) && e));
    if (d)
      for (f = 0; !b.j && f < d.length; f++)
        (g = b.g = d[f]), (e = Nj(g, c, !1, b) && e);
  }
  Lj.prototype.H = function () {
    Lj.fa.H.call(this);
    if (this.v) {
      var a = this.v,
        b = 0,
        c;
      for (c in a.g) {
        for (var d = a.g[c], e = 0; e < d.length; e++) ++b, sj(d[e]);
        delete a.g[c];
        a.j--;
      }
    }
    this.W = null;
  };
  Lj.prototype.j = function (a, b, c, d) {
    return this.v.add(String(a), b, !1, c, d);
  };
  function Nj(a, b, c, d) {
    b = a.v.g[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.Pa && g.capture == c) {
        var h = g.listener,
          k = g.Za || g.src;
        g.xa && vj(a.v, g);
        e = !1 !== h.call(k, d) && e;
      }
    }
    return e && !d.defaultPrevented;
  }
  function Oj(a, b) {
    Lj.call(this);
    this.o = a || 1;
    this.g = b || r;
    this.A = v(this.Vc, this);
    this.B = Date.now();
  }
  w(Oj, Lj);
  n = Oj.prototype;
  n.pa = !1;
  n.la = null;
  n.setInterval = function (a) {
    this.o = a;
    this.la && this.pa ? (Pj(this), this.start()) : this.la && Pj(this);
  };
  n.Vc = function () {
    if (this.pa) {
      var a = Date.now() - this.B;
      0 < a && a < 0.8 * this.o
        ? (this.la = this.g.setTimeout(this.A, this.o - a))
        : (this.la && (this.g.clearTimeout(this.la), (this.la = null)),
          Mj(this, 'tick'),
          this.pa && (Pj(this), this.start()));
    }
  };
  n.start = function () {
    this.pa = !0;
    this.la ||
      ((this.la = this.g.setTimeout(this.A, this.o)), (this.B = Date.now()));
  };
  function Pj(a) {
    a.pa = !1;
    a.la && (a.g.clearTimeout(a.la), (a.la = null));
  }
  n.H = function () {
    Oj.fa.H.call(this);
    Pj(this);
    delete this.g;
  };
  function Qj(a, b, c) {
    if ('function' === typeof a) c && (a = v(a, c));
    else if (a && 'function' == typeof a.handleEvent) a = v(a.handleEvent, a);
    else throw Error('Invalid listener argument');
    return 2147483647 < Number(b) ? -1 : r.setTimeout(a, b || 0);
  }
  function Rj(a) {
    r.clearTimeout(a);
  }
  function Sj(a, b) {
    var c = null;
    return td(
      new H(function (d, e) {
        c = Qj(function () {
          d(b);
        }, a);
        -1 == c && e(Error('Failed to schedule timer.'));
      }),
      function (d) {
        Rj(c);
        throw d;
      },
    );
  }
  function Tj(a) {
    this.Ea = a;
    this.o = new Map();
    this.g = null;
  }
  Tj.prototype.j = function () {
    var a = this;
    if (this.g) return Promise.resolve(this.g);
    var b = dc(this.Ea, 8, 0) || 0;
    return this.fetch('version', 'native_opener/version', b).then(function (c) {
      if (!c) throw new bj('Invalid response from Sync Client');
      var d = c.data;
      if (!d) throw Error('Invalid response from Sync Client');
      d = d.full;
      var e;
      (e = !d) ||
        ((d = String(d).toLowerCase()),
        (e = 0 > ('1.18' > d ? -1 : '1.18' == d ? 0 : 1)));
      if (e) throw Error('Upgrade Sync Client. Version must be at least: 1.18');
      c = c.protocol_versions;
      Array.isArray(c) && 0 < c.length ? (a.g = new gj(a)) : (a.g = new dj(a));
      return a.g;
    });
  };
  Tj.prototype.fetch = function (a, b, c) {
    var d = this,
      e = this.o.get(a);
    if (e) return e;
    try {
      if (chrome && chrome.runtime)
        var f = chrome.runtime.connect(
          ec(this.Ea, 5, 'lmjegmlicamnimmfhcmpkclmigmmcbeh'),
          { name: ec(this.Ea, 4, 'com.google.drive.nativeproxy') },
        );
      else return Promise.reject(Error('Browser unable to access extensions'));
    } catch (g) {
      return Promise.reject(new bj(g));
    }
    if (!f)
      return (
        (c = new bj(
          'Unable to get Application Launcher for Drive (by Google) extension',
        )),
        Promise.reject(c)
      );
    e = new Promise(function (g, h) {
      var k = f;
      k.onDisconnect.addListener(function () {
        h(new cj('Drive Client unexpectedly disappeared'));
      });
      k.onMessage.addListener(function (l) {
        g(l);
      });
      k.postMessage(b);
    }).finally(function () {
      var g = f;
      try {
        g.postMessage('quit'), g.disconnect();
      } catch (h) {}
      d.o.get(a) && d.o.delete(a);
    });
    this.o.set(a, e);
    return c ? Promise.race([Sj(c, null), e]) : e;
  };
  function Uj(a) {
    return (a = a.exec(pb)) ? a[1] : '';
  }
  var Vj = (function () {
    if (Ob) return Uj(/Firefox\/([0-9.]+)/);
    if (Sb) return Db() ? Uj(/CriOS\/([0-9.]+)/) : Uj(/Chrome\/([0-9.]+)/);
    if (Tb && !Db()) return Uj(/Version\/([0-9.]+)/);
    if (Pb || Qb) {
      var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(pb);
      if (a) return a[1] + '.' + a[2];
    } else if (Rb)
      return (a = Uj(/Android\s+([0-9.]+)/)) ? a : Uj(/Version\/([0-9.]+)/);
    return '';
  })();
  function Wj(a) {
    this.o = a;
    this.g = Xj(a)
      ? new Tj(a).j()
      : Promise.reject(Error('App launching disallowed'));
  }
  function Xj(a) {
    return Sb
      ? Gb || Hb
        ? 0 <= nb(Vj, 35)
        : z('CrOS') && ec(a, 16, '')
          ? 0 <= nb(Vj, ec(a, 16, ''))
          : Ib && ec(a, 17, '')
            ? 0 <= nb(Vj, ec(a, 17, ''))
            : !1
      : !1;
  }
  Wj.prototype.Xa = function (a) {
    return Xj(this.o)
      ? Sd(
          this.g.then(function (b) {
            return b.Xa(a);
          }),
        )
      : Td(Error('App Launching not allowed.'));
  };
  Wj.prototype.j = m('g');
  var Yj =
    /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
  function Zj(a, b) {
    return a ? (b ? decodeURI(a) : decodeURIComponent(a)) : a;
  }
  function ak(a, b) {
    if (a) {
      a = a.split('&');
      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf('='),
          e = null;
        if (0 <= d) {
          var f = a[c].substring(0, d);
          e = a[c].substring(d + 1);
        } else f = a[c];
        b(f, e ? yb(e) : '');
      }
    }
  }
  function bk(a, b) {
    if (!b) return a;
    var c = a.indexOf('#');
    0 > c && (c = a.length);
    var d = a.indexOf('?');
    if (0 > d || d > c) {
      d = c;
      var e = '';
    } else e = a.substring(d + 1, c);
    a = [a.substr(0, d), e, a.substr(c)];
    c = a[1];
    a[1] = b ? (c ? c + '&' + b : b) : c;
    return a[0] + (a[1] ? '?' + a[1] : '') + a[2];
  }
  function ck(a, b, c) {
    if (Array.isArray(b))
      for (var d = 0; d < b.length; d++) ck(a, String(b[d]), c);
    else null != b && c.push(a + ('' === b ? '' : '=' + xb(b)));
  }
  function dk(a, b) {
    var c = [];
    for (b = b || 0; b < a.length; b += 2) ck(a[b], a[b + 1], c);
    return c.join('&');
  }
  function ek(a) {
    var b = [],
      c;
    for (c in a) ck(c, a[c], b);
    return b.join('&');
  }
  function fk(a, b) {
    var c = 2 == arguments.length ? dk(arguments[1], 0) : dk(arguments, 1);
    return bk(a, c);
  }
  function gk(a, b) {
    b = ek(b);
    return bk(a, b);
  }
  function hk(a, b, c) {
    c = null != c ? '=' + xb(c) : '';
    return bk(a, b + c);
  }
  function ik(a, b, c, d) {
    for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d; ) {
      var f = a.charCodeAt(b - 1);
      if (38 == f || 63 == f)
        if (((f = a.charCodeAt(b + e)), !f || 61 == f || 38 == f || 35 == f))
          return b;
      b += e + 1;
    }
    return -1;
  }
  var jk = /#|$/;
  function kk(a, b) {
    var c = a.search(jk),
      d = ik(a, 0, b, c);
    if (0 > d) return null;
    var e = a.indexOf('&', d);
    if (0 > e || e > c) e = c;
    d += b.length + 1;
    return yb(a.substr(d, e - d));
  }
  var lk = /[?&]($|#)/;
  function mk(a, b) {
    for (var c = a.search(jk), d = 0, e, f = []; 0 <= (e = ik(a, d, b, c)); )
      f.push(a.substring(d, e)), (d = Math.min(a.indexOf('&', e) + 1 || c, c));
    f.push(a.substr(d));
    return f.join('').replace(lk, '$1');
  }
  function nk(a, b) {
    var c = a.length - 1;
    0 <= c && a.indexOf('/', c) == c && (a = a.substr(0, a.length - 1));
    lb(b, '/') && (b = b.substr(1));
    return a + '/' + b;
  }
  function ok() {}
  ok.prototype.R = function (a) {
    var b = [];
    pk(this, a, b);
    return b.join('');
  };
  function pk(a, b, c) {
    if (null == b) c.push('null');
    else {
      if ('object' == typeof b) {
        if (Array.isArray(b)) {
          var d = b;
          b = d.length;
          c.push('[');
          for (var e = '', f = 0; f < b; f++)
            c.push(e), pk(a, d[f], c), (e = ',');
          c.push(']');
          return;
        }
        if (b instanceof String || b instanceof Number || b instanceof Boolean)
          b = b.valueOf();
        else {
          c.push('{');
          e = '';
          for (d in b)
            Object.prototype.hasOwnProperty.call(b, d) &&
              ((f = b[d]),
              'function' != typeof f &&
                (c.push(e), qk(d, c), c.push(':'), pk(a, f, c), (e = ',')));
          c.push('}');
          return;
        }
      }
      switch (typeof b) {
        case 'string':
          qk(b, c);
          break;
        case 'number':
          c.push(isFinite(b) && !isNaN(b) ? String(b) : 'null');
          break;
        case 'boolean':
          c.push(String(b));
          break;
        case 'function':
          c.push('null');
          break;
        default:
          throw Error('Unknown type: ' + typeof b);
      }
    }
  }
  var rk = {
      '"': '\\"',
      '\\': '\\\\',
      '/': '\\/',
      '\b': '\\b',
      '\f': '\\f',
      '\n': '\\n',
      '\r': '\\r',
      '\t': '\\t',
      '\x0B': '\\u000b',
    },
    sk = /\uffff/.test('\uffff')
      ? /[\\"\x00-\x1f\x7f-\uffff]/g
      : /[\\"\x00-\x1f\x7f-\xff]/g;
  function qk(a, b) {
    b.push(
      '"',
      a.replace(sk, function (c) {
        var d = rk[c];
        d ||
          ((d = '\\u' + (c.charCodeAt(0) | 65536).toString(16).substr(1)),
          (rk[c] = d));
        return d;
      }),
      '"',
    );
  }
  function tk(a, b) {
    this.j = {};
    this.g = [];
    this.o = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error('Uneven number of arguments');
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else if (a)
      if (a instanceof tk)
        for (c = a.ma(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
      else for (d in a) this.set(d, a[d]);
  }
  n = tk.prototype;
  n.ka = function () {
    uk(this);
    for (var a = [], b = 0; b < this.g.length; b++) a.push(this.j[this.g[b]]);
    return a;
  };
  n.ma = function () {
    uk(this);
    return this.g.concat();
  };
  n.ja = function (a, b) {
    if (this === a) return !0;
    if (this.o != a.o) return !1;
    b = b || vk;
    uk(this);
    for (var c, d = 0; (c = this.g[d]); d++)
      if (!b(this.get(c), a.get(c))) return !1;
    return !0;
  };
  function vk(a, b) {
    return a === b;
  }
  function uk(a) {
    if (a.o != a.g.length) {
      for (var b = 0, c = 0; b < a.g.length; ) {
        var d = a.g[b];
        wk(a.j, d) && (a.g[c++] = d);
        b++;
      }
      a.g.length = c;
    }
    if (a.o != a.g.length) {
      var e = {};
      for (c = b = 0; b < a.g.length; )
        (d = a.g[b]), wk(e, d) || ((a.g[c++] = d), (e[d] = 1)), b++;
      a.g.length = c;
    }
  }
  n.get = function (a, b) {
    return wk(this.j, a) ? this.j[a] : b;
  };
  n.set = function (a, b) {
    wk(this.j, a) || (this.o++, this.g.push(a));
    this.j[a] = b;
  };
  n.forEach = function (a, b) {
    for (var c = this.ma(), d = 0; d < c.length; d++) {
      var e = c[d],
        f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  function wk(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function xk(a) {
    if (a.ka && 'function' == typeof a.ka) return a.ka();
    if ('string' === typeof a) return a.split('');
    if (za(a)) {
      for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
      return b;
    }
    return Za(a);
  }
  function yk(a, b) {
    if (a.forEach && 'function' == typeof a.forEach) a.forEach(b, void 0);
    else if (za(a) || 'string' === typeof a) Ma(a, b, void 0);
    else {
      if (a.ma && 'function' == typeof a.ma) var c = a.ma();
      else if (a.ka && 'function' == typeof a.ka) c = void 0;
      else if (za(a) || 'string' === typeof a) {
        c = [];
        for (var d = a.length, e = 0; e < d; e++) c.push(e);
      } else c = $a(a);
      d = xk(a);
      e = d.length;
      for (var f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a);
    }
  }
  function zk(a) {
    this.o = this.B = this.j = '';
    this.v = null;
    this.F = this.A = '';
    this.C = !1;
    var b;
    a instanceof zk
      ? ((this.C = a.C),
        Ak(this, a.j),
        (this.B = a.B),
        Bk(this, a.o),
        Ck(this, a.v),
        Dk(this, a.A),
        Ek(this, Fk(a.g)),
        (this.F = a.F))
      : a && (b = String(a).match(Yj))
        ? ((this.C = !1),
          Ak(this, b[1] || '', !0),
          (this.B = Gk(b[2] || '')),
          Bk(this, b[3] || '', !0),
          Ck(this, b[4]),
          Dk(this, b[5] || '', !0),
          Ek(this, b[6] || '', !0),
          (this.F = Gk(b[7] || '')))
        : ((this.C = !1), (this.g = new Hk(null, this.C)));
  }
  zk.prototype.toString = function () {
    var a = [],
      b = this.j;
    b && a.push(Ik(b, Jk, !0), ':');
    var c = this.o;
    if (c || 'file' == b)
      a.push('//'),
        (b = this.B) && a.push(Ik(b, Jk, !0), '@'),
        a.push(xb(c).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        (c = this.v),
        null != c && a.push(':', String(c));
    if ((c = this.A))
      this.o && '/' != c.charAt(0) && a.push('/'),
        a.push(Ik(c, '/' == c.charAt(0) ? Kk : Lk, !0));
    (c = this.g.toString()) && a.push('?', c);
    (c = this.F) && a.push('#', Ik(c, Mk));
    return a.join('');
  };
  zk.prototype.resolve = function (a) {
    var b = new zk(this),
      c = !!a.j;
    c ? Ak(b, a.j) : (c = !!a.B);
    c ? (b.B = a.B) : (c = !!a.o);
    c ? Bk(b, a.o) : (c = null != a.v);
    var d = a.A;
    if (c) Ck(b, a.v);
    else if ((c = !!a.A)) {
      if ('/' != d.charAt(0))
        if (this.o && !this.A) d = '/' + d;
        else {
          var e = b.A.lastIndexOf('/');
          -1 != e && (d = b.A.substr(0, e + 1) + d);
        }
      e = d;
      if ('..' == e || '.' == e) d = '';
      else if (-1 != e.indexOf('./') || -1 != e.indexOf('/.')) {
        d = lb(e, '/');
        e = e.split('/');
        for (var f = [], g = 0; g < e.length; ) {
          var h = e[g++];
          '.' == h
            ? d && g == e.length && f.push('')
            : '..' == h
              ? ((1 < f.length || (1 == f.length && '' != f[0])) && f.pop(),
                d && g == e.length && f.push(''))
              : (f.push(h), (d = !0));
        }
        d = f.join('/');
      } else d = e;
    }
    c ? Dk(b, d) : (c = '' !== a.g.toString());
    c ? Ek(b, Fk(a.g)) : (c = !!a.F);
    c && (b.F = a.F);
    return b;
  };
  function Ak(a, b, c) {
    a.j = c ? Gk(b, !0) : b;
    a.j && (a.j = a.j.replace(/:$/, ''));
    return a;
  }
  function Bk(a, b, c) {
    a.o = c ? Gk(b, !0) : b;
    return a;
  }
  function Ck(a, b) {
    if (b) {
      b = Number(b);
      if (isNaN(b) || 0 > b) throw Error('Bad port number ' + b);
      a.v = b;
    } else a.v = null;
    return a;
  }
  function Dk(a, b, c) {
    a.A = c ? Gk(b, !0) : b;
    return a;
  }
  function Ek(a, b, c) {
    b instanceof Hk
      ? ((a.g = b), Nk(a.g, a.C))
      : (c || (b = Ik(b, Ok)), (a.g = new Hk(b, a.C)));
  }
  function Pk(a, b, c) {
    a.g.set(b, c);
    return a;
  }
  function Qk(a, b, c) {
    Array.isArray(c) || (c = [String(c)]);
    Rk(a.g, b, c);
  }
  function Gk(a, b) {
    return a
      ? b
        ? decodeURI(a.replace(/%25/g, '%2525'))
        : decodeURIComponent(a)
      : '';
  }
  function Ik(a, b, c) {
    return 'string' === typeof a
      ? ((a = encodeURI(a).replace(b, Sk)),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        a)
      : null;
  }
  function Sk(a) {
    a = a.charCodeAt(0);
    return '%' + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
  }
  var Jk = /[#\/\?@]/g,
    Lk = /[#\?:]/g,
    Kk = /[#\?]/g,
    Ok = /[#\?@]/g,
    Mk = /#/g;
  function Hk(a, b) {
    this.j = this.g = null;
    this.o = a || null;
    this.v = !!b;
  }
  function Tk(a) {
    a.g ||
      ((a.g = new tk()),
      (a.j = 0),
      a.o &&
        ak(a.o, function (b, c) {
          a.add(yb(b), c);
        }));
  }
  n = Hk.prototype;
  n.add = function (a, b) {
    Tk(this);
    this.o = null;
    a = Uk(this, a);
    var c = this.g.get(a);
    c || this.g.set(a, (c = []));
    c.push(b);
    this.j = this.j + 1;
    return this;
  };
  function Vk(a, b) {
    Tk(a);
    b = Uk(a, b);
    wk(a.g.j, b) &&
      ((a.o = null),
      (a.j = a.j - a.g.get(b).length),
      (a = a.g),
      wk(a.j, b) && (delete a.j[b], a.o--, a.g.length > 2 * a.o && uk(a)));
  }
  function Wk(a, b) {
    Tk(a);
    b = Uk(a, b);
    return wk(a.g.j, b);
  }
  n.forEach = function (a, b) {
    Tk(this);
    this.g.forEach(function (c, d) {
      Ma(
        c,
        function (e) {
          a.call(b, e, d, this);
        },
        this,
      );
    }, this);
  };
  n.ma = function () {
    Tk(this);
    for (var a = this.g.ka(), b = this.g.ma(), c = [], d = 0; d < b.length; d++)
      for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c;
  };
  n.ka = function (a) {
    Tk(this);
    var b = [];
    if ('string' === typeof a)
      Wk(this, a) && (b = Ra(b, this.g.get(Uk(this, a))));
    else {
      a = this.g.ka();
      for (var c = 0; c < a.length; c++) b = Ra(b, a[c]);
    }
    return b;
  };
  n.set = function (a, b) {
    Tk(this);
    this.o = null;
    a = Uk(this, a);
    Wk(this, a) && (this.j = this.j - this.g.get(a).length);
    this.g.set(a, [b]);
    this.j = this.j + 1;
    return this;
  };
  n.get = function (a, b) {
    if (!a) return b;
    a = this.ka(a);
    return 0 < a.length ? String(a[0]) : b;
  };
  function Rk(a, b, c) {
    Vk(a, b);
    0 < c.length &&
      ((a.o = null), a.g.set(Uk(a, b), Sa(c)), (a.j = a.j + c.length));
  }
  n.toString = function () {
    if (this.o) return this.o;
    if (!this.g) return '';
    for (var a = [], b = this.g.ma(), c = 0; c < b.length; c++) {
      var d = b[c],
        e = xb(d);
      d = this.ka(d);
      for (var f = 0; f < d.length; f++) {
        var g = e;
        '' !== d[f] && (g += '=' + xb(d[f]));
        a.push(g);
      }
    }
    return (this.o = a.join('&'));
  };
  function Fk(a) {
    var b = new Hk();
    b.o = a.o;
    a.g && ((b.g = new tk(a.g)), (b.j = a.j));
    return b;
  }
  function Uk(a, b) {
    b = String(b);
    a.v && (b = b.toLowerCase());
    return b;
  }
  function Nk(a, b) {
    b &&
      !a.v &&
      (Tk(a),
      (a.o = null),
      a.g.forEach(function (c, d) {
        var e = d.toLowerCase();
        d != e && (Vk(this, d), Rk(this, e, c));
      }, a));
    a.v = b;
  }
  function Xk() {
    return Yk('/synctaskworker.js');
  }
  function Zk() {
    return Yk('/taskiframe');
  }
  function $k(a) {
    var b = Q(P(), 'drive-host');
    return al(b, a, !0);
  }
  function bl() {
    var a = new zk(r.location.href);
    return null != a.v ? a.o + ':' + a.v : a.o;
  }
  function Yk(a, b) {
    var c = bl();
    return al(c, '/offline' + a, void 0, b);
  }
  function al(a, b, c, d) {
    a = new zk('//' + a);
    Ak(a, r.location.href.match(Yj)[1] || null);
    Dk(a, b);
    b = Q(P(), 'docs-offline-lsuid');
    Qk(a, 'ouid', b);
    !d && cl() && (c ? Qk(a, 'jsmode', 'DU') : Qk(a, 'Debug', 'true'));
    return a.toString();
  }
  function cl() {
    var a = new zk(r.location.href);
    return (
      'true' == a.g.get('Debug') ||
      'true' == a.g.get('debug') ||
      'pretty' == a.g.get('debug') ||
      'DU' == a.g.get('jsmode')
    );
  }
  function dl(a) {
    W.call(this);
    this.j = a;
  }
  w(dl, W);
  dl.prototype.g = function (a) {
    return fl(this, a);
  };
  function gl(a, b) {
    return (b ? '__wrapper_' : '__protected_') + Ba(a) + '__';
  }
  function fl(a, b) {
    var c = gl(a, !0);
    b[c] || ((b[c] = hl(a, b))[gl(a, !1)] = b);
    return b[c];
  }
  function hl(a, b) {
    function c() {
      if (a.Ba()) return b.apply(this, arguments);
      try {
        return b.apply(this, arguments);
      } catch (e) {
        var d = e;
        if (
          !(
            (d &&
              'object' === typeof d &&
              'string' === typeof d.message &&
              0 == d.message.indexOf('Error in protected function: ')) ||
            ('string' === typeof d &&
              0 == d.indexOf('Error in protected function: '))
          )
        )
          throw (a.j(d), new il(d));
      }
    }
    c[gl(a, !1)] = b;
    return c;
  }
  function jl(a, b) {
    var c = r.window,
      d = c[b];
    c[b] = function (e, f) {
      'string' === typeof e && (e = Ha(Ia, e));
      arguments[0] = e = fl(a, e);
      if (d.apply) return d.apply(this, arguments);
      var g = e;
      if (2 < arguments.length) {
        var h = Array.prototype.slice.call(arguments, 2);
        g = function () {
          e.apply(this, h);
        };
      }
      return d(g, f);
    };
    c[b][gl(a, !1)] = d;
  }
  dl.prototype.H = function () {
    var a = r.window;
    var b = a.setTimeout;
    b = b[gl(this, !1)] || b;
    a.setTimeout = b;
    b = a.setInterval;
    b = b[gl(this, !1)] || b;
    a.setInterval = b;
    dl.fa.H.call(this);
  };
  function il(a) {
    y.call(
      this,
      'Error in protected function: ' +
        (a && a.message ? String(a.message) : String(a)),
    );
    (a = (this.Ia = a) && a.stack) && 'string' === typeof a && (this.stack = a);
  }
  w(il, y);
  function kl() {
    this.g = [];
  }
  var ll;
  function ml(a) {
    var b = nl().g;
    if (b[0]) {
      var c = -1;
      do (c = (c + 1) % 0), a(b[c]);
      while (-1 !== c);
    }
  }
  function nl() {
    ll || (ll = new kl());
    return ll;
  }
  function ol() {}
  ol.prototype.g = null;
  function pl(a) {
    var b;
    (b = a.g) || ((b = {}), ql(a) && ((b[0] = !0), (b[1] = !0)), (b = a.g = b));
    return b;
  }
  var rl;
  function sl() {}
  w(sl, ol);
  function tl(a) {
    return (a = ql(a)) ? new ActiveXObject(a) : new XMLHttpRequest();
  }
  function ql(a) {
    if (
      !a.j &&
      'undefined' == typeof XMLHttpRequest &&
      'undefined' != typeof ActiveXObject
    ) {
      for (
        var b = [
            'MSXML2.XMLHTTP.6.0',
            'MSXML2.XMLHTTP.3.0',
            'MSXML2.XMLHTTP',
            'Microsoft.XMLHTTP',
          ],
          c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c];
        try {
          return new ActiveXObject(d), (a.j = d);
        } catch (e) {}
      }
      throw Error(
        'Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed',
      );
    }
    return a.j;
  }
  rl = new sl();
  function ul(a) {
    Lj.call(this);
    this.headers = new tk();
    this.K = a || null;
    this.g = !1;
    this.J = this.O = null;
    this.D = this.P = '';
    this.o = this.N = this.B = this.M = !1;
    this.A = 0;
    this.G = null;
    this.U = '';
    this.S = this.L = !1;
  }
  w(ul, Lj);
  var vl = /^https?$/i,
    wl = ['POST', 'PUT'],
    xl = [];
  function yl(a, b, c, d, e, f, g) {
    var h = new ul();
    xl.push(h);
    b && h.j('complete', b);
    h.v.add('ready', h.Vb, !0, void 0, void 0);
    f && (h.A = Math.max(0, f));
    g && (h.L = g);
    h.send(a, c, d, e);
  }
  n = ul.prototype;
  n.Vb = function () {
    this.X();
    Qa(xl, this);
  };
  n.send = function (a, b, c, d) {
    if (this.O)
      throw Error(
        '[goog.net.XhrIo] Object is active with another request=' +
          this.P +
          '; newUri=' +
          a,
      );
    b = b ? b.toUpperCase() : 'GET';
    this.P = a;
    this.D = '';
    this.M = !1;
    this.g = !0;
    this.O = this.K ? tl(this.K) : tl(rl);
    this.J = this.K ? pl(this.K) : pl(rl);
    this.O.onreadystatechange = v(this.Gb, this);
    try {
      (this.N = !0), this.O.open(b, String(a), !0), (this.N = !1);
    } catch (f) {
      zl(this, f);
      return;
    }
    a = c || '';
    var e = new tk(this.headers);
    d &&
      yk(d, function (f, g) {
        e.set(g, f);
      });
    d = Oa(e.ma());
    c = r.FormData && a instanceof r.FormData;
    !(0 <= La(wl, b)) ||
      d ||
      c ||
      e.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    e.forEach(function (f, g) {
      this.O.setRequestHeader(g, f);
    }, this);
    this.U && (this.O.responseType = this.U);
    'withCredentials' in this.O &&
      this.O.withCredentials !== this.L &&
      (this.O.withCredentials = this.L);
    try {
      Al(this),
        0 < this.A && ((this.S = !1), (this.G = Qj(this.Ra, this.A, this))),
        (this.B = !0),
        this.O.send(a),
        (this.B = !1);
    } catch (f) {
      zl(this, f);
    }
  };
  function Pa(a) {
    return 'content-type' == a.toLowerCase();
  }
  n.Ra = function () {
    'undefined' != typeof wa &&
      this.O &&
      ((this.D = 'Timed out after ' + this.A + 'ms, aborting'),
      Mj(this, 'timeout'),
      this.abort(8));
  };
  function zl(a, b) {
    a.g = !1;
    a.O && ((a.o = !0), a.O.abort(), (a.o = !1));
    a.D = b;
    Bl(a);
    Cl(a);
  }
  function Bl(a) {
    a.M || ((a.M = !0), Mj(a, 'complete'), Mj(a, 'error'));
  }
  n.abort = function () {
    this.O &&
      this.g &&
      ((this.g = !1),
      (this.o = !0),
      this.O.abort(),
      (this.o = !1),
      Mj(this, 'complete'),
      Mj(this, 'abort'),
      Cl(this));
  };
  n.H = function () {
    this.O &&
      (this.g && ((this.g = !1), (this.o = !0), this.O.abort(), (this.o = !1)),
      Cl(this, !0));
    ul.fa.H.call(this);
  };
  n.Gb = function () {
    this.Ba() || (this.N || this.B || this.o ? Dl(this) : this.pb());
  };
  n.pb = function () {
    Dl(this);
  };
  function Dl(a) {
    if (
      a.g &&
      'undefined' != typeof wa &&
      (!a.J[1] || 4 != El(a) || 2 != a.va())
    )
      if (a.B && 4 == El(a)) Qj(a.Gb, 0, a);
      else if ((Mj(a, 'readystatechange'), 4 == El(a))) {
        a.g = !1;
        try {
          if (Fl(a)) Mj(a, 'complete'), Mj(a, 'success');
          else {
            try {
              var b = 2 < El(a) ? a.O.statusText : '';
            } catch (c) {
              b = '';
            }
            a.D = b + ' [' + a.va() + ']';
            Bl(a);
          }
        } finally {
          Cl(a);
        }
      }
  }
  function Cl(a, b) {
    if (a.O) {
      Al(a);
      var c = a.O,
        d = a.J[0] ? ya : null;
      a.O = null;
      a.J = null;
      b || Mj(a, 'ready');
      try {
        c.onreadystatechange = d;
      } catch (e) {}
    }
  }
  function Al(a) {
    a.O && a.S && (a.O.ontimeout = null);
    a.G && (Rj(a.G), (a.G = null));
  }
  function Fl(a) {
    var b = a.va();
    a: switch (b) {
      case 200:
      case 201:
      case 202:
      case 204:
      case 206:
      case 304:
      case 1223:
        var c = !0;
        break a;
      default:
        c = !1;
    }
    if (!c) {
      if ((b = 0 === b))
        (a = String(a.P).match(Yj)[1] || null),
          !a &&
            r.self &&
            r.self.location &&
            ((a = r.self.location.protocol), (a = a.substr(0, a.length - 1))),
          (b = !vl.test(a ? a.toLowerCase() : ''));
      c = b;
    }
    return c;
  }
  function El(a) {
    return a.O ? a.O.readyState : 0;
  }
  n.va = function () {
    try {
      return 2 < El(this) ? this.O.status : -1;
    } catch (a) {
      return -1;
    }
  };
  Fc(function (a) {
    ul.prototype.pb = a(ul.prototype.pb);
  });
  function Gl(a, b, c) {
    Lj.call(this);
    this.B = b || null;
    this.A = {};
    this.D = Hl;
    this.J = a;
    if (!c) {
      this.g = null;
      this.g = new dl(v(this.o, this));
      jl(this.g, 'setTimeout');
      jl(this.g, 'setInterval');
      a = this.g;
      b = r.window;
      c = [
        'requestAnimationFrame',
        'mozRequestAnimationFrame',
        'webkitAnimationFrame',
        'msRequestAnimationFrame',
      ];
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        c[d] in b && jl(a, e);
      }
      a = this.g;
      Ec = !0;
      b = v(a.g, a);
      for (c = 0; c < Cc.length; c++) Cc[c](b);
      Dc.push(a);
    }
  }
  w(Gl, Lj);
  function Il(a, b) {
    mj.call(this, 'a');
    this.error = a;
    this.context = b;
  }
  w(Il, mj);
  function Jl(a, b) {
    return new Gl(a, b, void 0);
  }
  function Hl(a, b, c, d) {
    if (d instanceof Map) {
      var e = {};
      d = la(d);
      for (var f = d.next(); !f.done; f = d.next()) {
        var g = la(f.value);
        f = g.next().value;
        g = g.next().value;
        e[f] = g;
      }
    } else e = d;
    yl(a, null, b, c, e);
  }
  function Kl(a, b) {
    a.D = b;
  }
  Gl.prototype.o = function (a, b) {
    a = a.error || a;
    b = b ? eb(b) : {};
    a instanceof Error && gb(b, jh(a));
    var c = kh(a);
    if (this.B)
      try {
        this.B(c, b);
      } catch (h) {}
    var d = c.message.substring(0, 1900);
    if (!(a instanceof y) || a.g) {
      a = c.stack;
      try {
        var e = fk(
          this.J,
          'script',
          c.fileName,
          'error',
          d,
          'line',
          c.lineNumber,
        );
        db(this.A) || (e = gk(e, this.A));
        d = {};
        d.trace = a;
        if (b) for (var f in b) d['context.' + f] = b[f];
        var g = ek(d);
        this.D(e, 'POST', g, this.G);
      } catch (h) {}
    }
    try {
      Mj(this, new Il(c, b));
    } catch (h) {}
  };
  Gl.prototype.H = function () {
    jj(this.g);
    Gl.fa.H.call(this);
  };
  function Ll() {
    this.g = function () {
      var a = r.window;
      a.onbeforeunload = ya;
      a.location.reload();
    };
  }
  Ll.prototype.notify = function () {
    window.confirm(
      "This error has been reported to Google and we'll look into it as soon as possible. Please reload this page to continue.",
    ) && this.g();
  };
  function Ml(a) {
    y.call(this, a);
  }
  q(Ml, y);
  function Nl(a, b) {
    var c = Array.prototype.slice.call(arguments),
      d = c.shift();
    if ('undefined' == typeof d)
      throw Error('[goog.string.format] Template required');
    d.replace(
      /%([0\- \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g,
      function (e, f, g, h, k, l, p, t) {
        if ('%' == l) return '%';
        var x = c.shift();
        if ('undefined' == typeof x)
          throw Error('[goog.string.format] Not enough arguments');
        arguments[0] = x;
        return Ol[l].apply(null, arguments);
      },
    );
  }
  var Ol = {
    s: function (a, b, c) {
      return isNaN(c) || '' == c || a.length >= Number(c)
        ? a
        : (a =
            -1 < b.indexOf('-', 0)
              ? a + zb(' ', Number(c) - a.length)
              : zb(' ', Number(c) - a.length) + a);
    },
    f: function (a, b, c, d, e) {
      d = a.toString();
      isNaN(e) || '' == e || (d = parseFloat(a).toFixed(e));
      var f =
        0 > Number(a)
          ? '-'
          : 0 <= b.indexOf('+')
            ? '+'
            : 0 <= b.indexOf(' ')
              ? ' '
              : '';
      0 <= Number(a) && (d = f + d);
      if (isNaN(c) || d.length >= Number(c)) return d;
      d = isNaN(e)
        ? Math.abs(Number(a)).toString()
        : Math.abs(Number(a)).toFixed(e);
      a = Number(c) - d.length - f.length;
      return (d =
        0 <= b.indexOf('-', 0)
          ? f + d + zb(' ', a)
          : f + zb(0 <= b.indexOf('0', 0) ? '0' : ' ', a) + d);
    },
    d: function (a, b, c, d, e, f, g, h) {
      return Ol.f(parseInt(a, 10), b, c, d, 0, f, g, h);
    },
  };
  Ol.i = Ol.d;
  Ol.u = Ol.d;
  function Pl() {
    this.j = 0;
    this.g = [];
  }
  n = Pl.prototype;
  n.add = function (a) {
    var b = this.g[this.j];
    this.g[this.j] = a;
    this.j = (this.j + 1) % 50;
    return b;
  };
  n.get = function (a) {
    a = Ql(this, a);
    return this.g[a];
  };
  n.set = function (a, b) {
    a = Ql(this, a);
    this.g[a] = b;
  };
  n.ka = function () {
    for (
      var a = this.g.length, b = [], c = this.g.length - this.g.length;
      c < a;
      c++
    )
      b.push(this.get(c));
    return b;
  };
  n.ma = function () {
    for (var a = [], b = this.g.length, c = 0; c < b; c++) a[c] = c;
    return a;
  };
  function Rl(a) {
    return 0 == a.g.length ? null : a.get(a.g.length - 1);
  }
  function Ql(a, b) {
    if (b >= a.g.length) throw Error('Out of bounds exception');
    return 50 > a.g.length ? b : (a.j + Number(b)) % 50;
  }
  function Sl(a) {
    this.o = a;
    this.j = Math.floor(a / 50);
    this.g = new Pl();
  }
  Sl.prototype.get = function (a) {
    return Tl(this, a, function (b, c) {
      return b + c.count;
    });
  };
  function Tl(a, b, c) {
    b = b || Date.now();
    Ul(a, b);
    var d = 0;
    b = a.j * (Math.floor(b / a.j) + 1) - a.o;
    for (var e = a.g.g.length - 1; 0 <= e; --e) {
      var f = a.g.get(e);
      if (f.end <= b) break;
      d = c(d, f);
    }
    return d;
  }
  function Ul(a, b) {
    var c = Rl(a.g);
    c &&
      ((c = c.end - a.j),
      b < c &&
        (Nl(
          'Went backwards in time: now=%d, slotStart=%d.  Resetting state.',
          b,
          c,
        ),
        (a = a.g),
        (a.g.length = 0),
        (a.j = 0)));
  }
  function Vl(a) {
    this.end = a;
  }
  Vl.prototype.count = 0;
  Vl.prototype.min = Number.MAX_VALUE;
  Vl.prototype.max = Number.MIN_VALUE;
  function Wl(a, b, c) {
    W.call(this);
    this.o = a;
    this.j = b;
    this.g = new Sl(1e3 * c);
  }
  q(Wl, W);
  function Xl(a, b, c) {
    W.call(this);
    this.j = a;
    this.v = b || 0;
    this.o = c;
    this.B = v(this.A, this);
  }
  w(Xl, W);
  Xl.prototype.g = 0;
  Xl.prototype.H = function () {
    Xl.fa.H.call(this);
    0 != this.g && Rj(this.g);
    this.g = 0;
    delete this.j;
    delete this.o;
  };
  Xl.prototype.start = function (a) {
    0 != this.g && Rj(this.g);
    this.g = 0;
    this.g = Qj(this.B, void 0 !== a ? a : this.v);
  };
  Xl.prototype.A = function () {
    this.g = 0;
    this.j && this.j.call(this.o);
  };
  function Yl(a) {
    W.call(this);
    this.o = a;
    this.g = {};
  }
  w(Yl, W);
  var Zl = [];
  Yl.prototype.j = function (a, b, c, d) {
    Array.isArray(b) || (b && (Zl[0] = b.toString()), (b = Zl));
    for (var e = 0; e < b.length; e++) {
      var f = Aj(a, b[e], c || this.handleEvent, d || !1, this.o || this);
      if (!f) break;
      this.g[f.key] = f;
    }
    return this;
  };
  function $l(a, b, c, d) {
    am(a, b, c, d, void 0);
  }
  function am(a, b, c, d, e, f) {
    if (Array.isArray(c))
      for (var g = 0; g < c.length; g++) am(a, b, c[g], d, e, f);
    else
      (b = Bj(b, c, d || a.handleEvent, e, f || a.o || a)) && (a.g[b.key] = b);
  }
  function bm(a, b, c, d, e, f) {
    if (Array.isArray(c))
      for (var g = 0; g < c.length; g++) bm(a, b, c[g], d, e, f);
    else
      (d = d || a.handleEvent),
        (e = Aa(e) ? !!e.capture : !!e),
        (f = f || a.o || a),
        (d = Cj(d)),
        (e = !!e),
        (c = Kf(b)
          ? wj(b.v, String(c), d, e, f)
          : b
            ? (b = Ej(b))
              ? wj(b, c, d, e, f)
              : null
            : null),
        c && (Jj(c), delete a.g[c.key]);
  }
  function cm(a) {
    Ya(
      a.g,
      function (b, c) {
        this.g.hasOwnProperty(c) && Jj(b);
      },
      a,
    );
    a.g = {};
  }
  Yl.prototype.H = function () {
    Yl.fa.H.call(this);
    cm(this);
  };
  Yl.prototype.handleEvent = function () {
    throw Error('EventHandler.handleEvent not implemented');
  };
  function dm(a, b) {
    W.call(this);
    this.o = a;
    this.G = new Xl(this.B, 3e4, this);
    this.N = new Wl('errorsender', 1, 8);
    X(this, this.N);
    this.M = !1;
    this.K = null;
    this.L = new Set();
    this.J = new Yl(this);
    this.U = b || 10;
    this.J.j(this.o, 'complete', this.W);
    this.J.j(this.o, 'ready', this.B);
  }
  q(dm, W);
  dm.prototype.send = function (a, b, c, d) {
    var e = Kd(
      Kd(
        this.Aa(),
        function (f) {
          if (!(f >= this.U))
            return (
              (f = {}), (f.u = a), (f.m = b), (f.c = c), (f.h = d), this.Sa(f)
            );
        },
        this,
      ),
      this.B,
      this,
    );
    Nd(
      e,
      function () {
        this.L.delete(e);
      },
      this,
    );
    this.L.add(e);
  };
  dm.prototype.B = function () {
    return 0 != this.G.g || this.o.O || this.M ? Rd() : em(this);
  };
  function em(a) {
    return Kd(
      a.ya(),
      function (b) {
        if (!this.o.O && 0 == this.G.g && !this.M && b) {
          if (4e3 < b.u.length) return this.ua();
          try {
            var c = this.N;
            if (!((c.g.get() + 1) / (c.g.o / 1e3) <= c.j))
              throw new Ml(
                Ab('Query would cause ', c.o, ' to exceed ', c.j, ' qps.'),
              );
            var d = c.g,
              e = Date.now();
            Ul(d, e);
            var f = Rl(d.g);
            if (!f || e >= f.end)
              (f = new Vl(d.j * (Math.floor(e / d.j) + 1))), d.g.add(f);
            f.count += 1;
            f.min = Math.min(1, f.min);
            f.max = Math.max(1, f.max);
            this.K = new Dd();
            this.o.send(b.u, b.m, b.c, b.h);
            return this.K;
          } catch (g) {
            if (g instanceof Ml) this.M = !0;
            else throw qh(g, { 'docs-origin-class': 'docs.debug.ErrorSender' });
          }
        }
      },
      a,
    );
  }
  dm.prototype.W = function () {
    var a = this.o.va(),
      b = this.K;
    Fl(this.o) || (400 <= a && 500 >= a)
      ? Kd(this.ua(), function () {
          b.T();
        })
      : (this.G.start(), b.T());
  };
  dm.prototype.H = function () {
    kj(this.J, this.G, this.o);
    this.L.clear();
    W.prototype.H.call(this);
  };
  function fm(a, b) {
    dm.call(this, a, b);
    this.g = [];
  }
  q(fm, dm);
  n = fm.prototype;
  n.Sa = function (a) {
    this.g.push(a);
    return Rd();
  };
  n.ua = function () {
    this.g.shift();
    return Rd();
  };
  n.ya = function () {
    return Rd(void 0 !== this.g[0] ? this.g[0] : null);
  };
  n.Aa = function () {
    return Rd(this.g.length);
  };
  n.H = function () {
    delete this.g;
    dm.prototype.H.call(this);
  };
  function gm(a, b) {
    this.g = a;
    this.j = b;
  }
  gm.prototype.o = function (a) {
    this.g && (this.g.call(this.j || null, a), (this.g = this.j = null));
  };
  gm.prototype.abort = function () {
    this.j = this.g = null;
  };
  Fc(function (a) {
    gm.prototype.o = a(gm.prototype.o);
  });
  function hm() {
    for (var a in Array.prototype) return !1;
    return !0;
  }
  function im() {
    this.g = Date.now();
  }
  var jm = null;
  im.prototype.set = function (a) {
    this.g = a;
  };
  im.prototype.reset = function () {
    this.set(Date.now());
  };
  im.prototype.get = m('g');
  function km(a) {
    this.g = a || '';
    jm || (jm = new im());
    this.j = jm;
  }
  function lm(a) {
    return 10 > a ? '0' + a : String(a);
  }
  function mm(a) {
    km.call(this, a);
  }
  w(mm, km);
  function nm(a) {
    a = void 0 === a ? new om() : a;
    Lj.call(this);
    this.L = {};
    this.g = null;
    this.o = {};
    this.J = new Yl(this);
    this.ga = a.v;
    this.U = a.o;
    this.M = new Ll();
    var b = a.g ? a.g.create(this, void 0) : null,
      c = new ul();
    this.D = b || new fm(c, void 0);
    X(this, this.D);
    b = Q(P(), 'docs-sup') + Q(P(), 'docs-jepp') + '/jserror';
    (c = Q(P(), 'jobset')) && (b = fk(b, 'jobset', c));
    if (pm) throw Error('ErrorReporter already installed.');
    pm = !0;
    this.g = Jl(b, v(this.Rc, this));
    this.g.G = {};
    Kl(this.g, v(this.Uc, this));
    this.J.j(this.g, 'a', this.oc);
    Cd = function (d) {
      return qm(d, 'promise rejection');
    };
    Jd = function (d) {
      qm(d, 'deferred error');
    };
    this.K = a.j;
    this.B = !1;
    this.G = !0;
    this.A = !1;
    this.N = Q(P(), 'docs-jern');
    this.S = a.C;
    this.P = a.A.concat(Object.values(Hf));
  }
  q(nm, Lj);
  function rm(a, b, c, d) {
    a.A = void 0 === d ? !1 : d;
    if (!a.g) {
      if (b instanceof ke) throw b.g;
      throw qh(b);
    }
    a.g.o(b, sm('fatal', c));
  }
  function tm(a, b, c, d) {
    a.A = void 0 === d ? !1 : d;
    a.g && a.g.o(b, sm('warning', c));
  }
  n = nm.prototype;
  n.info = function (a, b, c) {
    this.A = void 0 === c ? !1 : c;
    this.g && this.g.o(a, sm('incident', b));
  };
  n.log = function (a, b, c) {
    this.A = void 0 === c ? !1 : c;
    this.g && this.g.o(a, sm('incident', b));
  };
  function qm(a, b) {
    if (null != a) {
      if (a && 'object' === typeof a && 'error' === a.type) {
        var c = a.error;
        a = JSON.stringify({
          error: c && c.message ? c.message : 'Missing error cause.',
          stack: c && c.stack ? c.stack : 'Missing error cause.',
          message: a.message,
          filename: a.filename,
          lineno: a.lineno,
          colno: a.colno,
          type: a.type,
        });
        b = Error('Unhandled ' + b + ' with ErrorEvent: ' + a);
      } else
        b =
          'string' === typeof a
            ? Error('Unhandled ' + b + ' with: ' + a)
            : null == a
              ? Error('Unhandled ' + b + ' with "null/undefined"')
              : a;
      Rc(b);
    }
  }
  function um(a, b, c, d) {
    return function (e) {
      for (var f = [], g = 0; g < arguments.length; ++g) f[g] = arguments[g];
      a: if (((g = !!d), a.g)) {
        try {
          var h = b.apply(c, f);
          break a;
        } catch (k) {
          if ((rm(a, k), g)) throw qh(k);
        }
        h = void 0;
      } else h = b.apply(c, f);
      return h;
    };
  }
  function sm(a, b) {
    b = b ? eb(b) : {};
    b.severity = a;
    return b;
  }
  n.oc = function (a) {
    var b = a.context.severity;
    (b = 'fatal' == b || 'postmortem' == b) &&
      !this.U &&
      (this.ga ? this.M.notify(a) : this.M.notify());
    Mj(this, new vm(b ? 'b' : 'c', a.error, a.context));
  };
  n.Rc = function (a, b) {
    var c = this.B;
    try {
      this.Hb(a, b);
    } catch (e) {
      throw (
        (c && !this.K && (this.G = !1),
        (this.B = !0),
        (b.provideLogDataError = e.message),
        b.severity || (b.severity = 'fatal'),
        qh(e))
      );
    } finally {
      if (!this.S)
        for (var d in b)
          'number' === typeof b[d] ||
            b[d] instanceof Number ||
            'boolean' === typeof b[d] ||
            b[d] instanceof Boolean ||
            this.P.includes(d) ||
            (d in b && delete b[d]);
    }
  };
  n.Hb = function (a, b) {
    for (var c in this.L)
      try {
        b[c] = this.L[c](a);
      } catch (g) {}
    gb(b, this.o);
    if (0 < (nl(), 0)) {
      var d = new mm(),
        e = '';
      ml(function (g) {
        var h = e,
          k = [];
        k.push(d.g, ' ');
        var l = k.push,
          p = new Date(g.jc());
        l.call(
          k,
          '[',
          lm(p.getFullYear() - 2e3) +
            lm(p.getMonth() + 1) +
            lm(p.getDate()) +
            ' ' +
            lm(p.getHours()) +
            ':' +
            lm(p.getMinutes()) +
            ':' +
            lm(p.getSeconds()) +
            '.' +
            lm(Math.floor(p.getMilliseconds() / 10)),
          '] ',
        );
        l = k.push;
        p = d.j.get();
        p = (g.jc() - p) / 1e3;
        var t = p.toFixed(3),
          x = 0;
        if (1 > p) x = 2;
        else for (; 100 > p; ) x++, (p *= 10);
        for (; 0 < x--; ) t = ' ' + t;
        l.call(k, '[', t, 's] ');
        k.push('[', g.md(), '] ');
        k.push(g.$c());
        k.push('\n');
        e = h + k.join('');
      });
      b.clientLog = e;
    }
    c = b.severity || 'fatal';
    this.N && (b.reportName = this.N + '_' + c);
    b.isArrayPrototypeIntact = hm().toString();
    var f = a.stack || '';
    if (0 == f.trim().length || 'Not available' == f)
      (b['stacklessError-reportingStack'] = ph(nm.prototype.Hb)),
        [a.message]
          .concat(na(Object.keys(b)), na(Object.values(b)))
          .some(function (g) {
            return g.includes('<eye3');
          }) ||
          (b.eye3Hint =
            "<eye3-stackless title='Stackless JS Error - " + a.name + "'/>");
    this.B && !this.K
      ? ((this.G = this.A),
        'fatal' == c
          ? (c = 'postmortem')
          : 'incident' == c && (c = 'warningafterdeath'))
      : 'fatal' == c && (this.B = !0);
    this.A = !1;
    b.severity = c;
  };
  n.Uc = function (a, b, c, d) {
    this.G && this.D.send(a, b, c, d);
  };
  n.H = function () {
    pm = !1;
    kj(this.J, this.g, this.D);
    Lj.prototype.H.call(this);
  };
  var pm = !1;
  function vm(a, b, c) {
    mj.call(this, a);
    this.error = b;
    this.context = c;
  }
  q(vm, mj);
  function om() {
    this.o = this.v = !1;
    this.g = void 0;
    this.j = !1;
    this.C = !0;
    this.A = [];
  }
  function wm(a) {
    return a instanceof ke ? (qh(a.g, void 0), a) : qh(a, void 0);
  }
  function xm(a) {
    var b = a.target.error,
      c = b && b.name;
    b = (b && b.message) || a.target.webkitErrorMessage;
    a.target.docs_internalAbort && (b = 'Internal abort: ' + b);
    return c + ' (' + b + ')';
  }
  function ym(a) {
    for (var b = [], c = 0; c < a.length; c++) b.push(a.item(c));
    return b.toString();
  }
  function zm(a, b, c, d, e, f) {
    Dd.call(this, e, f);
    this.G = a;
    this.D = [];
    this.L = !!b;
    this.U = !!c;
    this.S = !!d;
    for (b = this.N = 0; b < a.length; b++)
      a[b].ba(v(this.M, this, b, !0), v(this.M, this, b, !1));
    0 != a.length || this.L || this.T(this.D);
  }
  w(zm, Dd);
  zm.prototype.M = function (a, b, c) {
    this.N++;
    this.D[a] = [b, c];
    this.g ||
      (this.L && b
        ? this.T([a, c])
        : this.U && !b
          ? this.aa(c)
          : this.N == this.G.length && this.T(this.D));
    this.S && !b && (c = null);
    return c;
  };
  zm.prototype.aa = function (a) {
    zm.fa.aa.call(this, a);
    for (a = 0; a < this.G.length; a++) this.G[a].cancel();
  };
  function Am(a, b, c, d, e, f) {
    dm.call(this, d, f);
    this.D = b;
    this.v = b + '-f';
    this.j = b + '-n';
    this.A = c;
    this.P = a;
    this.g = null;
    this.S = e || r.indexedDB || r.webkitIndexedDB;
    a = this.S.open('DocsErrors', 1);
    a.onsuccess = v(this.qc, this);
    a.onupgradeneeded = v(this.Lc, this);
    a.onerror = v(this.Db, this);
    a.onblocked = v(this.Db, this);
  }
  q(Am, dm);
  n = Am.prototype;
  n.qc = function (a) {
    var b = a.target.result,
      c = Bm(b, 'readwrite');
    Kd(
      new zm([Cm(this.v, c), Cm(this.j, c)]),
      function (d) {
        null == d[0][1] || null == d[1][1]
          ? ((d = c.objectStore('Errors')),
            d.put({ key: this.v, value: '1' }),
            d.put({ key: this.j, value: '1' }),
            (c.oncomplete = v(this.yb, this, b)))
          : this.yb(b);
      },
      this,
    );
  };
  n.yb = function (a) {
    this.g = a;
    this.B();
  };
  n.Lc = function (a) {
    a.target.transaction.db.createObjectStore('Errors', { keyPath: 'key' });
  };
  n.Db = function (a) {
    this.g && (this.g.close(), (this.g = null));
    tm(this.P, Error('IdbErrorSender: ' + xm(a)));
  };
  n.Sa = function (a) {
    if (!this.g) return this.A.Sa(a);
    var b = Bm(this.g, 'readwrite'),
      c = new Dd();
    Kd(
      Cm(this.j, b),
      function (d) {
        if (d) {
          var e = b.objectStore('Errors');
          e.put({ key: this.j, value: String(d + 1) });
          e.put({ key: this.D + '-e-' + d, value: new ok().R(a) });
          b.oncomplete = v(c.T, c);
        } else c.T();
      },
      this,
    );
    return c;
  };
  n.ua = function () {
    if (!this.g) return this.A.ua();
    var a = Bm(this.g, 'readwrite'),
      b = new Dd();
    Kd(
      new zm([Cm(this.v, a), Cm(this.j, a)]),
      function (c) {
        var d = c[0][1];
        c = c[1][1];
        if (!d || c <= d) b.T();
        else {
          var e = a.objectStore('Errors');
          e['delete'](this.D + '-e-' + d);
          d++;
          e.put({ key: this.v, value: String(d) });
          Kd(
            Dm(this, a),
            function (f) {
              0 == f &&
                (e.put({ key: this.v, value: '1' }),
                e.put({ key: this.j, value: '1' }));
              a.oncomplete = v(b.T, b);
            },
            this,
          );
        }
      },
      this,
    );
    return b;
  };
  n.ya = function () {
    if (!this.g) return this.A.ya();
    var a = Bm(this.g, 'readonly');
    return Kd(
      new zm([Cm(this.v, a), Cm(this.j, a)]),
      function (b) {
        var c = b[0][1];
        return !c || 1 > b[1][1] - c
          ? null
          : Kd(
              Em(this.D + '-e-' + c, a),
              function (d) {
                return d && (d = JSON.parse(d))
                  ? d
                  : Kd(this.ua(), this.ya, this);
              },
              this,
            );
      },
      this,
    );
  };
  n.Aa = function () {
    if (!this.g) return this.A.Aa();
    var a = Bm(this.g, 'readonly');
    return Dm(this, a);
  };
  function Dm(a, b) {
    return Kd(new zm([Cm(a.v, b), Cm(a.j, b)]), function (c) {
      return c[1][1] - c[0][1];
    });
  }
  function Cm(a, b) {
    return Kd(Em(a, b), function (c) {
      c = parseInt(c, 10);
      return 0 > c || isNaN(c) ? null : c;
    });
  }
  function Em(a, b) {
    b = b.objectStore('Errors');
    var c = new Dd();
    b.get(a).onsuccess = function (d) {
      d.target.result ? c.T(d.target.result.value) : c.T(null);
    };
    return c;
  }
  function Bm(a, b) {
    var c = ['Errors'];
    try {
      return a.transaction(c, b);
    } catch (d) {
      throw (
        ((b = ym(a.objectStoreNames)),
        qh(d, {
          databaseName: a.name,
          databaseObjectStores: b,
          databaseVersion: a.version.toString(),
          transactionObjectStores: c.toString(),
        }))
      );
    }
  }
  n.H = function () {
    this.g && (this.g.close(), (this.g = null));
    dm.prototype.H.call(this);
  };
  function Fm() {
    try {
      var a = r.localStorage;
      if (
        a &&
        (Sb || Tb) &&
        (a.setItem('test', 'test'),
        'test' == a.getItem('test') &&
          (a.removeItem('test'), null == a.getItem('test')))
      )
        return !0;
    } catch (b) {}
    return !1;
  }
  function Gm() {
    W.call(this);
    this.g = {};
  }
  q(Gm, W);
  Gm.prototype.xa = function (a, b, c) {
    var d = this;
    if ('function' === typeof a) c && (a = v(a, c));
    else if (a && 'function' == typeof a.handleEvent) a = v(a.handleEvent, a);
    else throw Error('Invalid listener argument');
    var e = new Hm();
    b = Qj(function () {
      var f = a,
        g = e.I();
      null !== g && delete d.g[g];
      f();
    }, b);
    this.g[b] = !0;
    return (e.g = b);
  };
  Gm.prototype.H = function () {
    for (var a in this.g) {
      var b = Number(a);
      null !== b && delete this.g[b];
      Rj(b);
    }
    W.prototype.H.call(this);
  };
  function Hm() {
    this.g = null;
  }
  Hm.prototype.I = m('g');
  function Im(a, b, c) {
    dm.call(this, a, c);
    this.D = b;
    this.A = b + '-v';
    this.v = b + '-f';
    this.j = b + '-n';
    this.g = r.localStorage;
    Fm();
    a = Jm(this, this.A);
    if (!a || 1 > a)
      this.g.setItem(this.A, '1'),
        this.g.setItem(this.v, '1'),
        this.g.setItem(this.j, '1');
    this.B();
    this.P = new Gm();
    X(this, this.P);
    this.P.xa(this.Xb, 3e4, this);
  }
  q(Im, dm);
  n = Im.prototype;
  n.Sa = function (a) {
    var b = Jm(this, this.j);
    if (!b || 1 != Jm(this, this.A)) return Rd();
    try {
      this.g.setItem(this.j, String(b + 1)),
        this.g.setItem(this.D + '-e-' + b, new ok().R(a));
    } catch (c) {}
    return Rd();
  };
  n.ua = function () {
    var a = Jm(this, this.v);
    if (!a || 1 != Jm(this, this.A)) return Rd();
    this.g.removeItem(this.D + '-e-' + a);
    a++;
    this.g.setItem(this.v, String(a));
    return Kd(
      this.Aa(),
      function (b) {
        0 == b && (this.g.setItem(this.v, '1'), this.g.setItem(this.j, '1'));
      },
      this,
    );
  };
  n.ya = function () {
    var a = Jm(this, this.v);
    return a && 1 == Jm(this, this.A)
      ? Kd(
          this.Aa(),
          function (b) {
            if (1 > b) return null;
            try {
              var c = this.g.getItem(this.D + '-e-' + a);
              if (c) {
                var d = JSON.parse(c);
                if (d) return d;
              }
            } catch (e) {}
            return Kd(this.ua(), this.ya, this);
          },
          this,
        )
      : Rd(null);
  };
  n.Aa = function () {
    return Rd(Jm(this, this.j) - Jm(this, this.v));
  };
  function Jm(a, b) {
    return (a = a.g.getItem(b)) ? Km(a) : null;
  }
  function Km(a) {
    a = parseInt(a, 10);
    return 0 > a || isNaN(a) ? null : a;
  }
  n.Xb = function () {
    if (Jm(this, this.j) && 1 == Jm(this, this.A))
      for (var a = this.D + '-e-', b = 0, c = this.g.length; b < c; ++b) {
        var d = this.g.key(b);
        if (d && lb(d, a)) {
          var e = Km(d.substring(a.length)),
            f = Jm(this, this.j);
          f && e && e >= f && this.g.removeItem(d);
        }
      }
  };
  n.H = function () {
    dm.prototype.H.call(this);
  };
  function Lm() {}
  Lm.prototype.create = function (a, b) {
    return Fm() ? new Im(new ul(), 'docsOfflineIframeApi', b) : null;
  };
  function Mm() {}
  Mm.prototype.create = function (a, b) {
    var c = new Lm().create(a, b) || new fm(new ul(), b);
    return Sb && (r.indexedDB || r.webkitIndexedDB)
      ? new Am(a, 'docsOfflineIframeApi', c, new ul(), void 0, b)
      : c;
  };
  function Nm(a) {
    B(this, a, -1, Om);
  }
  q(Nm, A);
  var Om = [1];
  function Pm(a) {
    B(this, a, -1, null);
  }
  q(Pm, A);
  function Qm(a) {
    B(this, a, -1, null);
  }
  q(Qm, A);
  function Rm(a) {
    B(this, a, -1, null);
  }
  q(Rm, A);
  function Sm(a, b, c, d, e) {
    this.g = a;
    this.A = b;
    this.j = c;
    this.o = d;
    this.v = e;
  }
  function Tm(a) {
    var b = P(),
      c = b.get('ilcm');
    if (null == c) return null;
    var d = c.je,
      e = c.sstu;
    if (!Um) {
      var f = P(),
        g = f.get('ilcm');
      null != g && (Um = O(f, 'icso') || a ? Cf() : g.si);
    }
    a = c.ei;
    b.get('buildLabel');
    return new Sm(d, e, a, c.crc || 0, c.cvi || []);
  }
  var Um = null;
  function Vm(a, b) {
    W.call(this);
    this.A = a;
    this.j = 'number' === typeof b ? b : null;
    this.v = (a = Tm()) ? a.g : 0;
    this.o = a ? a.j : [];
    this.g = null;
  }
  q(Vm, W);
  Vm.prototype.get = function () {
    if (this.g) return this.g;
    var a = new Qm();
    a = E(a, 1, 'en');
    a = E(a, 2, pb);
    'number' === typeof this.j && E(a, 11, this.j);
    var b = P();
    var c = new Pm();
    c = E(c, 2, this.A);
    b = O(b, 'icso');
    b = E(c, 1, b);
    G(a, 5, b);
    E(a, 9, this.v);
    b = new Nm();
    b = E(b, 1, this.o || []);
    G(a, 10, b);
    return (this.g = a);
  };
  function Wm(a) {
    this.j = this.g = this.o = a;
  }
  Wm.prototype.reset = function () {
    this.j = this.g = this.o;
  };
  function Xm(a, b, c) {
    yl(
      a.url,
      function (d) {
        d = d.target;
        if (Fl(d)) {
          try {
            var e = d.O ? d.O.responseText : '';
          } catch (f) {
            e = '';
          }
          b(e);
        } else c(d.va());
      },
      a.Tc,
      a.body,
      a.Sc,
      a.Wc,
      a.withCredentials,
    );
  }
  function Ym(a) {
    B(this, a, -1, null);
  }
  q(Ym, A);
  function Zm() {
    var a = new Ym(),
      b = document.documentElement.getAttribute('lang');
    return E(a, 5, b);
  }
  function $m(a) {
    B(this, a, -1, null);
  }
  q($m, A);
  function an() {
    var a = new $m();
    return E(a, 1, 1);
  }
  function bn(a) {
    B(this, a, 31, cn);
  }
  q(bn, A);
  function dn(a, b) {
    return E(a, 8, b);
  }
  var cn = [3, 20, 27];
  function en(a) {
    B(this, a, 17, fn);
  }
  q(en, A);
  function gn(a, b) {
    return gc(a, 3, b);
  }
  function hn(a, b) {
    return E(a, 14, b);
  }
  var fn = [3, 5];
  function jn(a) {
    B(this, a, 6, kn);
  }
  q(jn, A);
  var kn = [5];
  function ln(a) {
    B(this, a, -1, null);
  }
  q(ln, A);
  var mn = new wc(175237375, { od: 0 }, ln, function (a, b) {
    var c = { td: dc(b, 1, -1) };
    a && (c.Da = b);
    return c;
  });
  function nn(a, b, c, d, e, f, g, h, k, l, p) {
    var t = this;
    Lj.call(this);
    this.cb = a;
    this.U = b || ya;
    this.G = new en();
    this.eb = d;
    this.Ga = p;
    this.o = [];
    this.ta = '';
    this.ab = Ha(Gc, 0, 1);
    this.L = e || null;
    this.J = c || null;
    this.M = g || !1;
    this.N = k || null;
    this.Ha = this.P = -1;
    this.Ta = !h;
    this.D = 0;
    this.fb = 1;
    this.ga = f || !1;
    this.S = !1;
    !this.ga &&
      ((Sb && Nb(65)) || (Ob && Nb(45)) || (Tb && Nb(12)) || (Db() && Eb()));
    a = an();
    f || ((f = Zm()), G(a, 11, f));
    G(this.G, 1, a);
    E(this.G, 2, this.cb);
    this.A = new Wm(1e4);
    this.g = new Oj(this.A.g);
    X(this, this.g);
    Aj(this.g, 'tick', Xa(on(this, l)), !1, this);
    this.K = new Oj(6e5);
    X(this, this.K);
    Aj(this.K, 'tick', Xa(on(this, l)), !1, this);
    this.M || this.K.start();
    this.ga ||
      (Aj(window, 'beforeunload', this.B, !1, this),
      Aj(window, 'unload', this.B, !1, this),
      Aj(document, 'visibilitychange', function () {
        'hidden' === document.visibilityState && t.B();
      }),
      Aj(document, 'pagehide', this.B, !1, this));
  }
  w(nn, Lj);
  function on(a, b) {
    return b
      ? function () {
          b().then(a.flush.bind(a));
        }
      : a.flush;
  }
  nn.prototype.H = function () {
    this.B();
    nn.fa.H.call(this);
  };
  function pn(a) {
    a.L ||
      (a.L =
        0.01 > a.ab()
          ? 'https://www.google.com/log?format=json&hasfast=true'
          : 'https://play.google.com/log?format=json&hasfast=true');
    return a.L;
  }
  nn.prototype.log = function (a) {
    a = lc(a);
    var b = this.fb++;
    E(a, 21, b);
    C(a, 1) || E(a, 1, Date.now().toString());
    for (
      D(a, 15) || E(a, 15, 60 * new Date().getTimezoneOffset());
      1e3 <= this.o.length;

    )
      this.o.shift(), ++this.D;
    this.o.push(a);
    Mj(this, new qn(a));
    this.M || this.g.pa || this.g.start();
  };
  nn.prototype.flush = function (a, b) {
    if (0 == this.o.length) a && a();
    else if (this.S) rn(this);
    else {
      var c = Date.now();
      if (this.Ha > c && this.P < c) b && b('throttled');
      else {
        var d = hn(gn(E(lc(this.G), 4, Date.now().toString()), this.o), this.D);
        c = {};
        var e = this.U();
        e && (c.Authorization = e);
        var f = pn(this);
        this.J &&
          ((c['X-Goog-AuthUser'] = this.J), (f = hk(f, 'authuser', this.J)));
        this.N &&
          ((c['X-Goog-PageId'] = this.N), (f = hk(f, 'pageId', this.N)));
        if (e && this.ta == e) b && b('stale-auth-token');
        else {
          this.o = [];
          this.g.pa && Pj(this.g);
          this.D = 0;
          var g = d.R();
          c = {
            url: f,
            body: g,
            gd: 1,
            Sc: c,
            Tc: 'POST',
            withCredentials: this.Ta,
            Wc: 0,
          };
          f = v(function (h) {
            this.A.reset();
            this.g.setInterval(this.A.g);
            if (h) {
              try {
                var k = JSON.parse(h.replace(")]}'\n", ''));
                var l = new jn(k);
              } catch (p) {}
              l &&
                ((h = cc(l, 1, '-1')),
                (h = Number(h)),
                0 < h && ((this.P = Date.now()), (this.Ha = this.P + h)),
                (l = jc(l, mn))) &&
                ((l = dc(l, 1, -1)),
                -1 != l &&
                  ((this.A = new Wm(1 > l ? 1 : l)),
                  this.g.setInterval(this.A.g)));
            }
            a && a();
          }, this);
          g = v(function (h) {
            var k = fc(d, bn, 3),
              l = this.A;
            l.j = Math.min(3e5, 2 * l.j);
            l.g = Math.min(
              3e5,
              l.j + Math.round(0.2 * (Math.random() - 0.5) * l.j),
            );
            this.g.setInterval(this.A.g);
            401 == h && e && (this.ta = e);
            if ((500 <= h && 600 > h) || 401 == h || 0 == h)
              (this.o = k.concat(this.o)),
                this.M || this.g.pa || this.g.start();
            b && b('net-send-failed', h);
          }, this);
          this.Ga ? this.Ga.send(c, f, g) : this.eb(c, f, g);
        }
      }
    }
  };
  nn.prototype.B = function () {
    this.flush();
  };
  function rn(a) {
    sn(a, function (b, c) {
      b = hk(b, 'format', 'json');
      b = window.navigator.sendBeacon(b, c.R());
      a.S && !b && (a.S = !1);
      return b;
    });
  }
  function sn(a, b) {
    if (0 != a.o.length) {
      var c = mk(pn(a), 'format');
      c = fk(c, 'auth', a.U(), 'authuser', a.J || '0');
      for (var d = 0; 10 > d && a.o.length; ++d) {
        var e = a.o.slice(0, 32),
          f = gn(E(lc(a.G), 4, Date.now().toString()), e);
        0 === d && hn(f, a.D);
        if (!b(c, f)) break;
        a.o = a.o.slice(e.length);
      }
      a.g.pa && Pj(a.g);
      a.D = 0;
    }
  }
  function qn() {
    this.type = 'event-logged';
  }
  w(qn, mj);
  function tn(a) {
    this.g = a;
  }
  tn.prototype.j = function (a) {
    a = dn(new bn(), a.R());
    this.g.log(a);
    this.g.B();
  };
  function un(a) {
    B(this, a, -1, vn);
  }
  q(un, A);
  function wn(a) {
    B(this, a, -1, null);
  }
  q(wn, A);
  var vn = [2];
  function xn(a) {
    B(this, a, -1, yn);
  }
  q(xn, A);
  function zn(a) {
    B(this, a, -1, null);
  }
  q(zn, A);
  function An(a) {
    B(this, a, -1, null);
  }
  q(An, A);
  var yn = [2, 27];
  function Bn(a) {
    B(this, a, -1, null);
  }
  q(Bn, A);
  function Cn(a) {
    B(this, a, -1, null);
  }
  q(Cn, A);
  function Dn(a) {
    B(this, a, -1, null);
  }
  q(Dn, A);
  function En(a) {
    B(this, a, -1, null);
  }
  q(En, A);
  function Fn(a) {
    B(this, a, -1, null);
  }
  q(Fn, A);
  function Gn(a) {
    B(this, a, -1, null);
  }
  q(Gn, A);
  function Hn(a) {
    B(this, a, -1, null);
  }
  q(Hn, A);
  function In(a) {
    B(this, a, -1, null);
  }
  q(In, A);
  function Jn(a) {
    B(this, a, -1, null);
  }
  q(Jn, A);
  function Kn(a) {
    B(this, a, -1, null);
  }
  q(Kn, A);
  function Ln(a) {
    B(this, a, -1, null);
  }
  q(Ln, A);
  function Mn(a) {
    B(this, a, -1, Nn);
  }
  q(Mn, A);
  var Nn = [2];
  function On(a) {
    B(this, a, -1, null);
  }
  q(On, A);
  function Pn(a) {
    B(this, a, -1, null);
  }
  q(Pn, A);
  function Qn(a) {
    B(this, a, -1, null);
  }
  q(Qn, A);
  function Rn(a) {
    B(this, a, -1, Sn);
  }
  q(Rn, A);
  var Sn = [1];
  function Tn(a) {
    this.g = a;
  }
  function Un(a, b) {
    b = dn(new bn(), b.R());
    a.g.log(b);
    return new H(function (c, d) {
      a.g.flush(c, d);
    });
  }
  function Vn() {}
  Vn.prototype.I = ca('offline_infra_invariants');
  function Wn(a, b) {
    this.o = a;
    this.g = b;
  }
  Wn.prototype.j = function (a) {
    return td(
      Un(this.o, a),
      function () {
        var b = fc(a, Fn, 1);
        b = la(b);
        for (var c = b.next(); !c.done; c = b.next()) {
          c = c.value;
          if (!D(c, 5)) {
            var d = new Bn();
            G(c, 5, d);
          }
          if (!D(F(c, Bn, 5), 34)) {
            d = F(c, Bn, 5);
            var e = new xn();
            G(d, 34, e);
          }
          E(F(F(c, Bn, 5), xn, 34), 26, !0);
        }
        return Xn(this, a);
      },
      this,
    );
  };
  function Xn(a, b) {
    return new H(function (c, d) {
      a.g.g(b, c, d);
    });
  }
  function Yn() {}
  Yn.prototype.g = function (a, b) {
    b();
  };
  function Zn(a) {
    B(this, a, -1, $n);
  }
  q(Zn, A);
  function ao(a, b) {
    return E(a, 1, b || []);
  }
  var $n = [1];
  function bo(a) {
    B(this, a, -1, null);
  }
  q(bo, A);
  bo.prototype.getType = function () {
    return C(this, 1);
  };
  function co(a) {
    var b = new bo();
    return E(b, 1, a);
  }
  function eo(a) {
    B(this, a, -1, null);
  }
  q(eo, A);
  function fo(a) {
    B(this, a, -1, null);
  }
  q(fo, A);
  fo.prototype.getType = function () {
    return C(this, 1);
  };
  function go(a) {
    var b = new fo();
    return E(b, 1, a);
  }
  function ho(a) {
    B(this, a, -1, null);
  }
  q(ho, A);
  function io(a) {
    B(this, a, -1, null);
  }
  q(io, A);
  function jo(a) {
    B(this, a, -1, null);
  }
  q(jo, A);
  function ko(a) {
    B(this, a, -1, null);
  }
  q(ko, A);
  ko.prototype.getType = function () {
    return C(this, 1);
  };
  function lo(a) {
    B(this, a, -1, null);
  }
  q(lo, A);
  function mo(a) {
    B(this, a, -1, null);
  }
  q(mo, A);
  mo.prototype.getType = function () {
    return C(this, 1);
  };
  mo.prototype.Ka = function () {
    return F(this, ho, 5);
  };
  function no() {
    return !!r._docs_chrome_extension_exists;
  }
  function oo() {
    return r._docs_chrome_extension_features_version || 0;
  }
  function po(a) {
    qo();
    if (void 0 === hb) {
      var b = null;
      var c = r.trustedTypes;
      if (c && c.createPolicy) {
        try {
          b = c.createPolicy('goog#html', {
            createHTML: Ja,
            createScript: Ja,
            createScriptURL: Ja,
          });
        } catch (d) {
          r.console && r.console.error(d.message);
        }
        hb = b;
      } else hb = b;
    }
    a = (b = hb) ? b.createScriptURL(a) : a;
    return new ib(a, jb);
  }
  var qo = ya;
  function ro(a) {
    var b = { Wb: !0 },
      c = b.document || document,
      d = kb(a).toString(),
      e = Nc(new Ic(c), 'SCRIPT'),
      f = { Jb: e, Ra: void 0 },
      g = new Dd(so, f),
      h = null,
      k = null != b.timeout ? b.timeout : 5e3;
    0 < k &&
      ((h = window.setTimeout(function () {
        to(e, !0);
        g.aa(new uo(1, 'Timeout reached for loading script ' + d));
      }, k)),
      (f.Ra = h));
    e.onload = e.onreadystatechange = function () {
      (e.readyState &&
        'loaded' != e.readyState &&
        'complete' != e.readyState) ||
        (to(e, b.Wb || !1, h), g.T(null));
    };
    e.onerror = function () {
      to(e, !0, h);
      g.aa(new uo(0, 'Error while loading script ' + d));
    };
    f = b.attributes || {};
    gb(f, { type: 'text/javascript', charset: 'UTF-8' });
    Jc(e, f);
    e.src = kb(a);
    ub(e);
    vo(c).appendChild(e);
    return g;
  }
  function vo(a) {
    var b;
    return (b = (a || document).getElementsByTagName('HEAD')) && 0 != b.length
      ? b[0]
      : a.documentElement;
  }
  function so() {
    if (this && this.Jb) {
      var a = this.Jb;
      a && 'SCRIPT' == a.tagName && to(a, !0, this.Ra);
    }
  }
  function to(a, b, c) {
    null != c && r.clearTimeout(c);
    a.onload = ya;
    a.onerror = ya;
    a.onreadystatechange = ya;
    b &&
      window.setTimeout(function () {
        Mc(a);
      }, 0);
  }
  function uo(a, b) {
    var c = 'Jsloader error (code #' + a + ')';
    b && (c += ': ' + b);
    y.call(this, c);
    this.code = a;
  }
  w(uo, y);
  function wo() {
    this.j = Q(P(), 'docs-extension-id');
    this.g = null;
  }
  function xo(a) {
    if (!no()) return id(Error('Docs extension cannot be found.'));
    var b = go(2);
    return yo(a, b).then(aa());
  }
  function zo(a) {
    if (!no()) return id(Error('Docs extension cannot be found.'));
    var b = go(4),
      c = co(3);
    G(b, 4, c);
    return yo(a, b).then(aa());
  }
  function Ao(a) {
    if (no()) {
      var b = go(3);
      yo(a, b).then(aa());
    } else hd();
  }
  function Bo(a, b) {
    if (!no()) return id(Error('Docs extension cannot be found.'));
    var c = go(4),
      d = co(2);
    b = ao(new Zn(), b);
    G(d, 3, b);
    G(c, 4, d);
    return yo(a, c, !0).then(function (e) {
      return ((e = F(F(e, ko, 3), jo, 2)) && F(e, io, 1)) || null;
    });
  }
  function Co(a, b) {
    return no() && 1 <= oo()
      ? Do(a, b).then(function (c) {
          return bc(c, 1);
        })
      : hd(!1);
  }
  function Eo(a, b) {
    return no() && 1 <= oo()
      ? Do(a, b, !0, 1e4).then(function (c) {
          return bc(c, 2);
        })
      : hd(!1);
  }
  function Do(a, b, c, d) {
    var e = go(5),
      f = new eo();
    G(e, 5, f);
    E(f, 1, b);
    return yo(a, e, c, d).then(function (g) {
      return F(g, lo, 4);
    });
  }
  function Fo(a) {
    return td(Go(a), function () {
      r._docs_chrome_extension_exists = !1;
    });
  }
  function Go(a) {
    return new H(function (b, c) {
      var d = po('chrome-extension://' + a.j + '/page_embed_script.js');
      ro(d).ba(b, c);
    });
  }
  function yo(a, b, c, d) {
    var e = od(),
      f = Ho(a);
    if (!f)
      return (
        c &&
          e.reject(
            Error(
              'Could not send extension request due to missing Chrome Runtime.',
            ),
          ),
        e.promise
      );
    if (!f.sendMessage)
      return id(
        Error(
          'Could not send extension request due to missing chrome.runtime.sendMessage',
        ),
      );
    if (d) {
      var g = Date.now();
      Sj(d).then(function () {
        e.reject(
          Error(
            'Request to the extension timed out after ' +
              (Date.now() - g) +
              'ms.',
          ),
        );
      });
    }
    f.sendMessage(a.j, b.ha(), void 0, function (h) {
      void 0 !== h
        ? ((h = new mo(h)),
          h.Ka()
            ? e.reject(Error('Error from Docs extension: ' + C(h.Ka(), 1)))
            : e.resolve(h))
        : e.reject(
            Error(
              'No response from Docs extension: ' +
                (a.g.lastError ? a.g.lastError.message : 'without lastError'),
            ),
          );
    });
    return e.promise;
  }
  function Ho(a) {
    if (a.g) return a.g;
    var b = window;
    a.g = Io(b);
    if (a.g) return a.g;
    for (; b != b.parent && ((b = b.parent), (a.g = Io(b)), !a.g); );
    return a.g;
  }
  function Io(a) {
    try {
      if (a.chrome && a.chrome.runtime) return a.chrome.runtime;
    } catch (b) {}
    return null;
  }
  function Jo(a) {
    this.j = a;
  }
  Jo.prototype.g = function (a, b, c) {
    a = new Dh(null, 'offline', Date.now(), a.ha(), !0);
    this.j.write([a], b, c);
  };
  function Ko(a, b, c) {
    mj.call(this, 'broadcast-message', a);
    this.data = c;
  }
  q(Ko, mj);
  function Lo(a) {
    B(this, a, 1, null);
  }
  q(Lo, A);
  function Mo(a) {
    B(this, a, -1, null);
  }
  q(Mo, A);
  Mo.prototype.getType = function () {
    return C(this, 1);
  };
  function No(a) {
    var b = new Mo();
    return E(b, 1, a);
  }
  function Oo(a, b) {
    Lj.call(this);
    this.o = !1;
    this.g = null;
    this.A = new Yl(this);
    X(this, this.A);
    this.D = a;
    this.B = b;
  }
  q(Oo, Lj);
  Oo.prototype.connect = function () {
    this.o ||
      ((this.o = !0),
      (this.g = Po(this.D)),
      this.A.j(this.g, 'message', this.G.bind(this)),
      this.g.start());
  };
  function Qo(a, b) {
    if (!a.o) throw Error('Trying to publish without connecting first.');
    var c = No(1);
    b = G(c, 2, b);
    E(b, 3, a.B);
    a.g.postMessage(b.ha());
  }
  Oo.prototype.G = function (a) {
    var b = a.na;
    null != b.data[1]
      ? ((b = new Mo(b.data)), b.getType(), (a = C(b, 3)), (b = F(b, Lo, 2)))
      : ((a = this.B), (b = new Lo(b.data)));
    Mj(this, new Ko(this, a, b));
  };
  Oo.prototype.H = function () {
    if (this.g) {
      var a = No(0);
      this.g.postMessage(a.ha());
      this.g.close();
    }
    Lj.prototype.H.call(this);
  };
  function Ro(a) {
    B(this, a, 1, null);
  }
  q(Ro, A);
  var So = {};
  function To(a) {
    B(this, a, -1, Uo);
  }
  q(To, A);
  var Uo = [1],
    Vo = new wc(113007630, { jd: 0 }, To, function (a, b) {
      for (var c = fc(b, Ro, 1), d = [], e = 0; e < c.length; e++) {
        var f = d,
          g = f.push,
          h = void 0,
          k = a,
          l = c[e],
          p = {};
        for (h in So) {
          var t = So[h],
            x = jc(l, t);
          if (null != x) {
            var u = void 0;
            for (u in t.o) if (t.o.hasOwnProperty(u)) break;
            t = t.v;
            p[u] = t ? t(k, x) : x;
          }
        }
        k && (p.Da = l);
        g.call(f, p);
      }
      c = { hd: d };
      a && (c.Da = b);
      return c;
    });
  function Wo(a) {
    B(this, a, -1, Xo);
  }
  q(Wo, A);
  var Xo = [3],
    Yo = new wc(112987886, { ld: 0 }, Wo, function (a, b) {
      var c,
        d = {
          kd: null == (c = C(b, 1)) ? void 0 : c,
          changeType: null == (c = C(b, 2)) ? void 0 : c,
          pd: null == (c = C(b, 3)) ? void 0 : c,
        };
      a && (d.Da = b);
      return d;
    });
  So[112987886] = Yo;
  function Zo(a, b) {
    W.call(this);
    var c = this;
    this.j = b;
    this.g = new Ci();
    X(this, this.g);
    Di(this.g, a.v, function (d) {
      var e = [];
      d = d.g;
      for (var f = 0; f < d.length; f++) {
        var g = d[f];
        switch (g.g.o) {
          case 'document':
            var h = new Wo();
            var k = g.g.I();
            E(h, 1, k);
            a: switch (((k = g.changeType), k)) {
              case 'new':
                k = 1;
                break a;
              case 'update':
                k = 2;
                break a;
              case 'delete':
                k = 3;
                break a;
              default:
                throw Error('Could not handle change type ' + k);
            }
            E(h, 2, k);
            k = [];
            g = g.j;
            ab(g, 'ip') && k.push(1);
            ab(g, 'pendingQueueState') && k.push(6);
            ab(g, 'lastModifiedClientTimestamp') && k.push(2);
            (ab(g, 'lsst') || ab(g, 'lsft') || ab(g, 'lss')) && k.push(3);
            ab(g, 'pendingCreation') && k.push(4);
            ab(g, 'title') && k.push(5);
            E(h, 3, k || []);
            if (2 != C(h, 2) || C(h, 3).length)
              (g = new Ro()), kc(g, Yo, h), e.push(g);
        }
      }
      e.length &&
        ((d = new To()), gc(d, 1, e), (e = new Lo()), kc(e, Vo, d), Qo(c.j, e));
    });
  }
  q(Zo, W);
  function $o() {}
  function ap(a, b, c, d, e, f) {
    e = void 0 === e ? !1 : e;
    f = void 0 === f ? !1 : f;
    b = void 0 !== b ? bp(b, c) : null;
    e = e ? 'prev' : 'next';
    if (d)
      return (
        (a = cp(a, d)),
        f
          ? ((f =
              (f = void 0 !== b) && void 0 !== e
                ? a.g.openKeyCursor(b, e)
                : f
                  ? a.g.openKeyCursor(b)
                  : a.g.openKeyCursor()),
            (b = new dp(
              f,
              a.j,
              a.g.name +
                '.openKeyCursor(' +
                (b ? b.lower + ', ' + b.upper : b) +
                ', ' +
                e +
                ')',
              a.v,
              a.o,
            )))
          : ((f =
              (f = void 0 !== b) && void 0 !== e
                ? a.g.openCursor(b, e)
                : f
                  ? a.g.openCursor(b)
                  : a.g.openCursor()),
            (b = new dp(
              f,
              a.j,
              a.g.name +
                '.openCursor(' +
                (b ? b.lower + ', ' + b.upper : b) +
                ', ' +
                e +
                ')',
              a.v,
              a.o,
            ))),
        b
      );
    f =
      (f = void 0 !== b) && void 0 !== e
        ? a.g.openCursor(b, e)
        : f
          ? a.g.openCursor(b)
          : a.g.openCursor();
    return new dp(
      f,
      a.j,
      a.g.name +
        '.openCursor(' +
        (b ? b.lower + ', ' + b.upper : b) +
        ', ' +
        e +
        ')',
      a.v,
      a.o,
    );
  }
  function ep(a, b, c, d) {
    b = bp(b, c);
    a = fp(a, b);
    d && gp(a, d);
  }
  function hp(a, b, c, d, e, f, g, h, k, l) {
    h = void 0 === h ? !1 : h;
    k = void 0 === k ? !1 : k;
    l = void 0 === l ? !1 : l;
    b = Z(a, b);
    var p = [];
    gp(ap(b, e, f, g, h, k), function (t) {
      if ((t = t.target.result)) {
        var x = void 0 !== t.value ? t.value : t.key;
        (x = c(x)) && p.push(x);
        t['continue']();
      } else l && ip(a), d && d(p);
    });
  }
  function jp(a, b) {
    return function (c) {
      c.stopPropagation();
      b(new ch(1, a + ' (' + xm(c) + ')', c));
    };
  }
  function bp(a, b) {
    return void 0 === b || a == b ? kp.only(a) : kp.bound(a, b);
  }
  var kp = r.IDBKeyRange || r.webkitIDBKeyRange;
  function lp() {
    this.g = {};
    this.v = this.o = this.j = 0;
  }
  function mp(a, b, c, d) {
    W.call(this);
    this.G = a;
    this.B = b;
    this.o = c;
    this.A = d || Date.now;
    this.v = this.g = 0;
    this.j = [];
  }
  q(mp, W);
  mp.prototype.start = function () {
    if (this.v) throw Error('Idle delay has already been started');
    this.v = this.A() + this.B;
    this.g = Qj(this.D, this.B, this);
  };
  mp.prototype.D = function () {
    this.g = 0;
    var a = this.A() - this.v;
    this.j.push(a);
    var b =
      this.o.hidden ||
      this.o.webkitHidden ||
      this.o.mozHidden ||
      this.o.msHidden
        ? 1020
        : 20;
    10 > this.j.length && a > b
      ? ((this.v = this.A() + 1e3), (this.g = Qj(this.D, 1e3, this)))
      : this.G(this);
  };
  mp.prototype.H = function () {
    this.g && Rj(this.g);
  };
  function dp(a, b, c, d, e, f, g, h, k) {
    this.M = a;
    this.o = b;
    this.K = c;
    this.J = d;
    this.N = e;
    a = e.v++;
    e.g[a] = c;
    this.P = a;
    this.v = this.B = null;
    this.C = f || null;
    this.A = (Nf(), Mf);
    this.j = k ? Sf(this.A, k) : null;
    this.G = h || 0;
    this.g = null;
    0 < this.G &&
      (this.C || g) &&
      ((this.g = new mp(v(this.W, this), this.G, document)), this.g.start());
    this.M.onsuccess = um(this.o, this.ga, this, !0);
    this.M.onerror = um(this.o, this.S, this, !0);
  }
  function gp(a, b) {
    if (a.B) throw Error('Success callback already set');
    a.B = b;
  }
  dp.prototype.ga = function (a) {
    jj(this.g);
    this.j && Uf(this.A, this.j);
    var b = this.N,
      c = this.P;
    b.o++;
    delete b.g[c];
    this.J.g || (this.B && this.B(a));
  };
  function np(a, b) {
    if (a.v) throw Error('Error callback already set');
    a.v = b;
  }
  dp.prototype.S = function (a) {
    jj(this.g);
    this.j && Wf(this.A, this.j);
    var b = this.N,
      c = this.P;
    b.j++;
    delete b.g[c];
    a.target.docs_requestContext = this.K;
    this.J.g ||
      ((b = a.target.error) && 'AbortError' == b.name) ||
      (this.v && this.v(a));
  };
  dp.prototype.L = function (a) {
    a.onsuccess = ya;
    a.onerror = ya;
  };
  dp.prototype.W = function () {
    this.j && Wf(this.A, this.j);
    this.o.info(Error('A request was running for a long time'), {
      documentHidden: document.hidden || document.webkitHidden,
      request: this.K,
      requestTimeoutMs: this.G,
      timeoutCallbackSet: !!this.C,
      timeoutDelays: this.g.j.concat().toString(),
    });
    jj(this.g);
    !this.J.g && this.C && (this.L(this.M), this.C());
  };
  function op(a, b, c, d) {
    this.g = a;
    this.v = b;
    this.o = c;
    this.j = d;
  }
  op.prototype.get = function (a) {
    return new dp(
      this.g.get(a),
      this.j,
      this.g.name + '.get(' + a + ')',
      this.v,
      this.o,
    );
  };
  function qp(a, b, c, d) {
    this.g = a;
    this.v = b;
    this.o = c;
    this.j = d;
  }
  qp.prototype.get = function (a) {
    return new dp(
      this.g.get(a),
      this.j,
      this.g.name + '.get(' + a + ')',
      this.v,
      this.o,
    );
  };
  function rp(a, b) {
    b = a.g.put(b);
    return new dp(b, a.j, a.g.name + '.put(undefined)', a.v, a.o);
  }
  qp.prototype.add = function (a, b) {
    a = void 0 !== b ? this.g.add(a, b) : this.g.add(a);
    return new dp(a, this.j, this.g.name + '.add(' + b + ')', this.v, this.o);
  };
  function fp(a, b) {
    return new dp(
      a.g['delete'](b),
      a.j,
      a.g.name + '.delete(' + b + ')',
      a.v,
      a.o,
    );
  }
  qp.prototype.count = function (a) {
    var b = void 0 !== a ? this.g.count(a) : this.g.count();
    return new dp(b, this.j, this.g.name + '.count(' + a + ')', this.v, this.o);
  };
  function cp(a, b) {
    return new op(a.g.index(b), a.v, a.o, a.j);
  }
  function sp(a) {
    W.call(this);
    this.g = a;
  }
  q(sp, W);
  function tp(a, b, c, d, e, f) {
    var g = {};
    g.dcKey = [a, b, c, d];
    g.t = e;
    f && (g.c = f);
    return new sp(g);
  }
  sp.prototype.H = function () {
    delete this.g;
    W.prototype.H.call(this);
  };
  function up() {
    this.j = this.o = this.g = !1;
  }
  function vp(a) {
    try {
      var b = r.localStorage.getItem('docs-ucb');
    } catch (c) {
      return (
        a.info(Error('Error reading unsaved changes bit: ' + c.message)), 'e'
      );
    }
    switch (b) {
      case '1':
        return 't';
      case '0':
        return 'f';
      default:
        return 'u';
    }
  }
  function wp() {
    var a = r.localStorage;
    a.removeItem('docs-offline-ic');
    a.removeItem('docs-offline-icp');
    a.removeItem('docs-offline-lsc');
    a.removeItem('docs-offline-lfch');
    a.removeItem('docs-offline-ci');
    a.removeItem('docs-offline-sacsd');
  }
  function xp(a) {
    r.localStorage.setItem('docs-oiouid', a);
  }
  function yp(a) {
    if (!zp()) {
      a.info(
        Error('Local Storage ouid is missing for currently opted-in user.'),
      );
      var b = Q(P(), 'docs-offline-lsuid');
      if (!b)
        throw Error(
          'Cannot ensure Local Storage ouid exists without a current user.',
        );
      try {
        xp(b);
      } catch (c) {
        a.info(c);
      }
    }
  }
  function Ap(a) {
    a
      ? r.localStorage.setItem('docs-uoo', 'true')
      : r.localStorage.removeItem('docs-uoo');
  }
  function zp() {
    try {
      var a = r.localStorage.getItem('docs-oiouid') || null;
    } catch (b) {
      a = null;
    }
    return Q(P(), 'docs-offline-lsuid') == a;
  }
  function Bp(a, b, c, d, e, f) {
    dp.call(this, a, b, c, new up(), new lp(), d, !0, e, f);
    this.D = this.F = null;
    a.onblocked = um(b, this.U, this, !0);
    a.onupgradeneeded = um(b, this.ta, this, !0);
  }
  q(Bp, dp);
  Bp.prototype.U = function (a) {
    jj(this.g);
    this.F && this.F(a);
  };
  Bp.prototype.ta = function (a) {
    jj(this.g);
    if (a.dataLoss && 'none' != a.dataLoss) {
      var b = {};
      b.dataLoss = a.dataLoss;
      b.dataLossMessage = a.dataLossMessage;
      b.optinBackup = zp();
      b.requestContext = this.K;
      b.unsavedChanges = vp(this.o);
      this.o.info(Error('upgradeNeeded after dataLoss'), b);
    }
    this.D && this.D(a);
  };
  Bp.prototype.L = function (a) {
    dp.prototype.L.call(this, a);
    a.onblocked = ya;
    a.onupgradeneeded = ya;
  };
  function Cp(a, b) {
    if (a.F) throw Error('Blocked callback already set');
    a.F = b;
  }
  function Dp(a, b) {
    if (a.D) throw Error('Upgrade needed callback already set');
    a.D = b;
  }
  function Ep(a, b, c, d, e, f, g) {
    var h = void 0,
      k = void 0,
      l = this;
    k = void 0 === k ? null : k;
    this.D = a;
    this.U = b;
    this.K = c;
    this.o = d;
    this.L = e;
    this.J = !1;
    this.A = void 0 === g ? !1 : g;
    this.B = this.F = null;
    this.j = new up();
    this.N = new lp();
    this.W = 6e4;
    this.v = new mp(
      function () {
        if (!l.j.j) {
          var p = Fp(l);
          p.transactionTimeout = l.W;
          p.timeoutDelays = l.v.j.concat().toString();
          p.documentHidden = document.hidden || document.webkitHidden;
          l.o.info(
            Error('A transaction was running for a long time (' + l.K + ')'),
            p,
          );
          l.v.X();
          l.P && (Gp(l, !0), l.P(), (l.B.oncomplete = null));
        }
      },
      this.W,
      document,
    );
    this.P = void 0 === h ? null : h;
    this.G = (Nf(), Mf);
    this.g = null;
    this.M = Hp++;
    this.C = f;
    this.S = this.A ? 'idbrwt' : 'idbrot';
    this.ga = k;
  }
  function ip(a) {
    a.j.j = !0;
    a.v.X();
    a.g && (Wf(a.G, a.g), (a.g = null));
    Ip(a.C, a);
  }
  n = Ep.prototype;
  n.abort = function (a) {
    Gp(this, !1, a);
  };
  function Gp(a, b, c) {
    var d = a.j;
    if (!d.o && !d.g) {
      Jp(a);
      d.g = !0;
      try {
        a.B.abort();
      } catch (e) {
        ('InvalidStateError' == e.name && b) ||
          ((d = Fp(a)), (d.abortFromTimeout = b), a.o.info(e, d));
      }
      c && !a.J && (a.L(c), (a.J = !0));
      a.v.X();
      Ip(a.C, a);
    }
  }
  function Z(a, b) {
    Jp(a);
    return new qp(a.B.objectStore(b), a.j, a.N, a.o);
  }
  function Kp(a, b) {
    if (a.F) throw Error('Completion callback already set');
    a.F = b;
  }
  n.va = m('j');
  function Jp(a) {
    if (!a.B) throw Error('Transaction does not exist');
  }
  n.Oc = function (a) {
    this.j.j ||
      ((this.j.o = !0),
      this.g && (Wf(this.G, this.g), (this.g = null)),
      Ip(this.C, this),
      this.v.X(),
      this.j.g ||
        ((a.target.docs_internalAbort = !0),
        !this.A && a.target.error && 'QuotaExceededError' == a.target.error.name
          ? this.F && this.F()
          : Lp(this, 'LocalStore IndexedDB transaction abort', Fp(this), a)));
  };
  n.Pc = function () {
    this.j.j ||
      (Ip(this.C, this),
      this.g && (Uf(this.G, this.g), (this.g = null)),
      this.v.X(),
      this.F && this.F());
  };
  n.Lb = function (a) {
    a.stopPropagation();
    var b = this.j;
    if (
      !(
        b.j ||
        b.o ||
        b.g ||
        ((b = a.target.error), b && 'AbortError' == b.name)
      ) &&
      ((b = Fp(this)),
      (b.request = a.target.docs_requestContext),
      Lp(this, 'LocalStore IndexedDB error', b, a),
      (a = this.C),
      O(P(), 'docs-ewtaoe') && this.A)
    ) {
      delete a.g[this.I()];
      b = 0;
      for (var c in a.g) {
        var d = Number(c),
          e = a.g[d];
        e.A && (e.abort(), delete a.g[d], b++);
      }
      a.j = !0;
      a.o.info(
        Error(
          'Handled fatal error of transaction: ' +
            this.I() +
            ' and aborted ' +
            b +
            ' transactions ',
        ),
      );
    }
  };
  function Lp(a, b, c, d) {
    b = b + ' (' + a.K + '): ' + xm(d);
    a.o.info(Error(b), c);
    c = new ch(1, b, d, a.ga);
    a.J || (a.L(c), (a.J = !0));
  }
  n.I = m('M');
  function Fp(a) {
    var b = ym(a.D.objectStoreNames);
    b = {
      databaseName: a.D.name,
      databaseObjectStores: b,
      databaseVersion: a.D.version,
      transactionAllowWrite: a.A,
      transactionContext: a.K,
      transactionId: a.M,
      transactionObjectStores: a.U.toString(),
    };
    a = a.N;
    var c = Za(a.g);
    b.pendingRequestCount = c.length;
    b.pendingRequests = c.toString();
    b.requestErrorCount = a.j;
    b.requestSuccessCount = a.o;
    return b;
  }
  function Mp(a) {
    this.o = a;
    this.g = {};
    this.j = !1;
  }
  Mp.prototype.add = function (a) {
    if (a.A || !this.j) this.g[a.I()] = a;
  };
  function Ip(a, b) {
    delete a.g[b.I()];
  }
  var Hp = 0;
  function Np(a, b) {
    mj.call(this, 'g', b);
    this.newVersion = a;
  }
  q(Np, mj);
  function Op(a, b) {
    W.call(this);
    this.v = a;
    this.A = b;
    this.g = null;
    this.j = !1;
    this.D = new Mp(b);
    this.B = new qg();
    X(this, this.B);
    this.o = new qg();
    X(this, this.o);
    this.J = r.indexedDB || r.webkitIndexedDB;
  }
  q(Op, W);
  Op.prototype.G = function (a) {
    this.j = !0;
    this.close();
    rg(this.o, new Np(Number(a.version) || a.newVersion || 0));
  };
  Op.prototype.close = function () {
    this.g &&
      ((this.g.onversionchange = null), this.g.close(), (this.g = null));
  };
  function Pp(a, b) {
    if (a.g) throw Error('IdbDocsDatabase already managing a database.');
    if (null != b.onversionchange)
      throw Error('This database is being managed by another class.');
    b.onclose = function () {
      var c = {};
      c.optinBackup = zp();
      a.A.info(Error('The database connection was closed.'), c);
      rg(a.B, null);
    };
    b.onerror = jp('Database error.', a.v);
    b.onversionchange = v(a.G, a);
    a.g = b;
  }
  function Qp(a) {
    if (!a.g) return -1;
    a = parseInt(a.g.version, 10);
    return 0 <= a ? a : -1;
  }
  function Rp(a, b, c, d, e) {
    if (!a.g)
      throw Error('Cannot open transaction on uninitialized IdbDocsDatabase');
    if (e && a.D.j)
      throw Error(
        'Cannot open read-write transactions because of a previous fatal error in a read-write transaction.',
      );
    a = new Ep(a.g, b, c, a.A, d || a.v, a.D, e);
    null != a.S && (a.g = Sf(a.G, a.S, !0));
    b = a.A ? 'readwrite' : 'readonly';
    a.v.start();
    try {
      var f = a.D.transaction(a.U, b);
    } catch (g) {
      throw ((f = Fp(a)), qh(g, f));
    }
    f.onabort = um(a.o, a.Oc, a);
    f.oncomplete = um(a.o, a.Pc, a);
    f.onerror = um(a.o, a.Lb, a, !0);
    a.B = f;
    a.C.add(a);
    return a;
  }
  function Sp(a, b, c, d, e) {
    if (Qp(a) >= b)
      throw Error(
        'Upgrading to a version (' +
          b +
          ') less than or equal to current version (' +
          Qp(a) +
          ')',
      );
    var f = a.g.name;
    a.close();
    var g = a.A;
    b = new Bp(a.J.open(f, b), g, 'setVersion database.open');
    Dp(b, function (h) {
      h = h.target.transaction;
      h.onabort = h.onerror = um(g, d, {}, !0);
      c(h);
    });
    np(b, d);
    Cp(b, function (h) {
      g.info(Error('Onblocked handler called when upgrading database.'), {
        'Old version': h.oldVersion,
        'New version': h.newVersion,
      });
    });
    gp(b, function (h) {
      Pp(a, h.target.result);
      e(h);
    });
  }
  Op.prototype.H = function () {
    this.close();
    W.prototype.H.call(this);
  };
  function Tp(a, b, c, d) {
    ah.call(this, a, d);
    this.Nc = b;
    this.Mb = c;
  }
  q(Tp, ah);
  Tp.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'append-commands':
        Up(this, a, b);
        break;
      default:
        throw Error('Unsupported operation type ' + a.getType());
    }
  };
  function Up(a, b, c) {
    if (b.F) {
      var d = Z(c, 'DocumentCommands');
      Vp(b.v, d, function () {
        return Wp(a, b, c);
      });
    } else Wp(a, b, c);
  }
  function Vp(a, b, c) {
    ep(b, [a], [a, []], c);
  }
  function Wp(a, b, c) {
    c = Z(c, 'DocumentCommands');
    for (var d = b.A, e = 0; e < d.length; ++e) {
      for (
        var f = a, g = b.v, h = d[e], k = h.g(), l = [], p = 0;
        p < k.length;
        ++p
      )
        l.push(f.Wa.R(k[p]));
      f = tp(g, h.j(), h.o(), h.A(), h.v(), l);
      rp(c, f.g);
    }
  }
  function Xp(a, b, c, d) {
    this.j = a;
    this.v = b;
    this.g = c;
    this.o = d;
  }
  Xp.prototype.R = function () {
    var a = {};
    a.e = this.j;
    a.dlKey = [this.v];
    a.sId = this.g;
    a.cId = this.o;
    return a;
  };
  function Yp(a, b, c, d) {
    W.call(this);
    var e = this;
    this.j = a;
    this.o = b;
    this.v = 0;
    this.D = d;
    this.B = new Ci();
    X(this, this.B);
    Di(this.B, c.o, function () {
      e.A();
    });
    this.G = new Yl(this);
    this.J = new qg();
    X(this, this.J);
    this.K = !1;
    this.g = this.L = null;
  }
  q(Yp, W);
  function Zp(a, b, c) {
    $p(a, b, c, function (d, e) {
      'unavailable' == d &&
        (aq(a, e, 'ensureDocumentLockAvailable'),
        c.abort(new ch(2, 'Lock not available')));
    });
  }
  function bq(a, b, c) {
    if (r.navigator.locks) cq(a, b, c);
    else {
      a.g && Pj(a.g);
      var d = function () {
        jj(a.g);
        a.g = null;
        c.abort(new ch(2, 'Lock could not be refreshed'));
      };
      dq(
        a,
        b,
        c,
        function (e) {
          e && e.g == a.j
            ? eq(
                a,
                b,
                c,
                e,
                function () {
                  a.g && a.g.start();
                },
                d,
              )
            : (aq(a, e, 'refreshDocumentLock'), d());
        },
        d,
      );
    }
  }
  function cq(a, b, c) {
    dq(
      a,
      b,
      c,
      function (d) {
        (d && d.g == a.j) ||
          (aq(a, d, 'ensureDocumentLockOwner'),
          c.abort(
            new ch(
              2,
              'Lock not available: session is not the current lock-holder',
            ),
          ));
      },
      function (d) {
        c.abort(d);
      },
    );
  }
  function dq(a, b, c, d, e) {
    b = Z(c, 'DocumentLocks').get([b]);
    gp(b, function (f) {
      a.Ba() ||
        ((f = f.target.result),
        d(f ? new Xp(f.e, f.dlKey[0], f.sId, f.cId || null) : null));
    });
    e && np(b, Xa(e));
  }
  function $p(a, b, c, d) {
    dq(
      a,
      b,
      c,
      function (e) {
        if (e) {
          var f = 0 == a.o;
          var g = Date.now();
          if (e.g == a.j) f = 'available';
          else {
            var h = window.localStorage;
            f =
              h && h.getItem('dcl_' + e.g)
                ? 'available'
                : e.j + (f ? 6e4 : 0) <= g || e.j > g + 36e4
                  ? 'expiredOtherSid'
                  : 'unavailable';
          }
        } else f = 'available';
        d(f, e);
      },
      void 0,
    );
  }
  function aq(a, b, c) {
    if (!(0 >= a.o)) {
      var d = Date.now(),
        e = {};
      e.lockReadReason = c;
      e.lockDuration = a.o;
      a.v && (e.lastWrittenValidUntil = a.v - d);
      var f = 'IndexedDB document lock not available';
      if (b) {
        if (
          ((e.lockHoldingSessionId = b.g),
          (e.validUntil = b.j - d),
          r.navigator.locks)
        )
          if ('acquireDocumentLock' == c)
            f =
              'IndexedDB document lock not available after Web Locks API fallback';
          else if ('ensureDocumentLockOwner' == c || 'refreshDocumentLock' == c)
            (b = (c = window.localStorage) && c.getItem('dcl_' + b.g)),
              (e.lockReleased = !!b),
              (e.webLockHasBeenAcquired = a.K),
              (e.webLockReleaseReason = a.L);
      } else
        f =
          'IndexedDB document lock not available because the lock does not exist';
      a.D.info(Error(f), e);
    }
  }
  function eq(a, b, c, d, e, f) {
    var g = Date.now(),
      h = 0;
    d && a.j == d.g && (h = d.j);
    d = Math.min(Math.max(g + a.o, h), g + 6e4);
    a.v = d;
    a = rp(Z(c, 'DocumentLocks'), new Xp(d, b, a.j, null).R());
    gp(a, Xa(e));
    f && np(a, Xa(f));
  }
  Yp.prototype.A = function () {
    if (!r.navigator.locks) {
      jj(this.g);
      this.g = null;
      var a = window.localStorage;
      if (a)
        try {
          a.setItem('dcl_' + this.j, String(Date.now()));
        } catch (d) {
          for (var b = 0, c = 0; c < a.length; c++) lb(a.key(c), 'dcl_') && b++;
          throw qh(d, { keysTotal: String(a.length), locksTotal: String(b) });
        }
    }
    Promise.resolve();
  };
  Yp.prototype.H = function () {
    this.G.X();
    jj(this.g);
    this.g = null;
    W.prototype.H.call(this);
  };
  function fq(a) {
    this.g = !1;
    this.j = a;
  }
  q(fq, zh);
  fq.prototype.A = function () {
    this.j.A();
  };
  fq.prototype.$ = function () {
    return ['DocumentLocks'];
  };
  fq.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'document-lock':
        switch (a.A) {
          case 2:
            bq(this.j, a.v, b);
            break;
          case 1:
            Zp(this.j, a.v, b);
        }
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  fq.prototype.H = function () {
    zh.prototype.H.call(this);
    this.j.X();
  };
  function gq() {}
  function hq(a, b, c, d, e, f) {
    e = e
      ? function () {
          d(new ch(6, 'Timeout opening database.'));
        }
      : void 0;
    var g = ng();
    f && (g.j('odbs'), Qj(v(g.j, g, 'odbjy')));
    e = new Bp(
      (r.indexedDB || r.webkitIndexedDB).open('GoogleDocs'),
      c,
      'database.open',
      e,
      $f(P(), 'docs-localstore-iort'),
      'idbodb',
    );
    gp(e, function (h) {
      f && g.j('odbc');
      var k = new Op(b, c);
      Pp(k, h.target.result);
      a(k);
    });
    np(e, jp('Error opening database.', d));
  }
  function iq(a, b) {
    var c = (r.indexedDB || r.webkitIndexedDB).deleteDatabase('GoogleDocs');
    c.onsuccess = a;
    c.onerror = jp('Error deleting database.', b);
  }
  function jq() {}
  function kq(a, b, c, d, e) {
    c && ((e = e || []), gp(d.get(b), v(a.g, a, d, c, e)));
  }
  jq.prototype.g = function (a, b, c, d) {
    d = d.target.result;
    if (void 0 !== d) {
      for (var e in b) {
        var f = b[e];
        0 <= La(c, e) ? (d[e] = null != f ? f : null) : (d[e] = f);
      }
      rp(a, d);
    } else throw Error('Could not find object to update.');
  };
  function lq(a, b, c) {
    var d = Rp(a, ['ProfileData'], 'Error removing document ids', void 0, !0);
    mq(
      b,
      function (e) {
        for (var f = 0; f < c.length; f++) Qa(e, c[f]);
        f = {};
        f.dataType = b;
        f.documentIds = e;
        rp(Z(d, 'ProfileData'), f);
        Kp(d, ya);
      },
      d,
    );
  }
  function mq(a, b, c) {
    gp(Z(c, 'ProfileData').get(a), function (d) {
      d = d.target.result;
      b(d && d.documentIds ? d.documentIds : []);
    });
  }
  function nq(a, b, c) {
    this.g = !1;
    this.j = c;
  }
  q(nq, uh);
  nq.prototype.$ = function () {
    return ['Comments'];
  };
  nq.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'update-record':
        b = Z(b, 'Comments');
        S(a);
        if (a.j) {
          var c = a.g,
            d = {};
          d.cmtKey = S(a);
          d.stateIndex = [c.s, c.di];
          d.da = c.da;
          rp(b, d);
        } else {
          d = a.g;
          a = S(a);
          var e = {};
          's' in d && ((e.stateIndex = [d.s, a[0]]), delete d.s);
          for (c in d) e[c] = d[c];
          kq(this.j, a, e, b);
        }
        break;
      case 'delete-record':
        b = Z(b, 'Comments');
        a = S(a);
        fp(b, a);
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function oq() {
    this.g = !1;
  }
  q(oq, Nh);
  var pq = { Rb: 'l', Tb: 's', Sb: 'r' };
  function qq(a, b, c, d) {
    vh.call(this, d);
    this.j = a;
    this.v = c;
  }
  q(qq, vh);
  function rq(a, b, c) {
    if (a.j.j)
      Qj(function () {
        return b([]);
      });
    else {
      var d = Rp(a.j, ['Documents'], 'Error reading documents.', c);
      sq(
        a,
        function (e) {
          ip(d);
          b(e);
        },
        d,
      );
    }
  }
  function tq(a, b, c) {
    if (a.j.j)
      Qj(function () {
        return b([]);
      });
    else {
      var d = Rp(
        a.j,
        ['Documents', 'PendingQueueCommands'],
        'Error reading documents with pending changes.',
        c,
      );
      hp(
        d,
        'PendingQueueCommands',
        function (e) {
          var f = e.c;
          return f && 0 != f.length ? e.pqcKey[0] : null;
        },
        function (e) {
          return uq(a, d, b, e);
        },
      );
    }
  }
  function vq(a, b, c) {
    rq(a, b, c);
  }
  function wq(a, b, c, d) {
    d = Rp(a.j, ['Documents'], 'Error reading documents.', d);
    uq(a, d, c, b);
  }
  function uq(a, b, c, d) {
    if (0 >= d.length) c([]);
    else {
      Ua(d);
      for (var e = [], f = 0; f < d.length; f++)
        hp(
          b,
          'Documents',
          function (g) {
            return xq(a, g);
          },
          function (g) {
            0 < g.length && e.push(g[0]);
          },
          d[f],
        );
      Kp(b, function () {
        c(e);
      });
    }
  }
  function sq(a, b, c) {
    hp(
      c,
      'Documents',
      function (d) {
        return xq(a, d);
      },
      b,
      void 0,
    );
  }
  function xq(a, b) {
    var c = new Ug(b.id, b.documentType, !1);
    T(c, 'title', b.title);
    T(c, 'lastSyncedTimestamp', b.lastSyncedTimestamp);
    T(c, 'jobset', b.jobset);
    Gg(c, 'isFastTrack', !!b.isFastTrack);
    T(c, 'lastModifiedServerTimestamp', b.lastModifiedServerTimestamp);
    T(c, 'lastColdStartedTimestamp', b.lastColdStartedTimestamp);
    T(c, 'lastWarmStartedTimestamp', b.lastWarmStartedTimestamp);
    var d = b.acl;
    for (g in d) Kg(c, 'acl', g, cf(d[g]));
    d = b.acjf;
    for (var e in d) {
      var f = ic(og, d[e]);
      var g = e;
      f = f.R();
      Kg(c, 'acjf', g, f);
    }
    T(c, 'docosKeyData', b.docosKeyData || null);
    Gg(c, 'inc', !!b.inc);
    e = b.lastModifiedClientTimestamp;
    null != e && T(c, 'lastModifiedClientTimestamp', e);
    if ((e = b.startupHints)) for (var h in e) Kg(c, 'startupHints', h, e[h]);
    (h = b.ic) && T(c, 'ic', h);
    Gg(c, 'hpmdo', !!b.hpmdo);
    Gg(c, 'ips', !!b.ips);
    c.Qa(!!b.ip);
    Gg(c, 'pendingCreation', !!b.pendingCreation);
    h = b.fact;
    null != h && T(c, 'fact', h);
    Gg(c, 'modelNeedsResync', !!b.modelNeedsResync);
    Gg(c, 'ind', !!b.ind);
    Gg(c, 'isd', !!b.isd);
    h = b.mimeType;
    null != h && T(c, 'mimeType', h);
    Gg(c, 'ibup', !!b.ibup);
    h = b.modelVersion;
    null != h && T(c, 'modelVersion', h);
    h = b.featureVersion;
    null != h && T(c, 'featureVersion', h);
    h = b.rev;
    null != h &&
      ((e = b.rai),
      null != e ? (e = e ? new dh(e[0]) : null) : (e = null),
      T(c, 'rev', h),
      (h = c.F.R(e)),
      T(c, 'rai', h));
    h = b.lsst;
    null != h && T(c, 'lsst', h);
    h = b.lss;
    null != h && Gg(c, 'lss', !!h);
    h = b.lsft;
    null != h && T(c, 'lsft', h);
    h = b.odocid;
    null != h && T(c, 'odocid', h);
    h = b.relevancyRank;
    null != h && T(c, 'relevancyRank', h);
    h = b.lastServerSnapshotTimestamp;
    null != h && T(c, 'lastServerSnapshotTimestamp', h);
    h = b.snapshotState;
    null != h && ((h = cf(h)), T(c, 'snapshotState', h));
    h = b.snapshotProtocolNumber;
    void 0 !== h &&
      (nf(
        null == h || 0 <= h,
        'Cannot set snapshotProtocolNumber to a negative number.',
      ),
      T(c, 'snapshotProtocolNumber', h));
    h = b.snapshotVersionNumber;
    void 0 !== h &&
      (nf(
        null == h || 0 <= h,
        'Cannot set snapshotVersionNumber to a negative number.',
      ),
      T(c, 'snapshotVersionNumber', h));
    h = b.pendingQueueState;
    null != h && ((h = cf(h)), T(c, 'pendingQueueState', h));
    h = b.fileLockedReason;
    null != h && T(c, 'fileLockedReason', h);
    h = b.quotaStatus;
    null != h && ((h = cf(h)), T(c, 'quotaStatus', h));
    h = b.initialSyncReason;
    null == h ||
      (null == Dg(c, 'initialSyncReason') && T(c, 'initialSyncReason', h));
    h = b.resourceKey;
    null != h && T(c, 'resourceKey', h);
    b = b.initialPinSourceApp;
    null != b && Yg(c, b);
    if (!c || 'trix' == c.getType() || 'syncstats' == c.getType()) return null;
    if (!a.kb[c.getType()])
      throw (
        ((a = Error('No document adapter found for type: ' + c.getType())),
        qh(a, {
          localStoreDoc_hasTitle: !!Eg(c, 'title'),
          localStoreDoc_id: c.I(),
          localStoreDoc_isCreated: (!0 !== Fg(c, 'inc')).toString(),
          localStoreDoc_lastModifiedClientTimestamp: Cg(
            c,
            'lastModifiedClientTimestamp',
          ).toString(),
          localStoreDoc_lastModifiedServerTimestamp: Cg(
            c,
            'lastModifiedServerTimestamp',
          ).toString(),
          localStoreDoc_lastSyncedTimestamp: Cg(
            c,
            'lastSyncedTimestamp',
          ).toString(),
          localStoreDoc_revision: Dg(c, 'rev').toString(),
        }))
      );
    c.v = !1;
    return c;
  }
  function yq(a, b, c) {
    var d = Rp(a.j, ['Comments', 'Documents'], 'Error reading comments.', c);
    hp(
      d,
      'Comments',
      function (e) {
        return e[1];
      },
      function (e) {
        return uq(a, d, b, e);
      },
      [2],
      [2, []],
      'StateIndex',
      !1,
      !0,
    );
  }
  qq.prototype.$ = function (a) {
    if (!this.V(a))
      throw Error(
        'Cannot get object store names for operation type ' + a.getType(),
      );
    var b = ['DocumentCommands', 'Documents'];
    'delete-record' == a.getType() &&
      (b = b.concat([
        'Comments',
        'DocumentEntities',
        'PendingQueueCommands',
        'PendingQueues',
      ]));
    return b;
  };
  qq.prototype.Z = function (a, b) {
    var c = Z(b, 'Documents');
    switch (a.getType()) {
      case 'update-record':
        a.j ? c.add(a.g) : kq(this.v, S(a), a.g, c, zq);
        break;
      case 'delete-record':
        Aq(this, a, b);
        break;
      default:
        this.sa(a.C).Z(a, b);
    }
  };
  function Aq(a, b, c) {
    b.v
      ? a.o(b, c)
      : Bq(S(b), c, function (d) {
          d ? c.abort(new ch(5, 'Pending changes found')) : a.o(b, c);
        });
  }
  function Bq(a, b, c) {
    gp(ap(Z(b, 'PendingQueueCommands'), [a], [a, []]), function (d) {
      d.target.result ? c(!0) : Cq(a, b, c);
    });
  }
  function Cq(a, b, c) {
    gp(cp(Z(b, 'Comments'), 'StateIndex').get([2, a]), function (d) {
      c(!!d.target.result);
    });
  }
  qq.prototype.o = function (a, b) {
    a = S(a);
    var c = Z(b, 'DocumentCommands');
    ep(c, [a], [a, []]);
    c = Z(b, 'PendingQueueCommands');
    ep(c, [a], [a, []]);
    c = Z(b, 'PendingQueues');
    ep(c, a);
    c = Z(b, 'Documents');
    ep(c, a);
    c = Z(b, 'DocumentLocks');
    ep(c, [a]);
    c = Z(b, 'Comments');
    ep(c, [a], [a, []]);
    lq(this.j, 'nonsnapshottedocumentids', [a]);
    lq(this.j, 'missingdocosdocumentids', [a]);
    b = Z(b, 'DocumentEntities');
    ep(b, [a], [a, []]);
  };
  var zq =
    'initialPinSourceApp lastModifiedClientTimestamp lastWarmStartedTimestamp quotaStatus relevancyRank rev rai snapshotProtocolNumber snapshotVersionNumber odocid'.split(
      ' ',
    );
  function Dq() {}
  Dq.prototype.g = function (a, b, c, d, e) {
    return new qq(a, b, c, d, e);
  };
  function Eq(a, b, c, d) {
    wh.call(this, c);
    this.j = a;
    this.o = d;
  }
  q(Eq, wh);
  function Fq(a, b, c) {
    c = Rp(
      a.j,
      ['ApplicationMetadata'],
      'Error reading application metadata.',
      c,
    );
    hp(
      c,
      'ApplicationMetadata',
      function (d) {
        var e = d.dt;
        if (null == e) throw Error('Document type expected to be defined.');
        var f = new fh(e, !1);
        e = a.sa(e);
        var g = d.jobset;
        null != g && T(f, 'jobset', g);
        g = d.ic;
        null != g && ((e = e.qb(g)), (f.F = e.slice(0)), (f.A = !0));
        (e = d.docosKeyData) && T(f, 'docosKeyData', e);
        d = d.version;
        d = cf(void 0 !== d ? d : 0);
        T(f, 'version', d);
        f.v = !1;
        return f;
      },
      b,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      !0,
    );
  }
  Eq.prototype.$ = function (a) {
    if (!this.V(a))
      throw Error(
        'Cannot get object store names for operation type ' + a.getType(),
      );
    return ['ApplicationMetadata'];
  };
  Eq.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'update-application-metadata':
        var c = this.sa(S(a)),
          d = a.g;
        if (a.v) {
          if (a.v) var e = a.v;
          else throw M('No new initial commands are available.').g;
          for (var f = [], g = 0; g < e.length; g++) f.push(c.Wa.R(e[g]));
          d.ic = f;
        }
        b = Z(b, 'ApplicationMetadata');
        a.j ? rp(b, d) : kq(this.o, S(a), d, b);
        break;
      default:
        throw Error('Cannot perform operation of type ' + a.getType());
    }
  };
  function Gq(a, b, c) {
    this.g = !1;
    this.j = c;
  }
  q(Gq, yh);
  Gq.prototype.$ = function () {
    return ['DocumentEntities'];
  };
  Gq.prototype.Z = function (a, b) {
    b = Z(b, 'DocumentEntities');
    switch (a.getType()) {
      case 'update-record':
        if (a.j) {
          var c = {};
          c.deKey = S(a);
          c.data = a.g.data;
          rp(b, c);
        } else (c = {}), (c.data = a.g.data), (a = S(a)), kq(this.j, a, c, b);
        break;
      case 'delete-record':
        ep(b, S(a));
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function Hq() {
    this.g = !1;
  }
  q(Hq, Eh);
  Hq.prototype.$ = function () {
    return ['Impressions'];
  };
  Hq.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'update-record':
        if (a.j) {
          b = Z(b, 'Impressions');
          a = a.g;
          var c = {};
          c.iKey = [a.di || '', a.ibt];
          c.dt = a.dt;
          c.iba = a.iba;
          rp(b, c);
        } else throw Error('Impressions may not be updated.');
        break;
      case 'delete-record':
        ep(Z(b, 'Impressions'), S(a));
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function Iq() {
    this.g = !1;
  }
  q(Iq, Fh);
  function Jq(a, b, c, d) {
    Th.call(this, c, new If(d));
  }
  q(Jq, Th);
  Jq.prototype.$ = function () {
    return ['PendingQueueCommands', 'PendingQueues'];
  };
  Jq.prototype.Z = function (a, b) {
    var c = this;
    a instanceof sg && !a.j
      ? gp(Z(b, 'PendingQueues').get(S(a)), function (d) {
          d = d.target.result;
          if (!d) throw Error('Tried to update a non-existent pending queue.');
          Kq(c, a, b, d);
        })
      : Kq(this, a, b);
  };
  function Kq(a, b, c, d) {
    if (d) {
      var e = b.g,
        f = e.revision,
        g = e.revisionAccessInfo;
      null != f && (d.r = f);
      void 0 !== g && (d.ra = g);
      f = e.selection;
      null != f && (d.s = f);
      f = e.accessLevel;
      null != f && (d.a = f);
      f = e.undeliverable;
      void 0 !== f && (d.u = !!f);
      f = e.unsavedChanges;
      void 0 !== f && (d.uc = !!f);
      g = e.sentBundlesSavedRevision;
      void 0 !== g && (d.sbsr = g);
      g = e.unsentBundleMetadata;
      void 0 !== g && (d.ubm = g);
      e = e.snapshotBundleIndex;
      void 0 !== e && (d.sbi = e);
      if (f) {
        a = a.g.g;
        try {
          r.localStorage.setItem('docs-ucb', '1');
        } catch (h) {
          a.info(
            Error(
              'Error setting unsaved changes bit in Local Storage: ' +
                h.message,
            ),
          );
        }
      }
    }
    switch (b.getType()) {
      case 'pq-clear':
        d = d || Lq(b);
        b = S(b);
        a = Z(c, 'PendingQueueCommands');
        ep(a, [b], [b, []]);
        d.b = [];
        Mq(d, c);
        break;
      case 'pq-clear-sent':
        d = d || Lq(b);
        a = d.b;
        0 < a.length &&
          ((a = a[a.length - 1].l),
          (e = Z(c, 'PendingQueueCommands')),
          (b = S(b)),
          ep(e, [b], [b, a]),
          (d.b = []));
        Mq(d, c);
        break;
      case 'pq-clear-sent-bundle':
        d = d || Lq(b);
        a = d.b.shift().l;
        e = Z(c, 'PendingQueueCommands');
        b = S(b);
        ep(e, [b], [b, a]);
        Mq(d, c);
        break;
      case 'pq-mark-sent':
        d = d || Lq(b);
        a = b.v;
        b.C && (d.b = []);
        for (b = 0; b < a.length; b++)
          (e = a[b]),
            (f = pq),
            (g = {}),
            (g[f.Rb] = e.g),
            (g[f.Tb] = e.o),
            (g[f.Sb] = e.j),
            d.b.push(g);
        Mq(d, c);
        break;
      case 'update-record':
        b = d || Lq(b);
        Mq(b, c);
        break;
      case 'pq-write-commands':
        d = b.A;
        a = {};
        a.pqcKey = [b.C, b.v];
        a.c = d;
        rp(Z(c, 'PendingQueueCommands'), a);
        break;
      case 'pq-delete-commands':
        c = Z(c, 'PendingQueueCommands');
        d = b.v;
        ep(c, [d], [d, b.A]);
        break;
      default:
        throw Error('Unsupported operation type: ' + b.getType());
    }
  }
  function Mq(a, b) {
    rp(Z(b, 'PendingQueues'), a);
  }
  function Lq(a) {
    var b = a.g;
    a = {};
    var c = b.accessLevel;
    void 0 !== c && (a.a = c);
    a.docId = b.docId;
    a.r = b.revision;
    a.ra = b.revisionAccessInfo;
    a.ubm = b.unsentBundleMetadata;
    a.s = b.selection;
    a.b = [];
    a.t = b.documentType;
    a.u = !!b.undeliverable;
    a.uc = !!b.unsavedChanges;
    c = b.sentBundlesSavedRevision;
    null != c && (a.sbsr = c);
    b = b.snapshotBundleIndex;
    void 0 !== b && (a.sbi = b);
    return a;
  }
  function Nq(a) {
    this.g = !1;
    this.j = a;
  }
  q(Nq, th);
  function Oq(a, b, c) {
    iq(function () {
      a.j.j = !0;
      b();
    }, c || a.j.v);
  }
  Nq.prototype.$ = function () {
    throw Error('No object store available.');
  };
  Nq.prototype.Z = function (a) {
    throw Error('Operation type ' + a.getType() + ' not supported.');
  };
  function Pq(a, b, c, d) {
    this.g = !1;
    this.j = a;
    this.v = c;
    this.o = d;
  }
  q(Pq, wi);
  function yi(a, b, c) {
    if (a.j.j) Qj(Ha(b, []));
    else if (0 <= La(a.j.g.objectStoreNames, 'Users')) {
      a = Rp(a.j, ['Users'], 'Error reading users.', c);
      var d = [];
      gp(Z(a, 'Users').get(kp.lowerBound(-Infinity)), function (e) {
        if ((e = e.target.result)) {
          var f = new ri(e.id, !1);
          si(f, e.emailAddress);
          ti(f, e.locale);
          null != e.fastTrack && ui(f, !!e.fastTrack);
          null != e.internal && vi(f, !!e.internal);
          null != e.optInReasons && T(f, 'optInReasons', e.optInReasons);
          null != e.optInTime && T(f, 'optInTime', e.optInTime);
          f.v = !1;
          d = [f];
        }
      });
      Kp(a, function () {
        return b(d);
      });
    } else
      a.o.log(Error('Reading from uninitialized IDB database.')), Qj(Ha(b, []));
  }
  Pq.prototype.$ = function (a) {
    if (!this.V(a))
      throw Error(
        'Cannot get object store names for operation type ' + a.getType(),
      );
    return ['Users'];
  };
  Pq.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'update-record':
        b = Z(b, 'Users');
        a.j ? b.add(a.g) : kq(this.v, S(a), a.g, b);
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function Qq(a, b, c, d, e, f) {
    fi.call(this);
    var g = this;
    this.L = d;
    this.cb = new Yl(this);
    this.A = new $o();
    this.o = new jq();
    this.M = new Ci();
    kf(this, this.M);
    this.j = a;
    Di(this.M, this.j.o, function (h) {
      rg(g.U, new ei(h.newVersion));
    });
    this.K = b;
    this.G = new Jq(this.j, this.A, this.K, this.L);
    gi(this, this.G);
    this.v = Rq(this, this.K, f);
    gi(this, this.v);
    this.S = new fq(c);
    this.C = new Pq(a, this.A, this.o, d);
    gi(this, this.C);
    this.N = new Nq(a);
  }
  q(Qq, fi);
  Qq.prototype.J = m('N');
  function Rq(a, b, c) {
    c = void 0 === c ? new Dq() : c;
    return c.g(a.j, a.A, a.o, b, a.L);
  }
  function Mh(a, b, c, d) {
    if (a.j.j) Qj(c);
    else {
      for (var e = {}, f = 0; f < b.length; f++) {
        var g = b[f];
        g = Sq(a, g).$(g);
        for (var h = 0; h < g.length; h++) e[g[h]] = !0;
      }
      d = Rp(a.j, $a(e), 'Error writing records.', d, !0);
      Kp(d, c);
      for (c = 0; c < b.length; c++) (e = b[c]), Sq(a, e).Z(e, d);
    }
  }
  function Sq(a, b) {
    if (tg(b)) {
      b = b.A;
      a = b in a.F ? a.F[b] : null;
      if (!a) throw Error('No capability registered for record type ' + b);
      return a;
    }
    b = b.getType();
    if (
      'pq-clear' == b ||
      'pq-clear-sent' == b ||
      'pq-clear-sent-bundle' == b ||
      'pq-delete-commands' == b ||
      'pq-mark-sent' == b ||
      'pq-write-commands' == b
    )
      return a.G;
    if ('document-lock' == b) return a.S;
    if ('append-commands' == b || 'write-trix' == b) return a.v;
    if ('update-application-metadata' == b) {
      if ((a = a.bb())) return a;
    } else if ('append-template-commands' == b && (a = a.tb())) return a;
    throw Error('No capability registered for operation type ' + b);
  }
  function Tq(a, b, c) {
    var d = a.La();
    if (Qp(a.j) >= d) throw Error('Database already at expected version.');
    Sp(
      a.j,
      d,
      function (e) {
        return Uq(a, c, e);
      },
      jp('Error initializing the database.', c),
      b,
    );
  }
  function Uq(a, b, c) {
    try {
      a.Ja(c);
    } catch (d) {
      Qj(function () {
        return b(new ch(1, 'Failed to initialize database.', d));
      });
    }
  }
  function Vq(a, b, c) {
    Sp(
      a.j,
      a.La(),
      function (d) {
        return Wq(a, c, d);
      },
      jp('Error upgrading the database.', c),
      b,
    );
  }
  function Wq(a, b, c) {
    try {
      a.jb(c);
    } catch (d) {
      Qj(function () {
        return b(new ch(1, 'Failed to upgrade database.', d));
      });
    }
  }
  Qq.prototype.H = function () {
    kj(this.cb, this.S, this.G, this.v, this.C, this.N);
    fi.prototype.H.call(this);
  };
  function cr(a, b, c) {
    this.g = !1;
    this.j = a;
    this.o = c;
  }
  q(cr, mi);
  function dr(a, b, c, d) {
    b = ['synchints', '' + b];
    var e = Rp(a.j, ['ProfileData'], 'Error reading syncHints.', d);
    gp(Z(e, 'ProfileData').get(b), function (f) {
      ip(e);
      (f = f.target.result) ? c(er(f)) : c(null);
    });
  }
  cr.prototype.$ = function () {
    return ['ProfileData'];
  };
  cr.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'update-record':
        b = Z(b, 'ProfileData');
        a.j ? rp(b, a.g) : kq(this.o, S(a), a.g, b);
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function er(a) {
    var b = a.sourceApp;
    if (!Va(a.dataType, ['synchints', '' + b]))
      throw Error('Invalid data type.');
    var c = a.docIds,
      d = a.lastUpdatedTimestamp;
    a = a.docIdentifiers;
    b = new ji(!1, b);
    a && 0 < a.length
      ? ki(
          b,
          a.map(function (e) {
            return new ii(e.docId, e.resourceKey);
          }),
        )
      : c && 0 < c.length && li(b, c);
    T(b, 'lastUpdatedTimestamp', d);
    b.v = !1;
    return b;
  }
  function fr() {
    this.g = !1;
  }
  q(fr, ni);
  fr.prototype.$ = function () {
    return ['SyncObjects'];
  };
  fr.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'update-record':
        b = Z(b, 'SyncObjects');
        if (a.j) rp(b, a.g);
        else throw Error('SyncObject update is not implemented.');
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function gr(a, b) {
    this.g = !1;
    this.j = b;
  }
  q(gr, oi);
  gr.prototype.$ = function () {
    return ['ProfileData'];
  };
  gr.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'update-record':
        b = Z(b, 'ProfileData');
        a.j ? rp(b, a.g) : kq(this.j, 'syncstats', a.g, b);
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function hr() {
    this.g = !1;
  }
  q(hr, zi);
  hr.prototype.$ = function () {
    return ['FontMetadata'];
  };
  hr.prototype.Z = function (a, b) {
    b = Z(b, 'FontMetadata');
    switch (a.getType()) {
      case 'update-record':
        if (a.j) rp(b, a.g);
        else throw Error('FontMetadata update is not implemented.');
        break;
      case 'delete-record':
        ep(b, S(a));
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function ir(a, b, c, d, e, f, g, h) {
    Qq.call(this, a, b, c, d, e, f, g, h);
    a = this.j;
    c = this.A;
    this.W = new Gq(a, c, this.o);
    gi(this, this.W);
    this.Ua = new hr(a, c);
    gi(this, this.Ua);
    this.Ga = new fr(a, c);
    gi(this, this.Ga);
    this.eb = new Iq(a);
    this.fb = new oq(a, this.o);
    this.Ha = new gr(a, this.o);
    gi(this, this.Ha);
    this.ta = new cr(a, c, this.o);
    gi(this, this.ta);
    this.P = new nq(this.j, this.A, this.o);
    gi(this, this.P);
    this.D = new Eq(a, c, b, this.o);
    gi(this, this.D);
    this.ga = new Hq(a, c);
    gi(this, this.ga);
  }
  q(ir, Qq);
  n = ir.prototype;
  n.La = ca(6);
  n.bb = m('D');
  n.sb = m('ta');
  n.gb = ca(!1);
  n.jb = aa();
  n.Ja = function (a) {
    a = a.db;
    a.createObjectStore('FontMetadata', { keyPath: 'fontFamily' });
    a.createObjectStore('DocumentEntities', { keyPath: 'deKey' });
    a.createObjectStore('SyncObjects', { keyPath: 'keyPath' });
    a.createObjectStore('ProfileData', { keyPath: 'dataType' });
    a.createObjectStore('ApplicationMetadata', { keyPath: 'dt' });
    a.createObjectStore('NewDocumentIds', { keyPath: 'dtKey' });
    a.createObjectStore('Comments', { keyPath: 'cmtKey' }).createIndex(
      'StateIndex',
      'stateIndex',
    );
    a.createObjectStore('Users', { keyPath: 'id' });
    a.createObjectStore('Documents', { keyPath: 'id' });
    a.createObjectStore('DocumentCommands', { keyPath: 'dcKey' });
    a.createObjectStore('DocumentCommandsStaging', { keyPath: 'dcKey' });
    a.createObjectStore('DocumentCommandsMetadata', { keyPath: 'dcmKey' });
    a.createObjectStore('DocumentCommandsMetadataStaging', {
      keyPath: 'dcmKey',
    });
    a.createObjectStore('DocumentLocks', { keyPath: 'dlKey' });
    a.createObjectStore('Impressions', { keyPath: 'iKey' });
    a.createObjectStore('PendingQueues', { keyPath: 'docId' });
    a.createObjectStore('PendingQueueCommands', { keyPath: 'pqcKey' });
    a.createObjectStore('FileEntities', { keyPath: 'id' }).createIndex(
      'DocIdEntityTypeIndex',
      'docIdEntityTypeIndex',
    );
  };
  n.H = function () {
    kj(
      this.W,
      this.Ua,
      this.Ga,
      this.eb,
      this.fb,
      this.Ha,
      this.P,
      this.D,
      this.ga,
    );
    Qq.prototype.H.call(this);
  };
  'ApplicationMetadata Comments DocumentCommandsMetadataStaging DocumentCommandsMetadata DocumentCommandsStaging DocumentCommands DocumentEntities DocumentLocks Documents FileEntities FontMetadata Impressions NewDocumentIds PendingQueueCommands PendingQueues ProfileData SyncObjects Users'
    .split(' ')
    .sort(function (a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    });
  function jr(a, b, c) {
    this.g = !1;
    this.j = c;
  }
  q(jr, Oh);
  jr.prototype.$ = function () {
    return ['BlobMetadata'];
  };
  jr.prototype.Z = function (a, b) {
    b = Z(b, 'BlobMetadata');
    switch (a.getType()) {
      case 'update-record':
        a.j ? b.add(a.g) : kq(this.j, S(a), a.g, b);
        break;
      case 'delete-record':
        ep(b, S(a));
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function kr(a, b, c, d, e) {
    qq.call(this, a, b, c, d, e);
  }
  q(kr, qq);
  kr.prototype.$ = function (a) {
    var b = qq.prototype.$.call(this, a);
    'delete-record' == a.getType() && b.push('BlobMetadata');
    return b;
  };
  kr.prototype.o = function (a, b) {
    qq.prototype.o.call(this, a, b);
    a = S(a);
    ep(Z(b, 'BlobMetadata'), [a], [a, []]);
  };
  function lr() {}
  q(lr, Dq);
  lr.prototype.g = function (a, b, c, d, e) {
    return new kr(a, b, c, d, e);
  };
  function mr(a, b, c, d, e, f, g, h) {
    f = void 0 === f ? new lr() : f;
    ir.call(this, a, b, c, d, e, f, g, h);
    this.ab = new jr(this.j, this.A, this.o);
    gi(this, this.ab);
  }
  q(mr, ir);
  mr.prototype.La = ca(7);
  mr.prototype.gb = ca(!0);
  mr.prototype.Ja = function (a) {
    ir.prototype.Ja.call(this, a);
    nr(a);
  };
  mr.prototype.jb = function (a) {
    nr(a);
  };
  function nr(a) {
    a.db.createObjectStore('BlobMetadata', { keyPath: ['d', 'p'] });
  }
  function or(a, b) {
    pi.call(this, a, b);
    new Qg(b);
  }
  q(or, pi);
  or.prototype.Z = function (a, b) {
    switch (a.getType()) {
      case 'append-template-commands':
        b = Z(b, 'TemplateCommands');
        a.F && ep(b, [a.v], [a.v, []]);
        for (var c = a.A, d = 0; d < c.length; ++d) {
          for (
            var e = a.v, f = c[d], g = f.g(), h = [], k = 0;
            k < g.length;
            ++k
          )
            h.push(this.o.R(g[k]));
          e = tp(e, f.j(), f.o(), f.A(), f.v(), h);
          rp(b, e.g);
        }
        break;
      default:
        throw Error('Unsupported operation type ' + a.getType());
    }
  };
  function pr(a, b, c) {
    qi.call(this, c);
    this.j = new jq();
  }
  q(pr, qi);
  pr.prototype.$ = function () {
    return ['TemplateCommands', 'TemplateCreationMetadata', 'TemplateMetadata'];
  };
  pr.prototype.Z = function (a, b) {
    var c = a.A;
    switch (c) {
      case 'templateMetadata':
        c = 'TemplateMetadata';
        break;
      case 'templateCreationMetadata':
        c = 'TemplateCreationMetadata';
        break;
      default:
        throw Error('Record type ' + c + ' not supported.');
    }
    c = Z(b, c);
    switch (a.getType()) {
      case 'update-record':
        a.j ? rp(c, a.g) : kq(this.j, S(a), a.g, c);
        break;
      case 'delete-record':
        ep(c, S(a));
        break;
      case 'append-template-commands':
        this.sa(a.oa()).Z(a, b);
        break;
      default:
        throw Error('Operation type ' + a.getType() + ' not supported.');
    }
  };
  function qr(a, b, c, d, e, f, g, h) {
    mr.call(this, a, b, d, e, f, void 0, g, h);
    a = ['kix', 'punch', 'ritz'];
    b = this.j;
    if (!c)
      for (c = {}, d = new Ai(), e = 0; e < a.length; e++)
        c[a[e]] = new or(a[e], d, b);
    this.Ta = new pr(b, this.A, c);
    gi(this, this.Ta);
  }
  q(qr, mr);
  n = qr.prototype;
  n.La = ca(8);
  n.tb = m('Ta');
  n.gb = ca(!0);
  n.Ja = function (a) {
    mr.prototype.Ja.call(this, a);
    rr(a);
  };
  n.jb = function (a) {
    var b = a.db;
    0 <= La(b.objectStoreNames, 'DocumentCommandsStaging') &&
      b.deleteObjectStore('DocumentCommandsStaging');
    0 <= La(b.objectStoreNames, 'DocumentCommandsMetadata') &&
      b.deleteObjectStore('DocumentCommandsMetadata');
    0 <= La(b.objectStoreNames, 'DocumentCommandsMetadataStaging') &&
      b.deleteObjectStore('DocumentCommandsMetadataStaging');
    rr(a);
  };
  function rr(a) {
    a = a.db;
    a.createObjectStore('TemplateMetadata', { keyPath: ['id'] });
    a.createObjectStore('TemplateCreationMetadata', { keyPath: ['id'] });
    a.createObjectStore('TemplateCommands', { keyPath: 'dcKey' });
  }
  function sr(a, b, c, d, e, f, g, h, k, l, p, t, x) {
    p = void 0 === p ? !1 : p;
    t = void 0 === t ? null : t;
    W.call(this);
    this.v = a;
    this.U = b;
    this.W = c;
    this.L = d;
    this.N = e;
    this.M = f;
    this.S = p;
    this.j = t;
    this.g = {};
    this.o = {};
    this.B = -1;
    this.A = new Dd();
    this.K = !1;
    this.D = g;
    this.ga = h;
    this.J = k;
    this.G = l;
    this.P = x;
  }
  q(sr, W);
  function tr(a, b) {
    var c = b.La();
    a.B = Math.max(a.B, c);
    a.g[c] = b;
  }
  n = sr.prototype;
  n.create = function (a, b) {
    if (this.K) throw Error('The create method can be called only once.');
    this.K = !0;
    if (isNaN(this.N))
      throw Error('Cannot have the target schema version be NaN.');
    if (this.j) this.Ib(this.j);
    else {
      if (!Sb)
        throw Error('Cannot create storage adapters for unsupported browser');
      hq(v(this.Ib, this), a, this.v, v(this.pc, this), this.S, b);
    }
    return this.A;
  };
  n.pc = function (a) {
    qh(a.g, { databaseOpenFailure: 'true' });
    this.A.aa(a);
    ur(this);
  };
  n.Ib = function (a) {
    this.j = a;
    if (this.L)
      for (var b = this.L(a), c = 0; c < b.length; c++)
        for (var d = b[c], e = d.Nc, f = d.Mb, g = d.oa(); e <= f; ++e) {
          var h = this.o[e];
          h || (h = this.o[e] = {});
          h[g] = d;
        }
    b = new Yp(this.U, this.W, a, this.v, void 0, this.P);
    -1 == this.B &&
      (tr(
        this,
        new ir(a, this.o[6] || {}, b, this.v, this.D, void 0, this.J, this.G),
      ),
      tr(
        this,
        new mr(a, this.o[7] || {}, b, this.v, this.D, this.ga, this.J, this.G),
      ),
      tr(
        this,
        new qr(a, this.o[8] || {}, null, b, this.v, this.D, this.J, this.G),
      ));
    a = Math.min(this.N, this.B);
    b = vr(this);
    if (!this.M && 0 >= b)
      this.Cb(
        new ch(
          4,
          'Schema initialization cannot be performed when schema updates are prevented.',
        ),
      );
    else if (!this.M || b >= a) this.lb();
    else {
      a: {
        for (c = b + 1; c <= a; ++c)
          if (null == this.g[c] || !this.g[c].gb()) {
            c = !1;
            break a;
          }
        c = !0;
      }
      c
        ? ((b += 1),
          (c = v(this.lb, this, null)),
          (d = v(this.Kc, this)),
          Vq(this.g[b], v(this.vb, this, b, a, c, d), d))
        : Tq(this.g[a], v(this.lb, this), v(this.Cb, this));
    }
  };
  n.Kc = function (a) {
    this.A.aa(a);
    ur(this);
  };
  n.Cb = function (a) {
    this.A.aa(a);
    ur(this);
  };
  n.vb = function (a, b, c, d) {
    a = vr(this);
    a == b ? c() : ((a += 1), Vq(this.g[a], v(this.vb, this, a, b, c, d), d));
  };
  n.lb = function () {
    var a = vr(this);
    if ((a = this.g[a])) {
      a = new Ih(a);
      this.j && kf(a, this.j);
      for (var b in this.g) kf(a, this.g[b]);
      for (var c in this.o) {
        b = this.o[c];
        for (var d in b) kf(a, b[d]);
      }
      this.A.T(a);
    } else
      this.v.info(
        Error(
          'Local Storage: No schema adapter for current schema version ' +
            (this.j ? Qp(this.j) : -1),
        ),
      ),
        this.A.T(null);
  };
  function vr(a) {
    var b = a.j ? Qp(a.j) : -1;
    1 < b &&
      6 > b &&
      a.v.info(Error('IDB version less than the minimum. version: ' + b));
    return 6 > b ? -1 : b;
  }
  function ur(a) {
    for (var b in a.g) a.g[b].X();
    for (var c in a.o) {
      b = a.o[c];
      for (var d in b) b[d].X();
    }
    jj(a.j);
  }
  function wr(a, b) {
    this.g = a;
    this.user = b;
  }
  function xr(a, b, c, d, e) {
    W.call(this);
    this.B = a;
    this.v = b;
    this.D = c ? c : 'DefaultLocalStoreSessionId';
    this.G = d || new Ai();
    this.A = !!e;
    this.j = null;
    this.o = new Ci();
    X(this, this.o);
    this.g = yr(this);
  }
  q(xr, W);
  function yr(a) {
    a.g && jj(a.g);
    var b = $f(P(), 'lssv');
    return new sr(a.B, a.D, 0, a.Yb.bind(a), b, !0, new gq());
  }
  function zr(a) {
    if (a.j) return a.j;
    a.j = Ar(a);
    return td(a.j, function (b) {
      a.$a();
      throw b;
    });
  }
  function Br(a) {
    return zr(a).then(function (b) {
      return new H(function (c, d) {
        yi(b.j.C, c, d);
      }).then(function (c) {
        return Cr(a, c) ? new wr(b, c[0]) : null;
      });
    });
  }
  function Dr(a) {
    return zr(a).then(function (b) {
      return new H(function (c, d) {
        yi(b.j.C, c, d);
      }).then(function (c) {
        if (!Cr(a, c))
          throw (
            ((c = {
              usersLength: c.length,
              allowNonOfflineEnabledUser: a.A,
              storedUserMatchesFlag:
                0 == c.length
                  ? 'no users'
                  : c[0].I() == Q(P(), 'docs-offline-lsuid'),
            }),
            qh(Error('Failed to read LocalStore due to invalid user'), c))
          );
        return new wr(b, c[0]);
      });
    });
  }
  function Cr(a, b) {
    return 1 == b.length && (a.A || b[0].I() == Q(P(), 'docs-offline-lsuid'));
  }
  n = xr.prototype;
  n.get = function () {
    return Dr(this).then(function (a) {
      return a.g;
    });
  };
  function Ar(a) {
    return new H(function (b, c) {
      a.g.create(a.$a.bind(a)).ba(b, c);
    }).then(a.Ec.bind(a));
  }
  n.Ec = function (a) {
    var b = this;
    if (!a) throw Error('Got null localstore from the idb localstore factory.');
    if (this.v) {
      var c = new Zo(a, this.v);
      X(this, c);
    }
    Jh(a);
    Di(this.o, a.j.j.B, function () {
      b.$a();
    });
    Di(this.o, a.j.U, function () {
      b.$a();
    });
    return a;
  };
  n.$a = function () {
    jj(this.g);
    this.g = yr(this);
    this.j = null;
  };
  n.Yb = function (a) {
    var b = this.G,
      c = new Tp('kix', 6, 8, b, a),
      d = new Tp('punch', 6, 8, b, a),
      e = new Tp('ritz', 6, 8, b, a);
    a = new Tp('drawing', 6, 8, b, a);
    return [e, c, d, a];
  };
  n.H = function () {
    jj(this.g);
    W.prototype.H.call(this);
  };
  function Er(a) {
    this.j = a;
  }
  Er.prototype.g = function (a, b, c) {
    Br(this.j).then(function (d) {
      d ? new Jo(d.g).g(a, b, c) : b();
    });
  };
  function Fr(a, b) {
    void 0 !== a.name
      ? ((this.name = a.name), (this.code = cb[a.name]))
      : ((this.code = a = a.code), (this.name = Gr(a)));
    y.call(this, wb('%s %s', this.name, b));
  }
  w(Fr, y);
  function Gr(a) {
    var b = bb(function (c) {
      return a == c;
    });
    if (void 0 === b) throw Error('Invalid code: ' + a);
    return b;
  }
  var Hr = {},
    cb =
      ((Hr.AbortError = 3),
      (Hr.EncodingError = 5),
      (Hr.InvalidModificationError = 9),
      (Hr.InvalidStateError = 7),
      (Hr.NotFoundError = 1),
      (Hr.NotReadableError = 4),
      (Hr.NoModificationAllowedError = 6),
      (Hr.PathExistsError = 12),
      (Hr.QuotaExceededError = 10),
      (Hr.SecurityError = 2),
      (Hr.SyntaxError = 8),
      (Hr.TypeMismatchError = 11),
      Hr);
  function Ir(a, b) {
    this.o = a;
    this.g = b;
  }
  function Jr(a, b) {
    Ir.call(this, a, b);
    this.j = b;
  }
  w(Jr, Ir);
  function Kr(a) {
    var b = new Dd();
    a.j.getFile(
      '__initcheck',
      { create: !0 },
      v(function (c) {
        b.T(new Lr(this.o, c));
      }, a),
      v(function (c) {
        b.aa(new Fr(c, 'loading file __initcheck from ' + this.g.fullPath));
      }, a),
    );
    return b;
  }
  function Mr(a, b) {
    var c = new Dd();
    a.j.getDirectory(
      b,
      { create: !0 },
      v(function (d) {
        c.T(new Jr(this.o, d));
      }, a),
      v(function (d) {
        c.aa(new Fr(d, 'loading directory ' + b + ' from ' + this.g.fullPath));
      }, a),
    );
    return c;
  }
  function Nr(a) {
    var b = new Dd();
    a.j.removeRecursively(
      v(b.T, b, !0),
      v(function (c) {
        b.aa(new Fr(c, 'removing ' + this.g.fullPath + ' recursively'));
      }, a),
    );
    return b;
  }
  function Lr(a, b) {
    Ir.call(this, a, b);
    this.j = b;
  }
  w(Lr, Ir);
  Lr.prototype.file = function () {
    var a = new Dd();
    this.j.file(
      function (b) {
        a.T(b);
      },
      v(function (b) {
        a.aa(new Fr(b, 'getting file for ' + this.g.fullPath));
      }, this),
    );
    return a;
  };
  function Or(a) {
    this.g = a;
  }
  function Pr(a) {
    var b = r.requestFileSystem || r.webkitRequestFileSystem;
    if ('function' !== typeof b) return Td(Error('File API unsupported'));
    var c = new Dd();
    b(
      a,
      10485760,
      function (d) {
        c.T(new Or(d));
      },
      function (d) {
        c.aa(new Fr(d, 'requesting filesystem'));
      },
    );
    return c;
  }
  function Qr(a, b, c, d) {
    d = void 0 === d ? r.PERSISTENT : d;
    this.g = !1;
    this.v = void 0 === b ? null : b;
    this.C = void 0 === c ? 'docs' : c;
    this.A = d;
    this.j = a;
    this.o = null;
  }
  q(Qr, Ch);
  function Rr(a, b, c) {
    var d = new mp(v(a.Ic, a, 'initialize'), 3e4, document);
    d.start();
    Md(Sr(a), function () {
      d.X();
    }).ba(v(a.vc, a, b, c), v(a.nb, a, c, 'initialize'));
  }
  function Sr(a) {
    switch (a.A) {
      case r.PERSISTENT:
        return Pr(1);
      case r.TEMPORARY:
        return Pr(0);
      default:
        throw Error('Cannot handle Filesystem type: ' + a.A);
    }
  }
  n = Qr.prototype;
  n.nb = function (a, b, c) {
    b = Tr(b, c);
    this.j.info(b);
    a(b);
  };
  n.Nb = function (a, b, c, d) {
    a = Tr(a, d);
    (c && 0 <= La(c, d.name)) || this.j.info(a);
    this.v && this.v(a);
    b(a);
  };
  n.Ic = function (a, b) {
    var c = { requestTimeout: 3e4 };
    c.timeoutDelays = b.j.concat().toString();
    this.j.info(Error('Filesystem slowness, took 30000ms during ' + a), c);
  };
  function Tr(a, b) {
    return new Bh(
      'Filesystem error (' + b.name + ') during ' + a + ': ' + b.message,
      'QuotaExceededError' == b.name ? 'QuotaExceeded' : 'Other',
    );
  }
  n.vc = function (a, b, c) {
    Mr(new Jr(c, c.g.root), this.C).ba(
      Ha(this.rc, a, b),
      Ha(this.nb, b, 'handleFileSystemAvailable_'),
      this,
    );
  };
  n.rc = function (a, b, c) {
    this.o = c;
    Kr(c).ba(a, v(this.nb, this, b, 'handleDirectoryEntryAvailable_'));
  };
  function Ur(a, b) {
    Nr(a.o).ba(
      b,
      v(
        a.Nb,
        a,
        'clearStorage',
        function () {
          b();
        },
        null,
      ),
    );
  }
  n.H = function () {
    Ch.prototype.H.call(this);
    delete this.o;
  };
  var Li = Ni;
  function Vr(a, b) {
    if (b && a in b) return a;
    var c = 'webkit';
    a = c + Bb(a);
    return void 0 === b || a in b ? a : null;
  }
  function Wr(a, b, c) {
    a = void 0 === a ? Hc() : a;
    b = void 0 === b ? Q(P(), 'olbu') : b;
    c = void 0 === c ? Q(P(), 'docs-offline-lsuid') : c;
    W.call(this);
    this.A = a;
    this.o = b;
    this.B = c;
    this.j = this.g = null;
    this.D = new Yl(this);
    X(this, this.D);
    this.D.j(r, 'message', this.G);
  }
  q(Wr, W);
  Wr.prototype.v = function () {
    Li.set('delete_cache', '1', { Fb: 120, path: '/' });
    return this.update();
  };
  Wr.prototype.update = function (a) {
    return rd(
      Xr(this, a),
      function () {
        Ki('delete_cache');
        Ki('install_cache');
      }.bind(this),
    );
  };
  function Xr(a, b) {
    return a.o
      ? a.g && !b
        ? hd()
        : hd()
            .then(function () {
              return Yr(a.o, a.B);
            })
            .then(function () {
              if (a.g)
                if (b) Zr(a);
                else return hd();
              a.g = Nc(a.A, 'IFRAME');
              var c = od();
              a.g.style.display = 'none';
              a.g.src = $r(a);
              a.A.g.body.appendChild(a.g);
              Sj(3e5).then(function () {
                c.reject('App cache updater timed out');
              });
              a.j = c;
              return a.j.promise;
            })
      : id(Error('No base url provided.'));
  }
  function $r(a) {
    var b = nk(a.o, 'cacheupdate'),
      c = { al: '1' };
    a.B && (c.ouid = a.B);
    return gk(b, c);
  }
  function Yr(a, b) {
    var c = {};
    a = gk(nk(a, 'common/manifest'), ((c.ouid = b), c));
    var d = od(),
      e = new ul();
    Aj(e, 'complete', function (f) {
      f = f.target.va();
      200 == f
        ? d.resolve()
        : d.reject(
            Error(
              'Failed to invalidate appcache manifest, received ' +
                f +
                ' from POST request.',
            ),
          );
      jj(e);
    });
    e.A = 1e4;
    e.send(a, 'POST');
    return d.promise;
  }
  Wr.prototype.G = function (a) {
    a = a.na;
    new zk(this.o);
    var b = r.location.protocol + '//' + r.location.hostname;
    if (
      a &&
      a.origin == b &&
      this.g &&
      a.source == this.g.contentWindow &&
      ((a = a.data), this.j)
    )
      switch (a) {
        case 'appcache-update-succeeded':
          this.j.resolve();
          break;
        case 'appcache-update-failed':
          this.j.reject('At least one app cache failed.');
          break;
        default:
          throw Error('Received unexpected data: ' + a);
      }
  };
  function Zr(a) {
    a.g &&
      (a.A.j(a.g),
      (a.g = null),
      a.j.reject('Removing updater frame'),
      (a.j = null));
  }
  Wr.prototype.H = function () {
    Zr(this);
    W.prototype.H.call(this);
  };
  function as(a) {
    B(this, a, -1, null);
  }
  q(as, A);
  function bs(a) {
    this.g = a;
  }
  function cs() {
    return ds() && O(P(), 'docs-offline-usea')
      ? es()
      : new H(function (a, b) {
          fs(function (c, d) {
            a(new bs(d));
          }, b);
        });
  }
  function ds() {
    return !!xa('navigator.storage.estimate');
  }
  function es() {
    return ds()
      ? hd(
          r.navigator.storage.estimate().then(function (a) {
            return new bs(a.quota);
          }),
        )
      : id(Error('navigator.storage.estimate is undefined'));
  }
  function gs(a, b, c) {
    var d =
      'persistent' == a
        ? r.navigator
          ? r.navigator.webkitPersistentStorage || null
          : null
        : r.navigator
          ? r.navigator.webkitTemporaryStorage || null
          : null;
    d
      ? d.queryUsageAndQuota(b, function (e) {
          c('queryUsageAndQuota failed: ' + e.code);
        })
      : r.webkitStorageInfo
        ? ((d = r.webkitStorageInfo),
          d.queryUsageAndQuota(
            'persistent' == a ? d.PERSISTENT : d.TEMPORARY,
            b,
            function (e) {
              c('queryUsageAndQuota failed: ' + e.code);
            },
          ))
        : c('webkitStorageInfo not available in this browser.');
  }
  function fs(a, b) {
    gs(
      'temporary',
      function (c, d) {
        gs(
          'persistent',
          function (e, f) {
            e = c + e;
            a(e, Math.max(d, f) - e);
          },
          b,
        );
      },
      b,
    );
  }
  function hs() {
    return 'user_' + Q(P(), 'docs-offline-lsuid');
  }
  function is() {
    return Sb && 0 <= nb(Vj, 54) && !!r.BroadcastChannel;
  }
  function js() {
    var a = po(Yk('/eventbusworker.js', !0));
    return new SharedWorker(kb(a), void 0);
  }
  function ks() {
    W.call(this);
    this.g = new Yl(this);
    X(this, this.g);
  }
  q(ks, W);
  function Po(a) {
    var b = [],
      c;
    if (is()) var d = (c = new BroadcastChannel('DocsEventBus'));
    else if (r.SharedWorker) {
      var e = js();
      d || (d = e.port);
      b.push(e.port);
    } else
      throw Error(
        'Event bus is not supported via BroadcastChannel or SharedWorker.',
      );
    var f = new MessageChannel();
    lj(a, function () {
      f.port1.close();
      b.forEach(function (g) {
        g.close();
      });
      c && c.close();
    });
    a.g.j(f.port1, 'message', function (g) {
      var h = g.na.data;
      b.forEach(function (k) {
        k.postMessage(h);
      });
      if (c)
        switch (((g = new Mo(h)), g.getType())) {
          case 1:
            c.postMessage(h);
            break;
          case 0:
            break;
          default:
            throw Error(
              'Could not handle event bus message type ' + g.getType(),
            );
        }
    });
    a.g.j(d, 'message', function (g) {
      f.port1.postMessage(g.na.data);
    });
    f.port1.start();
    b.forEach(function (g) {
      g.start();
    });
    return f.port2;
  }
  function ls(a) {
    B(this, a, -1, null);
  }
  q(ls, A);
  var ms = new wc(102041228, { qd: 0 }, ls, function (a, b) {
    var c = {};
    a && (c.Da = b);
    return c;
  });
  function ns(a) {
    B(this, a, -1, null);
  }
  q(ns, A);
  var os = new wc(108529910, { rd: 0 }, ns, function (a, b) {
    var c = {};
    a && (c.Da = b);
    return c;
  });
  function ps(a) {
    B(this, a, -1, null);
  }
  q(ps, A);
  ps.prototype.I = function () {
    return C(this, 1);
  };
  ps.prototype.oa = function () {
    return C(this, 3);
  };
  ps.prototype.Qa = function (a) {
    E(this, 7, a);
  };
  function qs(a) {
    B(this, a, -1, null);
  }
  q(qs, A);
  function rs(a, b) {
    return E(a, 1, b);
  }
  qs.prototype.Ya = function () {
    return C(this, 2);
  };
  function ss(a) {
    B(this, a, -1, null);
  }
  q(ss, A);
  ss.prototype.I = function () {
    return C(this, 1);
  };
  ss.prototype.getType = function () {
    return C(this, 2);
  };
  function ts(a) {
    B(this, a, -1, null);
  }
  q(ts, A);
  ts.prototype.Bb = function () {
    return C(this, 4);
  };
  function us(a, b) {
    E(a, 4, b);
  }
  ts.prototype.Ya = function () {
    return C(this, 2);
  };
  function vs(a, b) {
    E(a, 2, b);
  }
  function ws(a) {
    B(this, a, -1, xs);
  }
  q(ws, A);
  function ys(a, b) {
    gc(a, 1, b);
  }
  var xs = [1];
  function zs(a) {
    B(this, a, -1, null);
  }
  q(zs, A);
  function As(a) {
    B(this, a, -1, null);
  }
  q(As, A);
  As.prototype.getType = function () {
    return C(this, 1);
  };
  function Bs(a) {
    B(this, a, -1, null);
  }
  q(Bs, A);
  function Cs(a) {
    B(this, a, -1, Ds);
  }
  q(Cs, A);
  var Ds = [1];
  function Es(a) {
    B(this, a, -1, null);
  }
  q(Es, A);
  function Fs(a) {
    B(this, a, -1, Gs);
  }
  q(Fs, A);
  Fs.prototype.Qa = function (a) {
    E(this, 2, a);
  };
  var Gs = [1];
  function Hs(a) {
    B(this, a, -1, Is);
  }
  q(Hs, A);
  var Is = [1, 2];
  function Js(a) {
    B(this, a, -1, null);
  }
  q(Js, A);
  Js.prototype.getType = function () {
    return C(this, 1);
  };
  function Ks(a) {
    B(this, a, -1, null);
  }
  q(Ks, A);
  function Ls(a) {
    B(this, a, -1, null);
  }
  q(Ls, A);
  function Ms(a) {
    B(this, a, -1, null);
  }
  q(Ms, A);
  function Ns(a) {
    B(this, a, -1, null);
  }
  q(Ns, A);
  function Os(a) {
    B(this, a, -1, null);
  }
  q(Os, A);
  Os.prototype.getType = function () {
    return C(this, 1);
  };
  function Ps(a, b) {
    return E(a, 1, b);
  }
  Os.prototype.Ka = function () {
    return F(this, As, 2);
  };
  function Qs() {
    this.g = new In();
    var a = P();
    Zf(a, 'docs-offline-cfcv') &&
      ((a = Q(a, 'docs-offline-cfcv')), E(this.g, 4, a));
  }
  function Rs(a) {
    var b = !!xa('navigator.serviceWorker.controller');
    a = Ss(a);
    D(a, 2);
    E(a, 2, b);
  }
  function Ss(a) {
    if (!D(a.g, 5)) {
      var b = a.g,
        c = new Kn();
      G(b, 5, c);
    }
    return F(a.g, Kn, 5);
  }
  function Ts() {
    var a = P(),
      b = O(a, 'docs-offline-ecpl') ? 'https://jmt17.google.com/log' : void 0,
      c =
        !(Aa(r) && r.window == r) || !r.document || !r.document.documentElement,
      d = Q(a, 'docs-offline-ue');
    if (O(a, 'docs-eea'))
      return new nn(
        306,
        function () {
          return d ? Qi([{ key: 'e', value: d }]) : null;
        },
        null,
        Xm,
        b,
        c,
        !0,
      );
    a = Q(a, 'gaia_session_id');
    return new nn(306, Qi, a || null, Xm, b, c, !0);
  }
  function Us(a) {
    this.j = a;
  }
  Us.prototype.g = function (a) {
    D(a, 15);
    G(a, 15, this.j.g);
  };
  var Vs = new Vn();
  function Ws(a, b) {
    this.message = a;
    this.ports = b;
  }
  Ws.prototype.toString = function () {
    return '{message: ' + this.message + ', ports: ' + this.ports + '}';
  };
  function Xs(a) {
    var b = Ys;
    this.g = a;
    this.j = b;
  }
  Xs.prototype.send = function (a, b, c) {
    var d = this;
    return this.g.send(a.ha(), b, c).then(function (e) {
      return new Ws(new d.j(e.message), e.ports);
    });
  };
  function Zs(a) {
    a = void 0 === a ? 12e4 : a;
    W.call(this);
    this.o = a;
    this.g = {};
    this.v = 0;
  }
  q(Zs, W);
  Zs.prototype.send = function (a, b, c) {
    var d = this;
    b = void 0 === b ? [] : b;
    c = void 0 === c ? this.o : c;
    var e = od(),
      f = ++this.v;
    this.g[f] = e;
    var g = Qj(function () {
      e.reject(Error('Request to transport timed out.'));
    }, c);
    $s(this, e, a, b);
    return rd(e.promise, function () {
      Rj(g);
      delete d.g[f];
    });
  };
  Zs.prototype.H = function () {
    for (var a = la(Object.values(this.g)), b = a.next(); !b.done; b = a.next())
      b.value.reject('Sender was disposed');
    W.prototype.H.call(this);
  };
  function at(a) {
    Zs.call(this, a);
    this.j = new Yl(this);
    X(this, this.j);
  }
  q(at, Zs);
  function $s(a, b, c, d) {
    var e = new MessageChannel();
    $l(
      a.j,
      e.port1,
      'message',
      function (f) {
        f = f.na;
        b.resolve(new Ws(f.data, f.ports));
      }.bind(a),
    );
    e.port1.start();
    a.postMessage(c, [e.port2].concat(d));
    rd(b.promise, function () {
      e.port1.close();
    });
  }
  function bt(a, b) {
    at.call(this, b);
    this.A = a;
  }
  q(bt, at);
  bt.prototype.postMessage = function (a, b) {
    this.A.postMessage(a, b);
  };
  function ct() {
    this.g = [];
    this.j = [];
    this.o = [];
    this.v = [];
  }
  function et(a, b, c) {
    a.g.push(new ft(b, c));
  }
  function gt(a) {
    var b = ['/'];
    b.every(function (c) {
      return lb(c, '/');
    });
    Ta(a.o, b);
  }
  function ht(a) {
    var b = it;
    b.every(function (c) {
      return lb(c, '/');
    });
    Ta(a.j, b);
  }
  function jt(a) {
    var b = ['/offline/blank'];
    b.every(function (c) {
      return lb(c, '/');
    });
    Ta(a.v, b);
  }
  function ft(a, b) {
    this.j = a;
    this.g = b;
  }
  function kt(a) {
    this.g = a;
  }
  function lt(a, b) {
    this.g = xb(a) + (b ? ',i' : '');
  }
  function mt(a) {
    var b = P();
    switch (a) {
      case 'kix':
        return O(b, 'docs-sw-eksw');
      case 'ritz':
        return O(b, 'docs-sw-ersw');
      case 'punch':
      case 'drawing':
        return O(b, 'docs-sw-epsw');
      default:
        return !1;
    }
  }
  function nt(a, b, c, d, e, f) {
    this.A = a;
    this.g = e ? nk('//' + e, b) : b;
    this.v = c;
    this.o = d;
    this.j = f;
  }
  nt.prototype.getType = m('A');
  function ot(a) {
    return new zk(nk(a.g, '/')).toString();
  }
  var it = ['/create'];
  function pt(a, b) {
    a = void 0 === a ? P() : a;
    var c = new ct();
    et(c, '/offline/edit', 2);
    et(c, '/offline/view', 1);
    et(c, '/offline/comment', 4);
    et(c, '/offline/viewcomments', 5);
    gt(c);
    ht(c);
    c = new kt(c);
    return new nt('kix', Q(a, 'kixOfflineUrl'), c, O(a, 'udurls'), b);
  }
  function qt(a, b) {
    a = void 0 === a ? P() : a;
    var c = new ct();
    et(c, '/offline/edit', 2);
    et(c, '/offline/view', 1);
    et(c, '/offline/comment', 4);
    et(c, '/offline/viewcomments', 5);
    ht(c);
    c = new kt(c);
    return new nt('drawing', Q(a, 'drawingsOfflineUrl'), c, O(a, 'udurls'), b);
  }
  function rt(a, b) {
    a = void 0 === a ? P() : a;
    var c = new ct();
    et(c, '/offline/edit', 2);
    et(c, '/offline/view', 1);
    et(c, '/offline/comment', 4);
    et(c, '/offline/viewcomments', 5);
    ht(c);
    gt(c);
    et(new ct(), '/offline/localpresent', 1);
    c = new kt(c);
    return new nt('punch', Q(a, 'punchOfflineUrl'), c, O(a, 'udurls'), b);
  }
  function st(a, b) {
    a = void 0 === a ? P() : a;
    var c = new ct();
    et(c, '/offline/edit', 2);
    et(c, '/offline/view', 1);
    et(c, '/offline/comment', 4);
    et(c, '/offline/viewcomments', 5);
    ht(c);
    gt(c);
    jt(c);
    c = new kt(c);
    return new nt(
      'ritz',
      Q(a, 'ritzOfflineUrl'),
      c,
      O(a, 'udurls'),
      b,
      function (d) {
        return { dl: d.docLocale };
      },
    );
  }
  function tt() {
    var a = P(),
      b = [];
    b.push(pt(a, void 0));
    b.push(qt(a, void 0));
    b.push(rt(a, void 0));
    b.push(st(a, void 0));
    return new Map(
      b.map(function (c) {
        return [c.getType(), c];
      }),
    );
  }
  function ut(a) {
    B(this, a, -1, vt);
  }
  q(ut, A);
  function wt(a) {
    B(this, a, -1, null);
  }
  q(wt, A);
  var vt = [2];
  function xt(a) {
    y.call(this, C(a, 1));
    var b = this,
      c = C(a, 3);
    this.j = void 0 == c ? null : c;
    (fc(a, wt, 2) || []).forEach(function (d) {
      C(d, 1) && C(d, 2) && ih(b, C(d, 1), C(d, 2));
    });
    ih(this, 'serviceworker_errorFromSWMessage', 'true');
  }
  q(xt, y);
  function yt(a) {
    B(this, a, -1, null);
  }
  q(yt, A);
  yt.prototype.getType = function () {
    return C(this, 1);
  };
  function Ys(a) {
    B(this, a, -1, null);
  }
  q(Ys, A);
  Ys.prototype.Ka = function () {
    return F(this, ut, 3);
  };
  function zt(a, b) {
    W.call(this);
    this.j = a;
    this.g = b;
    this.o = r.navigator.serviceWorker;
    this.v = new Yl(this);
    X(this, this.v);
  }
  q(zt, W);
  function At(a) {
    var b = [];
    mt('kix') && b.push(ot(pt()));
    mt('ritz') && b.push(ot(st()));
    mt('punch') && b.push(ot(rt()));
    mt('drawing') && b.push(ot(qt()));
    return b.map(function (c) {
      return new zt(a, c);
    });
  }
  function Bt(a) {
    return hd()
      .then(function () {
        return a.o.getRegistration(a.g);
      })
      .then(function (b) {
        return b && Zj(b.scope.match(Yj)[5] || null, !0) === a.g ? b : void 0;
      });
  }
  function Ct(a) {
    return Bt(a).then(function (b) {
      return !!b;
    });
  }
  function Dt(a) {
    return Bt(a).then(function (b) {
      return b ? b.unregister() : !1;
    });
  }
  zt.prototype.register = function (a) {
    var b = this;
    return td(
      hd(this.o.register(a, { scope: this.g, updateViaCache: 'all' })),
      function (c) {
        b.j.info(oh(c));
        throw c;
      },
    );
  };
  function Et(a) {
    return Bt(a).then(function (b) {
      return b
        ? (b = b.active || b.waiting || b.installing)
          ? td(Ft(b, Gt(2), 15e3).then(ca(!0)), function (c) {
              var d = {};
              d.serviceworker_scope = a.g;
              d.originalErrorMessage = c.message;
              a.j.info(Error('Failed to reach service worker'), d);
              return !1;
            })
          : !1
        : !1;
    });
  }
  function Ht(a) {
    return Bt(a).then(function (b) {
      if (b) return It(a, Gt(2), 15e3);
    });
  }
  function It(a, b, c) {
    return Jt(a, b, c).then(aa());
  }
  function Jt(a, b, c) {
    return Bt(a).then(function (d) {
      if (!d)
        throw Error(
          'Cannot send message to service worker without registration',
        );
      new ok().R(b);
      d = d.active || d.waiting || d.installing;
      if (!d)
        throw Error(
          'No active, waiting or installing service worker, cannot send message of type ' +
            b.getType(),
        );
      return Ft(d, b, c);
    });
  }
  function Ft(a, b, c) {
    return new Xs(new bt(a, c))
      .send(b)
      .then(function (d) {
        return d.message;
      })
      .then(function (d) {
        var e = d.Ka();
        if (e) throw new xt(e);
        return d;
      });
  }
  function Gt(a) {
    var b = new yt();
    return E(b, 1, a);
  }
  function Kt(a) {
    this.g = a;
  }
  Kt.prototype.I = m('g');
  function Lt() {
    this.j = this.g = null;
  }
  function Mt(a) {
    var b = F(a.g, Bn, 5);
    null == b && ((b = new Bn()), G(a.g, 5, b));
    return b;
  }
  function Nt(a) {
    C(a.g, 10);
    null != C(a.g, 6) || C(a.g, 10);
    2 == C(F(a.g, Cn, 8), 3) &&
      null != C(a.g, 13) &&
      C(F(F(a.g, Cn, 8), En, 2), 2);
    var b = F(a.g, Bn, 5);
    null != b && ((b = lc(b)), G(a.g, 5, b));
    return a.g;
  }
  function Ot() {
    Lt.call(this);
  }
  q(Ot, Lt);
  var Pt = new Kt('high_frequency_builder');
  function Qt(a, b, c) {
    a = new Oj(a);
    X(c, a);
    var d = new Yl(c);
    X(c, d);
    d.j(a, 'tick', b);
    a.start();
  }
  function Rt() {
    Lt.call(this);
  }
  q(Rt, Lt);
  function St(a, b) {
    var c = 1e3 * Date.now(),
      d = new Cn();
    var e = new Dn();
    e = E(e, 1, c);
    G(d, 1, e);
    E(d, 3, 1);
    G(a.g, 8, d);
    E(a.g, 12, b);
    E(a.g, 13, b);
    E(a.g, 4, c);
    E(a.g, 3, b);
    return a;
  }
  var Tt = new Kt('system_builder');
  function Ut(a) {
    mj.call(this, 'visibilitychange');
    this.hidden = a;
  }
  q(Ut, mj);
  var Vt = new WeakMap();
  function Wt(a) {
    function b(f) {
      var g = la(f);
      f = g.next().value;
      g = ma(g);
      return a.apply(f, g);
    }
    function c(f) {
      f = la(f);
      f.next();
      f = ma(f);
      return d(e, f);
    }
    var d = void 0 === d ? Xt : d;
    var e = Ba(a);
    return function (f) {
      for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
      h = this || r;
      var k = Vt.get(h);
      k || ((k = {}), Vt.set(h, k));
      return Fb(k, [this].concat(na(g)), b, c);
    };
  }
  function Xt(a, b) {
    a = [a];
    for (var c = b.length - 1; 0 <= c; --c) a.push(typeof b[c], b[c]);
    return a.join('\x0B');
  }
  function Yt(a) {
    Lj.call(this);
    this.g = a || Hc();
    if ((this.o = this.hc())) this.A = Aj(this.g.g, this.o, v(this.mc, this));
  }
  w(Yt, Lj);
  n = Yt.prototype;
  n.hc = Wt(function () {
    var a = !!this.za(),
      b = 'hidden' != this.za();
    if (a) {
      var c;
      b ? (c = 'webkitvisibilitychange') : (c = 'visibilitychange');
      a = c;
    } else a = null;
    return a;
  });
  n.za = Wt(function () {
    return Vr('hidden', this.g.g);
  });
  n.lc = Wt(function () {
    return Vr('visibilityState', this.g.g);
  });
  n.mc = function () {
    var a = this.za() ? this.g.g[this.lc()] : null;
    a = new Ut(!!this.g.g[this.za()], a);
    Mj(this, a);
  };
  n.H = function () {
    Jj(this.A);
    Yt.fa.H.call(this);
  };
  function Zt(a, b) {
    W.call(this);
    this.j = a;
    this.g = new Yt(b);
    X(this, this.g);
    this.o = new Yl(this);
    X(this, this.o);
    this.g.za() && this.o.j(this.g, 'visibilitychange', this.v);
  }
  q(Zt, W);
  Zt.prototype.v = function () {
    if (this.j.Ob()) {
      var a = this.g;
      a = !!a.g.g[a.za()];
      a = this.j.Fa(a ? 102001 : 102e3);
      this.j.Oa(a);
    }
  };
  function $t(a, b, c) {
    c = void 0 === c ? !1 : c;
    W.call(this);
    this.g = a;
    this.j = b;
    X(this, this.j);
    this.o = c;
  }
  q($t, W);
  n = $t.prototype;
  n.Oa = function (a) {
    var b = this.g;
    E(a.g, 6, b.o);
    a = Nt(a);
    b.g.add(a);
    b.v = !0;
    b = this.j;
    3 <= b.g.g.g.length && b.j.j();
  };
  n.Fa = function (a) {
    return St(au(this.g, a), this.g.C++);
  };
  n.Pb = function () {
    var a = this.g,
      b = bu(a, 716);
    cu(a, b);
    b = Nt(b);
    a.g.add(b);
    a.B = !0;
    a.F = !0;
    a = this.j;
    Qt(a.B, a.j.j, a.j);
    Qt(36e5, a.G, a);
    this.j.j.j();
    this.o && new Zt(this);
  };
  n.ec = function () {
    this.j.v();
    return nd(Array.from(this.j.o)).then();
  };
  n.Ob = function () {
    var a = this.g;
    return a.B && a.F && !0;
  };
  function du(a, b, c) {
    W.call(this);
    this.B = null != c ? a.bind(c) : a;
    this.A = b;
    this.o = null;
    this.v = !1;
    this.g = null;
  }
  q(du, W);
  du.prototype.j = function (a) {
    this.o = arguments;
    this.g ? (this.v = !0) : eu(this);
  };
  du.prototype.H = function () {
    W.prototype.H.call(this);
    this.g && (Rj(this.g), (this.g = null), (this.v = !1), (this.o = null));
  };
  function eu(a) {
    a.g = Qj(function () {
      a.g = null;
      a.v && ((a.v = !1), eu(a));
    }, a.A);
    var b = a.o;
    a.o = null;
    a.B.apply(null, b);
  }
  function fu(a, b, c, d, e) {
    W.call(this);
    this.g = a;
    this.D = b;
    this.j = new du(this.v, 3e3, this);
    this.o = new Set();
    this.A = d;
    this.B = e || 6e4;
  }
  q(fu, W);
  fu.prototype.v = function () {
    var a = this;
    if (0 != this.g.g.g.length && (!this.A || this.g.v)) {
      var b = gu(this.g),
        c = this.D.j(b);
      c &&
        (rd(c, function () {
          return void a.o.delete(c);
        }),
        this.o.add(c));
    }
  };
  fu.prototype.G = function () {
    var a = this.g,
      b = bu(a, 1153);
    b = Nt(b);
    a.g.add(b);
    this.j.j();
  };
  function hu() {}
  hu.prototype.Ab = function () {
    return new Ot();
  };
  function iu() {
    this.j = {};
    this.o = {};
    this.g = null;
  }
  function ju() {
    this.g = [];
  }
  ju.prototype.add = function (a) {
    this.g.push(a);
  };
  function ku() {
    this.g = {};
  }
  ku.prototype.add = function (a) {
    C(F(a.g, Cn, 8), 3);
    var b = C(a.g, 12);
    this.g[b] = a;
  };
  function lu(a, b) {
    this.j = a;
    this.D = b;
    this.C = 1;
    this.A = this.o = null;
    this.G = new ku();
    this.g = new ju();
    this.F = this.B = this.v = !1;
  }
  function au(a, b) {
    var c = new Lt(),
      d = new Fn();
    a = a.D;
    c.g = d;
    c.j = a;
    d = c.j.j[Tt.I()];
    Tt.I();
    d = d.Ab();
    a = c.j;
    d.g = c.g;
    d.j = a;
    E(d.g, 10, b);
    return d;
  }
  function gu(a) {
    var b = a.g,
      c = b.g;
    b.g = [];
    b = new Rn();
    var d = lc(a.j.g);
    b = G(b, 2, d);
    d = a.j;
    mu(d);
    (d = d.o ? lc(d.o) : null) && G(b, 5, d);
    var e;
    d = a.j;
    for (var f, g = c.length - 1; 0 <= g; g--) {
      var h = F(c[g], Bn, 5);
      if (h && F(h, fg, 1)) {
        h = F(h, fg, 1);
        D(h, 12) && void 0 === e && (e = bc(h, 12));
        h = F(h, hg, 20);
        if (void 0 !== h && void 0 === f) {
          f = new Rm();
          var k = bc(h, 2);
          void 0 !== k && E(f, 2, k);
          h = bc(h, 1);
          void 0 !== h && E(f, 1, h);
        }
        if (void 0 !== e && void 0 !== f) break;
      }
    }
    d = d.v ? lc(d.v) : null;
    if (void 0 !== e || void 0 !== f)
      d || (d = new Qm()),
        void 0 !== e && E(d, 6, e),
        void 0 !== f && G(d, 13, f);
    (e = d) && G(b, 3, e);
    a = lc(a.j.A);
    G(b, 4, a);
    gc(b, 1, c);
    return b;
  }
  function bu(a, b) {
    var c = St(au(a, b), a.C++);
    var d = a.G;
    var e = Object.keys(d.g);
    if (0 == e.length) d = null;
    else {
      for (var f = [], g = 0; g < e.length; g++) {
        var h = Number(e[g]),
          k = d.g[h],
          l = new wn();
        h = E(l, 1, h);
        k = C(k.g, 10);
        k = E(h, 2, k);
        f.push(k);
      }
      d = f;
    }
    716 != b &&
      ((b = a.A),
      E(c.g, 6, a.o),
      (e = new un()),
      (b = E(e, 1, b)),
      d && gc(b, 2, d),
      (d = Mt(c)),
      G(d, 3, b));
    cu(a, c);
    return c;
  }
  function cu(a, b) {
    a.o = C(b.g, 12);
    a.A = C(F(F(b.g, Cn, 8), Dn, 1), 1);
  }
  function nu() {}
  nu.prototype.Ab = function () {
    return new Rt();
  };
  function ou() {
    this.g = this.j = null;
  }
  function pu() {
    this.g = new Hn();
    this.o = null;
    this.A = new Gn();
    E(this.A, 1, 6);
    this.v = this.j = null;
  }
  function qu(a) {
    null == a.o && (a.o = new Pn());
    return a.o;
  }
  function mu(a) {
    D(a.g, 1) && D(a.g, 6) && C(a.g, 6);
  }
  function ru() {
    this.v = this.A = null;
    this.g = new pu();
    this.j = null;
    this.o = !1;
  }
  function su(a) {
    this.o = a;
    this.g = this.j = null;
  }
  function tu(a, b) {
    b &&
      r.navigator.serviceWorker &&
      (td(
        Ct(new zt(a.o, '/offline/')).then(function (c) {
          var d = Ss(b);
          D(d, 1);
          E(d, 1, c);
        }),
        function (c) {
          a.o.log(oh(c));
        },
      ),
      Rs(b));
  }
  function uu(a) {
    B(this, a, -1, null);
  }
  q(uu, A);
  function vu() {
    var a = wu();
    if (!a) throw Error('Missing user info for enabling offline in flags.');
    return a;
  }
  function wu() {
    var a = Q(P(), 'docs-offline-uifeo');
    return a ? ic(uu, a) : null;
  }
  function xu() {
    var a = P();
    var b = new mc();
    b = E(b, 8, 5e3);
    a = Q(a, 'docs-offline-sceid');
    a = E(b, 5, a);
    b = C(vu(), 2);
    a = E(a, 9, b);
    this.g = new Wj(a);
  }
  function yu() {
    var a = new xu();
    return new H(function (b) {
      Ld(a.g.Xa('undefined'), function (c) {
        b(c instanceof aj);
      });
    });
  }
  xu.prototype.j = function () {
    var a = this;
    return hd().then(function () {
      return a.g.j();
    });
  };
  function zu(a) {
    this.g = a;
  }
  function Au(a, b, c) {
    if (Bu()) b(!0);
    else {
      var d = wu();
      (d = d && C(d, 7)) ? Co(a.g, d).then(b, c) : b(!1);
    }
  }
  function Bu() {
    var a = wu();
    return a ? !!bc(a, 5) : !1;
  }
  function Cu(a) {
    this.g = a;
  }
  Cu.prototype.get = function () {
    var a = this,
      b = vu(),
      c = C(b, 7);
    if (!D(b, 8))
      throw Error('Missing user info isDasher field in auto enable path');
    var d = bc(b, 8),
      e = P();
    return hd()
      .then(function () {
        return c ? Eo(a.g, c) : !1;
      })
      .then(function (f) {
        return f
          ? 9
          : Bu()
            ? O(e, 'docs-offline-eoaoico')
              ? hd(5)
              : !d && O(e, 'docs-offline-eoaoipu')
                ? hd(3)
                : Du(b)
            : null;
      });
  };
  function Du(a) {
    return bc(a, 8) || !O(P(), 'docs-offline-eoaoisc')
      ? hd(null)
      : td(
          yu().then(function (b) {
            return b ? 4 : null;
          }),
          ca(null),
        );
  }
  function Eu(a) {
    this.g = a || Hc();
  }
  function Fu(a) {
    var b = [Gu(a), Hu(a, String(Dk(new zk(), '/document/offline/optout')))];
    return nd(b)
      .then(function () {
        return md(b);
      })
      .then(aa());
  }
  function Gu(a) {
    var b = $k('/drive/offline/optout');
    return Hu(a, b);
  }
  function Hu(a, b) {
    var c = [];
    return rd(
      new H(function (d) {
        var e = Nc(a.g, 'IFRAME');
        e.addEventListener('load', function () {
          return c.push(
            setTimeout(function () {
              return d();
            }, 1e3),
          );
        });
        e.style.display = 'none';
        e.src = b;
        a.g.g.body.appendChild(e);
        c.push(
          setTimeout(function () {
            return d();
          }, 22e3),
        );
      }),
      function () {
        c.map(function (d) {
          return clearTimeout(d);
        });
      },
    );
  }
  function Iu(a, b, c, d) {
    this.zb = a;
    this.j = b || null;
    this.g = c || null;
    this.Qb = !!d;
  }
  Iu.prototype.Bb = m('j');
  Iu.prototype.Ya = m('g');
  function Ju() {}
  function Ku(a, b, c) {
    this.g = a;
    this.j = c;
  }
  Ku.prototype.I = m('g');
  function Lu(a, b) {
    var c = P();
    return O(c, a) && 0 < $f(c, b);
  }
  function Mu(a, b, c) {
    var d = P();
    return new Ku(a, $f(d, b), c);
  }
  function Nu(a) {
    B(this, a, -1, null);
  }
  q(Nu, A);
  Nu.prototype.I = function () {
    return C(this, 1);
  };
  function Ou(a) {
    this.j = a;
    a = r.localStorage.getItem('docs-tasksStats_default') || '[]';
    try {
      var b = JSON.parse(a);
    } catch (e) {
      (b = []),
        r.localStorage.removeItem('docs-tasksStats_default'),
        tm(this.j, oh(e, 'Detected task stats corruption, resetting'));
    }
    a = {};
    for (var c = 0; c < b.length; c++) {
      var d = new Nu(b[c]);
      a[d.I()] = d;
    }
    this.g = a;
  }
  function Pu(a) {
    r.localStorage.removeItem('docs-tasksStats_default');
    a = a.g;
    for (var b in a) delete a[b];
  }
  function Qu(a, b) {
    this.g = a;
    this.j = b;
  }
  Qu.prototype.get = function () {
    var a = this;
    return Br(this.g).then(function (b) {
      return b
        ? new Iu(1, b.user.I(), Eg(b.user, 'emailAddress'), Ru(a))
        : zr(a.g).then(function (c) {
            return new H(function (d, e) {
              yi(c.j.C, d, e);
            }).then(function (d) {
              if (d.length)
                if (1 == d.length)
                  (d = d[0]), (d = new Iu(4, d.I(), Eg(d, 'emailAddress')));
                else throw Error('More than one user in store: ' + d.length);
              else {
                try {
                  var e = !!r.localStorage.getItem('docs-uoo');
                } catch (f) {
                  e = !0;
                }
                d = e ? new Iu(2) : zp() ? new Iu(5) : new Iu(3);
              }
              return d;
            });
          });
    });
  };
  function Ru(a) {
    a = new Ou(a.j);
    var b = [];
    Lu('docs-offline-esmst', 'docs-offline-mstpim') &&
      b.push(Mu('metadata-sync', 'docs-offline-mstpim', !0, new Ju(Xk())));
    Lu('docs-offline-esbst', 'docs-offline-swutpim') &&
      b.push(
        Mu('service-worker-update', 'docs-offline-swutpim', !0, new Ju(Zk())),
      );
    Lu('docs-offline-esbst', 'docs-offline-bstpim') &&
      b.push(Mu('binary-sync', 'docs-offline-bstpim', !0, new Ju(Zk())));
    Lu('docs-offline-edswut', 'docs-offline-dswutpim') &&
      b.push(
        Mu(
          'drive-service-worker',
          'docs-offline-dswutpim',
          !0,
          new Ju($k('/drive/serviceworker/update')),
        ),
      );
    Lu('docs-offline-eshcst', 'docs-offline-hcstpim') &&
      b.push(
        Mu(
          'homescreen-cello-sync',
          'docs-offline-hcstpim',
          !0,
          new Ju(al(bl(), '/document/backgroundsync')),
        ),
      );
    Lu('docs-offline-esdcst', 'docs-offline-dcstpim') &&
      b.push(
        Mu(
          'drive-cello-sync',
          'docs-offline-dcstpim',
          !0,
          new Ju($k('/drive/_/dataservice/backgroundsync')),
        ),
      );
    Lu('docs-offline-eslcst', 'docs-offline-lcstpim') &&
      b.push(
        Mu('local-changes-sync', 'docs-offline-lcstpim', !1, new Ju(Xk())),
      );
    Lu('docs-offline-esast', 'docs-offline-astpim') &&
      b.push(Mu('auto-sync', 'docs-offline-astpim', !1, new Ju(Xk())));
    Lu('docs-offline-eswst', 'docs-offline-wstpim') &&
      b.push(Mu('webfonts-sync', 'docs-offline-wstpim', !0, new Ju(Xk())));
    Lu('docs-offline-esist', 'docs-offline-istpim') &&
      b.push(Mu('impression-sync', 'docs-offline-istpim', !1, new Ju(Xk())));
    Lu('docs-offline-esddt', 'docs-offline-ddtpim') &&
      b.push(Mu('document-deletion', 'docs-offline-ddtpim', !1, new Ju(Xk())));
    Lu('docs-offline-esuuct', 'docs-offline-uuctpim') &&
      b.push(
        Mu('update-unsaved-changes', 'docs-offline-uuctpim', !1, new Ju(Zk())),
      );
    Lu('docs-offline-esct', 'docs-offline-ctpim') &&
      b.push(Mu('cleanup-task', 'docs-offline-ctpim', !1, new Ju(Zk())));
    Lu('docs-offline-esrt', 'docs-offline-rtpim') &&
      b.push(Mu('report-task', 'docs-offline-rtpim', !1, new Ju(Zk())));
    if (Lu('docs-offline-eskst', 'docs-offline-kstpim')) {
      var c = P();
      var d = c.get('docs-offline-rte');
      if (Zf(c, 'docs-offline-rte') && null != d) {
        if (!Array.isArray(d))
          throw Ue('Invalid key for array: docs-offline-rte').g;
        for (var e = [], f = 0; f < d.length; f = (f + 1) | 0) {
          var g = d[f];
          e.push('object' === tf(g) ? '[object Object]' : K(g));
        }
        xf(c.g.get(), 'docs-offline-rte', e);
        c = e;
      } else c = [];
      0 <= La(c, 'kix') &&
        b.push(
          Mu(
            'kix-snapshot',
            'docs-offline-kstpim',
            !1,
            new Ju(al(bl(), '/document/snapshot.js')),
          ),
        );
    }
    Lu('docs-offline-esost', 'docs-offline-sostpim') &&
      b.push(Mu('sync-objects-sync', 'docs-offline-sostpim', !0, new Ju(Xk())));
    c = [];
    for (d = 0; d < b.length; d++) (e = b[d]), e.j && c.push(e);
    for (b = 0; b < c.length; b++)
      if (
        ((d = c[b].I()),
        (d = (d = a.g[d]) ? lc(d) : null),
        (e = !d) ||
          ((e = !1),
          (e = void 0 === e ? !1 : e),
          (d = bc(d, 5)),
          (e = !(null == d ? e : d))),
        e)
      )
        return !1;
    return !0;
  }
  function Su(a, b) {
    this.j = a;
    this.g = b;
  }
  function Tu(a) {
    return Uu(a)
      .then(a.o.bind(a))
      .then(a.v.bind(a))
      .then(a.A.bind(a))
      .then(function () {
        return rs(new qs(), 1);
      }, a.C.bind(a));
  }
  Su.prototype.C = function (a) {
    if (a instanceof qs) return a;
    if (a instanceof Error) throw a;
    throw Error(a);
  };
  function Uu(a) {
    var b = new qs();
    return a.j.get().then(function (c) {
      var d = c.zb;
      switch (d) {
        case 3:
        case 2:
          return hd();
        case 4:
          return rs(b, 3), (c = c.Ya()), E(b, 2, c), id(b);
        case 1:
          return rs(b, 2), id(b);
        case 5:
          return rs(b, 4), id(b);
        default:
          throw Error('Unexpected enabled state: ' + d);
      }
    });
  }
  Su.prototype.v = function () {
    var a = this;
    return new H(function (b, c) {
      Au(a.g, b, c);
    }).then(function (b) {
      if (b) return hd();
      b = rs(new qs(), 5);
      return id(b);
    });
  };
  Su.prototype.o = function () {
    if (no()) return hd();
    var a = rs(new qs(), 6);
    return id(a);
  };
  Su.prototype.A = function () {
    var a = $f(P(), 'docs-offline-mrs');
    if (!a) throw Error('missing minRequiredSpace information');
    return new H(function (b, c) {
      cs().then(function (d) {
        d = d.g;
        if (d > a) b();
        else {
          var e = rs(new qs(), 7);
          e = E(e, 3, a);
          d = E(e, 4, d);
          c(d);
        }
      }, c);
    });
  };
  function Vu(a) {
    B(this, a, -1, Wu);
  }
  q(Vu, A);
  var Wu = [1];
  function Xu(a, b, c, d) {
    this.o = a;
    this.j = Sb;
    this.g = d;
  }
  function Yu(a, b) {
    var c = P();
    a = new lt(Eg(a, 'locale'), !0 === Fg(a, 'internal'));
    return new Xu(a, Q(c, 'drive-host'), Q(c, 'drcuap'), b);
  }
  function Zu(a, b) {
    a = a.g.get(b);
    if (!a) throw Error('No offline URL adapter for documents of type ' + b);
    return a;
  }
  var $u = ['installing', 'installed', 'activating', 'activated'];
  function av(a, b) {
    if ('redundant' == b)
      throw Error(
        'REDUNDANT state does not have an order, cannot check that a service worker is at least REDUNDANT',
      );
    a = $u.indexOf(a.state);
    return 0 <= a && a >= $u.indexOf(b);
  }
  function bv(a, b) {
    W.call(this);
    this.j = a;
    this.o = b;
    this.g = new Yl(this);
    X(this, this.g);
  }
  q(bv, W);
  function cv(a, b) {
    return rd(
      dv(a, b).then(function (c) {
        return c ? ev(a, c).then(ca(!0)) : !1;
      }),
      function () {
        return a.g.X();
      },
    );
  }
  function dv(a, b) {
    return a.j.register(b).then(function (c) {
      var d = c.installing;
      return d ? d : fv(a, c);
    });
  }
  function fv(a, b) {
    return ld([
      Sj(15e3, null),
      new H(function (c, d) {
        $l(a.g, b, 'updatefound', function () {
          var e = b.installing;
          e
            ? c(e)
            : d(
                Error(
                  'Update found but there was no installing service worker.',
                ),
              );
        });
        b.update();
      }),
    ]);
  }
  function ev(a, b) {
    return gv(a, b, 'installed', 27e4)
      .then(function (c) {
        if (!c)
          throw Error(
            'Service worker did not finish installing before timeout.',
          );
      })
      .then(function () {
        return gv(a, b, 'activated', 15e3);
      })
      .then(function (c) {
        c ||
          a.o.info(
            Error('Service worker did not activate within specified timeout.'),
            { serviceworker_scope: a.j.g },
          );
      });
  }
  function gv(a, b, c, d) {
    var e;
    return ld([
      Sj(d),
      new H(function (f, g) {
        e = function () {
          av(b, 'installing')
            ? av(b, c) && f()
            : g(
                qh(
                  Error(
                    'Update failed or service worker replaced by newer version while updating.',
                  ),
                  {
                    serviceworker_state_expected: c,
                    serviceworker_state_current: b.state,
                    appcache_status: window.applicationCache
                      ? String(window.applicationCache.status)
                      : 'undefined',
                  },
                ),
              );
        };
        e();
        a.g.j(b, 'statechange', e);
      }),
    ]).then(function () {
      bm(a.g, b, 'statechange', e);
      return av(b, c);
    });
  }
  function hv(a, b, c) {
    this.g = a;
    this.o = b;
    this.j = c;
    this.A = r.caches;
  }
  hv.prototype.update = function () {
    var a = this;
    return td(
      iv(this)
        .then(function (b) {
          for (var c = [], d = {}, e = 0; e < b.length; d = { wa: d.wa }, e++) {
            d.wa = b[e];
            var f = d.wa.v ? jv(a, d.wa) : kv(a, d.wa);
            f = td(
              f,
              (function (g) {
                return function (h) {
                  throw qh(h, { serviceworker_scope: g.wa.j });
                };
              })(d),
            );
            c.push(f);
          }
          return nd(c).then(function () {
            return md(c);
          });
        })
        .then(aa()),
      function (b) {
        throw qh(b, { serviceworker_updater_method: 'update' });
      },
    );
  };
  hv.prototype.v = function () {
    var a = this;
    return td(
      iv(this)
        .then(function (b) {
          b = b.map(function (c) {
            return kv(a, c);
          });
          return md(b);
        })
        .then(function () {
          return lv(a);
        })
        .then(aa()),
      function (b) {
        throw qh(b, { serviceworker_updater_method: 'deleteAll' });
      },
    );
  };
  function lv(a) {
    return hd(a.A.keys()).then(function (b) {
      return md(
        b.map(function (c) {
          return a.A.delete(c);
        }),
      );
    });
  }
  function iv(a) {
    var b = new H(function (d, e) {
        Fq(a.o.j.bb(), d, e);
      }),
      c = hf(xi(a.o.j.C));
    return md([b, c]).then(function (d) {
      var e = d[0],
        f = d[1],
        g = Yu(f, tt());
      return e
        .map(function (h) {
          var k = h.oa();
          h = mt(k);
          var l = O(P(), 'docs-sw-eswrfi');
          var p = f.I();
          var t = Zu(g, k);
          t = new zk(nk(t.g, '/offline/serviceworker.js'));
          Pk(t, 'ouid', xb(p));
          cl() && Pk(t, 'Debug', 'true');
          p = t.toString();
          l &&
            ((t =
              Math.floor(2147483648 * Math.random()).toString(36) +
              Math.abs(
                Math.floor(2147483648 * Math.random()) ^ Date.now(),
              ).toString(36)),
            (p = hk(mk(p, 'zx'), 'zx', t)));
          k = ot(Zu(g, k));
          return new mv(a.g, p, k, h, l, 'install-and-message');
        })
        .concat(nv(a, f))
        .concat(ov(a, f));
    });
  }
  function nv(a, b) {
    var c = O(P(), 'docs-sw-eocsw');
    b = Pk(
      Pk(new zk('/offline/common/serviceworker.js'), 'ouid', b.I()),
      'oucvi',
      !0,
    ).toString();
    return new mv(a.g, b, '/offline/', c, !1, 'only-via-install');
  }
  function ov(a, b) {
    var c = O(P(), 'docs-sw-eorsw');
    b = Pk(new zk('/offline/root/serviceworker.js'), 'ouid', b.I()).toString();
    return new mv(a.g, b, '/', c, !1, 'no-cache-update');
  }
  function jv(a, b) {
    var c = new zt(b.o, b.j);
    return td(
      cv(new bv(c, a.g), b.C).then(function (d) {
        if ('no-cache-update' !== b.g && ('only-via-install' !== b.g || d)) {
          if (b.A || 'only-via-install' === b.g) return It(c, Gt(7), 5e3);
          var e = Date.now();
          return Et(c).then(function (f) {
            var g = Date.now() - e;
            15e3 < g &&
              a.g.info(Error('Heartbeat to service worker exceeded timeout'), {
                scopeUrl: b.j,
                elapsedTime: g,
                reachable: f,
              });
            if (f) return It(c, Gt(0), 3e5);
          });
        }
      }),
      function (d) {
        var e = oh(d);
        if (e instanceof xt && 1 == e.j) {
          var f = new An();
          f = E(f, 1, e.j);
          e = parseInt(jh(e).serviceworker_maxUpdateConcurrency, 10);
          isNaN(e) || E(f, 2, e);
          e = a.j.Fa(81011);
          var g = Mt(e),
            h = new xn();
          f = G(h, 29, f);
          G(g, 34, f);
          a.j.Oa(e);
        }
        throw d;
      },
    ).then(function () {
      c.X();
    });
  }
  function kv(a, b) {
    var c = new zt(b.o, b.j);
    return ('no-cache-update' === b.g ? hd() : pv(a, c))
      .then(function () {
        return Dt(c);
      })
      .then(function () {
        c.X();
      });
  }
  function pv(a, b) {
    return td(
      Et(b).then(function (c) {
        if (c) return It(b, Gt(1), 18e4).then(aa());
      }),
      function (c) {
        a.g.info(oh(c));
      },
    );
  }
  function mv(a, b, c, d, e, f) {
    this.o = a;
    this.C = b;
    this.j = c;
    this.v = d;
    this.A = e;
    this.g = f;
  }
  function qv(a, b, c, d, e, f, g) {
    this.A = a;
    this.g = b;
    this.v = c;
    this.C = d;
    this.o = e;
    this.D = g;
    this.j = f;
  }
  function rv(a) {
    Ao(a.v);
    Pu(new Ou(a.g));
    r.localStorage.removeItem('docs-lspa');
    wp();
    r.localStorage.removeItem('docs-ldb');
    var b = new Wr(),
      c = [
        td(b.v(), function (d) {
          tm(
            a.g,
            Error(
              'Failed to completely delete appcache when disabling offline: ' +
                d,
            ),
          );
        }),
        Fu(a.C),
        sv(a),
        a.D.v(),
      ];
    return td(
      rd(
        nd(c)
          .then(function () {
            return md(c);
          })
          .then(a.F.bind(a))
          .then(a.B.bind(a)),
        function () {
          jj(b);
        },
      ),
      function (d) {
        tm(a.g, Error('Failed to completely disable offline: ' + d));
        throw d;
      },
    );
  }
  qv.prototype.B = function () {
    var a = this;
    if (this.o) {
      var b = new Lo(),
        c = new ls();
      kc(b, ms, c);
      Qo(this.o, b);
    }
    b = this.j.Fa(81001);
    this.j.Oa(b);
    return this.j.ec().then(function () {
      Ao(a.v);
    });
  };
  function sv(a) {
    var b = new Qr(a.g);
    return rd(
      new H(function (c, d) {
        Rr(b, c, d);
      }).then(function () {
        return new H(function (c) {
          Ur(b, c);
        });
      }, aa()),
      function () {
        jj(b);
      },
    );
  }
  qv.prototype.F = function () {
    var a = this;
    xp('');
    return new H(function (b, c) {
      Oq(a.A.j.J(), b, c);
    });
  };
  function tv(a) {
    this.g = a;
  }
  function uv(a, b) {
    var c = (c = a.g.getItem('optInLog')) ? JSON.parse(c) : [];
    c.push({ email: b, timestamp: Date.now() });
    a.g.setItem('optInLog', new ok().R(c));
  }
  function vv() {
    var a = r.localStorage;
    if (!a) throw Error('Local storage not available');
    return new tv(a);
  }
  function wv(a) {
    switch (a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 5;
      case 6:
        return 6;
      case 7:
        return 8;
      case 8:
        return 7;
      case 9:
        return 9;
      case 10:
        return 10;
      case 11:
        return 11;
      case 12:
        return 12;
      default:
        return 0;
    }
  }
  function xv(a, b, c, d) {
    this.v = a;
    this.g = b;
    this.o = c;
    this.j = d;
  }
  function yv(a) {
    return zr(a.v)
      .then(function (b) {
        return zv(b).then(function () {
          var c = vu();
          return Av(a, b, c);
        });
      })
      .then(function (b) {
        return Bv(a, b);
      });
  }
  function zv(a) {
    return new H(function (b, c) {
      yi(a.j.C, b, c);
    }).then(function (b) {
      if (b && b.length)
        throw Error(
          'Aborting opt-in because there is another user in LocalStorage.',
        );
    });
  }
  function Av(a, b, c) {
    var d = new ri(C(c, 1), !0);
    si(d, C(c, 2));
    ti(d, C(c, 3));
    ui(d, !!bc(c, 4));
    vi(d, !!bc(c, 6));
    T(d, 'optInReasons', a.g);
    T(d, 'optInTime', Date.now());
    return new H(function (e, f) {
      b.write([d], e, f);
    }).then(function () {
      return d;
    });
  }
  function Bv(a, b) {
    uv(vv(), Eg(b, 'emailAddress') || '');
    r.localStorage && (Ap(!1), xp(b.I()));
    b = new Lo();
    var c = new ns();
    kc(b, os, c);
    Qo(a.o, b);
    b = new wo();
    var d = new zu(b);
    return xo(b)
      .then(function () {
        return new H(function (e, f) {
          Au(d, e, f);
        });
      })
      .then(function (e) {
        var f = Bu(),
          g = new xn();
        a.g[0] && E(g, 1, wv(a.g[0]));
        E(g, 10, e);
        E(g, 11, f);
        e = a.j.Fa(81e3);
        f = Mt(e);
        G(f, 34, g);
        a.j.Oa(e);
      });
  }
  function Cv(a, b, c, d, e, f, g, h, k, l) {
    W.call(this);
    this.g = f;
    var p = new MessageChannel();
    p.port1.onmessage = um(this.g, this.Gc, this);
    lj(this, p.port1.close, p.port1);
    this.D = l || Hc();
    this.P = h;
    this.A = k;
    h = this.D.g;
    (h.parentWindow || h.defaultView).parent.postMessage(void 0, g, [p.port2]);
    this.W = b;
    this.G = a;
    a.connect();
    this.o = c;
    this.j = new wo();
    this.J = new Qu(this.o, f);
    a = new zu(this.j);
    this.N = new Cu(this.j);
    this.L = new Su(this.J, a);
    this.K = {};
    this.M = {};
    Dv(this, 1, this.yc.bind(this), [1, 2, 3, 4]);
    Dv(this, 5, this.Hc.bind(this), [1, 2, 4]);
    Dv(this, 2, this.xc.bind(this), [1, 2, 3, 4]);
    Dv(this, 3, this.wc.bind(this), [1, 2, 3, 4]);
    Dv(this, 4, this.Bc.bind(this), [1, 2, 3, 4]);
    Dv(this, 6, this.sc.bind(this), [1, 2, 4]);
    Dv(this, 8, this.Cc.bind(this), [1, 2]);
    Dv(this, 7, this.nc.bind(this), [1, 2]);
    Dv(this, 9, this.Fc.bind(this), [1, 2, 3, 4]);
    Dv(this, 10, this.Ac.bind(this), [1, 2, 3, 4]);
    Dv(this, 11, this.tc.bind(this), [1, 2, 3, 4]);
    Dv(this, 12, this.Dc.bind(this), [1, 2]);
    Dv(this, 13, this.zc.bind(this), [1, 2, 3, 4]);
    Dv(this, 14, this.Jc.bind(this), [3]);
    this.v = d;
    k &&
      (D(e.g, 2) || ((d = e.g), (a = new Jn()), G(d, 2, a)),
      (e = F(e.g, Jn, 2)),
      D(e, 1),
      E(e, 1, k));
    this.B = tt();
  }
  q(Cv, W);
  n = Cv.prototype;
  n.Gc = function (a) {
    var b = this;
    if (a.data && a.ports && a.ports.length && a.ports[0]) {
      var c = a.ports[0];
      try {
        var d = new Js(a.data);
      } catch (f) {
        d = Error('Failed to parse iframe request.');
        tm(this.g, d, { requestData: a.data });
        c.postMessage(Ev(5, d.message).data);
        return;
      }
      var e = { iframeRequestType: String(d.getType()) };
      this.K[d.getType()].includes(this.P)
        ? (0, this.M[d.getType()])(d).then(
            function (f) {
              c.postMessage(f.data, f.ports);
            },
            function (f) {
              f instanceof Fv ||
                (f instanceof Error
                  ? (tm(b.g, f, e), (f = Ev(3, f.message)))
                  : ((f = wm(f)), tm(b.g, f, e), (f = Ev(3, f.message))));
              c.postMessage(f.data);
            },
          )
        : ((a = Error('Message type ' + d.getType() + ' is not supported')),
          tm(this.g, a),
          c.postMessage(Ev(5, a.message).data));
    }
  };
  function Gv(a) {
    return new H(function (b, c) {
      Br(a.o).then(
        function (d) {
          d || c(Ev(1, 'User not found in the database.'));
          b(d);
        },
        function (d) {
          d = wm(d);
          tm(a.g, d);
          c(Ev(3, d.message));
        },
      );
    });
  }
  function Ev(a, b) {
    var c = new Os(),
      d = new As();
    a = E(d, 1, a);
    b = E(a, 2, b);
    G(c, 2, b);
    return new Fv(c);
  }
  n.yc = function () {
    return hd(new Fv(null, Po(this.W)));
  };
  n.xc = function (a) {
    var b = this,
      c = C(F(a, Cs, 2), 1),
      d = Ps(new Os(), a.getType()),
      e = new ws();
    G(d, 3, e);
    return Br(this.o).then(function (f) {
      return new H(function (g, h) {
        f
          ? wq(
              f.g.j.v,
              c,
              function (k) {
                var l = Yu(f.user, b.B);
                k = Hv(k, l, f.user);
                ys(e, k);
                g(new Fv(d));
              },
              h,
            )
          : (ys(e, []), g(new Fv(d)));
      });
    });
  };
  n.wc = function (a) {
    var b = this,
      c = Ps(new Os(), a.getType()),
      d = new ws();
    G(c, 3, d);
    return Br(this.o).then(function (e) {
      return new H(function (f, g) {
        e
          ? vq(
              e.g.j.v,
              function (h) {
                var k = Yu(e.user, b.B);
                h = Hv(h, k, e.user);
                ys(d, h);
                f(new Fv(c));
              },
              g,
            )
          : (ys(d, []), f(new Fv(c)));
      });
    });
  };
  n.Bc = function (a) {
    var b = this;
    a = Ps(new Os(), a.getType());
    var c = new Ms();
    G(a, 4, c);
    var d = new Fv(a),
      e = {},
      f = Qj(function () {
        b.g.info(
          Error('Reporting context due to timeout of offline status request.'),
          e,
        );
      }, 3e4);
    return rd(
      Fo(this.j)
        .then(function () {
          e.getOfflineStatus_discoveredExtension = 'true';
          return b.J.get();
        })
        .then(function (g) {
          e.getOfflineStatus_obtainedOfflineStatus = 'true';
          var h = new ts();
          G(c, 1, h);
          var k = g.zb;
          E(h, 1, k);
          us(h, g.Bb());
          vs(h, g.Ya());
          E(h, 5, g.Qb);
          1 == k && yp(b.g);
          if (!(g = 3 != k))
            try {
              g = !!r.localStorage.getItem('docs-urop');
            } catch (l) {
              g = !0;
            }
          return g
            ? ((e.getOfflineStatus_autoEnableReasonNotRequired = 'true'), d)
            : b.N.get().then(
                function (l) {
                  e.getOfflineStatus_obtainedAutoEnableReason = 'true';
                  l && E(h, 3, l);
                  return d;
                },
                function (l) {
                  b.g.info(
                    Error('Failed to obtain auto-enable reason: ' + l.message),
                  );
                  return d;
                },
              );
        }),
      function () {
        return Rj(f);
      },
    );
  };
  n.Ac = function (a) {
    var b = this;
    a = Ps(new Os(), a.getType());
    var c = new Ls();
    G(a, 7, c);
    var d = new Fv(a);
    return Fo(this.j)
      .then(function () {
        return Tu(b.L);
      })
      .then(function (e) {
        G(c, 1, e);
        return d;
      });
  };
  n.Dc = function (a) {
    var b = At(this.g);
    return nd(
      b.map(function (c) {
        return Ht(c);
      }),
    ).then(function () {
      var c = Ps(new Os(), a.getType());
      return new Fv(c);
    });
  };
  n.sc = function (a) {
    var b = this,
      c = C(F(a, Es, 4), 1);
    if (2 == c) {
      var d = {};
      d.unsavedChanges = vp(this.g);
      this.g.info(Error('IDB corruption detected, running opt-in flow.'), d);
      xp('');
    }
    a = Ps(new Os(), a.getType());
    var e = new zs();
    G(a, 5, e);
    var f = new Fv(a);
    return Fo(this.j)
      .then(function () {
        return Tu(b.L);
      })
      .then(function (g) {
        G(e, 1, g);
        if (1 == C(g, 1)) return yv(new xv(b.o, [c], b.G, b.v));
      })
      .then(function () {
        if (2 == c) {
          a: {
            try {
              var g;
              var h = (g = r.localStorage.getItem('docs-ldb'))
                ? ic(Vu, g)
                : null;
            } catch (k) {
              b.g.info(
                Error(
                  'Failed to read backup information from local storage: ' +
                    k.message,
                ),
              );
              h = hd();
              break a;
            }
            h = h ? Iv(b, fc(h, ss, 1), !0).then() : hd();
          }
          return h;
        }
      })
      .then(function () {
        return f;
      });
  };
  n.zc = function (a) {
    a = Ps(new Os(), a.getType());
    var b = new Bs();
    G(a, 9, b);
    var c = hs();
    E(b, 1, c);
    return hd(new Fv(a));
  };
  n.Jc = function (a) {
    var b = this;
    if (null == this.A)
      return id(
        Ev(3, 'Iframe cannot handle request if source app is not available.'),
      );
    if (!D(a, 5)) return id(Ev(3, 'UPDATE_SYNC_HINTS request missing paylod.'));
    var c = this.A,
      d = [],
      e = F(a, Hs, 5);
    0 < fc(e, as, 2).length
      ? (d = fc(e, as, 2)
          .filter(function (g) {
            return D(g, 1);
          })
          .map(function (g) {
            var h = D(g, 2) && D(F(g, vc, 2), 2) ? C(F(g, vc, 2), 2) : null;
            return new ii(C(g, 1), h);
          }))
      : 0 < C(e, 1).length &&
        (d = C(e, 1).map(function (g) {
          return new ii(g, null);
        }));
    var f;
    return Gv(this)
      .then(function (g) {
        f = g.g;
        Jv(b, d.length);
        return new H(function (h, k) {
          dr(f.j.sb(), c, h, k);
        });
      })
      .then(function (g) {
        g || (g = new ji(!0, c));
        d = d.slice(0, 500);
        ki(g, d);
        T(g, 'lastUpdatedTimestamp', Date.now());
        return new H(function (h, k) {
          f.write([g], h, k);
        });
      })
      .then(function () {
        var g = Ps(new Os(), a.getType());
        return new Fv(g);
      });
  };
  n.Hc = function (a) {
    var b = this,
      c = F(a, Fs, 3),
      d = fc(c, ss, 1),
      e = bc(c, 2),
      f = bc(c, 3) || !1;
    return Fo(this.j)
      .then(function () {
        if (!no())
          return id(Ev(4, 'Extension missing when trying to pin document.'));
      })
      .then(function () {
        return Iv(b, d, e);
      })
      .then(function (g) {
        if (!g.length || (11 == b.A && O(P(), 'docs-ddfp'))) return null;
        g = Bo(b.j, g);
        return f ? g : null;
      })
      .then(function (g) {
        var h = Ps(new Os(), a.getType()),
          k = new Ns();
        g && G(k, 1, g);
        G(h, 8, k);
        return new Fv(h);
      });
  };
  function Iv(a, b, c) {
    var d = b.map(function (g) {
        return g.I();
      }),
      e = [],
      f;
    return Gv(a)
      .then(function (g) {
        f = g.g;
        return new H(function (h, k) {
          wq(f.j.v, d, h, k);
        });
      })
      .then(function (g) {
        var h = {};
        g.forEach(function (x) {
          h[x.I()] = x;
        });
        var k = [];
        for (g = 0; g < b.length; g++) {
          var l = b[g],
            p = l.I(),
            t = l.getType();
          if ((l = h[l.I()]) || c)
            c &&
              (l
                ? !0 === Fg(l, 'hpmdo') && e.push(p)
                : ((l = f.j.v.createDocument(p, t, 2)),
                  Gg(l, 'hpmdo', !0),
                  e.push(p))),
              l.getType(),
              l.Qa(c),
              c && null == Dg(l, 'initialPinSourceApp')
                ? Yg(l, null != a.A ? a.A : 0)
                : c || Yg(l, null),
              k.push(l);
        }
        return new H(function (x, u) {
          f.write(k, x, u);
        });
      })
      .then(function () {
        return e;
      });
  }
  n.Cc = function (a) {
    a = Ps(new Os(), a.getType());
    var b = new Ks();
    G(a, 6, b);
    var c = new Fv(a);
    return this.o
      .get()
      .then(function (d) {
        var e = d.j.v;
        return new H(function (f, g) {
          tq(e, f, g);
        }).then(function (f) {
          if (f.length) E(b, 1, !0);
          else
            return new H(function (g, h) {
              yq(e, g, h);
            }).then(function (g) {
              E(b, 1, !!g.length);
            });
        });
      })
      .then(function () {
        return c;
      });
  };
  n.nc = function (a) {
    var b = this;
    a = Ps(new Os(), a.getType());
    var c = new Fv(a);
    return Fo(this.j)
      .then(function () {
        return zr(b.o);
      })
      .then(function (d) {
        var e = new Eu(b.D);
        d = new qv(d, b.g, b.j, e, b.G, b.v, new hv(b.g, d, b.v));
        Ap(!0);
        return rv(d);
      })
      .then(function () {
        return c;
      });
  };
  n.Fc = function (a) {
    var b = this;
    a = Ps(new Os(), a.getType());
    var c = new Fv(a);
    return Fo(this.j)
      .then(function () {
        if (no()) return xo(b.j);
      })
      .then(function () {
        return c;
      });
  };
  n.tc = function (a) {
    var b = this;
    a = Ps(new Os(), a.getType());
    var c = new Fv(a);
    return Fo(this.j)
      .then(function () {
        if (no()) return zo(b.j);
      })
      .then(function () {
        return c;
      });
  };
  function Hv(a, b, c) {
    for (var d = [], e = 0; e < a.length; e++) {
      var f = a[e];
      if (
        'trix' != f.getType() &&
        'syncstats' != f.getType() &&
        !0 !== Fg(f, 'pendingCreation')
      ) {
        var g = d,
          h = g.push,
          k = b,
          l = c;
        var p = new ps();
        var t = f.I();
        p = E(p, 1, t);
        p = E(p, 2, Eg(f, 'title'));
        t = f.getType();
        p = E(p, 3, t);
        p = E(p, 4, Cg(f, 'lastModifiedServerTimestamp'));
        p = E(p, 5, Cg(f, 'lastModifiedClientTimestamp'));
        a: if (((t = zg(f, 'acjf')), !t || vf(t))) {
          t = zg(f, 'acl');
          var x = 0,
            u = 0;
          if (null != t) for (var N in t) (x = t[N]), (u = (u + 1) | 0);
          t = Ng(1 == u ? x : 0);
        } else if (1 < Object.keys(t).length) t = new og();
        else {
          for (var ba in t) {
            t = ic(og, t[ba]);
            break a;
          }
          b = a = new Xe();
          c = he('Code should never reach here based on the code above.')
            ? 'Code should never reach here based on the code above.'
            : null;
          $d(b);
          b.A = c;
          b.C = 'Code should never reach here based on the code above.';
          ae(b);
          a.j(Error(a));
          throw a.g;
        }
        t = Pg(t);
        if ((x = 0 != t)) {
          u = l;
          l = u.I();
          var J = Mg(f, 'acjf', l);
          null != J
            ? (l = ic(og, J))
            : ((l = Mg(f, 'acl', l)), (l = Ng(null != l ? Ie(l) : 0)));
          J = Pg(l);
          k.j || (J = 1);
          l = Wg(f);
          var U = Zu(k, l.getType()),
            L = f.I(),
            Y = Eg(f, 'resourceKey');
          var V = U.g.match(Yj);
          var ia = V[5];
          L && U.o && (ia += '/d/' + L);
          var Zb = O(P(), 'docs-erkpp');
          null != Y && Zb && (ia += '/r/' + Y);
          ia += '/edit';
          var Da = {};
          L && !U.o && (Da.id = L);
          null == Y || Zb || (Da.resourcekey = Y);
          U = db(Da) ? null : ek(Da);
          L = V[1];
          Y = V[2];
          Zb = V[3];
          V = V[4];
          Da = '';
          L && (Da += L + ':');
          Zb &&
            ((Da += '//'),
            Y && (Da += Y + '@'),
            (Da += Zb),
            V && (Da += ':' + V));
          ia && (Da += ia);
          U && (Da += '?' + U);
          V = Da;
          l = Zu(k, l.getType());
          ia = k.o;
          k = V;
          u = u.I();
          a: {
            V = l.v.g;
            J = La(Og, J);
            if (-1 == J) throw Error('Requested access level is invalid');
            for (; 0 <= J; J--)
              for (U = 0; U < V.g.length; U++)
                if (V.g[U].g == Og[J]) {
                  J = V.g[U];
                  break a;
                }
            J = null;
          }
          if (!J)
            throw Error('No offline action for given access level or less.');
          U = J.j;
          L = Wg(f);
          J = ia;
          ia = Hg(f);
          V = L.j;
          L = L.g;
          U = nk(l.g, U);
          Y = [];
          u && Y.push('ouid=' + xb(u));
          Y.push('uc=' + J.g);
          V && Y.push('jobset=' + V);
          L && Y.push('ftrack=1');
          ia && (u = ia[28]) && Y.push('docosJobset=' + u);
          J = U += '?' + Y.join('&');
          ia = u = {};
          V = window;
          ('true' != kk(V.location.href, 'Debug') &&
            'true' != kk(V.location.href, 'debug')) ||
            (ia.Debug = 'true');
          u.id = f.I();
          (ia = (ia = Hg(f)) ? (0 == ia.length ? 'c' : 'd') : null) &&
            (u.cm = ia);
          u['new'] = String(!0 === Fg(f, 'inc'));
          u.ouri = k;
          (k = yg(f, 'startupHints')) && l.j && gb(u, l.j(k));
          l = Eg(f, 'resourceKey');
          null != l && (u.resourcekey = l);
          k = void 0;
          l = J;
          J = '';
          for (k in u)
            0 < J.length && (J += '&'), (J += xb(k) + '=' + xb(u[k]));
          k = xb(J);
          u = l.indexOf('#');
          E(p, 6, (0 > u ? l : l.substr(0, u)) + (k ? '#' + k : ''));
        }
        (l = Eg(f, 'mimeType')) && !0 === Fg(f, 'isd') && E(p, 15, l);
        p.Qa(!0 === Fg(f, 'ip'));
        E(p, 8, x && !0 !== Fg(f, 'hpmdo') && null != Eg(f, 'title'));
        E(p, 9, t);
        E(
          p,
          10,
          !0 !== Fg(f, 'inc') || null != Cg(f, 'lastWarmStartedTimestamp'),
        );
        E(p, 11, Cg(f, 'lsst'));
        E(p, 12, Cg(f, 'lsft'));
        E(p, 13, Fg(f, 'lss'));
        E(p, 14, 0 == Dg(f, 'pendingQueueState'));
        h.call(g, p);
      }
    }
    return d;
  }
  function Dv(a, b, c, d) {
    a.M[b] = c;
    a.K[b] = d;
  }
  function Jv(a, b) {
    var c = Q(P(), 'docs-offline-lsuid');
    if (c) {
      for (var d = 0, e = 0; e < c.length; ++e)
        d = (31 * d + c.charCodeAt(e)) >>> 0;
      c = 5 >= (d % 100) + 1;
    } else c = !1;
    c &&
      ((c = new zn()),
      (b = E(c, 1, b)),
      (c = new xn()),
      (b = G(c, 25, b)),
      (c = a.v.Fa(81010)),
      (d = Mt(c)),
      G(d, 34, b),
      a.v.Oa(c));
  }
  function Fv(a, b) {
    this.data = a ? a.ha() : void 0;
    this.ports = b ? [b] : void 0;
  }
  function Kv(a) {
    var b = new zk(r.location.href);
    switch (a) {
      case 1:
        return Ck(Bk(Ak(new zk(), b.j), b.o), b.v).toString();
      case 2:
        return (a = Q(P(), 'drive-host')), Ak(new zk('//' + a), b.j).toString();
      case 3:
        return Bk(Ak(new zk(), b.j), 'mail.google.com').toString();
      case 4:
        return Bk(
          Ak(new zk(), 'chrome-extension'),
          'lmjegmlicamnimmfhcmpkclmigmmcbeh',
        ).toString();
      default:
        throw Error('Unknown client domain ' + a);
    }
  }
  function Lv(a) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return 1;
      case 9:
        return 2;
      case 10:
        return 3;
      case 11:
        return 4;
      default:
        throw Error('No mapped client domain for source app ' + a + '.');
    }
  }
  function Mv() {
    var a = new om();
    a.v = !1;
    a.o = !0;
    a.g = new Mm();
    a.j = void 0 === b ? !1 : b;
    var b = new nm(a);
    a = Q(P(), 'buildLabel');
    /^[\s\xa0]*$/.test(a) || (b.o['build-label'] = a);
    b.o.locale = 'en';
    b.o.sessionTypeName = 'offline-iframe-api';
    b.o.sessionType = (117).toString();
    (a = r.applicationCache) && (b.o.appCacheStatusOnLoad = a.status);
    b.o.enableCelloAutoSync = 'true';
    b.o.serviceWorkerControlled = xa('navigator.serviceWorker.controller')
      ? 'true'
      : 'false';
    b.o.docsExtensionUsed = String(no());
    b.o.docsExtensionFeaturesVersion = String(oo());
    b.o.docsOfflineIframeApi = 'true';
    a = new ks();
    var c = new Oo(a, hs()),
      d = new xr(b, c),
      e = new Qs(),
      f = new su(b);
    f.j = d;
    f.g = e;
    if (f.j) var g = new Er(f.j);
    else throw Error('Must set either a LocalStore or LocalStoreSupplier');
    var h = new iu();
    if (f.g) {
      var k = new Us(f.g);
      Vs.I();
      h.o[Vs.I()] = k;
      h.g && k.g(h.g);
    }
    k = Cf();
    var l = g;
    g = Ts();
    var p = void 0 == window.isSecureContext ? !0 : window.isSecureContext;
    l = new Wn(
      new Tn(g),
      Sb && (r.indexedDB || r.webkitIndexedDB) && (is() || r.SharedWorker) && p
        ? l
        : new Yn(),
    );
    p = new tn(g);
    g = new ru();
    g.A = l;
    g.v = p;
    g.o = !0;
    l = g.g;
    D(l.g, 1);
    E(l.g, 1, k);
    k = g.g;
    D(k.g, 6);
    E(k.g, 6, 117);
    g.j = h;
    mu(g.g);
    h = new ou();
    h.j = g.g;
    null != g.j && (h.g = g.j);
    null == h.g && (h.g = new iu());
    k = h.g;
    l = new nu();
    Tt.I();
    k.j[Tt.I()] = l;
    k = h.g;
    l = new hu();
    Pt.I();
    k.j[Pt.I()] = l;
    k = h.g;
    l = h.j;
    if (!D(qu(l), 1)) {
      p = qu(l);
      var t = new Ln();
      G(p, 1, t);
    }
    l = F(qu(l), Ln, 1);
    k.g = l;
    l = Za(k.o);
    for (p = 0; p < l.length; p++) l[p].g(k.g);
    h = new lu(h.j, h.g);
    g = new $t(h, new fu(h, g.A, g.v, g.o, null), !1);
    k = new Vm(!1).get();
    l = P();
    h = g.g.j;
    p = 1e3 * Date.now();
    D(h.g, 2);
    E(h.g, 2, p);
    h.v = k;
    k = Q(l, 'buildLabel');
    null == h.j && ((h.j = new Qn()), (l = qu(h)), G(l, 2, h.j));
    D(h.j, 1);
    E(h.j, 1, k);
    k = Tm(!1);
    null != k &&
      ((h = g.g.j),
      (l = k.A),
      D(h.g, 3),
      E(h.g, 3, l),
      (l = k.g),
      D(qu(h), 4),
      (p = qu(h)),
      E(p, 4, l),
      Sb &&
        O(P(), 'docs-ccdil') &&
        ((l = new Mn()),
        (l = E(l, 1, k.o)),
        (k = E(l, 2, k.v || [])),
        (h = qu(h)),
        (l = F(h, On, 16)),
        l || ((l = new On()), G(h, 16, l)),
        (h = l),
        D(h, 9),
        G(h, 9, k)));
    tu(f, f.g);
    g.Pb();
    try {
      var x = new zk(r.location.href).g.get('sa');
      if ((x = x ? x : null))
        try {
          var u = parseInt(x, 10);
          var N = isNaN(u) ? null : u;
        } catch (Ag) {
          N = null;
        }
      else N = null;
      var ba = N ? N : null;
      if (null != ba) var J = Lv(ba);
      else {
        var U = Error('Missing source app.');
        var L = void 0 === L ? {} : L;
        var Y = void 0 === Y ? !1 : Y;
        var V = void 0 === V ? 0 : V;
        5 > Math.floor(100 * Math.random()) &&
          ((L.sampling_samplePercentage = '5'),
          (L.sampling_sampledBy = 'random'),
          0 == V
            ? b.info(U, L, Y)
            : 1 == V
              ? tm(b, U, L, Y)
              : 2 == V && rm(b, U, L, Y));
        var ia = r.location.href,
          Zb = ia.indexOf('#'),
          Da = Zj(0 > Zb ? null : ia.substr(Zb + 1));
        if (Da) {
          var Xq = Da.split('&');
          U = {};
          for (L = 0; L < Xq.length; ++L) {
            var xe = Xq[L].split('=');
            2 == xe.length &&
              0 < xe[0].length &&
              0 < xe[1].length &&
              (U[yb(xe[0])] = yb(xe[1]));
          }
          var Yq = U;
        } else Yq = {};
        var Zq = Yq.cd;
        if (Zq) {
          var $q = parseInt(Zq, 10);
          var cd = isNaN($q) ? null : $q;
        } else cd = null;
        if (null == cd) {
          try {
            var ar = r.parent.location;
            cd = Bk(Ak(new zk(), ar.protocol), ar.origin).toString() ? 1 : 2;
          } catch (Ag) {
            cd = 2;
          }
          tm(
            b,
            Error(
              'Client domain set without source app or client domain parameters.',
            ),
            { clientDomain: cd },
          );
        }
        J = cd;
      }
      var br = Kv(J);
      b.o.parentOrigin = br;
      b.o.sourceApp = ba ? ba.toString() : 'null';
      var Bg = new Cv(c, a, d, g, e, b, br, J, ba);
      X(Bg, b);
      X(Bg, c);
      X(Bg, a);
      X(Bg, d);
    } catch (Ag) {
      throw (tm(b, wm(Ag)), Ag);
    }
  }
  var Nv = ['_loadDocsOfflineApiFrame'],
    Ov = r;
  Nv[0] in Ov ||
    'undefined' == typeof Ov.execScript ||
    Ov.execScript('var ' + Nv[0]);
  for (var Pv; Nv.length && (Pv = Nv.shift()); )
    Nv.length || void 0 === Mv
      ? Ov[Pv] && Ov[Pv] !== Object.prototype[Pv]
        ? (Ov = Ov[Pv])
        : (Ov = Ov[Pv] = {})
      : (Ov[Pv] = Mv);
}).call(this);
