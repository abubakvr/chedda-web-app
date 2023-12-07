import { ethers } from 'ethers';

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var _format = "hh-sol-artifact-1";
var contractName = "ERC20";
var sourceName = "contracts/tokens/ERC20.sol";
var abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode = "0x";
var deployedBytecode = "0x";
var linkReferences = {
};
var deployedLinkReferences = {
};
var ERC20 = {
	_format: _format,
	contractName: contractName,
	sourceName: sourceName,
	abi: abi,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	linkReferences: linkReferences,
	deployedLinkReferences: deployedLinkReferences
};

var ERC20Token = /*#__PURE__*/function () {
  function ERC20Token(provider, address, signer) {
    this.provider = provider;
    this.address = address;
    this.signer = signer;
    this.initiateContract();
  }
  var _proto = ERC20Token.prototype;
  _proto.name = /*#__PURE__*/function () {
    var _name = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return this.contract.name();
          case 3:
            return _context.abrupt("return", _context.sent);
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error('Error in name:', _context.t0);
            throw _context.t0;
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 6]]);
    }));
    function name() {
      return _name.apply(this, arguments);
    }
    return name;
  }();
  _proto.symbol = /*#__PURE__*/function () {
    var _symbol = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return this.contract.symbol();
          case 3:
            return _context2.abrupt("return", _context2.sent);
          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.error('Error in symbol:', _context2.t0);
            throw _context2.t0;
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[0, 6]]);
    }));
    function symbol() {
      return _symbol.apply(this, arguments);
    }
    return symbol;
  }();
  _proto.approve = /*#__PURE__*/function () {
    var _approve = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(spender, amount) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            if (!this.contract.isNFT) {
              _context3.next = 6;
              break;
            }
            _context3.next = 4;
            return this.contract.connect(this.signer).setApprovalForAll(spender, amount);
          case 4:
            _context3.next = 8;
            break;
          case 6:
            _context3.next = 8;
            return this.contract.connect(this.signer).approve(spender, amount);
          case 8:
            _context3.next = 14;
            break;
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.error('Error in approve:', _context3.t0);
            throw _context3.t0;
          case 14:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[0, 10]]);
    }));
    function approve(_x, _x2) {
      return _approve.apply(this, arguments);
    }
    return approve;
  }();
  _proto.allowance = /*#__PURE__*/function () {
    var _allowance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(account, spender) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            if (!this.contract.isNFT) {
              _context4.next = 7;
              break;
            }
            _context4.next = 4;
            return this.contract.isApprovedForAll(account, spender);
          case 4:
            return _context4.abrupt("return", _context4.sent);
          case 7:
            _context4.next = 9;
            return this.contract.allowance(account, spender);
          case 9:
            return _context4.abrupt("return", _context4.sent);
          case 10:
            _context4.next = 16;
            break;
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            console.error('Error in allowance:', _context4.t0);
            throw _context4.t0;
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[0, 12]]);
    }));
    function allowance(_x3, _x4) {
      return _allowance.apply(this, arguments);
    }
    return allowance;
  }();
  _proto.balanceOf = /*#__PURE__*/function () {
    var _balanceOf = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(account) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return this.contract.balanceOf(account);
          case 3:
            return _context5.abrupt("return", _context5.sent);
          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            console.error('Error in balanceOf:', _context5.t0);
            throw _context5.t0;
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this, [[0, 6]]);
    }));
    function balanceOf(_x5) {
      return _balanceOf.apply(this, arguments);
    }
    return balanceOf;
  }();
  _proto.ownedTokens = /*#__PURE__*/function () {
    var _ownedTokens = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(account) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return this.contract.ownedTokens(account);
          case 3:
            return _context6.abrupt("return", _context6.sent.map(function (t) {
              return t.toString();
            }));
          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            console.error('Error in ownedTokens:', _context6.t0);
            throw _context6.t0;
          case 10:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this, [[0, 6]]);
    }));
    function ownedTokens(_x6) {
      return _ownedTokens.apply(this, arguments);
    }
    return ownedTokens;
  }();
  _proto.transfer = /*#__PURE__*/function () {
    var _transfer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(to, amount) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return this.contract.connect(this.signer).transfer(to, amount);
          case 3:
            _context7.next = 9;
            break;
          case 5:
            _context7.prev = 5;
            _context7.t0 = _context7["catch"](0);
            console.error('Error in transfer:', _context7.t0);
            throw _context7.t0;
          case 9:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this, [[0, 5]]);
    }));
    function transfer(_x7, _x8) {
      return _transfer.apply(this, arguments);
    }
    return transfer;
  }();
  _proto.totalSupply = /*#__PURE__*/function () {
    var _totalSupply = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return this.contract.totalSupply();
          case 3:
            return _context8.abrupt("return", _context8.sent);
          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8["catch"](0);
            console.error('Error in totalSupply:', _context8.t0);
            throw _context8.t0;
          case 10:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this, [[0, 6]]);
    }));
    function totalSupply() {
      return _totalSupply.apply(this, arguments);
    }
    return totalSupply;
  }();
  _proto.initiateContract = function initiateContract() {
    var abi = ERC20.abi;
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.');
    }
    this.contract = new ethers.Contract(this.address, abi, this.provider);
  };
  return ERC20Token;
}();

