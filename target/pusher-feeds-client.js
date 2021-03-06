(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Feeds = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

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
                /******/return __webpack_require__(__webpack_require__.s = 9);
                /******/
            }(
            /************************************************************************/
            /******/[
            /* 0 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                function responseToHeadersObject(headerStr) {
                    var headers = {};
                    if (!headerStr) {
                        return headers;
                    }
                    var headerPairs = headerStr.split('\u000d\u000a');
                    for (var _i = 0, headerPairs_1 = headerPairs; _i < headerPairs_1.length; _i++) {
                        var headerPair = headerPairs_1[_i];
                        var index = headerPair.indexOf('\u003a\u0020');
                        if (index > 0) {
                            var key = headerPair.substring(0, index);
                            var val = headerPair.substring(index + 2);
                            headers[key] = val;
                        }
                    }
                    return headers;
                }
                exports.responseToHeadersObject = responseToHeadersObject;
                var ErrorResponse = function () {
                    function ErrorResponse(statusCode, headers, info) {
                        this.statusCode = statusCode;
                        this.headers = headers;
                        this.info = info;
                    }
                    ErrorResponse.fromXHR = function (xhr) {
                        return new ErrorResponse(xhr.status, responseToHeadersObject(xhr.getAllResponseHeaders()), xhr.responseText);
                    };
                    return ErrorResponse;
                }();
                exports.ErrorResponse = ErrorResponse;
                var NetworkError = function () {
                    function NetworkError(error) {
                        this.error = error;
                    }
                    return NetworkError;
                }();
                exports.NetworkError = NetworkError;
                var XhrReadyState;
                (function (XhrReadyState) {
                    XhrReadyState[XhrReadyState["UNSENT"] = 0] = "UNSENT";
                    XhrReadyState[XhrReadyState["OPENED"] = 1] = "OPENED";
                    XhrReadyState[XhrReadyState["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
                    XhrReadyState[XhrReadyState["LOADING"] = 3] = "LOADING";
                    XhrReadyState[XhrReadyState["DONE"] = 4] = "DONE";
                })(XhrReadyState = exports.XhrReadyState || (exports.XhrReadyState = {}));

                /***/
            },
            /* 1 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var LogLevel;
                (function (LogLevel) {
                    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
                    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
                    LogLevel[LogLevel["INFO"] = 3] = "INFO";
                    LogLevel[LogLevel["WARNING"] = 4] = "WARNING";
                    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
                })(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
                var ConsoleLogger = function () {
                    function ConsoleLogger(threshold) {
                        if (threshold === void 0) {
                            threshold = 2;
                        }
                        this.threshold = threshold;
                        var groups = Array();
                        var hr = '--------------------------------------------------------------------------------';
                        if (!window.console.group) {
                            window.console.group = function (label) {
                                groups.push(label);
                                window.console.log('%c \nBEGIN GROUP: %c', hr, label);
                            };
                        }
                        if (!window.console.groupEnd) {
                            window.console.groupEnd = function () {
                                window.console.log('END GROUP: %c\n%c', groups.pop(), hr);
                            };
                        }
                    }
                    ConsoleLogger.prototype.verbose = function (message, error) {
                        this.log(window.console.log, LogLevel.VERBOSE, message, error);
                    };
                    ConsoleLogger.prototype.debug = function (message, error) {
                        this.log(window.console.log, LogLevel.DEBUG, message, error);
                    };
                    ConsoleLogger.prototype.info = function (message, error) {
                        this.log(window.console.info, LogLevel.INFO, message, error);
                    };
                    ConsoleLogger.prototype.warn = function (message, error) {
                        this.log(window.console.warn, LogLevel.WARNING, message, error);
                    };
                    ConsoleLogger.prototype.error = function (message, error) {
                        this.log(window.console.error, LogLevel.ERROR, message, error);
                    };
                    ConsoleLogger.prototype.log = function (logFunction, level, message, error) {
                        if (level >= this.threshold) {
                            var loggerSignature = "Logger." + LogLevel[level];
                            if (error) {
                                window.console.group();
                                logFunction(loggerSignature + ": " + message);
                                logFunction(error);
                                window.console.groupEnd();
                            } else {
                                logFunction(loggerSignature + ": " + message);
                            }
                        }
                    };
                    return ConsoleLogger;
                }();
                exports.ConsoleLogger = ConsoleLogger;
                var EmptyLogger = function () {
                    function EmptyLogger() {}
                    EmptyLogger.prototype.verbose = function (message, error) {};
                    EmptyLogger.prototype.debug = function (message, error) {};
                    EmptyLogger.prototype.info = function (message, error) {};
                    EmptyLogger.prototype.warn = function (message, error) {};
                    EmptyLogger.prototype.error = function (message, error) {};
                    return EmptyLogger;
                }();
                exports.EmptyLogger = EmptyLogger;

                /***/
            },
            /* 2 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var network_1 = __webpack_require__(0);
                exports.createRetryStrategyOptionsOrDefault = function (options) {
                    var initialTimeoutMillis = options.initialTimeoutMillis || 1000;
                    var maxTimeoutMillis = options.maxTimeoutMillis || 5000;
                    var limit = -1;
                    if (options.limit !== undefined && options.limit != null) {
                        limit = options.limit;
                    }
                    var increaseTimeout;
                    if (options.increaseTimeout !== undefined) {
                        increaseTimeout = options.increaseTimeout;
                    } else {
                        increaseTimeout = function (currentTimeout) {
                            if (currentTimeout * 2 > maxTimeoutMillis) {
                                return maxTimeoutMillis;
                            } else {
                                return currentTimeout * 2;
                            }
                        };
                    }
                    return {
                        increaseTimeout: increaseTimeout,
                        initialTimeoutMillis: initialTimeoutMillis,
                        limit: limit,
                        maxTimeoutMillis: maxTimeoutMillis
                    };
                };
                var Retry = function () {
                    function Retry(waitTimeMillis) {
                        this.waitTimeMillis = waitTimeMillis;
                    }
                    return Retry;
                }();
                exports.Retry = Retry;
                var DoNotRetry = function () {
                    function DoNotRetry(error) {
                        this.error = error;
                    }
                    return DoNotRetry;
                }();
                exports.DoNotRetry = DoNotRetry;
                var requestMethodIsSafe = function (method) {
                    method = method.toUpperCase();
                    return method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'SUBSCRIBE';
                };
                var RetryResolution = function () {
                    function RetryResolution(options, logger, retryUnsafeRequests) {
                        this.options = options;
                        this.logger = logger;
                        this.retryUnsafeRequests = retryUnsafeRequests;
                        this.currentRetryCount = 0;
                        this.initialTimeoutMillis = options.initialTimeoutMillis;
                        this.maxTimeoutMillis = options.maxTimeoutMillis;
                        this.limit = options.limit;
                        this.increaseTimeoutFunction = options.increaseTimeout;
                        this.currentBackoffMillis = this.initialTimeoutMillis;
                    }
                    RetryResolution.prototype.attemptRetry = function (error) {
                        this.logger.verbose(this.constructor.name + ":  Error received", error);
                        if (this.currentRetryCount >= this.limit && this.limit >= 0) {
                            this.logger.verbose(this.constructor.name + ":  Retry count is over the maximum limit: " + this.limit);
                            return new DoNotRetry(error);
                        }
                        if (error instanceof network_1.ErrorResponse && error.headers['Retry-After']) {
                            this.logger.verbose(this.constructor.name + ":  Retry-After header is present, retrying in " + error.headers['Retry-After']);
                            return new Retry(parseInt(error.headers['Retry-After'], 10) * 1000);
                        }
                        if (error instanceof network_1.NetworkError || error instanceof network_1.ErrorResponse && requestMethodIsSafe(error.headers['Request-Method']) || this.retryUnsafeRequests) {
                            return this.shouldSafeRetry(error);
                        }
                        if (error instanceof network_1.NetworkError) {
                            return this.shouldSafeRetry(error);
                        }
                        this.logger.verbose(this.constructor.name + ": Error is not retryable", error);
                        return new DoNotRetry(error);
                    };
                    RetryResolution.prototype.shouldSafeRetry = function (error) {
                        if (error instanceof network_1.NetworkError) {
                            this.logger.verbose(this.constructor.name + ": It's a Network Error, will retry", error);
                            return new Retry(this.calulateMillisToRetry());
                        } else if (error instanceof network_1.ErrorResponse) {
                            if (error.statusCode >= 500 && error.statusCode < 600) {
                                this.logger.verbose(this.constructor.name + ": Error 5xx, will retry");
                                return new Retry(this.calulateMillisToRetry());
                            }
                        }
                        this.logger.verbose(this.constructor.name + ": Error is not retryable", error);
                        return new DoNotRetry(error);
                    };
                    RetryResolution.prototype.calulateMillisToRetry = function () {
                        this.currentBackoffMillis = this.increaseTimeoutFunction(this.currentBackoffMillis);
                        this.logger.verbose(this.constructor.name + ": Retrying in " + this.currentBackoffMillis + "ms");
                        return this.currentBackoffMillis;
                    };
                    return RetryResolution;
                }();
                exports.RetryResolution = RetryResolution;

                /***/
            },
            /* 3 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var logger_1 = __webpack_require__(1);
                var request_1 = __webpack_require__(4);
                var resuming_subscription_1 = __webpack_require__(5);
                var retrying_subscription_1 = __webpack_require__(6);
                var subscribe_strategy_1 = __webpack_require__(10);
                var subscription_1 = __webpack_require__(11);
                var token_providing_subscription_1 = __webpack_require__(7);
                var http_1 = __webpack_require__(12);
                var websocket_1 = __webpack_require__(13);
                var transports_1 = __webpack_require__(8);
                var BaseClient = function () {
                    function BaseClient(options) {
                        this.options = options;
                        this.host = options.host.replace(/(\/)+$/, '');
                        this.logger = options.logger || new logger_1.ConsoleLogger();
                        this.websocketTransport = new websocket_1.default(this.host);
                        this.httpTransport = new http_1.default(this.host);
                    }
                    BaseClient.prototype.request = function (options, tokenParams) {
                        var _this = this;
                        if (options.tokenProvider) {
                            return options.tokenProvider.fetchToken(tokenParams).then(function (token) {
                                if (options.headers !== undefined) {
                                    options.headers['Authorization'] = "Bearer " + token;
                                } else {
                                    options.headers = (_a = {}, _a['Authorization'] = "Bearer " + token, _a);
                                }
                                return request_1.executeNetworkRequest(function () {
                                    return _this.httpTransport.request(options);
                                }, options);
                                var _a;
                            }).catch(function (error) {
                                _this.logger.error(error);
                            });
                        }
                        return request_1.executeNetworkRequest(function () {
                            return _this.httpTransport.request(options);
                        }, options);
                    };
                    BaseClient.prototype.subscribeResuming = function (path, headers, listeners, retryStrategyOptions, initialEventId, tokenProvider) {
                        var completeListeners = subscription_1.replaceMissingListenersWithNoOps(listeners);
                        var subscribeStrategyListeners = subscribe_strategy_1.subscribeStrategyListenersFromSubscriptionListeners(completeListeners);
                        var subscriptionStrategy = resuming_subscription_1.createResumingStrategy(retryStrategyOptions, token_providing_subscription_1.createTokenProvidingStrategy(transports_1.createTransportStrategy(path, this.websocketTransport, this.logger), this.logger, tokenProvider), this.logger, initialEventId);
                        var opened = false;
                        return subscriptionStrategy({
                            onEnd: subscribeStrategyListeners.onEnd,
                            onError: subscribeStrategyListeners.onError,
                            onEvent: subscribeStrategyListeners.onEvent,
                            onOpen: function (headers) {
                                if (!opened) {
                                    opened = true;
                                    subscribeStrategyListeners.onOpen(headers);
                                }
                                completeListeners.onSubscribe();
                            },
                            onRetrying: subscribeStrategyListeners.onRetrying
                        }, headers);
                    };
                    BaseClient.prototype.subscribeNonResuming = function (path, headers, listeners, retryStrategyOptions, tokenProvider) {
                        var completeListeners = subscription_1.replaceMissingListenersWithNoOps(listeners);
                        var subscribeStrategyListeners = subscribe_strategy_1.subscribeStrategyListenersFromSubscriptionListeners(completeListeners);
                        var subscriptionStrategy = retrying_subscription_1.createRetryingStrategy(retryStrategyOptions, token_providing_subscription_1.createTokenProvidingStrategy(transports_1.createTransportStrategy(path, this.websocketTransport, this.logger), this.logger, tokenProvider), this.logger);
                        var opened = false;
                        return subscriptionStrategy({
                            onEnd: subscribeStrategyListeners.onEnd,
                            onError: subscribeStrategyListeners.onError,
                            onEvent: subscribeStrategyListeners.onEvent,
                            onOpen: function (headers) {
                                if (!opened) {
                                    opened = true;
                                    subscribeStrategyListeners.onOpen(headers);
                                }
                                completeListeners.onSubscribe();
                            },
                            onRetrying: subscribeStrategyListeners.onRetrying
                        }, headers);
                    };
                    return BaseClient;
                }();
                exports.BaseClient = BaseClient;

                /***/
            },
            /* 4 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var network_1 = __webpack_require__(0);
                function executeNetworkRequest(createXhr, options) {
                    return new Promise(function (resolve, reject) {
                        var xhr = createXhr();
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status >= 200 && xhr.status < 300) {
                                    resolve(xhr.response);
                                } else if (xhr.status !== 0) {
                                    reject(network_1.ErrorResponse.fromXHR(xhr));
                                } else {
                                    reject(new network_1.NetworkError('No Connection'));
                                }
                            }
                        };
                        xhr.send(JSON.stringify(options.body));
                    });
                }
                exports.executeNetworkRequest = executeNetworkRequest;

                /***/
            },
            /* 5 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var network_1 = __webpack_require__(0);
                var retry_strategy_1 = __webpack_require__(2);
                exports.createResumingStrategy = function (retryOptions, nextSubscribeStrategy, logger, initialEventId) {
                    var completeRetryOptions = retry_strategy_1.createRetryStrategyOptionsOrDefault(retryOptions);
                    var retryResolution = new retry_strategy_1.RetryResolution(completeRetryOptions, logger);
                    var ResumingSubscription = function () {
                        function ResumingSubscription(listeners, headers) {
                            var _this = this;
                            this.unsubscribe = function () {
                                _this.state.unsubscribe();
                            };
                            this.onTransition = function (newState) {
                                _this.state = newState;
                            };
                            var OpeningSubscriptionState = function () {
                                function OpeningSubscriptionState(onTransition) {
                                    var _this = this;
                                    this.onTransition = onTransition;
                                    var lastEventId = initialEventId;
                                    logger.verbose("ResumingSubscription: transitioning to OpeningSubscriptionState");
                                    if (lastEventId) {
                                        headers['Last-Event-Id'] = lastEventId;
                                        logger.verbose("ResumingSubscription: initialEventId is " + lastEventId);
                                    }
                                    this.underlyingSubscription = nextSubscribeStrategy({
                                        onEnd: function (error) {
                                            onTransition(new EndedSubscriptionState(error));
                                        },
                                        onError: function (error) {
                                            onTransition(new ResumingSubscriptionState(error, onTransition, lastEventId));
                                        },
                                        onEvent: function (event) {
                                            lastEventId = event.eventId;
                                            listeners.onEvent(event);
                                        },
                                        onOpen: function (headers) {
                                            onTransition(new OpenSubscriptionState(headers, _this.underlyingSubscription, onTransition));
                                        },
                                        onRetrying: listeners.onRetrying
                                    }, headers);
                                }
                                OpeningSubscriptionState.prototype.unsubscribe = function () {
                                    this.onTransition(new EndingSubscriptionState());
                                    this.underlyingSubscription.unsubscribe();
                                };
                                return OpeningSubscriptionState;
                            }();
                            var OpenSubscriptionState = function () {
                                function OpenSubscriptionState(headers, underlyingSubscription, onTransition) {
                                    this.underlyingSubscription = underlyingSubscription;
                                    this.onTransition = onTransition;
                                    logger.verbose("ResumingSubscription: transitioning to OpenSubscriptionState");
                                    listeners.onOpen(headers);
                                }
                                OpenSubscriptionState.prototype.unsubscribe = function () {
                                    this.onTransition(new EndingSubscriptionState());
                                    this.underlyingSubscription.unsubscribe();
                                };
                                return OpenSubscriptionState;
                            }();
                            var ResumingSubscriptionState = function () {
                                function ResumingSubscriptionState(error, onTransition, lastEventId) {
                                    var _this = this;
                                    this.onTransition = onTransition;
                                    logger.verbose("ResumingSubscription: transitioning to ResumingSubscriptionState");
                                    var executeSubscriptionOnce = function (error, lastEventId) {
                                        listeners.onRetrying();
                                        var resolveError = function (error) {
                                            if (error instanceof network_1.ErrorResponse) {
                                                error.headers['Request-Method'] = 'SUBSCRIBE';
                                            }
                                            return retryResolution.attemptRetry(error);
                                        };
                                        var errorResolution = resolveError(error);
                                        if (errorResolution instanceof retry_strategy_1.Retry) {
                                            _this.timeout = window.setTimeout(function () {
                                                executeNextSubscribeStrategy(lastEventId);
                                            }, errorResolution.waitTimeMillis);
                                        } else {
                                            onTransition(new FailedSubscriptionState(error));
                                        }
                                    };
                                    var executeNextSubscribeStrategy = function (lastEventId) {
                                        logger.verbose("ResumingSubscription: trying to re-establish the subscription");
                                        if (lastEventId) {
                                            logger.verbose("ResumingSubscription: lastEventId: " + lastEventId);
                                            headers['Last-Event-Id'] = lastEventId;
                                        }
                                        _this.underlyingSubscription = nextSubscribeStrategy({
                                            onEnd: function (error) {
                                                onTransition(new EndedSubscriptionState(error));
                                            },
                                            onError: function (error) {
                                                executeSubscriptionOnce(error, lastEventId);
                                            },
                                            onEvent: function (event) {
                                                lastEventId = event.eventId;
                                                listeners.onEvent(event);
                                            },
                                            onOpen: function (headers) {
                                                onTransition(new OpenSubscriptionState(headers, _this.underlyingSubscription, onTransition));
                                            },
                                            onRetrying: listeners.onRetrying
                                        }, headers);
                                    };
                                    executeSubscriptionOnce(error, lastEventId);
                                }
                                ResumingSubscriptionState.prototype.unsubscribe = function () {
                                    this.onTransition(new EndingSubscriptionState());
                                    window.clearTimeout(this.timeout);
                                    this.underlyingSubscription.unsubscribe();
                                };
                                return ResumingSubscriptionState;
                            }();
                            var EndingSubscriptionState = function () {
                                function EndingSubscriptionState(error) {
                                    logger.verbose("ResumingSubscription: transitioning to EndingSubscriptionState");
                                }
                                EndingSubscriptionState.prototype.unsubscribe = function () {
                                    throw new Error('Subscription is already ending');
                                };
                                return EndingSubscriptionState;
                            }();
                            var EndedSubscriptionState = function () {
                                function EndedSubscriptionState(error) {
                                    logger.verbose("ResumingSubscription: transitioning to EndedSubscriptionState");
                                    listeners.onEnd(error);
                                }
                                EndedSubscriptionState.prototype.unsubscribe = function () {
                                    throw new Error('Subscription has already ended');
                                };
                                return EndedSubscriptionState;
                            }();
                            var FailedSubscriptionState = function () {
                                function FailedSubscriptionState(error) {
                                    logger.verbose("ResumingSubscription: transitioning to FailedSubscriptionState", error);
                                    listeners.onError(error);
                                }
                                FailedSubscriptionState.prototype.unsubscribe = function () {
                                    throw new Error('Subscription has already ended');
                                };
                                return FailedSubscriptionState;
                            }();
                            this.state = new OpeningSubscriptionState(this.onTransition);
                        }
                        return ResumingSubscription;
                    }();
                    return function (listeners, headers) {
                        return new ResumingSubscription(listeners, headers);
                    };
                };

                /***/
            },
            /* 6 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var network_1 = __webpack_require__(0);
                var retry_strategy_1 = __webpack_require__(2);
                exports.createRetryingStrategy = function (retryOptions, nextSubscribeStrategy, logger) {
                    var enrichedRetryOptions = retry_strategy_1.createRetryStrategyOptionsOrDefault(retryOptions);
                    var retryResolution = new retry_strategy_1.RetryResolution(enrichedRetryOptions, logger);
                    var RetryingSubscription = function () {
                        function RetryingSubscription(listeners, headers) {
                            var _this = this;
                            this.unsubscribe = function () {
                                _this.state.unsubscribe();
                            };
                            this.onTransition = function (newState) {
                                _this.state = newState;
                            };
                            var OpeningSubscriptionState = function () {
                                function OpeningSubscriptionState(onTransition) {
                                    var _this = this;
                                    logger.verbose("RetryingSubscription: transitioning to OpeningSubscriptionState");
                                    this.underlyingSubscription = nextSubscribeStrategy({
                                        onEnd: function (error) {
                                            return onTransition(new EndedSubscriptionState(error));
                                        },
                                        onError: function (error) {
                                            return onTransition(new RetryingSubscriptionState(error, onTransition));
                                        },
                                        onEvent: listeners.onEvent,
                                        onOpen: function (headers) {
                                            return onTransition(new OpenSubscriptionState(headers, _this.underlyingSubscription, onTransition));
                                        },
                                        onRetrying: listeners.onRetrying
                                    }, headers);
                                }
                                OpeningSubscriptionState.prototype.unsubscribe = function () {
                                    this.underlyingSubscription.unsubscribe();
                                    throw new Error('Method not implemented.');
                                };
                                return OpeningSubscriptionState;
                            }();
                            var RetryingSubscriptionState = function () {
                                function RetryingSubscriptionState(error, onTransition) {
                                    var _this = this;
                                    this.onTransition = onTransition;
                                    logger.verbose("RetryingSubscription: transitioning to RetryingSubscriptionState");
                                    var executeSubscriptionOnce = function (error) {
                                        listeners.onRetrying();
                                        var resolveError = function (error) {
                                            if (error instanceof network_1.ErrorResponse) {
                                                error.headers['Request-Method'] = 'SUBSCRIBE';
                                            }
                                            return retryResolution.attemptRetry(error);
                                        };
                                        var errorResolution = resolveError(error);
                                        if (errorResolution instanceof retry_strategy_1.Retry) {
                                            _this.timeout = window.setTimeout(function () {
                                                executeNextSubscribeStrategy();
                                            }, errorResolution.waitTimeMillis);
                                        } else {
                                            onTransition(new FailedSubscriptionState(error));
                                        }
                                    };
                                    var executeNextSubscribeStrategy = function () {
                                        logger.verbose("RetryingSubscription: trying to re-establish the subscription");
                                        var underlyingSubscription = nextSubscribeStrategy({
                                            onEnd: function (error) {
                                                return onTransition(new EndedSubscriptionState(error));
                                            },
                                            onError: function (error) {
                                                return executeSubscriptionOnce(error);
                                            },
                                            onEvent: listeners.onEvent,
                                            onOpen: function (headers) {
                                                onTransition(new OpenSubscriptionState(headers, underlyingSubscription, onTransition));
                                            },
                                            onRetrying: listeners.onRetrying
                                        }, headers);
                                    };
                                    executeSubscriptionOnce(error);
                                }
                                RetryingSubscriptionState.prototype.unsubscribe = function () {
                                    window.clearTimeout(this.timeout);
                                    this.onTransition(new EndedSubscriptionState());
                                };
                                return RetryingSubscriptionState;
                            }();
                            var OpenSubscriptionState = function () {
                                function OpenSubscriptionState(headers, underlyingSubscription, onTransition) {
                                    this.underlyingSubscription = underlyingSubscription;
                                    this.onTransition = onTransition;
                                    logger.verbose("RetryingSubscription: transitioning to OpenSubscriptionState");
                                    listeners.onOpen(headers);
                                }
                                OpenSubscriptionState.prototype.unsubscribe = function () {
                                    this.underlyingSubscription.unsubscribe();
                                    this.onTransition(new EndedSubscriptionState());
                                };
                                return OpenSubscriptionState;
                            }();
                            var EndedSubscriptionState = function () {
                                function EndedSubscriptionState(error) {
                                    logger.verbose("RetryingSubscription: transitioning to EndedSubscriptionState");
                                    listeners.onEnd(error);
                                }
                                EndedSubscriptionState.prototype.unsubscribe = function () {
                                    throw new Error('Subscription has already ended');
                                };
                                return EndedSubscriptionState;
                            }();
                            var FailedSubscriptionState = function () {
                                function FailedSubscriptionState(error) {
                                    logger.verbose("RetryingSubscription: transitioning to FailedSubscriptionState", error);
                                    listeners.onError(error);
                                }
                                FailedSubscriptionState.prototype.unsubscribe = function () {
                                    throw new Error('Subscription has already ended');
                                };
                                return FailedSubscriptionState;
                            }();
                            this.state = new OpeningSubscriptionState(this.onTransition);
                        }
                        return RetryingSubscription;
                    }();
                    return function (listeners, headers) {
                        return new RetryingSubscription(listeners, headers);
                    };
                };

                /***/
            },
            /* 7 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var network_1 = __webpack_require__(0);
                exports.createTokenProvidingStrategy = function (nextSubscribeStrategy, logger, tokenProvider) {
                    if (tokenProvider) {
                        return function (listeners, headers) {
                            return new TokenProvidingSubscription(logger, listeners, headers, tokenProvider, nextSubscribeStrategy);
                        };
                    }
                    return nextSubscribeStrategy;
                };
                var TokenProvidingSubscription = function () {
                    function TokenProvidingSubscription(logger, listeners, headers, tokenProvider, nextSubscribeStrategy) {
                        var _this = this;
                        this.logger = logger;
                        this.listeners = listeners;
                        this.headers = headers;
                        this.tokenProvider = tokenProvider;
                        this.nextSubscribeStrategy = nextSubscribeStrategy;
                        this.unsubscribe = function () {
                            _this.state.unsubscribe();
                            _this.state = new InactiveState(_this.logger);
                        };
                        this.state = new ActiveState(logger, headers, nextSubscribeStrategy);
                        this.subscribe();
                    }
                    TokenProvidingSubscription.prototype.subscribe = function () {
                        var _this = this;
                        this.tokenProvider.fetchToken().then(function (token) {
                            var existingListeners = Object.assign({}, _this.listeners);
                            _this.state.subscribe(token, {
                                onEnd: function (error) {
                                    _this.state = new InactiveState(_this.logger);
                                    existingListeners.onEnd(error);
                                },
                                onError: function (error) {
                                    if (_this.isTokenExpiredError(error)) {
                                        _this.tokenProvider.clearToken(token);
                                        _this.subscribe();
                                    } else {
                                        _this.state = new InactiveState(_this.logger);
                                        existingListeners.onError(error);
                                    }
                                },
                                onEvent: _this.listeners.onEvent,
                                onOpen: _this.listeners.onOpen
                            });
                        }).catch(function (error) {
                            _this.logger.debug("TokenProvidingSubscription: error when fetching token: " + error);
                            _this.state = new InactiveState(_this.logger);
                        });
                    };
                    TokenProvidingSubscription.prototype.isTokenExpiredError = function (error) {
                        return error instanceof network_1.ErrorResponse && error.statusCode === 401 && error.info === 'authentication/expired';
                    };
                    return TokenProvidingSubscription;
                }();
                var ActiveState = function () {
                    function ActiveState(logger, headers, nextSubscribeStrategy) {
                        this.logger = logger;
                        this.headers = headers;
                        this.nextSubscribeStrategy = nextSubscribeStrategy;
                        logger.verbose("TokenProvidingSubscription: transitioning to TokenProvidingState");
                    }
                    ActiveState.prototype.subscribe = function (token, listeners) {
                        var _this = this;
                        this.putTokenIntoHeader(token);
                        this.underlyingSubscription = this.nextSubscribeStrategy({
                            onEnd: function (error) {
                                _this.logger.verbose("TokenProvidingSubscription: subscription ended");
                                listeners.onEnd(error);
                            },
                            onError: function (error) {
                                _this.logger.verbose("TokenProvidingSubscription: subscription errored: " + error);
                                listeners.onError(error);
                            },
                            onEvent: listeners.onEvent,
                            onOpen: function (headers) {
                                _this.logger.verbose("TokenProvidingSubscription: subscription opened");
                                listeners.onOpen(headers);
                            },
                            onRetrying: listeners.onRetrying
                        }, this.headers);
                    };
                    ActiveState.prototype.unsubscribe = function () {
                        this.underlyingSubscription.unsubscribe();
                    };
                    ActiveState.prototype.putTokenIntoHeader = function (token) {
                        this.headers['Authorization'] = "Bearer " + token;
                        this.logger.verbose("TokenProvidingSubscription: token fetched: " + token);
                    };
                    return ActiveState;
                }();
                var InactiveState = function () {
                    function InactiveState(logger) {
                        this.logger = logger;
                        logger.verbose("TokenProvidingSubscription: transitioning to OpenTokenProvidingSubscriptionState");
                    }
                    InactiveState.prototype.subscribe = function (token, listeners) {
                        this.logger.verbose('TokenProvidingSubscription: subscribe called in Inactive state; doing nothing');
                    };
                    InactiveState.prototype.unsubscribe = function () {
                        this.logger.verbose('TokenProvidingSubscription: unsubscribe called in Inactive state; doing nothing');
                    };
                    return InactiveState;
                }();

                /***/
            },
            /* 8 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                exports.createTransportStrategy = function (path, transport, logger) {
                    return function (listeners, headers) {
                        return transport.subscribe(path, listeners, headers);
                    };
                };

                /***/
            },
            /* 9 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var base_client_1 = __webpack_require__(3);
                exports.BaseClient = base_client_1.BaseClient;
                var instance_1 = __webpack_require__(14);
                exports.Instance = instance_1.default;
                var logger_1 = __webpack_require__(1);
                exports.ConsoleLogger = logger_1.ConsoleLogger;
                exports.EmptyLogger = logger_1.EmptyLogger;
                var network_1 = __webpack_require__(0);
                exports.ErrorResponse = network_1.ErrorResponse;
                exports.NetworkError = network_1.NetworkError;
                exports.responseToHeadersObject = network_1.responseToHeadersObject;
                exports.XhrReadyState = network_1.XhrReadyState;
                var request_1 = __webpack_require__(4);
                exports.executeNetworkRequest = request_1.executeNetworkRequest;
                var resuming_subscription_1 = __webpack_require__(5);
                exports.createResumingStrategy = resuming_subscription_1.createResumingStrategy;
                var retry_strategy_1 = __webpack_require__(2);
                exports.createRetryStrategyOptionsOrDefault = retry_strategy_1.createRetryStrategyOptionsOrDefault;
                exports.DoNotRetry = retry_strategy_1.DoNotRetry;
                exports.Retry = retry_strategy_1.Retry;
                exports.RetryResolution = retry_strategy_1.RetryResolution;
                var retrying_subscription_1 = __webpack_require__(6);
                exports.createRetryingStrategy = retrying_subscription_1.createRetryingStrategy;
                var token_providing_subscription_1 = __webpack_require__(7);
                exports.createTokenProvidingStrategy = token_providing_subscription_1.createTokenProvidingStrategy;
                var transports_1 = __webpack_require__(8);
                exports.createTransportStrategy = transports_1.createTransportStrategy;
                exports.default = {
                    BaseClient: base_client_1.BaseClient,
                    ConsoleLogger: logger_1.ConsoleLogger,
                    EmptyLogger: logger_1.EmptyLogger,
                    Instance: instance_1.default
                };

                /***/
            },
            /* 10 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                exports.subscribeStrategyListenersFromSubscriptionListeners = function (subListeners) {
                    return {
                        onEnd: subListeners.onEnd,
                        onError: subListeners.onError,
                        onEvent: subListeners.onEvent,
                        onOpen: subListeners.onOpen,
                        onRetrying: subListeners.onRetrying
                    };
                };

                /***/
            },
            /* 11 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                exports.replaceMissingListenersWithNoOps = function (listeners) {
                    var onEndNoOp = function (error) {};
                    var onEnd = listeners.onEnd || onEndNoOp;
                    var onErrorNoOp = function (error) {};
                    var onError = listeners.onError || onErrorNoOp;
                    var onEventNoOp = function (event) {};
                    var onEvent = listeners.onEvent || onEventNoOp;
                    var onOpenNoOp = function (headers) {};
                    var onOpen = listeners.onOpen || onOpenNoOp;
                    var onRetryingNoOp = function () {};
                    var onRetrying = listeners.onRetrying || onRetryingNoOp;
                    var onSubscribeNoOp = function () {};
                    var onSubscribe = listeners.onSubscribe || onSubscribeNoOp;
                    return {
                        onEnd: onEnd,
                        onError: onError,
                        onEvent: onEvent,
                        onOpen: onOpen,
                        onRetrying: onRetrying,
                        onSubscribe: onSubscribe
                    };
                };

                /***/
            },
            /* 12 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var network_1 = __webpack_require__(0);
                var HttpTransportState;
                (function (HttpTransportState) {
                    HttpTransportState[HttpTransportState["UNOPENED"] = 0] = "UNOPENED";
                    HttpTransportState[HttpTransportState["OPENING"] = 1] = "OPENING";
                    HttpTransportState[HttpTransportState["OPEN"] = 2] = "OPEN";
                    HttpTransportState[HttpTransportState["ENDING"] = 3] = "ENDING";
                    HttpTransportState[HttpTransportState["ENDED"] = 4] = "ENDED";
                })(HttpTransportState = exports.HttpTransportState || (exports.HttpTransportState = {}));
                var HttpSubscription = function () {
                    function HttpSubscription(xhr, listeners) {
                        var _this = this;
                        this.gotEOS = false;
                        this.lastNewlineIndex = 0;
                        this.state = HttpTransportState.UNOPENED;
                        this.xhr = xhr;
                        this.listeners = listeners;
                        this.xhr.onreadystatechange = function () {
                            switch (_this.xhr.readyState) {
                                case network_1.XhrReadyState.UNSENT:
                                case network_1.XhrReadyState.OPENED:
                                case network_1.XhrReadyState.HEADERS_RECEIVED:
                                    _this.assertStateIsIn(HttpTransportState.OPENING);
                                    break;
                                case network_1.XhrReadyState.LOADING:
                                    _this.onLoading();
                                    break;
                                case network_1.XhrReadyState.DONE:
                                    _this.onDone();
                                    break;
                            }
                        };
                        this.state = HttpTransportState.OPENING;
                        this.xhr.send();
                        return this;
                    }
                    HttpSubscription.prototype.unsubscribe = function () {
                        this.state = HttpTransportState.ENDED;
                        this.xhr.abort();
                        if (this.listeners.onEnd) {
                            this.listeners.onEnd(null);
                        }
                    };
                    HttpSubscription.prototype.onLoading = function () {
                        this.assertStateIsIn(HttpTransportState.OPENING, HttpTransportState.OPEN, HttpTransportState.ENDING);
                        if (this.xhr.status === 200) {
                            if (this.state === HttpTransportState.OPENING) {
                                this.state = HttpTransportState.OPEN;
                                window.console.log(network_1.responseToHeadersObject(this.xhr.getAllResponseHeaders()));
                                if (this.listeners.onOpen) {
                                    this.listeners.onOpen(network_1.responseToHeadersObject(this.xhr.getAllResponseHeaders()));
                                }
                            }
                            this.assertStateIsIn(HttpTransportState.OPEN);
                            var err = this.onChunk();
                            this.assertStateIsIn(HttpTransportState.OPEN, HttpTransportState.ENDING);
                            if (err) {
                                this.state = HttpTransportState.ENDED;
                                if (err instanceof network_1.ErrorResponse && err.statusCode !== 204) {
                                    if (this.listeners.onError) {
                                        this.listeners.onError(err);
                                    }
                                }
                            } else {}
                        }
                    };
                    HttpSubscription.prototype.onDone = function () {
                        if (this.xhr.status === 200) {
                            if (this.state === HttpTransportState.OPENING) {
                                this.state = HttpTransportState.OPEN;
                                if (this.listeners.onOpen) {
                                    this.listeners.onOpen(network_1.responseToHeadersObject(this.xhr.getAllResponseHeaders()));
                                }
                            }
                            this.assertStateIsIn(HttpTransportState.OPEN, HttpTransportState.ENDING);
                            var err = this.onChunk();
                            if (err) {
                                this.state = HttpTransportState.ENDED;
                                if (err.statusCode === 204) {
                                    if (this.listeners.onEnd) {
                                        this.listeners.onEnd(null);
                                    }
                                } else {
                                    if (this.listeners.onError) {
                                        this.listeners.onError(err);
                                    }
                                }
                            } else if (this.state <= HttpTransportState.ENDING) {
                                if (this.listeners.onError) {
                                    this.listeners.onError(new Error('HTTP response ended without receiving EOS message'));
                                }
                            } else {
                                if (this.listeners.onEnd) {
                                    this.listeners.onEnd(null);
                                }
                            }
                        } else {
                            this.assertStateIsIn(HttpTransportState.OPENING, HttpTransportState.OPEN, HttpTransportState.ENDED);
                            if (this.state === HttpTransportState.ENDED) {
                                return;
                            } else if (this.xhr.status === 0) {
                                if (this.listeners.onError) {
                                    this.listeners.onError(new network_1.NetworkError('Connection lost.'));
                                }
                            } else {
                                if (this.listeners.onError) {
                                    this.listeners.onError(network_1.ErrorResponse.fromXHR(this.xhr));
                                }
                            }
                        }
                    };
                    HttpSubscription.prototype.onChunk = function () {
                        this.assertStateIsIn(HttpTransportState.OPEN);
                        var response = this.xhr.responseText;
                        var newlineIndex = response.lastIndexOf('\n');
                        if (newlineIndex > this.lastNewlineIndex) {
                            var rawEvents = response.slice(this.lastNewlineIndex, newlineIndex).split('\n');
                            this.lastNewlineIndex = newlineIndex;
                            for (var _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
                                var rawEvent = rawEvents_1[_i];
                                if (rawEvent.length === 0) {
                                    continue;
                                }
                                var data = JSON.parse(rawEvent);
                                var err = this.onMessage(data);
                                if (err != null) {
                                    return err;
                                }
                            }
                        }
                    };
                    HttpSubscription.prototype.assertStateIsIn = function () {
                        var _this = this;
                        var validStates = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            validStates[_i] = arguments[_i];
                        }
                        var stateIsValid = validStates.some(function (validState) {
                            return validState === _this.state;
                        });
                        if (!stateIsValid) {
                            var expectedStates = validStates.map(function (state) {
                                return HttpTransportState[state];
                            }).join(', ');
                            var actualState = HttpTransportState[this.state];
                            window.console.warn("Expected this.state to be one of [" + expectedStates + "] but it is " + actualState);
                        }
                    };
                    HttpSubscription.prototype.onMessage = function (message) {
                        this.assertStateIsIn(HttpTransportState.OPEN);
                        this.verifyMessage(message);
                        switch (message[0]) {
                            case 0:
                                return null;
                            case 1:
                                return this.onEventMessage(message);
                            case 255:
                                return this.onEOSMessage(message);
                            default:
                                return new Error('Unknown Message: ' + JSON.stringify(message));
                        }
                    };
                    HttpSubscription.prototype.onEventMessage = function (eventMessage) {
                        this.assertStateIsIn(HttpTransportState.OPEN);
                        if (eventMessage.length !== 4) {
                            return new Error('Event message has ' + eventMessage.length + ' elements (expected 4)');
                        }
                        var _ = eventMessage[0],
                            id = eventMessage[1],
                            headers = eventMessage[2],
                            body = eventMessage[3];
                        if (typeof id !== 'string') {
                            return new Error('Invalid event ID in message: ' + JSON.stringify(eventMessage));
                        }
                        if (typeof headers !== 'object' || Array.isArray(headers)) {
                            return new Error('Invalid event headers in message: ' + JSON.stringify(eventMessage));
                        }
                        if (this.listeners.onEvent) {
                            this.listeners.onEvent({ body: body, headers: headers, eventId: id });
                        }
                        return null;
                    };
                    HttpSubscription.prototype.onEOSMessage = function (eosMessage) {
                        this.assertStateIsIn(HttpTransportState.OPEN);
                        if (eosMessage.length !== 4) {
                            return new Error('EOS message has ' + eosMessage.length + ' elements (expected 4)');
                        }
                        var _ = eosMessage[0],
                            statusCode = eosMessage[1],
                            headers = eosMessage[2],
                            info = eosMessage[3];
                        if (typeof statusCode !== 'number') {
                            return new Error('Invalid EOS Status Code');
                        }
                        if (typeof headers !== 'object' || Array.isArray(headers)) {
                            return new Error('Invalid EOS ElementsHeaders');
                        }
                        this.state = HttpTransportState.ENDING;
                        return new network_1.ErrorResponse(statusCode, headers, info);
                    };
                    HttpSubscription.prototype.verifyMessage = function (message) {
                        if (this.gotEOS) {
                            return new Error('Got another message after EOS message');
                        }
                        if (!Array.isArray(message)) {
                            return new Error('Message is not an array');
                        }
                        if (message.length < 1) {
                            return new Error('Message is empty array');
                        }
                    };
                    return HttpSubscription;
                }();
                var HttpTransport = function () {
                    function HttpTransport(host, encrypted) {
                        this.baseURL = (encrypted !== false ? 'https' : 'http') + "://" + host;
                    }
                    HttpTransport.prototype.request = function (requestOptions) {
                        return this.createXHR(this.baseURL, requestOptions);
                    };
                    HttpTransport.prototype.subscribe = function (path, listeners, headers) {
                        var requestOptions = {
                            headers: headers,
                            method: 'SUBSCRIBE',
                            path: path
                        };
                        return new HttpSubscription(this.createXHR(this.baseURL, requestOptions), listeners);
                    };
                    HttpTransport.prototype.createXHR = function (baseURL, options) {
                        var xhr = new window.XMLHttpRequest();
                        var path = options.path.replace(/^\/+/, '');
                        var endpoint = baseURL + "/" + path;
                        xhr.open(options.method.toUpperCase(), endpoint, true);
                        if (options.body) {
                            xhr.setRequestHeader('content-type', 'application/json');
                        }
                        if (options.jwt) {
                            xhr.setRequestHeader('authorization', "Bearer " + options.jwt);
                        }
                        if (options.headers) {
                            for (var key in options.headers) {
                                if (options.headers.hasOwnProperty(key)) {
                                    xhr.setRequestHeader(key, options.headers[key]);
                                }
                            }
                        }
                        return xhr;
                    };
                    return HttpTransport;
                }();
                exports.default = HttpTransport;

                /***/
            },
            /* 13 */
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
                var network_1 = __webpack_require__(0);
                var SubscribeMessageType = 100;
                var OpenMessageType = 101;
                var EventMessageType = 102;
                var UnsubscribeMessageType = 198;
                var EosMessageType = 199;
                var PingMessageType = 16;
                var PongMessageType = 17;
                var CloseMessageType = 99;
                var WSReadyState;
                (function (WSReadyState) {
                    WSReadyState[WSReadyState["Connecting"] = 0] = "Connecting";
                    WSReadyState[WSReadyState["Open"] = 1] = "Open";
                    WSReadyState[WSReadyState["Closing"] = 2] = "Closing";
                    WSReadyState[WSReadyState["Closed"] = 3] = "Closed";
                })(WSReadyState = exports.WSReadyState || (exports.WSReadyState = {}));
                var WsSubscriptions = function () {
                    function WsSubscriptions() {
                        this.subscriptions = {};
                    }
                    WsSubscriptions.prototype.add = function (subID, path, listeners, headers) {
                        this.subscriptions[subID] = {
                            headers: headers,
                            listeners: listeners,
                            path: path
                        };
                        return subID;
                    };
                    WsSubscriptions.prototype.has = function (subID) {
                        return this.subscriptions[subID] !== undefined;
                    };
                    WsSubscriptions.prototype.isEmpty = function () {
                        return Object.keys(this.subscriptions).length === 0;
                    };
                    WsSubscriptions.prototype.remove = function (subID) {
                        return delete this.subscriptions[subID];
                    };
                    WsSubscriptions.prototype.get = function (subID) {
                        return this.subscriptions[subID];
                    };
                    WsSubscriptions.prototype.getAll = function () {
                        return this.subscriptions;
                    };
                    WsSubscriptions.prototype.getAllAsArray = function () {
                        var _this = this;
                        return Object.keys(this.subscriptions).map(function (subID) {
                            return __assign({ subID: parseInt(subID, 10) }, _this.subscriptions[parseInt(subID, 10)]);
                        });
                    };
                    WsSubscriptions.prototype.removeAll = function () {
                        this.subscriptions = {};
                    };
                    return WsSubscriptions;
                }();
                var WsSubscription = function () {
                    function WsSubscription(wsTransport, subID) {
                        this.wsTransport = wsTransport;
                        this.subID = subID;
                    }
                    WsSubscription.prototype.unsubscribe = function () {
                        this.wsTransport.unsubscribe(this.subID);
                    };
                    return WsSubscription;
                }();
                var pingIntervalMs = 30000;
                var pingTimeoutMs = 10000;
                var WebSocketTransport = function () {
                    function WebSocketTransport(host) {
                        this.webSocketPath = '/ws';
                        this.forcedClose = false;
                        this.closedError = null;
                        this.baseURL = "wss://" + host + this.webSocketPath;
                        this.lastSubscriptionID = 0;
                        this.subscriptions = new WsSubscriptions();
                        this.pendingSubscriptions = new WsSubscriptions();
                        this.connect();
                    }
                    WebSocketTransport.prototype.subscribe = function (path, listeners, headers) {
                        this.tryReconnectIfNeeded();
                        var subID = this.lastSubscriptionID++;
                        if (this.socket.readyState !== WSReadyState.Open) {
                            this.pendingSubscriptions.add(subID, path, listeners, headers);
                            return new WsSubscription(this, subID);
                        }
                        this.subscriptions.add(subID, path, listeners, headers);
                        this.sendMessage(this.getMessage(SubscribeMessageType, subID, path, headers));
                        return new WsSubscription(this, subID);
                    };
                    WebSocketTransport.prototype.unsubscribe = function (subID) {
                        this.sendMessage(this.getMessage(UnsubscribeMessageType, subID));
                        var subscription = this.subscriptions.get(subID);
                        if (subscription.listeners.onEnd) {
                            subscription.listeners.onEnd(null);
                        }
                        this.subscriptions.remove(subID);
                    };
                    WebSocketTransport.prototype.connect = function () {
                        var _this = this;
                        this.close();
                        this.forcedClose = false;
                        this.closedError = null;
                        this.socket = new window.WebSocket(this.baseURL);
                        this.socket.onopen = function (event) {
                            var allPendingSubscriptions = _this.pendingSubscriptions.getAllAsArray();
                            allPendingSubscriptions.forEach(function (subscription) {
                                var subID = subscription.subID,
                                    path = subscription.path,
                                    listeners = subscription.listeners,
                                    headers = subscription.headers;
                                _this.subscribePending(path, listeners, headers, subID);
                            });
                            _this.pendingSubscriptions.removeAll();
                            _this.pingInterval = window.setInterval(function () {
                                if (_this.pongTimeout) {
                                    return;
                                }
                                var now = new Date().getTime();
                                if (pingTimeoutMs > now - _this.lastMessageReceivedTimestamp) {
                                    return;
                                }
                                _this.sendMessage(_this.getMessage(PingMessageType, now));
                                _this.lastSentPingID = now;
                                _this.pongTimeout = window.setTimeout(function () {
                                    var now = new Date().getTime();
                                    if (pingTimeoutMs > now - _this.lastMessageReceivedTimestamp) {
                                        _this.pongTimeout = null;
                                        return;
                                    }
                                    _this.close(new network_1.NetworkError("Pong response wasn't received until timeout."));
                                }, pingTimeoutMs);
                            }, pingIntervalMs);
                        };
                        this.socket.onmessage = function (event) {
                            return _this.receiveMessage(event);
                        };
                        this.socket.onerror = function (event) {
                            _this.close(new network_1.NetworkError('Connection was lost.'));
                        };
                        this.socket.onclose = function (event) {
                            if (!_this.forcedClose) {
                                _this.tryReconnectIfNeeded();
                                return;
                            }
                            var callback = _this.closedError ? function (subscription) {
                                if (subscription.listeners.onError) {
                                    subscription.listeners.onError(_this.closedError);
                                }
                            } : function (subscription) {
                                if (subscription.listeners.onEnd) {
                                    subscription.listeners.onEnd(null);
                                }
                            };
                            var allSubscriptions = _this.pendingSubscriptions.isEmpty() === false ? _this.pendingSubscriptions : _this.subscriptions;
                            allSubscriptions.getAllAsArray().forEach(callback);
                            allSubscriptions.removeAll();
                            if (_this.closedError) {
                                _this.tryReconnectIfNeeded();
                            }
                        };
                    };
                    WebSocketTransport.prototype.close = function (error) {
                        if (!(this.socket instanceof window.WebSocket)) {
                            return;
                        }
                        this.forcedClose = true;
                        this.closedError = error;
                        this.socket.close();
                        window.clearTimeout(this.pingInterval);
                        window.clearTimeout(this.pongTimeout);
                        delete this.pongTimeout;
                        this.lastSentPingID = null;
                    };
                    WebSocketTransport.prototype.tryReconnectIfNeeded = function () {
                        if (this.socket.readyState !== WSReadyState.Closed) {
                            return;
                        }
                        this.connect();
                    };
                    WebSocketTransport.prototype.subscribePending = function (path, listeners, headers, subID) {
                        if (subID === undefined) {
                            window.console.logger.debug("Subscription to path " + path + " has an undefined ID");
                            return;
                        }
                        this.subscriptions.add(subID, path, listeners, headers);
                        this.sendMessage(this.getMessage(SubscribeMessageType, subID, path, headers));
                    };
                    WebSocketTransport.prototype.getMessage = function (messageType, id, path, headers) {
                        return [messageType, id, path, headers];
                    };
                    WebSocketTransport.prototype.sendMessage = function (message) {
                        if (this.socket.readyState !== WSReadyState.Open) {
                            return window.console.warn("Can't send in \"" + WSReadyState[this.socket.readyState] + "\" state");
                        }
                        this.socket.send(JSON.stringify(message));
                    };
                    WebSocketTransport.prototype.subscription = function (subID) {
                        return this.subscriptions.get(subID);
                    };
                    WebSocketTransport.prototype.receiveMessage = function (event) {
                        this.lastMessageReceivedTimestamp = new Date().getTime();
                        var message;
                        try {
                            message = JSON.parse(event.data);
                        } catch (err) {
                            this.close(new Error("Message is not valid JSON format. Getting " + event.data));
                            return;
                        }
                        var nonValidMessageError = this.validateMessage(message);
                        if (nonValidMessageError) {
                            this.close(new Error(nonValidMessageError.message));
                            return;
                        }
                        var messageType = message.shift();
                        switch (messageType) {
                            case PongMessageType:
                                this.onPongMessage(message);
                                return;
                            case PingMessageType:
                                this.onPingMessage(message);
                                return;
                            case CloseMessageType:
                                this.onCloseMessage(message);
                                return;
                        }
                        var subID = message.shift();
                        var subscription = this.subscription(subID);
                        if (!subscription) {
                            this.close(new Error("Received message for non existing subscription id: \"" + subID + "\""));
                            return;
                        }
                        var listeners = subscription.listeners;
                        switch (messageType) {
                            case OpenMessageType:
                                this.onOpenMessage(message, subID, listeners);
                                break;
                            case EventMessageType:
                                this.onEventMessage(message, listeners);
                                break;
                            case EosMessageType:
                                this.onEOSMessage(message, subID, listeners);
                                break;
                            default:
                                this.close(new Error('Received non existing type of message.'));
                        }
                    };
                    WebSocketTransport.prototype.validateMessage = function (message) {
                        if (!Array.isArray(message)) {
                            return new Error("Message is expected to be an array. Getting: " + JSON.stringify(message));
                        }
                        if (message.length < 1) {
                            return new Error("Message is empty array: " + JSON.stringify(message));
                        }
                        return null;
                    };
                    WebSocketTransport.prototype.onOpenMessage = function (message, subID, subscriptionListeners) {
                        if (subscriptionListeners.onOpen) {
                            subscriptionListeners.onOpen(message[1]);
                        }
                    };
                    WebSocketTransport.prototype.onEventMessage = function (eventMessage, subscriptionListeners) {
                        if (eventMessage.length !== 3) {
                            return new Error('Event message has ' + eventMessage.length + ' elements (expected 4)');
                        }
                        var eventId = eventMessage[0],
                            headers = eventMessage[1],
                            body = eventMessage[2];
                        if (typeof eventId !== 'string') {
                            return new Error("Invalid event ID in message: " + JSON.stringify(eventMessage));
                        }
                        if (typeof headers !== 'object' || Array.isArray(headers)) {
                            return new Error("Invalid event headers in message: " + JSON.stringify(eventMessage));
                        }
                        if (subscriptionListeners.onEvent) {
                            subscriptionListeners.onEvent({ eventId: eventId, headers: headers, body: body });
                        }
                    };
                    WebSocketTransport.prototype.onEOSMessage = function (eosMessage, subID, subscriptionListeners) {
                        this.subscriptions.remove(subID);
                        if (eosMessage.length !== 3) {
                            if (subscriptionListeners.onError) {
                                subscriptionListeners.onError(new Error("EOS message has " + eosMessage.length + " elements (expected 4)"));
                            }
                            return;
                        }
                        var statusCode = eosMessage[0],
                            headers = eosMessage[1],
                            body = eosMessage[2];
                        if (typeof statusCode !== 'number') {
                            if (subscriptionListeners.onError) {
                                subscriptionListeners.onError(new Error('Invalid EOS Status Code'));
                            }
                            return;
                        }
                        if (typeof headers !== 'object' || Array.isArray(headers)) {
                            if (subscriptionListeners.onError) {
                                subscriptionListeners.onError(new Error('Invalid EOS ElementsHeaders'));
                            }
                            return;
                        }
                        if (statusCode === 204) {
                            if (subscriptionListeners.onEnd) {
                                subscriptionListeners.onEnd(null);
                            }
                            return;
                        }
                        if (subscriptionListeners.onError) {
                            subscriptionListeners.onError(new network_1.ErrorResponse(statusCode, headers, body));
                        }
                        return;
                    };
                    WebSocketTransport.prototype.onCloseMessage = function (closeMessage) {
                        var statusCode = closeMessage[0],
                            headers = closeMessage[1],
                            body = closeMessage[2];
                        if (typeof statusCode !== 'number') {
                            return this.close(new Error('Close message: Invalid EOS Status Code'));
                        }
                        if (typeof headers !== 'object' || Array.isArray(headers)) {
                            return this.close(new Error('Close message: Invalid EOS ElementsHeaders'));
                        }
                        this.close();
                    };
                    WebSocketTransport.prototype.onPongMessage = function (message) {
                        var receviedPongID = message[0];
                        if (this.lastSentPingID !== receviedPongID) {
                            this.close(new network_1.NetworkError("Didn't received pong with proper ID"));
                        }
                        window.clearTimeout(this.pongTimeout);
                        delete this.pongTimeout;
                        this.lastSentPingID = null;
                    };
                    WebSocketTransport.prototype.onPingMessage = function (message) {
                        var receviedPingID = message[0];
                        this.sendMessage(this.getMessage(PongMessageType, receviedPingID));
                    };
                    return WebSocketTransport;
                }();
                exports.default = WebSocketTransport;

                /***/
            },
            /* 14 */
            /***/function (module, exports, __webpack_require__) {

                "use strict";

                Object.defineProperty(exports, "__esModule", { value: true });
                var base_client_1 = __webpack_require__(3);
                var logger_1 = __webpack_require__(1);
                var HOST_BASE = 'pusherplatform.io';
                var Instance = function () {
                    function Instance(options) {
                        if (!options.locator) {
                            throw new Error('Expected `locator` property in Instance options!');
                        }
                        if (options.locator.split(':').length !== 3) {
                            throw new Error('The instance locator property is in the wrong format!');
                        }
                        if (!options.serviceName) {
                            throw new Error('Expected `serviceName` property in Instance options!');
                        }
                        if (!options.serviceVersion) {
                            throw new Error('Expected `serviceVersion` property in Instance otpions!');
                        }
                        var splitLocator = options.locator.split(':');
                        this.platformVersion = splitLocator[0];
                        this.cluster = splitLocator[1];
                        this.id = splitLocator[2];
                        this.serviceName = options.serviceName;
                        this.serviceVersion = options.serviceVersion;
                        this.host = options.host || this.cluster + "." + HOST_BASE;
                        this.logger = options.logger || new logger_1.ConsoleLogger();
                        this.client = options.client || new base_client_1.BaseClient({
                            encrypted: options.encrypted,
                            host: this.host,
                            logger: this.logger
                        });
                        this.tokenProvider = options.tokenProvider;
                    }
                    Instance.prototype.request = function (options, tokenParams) {
                        options.path = this.absPath(options.path);
                        if (options.headers == null || options.headers === undefined) {
                            options.headers = {};
                        }
                        options.tokenProvider = options.tokenProvider || this.tokenProvider;
                        return this.client.request(options, tokenParams);
                    };
                    Instance.prototype.subscribeNonResuming = function (options) {
                        var headers = options.headers || {};
                        var retryStrategyOptions = options.retryStrategyOptions || {};
                        var tokenProvider = options.tokenProvider || this.tokenProvider;
                        return this.client.subscribeNonResuming(this.absPath(options.path), headers, options.listeners, retryStrategyOptions, tokenProvider);
                    };
                    Instance.prototype.subscribeResuming = function (options) {
                        var headers = options.headers || {};
                        var retryStrategyOptions = options.retryStrategyOptions || {};
                        var tokenProvider = options.tokenProvider || this.tokenProvider;
                        return this.client.subscribeResuming(this.absPath(options.path), headers, options.listeners, retryStrategyOptions, options.initialEventId, tokenProvider);
                    };
                    Instance.prototype.absPath = function (relativePath) {
                        return ("/services/" + this.serviceName + "/" + this.serviceVersion + "/" + this.id + "/" + relativePath).replace(/\/+/g, '/').replace(/\/+$/, '');
                    };
                    return Instance;
                }();
                exports.default = Instance;

                /***/
            }]
            /******/)
        );
    });
});

