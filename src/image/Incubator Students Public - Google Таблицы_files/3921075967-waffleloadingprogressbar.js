(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var k = this || self;
  function l() {}
  function aa(a) {
    var b = typeof a;
    b = 'object' != b ? b : a ? (Array.isArray(a) ? 'array' : b) : 'null';
    return 'array' == b || ('object' == b && 'number' == typeof a.length);
  }
  function m(a) {
    var b = typeof a;
    return ('object' == b && null != a) || 'function' == b;
  }
  function n(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.B = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.Db = function (d, f, e) {
      for (
        var g = Array(arguments.length - 2), h = 2;
        h < arguments.length;
        h++
      )
        g[h - 2] = arguments[h];
      return b.prototype[f].apply(d, g);
    };
  }
  function p(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, p);
    else {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  }
  n(p, Error);
  p.prototype.name = 'CustomError';
  var q;
  function r(a, b) {
    a = a.split('%s');
    for (var c = '', d = a.length - 1, f = 0; f < d; f++)
      c += a[f] + (f < b.length ? b[f] : '%s');
    p.call(this, c + a[d]);
  }
  n(r, p);
  r.prototype.name = 'AssertionError';
  function t(a, b, c) {
    if (!a) {
      var d = 'Assertion failed';
      if (b) {
        d += ': ' + b;
        var f = Array.prototype.slice.call(arguments, 2);
      }
      throw new r('' + d, f || []);
    }
  }
  var ba = Array.prototype.indexOf
      ? function (a, b) {
          t(null != a.length);
          return Array.prototype.indexOf.call(a, b, void 0);
        }
      : function (a, b) {
          if ('string' === typeof a)
            return 'string' !== typeof b || 1 != b.length
              ? -1
              : a.indexOf(b, 0);
          for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    ca = Array.prototype.forEach
      ? function (a, b) {
          t(null != a.length);
          Array.prototype.forEach.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = 'string' === typeof a ? a.split('') : a,
              f = 0;
            f < c;
            f++
          )
            f in d && b.call(void 0, d[f], f, a);
        },
    da = Array.prototype.filter
      ? function (a, b) {
          t(null != a.length);
          return Array.prototype.filter.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = [],
              f = 0,
              e = 'string' === typeof a ? a.split('') : a,
              g = 0;
            g < c;
            g++
          )
            if (g in e) {
              var h = e[g];
              b.call(void 0, h, g, a) && (d[f++] = h);
            }
          return d;
        };
  function ea(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  var fa = /&/g,
    ha = /</g,
    ia = />/g,
    ja = /"/g,
    ka = /'/g,
    la = /\x00/g,
    ma = /[\x00&<>"']/;
  var u;
  a: {
    var na = k.navigator;
    if (na) {
      var oa = na.userAgent;
      if (oa) {
        u = oa;
        break a;
      }
    }
    u = '';
  }
  function pa(a, b) {
    for (var c in a) b.call(void 0, a[c], c, a);
  }
  function qa(a, b) {
    for (var c in a) if (a[c] == b) return !0;
    return !1;
  }
  var ra =
    'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
      ' ',
    );
  function sa(a, b) {
    for (var c, d, f = 1; f < arguments.length; f++) {
      d = arguments[f];
      for (c in d) a[c] = d[c];
      for (var e = 0; e < ra.length; e++)
        (c = ra[e]),
          Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  function ta(a) {
    ma.test(a) &&
      (-1 != a.indexOf('&') && (a = a.replace(fa, '&amp;')),
      -1 != a.indexOf('<') && (a = a.replace(ha, '&lt;')),
      -1 != a.indexOf('>') && (a = a.replace(ia, '&gt;')),
      -1 != a.indexOf('"') && (a = a.replace(ja, '&quot;')),
      -1 != a.indexOf("'") && (a = a.replace(ka, '&#39;')),
      -1 != a.indexOf('\x00') && (a = a.replace(la, '&#0;')));
    return a;
  }
  function v(a) {
    v[' '](a);
    return a;
  }
  v[' '] = l;
  var ua = -1 != u.indexOf('Opera'),
    w = -1 != u.indexOf('Trident') || -1 != u.indexOf('MSIE'),
    va = -1 != u.indexOf('Edge'),
    wa =
      -1 != u.indexOf('Gecko') &&
      !(-1 != u.toLowerCase().indexOf('webkit') && -1 == u.indexOf('Edge')) &&
      !(-1 != u.indexOf('Trident') || -1 != u.indexOf('MSIE')) &&
      -1 == u.indexOf('Edge'),
    xa = -1 != u.toLowerCase().indexOf('webkit') && -1 == u.indexOf('Edge');
  function ya() {
    var a = k.document;
    return a ? a.documentMode : void 0;
  }
  var x;
  a: {
    var y = '',
      z = (function () {
        var a = u;
        if (wa) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (va) return /Edge\/([\d\.]+)/.exec(a);
        if (w) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (xa) return /WebKit\/(\S+)/.exec(a);
        if (ua) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    z && (y = z ? z[1] : '');
    if (w) {
      var A = ya();
      if (null != A && A > parseFloat(y)) {
        x = String(A);
        break a;
      }
    }
    x = y;
  }
  var B = x,
    C;
  if (k.document && w) {
    var za = ya();
    C = za ? za : parseInt(B, 10) || void 0;
  } else C = void 0;
  var Aa = C;
  var D;
  (D = !w) || (D = 9 <= Number(Aa));
  var Ba = D;
  function Ca(a, b) {
    pa(b, function (c, d) {
      c && 'object' == typeof c && c.Fb && (c = c.Eb());
      'style' == d
        ? (a.style.cssText = c)
        : 'class' == d
          ? (a.className = c)
          : 'for' == d
            ? (a.htmlFor = c)
            : Da.hasOwnProperty(d)
              ? a.setAttribute(Da[d], c)
              : 0 == d.lastIndexOf('aria-', 0) || 0 == d.lastIndexOf('data-', 0)
                ? a.setAttribute(d, c)
                : (a[d] = c);
    });
  }
  var Da = {
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
  function Ea(a, b, c) {
    function d(h) {
      h && b.appendChild('string' === typeof h ? a.createTextNode(h) : h);
    }
    for (var f = 2; f < c.length; f++) {
      var e = c[f];
      if (!aa(e) || (m(e) && 0 < e.nodeType)) d(e);
      else {
        a: {
          if (e && 'number' == typeof e.length) {
            if (m(e)) {
              var g = 'function' == typeof e.item || 'string' == typeof e.item;
              break a;
            }
            if ('function' === typeof e) {
              g = 'function' == typeof e.item;
              break a;
            }
          }
          g = !1;
        }
        ca(g ? ea(e) : e, d);
      }
    }
  }
  function Fa(a, b) {
    b = String(b);
    'application/xhtml+xml' === a.contentType && (b = b.toLowerCase());
    return a.createElement(b);
  }
  function E() {
    this.g = k.document || document;
  }
  E.prototype.h = function () {};
  E.prototype.i = function (a, b, c) {
    var d = this.g,
      f = arguments,
      e = String(f[0]),
      g = f[1];
    if (!Ba && g && (g.name || g.type)) {
      e = ['<', e];
      g.name && e.push(' name="', ta(g.name), '"');
      if (g.type) {
        e.push(' type="', ta(g.type), '"');
        var h = {};
        sa(h, g);
        delete h.type;
        g = h;
      }
      e.push('>');
      e = e.join('');
    }
    e = Fa(d, e);
    g &&
      ('string' === typeof g
        ? (e.className = g)
        : Array.isArray(g)
          ? (e.className = g.join(' '))
          : Ca(e, g));
    2 < f.length && Ea(d, e, f);
    return e;
  };
  var F,
    Ga = {
      I: 'activedescendant',
      N: 'atomic',
      O: 'autocomplete',
      R: 'busy',
      U: 'checked',
      V: 'colindex',
      $: 'controls',
      ba: 'describedby',
      ea: 'disabled',
      ga: 'dropeffect',
      ha: 'expanded',
      ia: 'flowto',
      ka: 'grabbed',
      oa: 'haspopup',
      qa: 'hidden',
      sa: 'invalid',
      ta: 'label',
      ua: 'labelledby',
      va: 'level',
      Aa: 'live',
      Ka: 'multiline',
      La: 'multiselectable',
      Pa: 'orientation',
      Qa: 'owns',
      Ra: 'posinset',
      Ta: 'pressed',
      Xa: 'readonly',
      Za: 'relevant',
      $a: 'required',
      eb: 'rowindex',
      hb: 'selected',
      jb: 'setsize',
      lb: 'sort',
      zb: 'valuemax',
      Ab: 'valuemin',
      Bb: 'valuenow',
      Cb: 'valuetext',
    };
  var Ha = {
    J: 'alert',
    K: 'alertdialog',
    L: 'application',
    M: 'article',
    P: 'banner',
    S: 'button',
    T: 'checkbox',
    W: 'columnheader',
    X: 'combobox',
    Y: 'complementary',
    Z: 'contentinfo',
    aa: 'definition',
    ca: 'dialog',
    da: 'directory',
    fa: 'document',
    ja: 'form',
    la: 'grid',
    ma: 'gridcell',
    na: 'group',
    pa: 'heading',
    ra: 'img',
    wa: 'link',
    xa: 'list',
    ya: 'listbox',
    za: 'listitem',
    Ba: 'log',
    Ca: 'main',
    Da: 'marquee',
    Ea: 'math',
    Fa: 'menu',
    Ga: 'menubar',
    Ha: 'menuitem',
    Ia: 'menuitemcheckbox',
    Ja: 'menuitemradio',
    Ma: 'navigation',
    Na: 'note',
    Oa: 'option',
    Sa: 'presentation',
    Ua: 'progressbar',
    Va: 'radio',
    Wa: 'radiogroup',
    Ya: 'region',
    ab: 'row',
    bb: 'rowgroup',
    cb: 'rowheader',
    fb: 'scrollbar',
    gb: 'search',
    ib: 'separator',
    kb: 'slider',
    mb: 'spinbutton',
    nb: 'status',
    ob: 'tab',
    pb: 'tablist',
    qb: 'tabpanel',
    rb: 'textbox',
    sb: 'textinfo',
    tb: 'timer',
    ub: 'toolbar',
    vb: 'tooltip',
    wb: 'tree',
    xb: 'treegrid',
    yb: 'treeitem',
  };
  function G(a, b, c) {
    Array.isArray(c) && (c = c.join(' '));
    t(b, 'ARIA attribute cannot be empty.');
    t(qa(Ga, b), 'No such ARIA attribute ' + b);
    var d = 'aria-' + b;
    '' === c || void 0 == c
      ? (F ||
          (F = {
            atomic: !1,
            autocomplete: 'none',
            dropeffect: 'none',
            haspopup: !1,
            live: 'off',
            multiline: !1,
            multiselectable: !1,
            orientation: 'vertical',
            readonly: !1,
            relevant: 'additions text',
            required: !1,
            sort: 'none',
            busy: !1,
            disabled: !1,
            hidden: !1,
            invalid: 'false',
          }),
        (c = F),
        b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d))
      : a.setAttribute(d, c);
  }
  function H(a) {
    return 'string' == typeof a.className
      ? a.className
      : (a.getAttribute && a.getAttribute('class')) || '';
  }
  function Ia(a, b) {
    'string' == typeof a.className
      ? (a.className = b)
      : a.setAttribute && a.setAttribute('class', b);
  }
  function Ja(a, b) {
    a.classList
      ? (b = a.classList.contains(b))
      : ((a = a.classList ? a.classList : H(a).match(/\S+/g) || []),
        (b = 0 <= ba(a, b)));
    return b;
  }
  function Ka() {
    var a = I,
      b = La;
    a.classList
      ? a.classList.remove(b)
      : Ja(a, b) &&
        Ia(
          a,
          da(
            a.classList ? a.classList : H(a).match(/\S+/g) || [],
            function (c) {
              return c != b;
            },
          ).join(' '),
        );
  }
  var Ma =
    Object.freeze ||
    function (a) {
      return a;
    };
  var Na = (function () {
    if (!k.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, 'passive', {
        get: function () {
          a = !0;
        },
      });
    try {
      k.addEventListener('test', l, b), k.removeEventListener('test', l, b);
    } catch (c) {}
    return a;
  })();
  function Oa() {}
  function J(a, b) {
    this.type = a;
    this.g = this.target = b;
    this.defaultPrevented = !1;
  }
  J.prototype.h = function () {
    this.defaultPrevented = !0;
  };
  function K(a, b) {
    J.call(this, a ? a.type : '');
    this.relatedTarget = this.g = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = '';
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = '';
    this.i = null;
    if (a) {
      var c = (this.type = a.type),
        d =
          a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : null;
      this.target = a.target || a.srcElement;
      this.g = b;
      if ((b = a.relatedTarget)) {
        if (wa) {
          a: {
            try {
              v(b.nodeName);
              var f = !0;
              break a;
            } catch (e) {}
            f = !1;
          }
          f || (b = null);
        }
      } else
        'mouseover' == c
          ? (b = a.fromElement)
          : 'mouseout' == c && (b = a.toElement);
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
          : Pa[a.pointerType] || '';
      this.state = a.state;
      this.i = a;
      a.defaultPrevented && K.B.h.call(this);
    }
  }
  n(K, J);
  var Pa = Ma({ 2: 'touch', 3: 'pen', 4: 'mouse' });
  K.prototype.h = function () {
    K.B.h.call(this);
    var a = this.i;
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  };
  var L = 'closure_listenable_' + ((1e6 * Math.random()) | 0);
  var Qa = 0;
  function Ra(a, b, c, d, f) {
    this.listener = a;
    this.g = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.s = f;
    this.key = ++Qa;
    this.m = this.o = !1;
  }
  function Sa(a) {
    a.m = !0;
    a.listener = null;
    a.g = null;
    a.src = null;
    a.s = null;
  }
  function M(a) {
    this.src = a;
    this.g = {};
    this.h = 0;
  }
  M.prototype.add = function (a, b, c, d, f) {
    var e = a.toString();
    a = this.g[e];
    a || ((a = this.g[e] = []), this.h++);
    var g = Ta(a, b, d, f);
    -1 < g
      ? ((b = a[g]), c || (b.o = !1))
      : ((b = new Ra(b, this.src, e, !!d, f)), (b.o = c), a.push(b));
    return b;
  };
  function Ua(a, b) {
    var c = b.type;
    if (c in a.g) {
      var d = a.g[c],
        f = ba(d, b),
        e;
      if ((e = 0 <= f))
        t(null != d.length), Array.prototype.splice.call(d, f, 1);
      e && (Sa(b), 0 == a.g[c].length && (delete a.g[c], a.h--));
    }
  }
  function Ta(a, b, c, d) {
    for (var f = 0; f < a.length; ++f) {
      var e = a[f];
      if (!e.m && e.listener == b && e.capture == !!c && e.s == d) return f;
    }
    return -1;
  }
  var Va = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    Wa = {},
    Xa = 0;
  function Ya(a, b, c, d, f) {
    if (d && d.once) Za(a, b, c, d, f);
    else if (Array.isArray(b))
      for (var e = 0; e < b.length; e++) Ya(a, b[e], c, d, f);
    else
      (c = $a(c)),
        a && a[L]
          ? ((d = m(d) ? !!d.capture : !!d),
            ab(a),
            a.i.add(String(b), c, !1, d, f))
          : bb(a, b, c, !1, d, f);
  }
  function bb(a, b, c, d, f, e) {
    if (!b) throw Error('Invalid event type');
    var g = m(f) ? !!f.capture : !!f,
      h = cb(a);
    h || (a[Va] = h = new M(a));
    c = h.add(b, c, d, g, e);
    if (!c.g) {
      d = db();
      c.g = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener)
        Na || (f = g),
          void 0 === f && (f = !1),
          a.addEventListener(b.toString(), d, f);
      else if (a.attachEvent) a.attachEvent(eb(b.toString()), d);
      else if (a.addListener && a.removeListener)
        t('change' === b, 'MediaQueryList only has a change event'),
          a.addListener(d);
      else throw Error('addEventListener and attachEvent are unavailable.');
      Xa++;
    }
  }
  function db() {
    function a(c) {
      return b.call(a.src, a.listener, c);
    }
    var b = fb;
    return a;
  }
  function Za(a, b, c, d, f) {
    if (Array.isArray(b))
      for (var e = 0; e < b.length; e++) Za(a, b[e], c, d, f);
    else
      (c = $a(c)),
        a && a[L]
          ? a.i.add(String(b), c, !0, m(d) ? !!d.capture : !!d, f)
          : bb(a, b, c, !0, d, f);
  }
  function gb(a, b, c, d, f) {
    if (Array.isArray(b))
      for (var e = 0; e < b.length; e++) gb(a, b[e], c, d, f);
    else
      ((d = m(d) ? !!d.capture : !!d), (c = $a(c)), a && a[L])
        ? ((a = a.i),
          (b = String(b).toString()),
          b in a.g &&
            ((e = a.g[b]),
            (c = Ta(e, c, d, f)),
            -1 < c &&
              (Sa(e[c]),
              t(null != e.length),
              Array.prototype.splice.call(e, c, 1),
              0 == e.length && (delete a.g[b], a.h--))))
        : a &&
          (a = cb(a)) &&
          ((b = a.g[b.toString()]),
          (a = -1),
          b && (a = Ta(b, c, d, f)),
          (c = -1 < a ? b[a] : null) && hb(c));
  }
  function hb(a) {
    if ('number' !== typeof a && a && !a.m) {
      var b = a.src;
      if (b && b[L]) Ua(b.i, a);
      else {
        var c = a.type,
          d = a.g;
        b.removeEventListener
          ? b.removeEventListener(c, d, a.capture)
          : b.detachEvent
            ? b.detachEvent(eb(c), d)
            : b.addListener && b.removeListener && b.removeListener(d);
        Xa--;
        (c = cb(b))
          ? (Ua(c, a), 0 == c.h && ((c.src = null), (b[Va] = null)))
          : Sa(a);
      }
    }
  }
  function eb(a) {
    return a in Wa ? Wa[a] : (Wa[a] = 'on' + a);
  }
  function fb(a, b) {
    if (a.m) a = !0;
    else {
      b = new K(b, this);
      var c = a.listener,
        d = a.s || a.src;
      a.o && hb(a);
      a = c.call(d, b);
    }
    return a;
  }
  function cb(a) {
    a = a[Va];
    return a instanceof M ? a : null;
  }
  var ib = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0);
  function $a(a) {
    t(a, 'Listener can not be null.');
    if ('function' === typeof a) return a;
    t(a.handleEvent, 'An object listener must have handleEvent method.');
    a[ib] ||
      (a[ib] = function (b) {
        return a.handleEvent(b);
      });
    return a[ib];
  }
  function N() {
    this.i = new M(this);
    this.G = this;
  }
  n(N, Oa);
  N.prototype[L] = !0;
  N.prototype.removeEventListener = function (a, b, c, d) {
    gb(this, a, b, c, d);
  };
  function jb(a) {
    ab(a);
    var b = a.G;
    a = 'change';
    var c = a.type || a;
    if ('string' === typeof a) a = new J(a, b);
    else if (a instanceof J) a.target = a.target || b;
    else {
      var d = a;
      a = new J(c, b);
      sa(a, d);
    }
    b = a.g = b;
    kb(b, c, !0, a);
    kb(b, c, !1, a);
  }
  function kb(a, b, c, d) {
    if ((b = a.i.g[String(b)])) {
      b = b.concat();
      for (var f = !0, e = 0; e < b.length; ++e) {
        var g = b[e];
        if (g && !g.m && g.capture == c) {
          var h = g.listener,
            wb = g.s || g.src;
          g.o && Ua(a.i, g);
          f = !1 !== h.call(wb, d) && f;
        }
      }
    }
  }
  function ab(a) {
    t(
      a.i,
      'Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?',
    );
  }
  function O() {}
  O.g = void 0;
  O.h = function () {
    O.g || (O.g = new O());
  };
  function P(a) {
    N.call(this);
    this.u = a || q || (q = new E());
    this.D = !1;
    this.j = null;
  }
  n(P, N);
  O.h();
  P.prototype.h = function () {
    return this.j;
  };
  P.prototype.F = function () {
    this.j = Fa(this.u.g, 'DIV');
  };
  P.prototype.C = function () {
    this.D = !0;
  };
  function lb() {
    N.call(this);
  }
  n(lb, N);
  lb.prototype.g = 0;
  function Q(a) {
    return 1 * Math.round(a - 0);
  }
  function R(a) {
    P.call(this, a);
    this.v = new lb();
    Ya(this.v, 'change', this.H, !1, this);
  }
  n(R, P);
  var mb = {
    vertical: 'progress-bar-vertical',
    horizontal: 'progress-bar-horizontal',
  };
  R.prototype.F = function () {
    this.g = this.u.i('DIV', 'progress-bar-thumb');
    this.j = this.u.i('DIV', mb[this.l], this.g);
    nb(this);
    var a = this.h();
    t(a, 'The progress bar DOM element cannot be null.');
    G(a, 'valuemin', Q(0));
    a = this.h();
    t(a, 'The progress bar DOM element cannot be null.');
    G(a, 'valuemax', Q(100));
  };
  R.prototype.C = function () {
    R.B.C.call(this);
    w && 7 > B && Ya(this.h(), 'resize', this.A, !1, this);
    this.A();
    var a = this.h();
    t(a, 'The progress bar DOM element cannot be null.');
    t(qa(Ha, 'progressbar'), 'No such ARIA role progressbar');
    a.setAttribute('role', 'progressbar');
    G(a, 'live', 'polite');
  };
  function ob() {
    var a = pb,
      b = a.v,
      c = qb;
    c = Q(c);
    b.g != c && ((b.g = 100 < c + 0 ? 100 : 0 > c ? 0 : c), jb(b));
    a.h() && nb(a);
  }
  function nb(a) {
    var b = a.h();
    t(b, 'The progress bar DOM element cannot be null.');
    G(b, 'valuenow', Q(a.v.g));
  }
  R.prototype.l = 'horizontal';
  R.prototype.H = function () {
    this.A();
    jb(this);
  };
  R.prototype.A = function () {
    if (this.g) {
      var a = Q(0);
      a = (Q(this.v.g) - a) / (Q(100) - a);
      var b = Math.round(100 * a);
      'vertical' == this.l
        ? w && 7 > B
          ? ((this.g.style.top = '0'),
            (this.g.style.height = '100%'),
            (b = this.g.offsetHeight),
            (a = Math.round(a * b)),
            (this.g.style.top = b - a + 'px'),
            (this.g.style.height = a + 'px'))
          : ((this.g.style.top = 100 - b + '%'),
            (this.g.style.height = b + '%'))
        : (this.g.style.width = b + '%');
    }
  };
  var qb = 10,
    rb = window.document,
    sb = window;
  'undefined' === typeof window._docs_flag_initialData &&
    ((rb = window.parent.document), (sb = window.parent));
  var tb = rb.getElementById('waffle-loading-progress-bar-overlay'),
    pb = new R(q || (q = new E())),
    S = pb;
  if ('horizontal' != S.l) {
    var La = mb[S.l],
      T = mb.horizontal;
    S.l = 'horizontal';
    var I = S.h();
    if (I) {
      if (Ja(I, La)) {
        Ka();
        var U = I;
        if (U.classList) U.classList.add(T);
        else if (!Ja(U, T)) {
          var ub = H(U);
          Ia(U, ub + (0 < ub.length ? ' ' + T : T));
        }
      }
      var V = S.g.style;
      'vertical' == S.l
        ? ((V.left = '0'), (V.width = '100%'))
        : ((V.top = V.left = '0'), (V.height = '100%'));
      S.A();
    }
  }
  ob();
  if (null != tb) {
    var W = pb;
    if (W.D) throw Error('Component already rendered');
    W.j || W.F();
    tb ? tb.insertBefore(W.j, null) : W.u.g.body.appendChild(W.j);
    W.C();
  }
  var vb = setInterval(function () {
      80 >= qb && ((qb += 10), ob());
    }, 300),
    X = ['waffleProgressBarInterval'],
    Y = sb || k;
  X[0] in Y ||
    'undefined' == typeof Y.execScript ||
    Y.execScript('var ' + X[0]);
  for (var Z; X.length && (Z = X.shift()); )
    X.length || void 0 === vb
      ? Y[Z] && Y[Z] !== Object.prototype[Z]
        ? (Y = Y[Z])
        : (Y = Y[Z] = {})
      : (Y[Z] = vb);
}).call(this);