var _format$1 = "hh-sol-artifact-1";
var contractName$1 = "LendingPool";
var sourceName$1 = "contracts/pool/LendingPool.sol";
var abi$1 = [
	{
		inputs: [
			{
				internalType: "string",
				name: "_name",
				type: "string"
			},
			{
				internalType: "contract ERC20",
				name: "_asset",
				type: "address"
			},
			{
				internalType: "address",
				name: "_priceFeed",
				type: "address"
			},
			{
				components: [
					{
						internalType: "address",
						name: "token",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "collateralFactor",
						type: "uint256"
					},
					{
						internalType: "enum LendingPool.TokenType",
						name: "tokenType",
						type: "uint8"
					}
				],
				internalType: "struct LendingPool.CollateralInfo[]",
				name: "_collateralTokens",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "health",
				type: "uint256"
			}
		],
		name: "CheddaPool_AccountInsolvent",
		type: "error"
	},
	{
		inputs: [
		],
		name: "CheddaPool_AssetMustBeSupplied",
		type: "error"
	},
	{
		inputs: [
		],
		name: "CheddaPool_AsssetMustBeWithdrawn",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "CheddaPool_CollateralNotAllowed",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "available",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "requested",
				type: "uint256"
			}
		],
		name: "CheddaPool_InsufficientAssetBalance",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountRequested",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountDeposited",
				type: "uint256"
			}
		],
		name: "CheddaPool_InsufficientCollateral",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "price",
				type: "int256"
			},
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "CheddaPool_InvalidPrice",
		type: "error"
	},
	{
		inputs: [
		],
		name: "CheddaPool_Overpayment",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "CheddaPool_WrongCollateralType",
		type: "error"
	},
	{
		inputs: [
		],
		name: "CheddaPool_ZeroAmount",
		type: "error"
	},
	{
		inputs: [
		],
		name: "CheddaPool_ZeroShsares",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "OwnableInvalidOwner",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "OwnableUnauthorizedAccount",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "x",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "y",
				type: "uint256"
			}
		],
		name: "PRBMath_MulDiv18_Overflow",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "x",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "y",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "denominator",
				type: "uint256"
			}
		],
		name: "PRBMath_MulDiv_Overflow",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "value",
				type: "int256"
			}
		],
		name: "SafeCastOverflowedIntToUint",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "debtMinted",
				type: "uint256"
			}
		],
		name: "AssetBorrowed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "debtBurned",
				type: "uint256"
			}
		],
		name: "AssetRepaid",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: false,
				internalType: "enum LendingPool.TokenType",
				name: "ofType",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "CollateralAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: false,
				internalType: "enum LendingPool.TokenType",
				name: "ofType",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "CollateralRemoved",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "caller",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "assets",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			}
		],
		name: "Deposit",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "gauge",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "GaugeSet",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "caller",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "receiver",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "assets",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			}
		],
		name: "Withdraw",
		type: "event"
	},
	{
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "accountAssetsBorrowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "address",
				name: "collateral",
				type: "address"
			}
		],
		name: "accountCollateralAmount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "accountCollateralDeposited",
		outputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "enum LendingPool.TokenType",
				name: "tokenType",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "address",
				name: "collateral",
				type: "address"
			}
		],
		name: "accountCollateralTokenIds",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "accountHealth",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "addCollateral",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "asset",
		outputs: [
			{
				internalType: "contract ERC20",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "assetBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "available",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "baseBorrowAPY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "baseSupplyAPY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "borrowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "characterization",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "collateralAllowed",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "collateralFactor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "collateralTokenList",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "collateralTokenTypes",
		outputs: [
			{
				internalType: "enum LendingPool.TokenType",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "collaterals",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			}
		],
		name: "convertToAssets",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "assets",
				type: "uint256"
			}
		],
		name: "convertToShares",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "debtToken",
		outputs: [
			{
				internalType: "contract DebtToken",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "assets",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address"
			}
		],
		name: "deposit",
		outputs: [
			{
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "feesPaid",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "gauge",
		outputs: [
			{
				internalType: "contract ILiquidityGauge",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "getTokenCollateralValue",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "getTokenMarketValue",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "interestRateModel",
		outputs: [
			{
				internalType: "contract IInterestRateModel",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "interestRates",
		outputs: [
			{
				internalType: "uint256",
				name: "supplyRate",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "borrowRate",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "maxDeposit",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "maxMint",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "maxRedeem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "maxWithdraw",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "assets",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "poolAsset",
		outputs: [
			{
				internalType: "contract ERC20",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "assets",
				type: "uint256"
			}
		],
		name: "previewDeposit",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			}
		],
		name: "previewMint",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			}
		],
		name: "previewRedeem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "assets",
				type: "uint256"
			}
		],
		name: "previewWithdraw",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "priceFeed",
		outputs: [
			{
				internalType: "contract IPriceFeed",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "putAmount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			}
		],
		name: "putShares",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "shares",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "redeem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "removeCollateral",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_gauge",
				type: "address"
			}
		],
		name: "setGauge",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "supplied",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address"
			},
			{
				internalType: "bool",
				name: "useAsCollateral",
				type: "bool"
			}
		],
		name: "supply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "take",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "tokenCollateralDeposited",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "totalAccountCollateralValue",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalAssets",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "tvl",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "utilization",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "version",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "assetAmount",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "withdraw",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode$1 = "0x610140604052600160075534801562000016575f80fd5b5060405162006e6138038062006e6183398101604081905262000039916200069c565b3383846001600160a01b03166306fdde036040518163ffffffff1660e01b81526004015f60405180830381865afa15801562000077573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052620000a09190810190620007df565b604051602001620000b2919062000814565b604051602081830303815290604052856001600160a01b03166395d89b416040518163ffffffff1660e01b81526004015f60405180830381865afa158015620000fd573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052620001269190810190620007df565b6040516020016200013891906200084a565b6040516020818303038152906040528181846001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000186573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620001ac919062000875565b5f620001b984826200092a565b506001620001c883826200092a565b5060ff81166080524660a052620001de6200031f565b60c0525050506001600160a01b0392831660e052505081166200021a57604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b6200022581620003b9565b5066b1a2bc2ec5000067016345785d8a0000670c7d713b49da00006040516200024e9062000564565b92835260208301919091526040820152606001604051809103905ff0801580156200027b573d5f803e3d5ffd5b50600d80546001600160a01b0319166001600160a01b0392909216919091179055600a620002aa85826200092a565b506001600160a01b0382166101205260405183903090620002cb9062000572565b6001600160a01b03928316815291166020820152604001604051809103905ff080158015620002fc573d5f803e3d5ffd5b506001600160a01b03166101005262000315816200040a565b5050505062000ab9565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f5f604051620003519190620009f2565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b620004158162000418565b50565b5f5b815181101562000560575f8282815181106200043a576200043a62000a6c565b60209081029190910181015151600f805460018082019092557f8d1108e10bcb7c27dddfc02ed9d693a074039d026cf4ea4240b40f7d581ac8020180546001600160a01b0319166001600160a01b0384169081179091555f90815260109093526040909220805460ff19169092179091558351909150839083908110620004c557620004c562000a6c565b6020908102919091018101516040908101516001600160a01b0384165f90815260119093529120805460ff1916600183600281111562000509576200050962000a80565b021790555082828151811062000523576200052362000a6c565b6020908102919091018101518101516001600160a01b039092165f9081526012909152604090205580620005578162000a94565b9150506200041a565b5050565b61049580620047e083390190565b6121ec8062004c7583390190565b634e487b7160e01b5f52604160045260245ffd5b604051606081016001600160401b0381118282101715620005b957620005b962000580565b60405290565b604051601f8201601f191681016001600160401b0381118282101715620005ea57620005ea62000580565b604052919050565b5f5b838110156200060e578181015183820152602001620005f4565b50505f910152565b5f82601f83011262000626575f80fd5b81516001600160401b0381111562000642576200064262000580565b62000657601f8201601f1916602001620005bf565b8181528460208386010111156200066c575f80fd5b6200067f826020830160208701620005f2565b949350505050565b6001600160a01b038116811462000415575f80fd5b5f805f8060808587031215620006b0575f80fd5b84516001600160401b0380821115620006c7575f80fd5b620006d58883890162000616565b95506020915081870151620006ea8162000687565b80955050604080880151620006ff8162000687565b809550506060808901518381111562000716575f80fd5b8901601f81018b1362000727575f80fd5b8051848111156200073c576200073c62000580565b6200074c868260051b01620005bf565b818152868101955090830282018601908c82111562000769575f80fd5b918601915b81831015620007ce5783838e03121562000787575f8081fd5b6200079162000594565b83516200079e8162000687565b815283880151888201528584015160038110620007ba575f8081fd5b81870152865294860194918301916200076e565b999c989b5096995050505050505050565b5f60208284031215620007f0575f80fd5b81516001600160401b0381111562000806575f80fd5b6200067f8482850162000616565b6c021a422a22220902a37b5b2b71609d1b81525f82516200083d81600d850160208701620005f2565b91909101600d0192915050565b610c6d60f31b81525f825162000868816002850160208701620005f2565b9190910160020192915050565b5f6020828403121562000886575f80fd5b815160ff8116811462000897575f80fd5b9392505050565b600181811c90821680620008b357607f821691505b602082108103620008d257634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111562000925575f81815260208120601f850160051c81016020861015620009005750805b601f850160051c820191505b8181101562000921578281556001016200090c565b5050505b505050565b81516001600160401b0381111562000946576200094662000580565b6200095e816200095784546200089e565b84620008d8565b602080601f83116001811462000994575f84156200097c5750858301515b5f19600386901b1c1916600185901b17855562000921565b5f85815260208120601f198616915b82811015620009c457888601518255948401946001909101908401620009a3565b5085821015620009e257878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b5f80835462000a01816200089e565b6001828116801562000a1c576001811462000a325762000a60565b60ff198416875282151583028701945062000a60565b875f526020805f205f5b8581101562000a575781548a82015290840190820162000a3c565b50505082870194505b50929695505050505050565b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52602160045260245ffd5b5f6001820162000ab257634e487b7160e01b5f52601160045260245ffd5b5060010190565b60805160a05160c05160e0516101005161012051613c0d62000bd35f395f81816106e2015281816112b501528181611476015261245201525f81816109c401528181610f3f0152818161151a015281816115c30152818161184701528181611cdd01528181611db00152611e9901525f81816105720152818161062901528181610d7801528181610eb101528181610fcd01528181611105015281816111dd0152818161168d01528181611707015281816117de0152818161191001528181611b9301528181611bfe01528181611e3001528181611fc001528181611ff801528181612535015281816125b801528181613180015281816132d9015261336c01525f610dff01525f610dcf01525f6105310152613c0d5ff3fe608060405234801561000f575f80fd5b5060043610610441575f3560e01c80638da5cb5b11610243578063c6e6f59211610148578063ea21cd92116100c3578063f3f539ea11610093578063f8d8989811610079578063f8d89898146109bf578063f9e3e756146109e6578063fbcc6f5e14610a3c575f80fd5b8063f3f539ea146109a4578063f3fdb15a146109ac575f80fd5b8063ea21cd9214610954578063ef8b30f71461095c578063f21449461461096f578063f2fde38b14610991575f80fd5b8063d505accf11610118578063da0f862f116100fe578063da0f862f1461090f578063dd62ed3e14610922578063e5328e061461094c575f80fd5b8063d505accf146108d4578063d905777e146108e7575f80fd5b8063c6e6f5921461088b578063cccb022f1461089e578063cd88e558146108c1578063ce96cb77146108c1575f80fd5b8063b3a5a0a2116101d8578063b5b99531116101a8578063ba0876521161018e578063ba08765214610865578063c28d21a314610878578063c63d75b6146105ac575f80fd5b8063b5b99531146104f5578063b8abe1a014610852575f80fd5b8063b3a5a0a2146107f9578063b3ca23f21461080c578063b3d7f6b91461082c578063b460af941461083f575f80fd5b8063a2879e7211610213578063a2879e721461079b578063a6f19c84146107a4578063a9059cbb146107b7578063a947fc05146107ca575f80fd5b80638da5cb5b1461075c57806393f342771461076d57806394bf804d1461078057806395d89b4114610793575f80fd5b80634fd9efc4116103495780636e553f65116102de578063741bef1a116102ae5780637ee22b8f116102945780637ee22b8f14610723578063876467f8146107365780638b96b28014610749575f80fd5b8063741bef1a146106dd5780637ecebe0014610704575f80fd5b80636e553f651461069057806370a08231146106a3578063715018a6146106c257806371c03e2a146106ca575f80fd5b80636569268111610319578063656926811461064d57806369609c421461066c5780636d75b9ee146106745780636e42283114610687575f80fd5b80634fd9efc4146105f057806354fd4d501461060357806355a68ed3146106125780635ed7453e14610627575f80fd5b806323b872dd116103d957806338d52e0f116103a95780634113e5ca1161038f5780634113e5ca146105c057806348a0d754146105d55780634cdad506146105dd575f80fd5b806338d52e0f1461056d578063402d267d146105ac575f80fd5b806323b872dd1461050657806329088d1e14610519578063313ce5671461052c5780633644e51514610565575f80fd5b80630a28a477116104145780630a28a477146104a7578063151d70bb146104ba57806317520319146104f557806318160ddd146104fd575f80fd5b806301e1d1141461044557806306fdde031461045c57806307a2d13a14610471578063095ea7b314610484575b5f80fd5b6008545b6040519081526020015b60405180910390f35b610464610a5b565b60405161045391906136ba565b61044961047f366004613705565b610ae6565b610497610492366004613737565b610b13565b6040519015158152602001610453565b6104496104b5366004613705565b610b7f565b6104496104c836600461375f565b6001600160a01b039182165f90815260136020908152604080832093909416825291909152206001015490565b610449610b9f565b61044960025481565b610497610514366004613790565b610c1c565b6104496105273660046137c9565b610d09565b6105537f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610453565b610449610dcc565b6105947f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610453565b6104496105ba36600461380a565b505f1990565b6105c8610e21565b6040516104539190613823565b610449610e81565b6104496105eb366004613705565b610ee8565b6104496105fe366004613705565b610ef2565b60405160018152602001610453565b61062561062036600461380a565b611040565b005b7f0000000000000000000000000000000000000000000000000000000000000000610594565b61044961065b36600461380a565b60146020525f908152604090205481565b6104496110a1565b610625610682366004613737565b6110b7565b61044960085481565b61044961069e36600461386f565b611175565b6104496106b136600461380a565b60036020525f908152604090205481565b61062561125f565b6104496106d8366004613737565b611272565b6105947f000000000000000000000000000000000000000000000000000000000000000081565b61044961071236600461380a565b60056020525f908152604090205481565b61044961073136600461380a565b6114de565b610625610744366004613737565b61163f565b61044961075736600461380a565b6116f4565b6006546001600160a01b0316610594565b61044961077b366004613705565b611763565b61044961078e36600461386f565b6118f7565b610464611992565b61044960095481565b600e54610594906001600160a01b031681565b6104976107c5366004613737565b61199f565b6107ec6107d836600461380a565b60116020525f908152604090205460ff1681565b60405161045391906138c4565b610594610807366004613705565b611a15565b61081f61081a36600461375f565b611a3d565b60405161045391906138d2565b61044961083a366004613705565b611b1a565b61044961084d366004613909565b611b39565b610449610860366004613705565b611c83565b610449610873366004613909565b611f54565b61044961088636600461380a565b61201e565b610449610899366004613705565b612166565b600b54600c546108ac919082565b60408051928352602083019190915201610453565b6104496108cf36600461380a565b612186565b6106256108e2366004613950565b6121a7565b6104496108f536600461380a565b6001600160a01b03165f9081526003602052604090205490565b61044961091d366004613737565b61240f565b61044961093036600461375f565b600460209081525f928352604080842090915290825290205481565b61044961252b565b610449612655565b61044961096a366004613705565b61265e565b61049761097d36600461380a565b60106020525f908152604090205460ff1681565b61062561099f36600461380a565b612668565b6104646126be565b600d54610594906001600160a01b031681565b6105947f000000000000000000000000000000000000000000000000000000000000000081565b610a2d6109f436600461375f565b601360209081525f9283526040808420909152908252902080546001909101546001600160a01b03821691600160a01b900460ff169083565b604051610453939291906139b8565b610449610a4a36600461380a565b60126020525f908152604090205481565b5f8054610a67906139e3565b80601f0160208091040260200160405190810160405280929190818152602001828054610a93906139e3565b8015610ade5780601f10610ab557610100808354040283529160200191610ade565b820191905f5260205f20905b815481529060010190602001808311610ac157829003601f168201915b505050505081565b6002545f908015610b0a57610b05610afd60085490565b8490836126cb565b610b0c565b825b9392505050565b335f8181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610b6d9086815260200190565b60405180910390a35060015b92915050565b6002545f908015610b0a57610b0581610b9760085490565b8591906126e6565b600d545f906001600160a01b03166390d3b379610bba612655565b6040518263ffffffff1660e01b8152600401610bd891815260200190565b602060405180830381865afa158015610bf3573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c179190613a1b565b905090565b6001600160a01b0383165f9081526004602090815260408083203384529091528120545f198114610c7557610c518382613a46565b6001600160a01b0386165f9081526004602090815260408083203384529091529020555b6001600160a01b0385165f9081526003602052604081208054859290610c9c908490613a46565b90915550506001600160a01b038085165f81815260036020526040908190208054870190555190918716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610cf69087815260200190565b60405180910390a3506001949350505050565b5f600754600114610d4e5760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b60448201526064015b60405180910390fd5b60026007555f610d5e8585611175565b90508215610dbf576016805460ff19166001179055610d9e7f0000000000000000000000000000000000000000000000000000000000000000865f612709565b8460155f828254610daf9190613a59565b90915550506016805460ff191690555b6001600755949350505050565b5f7f00000000000000000000000000000000000000000000000000000000000000004614610dfc57610c176129e2565b507f000000000000000000000000000000000000000000000000000000000000000090565b6060600f805480602002602001604051908101604052809291908181526020018280548015610e7757602002820191905f5260205f20905b81546001600160a01b03168152600190910190602001808311610e59575b5050505050905090565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401610bd8565b5f610b7982610ae6565b5f33610efe8184612a7a565b6040517fce2929d8000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b0382811660248301525f917f00000000000000000000000000000000000000000000000000000000000000009091169063ce2929d8906044016020604051808303815f875af1158015610f87573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610fab9190613a1b565b9050610fb75f85612acd565b610fc082612b67565b610ff46001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168386612bcb565b60408051858152602081018390526001600160a01b038416917f6c8250ea4d625c09ee567802242f70b37c9dcfdb10a904563781c1ed7663c7cc91015b60405180910390a29392505050565b611048612c6c565b600e805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383169081179091556040513391907f815454f47dc7631dca873f265966d1554a22d7bfb87c63ef99d9a5cdb42af530905f90a350565b5f6110aa610e81565b600854610c179190613a46565b6007546001146110f65760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b6044820152606401610d45565b60026007556001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811690831603611160576040517f5c44b6b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61116c82826001612709565b50506001600755565b5f61117f8361265e565b9050805f036111d05760405162461bcd60e51b815260206004820152600b60248201527f5a45524f5f5348415245530000000000000000000000000000000000000000006044820152606401610d45565b6112056001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333086612cb2565b61120f8282612d5a565b60408051848152602081018390526001600160a01b0384169133917fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7910160405180910390a3610b798382612dc4565b611267612c6c565b6112705f612de5565b565b6040517f78334aee0000000000000000000000000000000000000000000000000000000081526001600160a01b0383811660048301525f602483018190529182917f000000000000000000000000000000000000000000000000000000000000000016906378334aee90604401602060405180830381865afa1580156112fa573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061131e9190613a1b565b6001600160a01b0385165f908152601260205260409020549091506114d690611449906114d061144c8773__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f90918b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113a0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906113c49190613a6c565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925260ff16602482015260126044820152606401602060405180830381865af4158015611425573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906114499190613a1b565b90565b6114d061145887612e43565b73__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f90917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113a0573d5f803e3d5ffd5b90612e85565b949350505050565b6040517fa447a5c60000000000000000000000000000000000000000000000000000000081526001600160a01b0382811660048301525f9182917f0000000000000000000000000000000000000000000000000000000000000000169063a447a5c690602401602060405180830381865afa15801561155f573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906115839190613a1b565b9050805f0361159457505f92915050565b6040517f07a2d13a000000000000000000000000000000000000000000000000000000008152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906307a2d13a90602401602060405180830381865afa158015611610573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906116349190613a1b565b610b0c906001613a59565b60075460011461167e5760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b6044820152606401610d45565b60026007556001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116908316036116e8576040517f20801d3600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61116c82826001612e93565b5f806116ff836114de565b90505f61172c7f00000000000000000000000000000000000000000000000000000000000000008361240f565b9050805f0361173f57505f199392505050565b5f6117498561201e565b905061175a61144983835b90613086565b95945050505050565b5f3382820361178557604051635b1955ed60e11b815260040160405180910390fd5b61178e816114de565b8311156117c7576040517f4b246a6b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6117d1835f612acd565b6118066001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016823086612cb2565b6040517f4431d520000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b0382811660248301525f917f000000000000000000000000000000000000000000000000000000000000000090911690634431d520906044016020604051808303815f875af115801561188f573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906118b39190613a1b565b60408051868152602081018390529192506001600160a01b038416917fc1afad9537411d7ba4a74e9ee309d18f26f72ee1bfc63647b61e9bca0eec322c9101611031565b5f61190183611b1a565b90506119386001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333084612cb2565b6119428284612d5a565b60408051828152602081018590526001600160a01b0384169133917fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7910160405180910390a3610b798184612dc4565b60018054610a67906139e3565b335f908152600360205260408120805483919083906119bf908490613a46565b90915550506001600160a01b0383165f81815260036020526040908190208054850190555133907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610b6d9086815260200190565b600f8181548110611a24575f80fd5b5f918252602090912001546001600160a01b0316905081565b6001600160a01b038281165f90815260136020908152604080832085851684528252808320815160808101909252805494851682526060949192909190830190600160a01b900460ff166002811115611a9857611a98613890565b6002811115611aa957611aa9613890565b81526020016001820154815260200160028201805480602002602001604051908101604052809291908181526020018280548015611b0457602002820191905f5260205f20905b815481526020019060010190808311611af0575b5050509190925250505060600151949350505050565b6002545f908015610b0a57610b05611b3160085490565b8490836126e6565b5f600754600114611b795760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b6044820152606401610d45565b60026007555f611b8a85858561309d565b90505f611bdf847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b039182165f90815260136020908152604080832093909416825291909152206001015490565b90508015611c3c575f818711611bf55786611bf7565b815b9050611c247f0000000000000000000000000000000000000000000000000000000000000000825f612e93565b8060155f828254611c359190613a46565b9091555050505b815f03611c75576040517f6b9f28fc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600755949350505050565b5f33828203611ca557604051635b1955ed60e11b815260040160405180910390fd5b6040517fa447a5c60000000000000000000000000000000000000000000000000000000081526001600160a01b0382811660048301527f0000000000000000000000000000000000000000000000000000000000000000169063a447a5c690602401602060405180830381865afa158015611d22573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611d469190613a1b565b831115611d7f576040517f4b246a6b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f07a2d13a000000000000000000000000000000000000000000000000000000008152600481018490525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906307a2d13a90602401602060405180830381865afa158015611dfd573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611e219190613a1b565b9050611e586001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333084612cb2565b6040517f12126081000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b0383811660248301525f917f0000000000000000000000000000000000000000000000000000000000000000909116906312126081906044016020604051808303815f875af1158015611ee1573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611f059190613a1b565b60408051828152602081018890529192506001600160a01b038516917fc1afad9537411d7ba4a74e9ee309d18f26f72ee1bfc63647b61e9bca0eec322c910160405180910390a2949350505050565b5f600754600114611f945760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b6044820152606401610d45565b60026007555f611fa58585856131a7565b335f9081526013602090815260408083206001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016845290915290206001015490915015610dbf57610dbf7f0000000000000000000000000000000000000000000000000000000000000000825f612e93565b5f80805b600f5481101561215f575f600f828154811061204057612040613a87565b5f9182526020808320909101546001600160a01b038881168452601383526040808520928216808652928452808520815160808101909252805492831682529295509283019060ff600160a01b9091041660028111156120a2576120a2613890565b60028111156120b3576120b3613890565b8152602001600182015481526020016002820180548060200260200160405190810160405280929190818152602001828054801561210e57602002820191905f5260205f20905b8154815260200190600101908083116120fa575b505050505081525050905080604001515f1461214a575f612133838360400151611272565b90508015612148576121458186613a59565b94505b505b5050808061215790613a9b565b915050612022565b5092915050565b6002545f908015610b0a57610b058161217e60085490565b8591906126cb565b6001600160a01b0381165f90815260036020526040812054610b7990610ae6565b428410156121f75760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152606401610d45565b5f6001612202610dcc565b6001600160a01b038a81165f8181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f1981840301815282825280516020918201205f84529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015612325573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b0381161580159061235b5750876001600160a01b0316816001600160a01b0316145b6123a75760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e45520000000000000000000000000000000000006044820152606401610d45565b6001600160a01b039081165f9081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b6040517f78334aee0000000000000000000000000000000000000000000000000000000081526001600160a01b0383811660048301525f602483018190529182917f000000000000000000000000000000000000000000000000000000000000000016906378334aee90604401602060405180830381865afa158015612497573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906124bb9190613a1b565b90506114d661144961251f8573__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f9091896001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113a0573d5f803e3d5ffd5b6114d061145885612e43565b5f8061255d6114497f000000000000000000000000000000000000000000000000000000000000000061091d60085490565b90505f805f5b600f5481101561263f57600f818154811061258057612580613a87565b5f9182526020808320909101546001600160a01b031680835260149091526040822054909350906125b4611449858461240f565b90507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316846001600160a01b03160361261d575f6125ff6114498660155461240f565b905061261561260e8383613300565b879061330e565b95505061262a565b612627858261330e565b94505b5050808061263790613a9b565b915050612563565b5061264d611449848461330e565b935050505090565b5f610c1761331c565b5f610b7982612166565b612670612c6c565b6001600160a01b0381166126b2576040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081525f6004820152602401610d45565b6126bb81612de5565b50565b600a8054610a67906139e3565b5f825f1904841183021582026126df575f80fd5b5091020490565b5f825f1904841183021582026126fa575f80fd5b50910281810615159190040190565b6001600160a01b0383165f9081526010602052604090205460ff16612765576040517fc96b02720000000000000000000000000000000000000000000000000000000081526001600160a01b0384166004820152602401610d45565b6001600160a01b0383165f9081526011602052604081205460ff16600281111561279157612791613890565b146127d3576040517f628083f80000000000000000000000000000000000000000000000000000000081526001600160a01b0384166004820152602401610d45565b5f82116127f357604051635b1955ed60e11b815260040160405180910390fd5b33811561280f5761280f6001600160a01b038516823086612cb2565b6001600160a01b0384165f9081526014602052604081208054859290612836908490613a59565b90915550506001600160a01b038082165f90815260136020908152604080832093881683529290522060010154156128ac576001600160a01b038082165f908152601360209081526040808320938816835292905290812060010180548592906128a1908490613a59565b9091555061298f9050565b604080516080810182526001600160a01b038681168083525f60208085018281528587018a90528651838152808301885260608701528785168352601382528683209383529290529390932082518154921673ffffffffffffffffffffffffffffffffffffffff19831681178255935192938493919283917fffffffffffffffffffffff00000000000000000000000000000000000000000090911617600160a01b83600281111561296057612960613890565b0217905550604082015160018201556060820151805161298a91600284019160209091019061364a565b505050505b806001600160a01b0316846001600160a01b03167f885f62293d39a13829073b2b39bc8b4d151dcf51ada3d1a138abf43c37913dac5f866040516129d4929190613ab3565b60405180910390a350505050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f5f604051612a129190613ace565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b5f612a83610e81565b9050818111612ac8576040517faca50b330000000000000000000000000000000000000000000000000000000081526004810182905260248101839052604401610d45565b505050565b600d546040517f110966fa00000000000000000000000000000000000000000000000000000000815260048101849052602481018390526001600160a01b039091169063110966fa906044016040805180830381865afa158015612b33573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612b579190613b6a565b8051600b5560200151600c555050565b5f612b71826116f4565b9050670de0b6b3a7640000811015612bc7576040517ff9fecb7c0000000000000000000000000000000000000000000000000000000081526001600160a01b038316600482015260248101829052604401610d45565b5050565b5f6040517fa9059cbb00000000000000000000000000000000000000000000000000000000815283600482015282602482015260205f6044835f895af13d15601f3d1160015f511416171691505080612c665760405162461bcd60e51b815260206004820152600f60248201527f5452414e534645525f4641494c454400000000000000000000000000000000006044820152606401610d45565b50505050565b6006546001600160a01b03163314611270576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610d45565b5f6040517f23b872dd00000000000000000000000000000000000000000000000000000000815284600482015283602482015282604482015260205f6064835f8a5af13d15601f3d1160015f511416171691505080612d535760405162461bcd60e51b815260206004820152601460248201527f5452414e534645525f46524f4d5f4641494c45440000000000000000000000006044820152606401610d45565b5050505050565b8060025f828254612d6b9190613a59565b90915550506001600160a01b0382165f818152600360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91015b60405180910390a35050565b8160085f828254612dd59190613a59565b90915550612bc79050825f612acd565b600680546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f80821215612e81576040517fa8ce443200000000000000000000000000000000000000000000000000000000815260048101839052602401610d45565b5090565b5f610b0c61144984846133ea565b3382612eb257604051635b1955ed60e11b815260040160405180910390fd5b6001600160a01b038181165f9081526013602090815260408083209388168352929052206001015480841115612f35576040517fc53d39040000000000000000000000000000000000000000000000000000000081526001600160a01b038084166004830152861660248201526044810185905260648101829052608401610d45565b6001600160a01b0385165f9081526014602052604081208054869290612f5c908490613a46565b9091555050838103612fd0576001600160a01b038083165f908152601360209081526040808320938916835292905290812080547fffffffffffffffffffffff0000000000000000000000000000000000000000001681556001810182905590612fc9600283018261368f565b505061300f565b6001600160a01b038083165f90815260136020908152604080832093891683529290529081206001018054869290613009908490613a46565b90915550505b61301882612b67565b8215613032576130326001600160a01b0386168386612bcb565b816001600160a01b0316856001600160a01b03167fcc2ad3b9794d9e5295e270163e250d954ed223622c72aa61f678d43d5b294e715f87604051613077929190613ab3565b60405180910390a35050505050565b5f610b0c61144984670de0b6b3a7640000856134cf565b5f6130a784610b7f565b9050336001600160a01b03831614613114576001600160a01b0382165f9081526004602090815260408083203384529091529020545f198114613112576130ee8282613a46565b6001600160a01b0384165f9081526004602090815260408083203384529091529020555b505b61311e84826135b7565b61312882826135d8565b60408051858152602081018390526001600160a01b03808516929086169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a4610b0c6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168486612bcb565b5f336001600160a01b03831614613213576001600160a01b0382165f9081526004602090815260408083203384529091529020545f198114613211576131ed8582613a46565b6001600160a01b0384165f9081526004602090815260408083203384529091529020555b505b61321c84610ee8565b9050805f0361326d5760405162461bcd60e51b815260206004820152600b60248201527f5a45524f5f4153534554530000000000000000000000000000000000000000006044820152606401610d45565b61327781856135b7565b61328182856135d8565b60408051828152602081018690526001600160a01b03808516929086169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a4610b0c6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168483612bcb565b5f610b0c6114498385613a46565b5f610b0c6114498385613a59565b5f6008545f0361332b57505f90565b610c1761144961333a60085490565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152611754907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156133b9573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906133dd9190613a1b565b6008546114499190613a46565b5f80805f19848609848602925082811083820303915050805f0361341b5750670de0b6b3a764000090049050610b79565b670de0b6b3a76400008110613466576040517f5173648d0000000000000000000000000000000000000000000000000000000081526004810186905260248101859052604401610d45565b5f670de0b6b3a7640000858709620400008185030493109091037d40000000000000000000000000000000000000000000000000000000000002919091177faccb18165bd6fe31ae1cf318dc5b51eee0e1ba569b88cd74c1773b91fac106690291505092915050565b5f80805f19858709858702925082811083820303915050805f03613506578382816134fc576134fc613bc3565b0492505050610b0c565b838110613550576040517f63a05778000000000000000000000000000000000000000000000000000000008152600481018790526024810186905260448101859052606401610d45565b5f8486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091025f889003889004909101858311909403939093029303949094049190911702949350505050565b8160085f8282546135c89190613a46565b90915550612bc790505f83612acd565b6001600160a01b0382165f90815260036020526040812080548392906135ff908490613a46565b90915550506002805482900390556040518181525f906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001612db8565b828054828255905f5260205f20908101928215613683579160200282015b82811115613683578251825591602001919060010190613668565b50612e819291506136a6565b5080545f8255905f5260205f20908101906126bb91905b5b80821115612e81575f81556001016136a7565b5f6020808352835180828501525f5b818110156136e5578581018301518582016040015282016136c9565b505f604082860101526040601f19601f8301168501019250505092915050565b5f60208284031215613715575f80fd5b5035919050565b80356001600160a01b0381168114613732575f80fd5b919050565b5f8060408385031215613748575f80fd5b6137518361371c565b946020939093013593505050565b5f8060408385031215613770575f80fd5b6137798361371c565b91506137876020840161371c565b90509250929050565b5f805f606084860312156137a2575f80fd5b6137ab8461371c565b92506137b96020850161371c565b9150604084013590509250925092565b5f805f606084860312156137db575f80fd5b833592506137eb6020850161371c565b9150604084013580151581146137ff575f80fd5b809150509250925092565b5f6020828403121561381a575f80fd5b610b0c8261371c565b602080825282518282018190525f9190848201906040850190845b818110156138635783516001600160a01b03168352928401929184019160010161383e565b50909695505050505050565b5f8060408385031215613880575f80fd5b823591506137876020840161371c565b634e487b7160e01b5f52602160045260245ffd5b600381106138c057634e487b7160e01b5f52602160045260245ffd5b9052565b60208101610b7982846138a4565b602080825282518282018190525f9190848201906040850190845b81811015613863578351835292840192918401916001016138ed565b5f805f6060848603121561391b575f80fd5b8335925061392b6020850161371c565b91506139396040850161371c565b90509250925092565b60ff811681146126bb575f80fd5b5f805f805f805f60e0888a031215613966575f80fd5b61396f8861371c565b965061397d6020890161371c565b95506040880135945060608801359350608088013561399b81613942565b9699959850939692959460a0840135945060c09093013592915050565b6001600160a01b0384168152606081016139d560208301856138a4565b826040830152949350505050565b600181811c908216806139f757607f821691505b602082108103613a1557634e487b7160e01b5f52602260045260245ffd5b50919050565b5f60208284031215613a2b575f80fd5b5051919050565b634e487b7160e01b5f52601160045260245ffd5b81810381811115610b7957610b79613a32565b80820180821115610b7957610b79613a32565b5f60208284031215613a7c575f80fd5b8151610b0c81613942565b634e487b7160e01b5f52603260045260245ffd5b5f5f198203613aac57613aac613a32565b5060010190565b60408101613ac182856138a4565b8260208301529392505050565b5f80835481600182811c915080831680613ae957607f831692505b60208084108203613b0857634e487b7160e01b86526022600452602486fd5b818015613b1c5760018114613b3157613b5c565b60ff1986168952841515850289019650613b5c565b5f8a8152602090205f5b86811015613b545781548b820152908501908301613b3b565b505084890196505b509498975050505050505050565b5f60408284031215613b7a575f80fd5b6040516040810181811067ffffffffffffffff82111715613ba957634e487b7160e01b5f52604160045260245ffd5b604052825181526020928301519281019290925250919050565b634e487b7160e01b5f52601260045260245ffdfea26469706673582212200058989c7b6ced29f354b8525b1a8ca043d653b226161d622f65ea69bc45d3c464736f6c63430008140033608060405234801561000f575f80fd5b5060405161049538038061049583398101604081905261002e91610050565b5f80546001600160a01b0319163317905560019290925560025560035561007b565b5f805f60608486031215610062575f80fd5b8351925060208401519150604084015190509250925092565b61040d806100885f395ff3fe608060405234801561000f575f80fd5b506004361061007a575f3560e01c806390d3b3791161005857806390d3b3791461010c578063951788331461011f578063afd9276214610134578063d22cedc01461013d575f80fd5b806302d5ebf61461007e578063110966fa1461009a5780638da5cb5b146100c8575b5f80fd5b61008760025481565b6040519081526020015b60405180910390f35b6100ad6100a83660046102d5565b610146565b60408051825181526020928301519281019290925201610091565b5f546100e79073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610091565b61008761011a3660046102f5565b610180565b61013261012d36600461030c565b61021b565b005b61008760015481565b61008760035481565b6040805180820182525f80825260209182015281518083019092526707a1fe16027700008252670a688906bd8b0000908201525b92915050565b5f60035482116101be5760035460015460025461019d9190610362565b6101a79084610375565b6101b1919061038c565b60015461017a91906103c4565b6003546101d390670de0b6b3a7640000610362565b600154600280546101e391610375565b6101ed9190610362565b6003546101fa9085610362565b6102049190610375565b61020e919061038c565b60025461017a91906103c4565b5f5473ffffffffffffffffffffffffffffffffffffffff1633146102c4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4f6e6c7920746865206f776e65722063616e2075706461746520706172616d6560448201527f7465727300000000000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b600192909255600391909155600255565b5f80604083850312156102e6575f80fd5b50508035926020909101359150565b5f60208284031215610305575f80fd5b5035919050565b5f805f6060848603121561031e575f80fd5b505081359360208301359350604090920135919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b8181038181111561017a5761017a610335565b808202811582820484141761017a5761017a610335565b5f826103bf577f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b500490565b8082018082111561017a5761017a61033556fea2646970667358221220c76c917bad93838ebc08f5e61787828d4fc957be25e483b388afc36aaaf0c7e764736f6c6343000814003361012060405234801562000011575f80fd5b50604051620021ec380380620021ec833981016040819052620000349162000332565b81826001600160a01b03166306fdde036040518163ffffffff1660e01b81526004015f60405180830381865afa15801562000071573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526200009a9190810190620003a7565b604051602001620000ac91906200045a565b604051602081830303815290604052836001600160a01b03166395d89b416040518163ffffffff1660e01b81526004015f60405180830381865afa158015620000f7573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052620001209190810190620003a7565b6040516020016200013291906200048f565b6040516020818303038152906040528181846001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000180573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620001a69190620004bb565b5f620001b3848262000570565b506001620001c2838262000570565b5060ff81166080524660a052620001d862000280565b60c052505050506001600160a01b0391821660e05250600680546001600160a01b0319168383161790556040805163313ce56760e01b815290519184169163313ce567916004808201926020929091908290030181865afa15801562000240573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620002669190620004bb565b6200027390600a62000747565b6101005250620007d19050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f5f604051620002b2919062000757565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b6001600160a01b03811681146200032f575f80fd5b50565b5f806040838503121562000344575f80fd5b825162000351816200031a565b602084015190925062000364816200031a565b809150509250929050565b634e487b7160e01b5f52604160045260245ffd5b5f5b838110156200039f57818101518382015260200162000385565b50505f910152565b5f60208284031215620003b8575f80fd5b81516001600160401b0380821115620003cf575f80fd5b818401915084601f830112620003e3575f80fd5b815181811115620003f857620003f86200036f565b604051601f8201601f19908116603f011681019083821181831017156200042357620004236200036f565b816040528281528760208487010111156200043c575f80fd5b6200044f83602083016020880162000383565b979650505050505050565b6b43484544444120446562742d60a01b81525f82516200048281600c85016020870162000383565b91909101600c0192915050565b6263642d60e81b81525f8251620004ae81600385016020870162000383565b9190910160030192915050565b5f60208284031215620004cc575f80fd5b815160ff81168114620004dd575f80fd5b9392505050565b600181811c90821680620004f957607f821691505b6020821081036200051857634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200056b575f81815260208120601f850160051c81016020861015620005465750805b601f850160051c820191505b81811015620005675782815560010162000552565b5050505b505050565b81516001600160401b038111156200058c576200058c6200036f565b620005a4816200059d8454620004e4565b846200051e565b602080601f831160018114620005da575f8415620005c25750858301515b5f19600386901b1c1916600185901b17855562000567565b5f85815260208120601f198616915b828110156200060a57888601518255948401946001909101908401620005e9565b50858210156200062857878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b5f52601160045260245ffd5b600181815b808511156200068c57815f190482111562000670576200067062000638565b808516156200067e57918102915b93841c939080029062000651565b509250929050565b5f82620006a45750600162000741565b81620006b257505f62000741565b8160018114620006cb5760028114620006d657620006f6565b600191505062000741565b60ff841115620006ea57620006ea62000638565b50506001821b62000741565b5060208310610133831016604e8410600b84101617156200071b575081810a62000741565b6200072783836200064c565b805f19048211156200073d576200073d62000638565b0290505b92915050565b5f620004dd60ff84168362000694565b5f8083546200076681620004e4565b600182811680156200078157600181146200079757620007c5565b60ff1984168752821515830287019450620007c5565b875f526020805f205f5b85811015620007bc5781548a820152908401908201620007a1565b50505082870194505b50929695505050505050565b60805160a05160c05160e051610100516119c16200082b5f395f61082c01525f818161039301528181610a2001528181610ab701528181610c310152610d8001525f61088801525f61085801525f61034a01526119c15ff3fe608060405234801561000f575f80fd5b506004361061029d575f3560e01c80637ecebe0011610171578063c6e6f592116100d2578063dd62ed3e11610088578063f8ba4cff1161006e578063f8ba4cff146105a7578063fbfa77cf146105af578063fc7b9c18146105c2575f80fd5b8063dd62ed3e1461056a578063ef8b30f714610594575f80fd5b8063ce96cb77116100b8578063ce96cb7714610542578063d505accf14610555578063d905777e1461049f575f80fd5b8063c6e6f5921461051c578063ce2929d81461052f575f80fd5b8063b3d7f6b911610127578063ba0876521161010d578063ba087652146104fb578063bb2eb4d21461050e578063c63d75b6146103f1575f80fd5b8063b3d7f6b9146104d5578063b460af94146104e8575f80fd5b806395d89b411161015757806395d89b4114610497578063a447a5c61461049f578063a9059cbb146104c7575f80fd5b80637ecebe001461046557806394bf804d14610484575f80fd5b806335d16e171161021b5780634431d520116101d157806357d0f568116101b757806357d0f5681461042b5780636e553f651461043357806370a0823114610446575f80fd5b80634431d520146104055780634cdad50614610418575f80fd5b806338d52e0f1161020157806338d52e0f1461038e5780633dd1d5d8146103cd578063402d267d146103f1575f80fd5b806335d16e171461037e5780633644e51514610386575f80fd5b80630a28a4771161027057806318160ddd1161025657806318160ddd1461032957806323b872dd14610332578063313ce56714610345575f80fd5b80630a28a477146103035780631212608114610316575f80fd5b806301e1d114146102a157806306fdde03146102b857806307a2d13a146102cd578063095ea7b3146102e0575b5f80fd5b6009545b6040519081526020015b60405180910390f35b6102c06105ca565b6040516102af9190611627565b6102a56102db366004611672565b610655565b6102f36102ee3660046116a4565b610682565b60405190151581526020016102af565b6102a5610311366004611672565b6106ee565b6102a56103243660046116cc565b61070e565b6102a560025481565b6102f36103403660046116f6565b6107f3565b61036c7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff90911681526020016102af565b6102a5610826565b6102a5610855565b6103b57f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016102af565b6103d86312e687bf81565b60405167ffffffffffffffff90911681526020016102af565b6102a56103ff36600461172f565b505f1990565b6102a56104133660046116cc565b6108aa565b6102a5610426366004611672565b610985565b6103d861098f565b6102a56104413660046116cc565b6109b3565b6102a561045436600461172f565b60036020525f908152604090205481565b6102a561047336600461172f565b60056020525f908152604090205481565b6102a56104923660046116cc565b610a9e565b6102c0610b2c565b6102a56104ad36600461172f565b6001600160a01b03165f9081526003602052604090205490565b6102f36103403660046116a4565b6102a56104e3366004611672565b610b39565b6102a56104f6366004611748565b610b58565b6102a5610509366004611748565b610c58565b6103d8662386f26fc1000081565b6102a561052a366004611672565b610da7565b6102a561053d3660046116cc565b610dc7565b6102a561055036600461172f565b610ea2565b610568610563366004611781565b610ec3565b005b6102a56105783660046117ee565b600460209081525f928352604080842090915290825290205481565b6102a56105a2366004611672565b61112b565b610568611135565b6006546103b5906001600160a01b031681565b6102a561113f565b5f80546105d690611816565b80601f016020809104026020016040519081016040528092919081815260200182805461060290611816565b801561064d5780601f106106245761010080835404028352916020019161064d565b820191905f5260205f20905b81548152906001019060200180831161063057829003601f168201915b505050505081565b6002545f9080156106795761067461066c60095490565b849083611149565b61067b565b825b9392505050565b335f8181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906106dc9086815260200190565b60405180910390a35060015b92915050565b6002545f908015610679576106748161070660095490565b859190611164565b6006545f906001600160a01b0316331461073b576040516362df054560e01b815260040160405180910390fd5b610743611187565b61074c83610985565b9050805f03610787576040517f32d971dc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060095f8282546107989190611862565b909155506107a89050828461124b565b60408051828152602081018590526001600160a01b038416917f798353030d4251a345706609acf9ea7527f2ace26f73150a098c0fae89e5886d91015b60405180910390a292915050565b5f6040517fbf9e1a7500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6108507f0000000000000000000000000000000000000000000000000000000000000000610985565b905090565b5f7f00000000000000000000000000000000000000000000000000000000000000004614610885576108506112c5565b507f000000000000000000000000000000000000000000000000000000000000000090565b6006545f906001600160a01b031633146108d7576040516362df054560e01b815260040160405180910390fd5b6108df611187565b6108e8836106ee565b9050805f03610923576040517f9811e0c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8260095f8282546109349190611862565b909155506109449050828261124b565b60408051848152602081018390526001600160a01b038416917f798353030d4251a345706609acf9ea7527f2ace26f73150a098c0fae89e5886d91016107e5565b5f6106e882610655565b620151806109a661016d662386f26fc10000611875565b6109b09190611875565b81565b5f6109bd8361112b565b9050805f03610a135760405162461bcd60e51b815260206004820152600b60248201527f5a45524f5f53484152455300000000000000000000000000000000000000000060448201526064015b60405180910390fd5b610a486001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001633308661135d565b610a528282611405565b60408051848152602081018390526001600160a01b0384169133917fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d791015b60405180910390a36106e8565b5f610aa883610b39565b9050610adf6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001633308461135d565b610ae98284611405565b60408051828152602081018590526001600160a01b0384169133917fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d79101610a91565b600180546105d690611816565b6002545f90801561067957610674610b5060095490565b849083611164565b5f610b62846106ee565b9050336001600160a01b03831614610bcf576001600160a01b0382165f9081526004602090815260408083203384529091529020545f198114610bcd57610ba98282611862565b6001600160a01b0384165f9081526004602090815260408083203384529091529020555b505b610bd9828261124b565b60408051858152602081018390526001600160a01b03808516929086169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a461067b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168486611467565b5f336001600160a01b03831614610cc4576001600160a01b0382165f9081526004602090815260408083203384529091529020545f198114610cc257610c9e8582611862565b6001600160a01b0384165f9081526004602090815260408083203384529091529020555b505b610ccd84610985565b9050805f03610d1e5760405162461bcd60e51b815260206004820152600b60248201527f5a45524f5f4153534554530000000000000000000000000000000000000000006044820152606401610a0a565b610d28828561124b565b60408051828152602081018690526001600160a01b03808516929086169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a461067b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168483611467565b6002545f9080156106795761067481610dbf60095490565b859190611149565b6006545f906001600160a01b03163314610df4576040516362df054560e01b815260040160405180910390fd5b610dfd8361112b565b9050805f03610e38576040517f9811e0c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8260095f828254610e4991906118a7565b90915550610e5990508282611405565b610e61611187565b60408051848152602081018390526001600160a01b038416917fc1b621921906be49d0631a297d31eb7f2de6e6ba1ab0f5281db5a7c582fed0ad91016107e5565b6001600160a01b0381165f908152600360205260408120546106e890610655565b42841015610f135760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152606401610a0a565b5f6001610f1e610855565b6001600160a01b038a81165f8181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f1981840301815282825280516020918201205f84529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015611041573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b038116158015906110775750876001600160a01b0316816001600160a01b0316145b6110c35760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e45520000000000000000000000000000000000006044820152606401610a0a565b6001600160a01b039081165f9081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b5f6106e882610da7565b61113d611187565b565b5f61085060095490565b5f825f19048411830215820261115d575f80fd5b5091020490565b5f825f190484118302158202611178575f80fd5b50910281810615159190040190565b60075442905f906111989083611862565b9050805f036111a5575050565b6008545f036111bb576312e687bf6008556111c7565b6111c3611508565b6008555b816007819055505f6111f26111e66111e9846008546111e691906118ba565b90565b60095490611539565b90508060095f82825461120591906118a7565b909155505060095460408051918252602082018390527f4e32a70f9f06da2cec9f0079d5658935775123a5ce8d0d68de35d019a8d1c19c910160405180910390a1505050565b6001600160a01b0382165f9081526003602052604081208054839290611272908490611862565b90915550506002805482900390556040518181525f906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020015b60405180910390a35050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f5f6040516112f591906118d1565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b5f6040517f23b872dd00000000000000000000000000000000000000000000000000000000815284600482015283602482015282604482015260205f6064835f8a5af13d15601f3d1160015f5114161716915050806113fe5760405162461bcd60e51b815260206004820152601460248201527f5452414e534645525f46524f4d5f4641494c45440000000000000000000000006044820152606401610a0a565b5050505050565b8060025f82825461141691906118a7565b90915550506001600160a01b0382165f818152600360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91016112b9565b5f6040517fa9059cbb00000000000000000000000000000000000000000000000000000000815283600482015282602482015260205f6044835f895af13d15601f3d1160015f5114161716915050806115025760405162461bcd60e51b815260206004820152600f60248201527f5452414e534645525f4641494c454400000000000000000000000000000000006044820152606401610a0a565b50505050565b5f6201518061152061016d662386f26fc10000611875565b61152a9190611875565b67ffffffffffffffff16905090565b5f61067b6111e684845f80805f19848609848602925082811083820303915050805f036115735750670de0b6b3a7640000900490506106e8565b670de0b6b3a764000081106115be576040517f5173648d0000000000000000000000000000000000000000000000000000000081526004810186905260248101859052604401610a0a565b5f670de0b6b3a7640000858709620400008185030493109091037d40000000000000000000000000000000000000000000000000000000000002919091177faccb18165bd6fe31ae1cf318dc5b51eee0e1ba569b88cd74c1773b91fac106690291505092915050565b5f6020808352835180828501525f5b8181101561165257858101830151858201604001528201611636565b505f604082860101526040601f19601f8301168501019250505092915050565b5f60208284031215611682575f80fd5b5035919050565b80356001600160a01b038116811461169f575f80fd5b919050565b5f80604083850312156116b5575f80fd5b6116be83611689565b946020939093013593505050565b5f80604083850312156116dd575f80fd5b823591506116ed60208401611689565b90509250929050565b5f805f60608486031215611708575f80fd5b61171184611689565b925061171f60208501611689565b9150604084013590509250925092565b5f6020828403121561173f575f80fd5b61067b82611689565b5f805f6060848603121561175a575f80fd5b8335925061176a60208501611689565b915061177860408501611689565b90509250925092565b5f805f805f805f60e0888a031215611797575f80fd5b6117a088611689565b96506117ae60208901611689565b95506040880135945060608801359350608088013560ff811681146117d1575f80fd5b9699959850939692959460a0840135945060c09093013592915050565b5f80604083850312156117ff575f80fd5b61180883611689565b91506116ed60208401611689565b600181811c9082168061182a57607f821691505b60208210810361184857634e487b7160e01b5f52602260045260245ffd5b50919050565b634e487b7160e01b5f52601160045260245ffd5b818103818111156106e8576106e861184e565b5f67ffffffffffffffff8084168061189b57634e487b7160e01b5f52601260045260245ffd5b92169190910492915050565b808201808211156106e8576106e861184e565b80820281158282048414176106e8576106e861184e565b5f80835481600182811c9150808316806118ec57607f831692505b6020808410820361190b57634e487b7160e01b86526022600452602486fd5b81801561191f57600181146119525761197d565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616895284151585028901965061197d565b5f8a8152602090205f5b868110156119755781548b82015290850190830161195c565b505084890196505b50949897505050505050505056fea2646970667358221220542160009d3987d0cf02b2cc212f2056a8efe2da6f508ae4ac77e88113ff9a8264736f6c63430008140033";
