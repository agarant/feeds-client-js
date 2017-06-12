(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.PusherFeeds = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var pusherPlatform = createCommonjsModule(function (module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
        module.exports = factory();
    })(commonjsGlobal, function () {
        return (/******/function (modules) {
                // webpackBootstrap
                /******/ // The module cache
                /******/var installedModules = {};
                /******/
                /******/ // The require function
                /******/function __webpack_require__(moduleId) {
                    /******/
                    /******/ // Check if module is in cache
                    /******/if (installedModules[moduleId]) {
                        /******/return installedModules[moduleId].exports;
                        /******/
                    }
                    /******/ // Create a new module (and put it into the cache)
                    /******/var module = installedModules[moduleId] = {
                        /******/i: moduleId,
                        /******/l: false,
                        /******/exports: {}
                        /******/ };
                    /******/
                    /******/ // Execute the module function
                    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                    /******/
                    /******/ // Flag the module as loaded
                    /******/module.l = true;
                    /******/
                    /******/ // Return the exports of the module
                    /******/return module.exports;
                    /******/
                }
                /******/
                /******/
                /******/ // expose the modules object (__webpack_modules__)
                /******/__webpack_require__.m = modules;
                /******/
                /******/ // expose the module cache
                /******/__webpack_require__.c = installedModules;
                /******/
                /******/ // identity function for calling harmony imports with the correct context
                /******/__webpack_require__.i = function (value) {
                    return value;
                };
                /******/
                /******/ // define getter function for harmony exports
                /******/__webpack_require__.d = function (exports, name, getter) {
                    /******/if (!__webpack_require__.o(exports, name)) {
                        /******/Object.defineProperty(exports, name, {
                            /******/configurable: false,
                            /******/enumerable: true,
                            /******/get: getter
                            /******/ });
                        /******/
                    }
                    /******/
                };
                /******/
                /******/ // getDefaultExport function for compatibility with non-harmony modules
                /******/__webpack_require__.n = function (module) {
                    /******/var getter = module && module.__esModule ?
                    /******/function getDefault() {
                        return module['default'];
                    } :
                    /******/function getModuleExports() {
                        return module;
                    };
                    /******/__webpack_require__.d(getter, 'a', getter);
                    /******/return getter;
                    /******/
                };
                /******/
                /******/ // Object.prototype.hasOwnProperty.call
                /******/__webpack_require__.o = function (object, property) {
                    return Object.prototype.hasOwnProperty.call(object, property);
                };
                /******/
                /******/ // __webpack_public_path__
                /******/__webpack_require__.p = "";
                /******/
                /******/ // Load entry module and return exports
                /******/return __webpack_require__(__webpack_require__.s = 2);
                /******/
            }(
            /************************************************************************/
            /******/[
            /* 0 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var subscription_1 = __webpack_require__(1);
                var resumable_subscription_1 = __webpack_require__(3);
                function responseHeadersObj(headerStr) {
                    var headers = {};
                    if (!headerStr) {
                        return headers;
                    }
                    var headerPairs = headerStr.split('\u000d\u000a');
                    for (var i = 0; i < headerPairs.length; i++) {
                        var headerPair = headerPairs[i];
                        var index = headerPair.indexOf('\u003a\u0020');
                        if (index > 0) {
                            var key = headerPair.substring(0, index);
                            var val = headerPair.substring(index + 2);
                            headers[key] = val;
                        }
                    }
                    return headers;
                }
                exports.responseHeadersObj = responseHeadersObj;
                var ErrorResponse = function () {
                    function ErrorResponse(xhr) {
                        this.statusCode = xhr.status;
                        this.headers = responseHeadersObj(xhr.getAllResponseHeaders());
                        this.info = xhr.responseText;
                    }
                    return ErrorResponse;
                }();
                exports.ErrorResponse = ErrorResponse;
                // Follows https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
                var XhrReadyState;
                (function (XhrReadyState) {
                    XhrReadyState[XhrReadyState["UNSENT"] = 0] = "UNSENT";
                    XhrReadyState[XhrReadyState["OPENED"] = 1] = "OPENED";
                    XhrReadyState[XhrReadyState["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
                    XhrReadyState[XhrReadyState["LOADING"] = 3] = "LOADING";
                    XhrReadyState[XhrReadyState["DONE"] = 4] = "DONE";
                })(XhrReadyState = exports.XhrReadyState || (exports.XhrReadyState = {}));
                var BaseClient = function () {
                    function BaseClient(options) {
                        this.options = options;
                        var cluster = options.cluster.replace(/\/$/, '');
                        this.baseURL = (options.encrypted !== false ? "https" : "http") + "://" + cluster;
                        this.XMLHttpRequest = options.XMLHttpRequest || window.XMLHttpRequest;
                    }
                    BaseClient.prototype.request = function (options) {
                        var xhr = this.createXHR(this.baseURL, options);
                        return new Promise(function (resolve, reject) {
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4) {
                                    if (xhr.status === 200) {
                                        resolve(xhr.responseText);
                                    } else {
                                        reject(new ErrorResponse(xhr));
                                    }
                                }
                            };
                            xhr.send(JSON.stringify(options.body));
                        });
                    };
                    BaseClient.prototype.newSubscription = function (subOptions) {
                        return new subscription_1.Subscription(this.createXHR(this.baseURL, {
                            method: "SUBSCRIBE",
                            path: subOptions.path,
                            headers: {},
                            body: null
                        }), subOptions);
                    };
                    BaseClient.prototype.newResumableSubscription = function (subOptions) {
                        var _this = this;
                        return new resumable_subscription_1.ResumableSubscription(function () {
                            return _this.createXHR(_this.baseURL, {
                                method: "SUBSCRIBE",
                                path: subOptions.path,
                                headers: {},
                                body: null
                            });
                        }, subOptions);
                    };
                    BaseClient.prototype.createXHR = function (baseURL, options) {
                        var XMLHttpRequest = this.XMLHttpRequest;
                        var xhr = new XMLHttpRequest();
                        var path = options.path.replace(/^\/+/, "");
                        var endpoint = baseURL + "/" + path;
                        xhr.open(options.method.toUpperCase(), endpoint, true);
                        if (options.body) {
                            xhr.setRequestHeader("content-type", "application/json");
                        }
                        if (options.jwt) {
                            xhr.setRequestHeader("authorization", "Bearer " + options.jwt);
                        }
                        for (var key in options.headers) {
                            xhr.setRequestHeader(key, options.headers[key]);
                        }
                        return xhr;
                    };
                    return BaseClient;
                }();
                exports.BaseClient = BaseClient;

                /***/
            },
            /* 1 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var base_client_1 = __webpack_require__(0);
                var SubscriptionState;
                (function (SubscriptionState) {
                    SubscriptionState[SubscriptionState["UNOPENED"] = 0] = "UNOPENED";
                    SubscriptionState[SubscriptionState["OPENING"] = 1] = "OPENING";
                    SubscriptionState[SubscriptionState["OPEN"] = 2] = "OPEN";
                    SubscriptionState[SubscriptionState["ENDING"] = 3] = "ENDING";
                    SubscriptionState[SubscriptionState["ENDED"] = 4] = "ENDED"; // called onEnd() or onError(err)
                })(SubscriptionState = exports.SubscriptionState || (exports.SubscriptionState = {}));
                // Asserts that the subscription state is one of the specified values,
                // otherwise logs the current value.
                function assertState(stateEnum, states) {
                    var _this = this;
                    if (states === void 0) {
                        states = [];
                    }
                    var check = states.some(function (state) {
                        return stateEnum[state] === _this.state;
                    });
                    var expected = states.join(', ');
                    var actual = stateEnum[this.state];
                    console.assert(check, "Expected this.state to be " + expected + " but it is " + actual);
                    if (!check) {
                        console.trace();
                    }
                }
                exports.assertState = assertState;
                
                // Callback pattern: (onOpen onEvent* (onEnd|onError)) | onError
                // A call to `unsubscribe()` will call `options.onEnd()`;
                // a call to `unsubscribe(someError)` will call `options.onError(someError)`.
                var Subscription = function () {
                    function Subscription(xhr, options) {
                        var _this = this;
                        this.xhr = xhr;
                        this.options = options;
                        this.state = SubscriptionState.UNOPENED;
                        this.gotEOS = false;
                        this.lastNewlineIndex = 0;
                        this.assertState = assertState.bind(this, SubscriptionState);
                        if (options.lastEventId) {
                            this.xhr.setRequestHeader("Last-Event-Id", options.lastEventId);
                        }
                        this.xhr.onreadystatechange = function () {
                            if (_this.xhr.readyState === base_client_1.XhrReadyState.UNSENT || _this.xhr.readyState === base_client_1.XhrReadyState.OPENED || _this.xhr.readyState === base_client_1.XhrReadyState.HEADERS_RECEIVED) {
                                // Too early for us to do anything.
                                _this.assertState(['OPENING']);
                            } else if (_this.xhr.readyState === base_client_1.XhrReadyState.LOADING) {
                                // The headers have loaded and we have partial body text.
                                // We can get this one multiple times.
                                _this.assertState(['OPENING', 'OPEN', 'ENDING']);
                                if (_this.xhr.status === 200) {
                                    // We've received a successful response header.
                                    // The partial body text is a partial JSON message stream.
                                    if (_this.state === SubscriptionState.OPENING) {
                                        _this.state = SubscriptionState.OPEN;
                                        if (_this.options.onOpen) {
                                            _this.options.onOpen();
                                        }
                                    }
                                    _this.assertState(['OPEN', 'ENDING']);
                                    var err = _this.onChunk(); // might transition our state from OPEN -> ENDING
                                    _this.assertState(['OPEN', 'ENDING']);
                                    if (err != null) {
                                        _this.xhr.abort();
                                        // Because we abort()ed, we will get no more calls to our onreadystatechange handler,
                                        // and so we will not call the event handler again.
                                        // Finish with options.onError instead of the options.onEnd.
                                        _this.state = SubscriptionState.ENDED;
                                        if (_this.options.onError) {
                                            _this.options.onError(err);
                                        }
                                    } else {
                                        // We consumed some response text, and all's fine. We expect more text.
                                    }
                                } else {
                                    // Error response. Wait until the response completes (state 4) before erroring.
                                    _this.assertState(['OPENING']);
                                }
                            } else if (_this.xhr.readyState === base_client_1.XhrReadyState.DONE) {
                                // This is the last time onreadystatechange is called.
                                if (_this.xhr.status === 200) {
                                    if (_this.state === SubscriptionState.OPENING) {
                                        _this.state = SubscriptionState.OPEN;
                                        if (_this.options.onOpen) {
                                            _this.options.onOpen();
                                        }
                                    }
                                    _this.assertState(['OPEN', 'ENDING']);
                                    var err = _this.onChunk();
                                    if (err !== null && err !== undefined) {
                                        _this.state = SubscriptionState.ENDED;
                                        if (_this.options.onError) {
                                            _this.options.onError(err);
                                        }
                                    } else if (_this.state !== SubscriptionState.ENDING) {
                                        if (_this.options.onError) {
                                            _this.options.onError(new Error("HTTP response ended without receiving EOS message"));
                                        }
                                    } else {
                                        // Stream ended normally.
                                        if (_this.options.onEnd) {
                                            _this.options.onEnd();
                                        }
                                    }
                                } else {
                                    // The server responded with a bad status code (finish with onError).
                                    // Finish with an error.
                                    _this.assertState(['OPENING', 'OPEN', 'ENDED']);
                                    if (_this.state === SubscriptionState.ENDED) {
                                        // We aborted the request deliberately, and called onError/onEnd elsewhere.
                                    } else {
                                        // The server
                                        if (_this.options.onError) {
                                            _this.options.onError(new Error("error from server: " + _this.xhr.responseText));
                                        }
                                    }
                                }
                            }
                        };
                        xhr.onerror = function () {
                            if (_this.options.onError) {
                                _this.options.onError(new Error("resumable"));
                            }
                        };
                    }
                    Subscription.prototype.open = function (jwt) {
                        if (this.state !== SubscriptionState.UNOPENED) {
                            throw new Error("Called .open() on Subscription object in unexpected state: " + this.state);
                        }
                        this.state = SubscriptionState.OPENING;
                        if (jwt) {
                            this.xhr.setRequestHeader("authorization", "Bearer " + jwt);
                        }
                        this.xhr.send();
                    };
                    // calls options.onEvent 0+ times, then possibly returns an error.
                    // idempotent.
                    Subscription.prototype.onChunk = function () {
                        this.assertState(['OPEN']);
                        var response = this.xhr.responseText;
                        var newlineIndex = response.lastIndexOf("\n");
                        if (newlineIndex > this.lastNewlineIndex) {
                            var rawEvents = response.slice(this.lastNewlineIndex, newlineIndex).split("\n");
                            this.lastNewlineIndex = newlineIndex;
                            for (var _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
                                var rawEvent = rawEvents_1[_i];
                                if (rawEvent.length === 0) {
                                    continue; // FIXME why? This should be a protocol error
                                }
                                var data = JSON.parse(rawEvent);
                                var err = this.onMessage(data);
                                if (err != null) {
                                    return err;
                                }
                            }
                        }
                    };
                    // calls options.onEvent 0+ times, then returns an Error or null
                    Subscription.prototype.onMessage = function (message) {
                        this.assertState(['OPEN']);
                        if (this.gotEOS) {
                            return new Error("Got another message after EOS message");
                        }
                        if (!Array.isArray(message)) {
                            return new Error("Message is not an array");
                        }
                        if (message.length < 1) {
                            return new Error("Message is empty array");
                        }
                        switch (message[0]) {
                            case 0:
                                return null;
                            case 1:
                                return this.onEventMessage(message);
                            case 255:
                                return this.onEOSMessage(message);
                            default:
                                return new Error("Unknown Message: " + JSON.stringify(message));
                        }
                    };
                    // EITHER calls options.onEvent, OR returns an error
                    Subscription.prototype.onEventMessage = function (eventMessage) {
                        this.assertState(['OPEN']);
                        if (eventMessage.length !== 4) {
                            return new Error("Event message has " + eventMessage.length + " elements (expected 4)");
                        }
                        var _ = eventMessage[0],
                            id = eventMessage[1],
                            headers = eventMessage[2],
                            body = eventMessage[3];
                        if (typeof id !== "string") {
                            return new Error("Invalid event ID in message: " + JSON.stringify(eventMessage));
                        }
                        if (typeof headers !== "object" || Array.isArray(headers)) {
                            return new Error("Invalid event headers in message: " + JSON.stringify(eventMessage));
                        }
                        if (this.options.onEvent) {
                            this.options.onEvent({ eventId: id, headers: headers, body: body });
                        }
                    };
                    // calls options.onEvent 0+ times, then possibly returns an error
                    Subscription.prototype.onEOSMessage = function (eosMessage) {
                        this.assertState(['OPEN']);
                        if (eosMessage.length !== 4) {
                            return new Error("EOS message has " + eosMessage.length + " elements (expected 4)");
                        }
                        var _ = eosMessage[0],
                            statusCode = eosMessage[1],
                            headers = eosMessage[2],
                            info = eosMessage[3];
                        if (typeof statusCode !== "number") {
                            return new Error("Invalid EOS Status Code");
                        }
                        if (typeof headers !== "object" || Array.isArray(headers)) {
                            return new Error("Invalid EOS Headers");
                        }
                        this.state = SubscriptionState.ENDING;
                    };
                    Subscription.prototype.unsubscribe = function (err) {
                        this.state = SubscriptionState.ENDED;
                        this.xhr.abort();
                        if (err) {
                            if (this.options.onError) {
                                this.options.onError(err);
                            }
                        } else {
                            if (this.options.onEnd) {
                                this.options.onEnd();
                            }
                        }
                    };
                    return Subscription;
                }();
                exports.Subscription = Subscription;

                /***/
            },
            /* 2 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                var __assign = this && this.__assign || Object.assign || function (t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                Object.defineProperty(exports, "__esModule", { value: true });
                var base_client_1 = __webpack_require__(0);
                var DEFAULT_CLUSTER = "api-ceres.kube.pusherplatform.io";
                var App = function () {
                    function App(options) {
                        this.appId = options.appId;
                        this.authorizer = options.authorizer;
                        this.client = options.client || new base_client_1.BaseClient({
                            cluster: options.cluster || DEFAULT_CLUSTER,
                            encrypted: options.encrypted
                        });
                    }
                    App.prototype.request = function (options) {
                        var _this = this;
                        options.path = this.absPath(options.path);
                        var authorizer = options.authorizer || this.authorizer;
                        if (!options.jwt && authorizer) {
                            return authorizer.authorize().then(function (jwt) {
                                return _this.client.request(__assign({ jwt: jwt }, options));
                            });
                        } else {
                            return this.client.request(options);
                        }
                    };
                    App.prototype.subscribe = function (options) {
                        options.path = this.absPath(options.path);
                        var subscription = this.client.newSubscription(options);
                        var authorizer = options.authorizer || this.authorizer;
                        if (options.jwt) {
                            subscription.open(options.jwt);
                        } else if (authorizer) {
                            authorizer.authorize().then(function (jwt) {
                                subscription.open(jwt);
                            }).catch(function (err) {
                                subscription.unsubscribe(err);
                            });
                        } else {
                            subscription.open(null);
                        }
                        return subscription;
                    };
                    App.prototype.resumableSubscribe = function (options) {
                        options.path = this.absPath(options.path);
                        var authorizer = options.authorizer || this.authorizer;
                        var resumableSubscription = this.client.newResumableSubscription(__assign({ authorizer: authorizer }, options));
                        resumableSubscription.open();
                        return resumableSubscription;
                    };
                    App.prototype.absPath = function (relativePath) {
                        return ("/apps/" + this.appId + "/" + relativePath).replace(/\/+/g, "/").replace(/\/+$/, "");
                    };
                    return App;
                }();
                exports.App = App;

                /***/
            },
            /* 3 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var subscription_1 = __webpack_require__(1);
                var ResumableSubscriptionState;
                (function (ResumableSubscriptionState) {
                    ResumableSubscriptionState[ResumableSubscriptionState["UNOPENED"] = 0] = "UNOPENED";
                    ResumableSubscriptionState[ResumableSubscriptionState["OPENING"] = 1] = "OPENING";
                    ResumableSubscriptionState[ResumableSubscriptionState["OPEN"] = 2] = "OPEN";
                    ResumableSubscriptionState[ResumableSubscriptionState["ENDING"] = 3] = "ENDING";
                    ResumableSubscriptionState[ResumableSubscriptionState["ENDED"] = 4] = "ENDED"; // called onEnd() or onError(err)
                })(ResumableSubscriptionState = exports.ResumableSubscriptionState || (exports.ResumableSubscriptionState = {}));
                // Asserts that the subscription state is one of the specified values,
                // otherwise logs the current value.
                function assertState(stateEnum, states) {
                    var _this = this;
                    if (states === void 0) {
                        states = [];
                    }
                    var check = states.some(function (state) {
                        return stateEnum[state] === _this.state;
                    });
                    var expected = states.join(', ');
                    var actual = stateEnum[this.state];
                    console.assert(check, "Expected this.state to be " + expected + " but it is " + actual);
                    if (!check) {
                        console.trace();
                    }
                }
                exports.assertState = assertState;
                
                // pattern of callbacks: ((onOpening (onOpen onEvent*)?)? (onError|onEnd)) | onError
                var ResumableSubscription = function () {
                    function ResumableSubscription(xhrSource, options) {
                        this.xhrSource = xhrSource;
                        this.options = options;
                        this.state = ResumableSubscriptionState.UNOPENED;
                        this.delayMillis = 0;
                        this.assertState = assertState.bind(this, ResumableSubscriptionState);
                        this.lastEventIdReceived = options.lastEventId;
                    }
                    ResumableSubscription.prototype.tryNow = function () {
                        var _this = this;
                        this.state = ResumableSubscriptionState.OPENING;
                        var newXhr = this.xhrSource();
                        this.subscription = new subscription_1.Subscription(newXhr, {
                            path: this.options.path,
                            lastEventId: this.lastEventIdReceived,
                            onOpen: function () {
                                _this.assertState(['OPENING']);
                                _this.state = ResumableSubscriptionState.OPEN;
                                if (_this.options.onOpen) {
                                    _this.options.onOpen();
                                }
                            },
                            onEvent: function (event) {
                                _this.assertState(['OPEN']);
                                if (_this.options.onEvent) {
                                    _this.options.onEvent(event);
                                }
                                console.assert(!_this.lastEventIdReceived || parseInt(event.eventId) > parseInt(_this.lastEventIdReceived), 'Expected the current event id to be larger than the previous one');
                                _this.lastEventIdReceived = event.eventId;
                            },
                            onEnd: function () {
                                _this.state = ResumableSubscriptionState.ENDED;
                                if (_this.options.onEnd) {
                                    _this.options.onEnd();
                                }
                            },
                            onError: function (error) {
                                if (_this.isResumableError(error)) {
                                    _this.state = ResumableSubscriptionState.OPENING;
                                    if (_this.options.onOpening) {
                                        _this.options.onOpening();
                                    }
                                    _this.backoff();
                                } else {
                                    _this.state = ResumableSubscriptionState.ENDED;
                                    if (_this.options.onError) {
                                        _this.options.onError(error);
                                    }
                                }
                            }
                        });
                        if (this.options.authorizer) {
                            this.options.authorizer.authorize().then(function (jwt) {
                                _this.subscription.open(jwt);
                            }).catch(function (err) {
                                // This is a resumable error?
                                console.log("Error getting auth token; backing off");
                                _this.backoff();
                            });
                        } else {
                            this.subscription.open(null);
                        }
                    };
                    ResumableSubscription.prototype.backoff = function () {
                        var _this = this;
                        this.delayMillis = this.delayMillis * 2 + 1000;
                        console.log("Trying reconnect in " + this.delayMillis + " ms.");
                        window.setTimeout(function () {
                            _this.tryNow();
                        }, this.delayMillis);
                    };
                    ResumableSubscription.prototype.open = function () {
                        this.tryNow();
                    };
                    ResumableSubscription.prototype.isResumableError = function (error) {
                        return error.message === "resumable"; // TODO this is a horrible way to represent resumableness
                    };
                    ResumableSubscription.prototype.unsubscribe = function () {
                        this.subscription.unsubscribe(); // We'll get onEnd and bubble this up
                    };
                    return ResumableSubscription;
                }();
                exports.ResumableSubscription = ResumableSubscription;

                /***/
            }])
        );
    });
});

