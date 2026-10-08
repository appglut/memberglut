import { d8 as reactExports, I as Icon, af as _extends, dP as warningOnce, aa as _asyncToGenerator, an as _regeneratorRuntime, aq as _toConsumableArray, ah as _inherits, ad as _createSuper, ab as _classCallCheck, ae as _defineProperty, a9 as _assertThisInitialized, ar as _typeof, ac as _createClass, al as _objectWithoutProperties, aw as classNames, R as React, d3 as pickAttrs, ak as _objectSpread2, dl as unit, ax as clearFix, dh as textEllipsis, x as Keyframe, cN as initFadeMotion, as as blue, cs as genStyleHooks, c_ as merge, cg as genCollapseMotion, db as resetComponent, j as ConfigContext, C as CSSMotion, d1 as omit, cL as initCollapseMotion, d as CSSMotionList, ay as cloneElement, c as Button, S as RefIcon$6, dr as useComponentConfig, D as DisabledContext, dB as useMergedState, dz as useLocale, cZ as localeValues, d7 as reactDomExports } from "./Page-hmVJ7ZEb.js";
import { R as RefIcon$5 } from "./index-CH-t94NL.js";
import { P as Progress } from "./progress-10ZQSrB7.js";
import { T as Tooltip, b1 as useForceUpdate } from "./api-VgcaUgLl.js";
var DeleteOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" } }] }, "name": "delete", "theme": "outlined" };
var DeleteOutlined = function DeleteOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: DeleteOutlined$1
  }));
};
var RefIcon$4 = /* @__PURE__ */ reactExports.forwardRef(DeleteOutlined);
const attrAccept = function(file, acceptedFiles) {
  if (file && acceptedFiles) {
    var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
    var fileName = file.name || "";
    var mimeType = file.type || "";
    var baseMimeType = mimeType.replace(/\/.*$/, "");
    return acceptedFilesArray.some(function(type) {
      var validType = type.trim();
      if (/^\*(\/\*)?$/.test(type)) {
        return true;
      }
      if (validType.charAt(0) === ".") {
        var lowerFileName = fileName.toLowerCase();
        var lowerType = validType.toLowerCase();
        var affixList = [lowerType];
        if (lowerType === ".jpg" || lowerType === ".jpeg") {
          affixList = [".jpg", ".jpeg"];
        }
        return affixList.some(function(affix) {
          return lowerFileName.endsWith(affix);
        });
      }
      if (/\/\*$/.test(validType)) {
        return baseMimeType === validType.replace(/\/.*$/, "");
      }
      if (mimeType === validType) {
        return true;
      }
      if (/^\w+$/.test(validType)) {
        warningOnce(false, "Upload takes an invalidate 'accept' type '".concat(validType, "'.Skip for check."));
        return true;
      }
      return false;
    });
  }
  return true;
};
function getError(option, xhr) {
  var msg = "cannot ".concat(option.method, " ").concat(option.action, " ").concat(xhr.status, "'");
  var err = new Error(msg);
  err.status = xhr.status;
  err.method = option.method;
  err.url = option.action;
  return err;
}
function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
function upload(option) {
  var xhr = new XMLHttpRequest();
  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }
  var formData = new FormData();
  if (option.data) {
    Object.keys(option.data).forEach(function(key) {
      var value = option.data[key];
      if (Array.isArray(value)) {
        value.forEach(function(item) {
          formData.append("".concat(key, "[]"), item);
        });
        return;
      }
      formData.append(key, value);
    });
  }
  if (option.file instanceof Blob) {
    formData.append(option.filename, option.file, option.file.name);
  } else {
    formData.append(option.filename, option.file);
  }
  xhr.onerror = function error(e) {
    option.onError(e);
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }
    return option.onSuccess(getBody(xhr), xhr);
  };
  xhr.open(option.method, option.action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  var headers = option.headers || {};
  if (headers["X-Requested-With"] !== null) {
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  }
  Object.keys(headers).forEach(function(h) {
    if (headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  });
  xhr.send(formData);
  return {
    abort: function abort() {
      xhr.abort();
    }
  };
}
var traverseFileTree = /* @__PURE__ */ function() {
  var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(files, isAccepted) {
    var flattenFileList, progressFileList, readDirectory, _readDirectory, readFile, _readFile, _traverseFileTree, wipIndex;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _readFile = function _readFile3() {
            _readFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(item) {
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", new Promise(function(reslove) {
                      item.file(function(file) {
                        if (isAccepted(file)) {
                          if (item.fullPath && !file.webkitRelativePath) {
                            Object.defineProperties(file, {
                              webkitRelativePath: {
                                writable: true
                              }
                            });
                            file.webkitRelativePath = item.fullPath.replace(/^\//, "");
                            Object.defineProperties(file, {
                              webkitRelativePath: {
                                writable: false
                              }
                            });
                          }
                          reslove(file);
                        } else {
                          reslove(null);
                        }
                      });
                    }));
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return _readFile.apply(this, arguments);
          };
          readFile = function _readFile2(_x4) {
            return _readFile.apply(this, arguments);
          };
          _readDirectory = function _readDirectory3() {
            _readDirectory = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(directory) {
              var dirReader, entries, results, n, i;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    dirReader = directory.createReader();
                    entries = [];
                  case 2:
                    _context2.next = 5;
                    return new Promise(function(resolve) {
                      dirReader.readEntries(resolve, function() {
                        return resolve([]);
                      });
                    });
                  case 5:
                    results = _context2.sent;
                    n = results.length;
                    if (n) {
                      _context2.next = 9;
                      break;
                    }
                    return _context2.abrupt("break", 12);
                  case 9:
                    for (i = 0; i < n; i++) {
                      entries.push(results[i]);
                    }
                    _context2.next = 2;
                    break;
                  case 12:
                    return _context2.abrupt("return", entries);
                  case 13:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return _readDirectory.apply(this, arguments);
          };
          readDirectory = function _readDirectory2(_x3) {
            return _readDirectory.apply(this, arguments);
          };
          flattenFileList = [];
          progressFileList = [];
          files.forEach(function(file) {
            return progressFileList.push(file.webkitGetAsEntry());
          });
          _traverseFileTree = /* @__PURE__ */ function() {
            var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(item, path) {
              var _file, entries;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (item) {
                      _context.next = 2;
                      break;
                    }
                    return _context.abrupt("return");
                  case 2:
                    item.path = path || "";
                    if (!item.isFile) {
                      _context.next = 10;
                      break;
                    }
                    _context.next = 6;
                    return readFile(item);
                  case 6:
                    _file = _context.sent;
                    if (_file) {
                      flattenFileList.push(_file);
                    }
                    _context.next = 15;
                    break;
                  case 10:
                    if (!item.isDirectory) {
                      _context.next = 15;
                      break;
                    }
                    _context.next = 13;
                    return readDirectory(item);
                  case 13:
                    entries = _context.sent;
                    progressFileList.push.apply(progressFileList, _toConsumableArray(entries));
                  case 15:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function _traverseFileTree2(_x5, _x6) {
              return _ref2.apply(this, arguments);
            };
          }();
          wipIndex = 0;
        case 9:
          if (!(wipIndex < progressFileList.length)) {
            _context4.next = 15;
            break;
          }
          _context4.next = 12;
          return _traverseFileTree(progressFileList[wipIndex]);
        case 12:
          wipIndex++;
          _context4.next = 9;
          break;
        case 15:
          return _context4.abrupt("return", flattenFileList);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function traverseFileTree2(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var now = +/* @__PURE__ */ new Date();
var index = 0;
function uid() {
  return "rc-upload-".concat(now, "-").concat(++index);
}
var _excluded = ["component", "prefixCls", "className", "classNames", "disabled", "id", "name", "style", "styles", "multiple", "accept", "capture", "children", "directory", "folder", "openFileDialogOnClick", "onMouseEnter", "onMouseLeave", "hasControlInside"];
var AjaxUploader = /* @__PURE__ */ function(_Component) {
  _inherits(AjaxUploader2, _Component);
  var _super = _createSuper(AjaxUploader2);
  function AjaxUploader2() {
    var _this;
    _classCallCheck(this, AjaxUploader2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      uid: uid()
    });
    _defineProperty(_assertThisInitialized(_this), "reqs", {});
    _defineProperty(_assertThisInitialized(_this), "fileInput", void 0);
    _defineProperty(_assertThisInitialized(_this), "_isMounted", void 0);
    _defineProperty(_assertThisInitialized(_this), "onChange", function(e) {
      var _this$props = _this.props, accept = _this$props.accept, directory = _this$props.directory;
      var files = e.target.files;
      var acceptedFiles = _toConsumableArray(files).filter(function(file) {
        return !directory || attrAccept(file, accept);
      });
      _this.uploadFiles(acceptedFiles);
      _this.reset();
    });
    _defineProperty(_assertThisInitialized(_this), "onClick", function(event) {
      var el = _this.fileInput;
      if (!el) {
        return;
      }
      var target = event.target;
      var onClick = _this.props.onClick;
      if (target && target.tagName === "BUTTON") {
        var parent = el.parentNode;
        parent.focus();
        target.blur();
      }
      el.click();
      if (onClick) {
        onClick(event);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function(e) {
      if (e.key === "Enter") {
        _this.onClick(e);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onDataTransferFiles", /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(dataTransfer, existFileCallback) {
        var _this$props2, multiple, accept, directory, items, files, acceptFiles;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this$props2 = _this.props, multiple = _this$props2.multiple, accept = _this$props2.accept, directory = _this$props2.directory;
              items = _toConsumableArray(dataTransfer.items || []);
              files = _toConsumableArray(dataTransfer.files || []);
              if (files.length > 0 || items.some(function(item) {
                return item.kind === "file";
              })) {
                existFileCallback === null || existFileCallback === void 0 || existFileCallback();
              }
              if (!directory) {
                _context.next = 11;
                break;
              }
              _context.next = 7;
              return traverseFileTree(Array.prototype.slice.call(items), function(_file) {
                return attrAccept(_file, _this.props.accept);
              });
            case 7:
              files = _context.sent;
              _this.uploadFiles(files);
              _context.next = 14;
              break;
            case 11:
              acceptFiles = _toConsumableArray(files).filter(function(file) {
                return attrAccept(file, accept);
              });
              if (multiple === false) {
                acceptFiles = files.slice(0, 1);
              }
              _this.uploadFiles(acceptFiles);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "onFilePaste", /* @__PURE__ */ function() {
      var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(e) {
        var pastable, clipboardData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              pastable = _this.props.pastable;
              if (pastable) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return");
            case 3:
              if (!(e.type === "paste")) {
                _context2.next = 6;
                break;
              }
              clipboardData = e.clipboardData;
              return _context2.abrupt("return", _this.onDataTransferFiles(clipboardData, function() {
                e.preventDefault();
              }));
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function(_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "onFileDragOver", function(e) {
      e.preventDefault();
    });
    _defineProperty(_assertThisInitialized(_this), "onFileDrop", /* @__PURE__ */ function() {
      var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(e) {
        var dataTransfer;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              e.preventDefault();
              if (!(e.type === "drop")) {
                _context3.next = 4;
                break;
              }
              dataTransfer = e.dataTransfer;
              return _context3.abrupt("return", _this.onDataTransferFiles(dataTransfer));
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function(_x4) {
        return _ref3.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "uploadFiles", function(files) {
      var originFiles = _toConsumableArray(files);
      var postFiles = originFiles.map(function(file) {
        file.uid = uid();
        return _this.processFile(file, originFiles);
      });
      Promise.all(postFiles).then(function(fileList) {
        var onBatchStart = _this.props.onBatchStart;
        onBatchStart === null || onBatchStart === void 0 || onBatchStart(fileList.map(function(_ref4) {
          var origin = _ref4.origin, parsedFile = _ref4.parsedFile;
          return {
            file: origin,
            parsedFile
          };
        }));
        fileList.filter(function(file) {
          return file.parsedFile !== null;
        }).forEach(function(file) {
          _this.post(file);
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "processFile", /* @__PURE__ */ function() {
      var _ref5 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(file, fileList) {
        var beforeUpload, transformedFile, action, mergedAction, data, mergedData, parsedData, parsedFile, mergedParsedFile;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              beforeUpload = _this.props.beforeUpload;
              transformedFile = file;
              if (!beforeUpload) {
                _context4.next = 14;
                break;
              }
              _context4.prev = 3;
              _context4.next = 6;
              return beforeUpload(file, fileList);
            case 6:
              transformedFile = _context4.sent;
              _context4.next = 12;
              break;
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](3);
              transformedFile = false;
            case 12:
              if (!(transformedFile === false)) {
                _context4.next = 14;
                break;
              }
              return _context4.abrupt("return", {
                origin: file,
                parsedFile: null,
                action: null,
                data: null
              });
            case 14:
              action = _this.props.action;
              if (!(typeof action === "function")) {
                _context4.next = 21;
                break;
              }
              _context4.next = 18;
              return action(file);
            case 18:
              mergedAction = _context4.sent;
              _context4.next = 22;
              break;
            case 21:
              mergedAction = action;
            case 22:
              data = _this.props.data;
              if (!(typeof data === "function")) {
                _context4.next = 29;
                break;
              }
              _context4.next = 26;
              return data(file);
            case 26:
              mergedData = _context4.sent;
              _context4.next = 30;
              break;
            case 29:
              mergedData = data;
            case 30:
              parsedData = // string type is from legacy `transformFile`.
              // Not sure if this will work since no related test case works with it
              (_typeof(transformedFile) === "object" || typeof transformedFile === "string") && transformedFile ? transformedFile : file;
              if (parsedData instanceof File) {
                parsedFile = parsedData;
              } else {
                parsedFile = new File([parsedData], file.name, {
                  type: file.type
                });
              }
              mergedParsedFile = parsedFile;
              mergedParsedFile.uid = file.uid;
              return _context4.abrupt("return", {
                origin: file,
                data: mergedData,
                parsedFile: mergedParsedFile,
                action: mergedAction
              });
            case 35:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[3, 9]]);
      }));
      return function(_x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "saveFileInput", function(node) {
      _this.fileInput = node;
    });
    return _this;
  }
  _createClass(AjaxUploader2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      var pastable = this.props.pastable;
      if (pastable) {
        document.addEventListener("paste", this.onFilePaste);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
      this.abort();
      document.removeEventListener("paste", this.onFilePaste);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var pastable = this.props.pastable;
      if (pastable && !prevProps.pastable) {
        document.addEventListener("paste", this.onFilePaste);
      } else if (!pastable && prevProps.pastable) {
        document.removeEventListener("paste", this.onFilePaste);
      }
    }
  }, {
    key: "post",
    value: function post(_ref6) {
      var _this2 = this;
      var data = _ref6.data, origin = _ref6.origin, action = _ref6.action, parsedFile = _ref6.parsedFile;
      if (!this._isMounted) {
        return;
      }
      var _this$props3 = this.props, onStart = _this$props3.onStart, customRequest = _this$props3.customRequest, name = _this$props3.name, headers = _this$props3.headers, withCredentials = _this$props3.withCredentials, method = _this$props3.method;
      var uid2 = origin.uid;
      var request = customRequest || upload;
      var requestOption = {
        action,
        filename: name,
        data,
        file: parsedFile,
        headers,
        withCredentials,
        method: method || "post",
        onProgress: function onProgress(e) {
          var onProgress2 = _this2.props.onProgress;
          onProgress2 === null || onProgress2 === void 0 || onProgress2(e, parsedFile);
        },
        onSuccess: function onSuccess(ret, xhr) {
          var onSuccess2 = _this2.props.onSuccess;
          onSuccess2 === null || onSuccess2 === void 0 || onSuccess2(ret, parsedFile, xhr);
          delete _this2.reqs[uid2];
        },
        onError: function onError(err, ret) {
          var onError2 = _this2.props.onError;
          onError2 === null || onError2 === void 0 || onError2(err, ret, parsedFile);
          delete _this2.reqs[uid2];
        }
      };
      onStart(origin);
      this.reqs[uid2] = request(requestOption, {
        defaultRequest: upload
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        uid: uid()
      });
    }
  }, {
    key: "abort",
    value: function abort(file) {
      var reqs = this.reqs;
      if (file) {
        var uid2 = file.uid ? file.uid : file;
        if (reqs[uid2] && reqs[uid2].abort) {
          reqs[uid2].abort();
        }
        delete reqs[uid2];
      } else {
        Object.keys(reqs).forEach(function(uid3) {
          if (reqs[uid3] && reqs[uid3].abort) {
            reqs[uid3].abort();
          }
          delete reqs[uid3];
        });
      }
    }
  }, {
    key: "render",
    value: function render3() {
      var _this$props4 = this.props, Tag = _this$props4.component, prefixCls = _this$props4.prefixCls, className = _this$props4.className, _this$props4$classNam = _this$props4.classNames, classNames$1 = _this$props4$classNam === void 0 ? {} : _this$props4$classNam, disabled = _this$props4.disabled, id = _this$props4.id, name = _this$props4.name, style = _this$props4.style, _this$props4$styles = _this$props4.styles, styles = _this$props4$styles === void 0 ? {} : _this$props4$styles, multiple = _this$props4.multiple, accept = _this$props4.accept, capture = _this$props4.capture, children = _this$props4.children, directory = _this$props4.directory, folder = _this$props4.folder, openFileDialogOnClick = _this$props4.openFileDialogOnClick, onMouseEnter = _this$props4.onMouseEnter, onMouseLeave = _this$props4.onMouseLeave, hasControlInside = _this$props4.hasControlInside, otherProps = _objectWithoutProperties(_this$props4, _excluded);
      var cls = classNames(_defineProperty(_defineProperty(_defineProperty({}, prefixCls, true), "".concat(prefixCls, "-disabled"), disabled), className, className));
      var dirProps = directory || folder ? {
        directory: "directory",
        webkitdirectory: "webkitdirectory"
      } : {};
      var events = disabled ? {} : {
        onClick: openFileDialogOnClick ? this.onClick : function() {
        },
        onKeyDown: openFileDialogOnClick ? this.onKeyDown : function() {
        },
        onMouseEnter,
        onMouseLeave,
        onDrop: this.onFileDrop,
        onDragOver: this.onFileDragOver,
        tabIndex: hasControlInside ? void 0 : "0"
      };
      return /* @__PURE__ */ React.createElement(Tag, _extends({}, events, {
        className: cls,
        role: hasControlInside ? void 0 : "button",
        style
      }), /* @__PURE__ */ React.createElement("input", _extends({}, pickAttrs(otherProps, {
        aria: true,
        data: true
      }), {
        id,
        name,
        disabled,
        type: "file",
        ref: this.saveFileInput,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        key: this.state.uid,
        style: _objectSpread2({
          display: "none"
        }, styles.input),
        className: classNames$1.input,
        accept
      }, dirProps, {
        multiple,
        onChange: this.onChange
      }, capture != null ? {
        capture
      } : {})), children);
    }
  }]);
  return AjaxUploader2;
}(reactExports.Component);
function empty() {
}
var Upload$2 = /* @__PURE__ */ function(_Component) {
  _inherits(Upload2, _Component);
  var _super = _createSuper(Upload2);
  function Upload2() {
    var _this;
    _classCallCheck(this, Upload2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "uploader", void 0);
    _defineProperty(_assertThisInitialized(_this), "saveUploader", function(node) {
      _this.uploader = node;
    });
    return _this;
  }
  _createClass(Upload2, [{
    key: "abort",
    value: function abort(file) {
      this.uploader.abort(file);
    }
  }, {
    key: "render",
    value: function render3() {
      return /* @__PURE__ */ React.createElement(AjaxUploader, _extends({}, this.props, {
        ref: this.saveUploader
      }));
    }
  }]);
  return Upload2;
}(reactExports.Component);
_defineProperty(Upload$2, "defaultProps", {
  component: "span",
  prefixCls: "rc-upload",
  data: {},
  headers: {},
  name: "file",
  multipart: false,
  onStart: empty,
  onError: empty,
  onSuccess: empty,
  multiple: false,
  beforeUpload: null,
  customRequest: null,
  withCredentials: false,
  openFileDialogOnClick: true,
  hasControlInside: false
});
const genDraggerStyle = (token) => {
  const {
    componentCls,
    iconCls
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-drag`]: {
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "center",
        background: token.colorFillAlter,
        border: `${unit(token.lineWidth)} dashed ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        cursor: "pointer",
        transition: `border-color ${token.motionDurationSlow}`,
        [componentCls]: {
          padding: token.padding
        },
        [`${componentCls}-btn`]: {
          display: "table",
          width: "100%",
          height: "100%",
          outline: "none",
          borderRadius: token.borderRadiusLG,
          "&:focus-visible": {
            outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`
          }
        },
        [`${componentCls}-drag-container`]: {
          display: "table-cell",
          verticalAlign: "middle"
        },
        [`
          &:not(${componentCls}-disabled):hover,
          &-hover:not(${componentCls}-disabled)
        `]: {
          borderColor: token.colorPrimaryHover
        },
        [`p${componentCls}-drag-icon`]: {
          marginBottom: token.margin,
          [iconCls]: {
            color: token.colorPrimary,
            fontSize: token.uploadThumbnailSize
          }
        },
        [`p${componentCls}-text`]: {
          margin: `0 0 ${unit(token.marginXXS)}`,
          color: token.colorTextHeading,
          fontSize: token.fontSizeLG
        },
        [`p${componentCls}-hint`]: {
          color: token.colorTextDescription,
          fontSize: token.fontSize
        },
        // ===================== Disabled =====================
        [`&${componentCls}-disabled`]: {
          [`p${componentCls}-drag-icon ${iconCls},
            p${componentCls}-text,
            p${componentCls}-hint
          `]: {
            color: token.colorTextDisabled
          }
        }
      }
    }
  };
};
const genListStyle = (token) => {
  const {
    componentCls,
    iconCls,
    fontSize,
    lineHeight,
    calc
  } = token;
  const itemCls = `${componentCls}-list-item`;
  const actionsCls = `${itemCls}-actions`;
  const actionCls = `${itemCls}-action`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-list`]: Object.assign(Object.assign({}, clearFix()), {
        lineHeight: token.lineHeight,
        [itemCls]: {
          position: "relative",
          height: calc(token.lineHeight).mul(fontSize).equal(),
          marginTop: token.marginXS,
          fontSize,
          display: "flex",
          alignItems: "center",
          transition: `background-color ${token.motionDurationSlow}`,
          borderRadius: token.borderRadiusSM,
          "&:hover": {
            backgroundColor: token.controlItemBgHover
          },
          [`${itemCls}-name`]: Object.assign(Object.assign({}, textEllipsis), {
            padding: `0 ${unit(token.paddingXS)}`,
            lineHeight,
            flex: "auto",
            transition: `all ${token.motionDurationSlow}`
          }),
          [actionsCls]: {
            whiteSpace: "nowrap",
            [actionCls]: {
              opacity: 0
            },
            [iconCls]: {
              color: token.actionsColor,
              transition: `all ${token.motionDurationSlow}`
            },
            [`
              ${actionCls}:focus-visible,
              &.picture ${actionCls}
            `]: {
              opacity: 1
            }
          },
          [`${componentCls}-icon ${iconCls}`]: {
            color: token.colorIcon,
            fontSize
          },
          [`${itemCls}-progress`]: {
            position: "absolute",
            bottom: token.calc(token.uploadProgressOffset).mul(-1).equal(),
            width: "100%",
            paddingInlineStart: calc(fontSize).add(token.paddingXS).equal(),
            fontSize,
            lineHeight: 0,
            pointerEvents: "none",
            "> div": {
              margin: 0
            }
          }
        },
        [`${itemCls}:hover ${actionCls}`]: {
          opacity: 1
        },
        [`${itemCls}-error`]: {
          color: token.colorError,
          [`${itemCls}-name, ${componentCls}-icon ${iconCls}`]: {
            color: token.colorError
          },
          [actionsCls]: {
            [`${iconCls}, ${iconCls}:hover`]: {
              color: token.colorError
            },
            [actionCls]: {
              opacity: 1
            }
          }
        },
        [`${componentCls}-list-item-container`]: {
          transition: `opacity ${token.motionDurationSlow}, height ${token.motionDurationSlow}`,
          // For smooth removing animation
          "&::before": {
            display: "table",
            width: 0,
            height: 0,
            content: '""'
          }
        }
      })
    }
  };
};
const genMotionStyle = (token) => {
  const {
    componentCls
  } = token;
  const uploadAnimateInlineIn = new Keyframe("uploadAnimateInlineIn", {
    from: {
      width: 0,
      height: 0,
      padding: 0,
      opacity: 0,
      margin: token.calc(token.marginXS).div(-2).equal()
    }
  });
  const uploadAnimateInlineOut = new Keyframe("uploadAnimateInlineOut", {
    to: {
      width: 0,
      height: 0,
      padding: 0,
      opacity: 0,
      margin: token.calc(token.marginXS).div(-2).equal()
    }
  });
  const inlineCls = `${componentCls}-animate-inline`;
  return [{
    [`${componentCls}-wrapper`]: {
      [`${inlineCls}-appear, ${inlineCls}-enter, ${inlineCls}-leave`]: {
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: token.motionEaseInOutCirc,
        animationFillMode: "forwards"
      },
      [`${inlineCls}-appear, ${inlineCls}-enter`]: {
        animationName: uploadAnimateInlineIn
      },
      [`${inlineCls}-leave`]: {
        animationName: uploadAnimateInlineOut
      }
    }
  }, {
    [`${componentCls}-wrapper`]: initFadeMotion(token)
  }, uploadAnimateInlineIn, uploadAnimateInlineOut];
};
const genPictureStyle = (token) => {
  const {
    componentCls,
    iconCls,
    uploadThumbnailSize,
    uploadProgressOffset,
    calc
  } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;
  return {
    [`${componentCls}-wrapper`]: {
      // ${listCls} 增加优先级
      [`
        ${listCls}${listCls}-picture,
        ${listCls}${listCls}-picture-card,
        ${listCls}${listCls}-picture-circle
      `]: {
        [itemCls]: {
          position: "relative",
          height: calc(uploadThumbnailSize).add(calc(token.lineWidth).mul(2)).add(calc(token.paddingXS).mul(2)).equal(),
          padding: token.paddingXS,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusLG,
          "&:hover": {
            background: "transparent"
          },
          [`${itemCls}-thumbnail`]: Object.assign(Object.assign({}, textEllipsis), {
            width: uploadThumbnailSize,
            height: uploadThumbnailSize,
            lineHeight: unit(calc(uploadThumbnailSize).add(token.paddingSM).equal()),
            textAlign: "center",
            flex: "none",
            [iconCls]: {
              fontSize: token.fontSizeHeading2,
              color: token.colorPrimary
            },
            img: {
              display: "block",
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }
          }),
          [`${itemCls}-progress`]: {
            bottom: uploadProgressOffset,
            width: `calc(100% - ${unit(calc(token.paddingSM).mul(2).equal())})`,
            marginTop: 0,
            paddingInlineStart: calc(uploadThumbnailSize).add(token.paddingXS).equal()
          }
        },
        [`${itemCls}-error`]: {
          borderColor: token.colorError,
          // Adjust the color of the error icon : https://github.com/ant-design/ant-design/pull/24160
          [`${itemCls}-thumbnail ${iconCls}`]: {
            [`svg path[fill='${blue[0]}']`]: {
              fill: token.colorErrorBg
            },
            [`svg path[fill='${blue.primary}']`]: {
              fill: token.colorError
            }
          }
        },
        [`${itemCls}-uploading`]: {
          borderStyle: "dashed",
          [`${itemCls}-name`]: {
            marginBottom: uploadProgressOffset
          }
        }
      },
      [`${listCls}${listCls}-picture-circle ${itemCls}`]: {
        [`&, &::before, ${itemCls}-thumbnail`]: {
          borderRadius: "50%"
        }
      }
    }
  };
};
const genPictureCardStyle = (token) => {
  const {
    componentCls,
    iconCls,
    fontSizeLG,
    colorTextLightSolid,
    calc
  } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;
  const uploadPictureCardSize = token.uploadPicCardSize;
  return {
    [`
      ${componentCls}-wrapper${componentCls}-picture-card-wrapper,
      ${componentCls}-wrapper${componentCls}-picture-circle-wrapper
    `]: Object.assign(Object.assign({}, clearFix()), {
      display: "block",
      [`${componentCls}${componentCls}-select`]: {
        width: uploadPictureCardSize,
        height: uploadPictureCardSize,
        textAlign: "center",
        verticalAlign: "top",
        backgroundColor: token.colorFillAlter,
        border: `${unit(token.lineWidth)} dashed ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        cursor: "pointer",
        transition: `border-color ${token.motionDurationSlow}`,
        [`> ${componentCls}`]: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center"
        },
        [`&:not(${componentCls}-disabled):hover`]: {
          borderColor: token.colorPrimary
        }
      },
      // list
      [`${listCls}${listCls}-picture-card, ${listCls}${listCls}-picture-circle`]: {
        display: "flex",
        flexWrap: "wrap",
        "@supports not (gap: 1px)": {
          "& > *": {
            marginBlockEnd: token.marginXS,
            marginInlineEnd: token.marginXS
          }
        },
        "@supports (gap: 1px)": {
          gap: token.marginXS
        },
        [`${listCls}-item-container`]: {
          display: "inline-block",
          width: uploadPictureCardSize,
          height: uploadPictureCardSize,
          verticalAlign: "top"
        },
        "&::after": {
          display: "none"
        },
        "&::before": {
          display: "none"
        },
        [itemCls]: {
          height: "100%",
          margin: 0,
          "&::before": {
            position: "absolute",
            zIndex: 1,
            width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
            height: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
            backgroundColor: token.colorBgMask,
            opacity: 0,
            transition: `all ${token.motionDurationSlow}`,
            content: '" "'
          }
        },
        [`${itemCls}:hover`]: {
          [`&::before, ${itemCls}-actions`]: {
            opacity: 1
          }
        },
        [`${itemCls}-actions`]: {
          position: "absolute",
          insetInlineStart: 0,
          zIndex: 10,
          width: "100%",
          whiteSpace: "nowrap",
          textAlign: "center",
          opacity: 0,
          transition: `all ${token.motionDurationSlow}`,
          [`
            ${iconCls}-eye,
            ${iconCls}-download,
            ${iconCls}-delete
          `]: {
            zIndex: 10,
            width: fontSizeLG,
            margin: `0 ${unit(token.marginXXS)}`,
            fontSize: fontSizeLG,
            cursor: "pointer",
            transition: `all ${token.motionDurationSlow}`,
            color: colorTextLightSolid,
            "&:hover": {
              color: colorTextLightSolid
            },
            svg: {
              verticalAlign: "baseline"
            }
          }
        },
        [`${itemCls}-thumbnail, ${itemCls}-thumbnail img`]: {
          position: "static",
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain"
        },
        [`${itemCls}-name`]: {
          display: "none",
          textAlign: "center"
        },
        [`${itemCls}-file + ${itemCls}-name`]: {
          position: "absolute",
          bottom: token.margin,
          display: "block",
          width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`
        },
        [`${itemCls}-uploading`]: {
          [`&${itemCls}`]: {
            backgroundColor: token.colorFillAlter
          },
          [`&::before, ${iconCls}-eye, ${iconCls}-download, ${iconCls}-delete`]: {
            display: "none"
          }
        },
        [`${itemCls}-progress`]: {
          bottom: token.marginXL,
          width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
          paddingInlineStart: 0
        }
      }
    }),
    [`${componentCls}-wrapper${componentCls}-picture-circle-wrapper`]: {
      [`${componentCls}${componentCls}-select`]: {
        borderRadius: "50%"
      }
    }
  };
};
const genRtlStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    }
  };
};
const genBaseStyle = (token) => {
  const {
    componentCls,
    colorTextDisabled
  } = token;
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, resetComponent(token)), {
      [componentCls]: {
        outline: 0,
        "input[type='file']": {
          cursor: "pointer"
        }
      },
      [`${componentCls}-select`]: {
        display: "inline-block"
      },
      [`${componentCls}-hidden`]: {
        display: "none"
      },
      [`${componentCls}-disabled`]: {
        color: colorTextDisabled,
        cursor: "not-allowed"
      }
    })
  };
};
const prepareComponentToken = (token) => ({
  actionsColor: token.colorIcon,
  pictureCardSize: token.controlHeightLG * 2.55
});
const useStyle = genStyleHooks("Upload", (token) => {
  const {
    fontSizeHeading3,
    fontHeight,
    lineWidth,
    pictureCardSize,
    calc
  } = token;
  const uploadToken = merge(token, {
    uploadThumbnailSize: calc(fontSizeHeading3).mul(2).equal(),
    uploadProgressOffset: calc(calc(fontHeight).div(2)).add(lineWidth).equal(),
    uploadPicCardSize: pictureCardSize
  });
  return [genBaseStyle(uploadToken), genDraggerStyle(uploadToken), genPictureStyle(uploadToken), genPictureCardStyle(uploadToken), genListStyle(uploadToken), genMotionStyle(uploadToken), genRtlStyle(uploadToken), genCollapseMotion(uploadToken)];
}, prepareComponentToken);
var FileTwoTone$1 = { "icon": function render(primaryColor, secondaryColor) {
  return { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z", "fill": secondaryColor } }, { "tag": "path", "attrs": { "d": "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z", "fill": primaryColor } }] };
}, "name": "file", "theme": "twotone" };
var FileTwoTone = function FileTwoTone2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: FileTwoTone$1
  }));
};
var RefIcon$3 = /* @__PURE__ */ reactExports.forwardRef(FileTwoTone);
var PaperClipOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z" } }] }, "name": "paper-clip", "theme": "outlined" };
var PaperClipOutlined = function PaperClipOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: PaperClipOutlined$1
  }));
};
var RefIcon$2 = /* @__PURE__ */ reactExports.forwardRef(PaperClipOutlined);
var PictureTwoTone$1 = { "icon": function render2(primaryColor, secondaryColor) {
  return { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z", "fill": primaryColor } }, { "tag": "path", "attrs": { "d": "M424.6 765.8l-150.1-178L136 752.1V792h752v-30.4L658.1 489z", "fill": secondaryColor } }, { "tag": "path", "attrs": { "d": "M136 652.7l132.4-157c3.2-3.8 9-3.8 12.2 0l144 170.7L652 396.8c3.2-3.8 9-3.8 12.2 0L888 662.2V232H136v420.7zM304 280a88 88 0 110 176 88 88 0 010-176z", "fill": secondaryColor } }, { "tag": "path", "attrs": { "d": "M276 368a28 28 0 1056 0 28 28 0 10-56 0z", "fill": secondaryColor } }, { "tag": "path", "attrs": { "d": "M304 456a88 88 0 100-176 88 88 0 000 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z", "fill": primaryColor } }] };
}, "name": "picture", "theme": "twotone" };
var PictureTwoTone = function PictureTwoTone2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: PictureTwoTone$1
  }));
};
var RefIcon$1 = /* @__PURE__ */ reactExports.forwardRef(PictureTwoTone);
function file2Obj(file) {
  return Object.assign(Object.assign({}, file), {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  });
}
function updateFileList(file, fileList) {
  const nextFileList = _toConsumableArray(fileList);
  const fileIndex = nextFileList.findIndex(({
    uid: uid2
  }) => uid2 === file.uid);
  if (fileIndex === -1) {
    nextFileList.push(file);
  } else {
    nextFileList[fileIndex] = file;
  }
  return nextFileList;
}
function getFileItem(file, fileList) {
  const matchKey = file.uid !== void 0 ? "uid" : "name";
  return fileList.filter((item) => item[matchKey] === file[matchKey])[0];
}
function removeFileItem(file, fileList) {
  const matchKey = file.uid !== void 0 ? "uid" : "name";
  const removed = fileList.filter((item) => item[matchKey] !== file[matchKey]);
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}
const extname = (url = "") => {
  const temp = url.split("/");
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [""])[0];
};
const isImageFileType = (type) => type.indexOf("image/") === 0;
const isImageUrl = (file) => {
  if (file.type && !file.thumbUrl) {
    return isImageFileType(file.type);
  }
  const url = file.thumbUrl || file.url || "";
  const extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico|heic|heif)$/i.test(extension)) {
    return true;
  }
  if (/^data:/.test(url)) {
    return false;
  }
  if (extension) {
    return false;
  }
  return true;
};
const MEASURE_SIZE = 200;
function previewImage(file) {
  return new Promise((resolve) => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve("");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const {
        width,
        height
      } = img;
      let drawWidth = MEASURE_SIZE;
      let drawHeight = MEASURE_SIZE;
      let offsetX = 0;
      let offsetY = 0;
      if (width > height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      window.URL.revokeObjectURL(img.src);
      resolve(dataURL);
    };
    img.crossOrigin = "anonymous";
    if (file.type.startsWith("image/svg+xml")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          img.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("image/gif")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      img.src = window.URL.createObjectURL(file);
    }
  });
}
var DownloadOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" } }] }, "name": "download", "theme": "outlined" };
var DownloadOutlined = function DownloadOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: DownloadOutlined$1
  }));
};
var RefIcon = /* @__PURE__ */ reactExports.forwardRef(DownloadOutlined);
const ListItem = /* @__PURE__ */ reactExports.forwardRef(({
  prefixCls,
  className,
  style,
  locale,
  listType,
  file,
  items,
  progress: progressProps,
  iconRender,
  actionIconRender,
  itemRender,
  isImgUrl,
  showPreviewIcon,
  showRemoveIcon,
  showDownloadIcon,
  previewIcon: customPreviewIcon,
  removeIcon: customRemoveIcon,
  downloadIcon: customDownloadIcon,
  extra: customExtra,
  onPreview,
  onDownload,
  onClose
}, ref) => {
  var _a, _b;
  const {
    status
  } = file;
  const [mergedStatus, setMergedStatus] = reactExports.useState(status);
  reactExports.useEffect(() => {
    if (status !== "removed") {
      setMergedStatus(status);
    }
  }, [status]);
  const [showProgress, setShowProgress] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const iconNode = iconRender(file);
  let icon = /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-icon`
  }, iconNode);
  if (listType === "picture" || listType === "picture-card" || listType === "picture-circle") {
    if (mergedStatus === "uploading" || !file.thumbUrl && !file.url) {
      const uploadingClassName = classNames(`${prefixCls}-list-item-thumbnail`, {
        [`${prefixCls}-list-item-file`]: mergedStatus !== "uploading"
      });
      icon = /* @__PURE__ */ reactExports.createElement("div", {
        className: uploadingClassName
      }, iconNode);
    } else {
      const thumbnail = (isImgUrl === null || isImgUrl === void 0 ? void 0 : isImgUrl(file)) ? /* @__PURE__ */ reactExports.createElement("img", {
        src: file.thumbUrl || file.url,
        alt: file.name,
        className: `${prefixCls}-list-item-image`,
        crossOrigin: file.crossOrigin
      }) : iconNode;
      const aClassName = classNames(`${prefixCls}-list-item-thumbnail`, {
        [`${prefixCls}-list-item-file`]: isImgUrl && !isImgUrl(file)
      });
      icon = /* @__PURE__ */ reactExports.createElement("a", {
        className: aClassName,
        onClick: (e) => onPreview(file, e),
        href: file.url || file.thumbUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, thumbnail);
    }
  }
  const listItemClassName = classNames(`${prefixCls}-list-item`, `${prefixCls}-list-item-${mergedStatus}`);
  const linkProps = typeof file.linkProps === "string" ? JSON.parse(file.linkProps) : file.linkProps;
  const removeIcon = (typeof showRemoveIcon === "function" ? showRemoveIcon(file) : showRemoveIcon) ? actionIconRender(
    (typeof customRemoveIcon === "function" ? customRemoveIcon(file) : customRemoveIcon) || /* @__PURE__ */ reactExports.createElement(RefIcon$4, null),
    () => onClose(file),
    prefixCls,
    locale.removeFile,
    // acceptUploadDisabled is true, only remove icon will follow Upload disabled prop
    // https://github.com/ant-design/ant-design/issues/46171
    true
  ) : null;
  const downloadIcon = (typeof showDownloadIcon === "function" ? showDownloadIcon(file) : showDownloadIcon) && mergedStatus === "done" ? actionIconRender((typeof customDownloadIcon === "function" ? customDownloadIcon(file) : customDownloadIcon) || /* @__PURE__ */ reactExports.createElement(RefIcon, null), () => onDownload(file), prefixCls, locale.downloadFile) : null;
  const downloadOrDelete = listType !== "picture-card" && listType !== "picture-circle" && /* @__PURE__ */ reactExports.createElement("span", {
    key: "download-delete",
    className: classNames(`${prefixCls}-list-item-actions`, {
      picture: listType === "picture"
    })
  }, downloadIcon, removeIcon);
  const extraContent = typeof customExtra === "function" ? customExtra(file) : customExtra;
  const extra = extraContent && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-list-item-extra`
  }, extraContent);
  const listItemNameClass = classNames(`${prefixCls}-list-item-name`);
  const fileName = file.url ? /* @__PURE__ */ reactExports.createElement("a", Object.assign({
    key: "view",
    target: "_blank",
    rel: "noopener noreferrer",
    className: listItemNameClass,
    title: file.name
  }, linkProps, {
    href: file.url,
    onClick: (e) => onPreview(file, e)
  }), file.name, extra) : /* @__PURE__ */ reactExports.createElement("span", {
    key: "view",
    className: listItemNameClass,
    onClick: (e) => onPreview(file, e),
    title: file.name
  }, file.name, extra);
  const previewIcon = (typeof showPreviewIcon === "function" ? showPreviewIcon(file) : showPreviewIcon) && (file.url || file.thumbUrl) ? /* @__PURE__ */ reactExports.createElement("a", {
    href: file.url || file.thumbUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: (e) => onPreview(file, e),
    title: locale.previewFile
  }, typeof customPreviewIcon === "function" ? customPreviewIcon(file) : customPreviewIcon || /* @__PURE__ */ reactExports.createElement(RefIcon$5, null)) : null;
  const pictureCardActions = (listType === "picture-card" || listType === "picture-circle") && mergedStatus !== "uploading" && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-list-item-actions`
  }, previewIcon, mergedStatus === "done" && downloadIcon, removeIcon);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const dom = /* @__PURE__ */ reactExports.createElement("div", {
    className: listItemClassName
  }, icon, fileName, downloadOrDelete, pictureCardActions, showProgress && /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    motionName: `${rootPrefixCls}-fade`,
    visible: mergedStatus === "uploading",
    motionDeadline: 2e3
  }, ({
    className: motionClassName
  }) => {
    const loadingProgress = "percent" in file ? /* @__PURE__ */ reactExports.createElement(Progress, Object.assign({
      type: "line",
      percent: file.percent,
      "aria-label": file["aria-label"],
      "aria-labelledby": file["aria-labelledby"]
    }, progressProps)) : null;
    return /* @__PURE__ */ reactExports.createElement("div", {
      className: classNames(`${prefixCls}-list-item-progress`, motionClassName)
    }, loadingProgress);
  }));
  const message = file.response && typeof file.response === "string" ? file.response : ((_a = file.error) === null || _a === void 0 ? void 0 : _a.statusText) || ((_b = file.error) === null || _b === void 0 ? void 0 : _b.message) || locale.uploadError;
  const item = mergedStatus === "error" ? /* @__PURE__ */ reactExports.createElement(Tooltip, {
    title: message,
    getPopupContainer: (node) => node.parentNode
  }, dom) : dom;
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(`${prefixCls}-list-item-container`, className),
    style,
    ref
  }, itemRender ? itemRender(item, file, items, {
    download: onDownload.bind(null, file),
    preview: onPreview.bind(null, file),
    remove: onClose.bind(null, file)
  }) : item);
});
const InternalUploadList = (props, ref) => {
  const {
    listType = "text",
    previewFile = previewImage,
    onPreview,
    onDownload,
    onRemove,
    locale,
    iconRender,
    isImageUrl: isImgUrl = isImageUrl,
    prefixCls: customizePrefixCls,
    items = [],
    showPreviewIcon = true,
    showRemoveIcon = true,
    showDownloadIcon = false,
    removeIcon,
    previewIcon,
    downloadIcon,
    extra,
    progress = {
      size: [-1, 2],
      showInfo: false
    },
    appendAction,
    appendActionVisible = true,
    itemRender,
    disabled
  } = props;
  const [, forceUpdate] = useForceUpdate();
  const [motionAppear, setMotionAppear] = reactExports.useState(false);
  const isPictureCardOrCirle = ["picture-card", "picture-circle"].includes(listType);
  reactExports.useEffect(() => {
    if (!listType.startsWith("picture")) {
      return;
    }
    (items || []).forEach((file) => {
      if (!(file.originFileObj instanceof File || file.originFileObj instanceof Blob) || file.thumbUrl !== void 0) {
        return;
      }
      file.thumbUrl = "";
      previewFile === null || previewFile === void 0 ? void 0 : previewFile(file.originFileObj).then((previewDataUrl) => {
        file.thumbUrl = previewDataUrl || "";
        forceUpdate();
      });
    });
  }, [listType, items, previewFile]);
  reactExports.useEffect(() => {
    setMotionAppear(true);
  }, []);
  const onInternalPreview = (file, e) => {
    if (!onPreview) {
      return;
    }
    e === null || e === void 0 ? void 0 : e.preventDefault();
    return onPreview(file);
  };
  const onInternalDownload = (file) => {
    if (typeof onDownload === "function") {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };
  const onInternalClose = (file) => {
    onRemove === null || onRemove === void 0 ? void 0 : onRemove(file);
  };
  const internalIconRender = (file) => {
    if (iconRender) {
      return iconRender(file, listType);
    }
    const isLoading = file.status === "uploading";
    if (listType.startsWith("picture")) {
      const loadingIcon = listType === "picture" ? /* @__PURE__ */ reactExports.createElement(RefIcon$6, null) : locale.uploading;
      const fileIcon = (isImgUrl === null || isImgUrl === void 0 ? void 0 : isImgUrl(file)) ? /* @__PURE__ */ reactExports.createElement(RefIcon$1, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$3, null);
      return isLoading ? loadingIcon : fileIcon;
    }
    return isLoading ? /* @__PURE__ */ reactExports.createElement(RefIcon$6, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$2, null);
  };
  const actionIconRender = (customIcon, callback, prefixCls2, title, acceptUploadDisabled) => {
    const btnProps = {
      type: "text",
      size: "small",
      title,
      onClick: (e) => {
        var _a, _b;
        callback();
        if (/* @__PURE__ */ reactExports.isValidElement(customIcon)) {
          (_b = (_a = customIcon.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        }
      },
      className: `${prefixCls2}-list-item-action`,
      disabled: acceptUploadDisabled ? disabled : false
    };
    return /* @__PURE__ */ reactExports.isValidElement(customIcon) ? /* @__PURE__ */ reactExports.createElement(Button, Object.assign({}, btnProps, {
      icon: cloneElement(customIcon, Object.assign(Object.assign({}, customIcon.props), {
        onClick: () => {
        }
      }))
    })) : /* @__PURE__ */ reactExports.createElement(Button, Object.assign({}, btnProps), /* @__PURE__ */ reactExports.createElement("span", null, customIcon));
  };
  reactExports.useImperativeHandle(ref, () => ({
    handlePreview: onInternalPreview,
    handleDownload: onInternalDownload
  }));
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("upload", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const listClassNames = classNames(`${prefixCls}-list`, `${prefixCls}-list-${listType}`);
  const listItemMotion = reactExports.useMemo(() => omit(initCollapseMotion(rootPrefixCls), ["onAppearEnd", "onEnterEnd", "onLeaveEnd"]), [rootPrefixCls]);
  const motionConfig = Object.assign(Object.assign({}, isPictureCardOrCirle ? {} : listItemMotion), {
    motionDeadline: 2e3,
    motionName: `${prefixCls}-${isPictureCardOrCirle ? "animate-inline" : "animate"}`,
    keys: _toConsumableArray(items.map((file) => ({
      key: file.uid,
      file
    }))),
    motionAppear
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: listClassNames
  }, /* @__PURE__ */ reactExports.createElement(CSSMotionList, Object.assign({}, motionConfig, {
    component: false
  }), ({
    key,
    file,
    className: motionClassName,
    style: motionStyle
  }) => /* @__PURE__ */ reactExports.createElement(ListItem, {
    key,
    locale,
    prefixCls,
    className: motionClassName,
    style: motionStyle,
    file,
    items,
    progress,
    listType,
    isImgUrl,
    showPreviewIcon,
    showRemoveIcon,
    showDownloadIcon,
    removeIcon,
    previewIcon,
    downloadIcon,
    extra,
    iconRender: internalIconRender,
    actionIconRender,
    itemRender,
    onPreview: onInternalPreview,
    onDownload: onInternalDownload,
    onClose: onInternalClose
  })), appendAction && /* @__PURE__ */ reactExports.createElement(CSSMotion, Object.assign({}, motionConfig, {
    visible: appendActionVisible,
    forceRender: true
  }), ({
    className: motionClassName,
    style: motionStyle
  }) => cloneElement(appendAction, (oriProps) => ({
    className: classNames(oriProps.className, motionClassName),
    style: Object.assign(Object.assign(Object.assign({}, motionStyle), {
      // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
      pointerEvents: motionClassName ? "none" : void 0
    }), oriProps.style)
  }))));
};
const UploadList = /* @__PURE__ */ reactExports.forwardRef(InternalUploadList);
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, [])).next());
  });
};
const LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`;
const InternalUpload = (props, ref) => {
  const config = useComponentConfig("upload");
  const {
    fileList,
    defaultFileList,
    onRemove,
    showUploadList = true,
    listType = "text",
    onPreview,
    onDownload,
    onChange,
    onDrop,
    previewFile,
    disabled: customDisabled,
    locale: propLocale,
    iconRender,
    isImageUrl: isImageUrl2,
    progress,
    prefixCls: customizePrefixCls,
    className,
    type = "select",
    children,
    style,
    itemRender,
    maxCount,
    data = {},
    multiple = false,
    hasControlInside = true,
    action = "",
    accept = "",
    supportServerRender = true,
    rootClassName
  } = props;
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const customRequest = props.customRequest || config.customRequest;
  const [mergedFileList, setMergedFileList] = useMergedState(defaultFileList || [], {
    value: fileList,
    postState: (list) => list !== null && list !== void 0 ? list : []
  });
  const [dragState, setDragState] = reactExports.useState("drop");
  const upload2 = reactExports.useRef(null);
  const wrapRef = reactExports.useRef(null);
  reactExports.useMemo(() => {
    const timestamp = Date.now();
    (fileList || []).forEach((file, index2) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index2}__`;
      }
    });
  }, [fileList]);
  const onInternalChange = (file, changedFileList, event) => {
    let cloneList = _toConsumableArray(changedFileList);
    let exceedMaxCount = false;
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      exceedMaxCount = cloneList.length > maxCount;
      cloneList = cloneList.slice(0, maxCount);
    }
    reactDomExports.flushSync(() => {
      setMergedFileList(cloneList);
    });
    const changeInfo = {
      file,
      fileList: cloneList
    };
    if (event) {
      changeInfo.event = event;
    }
    if (!exceedMaxCount || file.status === "removed" || // We should ignore event if current file is exceed `maxCount`
    cloneList.some((f) => f.uid === file.uid)) {
      reactDomExports.flushSync(() => {
        onChange === null || onChange === void 0 ? void 0 : onChange(changeInfo);
      });
    }
  };
  const mergedBeforeUpload = (file, fileListArgs) => __awaiter(void 0, void 0, void 0, function* () {
    const {
      beforeUpload,
      transformFile
    } = props;
    let parsedFile = file;
    if (beforeUpload) {
      const result = yield beforeUpload(file, fileListArgs);
      if (result === false) {
        return false;
      }
      delete file[LIST_IGNORE];
      if (result === LIST_IGNORE) {
        Object.defineProperty(file, LIST_IGNORE, {
          value: true,
          configurable: true
        });
        return false;
      }
      if (typeof result === "object" && result) {
        parsedFile = result;
      }
    }
    if (transformFile) {
      parsedFile = yield transformFile(parsedFile);
    }
    return parsedFile;
  });
  const onBatchStart = (batchFileInfoList) => {
    const filteredFileInfoList = batchFileInfoList.filter((info) => !info.file[LIST_IGNORE]);
    if (!filteredFileInfoList.length) {
      return;
    }
    const objectFileList = filteredFileInfoList.map((info) => file2Obj(info.file));
    let newFileList = _toConsumableArray(mergedFileList);
    objectFileList.forEach((fileObj) => {
      newFileList = updateFileList(fileObj, newFileList);
    });
    objectFileList.forEach((fileObj, index2) => {
      let triggerFileObj = fileObj;
      if (!filteredFileInfoList[index2].parsedFile) {
        const {
          originFileObj
        } = fileObj;
        let clone;
        try {
          clone = new File([originFileObj], originFileObj.name, {
            type: originFileObj.type
          });
        } catch (_a) {
          clone = new Blob([originFileObj], {
            type: originFileObj.type
          });
          clone.name = originFileObj.name;
          clone.lastModifiedDate = /* @__PURE__ */ new Date();
          clone.lastModified = (/* @__PURE__ */ new Date()).getTime();
        }
        clone.uid = fileObj.uid;
        triggerFileObj = clone;
      } else {
        fileObj.status = "uploading";
      }
      onInternalChange(triggerFileObj, newFileList);
    });
  };
  const onSuccess = (response, file, xhr) => {
    try {
      if (typeof response === "string") {
        response = JSON.parse(response);
      }
    } catch (_a) {
    }
    if (!getFileItem(file, mergedFileList)) {
      return;
    }
    const targetItem = file2Obj(file);
    targetItem.status = "done";
    targetItem.percent = 100;
    targetItem.response = response;
    targetItem.xhr = xhr;
    const nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList);
  };
  const onProgress = (e, file) => {
    if (!getFileItem(file, mergedFileList)) {
      return;
    }
    const targetItem = file2Obj(file);
    targetItem.status = "uploading";
    targetItem.percent = e.percent;
    const nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList, e);
  };
  const onError = (error, response, file) => {
    if (!getFileItem(file, mergedFileList)) {
      return;
    }
    const targetItem = file2Obj(file);
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = "error";
    const nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList);
  };
  const handleRemove = (file) => {
    let currentFile;
    Promise.resolve(typeof onRemove === "function" ? onRemove(file) : onRemove).then((ret) => {
      var _a;
      if (ret === false) {
        return;
      }
      const removedFileList = removeFileItem(file, mergedFileList);
      if (removedFileList) {
        currentFile = Object.assign(Object.assign({}, file), {
          status: "removed"
        });
        mergedFileList === null || mergedFileList === void 0 ? void 0 : mergedFileList.forEach((item) => {
          const matchKey = currentFile.uid !== void 0 ? "uid" : "name";
          if (item[matchKey] === currentFile[matchKey] && !Object.isFrozen(item)) {
            item.status = "removed";
          }
        });
        (_a = upload2.current) === null || _a === void 0 ? void 0 : _a.abort(currentFile);
        onInternalChange(currentFile, removedFileList);
      }
    });
  };
  const onFileDrop = (e) => {
    setDragState(e.type);
    if (e.type === "drop") {
      onDrop === null || onDrop === void 0 ? void 0 : onDrop(e);
    }
  };
  reactExports.useImperativeHandle(ref, () => ({
    onBatchStart,
    onSuccess,
    onProgress,
    onError,
    fileList: mergedFileList,
    upload: upload2.current,
    nativeElement: wrapRef.current
  }));
  const {
    getPrefixCls,
    direction,
    upload: ctxUpload
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("upload", customizePrefixCls);
  const rcUploadProps = Object.assign(Object.assign({
    onBatchStart,
    onError,
    onProgress,
    onSuccess
  }, props), {
    customRequest,
    data,
    multiple,
    action,
    accept,
    supportServerRender,
    prefixCls,
    disabled: mergedDisabled,
    beforeUpload: mergedBeforeUpload,
    onChange: void 0,
    hasControlInside
  });
  delete rcUploadProps.className;
  delete rcUploadProps.style;
  if (!children || mergedDisabled) {
    delete rcUploadProps.id;
  }
  const wrapperCls = `${prefixCls}-wrapper`;
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, wrapperCls);
  const [contextLocale] = useLocale("Upload", localeValues.Upload);
  const {
    showRemoveIcon,
    showPreviewIcon,
    showDownloadIcon,
    removeIcon,
    previewIcon,
    downloadIcon,
    extra
  } = typeof showUploadList === "boolean" ? {} : showUploadList;
  const realShowRemoveIcon = typeof showRemoveIcon === "undefined" ? !mergedDisabled : showRemoveIcon;
  const renderUploadList = (button, buttonVisible) => {
    if (!showUploadList) {
      return button;
    }
    return /* @__PURE__ */ reactExports.createElement(UploadList, {
      prefixCls,
      listType,
      items: mergedFileList,
      previewFile,
      onPreview,
      onDownload,
      onRemove: handleRemove,
      showRemoveIcon: realShowRemoveIcon,
      showPreviewIcon,
      showDownloadIcon,
      removeIcon,
      previewIcon,
      downloadIcon,
      iconRender,
      extra,
      locale: Object.assign(Object.assign({}, contextLocale), propLocale),
      isImageUrl: isImageUrl2,
      progress,
      appendAction: button,
      appendActionVisible: buttonVisible,
      itemRender,
      disabled: mergedDisabled
    });
  };
  const mergedCls = classNames(wrapperCls, className, rootClassName, hashId, cssVarCls, ctxUpload === null || ctxUpload === void 0 ? void 0 : ctxUpload.className, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-picture-card-wrapper`]: listType === "picture-card",
    [`${prefixCls}-picture-circle-wrapper`]: listType === "picture-circle"
  });
  const mergedStyle = Object.assign(Object.assign({}, ctxUpload === null || ctxUpload === void 0 ? void 0 : ctxUpload.style), style);
  if (type === "drag") {
    const dragCls = classNames(hashId, prefixCls, `${prefixCls}-drag`, {
      [`${prefixCls}-drag-uploading`]: mergedFileList.some((file) => file.status === "uploading"),
      [`${prefixCls}-drag-hover`]: dragState === "dragover",
      [`${prefixCls}-disabled`]: mergedDisabled,
      [`${prefixCls}-rtl`]: direction === "rtl"
    });
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", {
      className: mergedCls,
      ref: wrapRef
    }, /* @__PURE__ */ reactExports.createElement("div", {
      className: dragCls,
      style: mergedStyle,
      onDrop: onFileDrop,
      onDragOver: onFileDrop,
      onDragLeave: onFileDrop
    }, /* @__PURE__ */ reactExports.createElement(Upload$2, Object.assign({}, rcUploadProps, {
      ref: upload2,
      className: `${prefixCls}-btn`
    }), /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-drag-container`
    }, children))), renderUploadList()));
  }
  const uploadBtnCls = classNames(prefixCls, `${prefixCls}-select`, {
    [`${prefixCls}-disabled`]: mergedDisabled,
    [`${prefixCls}-hidden`]: !children
  });
  const uploadButton = /* @__PURE__ */ reactExports.createElement("div", {
    className: uploadBtnCls,
    style: mergedStyle
  }, /* @__PURE__ */ reactExports.createElement(Upload$2, Object.assign({}, rcUploadProps, {
    ref: upload2
  })));
  if (listType === "picture-card" || listType === "picture-circle") {
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", {
      className: mergedCls,
      ref: wrapRef
    }, renderUploadList(uploadButton, !!children)));
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", {
    className: mergedCls,
    ref: wrapRef
  }, uploadButton, renderUploadList()));
};
const Upload$1 = /* @__PURE__ */ reactExports.forwardRef(InternalUpload);
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Dragger = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    style,
    height,
    hasControlInside = false,
    children
  } = props, restProps = __rest(props, ["style", "height", "hasControlInside", "children"]);
  const mergedStyle = Object.assign(Object.assign({}, style), {
    height
  });
  return /* @__PURE__ */ reactExports.createElement(Upload$1, Object.assign({
    ref,
    hasControlInside
  }, restProps, {
    style: mergedStyle,
    type: "drag"
  }), children);
});
const Upload = Upload$1;
Upload.Dragger = Dragger;
Upload.LIST_IGNORE = LIST_IGNORE;
export {
  Upload as U
};