var deployedBytecode$1 = "0x608060405234801561000f575f80fd5b5060043610610441575f3560e01c80638da5cb5b11610243578063c6e6f59211610148578063ea21cd92116100c3578063f3f539ea11610093578063f8d8989811610079578063f8d89898146109bf578063f9e3e756146109e6578063fbcc6f5e14610a3c575f80fd5b8063f3f539ea146109a4578063f3fdb15a146109ac575f80fd5b8063ea21cd9214610954578063ef8b30f71461095c578063f21449461461096f578063f2fde38b14610991575f80fd5b8063d505accf11610118578063da0f862f116100fe578063da0f862f1461090f578063dd62ed3e14610922578063e5328e061461094c575f80fd5b8063d505accf146108d4578063d905777e146108e7575f80fd5b8063c6e6f5921461088b578063cccb022f1461089e578063cd88e558146108c1578063ce96cb77146108c1575f80fd5b8063b3a5a0a2116101d8578063b5b99531116101a8578063ba0876521161018e578063ba08765214610865578063c28d21a314610878578063c63d75b6146105ac575f80fd5b8063b5b99531146104f5578063b8abe1a014610852575f80fd5b8063b3a5a0a2146107f9578063b3ca23f21461080c578063b3d7f6b91461082c578063b460af941461083f575f80fd5b8063a2879e7211610213578063a2879e721461079b578063a6f19c84146107a4578063a9059cbb146107b7578063a947fc05146107ca575f80fd5b80638da5cb5b1461075c57806393f342771461076d57806394bf804d1461078057806395d89b4114610793575f80fd5b80634fd9efc4116103495780636e553f65116102de578063741bef1a116102ae5780637ee22b8f116102945780637ee22b8f14610723578063876467f8146107365780638b96b28014610749575f80fd5b8063741bef1a146106dd5780637ecebe0014610704575f80fd5b80636e553f651461069057806370a08231146106a3578063715018a6146106c257806371c03e2a146106ca575f80fd5b80636569268111610319578063656926811461064d57806369609c421461066c5780636d75b9ee146106745780636e42283114610687575f80fd5b80634fd9efc4146105f057806354fd4d501461060357806355a68ed3146106125780635ed7453e14610627575f80fd5b806323b872dd116103d957806338d52e0f116103a95780634113e5ca1161038f5780634113e5ca146105c057806348a0d754146105d55780634cdad506146105dd575f80fd5b806338d52e0f1461056d578063402d267d146105ac575f80fd5b806323b872dd1461050657806329088d1e14610519578063313ce5671461052c5780633644e51514610565575f80fd5b80630a28a477116104145780630a28a477146104a7578063151d70bb146104ba57806317520319146104f557806318160ddd146104fd575f80fd5b806301e1d1141461044557806306fdde031461045c57806307a2d13a14610471578063095ea7b314610484575b5f80fd5b6008545b6040519081526020015b60405180910390f35b610464610a5b565b60405161045391906136ba565b61044961047f366004613705565b610ae6565b610497610492366004613737565b610b13565b6040519015158152602001610453565b6104496104b5366004613705565b610b7f565b6104496104c836600461375f565b6001600160a01b039182165f90815260136020908152604080832093909416825291909152206001015490565b610449610b9f565b61044960025481565b610497610514366004613790565b610c1c565b6104496105273660046137c9565b610d09565b6105537f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610453565b610449610dcc565b6105947f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610453565b6104496105ba36600461380a565b505f1990565b6105c8610e21565b6040516104539190613823565b610449610e81565b6104496105eb366004613705565b610ee8565b6104496105fe366004613705565b610ef2565b60405160018152602001610453565b61062561062036600461380a565b611040565b005b7f0000000000000000000000000000000000000000000000000000000000000000610594565b61044961065b36600461380a565b60146020525f908152604090205481565b6104496110a1565b610625610682366004613737565b6110b7565b61044960085481565b61044961069e36600461386f565b611175565b6104496106b136600461380a565b60036020525f908152604090205481565b61062561125f565b6104496106d8366004613737565b611272565b6105947f000000000000000000000000000000000000000000000000000000000000000081565b61044961071236600461380a565b60056020525f908152604090205481565b61044961073136600461380a565b6114de565b610625610744366004613737565b61163f565b61044961075736600461380a565b6116f4565b6006546001600160a01b0316610594565b61044961077b366004613705565b611763565b61044961078e36600461386f565b6118f7565b610464611992565b61044960095481565b600e54610594906001600160a01b031681565b6104976107c5366004613737565b61199f565b6107ec6107d836600461380a565b60116020525f908152604090205460ff1681565b60405161045391906138c4565b610594610807366004613705565b611a15565b61081f61081a36600461375f565b611a3d565b60405161045391906138d2565b61044961083a366004613705565b611b1a565b61044961084d366004613909565b611b39565b610449610860366004613705565b611c83565b610449610873366004613909565b611f54565b61044961088636600461380a565b61201e565b610449610899366004613705565b612166565b600b54600c546108ac919082565b60408051928352602083019190915201610453565b6104496108cf36600461380a565b612186565b6106256108e2366004613950565b6121a7565b6104496108f536600461380a565b6001600160a01b03165f9081526003602052604090205490565b61044961091d366004613737565b61240f565b61044961093036600461375f565b600460209081525f928352604080842090915290825290205481565b61044961252b565b610449612655565b61044961096a366004613705565b61265e565b61049761097d36600461380a565b60106020525f908152604090205460ff1681565b61062561099f36600461380a565b612668565b6104646126be565b600d54610594906001600160a01b031681565b6105947f000000000000000000000000000000000000000000000000000000000000000081565b610a2d6109f436600461375f565b601360209081525f9283526040808420909152908252902080546001909101546001600160a01b03821691600160a01b900460ff169083565b604051610453939291906139b8565b610449610a4a36600461380a565b60126020525f908152604090205481565b5f8054610a67906139e3565b80601f0160208091040260200160405190810160405280929190818152602001828054610a93906139e3565b8015610ade5780601f10610ab557610100808354040283529160200191610ade565b820191905f5260205f20905b815481529060010190602001808311610ac157829003601f168201915b505050505081565b6002545f908015610b0a57610b05610afd60085490565b8490836126cb565b610b0c565b825b9392505050565b335f8181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610b6d9086815260200190565b60405180910390a35060015b92915050565b6002545f908015610b0a57610b0581610b9760085490565b8591906126e6565b600d545f906001600160a01b03166390d3b379610bba612655565b6040518263ffffffff1660e01b8152600401610bd891815260200190565b602060405180830381865afa158015610bf3573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c179190613a1b565b905090565b6001600160a01b0383165f9081526004602090815260408083203384529091528120545f198114610c7557610c518382613a46565b6001600160a01b0386165f9081526004602090815260408083203384529091529020555b6001600160a01b0385165f9081526003602052604081208054859290610c9c908490613a46565b90915550506001600160a01b038085165f81815260036020526040908190208054870190555190918716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610cf69087815260200190565b60405180910390a3506001949350505050565b5f600754600114610d4e5760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b60448201526064015b60405180910390fd5b60026007555f610d5e8585611175565b90508215610dbf576016805460ff19166001179055610d9e7f0000000000000000000000000000000000000000000000000000000000000000865f612709565b8460155f828254610daf9190613a59565b90915550506016805460ff191690555b6001600755949350505050565b5f7f00000000000000000000000000000000000000000000000000000000000000004614610dfc57610c176129e2565b507f000000000000000000000000000000000000000000000000000000000000000090565b6060600f805480602002602001604051908101604052809291908181526020018280548015610e7757602002820191905f5260205f20905b81546001600160a01b03168152600190910190602001808311610e59575b5050505050905090565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401610bd8565b5f610b7982610ae6565b5f33610efe8184612a7a565b6040517fce2929d8000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b0382811660248301525f917f00000000000000000000000000000000000000000000000000000000000000009091169063ce2929d8906044016020604051808303815f875af1158015610f87573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610fab9190613a1b565b9050610fb75f85612acd565b610fc082612b67565b610ff46001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168386612bcb565b60408051858152602081018390526001600160a01b038416917f6c8250ea4d625c09ee567802242f70b37c9dcfdb10a904563781c1ed7663c7cc91015b60405180910390a29392505050565b611048612c6c565b600e805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383169081179091556040513391907f815454f47dc7631dca873f265966d1554a22d7bfb87c63ef99d9a5cdb42af530905f90a350565b5f6110aa610e81565b600854610c179190613a46565b6007546001146110f65760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b6044820152606401610d45565b60026007556001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811690831603611160576040517f5c44b6b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61116c82826001612709565b50506001600755565b5f61117f8361265e565b9050805f036111d05760405162461bcd60e51b815260206004820152600b60248201527f5a45524f5f5348415245530000000000000000000000000000000000000000006044820152606401610d45565b6112056001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333086612cb2565b61120f8282612d5a565b60408051848152602081018390526001600160a01b0384169133917fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7910160405180910390a3610b798382612dc4565b611267612c6c565b6112705f612de5565b565b6040517f78334aee0000000000000000000000000000000000000000000000000000000081526001600160a01b0383811660048301525f602483018190529182917f000000000000000000000000000000000000000000000000000000000000000016906378334aee90604401602060405180830381865afa1580156112fa573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061131e9190613a1b565b6001600160a01b0385165f908152601260205260409020549091506114d690611449906114d061144c8773__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f90918b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113a0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906113c49190613a6c565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925260ff16602482015260126044820152606401602060405180830381865af4158015611425573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906114499190613a1b565b90565b6114d061145887612e43565b73__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f90917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113a0573d5f803e3d5ffd5b90612e85565b949350505050565b6040517fa447a5c60000000000000000000000000000000000000000000000000000000081526001600160a01b0382811660048301525f9182917f0000000000000000000000000000000000000000000000000000000000000000169063a447a5c690602401602060405180830381865afa15801561155f573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906115839190613a1b565b9050805f0361159457505f92915050565b6040517f07a2d13a000000000000000000000000000000000000000000000000000000008152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906307a2d13a90602401602060405180830381865afa158015611610573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906116349190613a1b565b610b0c906001613a59565b60075460011461167e5760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b6044820152606401610d45565b60026007556001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116908316036116e8576040517f20801d3600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61116c82826001612e93565b5f806116ff836114de565b90505f61172c7f00000000000000000000000000000000000000000000000000000000000000008361240f565b9050805f0361173f57505f199392505050565b5f6117498561201e565b905061175a61144983835b90613086565b95945050505050565b5f3382820361178557604051635b1955ed60e11b815260040160405180910390fd5b61178e816114de565b8311156117c7576040517f4b246a6b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6117d1835f612acd565b6118066001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016823086612cb2565b6040517f4431d520000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b0382811660248301525f917f000000000000000000000000000000000000000000000000000000000000000090911690634431d520906044016020604051808303815f875af115801561188f573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906118b39190613a1b565b60408051868152602081018390529192506001600160a01b038416917fc1afad9537411d7ba4a74e9ee309d18f26f72ee1bfc63647b61e9bca0eec322c9101611031565b5f61190183611b1a565b90506119386001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333084612cb2565b6119428284612d5a565b60408051828152602081018590526001600160a01b0384169133917fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7910160405180910390a3610b798184612dc4565b60018054610a67906139e3565b335f908152600360205260408120805483919083906119bf908490613a46565b90915550506001600160a01b0383165f81815260036020526040908190208054850190555133907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610b6d9086815260200190565b600f8181548110611a24575f80fd5b5f918252602090912001546001600160a01b0316905081565b6001600160a01b038281165f90815260136020908152604080832085851684528252808320815160808101909252805494851682526060949192909190830190600160a01b900460ff166002811115611a9857611a98613890565b6002811115611aa957611aa9613890565b81526020016001820154815260200160028201805480602002602001604051908101604052809291908181526020018280548015611b0457602002820191905f5260205f20905b815481526020019060010190808311611af0575b5050509190925250505060600151949350505050565b6002545f908015610b0a57610b05611b3160085490565b8490836126e6565b5f600754600114611b795760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b6044820152606401610d45565b60026007555f611b8a85858561309d565b90505f611bdf847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b039182165f90815260136020908152604080832093909416825291909152206001015490565b90508015611c3c575f818711611bf55786611bf7565b815b9050611c247f0000000000000000000000000000000000000000000000000000000000000000825f612e93565b8060155f828254611c359190613a46565b9091555050505b815f03611c75576040517f6b9f28fc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600755949350505050565b5f33828203611ca557604051635b1955ed60e11b815260040160405180910390fd5b6040517fa447a5c60000000000000000000000000000000000000000000000000000000081526001600160a01b0382811660048301527f0000000000000000000000000000000000000000000000000000000000000000169063a447a5c690602401602060405180830381865afa158015611d22573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611d469190613a1b565b831115611d7f576040517f4b246a6b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f07a2d13a000000000000000000000000000000000000000000000000000000008152600481018490525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906307a2d13a90602401602060405180830381865afa158015611dfd573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611e219190613a1b565b9050611e586001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333084612cb2565b6040517f12126081000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b0383811660248301525f917f0000000000000000000000000000000000000000000000000000000000000000909116906312126081906044016020604051808303815f875af1158015611ee1573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611f059190613a1b565b60408051828152602081018890529192506001600160a01b038516917fc1afad9537411d7ba4a74e9ee309d18f26f72ee1bfc63647b61e9bca0eec322c910160405180910390a2949350505050565b5f600754600114611f945760405162461bcd60e51b815260206004820152600a6024820152695245454e5452414e435960b01b6044820152606401610d45565b60026007555f611fa58585856131a7565b335f9081526013602090815260408083206001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016845290915290206001015490915015610dbf57610dbf7f0000000000000000000000000000000000000000000000000000000000000000825f612e93565b5f80805b600f5481101561215f575f600f828154811061204057612040613a87565b5f9182526020808320909101546001600160a01b038881168452601383526040808520928216808652928452808520815160808101909252805492831682529295509283019060ff600160a01b9091041660028111156120a2576120a2613890565b60028111156120b3576120b3613890565b8152602001600182015481526020016002820180548060200260200160405190810160405280929190818152602001828054801561210e57602002820191905f5260205f20905b8154815260200190600101908083116120fa575b505050505081525050905080604001515f1461214a575f612133838360400151611272565b90508015612148576121458186613a59565b94505b505b5050808061215790613a9b565b915050612022565b5092915050565b6002545f908015610b0a57610b058161217e60085490565b8591906126cb565b6001600160a01b0381165f90815260036020526040812054610b7990610ae6565b428410156121f75760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152606401610d45565b5f6001612202610dcc565b6001600160a01b038a81165f8181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f1981840301815282825280516020918201205f84529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015612325573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b0381161580159061235b5750876001600160a01b0316816001600160a01b0316145b6123a75760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e45520000000000000000000000000000000000006044820152606401610d45565b6001600160a01b039081165f9081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b6040517f78334aee0000000000000000000000000000000000000000000000000000000081526001600160a01b0383811660048301525f602483018190529182917f000000000000000000000000000000000000000000000000000000000000000016906378334aee90604401602060405180830381865afa158015612497573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906124bb9190613a1b565b90506114d661144961251f8573__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f9091896001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113a0573d5f803e3d5ffd5b6114d061145885612e43565b5f8061255d6114497f000000000000000000000000000000000000000000000000000000000000000061091d60085490565b90505f805f5b600f5481101561263f57600f818154811061258057612580613a87565b5f9182526020808320909101546001600160a01b031680835260149091526040822054909350906125b4611449858461240f565b90507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316846001600160a01b03160361261d575f6125ff6114498660155461240f565b905061261561260e8383613300565b879061330e565b95505061262a565b612627858261330e565b94505b5050808061263790613a9b565b915050612563565b5061264d611449848461330e565b935050505090565b5f610c1761331c565b5f610b7982612166565b612670612c6c565b6001600160a01b0381166126b2576040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081525f6004820152602401610d45565b6126bb81612de5565b50565b600a8054610a67906139e3565b5f825f1904841183021582026126df575f80fd5b5091020490565b5f825f1904841183021582026126fa575f80fd5b50910281810615159190040190565b6001600160a01b0383165f9081526010602052604090205460ff16612765576040517fc96b02720000000000000000000000000000000000000000000000000000000081526001600160a01b0384166004820152602401610d45565b6001600160a01b0383165f9081526011602052604081205460ff16600281111561279157612791613890565b146127d3576040517f628083f80000000000000000000000000000000000000000000000000000000081526001600160a01b0384166004820152602401610d45565b5f82116127f357604051635b1955ed60e11b815260040160405180910390fd5b33811561280f5761280f6001600160a01b038516823086612cb2565b6001600160a01b0384165f9081526014602052604081208054859290612836908490613a59565b90915550506001600160a01b038082165f90815260136020908152604080832093881683529290522060010154156128ac576001600160a01b038082165f908152601360209081526040808320938816835292905290812060010180548592906128a1908490613a59565b9091555061298f9050565b604080516080810182526001600160a01b038681168083525f60208085018281528587018a90528651838152808301885260608701528785168352601382528683209383529290529390932082518154921673ffffffffffffffffffffffffffffffffffffffff19831681178255935192938493919283917fffffffffffffffffffffff00000000000000000000000000000000000000000090911617600160a01b83600281111561296057612960613890565b0217905550604082015160018201556060820151805161298a91600284019160209091019061364a565b505050505b806001600160a01b0316846001600160a01b03167f885f62293d39a13829073b2b39bc8b4d151dcf51ada3d1a138abf43c37913dac5f866040516129d4929190613ab3565b60405180910390a350505050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f5f604051612a129190613ace565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b5f612a83610e81565b9050818111612ac8576040517faca50b330000000000000000000000000000000000000000000000000000000081526004810182905260248101839052604401610d45565b505050565b600d546040517f110966fa00000000000000000000000000000000000000000000000000000000815260048101849052602481018390526001600160a01b039091169063110966fa906044016040805180830381865afa158015612b33573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612b579190613b6a565b8051600b5560200151600c555050565b5f612b71826116f4565b9050670de0b6b3a7640000811015612bc7576040517ff9fecb7c0000000000000000000000000000000000000000000000000000000081526001600160a01b038316600482015260248101829052604401610d45565b5050565b5f6040517fa9059cbb00000000000000000000000000000000000000000000000000000000815283600482015282602482015260205f6044835f895af13d15601f3d1160015f511416171691505080612c665760405162461bcd60e51b815260206004820152600f60248201527f5452414e534645525f4641494c454400000000000000000000000000000000006044820152606401610d45565b50505050565b6006546001600160a01b03163314611270576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610d45565b5f6040517f23b872dd00000000000000000000000000000000000000000000000000000000815284600482015283602482015282604482015260205f6064835f8a5af13d15601f3d1160015f511416171691505080612d535760405162461bcd60e51b815260206004820152601460248201527f5452414e534645525f46524f4d5f4641494c45440000000000000000000000006044820152606401610d45565b5050505050565b8060025f828254612d6b9190613a59565b90915550506001600160a01b0382165f818152600360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91015b60405180910390a35050565b8160085f828254612dd59190613a59565b90915550612bc79050825f612acd565b600680546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f80821215612e81576040517fa8ce443200000000000000000000000000000000000000000000000000000000815260048101839052602401610d45565b5090565b5f610b0c61144984846133ea565b3382612eb257604051635b1955ed60e11b815260040160405180910390fd5b6001600160a01b038181165f9081526013602090815260408083209388168352929052206001015480841115612f35576040517fc53d39040000000000000000000000000000000000000000000000000000000081526001600160a01b038084166004830152861660248201526044810185905260648101829052608401610d45565b6001600160a01b0385165f9081526014602052604081208054869290612f5c908490613a46565b9091555050838103612fd0576001600160a01b038083165f908152601360209081526040808320938916835292905290812080547fffffffffffffffffffffff0000000000000000000000000000000000000000001681556001810182905590612fc9600283018261368f565b505061300f565b6001600160a01b038083165f90815260136020908152604080832093891683529290529081206001018054869290613009908490613a46565b90915550505b61301882612b67565b8215613032576130326001600160a01b0386168386612bcb565b816001600160a01b0316856001600160a01b03167fcc2ad3b9794d9e5295e270163e250d954ed223622c72aa61f678d43d5b294e715f87604051613077929190613ab3565b60405180910390a35050505050565b5f610b0c61144984670de0b6b3a7640000856134cf565b5f6130a784610b7f565b9050336001600160a01b03831614613114576001600160a01b0382165f9081526004602090815260408083203384529091529020545f198114613112576130ee8282613a46565b6001600160a01b0384165f9081526004602090815260408083203384529091529020555b505b61311e84826135b7565b61312882826135d8565b60408051858152602081018390526001600160a01b03808516929086169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a4610b0c6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168486612bcb565b5f336001600160a01b03831614613213576001600160a01b0382165f9081526004602090815260408083203384529091529020545f198114613211576131ed8582613a46565b6001600160a01b0384165f9081526004602090815260408083203384529091529020555b505b61321c84610ee8565b9050805f0361326d5760405162461bcd60e51b815260206004820152600b60248201527f5a45524f5f4153534554530000000000000000000000000000000000000000006044820152606401610d45565b61327781856135b7565b61328182856135d8565b60408051828152602081018690526001600160a01b03808516929086169133917ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db910160405180910390a4610b0c6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168483612bcb565b5f610b0c6114498385613a46565b5f610b0c6114498385613a59565b5f6008545f0361332b57505f90565b610c1761144961333a60085490565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152611754907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156133b9573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906133dd9190613a1b565b6008546114499190613a46565b5f80805f19848609848602925082811083820303915050805f0361341b5750670de0b6b3a764000090049050610b79565b670de0b6b3a76400008110613466576040517f5173648d0000000000000000000000000000000000000000000000000000000081526004810186905260248101859052604401610d45565b5f670de0b6b3a7640000858709620400008185030493109091037d40000000000000000000000000000000000000000000000000000000000002919091177faccb18165bd6fe31ae1cf318dc5b51eee0e1ba569b88cd74c1773b91fac106690291505092915050565b5f80805f19858709858702925082811083820303915050805f03613506578382816134fc576134fc613bc3565b0492505050610b0c565b838110613550576040517f63a05778000000000000000000000000000000000000000000000000000000008152600481018790526024810186905260448101859052606401610d45565b5f8486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091025f889003889004909101858311909403939093029303949094049190911702949350505050565b8160085f8282546135c89190613a46565b90915550612bc790505f83612acd565b6001600160a01b0382165f90815260036020526040812080548392906135ff908490613a46565b90915550506002805482900390556040518181525f906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001612db8565b828054828255905f5260205f20908101928215613683579160200282015b82811115613683578251825591602001919060010190613668565b50612e819291506136a6565b5080545f8255905f5260205f20908101906126bb91905b5b80821115612e81575f81556001016136a7565b5f6020808352835180828501525f5b818110156136e5578581018301518582016040015282016136c9565b505f604082860101526040601f19601f8301168501019250505092915050565b5f60208284031215613715575f80fd5b5035919050565b80356001600160a01b0381168114613732575f80fd5b919050565b5f8060408385031215613748575f80fd5b6137518361371c565b946020939093013593505050565b5f8060408385031215613770575f80fd5b6137798361371c565b91506137876020840161371c565b90509250929050565b5f805f606084860312156137a2575f80fd5b6137ab8461371c565b92506137b96020850161371c565b9150604084013590509250925092565b5f805f606084860312156137db575f80fd5b833592506137eb6020850161371c565b9150604084013580151581146137ff575f80fd5b809150509250925092565b5f6020828403121561381a575f80fd5b610b0c8261371c565b602080825282518282018190525f9190848201906040850190845b818110156138635783516001600160a01b03168352928401929184019160010161383e565b50909695505050505050565b5f8060408385031215613880575f80fd5b823591506137876020840161371c565b634e487b7160e01b5f52602160045260245ffd5b600381106138c057634e487b7160e01b5f52602160045260245ffd5b9052565b60208101610b7982846138a4565b602080825282518282018190525f9190848201906040850190845b81811015613863578351835292840192918401916001016138ed565b5f805f6060848603121561391b575f80fd5b8335925061392b6020850161371c565b91506139396040850161371c565b90509250925092565b60ff811681146126bb575f80fd5b5f805f805f805f60e0888a031215613966575f80fd5b61396f8861371c565b965061397d6020890161371c565b95506040880135945060608801359350608088013561399b81613942565b9699959850939692959460a0840135945060c09093013592915050565b6001600160a01b0384168152606081016139d560208301856138a4565b826040830152949350505050565b600181811c908216806139f757607f821691505b602082108103613a1557634e487b7160e01b5f52602260045260245ffd5b50919050565b5f60208284031215613a2b575f80fd5b5051919050565b634e487b7160e01b5f52601160045260245ffd5b81810381811115610b7957610b79613a32565b80820180821115610b7957610b79613a32565b5f60208284031215613a7c575f80fd5b8151610b0c81613942565b634e487b7160e01b5f52603260045260245ffd5b5f5f198203613aac57613aac613a32565b5060010190565b60408101613ac182856138a4565b8260208301529392505050565b5f80835481600182811c915080831680613ae957607f831692505b60208084108203613b0857634e487b7160e01b86526022600452602486fd5b818015613b1c5760018114613b3157613b5c565b60ff1986168952841515850289019650613b5c565b5f8a8152602090205f5b86811015613b545781548b820152908501908301613b3b565b505084890196505b509498975050505050505050565b5f60408284031215613b7a575f80fd5b6040516040810181811067ffffffffffffffff82111715613ba957634e487b7160e01b5f52604160045260245ffd5b604052825181526020928301519281019290925250919050565b634e487b7160e01b5f52601260045260245ffdfea26469706673582212200058989c7b6ced29f354b8525b1a8ca043d653b226161d622f65ea69bc45d3c464736f6c63430008140033";
var linkReferences$1 = {
	"contracts/library/MathLib.sol": {
		MathLib: [
			{
				length: 20,
				start: 7965
			},
			{
				length: 20,
				start: 8237
			},
			{
				length: 20,
				start: 12444
			}
		]
	}
};
var deployedLinkReferences$1 = {
	"contracts/library/MathLib.sol": {
		MathLib: [
			{
				length: 20,
				start: 4938
			},
			{
				length: 20,
				start: 5210
			},
			{
				length: 20,
				start: 9417
			}
		]
	}
};
var LendingPoolArtifact = {
	_format: _format$1,
	contractName: contractName$1,
	sourceName: sourceName$1,
	abi: abi$1,
	bytecode: bytecode$1,
	deployedBytecode: deployedBytecode$1,
	linkReferences: linkReferences$1,
	deployedLinkReferences: deployedLinkReferences$1
};

