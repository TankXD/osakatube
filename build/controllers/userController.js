"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGithubLogin = exports.seeUser = exports.postLogin = exports.postJoin = exports.postEditUser = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEditUser = exports.getChangePassword = exports.finishGithubLogin = void 0;
var _user = _interopRequireDefault(require("../models/user"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _morgan = require("morgan");
var _video = _interopRequireDefault(require("../models/video"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// 같은 js라고해도 백엔드에서 fetch는 원래 못쓰기때문에 node-fetch를 패키지를 받아야함.
// 주의점은 그냥 npm i node-fetch로 하면 버전3이상이 다운로드 되는데, 3점대는 오류가 발생한다.
// npm install node-fetch@2.6.1 를입력해서 버전2를 받는 것이 좋다.

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};
exports.getJoin = getJoin;
var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, name, email, username, password, password2, location, pageTitle, usernameExists, emailExists;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, password = _req$body.password, password2 = _req$body.password2, location = _req$body.location;
            pageTitle = "Join";
            if (!(password !== password2)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", res.status(400).render("join", {
              // status(400)을 보내주는 이유는 status(400)을 보내지 않은 경우 웹사이트의 경우 이 작업이 오류가 났는지 모른다.
              // 그러면 비밀번호를 저장할까요?라거나 오류가 뜬 페이지도 브라우저는 정상적으로 200status(정상) 신호를 받고
              // 접속기록을 남긴다. 이 작업이 없다고해서 큰 문제가 생기진 않지만, 가급적 해주는 것이 좋다.
              pageTitle: pageTitle,
              errorMessage: "Password confirmation does not match"
            }));
          case 4:
            _context.next = 6;
            return _user["default"].exists({
              username: username
            });
          case 6:
            usernameExists = _context.sent;
            if (!usernameExists) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "This username is already taken"
            }));
          case 9:
            _context.next = 11;
            return _user["default"].exists({
              email: email
            });
          case 11:
            emailExists = _context.sent;
            if (!emailExists) {
              _context.next = 14;
              break;
            }
            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "This email is already taken"
            }));
          case 14:
            _context.prev = 14;
            _context.next = 17;
            return _user["default"].create({
              name: name,
              email: email,
              username: username,
              password: password,
              location: location
            });
          case 17:
            return _context.abrupt("return", res.redirect("/login"));
          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](14);
            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: _context.t0._message
            }));
          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[14, 20]]);
  }));
  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.postJoin = postJoin;
var getLogin = function getLogin(req, res) {
  res.render("login", {
    pageTitle: "Login"
  });
};
exports.getLogin = getLogin;
var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, username, password, user, ok;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            _context2.next = 3;
            return _user["default"].findOne({
              username: username
            });
          case 3:
            user = _context2.sent;
            if (user) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: "Login",
              errorMessage: "An account with this username does not exists"
            }));
          case 6:
            if (!(user.socialOnly === true)) {
              _context2.next = 8;
              break;
            }
            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: "Login",
              errorMessage: "This ID is for social login only"
            }));
          case 8:
            _context2.next = 10;
            return _bcrypt["default"].compare(password, user.password);
          case 10:
            ok = _context2.sent;
            if (ok) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: "Login",
              errorMessage: "Wrong password"
            }));
          case 13:
            console.log("Log user in");
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect("/"));
          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.postLogin = postLogin;
var startGithubLogin = function startGithubLogin(req, res) {
  var baseUrl = "https://github.com/login/oauth/authorize";
  var config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var params = new URLSearchParams(config).toString();
  var finalUrl = "".concat(baseUrl, "?").concat(params);
  return res.redirect(finalUrl);
};
exports.startGithubLogin = startGithubLogin;
var finishGithubLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var baseUrl, config, params, finalUrl, tokenRequest, access_token, apiUrl, userData, emailData, emailObj, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            baseUrl = "https://github.com/login/oauth/access_token";
            config = {
              client_id: process.env.GH_CLIENT,
              client_secret: process.env.GH_SECRET,
              code: req.query.code
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params); // fetch메소드를 통해서, finalUrl에 POST요청을 보낸다.
            // await fetch을 써서 json파일을 가져오는 방식이 fetch().then보다 가독성이 좋다.
            _context3.next = 6;
            return (0, _nodeFetch["default"])(finalUrl, {
              method: "POST",
              headers: {
                Accept: "application/json"
                // 이 부분을 입력해줘야 text가 아닌 json형식으로 데이터를 반환받을 수 있다.
              }
            });
          case 6:
            _context3.next = 8;
            return _context3.sent.json();
          case 8:
            tokenRequest = _context3.sent;
            if (!("access_token" in tokenRequest)) {
              _context3.next = 37;
              break;
            }
            access_token = tokenRequest.access_token;
            apiUrl = "https://api.github.com/";
            _context3.next = 14;
            return (0, _nodeFetch["default"])("https://api.github.com/user", {
              headers: {
                Authorization: "Bearer ".concat(access_token)
              }
            });
          case 14:
            _context3.next = 16;
            return _context3.sent.json();
          case 16:
            userData = _context3.sent;
            _context3.next = 19;
            return (0, _nodeFetch["default"])("https://api.github.com/user/emails", {
              headers: {
                Authorization: "Bearer ".concat(access_token)
              }
            });
          case 19:
            _context3.next = 21;
            return _context3.sent.json();
          case 21:
            emailData = _context3.sent;
            emailObj = emailData.find(function (email) {
              return email.primary === true && email.verified === true;
            });
            if (emailObj) {
              _context3.next = 25;
              break;
            }
            return _context3.abrupt("return", res.redirect("/login"));
          case 25:
            _context3.next = 27;
            return _user["default"].findOne({
              email: emailObj.email
            });
          case 27:
            user = _context3.sent;
            if (user) {
              _context3.next = 32;
              break;
            }
            _context3.next = 31;
            return _user["default"].create({
              name: userData.name ? userData.name : "Unknown",
              avatarUrl: userData.avatar_url,
              socialOnly: true,
              username: userData.login,
              email: emailObj.email,
              password: "",
              location: userData.location
            });
          case 31:
            user = _context3.sent;
          case 32:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context3.abrupt("return", res.redirect("/"));
          case 37:
            return _context3.abrupt("return", res.redirect("/login"));
          case 38:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function finishGithubLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.finishGithubLogin = finishGithubLogin;
