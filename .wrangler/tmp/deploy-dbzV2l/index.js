var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// .vercel/output/static/_worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var se = Object.create;
var U = Object.defineProperty;
var re = Object.getOwnPropertyDescriptor;
var ne = Object.getOwnPropertyNames;
var ie = Object.getPrototypeOf;
var oe = Object.prototype.hasOwnProperty;
var j = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "j");
var V = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ce = /* @__PURE__ */ __name((e, t, s, a) => {
  if (t && typeof t == "object" || typeof t == "function") for (let n of ne(t)) !oe.call(e, n) && n !== s && U(e, n, { get: /* @__PURE__ */ __name(() => t[n], "get"), enumerable: !(a = re(t, n)) || a.enumerable });
  return e;
}, "ce");
var $ = /* @__PURE__ */ __name((e, t, s) => (s = e != null ? se(ie(e)) : {}, ce(t || !e || !e.__esModule ? U(s, "default", { value: e, enumerable: true }) : s, e)), "$");
var m;
var p = j(() => {
  m = { collectedLocales: [] };
});
var _;
var u = j(() => {
  _ = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }, { src: "^/attraction/(?<nxtPid>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/attraction/[id].rsc?nxtPid=$nxtPid" }, { src: "^/attraction/(?<nxtPid>[^/]+?)(?:/)?$", dest: "/attraction/[id]?nxtPid=$nxtPid" }, { src: "^/booking/(?<nxtPref>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/booking/[ref].rsc?nxtPref=$nxtPref" }, { src: "^/booking/(?<nxtPref>[^/]+?)(?:/)?$", dest: "/booking/[ref]?nxtPref=$nxtPref" }, { src: "^/pass/(?<nxtPref>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/pass/[ref].rsc?nxtPref=$nxtPref" }, { src: "^/pass/(?<nxtPref>[^/]+?)(?:/)?$", dest: "/pass/[ref]?nxtPref=$nxtPref" }, { src: "^/passes/(?<nxtPid>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/passes/[id].rsc?nxtPid=$nxtPid" }, { src: "^/passes/(?<nxtPid>[^/]+?)(?:/)?$", dest: "/passes/[id]?nxtPid=$nxtPid" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|LvnM_54kuOJBGLmljY1L4)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404, headers: { "x-next-error-status": "404" } }, { src: "^/.*$", dest: "/500", status: 500, headers: { "x-next-error-status": "500" } }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "inline" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { version: "14.2.35" }, crons: [] };
});
var y;
var l = j(() => {
  y = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/LvnM_54kuOJBGLmljY1L4/_buildManifest.js": { type: "static" }, "/_next/static/LvnM_54kuOJBGLmljY1L4/_ssgManifest.js": { type: "static" }, "/_next/static/chunks/30-2c7da7552f1a52c0.js": { type: "static" }, "/_next/static/chunks/415-bdc05d962be7d1ef.js": { type: "static" }, "/_next/static/chunks/886-26a7e1b9be268b3f.js": { type: "static" }, "/_next/static/chunks/972-1722ba4e91ef8ad8.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-9d91a0220966b351.js": { type: "static" }, "/_next/static/chunks/app/admin/page-d24b0479c6d1ca13.js": { type: "static" }, "/_next/static/chunks/app/attraction/[id]/page-eaf3684277408c06.js": { type: "static" }, "/_next/static/chunks/app/booking/[ref]/page-57b9ad8a54260dc0.js": { type: "static" }, "/_next/static/chunks/app/checkout/page-c726269dfa8dd87a.js": { type: "static" }, "/_next/static/chunks/app/explore/page-d0cd21d11a2d0887.js": { type: "static" }, "/_next/static/chunks/app/layout-86725cbe2b92b494.js": { type: "static" }, "/_next/static/chunks/app/my-passes/page-235d3d7987e356c1.js": { type: "static" }, "/_next/static/chunks/app/page-5d6034649fdf3c41.js": { type: "static" }, "/_next/static/chunks/app/pass/[ref]/page-ca320ed3ece8bc06.js": { type: "static" }, "/_next/static/chunks/app/passes/[id]/page-ed885d9820e78713.js": { type: "static" }, "/_next/static/chunks/app/passes/page-bdb563254d4f982a.js": { type: "static" }, "/_next/static/chunks/app/payment/authorize/page-51bd835942c46b3c.js": { type: "static" }, "/_next/static/chunks/app/payment/result/page-c6544285f992fc2a.js": { type: "static" }, "/_next/static/chunks/app/payment/upi-one-world/page-4091663d5b55fe36.js": { type: "static" }, "/_next/static/chunks/app/payment/verify-identity/page-a82dbdcae0e9d6c5.js": { type: "static" }, "/_next/static/chunks/app/payment/verify-visitor/page-10de6e02217362fb.js": { type: "static" }, "/_next/static/chunks/app/payment/wallet-confirm/page-49884a5472b22030.js": { type: "static" }, "/_next/static/chunks/app/payment/wallet-funding/page-22c2eeadf9e3f07b.js": { type: "static" }, "/_next/static/chunks/app/payment/wallet-setup/page-910a4c5fef9f897e.js": { type: "static" }, "/_next/static/chunks/app/payment-help/page-c76f6aa8592394cf.js": { type: "static" }, "/_next/static/chunks/app/redeem/page-8fc8510522498d38.js": { type: "static" }, "/_next/static/chunks/fd9d1056-91e4ec54a3b7ea65.js": { type: "static" }, "/_next/static/chunks/framework-f66176bb897dc684.js": { type: "static" }, "/_next/static/chunks/main-2c21883adf66c345.js": { type: "static" }, "/_next/static/chunks/main-app-789471cc94d0a424.js": { type: "static" }, "/_next/static/chunks/pages/_app-72b849fbd24ac258.js": { type: "static" }, "/_next/static/chunks/pages/_error-7ba65e1336b92748.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/webpack-8cb69853a274138d.js": { type: "static" }, "/_next/static/css/a8951b70f7ebe18b.css": { type: "static" }, "/_next/static/media/636a5ac981f94f8b-s.p.woff2": { type: "static" }, "/_next/static/media/6fe53d21e6e7ebd8-s.woff2": { type: "static" }, "/_next/static/media/8ebc6e9dde468c4a-s.woff2": { type: "static" }, "/_next/static/media/9e7b0a821b9dfcb4-s.woff2": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/images/attractions/arjunas_penance.jpg": { type: "static" }, "/images/attractions/coimbatore_adiyogi.jpg": { type: "static" }, "/images/attractions/coimbatore_gass_museum.jpg": { type: "static" }, "/images/attractions/coimbatore_marudhamalai.jpg": { type: "static" }, "/images/attractions/coimbatore_siruvani.jpg": { type: "static" }, "/images/attractions/coimbatore_valankulam.jpg": { type: "static" }, "/images/attractions/dakshinachitra.jpg": { type: "static" }, "/images/attractions/five_rathas.jpg": { type: "static" }, "/images/attractions/kovalam_beach.jpg": { type: "static" }, "/images/attractions/muttukadu_boating.jpg": { type: "static" }, "/images/attractions/shore_temple.jpg": { type: "static" }, "/images/logo-icon.png": { type: "static" }, "/images/logo.png": { type: "static" }, "/images/tn_hero_banner.jpg": { type: "static" }, "/attraction/[id]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/attraction/[id].func.js" }, "/attraction/[id].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/attraction/[id].func.js" }, "/booking/[ref]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/booking/[ref].func.js" }, "/booking/[ref].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/booking/[ref].func.js" }, "/pass/[ref]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/pass/[ref].func.js" }, "/pass/[ref].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/pass/[ref].func.js" }, "/passes/[id]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/passes/[id].func.js" }, "/passes/[id].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/passes/[id].func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/admin.html": { type: "override", path: "/admin.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/admin": { type: "override", path: "/admin.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/admin.rsc": { type: "override", path: "/admin.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/checkout.html": { type: "override", path: "/checkout.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/checkout/layout,_N_T_/checkout/page,_N_T_/checkout", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/checkout": { type: "override", path: "/checkout.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/checkout/layout,_N_T_/checkout/page,_N_T_/checkout", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/checkout.rsc": { type: "override", path: "/checkout.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/checkout/layout,_N_T_/checkout/page,_N_T_/checkout", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/explore.html": { type: "override", path: "/explore.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/explore/layout,_N_T_/explore/page,_N_T_/explore", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/explore": { type: "override", path: "/explore.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/explore/layout,_N_T_/explore/page,_N_T_/explore", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/explore.rsc": { type: "override", path: "/explore.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/explore/layout,_N_T_/explore/page,_N_T_/explore", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/index.html": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/index": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/index.rsc": { type: "override", path: "/index.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/my-passes.html": { type: "override", path: "/my-passes.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/my-passes/layout,_N_T_/my-passes/page,_N_T_/my-passes", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/my-passes": { type: "override", path: "/my-passes.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/my-passes/layout,_N_T_/my-passes/page,_N_T_/my-passes", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/my-passes.rsc": { type: "override", path: "/my-passes.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/my-passes/layout,_N_T_/my-passes/page,_N_T_/my-passes", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/passes.html": { type: "override", path: "/passes.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/passes/layout,_N_T_/passes/page,_N_T_/passes", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/passes": { type: "override", path: "/passes.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/passes/layout,_N_T_/passes/page,_N_T_/passes", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/passes.rsc": { type: "override", path: "/passes.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/passes/layout,_N_T_/passes/page,_N_T_/passes", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment/authorize.html": { type: "override", path: "/payment/authorize.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/authorize/layout,_N_T_/payment/authorize/page,_N_T_/payment/authorize", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/authorize": { type: "override", path: "/payment/authorize.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/authorize/layout,_N_T_/payment/authorize/page,_N_T_/payment/authorize", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/authorize.rsc": { type: "override", path: "/payment/authorize.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/authorize/layout,_N_T_/payment/authorize/page,_N_T_/payment/authorize", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment/result.html": { type: "override", path: "/payment/result.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/result/layout,_N_T_/payment/result/page,_N_T_/payment/result", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/result": { type: "override", path: "/payment/result.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/result/layout,_N_T_/payment/result/page,_N_T_/payment/result", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/result.rsc": { type: "override", path: "/payment/result.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/result/layout,_N_T_/payment/result/page,_N_T_/payment/result", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment/upi-one-world.html": { type: "override", path: "/payment/upi-one-world.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/upi-one-world/layout,_N_T_/payment/upi-one-world/page,_N_T_/payment/upi-one-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/upi-one-world": { type: "override", path: "/payment/upi-one-world.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/upi-one-world/layout,_N_T_/payment/upi-one-world/page,_N_T_/payment/upi-one-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/upi-one-world.rsc": { type: "override", path: "/payment/upi-one-world.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/upi-one-world/layout,_N_T_/payment/upi-one-world/page,_N_T_/payment/upi-one-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment/verify-identity.html": { type: "override", path: "/payment/verify-identity.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/verify-identity/layout,_N_T_/payment/verify-identity/page,_N_T_/payment/verify-identity", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/verify-identity": { type: "override", path: "/payment/verify-identity.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/verify-identity/layout,_N_T_/payment/verify-identity/page,_N_T_/payment/verify-identity", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/verify-identity.rsc": { type: "override", path: "/payment/verify-identity.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/verify-identity/layout,_N_T_/payment/verify-identity/page,_N_T_/payment/verify-identity", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment/verify-visitor.html": { type: "override", path: "/payment/verify-visitor.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/verify-visitor/layout,_N_T_/payment/verify-visitor/page,_N_T_/payment/verify-visitor", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/verify-visitor": { type: "override", path: "/payment/verify-visitor.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/verify-visitor/layout,_N_T_/payment/verify-visitor/page,_N_T_/payment/verify-visitor", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/verify-visitor.rsc": { type: "override", path: "/payment/verify-visitor.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/verify-visitor/layout,_N_T_/payment/verify-visitor/page,_N_T_/payment/verify-visitor", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment/wallet-confirm.html": { type: "override", path: "/payment/wallet-confirm.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-confirm/layout,_N_T_/payment/wallet-confirm/page,_N_T_/payment/wallet-confirm", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/wallet-confirm": { type: "override", path: "/payment/wallet-confirm.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-confirm/layout,_N_T_/payment/wallet-confirm/page,_N_T_/payment/wallet-confirm", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/wallet-confirm.rsc": { type: "override", path: "/payment/wallet-confirm.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-confirm/layout,_N_T_/payment/wallet-confirm/page,_N_T_/payment/wallet-confirm", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment/wallet-funding.html": { type: "override", path: "/payment/wallet-funding.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-funding/layout,_N_T_/payment/wallet-funding/page,_N_T_/payment/wallet-funding", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/wallet-funding": { type: "override", path: "/payment/wallet-funding.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-funding/layout,_N_T_/payment/wallet-funding/page,_N_T_/payment/wallet-funding", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/wallet-funding.rsc": { type: "override", path: "/payment/wallet-funding.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-funding/layout,_N_T_/payment/wallet-funding/page,_N_T_/payment/wallet-funding", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment/wallet-setup.html": { type: "override", path: "/payment/wallet-setup.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-setup/layout,_N_T_/payment/wallet-setup/page,_N_T_/payment/wallet-setup", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/wallet-setup": { type: "override", path: "/payment/wallet-setup.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-setup/layout,_N_T_/payment/wallet-setup/page,_N_T_/payment/wallet-setup", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment/wallet-setup.rsc": { type: "override", path: "/payment/wallet-setup.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment/layout,_N_T_/payment/wallet-setup/layout,_N_T_/payment/wallet-setup/page,_N_T_/payment/wallet-setup", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/payment-help.html": { type: "override", path: "/payment-help.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment-help/layout,_N_T_/payment-help/page,_N_T_/payment-help", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment-help": { type: "override", path: "/payment-help.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment-help/layout,_N_T_/payment-help/page,_N_T_/payment-help", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/payment-help.rsc": { type: "override", path: "/payment-help.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/payment-help/layout,_N_T_/payment-help/page,_N_T_/payment-help", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/redeem.html": { type: "override", path: "/redeem.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/redeem/layout,_N_T_/redeem/page,_N_T_/redeem", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/redeem": { type: "override", path: "/redeem.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/redeem/layout,_N_T_/redeem/page,_N_T_/redeem", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/redeem.rsc": { type: "override", path: "/redeem.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/redeem/layout,_N_T_/redeem/page,_N_T_/redeem", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } } };
});
var q = V((We, F) => {
  "use strict";
  p();
  u();
  l();
  function N(e, t) {
    e = String(e || "").trim();
    let s = e, a, n = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      a = e[0];
      let o = e.lastIndexOf(a);
      n += e.substring(o + 1), e = e.substring(1, o);
    }
    let r = 0;
    return e = le(e, (o) => {
      if (/^\(\?[P<']/.test(o)) {
        let c = /^\(\?P?[<']([^>']+)[>']/.exec(o);
        if (!c) throw new Error(`Failed to extract named captures from ${JSON.stringify(o)}`);
        let h = o.substring(c[0].length, o.length - 1);
        return t && (t[r] = c[1]), r++, `(${h})`;
      }
      return o.substring(0, 3) === "(?:" || r++, o;
    }), e = e.replace(/\[:([^:]+):\]/g, (o, c) => N.characterClasses[c] || o), new N.PCRE(e, n, s, n, a);
  }
  __name(N, "N");
  function le(e, t) {
    let s = 0, a = 0, n = false;
    for (let i = 0; i < e.length; i++) {
      let r = e[i];
      if (n) {
        n = false;
        continue;
      }
      switch (r) {
        case "(":
          a === 0 && (s = i), a++;
          break;
        case ")":
          if (a > 0 && (a--, a === 0)) {
            let o = i + 1, c = s === 0 ? "" : e.substring(0, s), h = e.substring(o), d = String(t(e.substring(s, o)));
            e = c + d + h, i = s;
          }
          break;
        case "\\":
          n = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(le, "le");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(a, n, i, r, o) {
        super(a, n), this.pcrePattern = i, this.pcreFlags = r, this.delimiter = o;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(N || (N = {}));
  N.prototype = N.PCRE.prototype;
  F.exports = N;
});
var Y = V((H) => {
  "use strict";
  p();
  u();
  l();
  H.parse = ve;
  H.serialize = we;
  var Te = Object.prototype.toString, k = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function ve(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var s = {}, a = t || {}, n = a.decode || Se, i = 0; i < e.length; ) {
      var r = e.indexOf("=", i);
      if (r === -1) break;
      var o = e.indexOf(";", i);
      if (o === -1) o = e.length;
      else if (o < r) {
        i = e.lastIndexOf(";", r - 1) + 1;
        continue;
      }
      var c = e.slice(i, r).trim();
      if (s[c] === void 0) {
        var h = e.slice(r + 1, o).trim();
        h.charCodeAt(0) === 34 && (h = h.slice(1, -1)), s[c] = Ce(h, n);
      }
      i = o + 1;
    }
    return s;
  }
  __name(ve, "ve");
  function we(e, t, s) {
    var a = s || {}, n = a.encode || Pe;
    if (typeof n != "function") throw new TypeError("option encode is invalid");
    if (!k.test(e)) throw new TypeError("argument name is invalid");
    var i = n(t);
    if (i && !k.test(i)) throw new TypeError("argument val is invalid");
    var r = e + "=" + i;
    if (a.maxAge != null) {
      var o = a.maxAge - 0;
      if (isNaN(o) || !isFinite(o)) throw new TypeError("option maxAge is invalid");
      r += "; Max-Age=" + Math.floor(o);
    }
    if (a.domain) {
      if (!k.test(a.domain)) throw new TypeError("option domain is invalid");
      r += "; Domain=" + a.domain;
    }
    if (a.path) {
      if (!k.test(a.path)) throw new TypeError("option path is invalid");
      r += "; Path=" + a.path;
    }
    if (a.expires) {
      var c = a.expires;
      if (!be(c) || isNaN(c.valueOf())) throw new TypeError("option expires is invalid");
      r += "; Expires=" + c.toUTCString();
    }
    if (a.httpOnly && (r += "; HttpOnly"), a.secure && (r += "; Secure"), a.priority) {
      var h = typeof a.priority == "string" ? a.priority.toLowerCase() : a.priority;
      switch (h) {
        case "low":
          r += "; Priority=Low";
          break;
        case "medium":
          r += "; Priority=Medium";
          break;
        case "high":
          r += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (a.sameSite) {
      var d = typeof a.sameSite == "string" ? a.sameSite.toLowerCase() : a.sameSite;
      switch (d) {
        case true:
          r += "; SameSite=Strict";
          break;
        case "lax":
          r += "; SameSite=Lax";
          break;
        case "strict":
          r += "; SameSite=Strict";
          break;
        case "none":
          r += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return r;
  }
  __name(we, "we");
  function Se(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(Se, "Se");
  function Pe(e) {
    return encodeURIComponent(e);
  }
  __name(Pe, "Pe");
  function be(e) {
    return Te.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(be, "be");
  function Ce(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Ce, "Ce");
});
p();
u();
l();
p();
u();
l();
p();
u();
l();
var T = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
p();
u();
l();
p();
u();
l();
p();
u();
l();
p();
u();
l();
var D = $(q());
function P(e, t, s) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let a = s ? "" : "i", n = [];
  return { match: (0, D.default)(`%${e}%${a}`, n).exec(t), captureGroupKeys: n };
}
__name(P, "P");
function v(e, t, s, { namedOnly: a } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (n, i) => {
    let r = s.indexOf(i);
    return a && r === -1 ? n : (r === -1 ? t[parseInt(i, 10)] : t[r + 1]) || "";
  });
}
__name(v, "v");
function I(e, { url: t, cookies: s, headers: a, routeDest: n }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? M(e.value, a.get(e.key), n) : { valid: a.has(e.key) };
    case "cookie": {
      let i = s[e.key];
      return i && e.value !== void 0 ? M(e.value, i, n) : { valid: i !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? M(e.value, t.searchParams.get(e.key), n) : { valid: t.searchParams.has(e.key) };
  }
}
__name(I, "I");
function M(e, t, s) {
  let { match: a, captureGroupKeys: n } = P(e, t);
  return s && a && n.length ? { valid: !!a, newRouteDest: v(s, a, n, { namedOnly: true }) } : { valid: !!a };
}
__name(M, "M");
p();
u();
l();
function z(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", T), new Request(e, { headers: t });
}
__name(z, "z");
p();
u();
l();
function g(e, t, s) {
  let a = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [n, i] of a) {
    let r = n.toLowerCase(), o = s?.match ? v(i, s.match, s.captureGroupKeys) : i;
    r === "set-cookie" ? e.append(r, o) : e.set(r, o);
  }
}
__name(g, "g");
function w(e) {
  return /^https?:\/\//.test(e);
}
__name(w, "w");
function x(e, t) {
  for (let [s, a] of t.entries()) {
    let n = /^nxtP(.+)$/.exec(s), i = /^nxtI(.+)$/.exec(s);
    n?.[1] ? (e.set(s, a), e.set(n[1], a)) : i?.[1] ? e.set(i[1], a.replace(/(\(\.+\))+/, "")) : (!e.has(s) || !!a && !e.getAll(s).includes(a)) && e.append(s, a);
  }
}
__name(x, "x");
function L(e, t) {
  let s = new URL(t, e.url);
  return x(s.searchParams, new URL(e.url).searchParams), s.pathname = s.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(s, e);
}
__name(L, "L");
function S(e) {
  return new Response(e.body, e);
}
__name(S, "S");
function A(e) {
  return e.split(",").map((t) => {
    let [s, a] = t.split(";"), n = parseFloat((a ?? "q=1").replace(/q *= */gi, ""));
    return [s.trim(), isNaN(n) ? 1 : n];
  }).sort((t, s) => s[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(A, "A");
p();
u();
l();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function b(e, { request: t, assetsFetcher: s, ctx: a }, { path: n, searchParams: i }) {
  let r, o = new URL(t.url);
  x(o.searchParams, i);
  let c = new Request(o, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let h = await import(e.entrypoint);
        try {
          r = await h.default(c, a);
        } catch (d) {
          let f = d;
          throw f.name === "TypeError" && f.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : d;
        }
        break;
      }
      case "override": {
        r = S(await s.fetch(L(c, e.path ?? n))), e.headers && g(r.headers, e.headers);
        break;
      }
      case "static": {
        r = await s.fetch(L(c, n));
        break;
      }
      default:
        r = new Response("Not Found", { status: 404 });
    }
  } catch (h) {
    return console.error(h), new Response("Internal Server Error", { status: 500 });
  }
  return S(r);
}
__name(b, "b");
function B(e, t) {
  let s = "^//?(?:", a = ")/(.*)$";
  return !e.startsWith(s) || !e.endsWith(a) ? false : e.slice(s.length, -a.length).split("|").every((i) => t.has(i));
}
__name(B, "B");
p();
u();
l();
function he(e, { protocol: t, hostname: s, port: a, pathname: n }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(s).test(e.hostname) || a && !new RegExp(a).test(e.port) || n && !new RegExp(n).test(e.pathname));
}
__name(he, "he");
function de(e, t) {
  if (e.method !== "GET") return;
  let { origin: s, searchParams: a } = new URL(e.url), n = a.get("url"), i = Number.parseInt(a.get("w") ?? "", 10), r = Number.parseInt(a.get("q") ?? "75", 10);
  if (!n || Number.isNaN(i) || Number.isNaN(r) || !t?.sizes?.includes(i) || r < 0 || r > 100) return;
  let o = new URL(n, s);
  if (o.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let c = n.startsWith("//"), h = n.startsWith("/") && !c;
  if (!h && !t?.domains?.includes(o.hostname) && !t?.remotePatterns?.find((R) => he(o, R))) return;
  let d = e.headers.get("Accept") ?? "", f = t?.formats?.find((R) => d.includes(R))?.replace("image/", "");
  return { isRelative: h, imageUrl: o, options: { width: i, quality: r, format: f } };
}
__name(de, "de");
function _e(e, t, s) {
  let a = new Headers();
  if (s?.contentSecurityPolicy && a.set("Content-Security-Policy", s.contentSecurityPolicy), s?.contentDispositionType) {
    let i = t.pathname.split("/").pop(), r = i ? `${s.contentDispositionType}; filename="${i}"` : s.contentDispositionType;
    a.set("Content-Disposition", r);
  }
  e.headers.has("Cache-Control") || a.set("Cache-Control", `public, max-age=${s?.minimumCacheTTL ?? 60}`);
  let n = S(e);
  return g(n.headers, a), n;
}
__name(_e, "_e");
async function G(e, { buildOutput: t, assetsFetcher: s, imagesConfig: a }) {
  let n = de(e, a);
  if (!n) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: i, imageUrl: r } = n, c = await (i && r.pathname in t ? s.fetch.bind(s) : fetch)(r);
  return _e(c, r, a);
}
__name(G, "G");
p();
u();
l();
p();
u();
l();
p();
u();
l();
async function C(e) {
  return import(e);
}
__name(C, "C");
var ye = "x-vercel-cache-tags";
var me = "x-next-cache-soft-tags";
var fe = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${T}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let s = new URL(e.url), a = await ge();
    if (s.pathname === "/v1/suspense-cache/revalidate") {
      let i = s.searchParams.get("tags")?.split(",") ?? [];
      for (let r of i) await a.revalidateTag(r);
      return new Response(null, { status: 200 });
    }
    let n = s.pathname.replace("/v1/suspense-cache/", "");
    if (!n.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let i = W(e, me), r = await a.get(n, { softTags: i });
        return r ? new Response(JSON.stringify(r.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (r.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let i = globalThis[fe], r = /* @__PURE__ */ __name(async () => {
          let o = await e.json();
          o.data.tags === void 0 && (o.tags ??= W(e, ye) ?? []), await a.set(n, o);
        }, "r");
        return i ? i.ctx.waitUntil(r()) : await r(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (s) {
    return console.error(s), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
async function ge() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? K("kv") : K("cache-api");
}
__name(ge, "ge");
async function K(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, s = await C(t);
  return new s.default();
}
__name(K, "K");
function W(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(W, "W");
function X() {
  globalThis[Z] || (xe(), globalThis[Z] = true);
}
__name(X, "X");
function xe() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let s = new Request(...t), a = await Ne(s);
    return a || (a = await J(s), a) ? a : (Re(s), e(s));
  };
}
__name(xe, "xe");
async function Ne(e) {
  if (e.url.startsWith("blob:")) try {
    let s = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, a = (await C(s)).default, n = { async arrayBuffer() {
      return a;
    }, get body() {
      return new ReadableStream({ start(i) {
        let r = Buffer.from(a);
        i.enqueue(r), i.close();
      } });
    }, async text() {
      return Buffer.from(a).toString();
    }, async json() {
      let i = Buffer.from(a);
      return JSON.stringify(i.toString());
    }, async blob() {
      return new Blob(a);
    } };
    return n.clone = () => ({ ...n }), n;
  } catch {
  }
  return null;
}
__name(Ne, "Ne");
function Re(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(Re, "Re");
var Z = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
p();
u();
l();
var Q = $(Y());
var E = class {
  static {
    __name(this, "E");
  }
  constructor(t, s, a, n, i) {
    this.routes = t;
    this.output = s;
    this.reqCtx = a;
    this.url = new URL(a.request.url), this.cookies = (0, Q.parse)(a.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), x(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = i?.find((r) => r.domain === this.url.hostname), this.locales = new Set(n.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: s, checkIntercept: a }) {
    let n = P(t.src, this.path, t.caseSensitive);
    if (!n.match || t.methods && !t.methods.map((r) => r.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let i = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((r) => {
      let o = I(r, i);
      return o.newRouteDest && (i.routeDest = o.newRouteDest), !o.valid;
    }) && !t.missing?.find((r) => I(r, i).valid) && !(s && t.status !== this.status)) {
      if (a && t.dest) {
        let r = /\/(\(\.+\))+/, o = r.test(t.dest), c = r.test(this.path);
        if (o && !c) return;
      }
      return { routeMatch: n, routeDest: i.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let s = "x-middleware-override-headers", a = t.headers.get(s);
    if (a) {
      let c = new Set(a.split(",").map((h) => h.trim()));
      for (let h of c.keys()) {
        let d = `x-middleware-request-${h}`, f = t.headers.get(d);
        this.reqCtx.request.headers.get(h) !== f && (f ? this.reqCtx.request.headers.set(h, f) : this.reqCtx.request.headers.delete(h)), t.headers.delete(d);
      }
      t.headers.delete(s);
    }
    let n = "x-middleware-rewrite", i = t.headers.get(n);
    if (i) {
      let c = new URL(i, this.url), h = this.url.hostname !== c.hostname;
      this.path = h ? `${c}` : c.pathname, x(this.searchParams, c.searchParams), t.headers.delete(n);
    }
    let r = "x-middleware-next";
    t.headers.get(r) ? t.headers.delete(r) : !i && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), g(this.reqCtx.request.headers, t.headers), g(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let s = t && this.output[t];
    if (!s || s.type !== "middleware") return this.status = 500, false;
    let a = await b(s, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), a.status === 500 ? (this.status = a.status, false) : (this.processMiddlewareResp(a), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, s, a) {
    !t.headers || (g(this.headers.normal, t.headers, { match: s, captureGroupKeys: a }), t.important && g(this.headers.important, t.headers, { match: s, captureGroupKeys: a }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, s, a) {
    if (!t.dest) return this.path;
    let n = this.path, i = t.dest;
    this.wildcardMatch && /\$wildcard/.test(i) && (i = i.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = v(i, s, a);
    let r = /\/index\.rsc$/i.test(this.path), o = /^\/(?:index)?$/i.test(n), c = /^\/__index\.prefetch\.rsc$/i.test(n);
    r && !o && !c && (this.path = n);
    let h = /\.rsc$/i.test(this.path), d = /\.prefetch\.rsc$/i.test(this.path), f = this.path in this.output;
    h && !d && !f && (this.path = this.path.replace(/\.rsc/i, ""));
    let R = new URL(this.path, this.url);
    return x(this.searchParams, R.searchParams), w(this.path) || (this.path = R.pathname), n;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: a, cookie: n } } = t, i = n && this.cookies[n], r = A(i ?? ""), o = A(this.reqCtx.request.headers.get("accept-language") ?? ""), d = [...r, ...o].map((f) => a[f]).filter(Boolean)[0];
    if (d) {
      !this.path.startsWith(d) && (this.headers.normal.set("location", d), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, s) {
    return !this.locales || s !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, s) {
    let a = this.getLocaleFriendlyRoute(s, t), { routeMatch: n, routeDest: i } = this.checkRouteMatch(a, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, r = { ...a, dest: i };
    if (!n?.match || r.middlewarePath && this.middlewareInvoked.includes(r.middlewarePath)) return "skip";
    let { match: o, captureGroupKeys: c } = n;
    if (this.applyRouteOverrides(r), this.applyLocaleRedirects(r), !await this.runRouteMiddleware(r.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(r, o, c), this.applyRouteStatus(r);
    let d = this.applyRouteDest(r, o, c);
    if (r.check && !w(this.path)) if (d === this.path) {
      if (t !== "miss") return this.checkPhase(O(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !r.continue || r.status && r.status >= 300 && r.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let s = true;
    for (let i of this.routes[t]) {
      let r = await this.checkRoute(t, i);
      if (r === "error") return "error";
      if (r === "done") {
        s = false;
        break;
      }
    }
    if (t === "hit" || w(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let i of this.locales) {
      let r = new RegExp(`/${i}(/.*)`), c = this.path.match(r)?.[1];
      if (c && c in this.output) {
        this.path = c;
        break;
      }
    }
    let a = this.path in this.output;
    if (!a && this.path.endsWith("/")) {
      let i = this.path.replace(/\/$/, "");
      a = i in this.output, a && (this.path = i);
    }
    if (t === "miss" && !a) {
      let i = !this.status || this.status < 400;
      this.status = i ? 404 : this.status;
    }
    let n = "miss";
    return a || t === "miss" || t === "error" ? n = "hit" : s && (n = O(t)), this.checkPhase(n);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let s = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), s;
  }
};
async function ee(e, t, s, a) {
  let n = new E(t.routes, s, e, a, t.wildcard), i = await te(n);
  return ke(e, i, s);
}
__name(ee, "ee");
async function te(e, t = "none", s = false) {
  return await e.run(t) === "error" || !s && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
async function ke(e, { path: t = "/404", status: s, headers: a, searchParams: n, body: i }, r) {
  let o = a.normal.get("location");
  if (o) {
    if (o !== a.middlewareLocation) {
      let d = [...n.keys()].length ? `?${n.toString()}` : "";
      a.normal.set("location", `${o ?? "/"}${d}`);
    }
    return new Response(null, { status: s, headers: a.normal });
  }
  let c;
  if (i !== void 0) c = new Response(i, { status: s });
  else if (w(t)) {
    let d = new URL(t);
    x(d.searchParams, n), c = await fetch(d, e.request);
  } else c = await b(r[t], e, { path: t, status: s, headers: a, searchParams: n });
  let h = a.normal;
  return g(h, c.headers), g(h, a.important), c = new Response(c.body, { ...c, status: s || c.status, headers: h }), c;
}
__name(ke, "ke");
p();
u();
l();
function ae() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(ae, "ae");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let s = je();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, s), s;
}
__name(Ee, "Ee");
function je() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, s) => e.has(s) ? e.get(s) : Reflect.get(globalThis, s), "get"), set: /* @__PURE__ */ __name((t, s, a) => Me.has(s) ? Reflect.set(globalThis, s, a) : (e.set(s, a), true), "set") });
}
__name(je, "je");
var Me = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ie = Object.defineProperty;
var Le = /* @__PURE__ */ __name((...e) => {
  let t = e[0], s = e[1], a = "__import_unsupported";
  if (!(s === a && typeof t == "object" && t !== null && a in t)) return Ie(...e);
}, "Le");
globalThis.Object.defineProperty = Le;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var Sa = { async fetch(e, t, s) {
  ae(), X();
  let a = await __ALSes_PROMISE__;
  if (!a) {
    let r = new URL(e.url), o = await t.ASSETS.fetch(`${r.protocol}//${r.host}/cdn-cgi/errors/no-nodejs_compat.html`), c = o.ok ? o.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(c, { status: 503 });
  }
  let { envAsyncLocalStorage: n, requestContextAsyncLocalStorage: i } = a;
  return n.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: T }, async () => i.run({ env: t, ctx: s, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return G(e, { buildOutput: y, assetsFetcher: t.ASSETS, imagesConfig: _.images });
    let o = z(e);
    return ee({ request: o, ctx: s, assetsFetcher: t.ASSETS }, _, y, m);
  }));
} };
export {
  Sa as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=index.js.map