var LendingPool = /*#__PURE__*/function () {
  function LendingPool(provider, address, signer) {
    this.provider = provider;
    this.address = address;
    this.signer = signer;
    this.initiateContract();
  }
  /**
   * Initializes the contract instance.
   */
  var _proto = LendingPool.prototype;
  _proto.initiateContract = function initiateContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.');
    }
    this.contract = new ethers.Contract(this.address, LendingPoolArtifact.abi, this.provider);
  };
  _proto.addCollateral = /*#__PURE__*/function () {
    var _addCollateral = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token, amount) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return this.contract.connect(this.signer).addCollateral(token, amount);
          case 3:
            _context.next = 9;
            break;
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.error('Error in addCollateral:', _context.t0);
            throw _context.t0;
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 5]]);
    }));
    function addCollateral(_x, _x2) {
      return _addCollateral.apply(this, arguments);
    }
    return addCollateral;
  }() // ERC20
  ;
  _proto.approve =
  /*#__PURE__*/
  function () {
    var _approve = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(spender, amount) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return this.contract.connect(this.signer).approve(spender, amount);
          case 3:
            _context2.next = 9;
            break;
          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            console.error('Error in approve:', _context2.t0);
            throw _context2.t0;
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[0, 5]]);
    }));
    function approve(_x3, _x4) {
      return _approve.apply(this, arguments);
    }
    return approve;
  }();
  _proto.depositAsset = /*#__PURE__*/function () {
    var _depositAsset = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(assets, receiver) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return this.contract.connect(this.signer).deposit(assets, receiver);
          case 3:
            _context3.next = 9;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            console.error('Error in depositAsset:', _context3.t0);
            throw _context3.t0;
          case 9:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[0, 5]]);
    }));
    function depositAsset(_x5, _x6) {
      return _depositAsset.apply(this, arguments);
    }
    return depositAsset;
  }();
  _proto.mintAsset = /*#__PURE__*/function () {
    var _mintAsset = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(shares, receiver) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return this.contract.connect(this.signer).mint(shares, receiver);
          case 3:
            _context4.next = 9;
            break;
          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            console.error('Error in mintAsset:', _context4.t0);
            throw _context4.t0;
          case 9:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[0, 5]]);
    }));
    function mintAsset(_x7, _x8) {
      return _mintAsset.apply(this, arguments);
    }
    return mintAsset;
  }() //Todo: Permit
  //Need explanation
  ;
  _proto.putAmount =
  /*#__PURE__*/
  function () {
    var _putAmount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(amount) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return this.contract.connect(this.signer).putAmount(amount);
          case 3:
            _context5.next = 9;
            break;
          case 5:
            _context5.prev = 5;
            _context5.t0 = _context5["catch"](0);
            console.error('Error in putAmount:', _context5.t0);
            throw _context5.t0;
          case 9:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this, [[0, 5]]);
    }));
    function putAmount(_x9) {
      return _putAmount.apply(this, arguments);
    }
    return putAmount;
  }();
  _proto.putShares = /*#__PURE__*/function () {
    var _putShares = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(shares) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return this.contract.connect(this.signer).putShares(shares);
          case 3:
            _context6.next = 9;
            break;
          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);
            console.error('Error in putAmount:', _context6.t0);
            throw _context6.t0;
          case 9:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this, [[0, 5]]);
    }));
    function putShares(_x10) {
      return _putShares.apply(this, arguments);
    }
    return putShares;
  }();
  _proto.redeem = /*#__PURE__*/function () {
    var _redeem = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(shares, receiver, owner) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return this.contract.connect(this.signer).redeem(shares, receiver, owner);
          case 3:
            _context7.next = 9;
            break;
          case 5:
            _context7.prev = 5;
            _context7.t0 = _context7["catch"](0);
            console.error('Error in redeem:', _context7.t0);
            throw _context7.t0;
          case 9:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this, [[0, 5]]);
    }));
    function redeem(_x11, _x12, _x13) {
      return _redeem.apply(this, arguments);
    }
    return redeem;
  }();
  _proto.removeCollateral = /*#__PURE__*/function () {
    var _removeCollateral = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(token, amount) {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return this.contract.connect(this.signer).removeCollateral(token, amount);
          case 3:
            _context8.next = 9;
            break;
          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            console.error('Error in removeCollateral:', _context8.t0);
            throw _context8.t0;
          case 9:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this, [[0, 5]]);
    }));
    function removeCollateral(_x14, _x15) {
      return _removeCollateral.apply(this, arguments);
    }
    return removeCollateral;
  }();
  _proto.renounceOwnerShip = /*#__PURE__*/function () {
    var _renounceOwnerShip = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return this.contract.connect(this.signer).renounceOwnerShip();
          case 3:
            _context9.next = 9;
            break;
          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);
            console.error('Error in renounceOwnerShip:', _context9.t0);
            throw _context9.t0;
          case 9:
          case "end":
            return _context9.stop();
        }
      }, _callee9, this, [[0, 5]]);
    }));
    function renounceOwnerShip() {
      return _renounceOwnerShip.apply(this, arguments);
    }
    return renounceOwnerShip;
  }();
  _proto.setGauge = /*#__PURE__*/function () {
    var _setGauge = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_gauge) {
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return this.contract.connect(this.signer).setGauge(_gauge);
          case 3:
            _context10.next = 9;
            break;
          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            console.error('Error in setGauge:', _context10.t0);
            throw _context10.t0;
          case 9:
          case "end":
            return _context10.stop();
        }
      }, _callee10, this, [[0, 5]]);
    }));
    function setGauge(_x16) {
      return _setGauge.apply(this, arguments);
    }
    return setGauge;
  }();
  _proto.supply = /*#__PURE__*/function () {
    var _supply = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(amount, receiver, useAsCollateral) {
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return this.contract.connect(this.signer).supply(amount, receiver, useAsCollateral);
          case 3:
            _context11.next = 9;
            break;
          case 5:
            _context11.prev = 5;
            _context11.t0 = _context11["catch"](0);
            console.error('Error in supply:', _context11.t0);
            throw _context11.t0;
          case 9:
          case "end":
            return _context11.stop();
        }
      }, _callee11, this, [[0, 5]]);
    }));
    function supply(_x17, _x18, _x19) {
      return _supply.apply(this, arguments);
    }
    return supply;
  }();
  _proto.take = /*#__PURE__*/function () {
    var _take = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(amount) {
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return this.contract.connect(this.signer).take(amount);
          case 3:
            _context12.next = 9;
            break;
          case 5:
            _context12.prev = 5;
            _context12.t0 = _context12["catch"](0);
            console.error('Error in take:', _context12.t0);
            throw _context12.t0;
          case 9:
          case "end":
            return _context12.stop();
        }
      }, _callee12, this, [[0, 5]]);
    }));
    function take(_x20) {
      return _take.apply(this, arguments);
    }
    return take;
  }();
  _proto.transfer = /*#__PURE__*/function () {
    var _transfer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(to, amount) {
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return this.contract.connect(this.signer).transfer(to, amount);
          case 3:
            _context13.next = 9;
            break;
          case 5:
            _context13.prev = 5;
            _context13.t0 = _context13["catch"](0);
            console.error('Error in transfer:', _context13.t0);
            throw _context13.t0;
          case 9:
          case "end":
            return _context13.stop();
        }
      }, _callee13, this, [[0, 5]]);
    }));
    function transfer(_x21, _x22) {
      return _transfer.apply(this, arguments);
    }
    return transfer;
  }();
  _proto.transferFrom = /*#__PURE__*/function () {
    var _transferFrom = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(from, to, amount) {
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return this.contract.connect(this.signer).transferFrom(from, to, amount);
          case 3:
            _context14.next = 9;
            break;
          case 5:
            _context14.prev = 5;
            _context14.t0 = _context14["catch"](0);
            console.error('Error in transferFrom:', _context14.t0);
            throw _context14.t0;
          case 9:
          case "end":
            return _context14.stop();
        }
      }, _callee14, this, [[0, 5]]);
    }));
    function transferFrom(_x23, _x24, _x25) {
      return _transferFrom.apply(this, arguments);
    }
    return transferFrom;
  }();
  _proto.transferOwnership = /*#__PURE__*/function () {
    var _transferOwnership = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(newOwner) {
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return this.contract.connect(this.signer).transferOwnership(newOwner);
          case 3:
            _context15.next = 9;
            break;
          case 5:
            _context15.prev = 5;
            _context15.t0 = _context15["catch"](0);
            console.error('Error in transferOwnership:', _context15.t0);
            throw _context15.t0;
          case 9:
          case "end":
            return _context15.stop();
        }
      }, _callee15, this, [[0, 5]]);
    }));
    function transferOwnership(_x26) {
      return _transferOwnership.apply(this, arguments);
    }
    return transferOwnership;
  }();
  _proto.withdraw = /*#__PURE__*/function () {
    var _withdraw = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(assetAmount, receiver, owner) {
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return this.contract.connect(this.signer).withdraw(assetAmount, receiver, owner);
          case 3:
            _context16.next = 9;
            break;
          case 5:
            _context16.prev = 5;
            _context16.t0 = _context16["catch"](0);
            console.error('Error in withdraw:', _context16.t0);
            throw _context16.t0;
          case 9:
          case "end":
            return _context16.stop();
        }
      }, _callee16, this, [[0, 5]]);
    }));
    function withdraw(_x27, _x28, _x29) {
      return _withdraw.apply(this, arguments);
    }
    return withdraw;
  }() //Read contract ---------------------------------------------
  ;
  _proto.accountAssetsBorrowed =
  /*#__PURE__*/
  function () {
    var _accountAssetsBorrowed = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(account) {
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return this.contract.accountAssetsBorrowed(account);
          case 3:
            return _context17.abrupt("return", _context17.sent);
          case 6:
            _context17.prev = 6;
            _context17.t0 = _context17["catch"](0);
            console.error('Error in accountAssetsBorrowed:', _context17.t0);
            throw _context17.t0;
          case 10:
          case "end":
            return _context17.stop();
        }
      }, _callee17, this, [[0, 6]]);
    }));
    function accountAssetsBorrowed(_x30) {
      return _accountAssetsBorrowed.apply(this, arguments);
    }
    return accountAssetsBorrowed;
  }();
  _proto.accountCollateralAmount = /*#__PURE__*/function () {
    var _accountCollateralAmount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(account, collateral) {
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return this.contract.accountCollateralAmount(account, collateral);
          case 3:
            return _context18.abrupt("return", _context18.sent);
          case 6:
            _context18.prev = 6;
            _context18.t0 = _context18["catch"](0);
            console.error('Error in accountCollateralAmount:', _context18.t0);
            throw _context18.t0;
          case 10:
          case "end":
            return _context18.stop();
        }
      }, _callee18, this, [[0, 6]]);
    }));
    function accountCollateralAmount(_x31, _x32) {
      return _accountCollateralAmount.apply(this, arguments);
    }
    return accountCollateralAmount;
  }();
  _proto.accountCollateralDeposited = /*#__PURE__*/function () {
    var _accountCollateralDeposited = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(account, collateral) {
      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _context19.next = 3;
            return this.contract.accountCollateralDeposited(account, collateral);
          case 3:
            return _context19.abrupt("return", _context19.sent);
          case 6:
            _context19.prev = 6;
            _context19.t0 = _context19["catch"](0);
            console.error('Error in accountCollateralDeposited:', _context19.t0);
            throw _context19.t0;
          case 10:
          case "end":
            return _context19.stop();
        }
      }, _callee19, this, [[0, 6]]);
    }));
    function accountCollateralDeposited(_x33, _x34) {
      return _accountCollateralDeposited.apply(this, arguments);
    }
    return accountCollateralDeposited;
  }();
  _proto.accountCollateralTokenIds = /*#__PURE__*/function () {
    var _accountCollateralTokenIds = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(account, collateral) {
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _context20.next = 3;
            return this.contract.accountCollateralTokenIds(account, collateral);
          case 3:
            return _context20.abrupt("return", _context20.sent);
          case 6:
            _context20.prev = 6;
            _context20.t0 = _context20["catch"](0);
            console.error('Error in accountCollateralTokenIds:', _context20.t0);
            throw _context20.t0;
          case 10:
          case "end":
            return _context20.stop();
        }
      }, _callee20, this, [[0, 6]]);
    }));
    function accountCollateralTokenIds(_x35, _x36) {
      return _accountCollateralTokenIds.apply(this, arguments);
    }
    return accountCollateralTokenIds;
  }();
  _proto.accountHealth = /*#__PURE__*/function () {
    var _accountHealth = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(account) {
      return _regeneratorRuntime().wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _context21.next = 3;
            return this.contract.accountHealth(account);
          case 3:
            return _context21.abrupt("return", _context21.sent);
          case 6:
            _context21.prev = 6;
            _context21.t0 = _context21["catch"](0);
            console.error('Error in accountHealth:', _context21.t0);
            throw _context21.t0;
          case 10:
          case "end":
            return _context21.stop();
        }
      }, _callee21, this, [[0, 6]]);
    }));
    function accountHealth(_x37) {
      return _accountHealth.apply(this, arguments);
    }
    return accountHealth;
  }();
  _proto.allowance = /*#__PURE__*/function () {
    var _allowance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(account, spender) {
      return _regeneratorRuntime().wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            _context22.next = 3;
            return this.contract.allowance(account, spender);
          case 3:
            return _context22.abrupt("return", _context22.sent);
          case 6:
            _context22.prev = 6;
            _context22.t0 = _context22["catch"](0);
            console.error('Error in allowance:', _context22.t0);
            throw _context22.t0;
          case 10:
          case "end":
            return _context22.stop();
        }
      }, _callee22, this, [[0, 6]]);
    }));
    function allowance(_x38, _x39) {
      return _allowance.apply(this, arguments);
    }
    return allowance;
  }();
  _proto.asset = /*#__PURE__*/function () {
    var _asset = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
      return _regeneratorRuntime().wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            _context23.next = 3;
            return this.contract.asset();
          case 3:
            return _context23.abrupt("return", _context23.sent);
          case 6:
            _context23.prev = 6;
            _context23.t0 = _context23["catch"](0);
            console.error('Error in asset:', _context23.t0);
            throw _context23.t0;
          case 10:
          case "end":
            return _context23.stop();
        }
      }, _callee23, this, [[0, 6]]);
    }));
    function asset() {
      return _asset.apply(this, arguments);
    }
    return asset;
  }();
  _proto.assetBalance = /*#__PURE__*/function () {
    var _assetBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(account) {
      return _regeneratorRuntime().wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            _context24.next = 3;
            return this.contract.assetBalance(account);
          case 3:
            return _context24.abrupt("return", _context24.sent);
          case 6:
            _context24.prev = 6;
            _context24.t0 = _context24["catch"](0);
            console.error('Error in assetBalance:', _context24.t0);
            throw _context24.t0;
          case 10:
          case "end":
            return _context24.stop();
        }
      }, _callee24, this, [[0, 6]]);
    }));
    function assetBalance(_x40) {
      return _assetBalance.apply(this, arguments);
    }
    return assetBalance;
  }();
  _proto.available = /*#__PURE__*/function () {
    var _available = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
      return _regeneratorRuntime().wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
            _context25.next = 3;
            return this.contract.assetBalance();
          case 3:
            return _context25.abrupt("return", _context25.sent);
          case 6:
            _context25.prev = 6;
            _context25.t0 = _context25["catch"](0);
            console.error('Error in assetBalance:', _context25.t0);
            throw _context25.t0;
          case 10:
          case "end":
            return _context25.stop();
        }
      }, _callee25, this, [[0, 6]]);
    }));
    function available() {
      return _available.apply(this, arguments);
    }
    return available;
  }();
  _proto.balanceOf = /*#__PURE__*/function () {
    var _balanceOf = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(account) {
      return _regeneratorRuntime().wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
            _context26.next = 3;
            return this.contract.balanceOf(account);
          case 3:
            return _context26.abrupt("return", _context26.sent);
          case 6:
            _context26.prev = 6;
            _context26.t0 = _context26["catch"](0);
            console.error('Error in balanceOf:', _context26.t0);
            throw _context26.t0;
          case 10:
          case "end":
            return _context26.stop();
        }
      }, _callee26, this, [[0, 6]]);
    }));
    function balanceOf(_x41) {
      return _balanceOf.apply(this, arguments);
    }
    return balanceOf;
  }();
  _proto.baseBorrowAPY = /*#__PURE__*/function () {
    var _baseBorrowAPY = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
      return _regeneratorRuntime().wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            _context27.next = 3;
            return this.contract.baseBorrowAPY();
          case 3:
            return _context27.abrupt("return", _context27.sent);
          case 6:
            _context27.prev = 6;
            _context27.t0 = _context27["catch"](0);
            console.error('Error in balanceOf:', _context27.t0);
            throw _context27.t0;
          case 10:
          case "end":
            return _context27.stop();
        }
      }, _callee27, this, [[0, 6]]);
    }));
    function baseBorrowAPY() {
      return _baseBorrowAPY.apply(this, arguments);
    }
    return baseBorrowAPY;
  }();
  _proto.baseSupplyAPY = /*#__PURE__*/function () {
    var _baseSupplyAPY = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28() {
      return _regeneratorRuntime().wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
          case 0:
            _context28.prev = 0;
            _context28.next = 3;
            return this.contract.baseSupplyAPY();
          case 3:
            return _context28.abrupt("return", _context28.sent);
          case 6:
            _context28.prev = 6;
            _context28.t0 = _context28["catch"](0);
            console.error('Error in baseSuppyAPY:', _context28.t0);
            throw _context28.t0;
          case 10:
          case "end":
            return _context28.stop();
        }
      }, _callee28, this, [[0, 6]]);
    }));
    function baseSupplyAPY() {
      return _baseSupplyAPY.apply(this, arguments);
    }
    return baseSupplyAPY;
  }();
  _proto.borrowed = /*#__PURE__*/function () {
    var _borrowed = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29() {
      return _regeneratorRuntime().wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
            _context29.next = 3;
            return this.contract.borrowed();
          case 3:
            return _context29.abrupt("return", _context29.sent);
          case 6:
            _context29.prev = 6;
            _context29.t0 = _context29["catch"](0);
            console.error('Error in borrowed:', _context29.t0);
            throw _context29.t0;
          case 10:
          case "end":
            return _context29.stop();
        }
      }, _callee29, this, [[0, 6]]);
    }));
    function borrowed() {
      return _borrowed.apply(this, arguments);
    }
    return borrowed;
  }();
  _proto.characterization = /*#__PURE__*/function () {
    var _characterization = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30() {
      return _regeneratorRuntime().wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            _context30.prev = 0;
            _context30.next = 3;
            return this.contract.characterization();
          case 3:
            return _context30.abrupt("return", _context30.sent);
          case 6:
            _context30.prev = 6;
            _context30.t0 = _context30["catch"](0);
            console.error('Error in chaterization:', _context30.t0);
            throw _context30.t0;
          case 10:
          case "end":
            return _context30.stop();
        }
      }, _callee30, this, [[0, 6]]);
    }));
    function characterization() {
      return _characterization.apply(this, arguments);
    }
    return characterization;
  }();
  _proto.collateralAllowed = /*#__PURE__*/function () {
    var _collateralAllowed = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(collateral) {
      return _regeneratorRuntime().wrap(function _callee31$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
          case 0:
            _context31.prev = 0;
            _context31.next = 3;
            return this.contract.collateralAllowed(collateral);
          case 3:
            return _context31.abrupt("return", _context31.sent);
          case 6:
            _context31.prev = 6;
            _context31.t0 = _context31["catch"](0);
            console.error('Error in collateralAllowed:', _context31.t0);
            throw _context31.t0;
          case 10:
          case "end":
            return _context31.stop();
        }
      }, _callee31, this, [[0, 6]]);
    }));
    function collateralAllowed(_x42) {
      return _collateralAllowed.apply(this, arguments);
    }
    return collateralAllowed;
  }();
  _proto.collateralFactor = /*#__PURE__*/function () {
    var _collateralFactor = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(collateral) {
      return _regeneratorRuntime().wrap(function _callee32$(_context32) {
        while (1) switch (_context32.prev = _context32.next) {
          case 0:
            _context32.prev = 0;
            _context32.next = 3;
            return this.contract.collateralFactor(collateral);
          case 3:
            return _context32.abrupt("return", _context32.sent);
          case 6:
            _context32.prev = 6;
            _context32.t0 = _context32["catch"](0);
            console.error('Error in collateralFactor:', _context32.t0);
            throw _context32.t0;
          case 10:
          case "end":
            return _context32.stop();
        }
      }, _callee32, this, [[0, 6]]);
    }));
    function collateralFactor(_x43) {
      return _collateralFactor.apply(this, arguments);
    }
    return collateralFactor;
  }();
  _proto.collateralTokenList = /*#__PURE__*/function () {
    var _collateralTokenList = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(collateral) {
      return _regeneratorRuntime().wrap(function _callee33$(_context33) {
        while (1) switch (_context33.prev = _context33.next) {
          case 0:
            _context33.prev = 0;
            _context33.next = 3;
            return this.contract.collateralTokenList(collateral);
          case 3:
            return _context33.abrupt("return", _context33.sent);
          case 6:
            _context33.prev = 6;
            _context33.t0 = _context33["catch"](0);
            console.error('Error in collateralTokenList:', _context33.t0);
            throw _context33.t0;
          case 10:
          case "end":
            return _context33.stop();
        }
      }, _callee33, this, [[0, 6]]);
    }));
    function collateralTokenList(_x44) {
      return _collateralTokenList.apply(this, arguments);
    }
    return collateralTokenList;
  }();
  _proto.collateralTokenTypes = /*#__PURE__*/function () {
    var _collateralTokenTypes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(collateral) {
      return _regeneratorRuntime().wrap(function _callee34$(_context34) {
        while (1) switch (_context34.prev = _context34.next) {
          case 0:
            _context34.prev = 0;
            _context34.next = 3;
            return this.contract.collateralTokenTypes(collateral);
          case 3:
            return _context34.abrupt("return", _context34.sent);
          case 6:
            _context34.prev = 6;
            _context34.t0 = _context34["catch"](0);
            console.error('Error in collateralTokenTypes:', _context34.t0);
            throw _context34.t0;
          case 10:
          case "end":
            return _context34.stop();
        }
      }, _callee34, this, [[0, 6]]);
    }));
    function collateralTokenTypes(_x45) {
      return _collateralTokenTypes.apply(this, arguments);
    }
    return collateralTokenTypes;
  }();
  _proto.collaterals = /*#__PURE__*/function () {
    var _collaterals = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35() {
      return _regeneratorRuntime().wrap(function _callee35$(_context35) {
        while (1) switch (_context35.prev = _context35.next) {
          case 0:
            _context35.prev = 0;
            _context35.next = 3;
            return this.contract.collaterals();
          case 3:
            return _context35.abrupt("return", _context35.sent);
          case 6:
            _context35.prev = 6;
            _context35.t0 = _context35["catch"](0);
            console.error('Error in collaterals:', _context35.t0);
            throw _context35.t0;
          case 10:
          case "end":
            return _context35.stop();
        }
      }, _callee35, this, [[0, 6]]);
    }));
    function collaterals() {
      return _collaterals.apply(this, arguments);
    }
    return collaterals;
  }();
  _proto.convertToAssets = /*#__PURE__*/function () {
    var _convertToAssets = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(shares) {
      return _regeneratorRuntime().wrap(function _callee36$(_context36) {
        while (1) switch (_context36.prev = _context36.next) {
          case 0:
            _context36.prev = 0;
            _context36.next = 3;
            return this.contract.convertToAssets(shares);
          case 3:
            return _context36.abrupt("return", _context36.sent);
          case 6:
            _context36.prev = 6;
            _context36.t0 = _context36["catch"](0);
            console.error('Error in convertToAssets:', _context36.t0);
            throw _context36.t0;
          case 10:
          case "end":
            return _context36.stop();
        }
      }, _callee36, this, [[0, 6]]);
    }));
    function convertToAssets(_x46) {
      return _convertToAssets.apply(this, arguments);
    }
    return convertToAssets;
  }();
  _proto.convertToShares = /*#__PURE__*/function () {
    var _convertToShares = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37(assets) {
      return _regeneratorRuntime().wrap(function _callee37$(_context37) {
        while (1) switch (_context37.prev = _context37.next) {
          case 0:
            _context37.prev = 0;
            _context37.next = 3;
            return this.contract.convertToShares(assets);
          case 3:
            return _context37.abrupt("return", _context37.sent);
          case 6:
            _context37.prev = 6;
            _context37.t0 = _context37["catch"](0);
            console.error('Error in convertToShares:', _context37.t0);
            throw _context37.t0;
          case 10:
          case "end":
            return _context37.stop();
        }
      }, _callee37, this, [[0, 6]]);
    }));
    function convertToShares(_x47) {
      return _convertToShares.apply(this, arguments);
    }
    return convertToShares;
  }();
  _proto.debtToken = /*#__PURE__*/function () {
    var _debtToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38() {
      return _regeneratorRuntime().wrap(function _callee38$(_context38) {
        while (1) switch (_context38.prev = _context38.next) {
          case 0:
            _context38.prev = 0;
            _context38.next = 3;
            return this.contract.debtToken();
          case 3:
            return _context38.abrupt("return", _context38.sent);
          case 6:
            _context38.prev = 6;
            _context38.t0 = _context38["catch"](0);
            console.error('Error in debtToken:', _context38.t0);
            throw _context38.t0;
          case 10:
          case "end":
            return _context38.stop();
        }
      }, _callee38, this, [[0, 6]]);
    }));
    function debtToken() {
      return _debtToken.apply(this, arguments);
    }
    return debtToken;
  }();
  _proto.decimals = /*#__PURE__*/function () {
    var _decimals = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39() {
      return _regeneratorRuntime().wrap(function _callee39$(_context39) {
        while (1) switch (_context39.prev = _context39.next) {
          case 0:
            _context39.prev = 0;
            _context39.next = 3;
            return this.contract.decimals();
          case 3:
            return _context39.abrupt("return", _context39.sent);
          case 6:
            _context39.prev = 6;
            _context39.t0 = _context39["catch"](0);
            console.error('Error in decimals:', _context39.t0);
            throw _context39.t0;
          case 10:
          case "end":
            return _context39.stop();
        }
      }, _callee39, this, [[0, 6]]);
    }));
    function decimals() {
      return _decimals.apply(this, arguments);
    }
    return decimals;
  }();
  _proto.feesPaid = /*#__PURE__*/function () {
    var _feesPaid = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40() {
      return _regeneratorRuntime().wrap(function _callee40$(_context40) {
        while (1) switch (_context40.prev = _context40.next) {
          case 0:
            _context40.prev = 0;
            _context40.next = 3;
            return this.contract.feesPaid();
          case 3:
            return _context40.abrupt("return", _context40.sent);
          case 6:
            _context40.prev = 6;
            _context40.t0 = _context40["catch"](0);
            console.error('Error in feesPaid:', _context40.t0);
            throw _context40.t0;
          case 10:
          case "end":
            return _context40.stop();
        }
      }, _callee40, this, [[0, 6]]);
    }));
    function feesPaid() {
      return _feesPaid.apply(this, arguments);
    }
    return feesPaid;
  }();
  _proto.gauge = /*#__PURE__*/function () {
    var _gauge2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee41() {
      return _regeneratorRuntime().wrap(function _callee41$(_context41) {
        while (1) switch (_context41.prev = _context41.next) {
          case 0:
            _context41.prev = 0;
            _context41.next = 3;
            return this.contract.gauge();
          case 3:
            return _context41.abrupt("return", _context41.sent);
          case 6:
            _context41.prev = 6;
            _context41.t0 = _context41["catch"](0);
            console.error('Error in gauge:', _context41.t0);
            throw _context41.t0;
          case 10:
          case "end":
            return _context41.stop();
        }
      }, _callee41, this, [[0, 6]]);
    }));
    function gauge() {
      return _gauge2.apply(this, arguments);
    }
    return gauge;
  }();
  _proto.getTokenCollateralValue = /*#__PURE__*/function () {
    var _getTokenCollateralValue = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee42(token, amount) {
      return _regeneratorRuntime().wrap(function _callee42$(_context42) {
        while (1) switch (_context42.prev = _context42.next) {
          case 0:
            _context42.prev = 0;
            _context42.next = 3;
            return this.contract.getTokenCollateralValue(token, amount);
          case 3:
            return _context42.abrupt("return", _context42.sent);
          case 6:
            _context42.prev = 6;
            _context42.t0 = _context42["catch"](0);
            console.error('Error in getTokenCollateralValue:', _context42.t0);
            throw _context42.t0;
          case 10:
          case "end":
            return _context42.stop();
        }
      }, _callee42, this, [[0, 6]]);
    }));
    function getTokenCollateralValue(_x48, _x49) {
      return _getTokenCollateralValue.apply(this, arguments);
    }
    return getTokenCollateralValue;
  }();
  _proto.getTokenMarketValue = /*#__PURE__*/function () {
    var _getTokenMarketValue = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee43(token, amount) {
      return _regeneratorRuntime().wrap(function _callee43$(_context43) {
        while (1) switch (_context43.prev = _context43.next) {
          case 0:
            _context43.prev = 0;
            _context43.next = 3;
            return this.contract.getTokenMarketValue(token, amount);
          case 3:
            return _context43.abrupt("return", _context43.sent);
          case 6:
            _context43.prev = 6;
            _context43.t0 = _context43["catch"](0);
            console.error('Error in getTokenMarketValue:', _context43.t0);
            throw _context43.t0;
          case 10:
          case "end":
            return _context43.stop();
        }
      }, _callee43, this, [[0, 6]]);
    }));
    function getTokenMarketValue(_x50, _x51) {
      return _getTokenMarketValue.apply(this, arguments);
    }
    return getTokenMarketValue;
  }();
  _proto.interestRateModel = /*#__PURE__*/function () {
    var _interestRateModel = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee44() {
      return _regeneratorRuntime().wrap(function _callee44$(_context44) {
        while (1) switch (_context44.prev = _context44.next) {
          case 0:
            _context44.prev = 0;
            _context44.next = 3;
            return this.contract.interestRates();
          case 3:
            return _context44.abrupt("return", _context44.sent);
          case 6:
            _context44.prev = 6;
            _context44.t0 = _context44["catch"](0);
            console.error('Error in interestRates:', _context44.t0);
            throw _context44.t0;
          case 10:
          case "end":
            return _context44.stop();
        }
      }, _callee44, this, [[0, 6]]);
    }));
    function interestRateModel() {
      return _interestRateModel.apply(this, arguments);
    }
    return interestRateModel;
  }();
  _proto.interestRates = /*#__PURE__*/function () {
    var _interestRates = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee45() {
      return _regeneratorRuntime().wrap(function _callee45$(_context45) {
        while (1) switch (_context45.prev = _context45.next) {
          case 0:
            _context45.prev = 0;
            _context45.next = 3;
            return this.contract.interestRates();
          case 3:
            return _context45.abrupt("return", _context45.sent);
          case 6:
            _context45.prev = 6;
            _context45.t0 = _context45["catch"](0);
            console.error('Error in interestRates:', _context45.t0);
            throw _context45.t0;
          case 10:
          case "end":
            return _context45.stop();
        }
      }, _callee45, this, [[0, 6]]);
    }));
    function interestRates() {
      return _interestRates.apply(this, arguments);
    }
    return interestRates;
  }();
  _proto.maxDeposit = /*#__PURE__*/function () {
    var _maxDeposit = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee46(amount) {
      return _regeneratorRuntime().wrap(function _callee46$(_context46) {
        while (1) switch (_context46.prev = _context46.next) {
          case 0:
            _context46.prev = 0;
            _context46.next = 3;
            return this.contract.maxDeposit(amount);
          case 3:
            return _context46.abrupt("return", _context46.sent);
          case 6:
            _context46.prev = 6;
            _context46.t0 = _context46["catch"](0);
            console.error('Error in maxDeposit:', _context46.t0);
            throw _context46.t0;
          case 10:
          case "end":
            return _context46.stop();
        }
      }, _callee46, this, [[0, 6]]);
    }));
    function maxDeposit(_x52) {
      return _maxDeposit.apply(this, arguments);
    }
    return maxDeposit;
  }();
  _proto.maxMint = /*#__PURE__*/function () {
    var _maxMint = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee47(amount) {
      return _regeneratorRuntime().wrap(function _callee47$(_context47) {
        while (1) switch (_context47.prev = _context47.next) {
          case 0:
            _context47.prev = 0;
            _context47.next = 3;
            return this.contract.maxMint(amount);
          case 3:
            return _context47.abrupt("return", _context47.sent);
          case 6:
            _context47.prev = 6;
            _context47.t0 = _context47["catch"](0);
            console.error('Error in maxMint:', _context47.t0);
            throw _context47.t0;
          case 10:
          case "end":
            return _context47.stop();
        }
      }, _callee47, this, [[0, 6]]);
    }));
    function maxMint(_x53) {
      return _maxMint.apply(this, arguments);
    }
    return maxMint;
  }();
  _proto.maxRedeem = /*#__PURE__*/function () {
    var _maxRedeem = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee48(owner) {
      return _regeneratorRuntime().wrap(function _callee48$(_context48) {
        while (1) switch (_context48.prev = _context48.next) {
          case 0:
            _context48.prev = 0;
            _context48.next = 3;
            return this.contract.maxRedeem(owner);
          case 3:
            return _context48.abrupt("return", _context48.sent);
          case 6:
            _context48.prev = 6;
            _context48.t0 = _context48["catch"](0);
            console.error('Error in maxRedeem:', _context48.t0);
            throw _context48.t0;
          case 10:
          case "end":
            return _context48.stop();
        }
      }, _callee48, this, [[0, 6]]);
    }));
    function maxRedeem(_x54) {
      return _maxRedeem.apply(this, arguments);
    }
    return maxRedeem;
  }();
  _proto.maxWithdraw = /*#__PURE__*/function () {
    var _maxWithdraw = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee49(owner) {
      return _regeneratorRuntime().wrap(function _callee49$(_context49) {
        while (1) switch (_context49.prev = _context49.next) {
          case 0:
            _context49.prev = 0;
            _context49.next = 3;
            return this.contract.maxWithdraw(owner);
          case 3:
            return _context49.abrupt("return", _context49.sent);
          case 6:
            _context49.prev = 6;
            _context49.t0 = _context49["catch"](0);
            console.error('Error in maxWithdraw:', _context49.t0);
            throw _context49.t0;
          case 10:
          case "end":
            return _context49.stop();
        }
      }, _callee49, this, [[0, 6]]);
    }));
    function maxWithdraw(_x55) {
      return _maxWithdraw.apply(this, arguments);
    }
    return maxWithdraw;
  }();
  _proto.name = /*#__PURE__*/function () {
    var _name = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee50() {
      return _regeneratorRuntime().wrap(function _callee50$(_context50) {
        while (1) switch (_context50.prev = _context50.next) {
          case 0:
            _context50.prev = 0;
            _context50.next = 3;
            return this.contract.name();
          case 3:
            return _context50.abrupt("return", _context50.sent);
          case 6:
            _context50.prev = 6;
            _context50.t0 = _context50["catch"](0);
            console.error('Error in name:', _context50.t0);
            throw _context50.t0;
          case 10:
          case "end":
            return _context50.stop();
        }
      }, _callee50, this, [[0, 6]]);
    }));
    function name() {
      return _name.apply(this, arguments);
    }
    return name;
  }();
  _proto.owner = /*#__PURE__*/function () {
    var _owner = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee51() {
      return _regeneratorRuntime().wrap(function _callee51$(_context51) {
        while (1) switch (_context51.prev = _context51.next) {
          case 0:
            _context51.prev = 0;
            _context51.next = 3;
            return this.contract.owner();
          case 3:
            return _context51.abrupt("return", _context51.sent);
          case 6:
            _context51.prev = 6;
            _context51.t0 = _context51["catch"](0);
            console.error('Error in nonces:', _context51.t0);
            throw _context51.t0;
          case 10:
          case "end":
            return _context51.stop();
        }
      }, _callee51, this, [[0, 6]]);
    }));
    function owner() {
      return _owner.apply(this, arguments);
    }
    return owner;
  }();
  _proto.nonces = /*#__PURE__*/function () {
    var _nonces = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee52(address) {
      return _regeneratorRuntime().wrap(function _callee52$(_context52) {
        while (1) switch (_context52.prev = _context52.next) {
          case 0:
            _context52.prev = 0;
            _context52.next = 3;
            return this.contract.nonces(address);
          case 3:
            return _context52.abrupt("return", _context52.sent);
          case 6:
            _context52.prev = 6;
            _context52.t0 = _context52["catch"](0);
            console.error('Error in nonces:', _context52.t0);
            throw _context52.t0;
          case 10:
          case "end":
            return _context52.stop();
        }
      }, _callee52, this, [[0, 6]]);
    }));
    function nonces(_x56) {
      return _nonces.apply(this, arguments);
    }
    return nonces;
  }();
  _proto.poolAsset = /*#__PURE__*/function () {
    var _poolAsset = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee53() {
      return _regeneratorRuntime().wrap(function _callee53$(_context53) {
        while (1) switch (_context53.prev = _context53.next) {
          case 0:
            _context53.prev = 0;
            _context53.next = 3;
            return this.contract.poolAsset();
          case 3:
            return _context53.abrupt("return", _context53.sent);
          case 6:
            _context53.prev = 6;
            _context53.t0 = _context53["catch"](0);
            console.error('Error in poolAsset:', _context53.t0);
            throw _context53.t0;
          case 10:
          case "end":
            return _context53.stop();
        }
      }, _callee53, this, [[0, 6]]);
    }));
    function poolAsset() {
      return _poolAsset.apply(this, arguments);
    }
    return poolAsset;
  }();
  _proto.previewDeposit = /*#__PURE__*/function () {
    var _previewDeposit = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee54(assets) {
      return _regeneratorRuntime().wrap(function _callee54$(_context54) {
        while (1) switch (_context54.prev = _context54.next) {
          case 0:
            _context54.prev = 0;
            _context54.next = 3;
            return this.contract.previewDeposit(assets);
          case 3:
            return _context54.abrupt("return", _context54.sent);
          case 6:
            _context54.prev = 6;
            _context54.t0 = _context54["catch"](0);
            console.error('Error in previewDeposit:', _context54.t0);
            throw _context54.t0;
          case 10:
          case "end":
            return _context54.stop();
        }
      }, _callee54, this, [[0, 6]]);
    }));
    function previewDeposit(_x57) {
      return _previewDeposit.apply(this, arguments);
    }
    return previewDeposit;
  }();
  _proto.previewMint = /*#__PURE__*/function () {
    var _previewMint = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee55(shares) {
      return _regeneratorRuntime().wrap(function _callee55$(_context55) {
        while (1) switch (_context55.prev = _context55.next) {
          case 0:
            _context55.prev = 0;
            _context55.next = 3;
            return this.contract.previewMint(shares);
          case 3:
            return _context55.abrupt("return", _context55.sent);
          case 6:
            _context55.prev = 6;
            _context55.t0 = _context55["catch"](0);
            console.error('Error in previewMint:', _context55.t0);
            throw _context55.t0;
          case 10:
          case "end":
            return _context55.stop();
        }
      }, _callee55, this, [[0, 6]]);
    }));
    function previewMint(_x58) {
      return _previewMint.apply(this, arguments);
    }
    return previewMint;
  }();
  _proto.previewRedeem = /*#__PURE__*/function () {
    var _previewRedeem = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee56(shares) {
      return _regeneratorRuntime().wrap(function _callee56$(_context56) {
        while (1) switch (_context56.prev = _context56.next) {
          case 0:
            _context56.prev = 0;
            _context56.next = 3;
            return this.contract.previewRedeem(shares);
          case 3:
            return _context56.abrupt("return", _context56.sent);
          case 6:
            _context56.prev = 6;
            _context56.t0 = _context56["catch"](0);
            console.error('Error in previewMint:', _context56.t0);
            throw _context56.t0;
          case 10:
          case "end":
            return _context56.stop();
        }
      }, _callee56, this, [[0, 6]]);
    }));
    function previewRedeem(_x59) {
      return _previewRedeem.apply(this, arguments);
    }
    return previewRedeem;
  }();
  _proto.previewWithdraw = /*#__PURE__*/function () {
    var _previewWithdraw = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee57(assets) {
      return _regeneratorRuntime().wrap(function _callee57$(_context57) {
        while (1) switch (_context57.prev = _context57.next) {
          case 0:
            _context57.prev = 0;
            _context57.next = 3;
            return this.contract.previewWithdraw(assets);
          case 3:
            return _context57.abrupt("return", _context57.sent);
          case 6:
            _context57.prev = 6;
            _context57.t0 = _context57["catch"](0);
            console.error('Error in previewWithdraw:', _context57.t0);
            throw _context57.t0;
          case 10:
          case "end":
            return _context57.stop();
        }
      }, _callee57, this, [[0, 6]]);
    }));
    function previewWithdraw(_x60) {
      return _previewWithdraw.apply(this, arguments);
    }
    return previewWithdraw;
  }();
  _proto.priceFeed = /*#__PURE__*/function () {
    var _priceFeed = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee58() {
      return _regeneratorRuntime().wrap(function _callee58$(_context58) {
        while (1) switch (_context58.prev = _context58.next) {
          case 0:
            _context58.prev = 0;
            _context58.next = 3;
            return this.contract.priceFeed();
          case 3:
            return _context58.abrupt("return", _context58.sent);
          case 6:
            _context58.prev = 6;
            _context58.t0 = _context58["catch"](0);
            console.error('Error in priceFeed:', _context58.t0);
            throw _context58.t0;
          case 10:
          case "end":
            return _context58.stop();
        }
      }, _callee58, this, [[0, 6]]);
    }));
    function priceFeed() {
      return _priceFeed.apply(this, arguments);
    }
    return priceFeed;
  }();
  _proto.supplied = /*#__PURE__*/function () {
    var _supplied = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee59() {
      return _regeneratorRuntime().wrap(function _callee59$(_context59) {
        while (1) switch (_context59.prev = _context59.next) {
          case 0:
            _context59.prev = 0;
            _context59.next = 3;
            return this.contract.supplied();
          case 3:
            return _context59.abrupt("return", _context59.sent);
          case 6:
            _context59.prev = 6;
            _context59.t0 = _context59["catch"](0);
            console.error('Error in supplied:', _context59.t0);
            throw _context59.t0;
          case 10:
          case "end":
            return _context59.stop();
        }
      }, _callee59, this, [[0, 6]]);
    }));
    function supplied() {
      return _supplied.apply(this, arguments);
    }
    return supplied;
  }();
  _proto.symbol = /*#__PURE__*/function () {
    var _symbol = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee60() {
      return _regeneratorRuntime().wrap(function _callee60$(_context60) {
        while (1) switch (_context60.prev = _context60.next) {
          case 0:
            _context60.prev = 0;
            _context60.next = 3;
            return this.contract.symbol();
          case 3:
            return _context60.abrupt("return", _context60.sent);
          case 6:
            _context60.prev = 6;
            _context60.t0 = _context60["catch"](0);
            console.error('Error in symbol:', _context60.t0);
            throw _context60.t0;
          case 10:
          case "end":
            return _context60.stop();
        }
      }, _callee60, this, [[0, 6]]);
    }));
    function symbol() {
      return _symbol.apply(this, arguments);
    }
    return symbol;
  }();
  _proto.tokenCollateralDeposited = /*#__PURE__*/function () {
    var _tokenCollateralDeposited = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee61(collateral) {
      return _regeneratorRuntime().wrap(function _callee61$(_context61) {
        while (1) switch (_context61.prev = _context61.next) {
          case 0:
            _context61.prev = 0;
            _context61.next = 3;
            return this.contract.tokenCollateralDeposited(collateral);
          case 3:
            return _context61.abrupt("return", _context61.sent);
          case 6:
            _context61.prev = 6;
            _context61.t0 = _context61["catch"](0);
            console.error('Error in tokenCollateralDeposited:', _context61.t0);
            throw _context61.t0;
          case 10:
          case "end":
            return _context61.stop();
        }
      }, _callee61, this, [[0, 6]]);
    }));
    function tokenCollateralDeposited(_x61) {
      return _tokenCollateralDeposited.apply(this, arguments);
    }
    return tokenCollateralDeposited;
  }();
  _proto.totalAccountCollateralValue = /*#__PURE__*/function () {
    var _totalAccountCollateralValue = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee62(account) {
      return _regeneratorRuntime().wrap(function _callee62$(_context62) {
        while (1) switch (_context62.prev = _context62.next) {
          case 0:
            _context62.prev = 0;
            _context62.next = 3;
            return this.contract.totalAccountCollateralValue(account);
          case 3:
            return _context62.abrupt("return", _context62.sent);
          case 6:
            _context62.prev = 6;
            _context62.t0 = _context62["catch"](0);
            console.error('Error in totalAccountCollateralValue:', _context62.t0);
            throw _context62.t0;
          case 10:
          case "end":
            return _context62.stop();
        }
      }, _callee62, this, [[0, 6]]);
    }));
    function totalAccountCollateralValue(_x62) {
      return _totalAccountCollateralValue.apply(this, arguments);
    }
    return totalAccountCollateralValue;
  }();
  _proto.totalAssets = /*#__PURE__*/function () {
    var _totalAssets = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee63() {
      return _regeneratorRuntime().wrap(function _callee63$(_context63) {
        while (1) switch (_context63.prev = _context63.next) {
          case 0:
            _context63.prev = 0;
            _context63.next = 3;
            return this.contract.totalAssets();
          case 3:
            return _context63.abrupt("return", _context63.sent);
          case 6:
            _context63.prev = 6;
            _context63.t0 = _context63["catch"](0);
            console.error('Error in totalAssets:', _context63.t0);
            throw _context63.t0;
          case 10:
          case "end":
            return _context63.stop();
        }
      }, _callee63, this, [[0, 6]]);
    }));
    function totalAssets() {
      return _totalAssets.apply(this, arguments);
    }
    return totalAssets;
  }();
  _proto.totalSupply = /*#__PURE__*/function () {
    var _totalSupply = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee64() {
      return _regeneratorRuntime().wrap(function _callee64$(_context64) {
        while (1) switch (_context64.prev = _context64.next) {
          case 0:
            _context64.prev = 0;
            _context64.next = 3;
            return this.contract.totalSupply();
          case 3:
            return _context64.abrupt("return", _context64.sent);
          case 6:
            _context64.prev = 6;
            _context64.t0 = _context64["catch"](0);
            console.error('Error in totalSupply:', _context64.t0);
            throw _context64.t0;
          case 10:
          case "end":
            return _context64.stop();
        }
      }, _callee64, this, [[0, 6]]);
    }));
    function totalSupply() {
      return _totalSupply.apply(this, arguments);
    }
    return totalSupply;
  }();
  _proto.tvl = /*#__PURE__*/function () {
    var _tvl = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee65() {
      return _regeneratorRuntime().wrap(function _callee65$(_context65) {
        while (1) switch (_context65.prev = _context65.next) {
          case 0:
            _context65.prev = 0;
            _context65.next = 3;
            return this.contract.tvl();
          case 3:
            return _context65.abrupt("return", _context65.sent);
          case 6:
            _context65.prev = 6;
            _context65.t0 = _context65["catch"](0);
            console.error('Error in tvl:', _context65.t0);
            throw _context65.t0;
          case 10:
          case "end":
            return _context65.stop();
        }
      }, _callee65, this, [[0, 6]]);
    }));
    function tvl() {
      return _tvl.apply(this, arguments);
    }
    return tvl;
  }();
  _proto.utilization = /*#__PURE__*/function () {
    var _utilization = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee66() {
      return _regeneratorRuntime().wrap(function _callee66$(_context66) {
        while (1) switch (_context66.prev = _context66.next) {
          case 0:
            _context66.prev = 0;
            _context66.next = 3;
            return this.contract.utilization();
          case 3:
            return _context66.abrupt("return", _context66.sent);
          case 6:
            _context66.prev = 6;
            _context66.t0 = _context66["catch"](0);
            console.error('Error in utilization:', _context66.t0);
            throw _context66.t0;
          case 10:
          case "end":
            return _context66.stop();
        }
      }, _callee66, this, [[0, 6]]);
    }));
    function utilization() {
      return _utilization.apply(this, arguments);
    }
    return utilization;
  }();
  return LendingPool;
}();