var logout = function logout(req, res) {
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};
exports.logout = logout;
var getEditUser = function getEditUser(req, res) {
  res.render("edit-profile", {
    pageTitle: "Edit User"
  });
};
exports.getEditUser = getEditUser;
var postEditUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$session$user, _id, avatarUrl, _req$body3, name, username, email, location, file, findEnteredUsername, usernameExists, findEnteredEmail, emailExists, updatedUser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, _req$body3 = req.body, name = _req$body3.name, username = _req$body3.username, email = _req$body3.email, location = _req$body3.location, file = req.file;
            console.log(file);
            _context4.next = 4;
            return _user["default"].findOne({
              username: username
            });
          case 4:
            findEnteredUsername = _context4.sent;
            if (!findEnteredUsername) {
              _context4.next = 9;
              break;
            }
            usernameExists = findEnteredUsername._id != _id;
            if (!usernameExists) {
              _context4.next = 9;
              break;
            }
            return _context4.abrupt("return", res.status(400).render("edit-profile", {
              errorMessage: "username is already Exists"
            }));
          case 9:
            _context4.next = 11;
            return _user["default"].findOne({
              email: email
            });
          case 11:
            findEnteredEmail = _context4.sent;
            if (!findEnteredEmail) {
              _context4.next = 16;
              break;
            }
            emailExists = findEnteredEmail._id != _id;
            if (!emailExists) {
              _context4.next = 16;
              break;
            }
            return _context4.abrupt("return", res.status(400).render("edit-profile", {
              errorMessage: "email is already Exists"
            }));
          case 16:
            _context4.next = 18;
            return _user["default"].findByIdAndUpdate(_id, {
              avatarUrl: file ? file.path : avatarUrl,
              username: username,
              email: email,
              location: location
            }, {
              "new": true
            }
            // new:true설정을 안해두면 모델.findByIdAndUpdate메소드는 업데이트 되기 전의 정보를 반환해줌.
            // new:true를 설정해두면 업데이트된 후의 데이터를 반환해준다.
            );
          case 18:
            updatedUser = _context4.sent;
            req.session.user = updatedUser;
            return _context4.abrupt("return", res.redirect("/users/edit"));
          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function postEditUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.postEditUser = postEditUser;
var getChangePassword = function getChangePassword(req, res) {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Can't change password.");
    return res.redirect("/");
  }
  return res.render("change-password", {
    pageTitle: "Change Password"
  });
};
exports.getChangePassword = getChangePassword;
var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _id, _req$body4, oldPassword, newPassword, newPasswordConfirmation, user, ok;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.session.user._id, _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPasswordConfirmation = _req$body4.newPasswordConfirmation;
            _context5.next = 3;
            return _user["default"].findById(_id);
          case 3:
            user = _context5.sent;
            _context5.next = 6;
            return _bcrypt["default"].compare(oldPassword, user.password);
          case 6:
            ok = _context5.sent;
            if (ok) {
              _context5.next = 9;
              break;
            }
            return _context5.abrupt("return", res.status(400).render("change-password", {
              pageTitle: "Change Password",
              errorMessage: "The current password is incoreect"
            }));
          case 9:
            if (!(newPassword !== newPasswordConfirmation)) {
              _context5.next = 11;
              break;
            }
            return _context5.abrupt("return", res.status(400).render("change-password", {
              pageTitle: "Change Password",
              errorMessage: "The password does not match the confirmation"
            }));
          case 11:
            user.password = newPassword;
            _context5.next = 14;
            return user.save();
          case 14:
            req.flash("info", "Password Updated");
            req.session.destroy();
            return _context5.abrupt("return", res.redirect("/login"));
          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function postChangePassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.postChangePassword = postChangePassword;
var seeUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.next = 3;
            return _user["default"].findById(id).populate({
              path: "videos",
              populate: {
                path: "owner",
                model: "User"
              }
            });
          case 3:
            user = _context6.sent;
            if (user) {
              _context6.next = 6;
              break;
            }
            return _context6.abrupt("return", res.status(404).render("404", {
              pageTitle: "User not found."
            }));
          case 6:
            return _context6.abrupt("return", res.render("users/profile", {
              pageTitle: "".concat(user.name, "\u306EProfile"),
              user: user
            }));
          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function seeUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.seeUser = seeUser;