var PusherPlatform = unwrapExports(pusherPlatform);

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
  return Object.keys(data).filter(function (key) {
    return data[key] !== undefined;
  }).map(function (key) {
    return key + "=" + encodeURIComponent(data[key]);
  }).join("&");
}

function queryString(data) {
  var encodedData = urlEncode(data);
  return encodedData ? "?" + encodedData : "";
}

function unixTimeNow() {
  return Math.floor(Date.now() / 1000);
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













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var Feed = function () {
  function Feed(_ref) {
    var instance = _ref.instance,
        feedId = _ref.feedId,
        readTokenProvider = _ref.readTokenProvider;
    classCallCheck(this, Feed);

    this.instance = instance;
    this.feedId = feedId;
    this.readTokenProvider = readTokenProvider;
  }

  createClass(Feed, [{
    key: "subscribe",
    value: function subscribe() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var onOpen = _ref2.onOpen,
          onItem = _ref2.onItem,
          options = objectWithoutProperties(_ref2, ["onOpen", "onItem"]);

      if (onOpen && typeof onOpen !== "function") {
        throw new TypeError("onOpen must be a function, got " + onOpen);
      }
      if (typeof onItem !== "function") {
        throw new TypeError("Must provide an `onItem` callback");
      }
      var onEvent = function onEvent(event) {
        if (event.body.type === 0 && onOpen) {
          onOpen(event.body.data);
        } else if (event.body.type === 1 && onItem) {
          onItem(event.body.data);
        } else if (event.body.type > 1) {
          throw new TypeError("Unsupported event type '" + event.body.type + "'");
        }
      };
      return this.instance.subscribeResuming(_extends({}, options, {
        // Mapping our itemId to platform library eventId
        initialEventId: options.lastItemId,
        path: "feeds/" + this.feedId + "/items" + queryString({
          previous_items: options.previousItems
        }),
        tokenProvider: this.readTokenProvider,
        listeners: {
          onEvent: onEvent,
          onSubscribe: options.onSubscribe,
          onRetrying: options.onRetrying,
          onError: options.onError,
          onEnd: options.onEnd
        }
      }));
    }
  }, {
    key: "paginate",
    value: function paginate() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          cursor = _ref3.cursor,
          _ref3$limit = _ref3.limit,
          limit = _ref3$limit === undefined ? 50 : _ref3$limit;

      return parseResponse(this.instance.request({
        method: "GET",
        path: "feeds/" + this.feedId + "/items" + queryString({
          cursor: cursor,
          limit: limit
        }),
        tokenProvider: this.readTokenProvider
      }));
    }
  }]);
  return Feed;
}();