var PriceOracle = /*#__PURE__*/function () {
  function PriceOracle(provider) {
    this.provider = provider;
    this.oracleContract = undefined;
  }
  var _proto = PriceOracle.prototype;
  _proto.getAssetPrice = /*#__PURE__*/function () {
    var _getAssetPrice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(address, MultiAssetPriceOracle, priceFeedAddress) {
      var priceFeedAbi;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            priceFeedAbi = MultiAssetPriceOracle.abi;
            this.oracleContract = new ethers.Contract(priceFeedAddress, priceFeedAbi, this.provider);
            _context.next = 4;
            return this.oracleContract.readPrice(address, 1);
          case 4:
            return _context.abrupt("return", _context.sent);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function getAssetPrice(_x, _x2, _x3) {
      return _getAssetPrice.apply(this, arguments);
    }
    return getAssetPrice;
  }();
  return PriceOracle;
}();

var _format$2 = "hh-sol-artifact-1";
var contractName$2 = "LendingPoolLens";
var sourceName$2 = "contracts/lens/LendingPoolLens.sol";
var abi$2 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_owner",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "pool",
				type: "address"
			}
		],
		name: "AlreadyRegistered",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "pool",
				type: "address"
			}
		],
		name: "NotRegistered",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "OwnableInvalidOwner",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "OwnableUnauthorizedAccount",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "x",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "y",
				type: "uint256"
			}
		],
		name: "PRBMath_MulDiv18_Overflow",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "value",
				type: "int256"
			}
		],
		name: "SafeCastOverflowedIntToUint",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "pool",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "PoolRegistered",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "pool",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "PoolUnregistered",
		type: "event"
	},
	{
		inputs: [
		],
		name: "activePools",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getAggregateStats",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "totalSuppliedValue",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "totalBorrowedValue",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "totalAvailableValue",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "totalFeesPaid",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "numberOfVaults",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "tvl",
						type: "uint256"
					}
				],
				internalType: "struct LendingPoolLens.AggregateStats",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "poolAddress",
				type: "address"
			}
		],
		name: "getMarketInfo",
		outputs: [
			{
				components: [
					{
						internalType: "int256",
						name: "oraclePrice",
						type: "int256"
					},
					{
						internalType: "uint256",
						name: "oraclePriceDecimals",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "interestFee",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "supplyCap",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "liquidationThreshold",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "liquidationPenalty",
						type: "uint256"
					}
				],
				internalType: "struct LendingPoolLens.MarketInfo",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "poolAddress",
				type: "address"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getPoolAccountInfo",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "supplied",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "borrowed",
						type: "uint256"
					},
					{
						internalType: "uint8",
						name: "decimals",
						type: "uint8"
					},
					{
						internalType: "uint256",
						name: "healthFactor",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "totalCollateralValue",
						type: "uint256"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint8",
								name: "decimals",
								type: "uint8"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							},
							{
								internalType: "uint256",
								name: "value",
								type: "uint256"
							},
							{
								internalType: "uint256[]",
								name: "tokenIds",
								type: "uint256[]"
							}
						],
						internalType: "struct LendingPoolLens.AccountCollateralDeposited[]",
						name: "collateralDeposited",
						type: "tuple[]"
					}
				],
				internalType: "struct LendingPoolLens.AccountInfo",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "poolAddress",
				type: "address"
			}
		],
		name: "getPoolCollateral",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "collateral",
						type: "address"
					},
					{
						internalType: "uint8",
						name: "decimals",
						type: "uint8"
					},
					{
						internalType: "uint256",
						name: "amountDeposited",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "value",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "collateralFactor",
						type: "uint256"
					}
				],
				internalType: "struct LendingPoolLens.PoolCollateralInfo[]",
				name: "",
				type: "tuple[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "poolAddress",
				type: "address"
			}
		],
		name: "getPoolStats",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "pool",
						type: "address"
					},
					{
						internalType: "address",
						name: "asset",
						type: "address"
					},
					{
						internalType: "uint8",
						name: "decimals",
						type: "uint8"
					},
					{
						internalType: "string",
						name: "characterization",
						type: "string"
					},
					{
						internalType: "uint256",
						name: "supplied",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "suppliedValue",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "borrowed",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "borrowedValue",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "baseSupplyAPY",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "maxSupplyAPY",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "baseBorrowAPY",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "maxBorrowAPY",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "utilization",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "feesPaid",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "tvl",
						type: "uint256"
					},
					{
						internalType: "address[]",
						name: "collaterals",
						type: "address[]"
					}
				],
				internalType: "struct LendingPoolLens.PoolStats",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "pools",
				type: "address[]"
			}
		],
		name: "getPoolStatsList",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "pool",
						type: "address"
					},
					{
						internalType: "address",
						name: "asset",
						type: "address"
					},
					{
						internalType: "uint8",
						name: "decimals",
						type: "uint8"
					},
					{
						internalType: "string",
						name: "characterization",
						type: "string"
					},
					{
						internalType: "uint256",
						name: "supplied",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "suppliedValue",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "borrowed",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "borrowedValue",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "baseSupplyAPY",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "maxSupplyAPY",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "baseBorrowAPY",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "maxBorrowAPY",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "utilization",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "feesPaid",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "tvl",
						type: "uint256"
					},
					{
						internalType: "address[]",
						name: "collaterals",
						type: "address[]"
					}
				],
				internalType: "struct LendingPoolLens.PoolStats[]",
				name: "",
				type: "tuple[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "pool",
				type: "address"
			},
			{
				internalType: "bool",
				name: "isActive",
				type: "bool"
			}
		],
		name: "registerPool",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "registeredPools",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "pool",
				type: "address"
			},
			{
				internalType: "bool",
				name: "isActive",
				type: "bool"
			}
		],
		name: "setActive",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "pool",
				type: "address"
			}
		],
		name: "unregisterPool",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode$2 = "0x608060405234801562000010575f80fd5b50604051620031c7380380620031c78339810160408190526200003391620000c4565b806001600160a01b0381166200006257604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b6200006d8162000075565b5050620000f3565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f60208284031215620000d5575f80fd5b81516001600160a01b0381168114620000ec575f80fd5b9392505050565b6130c680620001015f395ff3fe608060405234801561000f575f80fd5b50600436106100e5575f3560e01c80638ae9759511610088578063a96c00c111610063578063a96c00c114610217578063ada61cc31461021f578063cb925d1514610232578063f2fde38b14610252575f80fd5b80638ae97595146101bd5780638da5cb5b146101dd578063a931e993146101f7575f80fd5b80633526c0bd116100c35780633526c0bd1461017a57806352f72fe61461018d57806369d94d0c14610195578063715018a6146101b5575f80fd5b8063063eb469146100e95780630cf85bcc146101075780632ce962cf14610165575b5f80fd5b6100f1610265565b6040516100fe9190612953565b60405180910390f35b61011a6101153660046129b3565b6102c5565b6040516100fe91905f60c082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015292915050565b6101786101733660046129ce565b610565565b005b6101786101883660046129ce565b6105cd565b6100f16106ba565b6101a86101a33660046129b3565b61085b565b6040516100fe9190612a09565b610178610bdb565b6101d06101cb3660046129b3565b610bee565b6040516100fe9190612c05565b5f546040516001600160a01b0390911681526020016100fe565b61020a610205366004612c17565b6115ce565b6040516100fe9190612c86565b61011a61183b565b61017861022d3660046129b3565b611d84565b610245610240366004612d04565b611f21565b6040516100fe9190612d30565b6101786102603660046129b3565b6126ba565b606060018054806020026020016040519081016040528092919081815260200182805480156102bb57602002820191905f5260205f20905b81546001600160a01b0316815260019091019060200180831161029d575b5050505050905090565b6102f86040518060c001604052805f81526020015f81526020015f81526020015f81526020015f81526020015f81525090565b5f8290505f6040518060c00160405280836001600160a01b031663741bef1a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610344573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103689190612e43565b6001600160a01b03166378334aee856001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103b2573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103d69190612e43565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b1681526001600160a01b0390911660048201525f6024820152604401602060405180830381865afa158015610436573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061045a9190612e5e565b8152602001836001600160a01b031663741bef1a6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561049b573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104bf9190612e43565b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104fa573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061051e9190612e75565b60ff16815266071afd498d000060208201526a084595161401484a0000006040820152670d2f13f7789f0000606082015266b1a2bc2ec50000608090910152949350505050565b61056d612710565b61057682612755565b6105a35760405163bfc6c33760e01b81526001600160a01b03831660048201526024015b60405180910390fd5b6001600160a01b03919091165f908152600260205260409020805460ff1916911515919091179055565b6105d5612710565b6105de82612755565b15610620576040517f45ed80e90000000000000000000000000000000000000000000000000000000081526001600160a01b038316600482015260240161059a565b600180548082019091557fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091555f81815260026020526040808220805460ff1916851515179055513392917f26f4b31b7240e7422a9fe2ba5ce7684500302a536166d0ed481d7ad653ff25ab91a35050565b60605f805b60015481101561072b5760025f600183815481106106df576106df612e95565b5f9182526020808320909101546001600160a01b0316835282019290925260400190205460ff161561071957610716600183612ebd565b91505b8061072381612ed0565b9150506106bf565b50805f03610746575050604080515f81526020810190915290565b5f8167ffffffffffffffff81111561076057610760612ee8565b604051908082528060200260200182016040528015610789578160200160208202803683370190505b5090505f805b6001548110156108525760025f600183815481106107af576107af612e95565b5f9182526020808320909101546001600160a01b0316835282019290925260400190205460ff161561084057600181815481106107ee576107ee612e95565b5f918252602090912001546001600160a01b0316838361080d81612ed0565b94508151811061081f5761081f612e95565b60200260200101906001600160a01b031690816001600160a01b0316815250505b8061084a81612ed0565b91505061078f565b50909392505050565b60605f8290505f816001600160a01b0316634113e5ca6040518163ffffffff1660e01b81526004015f60405180830381865afa15801561089d573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526108c49190810190612f2d565b90505f80825167ffffffffffffffff8111156108e2576108e2612ee8565b60405190808252806020026020018201604052801561094c57816020015b6109396040518060a001604052805f6001600160a01b031681526020015f60ff1681526020015f81526020015f81526020015f81525090565b8152602001906001900390816109005790505b5090505f5b8351811015610bd15783818151811061096c5761096c612e95565b60209081029190910101516040517f656926810000000000000000000000000000000000000000000000000000000081526001600160a01b0380831660048301529194505f91871690636569268190602401602060405180830381865afa1580156109d9573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906109fd9190612e5e565b90506040518060a00160405280856001600160a01b03168152602001856001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a55573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610a799190612e75565b60ff16815260208101839052604080517f71c03e2a0000000000000000000000000000000000000000000000000000000081526001600160a01b038881166004830152602482018690529190920191908916906371c03e2a90604401602060405180830381865afa158015610af0573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610b149190612e5e565b81526040517ffbcc6f5e0000000000000000000000000000000000000000000000000000000081526001600160a01b03878116600483015260209092019189169063fbcc6f5e90602401602060405180830381865afa158015610b79573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610b9d9190612e5e565b815250838381518110610bb257610bb2612e95565b6020026020010181905250508080610bc990612ed0565b915050610951565b5095945050505050565b610be3612710565b610bec5f6127bb565b565b610c756040518061020001604052805f6001600160a01b031681526020015f6001600160a01b031681526020015f60ff168152602001606081526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f8152602001606081525090565b610c7e82612755565b610ca65760405163bfc6c33760e01b81526001600160a01b038316600482015260240161059a565b5f8290505f816001600160a01b0316636e4228316040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ce7573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d0b9190612e5e565b90505f826001600160a01b03166369609c426040518163ffffffff1660e01b8152600401602060405180830381865afa158015610d4a573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d6e9190612e5e565b90505f836001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610dad573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610dd19190612e43565b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e0c573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610e309190612e75565b90505f846001600160a01b031663741bef1a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e6f573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610e939190612e43565b90505f610f91826001600160a01b03166378334aee886001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ee4573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610f089190612e43565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b1681526001600160a01b0390911660048201525f6024820152604401602060405180830381865afa158015610f68573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610f8c9190612e5e565b612817565b73__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f9091846001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fe9573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061100d9190612e75565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925260ff16602482015260126044820152606401602060405180830381865af415801561106e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906110929190612e5e565b90505f6040518061020001604052808a6001600160a01b03168152602001886001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156110ec573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906111109190612e43565b6001600160a01b031681526020018560ff168152602001886001600160a01b031663f3f539ea6040518163ffffffff1660e01b81526004015f60405180830381865afa158015611162573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526111899190810190612fda565b81526020018781526020016112316112286111a18690565b604051639fd0da0f60e01b8152600481018c905260ff8a1660248201526012604482015261122b9073__$508d1890a3ca5a531caf6f19bc5a26359a$__90639fd0da0f906064015b602060405180830381865af4158015611204573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112289190612e5e565b90565b90612859565b81526020018681526020016112956112286112498690565b604051639fd0da0f60e01b8152600481018b905260ff8a1660248201526012604482015261122b9073__$508d1890a3ca5a531caf6f19bc5a26359a$__90639fd0da0f906064016111e9565b8152602001886001600160a01b031663175203196040518163ffffffff1660e01b8152600401602060405180830381865afa1580156112d6573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112fa9190612e5e565b8152602001886001600160a01b031663175203196040518163ffffffff1660e01b8152600401602060405180830381865afa15801561133b573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061135f9190612e5e565b8152602001886001600160a01b031663b5b995316040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113a0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906113c49190612e5e565b8152602001886001600160a01b031663b5b995316040518163ffffffff1660e01b8152600401602060405180830381865afa158015611405573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906114299190612e5e565b8152602001886001600160a01b031663ea21cd926040518163ffffffff1660e01b8152600401602060405180830381865afa15801561146a573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061148e9190612e5e565b8152602001886001600160a01b031663a2879e726040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114cf573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906114f39190612e5e565b8152602001886001600160a01b031663e5328e066040518163ffffffff1660e01b8152600401602060405180830381865afa158015611534573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906115589190612e5e565b8152602001886001600160a01b0316634113e5ca6040518163ffffffff1660e01b81526004015f60405180830381865afa158015611598573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526115bf9190810190612f2d565b90529998505050505050505050565b60605f5b8281101561166b576116098484838181106115ef576115ef612e95565b905060200201602081019061160491906129b3565b612755565b6116595783838281811061161f5761161f612e95565b905060200201602081019061163491906129b3565b60405163bfc6c33760e01b81526001600160a01b03909116600482015260240161059a565b8061166381612ed0565b9150506115d2565b505f8267ffffffffffffffff81111561168657611686612ee8565b60405190808252806020026020018201604052801561173e57816020015b61172b6040518061020001604052805f6001600160a01b031681526020015f6001600160a01b031681526020015f60ff168152602001606081526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f8152602001606081525090565b8152602001906001900390816116a45790505b5090506117c86040518061020001604052805f6001600160a01b031681526020015f6001600160a01b031681526020015f60ff168152602001606081526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f8152602001606081525090565b5f5b8481101561182f576117fc8686838181106117e7576117e7612e95565b90506020020160208101906101cb91906129b3565b91508183828151811061181157611811612e95565b6020026020010181905250808061182790612ed0565b9150506117ca565b50909150505b92915050565b61186e6040518060c001604052805f81526020015f81526020015f81526020015f81526020015f81526020015f81525090565b5f80808080808080805b600154811015611d4d576001818154811061189557611895612e95565b5f9182526020918290200154604080517f741bef1a00000000000000000000000000000000000000000000000000000000815290516001600160a01b039092169550859263741bef1a926004808401938290030181865afa1580156118fc573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906119209190612e43565b9150826001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561195e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906119829190612e43565b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156119bd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906119e19190612e75565b93505f611afc611a35846001600160a01b03166378334aee876001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ee4573d5f803e3d5ffd5b73__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f9091866001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015611a8d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611ab19190612e75565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925260ff166024820152601260448201526064016111e9565b9050611bb16112288261122b876001600160a01b0316636e4228316040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b44573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611b689190612e5e565b604051639fd0da0f60e01b8152600481019190915260ff8a1660248201526012604482015273__$508d1890a3ca5a531caf6f19bc5a26359a$__90639fd0da0f906064016111e9565b611bbb908b612ebd565b9950611c036112288261122b876001600160a01b03166369609c426040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b44573d5f803e3d5ffd5b611c0d908a612ebd565b9850611c556112288261122b876001600160a01b03166348a0d7546040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b44573d5f803e3d5ffd5b611c5f9089612ebd565b9750836001600160a01b031663a2879e726040518163ffffffff1660e01b8152600401602060405180830381865afa158015611c9d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611cc19190612e5e565b611ccb9088612ebd565b9650836001600160a01b031663e5328e066040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d09573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611d2d9190612e5e565b611d379087612ebd565b9550508080611d4590612ed0565b915050611878565b50506040805160c08101825297885260208801969096525050928401919091526060830152600154608083015260a0820152919050565b611d8c612710565b611d9581612755565b611dbd5760405163bfc6c33760e01b81526001600160a01b038216600482015260240161059a565b5f195f5b600154811015611e1757826001600160a01b031660018281548110611de857611de8612e95565b5f918252602090912001546001600160a01b031603611e05578091505b80611e0f81612ed0565b915050611dc1565b505f198114611f1d5760018054611e2f908290613069565b81548110611e3f57611e3f612e95565b5f91825260209091200154600180546001600160a01b039092169183908110611e6a57611e6a612e95565b905f5260205f20015f6101000a8154816001600160a01b0302191690836001600160a01b031602179055506001805480611ea657611ea661307c565b5f828152602080822083015f19908101805473ffffffffffffffffffffffffffffffffffffffff191690559092019092556001600160a01b03841680835260029091526040808320805460ff191690555133927fbca42998883c99594163ef018ddaa84f3a35589ac797ad4adf5827e66397bf9691a35b5050565b611f586040518060c001604052805f81526020015f81526020015f60ff1681526020015f81526020015f8152602001606081525090565b6040517fcd88e5580000000000000000000000000000000000000000000000000000000081526001600160a01b03838116600483015284915f9183169063cd88e55890602401602060405180830381865afa158015611fb9573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611fdd9190612e5e565b90505f826001600160a01b031663f8d898986040518163ffffffff1660e01b8152600401602060405180830381865afa15801561201c573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906120409190612e43565b6001600160a01b03166307a2d13a846001600160a01b031663f8d898986040518163ffffffff1660e01b8152600401602060405180830381865afa15801561208a573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906120ae9190612e43565b6040517f70a082310000000000000000000000000000000000000000000000000000000081526001600160a01b03898116600483015291909116906370a0823190602401602060405180830381865afa15801561210d573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906121319190612e5e565b6040518263ffffffff1660e01b815260040161214f91815260200190565b602060405180830381865afa15801561216a573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061218e9190612e5e565b6040517f8b96b2800000000000000000000000000000000000000000000000000000000081526001600160a01b0387811660048301529192505f91851690638b96b28090602401602060405180830381865afa1580156121f0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906122149190612e5e565b6040517fc28d21a30000000000000000000000000000000000000000000000000000000081526001600160a01b0388811660048301529192505f9186169063c28d21a390602401602060405180830381865afa158015612276573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061229a9190612e5e565b90505f856001600160a01b0316634113e5ca6040518163ffffffff1660e01b81526004015f60405180830381865afa1580156122d8573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526122ff9190810190612f2d565b90505f815167ffffffffffffffff81111561231c5761231c612ee8565b60405190808252806020026020018201604052801561238757816020015b6123746040518060a001604052805f6001600160a01b031681526020015f60ff1681526020015f81526020015f8152602001606081525090565b81526020019060019003908161233a5790505b5090505f805b83518110156125b7578381815181106123a8576123a8612e95565b602002602001015191505f826001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156123ef573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906124139190612e75565b6040517f151d70bb0000000000000000000000000000000000000000000000000000000081526001600160a01b038e8116600483015285811660248301529192505f918c169063151d70bb90604401602060405180830381865afa15801561247d573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906124a19190612e5e565b90505f6040518060a00160405280866001600160a01b031681526020018460ff1681526020018381526020018d6001600160a01b03166371c03e2a88866040518363ffffffff1660e01b815260040161250f9291906001600160a01b03929092168252602082015260400190565b602060405180830381865afa15801561252a573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061254e9190612e5e565b81526020015f60405190808252806020026020018201604052801561257d578160200160208202803683370190505b5081525090508086858151811061259657612596612e95565b602002602001018190525050505080806125af90612ed0565b91505061238d565b505f6040518060c001604052808981526020018881526020018a6001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561260c573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906126309190612e43565b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa15801561266b573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061268f9190612e75565b60ff168152602081019790975260408701959095525050606090930192909252979650505050505050565b6126c2612710565b6001600160a01b038116612704576040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081525f600482015260240161059a565b61270d816127bb565b50565b5f546001600160a01b03163314610bec576040517f118cdaa700000000000000000000000000000000000000000000000000000000815233600482015260240161059a565b5f805b6001548110156127b357826001600160a01b03166001828154811061277f5761277f612e95565b5f918252602090912001546001600160a01b0316036127a15750600192915050565b806127ab81612ed0565b915050612758565b505f92915050565b5f80546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f80821215612855576040517fa8ce44320000000000000000000000000000000000000000000000000000000081526004810183905260240161059a565b5090565b5f612867611228848461286e565b9392505050565b5f80805f19848609848602925082811083820303915050805f0361289f5750670de0b6b3a764000090049050611835565b670de0b6b3a764000081106128ea576040517f5173648d000000000000000000000000000000000000000000000000000000008152600481018690526024810185905260440161059a565b5f670de0b6b3a7640000858709620400008185030493109091037d40000000000000000000000000000000000000000000000000000000000002919091177faccb18165bd6fe31ae1cf318dc5b51eee0e1ba569b88cd74c1773b91fac106690291505092915050565b602080825282518282018190525f9190848201906040850190845b818110156129935783516001600160a01b03168352928401929184019160010161296e565b50909695505050505050565b6001600160a01b038116811461270d575f80fd5b5f602082840312156129c3575f80fd5b81356128678161299f565b5f80604083850312156129df575f80fd5b82356129ea8161299f565b9150602083013580151581146129fe575f80fd5b809150509250929050565b602080825282518282018190525f919060409081850190868401855b82811015612a7557815180516001600160a01b031685528681015160ff16878601528581015186860152606080820151908601526080908101519085015260a09093019290850190600101612a25565b5091979650505050505050565b5f5b83811015612a9c578181015183820152602001612a84565b50505f910152565b5f8151808452612abb816020860160208601612a82565b601f01601f19169290920160200192915050565b5f8151808452602080850194508084015f5b83811015612b065781516001600160a01b031687529582019590820190600101612ae1565b509495945050505050565b80516001600160a01b031682525f6102006020830151612b3c60208601826001600160a01b03169052565b506040830151612b51604086018260ff169052565b506060830151816060860152612b6982860182612aa4565b6080858101519087015260a0808601519087015260c0808601519087015260e08086015190870152610100808601519087015261012080860151908701526101408086015190870152610160808601519087015261018080860151908701526101a080860151908701526101c080860151908701526101e080860151878303828901529193509150612bfb8382612acf565b9695505050505050565b602081525f6128676020830184612b11565b5f8060208385031215612c28575f80fd5b823567ffffffffffffffff80821115612c3f575f80fd5b818501915085601f830112612c52575f80fd5b813581811115612c60575f80fd5b8660208260051b8501011115612c74575f80fd5b60209290920196919550909350505050565b5f602080830181845280855180835260408601915060408160051b87010192508387015f5b82811015612cf7577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0888603018452612ce5858351612b11565b94509285019290850190600101612cab565b5092979650505050505050565b5f8060408385031215612d15575f80fd5b8235612d208161299f565b915060208301356129fe8161299f565b5f602080835260e083018451828501528185015160408181870152808701519150606060ff8316818801528088015192506080838189015280890151935060a084818a0152808a0151945060c080818b01528686518089526101009850888c019150888160051b8d0101985089880197505f805b82811015612e30578d8b0360ff19018452895180516001600160a01b03168c528c81015160ff168d8d0152898101518a8d015288810151898d0152870151878c018790528051878d01819052908d01908390878e01905b80831015612e1b5783518252928f019260019290920191908f0190612dfb565b509c505050988b0198928b0192600101612da4565b50989d9c50505050505050505050505050565b5f60208284031215612e53575f80fd5b81516128678161299f565b5f60208284031215612e6e575f80fd5b5051919050565b5f60208284031215612e85575f80fd5b815160ff81168114612867575f80fd5b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b8082018082111561183557611835612ea9565b5f5f198203612ee157612ee1612ea9565b5060010190565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f1916810167ffffffffffffffff81118282101715612f2557612f25612ee8565b604052919050565b5f6020808385031215612f3e575f80fd5b825167ffffffffffffffff80821115612f55575f80fd5b818501915085601f830112612f68575f80fd5b815181811115612f7a57612f7a612ee8565b8060051b9150612f8b848301612efc565b8181529183018401918481019088841115612fa4575f80fd5b938501935b83851015612fce5784519250612fbe8361299f565b8282529385019390850190612fa9565b98975050505050505050565b5f60208284031215612fea575f80fd5b815167ffffffffffffffff80821115613001575f80fd5b818401915084601f830112613014575f80fd5b81518181111561302657613026612ee8565b6130396020601f19601f84011601612efc565b915080825285602082850101111561304f575f80fd5b613060816020840160208601612a82565b50949350505050565b8181038181111561183557611835612ea9565b634e487b7160e01b5f52603160045260245ffdfea2646970667358221220cf1cada3d365cde1709cb6b4dcc4ff940e8707f4907d32f5e10d69337e3165d364736f6c63430008140033";