var pusherPlatform_1 = pusherPlatform.App;

var servicePath = "services/feeds/v1/";
var feedIdRegex = /^[a-zA-Z0-9-]+$/;
var serviceIdRegex = /^[a-zA-Z0-9-]+$/;
var cacheExpiryTolerance = 60;
var defaultAuthEndpoint = "/feeds/tokens";

function parseResponse(promise) {
  return new Promise(function (resolve, reject) {
    promise.then(function (response) {
      try {
        resolve(JSON.parse(response));
      } catch (err) {
        reject(err);
      }
    }).catch(reject);
  });
}

function urlEncode(data) {
  return Object.keys(data).map(function (key) {
    return data[key] != undefined ? key + "=" + encodeURIComponent(data[key]) : "";
  }).join("&");
}

function queryString(data) {
  var encodedData = urlEncode(data);
  return encodedData ? "?" + encodedData : "";
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var Feed = function () {
  function Feed(_ref) {
    var app = _ref.app,
        feedId = _ref.feedId,
        readAuthorizer = _ref.readAuthorizer,
        writeAuthorizer = _ref.writeAuthorizer;
    classCallCheck(this, Feed);

    this.app = app;
    this.feedId = feedId;
    this.readAuthorizer = readAuthorizer;
    this.writeAuthorizer = writeAuthorizer;
  }

  createClass(Feed, [{
    key: "subscribe",
    value: function subscribe(options) {
      return this.app.resumableSubscribe(_extends({
        path: this.itemsPath + queryString({
          tail_size: options.tailSize
        }),
        authorizer: this.readAuthorizer
      }, options));
    }
  }, {
    key: "getHistory",
    value: function getHistory(_ref2) {
      var fromId = _ref2.fromId,
          limit = _ref2.limit;

      return parseResponse(this.app.request({
        method: "GET",
        path: this.itemsPath + queryString({
          from_id: fromId,
          limit: limit
        }),
        authorizer: this.readAuthorizer
      }));
    }
  }, {
    key: "publish",
    value: function publish(item) {
      return publishBatch([item]);
    }
  }, {
    key: "publishBatch",
    value: function publishBatch(items) {
      return parseResponse(this.app.request({
        method: "POST",
        path: this.itemsPath,
        body: { items: items },
        authorizer: this.writeAuthorizer
      }));
    }
  }, {
    key: "itemsPath",
    get: function get$$1() {
      return servicePath + "/feeds/" + this.feedId + "/items";
    }
  }]);
  return Feed;
}();

function now() {
  return Math.floor(Date.now() / 1000);
}

var FeedsAuthorizer = function () {
  function FeedsAuthorizer(_ref) {
    var authEndpoint = _ref.authEndpoint,
        authData = _ref.authData;
    classCallCheck(this, FeedsAuthorizer);

    this.authEndpoint = authEndpoint || defaultAuthEndpoint;
    this.authData = authData;
  }

  createClass(FeedsAuthorizer, [{
    key: "authorize",
    value: function authorize() {
      var _this = this;

      if (this.cacheIsStale) {
        return this.makeAuthRequest().then(function (responseBody) {
          _this.cache(responseBody.access_token, responseBody.expires_in);
          return _this.cachedToken;
        });
      }
      return Promise.resolve(this.cachedToken);
    }
  }, {
    key: "cache",
    value: function cache(token, expiresIn) {
      this.cachedToken = token;
      this.cacheValidUntil = now() + expiresIn - cacheExpiryTolerance;
    }
  }, {
    key: "makeAuthRequest",
    value: function makeAuthRequest() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", _this2.authEndpoint);
        xhr.addEventListener("load", function () {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error("Couldn't get token from " + _this2.authEndpoint + "; got " + xhr.status + " " + xhr.statusText + "."));
          }
        });
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(urlEncode(_extends({
          grant_type: "client_credentials"
        }, _this2.authData)));
      });
    }
  }, {
    key: "cacheIsStale",
    get: function get$$1() {
      return !this.cachedToken || now() > this.cacheValidUntil;
    }
  }]);
  return FeedsAuthorizer;
}();