var cacheExpiryTolerance = 10 * 60; // 10 minutes (in seconds)
var feedIdRegex = /^[a-zA-Z0-9-]+$/;
var tokenProviderTimeout = 30 * 1000; // 30 seconds (in ms)

var TokenProvider = function () {
  function TokenProvider(_ref) {
    var authEndpoint = _ref.authEndpoint,
        authData = _ref.authData;
    classCallCheck(this, TokenProvider);

    this.authEndpoint = authEndpoint;
    this.authData = authData;
  }

  createClass(TokenProvider, [{
    key: "fetchToken",
    value: function fetchToken() {
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
      this.cacheValidUntil = unixTimeNow() + expiresIn - cacheExpiryTolerance;
    }
  }, {
    key: "makeAuthRequest",
    value: function makeAuthRequest() {
      var _this2 = this;

      if (typeof this.authEndpoint != "string") {
        throw new TypeError("Expected authEndpoint to be a string, but got " + this.authEndpoint + ". Please provide an authEndpoint to access private feeds. (See http://docs.pusher.com/feeds/concepts/private-feeds/)");
      }
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", _this2.authEndpoint);
        xhr.timeout = tokenProviderTimeout;
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error("Couldn't fetch token from " + _this2.authEndpoint + "; got " + xhr.status + " " + xhr.statusText + "."));
          }
        };
        xhr.ontimeout = function () {
          reject(new Error("Request timed out while fetching token from " + _this2.authEndpoint));
        };
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(urlEncode(_extends({}, _this2.authData, {
          grant_type: "client_credentials"
        })));
      });
    }
  }, {
    key: "cacheIsStale",
    get: function get$$1() {
      return !this.cachedToken || unixTimeNow() > this.cacheValidUntil;
    }
  }]);
  return TokenProvider;
}();