var deployedBytecode$2 = "0x608060405234801561000f575f80fd5b50600436106100e5575f3560e01c80638ae9759511610088578063a96c00c111610063578063a96c00c114610217578063ada61cc31461021f578063cb925d1514610232578063f2fde38b14610252575f80fd5b80638ae97595146101bd5780638da5cb5b146101dd578063a931e993146101f7575f80fd5b80633526c0bd116100c35780633526c0bd1461017a57806352f72fe61461018d57806369d94d0c14610195578063715018a6146101b5575f80fd5b8063063eb469146100e95780630cf85bcc146101075780632ce962cf14610165575b5f80fd5b6100f1610265565b6040516100fe9190612953565b60405180910390f35b61011a6101153660046129b3565b6102c5565b6040516100fe91905f60c082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015292915050565b6101786101733660046129ce565b610565565b005b6101786101883660046129ce565b6105cd565b6100f16106ba565b6101a86101a33660046129b3565b61085b565b6040516100fe9190612a09565b610178610bdb565b6101d06101cb3660046129b3565b610bee565b6040516100fe9190612c05565b5f546040516001600160a01b0390911681526020016100fe565b61020a610205366004612c17565b6115ce565b6040516100fe9190612c86565b61011a61183b565b61017861022d3660046129b3565b611d84565b610245610240366004612d04565b611f21565b6040516100fe9190612d30565b6101786102603660046129b3565b6126ba565b606060018054806020026020016040519081016040528092919081815260200182805480156102bb57602002820191905f5260205f20905b81546001600160a01b0316815260019091019060200180831161029d575b5050505050905090565b6102f86040518060c001604052805f81526020015f81526020015f81526020015f81526020015f81526020015f81525090565b5f8290505f6040518060c00160405280836001600160a01b031663741bef1a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610344573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103689190612e43565b6001600160a01b03166378334aee856001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103b2573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103d69190612e43565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b1681526001600160a01b0390911660048201525f6024820152604401602060405180830381865afa158015610436573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061045a9190612e5e565b8152602001836001600160a01b031663741bef1a6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561049b573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104bf9190612e43565b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104fa573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061051e9190612e75565b60ff16815266071afd498d000060208201526a084595161401484a0000006040820152670d2f13f7789f0000606082015266b1a2bc2ec50000608090910152949350505050565b61056d612710565b61057682612755565b6105a35760405163bfc6c33760e01b81526001600160a01b03831660048201526024015b60405180910390fd5b6001600160a01b03919091165f908152600260205260409020805460ff1916911515919091179055565b6105d5612710565b6105de82612755565b15610620576040517f45ed80e90000000000000000000000000000000000000000000000000000000081526001600160a01b038316600482015260240161059a565b600180548082019091557fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091555f81815260026020526040808220805460ff1916851515179055513392917f26f4b31b7240e7422a9fe2ba5ce7684500302a536166d0ed481d7ad653ff25ab91a35050565b60605f805b60015481101561072b5760025f600183815481106106df576106df612e95565b5f9182526020808320909101546001600160a01b0316835282019290925260400190205460ff161561071957610716600183612ebd565b91505b8061072381612ed0565b9150506106bf565b50805f03610746575050604080515f81526020810190915290565b5f8167ffffffffffffffff81111561076057610760612ee8565b604051908082528060200260200182016040528015610789578160200160208202803683370190505b5090505f805b6001548110156108525760025f600183815481106107af576107af612e95565b5f9182526020808320909101546001600160a01b0316835282019290925260400190205460ff161561084057600181815481106107ee576107ee612e95565b5f918252602090912001546001600160a01b0316838361080d81612ed0565b94508151811061081f5761081f612e95565b60200260200101906001600160a01b031690816001600160a01b0316815250505b8061084a81612ed0565b91505061078f565b50909392505050565b60605f8290505f816001600160a01b0316634113e5ca6040518163ffffffff1660e01b81526004015f60405180830381865afa15801561089d573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526108c49190810190612f2d565b90505f80825167ffffffffffffffff8111156108e2576108e2612ee8565b60405190808252806020026020018201604052801561094c57816020015b6109396040518060a001604052805f6001600160a01b031681526020015f60ff1681526020015f81526020015f81526020015f81525090565b8152602001906001900390816109005790505b5090505f5b8351811015610bd15783818151811061096c5761096c612e95565b60209081029190910101516040517f656926810000000000000000000000000000000000000000000000000000000081526001600160a01b0380831660048301529194505f91871690636569268190602401602060405180830381865afa1580156109d9573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906109fd9190612e5e565b90506040518060a00160405280856001600160a01b03168152602001856001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a55573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610a799190612e75565b60ff16815260208101839052604080517f71c03e2a0000000000000000000000000000000000000000000000000000000081526001600160a01b038881166004830152602482018690529190920191908916906371c03e2a90604401602060405180830381865afa158015610af0573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610b149190612e5e565b81526040517ffbcc6f5e0000000000000000000000000000000000000000000000000000000081526001600160a01b03878116600483015260209092019189169063fbcc6f5e90602401602060405180830381865afa158015610b79573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610b9d9190612e5e565b815250838381518110610bb257610bb2612e95565b6020026020010181905250508080610bc990612ed0565b915050610951565b5095945050505050565b610be3612710565b610bec5f6127bb565b565b610c756040518061020001604052805f6001600160a01b031681526020015f6001600160a01b031681526020015f60ff168152602001606081526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f8152602001606081525090565b610c7e82612755565b610ca65760405163bfc6c33760e01b81526001600160a01b038316600482015260240161059a565b5f8290505f816001600160a01b0316636e4228316040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ce7573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d0b9190612e5e565b90505f826001600160a01b03166369609c426040518163ffffffff1660e01b8152600401602060405180830381865afa158015610d4a573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d6e9190612e5e565b90505f836001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610dad573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610dd19190612e43565b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e0c573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610e309190612e75565b90505f846001600160a01b031663741bef1a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e6f573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610e939190612e43565b90505f610f91826001600160a01b03166378334aee886001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ee4573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610f089190612e43565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b1681526001600160a01b0390911660048201525f6024820152604401602060405180830381865afa158015610f68573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610f8c9190612e5e565b612817565b73__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f9091846001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fe9573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061100d9190612e75565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925260ff16602482015260126044820152606401602060405180830381865af415801561106e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906110929190612e5e565b90505f6040518061020001604052808a6001600160a01b03168152602001886001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156110ec573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906111109190612e43565b6001600160a01b031681526020018560ff168152602001886001600160a01b031663f3f539ea6040518163ffffffff1660e01b81526004015f60405180830381865afa158015611162573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526111899190810190612fda565b81526020018781526020016112316112286111a18690565b604051639fd0da0f60e01b8152600481018c905260ff8a1660248201526012604482015261122b9073__$508d1890a3ca5a531caf6f19bc5a26359a$__90639fd0da0f906064015b602060405180830381865af4158015611204573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112289190612e5e565b90565b90612859565b81526020018681526020016112956112286112498690565b604051639fd0da0f60e01b8152600481018b905260ff8a1660248201526012604482015261122b9073__$508d1890a3ca5a531caf6f19bc5a26359a$__90639fd0da0f906064016111e9565b8152602001886001600160a01b031663175203196040518163ffffffff1660e01b8152600401602060405180830381865afa1580156112d6573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112fa9190612e5e565b8152602001886001600160a01b031663175203196040518163ffffffff1660e01b8152600401602060405180830381865afa15801561133b573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061135f9190612e5e565b8152602001886001600160a01b031663b5b995316040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113a0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906113c49190612e5e565b8152602001886001600160a01b031663b5b995316040518163ffffffff1660e01b8152600401602060405180830381865afa158015611405573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906114299190612e5e565b8152602001886001600160a01b031663ea21cd926040518163ffffffff1660e01b8152600401602060405180830381865afa15801561146a573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061148e9190612e5e565b8152602001886001600160a01b031663a2879e726040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114cf573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906114f39190612e5e565b8152602001886001600160a01b031663e5328e066040518163ffffffff1660e01b8152600401602060405180830381865afa158015611534573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906115589190612e5e565b8152602001886001600160a01b0316634113e5ca6040518163ffffffff1660e01b81526004015f60405180830381865afa158015611598573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526115bf9190810190612f2d565b90529998505050505050505050565b60605f5b8281101561166b576116098484838181106115ef576115ef612e95565b905060200201602081019061160491906129b3565b612755565b6116595783838281811061161f5761161f612e95565b905060200201602081019061163491906129b3565b60405163bfc6c33760e01b81526001600160a01b03909116600482015260240161059a565b8061166381612ed0565b9150506115d2565b505f8267ffffffffffffffff81111561168657611686612ee8565b60405190808252806020026020018201604052801561173e57816020015b61172b6040518061020001604052805f6001600160a01b031681526020015f6001600160a01b031681526020015f60ff168152602001606081526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f8152602001606081525090565b8152602001906001900390816116a45790505b5090506117c86040518061020001604052805f6001600160a01b031681526020015f6001600160a01b031681526020015f60ff168152602001606081526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f81526020015f8152602001606081525090565b5f5b8481101561182f576117fc8686838181106117e7576117e7612e95565b90506020020160208101906101cb91906129b3565b91508183828151811061181157611811612e95565b6020026020010181905250808061182790612ed0565b9150506117ca565b50909150505b92915050565b61186e6040518060c001604052805f81526020015f81526020015f81526020015f81526020015f81526020015f81525090565b5f80808080808080805b600154811015611d4d576001818154811061189557611895612e95565b5f9182526020918290200154604080517f741bef1a00000000000000000000000000000000000000000000000000000000815290516001600160a01b039092169550859263741bef1a926004808401938290030181865afa1580156118fc573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906119209190612e43565b9150826001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561195e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906119829190612e43565b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156119bd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906119e19190612e75565b93505f611afc611a35846001600160a01b03166378334aee876001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ee4573d5f803e3d5ffd5b73__$508d1890a3ca5a531caf6f19bc5a26359a$__639fd0da0f9091866001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015611a8d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611ab19190612e75565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925260ff166024820152601260448201526064016111e9565b9050611bb16112288261122b876001600160a01b0316636e4228316040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b44573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611b689190612e5e565b604051639fd0da0f60e01b8152600481019190915260ff8a1660248201526012604482015273__$508d1890a3ca5a531caf6f19bc5a26359a$__90639fd0da0f906064016111e9565b611bbb908b612ebd565b9950611c036112288261122b876001600160a01b03166369609c426040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b44573d5f803e3d5ffd5b611c0d908a612ebd565b9850611c556112288261122b876001600160a01b03166348a0d7546040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b44573d5f803e3d5ffd5b611c5f9089612ebd565b9750836001600160a01b031663a2879e726040518163ffffffff1660e01b8152600401602060405180830381865afa158015611c9d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611cc19190612e5e565b611ccb9088612ebd565b9650836001600160a01b031663e5328e066040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d09573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611d2d9190612e5e565b611d379087612ebd565b9550508080611d4590612ed0565b915050611878565b50506040805160c08101825297885260208801969096525050928401919091526060830152600154608083015260a0820152919050565b611d8c612710565b611d9581612755565b611dbd5760405163bfc6c33760e01b81526001600160a01b038216600482015260240161059a565b5f195f5b600154811015611e1757826001600160a01b031660018281548110611de857611de8612e95565b5f918252602090912001546001600160a01b031603611e05578091505b80611e0f81612ed0565b915050611dc1565b505f198114611f1d5760018054611e2f908290613069565b81548110611e3f57611e3f612e95565b5f91825260209091200154600180546001600160a01b039092169183908110611e6a57611e6a612e95565b905f5260205f20015f6101000a8154816001600160a01b0302191690836001600160a01b031602179055506001805480611ea657611ea661307c565b5f828152602080822083015f19908101805473ffffffffffffffffffffffffffffffffffffffff191690559092019092556001600160a01b03841680835260029091526040808320805460ff191690555133927fbca42998883c99594163ef018ddaa84f3a35589ac797ad4adf5827e66397bf9691a35b5050565b611f586040518060c001604052805f81526020015f81526020015f60ff1681526020015f81526020015f8152602001606081525090565b6040517fcd88e5580000000000000000000000000000000000000000000000000000000081526001600160a01b03838116600483015284915f9183169063cd88e55890602401602060405180830381865afa158015611fb9573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611fdd9190612e5e565b90505f826001600160a01b031663f8d898986040518163ffffffff1660e01b8152600401602060405180830381865afa15801561201c573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906120409190612e43565b6001600160a01b03166307a2d13a846001600160a01b031663f8d898986040518163ffffffff1660e01b8152600401602060405180830381865afa15801561208a573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906120ae9190612e43565b6040517f70a082310000000000000000000000000000000000000000000000000000000081526001600160a01b03898116600483015291909116906370a0823190602401602060405180830381865afa15801561210d573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906121319190612e5e565b6040518263ffffffff1660e01b815260040161214f91815260200190565b602060405180830381865afa15801561216a573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061218e9190612e5e565b6040517f8b96b2800000000000000000000000000000000000000000000000000000000081526001600160a01b0387811660048301529192505f91851690638b96b28090602401602060405180830381865afa1580156121f0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906122149190612e5e565b6040517fc28d21a30000000000000000000000000000000000000000000000000000000081526001600160a01b0388811660048301529192505f9186169063c28d21a390602401602060405180830381865afa158015612276573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061229a9190612e5e565b90505f856001600160a01b0316634113e5ca6040518163ffffffff1660e01b81526004015f60405180830381865afa1580156122d8573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526122ff9190810190612f2d565b90505f815167ffffffffffffffff81111561231c5761231c612ee8565b60405190808252806020026020018201604052801561238757816020015b6123746040518060a001604052805f6001600160a01b031681526020015f60ff1681526020015f81526020015f8152602001606081525090565b81526020019060019003908161233a5790505b5090505f805b83518110156125b7578381815181106123a8576123a8612e95565b602002602001015191505f826001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156123ef573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906124139190612e75565b6040517f151d70bb0000000000000000000000000000000000000000000000000000000081526001600160a01b038e8116600483015285811660248301529192505f918c169063151d70bb90604401602060405180830381865afa15801561247d573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906124a19190612e5e565b90505f6040518060a00160405280866001600160a01b031681526020018460ff1681526020018381526020018d6001600160a01b03166371c03e2a88866040518363ffffffff1660e01b815260040161250f9291906001600160a01b03929092168252602082015260400190565b602060405180830381865afa15801561252a573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061254e9190612e5e565b81526020015f60405190808252806020026020018201604052801561257d578160200160208202803683370190505b5081525090508086858151811061259657612596612e95565b602002602001018190525050505080806125af90612ed0565b91505061238d565b505f6040518060c001604052808981526020018881526020018a6001600160a01b0316635ed7453e6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561260c573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906126309190612e43565b6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa15801561266b573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061268f9190612e75565b60ff168152602081019790975260408701959095525050606090930192909252979650505050505050565b6126c2612710565b6001600160a01b038116612704576040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081525f600482015260240161059a565b61270d816127bb565b50565b5f546001600160a01b03163314610bec576040517f118cdaa700000000000000000000000000000000000000000000000000000000815233600482015260240161059a565b5f805b6001548110156127b357826001600160a01b03166001828154811061277f5761277f612e95565b5f918252602090912001546001600160a01b0316036127a15750600192915050565b806127ab81612ed0565b915050612758565b505f92915050565b5f80546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f80821215612855576040517fa8ce44320000000000000000000000000000000000000000000000000000000081526004810183905260240161059a565b5090565b5f612867611228848461286e565b9392505050565b5f80805f19848609848602925082811083820303915050805f0361289f5750670de0b6b3a764000090049050611835565b670de0b6b3a764000081106128ea576040517f5173648d000000000000000000000000000000000000000000000000000000008152600481018690526024810185905260440161059a565b5f670de0b6b3a7640000858709620400008185030493109091037d40000000000000000000000000000000000000000000000000000000000002919091177faccb18165bd6fe31ae1cf318dc5b51eee0e1ba569b88cd74c1773b91fac106690291505092915050565b602080825282518282018190525f9190848201906040850190845b818110156129935783516001600160a01b03168352928401929184019160010161296e565b50909695505050505050565b6001600160a01b038116811461270d575f80fd5b5f602082840312156129c3575f80fd5b81356128678161299f565b5f80604083850312156129df575f80fd5b82356129ea8161299f565b9150602083013580151581146129fe575f80fd5b809150509250929050565b602080825282518282018190525f919060409081850190868401855b82811015612a7557815180516001600160a01b031685528681015160ff16878601528581015186860152606080820151908601526080908101519085015260a09093019290850190600101612a25565b5091979650505050505050565b5f5b83811015612a9c578181015183820152602001612a84565b50505f910152565b5f8151808452612abb816020860160208601612a82565b601f01601f19169290920160200192915050565b5f8151808452602080850194508084015f5b83811015612b065781516001600160a01b031687529582019590820190600101612ae1565b509495945050505050565b80516001600160a01b031682525f6102006020830151612b3c60208601826001600160a01b03169052565b506040830151612b51604086018260ff169052565b506060830151816060860152612b6982860182612aa4565b6080858101519087015260a0808601519087015260c0808601519087015260e08086015190870152610100808601519087015261012080860151908701526101408086015190870152610160808601519087015261018080860151908701526101a080860151908701526101c080860151908701526101e080860151878303828901529193509150612bfb8382612acf565b9695505050505050565b602081525f6128676020830184612b11565b5f8060208385031215612c28575f80fd5b823567ffffffffffffffff80821115612c3f575f80fd5b818501915085601f830112612c52575f80fd5b813581811115612c60575f80fd5b8660208260051b8501011115612c74575f80fd5b60209290920196919550909350505050565b5f602080830181845280855180835260408601915060408160051b87010192508387015f5b82811015612cf7577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0888603018452612ce5858351612b11565b94509285019290850190600101612cab565b5092979650505050505050565b5f8060408385031215612d15575f80fd5b8235612d208161299f565b915060208301356129fe8161299f565b5f602080835260e083018451828501528185015160408181870152808701519150606060ff8316818801528088015192506080838189015280890151935060a084818a0152808a0151945060c080818b01528686518089526101009850888c019150888160051b8d0101985089880197505f805b82811015612e30578d8b0360ff19018452895180516001600160a01b03168c528c81015160ff168d8d0152898101518a8d015288810151898d0152870151878c018790528051878d01819052908d01908390878e01905b80831015612e1b5783518252928f019260019290920191908f0190612dfb565b509c505050988b0198928b0192600101612da4565b50989d9c50505050505050505050505050565b5f60208284031215612e53575f80fd5b81516128678161299f565b5f60208284031215612e6e575f80fd5b5051919050565b5f60208284031215612e85575f80fd5b815160ff81168114612867575f80fd5b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b8082018082111561183557611835612ea9565b5f5f198203612ee157612ee1612ea9565b5060010190565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f1916810167ffffffffffffffff81118282101715612f2557612f25612ee8565b604052919050565b5f6020808385031215612f3e575f80fd5b825167ffffffffffffffff80821115612f55575f80fd5b818501915085601f830112612f68575f80fd5b815181811115612f7a57612f7a612ee8565b8060051b9150612f8b848301612efc565b8181529183018401918481019088841115612fa4575f80fd5b938501935b83851015612fce5784519250612fbe8361299f565b8282529385019390850190612fa9565b98975050505050505050565b5f60208284031215612fea575f80fd5b815167ffffffffffffffff80821115613001575f80fd5b818401915084601f830112613014575f80fd5b81518181111561302657613026612ee8565b6130396020601f19601f84011601612efc565b915080825285602082850101111561304f575f80fd5b613060816020840160208601612a82565b50949350505050565b8181038181111561183557611835612ea9565b634e487b7160e01b5f52603160045260245ffdfea2646970667358221220cf1cada3d365cde1709cb6b4dcc4ff940e8707f4907d32f5e10d69337e3165d364736f6c63430008140033";
var linkReferences$2 = {
	"contracts/library/MathLib.sol": {
		MathLib: [
			{
				length: 20,
				start: 4244
			},
			{
				length: 20,
				start: 4812
			},
			{
				length: 20,
				start: 4980
			},
			{
				length: 20,
				start: 6968
			},
			{
				length: 20,
				start: 7312
			}
		]
	}
};
var deployedLinkReferences$2 = {
	"contracts/library/MathLib.sol": {
		MathLib: [
			{
				length: 20,
				start: 3987
			},
			{
				length: 20,
				start: 4555
			},
			{
				length: 20,
				start: 4723
			},
			{
				length: 20,
				start: 6711
			},
			{
				length: 20,
				start: 7055
			}
		]
	}
};
var LendingPoolLens = {
	_format: _format$2,
	contractName: contractName$2,
	sourceName: sourceName$2,
	abi: abi$2,
	bytecode: bytecode$2,
	deployedBytecode: deployedBytecode$2,
	linkReferences: linkReferences$2,
	deployedLinkReferences: deployedLinkReferences$2
};