var PusherFeeds = function () {
  function PusherFeeds(_ref) {
    var serviceId = _ref.serviceId,
        cluster = _ref.cluster,
        authEndpoint = _ref.authEndpoint;
    classCallCheck(this, PusherFeeds);

    this.authEndpoint = authEndpoint;
    if (!serviceId || !serviceId.match(serviceIdRegex)) {
      throw new TypeError("Invalid serviceId: " + serviceId);
    }
    this.authorizer = new FeedsAuthorizer({
      authEndpoint: this.authEndpoint,
      authData: {
        type: "ADMIN"
      }
    });
    // TODO appId -> serviceId upstream
    this.app = new pusherPlatform_1({
      appId: serviceId,
      cluster: cluster,
      authorizer: this.authorizer
    });
  }

  createClass(PusherFeeds, [{
    key: "list",
    value: function list(_ref2) {
      var prefix = _ref2.prefix,
          limit = _ref2.limit;

      return parseResponse(this.app.request({
        method: "GET",
        path: servicePath + "/feeds" + queryString({ prefix: prefix, limit: limit }),
        authorizer: this.authorizer
      }));
    }
  }, {
    key: "feed",
    value: function feed(_ref3) {
      var feedId = _ref3.feedId;

      if (!feedId || !feedId.match(feedIdRegex)) {
        throw new TypeError("Invalid feedId: " + feedId);
      }
      var readAuthorizer = feedId.startsWith("private-") ? new FeedsAuthorizer({
        authEndpoint: this.authEndpoint,
        authData: {
          feed_id: feedId,
          type: "READ"
        }
      }) : null;
      var writeAuthorizer = new FeedsAuthorizer({
        authEndpoint: this.authEndpoint,
        authData: {
          feed_id: feedId,
          type: "WRITE"
        }
      });
      return new Feed({
        app: this.app,
        feedId: feedId,
        readAuthorizer: readAuthorizer,
        writeAuthorizer: writeAuthorizer
      });
    }
  }]);
  return PusherFeeds;
}();

return PusherFeeds;

})));
//# sourceMappingURL=pusher-feeds-client.js.map