var Feeds = function () {
  function Feeds() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$authData = _ref.authData,
        authData = _ref$authData === undefined ? {} : _ref$authData,
        authEndpoint = _ref.authEndpoint,
        host = _ref.host,
        instanceLocator = _ref.instanceLocator,
        logLevel = _ref.logLevel,
        logger = _ref.logger;

    classCallCheck(this, Feeds);

    this.authData = authData;
    this.authEndpoint = authEndpoint;
    this.listTokenProvider = new TokenProvider({
      authEndpoint: this.authEndpoint,
      authData: _extends({}, this.authData, {
        path: "feeds",
        action: "READ"
      })
    });
    this.firehoseTokenProvider = new TokenProvider({
      authEndpoint: this.authEndpoint,
      authData: _extends({}, this.authData, {
        path: "firehose/items",
        action: "READ"
      })
    });
    if (!logger && logLevel) {
      logger = new PusherPlatform.ConsoleLogger(logLevel);
    }
    this.instance = new PusherPlatform.Instance({
      host: host,
      locator: instanceLocator,
      logger: logger,
      serviceName: "feeds",
      serviceVersion: "v1"
    });
  }

  createClass(Feeds, [{
    key: "list",
    value: function list() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          prefix = _ref2.prefix,
          limit = _ref2.limit;

      return parseResponse(this.instance.request({
        method: "GET",
        path: "feeds" + queryString({ prefix: prefix, limit: limit }),
        tokenProvider: this.listTokenProvider
      }));
    }
  }, {
    key: "feed",
    value: function feed(feedId) {
      if (!feedId || !feedId.match(feedIdRegex)) {
        throw new TypeError("Invalid feedId: " + feedId);
      }
      var readTokenProvider = feedId.startsWith("private-") ? new TokenProvider({
        authEndpoint: this.authEndpoint,
        authData: _extends({}, this.authData, {
          path: "feeds/" + feedId + "/items",
          action: "READ"
        })
      }) : null;
      return new Feed({
        instance: this.instance,
        feedId: feedId,
        readTokenProvider: readTokenProvider
      });
    }
  }, {
    key: "firehose",
    value: function firehose() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var onPublish = _ref3.onPublish,
          onSubscribe = _ref3.onSubscribe,
          onUnsubscribe = _ref3.onUnsubscribe,
          options = objectWithoutProperties(_ref3, ["onPublish", "onSubscribe", "onUnsubscribe"]);

      validateFirehoseCallbacks({ onPublish: onPublish, onSubscribe: onSubscribe, onUnsubscribe: onUnsubscribe });
      var onEvent = function onEvent(event) {
        if (event.body.type === 0 && onPublish) {
          onPublish(event.body.data);
        } else if (event.body.type === 1 && onSubscribe) {
          onSubscribe(event.body.data);
        } else if (event.body.type === 2 && onUnsubscribe) {
          onUnsubscribe(event.body.data);
        } else if (event.body.type > 2) {
          throw new TypeError("Unsupported firehose event type '" + event.body.type + "'");
        }
      };
      return this.instance.subscribeNonResuming(_extends({}, options, {
        path: "firehose/items",
        tokenProvider: this.firehoseTokenProvider,
        listeners: {
          onEvent: onEvent,
          onOpen: options.onOpen,
          onSubscribe: options.onSubscribe,
          onError: options.onError,
          onEnd: options.onEnd
        }
      }));
    }
  }]);
  return Feeds;
}();

function validateFirehoseCallbacks(callbacks) {
  var defined = Object.keys(callbacks).filter(function (k) {
    return callbacks[k] !== undefined;
  }).map(function (k) {
    return { name: k, callback: callbacks[k] };
  });
  defined.forEach(function (_ref4) {
    var name = _ref4.name,
        callback = _ref4.callback;

    if (typeof callback !== "function") {
      throw new TypeError(name + " must be a function, got " + callback);
    }
  });
  if (defined.length === 0) {
    throw new TypeError("Must provide at least one of onPublish, onSubscribe, or onUnsubscribe");
  }
}

return Feeds;

})));
//# sourceMappingURL=pusher-feeds-client.js.map