var PoolLens = /*#__PURE__*/function () {
  function PoolLens(provider, address, signer) {
    this.provider = provider;
    this.address = address;
    this.signer = signer;
    this.initiateContract();
  }
  var _proto = PoolLens.prototype;
  _proto.initiateContract = function initiateContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.');
    }
    this.contract = new ethers.Contract(this.address, LendingPoolLens.abi, this.provider);
  };
  _proto.activePools = /*#__PURE__*/function () {
    var _activePools = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return this.contract.activePools();
          case 3:
            return _context.abrupt("return", _context.sent);
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            this.handleContractError(_context.t0, 'getting active pools');
            throw _context.t0;
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 6]]);
    }));
    function activePools() {
      return _activePools.apply(this, arguments);
    }
    return activePools;
  }();
  _proto.getAggregateStats = /*#__PURE__*/function () {
    var _getAggregateStats = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return this.contract.getAggregateStats();
          case 3:
            return _context2.abrupt("return", _context2.sent);
          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            this.handleContractError(_context2.t0, 'getting aggregate stats');
            throw _context2.t0;
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[0, 6]]);
    }));
    function getAggregateStats() {
      return _getAggregateStats.apply(this, arguments);
    }
    return getAggregateStats;
  }();
  _proto.getMarketInfo = /*#__PURE__*/function () {
    var _getMarketInfo = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(poolAddress) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return this.contract.getMarketInfo(poolAddress);
          case 3:
            return _context3.abrupt("return", _context3.sent);
          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            this.handleContractError(_context3.t0, 'getting market information');
            throw _context3.t0;
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[0, 6]]);
    }));
    function getMarketInfo(_x) {
      return _getMarketInfo.apply(this, arguments);
    }
    return getMarketInfo;
  }();
  _proto.getPoolAccountInfo = /*#__PURE__*/function () {
    var _getPoolAccountInfo = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(poolAddress, account) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return this.contract.getPoolAccountInfo(poolAddress, account);
          case 3:
            return _context4.abrupt("return", _context4.sent);
          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            this.handleContractError(_context4.t0, 'getting pool account information');
            throw _context4.t0;
          case 10:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[0, 6]]);
    }));
    function getPoolAccountInfo(_x2, _x3) {
      return _getPoolAccountInfo.apply(this, arguments);
    }
    return getPoolAccountInfo;
  }();
  _proto.getPoolCollateral = /*#__PURE__*/function () {
    var _getPoolCollateral = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(poolAddress) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return this.contract.getPoolCollateral(poolAddress);
          case 3:
            return _context5.abrupt("return", _context5.sent);
          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            this.handleContractError(_context5.t0, 'getting pool collateral');
            throw _context5.t0;
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this, [[0, 6]]);
    }));
    function getPoolCollateral(_x4) {
      return _getPoolCollateral.apply(this, arguments);
    }
    return getPoolCollateral;
  }();
  _proto.getPoolStats = /*#__PURE__*/function () {
    var _getPoolStats = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(poolAddress) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return this.contract.getPoolStats(poolAddress);
          case 3:
            return _context6.abrupt("return", _context6.sent);
          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            this.handleContractError(_context6.t0, 'getting pool stats');
            throw _context6.t0;
          case 10:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this, [[0, 6]]);
    }));
    function getPoolStats(_x5) {
      return _getPoolStats.apply(this, arguments);
    }
    return getPoolStats;
  }();
  _proto.getPoolStatsList = /*#__PURE__*/function () {
    var _getPoolStatsList = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(pools) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return this.contract.getPoolStatsList(pools);
          case 3:
            return _context7.abrupt("return", _context7.sent);
          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7["catch"](0);
            this.handleContractError(_context7.t0, 'getting pool stats');
            throw _context7.t0;
          case 10:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this, [[0, 6]]);
    }));
    function getPoolStatsList(_x6) {
      return _getPoolStatsList.apply(this, arguments);
    }
    return getPoolStatsList;
  }();
  _proto.owner = /*#__PURE__*/function () {
    var _owner = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return this.contract.owner();
          case 3:
            return _context8.abrupt("return", _context8.sent);
          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8["catch"](0);
            this.handleContractError(_context8.t0, 'getting owner');
            throw _context8.t0;
          case 10:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this, [[0, 6]]);
    }));
    function owner() {
      return _owner.apply(this, arguments);
    }
    return owner;
  }();
  _proto.registeredPools = /*#__PURE__*/function () {
    var _registeredPools = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return this.contract.connect(this.signer).registeredPools();
          case 3:
            return _context9.abrupt("return", _context9.sent);
          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9["catch"](0);
            this.handleContractError(_context9.t0, 'getting registered pool');
            throw _context9.t0;
          case 10:
          case "end":
            return _context9.stop();
        }
      }, _callee9, this, [[0, 6]]);
    }));
    function registeredPools() {
      return _registeredPools.apply(this, arguments);
    }
    return registeredPools;
  }();
  _proto.registerPool = /*#__PURE__*/function () {
    var _registerPool = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(pool, isActive) {
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return this.contract.connect(this.signer).registerPool(pool, isActive);
          case 3:
            _context10.next = 9;
            break;
          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            this.handleContractError(_context10.t0, 'getting registered pool');
            throw _context10.t0;
          case 9:
          case "end":
            return _context10.stop();
        }
      }, _callee10, this, [[0, 5]]);
    }));
    function registerPool(_x7, _x8) {
      return _registerPool.apply(this, arguments);
    }
    return registerPool;
  }();
  _proto.renounceOwnership = /*#__PURE__*/function () {
    var _renounceOwnership = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return this.contract.connect(this.signer).renounceOwnership();
          case 3:
            _context11.next = 9;
            break;
          case 5:
            _context11.prev = 5;
            _context11.t0 = _context11["catch"](0);
            this.handleContractError(_context11.t0, 'getting registered pool');
            throw _context11.t0;
          case 9:
          case "end":
            return _context11.stop();
        }
      }, _callee11, this, [[0, 5]]);
    }));
    function renounceOwnership() {
      return _renounceOwnership.apply(this, arguments);
    }
    return renounceOwnership;
  }();
  _proto.setActive = /*#__PURE__*/function () {
    var _setActive = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(pool, isActive) {
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return this.contract.connect(this.signer).setActive(pool, isActive);
          case 3:
            _context12.next = 9;
            break;
          case 5:
            _context12.prev = 5;
            _context12.t0 = _context12["catch"](0);
            this.handleContractError(_context12.t0, 'getting registered pool');
            throw _context12.t0;
          case 9:
          case "end":
            return _context12.stop();
        }
      }, _callee12, this, [[0, 5]]);
    }));
    function setActive(_x9, _x10) {
      return _setActive.apply(this, arguments);
    }
    return setActive;
  }();
  _proto.transferOwnership = /*#__PURE__*/function () {
    var _transferOwnership = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(newOwner) {
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return this.contract.connect(this.signer).transferOwnership(newOwner);
          case 3:
            _context13.next = 9;
            break;
          case 5:
            _context13.prev = 5;
            _context13.t0 = _context13["catch"](0);
            this.handleContractError(_context13.t0, 'getting registered pool');
            throw _context13.t0;
          case 9:
          case "end":
            return _context13.stop();
        }
      }, _callee13, this, [[0, 5]]);
    }));
    function transferOwnership(_x11) {
      return _transferOwnership.apply(this, arguments);
    }
    return transferOwnership;
  }();
  _proto.unregisterPool = /*#__PURE__*/function () {
    var _unregisterPool = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(pool) {
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return this.contract.connect(this.signer).unregisterPool(pool);
          case 3:
            _context14.next = 9;
            break;
          case 5:
            _context14.prev = 5;
            _context14.t0 = _context14["catch"](0);
            this.handleContractError(_context14.t0, 'getting registered pool');
            throw _context14.t0;
          case 9:
          case "end":
            return _context14.stop();
        }
      }, _callee14, this, [[0, 5]]);
    }));
    function unregisterPool(_x12) {
      return _unregisterPool.apply(this, arguments);
    }
    return unregisterPool;
  }();
  _proto.handleContractError = function handleContractError(error, message) {
    console.error("Error in " + message + ":", error);
  };
  return PoolLens;
}();

var Chedda = /*#__PURE__*/function () {
  function Chedda(provider) {
    this.provider = new ethers.providers.WebSocketProvider(provider);
  }
  var _proto = Chedda.prototype;
  _proto.lendingPool = function lendingPool(address, signer) {
    return new LendingPool(this.provider, address, signer);
  };
  _proto.erc20token = function erc20token(address, signer) {
    return new ERC20Token(this.provider, address, signer);
  };
  _proto.poolLens = function poolLens(address, signer) {
    return new PoolLens(this.provider, address, signer);
  };
  _proto.priceOracle = function priceOracle() {
    return new PriceOracle(this.provider);
  };
  _proto.closeProvider = function closeProvider() {
    this.provider.destroy();
  };
  return Chedda;
}();

var TokenType;
(function (TokenType) {
  TokenType[TokenType["ERC20"] = 0] = "ERC20";
  TokenType[TokenType["ERC721"] = 1] = "ERC721";
  TokenType[TokenType["ERC1155"] = 2] = "ERC1155";
})(TokenType || (TokenType = {}));

export { Chedda };
//# sourceMappingURL=chedda-sdk.esm.js.map
