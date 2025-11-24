(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name50 in all)
      __defProp(target, name50, { get: all[name50], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/source-map-js/lib/base64.js
  var require_base64 = __commonJS({
    "node_modules/source-map-js/lib/base64.js"(exports) {
      var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      exports.encode = function(number2) {
        if (0 <= number2 && number2 < intToCharMap.length) {
          return intToCharMap[number2];
        }
        throw new TypeError("Must be between 0 and 63: " + number2);
      };
      exports.decode = function(charCode) {
        var bigA = 65;
        var bigZ = 90;
        var littleA = 97;
        var littleZ = 122;
        var zero2 = 48;
        var nine = 57;
        var plus = 43;
        var slash = 47;
        var littleOffset = 26;
        var numberOffset = 52;
        if (bigA <= charCode && charCode <= bigZ) {
          return charCode - bigA;
        }
        if (littleA <= charCode && charCode <= littleZ) {
          return charCode - littleA + littleOffset;
        }
        if (zero2 <= charCode && charCode <= nine) {
          return charCode - zero2 + numberOffset;
        }
        if (charCode == plus) {
          return 62;
        }
        if (charCode == slash) {
          return 63;
        }
        return -1;
      };
    }
  });

  // node_modules/source-map-js/lib/base64-vlq.js
  var require_base64_vlq = __commonJS({
    "node_modules/source-map-js/lib/base64-vlq.js"(exports) {
      var base64 = require_base64();
      var VLQ_BASE_SHIFT = 5;
      var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
      var VLQ_BASE_MASK = VLQ_BASE - 1;
      var VLQ_CONTINUATION_BIT = VLQ_BASE;
      function toVLQSigned(aValue) {
        return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
      }
      function fromVLQSigned(aValue) {
        var isNegative = (aValue & 1) === 1;
        var shifted = aValue >> 1;
        return isNegative ? -shifted : shifted;
      }
      exports.encode = function base64VLQ_encode(aValue) {
        var encoded = "";
        var digit;
        var vlq = toVLQSigned(aValue);
        do {
          digit = vlq & VLQ_BASE_MASK;
          vlq >>>= VLQ_BASE_SHIFT;
          if (vlq > 0) {
            digit |= VLQ_CONTINUATION_BIT;
          }
          encoded += base64.encode(digit);
        } while (vlq > 0);
        return encoded;
      };
      exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
        var strLen = aStr.length;
        var result = 0;
        var shift = 0;
        var continuation, digit;
        do {
          if (aIndex >= strLen) {
            throw new Error("Expected more digits in base 64 VLQ value.");
          }
          digit = base64.decode(aStr.charCodeAt(aIndex++));
          if (digit === -1) {
            throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
          }
          continuation = !!(digit & VLQ_CONTINUATION_BIT);
          digit &= VLQ_BASE_MASK;
          result = result + (digit << shift);
          shift += VLQ_BASE_SHIFT;
        } while (continuation);
        aOutParam.value = fromVLQSigned(result);
        aOutParam.rest = aIndex;
      };
    }
  });

  // node_modules/source-map-js/lib/util.js
  var require_util = __commonJS({
    "node_modules/source-map-js/lib/util.js"(exports) {
      function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) {
          return aArgs[aName];
        } else if (arguments.length === 3) {
          return aDefaultValue;
        } else {
          throw new Error('"' + aName + '" is a required argument.');
        }
      }
      exports.getArg = getArg;
      var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
      var dataUrlRegexp = /^data:.+\,.+$/;
      function urlParse(aUrl) {
        var match = aUrl.match(urlRegexp);
        if (!match) {
          return null;
        }
        return {
          scheme: match[1],
          auth: match[2],
          host: match[3],
          port: match[4],
          path: match[5]
        };
      }
      exports.urlParse = urlParse;
      function urlGenerate(aParsedUrl) {
        var url = "";
        if (aParsedUrl.scheme) {
          url += aParsedUrl.scheme + ":";
        }
        url += "//";
        if (aParsedUrl.auth) {
          url += aParsedUrl.auth + "@";
        }
        if (aParsedUrl.host) {
          url += aParsedUrl.host;
        }
        if (aParsedUrl.port) {
          url += ":" + aParsedUrl.port;
        }
        if (aParsedUrl.path) {
          url += aParsedUrl.path;
        }
        return url;
      }
      exports.urlGenerate = urlGenerate;
      var MAX_CACHED_INPUTS = 32;
      function lruMemoize(f) {
        var cache = [];
        return function(input) {
          for (var i = 0; i < cache.length; i++) {
            if (cache[i].input === input) {
              var temp = cache[0];
              cache[0] = cache[i];
              cache[i] = temp;
              return cache[0].result;
            }
          }
          var result = f(input);
          cache.unshift({
            input,
            result
          });
          if (cache.length > MAX_CACHED_INPUTS) {
            cache.pop();
          }
          return result;
        };
      }
      var normalize = lruMemoize(function normalize2(aPath) {
        var path = aPath;
        var url = urlParse(aPath);
        if (url) {
          if (!url.path) {
            return aPath;
          }
          path = url.path;
        }
        var isAbsolute = exports.isAbsolute(path);
        var parts = [];
        var start = 0;
        var i = 0;
        while (true) {
          start = i;
          i = path.indexOf("/", start);
          if (i === -1) {
            parts.push(path.slice(start));
            break;
          } else {
            parts.push(path.slice(start, i));
            while (i < path.length && path[i] === "/") {
              i++;
            }
          }
        }
        for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
          part = parts[i];
          if (part === ".") {
            parts.splice(i, 1);
          } else if (part === "..") {
            up++;
          } else if (up > 0) {
            if (part === "") {
              parts.splice(i + 1, up);
              up = 0;
            } else {
              parts.splice(i, 2);
              up--;
            }
          }
        }
        path = parts.join("/");
        if (path === "") {
          path = isAbsolute ? "/" : ".";
        }
        if (url) {
          url.path = path;
          return urlGenerate(url);
        }
        return path;
      });
      exports.normalize = normalize;
      function join(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        if (aPath === "") {
          aPath = ".";
        }
        var aPathUrl = urlParse(aPath);
        var aRootUrl = urlParse(aRoot);
        if (aRootUrl) {
          aRoot = aRootUrl.path || "/";
        }
        if (aPathUrl && !aPathUrl.scheme) {
          if (aRootUrl) {
            aPathUrl.scheme = aRootUrl.scheme;
          }
          return urlGenerate(aPathUrl);
        }
        if (aPathUrl || aPath.match(dataUrlRegexp)) {
          return aPath;
        }
        if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
          aRootUrl.host = aPath;
          return urlGenerate(aRootUrl);
        }
        var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
        if (aRootUrl) {
          aRootUrl.path = joined;
          return urlGenerate(aRootUrl);
        }
        return joined;
      }
      exports.join = join;
      exports.isAbsolute = function(aPath) {
        return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
      };
      function relative(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        aRoot = aRoot.replace(/\/$/, "");
        var level = 0;
        while (aPath.indexOf(aRoot + "/") !== 0) {
          var index = aRoot.lastIndexOf("/");
          if (index < 0) {
            return aPath;
          }
          aRoot = aRoot.slice(0, index);
          if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
            return aPath;
          }
          ++level;
        }
        return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
      }
      exports.relative = relative;
      var supportsNullProto = function() {
        var obj = /* @__PURE__ */ Object.create(null);
        return !("__proto__" in obj);
      }();
      function identity(s) {
        return s;
      }
      function toSetString(aStr) {
        if (isProtoString(aStr)) {
          return "$" + aStr;
        }
        return aStr;
      }
      exports.toSetString = supportsNullProto ? identity : toSetString;
      function fromSetString(aStr) {
        if (isProtoString(aStr)) {
          return aStr.slice(1);
        }
        return aStr;
      }
      exports.fromSetString = supportsNullProto ? identity : fromSetString;
      function isProtoString(s) {
        if (!s) {
          return false;
        }
        var length2 = s.length;
        if (length2 < 9) {
          return false;
        }
        if (s.charCodeAt(length2 - 1) !== 95 || s.charCodeAt(length2 - 2) !== 95 || s.charCodeAt(length2 - 3) !== 111 || s.charCodeAt(length2 - 4) !== 116 || s.charCodeAt(length2 - 5) !== 111 || s.charCodeAt(length2 - 6) !== 114 || s.charCodeAt(length2 - 7) !== 112 || s.charCodeAt(length2 - 8) !== 95 || s.charCodeAt(length2 - 9) !== 95) {
          return false;
        }
        for (var i = length2 - 10; i >= 0; i--) {
          if (s.charCodeAt(i) !== 36) {
            return false;
          }
        }
        return true;
      }
      function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0 || onlyCompareOriginal) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByOriginalPositions = compareByOriginalPositions;
      function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
        var cmp;
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0 || onlyCompareOriginal) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
      function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0 || onlyCompareGenerated) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
      function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0 || onlyCompareGenerated) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
      function strcmp(aStr1, aStr2) {
        if (aStr1 === aStr2) {
          return 0;
        }
        if (aStr1 === null) {
          return 1;
        }
        if (aStr2 === null) {
          return -1;
        }
        if (aStr1 > aStr2) {
          return 1;
        }
        return -1;
      }
      function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
      function parseSourceMapInput(str) {
        return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
      }
      exports.parseSourceMapInput = parseSourceMapInput;
      function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || "";
        if (sourceRoot) {
          if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
            sourceRoot += "/";
          }
          sourceURL = sourceRoot + sourceURL;
        }
        if (sourceMapURL) {
          var parsed = urlParse(sourceMapURL);
          if (!parsed) {
            throw new Error("sourceMapURL could not be parsed");
          }
          if (parsed.path) {
            var index = parsed.path.lastIndexOf("/");
            if (index >= 0) {
              parsed.path = parsed.path.substring(0, index + 1);
            }
          }
          sourceURL = join(urlGenerate(parsed), sourceURL);
        }
        return normalize(sourceURL);
      }
      exports.computeSourceURL = computeSourceURL;
    }
  });

  // node_modules/source-map-js/lib/array-set.js
  var require_array_set = __commonJS({
    "node_modules/source-map-js/lib/array-set.js"(exports) {
      var util = require_util();
      var has = Object.prototype.hasOwnProperty;
      var hasNativeMap = typeof Map !== "undefined";
      function ArraySet() {
        this._array = [];
        this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
      }
      ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
        var set = new ArraySet();
        for (var i = 0, len = aArray.length; i < len; i++) {
          set.add(aArray[i], aAllowDuplicates);
        }
        return set;
      };
      ArraySet.prototype.size = function ArraySet_size() {
        return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
      };
      ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
        var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
        var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
        var idx = this._array.length;
        if (!isDuplicate || aAllowDuplicates) {
          this._array.push(aStr);
        }
        if (!isDuplicate) {
          if (hasNativeMap) {
            this._set.set(aStr, idx);
          } else {
            this._set[sStr] = idx;
          }
        }
      };
      ArraySet.prototype.has = function ArraySet_has(aStr) {
        if (hasNativeMap) {
          return this._set.has(aStr);
        } else {
          var sStr = util.toSetString(aStr);
          return has.call(this._set, sStr);
        }
      };
      ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
        if (hasNativeMap) {
          var idx = this._set.get(aStr);
          if (idx >= 0) {
            return idx;
          }
        } else {
          var sStr = util.toSetString(aStr);
          if (has.call(this._set, sStr)) {
            return this._set[sStr];
          }
        }
        throw new Error('"' + aStr + '" is not in the set.');
      };
      ArraySet.prototype.at = function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this._array.length) {
          return this._array[aIdx];
        }
        throw new Error("No element indexed by " + aIdx);
      };
      ArraySet.prototype.toArray = function ArraySet_toArray() {
        return this._array.slice();
      };
      exports.ArraySet = ArraySet;
    }
  });

  // node_modules/source-map-js/lib/mapping-list.js
  var require_mapping_list = __commonJS({
    "node_modules/source-map-js/lib/mapping-list.js"(exports) {
      var util = require_util();
      function generatedPositionAfter(mappingA, mappingB) {
        var lineA = mappingA.generatedLine;
        var lineB = mappingB.generatedLine;
        var columnA = mappingA.generatedColumn;
        var columnB = mappingB.generatedColumn;
        return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
      }
      function MappingList() {
        this._array = [];
        this._sorted = true;
        this._last = { generatedLine: -1, generatedColumn: 0 };
      }
      MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
        this._array.forEach(aCallback, aThisArg);
      };
      MappingList.prototype.add = function MappingList_add(aMapping) {
        if (generatedPositionAfter(this._last, aMapping)) {
          this._last = aMapping;
          this._array.push(aMapping);
        } else {
          this._sorted = false;
          this._array.push(aMapping);
        }
      };
      MappingList.prototype.toArray = function MappingList_toArray() {
        if (!this._sorted) {
          this._array.sort(util.compareByGeneratedPositionsInflated);
          this._sorted = true;
        }
        return this._array;
      };
      exports.MappingList = MappingList;
    }
  });

  // node_modules/source-map-js/lib/source-map-generator.js
  var require_source_map_generator = __commonJS({
    "node_modules/source-map-js/lib/source-map-generator.js"(exports) {
      var base64VLQ = require_base64_vlq();
      var util = require_util();
      var ArraySet = require_array_set().ArraySet;
      var MappingList = require_mapping_list().MappingList;
      function SourceMapGenerator2(aArgs) {
        if (!aArgs) {
          aArgs = {};
        }
        this._file = util.getArg(aArgs, "file", null);
        this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
        this._skipValidation = util.getArg(aArgs, "skipValidation", false);
        this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
        this._sources = new ArraySet();
        this._names = new ArraySet();
        this._mappings = new MappingList();
        this._sourcesContents = null;
      }
      SourceMapGenerator2.prototype._version = 3;
      SourceMapGenerator2.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
        var sourceRoot = aSourceMapConsumer.sourceRoot;
        var generator = new SourceMapGenerator2(Object.assign(generatorOps || {}, {
          file: aSourceMapConsumer.file,
          sourceRoot
        }));
        aSourceMapConsumer.eachMapping(function(mapping) {
          var newMapping = {
            generated: {
              line: mapping.generatedLine,
              column: mapping.generatedColumn
            }
          };
          if (mapping.source != null) {
            newMapping.source = mapping.source;
            if (sourceRoot != null) {
              newMapping.source = util.relative(sourceRoot, newMapping.source);
            }
            newMapping.original = {
              line: mapping.originalLine,
              column: mapping.originalColumn
            };
            if (mapping.name != null) {
              newMapping.name = mapping.name;
            }
          }
          generator.addMapping(newMapping);
        });
        aSourceMapConsumer.sources.forEach(function(sourceFile) {
          var sourceRelative = sourceFile;
          if (sourceRoot !== null) {
            sourceRelative = util.relative(sourceRoot, sourceFile);
          }
          if (!generator._sources.has(sourceRelative)) {
            generator._sources.add(sourceRelative);
          }
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            generator.setSourceContent(sourceFile, content);
          }
        });
        return generator;
      };
      SourceMapGenerator2.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
        var generated = util.getArg(aArgs, "generated");
        var original = util.getArg(aArgs, "original", null);
        var source = util.getArg(aArgs, "source", null);
        var name50 = util.getArg(aArgs, "name", null);
        if (!this._skipValidation) {
          if (this._validateMapping(generated, original, source, name50) === false) {
            return;
          }
        }
        if (source != null) {
          source = String(source);
          if (!this._sources.has(source)) {
            this._sources.add(source);
          }
        }
        if (name50 != null) {
          name50 = String(name50);
          if (!this._names.has(name50)) {
            this._names.add(name50);
          }
        }
        this._mappings.add({
          generatedLine: generated.line,
          generatedColumn: generated.column,
          originalLine: original != null && original.line,
          originalColumn: original != null && original.column,
          source,
          name: name50
        });
      };
      SourceMapGenerator2.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
        var source = aSourceFile;
        if (this._sourceRoot != null) {
          source = util.relative(this._sourceRoot, source);
        }
        if (aSourceContent != null) {
          if (!this._sourcesContents) {
            this._sourcesContents = /* @__PURE__ */ Object.create(null);
          }
          this._sourcesContents[util.toSetString(source)] = aSourceContent;
        } else if (this._sourcesContents) {
          delete this._sourcesContents[util.toSetString(source)];
          if (Object.keys(this._sourcesContents).length === 0) {
            this._sourcesContents = null;
          }
        }
      };
      SourceMapGenerator2.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        var sourceFile = aSourceFile;
        if (aSourceFile == null) {
          if (aSourceMapConsumer.file == null) {
            throw new Error(
              `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
            );
          }
          sourceFile = aSourceMapConsumer.file;
        }
        var sourceRoot = this._sourceRoot;
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        var newSources = new ArraySet();
        var newNames = new ArraySet();
        this._mappings.unsortedForEach(function(mapping) {
          if (mapping.source === sourceFile && mapping.originalLine != null) {
            var original = aSourceMapConsumer.originalPositionFor({
              line: mapping.originalLine,
              column: mapping.originalColumn
            });
            if (original.source != null) {
              mapping.source = original.source;
              if (aSourceMapPath != null) {
                mapping.source = util.join(aSourceMapPath, mapping.source);
              }
              if (sourceRoot != null) {
                mapping.source = util.relative(sourceRoot, mapping.source);
              }
              mapping.originalLine = original.line;
              mapping.originalColumn = original.column;
              if (original.name != null) {
                mapping.name = original.name;
              }
            }
          }
          var source = mapping.source;
          if (source != null && !newSources.has(source)) {
            newSources.add(source);
          }
          var name50 = mapping.name;
          if (name50 != null && !newNames.has(name50)) {
            newNames.add(name50);
          }
        }, this);
        this._sources = newSources;
        this._names = newNames;
        aSourceMapConsumer.sources.forEach(function(sourceFile2) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
          if (content != null) {
            if (aSourceMapPath != null) {
              sourceFile2 = util.join(aSourceMapPath, sourceFile2);
            }
            if (sourceRoot != null) {
              sourceFile2 = util.relative(sourceRoot, sourceFile2);
            }
            this.setSourceContent(sourceFile2, content);
          }
        }, this);
      };
      SourceMapGenerator2.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
        if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
          var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
          if (this._ignoreInvalidMapping) {
            if (typeof console !== "undefined" && console.warn) {
              console.warn(message);
            }
            return false;
          } else {
            throw new Error(message);
          }
        }
        if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
          return;
        } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
          return;
        } else {
          var message = "Invalid mapping: " + JSON.stringify({
            generated: aGenerated,
            source: aSource,
            original: aOriginal,
            name: aName
          });
          if (this._ignoreInvalidMapping) {
            if (typeof console !== "undefined" && console.warn) {
              console.warn(message);
            }
            return false;
          } else {
            throw new Error(message);
          }
        }
      };
      SourceMapGenerator2.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
        var previousGeneratedColumn = 0;
        var previousGeneratedLine = 1;
        var previousOriginalColumn = 0;
        var previousOriginalLine = 0;
        var previousName = 0;
        var previousSource = 0;
        var result = "";
        var next;
        var mapping;
        var nameIdx;
        var sourceIdx;
        var mappings = this._mappings.toArray();
        for (var i = 0, len = mappings.length; i < len; i++) {
          mapping = mappings[i];
          next = "";
          if (mapping.generatedLine !== previousGeneratedLine) {
            previousGeneratedColumn = 0;
            while (mapping.generatedLine !== previousGeneratedLine) {
              next += ";";
              previousGeneratedLine++;
            }
          } else {
            if (i > 0) {
              if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
                continue;
              }
              next += ",";
            }
          }
          next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
          previousGeneratedColumn = mapping.generatedColumn;
          if (mapping.source != null) {
            sourceIdx = this._sources.indexOf(mapping.source);
            next += base64VLQ.encode(sourceIdx - previousSource);
            previousSource = sourceIdx;
            next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
            previousOriginalLine = mapping.originalLine - 1;
            next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
            previousOriginalColumn = mapping.originalColumn;
            if (mapping.name != null) {
              nameIdx = this._names.indexOf(mapping.name);
              next += base64VLQ.encode(nameIdx - previousName);
              previousName = nameIdx;
            }
          }
          result += next;
        }
        return result;
      };
      SourceMapGenerator2.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
        return aSources.map(function(source) {
          if (!this._sourcesContents) {
            return null;
          }
          if (aSourceRoot != null) {
            source = util.relative(aSourceRoot, source);
          }
          var key = util.toSetString(source);
          return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
        }, this);
      };
      SourceMapGenerator2.prototype.toJSON = function SourceMapGenerator_toJSON() {
        var map = {
          version: this._version,
          sources: this._sources.toArray(),
          names: this._names.toArray(),
          mappings: this._serializeMappings()
        };
        if (this._file != null) {
          map.file = this._file;
        }
        if (this._sourceRoot != null) {
          map.sourceRoot = this._sourceRoot;
        }
        if (this._sourcesContents) {
          map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
        }
        return map;
      };
      SourceMapGenerator2.prototype.toString = function SourceMapGenerator_toString() {
        return JSON.stringify(this.toJSON());
      };
      exports.SourceMapGenerator = SourceMapGenerator2;
    }
  });

  // node_modules/css-tree/lib/tokenizer/types.js
  var EOF = 0;
  var Ident = 1;
  var Function = 2;
  var AtKeyword = 3;
  var Hash = 4;
  var String2 = 5;
  var BadString = 6;
  var Url = 7;
  var BadUrl = 8;
  var Delim = 9;
  var Number2 = 10;
  var Percentage = 11;
  var Dimension = 12;
  var WhiteSpace = 13;
  var CDO = 14;
  var CDC = 15;
  var Colon = 16;
  var Semicolon = 17;
  var Comma = 18;
  var LeftSquareBracket = 19;
  var RightSquareBracket = 20;
  var LeftParenthesis = 21;
  var RightParenthesis = 22;
  var LeftCurlyBracket = 23;
  var RightCurlyBracket = 24;
  var Comment = 25;

  // node_modules/css-tree/lib/tokenizer/char-code-definitions.js
  var EOF2 = 0;
  function isDigit(code2) {
    return code2 >= 48 && code2 <= 57;
  }
  function isHexDigit(code2) {
    return isDigit(code2) || // 0 .. 9
    code2 >= 65 && code2 <= 70 || // A .. F
    code2 >= 97 && code2 <= 102;
  }
  function isUppercaseLetter(code2) {
    return code2 >= 65 && code2 <= 90;
  }
  function isLowercaseLetter(code2) {
    return code2 >= 97 && code2 <= 122;
  }
  function isLetter(code2) {
    return isUppercaseLetter(code2) || isLowercaseLetter(code2);
  }
  function isNonAscii(code2) {
    return code2 >= 128;
  }
  function isNameStart(code2) {
    return isLetter(code2) || isNonAscii(code2) || code2 === 95;
  }
  function isName(code2) {
    return isNameStart(code2) || isDigit(code2) || code2 === 45;
  }
  function isNonPrintable(code2) {
    return code2 >= 0 && code2 <= 8 || code2 === 11 || code2 >= 14 && code2 <= 31 || code2 === 127;
  }
  function isNewline(code2) {
    return code2 === 10 || code2 === 13 || code2 === 12;
  }
  function isWhiteSpace(code2) {
    return isNewline(code2) || code2 === 32 || code2 === 9;
  }
  function isValidEscape(first, second) {
    if (first !== 92) {
      return false;
    }
    if (isNewline(second) || second === EOF2) {
      return false;
    }
    return true;
  }
  function isIdentifierStart(first, second, third) {
    if (first === 45) {
      return isNameStart(second) || second === 45 || isValidEscape(second, third);
    }
    if (isNameStart(first)) {
      return true;
    }
    if (first === 92) {
      return isValidEscape(first, second);
    }
    return false;
  }
  function isNumberStart(first, second, third) {
    if (first === 43 || first === 45) {
      if (isDigit(second)) {
        return 2;
      }
      return second === 46 && isDigit(third) ? 3 : 0;
    }
    if (first === 46) {
      return isDigit(second) ? 2 : 0;
    }
    if (isDigit(first)) {
      return 1;
    }
    return 0;
  }
  function isBOM(code2) {
    if (code2 === 65279) {
      return 1;
    }
    if (code2 === 65534) {
      return 1;
    }
    return 0;
  }
  var CATEGORY = new Array(128);
  var EofCategory = 128;
  var WhiteSpaceCategory = 130;
  var DigitCategory = 131;
  var NameStartCategory = 132;
  var NonPrintableCategory = 133;
  for (let i = 0; i < CATEGORY.length; i++) {
    CATEGORY[i] = isWhiteSpace(i) && WhiteSpaceCategory || isDigit(i) && DigitCategory || isNameStart(i) && NameStartCategory || isNonPrintable(i) && NonPrintableCategory || i || EofCategory;
  }
  function charCodeCategory(code2) {
    return code2 < 128 ? CATEGORY[code2] : NameStartCategory;
  }

  // node_modules/css-tree/lib/tokenizer/utils.js
  function getCharCode(source, offset) {
    return offset < source.length ? source.charCodeAt(offset) : 0;
  }
  function getNewlineLength(source, offset, code2) {
    if (code2 === 13 && getCharCode(source, offset + 1) === 10) {
      return 2;
    }
    return 1;
  }
  function cmpChar(testStr, offset, referenceCode) {
    let code2 = testStr.charCodeAt(offset);
    if (isUppercaseLetter(code2)) {
      code2 = code2 | 32;
    }
    return code2 === referenceCode;
  }
  function cmpStr(testStr, start, end, referenceStr) {
    if (end - start !== referenceStr.length) {
      return false;
    }
    if (start < 0 || end > testStr.length) {
      return false;
    }
    for (let i = start; i < end; i++) {
      const referenceCode = referenceStr.charCodeAt(i - start);
      let testCode = testStr.charCodeAt(i);
      if (isUppercaseLetter(testCode)) {
        testCode = testCode | 32;
      }
      if (testCode !== referenceCode) {
        return false;
      }
    }
    return true;
  }
  function findWhiteSpaceStart(source, offset) {
    for (; offset >= 0; offset--) {
      if (!isWhiteSpace(source.charCodeAt(offset))) {
        break;
      }
    }
    return offset + 1;
  }
  function findWhiteSpaceEnd(source, offset) {
    for (; offset < source.length; offset++) {
      if (!isWhiteSpace(source.charCodeAt(offset))) {
        break;
      }
    }
    return offset;
  }
  function findDecimalNumberEnd(source, offset) {
    for (; offset < source.length; offset++) {
      if (!isDigit(source.charCodeAt(offset))) {
        break;
      }
    }
    return offset;
  }
  function consumeEscaped(source, offset) {
    offset += 2;
    if (isHexDigit(getCharCode(source, offset - 1))) {
      for (const maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) {
        if (!isHexDigit(getCharCode(source, offset))) {
          break;
        }
      }
      const code2 = getCharCode(source, offset);
      if (isWhiteSpace(code2)) {
        offset += getNewlineLength(source, offset, code2);
      }
    }
    return offset;
  }
  function consumeName(source, offset) {
    for (; offset < source.length; offset++) {
      const code2 = source.charCodeAt(offset);
      if (isName(code2)) {
        continue;
      }
      if (isValidEscape(code2, getCharCode(source, offset + 1))) {
        offset = consumeEscaped(source, offset) - 1;
        continue;
      }
      break;
    }
    return offset;
  }
  function consumeNumber(source, offset) {
    let code2 = source.charCodeAt(offset);
    if (code2 === 43 || code2 === 45) {
      code2 = source.charCodeAt(offset += 1);
    }
    if (isDigit(code2)) {
      offset = findDecimalNumberEnd(source, offset + 1);
      code2 = source.charCodeAt(offset);
    }
    if (code2 === 46 && isDigit(source.charCodeAt(offset + 1))) {
      offset += 2;
      offset = findDecimalNumberEnd(source, offset);
    }
    if (cmpChar(
      source,
      offset,
      101
      /* e */
    )) {
      let sign = 0;
      code2 = source.charCodeAt(offset + 1);
      if (code2 === 45 || code2 === 43) {
        sign = 1;
        code2 = source.charCodeAt(offset + 2);
      }
      if (isDigit(code2)) {
        offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
      }
    }
    return offset;
  }
  function consumeBadUrlRemnants(source, offset) {
    for (; offset < source.length; offset++) {
      const code2 = source.charCodeAt(offset);
      if (code2 === 41) {
        offset++;
        break;
      }
      if (isValidEscape(code2, getCharCode(source, offset + 1))) {
        offset = consumeEscaped(source, offset);
      }
    }
    return offset;
  }
  function decodeEscaped(escaped) {
    if (escaped.length === 1 && !isHexDigit(escaped.charCodeAt(0))) {
      return escaped[0];
    }
    let code2 = parseInt(escaped, 16);
    if (code2 === 0 || // If this number is zero,
    code2 >= 55296 && code2 <= 57343 || // or is for a surrogate,
    code2 > 1114111) {
      code2 = 65533;
    }
    return String.fromCodePoint(code2);
  }

  // node_modules/css-tree/lib/tokenizer/names.js
  var names_default = [
    "EOF-token",
    "ident-token",
    "function-token",
    "at-keyword-token",
    "hash-token",
    "string-token",
    "bad-string-token",
    "url-token",
    "bad-url-token",
    "delim-token",
    "number-token",
    "percentage-token",
    "dimension-token",
    "whitespace-token",
    "CDO-token",
    "CDC-token",
    "colon-token",
    "semicolon-token",
    "comma-token",
    "[-token",
    "]-token",
    "(-token",
    ")-token",
    "{-token",
    "}-token",
    "comment-token"
  ];

  // node_modules/css-tree/lib/tokenizer/adopt-buffer.js
  var MIN_SIZE = 16 * 1024;
  function adoptBuffer(buffer = null, size) {
    if (buffer === null || buffer.length < size) {
      return new Uint32Array(Math.max(size + 1024, MIN_SIZE));
    }
    return buffer;
  }

  // node_modules/css-tree/lib/tokenizer/OffsetToLocation.js
  var N = 10;
  var F = 12;
  var R = 13;
  function computeLinesAndColumns(host) {
    const source = host.source;
    const sourceLength = source.length;
    const startOffset = source.length > 0 ? isBOM(source.charCodeAt(0)) : 0;
    const lines = adoptBuffer(host.lines, sourceLength);
    const columns = adoptBuffer(host.columns, sourceLength);
    let line = host.startLine;
    let column = host.startColumn;
    for (let i = startOffset; i < sourceLength; i++) {
      const code2 = source.charCodeAt(i);
      lines[i] = line;
      columns[i] = column++;
      if (code2 === N || code2 === R || code2 === F) {
        if (code2 === R && i + 1 < sourceLength && source.charCodeAt(i + 1) === N) {
          i++;
          lines[i] = line;
          columns[i] = column;
        }
        line++;
        column = 1;
      }
    }
    lines[sourceLength] = line;
    columns[sourceLength] = column;
    host.lines = lines;
    host.columns = columns;
    host.computed = true;
  }
  var OffsetToLocation = class {
    constructor(source, startOffset, startLine, startColumn) {
      this.setSource(source, startOffset, startLine, startColumn);
      this.lines = null;
      this.columns = null;
    }
    setSource(source = "", startOffset = 0, startLine = 1, startColumn = 1) {
      this.source = source;
      this.startOffset = startOffset;
      this.startLine = startLine;
      this.startColumn = startColumn;
      this.computed = false;
    }
    getLocation(offset, filename) {
      if (!this.computed) {
        computeLinesAndColumns(this);
      }
      return {
        source: filename,
        offset: this.startOffset + offset,
        line: this.lines[offset],
        column: this.columns[offset]
      };
    }
    getLocationRange(start, end, filename) {
      if (!this.computed) {
        computeLinesAndColumns(this);
      }
      return {
        source: filename,
        start: {
          offset: this.startOffset + start,
          line: this.lines[start],
          column: this.columns[start]
        },
        end: {
          offset: this.startOffset + end,
          line: this.lines[end],
          column: this.columns[end]
        }
      };
    }
  };

  // node_modules/css-tree/lib/tokenizer/TokenStream.js
  var OFFSET_MASK = 16777215;
  var TYPE_SHIFT = 24;
  var balancePair = new Uint8Array(32);
  balancePair[Function] = RightParenthesis;
  balancePair[LeftParenthesis] = RightParenthesis;
  balancePair[LeftSquareBracket] = RightSquareBracket;
  balancePair[LeftCurlyBracket] = RightCurlyBracket;
  function isBlockOpenerToken(tokenType2) {
    return balancePair[tokenType2] !== 0;
  }
  var TokenStream = class {
    constructor(source, tokenize3) {
      this.setSource(source, tokenize3);
    }
    reset() {
      this.eof = false;
      this.tokenIndex = -1;
      this.tokenType = 0;
      this.tokenStart = this.firstCharOffset;
      this.tokenEnd = this.firstCharOffset;
    }
    setSource(source = "", tokenize3 = () => {
    }) {
      source = String(source || "");
      const sourceLength = source.length;
      const offsetAndType = adoptBuffer(this.offsetAndType, source.length + 1);
      const balance = adoptBuffer(this.balance, source.length + 1);
      let tokenCount = 0;
      let firstCharOffset = -1;
      let balanceCloseType = 0;
      let balanceStart = source.length;
      this.offsetAndType = null;
      this.balance = null;
      balance.fill(0);
      tokenize3(source, (type, start, end) => {
        const index = tokenCount++;
        offsetAndType[index] = type << TYPE_SHIFT | end;
        if (firstCharOffset === -1) {
          firstCharOffset = start;
        }
        balance[index] = balanceStart;
        if (type === balanceCloseType) {
          const prevBalanceStart = balance[balanceStart];
          balance[balanceStart] = index;
          balanceStart = prevBalanceStart;
          balanceCloseType = balancePair[offsetAndType[prevBalanceStart] >> TYPE_SHIFT];
        } else if (isBlockOpenerToken(type)) {
          balanceStart = index;
          balanceCloseType = balancePair[type];
        }
      });
      offsetAndType[tokenCount] = EOF << TYPE_SHIFT | sourceLength;
      balance[tokenCount] = tokenCount;
      for (let i = 0; i < tokenCount; i++) {
        const balanceStart2 = balance[i];
        if (balanceStart2 <= i) {
          const balanceEnd = balance[balanceStart2];
          if (balanceEnd !== i) {
            balance[i] = balanceEnd;
          }
        } else if (balanceStart2 > tokenCount) {
          balance[i] = tokenCount;
        }
      }
      this.source = source;
      this.firstCharOffset = firstCharOffset === -1 ? 0 : firstCharOffset;
      this.tokenCount = tokenCount;
      this.offsetAndType = offsetAndType;
      this.balance = balance;
      this.reset();
      this.next();
    }
    lookupType(offset) {
      offset += this.tokenIndex;
      if (offset < this.tokenCount) {
        return this.offsetAndType[offset] >> TYPE_SHIFT;
      }
      return EOF;
    }
    lookupTypeNonSC(idx) {
      for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
        const tokenType2 = this.offsetAndType[offset] >> TYPE_SHIFT;
        if (tokenType2 !== WhiteSpace && tokenType2 !== Comment) {
          if (idx-- === 0) {
            return tokenType2;
          }
        }
      }
      return EOF;
    }
    lookupOffset(offset) {
      offset += this.tokenIndex;
      if (offset < this.tokenCount) {
        return this.offsetAndType[offset - 1] & OFFSET_MASK;
      }
      return this.source.length;
    }
    lookupOffsetNonSC(idx) {
      for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
        const tokenType2 = this.offsetAndType[offset] >> TYPE_SHIFT;
        if (tokenType2 !== WhiteSpace && tokenType2 !== Comment) {
          if (idx-- === 0) {
            return offset - this.tokenIndex;
          }
        }
      }
      return EOF;
    }
    lookupValue(offset, referenceStr) {
      offset += this.tokenIndex;
      if (offset < this.tokenCount) {
        return cmpStr(
          this.source,
          this.offsetAndType[offset - 1] & OFFSET_MASK,
          this.offsetAndType[offset] & OFFSET_MASK,
          referenceStr
        );
      }
      return false;
    }
    getTokenStart(tokenIndex) {
      if (tokenIndex === this.tokenIndex) {
        return this.tokenStart;
      }
      if (tokenIndex > 0) {
        return tokenIndex < this.tokenCount ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
      }
      return this.firstCharOffset;
    }
    substrToCursor(start) {
      return this.source.substring(start, this.tokenStart);
    }
    isBalanceEdge(pos) {
      return this.balance[this.tokenIndex] < pos;
    }
    isDelim(code2, offset) {
      if (offset) {
        return this.lookupType(offset) === Delim && this.source.charCodeAt(this.lookupOffset(offset)) === code2;
      }
      return this.tokenType === Delim && this.source.charCodeAt(this.tokenStart) === code2;
    }
    skip(tokenCount) {
      let next = this.tokenIndex + tokenCount;
      if (next < this.tokenCount) {
        this.tokenIndex = next;
        this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
        next = this.offsetAndType[next];
        this.tokenType = next >> TYPE_SHIFT;
        this.tokenEnd = next & OFFSET_MASK;
      } else {
        this.tokenIndex = this.tokenCount;
        this.next();
      }
    }
    next() {
      let next = this.tokenIndex + 1;
      if (next < this.tokenCount) {
        this.tokenIndex = next;
        this.tokenStart = this.tokenEnd;
        next = this.offsetAndType[next];
        this.tokenType = next >> TYPE_SHIFT;
        this.tokenEnd = next & OFFSET_MASK;
      } else {
        this.eof = true;
        this.tokenIndex = this.tokenCount;
        this.tokenType = EOF;
        this.tokenStart = this.tokenEnd = this.source.length;
      }
    }
    skipSC() {
      while (this.tokenType === WhiteSpace || this.tokenType === Comment) {
        this.next();
      }
    }
    skipUntilBalanced(startToken, stopConsume) {
      let cursor = startToken;
      let balanceEnd = 0;
      let offset = 0;
      loop:
        for (; cursor < this.tokenCount; cursor++) {
          balanceEnd = this.balance[cursor];
          if (balanceEnd < startToken) {
            break loop;
          }
          offset = cursor > 0 ? this.offsetAndType[cursor - 1] & OFFSET_MASK : this.firstCharOffset;
          switch (stopConsume(this.source.charCodeAt(offset))) {
            case 1:
              break loop;
            case 2:
              cursor++;
              break loop;
            default:
              if (isBlockOpenerToken(this.offsetAndType[cursor] >> TYPE_SHIFT)) {
                cursor = balanceEnd;
              }
          }
        }
      this.skip(cursor - this.tokenIndex);
    }
    forEachToken(fn) {
      for (let i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
        const start = offset;
        const item = this.offsetAndType[i];
        const end = item & OFFSET_MASK;
        const type = item >> TYPE_SHIFT;
        offset = end;
        fn(type, start, end, i);
      }
    }
    dump() {
      const tokens = new Array(this.tokenCount);
      this.forEachToken((type, start, end, index) => {
        tokens[index] = {
          idx: index,
          type: names_default[type],
          chunk: this.source.substring(start, end),
          balance: this.balance[index]
        };
      });
      return tokens;
    }
  };

  // node_modules/css-tree/lib/tokenizer/index.js
  function tokenize(source, onToken) {
    function getCharCode2(offset2) {
      return offset2 < sourceLength ? source.charCodeAt(offset2) : 0;
    }
    function consumeNumericToken() {
      offset = consumeNumber(source, offset);
      if (isIdentifierStart(getCharCode2(offset), getCharCode2(offset + 1), getCharCode2(offset + 2))) {
        type = Dimension;
        offset = consumeName(source, offset);
        return;
      }
      if (getCharCode2(offset) === 37) {
        type = Percentage;
        offset++;
        return;
      }
      type = Number2;
    }
    function consumeIdentLikeToken() {
      const nameStartOffset = offset;
      offset = consumeName(source, offset);
      if (cmpStr(source, nameStartOffset, offset, "url") && getCharCode2(offset) === 40) {
        offset = findWhiteSpaceEnd(source, offset + 1);
        if (getCharCode2(offset) === 34 || getCharCode2(offset) === 39) {
          type = Function;
          offset = nameStartOffset + 4;
          return;
        }
        consumeUrlToken();
        return;
      }
      if (getCharCode2(offset) === 40) {
        type = Function;
        offset++;
        return;
      }
      type = Ident;
    }
    function consumeStringToken(endingCodePoint) {
      if (!endingCodePoint) {
        endingCodePoint = getCharCode2(offset++);
      }
      type = String2;
      for (; offset < source.length; offset++) {
        const code2 = source.charCodeAt(offset);
        switch (charCodeCategory(code2)) {
          // ending code point
          case endingCodePoint:
            offset++;
            return;
          // EOF
          // case EofCategory:
          // This is a parse error. Return the <string-token>.
          // return;
          // newline
          case WhiteSpaceCategory:
            if (isNewline(code2)) {
              offset += getNewlineLength(source, offset, code2);
              type = BadString;
              return;
            }
            break;
          // U+005C REVERSE SOLIDUS (\)
          case 92:
            if (offset === source.length - 1) {
              break;
            }
            const nextCode = getCharCode2(offset + 1);
            if (isNewline(nextCode)) {
              offset += getNewlineLength(source, offset + 1, nextCode);
            } else if (isValidEscape(code2, nextCode)) {
              offset = consumeEscaped(source, offset) - 1;
            }
            break;
        }
      }
    }
    function consumeUrlToken() {
      type = Url;
      offset = findWhiteSpaceEnd(source, offset);
      for (; offset < source.length; offset++) {
        const code2 = source.charCodeAt(offset);
        switch (charCodeCategory(code2)) {
          // U+0029 RIGHT PARENTHESIS ())
          case 41:
            offset++;
            return;
          // EOF
          // case EofCategory:
          // This is a parse error. Return the <url-token>.
          // return;
          // whitespace
          case WhiteSpaceCategory:
            offset = findWhiteSpaceEnd(source, offset);
            if (getCharCode2(offset) === 41 || offset >= source.length) {
              if (offset < source.length) {
                offset++;
              }
              return;
            }
            offset = consumeBadUrlRemnants(source, offset);
            type = BadUrl;
            return;
          // U+0022 QUOTATION MARK (")
          // U+0027 APOSTROPHE (')
          // U+0028 LEFT PARENTHESIS (()
          // non-printable code point
          case 34:
          case 39:
          case 40:
          case NonPrintableCategory:
            offset = consumeBadUrlRemnants(source, offset);
            type = BadUrl;
            return;
          // U+005C REVERSE SOLIDUS (\)
          case 92:
            if (isValidEscape(code2, getCharCode2(offset + 1))) {
              offset = consumeEscaped(source, offset) - 1;
              break;
            }
            offset = consumeBadUrlRemnants(source, offset);
            type = BadUrl;
            return;
        }
      }
    }
    source = String(source || "");
    const sourceLength = source.length;
    let start = isBOM(getCharCode2(0));
    let offset = start;
    let type;
    while (offset < sourceLength) {
      const code2 = source.charCodeAt(offset);
      switch (charCodeCategory(code2)) {
        // whitespace
        case WhiteSpaceCategory:
          type = WhiteSpace;
          offset = findWhiteSpaceEnd(source, offset + 1);
          break;
        // U+0022 QUOTATION MARK (")
        case 34:
          consumeStringToken();
          break;
        // U+0023 NUMBER SIGN (#)
        case 35:
          if (isName(getCharCode2(offset + 1)) || isValidEscape(getCharCode2(offset + 1), getCharCode2(offset + 2))) {
            type = Hash;
            offset = consumeName(source, offset + 1);
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+0027 APOSTROPHE (')
        case 39:
          consumeStringToken();
          break;
        // U+0028 LEFT PARENTHESIS (()
        case 40:
          type = LeftParenthesis;
          offset++;
          break;
        // U+0029 RIGHT PARENTHESIS ())
        case 41:
          type = RightParenthesis;
          offset++;
          break;
        // U+002B PLUS SIGN (+)
        case 43:
          if (isNumberStart(code2, getCharCode2(offset + 1), getCharCode2(offset + 2))) {
            consumeNumericToken();
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+002C COMMA (,)
        case 44:
          type = Comma;
          offset++;
          break;
        // U+002D HYPHEN-MINUS (-)
        case 45:
          if (isNumberStart(code2, getCharCode2(offset + 1), getCharCode2(offset + 2))) {
            consumeNumericToken();
          } else {
            if (getCharCode2(offset + 1) === 45 && getCharCode2(offset + 2) === 62) {
              type = CDC;
              offset = offset + 3;
            } else {
              if (isIdentifierStart(code2, getCharCode2(offset + 1), getCharCode2(offset + 2))) {
                consumeIdentLikeToken();
              } else {
                type = Delim;
                offset++;
              }
            }
          }
          break;
        // U+002E FULL STOP (.)
        case 46:
          if (isNumberStart(code2, getCharCode2(offset + 1), getCharCode2(offset + 2))) {
            consumeNumericToken();
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+002F SOLIDUS (/)
        case 47:
          if (getCharCode2(offset + 1) === 42) {
            type = Comment;
            offset = source.indexOf("*/", offset + 2);
            offset = offset === -1 ? source.length : offset + 2;
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+003A COLON (:)
        case 58:
          type = Colon;
          offset++;
          break;
        // U+003B SEMICOLON (;)
        case 59:
          type = Semicolon;
          offset++;
          break;
        // U+003C LESS-THAN SIGN (<)
        case 60:
          if (getCharCode2(offset + 1) === 33 && getCharCode2(offset + 2) === 45 && getCharCode2(offset + 3) === 45) {
            type = CDO;
            offset = offset + 4;
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+0040 COMMERCIAL AT (@)
        case 64:
          if (isIdentifierStart(getCharCode2(offset + 1), getCharCode2(offset + 2), getCharCode2(offset + 3))) {
            type = AtKeyword;
            offset = consumeName(source, offset + 1);
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+005B LEFT SQUARE BRACKET ([)
        case 91:
          type = LeftSquareBracket;
          offset++;
          break;
        // U+005C REVERSE SOLIDUS (\)
        case 92:
          if (isValidEscape(code2, getCharCode2(offset + 1))) {
            consumeIdentLikeToken();
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+005D RIGHT SQUARE BRACKET (])
        case 93:
          type = RightSquareBracket;
          offset++;
          break;
        // U+007B LEFT CURLY BRACKET ({)
        case 123:
          type = LeftCurlyBracket;
          offset++;
          break;
        // U+007D RIGHT CURLY BRACKET (})
        case 125:
          type = RightCurlyBracket;
          offset++;
          break;
        // digit
        case DigitCategory:
          consumeNumericToken();
          break;
        // name-start code point
        case NameStartCategory:
          consumeIdentLikeToken();
          break;
        // EOF
        // case EofCategory:
        // Return an <EOF-token>.
        // break;
        // anything else
        default:
          type = Delim;
          offset++;
      }
      onToken(type, start, start = offset);
    }
  }

  // node_modules/css-tree/lib/utils/List.js
  var releasedCursors = null;
  var List = class _List {
    static createItem(data) {
      return {
        prev: null,
        next: null,
        data
      };
    }
    constructor() {
      this.head = null;
      this.tail = null;
      this.cursor = null;
    }
    createItem(data) {
      return _List.createItem(data);
    }
    // cursor helpers
    allocateCursor(prev, next) {
      let cursor;
      if (releasedCursors !== null) {
        cursor = releasedCursors;
        releasedCursors = releasedCursors.cursor;
        cursor.prev = prev;
        cursor.next = next;
        cursor.cursor = this.cursor;
      } else {
        cursor = {
          prev,
          next,
          cursor: this.cursor
        };
      }
      this.cursor = cursor;
      return cursor;
    }
    releaseCursor() {
      const { cursor } = this;
      this.cursor = cursor.cursor;
      cursor.prev = null;
      cursor.next = null;
      cursor.cursor = releasedCursors;
      releasedCursors = cursor;
    }
    updateCursors(prevOld, prevNew, nextOld, nextNew) {
      let { cursor } = this;
      while (cursor !== null) {
        if (cursor.prev === prevOld) {
          cursor.prev = prevNew;
        }
        if (cursor.next === nextOld) {
          cursor.next = nextNew;
        }
        cursor = cursor.cursor;
      }
    }
    *[Symbol.iterator]() {
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        yield cursor.data;
      }
    }
    // getters
    get size() {
      let size = 0;
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        size++;
      }
      return size;
    }
    get isEmpty() {
      return this.head === null;
    }
    get first() {
      return this.head && this.head.data;
    }
    get last() {
      return this.tail && this.tail.data;
    }
    // convertors
    fromArray(array) {
      let cursor = null;
      this.head = null;
      for (let data of array) {
        const item = _List.createItem(data);
        if (cursor !== null) {
          cursor.next = item;
        } else {
          this.head = item;
        }
        item.prev = cursor;
        cursor = item;
      }
      this.tail = cursor;
      return this;
    }
    toArray() {
      return [...this];
    }
    toJSON() {
      return [...this];
    }
    // array-like methods
    forEach(fn, thisArg = this) {
      const cursor = this.allocateCursor(null, this.head);
      while (cursor.next !== null) {
        const item = cursor.next;
        cursor.next = item.next;
        fn.call(thisArg, item.data, item, this);
      }
      this.releaseCursor();
    }
    forEachRight(fn, thisArg = this) {
      const cursor = this.allocateCursor(this.tail, null);
      while (cursor.prev !== null) {
        const item = cursor.prev;
        cursor.prev = item.prev;
        fn.call(thisArg, item.data, item, this);
      }
      this.releaseCursor();
    }
    reduce(fn, initialValue, thisArg = this) {
      let cursor = this.allocateCursor(null, this.head);
      let acc = initialValue;
      let item;
      while (cursor.next !== null) {
        item = cursor.next;
        cursor.next = item.next;
        acc = fn.call(thisArg, acc, item.data, item, this);
      }
      this.releaseCursor();
      return acc;
    }
    reduceRight(fn, initialValue, thisArg = this) {
      let cursor = this.allocateCursor(this.tail, null);
      let acc = initialValue;
      let item;
      while (cursor.prev !== null) {
        item = cursor.prev;
        cursor.prev = item.prev;
        acc = fn.call(thisArg, acc, item.data, item, this);
      }
      this.releaseCursor();
      return acc;
    }
    some(fn, thisArg = this) {
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        if (fn.call(thisArg, cursor.data, cursor, this)) {
          return true;
        }
      }
      return false;
    }
    map(fn, thisArg = this) {
      const result = new _List();
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        result.appendData(fn.call(thisArg, cursor.data, cursor, this));
      }
      return result;
    }
    filter(fn, thisArg = this) {
      const result = new _List();
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        if (fn.call(thisArg, cursor.data, cursor, this)) {
          result.appendData(cursor.data);
        }
      }
      return result;
    }
    nextUntil(start, fn, thisArg = this) {
      if (start === null) {
        return;
      }
      const cursor = this.allocateCursor(null, start);
      while (cursor.next !== null) {
        const item = cursor.next;
        cursor.next = item.next;
        if (fn.call(thisArg, item.data, item, this)) {
          break;
        }
      }
      this.releaseCursor();
    }
    prevUntil(start, fn, thisArg = this) {
      if (start === null) {
        return;
      }
      const cursor = this.allocateCursor(start, null);
      while (cursor.prev !== null) {
        const item = cursor.prev;
        cursor.prev = item.prev;
        if (fn.call(thisArg, item.data, item, this)) {
          break;
        }
      }
      this.releaseCursor();
    }
    // mutation
    clear() {
      this.head = null;
      this.tail = null;
    }
    copy() {
      const result = new _List();
      for (let data of this) {
        result.appendData(data);
      }
      return result;
    }
    prepend(item) {
      this.updateCursors(null, item, this.head, item);
      if (this.head !== null) {
        this.head.prev = item;
        item.next = this.head;
      } else {
        this.tail = item;
      }
      this.head = item;
      return this;
    }
    prependData(data) {
      return this.prepend(_List.createItem(data));
    }
    append(item) {
      return this.insert(item);
    }
    appendData(data) {
      return this.insert(_List.createItem(data));
    }
    insert(item, before = null) {
      if (before !== null) {
        this.updateCursors(before.prev, item, before, item);
        if (before.prev === null) {
          if (this.head !== before) {
            throw new Error("before doesn't belong to list");
          }
          this.head = item;
          before.prev = item;
          item.next = before;
          this.updateCursors(null, item);
        } else {
          before.prev.next = item;
          item.prev = before.prev;
          before.prev = item;
          item.next = before;
        }
      } else {
        this.updateCursors(this.tail, item, null, item);
        if (this.tail !== null) {
          this.tail.next = item;
          item.prev = this.tail;
        } else {
          this.head = item;
        }
        this.tail = item;
      }
      return this;
    }
    insertData(data, before) {
      return this.insert(_List.createItem(data), before);
    }
    remove(item) {
      this.updateCursors(item, item.prev, item, item.next);
      if (item.prev !== null) {
        item.prev.next = item.next;
      } else {
        if (this.head !== item) {
          throw new Error("item doesn't belong to list");
        }
        this.head = item.next;
      }
      if (item.next !== null) {
        item.next.prev = item.prev;
      } else {
        if (this.tail !== item) {
          throw new Error("item doesn't belong to list");
        }
        this.tail = item.prev;
      }
      item.prev = null;
      item.next = null;
      return item;
    }
    push(data) {
      this.insert(_List.createItem(data));
    }
    pop() {
      return this.tail !== null ? this.remove(this.tail) : null;
    }
    unshift(data) {
      this.prepend(_List.createItem(data));
    }
    shift() {
      return this.head !== null ? this.remove(this.head) : null;
    }
    prependList(list) {
      return this.insertList(list, this.head);
    }
    appendList(list) {
      return this.insertList(list);
    }
    insertList(list, before) {
      if (list.head === null) {
        return this;
      }
      if (before !== void 0 && before !== null) {
        this.updateCursors(before.prev, list.tail, before, list.head);
        if (before.prev !== null) {
          before.prev.next = list.head;
          list.head.prev = before.prev;
        } else {
          this.head = list.head;
        }
        before.prev = list.tail;
        list.tail.next = before;
      } else {
        this.updateCursors(this.tail, list.tail, null, list.head);
        if (this.tail !== null) {
          this.tail.next = list.head;
          list.head.prev = this.tail;
        } else {
          this.head = list.head;
        }
        this.tail = list.tail;
      }
      list.head = null;
      list.tail = null;
      return this;
    }
    replace(oldItem, newItemOrList) {
      if ("head" in newItemOrList) {
        this.insertList(newItemOrList, oldItem);
      } else {
        this.insert(newItemOrList, oldItem);
      }
      this.remove(oldItem);
    }
  };

  // node_modules/css-tree/lib/utils/create-custom-error.js
  function createCustomError(name50, message) {
    const error = Object.create(SyntaxError.prototype);
    const errorStack = new Error();
    return Object.assign(error, {
      name: name50,
      message,
      get stack() {
        return (errorStack.stack || "").replace(/^(.+\n){1,3}/, `${name50}: ${message}
`);
      }
    });
  }

  // node_modules/css-tree/lib/parser/SyntaxError.js
  var MAX_LINE_LENGTH = 100;
  var OFFSET_CORRECTION = 60;
  var TAB_REPLACEMENT = "    ";
  function sourceFragment({ source, line, column, baseLine, baseColumn }, extraLines) {
    function processLines(start, end) {
      return lines.slice(start, end).map(
        (line2, idx) => String(start + idx + 1).padStart(maxNumLength) + " |" + line2
      ).join("\n");
    }
    const prelines = "\n".repeat(Math.max(baseLine - 1, 0));
    const precolumns = " ".repeat(Math.max(baseColumn - 1, 0));
    const lines = (prelines + precolumns + source).split(/\r\n?|\n|\f/);
    const startLine = Math.max(1, line - extraLines) - 1;
    const endLine = Math.min(line + extraLines, lines.length + 1);
    const maxNumLength = Math.max(4, String(endLine).length) + 1;
    let cutLeft = 0;
    column += (TAB_REPLACEMENT.length - 1) * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;
    if (column > MAX_LINE_LENGTH) {
      cutLeft = column - OFFSET_CORRECTION + 3;
      column = OFFSET_CORRECTION - 2;
    }
    for (let i = startLine; i <= endLine; i++) {
      if (i >= 0 && i < lines.length) {
        lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
        lines[i] = (cutLeft > 0 && lines[i].length > cutLeft ? "\u2026" : "") + lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) + (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? "\u2026" : "");
      }
    }
    return [
      processLines(startLine, line),
      new Array(column + maxNumLength + 2).join("-") + "^",
      processLines(line, endLine)
    ].filter(Boolean).join("\n").replace(/^(\s+\d+\s+\|\n)+/, "").replace(/\n(\s+\d+\s+\|)+$/, "");
  }
  function SyntaxError2(message, source, offset, line, column, baseLine = 1, baseColumn = 1) {
    const error = Object.assign(createCustomError("SyntaxError", message), {
      source,
      offset,
      line,
      column,
      sourceFragment(extraLines) {
        return sourceFragment({ source, line, column, baseLine, baseColumn }, isNaN(extraLines) ? 0 : extraLines);
      },
      get formattedMessage() {
        return `Parse error: ${message}
` + sourceFragment({ source, line, column, baseLine, baseColumn }, 2);
      }
    });
    return error;
  }

  // node_modules/css-tree/lib/parser/sequence.js
  function readSequence(recognizer) {
    const children = this.createList();
    let space = false;
    const context = {
      recognizer
    };
    while (!this.eof) {
      switch (this.tokenType) {
        case Comment:
          this.next();
          continue;
        case WhiteSpace:
          space = true;
          this.next();
          continue;
      }
      let child = recognizer.getNode.call(this, context);
      if (child === void 0) {
        break;
      }
      if (space) {
        if (recognizer.onWhiteSpace) {
          recognizer.onWhiteSpace.call(this, child, children, context);
        }
        space = false;
      }
      children.push(child);
    }
    if (space && recognizer.onWhiteSpace) {
      recognizer.onWhiteSpace.call(this, null, children, context);
    }
    return children;
  }

  // node_modules/css-tree/lib/parser/create.js
  var NOOP = () => {
  };
  var EXCLAMATIONMARK = 33;
  var NUMBERSIGN = 35;
  var SEMICOLON = 59;
  var LEFTCURLYBRACKET = 123;
  var NULL = 0;
  function createParseContext(name50) {
    return function() {
      return this[name50]();
    };
  }
  function fetchParseValues(dict) {
    const result = /* @__PURE__ */ Object.create(null);
    for (const name50 of Object.keys(dict)) {
      const item = dict[name50];
      const fn = item.parse || item;
      if (fn) {
        result[name50] = fn;
      }
    }
    return result;
  }
  function processConfig(config) {
    const parseConfig = {
      context: /* @__PURE__ */ Object.create(null),
      features: Object.assign(/* @__PURE__ */ Object.create(null), config.features),
      scope: Object.assign(/* @__PURE__ */ Object.create(null), config.scope),
      atrule: fetchParseValues(config.atrule),
      pseudo: fetchParseValues(config.pseudo),
      node: fetchParseValues(config.node)
    };
    for (const [name50, context] of Object.entries(config.parseContext)) {
      switch (typeof context) {
        case "function":
          parseConfig.context[name50] = context;
          break;
        case "string":
          parseConfig.context[name50] = createParseContext(context);
          break;
      }
    }
    return {
      config: parseConfig,
      ...parseConfig,
      ...parseConfig.node
    };
  }
  function createParser(config) {
    let source = "";
    let filename = "<unknown>";
    let needPositions = false;
    let onParseError = NOOP;
    let onParseErrorThrow = false;
    const locationMap = new OffsetToLocation();
    const parser = Object.assign(new TokenStream(), processConfig(config || {}), {
      parseAtrulePrelude: true,
      parseRulePrelude: true,
      parseValue: true,
      parseCustomProperty: false,
      readSequence,
      consumeUntilBalanceEnd: () => 0,
      consumeUntilLeftCurlyBracket(code2) {
        return code2 === LEFTCURLYBRACKET ? 1 : 0;
      },
      consumeUntilLeftCurlyBracketOrSemicolon(code2) {
        return code2 === LEFTCURLYBRACKET || code2 === SEMICOLON ? 1 : 0;
      },
      consumeUntilExclamationMarkOrSemicolon(code2) {
        return code2 === EXCLAMATIONMARK || code2 === SEMICOLON ? 1 : 0;
      },
      consumeUntilSemicolonIncluded(code2) {
        return code2 === SEMICOLON ? 2 : 0;
      },
      createList() {
        return new List();
      },
      createSingleNodeList(node) {
        return new List().appendData(node);
      },
      getFirstListNode(list) {
        return list && list.first;
      },
      getLastListNode(list) {
        return list && list.last;
      },
      parseWithFallback(consumer, fallback) {
        const startIndex = this.tokenIndex;
        try {
          return consumer.call(this);
        } catch (e) {
          if (onParseErrorThrow) {
            throw e;
          }
          this.skip(startIndex - this.tokenIndex);
          const fallbackNode = fallback.call(this);
          onParseErrorThrow = true;
          onParseError(e, fallbackNode);
          onParseErrorThrow = false;
          return fallbackNode;
        }
      },
      lookupNonWSType(offset) {
        let type;
        do {
          type = this.lookupType(offset++);
          if (type !== WhiteSpace && type !== Comment) {
            return type;
          }
        } while (type !== NULL);
        return NULL;
      },
      charCodeAt(offset) {
        return offset >= 0 && offset < source.length ? source.charCodeAt(offset) : 0;
      },
      substring(offsetStart, offsetEnd) {
        return source.substring(offsetStart, offsetEnd);
      },
      substrToCursor(start) {
        return this.source.substring(start, this.tokenStart);
      },
      cmpChar(offset, charCode) {
        return cmpChar(source, offset, charCode);
      },
      cmpStr(offsetStart, offsetEnd, str) {
        return cmpStr(source, offsetStart, offsetEnd, str);
      },
      consume(tokenType2) {
        const start = this.tokenStart;
        this.eat(tokenType2);
        return this.substrToCursor(start);
      },
      consumeFunctionName() {
        const name50 = source.substring(this.tokenStart, this.tokenEnd - 1);
        this.eat(Function);
        return name50;
      },
      consumeNumber(type) {
        const number2 = source.substring(this.tokenStart, consumeNumber(source, this.tokenStart));
        this.eat(type);
        return number2;
      },
      eat(tokenType2) {
        if (this.tokenType !== tokenType2) {
          const tokenName = names_default[tokenType2].slice(0, -6).replace(/-/g, " ").replace(/^./, (m) => m.toUpperCase());
          let message = `${/[[\](){}]/.test(tokenName) ? `"${tokenName}"` : tokenName} is expected`;
          let offset = this.tokenStart;
          switch (tokenType2) {
            case Ident:
              if (this.tokenType === Function || this.tokenType === Url) {
                offset = this.tokenEnd - 1;
                message = "Identifier is expected but function found";
              } else {
                message = "Identifier is expected";
              }
              break;
            case Hash:
              if (this.isDelim(NUMBERSIGN)) {
                this.next();
                offset++;
                message = "Name is expected";
              }
              break;
            case Percentage:
              if (this.tokenType === Number2) {
                offset = this.tokenEnd;
                message = "Percent sign is expected";
              }
              break;
          }
          this.error(message, offset);
        }
        this.next();
      },
      eatIdent(name50) {
        if (this.tokenType !== Ident || this.lookupValue(0, name50) === false) {
          this.error(`Identifier "${name50}" is expected`);
        }
        this.next();
      },
      eatDelim(code2) {
        if (!this.isDelim(code2)) {
          this.error(`Delim "${String.fromCharCode(code2)}" is expected`);
        }
        this.next();
      },
      getLocation(start, end) {
        if (needPositions) {
          return locationMap.getLocationRange(
            start,
            end,
            filename
          );
        }
        return null;
      },
      getLocationFromList(list) {
        if (needPositions) {
          const head = this.getFirstListNode(list);
          const tail = this.getLastListNode(list);
          return locationMap.getLocationRange(
            head !== null ? head.loc.start.offset - locationMap.startOffset : this.tokenStart,
            tail !== null ? tail.loc.end.offset - locationMap.startOffset : this.tokenStart,
            filename
          );
        }
        return null;
      },
      error(message, offset) {
        const location = typeof offset !== "undefined" && offset < source.length ? locationMap.getLocation(offset) : this.eof ? locationMap.getLocation(findWhiteSpaceStart(source, source.length - 1)) : locationMap.getLocation(this.tokenStart);
        throw new SyntaxError2(
          message || "Unexpected input",
          source,
          location.offset,
          location.line,
          location.column,
          locationMap.startLine,
          locationMap.startColumn
        );
      }
    });
    const parse52 = function(source_, options) {
      source = source_;
      options = options || {};
      parser.setSource(source, tokenize);
      locationMap.setSource(
        source,
        options.offset,
        options.line,
        options.column
      );
      filename = options.filename || "<unknown>";
      needPositions = Boolean(options.positions);
      onParseError = typeof options.onParseError === "function" ? options.onParseError : NOOP;
      onParseErrorThrow = false;
      parser.parseAtrulePrelude = "parseAtrulePrelude" in options ? Boolean(options.parseAtrulePrelude) : true;
      parser.parseRulePrelude = "parseRulePrelude" in options ? Boolean(options.parseRulePrelude) : true;
      parser.parseValue = "parseValue" in options ? Boolean(options.parseValue) : true;
      parser.parseCustomProperty = "parseCustomProperty" in options ? Boolean(options.parseCustomProperty) : false;
      const { context = "default", onComment } = options;
      if (context in parser.context === false) {
        throw new Error("Unknown context `" + context + "`");
      }
      if (typeof onComment === "function") {
        parser.forEachToken((type, start, end) => {
          if (type === Comment) {
            const loc = parser.getLocation(start, end);
            const value = cmpStr(source, end - 2, end, "*/") ? source.slice(start + 2, end - 2) : source.slice(start + 2, end);
            onComment(value, loc);
          }
        });
      }
      const ast = parser.context[context].call(parser, options);
      if (!parser.eof) {
        parser.error();
      }
      return ast;
    };
    return Object.assign(parse52, {
      SyntaxError: SyntaxError2,
      config: parser.config
    });
  }

  // node_modules/css-tree/lib/generator/sourceMap.js
  var import_source_map_generator = __toESM(require_source_map_generator(), 1);
  var trackNodes = /* @__PURE__ */ new Set(["Atrule", "Selector", "Declaration"]);
  function generateSourceMap(handlers) {
    const map = new import_source_map_generator.SourceMapGenerator();
    const generated = {
      line: 1,
      column: 0
    };
    const original = {
      line: 0,
      // should be zero to add first mapping
      column: 0
    };
    const activatedGenerated = {
      line: 1,
      column: 0
    };
    const activatedMapping = {
      generated: activatedGenerated
    };
    let line = 1;
    let column = 0;
    let sourceMappingActive = false;
    const origHandlersNode = handlers.node;
    handlers.node = function(node) {
      if (node.loc && node.loc.start && trackNodes.has(node.type)) {
        const nodeLine = node.loc.start.line;
        const nodeColumn = node.loc.start.column - 1;
        if (original.line !== nodeLine || original.column !== nodeColumn) {
          original.line = nodeLine;
          original.column = nodeColumn;
          generated.line = line;
          generated.column = column;
          if (sourceMappingActive) {
            sourceMappingActive = false;
            if (generated.line !== activatedGenerated.line || generated.column !== activatedGenerated.column) {
              map.addMapping(activatedMapping);
            }
          }
          sourceMappingActive = true;
          map.addMapping({
            source: node.loc.source,
            original,
            generated
          });
        }
      }
      origHandlersNode.call(this, node);
      if (sourceMappingActive && trackNodes.has(node.type)) {
        activatedGenerated.line = line;
        activatedGenerated.column = column;
      }
    };
    const origHandlersEmit = handlers.emit;
    handlers.emit = function(value, type, auto) {
      for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) === 10) {
          line++;
          column = 0;
        } else {
          column++;
        }
      }
      origHandlersEmit(value, type, auto);
    };
    const origHandlersResult = handlers.result;
    handlers.result = function() {
      if (sourceMappingActive) {
        map.addMapping(activatedMapping);
      }
      return {
        css: origHandlersResult(),
        map
      };
    };
    return handlers;
  }

  // node_modules/css-tree/lib/generator/token-before.js
  var token_before_exports = {};
  __export(token_before_exports, {
    safe: () => safe,
    spec: () => spec
  });
  var PLUSSIGN = 43;
  var HYPHENMINUS = 45;
  var code = (type, value) => {
    if (type === Delim) {
      type = value;
    }
    if (typeof type === "string") {
      const charCode = type.charCodeAt(0);
      return charCode > 127 ? 32768 : charCode << 8;
    }
    return type;
  };
  var specPairs = [
    [Ident, Ident],
    [Ident, Function],
    [Ident, Url],
    [Ident, BadUrl],
    [Ident, "-"],
    [Ident, Number2],
    [Ident, Percentage],
    [Ident, Dimension],
    [Ident, CDC],
    [Ident, LeftParenthesis],
    [AtKeyword, Ident],
    [AtKeyword, Function],
    [AtKeyword, Url],
    [AtKeyword, BadUrl],
    [AtKeyword, "-"],
    [AtKeyword, Number2],
    [AtKeyword, Percentage],
    [AtKeyword, Dimension],
    [AtKeyword, CDC],
    [Hash, Ident],
    [Hash, Function],
    [Hash, Url],
    [Hash, BadUrl],
    [Hash, "-"],
    [Hash, Number2],
    [Hash, Percentage],
    [Hash, Dimension],
    [Hash, CDC],
    [Dimension, Ident],
    [Dimension, Function],
    [Dimension, Url],
    [Dimension, BadUrl],
    [Dimension, "-"],
    [Dimension, Number2],
    [Dimension, Percentage],
    [Dimension, Dimension],
    [Dimension, CDC],
    ["#", Ident],
    ["#", Function],
    ["#", Url],
    ["#", BadUrl],
    ["#", "-"],
    ["#", Number2],
    ["#", Percentage],
    ["#", Dimension],
    ["#", CDC],
    // https://github.com/w3c/csswg-drafts/pull/6874
    ["-", Ident],
    ["-", Function],
    ["-", Url],
    ["-", BadUrl],
    ["-", "-"],
    ["-", Number2],
    ["-", Percentage],
    ["-", Dimension],
    ["-", CDC],
    // https://github.com/w3c/csswg-drafts/pull/6874
    [Number2, Ident],
    [Number2, Function],
    [Number2, Url],
    [Number2, BadUrl],
    [Number2, Number2],
    [Number2, Percentage],
    [Number2, Dimension],
    [Number2, "%"],
    [Number2, CDC],
    // https://github.com/w3c/csswg-drafts/pull/6874
    ["@", Ident],
    ["@", Function],
    ["@", Url],
    ["@", BadUrl],
    ["@", "-"],
    ["@", CDC],
    // https://github.com/w3c/csswg-drafts/pull/6874
    [".", Number2],
    [".", Percentage],
    [".", Dimension],
    ["+", Number2],
    ["+", Percentage],
    ["+", Dimension],
    ["/", "*"]
  ];
  var safePairs = specPairs.concat([
    [Ident, Hash],
    [Dimension, Hash],
    [Hash, Hash],
    [AtKeyword, LeftParenthesis],
    [AtKeyword, String2],
    [AtKeyword, Colon],
    [Percentage, Percentage],
    [Percentage, Dimension],
    [Percentage, Function],
    [Percentage, "-"],
    [RightParenthesis, Ident],
    [RightParenthesis, Function],
    [RightParenthesis, Percentage],
    [RightParenthesis, Dimension],
    [RightParenthesis, Hash],
    [RightParenthesis, "-"]
  ]);
  function createMap(pairs) {
    const isWhiteSpaceRequired = new Set(
      pairs.map(([prev, next]) => code(prev) << 16 | code(next))
    );
    return function(prevCode, type, value) {
      const nextCode = code(type, value);
      const nextCharCode = value.charCodeAt(0);
      const emitWs = nextCharCode === HYPHENMINUS && type !== Ident && type !== Function && type !== CDC || nextCharCode === PLUSSIGN ? isWhiteSpaceRequired.has(prevCode << 16 | nextCharCode << 8) : isWhiteSpaceRequired.has(prevCode << 16 | nextCode);
      if (emitWs) {
        this.emit(" ", WhiteSpace, true);
      }
      return nextCode;
    };
  }
  var spec = createMap(specPairs);
  var safe = createMap(safePairs);

  // node_modules/css-tree/lib/generator/create.js
  var REVERSESOLIDUS = 92;
  function processChildren(node, delimeter) {
    if (typeof delimeter === "function") {
      let prev = null;
      node.children.forEach((node2) => {
        if (prev !== null) {
          delimeter.call(this, prev);
        }
        this.node(node2);
        prev = node2;
      });
      return;
    }
    node.children.forEach(this.node, this);
  }
  function processChunk(chunk) {
    tokenize(chunk, (type, start, end) => {
      this.token(type, chunk.slice(start, end));
    });
  }
  function createGenerator(config) {
    const types = /* @__PURE__ */ new Map();
    for (let [name50, item] of Object.entries(config.node)) {
      const fn = item.generate || item;
      if (typeof fn === "function") {
        types.set(name50, item.generate || item);
      }
    }
    return function(node, options) {
      let buffer = "";
      let prevCode = 0;
      let handlers = {
        node(node2) {
          if (types.has(node2.type)) {
            types.get(node2.type).call(publicApi, node2);
          } else {
            throw new Error("Unknown node type: " + node2.type);
          }
        },
        tokenBefore: safe,
        token(type, value) {
          prevCode = this.tokenBefore(prevCode, type, value);
          this.emit(value, type, false);
          if (type === Delim && value.charCodeAt(0) === REVERSESOLIDUS) {
            this.emit("\n", WhiteSpace, true);
          }
        },
        emit(value) {
          buffer += value;
        },
        result() {
          return buffer;
        }
      };
      if (options) {
        if (typeof options.decorator === "function") {
          handlers = options.decorator(handlers);
        }
        if (options.sourceMap) {
          handlers = generateSourceMap(handlers);
        }
        if (options.mode in token_before_exports) {
          handlers.tokenBefore = token_before_exports[options.mode];
        }
      }
      const publicApi = {
        node: (node2) => handlers.node(node2),
        children: processChildren,
        token: (type, value) => handlers.token(type, value),
        tokenize: processChunk
      };
      handlers.node(node);
      return handlers.result();
    };
  }

  // node_modules/css-tree/lib/convertor/create.js
  function createConvertor(walk3) {
    return {
      fromPlainObject(ast) {
        walk3(ast, {
          enter(node) {
            if (node.children && node.children instanceof List === false) {
              node.children = new List().fromArray(node.children);
            }
          }
        });
        return ast;
      },
      toPlainObject(ast) {
        walk3(ast, {
          leave(node) {
            if (node.children && node.children instanceof List) {
              node.children = node.children.toArray();
            }
          }
        });
        return ast;
      }
    };
  }

  // node_modules/css-tree/lib/walker/create.js
  var { hasOwnProperty: hasOwnProperty2 } = Object.prototype;
  var noop = function() {
  };
  function ensureFunction(value) {
    return typeof value === "function" ? value : noop;
  }
  function invokeForType(fn, type) {
    return function(node, item, list) {
      if (node.type === type) {
        fn.call(this, node, item, list);
      }
    };
  }
  function getWalkersFromStructure(name50, nodeType) {
    const structure50 = nodeType.structure;
    const walkers = [];
    for (const key in structure50) {
      if (hasOwnProperty2.call(structure50, key) === false) {
        continue;
      }
      let fieldTypes = structure50[key];
      const walker = {
        name: key,
        type: false,
        nullable: false
      };
      if (!Array.isArray(fieldTypes)) {
        fieldTypes = [fieldTypes];
      }
      for (const fieldType of fieldTypes) {
        if (fieldType === null) {
          walker.nullable = true;
        } else if (typeof fieldType === "string") {
          walker.type = "node";
        } else if (Array.isArray(fieldType)) {
          walker.type = "list";
        }
      }
      if (walker.type) {
        walkers.push(walker);
      }
    }
    if (walkers.length) {
      return {
        context: nodeType.walkContext,
        fields: walkers
      };
    }
    return null;
  }
  function getTypesFromConfig(config) {
    const types = {};
    for (const name50 in config.node) {
      if (hasOwnProperty2.call(config.node, name50)) {
        const nodeType = config.node[name50];
        if (!nodeType.structure) {
          throw new Error("Missed `structure` field in `" + name50 + "` node type definition");
        }
        types[name50] = getWalkersFromStructure(name50, nodeType);
      }
    }
    return types;
  }
  function createTypeIterator(config, reverse) {
    const fields = config.fields.slice();
    const contextName = config.context;
    const useContext = typeof contextName === "string";
    if (reverse) {
      fields.reverse();
    }
    return function(node, context, walk3, walkReducer) {
      let prevContextValue;
      if (useContext) {
        prevContextValue = context[contextName];
        context[contextName] = node;
      }
      for (const field of fields) {
        const ref = node[field.name];
        if (!field.nullable || ref) {
          if (field.type === "list") {
            const breakWalk = reverse ? ref.reduceRight(walkReducer, false) : ref.reduce(walkReducer, false);
            if (breakWalk) {
              return true;
            }
          } else if (walk3(ref)) {
            return true;
          }
        }
      }
      if (useContext) {
        context[contextName] = prevContextValue;
      }
    };
  }
  function createFastTraveralMap({
    StyleSheet,
    Atrule,
    Rule,
    Block,
    DeclarationList
  }) {
    return {
      Atrule: {
        StyleSheet,
        Atrule,
        Rule,
        Block
      },
      Rule: {
        StyleSheet,
        Atrule,
        Rule,
        Block
      },
      Declaration: {
        StyleSheet,
        Atrule,
        Rule,
        Block,
        DeclarationList
      }
    };
  }
  function createWalker(config) {
    const types = getTypesFromConfig(config);
    const iteratorsNatural = {};
    const iteratorsReverse = {};
    const breakWalk = Symbol("break-walk");
    const skipNode = Symbol("skip-node");
    for (const name50 in types) {
      if (hasOwnProperty2.call(types, name50) && types[name50] !== null) {
        iteratorsNatural[name50] = createTypeIterator(types[name50], false);
        iteratorsReverse[name50] = createTypeIterator(types[name50], true);
      }
    }
    const fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
    const fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);
    const walk3 = function(root, options) {
      function walkNode(node, item, list) {
        const enterRet = enter.call(context, node, item, list);
        if (enterRet === breakWalk) {
          return true;
        }
        if (enterRet === skipNode) {
          return false;
        }
        if (iterators.hasOwnProperty(node.type)) {
          if (iterators[node.type](node, context, walkNode, walkReducer)) {
            return true;
          }
        }
        if (leave.call(context, node, item, list) === breakWalk) {
          return true;
        }
        return false;
      }
      let enter = noop;
      let leave = noop;
      let iterators = iteratorsNatural;
      let walkReducer = (ret, data, item, list) => ret || walkNode(data, item, list);
      const context = {
        break: breakWalk,
        skip: skipNode,
        root,
        stylesheet: null,
        atrule: null,
        atrulePrelude: null,
        rule: null,
        selector: null,
        block: null,
        declaration: null,
        function: null
      };
      if (typeof options === "function") {
        enter = options;
      } else if (options) {
        enter = ensureFunction(options.enter);
        leave = ensureFunction(options.leave);
        if (options.reverse) {
          iterators = iteratorsReverse;
        }
        if (options.visit) {
          if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) {
            iterators = options.reverse ? fastTraversalIteratorsReverse[options.visit] : fastTraversalIteratorsNatural[options.visit];
          } else if (!types.hasOwnProperty(options.visit)) {
            throw new Error("Bad value `" + options.visit + "` for `visit` option (should be: " + Object.keys(types).sort().join(", ") + ")");
          }
          enter = invokeForType(enter, options.visit);
          leave = invokeForType(leave, options.visit);
        }
      }
      if (enter === noop && leave === noop) {
        throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
      }
      walkNode(root);
    };
    walk3.break = breakWalk;
    walk3.skip = skipNode;
    walk3.find = function(ast, fn) {
      let found = null;
      walk3(ast, function(node, item, list) {
        if (fn.call(this, node, item, list)) {
          found = node;
          return breakWalk;
        }
      });
      return found;
    };
    walk3.findLast = function(ast, fn) {
      let found = null;
      walk3(ast, {
        reverse: true,
        enter(node, item, list) {
          if (fn.call(this, node, item, list)) {
            found = node;
            return breakWalk;
          }
        }
      });
      return found;
    };
    walk3.findAll = function(ast, fn) {
      const found = [];
      walk3(ast, function(node, item, list) {
        if (fn.call(this, node, item, list)) {
          found.push(node);
        }
      });
      return found;
    };
    return walk3;
  }

  // node_modules/css-tree/lib/definition-syntax/generate.js
  function noop2(value) {
    return value;
  }
  function generateMultiplier(multiplier) {
    const { min, max, comma } = multiplier;
    if (min === 0 && max === 0) {
      return comma ? "#?" : "*";
    }
    if (min === 0 && max === 1) {
      return "?";
    }
    if (min === 1 && max === 0) {
      return comma ? "#" : "+";
    }
    if (min === 1 && max === 1) {
      return "";
    }
    return (comma ? "#" : "") + (min === max ? "{" + min + "}" : "{" + min + "," + (max !== 0 ? max : "") + "}");
  }
  function generateTypeOpts(node) {
    switch (node.type) {
      case "Range":
        return " [" + (node.min === null ? "-\u221E" : node.min) + "," + (node.max === null ? "\u221E" : node.max) + "]";
      default:
        throw new Error("Unknown node type `" + node.type + "`");
    }
  }
  function generateSequence(node, decorate, forceBraces, compact) {
    const combinator = node.combinator === " " || compact ? node.combinator : " " + node.combinator + " ";
    const result = node.terms.map((term) => internalGenerate(term, decorate, forceBraces, compact)).join(combinator);
    if (node.explicit || forceBraces) {
      return (compact || result[0] === "," ? "[" : "[ ") + result + (compact ? "]" : " ]");
    }
    return result;
  }
  function internalGenerate(node, decorate, forceBraces, compact) {
    let result;
    switch (node.type) {
      case "Group":
        result = generateSequence(node, decorate, forceBraces, compact) + (node.disallowEmpty ? "!" : "");
        break;
      case "Multiplier":
        return internalGenerate(node.term, decorate, forceBraces, compact) + decorate(generateMultiplier(node), node);
      case "Boolean":
        result = "<boolean-expr[" + internalGenerate(node.term, decorate, forceBraces, compact) + "]>";
        break;
      case "Type":
        result = "<" + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : "") + ">";
        break;
      case "Property":
        result = "<'" + node.name + "'>";
        break;
      case "Keyword":
        result = node.name;
        break;
      case "AtKeyword":
        result = "@" + node.name;
        break;
      case "Function":
        result = node.name + "(";
        break;
      case "String":
      case "Token":
        result = node.value;
        break;
      case "Comma":
        result = ",";
        break;
      default:
        throw new Error("Unknown node type `" + node.type + "`");
    }
    return decorate(result, node);
  }
  function generate(node, options) {
    let decorate = noop2;
    let forceBraces = false;
    let compact = false;
    if (typeof options === "function") {
      decorate = options;
    } else if (options) {
      forceBraces = Boolean(options.forceBraces);
      compact = Boolean(options.compact);
      if (typeof options.decorate === "function") {
        decorate = options.decorate;
      }
    }
    return internalGenerate(node, decorate, forceBraces, compact);
  }

  // node_modules/css-tree/lib/lexer/error.js
  var defaultLoc = { offset: 0, line: 1, column: 1 };
  function locateMismatch(matchResult, node) {
    const tokens = matchResult.tokens;
    const longestMatch = matchResult.longestMatch;
    const mismatchNode = longestMatch < tokens.length ? tokens[longestMatch].node || null : null;
    const badNode = mismatchNode !== node ? mismatchNode : null;
    let mismatchOffset = 0;
    let mismatchLength = 0;
    let entries = 0;
    let css = "";
    let start;
    let end;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].value;
      if (i === longestMatch) {
        mismatchLength = token.length;
        mismatchOffset = css.length;
      }
      if (badNode !== null && tokens[i].node === badNode) {
        if (i <= longestMatch) {
          entries++;
        } else {
          entries = 0;
        }
      }
      css += token;
    }
    if (longestMatch === tokens.length || entries > 1) {
      start = fromLoc(badNode || node, "end") || buildLoc(defaultLoc, css);
      end = buildLoc(start);
    } else {
      start = fromLoc(badNode, "start") || buildLoc(fromLoc(node, "start") || defaultLoc, css.slice(0, mismatchOffset));
      end = fromLoc(badNode, "end") || buildLoc(start, css.substr(mismatchOffset, mismatchLength));
    }
    return {
      css,
      mismatchOffset,
      mismatchLength,
      start,
      end
    };
  }
  function fromLoc(node, point) {
    const value = node && node.loc && node.loc[point];
    if (value) {
      return "line" in value ? buildLoc(value) : value;
    }
    return null;
  }
  function buildLoc({ offset, line, column }, extra) {
    const loc = {
      offset,
      line,
      column
    };
    if (extra) {
      const lines = extra.split(/\n|\r\n?|\f/);
      loc.offset += extra.length;
      loc.line += lines.length - 1;
      loc.column = lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1;
    }
    return loc;
  }
  var SyntaxReferenceError = function(type, referenceName) {
    const error = createCustomError(
      "SyntaxReferenceError",
      type + (referenceName ? " `" + referenceName + "`" : "")
    );
    error.reference = referenceName;
    return error;
  };
  var SyntaxMatchError = function(message, syntax, node, matchResult) {
    const error = createCustomError("SyntaxMatchError", message);
    const {
      css,
      mismatchOffset,
      mismatchLength,
      start,
      end
    } = locateMismatch(matchResult, node);
    error.rawMessage = message;
    error.syntax = syntax ? generate(syntax) : "<generic>";
    error.css = css;
    error.mismatchOffset = mismatchOffset;
    error.mismatchLength = mismatchLength;
    error.message = message + "\n  syntax: " + error.syntax + "\n   value: " + (css || "<empty string>") + "\n  --------" + new Array(error.mismatchOffset + 1).join("-") + "^";
    Object.assign(error, start);
    error.loc = {
      source: node && node.loc && node.loc.source || "<unknown>",
      start,
      end
    };
    return error;
  };

  // node_modules/css-tree/lib/utils/names.js
  var keywords = /* @__PURE__ */ new Map();
  var properties = /* @__PURE__ */ new Map();
  var HYPHENMINUS2 = 45;
  var keyword = getKeywordDescriptor;
  var property = getPropertyDescriptor;
  function isCustomProperty(str, offset) {
    offset = offset || 0;
    return str.length - offset >= 2 && str.charCodeAt(offset) === HYPHENMINUS2 && str.charCodeAt(offset + 1) === HYPHENMINUS2;
  }
  function getVendorPrefix(str, offset) {
    offset = offset || 0;
    if (str.length - offset >= 3) {
      if (str.charCodeAt(offset) === HYPHENMINUS2 && str.charCodeAt(offset + 1) !== HYPHENMINUS2) {
        const secondDashIndex = str.indexOf("-", offset + 2);
        if (secondDashIndex !== -1) {
          return str.substring(offset, secondDashIndex + 1);
        }
      }
    }
    return "";
  }
  function getKeywordDescriptor(keyword2) {
    if (keywords.has(keyword2)) {
      return keywords.get(keyword2);
    }
    const name50 = keyword2.toLowerCase();
    let descriptor = keywords.get(name50);
    if (descriptor === void 0) {
      const custom = isCustomProperty(name50, 0);
      const vendor = !custom ? getVendorPrefix(name50, 0) : "";
      descriptor = Object.freeze({
        basename: name50.substr(vendor.length),
        name: name50,
        prefix: vendor,
        vendor,
        custom
      });
    }
    keywords.set(keyword2, descriptor);
    return descriptor;
  }
  function getPropertyDescriptor(property2) {
    if (properties.has(property2)) {
      return properties.get(property2);
    }
    let name50 = property2;
    let hack = property2[0];
    if (hack === "/") {
      hack = property2[1] === "/" ? "//" : "/";
    } else if (hack !== "_" && hack !== "*" && hack !== "$" && hack !== "#" && hack !== "+" && hack !== "&") {
      hack = "";
    }
    const custom = isCustomProperty(name50, hack.length);
    if (!custom) {
      name50 = name50.toLowerCase();
      if (properties.has(name50)) {
        const descriptor2 = properties.get(name50);
        properties.set(property2, descriptor2);
        return descriptor2;
      }
    }
    const vendor = !custom ? getVendorPrefix(name50, hack.length) : "";
    const prefix = name50.substr(0, hack.length + vendor.length);
    const descriptor = Object.freeze({
      basename: name50.substr(prefix.length),
      name: name50.substr(hack.length),
      hack,
      vendor,
      prefix,
      custom
    });
    properties.set(property2, descriptor);
    return descriptor;
  }

  // node_modules/css-tree/lib/lexer/generic-const.js
  var cssWideKeywords = [
    "initial",
    "inherit",
    "unset",
    "revert",
    "revert-layer"
  ];

  // node_modules/css-tree/lib/lexer/generic-an-plus-b.js
  var PLUSSIGN2 = 43;
  var HYPHENMINUS3 = 45;
  var N2 = 110;
  var DISALLOW_SIGN = true;
  var ALLOW_SIGN = false;
  function isDelim(token, code2) {
    return token !== null && token.type === Delim && token.value.charCodeAt(0) === code2;
  }
  function skipSC(token, offset, getNextToken) {
    while (token !== null && (token.type === WhiteSpace || token.type === Comment)) {
      token = getNextToken(++offset);
    }
    return offset;
  }
  function checkInteger(token, valueOffset, disallowSign, offset) {
    if (!token) {
      return 0;
    }
    const code2 = token.value.charCodeAt(valueOffset);
    if (code2 === PLUSSIGN2 || code2 === HYPHENMINUS3) {
      if (disallowSign) {
        return 0;
      }
      valueOffset++;
    }
    for (; valueOffset < token.value.length; valueOffset++) {
      if (!isDigit(token.value.charCodeAt(valueOffset))) {
        return 0;
      }
    }
    return offset + 1;
  }
  function consumeB(token, offset_, getNextToken) {
    let sign = false;
    let offset = skipSC(token, offset_, getNextToken);
    token = getNextToken(offset);
    if (token === null) {
      return offset_;
    }
    if (token.type !== Number2) {
      if (isDelim(token, PLUSSIGN2) || isDelim(token, HYPHENMINUS3)) {
        sign = true;
        offset = skipSC(getNextToken(++offset), offset, getNextToken);
        token = getNextToken(offset);
        if (token === null || token.type !== Number2) {
          return 0;
        }
      } else {
        return offset_;
      }
    }
    if (!sign) {
      const code2 = token.value.charCodeAt(0);
      if (code2 !== PLUSSIGN2 && code2 !== HYPHENMINUS3) {
        return 0;
      }
    }
    return checkInteger(token, sign ? 0 : 1, sign, offset);
  }
  function anPlusB(token, getNextToken) {
    let offset = 0;
    if (!token) {
      return 0;
    }
    if (token.type === Number2) {
      return checkInteger(token, 0, ALLOW_SIGN, offset);
    } else if (token.type === Ident && token.value.charCodeAt(0) === HYPHENMINUS3) {
      if (!cmpChar(token.value, 1, N2)) {
        return 0;
      }
      switch (token.value.length) {
        // -n
        // -n <signed-integer>
        // -n ['+' | '-'] <signless-integer>
        case 2:
          return consumeB(getNextToken(++offset), offset, getNextToken);
        // -n- <signless-integer>
        case 3:
          if (token.value.charCodeAt(2) !== HYPHENMINUS3) {
            return 0;
          }
          offset = skipSC(getNextToken(++offset), offset, getNextToken);
          token = getNextToken(offset);
          return checkInteger(token, 0, DISALLOW_SIGN, offset);
        // <dashndashdigit-ident>
        default:
          if (token.value.charCodeAt(2) !== HYPHENMINUS3) {
            return 0;
          }
          return checkInteger(token, 3, DISALLOW_SIGN, offset);
      }
    } else if (token.type === Ident || isDelim(token, PLUSSIGN2) && getNextToken(offset + 1).type === Ident) {
      if (token.type !== Ident) {
        token = getNextToken(++offset);
      }
      if (token === null || !cmpChar(token.value, 0, N2)) {
        return 0;
      }
      switch (token.value.length) {
        // '+'? n
        // '+'? n <signed-integer>
        // '+'? n ['+' | '-'] <signless-integer>
        case 1:
          return consumeB(getNextToken(++offset), offset, getNextToken);
        // '+'? n- <signless-integer>
        case 2:
          if (token.value.charCodeAt(1) !== HYPHENMINUS3) {
            return 0;
          }
          offset = skipSC(getNextToken(++offset), offset, getNextToken);
          token = getNextToken(offset);
          return checkInteger(token, 0, DISALLOW_SIGN, offset);
        // '+'? <ndashdigit-ident>
        default:
          if (token.value.charCodeAt(1) !== HYPHENMINUS3) {
            return 0;
          }
          return checkInteger(token, 2, DISALLOW_SIGN, offset);
      }
    } else if (token.type === Dimension) {
      let code2 = token.value.charCodeAt(0);
      let sign = code2 === PLUSSIGN2 || code2 === HYPHENMINUS3 ? 1 : 0;
      let i = sign;
      for (; i < token.value.length; i++) {
        if (!isDigit(token.value.charCodeAt(i))) {
          break;
        }
      }
      if (i === sign) {
        return 0;
      }
      if (!cmpChar(token.value, i, N2)) {
        return 0;
      }
      if (i + 1 === token.value.length) {
        return consumeB(getNextToken(++offset), offset, getNextToken);
      } else {
        if (token.value.charCodeAt(i + 1) !== HYPHENMINUS3) {
          return 0;
        }
        if (i + 2 === token.value.length) {
          offset = skipSC(getNextToken(++offset), offset, getNextToken);
          token = getNextToken(offset);
          return checkInteger(token, 0, DISALLOW_SIGN, offset);
        } else {
          return checkInteger(token, i + 2, DISALLOW_SIGN, offset);
        }
      }
    }
    return 0;
  }

  // node_modules/css-tree/lib/lexer/generic-urange.js
  var PLUSSIGN3 = 43;
  var HYPHENMINUS4 = 45;
  var QUESTIONMARK = 63;
  var U = 117;
  function isDelim2(token, code2) {
    return token !== null && token.type === Delim && token.value.charCodeAt(0) === code2;
  }
  function startsWith(token, code2) {
    return token.value.charCodeAt(0) === code2;
  }
  function hexSequence(token, offset, allowDash) {
    let hexlen = 0;
    for (let pos = offset; pos < token.value.length; pos++) {
      const code2 = token.value.charCodeAt(pos);
      if (code2 === HYPHENMINUS4 && allowDash && hexlen !== 0) {
        hexSequence(token, offset + hexlen + 1, false);
        return 6;
      }
      if (!isHexDigit(code2)) {
        return 0;
      }
      if (++hexlen > 6) {
        return 0;
      }
      ;
    }
    return hexlen;
  }
  function withQuestionMarkSequence(consumed, length2, getNextToken) {
    if (!consumed) {
      return 0;
    }
    while (isDelim2(getNextToken(length2), QUESTIONMARK)) {
      if (++consumed > 6) {
        return 0;
      }
      length2++;
    }
    return length2;
  }
  function urange(token, getNextToken) {
    let length2 = 0;
    if (token === null || token.type !== Ident || !cmpChar(token.value, 0, U)) {
      return 0;
    }
    token = getNextToken(++length2);
    if (token === null) {
      return 0;
    }
    if (isDelim2(token, PLUSSIGN3)) {
      token = getNextToken(++length2);
      if (token === null) {
        return 0;
      }
      if (token.type === Ident) {
        return withQuestionMarkSequence(hexSequence(token, 0, true), ++length2, getNextToken);
      }
      if (isDelim2(token, QUESTIONMARK)) {
        return withQuestionMarkSequence(1, ++length2, getNextToken);
      }
      return 0;
    }
    if (token.type === Number2) {
      const consumedHexLength = hexSequence(token, 1, true);
      if (consumedHexLength === 0) {
        return 0;
      }
      token = getNextToken(++length2);
      if (token === null) {
        return length2;
      }
      if (token.type === Dimension || token.type === Number2) {
        if (!startsWith(token, HYPHENMINUS4) || !hexSequence(token, 1, false)) {
          return 0;
        }
        return length2 + 1;
      }
      return withQuestionMarkSequence(consumedHexLength, length2, getNextToken);
    }
    if (token.type === Dimension) {
      return withQuestionMarkSequence(hexSequence(token, 1, true), ++length2, getNextToken);
    }
    return 0;
  }

  // node_modules/css-tree/lib/lexer/generic.js
  var calcFunctionNames = ["calc(", "-moz-calc(", "-webkit-calc("];
  var balancePair2 = /* @__PURE__ */ new Map([
    [Function, RightParenthesis],
    [LeftParenthesis, RightParenthesis],
    [LeftSquareBracket, RightSquareBracket],
    [LeftCurlyBracket, RightCurlyBracket]
  ]);
  function charCodeAt(str, index) {
    return index < str.length ? str.charCodeAt(index) : 0;
  }
  function eqStr(actual, expected) {
    return cmpStr(actual, 0, actual.length, expected);
  }
  function eqStrAny(actual, expected) {
    for (let i = 0; i < expected.length; i++) {
      if (eqStr(actual, expected[i])) {
        return true;
      }
    }
    return false;
  }
  function isPostfixIeHack(str, offset) {
    if (offset !== str.length - 2) {
      return false;
    }
    return charCodeAt(str, offset) === 92 && // U+005C REVERSE SOLIDUS (\)
    isDigit(charCodeAt(str, offset + 1));
  }
  function outOfRange(opts, value, numEnd) {
    if (opts && opts.type === "Range") {
      const num = Number(
        numEnd !== void 0 && numEnd !== value.length ? value.substr(0, numEnd) : value
      );
      if (isNaN(num)) {
        return true;
      }
      if (opts.min !== null && num < opts.min && typeof opts.min !== "string") {
        return true;
      }
      if (opts.max !== null && num > opts.max && typeof opts.max !== "string") {
        return true;
      }
    }
    return false;
  }
  function consumeFunction(token, getNextToken) {
    let balanceCloseType = 0;
    let balanceStash = [];
    let length2 = 0;
    scan:
      do {
        switch (token.type) {
          case RightCurlyBracket:
          case RightParenthesis:
          case RightSquareBracket:
            if (token.type !== balanceCloseType) {
              break scan;
            }
            balanceCloseType = balanceStash.pop();
            if (balanceStash.length === 0) {
              length2++;
              break scan;
            }
            break;
          case Function:
          case LeftParenthesis:
          case LeftSquareBracket:
          case LeftCurlyBracket:
            balanceStash.push(balanceCloseType);
            balanceCloseType = balancePair2.get(token.type);
            break;
        }
        length2++;
      } while (token = getNextToken(length2));
    return length2;
  }
  function calc(next) {
    return function(token, getNextToken, opts) {
      if (token === null) {
        return 0;
      }
      if (token.type === Function && eqStrAny(token.value, calcFunctionNames)) {
        return consumeFunction(token, getNextToken);
      }
      return next(token, getNextToken, opts);
    };
  }
  function tokenType(expectedTokenType) {
    return function(token) {
      if (token === null || token.type !== expectedTokenType) {
        return 0;
      }
      return 1;
    };
  }
  function customIdent(token) {
    if (token === null || token.type !== Ident) {
      return 0;
    }
    const name50 = token.value.toLowerCase();
    if (eqStrAny(name50, cssWideKeywords)) {
      return 0;
    }
    if (eqStr(name50, "default")) {
      return 0;
    }
    return 1;
  }
  function dashedIdent(token) {
    if (token === null || token.type !== Ident) {
      return 0;
    }
    if (charCodeAt(token.value, 0) !== 45 || charCodeAt(token.value, 1) !== 45) {
      return 0;
    }
    return 1;
  }
  function customPropertyName(token) {
    if (!dashedIdent(token)) {
      return 0;
    }
    if (token.value === "--") {
      return 0;
    }
    return 1;
  }
  function hexColor(token) {
    if (token === null || token.type !== Hash) {
      return 0;
    }
    const length2 = token.value.length;
    if (length2 !== 4 && length2 !== 5 && length2 !== 7 && length2 !== 9) {
      return 0;
    }
    for (let i = 1; i < length2; i++) {
      if (!isHexDigit(charCodeAt(token.value, i))) {
        return 0;
      }
    }
    return 1;
  }
  function idSelector(token) {
    if (token === null || token.type !== Hash) {
      return 0;
    }
    if (!isIdentifierStart(charCodeAt(token.value, 1), charCodeAt(token.value, 2), charCodeAt(token.value, 3))) {
      return 0;
    }
    return 1;
  }
  function declarationValue(token, getNextToken) {
    if (!token) {
      return 0;
    }
    let balanceCloseType = 0;
    let balanceStash = [];
    let length2 = 0;
    scan:
      do {
        switch (token.type) {
          // ... <bad-string-token>, <bad-url-token>,
          case BadString:
          case BadUrl:
            break scan;
          // ... unmatched <)-token>, <]-token>, or <}-token>,
          case RightCurlyBracket:
          case RightParenthesis:
          case RightSquareBracket:
            if (token.type !== balanceCloseType) {
              break scan;
            }
            balanceCloseType = balanceStash.pop();
            break;
          // ... or top-level <semicolon-token> tokens
          case Semicolon:
            if (balanceCloseType === 0) {
              break scan;
            }
            break;
          // ... or <delim-token> tokens with a value of "!"
          case Delim:
            if (balanceCloseType === 0 && token.value === "!") {
              break scan;
            }
            break;
          case Function:
          case LeftParenthesis:
          case LeftSquareBracket:
          case LeftCurlyBracket:
            balanceStash.push(balanceCloseType);
            balanceCloseType = balancePair2.get(token.type);
            break;
        }
        length2++;
      } while (token = getNextToken(length2));
    return length2;
  }
  function anyValue(token, getNextToken) {
    if (!token) {
      return 0;
    }
    let balanceCloseType = 0;
    let balanceStash = [];
    let length2 = 0;
    scan:
      do {
        switch (token.type) {
          // ... does not contain <bad-string-token>, <bad-url-token>,
          case BadString:
          case BadUrl:
            break scan;
          // ... unmatched <)-token>, <]-token>, or <}-token>,
          case RightCurlyBracket:
          case RightParenthesis:
          case RightSquareBracket:
            if (token.type !== balanceCloseType) {
              break scan;
            }
            balanceCloseType = balanceStash.pop();
            break;
          case Function:
          case LeftParenthesis:
          case LeftSquareBracket:
          case LeftCurlyBracket:
            balanceStash.push(balanceCloseType);
            balanceCloseType = balancePair2.get(token.type);
            break;
        }
        length2++;
      } while (token = getNextToken(length2));
    return length2;
  }
  function dimension(type) {
    if (type) {
      type = new Set(type);
    }
    return function(token, getNextToken, opts) {
      if (token === null || token.type !== Dimension) {
        return 0;
      }
      const numberEnd = consumeNumber(token.value, 0);
      if (type !== null) {
        const reverseSolidusOffset = token.value.indexOf("\\", numberEnd);
        const unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset) ? token.value.substr(numberEnd) : token.value.substring(numberEnd, reverseSolidusOffset);
        if (type.has(unit.toLowerCase()) === false) {
          return 0;
        }
      }
      if (outOfRange(opts, token.value, numberEnd)) {
        return 0;
      }
      return 1;
    };
  }
  function percentage(token, getNextToken, opts) {
    if (token === null || token.type !== Percentage) {
      return 0;
    }
    if (outOfRange(opts, token.value, token.value.length - 1)) {
      return 0;
    }
    return 1;
  }
  function zero(next) {
    if (typeof next !== "function") {
      next = function() {
        return 0;
      };
    }
    return function(token, getNextToken, opts) {
      if (token !== null && token.type === Number2) {
        if (Number(token.value) === 0) {
          return 1;
        }
      }
      return next(token, getNextToken, opts);
    };
  }
  function number(token, getNextToken, opts) {
    if (token === null) {
      return 0;
    }
    const numberEnd = consumeNumber(token.value, 0);
    const isNumber = numberEnd === token.value.length;
    if (!isNumber && !isPostfixIeHack(token.value, numberEnd)) {
      return 0;
    }
    if (outOfRange(opts, token.value, numberEnd)) {
      return 0;
    }
    return 1;
  }
  function integer(token, getNextToken, opts) {
    if (token === null || token.type !== Number2) {
      return 0;
    }
    let i = charCodeAt(token.value, 0) === 43 || // U+002B PLUS SIGN (+)
    charCodeAt(token.value, 0) === 45 ? 1 : 0;
    for (; i < token.value.length; i++) {
      if (!isDigit(charCodeAt(token.value, i))) {
        return 0;
      }
    }
    if (outOfRange(opts, token.value, i)) {
      return 0;
    }
    return 1;
  }
  var tokenTypes = {
    "ident-token": tokenType(Ident),
    "function-token": tokenType(Function),
    "at-keyword-token": tokenType(AtKeyword),
    "hash-token": tokenType(Hash),
    "string-token": tokenType(String2),
    "bad-string-token": tokenType(BadString),
    "url-token": tokenType(Url),
    "bad-url-token": tokenType(BadUrl),
    "delim-token": tokenType(Delim),
    "number-token": tokenType(Number2),
    "percentage-token": tokenType(Percentage),
    "dimension-token": tokenType(Dimension),
    "whitespace-token": tokenType(WhiteSpace),
    "CDO-token": tokenType(CDO),
    "CDC-token": tokenType(CDC),
    "colon-token": tokenType(Colon),
    "semicolon-token": tokenType(Semicolon),
    "comma-token": tokenType(Comma),
    "[-token": tokenType(LeftSquareBracket),
    "]-token": tokenType(RightSquareBracket),
    "(-token": tokenType(LeftParenthesis),
    ")-token": tokenType(RightParenthesis),
    "{-token": tokenType(LeftCurlyBracket),
    "}-token": tokenType(RightCurlyBracket)
  };
  var productionTypes = {
    // token type aliases
    "string": tokenType(String2),
    "ident": tokenType(Ident),
    // percentage
    "percentage": calc(percentage),
    // numeric
    "zero": zero(),
    "number": calc(number),
    "integer": calc(integer),
    // complex types
    "custom-ident": customIdent,
    "dashed-ident": dashedIdent,
    "custom-property-name": customPropertyName,
    "hex-color": hexColor,
    "id-selector": idSelector,
    // element( <id-selector> )
    "an-plus-b": anPlusB,
    "urange": urange,
    "declaration-value": declarationValue,
    "any-value": anyValue
  };
  function createDemensionTypes(units) {
    const {
      angle: angle2,
      decibel: decibel2,
      frequency: frequency2,
      flex: flex2,
      length: length2,
      resolution: resolution2,
      semitones: semitones2,
      time: time2
    } = units || {};
    return {
      "dimension": calc(dimension(null)),
      "angle": calc(dimension(angle2)),
      "decibel": calc(dimension(decibel2)),
      "frequency": calc(dimension(frequency2)),
      "flex": calc(dimension(flex2)),
      "length": calc(zero(dimension(length2))),
      "resolution": calc(dimension(resolution2)),
      "semitones": calc(dimension(semitones2)),
      "time": calc(dimension(time2))
    };
  }
  function createGenericTypes(units) {
    return {
      ...tokenTypes,
      ...productionTypes,
      ...createDemensionTypes(units)
    };
  }

  // node_modules/css-tree/lib/lexer/units.js
  var units_exports = {};
  __export(units_exports, {
    angle: () => angle,
    decibel: () => decibel,
    flex: () => flex,
    frequency: () => frequency,
    length: () => length,
    resolution: () => resolution,
    semitones: () => semitones,
    time: () => time
  });
  var length = [
    // absolute length units https://www.w3.org/TR/css-values-3/#lengths
    "cm",
    "mm",
    "q",
    "in",
    "pt",
    "pc",
    "px",
    // font-relative length units https://drafts.csswg.org/css-values-4/#font-relative-lengths
    "em",
    "rem",
    "ex",
    "rex",
    "cap",
    "rcap",
    "ch",
    "rch",
    "ic",
    "ric",
    "lh",
    "rlh",
    // viewport-percentage lengths https://drafts.csswg.org/css-values-4/#viewport-relative-lengths
    "vw",
    "svw",
    "lvw",
    "dvw",
    "vh",
    "svh",
    "lvh",
    "dvh",
    "vi",
    "svi",
    "lvi",
    "dvi",
    "vb",
    "svb",
    "lvb",
    "dvb",
    "vmin",
    "svmin",
    "lvmin",
    "dvmin",
    "vmax",
    "svmax",
    "lvmax",
    "dvmax",
    // container relative lengths https://drafts.csswg.org/css-contain-3/#container-lengths
    "cqw",
    "cqh",
    "cqi",
    "cqb",
    "cqmin",
    "cqmax"
  ];
  var angle = ["deg", "grad", "rad", "turn"];
  var time = ["s", "ms"];
  var frequency = ["hz", "khz"];
  var resolution = ["dpi", "dpcm", "dppx", "x"];
  var flex = ["fr"];
  var decibel = ["db"];
  var semitones = ["st"];

  // node_modules/css-tree/lib/definition-syntax/SyntaxError.js
  function SyntaxError3(message, input, offset) {
    return Object.assign(createCustomError("SyntaxError", message), {
      input,
      offset,
      rawMessage: message,
      message: message + "\n  " + input + "\n--" + new Array((offset || input.length) + 1).join("-") + "^"
    });
  }

  // node_modules/css-tree/lib/definition-syntax/scanner.js
  var TAB = 9;
  var N3 = 10;
  var F2 = 12;
  var R2 = 13;
  var SPACE = 32;
  var NAME_CHAR = new Uint8Array(128).map(
    (_, idx) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0
  );
  var Scanner = class {
    constructor(str) {
      this.str = str;
      this.pos = 0;
    }
    charCodeAt(pos) {
      return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
    }
    charCode() {
      return this.charCodeAt(this.pos);
    }
    isNameCharCode(code2 = this.charCode()) {
      return code2 < 128 && NAME_CHAR[code2] === 1;
    }
    nextCharCode() {
      return this.charCodeAt(this.pos + 1);
    }
    nextNonWsCode(pos) {
      return this.charCodeAt(this.findWsEnd(pos));
    }
    skipWs() {
      this.pos = this.findWsEnd(this.pos);
    }
    findWsEnd(pos) {
      for (; pos < this.str.length; pos++) {
        const code2 = this.str.charCodeAt(pos);
        if (code2 !== R2 && code2 !== N3 && code2 !== F2 && code2 !== SPACE && code2 !== TAB) {
          break;
        }
      }
      return pos;
    }
    substringToPos(end) {
      return this.str.substring(this.pos, this.pos = end);
    }
    eat(code2) {
      if (this.charCode() !== code2) {
        this.error("Expect `" + String.fromCharCode(code2) + "`");
      }
      this.pos++;
    }
    peek() {
      return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
    }
    error(message) {
      throw new SyntaxError3(message, this.str, this.pos);
    }
    scanSpaces() {
      return this.substringToPos(this.findWsEnd(this.pos));
    }
    scanWord() {
      let end = this.pos;
      for (; end < this.str.length; end++) {
        const code2 = this.str.charCodeAt(end);
        if (code2 >= 128 || NAME_CHAR[code2] === 0) {
          break;
        }
      }
      if (this.pos === end) {
        this.error("Expect a keyword");
      }
      return this.substringToPos(end);
    }
    scanNumber() {
      let end = this.pos;
      for (; end < this.str.length; end++) {
        const code2 = this.str.charCodeAt(end);
        if (code2 < 48 || code2 > 57) {
          break;
        }
      }
      if (this.pos === end) {
        this.error("Expect a number");
      }
      return this.substringToPos(end);
    }
    scanString() {
      const end = this.str.indexOf("'", this.pos + 1);
      if (end === -1) {
        this.pos = this.str.length;
        this.error("Expect an apostrophe");
      }
      return this.substringToPos(end + 1);
    }
  };

  // node_modules/css-tree/lib/definition-syntax/parse.js
  var TAB2 = 9;
  var N4 = 10;
  var F3 = 12;
  var R3 = 13;
  var SPACE2 = 32;
  var EXCLAMATIONMARK2 = 33;
  var NUMBERSIGN2 = 35;
  var AMPERSAND = 38;
  var APOSTROPHE = 39;
  var LEFTPARENTHESIS = 40;
  var RIGHTPARENTHESIS = 41;
  var ASTERISK = 42;
  var PLUSSIGN4 = 43;
  var COMMA = 44;
  var HYPERMINUS = 45;
  var LESSTHANSIGN = 60;
  var GREATERTHANSIGN = 62;
  var QUESTIONMARK2 = 63;
  var COMMERCIALAT = 64;
  var LEFTSQUAREBRACKET = 91;
  var RIGHTSQUAREBRACKET = 93;
  var LEFTCURLYBRACKET2 = 123;
  var VERTICALLINE = 124;
  var RIGHTCURLYBRACKET = 125;
  var INFINITY = 8734;
  var COMBINATOR_PRECEDENCE = {
    " ": 1,
    "&&": 2,
    "||": 3,
    "|": 4
  };
  function readMultiplierRange(scanner) {
    let min = null;
    let max = null;
    scanner.eat(LEFTCURLYBRACKET2);
    scanner.skipWs();
    min = scanner.scanNumber(scanner);
    scanner.skipWs();
    if (scanner.charCode() === COMMA) {
      scanner.pos++;
      scanner.skipWs();
      if (scanner.charCode() !== RIGHTCURLYBRACKET) {
        max = scanner.scanNumber(scanner);
        scanner.skipWs();
      }
    } else {
      max = min;
    }
    scanner.eat(RIGHTCURLYBRACKET);
    return {
      min: Number(min),
      max: max ? Number(max) : 0
    };
  }
  function readMultiplier(scanner) {
    let range = null;
    let comma = false;
    switch (scanner.charCode()) {
      case ASTERISK:
        scanner.pos++;
        range = {
          min: 0,
          max: 0
        };
        break;
      case PLUSSIGN4:
        scanner.pos++;
        range = {
          min: 1,
          max: 0
        };
        break;
      case QUESTIONMARK2:
        scanner.pos++;
        range = {
          min: 0,
          max: 1
        };
        break;
      case NUMBERSIGN2:
        scanner.pos++;
        comma = true;
        if (scanner.charCode() === LEFTCURLYBRACKET2) {
          range = readMultiplierRange(scanner);
        } else if (scanner.charCode() === QUESTIONMARK2) {
          scanner.pos++;
          range = {
            min: 0,
            max: 0
          };
        } else {
          range = {
            min: 1,
            max: 0
          };
        }
        break;
      case LEFTCURLYBRACKET2:
        range = readMultiplierRange(scanner);
        break;
      default:
        return null;
    }
    return {
      type: "Multiplier",
      comma,
      min: range.min,
      max: range.max,
      term: null
    };
  }
  function maybeMultiplied(scanner, node) {
    const multiplier = readMultiplier(scanner);
    if (multiplier !== null) {
      multiplier.term = node;
      if (scanner.charCode() === NUMBERSIGN2 && scanner.charCodeAt(scanner.pos - 1) === PLUSSIGN4) {
        return maybeMultiplied(scanner, multiplier);
      }
      return multiplier;
    }
    return node;
  }
  function maybeToken(scanner) {
    const ch = scanner.peek();
    if (ch === "") {
      return null;
    }
    return maybeMultiplied(scanner, {
      type: "Token",
      value: ch
    });
  }
  function readProperty(scanner) {
    let name50;
    scanner.eat(LESSTHANSIGN);
    scanner.eat(APOSTROPHE);
    name50 = scanner.scanWord();
    scanner.eat(APOSTROPHE);
    scanner.eat(GREATERTHANSIGN);
    return maybeMultiplied(scanner, {
      type: "Property",
      name: name50
    });
  }
  function readTypeRange(scanner) {
    let min = null;
    let max = null;
    let sign = 1;
    scanner.eat(LEFTSQUAREBRACKET);
    if (scanner.charCode() === HYPERMINUS) {
      scanner.peek();
      sign = -1;
    }
    if (sign == -1 && scanner.charCode() === INFINITY) {
      scanner.peek();
    } else {
      min = sign * Number(scanner.scanNumber(scanner));
      if (scanner.isNameCharCode()) {
        min += scanner.scanWord();
      }
    }
    scanner.skipWs();
    scanner.eat(COMMA);
    scanner.skipWs();
    if (scanner.charCode() === INFINITY) {
      scanner.peek();
    } else {
      sign = 1;
      if (scanner.charCode() === HYPERMINUS) {
        scanner.peek();
        sign = -1;
      }
      max = sign * Number(scanner.scanNumber(scanner));
      if (scanner.isNameCharCode()) {
        max += scanner.scanWord();
      }
    }
    scanner.eat(RIGHTSQUAREBRACKET);
    return {
      type: "Range",
      min,
      max
    };
  }
  function readType(scanner) {
    let name50;
    let opts = null;
    scanner.eat(LESSTHANSIGN);
    name50 = scanner.scanWord();
    if (name50 === "boolean-expr") {
      scanner.eat(LEFTSQUAREBRACKET);
      const implicitGroup = readImplicitGroup(scanner, RIGHTSQUAREBRACKET);
      scanner.eat(RIGHTSQUAREBRACKET);
      scanner.eat(GREATERTHANSIGN);
      return maybeMultiplied(scanner, {
        type: "Boolean",
        term: implicitGroup.terms.length === 1 ? implicitGroup.terms[0] : implicitGroup
      });
    }
    if (scanner.charCode() === LEFTPARENTHESIS && scanner.nextCharCode() === RIGHTPARENTHESIS) {
      scanner.pos += 2;
      name50 += "()";
    }
    if (scanner.charCodeAt(scanner.findWsEnd(scanner.pos)) === LEFTSQUAREBRACKET) {
      scanner.skipWs();
      opts = readTypeRange(scanner);
    }
    scanner.eat(GREATERTHANSIGN);
    return maybeMultiplied(scanner, {
      type: "Type",
      name: name50,
      opts
    });
  }
  function readKeywordOrFunction(scanner) {
    const name50 = scanner.scanWord();
    if (scanner.charCode() === LEFTPARENTHESIS) {
      scanner.pos++;
      return {
        type: "Function",
        name: name50
      };
    }
    return maybeMultiplied(scanner, {
      type: "Keyword",
      name: name50
    });
  }
  function regroupTerms(terms, combinators) {
    function createGroup(terms2, combinator2) {
      return {
        type: "Group",
        terms: terms2,
        combinator: combinator2,
        disallowEmpty: false,
        explicit: false
      };
    }
    let combinator;
    combinators = Object.keys(combinators).sort((a3, b) => COMBINATOR_PRECEDENCE[a3] - COMBINATOR_PRECEDENCE[b]);
    while (combinators.length > 0) {
      combinator = combinators.shift();
      let i = 0;
      let subgroupStart = 0;
      for (; i < terms.length; i++) {
        const term = terms[i];
        if (term.type === "Combinator") {
          if (term.value === combinator) {
            if (subgroupStart === -1) {
              subgroupStart = i - 1;
            }
            terms.splice(i, 1);
            i--;
          } else {
            if (subgroupStart !== -1 && i - subgroupStart > 1) {
              terms.splice(
                subgroupStart,
                i - subgroupStart,
                createGroup(terms.slice(subgroupStart, i), combinator)
              );
              i = subgroupStart + 1;
            }
            subgroupStart = -1;
          }
        }
      }
      if (subgroupStart !== -1 && combinators.length) {
        terms.splice(
          subgroupStart,
          i - subgroupStart,
          createGroup(terms.slice(subgroupStart, i), combinator)
        );
      }
    }
    return combinator;
  }
  function readImplicitGroup(scanner, stopCharCode) {
    const combinators = /* @__PURE__ */ Object.create(null);
    const terms = [];
    let token;
    let prevToken = null;
    let prevTokenPos = scanner.pos;
    while (scanner.charCode() !== stopCharCode && (token = peek(scanner, stopCharCode))) {
      if (token.type !== "Spaces") {
        if (token.type === "Combinator") {
          if (prevToken === null || prevToken.type === "Combinator") {
            scanner.pos = prevTokenPos;
            scanner.error("Unexpected combinator");
          }
          combinators[token.value] = true;
        } else if (prevToken !== null && prevToken.type !== "Combinator") {
          combinators[" "] = true;
          terms.push({
            type: "Combinator",
            value: " "
          });
        }
        terms.push(token);
        prevToken = token;
        prevTokenPos = scanner.pos;
      }
    }
    if (prevToken !== null && prevToken.type === "Combinator") {
      scanner.pos -= prevTokenPos;
      scanner.error("Unexpected combinator");
    }
    return {
      type: "Group",
      terms,
      combinator: regroupTerms(terms, combinators) || " ",
      disallowEmpty: false,
      explicit: false
    };
  }
  function readGroup(scanner, stopCharCode) {
    let result;
    scanner.eat(LEFTSQUAREBRACKET);
    result = readImplicitGroup(scanner, stopCharCode);
    scanner.eat(RIGHTSQUAREBRACKET);
    result.explicit = true;
    if (scanner.charCode() === EXCLAMATIONMARK2) {
      scanner.pos++;
      result.disallowEmpty = true;
    }
    return result;
  }
  function peek(scanner, stopCharCode) {
    let code2 = scanner.charCode();
    switch (code2) {
      case RIGHTSQUAREBRACKET:
        break;
      case LEFTSQUAREBRACKET:
        return maybeMultiplied(scanner, readGroup(scanner, stopCharCode));
      case LESSTHANSIGN:
        return scanner.nextCharCode() === APOSTROPHE ? readProperty(scanner) : readType(scanner);
      case VERTICALLINE:
        return {
          type: "Combinator",
          value: scanner.substringToPos(
            scanner.pos + (scanner.nextCharCode() === VERTICALLINE ? 2 : 1)
          )
        };
      case AMPERSAND:
        scanner.pos++;
        scanner.eat(AMPERSAND);
        return {
          type: "Combinator",
          value: "&&"
        };
      case COMMA:
        scanner.pos++;
        return {
          type: "Comma"
        };
      case APOSTROPHE:
        return maybeMultiplied(scanner, {
          type: "String",
          value: scanner.scanString()
        });
      case SPACE2:
      case TAB2:
      case N4:
      case R3:
      case F3:
        return {
          type: "Spaces",
          value: scanner.scanSpaces()
        };
      case COMMERCIALAT:
        code2 = scanner.nextCharCode();
        if (scanner.isNameCharCode(code2)) {
          scanner.pos++;
          return {
            type: "AtKeyword",
            name: scanner.scanWord()
          };
        }
        return maybeToken(scanner);
      case ASTERISK:
      case PLUSSIGN4:
      case QUESTIONMARK2:
      case NUMBERSIGN2:
      case EXCLAMATIONMARK2:
        break;
      case LEFTCURLYBRACKET2:
        code2 = scanner.nextCharCode();
        if (code2 < 48 || code2 > 57) {
          return maybeToken(scanner);
        }
        break;
      default:
        if (scanner.isNameCharCode(code2)) {
          return readKeywordOrFunction(scanner);
        }
        return maybeToken(scanner);
    }
  }
  function parse(source) {
    const scanner = new Scanner(source);
    const result = readImplicitGroup(scanner);
    if (scanner.pos !== source.length) {
      scanner.error("Unexpected input");
    }
    if (result.terms.length === 1 && result.terms[0].type === "Group") {
      return result.terms[0];
    }
    return result;
  }

  // node_modules/css-tree/lib/definition-syntax/walk.js
  var noop3 = function() {
  };
  function ensureFunction2(value) {
    return typeof value === "function" ? value : noop3;
  }
  function walk(node, options, context) {
    function walk3(node2) {
      enter.call(context, node2);
      switch (node2.type) {
        case "Group":
          node2.terms.forEach(walk3);
          break;
        case "Multiplier":
        case "Boolean":
          walk3(node2.term);
          break;
        case "Type":
        case "Property":
        case "Keyword":
        case "AtKeyword":
        case "Function":
        case "String":
        case "Token":
        case "Comma":
          break;
        default:
          throw new Error("Unknown type: " + node2.type);
      }
      leave.call(context, node2);
    }
    let enter = noop3;
    let leave = noop3;
    if (typeof options === "function") {
      enter = options;
    } else if (options) {
      enter = ensureFunction2(options.enter);
      leave = ensureFunction2(options.leave);
    }
    if (enter === noop3 && leave === noop3) {
      throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
    }
    walk3(node, context);
  }

  // node_modules/css-tree/lib/lexer/prepare-tokens.js
  var astToTokens = {
    decorator(handlers) {
      const tokens = [];
      let curNode = null;
      return {
        ...handlers,
        node(node) {
          const tmp = curNode;
          curNode = node;
          handlers.node.call(this, node);
          curNode = tmp;
        },
        emit(value, type, auto) {
          tokens.push({
            type,
            value,
            node: auto ? null : curNode
          });
        },
        result() {
          return tokens;
        }
      };
    }
  };
  function stringToTokens(str) {
    const tokens = [];
    tokenize(
      str,
      (type, start, end) => tokens.push({
        type,
        value: str.slice(start, end),
        node: null
      })
    );
    return tokens;
  }
  function prepare_tokens_default(value, syntax) {
    if (typeof value === "string") {
      return stringToTokens(value);
    }
    return syntax.generate(value, astToTokens);
  }

  // node_modules/css-tree/lib/lexer/match-graph.js
  var MATCH = { type: "Match" };
  var MISMATCH = { type: "Mismatch" };
  var DISALLOW_EMPTY = { type: "DisallowEmpty" };
  var LEFTPARENTHESIS2 = 40;
  var RIGHTPARENTHESIS2 = 41;
  function createCondition(match, thenBranch, elseBranch) {
    if (thenBranch === MATCH && elseBranch === MISMATCH) {
      return match;
    }
    if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) {
      return match;
    }
    if (match.type === "If" && match.else === MISMATCH && thenBranch === MATCH) {
      thenBranch = match.then;
      match = match.match;
    }
    return {
      type: "If",
      match,
      then: thenBranch,
      else: elseBranch
    };
  }
  function isFunctionType(name50) {
    return name50.length > 2 && name50.charCodeAt(name50.length - 2) === LEFTPARENTHESIS2 && name50.charCodeAt(name50.length - 1) === RIGHTPARENTHESIS2;
  }
  function isEnumCapatible(term) {
    return term.type === "Keyword" || term.type === "AtKeyword" || term.type === "Function" || term.type === "Type" && isFunctionType(term.name);
  }
  function groupNode(terms, combinator = " ", explicit = false) {
    return {
      type: "Group",
      terms,
      combinator,
      disallowEmpty: false,
      explicit
    };
  }
  function replaceTypeInGraph(node, replacements, visited = /* @__PURE__ */ new Set()) {
    if (!visited.has(node)) {
      visited.add(node);
      switch (node.type) {
        case "If":
          node.match = replaceTypeInGraph(node.match, replacements, visited);
          node.then = replaceTypeInGraph(node.then, replacements, visited);
          node.else = replaceTypeInGraph(node.else, replacements, visited);
          break;
        case "Type":
          return replacements[node.name] || node;
      }
    }
    return node;
  }
  function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
    switch (combinator) {
      case " ": {
        let result = MATCH;
        for (let i = terms.length - 1; i >= 0; i--) {
          const term = terms[i];
          result = createCondition(
            term,
            result,
            MISMATCH
          );
        }
        ;
        return result;
      }
      case "|": {
        let result = MISMATCH;
        let map = null;
        for (let i = terms.length - 1; i >= 0; i--) {
          let term = terms[i];
          if (isEnumCapatible(term)) {
            if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
              map = /* @__PURE__ */ Object.create(null);
              result = createCondition(
                {
                  type: "Enum",
                  map
                },
                MATCH,
                result
              );
            }
            if (map !== null) {
              const key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
              if (key in map === false) {
                map[key] = term;
                continue;
              }
            }
          }
          map = null;
          result = createCondition(
            term,
            MATCH,
            result
          );
        }
        ;
        return result;
      }
      case "&&": {
        if (terms.length > 5) {
          return {
            type: "MatchOnce",
            terms,
            all: true
          };
        }
        let result = MISMATCH;
        for (let i = terms.length - 1; i >= 0; i--) {
          const term = terms[i];
          let thenClause;
          if (terms.length > 1) {
            thenClause = buildGroupMatchGraph(
              combinator,
              terms.filter(function(newGroupTerm) {
                return newGroupTerm !== term;
              }),
              false
            );
          } else {
            thenClause = MATCH;
          }
          result = createCondition(
            term,
            thenClause,
            result
          );
        }
        ;
        return result;
      }
      case "||": {
        if (terms.length > 5) {
          return {
            type: "MatchOnce",
            terms,
            all: false
          };
        }
        let result = atLeastOneTermMatched ? MATCH : MISMATCH;
        for (let i = terms.length - 1; i >= 0; i--) {
          const term = terms[i];
          let thenClause;
          if (terms.length > 1) {
            thenClause = buildGroupMatchGraph(
              combinator,
              terms.filter(function(newGroupTerm) {
                return newGroupTerm !== term;
              }),
              true
            );
          } else {
            thenClause = MATCH;
          }
          result = createCondition(
            term,
            thenClause,
            result
          );
        }
        ;
        return result;
      }
    }
  }
  function buildMultiplierMatchGraph(node) {
    let result = MATCH;
    let matchTerm = buildMatchGraphInternal(node.term);
    if (node.max === 0) {
      matchTerm = createCondition(
        matchTerm,
        DISALLOW_EMPTY,
        MISMATCH
      );
      result = createCondition(
        matchTerm,
        null,
        // will be a loop
        MISMATCH
      );
      result.then = createCondition(
        MATCH,
        MATCH,
        result
        // make a loop
      );
      if (node.comma) {
        result.then.else = createCondition(
          { type: "Comma", syntax: node },
          result,
          MISMATCH
        );
      }
    } else {
      for (let i = node.min || 1; i <= node.max; i++) {
        if (node.comma && result !== MATCH) {
          result = createCondition(
            { type: "Comma", syntax: node },
            result,
            MISMATCH
          );
        }
        result = createCondition(
          matchTerm,
          createCondition(
            MATCH,
            MATCH,
            result
          ),
          MISMATCH
        );
      }
    }
    if (node.min === 0) {
      result = createCondition(
        MATCH,
        MATCH,
        result
      );
    } else {
      for (let i = 0; i < node.min - 1; i++) {
        if (node.comma && result !== MATCH) {
          result = createCondition(
            { type: "Comma", syntax: node },
            result,
            MISMATCH
          );
        }
        result = createCondition(
          matchTerm,
          result,
          MISMATCH
        );
      }
    }
    return result;
  }
  function buildMatchGraphInternal(node) {
    if (typeof node === "function") {
      return {
        type: "Generic",
        fn: node
      };
    }
    switch (node.type) {
      case "Group": {
        let result = buildGroupMatchGraph(
          node.combinator,
          node.terms.map(buildMatchGraphInternal),
          false
        );
        if (node.disallowEmpty) {
          result = createCondition(
            result,
            DISALLOW_EMPTY,
            MISMATCH
          );
        }
        return result;
      }
      case "Multiplier":
        return buildMultiplierMatchGraph(node);
      // https://drafts.csswg.org/css-values-5/#boolean
      case "Boolean": {
        const term = buildMatchGraphInternal(node.term);
        const matchNode = buildMatchGraphInternal(groupNode([
          groupNode([
            { type: "Keyword", name: "not" },
            { type: "Type", name: "!boolean-group" }
          ]),
          groupNode([
            { type: "Type", name: "!boolean-group" },
            groupNode([
              { type: "Multiplier", comma: false, min: 0, max: 0, term: groupNode([
                { type: "Keyword", name: "and" },
                { type: "Type", name: "!boolean-group" }
              ]) },
              { type: "Multiplier", comma: false, min: 0, max: 0, term: groupNode([
                { type: "Keyword", name: "or" },
                { type: "Type", name: "!boolean-group" }
              ]) }
            ], "|")
          ])
        ], "|"));
        const booleanGroup = buildMatchGraphInternal(
          groupNode([
            { type: "Type", name: "!term" },
            groupNode([
              { type: "Token", value: "(" },
              { type: "Type", name: "!self" },
              { type: "Token", value: ")" }
            ]),
            { type: "Type", name: "general-enclosed" }
          ], "|")
        );
        replaceTypeInGraph(booleanGroup, { "!term": term, "!self": matchNode });
        replaceTypeInGraph(matchNode, { "!boolean-group": booleanGroup });
        return matchNode;
      }
      case "Type":
      case "Property":
        return {
          type: node.type,
          name: node.name,
          syntax: node
        };
      case "Keyword":
        return {
          type: node.type,
          name: node.name.toLowerCase(),
          syntax: node
        };
      case "AtKeyword":
        return {
          type: node.type,
          name: "@" + node.name.toLowerCase(),
          syntax: node
        };
      case "Function":
        return {
          type: node.type,
          name: node.name.toLowerCase() + "(",
          syntax: node
        };
      case "String":
        if (node.value.length === 3) {
          return {
            type: "Token",
            value: node.value.charAt(1),
            syntax: node
          };
        }
        return {
          type: node.type,
          value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, "'"),
          syntax: node
        };
      case "Token":
        return {
          type: node.type,
          value: node.value,
          syntax: node
        };
      case "Comma":
        return {
          type: node.type,
          syntax: node
        };
      default:
        throw new Error("Unknown node type:", node.type);
    }
  }
  function buildMatchGraph(syntaxTree, ref) {
    if (typeof syntaxTree === "string") {
      syntaxTree = parse(syntaxTree);
    }
    return {
      type: "MatchGraph",
      match: buildMatchGraphInternal(syntaxTree),
      syntax: ref || null,
      source: syntaxTree
    };
  }

  // node_modules/css-tree/lib/lexer/match.js
  var { hasOwnProperty: hasOwnProperty3 } = Object.prototype;
  var STUB = 0;
  var TOKEN = 1;
  var OPEN_SYNTAX = 2;
  var CLOSE_SYNTAX = 3;
  var EXIT_REASON_MATCH = "Match";
  var EXIT_REASON_MISMATCH = "Mismatch";
  var EXIT_REASON_ITERATION_LIMIT = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)";
  var ITERATION_LIMIT = 15e3;
  var totalIterationCount = 0;
  function reverseList(list) {
    let prev = null;
    let next = null;
    let item = list;
    while (item !== null) {
      next = item.prev;
      item.prev = prev;
      prev = item;
      item = next;
    }
    return prev;
  }
  function areStringsEqualCaseInsensitive(testStr, referenceStr) {
    if (testStr.length !== referenceStr.length) {
      return false;
    }
    for (let i = 0; i < testStr.length; i++) {
      const referenceCode = referenceStr.charCodeAt(i);
      let testCode = testStr.charCodeAt(i);
      if (testCode >= 65 && testCode <= 90) {
        testCode = testCode | 32;
      }
      if (testCode !== referenceCode) {
        return false;
      }
    }
    return true;
  }
  function isContextEdgeDelim(token) {
    if (token.type !== Delim) {
      return false;
    }
    return token.value !== "?";
  }
  function isCommaContextStart(token) {
    if (token === null) {
      return true;
    }
    return token.type === Comma || token.type === Function || token.type === LeftParenthesis || token.type === LeftSquareBracket || token.type === LeftCurlyBracket || isContextEdgeDelim(token);
  }
  function isCommaContextEnd(token) {
    if (token === null) {
      return true;
    }
    return token.type === RightParenthesis || token.type === RightSquareBracket || token.type === RightCurlyBracket || token.type === Delim && token.value === "/";
  }
  function internalMatch(tokens, state, syntaxes) {
    function moveToNextToken() {
      do {
        tokenIndex++;
        token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
      } while (token !== null && (token.type === WhiteSpace || token.type === Comment));
    }
    function getNextToken(offset) {
      const nextIndex = tokenIndex + offset;
      return nextIndex < tokens.length ? tokens[nextIndex] : null;
    }
    function stateSnapshotFromSyntax(nextState, prev) {
      return {
        nextState,
        matchStack,
        syntaxStack,
        thenStack,
        tokenIndex,
        prev
      };
    }
    function pushThenStack(nextState) {
      thenStack = {
        nextState,
        matchStack,
        syntaxStack,
        prev: thenStack
      };
    }
    function pushElseStack(nextState) {
      elseStack = stateSnapshotFromSyntax(nextState, elseStack);
    }
    function addTokenToMatch() {
      matchStack = {
        type: TOKEN,
        syntax: state.syntax,
        token,
        prev: matchStack
      };
      moveToNextToken();
      syntaxStash = null;
      if (tokenIndex > longestMatch) {
        longestMatch = tokenIndex;
      }
    }
    function openSyntax() {
      syntaxStack = {
        syntax: state.syntax,
        opts: state.syntax.opts || syntaxStack !== null && syntaxStack.opts || null,
        prev: syntaxStack
      };
      matchStack = {
        type: OPEN_SYNTAX,
        syntax: state.syntax,
        token: matchStack.token,
        prev: matchStack
      };
    }
    function closeSyntax() {
      if (matchStack.type === OPEN_SYNTAX) {
        matchStack = matchStack.prev;
      } else {
        matchStack = {
          type: CLOSE_SYNTAX,
          syntax: syntaxStack.syntax,
          token: matchStack.token,
          prev: matchStack
        };
      }
      syntaxStack = syntaxStack.prev;
    }
    let syntaxStack = null;
    let thenStack = null;
    let elseStack = null;
    let syntaxStash = null;
    let iterationCount = 0;
    let exitReason = null;
    let token = null;
    let tokenIndex = -1;
    let longestMatch = 0;
    let matchStack = {
      type: STUB,
      syntax: null,
      token: null,
      prev: null
    };
    moveToNextToken();
    while (exitReason === null && ++iterationCount < ITERATION_LIMIT) {
      switch (state.type) {
        case "Match":
          if (thenStack === null) {
            if (token !== null) {
              if (tokenIndex !== tokens.length - 1 || token.value !== "\\0" && token.value !== "\\9") {
                state = MISMATCH;
                break;
              }
            }
            exitReason = EXIT_REASON_MATCH;
            break;
          }
          state = thenStack.nextState;
          if (state === DISALLOW_EMPTY) {
            if (thenStack.matchStack === matchStack) {
              state = MISMATCH;
              break;
            } else {
              state = MATCH;
            }
          }
          while (thenStack.syntaxStack !== syntaxStack) {
            closeSyntax();
          }
          thenStack = thenStack.prev;
          break;
        case "Mismatch":
          if (syntaxStash !== null && syntaxStash !== false) {
            if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
              elseStack = syntaxStash;
              syntaxStash = false;
            }
          } else if (elseStack === null) {
            exitReason = EXIT_REASON_MISMATCH;
            break;
          }
          state = elseStack.nextState;
          thenStack = elseStack.thenStack;
          syntaxStack = elseStack.syntaxStack;
          matchStack = elseStack.matchStack;
          tokenIndex = elseStack.tokenIndex;
          token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
          elseStack = elseStack.prev;
          break;
        case "MatchGraph":
          state = state.match;
          break;
        case "If":
          if (state.else !== MISMATCH) {
            pushElseStack(state.else);
          }
          if (state.then !== MATCH) {
            pushThenStack(state.then);
          }
          state = state.match;
          break;
        case "MatchOnce":
          state = {
            type: "MatchOnceBuffer",
            syntax: state,
            index: 0,
            mask: 0
          };
          break;
        case "MatchOnceBuffer": {
          const terms = state.syntax.terms;
          if (state.index === terms.length) {
            if (state.mask === 0 || state.syntax.all) {
              state = MISMATCH;
              break;
            }
            state = MATCH;
            break;
          }
          if (state.mask === (1 << terms.length) - 1) {
            state = MATCH;
            break;
          }
          for (; state.index < terms.length; state.index++) {
            const matchFlag = 1 << state.index;
            if ((state.mask & matchFlag) === 0) {
              pushElseStack(state);
              pushThenStack({
                type: "AddMatchOnce",
                syntax: state.syntax,
                mask: state.mask | matchFlag
              });
              state = terms[state.index++];
              break;
            }
          }
          break;
        }
        case "AddMatchOnce":
          state = {
            type: "MatchOnceBuffer",
            syntax: state.syntax,
            index: 0,
            mask: state.mask
          };
          break;
        case "Enum":
          if (token !== null) {
            let name50 = token.value.toLowerCase();
            if (name50.indexOf("\\") !== -1) {
              name50 = name50.replace(/\\[09].*$/, "");
            }
            if (hasOwnProperty3.call(state.map, name50)) {
              state = state.map[name50];
              break;
            }
          }
          state = MISMATCH;
          break;
        case "Generic": {
          const opts = syntaxStack !== null ? syntaxStack.opts : null;
          const lastTokenIndex2 = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));
          if (!isNaN(lastTokenIndex2) && lastTokenIndex2 > tokenIndex) {
            while (tokenIndex < lastTokenIndex2) {
              addTokenToMatch();
            }
            state = MATCH;
          } else {
            state = MISMATCH;
          }
          break;
        }
        case "Type":
        case "Property": {
          const syntaxDict = state.type === "Type" ? "types" : "properties";
          const dictSyntax = hasOwnProperty3.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;
          if (!dictSyntax || !dictSyntax.match) {
            throw new Error(
              "Bad syntax reference: " + (state.type === "Type" ? "<" + state.name + ">" : "<'" + state.name + "'>")
            );
          }
          if (syntaxStash !== false && token !== null && state.type === "Type") {
            const lowPriorityMatching = (
              // https://drafts.csswg.org/css-values-4/#custom-idents
              // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
              // can only claim the keyword if no other unfulfilled production can claim it.
              state.name === "custom-ident" && token.type === Ident || // https://drafts.csswg.org/css-values-4/#lengths
              // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
              // it must parse as a <number>
              state.name === "length" && token.value === "0"
            );
            if (lowPriorityMatching) {
              if (syntaxStash === null) {
                syntaxStash = stateSnapshotFromSyntax(state, elseStack);
              }
              state = MISMATCH;
              break;
            }
          }
          openSyntax();
          state = dictSyntax.matchRef || dictSyntax.match;
          break;
        }
        case "Keyword": {
          const name50 = state.name;
          if (token !== null) {
            let keywordName = token.value;
            if (keywordName.indexOf("\\") !== -1) {
              keywordName = keywordName.replace(/\\[09].*$/, "");
            }
            if (areStringsEqualCaseInsensitive(keywordName, name50)) {
              addTokenToMatch();
              state = MATCH;
              break;
            }
          }
          state = MISMATCH;
          break;
        }
        case "AtKeyword":
        case "Function":
          if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
            addTokenToMatch();
            state = MATCH;
            break;
          }
          state = MISMATCH;
          break;
        case "Token":
          if (token !== null && token.value === state.value) {
            addTokenToMatch();
            state = MATCH;
            break;
          }
          state = MISMATCH;
          break;
        case "Comma":
          if (token !== null && token.type === Comma) {
            if (isCommaContextStart(matchStack.token)) {
              state = MISMATCH;
            } else {
              addTokenToMatch();
              state = isCommaContextEnd(token) ? MISMATCH : MATCH;
            }
          } else {
            state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? MATCH : MISMATCH;
          }
          break;
        case "String":
          let string = "";
          let lastTokenIndex = tokenIndex;
          for (; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) {
            string += tokens[lastTokenIndex].value;
          }
          if (areStringsEqualCaseInsensitive(string, state.value)) {
            while (tokenIndex < lastTokenIndex) {
              addTokenToMatch();
            }
            state = MATCH;
          } else {
            state = MISMATCH;
          }
          break;
        default:
          throw new Error("Unknown node type: " + state.type);
      }
    }
    totalIterationCount += iterationCount;
    switch (exitReason) {
      case null:
        console.warn("[csstree-match] BREAK after " + ITERATION_LIMIT + " iterations");
        exitReason = EXIT_REASON_ITERATION_LIMIT;
        matchStack = null;
        break;
      case EXIT_REASON_MATCH:
        while (syntaxStack !== null) {
          closeSyntax();
        }
        break;
      default:
        matchStack = null;
    }
    return {
      tokens,
      reason: exitReason,
      iterations: iterationCount,
      match: matchStack,
      longestMatch
    };
  }
  function matchAsTree(tokens, matchGraph, syntaxes) {
    const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});
    if (matchResult.match === null) {
      return matchResult;
    }
    let item = matchResult.match;
    let host = matchResult.match = {
      syntax: matchGraph.syntax || null,
      match: []
    };
    const hostStack = [host];
    item = reverseList(item).prev;
    while (item !== null) {
      switch (item.type) {
        case OPEN_SYNTAX:
          host.match.push(host = {
            syntax: item.syntax,
            match: []
          });
          hostStack.push(host);
          break;
        case CLOSE_SYNTAX:
          hostStack.pop();
          host = hostStack[hostStack.length - 1];
          break;
        default:
          host.match.push({
            syntax: item.syntax || null,
            token: item.token.value,
            node: item.token.node
          });
      }
      item = item.prev;
    }
    return matchResult;
  }

  // node_modules/css-tree/lib/lexer/trace.js
  var trace_exports = {};
  __export(trace_exports, {
    getTrace: () => getTrace,
    isKeyword: () => isKeyword,
    isProperty: () => isProperty,
    isType: () => isType
  });
  function getTrace(node) {
    function shouldPutToTrace(syntax) {
      if (syntax === null) {
        return false;
      }
      return syntax.type === "Type" || syntax.type === "Property" || syntax.type === "Keyword";
    }
    function hasMatch(matchNode) {
      if (Array.isArray(matchNode.match)) {
        for (let i = 0; i < matchNode.match.length; i++) {
          if (hasMatch(matchNode.match[i])) {
            if (shouldPutToTrace(matchNode.syntax)) {
              result.unshift(matchNode.syntax);
            }
            return true;
          }
        }
      } else if (matchNode.node === node) {
        result = shouldPutToTrace(matchNode.syntax) ? [matchNode.syntax] : [];
        return true;
      }
      return false;
    }
    let result = null;
    if (this.matched !== null) {
      hasMatch(this.matched);
    }
    return result;
  }
  function isType(node, type) {
    return testNode(this, node, (match) => match.type === "Type" && match.name === type);
  }
  function isProperty(node, property2) {
    return testNode(this, node, (match) => match.type === "Property" && match.name === property2);
  }
  function isKeyword(node) {
    return testNode(this, node, (match) => match.type === "Keyword");
  }
  function testNode(match, node, fn) {
    const trace = getTrace.call(match, node);
    if (trace === null) {
      return false;
    }
    return trace.some(fn);
  }

  // node_modules/css-tree/lib/lexer/search.js
  function getFirstMatchNode(matchNode) {
    if ("node" in matchNode) {
      return matchNode.node;
    }
    return getFirstMatchNode(matchNode.match[0]);
  }
  function getLastMatchNode(matchNode) {
    if ("node" in matchNode) {
      return matchNode.node;
    }
    return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
  }
  function matchFragments(lexer2, ast, match, type, name50) {
    function findFragments(matchNode) {
      if (matchNode.syntax !== null && matchNode.syntax.type === type && matchNode.syntax.name === name50) {
        const start = getFirstMatchNode(matchNode);
        const end = getLastMatchNode(matchNode);
        lexer2.syntax.walk(ast, function(node, item, list) {
          if (node === start) {
            const nodes = new List();
            do {
              nodes.appendData(item.data);
              if (item.data === end) {
                break;
              }
              item = item.next;
            } while (item !== null);
            fragments.push({
              parent: list,
              nodes
            });
          }
        });
      }
      if (Array.isArray(matchNode.match)) {
        matchNode.match.forEach(findFragments);
      }
    }
    const fragments = [];
    if (match.matched !== null) {
      findFragments(match.matched);
    }
    return fragments;
  }

  // node_modules/css-tree/lib/lexer/structure.js
  var { hasOwnProperty: hasOwnProperty4 } = Object.prototype;
  function isValidNumber(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value && value >= 0;
  }
  function isValidLocation(loc) {
    return Boolean(loc) && isValidNumber(loc.offset) && isValidNumber(loc.line) && isValidNumber(loc.column);
  }
  function createNodeStructureChecker(type, fields) {
    return function checkNode(node, warn) {
      if (!node || node.constructor !== Object) {
        return warn(node, "Type of node should be an Object");
      }
      for (let key in node) {
        let valid = true;
        if (hasOwnProperty4.call(node, key) === false) {
          continue;
        }
        if (key === "type") {
          if (node.type !== type) {
            warn(node, "Wrong node type `" + node.type + "`, expected `" + type + "`");
          }
        } else if (key === "loc") {
          if (node.loc === null) {
            continue;
          } else if (node.loc && node.loc.constructor === Object) {
            if (typeof node.loc.source !== "string") {
              key += ".source";
            } else if (!isValidLocation(node.loc.start)) {
              key += ".start";
            } else if (!isValidLocation(node.loc.end)) {
              key += ".end";
            } else {
              continue;
            }
          }
          valid = false;
        } else if (fields.hasOwnProperty(key)) {
          valid = false;
          for (let i = 0; !valid && i < fields[key].length; i++) {
            const fieldType = fields[key][i];
            switch (fieldType) {
              case String:
                valid = typeof node[key] === "string";
                break;
              case Boolean:
                valid = typeof node[key] === "boolean";
                break;
              case null:
                valid = node[key] === null;
                break;
              default:
                if (typeof fieldType === "string") {
                  valid = node[key] && node[key].type === fieldType;
                } else if (Array.isArray(fieldType)) {
                  valid = node[key] instanceof List;
                }
            }
          }
        } else {
          warn(node, "Unknown field `" + key + "` for " + type + " node type");
        }
        if (!valid) {
          warn(node, "Bad value for `" + type + "." + key + "`");
        }
      }
      for (const key in fields) {
        if (hasOwnProperty4.call(fields, key) && hasOwnProperty4.call(node, key) === false) {
          warn(node, "Field `" + type + "." + key + "` is missed");
        }
      }
    };
  }
  function genTypesList(fieldTypes, path) {
    const docsTypes = [];
    for (let i = 0; i < fieldTypes.length; i++) {
      const fieldType = fieldTypes[i];
      if (fieldType === String || fieldType === Boolean) {
        docsTypes.push(fieldType.name.toLowerCase());
      } else if (fieldType === null) {
        docsTypes.push("null");
      } else if (typeof fieldType === "string") {
        docsTypes.push(fieldType);
      } else if (Array.isArray(fieldType)) {
        docsTypes.push("List<" + (genTypesList(fieldType, path) || "any") + ">");
      } else {
        throw new Error("Wrong value `" + fieldType + "` in `" + path + "` structure definition");
      }
    }
    return docsTypes.join(" | ");
  }
  function processStructure(name50, nodeType) {
    const structure50 = nodeType.structure;
    const fields = {
      type: String,
      loc: true
    };
    const docs = {
      type: '"' + name50 + '"'
    };
    for (const key in structure50) {
      if (hasOwnProperty4.call(structure50, key) === false) {
        continue;
      }
      const fieldTypes = fields[key] = Array.isArray(structure50[key]) ? structure50[key].slice() : [structure50[key]];
      docs[key] = genTypesList(fieldTypes, name50 + "." + key);
    }
    return {
      docs,
      check: createNodeStructureChecker(name50, fields)
    };
  }
  function getStructureFromConfig(config) {
    const structure50 = {};
    if (config.node) {
      for (const name50 in config.node) {
        if (hasOwnProperty4.call(config.node, name50)) {
          const nodeType = config.node[name50];
          if (nodeType.structure) {
            structure50[name50] = processStructure(name50, nodeType);
          } else {
            throw new Error("Missed `structure` field in `" + name50 + "` node type definition");
          }
        }
      }
    }
    return structure50;
  }

  // node_modules/css-tree/lib/lexer/Lexer.js
  function dumpMapSyntax(map, compact, syntaxAsAst) {
    const result = {};
    for (const name50 in map) {
      if (map[name50].syntax) {
        result[name50] = syntaxAsAst ? map[name50].syntax : generate(map[name50].syntax, { compact });
      }
    }
    return result;
  }
  function dumpAtruleMapSyntax(map, compact, syntaxAsAst) {
    const result = {};
    for (const [name50, atrule] of Object.entries(map)) {
      result[name50] = {
        prelude: atrule.prelude && (syntaxAsAst ? atrule.prelude.syntax : generate(atrule.prelude.syntax, { compact })),
        descriptors: atrule.descriptors && dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst)
      };
    }
    return result;
  }
  function valueHasVar(tokens) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].value.toLowerCase() === "var(") {
        return true;
      }
    }
    return false;
  }
  function syntaxHasTopLevelCommaMultiplier(syntax) {
    const singleTerm = syntax.terms[0];
    return syntax.explicit === false && syntax.terms.length === 1 && singleTerm.type === "Multiplier" && singleTerm.comma === true;
  }
  function buildMatchResult(matched, error, iterations) {
    return {
      matched,
      iterations,
      error,
      ...trace_exports
    };
  }
  function matchSyntax(lexer2, syntax, value, useCssWideKeywords) {
    const tokens = prepare_tokens_default(value, lexer2.syntax);
    let result;
    if (valueHasVar(tokens)) {
      return buildMatchResult(null, new Error("Matching for a tree with var() is not supported"));
    }
    if (useCssWideKeywords) {
      result = matchAsTree(tokens, lexer2.cssWideKeywordsSyntax, lexer2);
    }
    if (!useCssWideKeywords || !result.match) {
      result = matchAsTree(tokens, syntax.match, lexer2);
      if (!result.match) {
        return buildMatchResult(
          null,
          new SyntaxMatchError(result.reason, syntax.syntax, value, result),
          result.iterations
        );
      }
    }
    return buildMatchResult(result.match, null, result.iterations);
  }
  var Lexer = class {
    constructor(config, syntax, structure50) {
      this.cssWideKeywords = cssWideKeywords;
      this.syntax = syntax;
      this.generic = false;
      this.units = { ...units_exports };
      this.atrules = /* @__PURE__ */ Object.create(null);
      this.properties = /* @__PURE__ */ Object.create(null);
      this.types = /* @__PURE__ */ Object.create(null);
      this.structure = structure50 || getStructureFromConfig(config);
      if (config) {
        if (config.cssWideKeywords) {
          this.cssWideKeywords = config.cssWideKeywords;
        }
        if (config.units) {
          for (const group of Object.keys(units_exports)) {
            if (Array.isArray(config.units[group])) {
              this.units[group] = config.units[group];
            }
          }
        }
        if (config.types) {
          for (const [name50, type] of Object.entries(config.types)) {
            this.addType_(name50, type);
          }
        }
        if (config.generic) {
          this.generic = true;
          for (const [name50, value] of Object.entries(createGenericTypes(this.units))) {
            this.addType_(name50, value);
          }
        }
        if (config.atrules) {
          for (const [name50, atrule] of Object.entries(config.atrules)) {
            this.addAtrule_(name50, atrule);
          }
        }
        if (config.properties) {
          for (const [name50, property2] of Object.entries(config.properties)) {
            this.addProperty_(name50, property2);
          }
        }
      }
      this.cssWideKeywordsSyntax = buildMatchGraph(this.cssWideKeywords.join(" |  "));
    }
    checkStructure(ast) {
      function collectWarning(node, message) {
        warns.push({ node, message });
      }
      const structure50 = this.structure;
      const warns = [];
      this.syntax.walk(ast, function(node) {
        if (structure50.hasOwnProperty(node.type)) {
          structure50[node.type].check(node, collectWarning);
        } else {
          collectWarning(node, "Unknown node type `" + node.type + "`");
        }
      });
      return warns.length ? warns : false;
    }
    createDescriptor(syntax, type, name50, parent = null) {
      const ref = {
        type,
        name: name50
      };
      const descriptor = {
        type,
        name: name50,
        parent,
        serializable: typeof syntax === "string" || syntax && typeof syntax.type === "string",
        syntax: null,
        match: null,
        matchRef: null
        // used for properties when a syntax referenced as <'property'> in other syntax definitions
      };
      if (typeof syntax === "function") {
        descriptor.match = buildMatchGraph(syntax, ref);
      } else {
        if (typeof syntax === "string") {
          Object.defineProperty(descriptor, "syntax", {
            get() {
              Object.defineProperty(descriptor, "syntax", {
                value: parse(syntax)
              });
              return descriptor.syntax;
            }
          });
        } else {
          descriptor.syntax = syntax;
        }
        Object.defineProperty(descriptor, "match", {
          get() {
            Object.defineProperty(descriptor, "match", {
              value: buildMatchGraph(descriptor.syntax, ref)
            });
            return descriptor.match;
          }
        });
        if (type === "Property") {
          Object.defineProperty(descriptor, "matchRef", {
            get() {
              const syntax2 = descriptor.syntax;
              const value = syntaxHasTopLevelCommaMultiplier(syntax2) ? buildMatchGraph({
                ...syntax2,
                terms: [syntax2.terms[0].term]
              }, ref) : null;
              Object.defineProperty(descriptor, "matchRef", {
                value
              });
              return value;
            }
          });
        }
      }
      return descriptor;
    }
    addAtrule_(name50, syntax) {
      if (!syntax) {
        return;
      }
      this.atrules[name50] = {
        type: "Atrule",
        name: name50,
        prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, "AtrulePrelude", name50) : null,
        descriptors: syntax.descriptors ? Object.keys(syntax.descriptors).reduce(
          (map, descName) => {
            map[descName] = this.createDescriptor(syntax.descriptors[descName], "AtruleDescriptor", descName, name50);
            return map;
          },
          /* @__PURE__ */ Object.create(null)
        ) : null
      };
    }
    addProperty_(name50, syntax) {
      if (!syntax) {
        return;
      }
      this.properties[name50] = this.createDescriptor(syntax, "Property", name50);
    }
    addType_(name50, syntax) {
      if (!syntax) {
        return;
      }
      this.types[name50] = this.createDescriptor(syntax, "Type", name50);
    }
    checkAtruleName(atruleName) {
      if (!this.getAtrule(atruleName)) {
        return new SyntaxReferenceError("Unknown at-rule", "@" + atruleName);
      }
    }
    checkAtrulePrelude(atruleName, prelude) {
      const error = this.checkAtruleName(atruleName);
      if (error) {
        return error;
      }
      const atrule = this.getAtrule(atruleName);
      if (!atrule.prelude && prelude) {
        return new SyntaxError("At-rule `@" + atruleName + "` should not contain a prelude");
      }
      if (atrule.prelude && !prelude) {
        if (!matchSyntax(this, atrule.prelude, "", false).matched) {
          return new SyntaxError("At-rule `@" + atruleName + "` should contain a prelude");
        }
      }
    }
    checkAtruleDescriptorName(atruleName, descriptorName) {
      const error = this.checkAtruleName(atruleName);
      if (error) {
        return error;
      }
      const atrule = this.getAtrule(atruleName);
      const descriptor = keyword(descriptorName);
      if (!atrule.descriptors) {
        return new SyntaxError("At-rule `@" + atruleName + "` has no known descriptors");
      }
      if (!atrule.descriptors[descriptor.name] && !atrule.descriptors[descriptor.basename]) {
        return new SyntaxReferenceError("Unknown at-rule descriptor", descriptorName);
      }
    }
    checkPropertyName(propertyName) {
      if (!this.getProperty(propertyName)) {
        return new SyntaxReferenceError("Unknown property", propertyName);
      }
    }
    matchAtrulePrelude(atruleName, prelude) {
      const error = this.checkAtrulePrelude(atruleName, prelude);
      if (error) {
        return buildMatchResult(null, error);
      }
      const atrule = this.getAtrule(atruleName);
      if (!atrule.prelude) {
        return buildMatchResult(null, null);
      }
      return matchSyntax(this, atrule.prelude, prelude || "", false);
    }
    matchAtruleDescriptor(atruleName, descriptorName, value) {
      const error = this.checkAtruleDescriptorName(atruleName, descriptorName);
      if (error) {
        return buildMatchResult(null, error);
      }
      const atrule = this.getAtrule(atruleName);
      const descriptor = keyword(descriptorName);
      return matchSyntax(this, atrule.descriptors[descriptor.name] || atrule.descriptors[descriptor.basename], value, false);
    }
    matchDeclaration(node) {
      if (node.type !== "Declaration") {
        return buildMatchResult(null, new Error("Not a Declaration node"));
      }
      return this.matchProperty(node.property, node.value);
    }
    matchProperty(propertyName, value) {
      if (property(propertyName).custom) {
        return buildMatchResult(null, new Error("Lexer matching doesn't applicable for custom properties"));
      }
      const error = this.checkPropertyName(propertyName);
      if (error) {
        return buildMatchResult(null, error);
      }
      return matchSyntax(this, this.getProperty(propertyName), value, true);
    }
    matchType(typeName, value) {
      const typeSyntax = this.getType(typeName);
      if (!typeSyntax) {
        return buildMatchResult(null, new SyntaxReferenceError("Unknown type", typeName));
      }
      return matchSyntax(this, typeSyntax, value, false);
    }
    match(syntax, value) {
      if (typeof syntax !== "string" && (!syntax || !syntax.type)) {
        return buildMatchResult(null, new SyntaxReferenceError("Bad syntax"));
      }
      if (typeof syntax === "string" || !syntax.match) {
        syntax = this.createDescriptor(syntax, "Type", "anonymous");
      }
      return matchSyntax(this, syntax, value, false);
    }
    findValueFragments(propertyName, value, type, name50) {
      return matchFragments(this, value, this.matchProperty(propertyName, value), type, name50);
    }
    findDeclarationValueFragments(declaration, type, name50) {
      return matchFragments(this, declaration.value, this.matchDeclaration(declaration), type, name50);
    }
    findAllFragments(ast, type, name50) {
      const result = [];
      this.syntax.walk(ast, {
        visit: "Declaration",
        enter: (declaration) => {
          result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name50));
        }
      });
      return result;
    }
    getAtrule(atruleName, fallbackBasename = true) {
      const atrule = keyword(atruleName);
      const atruleEntry = atrule.vendor && fallbackBasename ? this.atrules[atrule.name] || this.atrules[atrule.basename] : this.atrules[atrule.name];
      return atruleEntry || null;
    }
    getAtrulePrelude(atruleName, fallbackBasename = true) {
      const atrule = this.getAtrule(atruleName, fallbackBasename);
      return atrule && atrule.prelude || null;
    }
    getAtruleDescriptor(atruleName, name50) {
      return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators ? this.atrules[atruleName].declarators[name50] || null : null;
    }
    getProperty(propertyName, fallbackBasename = true) {
      const property2 = property(propertyName);
      const propertyEntry = property2.vendor && fallbackBasename ? this.properties[property2.name] || this.properties[property2.basename] : this.properties[property2.name];
      return propertyEntry || null;
    }
    getType(name50) {
      return hasOwnProperty.call(this.types, name50) ? this.types[name50] : null;
    }
    validate() {
      function syntaxRef(name50, isType2) {
        return isType2 ? `<${name50}>` : `<'${name50}'>`;
      }
      function validate(syntax, name50, broken, descriptor) {
        if (broken.has(name50)) {
          return broken.get(name50);
        }
        broken.set(name50, false);
        if (descriptor.syntax !== null) {
          walk(descriptor.syntax, function(node) {
            if (node.type !== "Type" && node.type !== "Property") {
              return;
            }
            const map = node.type === "Type" ? syntax.types : syntax.properties;
            const brokenMap = node.type === "Type" ? brokenTypes : brokenProperties;
            if (!hasOwnProperty.call(map, node.name)) {
              errors.push(`${syntaxRef(name50, broken === brokenTypes)} used missed syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
              broken.set(name50, true);
            } else if (validate(syntax, node.name, brokenMap, map[node.name])) {
              errors.push(`${syntaxRef(name50, broken === brokenTypes)} used broken syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
              broken.set(name50, true);
            }
          }, this);
        }
      }
      const errors = [];
      let brokenTypes = /* @__PURE__ */ new Map();
      let brokenProperties = /* @__PURE__ */ new Map();
      for (const key in this.types) {
        validate(this, key, brokenTypes, this.types[key]);
      }
      for (const key in this.properties) {
        validate(this, key, brokenProperties, this.properties[key]);
      }
      const brokenTypesArray = [...brokenTypes.keys()].filter((name50) => brokenTypes.get(name50));
      const brokenPropertiesArray = [...brokenProperties.keys()].filter((name50) => brokenProperties.get(name50));
      if (brokenTypesArray.length || brokenPropertiesArray.length) {
        return {
          errors,
          types: brokenTypesArray,
          properties: brokenPropertiesArray
        };
      }
      return null;
    }
    dump(syntaxAsAst, pretty) {
      return {
        generic: this.generic,
        cssWideKeywords: this.cssWideKeywords,
        units: this.units,
        types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
        properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
        atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst)
      };
    }
    toString() {
      return JSON.stringify(this.dump());
    }
  };

  // node_modules/css-tree/lib/syntax/config/mix.js
  function appendOrSet(a3, b) {
    if (typeof b === "string" && /^\s*\|/.test(b)) {
      return typeof a3 === "string" ? a3 + b : b.replace(/^\s*\|\s*/, "");
    }
    return b || null;
  }
  function sliceProps(obj, props) {
    const result = /* @__PURE__ */ Object.create(null);
    for (const [key, value] of Object.entries(obj)) {
      if (value) {
        result[key] = {};
        for (const prop of Object.keys(value)) {
          if (props.includes(prop)) {
            result[key][prop] = value[prop];
          }
        }
      }
    }
    return result;
  }
  function mix(dest, src) {
    const result = { ...dest };
    for (const [prop, value] of Object.entries(src)) {
      switch (prop) {
        case "generic":
          result[prop] = Boolean(value);
          break;
        case "cssWideKeywords":
          result[prop] = dest[prop] ? [...dest[prop], ...value] : value || [];
          break;
        case "units":
          result[prop] = { ...dest[prop] };
          for (const [name50, patch] of Object.entries(value)) {
            result[prop][name50] = Array.isArray(patch) ? patch : [];
          }
          break;
        case "atrules":
          result[prop] = { ...dest[prop] };
          for (const [name50, atrule] of Object.entries(value)) {
            const exists = result[prop][name50] || {};
            const current = result[prop][name50] = {
              prelude: exists.prelude || null,
              descriptors: {
                ...exists.descriptors
              }
            };
            if (!atrule) {
              continue;
            }
            current.prelude = atrule.prelude ? appendOrSet(current.prelude, atrule.prelude) : current.prelude || null;
            for (const [descriptorName, descriptorValue] of Object.entries(atrule.descriptors || {})) {
              current.descriptors[descriptorName] = descriptorValue ? appendOrSet(current.descriptors[descriptorName], descriptorValue) : null;
            }
            if (!Object.keys(current.descriptors).length) {
              current.descriptors = null;
            }
          }
          break;
        case "types":
        case "properties":
          result[prop] = { ...dest[prop] };
          for (const [name50, syntax] of Object.entries(value)) {
            result[prop][name50] = appendOrSet(result[prop][name50], syntax);
          }
          break;
        case "scope":
        case "features":
          result[prop] = { ...dest[prop] };
          for (const [name50, props] of Object.entries(value)) {
            result[prop][name50] = { ...result[prop][name50], ...props };
          }
          break;
        case "parseContext":
          result[prop] = {
            ...dest[prop],
            ...value
          };
          break;
        case "atrule":
        case "pseudo":
          result[prop] = {
            ...dest[prop],
            ...sliceProps(value, ["parse"])
          };
          break;
        case "node":
          result[prop] = {
            ...dest[prop],
            ...sliceProps(value, ["name", "structure", "parse", "generate", "walkContext"])
          };
          break;
      }
    }
    return result;
  }

  // node_modules/css-tree/lib/syntax/create.js
  function createSyntax(config) {
    const parse52 = createParser(config);
    const walk3 = createWalker(config);
    const generate52 = createGenerator(config);
    const { fromPlainObject: fromPlainObject2, toPlainObject: toPlainObject2 } = createConvertor(walk3);
    const syntax = {
      lexer: null,
      createLexer: (config2) => new Lexer(config2, syntax, syntax.lexer.structure),
      tokenize,
      parse: parse52,
      generate: generate52,
      walk: walk3,
      find: walk3.find,
      findLast: walk3.findLast,
      findAll: walk3.findAll,
      fromPlainObject: fromPlainObject2,
      toPlainObject: toPlainObject2,
      fork(extension) {
        const base = mix({}, config);
        return createSyntax(
          typeof extension === "function" ? extension(base) : mix(base, extension)
        );
      }
    };
    syntax.lexer = new Lexer({
      generic: config.generic,
      cssWideKeywords: config.cssWideKeywords,
      units: config.units,
      types: config.types,
      atrules: config.atrules,
      properties: config.properties,
      node: config.node
    }, syntax);
    return syntax;
  }
  var create_default = (config) => createSyntax(mix({}, config));

  // node_modules/css-tree/dist/data.js
  var data_default = {
    "generic": true,
    "cssWideKeywords": [
      "initial",
      "inherit",
      "unset",
      "revert",
      "revert-layer"
    ],
    "units": {
      "angle": [
        "deg",
        "grad",
        "rad",
        "turn"
      ],
      "decibel": [
        "db"
      ],
      "flex": [
        "fr"
      ],
      "frequency": [
        "hz",
        "khz"
      ],
      "length": [
        "cm",
        "mm",
        "q",
        "in",
        "pt",
        "pc",
        "px",
        "em",
        "rem",
        "ex",
        "rex",
        "cap",
        "rcap",
        "ch",
        "rch",
        "ic",
        "ric",
        "lh",
        "rlh",
        "vw",
        "svw",
        "lvw",
        "dvw",
        "vh",
        "svh",
        "lvh",
        "dvh",
        "vi",
        "svi",
        "lvi",
        "dvi",
        "vb",
        "svb",
        "lvb",
        "dvb",
        "vmin",
        "svmin",
        "lvmin",
        "dvmin",
        "vmax",
        "svmax",
        "lvmax",
        "dvmax",
        "cqw",
        "cqh",
        "cqi",
        "cqb",
        "cqmin",
        "cqmax"
      ],
      "resolution": [
        "dpi",
        "dpcm",
        "dppx",
        "x"
      ],
      "semitones": [
        "st"
      ],
      "time": [
        "s",
        "ms"
      ]
    },
    "types": {
      "abs()": "abs( <calc-sum> )",
      "absolute-size": "xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large",
      "acos()": "acos( <calc-sum> )",
      "alpha-value": "<number>|<percentage>",
      "angle-percentage": "<angle>|<percentage>",
      "angular-color-hint": "<angle-percentage>",
      "angular-color-stop": "<color>&&<color-stop-angle>?",
      "angular-color-stop-list": "[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>",
      "animateable-feature": "scroll-position|contents|<custom-ident>",
      "asin()": "asin( <calc-sum> )",
      "atan()": "atan( <calc-sum> )",
      "atan2()": "atan2( <calc-sum> , <calc-sum> )",
      "attachment": "scroll|fixed|local",
      "attr()": "attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )",
      "attr-matcher": "['~'|'|'|'^'|'$'|'*']? '='",
      "attr-modifier": "i|s",
      "attribute-selector": "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
      "auto-repeat": "repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )",
      "auto-track-list": "[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",
      "axis": "block|inline|x|y",
      "baseline-position": "[first|last]? baseline",
      "basic-shape": "<inset()>|<xywh()>|<rect()>|<circle()>|<ellipse()>|<polygon()>|<path()>",
      "bg-image": "none|<image>",
      "bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
      "bg-position": "[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]",
      "bg-size": "[<length-percentage>|auto]{1,2}|cover|contain",
      "blur()": "blur( <length> )",
      "blend-mode": "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",
      "box": "border-box|padding-box|content-box",
      "brightness()": "brightness( <number-percentage> )",
      "calc()": "calc( <calc-sum> )",
      "calc-sum": "<calc-product> [['+'|'-'] <calc-product>]*",
      "calc-product": "<calc-value> ['*' <calc-value>|'/' <number>]*",
      "calc-value": "<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )",
      "calc-constant": "e|pi|infinity|-infinity|NaN",
      "cf-final-image": "<image>|<color>",
      "cf-mixing-image": "<percentage>?&&<image>",
      "circle()": "circle( [<shape-radius>]? [at <position>]? )",
      "clamp()": "clamp( <calc-sum>#{3} )",
      "class-selector": "'.' <ident-token>",
      "clip-source": "<url>",
      "color": "<color-base>|currentColor|<system-color>|<device-cmyk()>|<light-dark()>|<-non-standard-color>",
      "color-stop": "<color-stop-length>|<color-stop-angle>",
      "color-stop-angle": "<angle-percentage>{1,2}",
      "color-stop-length": "<length-percentage>{1,2}",
      "color-stop-list": "[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>",
      "color-interpolation-method": "in [<rectangular-color-space>|<polar-color-space> <hue-interpolation-method>?|<custom-color-space>]",
      "combinator": "'>'|'+'|'~'|['|' '|']",
      "common-lig-values": "[common-ligatures|no-common-ligatures]",
      "compat-auto": "searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button",
      "composite-style": "clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor",
      "compositing-operator": "add|subtract|intersect|exclude",
      "compound-selector": "[<type-selector>? <subclass-selector>*]!",
      "compound-selector-list": "<compound-selector>#",
      "complex-selector": "<complex-selector-unit> [<combinator>? <complex-selector-unit>]*",
      "complex-selector-list": "<complex-selector>#",
      "conic-gradient()": "conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
      "contextual-alt-values": "[contextual|no-contextual]",
      "content-distribution": "space-between|space-around|space-evenly|stretch",
      "content-list": "[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+",
      "content-position": "center|start|end|flex-start|flex-end",
      "content-replacement": "<image>",
      "contrast()": "contrast( [<number-percentage>] )",
      "cos()": "cos( <calc-sum> )",
      "counter": "<counter()>|<counters()>",
      "counter()": "counter( <counter-name> , <counter-style>? )",
      "counter-name": "<custom-ident>",
      "counter-style": "<counter-style-name>|symbols( )",
      "counter-style-name": "<custom-ident>",
      "counters()": "counters( <counter-name> , <string> , <counter-style>? )",
      "cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
      "cubic-bezier-timing-function": "ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )",
      "deprecated-system-color": "ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText",
      "discretionary-lig-values": "[discretionary-ligatures|no-discretionary-ligatures]",
      "display-box": "contents|none",
      "display-inside": "flow|flow-root|table|flex|grid|ruby",
      "display-internal": "table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container",
      "display-legacy": "inline-block|inline-list-item|inline-table|inline-flex|inline-grid",
      "display-listitem": "<display-outside>?&&[flow|flow-root]?&&list-item",
      "display-outside": "block|inline|run-in",
      "drop-shadow()": "drop-shadow( <length>{2,3} <color>? )",
      "east-asian-variant-values": "[jis78|jis83|jis90|jis04|simplified|traditional]",
      "east-asian-width-values": "[full-width|proportional-width]",
      "element()": "element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )",
      "ellipse()": "ellipse( [<shape-radius>{2}]? [at <position>]? )",
      "ending-shape": "circle|ellipse",
      "env()": "env( <custom-ident> , <declaration-value>? )",
      "exp()": "exp( <calc-sum> )",
      "explicit-track-list": "[<line-names>? <track-size>]+ <line-names>?",
      "family-name": "<string>|<custom-ident>+",
      "feature-tag-value": "<string> [<integer>|on|off]?",
      "feature-type": "@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation",
      "feature-value-block": "<feature-type> '{' <feature-value-declaration-list> '}'",
      "feature-value-block-list": "<feature-value-block>+",
      "feature-value-declaration": "<custom-ident> : <integer>+ ;",
      "feature-value-declaration-list": "<feature-value-declaration>",
      "feature-value-name": "<custom-ident>",
      "fill-rule": "nonzero|evenodd",
      "filter-function": "<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>",
      "filter-function-list": "[<filter-function>|<url>]+",
      "final-bg-layer": "<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
      "fixed-breadth": "<length-percentage>",
      "fixed-repeat": "repeat( [<integer [1,\u221E]>] , [<line-names>? <fixed-size>]+ <line-names>? )",
      "fixed-size": "<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )",
      "font-stretch-absolute": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>",
      "font-variant-css21": "[normal|small-caps]",
      "font-weight-absolute": "normal|bold|<number [1,1000]>",
      "frequency-percentage": "<frequency>|<percentage>",
      "general-enclosed": "[<function-token> <any-value>? )]|[( <any-value>? )]",
      "generic-family": "<generic-script-specific>|<generic-complete>|<generic-incomplete>|<-non-standard-generic-family>",
      "generic-name": "serif|sans-serif|cursive|fantasy|monospace",
      "geometry-box": "<shape-box>|fill-box|stroke-box|view-box",
      "gradient": "<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>",
      "grayscale()": "grayscale( <number-percentage> )",
      "grid-line": "auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]",
      "historical-lig-values": "[historical-ligatures|no-historical-ligatures]",
      "hsl()": "hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )",
      "hsla()": "hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",
      "hue": "<number>|<angle>",
      "hue-rotate()": "hue-rotate( <angle> )",
      "hue-interpolation-method": "[shorter|longer|increasing|decreasing] hue",
      "hwb()": "hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )",
      "hypot()": "hypot( <calc-sum># )",
      "image": "<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>",
      "image()": "image( <image-tags>? [<image-src>? , <color>?]! )",
      "image-set()": "image-set( <image-set-option># )",
      "image-set-option": "[<image>|<string>] [<resolution>||type( <string> )]",
      "image-src": "<url>|<string>",
      "image-tags": "ltr|rtl",
      "inflexible-breadth": "<length-percentage>|min-content|max-content|auto",
      "inset()": "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
      "invert()": "invert( <number-percentage> )",
      "keyframes-name": "<custom-ident>|<string>",
      "keyframe-block": "<keyframe-selector># { <declaration-list> }",
      "keyframe-block-list": "<keyframe-block>+",
      "keyframe-selector": "from|to|<percentage>|<timeline-range-name> <percentage>",
      "lab()": "lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
      "layer()": "layer( <layer-name> )",
      "layer-name": "<ident> ['.' <ident>]*",
      "lch()": "lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
      "leader()": "leader( <leader-type> )",
      "leader-type": "dotted|solid|space|<string>",
      "length-percentage": "<length>|<percentage>",
      "light-dark()": "light-dark( <color> , <color> )",
      "line-names": "'[' <custom-ident>* ']'",
      "line-name-list": "[<line-names>|<name-repeat>]+",
      "line-style": "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset",
      "line-width": "<length>|thin|medium|thick",
      "linear-color-hint": "<length-percentage>",
      "linear-color-stop": "<color> <color-stop-length>?",
      "linear-gradient()": "linear-gradient( [[<angle>|to <side-or-corner>]||<color-interpolation-method>]? , <color-stop-list> )",
      "log()": "log( <calc-sum> , <calc-sum>? )",
      "mask-layer": "<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>",
      "mask-position": "[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?",
      "mask-reference": "none|<image>|<mask-source>",
      "mask-source": "<url>",
      "masking-mode": "alpha|luminance|match-source",
      "matrix()": "matrix( <number>#{6} )",
      "matrix3d()": "matrix3d( <number>#{16} )",
      "max()": "max( <calc-sum># )",
      "media-and": "<media-in-parens> [and <media-in-parens>]+",
      "media-condition": "<media-not>|<media-and>|<media-or>|<media-in-parens>",
      "media-condition-without-or": "<media-not>|<media-and>|<media-in-parens>",
      "media-feature": "( [<mf-plain>|<mf-boolean>|<mf-range>] )",
      "media-in-parens": "( <media-condition> )|<media-feature>|<general-enclosed>",
      "media-not": "not <media-in-parens>",
      "media-or": "<media-in-parens> [or <media-in-parens>]+",
      "media-query": "<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?",
      "media-query-list": "<media-query>#",
      "media-type": "<ident>",
      "mf-boolean": "<mf-name>",
      "mf-name": "<ident>",
      "mf-plain": "<mf-name> : <mf-value>",
      "mf-range": "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
      "mf-value": "<number>|<dimension>|<ident>|<ratio>",
      "min()": "min( <calc-sum># )",
      "minmax()": "minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )",
      "mod()": "mod( <calc-sum> , <calc-sum> )",
      "name-repeat": "repeat( [<integer [1,\u221E]>|auto-fill] , <line-names>+ )",
      "named-color": "transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
      "namespace-prefix": "<ident>",
      "ns-prefix": "[<ident-token>|'*']? '|'",
      "number-percentage": "<number>|<percentage>",
      "numeric-figure-values": "[lining-nums|oldstyle-nums]",
      "numeric-fraction-values": "[diagonal-fractions|stacked-fractions]",
      "numeric-spacing-values": "[proportional-nums|tabular-nums]",
      "nth": "<an-plus-b>|even|odd",
      "opacity()": "opacity( [<number-percentage>] )",
      "overflow-position": "unsafe|safe",
      "outline-radius": "<length>|<percentage>",
      "page-body": "<declaration>? [; <page-body>]?|<page-margin-box> <page-body>",
      "page-margin-box": "<page-margin-box-type> '{' <declaration-list> '}'",
      "page-margin-box-type": "@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom",
      "page-selector-list": "[<page-selector>#]?",
      "page-selector": "<pseudo-page>+|<ident> <pseudo-page>*",
      "page-size": "A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger",
      "path()": "path( [<fill-rule> ,]? <string> )",
      "paint()": "paint( <ident> , <declaration-value>? )",
      "perspective()": "perspective( [<length [0,\u221E]>|none] )",
      "polygon()": "polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )",
      "polar-color-space": "hsl|hwb|lch|oklch",
      "position": "[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]",
      "pow()": "pow( <calc-sum> , <calc-sum> )",
      "pseudo-class-selector": "':' <ident-token>|':' <function-token> <any-value> ')'",
      "pseudo-element-selector": "':' <pseudo-class-selector>|<legacy-pseudo-element-selector>",
      "pseudo-page": ": [left|right|first|blank]",
      "quote": "open-quote|close-quote|no-open-quote|no-close-quote",
      "radial-gradient()": "radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
      "ratio": "<number [0,\u221E]> [/ <number [0,\u221E]>]?",
      "ray()": "ray( <angle>&&<ray-size>?&&contain?&&[at <position>]? )",
      "ray-size": "closest-side|closest-corner|farthest-side|farthest-corner|sides",
      "rectangular-color-space": "srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65",
      "relative-selector": "<combinator>? <complex-selector>",
      "relative-selector-list": "<relative-selector>#",
      "relative-size": "larger|smaller",
      "rem()": "rem( <calc-sum> , <calc-sum> )",
      "repeat-style": "repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}",
      "repeating-conic-gradient()": "repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
      "repeating-linear-gradient()": "repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
      "repeating-radial-gradient()": "repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
      "reversed-counter-name": "reversed( <counter-name> )",
      "rgb()": "rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )",
      "rgba()": "rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )",
      "rotate()": "rotate( [<angle>|<zero>] )",
      "rotate3d()": "rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )",
      "rotateX()": "rotateX( [<angle>|<zero>] )",
      "rotateY()": "rotateY( [<angle>|<zero>] )",
      "rotateZ()": "rotateZ( [<angle>|<zero>] )",
      "round()": "round( <rounding-strategy>? , <calc-sum> , <calc-sum> )",
      "rounding-strategy": "nearest|up|down|to-zero",
      "saturate()": "saturate( <number-percentage> )",
      "scale()": "scale( [<number>|<percentage>]#{1,2} )",
      "scale3d()": "scale3d( [<number>|<percentage>]#{3} )",
      "scaleX()": "scaleX( [<number>|<percentage>] )",
      "scaleY()": "scaleY( [<number>|<percentage>] )",
      "scaleZ()": "scaleZ( [<number>|<percentage>] )",
      "scroll()": "scroll( [<axis>||<scroller>]? )",
      "scroller": "root|nearest|self",
      "self-position": "center|start|end|self-start|self-end|flex-start|flex-end",
      "shape-radius": "<length-percentage>|closest-side|farthest-side",
      "sign()": "sign( <calc-sum> )",
      "skew()": "skew( [<angle>|<zero>] , [<angle>|<zero>]? )",
      "skewX()": "skewX( [<angle>|<zero>] )",
      "skewY()": "skewY( [<angle>|<zero>] )",
      "sepia()": "sepia( <number-percentage> )",
      "shadow": "inset?&&<length>{2,4}&&<color>?",
      "shadow-t": "[<length>{2,3}&&<color>?]",
      "shape": "rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )",
      "shape-box": "<box>|margin-box",
      "side-or-corner": "[left|right]||[top|bottom]",
      "sin()": "sin( <calc-sum> )",
      "single-animation": "<'animation-duration'>||<easing-function>||<'animation-delay'>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]||<single-animation-timeline>",
      "single-animation-direction": "normal|reverse|alternate|alternate-reverse",
      "single-animation-fill-mode": "none|forwards|backwards|both",
      "single-animation-iteration-count": "infinite|<number>",
      "single-animation-play-state": "running|paused",
      "single-animation-timeline": "auto|none|<dashed-ident>|<scroll()>|<view()>",
      "single-transition": "[none|<single-transition-property>]||<time>||<easing-function>||<time>||<transition-behavior-value>",
      "single-transition-property": "all|<custom-ident>",
      "size": "closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}",
      "sqrt()": "sqrt( <calc-sum> )",
      "step-position": "jump-start|jump-end|jump-none|jump-both|start|end",
      "step-timing-function": "step-start|step-end|steps( <integer> [, <step-position>]? )",
      "subclass-selector": "<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>",
      "supports-condition": "not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*",
      "supports-in-parens": "( <supports-condition> )|<supports-feature>|<general-enclosed>",
      "supports-feature": "<supports-decl>|<supports-selector-fn>",
      "supports-decl": "( <declaration> )",
      "supports-selector-fn": "selector( <complex-selector> )",
      "symbol": "<string>|<image>|<custom-ident>",
      "system-color": "AccentColor|AccentColorText|ActiveText|ButtonBorder|ButtonFace|ButtonText|Canvas|CanvasText|Field|FieldText|GrayText|Highlight|HighlightText|LinkText|Mark|MarkText|SelectedItem|SelectedItemText|VisitedText",
      "tan()": "tan( <calc-sum> )",
      "target": "<target-counter()>|<target-counters()>|<target-text()>",
      "target-counter()": "target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )",
      "target-counters()": "target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )",
      "target-text()": "target-text( [<string>|<url>] , [content|before|after|first-letter]? )",
      "time-percentage": "<time>|<percentage>",
      "timeline-range-name": "cover|contain|entry|exit|entry-crossing|exit-crossing",
      "easing-function": "linear|<cubic-bezier-timing-function>|<step-timing-function>",
      "track-breadth": "<length-percentage>|<flex>|min-content|max-content|auto",
      "track-list": "[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?",
      "track-repeat": "repeat( [<integer [1,\u221E]>] , [<line-names>? <track-size>]+ <line-names>? )",
      "track-size": "<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )",
      "transform-function": "<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>",
      "transform-list": "<transform-function>+",
      "transition-behavior-value": "normal|allow-discrete",
      "translate()": "translate( <length-percentage> , <length-percentage>? )",
      "translate3d()": "translate3d( <length-percentage> , <length-percentage> , <length> )",
      "translateX()": "translateX( <length-percentage> )",
      "translateY()": "translateY( <length-percentage> )",
      "translateZ()": "translateZ( <length> )",
      "type-or-unit": "string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%",
      "type-selector": "<wq-name>|<ns-prefix>? '*'",
      "var()": "var( <custom-property-name> , <declaration-value>? )",
      "view()": "view( [<axis>||<'view-timeline-inset'>]? )",
      "viewport-length": "auto|<length-percentage>",
      "visual-box": "content-box|padding-box|border-box",
      "wq-name": "<ns-prefix>? <ident-token>",
      "-legacy-gradient": "<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>",
      "-legacy-linear-gradient": "-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )",
      "-legacy-repeating-linear-gradient": "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
      "-legacy-linear-gradient-arguments": "[<angle>|<side-or-corner>]? , <color-stop-list>",
      "-legacy-radial-gradient": "-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )",
      "-legacy-repeating-radial-gradient": "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
      "-legacy-radial-gradient-arguments": "[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>",
      "-legacy-radial-gradient-size": "closest-side|closest-corner|farthest-side|farthest-corner|contain|cover",
      "-legacy-radial-gradient-shape": "circle|ellipse",
      "-non-standard-font": "-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body",
      "-non-standard-color": "-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text",
      "-non-standard-image-rendering": "optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast",
      "-non-standard-overflow": "overlay|-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable",
      "-non-standard-size": "intrinsic|min-intrinsic|-webkit-fill-available|-webkit-fit-content|-webkit-min-content|-webkit-max-content|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content",
      "-webkit-gradient()": "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )",
      "-webkit-gradient-color-stop": "from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )",
      "-webkit-gradient-point": "[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]",
      "-webkit-gradient-radius": "<length>|<percentage>",
      "-webkit-gradient-type": "linear|radial",
      "-webkit-mask-box-repeat": "repeat|stretch|round",
      "-ms-filter-function-list": "<-ms-filter-function>+",
      "-ms-filter-function": "<-ms-filter-function-progid>|<-ms-filter-function-legacy>",
      "-ms-filter-function-progid": "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
      "-ms-filter-function-legacy": "<ident-token>|<function-token> <any-value>? )",
      "absolute-color-base": "<hex-color>|<absolute-color-function>|<named-color>|transparent",
      "absolute-color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
      "age": "child|young|old",
      "anchor-name": "<dashed-ident>",
      "attr-name": "<wq-name>",
      "attr-fallback": "<any-value>",
      "bg-clip": "<box>|border|text",
      "bottom": "<length>|auto",
      "container-name": "<custom-ident>",
      "container-condition": "not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]",
      "coord-box": "content-box|padding-box|border-box|fill-box|stroke-box|view-box",
      "generic-voice": "[<age>? <gender> <integer>?]",
      "gender": "male|female|neutral",
      "generic-script-specific": "generic( kai )|generic( fangsong )|generic( nastaliq )",
      "generic-complete": "serif|sans-serif|system-ui|cursive|fantasy|math|monospace",
      "generic-incomplete": "ui-serif|ui-sans-serif|ui-monospace|ui-rounded",
      "-non-standard-generic-family": "-apple-system|BlinkMacSystemFont",
      "left": "<length>|auto",
      "color-base": "<hex-color>|<color-function>|<named-color>|<color-mix()>|transparent",
      "color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
      "device-cmyk()": "<legacy-device-cmyk-syntax>|<modern-device-cmyk-syntax>",
      "legacy-device-cmyk-syntax": "device-cmyk( <number>#{4} )",
      "modern-device-cmyk-syntax": "device-cmyk( <cmyk-component>{4} [/ [<alpha-value>|none]]? )",
      "cmyk-component": "<number>|<percentage>|none",
      "color-mix()": "color-mix( <color-interpolation-method> , [<color>&&<percentage [0,100]>?]#{2} )",
      "color-space": "<rectangular-color-space>|<polar-color-space>|<custom-color-space>",
      "custom-color-space": "<dashed-ident>",
      "paint": "none|<color>|<url> [none|<color>]?|context-fill|context-stroke",
      "palette-identifier": "<dashed-ident>",
      "right": "<length>|auto",
      "scope-start": "<forgiving-selector-list>",
      "scope-end": "<forgiving-selector-list>",
      "forgiving-selector-list": "<complex-real-selector-list>",
      "forgiving-relative-selector-list": "<relative-real-selector-list>",
      "selector-list": "<complex-selector-list>",
      "complex-real-selector-list": "<complex-real-selector>#",
      "simple-selector-list": "<simple-selector>#",
      "relative-real-selector-list": "<relative-real-selector>#",
      "complex-selector-unit": "[<compound-selector>? <pseudo-compound-selector>*]!",
      "complex-real-selector": "<compound-selector> [<combinator>? <compound-selector>]*",
      "relative-real-selector": "<combinator>? <complex-real-selector>",
      "pseudo-compound-selector": "<pseudo-element-selector> <pseudo-class-selector>*",
      "simple-selector": "<type-selector>|<subclass-selector>",
      "legacy-pseudo-element-selector": "':' [before|after|first-line|first-letter]",
      "single-animation-composition": "replace|add|accumulate",
      "svg-length": "<percentage>|<length>|<number>",
      "svg-writing-mode": "lr-tb|rl-tb|tb-rl|lr|rl|tb",
      "top": "<length>|auto",
      "x": "<number>",
      "y": "<number>",
      "declaration": "<ident-token> : <declaration-value>? ['!' important]?",
      "declaration-list": "[<declaration>? ';']* <declaration>?",
      "url": "url( <string> <url-modifier>* )|<url-token>",
      "url-modifier": "<ident>|<function-token> <any-value> )",
      "number-zero-one": "<number [0,1]>",
      "number-one-or-greater": "<number [1,\u221E]>",
      "color()": "color( <colorspace-params> [/ [<alpha-value>|none]]? )",
      "colorspace-params": "[<predefined-rgb-params>|<xyz-params>]",
      "predefined-rgb-params": "<predefined-rgb> [<number>|<percentage>|none]{3}",
      "predefined-rgb": "srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020",
      "xyz-params": "<xyz-space> [<number>|<percentage>|none]{3}",
      "xyz-space": "xyz|xyz-d50|xyz-d65",
      "oklab()": "oklab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
      "oklch()": "oklch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
      "offset-path": "<ray()>|<url>|<basic-shape>",
      "rect()": "rect( [<length-percentage>|auto]{4} [round <'border-radius'>]? )",
      "xywh()": "xywh( <length-percentage>{2} <length-percentage [0,\u221E]>{2} [round <'border-radius'>]? )",
      "query-in-parens": "( <container-condition> )|( <size-feature> )|style( <style-query> )|<general-enclosed>",
      "size-feature": "<mf-plain>|<mf-boolean>|<mf-range>",
      "style-feature": "<declaration>",
      "style-query": "<style-condition>|<style-feature>",
      "style-condition": "not <style-in-parens>|<style-in-parens> [[and <style-in-parens>]*|[or <style-in-parens>]*]",
      "style-in-parens": "( <style-condition> )|( <style-feature> )|<general-enclosed>",
      "-non-standard-display": "-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box",
      "inset-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
      "position-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|center|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|center|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
      "anchor()": "anchor( <anchor-element>?&&<anchor-side> , <length-percentage>? )",
      "anchor-side": "inside|outside|top|left|right|bottom|start|end|self-start|self-end|<percentage>|center",
      "anchor-size()": "anchor-size( [<anchor-element>||<anchor-size>]? , <length-percentage>? )",
      "anchor-size": "width|height|block|inline|self-block|self-inline",
      "anchor-element": "<dashed-ident>",
      "try-size": "most-width|most-height|most-block-size|most-inline-size",
      "try-tactic": "flip-block||flip-inline||flip-start",
      "font-variant-css2": "normal|small-caps",
      "font-width-css3": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
      "system-family-name": "caption|icon|menu|message-box|small-caption|status-bar"
    },
    "properties": {
      "--*": "<declaration-value>",
      "-ms-accelerator": "false|true",
      "-ms-block-progression": "tb|rl|bt|lr",
      "-ms-content-zoom-chaining": "none|chained",
      "-ms-content-zooming": "none|zoom",
      "-ms-content-zoom-limit": "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
      "-ms-content-zoom-limit-max": "<percentage>",
      "-ms-content-zoom-limit-min": "<percentage>",
      "-ms-content-zoom-snap": "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
      "-ms-content-zoom-snap-points": "snapInterval( <percentage> , <percentage> )|snapList( <percentage># )",
      "-ms-content-zoom-snap-type": "none|proximity|mandatory",
      "-ms-filter": "<string>",
      "-ms-flow-from": "[none|<custom-ident>]#",
      "-ms-flow-into": "[none|<custom-ident>]#",
      "-ms-grid-columns": "none|<track-list>|<auto-track-list>",
      "-ms-grid-rows": "none|<track-list>|<auto-track-list>",
      "-ms-high-contrast-adjust": "auto|none",
      "-ms-hyphenate-limit-chars": "auto|<integer>{1,3}",
      "-ms-hyphenate-limit-lines": "no-limit|<integer>",
      "-ms-hyphenate-limit-zone": "<percentage>|<length>",
      "-ms-ime-align": "auto|after",
      "-ms-overflow-style": "auto|none|scrollbar|-ms-autohiding-scrollbar",
      "-ms-scrollbar-3dlight-color": "<color>",
      "-ms-scrollbar-arrow-color": "<color>",
      "-ms-scrollbar-base-color": "<color>",
      "-ms-scrollbar-darkshadow-color": "<color>",
      "-ms-scrollbar-face-color": "<color>",
      "-ms-scrollbar-highlight-color": "<color>",
      "-ms-scrollbar-shadow-color": "<color>",
      "-ms-scrollbar-track-color": "<color>",
      "-ms-scroll-chaining": "chained|none",
      "-ms-scroll-limit": "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
      "-ms-scroll-limit-x-max": "auto|<length>",
      "-ms-scroll-limit-x-min": "<length>",
      "-ms-scroll-limit-y-max": "auto|<length>",
      "-ms-scroll-limit-y-min": "<length>",
      "-ms-scroll-rails": "none|railed",
      "-ms-scroll-snap-points-x": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
      "-ms-scroll-snap-points-y": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
      "-ms-scroll-snap-type": "none|proximity|mandatory",
      "-ms-scroll-snap-x": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
      "-ms-scroll-snap-y": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
      "-ms-scroll-translation": "none|vertical-to-horizontal",
      "-ms-text-autospace": "none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space",
      "-ms-touch-select": "grippers|none",
      "-ms-user-select": "none|element|text",
      "-ms-wrap-flow": "auto|both|start|end|maximum|clear",
      "-ms-wrap-margin": "<length>",
      "-ms-wrap-through": "wrap|none",
      "-moz-appearance": "none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized",
      "-moz-binding": "<url>|none",
      "-moz-border-bottom-colors": "<color>+|none",
      "-moz-border-left-colors": "<color>+|none",
      "-moz-border-right-colors": "<color>+|none",
      "-moz-border-top-colors": "<color>+|none",
      "-moz-context-properties": "none|[fill|fill-opacity|stroke|stroke-opacity]#",
      "-moz-float-edge": "border-box|content-box|margin-box|padding-box",
      "-moz-force-broken-image-icon": "0|1",
      "-moz-image-region": "<shape>|auto",
      "-moz-orient": "inline|block|horizontal|vertical",
      "-moz-outline-radius": "<outline-radius>{1,4} [/ <outline-radius>{1,4}]?",
      "-moz-outline-radius-bottomleft": "<outline-radius>",
      "-moz-outline-radius-bottomright": "<outline-radius>",
      "-moz-outline-radius-topleft": "<outline-radius>",
      "-moz-outline-radius-topright": "<outline-radius>",
      "-moz-stack-sizing": "ignore|stretch-to-fit",
      "-moz-text-blink": "none|blink",
      "-moz-user-focus": "ignore|normal|select-after|select-before|select-menu|select-same|select-all|none",
      "-moz-user-input": "auto|none|enabled|disabled",
      "-moz-user-modify": "read-only|read-write|write-only",
      "-moz-window-dragging": "drag|no-drag",
      "-moz-window-shadow": "default|menu|tooltip|sheet|none",
      "-webkit-appearance": "none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button",
      "-webkit-border-before": "<'border-width'>||<'border-style'>||<color>",
      "-webkit-border-before-color": "<color>",
      "-webkit-border-before-style": "<'border-style'>",
      "-webkit-border-before-width": "<'border-width'>",
      "-webkit-box-reflect": "[above|below|right|left]? <length>? <image>?",
      "-webkit-line-clamp": "none|<integer>",
      "-webkit-mask": "[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#",
      "-webkit-mask-attachment": "<attachment>#",
      "-webkit-mask-clip": "[<box>|border|padding|content|text]#",
      "-webkit-mask-composite": "<composite-style>#",
      "-webkit-mask-image": "<mask-reference>#",
      "-webkit-mask-origin": "[<box>|border|padding|content]#",
      "-webkit-mask-position": "<position>#",
      "-webkit-mask-position-x": "[<length-percentage>|left|center|right]#",
      "-webkit-mask-position-y": "[<length-percentage>|top|center|bottom]#",
      "-webkit-mask-repeat": "<repeat-style>#",
      "-webkit-mask-repeat-x": "repeat|no-repeat|space|round",
      "-webkit-mask-repeat-y": "repeat|no-repeat|space|round",
      "-webkit-mask-size": "<bg-size>#",
      "-webkit-overflow-scrolling": "auto|touch",
      "-webkit-tap-highlight-color": "<color>",
      "-webkit-text-fill-color": "<color>",
      "-webkit-text-stroke": "<length>||<color>",
      "-webkit-text-stroke-color": "<color>",
      "-webkit-text-stroke-width": "<length>",
      "-webkit-touch-callout": "default|none",
      "-webkit-user-modify": "read-only|read-write|read-write-plaintext-only",
      "accent-color": "auto|<color>",
      "align-content": "normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>",
      "align-items": "normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]",
      "align-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>",
      "align-tracks": "[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",
      "all": "initial|inherit|unset|revert|revert-layer",
      "anchor-name": "none|<dashed-ident>#",
      "anchor-scope": "none|all|<dashed-ident>#",
      "animation": "<single-animation>#",
      "animation-composition": "<single-animation-composition>#",
      "animation-delay": "<time>#",
      "animation-direction": "<single-animation-direction>#",
      "animation-duration": "<time>#",
      "animation-fill-mode": "<single-animation-fill-mode>#",
      "animation-iteration-count": "<single-animation-iteration-count>#",
      "animation-name": "[none|<keyframes-name>]#",
      "animation-play-state": "<single-animation-play-state>#",
      "animation-range": "[<'animation-range-start'> <'animation-range-end'>?]#",
      "animation-range-end": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
      "animation-range-start": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
      "animation-timing-function": "<easing-function>#",
      "animation-timeline": "<single-animation-timeline>#",
      "appearance": "none|auto|textfield|menulist-button|<compat-auto>",
      "aspect-ratio": "auto||<ratio>",
      "azimuth": "<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards",
      "backdrop-filter": "none|<filter-function-list>",
      "backface-visibility": "visible|hidden",
      "background": "[<bg-layer> ,]* <final-bg-layer>",
      "background-attachment": "<attachment>#",
      "background-blend-mode": "<blend-mode>#",
      "background-clip": "<bg-clip>#",
      "background-color": "<color>",
      "background-image": "<bg-image>#",
      "background-origin": "<box>#",
      "background-position": "<bg-position>#",
      "background-position-x": "[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#",
      "background-position-y": "[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#",
      "background-repeat": "<repeat-style>#",
      "background-size": "<bg-size>#",
      "block-size": "<'width'>",
      "border": "<line-width>||<line-style>||<color>",
      "border-block": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-color": "<'border-top-color'>{1,2}",
      "border-block-style": "<'border-top-style'>",
      "border-block-width": "<'border-top-width'>",
      "border-block-end": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-end-color": "<'border-top-color'>",
      "border-block-end-style": "<'border-top-style'>",
      "border-block-end-width": "<'border-top-width'>",
      "border-block-start": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-start-color": "<'border-top-color'>",
      "border-block-start-style": "<'border-top-style'>",
      "border-block-start-width": "<'border-top-width'>",
      "border-bottom": "<line-width>||<line-style>||<color>",
      "border-bottom-color": "<'border-top-color'>",
      "border-bottom-left-radius": "<length-percentage>{1,2}",
      "border-bottom-right-radius": "<length-percentage>{1,2}",
      "border-bottom-style": "<line-style>",
      "border-bottom-width": "<line-width>",
      "border-collapse": "collapse|separate",
      "border-color": "<color>{1,4}",
      "border-end-end-radius": "<length-percentage>{1,2}",
      "border-end-start-radius": "<length-percentage>{1,2}",
      "border-image": "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
      "border-image-outset": "[<length>|<number>]{1,4}",
      "border-image-repeat": "[stretch|repeat|round|space]{1,2}",
      "border-image-slice": "<number-percentage>{1,4}&&fill?",
      "border-image-source": "none|<image>",
      "border-image-width": "[<length-percentage>|<number>|auto]{1,4}",
      "border-inline": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-end": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-color": "<'border-top-color'>{1,2}",
      "border-inline-style": "<'border-top-style'>",
      "border-inline-width": "<'border-top-width'>",
      "border-inline-end-color": "<'border-top-color'>",
      "border-inline-end-style": "<'border-top-style'>",
      "border-inline-end-width": "<'border-top-width'>",
      "border-inline-start": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-start-color": "<'border-top-color'>",
      "border-inline-start-style": "<'border-top-style'>",
      "border-inline-start-width": "<'border-top-width'>",
      "border-left": "<line-width>||<line-style>||<color>",
      "border-left-color": "<color>",
      "border-left-style": "<line-style>",
      "border-left-width": "<line-width>",
      "border-radius": "<length-percentage>{1,4} [/ <length-percentage>{1,4}]?",
      "border-right": "<line-width>||<line-style>||<color>",
      "border-right-color": "<color>",
      "border-right-style": "<line-style>",
      "border-right-width": "<line-width>",
      "border-spacing": "<length> <length>?",
      "border-start-end-radius": "<length-percentage>{1,2}",
      "border-start-start-radius": "<length-percentage>{1,2}",
      "border-style": "<line-style>{1,4}",
      "border-top": "<line-width>||<line-style>||<color>",
      "border-top-color": "<color>",
      "border-top-left-radius": "<length-percentage>{1,2}",
      "border-top-right-radius": "<length-percentage>{1,2}",
      "border-top-style": "<line-style>",
      "border-top-width": "<line-width>",
      "border-width": "<line-width>{1,4}",
      "bottom": "<length>|<percentage>|auto",
      "box-align": "start|center|end|baseline|stretch",
      "box-decoration-break": "slice|clone",
      "box-direction": "normal|reverse|inherit",
      "box-flex": "<number>",
      "box-flex-group": "<integer>",
      "box-lines": "single|multiple",
      "box-ordinal-group": "<integer>",
      "box-orient": "horizontal|vertical|inline-axis|block-axis|inherit",
      "box-pack": "start|center|end|justify",
      "box-shadow": "none|<shadow>#",
      "box-sizing": "content-box|border-box",
      "break-after": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
      "break-before": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
      "break-inside": "auto|avoid|avoid-page|avoid-column|avoid-region",
      "caption-side": "top|bottom|block-start|block-end|inline-start|inline-end",
      "caret": "<'caret-color'>||<'caret-shape'>",
      "caret-color": "auto|<color>",
      "caret-shape": "auto|bar|block|underscore",
      "clear": "none|left|right|both|inline-start|inline-end",
      "clip": "<shape>|auto",
      "clip-path": "<clip-source>|[<basic-shape>||<geometry-box>]|none",
      "clip-rule": "nonzero|evenodd",
      "color": "<color>",
      "color-interpolation-filters": "auto|sRGB|linearRGB",
      "color-scheme": "normal|[light|dark|<custom-ident>]+&&only?",
      "column-count": "<integer>|auto",
      "column-fill": "auto|balance",
      "column-gap": "normal|<length-percentage>",
      "column-rule": "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
      "column-rule-color": "<color>",
      "column-rule-style": "<'border-style'>",
      "column-rule-width": "<'border-width'>",
      "column-span": "none|all",
      "column-width": "<length>|auto",
      "columns": "<'column-width'>||<'column-count'>",
      "contain": "none|strict|content|[[size||inline-size]||layout||style||paint]",
      "contain-intrinsic-size": "[auto? [none|<length>]]{1,2}",
      "contain-intrinsic-block-size": "auto? [none|<length>]",
      "contain-intrinsic-height": "auto? [none|<length>]",
      "contain-intrinsic-inline-size": "auto? [none|<length>]",
      "contain-intrinsic-width": "auto? [none|<length>]",
      "container": "<'container-name'> [/ <'container-type'>]?",
      "container-name": "none|<custom-ident>+",
      "container-type": "normal||[size|inline-size]",
      "content": "normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?",
      "content-visibility": "visible|auto|hidden",
      "counter-increment": "[<counter-name> <integer>?]+|none",
      "counter-reset": "[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none",
      "counter-set": "[<counter-name> <integer>?]+|none",
      "cursor": "[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",
      "d": "none|path( <string> )",
      "cx": "<length>|<percentage>",
      "cy": "<length>|<percentage>",
      "direction": "ltr|rtl",
      "display": "[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>",
      "dominant-baseline": "auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",
      "empty-cells": "show|hide",
      "field-sizing": "content|fixed",
      "fill": "<paint>",
      "fill-opacity": "<number-zero-one>",
      "fill-rule": "nonzero|evenodd",
      "filter": "none|<filter-function-list>|<-ms-filter-function-list>",
      "flex": "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
      "flex-basis": "content|<'width'>",
      "flex-direction": "row|row-reverse|column|column-reverse",
      "flex-flow": "<'flex-direction'>||<'flex-wrap'>",
      "flex-grow": "<number>",
      "flex-shrink": "<number>",
      "flex-wrap": "nowrap|wrap|wrap-reverse",
      "float": "left|right|none|inline-start|inline-end",
      "font": "[[<'font-style'>||<font-variant-css2>||<'font-weight'>||<font-width-css3>]? <'font-size'> [/ <'line-height'>]? <'font-family'>#]|<system-family-name>|<-non-standard-font>",
      "font-family": "[<family-name>|<generic-family>]#",
      "font-feature-settings": "normal|<feature-tag-value>#",
      "font-kerning": "auto|normal|none",
      "font-language-override": "normal|<string>",
      "font-optical-sizing": "auto|none",
      "font-palette": "normal|light|dark|<palette-identifier>",
      "font-variation-settings": "normal|[<string> <number>]#",
      "font-size": "<absolute-size>|<relative-size>|<length-percentage>",
      "font-size-adjust": "none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]",
      "font-smooth": "auto|never|always|<absolute-size>|<length>",
      "font-stretch": "<font-stretch-absolute>",
      "font-style": "normal|italic|oblique <angle>?",
      "font-synthesis": "none|[weight||style||small-caps||position]",
      "font-synthesis-position": "auto|none",
      "font-synthesis-small-caps": "auto|none",
      "font-synthesis-style": "auto|none",
      "font-synthesis-weight": "auto|none",
      "font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
      "font-variant-alternates": "normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]",
      "font-variant-caps": "normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps",
      "font-variant-east-asian": "normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]",
      "font-variant-emoji": "normal|text|emoji|unicode",
      "font-variant-ligatures": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]",
      "font-variant-numeric": "normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]",
      "font-variant-position": "normal|sub|super",
      "font-weight": "<font-weight-absolute>|bolder|lighter",
      "forced-color-adjust": "auto|none|preserve-parent-color",
      "gap": "<'row-gap'> <'column-gap'>?",
      "grid": "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
      "grid-area": "<grid-line> [/ <grid-line>]{0,3}",
      "grid-auto-columns": "<track-size>+",
      "grid-auto-flow": "[row|column]||dense",
      "grid-auto-rows": "<track-size>+",
      "grid-column": "<grid-line> [/ <grid-line>]?",
      "grid-column-end": "<grid-line>",
      "grid-column-gap": "<length-percentage>",
      "grid-column-start": "<grid-line>",
      "grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
      "grid-row": "<grid-line> [/ <grid-line>]?",
      "grid-row-end": "<grid-line>",
      "grid-row-gap": "<length-percentage>",
      "grid-row-start": "<grid-line>",
      "grid-template": "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
      "grid-template-areas": "none|<string>+",
      "grid-template-columns": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
      "grid-template-rows": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
      "hanging-punctuation": "none|[first||[force-end|allow-end]||last]",
      "height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "hyphenate-character": "auto|<string>",
      "hyphenate-limit-chars": "[auto|<integer>]{1,3}",
      "hyphens": "none|manual|auto",
      "image-orientation": "from-image|<angle>|[<angle>? flip]",
      "image-rendering": "auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>",
      "image-resolution": "[from-image||<resolution>]&&snap?",
      "ime-mode": "auto|normal|active|inactive|disabled",
      "initial-letter": "normal|[<number> <integer>?]",
      "initial-letter-align": "[auto|alphabetic|hanging|ideographic]",
      "inline-size": "<'width'>",
      "input-security": "auto|none",
      "inset": "<'top'>{1,4}",
      "inset-block": "<'top'>{1,2}",
      "inset-block-end": "<'top'>",
      "inset-block-start": "<'top'>",
      "inset-inline": "<'top'>{1,2}",
      "inset-inline-end": "<'top'>",
      "inset-inline-start": "<'top'>",
      "interpolate-size": "numeric-only|allow-keywords",
      "isolation": "auto|isolate",
      "justify-content": "normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]",
      "justify-items": "normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]",
      "justify-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]",
      "justify-tracks": "[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",
      "left": "<length>|<percentage>|auto",
      "letter-spacing": "normal|<length-percentage>",
      "line-break": "auto|loose|normal|strict|anywhere",
      "line-clamp": "none|<integer>",
      "line-height": "normal|<number>|<length>|<percentage>",
      "line-height-step": "<length>",
      "list-style": "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
      "list-style-image": "<image>|none",
      "list-style-position": "inside|outside",
      "list-style-type": "<counter-style>|<string>|none",
      "margin": "[<length>|<percentage>|auto]{1,4}",
      "margin-block": "<'margin-left'>{1,2}",
      "margin-block-end": "<'margin-left'>",
      "margin-block-start": "<'margin-left'>",
      "margin-bottom": "<length>|<percentage>|auto",
      "margin-inline": "<'margin-left'>{1,2}",
      "margin-inline-end": "<'margin-left'>",
      "margin-inline-start": "<'margin-left'>",
      "margin-left": "<length>|<percentage>|auto",
      "margin-right": "<length>|<percentage>|auto",
      "margin-top": "<length>|<percentage>|auto",
      "margin-trim": "none|in-flow|all",
      "marker": "none|<url>",
      "marker-end": "none|<url>",
      "marker-mid": "none|<url>",
      "marker-start": "none|<url>",
      "mask": "<mask-layer>#",
      "mask-border": "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
      "mask-border-mode": "luminance|alpha",
      "mask-border-outset": "[<length>|<number>]{1,4}",
      "mask-border-repeat": "[stretch|repeat|round|space]{1,2}",
      "mask-border-slice": "<number-percentage>{1,4} fill?",
      "mask-border-source": "none|<image>",
      "mask-border-width": "[<length-percentage>|<number>|auto]{1,4}",
      "mask-clip": "[<geometry-box>|no-clip]#",
      "mask-composite": "<compositing-operator>#",
      "mask-image": "<mask-reference>#",
      "mask-mode": "<masking-mode>#",
      "mask-origin": "<geometry-box>#",
      "mask-position": "<position>#",
      "mask-repeat": "<repeat-style>#",
      "mask-size": "<bg-size>#",
      "mask-type": "luminance|alpha",
      "masonry-auto-flow": "[pack|next]||[definite-first|ordered]",
      "math-depth": "auto-add|add( <integer> )|<integer>",
      "math-shift": "normal|compact",
      "math-style": "normal|compact",
      "max-block-size": "<'max-width'>",
      "max-height": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "max-inline-size": "<'max-width'>",
      "max-lines": "none|<integer>",
      "max-width": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "min-block-size": "<'min-width'>",
      "min-height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "min-inline-size": "<'min-width'>",
      "min-width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "mix-blend-mode": "<blend-mode>|plus-lighter",
      "object-fit": "fill|contain|cover|none|scale-down",
      "object-position": "<position>",
      "offset": "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
      "offset-anchor": "auto|<position>",
      "offset-distance": "<length-percentage>",
      "offset-path": "none|<offset-path>||<coord-box>",
      "offset-position": "normal|auto|<position>",
      "offset-rotate": "[auto|reverse]||<angle>",
      "opacity": "<alpha-value>",
      "order": "<integer>",
      "orphans": "<integer>",
      "outline": "[<'outline-width'>||<'outline-style'>||<'outline-color'>]",
      "outline-color": "auto|<color>",
      "outline-offset": "<length>",
      "outline-style": "auto|<'border-style'>",
      "outline-width": "<line-width>",
      "overflow": "[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>",
      "overflow-anchor": "auto|none",
      "overflow-block": "visible|hidden|clip|scroll|auto",
      "overflow-clip-box": "padding-box|content-box",
      "overflow-clip-margin": "<visual-box>||<length [0,\u221E]>",
      "overflow-inline": "visible|hidden|clip|scroll|auto",
      "overflow-wrap": "normal|break-word|anywhere",
      "overflow-x": "visible|hidden|clip|scroll|auto",
      "overflow-y": "visible|hidden|clip|scroll|auto",
      "overlay": "none|auto",
      "overscroll-behavior": "[contain|none|auto]{1,2}",
      "overscroll-behavior-block": "contain|none|auto",
      "overscroll-behavior-inline": "contain|none|auto",
      "overscroll-behavior-x": "contain|none|auto",
      "overscroll-behavior-y": "contain|none|auto",
      "padding": "[<length>|<percentage>]{1,4}",
      "padding-block": "<'padding-left'>{1,2}",
      "padding-block-end": "<'padding-left'>",
      "padding-block-start": "<'padding-left'>",
      "padding-bottom": "<length>|<percentage>",
      "padding-inline": "<'padding-left'>{1,2}",
      "padding-inline-end": "<'padding-left'>",
      "padding-inline-start": "<'padding-left'>",
      "padding-left": "<length>|<percentage>",
      "padding-right": "<length>|<percentage>",
      "padding-top": "<length>|<percentage>",
      "page": "auto|<custom-ident>",
      "page-break-after": "auto|always|avoid|left|right|recto|verso",
      "page-break-before": "auto|always|avoid|left|right|recto|verso",
      "page-break-inside": "auto|avoid",
      "paint-order": "normal|[fill||stroke||markers]",
      "perspective": "none|<length>",
      "perspective-origin": "<position>",
      "place-content": "<'align-content'> <'justify-content'>?",
      "place-items": "<'align-items'> <'justify-items'>?",
      "place-self": "<'align-self'> <'justify-self'>?",
      "pointer-events": "auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",
      "position": "static|relative|absolute|sticky|fixed|-webkit-sticky",
      "position-anchor": "auto|<anchor-name>",
      "position-area": "none|<position-area>",
      "position-try": "<'position-try-order'>? <'position-try-fallbacks'>",
      "position-try-fallbacks": "none|[[<dashed-ident>||<try-tactic>]|<'position-area'>]#",
      "position-try-order": "normal|<try-size>",
      "position-visibility": "always|[anchors-valid||anchors-visible||no-overflow]",
      "print-color-adjust": "economy|exact",
      "quotes": "none|auto|[<string> <string>]+",
      "r": "<length>|<percentage>",
      "resize": "none|both|horizontal|vertical|block|inline",
      "right": "<length>|<percentage>|auto",
      "rotate": "none|<angle>|[x|y|z|<number>{3}]&&<angle>",
      "row-gap": "normal|<length-percentage>",
      "ruby-align": "start|center|space-between|space-around",
      "ruby-merge": "separate|collapse|auto",
      "ruby-position": "[alternate||[over|under]]|inter-character",
      "rx": "<length>|<percentage>",
      "ry": "<length>|<percentage>",
      "scale": "none|[<number>|<percentage>]{1,3}",
      "scrollbar-color": "auto|<color>{2}",
      "scrollbar-gutter": "auto|stable&&both-edges?",
      "scrollbar-width": "auto|thin|none",
      "scroll-behavior": "auto|smooth",
      "scroll-margin": "<length>{1,4}",
      "scroll-margin-block": "<length>{1,2}",
      "scroll-margin-block-start": "<length>",
      "scroll-margin-block-end": "<length>",
      "scroll-margin-bottom": "<length>",
      "scroll-margin-inline": "<length>{1,2}",
      "scroll-margin-inline-start": "<length>",
      "scroll-margin-inline-end": "<length>",
      "scroll-margin-left": "<length>",
      "scroll-margin-right": "<length>",
      "scroll-margin-top": "<length>",
      "scroll-padding": "[auto|<length-percentage>]{1,4}",
      "scroll-padding-block": "[auto|<length-percentage>]{1,2}",
      "scroll-padding-block-start": "auto|<length-percentage>",
      "scroll-padding-block-end": "auto|<length-percentage>",
      "scroll-padding-bottom": "auto|<length-percentage>",
      "scroll-padding-inline": "[auto|<length-percentage>]{1,2}",
      "scroll-padding-inline-start": "auto|<length-percentage>",
      "scroll-padding-inline-end": "auto|<length-percentage>",
      "scroll-padding-left": "auto|<length-percentage>",
      "scroll-padding-right": "auto|<length-percentage>",
      "scroll-padding-top": "auto|<length-percentage>",
      "scroll-snap-align": "[none|start|end|center]{1,2}",
      "scroll-snap-coordinate": "none|<position>#",
      "scroll-snap-destination": "<position>",
      "scroll-snap-points-x": "none|repeat( <length-percentage> )",
      "scroll-snap-points-y": "none|repeat( <length-percentage> )",
      "scroll-snap-stop": "normal|always",
      "scroll-snap-type": "none|[x|y|block|inline|both] [mandatory|proximity]?",
      "scroll-snap-type-x": "none|mandatory|proximity",
      "scroll-snap-type-y": "none|mandatory|proximity",
      "scroll-timeline": "[<'scroll-timeline-name'>||<'scroll-timeline-axis'>]#",
      "scroll-timeline-axis": "[block|inline|x|y]#",
      "scroll-timeline-name": "[none|<dashed-ident>]#",
      "shape-image-threshold": "<alpha-value>",
      "shape-margin": "<length-percentage>",
      "shape-outside": "none|[<shape-box>||<basic-shape>]|<image>",
      "shape-rendering": "auto|optimizeSpeed|crispEdges|geometricPrecision",
      "stroke": "<paint>",
      "stroke-dasharray": "none|[<svg-length>+]#",
      "stroke-dashoffset": "<svg-length>",
      "stroke-linecap": "butt|round|square",
      "stroke-linejoin": "miter|round|bevel",
      "stroke-miterlimit": "<number-one-or-greater>",
      "stroke-opacity": "<'opacity'>",
      "stroke-width": "<svg-length>",
      "tab-size": "<integer>|<length>",
      "table-layout": "auto|fixed",
      "text-align": "start|end|left|right|center|justify|match-parent",
      "text-align-last": "auto|start|end|left|right|center|justify",
      "text-anchor": "start|middle|end",
      "text-combine-upright": "none|all|[digits <integer>?]",
      "text-decoration": "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
      "text-decoration-color": "<color>",
      "text-decoration-line": "none|[underline||overline||line-through||blink]|spelling-error|grammar-error",
      "text-decoration-skip": "none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]",
      "text-decoration-skip-ink": "auto|all|none",
      "text-decoration-style": "solid|double|dotted|dashed|wavy",
      "text-decoration-thickness": "auto|from-font|<length>|<percentage>",
      "text-emphasis": "<'text-emphasis-style'>||<'text-emphasis-color'>",
      "text-emphasis-color": "<color>",
      "text-emphasis-position": "auto|[over|under]&&[right|left]?",
      "text-emphasis-style": "none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
      "text-indent": "<length-percentage>&&hanging?&&each-line?",
      "text-justify": "auto|inter-character|inter-word|none",
      "text-orientation": "mixed|upright|sideways",
      "text-overflow": "[clip|ellipsis|<string>]{1,2}",
      "text-rendering": "auto|optimizeSpeed|optimizeLegibility|geometricPrecision",
      "text-shadow": "none|<shadow-t>#",
      "text-size-adjust": "none|auto|<percentage>",
      "text-spacing-trim": "space-all|normal|space-first|trim-start|trim-both|trim-all|auto",
      "text-transform": "none|capitalize|uppercase|lowercase|full-width|full-size-kana",
      "text-underline-offset": "auto|<length>|<percentage>",
      "text-underline-position": "auto|from-font|[under||[left|right]]",
      "text-wrap": "<'text-wrap-mode'>||<'text-wrap-style'>",
      "text-wrap-mode": "auto|wrap|nowrap",
      "text-wrap-style": "auto|balance|stable|pretty",
      "timeline-scope": "none|<dashed-ident>#",
      "top": "<length>|<percentage>|auto",
      "touch-action": "auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",
      "transform": "none|<transform-list>",
      "transform-box": "content-box|border-box|fill-box|stroke-box|view-box",
      "transform-origin": "[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?",
      "transform-style": "flat|preserve-3d",
      "transition": "<single-transition>#",
      "transition-behavior": "<transition-behavior-value>#",
      "transition-delay": "<time>#",
      "transition-duration": "<time>#",
      "transition-property": "none|<single-transition-property>#",
      "transition-timing-function": "<easing-function>#",
      "translate": "none|<length-percentage> [<length-percentage> <length>?]?",
      "unicode-bidi": "normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext",
      "user-select": "auto|text|none|contain|all",
      "vector-effect": "none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position",
      "vertical-align": "baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",
      "view-timeline": "[<'view-timeline-name'> <'view-timeline-axis'>?]#",
      "view-timeline-axis": "[block|inline|x|y]#",
      "view-timeline-inset": "[[auto|<length-percentage>]{1,2}]#",
      "view-timeline-name": "none|<dashed-ident>#",
      "view-transition-name": "none|<custom-ident>",
      "visibility": "visible|hidden|collapse",
      "white-space": "normal|pre|nowrap|pre-wrap|pre-line|break-spaces|[<'white-space-collapse'>||<'text-wrap'>||<'white-space-trim'>]",
      "white-space-collapse": "collapse|discard|preserve|preserve-breaks|preserve-spaces|break-spaces",
      "widows": "<integer>",
      "width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "will-change": "auto|<animateable-feature>#",
      "word-break": "normal|break-all|keep-all|break-word|auto-phrase",
      "word-spacing": "normal|<length>",
      "word-wrap": "normal|break-word",
      "writing-mode": "horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",
      "x": "<length>|<percentage>",
      "y": "<length>|<percentage>",
      "z-index": "auto|<integer>",
      "zoom": "normal|reset|<number>|<percentage>",
      "-moz-background-clip": "padding|border",
      "-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
      "-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
      "-moz-border-radius-topleft": "<'border-top-left-radius'>",
      "-moz-border-radius-topright": "<'border-bottom-right-radius'>",
      "-moz-control-character-visibility": "visible|hidden",
      "-moz-osx-font-smoothing": "auto|grayscale",
      "-moz-user-select": "none|text|all|-moz-none",
      "-ms-flex-align": "start|end|center|baseline|stretch",
      "-ms-flex-item-align": "auto|start|end|center|baseline|stretch",
      "-ms-flex-line-pack": "start|end|center|justify|distribute|stretch",
      "-ms-flex-negative": "<'flex-shrink'>",
      "-ms-flex-pack": "start|end|center|justify|distribute",
      "-ms-flex-order": "<integer>",
      "-ms-flex-positive": "<'flex-grow'>",
      "-ms-flex-preferred-size": "<'flex-basis'>",
      "-ms-interpolation-mode": "nearest-neighbor|bicubic",
      "-ms-grid-column-align": "start|end|center|stretch",
      "-ms-grid-row-align": "start|end|center|stretch",
      "-ms-hyphenate-limit-last": "none|always|column|page|spread",
      "-webkit-background-clip": "[<box>|border|padding|content|text]#",
      "-webkit-column-break-after": "always|auto|avoid",
      "-webkit-column-break-before": "always|auto|avoid",
      "-webkit-column-break-inside": "always|auto|avoid",
      "-webkit-font-smoothing": "auto|none|antialiased|subpixel-antialiased",
      "-webkit-mask-box-image": "[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?",
      "-webkit-print-color-adjust": "economy|exact",
      "-webkit-text-security": "none|circle|disc|square",
      "-webkit-user-drag": "none|element|auto",
      "-webkit-user-select": "auto|none|text|all",
      "alignment-baseline": "auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical",
      "baseline-shift": "baseline|sub|super|<svg-length>",
      "behavior": "<url>+",
      "cue": "<'cue-before'> <'cue-after'>?",
      "cue-after": "<url> <decibel>?|none",
      "cue-before": "<url> <decibel>?|none",
      "glyph-orientation-horizontal": "<angle>",
      "glyph-orientation-vertical": "<angle>",
      "kerning": "auto|<svg-length>",
      "pause": "<'pause-before'> <'pause-after'>?",
      "pause-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "pause-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "rest": "<'rest-before'> <'rest-after'>?",
      "rest-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "rest-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "src": "[<url> [format( <string># )]?|local( <family-name> )]#",
      "speak": "auto|never|always",
      "speak-as": "normal|spell-out||digits||[literal-punctuation|no-punctuation]",
      "unicode-range": "<urange>#",
      "voice-balance": "<number>|left|center|right|leftwards|rightwards",
      "voice-duration": "auto|<time>",
      "voice-family": "[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve",
      "voice-pitch": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
      "voice-range": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
      "voice-rate": "[normal|x-slow|slow|medium|fast|x-fast]||<percentage>",
      "voice-stress": "normal|strong|moderate|none|reduced",
      "voice-volume": "silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]",
      "white-space-trim": "none|discard-before||discard-after||discard-inner"
    },
    "atrules": {
      "charset": {
        "prelude": "<string>",
        "descriptors": null
      },
      "counter-style": {
        "prelude": "<counter-style-name>",
        "descriptors": {
          "additive-symbols": "[<integer>&&<symbol>]#",
          "fallback": "<counter-style-name>",
          "negative": "<symbol> <symbol>?",
          "pad": "<integer>&&<symbol>",
          "prefix": "<symbol>",
          "range": "[[<integer>|infinite]{2}]#|auto",
          "speak-as": "auto|bullets|numbers|words|spell-out|<counter-style-name>",
          "suffix": "<symbol>",
          "symbols": "<symbol>+",
          "system": "cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"
        }
      },
      "document": {
        "prelude": "[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",
        "descriptors": null
      },
      "font-palette-values": {
        "prelude": "<dashed-ident>",
        "descriptors": {
          "base-palette": "light|dark|<integer [0,\u221E]>",
          "font-family": "<family-name>#",
          "override-colors": "[<integer [0,\u221E]> <absolute-color-base>]#"
        }
      },
      "font-face": {
        "prelude": null,
        "descriptors": {
          "ascent-override": "normal|<percentage>",
          "descent-override": "normal|<percentage>",
          "font-display": "[auto|block|swap|fallback|optional]",
          "font-family": "<family-name>",
          "font-feature-settings": "normal|<feature-tag-value>#",
          "font-variation-settings": "normal|[<string> <number>]#",
          "font-stretch": "<font-stretch-absolute>{1,2}",
          "font-style": "normal|italic|oblique <angle>{0,2}",
          "font-weight": "<font-weight-absolute>{1,2}",
          "line-gap-override": "normal|<percentage>",
          "size-adjust": "<percentage>",
          "src": "[<url> [format( <string># )]?|local( <family-name> )]#",
          "unicode-range": "<urange>#"
        }
      },
      "font-feature-values": {
        "prelude": "<family-name>#",
        "descriptors": null
      },
      "import": {
        "prelude": "[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",
        "descriptors": null
      },
      "keyframes": {
        "prelude": "<keyframes-name>",
        "descriptors": null
      },
      "layer": {
        "prelude": "[<layer-name>#|<layer-name>?]",
        "descriptors": null
      },
      "media": {
        "prelude": "<media-query-list>",
        "descriptors": null
      },
      "namespace": {
        "prelude": "<namespace-prefix>? [<string>|<url>]",
        "descriptors": null
      },
      "page": {
        "prelude": "<page-selector-list>",
        "descriptors": {
          "bleed": "auto|<length>",
          "marks": "none|[crop||cross]",
          "page-orientation": "upright|rotate-left|rotate-right",
          "size": "<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"
        }
      },
      "position-try": {
        "prelude": "<dashed-ident>",
        "descriptors": {
          "top": "<'top'>",
          "left": "<'left'>",
          "bottom": "<'bottom'>",
          "right": "<'right'>",
          "inset-block-start": "<'inset-block-start'>",
          "inset-block-end": "<'inset-block-end'>",
          "inset-inline-start": "<'inset-inline-start'>",
          "inset-inline-end": "<'inset-inline-end'>",
          "inset-block": "<'inset-block'>",
          "inset-inline": "<'inset-inline'>",
          "inset": "<'inset'>",
          "margin-top": "<'margin-top'>",
          "margin-left": "<'margin-left'>",
          "margin-bottom": "<'margin-bottom'>",
          "margin-right": "<'margin-right'>",
          "margin-block-start": "<'margin-block-start'>",
          "margin-block-end": "<'margin-block-end'>",
          "margin-inline-start": "<'margin-inline-start'>",
          "margin-inline-end": "<'margin-inline-end'>",
          "margin": "<'margin'>",
          "margin-block": "<'margin-block'>",
          "margin-inline": "<'margin-inline'>",
          "width": "<'width'>",
          "height": "<'height'>",
          "min-width": "<'min-width'>",
          "min-height": "<'min-height'>",
          "max-width": "<'max-width'>",
          "max-height": "<'max-height'>",
          "block-size": "<'block-size'>",
          "inline-size": "<'inline-size'>",
          "min-block-size": "<'min-block-size'>",
          "min-inline-size": "<'min-inline-size'>",
          "max-block-size": "<'max-block-size'>",
          "max-inline-size": "<'max-inline-size'>",
          "align-self": "<'align-self'>|anchor-center",
          "justify-self": "<'justify-self'>|anchor-center"
        }
      },
      "property": {
        "prelude": "<custom-property-name>",
        "descriptors": {
          "syntax": "<string>",
          "inherits": "true|false",
          "initial-value": "<declaration-value>?"
        }
      },
      "scope": {
        "prelude": "[( <scope-start> )]? [to ( <scope-end> )]?",
        "descriptors": null
      },
      "starting-style": {
        "prelude": null,
        "descriptors": null
      },
      "supports": {
        "prelude": "<supports-condition>",
        "descriptors": null
      },
      "container": {
        "prelude": "[<container-name>]? <container-condition>",
        "descriptors": null
      },
      "nest": {
        "prelude": "<complex-selector-list>",
        "descriptors": null
      }
    }
  };

  // node_modules/css-tree/lib/syntax/node/index.js
  var node_exports = {};
  __export(node_exports, {
    AnPlusB: () => AnPlusB_exports,
    Atrule: () => Atrule_exports,
    AtrulePrelude: () => AtrulePrelude_exports,
    AttributeSelector: () => AttributeSelector_exports,
    Block: () => Block_exports,
    Brackets: () => Brackets_exports,
    CDC: () => CDC_exports,
    CDO: () => CDO_exports,
    ClassSelector: () => ClassSelector_exports,
    Combinator: () => Combinator_exports,
    Comment: () => Comment_exports,
    Condition: () => Condition_exports,
    Declaration: () => Declaration_exports,
    DeclarationList: () => DeclarationList_exports,
    Dimension: () => Dimension_exports,
    Feature: () => Feature_exports,
    FeatureFunction: () => FeatureFunction_exports,
    FeatureRange: () => FeatureRange_exports,
    Function: () => Function_exports,
    GeneralEnclosed: () => GeneralEnclosed_exports,
    Hash: () => Hash_exports,
    IdSelector: () => IdSelector_exports,
    Identifier: () => Identifier_exports,
    Layer: () => Layer_exports,
    LayerList: () => LayerList_exports,
    MediaQuery: () => MediaQuery_exports,
    MediaQueryList: () => MediaQueryList_exports,
    NestingSelector: () => NestingSelector_exports,
    Nth: () => Nth_exports,
    Number: () => Number_exports,
    Operator: () => Operator_exports,
    Parentheses: () => Parentheses_exports,
    Percentage: () => Percentage_exports,
    PseudoClassSelector: () => PseudoClassSelector_exports,
    PseudoElementSelector: () => PseudoElementSelector_exports,
    Ratio: () => Ratio_exports,
    Raw: () => Raw_exports,
    Rule: () => Rule_exports,
    Scope: () => Scope_exports,
    Selector: () => Selector_exports,
    SelectorList: () => SelectorList_exports,
    String: () => String_exports,
    StyleSheet: () => StyleSheet_exports,
    SupportsDeclaration: () => SupportsDeclaration_exports,
    TypeSelector: () => TypeSelector_exports,
    UnicodeRange: () => UnicodeRange_exports,
    Url: () => Url_exports,
    Value: () => Value_exports,
    WhiteSpace: () => WhiteSpace_exports
  });

  // node_modules/css-tree/lib/syntax/node/AnPlusB.js
  var AnPlusB_exports = {};
  __export(AnPlusB_exports, {
    generate: () => generate2,
    name: () => name,
    parse: () => parse2,
    structure: () => structure
  });
  var PLUSSIGN5 = 43;
  var HYPHENMINUS5 = 45;
  var N5 = 110;
  var DISALLOW_SIGN2 = true;
  var ALLOW_SIGN2 = false;
  function checkInteger2(offset, disallowSign) {
    let pos = this.tokenStart + offset;
    const code2 = this.charCodeAt(pos);
    if (code2 === PLUSSIGN5 || code2 === HYPHENMINUS5) {
      if (disallowSign) {
        this.error("Number sign is not allowed");
      }
      pos++;
    }
    for (; pos < this.tokenEnd; pos++) {
      if (!isDigit(this.charCodeAt(pos))) {
        this.error("Integer is expected", pos);
      }
    }
  }
  function checkTokenIsInteger(disallowSign) {
    return checkInteger2.call(this, 0, disallowSign);
  }
  function expectCharCode(offset, code2) {
    if (!this.cmpChar(this.tokenStart + offset, code2)) {
      let msg = "";
      switch (code2) {
        case N5:
          msg = "N is expected";
          break;
        case HYPHENMINUS5:
          msg = "HyphenMinus is expected";
          break;
      }
      this.error(msg, this.tokenStart + offset);
    }
  }
  function consumeB2() {
    let offset = 0;
    let sign = 0;
    let type = this.tokenType;
    while (type === WhiteSpace || type === Comment) {
      type = this.lookupType(++offset);
    }
    if (type !== Number2) {
      if (this.isDelim(PLUSSIGN5, offset) || this.isDelim(HYPHENMINUS5, offset)) {
        sign = this.isDelim(PLUSSIGN5, offset) ? PLUSSIGN5 : HYPHENMINUS5;
        do {
          type = this.lookupType(++offset);
        } while (type === WhiteSpace || type === Comment);
        if (type !== Number2) {
          this.skip(offset);
          checkTokenIsInteger.call(this, DISALLOW_SIGN2);
        }
      } else {
        return null;
      }
    }
    if (offset > 0) {
      this.skip(offset);
    }
    if (sign === 0) {
      type = this.charCodeAt(this.tokenStart);
      if (type !== PLUSSIGN5 && type !== HYPHENMINUS5) {
        this.error("Number sign is expected");
      }
    }
    checkTokenIsInteger.call(this, sign !== 0);
    return sign === HYPHENMINUS5 ? "-" + this.consume(Number2) : this.consume(Number2);
  }
  var name = "AnPlusB";
  var structure = {
    a: [String, null],
    b: [String, null]
  };
  function parse2() {
    const start = this.tokenStart;
    let a3 = null;
    let b = null;
    if (this.tokenType === Number2) {
      checkTokenIsInteger.call(this, ALLOW_SIGN2);
      b = this.consume(Number2);
    } else if (this.tokenType === Ident && this.cmpChar(this.tokenStart, HYPHENMINUS5)) {
      a3 = "-1";
      expectCharCode.call(this, 1, N5);
      switch (this.tokenEnd - this.tokenStart) {
        // -n
        // -n <signed-integer>
        // -n ['+' | '-'] <signless-integer>
        case 2:
          this.next();
          b = consumeB2.call(this);
          break;
        // -n- <signless-integer>
        case 3:
          expectCharCode.call(this, 2, HYPHENMINUS5);
          this.next();
          this.skipSC();
          checkTokenIsInteger.call(this, DISALLOW_SIGN2);
          b = "-" + this.consume(Number2);
          break;
        // <dashndashdigit-ident>
        default:
          expectCharCode.call(this, 2, HYPHENMINUS5);
          checkInteger2.call(this, 3, DISALLOW_SIGN2);
          this.next();
          b = this.substrToCursor(start + 2);
      }
    } else if (this.tokenType === Ident || this.isDelim(PLUSSIGN5) && this.lookupType(1) === Ident) {
      let sign = 0;
      a3 = "1";
      if (this.isDelim(PLUSSIGN5)) {
        sign = 1;
        this.next();
      }
      expectCharCode.call(this, 0, N5);
      switch (this.tokenEnd - this.tokenStart) {
        // '+'? n
        // '+'? n <signed-integer>
        // '+'? n ['+' | '-'] <signless-integer>
        case 1:
          this.next();
          b = consumeB2.call(this);
          break;
        // '+'? n- <signless-integer>
        case 2:
          expectCharCode.call(this, 1, HYPHENMINUS5);
          this.next();
          this.skipSC();
          checkTokenIsInteger.call(this, DISALLOW_SIGN2);
          b = "-" + this.consume(Number2);
          break;
        // '+'? <ndashdigit-ident>
        default:
          expectCharCode.call(this, 1, HYPHENMINUS5);
          checkInteger2.call(this, 2, DISALLOW_SIGN2);
          this.next();
          b = this.substrToCursor(start + sign + 1);
      }
    } else if (this.tokenType === Dimension) {
      const code2 = this.charCodeAt(this.tokenStart);
      const sign = code2 === PLUSSIGN5 || code2 === HYPHENMINUS5;
      let i = this.tokenStart + sign;
      for (; i < this.tokenEnd; i++) {
        if (!isDigit(this.charCodeAt(i))) {
          break;
        }
      }
      if (i === this.tokenStart + sign) {
        this.error("Integer is expected", this.tokenStart + sign);
      }
      expectCharCode.call(this, i - this.tokenStart, N5);
      a3 = this.substring(start, i);
      if (i + 1 === this.tokenEnd) {
        this.next();
        b = consumeB2.call(this);
      } else {
        expectCharCode.call(this, i - this.tokenStart + 1, HYPHENMINUS5);
        if (i + 2 === this.tokenEnd) {
          this.next();
          this.skipSC();
          checkTokenIsInteger.call(this, DISALLOW_SIGN2);
          b = "-" + this.consume(Number2);
        } else {
          checkInteger2.call(this, i - this.tokenStart + 2, DISALLOW_SIGN2);
          this.next();
          b = this.substrToCursor(i + 1);
        }
      }
    } else {
      this.error();
    }
    if (a3 !== null && a3.charCodeAt(0) === PLUSSIGN5) {
      a3 = a3.substr(1);
    }
    if (b !== null && b.charCodeAt(0) === PLUSSIGN5) {
      b = b.substr(1);
    }
    return {
      type: "AnPlusB",
      loc: this.getLocation(start, this.tokenStart),
      a: a3,
      b
    };
  }
  function generate2(node) {
    if (node.a) {
      const a3 = node.a === "+1" && "n" || node.a === "1" && "n" || node.a === "-1" && "-n" || node.a + "n";
      if (node.b) {
        const b = node.b[0] === "-" || node.b[0] === "+" ? node.b : "+" + node.b;
        this.tokenize(a3 + b);
      } else {
        this.tokenize(a3);
      }
    } else {
      this.tokenize(node.b);
    }
  }

  // node_modules/css-tree/lib/syntax/node/Atrule.js
  var Atrule_exports = {};
  __export(Atrule_exports, {
    generate: () => generate3,
    name: () => name2,
    parse: () => parse3,
    structure: () => structure2,
    walkContext: () => walkContext
  });
  function consumeRaw() {
    return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, true);
  }
  function isDeclarationBlockAtrule() {
    for (let offset = 1, type; type = this.lookupType(offset); offset++) {
      if (type === RightCurlyBracket) {
        return true;
      }
      if (type === LeftCurlyBracket || type === AtKeyword) {
        return false;
      }
    }
    return false;
  }
  var name2 = "Atrule";
  var walkContext = "atrule";
  var structure2 = {
    name: String,
    prelude: ["AtrulePrelude", "Raw", null],
    block: ["Block", null]
  };
  function parse3(isDeclaration = false) {
    const start = this.tokenStart;
    let name50;
    let nameLowerCase;
    let prelude = null;
    let block = null;
    this.eat(AtKeyword);
    name50 = this.substrToCursor(start + 1);
    nameLowerCase = name50.toLowerCase();
    this.skipSC();
    if (this.eof === false && this.tokenType !== LeftCurlyBracket && this.tokenType !== Semicolon) {
      if (this.parseAtrulePrelude) {
        prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name50, isDeclaration), consumeRaw);
      } else {
        prelude = consumeRaw.call(this, this.tokenIndex);
      }
      this.skipSC();
    }
    switch (this.tokenType) {
      case Semicolon:
        this.next();
        break;
      case LeftCurlyBracket:
        if (hasOwnProperty.call(this.atrule, nameLowerCase) && typeof this.atrule[nameLowerCase].block === "function") {
          block = this.atrule[nameLowerCase].block.call(this, isDeclaration);
        } else {
          block = this.Block(isDeclarationBlockAtrule.call(this));
        }
        break;
    }
    return {
      type: "Atrule",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      prelude,
      block
    };
  }
  function generate3(node) {
    this.token(AtKeyword, "@" + node.name);
    if (node.prelude !== null) {
      this.node(node.prelude);
    }
    if (node.block) {
      this.node(node.block);
    } else {
      this.token(Semicolon, ";");
    }
  }

  // node_modules/css-tree/lib/syntax/node/AtrulePrelude.js
  var AtrulePrelude_exports = {};
  __export(AtrulePrelude_exports, {
    generate: () => generate4,
    name: () => name3,
    parse: () => parse4,
    structure: () => structure3,
    walkContext: () => walkContext2
  });
  var name3 = "AtrulePrelude";
  var walkContext2 = "atrulePrelude";
  var structure3 = {
    children: [[]]
  };
  function parse4(name50) {
    let children = null;
    if (name50 !== null) {
      name50 = name50.toLowerCase();
    }
    this.skipSC();
    if (hasOwnProperty.call(this.atrule, name50) && typeof this.atrule[name50].prelude === "function") {
      children = this.atrule[name50].prelude.call(this);
    } else {
      children = this.readSequence(this.scope.AtrulePrelude);
    }
    this.skipSC();
    if (this.eof !== true && this.tokenType !== LeftCurlyBracket && this.tokenType !== Semicolon) {
      this.error("Semicolon or block is expected");
    }
    return {
      type: "AtrulePrelude",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate4(node) {
    this.children(node);
  }

  // node_modules/css-tree/lib/syntax/node/AttributeSelector.js
  var AttributeSelector_exports = {};
  __export(AttributeSelector_exports, {
    generate: () => generate5,
    name: () => name4,
    parse: () => parse5,
    structure: () => structure4
  });
  var DOLLARSIGN = 36;
  var ASTERISK2 = 42;
  var EQUALSSIGN = 61;
  var CIRCUMFLEXACCENT = 94;
  var VERTICALLINE2 = 124;
  var TILDE = 126;
  function getAttributeName() {
    if (this.eof) {
      this.error("Unexpected end of input");
    }
    const start = this.tokenStart;
    let expectIdent = false;
    if (this.isDelim(ASTERISK2)) {
      expectIdent = true;
      this.next();
    } else if (!this.isDelim(VERTICALLINE2)) {
      this.eat(Ident);
    }
    if (this.isDelim(VERTICALLINE2)) {
      if (this.charCodeAt(this.tokenStart + 1) !== EQUALSSIGN) {
        this.next();
        this.eat(Ident);
      } else if (expectIdent) {
        this.error("Identifier is expected", this.tokenEnd);
      }
    } else if (expectIdent) {
      this.error("Vertical line is expected");
    }
    return {
      type: "Identifier",
      loc: this.getLocation(start, this.tokenStart),
      name: this.substrToCursor(start)
    };
  }
  function getOperator() {
    const start = this.tokenStart;
    const code2 = this.charCodeAt(start);
    if (code2 !== EQUALSSIGN && // =
    code2 !== TILDE && // ~=
    code2 !== CIRCUMFLEXACCENT && // ^=
    code2 !== DOLLARSIGN && // $=
    code2 !== ASTERISK2 && // *=
    code2 !== VERTICALLINE2) {
      this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected");
    }
    this.next();
    if (code2 !== EQUALSSIGN) {
      if (!this.isDelim(EQUALSSIGN)) {
        this.error("Equal sign is expected");
      }
      this.next();
    }
    return this.substrToCursor(start);
  }
  var name4 = "AttributeSelector";
  var structure4 = {
    name: "Identifier",
    matcher: [String, null],
    value: ["String", "Identifier", null],
    flags: [String, null]
  };
  function parse5() {
    const start = this.tokenStart;
    let name50;
    let matcher = null;
    let value = null;
    let flags = null;
    this.eat(LeftSquareBracket);
    this.skipSC();
    name50 = getAttributeName.call(this);
    this.skipSC();
    if (this.tokenType !== RightSquareBracket) {
      if (this.tokenType !== Ident) {
        matcher = getOperator.call(this);
        this.skipSC();
        value = this.tokenType === String2 ? this.String() : this.Identifier();
        this.skipSC();
      }
      if (this.tokenType === Ident) {
        flags = this.consume(Ident);
        this.skipSC();
      }
    }
    this.eat(RightSquareBracket);
    return {
      type: "AttributeSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      matcher,
      value,
      flags
    };
  }
  function generate5(node) {
    this.token(Delim, "[");
    this.node(node.name);
    if (node.matcher !== null) {
      this.tokenize(node.matcher);
      this.node(node.value);
    }
    if (node.flags !== null) {
      this.token(Ident, node.flags);
    }
    this.token(Delim, "]");
  }

  // node_modules/css-tree/lib/syntax/node/Block.js
  var Block_exports = {};
  __export(Block_exports, {
    generate: () => generate6,
    name: () => name5,
    parse: () => parse6,
    structure: () => structure5,
    walkContext: () => walkContext3
  });
  var AMPERSAND2 = 38;
  function consumeRaw2() {
    return this.Raw(null, true);
  }
  function consumeRule() {
    return this.parseWithFallback(this.Rule, consumeRaw2);
  }
  function consumeRawDeclaration() {
    return this.Raw(this.consumeUntilSemicolonIncluded, true);
  }
  function consumeDeclaration() {
    if (this.tokenType === Semicolon) {
      return consumeRawDeclaration.call(this, this.tokenIndex);
    }
    const node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);
    if (this.tokenType === Semicolon) {
      this.next();
    }
    return node;
  }
  var name5 = "Block";
  var walkContext3 = "block";
  var structure5 = {
    children: [[
      "Atrule",
      "Rule",
      "Declaration"
    ]]
  };
  function parse6(isStyleBlock) {
    const consumer = isStyleBlock ? consumeDeclaration : consumeRule;
    const start = this.tokenStart;
    let children = this.createList();
    this.eat(LeftCurlyBracket);
    scan:
      while (!this.eof) {
        switch (this.tokenType) {
          case RightCurlyBracket:
            break scan;
          case WhiteSpace:
          case Comment:
            this.next();
            break;
          case AtKeyword:
            children.push(this.parseWithFallback(this.Atrule.bind(this, isStyleBlock), consumeRaw2));
            break;
          default:
            if (isStyleBlock && this.isDelim(AMPERSAND2)) {
              children.push(consumeRule.call(this));
            } else {
              children.push(consumer.call(this));
            }
        }
      }
    if (!this.eof) {
      this.eat(RightCurlyBracket);
    }
    return {
      type: "Block",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate6(node) {
    this.token(LeftCurlyBracket, "{");
    this.children(node, (prev) => {
      if (prev.type === "Declaration") {
        this.token(Semicolon, ";");
      }
    });
    this.token(RightCurlyBracket, "}");
  }

  // node_modules/css-tree/lib/syntax/node/Brackets.js
  var Brackets_exports = {};
  __export(Brackets_exports, {
    generate: () => generate7,
    name: () => name6,
    parse: () => parse7,
    structure: () => structure6
  });
  var name6 = "Brackets";
  var structure6 = {
    children: [[]]
  };
  function parse7(readSequence2, recognizer) {
    const start = this.tokenStart;
    let children = null;
    this.eat(LeftSquareBracket);
    children = readSequence2.call(this, recognizer);
    if (!this.eof) {
      this.eat(RightSquareBracket);
    }
    return {
      type: "Brackets",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate7(node) {
    this.token(Delim, "[");
    this.children(node);
    this.token(Delim, "]");
  }

  // node_modules/css-tree/lib/syntax/node/CDC.js
  var CDC_exports = {};
  __export(CDC_exports, {
    generate: () => generate8,
    name: () => name7,
    parse: () => parse8,
    structure: () => structure7
  });
  var name7 = "CDC";
  var structure7 = [];
  function parse8() {
    const start = this.tokenStart;
    this.eat(CDC);
    return {
      type: "CDC",
      loc: this.getLocation(start, this.tokenStart)
    };
  }
  function generate8() {
    this.token(CDC, "-->");
  }

  // node_modules/css-tree/lib/syntax/node/CDO.js
  var CDO_exports = {};
  __export(CDO_exports, {
    generate: () => generate9,
    name: () => name8,
    parse: () => parse9,
    structure: () => structure8
  });
  var name8 = "CDO";
  var structure8 = [];
  function parse9() {
    const start = this.tokenStart;
    this.eat(CDO);
    return {
      type: "CDO",
      loc: this.getLocation(start, this.tokenStart)
    };
  }
  function generate9() {
    this.token(CDO, "<!--");
  }

  // node_modules/css-tree/lib/syntax/node/ClassSelector.js
  var ClassSelector_exports = {};
  __export(ClassSelector_exports, {
    generate: () => generate10,
    name: () => name9,
    parse: () => parse10,
    structure: () => structure9
  });
  var FULLSTOP = 46;
  var name9 = "ClassSelector";
  var structure9 = {
    name: String
  };
  function parse10() {
    this.eatDelim(FULLSTOP);
    return {
      type: "ClassSelector",
      loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
      name: this.consume(Ident)
    };
  }
  function generate10(node) {
    this.token(Delim, ".");
    this.token(Ident, node.name);
  }

  // node_modules/css-tree/lib/syntax/node/Combinator.js
  var Combinator_exports = {};
  __export(Combinator_exports, {
    generate: () => generate11,
    name: () => name10,
    parse: () => parse11,
    structure: () => structure10
  });
  var PLUSSIGN6 = 43;
  var SOLIDUS = 47;
  var GREATERTHANSIGN2 = 62;
  var TILDE2 = 126;
  var name10 = "Combinator";
  var structure10 = {
    name: String
  };
  function parse11() {
    const start = this.tokenStart;
    let name50;
    switch (this.tokenType) {
      case WhiteSpace:
        name50 = " ";
        break;
      case Delim:
        switch (this.charCodeAt(this.tokenStart)) {
          case GREATERTHANSIGN2:
          case PLUSSIGN6:
          case TILDE2:
            this.next();
            break;
          case SOLIDUS:
            this.next();
            this.eatIdent("deep");
            this.eatDelim(SOLIDUS);
            break;
          default:
            this.error("Combinator is expected");
        }
        name50 = this.substrToCursor(start);
        break;
    }
    return {
      type: "Combinator",
      loc: this.getLocation(start, this.tokenStart),
      name: name50
    };
  }
  function generate11(node) {
    this.tokenize(node.name);
  }

  // node_modules/css-tree/lib/syntax/node/Comment.js
  var Comment_exports = {};
  __export(Comment_exports, {
    generate: () => generate12,
    name: () => name11,
    parse: () => parse12,
    structure: () => structure11
  });
  var ASTERISK3 = 42;
  var SOLIDUS2 = 47;
  var name11 = "Comment";
  var structure11 = {
    value: String
  };
  function parse12() {
    const start = this.tokenStart;
    let end = this.tokenEnd;
    this.eat(Comment);
    if (end - start + 2 >= 2 && this.charCodeAt(end - 2) === ASTERISK3 && this.charCodeAt(end - 1) === SOLIDUS2) {
      end -= 2;
    }
    return {
      type: "Comment",
      loc: this.getLocation(start, this.tokenStart),
      value: this.substring(start + 2, end)
    };
  }
  function generate12(node) {
    this.token(Comment, "/*" + node.value + "*/");
  }

  // node_modules/css-tree/lib/syntax/node/Condition.js
  var Condition_exports = {};
  __export(Condition_exports, {
    generate: () => generate13,
    name: () => name12,
    parse: () => parse13,
    structure: () => structure12
  });
  var likelyFeatureToken = /* @__PURE__ */ new Set([Colon, RightParenthesis, EOF]);
  var name12 = "Condition";
  var structure12 = {
    kind: String,
    children: [[
      "Identifier",
      "Feature",
      "FeatureFunction",
      "FeatureRange",
      "SupportsDeclaration"
    ]]
  };
  function featureOrRange(kind) {
    if (this.lookupTypeNonSC(1) === Ident && likelyFeatureToken.has(this.lookupTypeNonSC(2))) {
      return this.Feature(kind);
    }
    return this.FeatureRange(kind);
  }
  var parentheses = {
    media: featureOrRange,
    container: featureOrRange,
    supports() {
      return this.SupportsDeclaration();
    }
  };
  function parse13(kind = "media") {
    const children = this.createList();
    scan: while (!this.eof) {
      switch (this.tokenType) {
        case Comment:
        case WhiteSpace:
          this.next();
          continue;
        case Ident:
          children.push(this.Identifier());
          break;
        case LeftParenthesis: {
          let term = this.parseWithFallback(
            () => parentheses[kind].call(this, kind),
            () => null
          );
          if (!term) {
            term = this.parseWithFallback(
              () => {
                this.eat(LeftParenthesis);
                const res = this.Condition(kind);
                this.eat(RightParenthesis);
                return res;
              },
              () => {
                return this.GeneralEnclosed(kind);
              }
            );
          }
          children.push(term);
          break;
        }
        case Function: {
          let term = this.parseWithFallback(
            () => this.FeatureFunction(kind),
            () => null
          );
          if (!term) {
            term = this.GeneralEnclosed(kind);
          }
          children.push(term);
          break;
        }
        default:
          break scan;
      }
    }
    if (children.isEmpty) {
      this.error("Condition is expected");
    }
    return {
      type: "Condition",
      loc: this.getLocationFromList(children),
      kind,
      children
    };
  }
  function generate13(node) {
    node.children.forEach((child) => {
      if (child.type === "Condition") {
        this.token(LeftParenthesis, "(");
        this.node(child);
        this.token(RightParenthesis, ")");
      } else {
        this.node(child);
      }
    });
  }

  // node_modules/css-tree/lib/syntax/node/Declaration.js
  var Declaration_exports = {};
  __export(Declaration_exports, {
    generate: () => generate14,
    name: () => name13,
    parse: () => parse14,
    structure: () => structure13,
    walkContext: () => walkContext4
  });
  var EXCLAMATIONMARK3 = 33;
  var NUMBERSIGN3 = 35;
  var DOLLARSIGN2 = 36;
  var AMPERSAND3 = 38;
  var ASTERISK4 = 42;
  var PLUSSIGN7 = 43;
  var SOLIDUS3 = 47;
  function consumeValueRaw() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, true);
  }
  function consumeCustomPropertyRaw() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
  }
  function consumeValue() {
    const startValueToken = this.tokenIndex;
    const value = this.Value();
    if (value.type !== "Raw" && this.eof === false && this.tokenType !== Semicolon && this.isDelim(EXCLAMATIONMARK3) === false && this.isBalanceEdge(startValueToken) === false) {
      this.error();
    }
    return value;
  }
  var name13 = "Declaration";
  var walkContext4 = "declaration";
  var structure13 = {
    important: [Boolean, String],
    property: String,
    value: ["Value", "Raw"]
  };
  function parse14() {
    const start = this.tokenStart;
    const startToken = this.tokenIndex;
    const property2 = readProperty2.call(this);
    const customProperty = isCustomProperty(property2);
    const parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
    const consumeRaw6 = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
    let important = false;
    let value;
    this.skipSC();
    this.eat(Colon);
    const valueStart = this.tokenIndex;
    if (!customProperty) {
      this.skipSC();
    }
    if (parseValue) {
      value = this.parseWithFallback(consumeValue, consumeRaw6);
    } else {
      value = consumeRaw6.call(this, this.tokenIndex);
    }
    if (customProperty && value.type === "Value" && value.children.isEmpty) {
      for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) {
        if (this.lookupType(offset) === WhiteSpace) {
          value.children.appendData({
            type: "WhiteSpace",
            loc: null,
            value: " "
          });
          break;
        }
      }
    }
    if (this.isDelim(EXCLAMATIONMARK3)) {
      important = getImportant.call(this);
      this.skipSC();
    }
    if (this.eof === false && this.tokenType !== Semicolon && this.isBalanceEdge(startToken) === false) {
      this.error();
    }
    return {
      type: "Declaration",
      loc: this.getLocation(start, this.tokenStart),
      important,
      property: property2,
      value
    };
  }
  function generate14(node) {
    this.token(Ident, node.property);
    this.token(Colon, ":");
    this.node(node.value);
    if (node.important) {
      this.token(Delim, "!");
      this.token(Ident, node.important === true ? "important" : node.important);
    }
  }
  function readProperty2() {
    const start = this.tokenStart;
    if (this.tokenType === Delim) {
      switch (this.charCodeAt(this.tokenStart)) {
        case ASTERISK4:
        case DOLLARSIGN2:
        case PLUSSIGN7:
        case NUMBERSIGN3:
        case AMPERSAND3:
          this.next();
          break;
        // TODO: not sure we should support this hack
        case SOLIDUS3:
          this.next();
          if (this.isDelim(SOLIDUS3)) {
            this.next();
          }
          break;
      }
    }
    if (this.tokenType === Hash) {
      this.eat(Hash);
    } else {
      this.eat(Ident);
    }
    return this.substrToCursor(start);
  }
  function getImportant() {
    this.eat(Delim);
    this.skipSC();
    const important = this.consume(Ident);
    return important === "important" ? true : important;
  }

  // node_modules/css-tree/lib/syntax/node/DeclarationList.js
  var DeclarationList_exports = {};
  __export(DeclarationList_exports, {
    generate: () => generate15,
    name: () => name14,
    parse: () => parse15,
    structure: () => structure14
  });
  var AMPERSAND4 = 38;
  function consumeRaw3() {
    return this.Raw(this.consumeUntilSemicolonIncluded, true);
  }
  var name14 = "DeclarationList";
  var structure14 = {
    children: [[
      "Declaration",
      "Atrule",
      "Rule"
    ]]
  };
  function parse15() {
    const children = this.createList();
    scan:
      while (!this.eof) {
        switch (this.tokenType) {
          case WhiteSpace:
          case Comment:
          case Semicolon:
            this.next();
            break;
          case AtKeyword:
            children.push(this.parseWithFallback(this.Atrule.bind(this, true), consumeRaw3));
            break;
          default:
            if (this.isDelim(AMPERSAND4)) {
              children.push(this.parseWithFallback(this.Rule, consumeRaw3));
            } else {
              children.push(this.parseWithFallback(this.Declaration, consumeRaw3));
            }
        }
      }
    return {
      type: "DeclarationList",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate15(node) {
    this.children(node, (prev) => {
      if (prev.type === "Declaration") {
        this.token(Semicolon, ";");
      }
    });
  }

  // node_modules/css-tree/lib/syntax/node/Dimension.js
  var Dimension_exports = {};
  __export(Dimension_exports, {
    generate: () => generate16,
    name: () => name15,
    parse: () => parse16,
    structure: () => structure15
  });
  var name15 = "Dimension";
  var structure15 = {
    value: String,
    unit: String
  };
  function parse16() {
    const start = this.tokenStart;
    const value = this.consumeNumber(Dimension);
    return {
      type: "Dimension",
      loc: this.getLocation(start, this.tokenStart),
      value,
      unit: this.substring(start + value.length, this.tokenStart)
    };
  }
  function generate16(node) {
    this.token(Dimension, node.value + node.unit);
  }

  // node_modules/css-tree/lib/syntax/node/Feature.js
  var Feature_exports = {};
  __export(Feature_exports, {
    generate: () => generate17,
    name: () => name16,
    parse: () => parse17,
    structure: () => structure16
  });
  var SOLIDUS4 = 47;
  var name16 = "Feature";
  var structure16 = {
    kind: String,
    name: String,
    value: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
  };
  function parse17(kind) {
    const start = this.tokenStart;
    let name50;
    let value = null;
    this.eat(LeftParenthesis);
    this.skipSC();
    name50 = this.consume(Ident);
    this.skipSC();
    if (this.tokenType !== RightParenthesis) {
      this.eat(Colon);
      this.skipSC();
      switch (this.tokenType) {
        case Number2:
          if (this.lookupNonWSType(1) === Delim) {
            value = this.Ratio();
          } else {
            value = this.Number();
          }
          break;
        case Dimension:
          value = this.Dimension();
          break;
        case Ident:
          value = this.Identifier();
          break;
        case Function:
          value = this.parseWithFallback(
            () => {
              const res = this.Function(this.readSequence, this.scope.Value);
              this.skipSC();
              if (this.isDelim(SOLIDUS4)) {
                this.error();
              }
              return res;
            },
            () => {
              return this.Ratio();
            }
          );
          break;
        default:
          this.error("Number, dimension, ratio or identifier is expected");
      }
      this.skipSC();
    }
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "Feature",
      loc: this.getLocation(start, this.tokenStart),
      kind,
      name: name50,
      value
    };
  }
  function generate17(node) {
    this.token(LeftParenthesis, "(");
    this.token(Ident, node.name);
    if (node.value !== null) {
      this.token(Colon, ":");
      this.node(node.value);
    }
    this.token(RightParenthesis, ")");
  }

  // node_modules/css-tree/lib/syntax/node/FeatureFunction.js
  var FeatureFunction_exports = {};
  __export(FeatureFunction_exports, {
    generate: () => generate18,
    name: () => name17,
    parse: () => parse18,
    structure: () => structure17
  });
  var name17 = "FeatureFunction";
  var structure17 = {
    kind: String,
    feature: String,
    value: ["Declaration", "Selector"]
  };
  function getFeatureParser(kind, name50) {
    const featuresOfKind = this.features[kind] || {};
    const parser = featuresOfKind[name50];
    if (typeof parser !== "function") {
      this.error(`Unknown feature ${name50}()`);
    }
    return parser;
  }
  function parse18(kind = "unknown") {
    const start = this.tokenStart;
    const functionName = this.consumeFunctionName();
    const valueParser = getFeatureParser.call(this, kind, functionName.toLowerCase());
    this.skipSC();
    const value = this.parseWithFallback(
      () => {
        const startValueToken = this.tokenIndex;
        const value2 = valueParser.call(this);
        if (this.eof === false && this.isBalanceEdge(startValueToken) === false) {
          this.error();
        }
        return value2;
      },
      () => this.Raw(null, false)
    );
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "FeatureFunction",
      loc: this.getLocation(start, this.tokenStart),
      kind,
      feature: functionName,
      value
    };
  }
  function generate18(node) {
    this.token(Function, node.feature + "(");
    this.node(node.value);
    this.token(RightParenthesis, ")");
  }

  // node_modules/css-tree/lib/syntax/node/FeatureRange.js
  var FeatureRange_exports = {};
  __export(FeatureRange_exports, {
    generate: () => generate19,
    name: () => name18,
    parse: () => parse19,
    structure: () => structure18
  });
  var SOLIDUS5 = 47;
  var LESSTHANSIGN2 = 60;
  var EQUALSSIGN2 = 61;
  var GREATERTHANSIGN3 = 62;
  var name18 = "FeatureRange";
  var structure18 = {
    kind: String,
    left: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
    leftComparison: String,
    middle: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
    rightComparison: [String, null],
    right: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
  };
  function readTerm() {
    this.skipSC();
    switch (this.tokenType) {
      case Number2:
        if (this.isDelim(SOLIDUS5, this.lookupOffsetNonSC(1))) {
          return this.Ratio();
        } else {
          return this.Number();
        }
      case Dimension:
        return this.Dimension();
      case Ident:
        return this.Identifier();
      case Function:
        return this.parseWithFallback(
          () => {
            const res = this.Function(this.readSequence, this.scope.Value);
            this.skipSC();
            if (this.isDelim(SOLIDUS5)) {
              this.error();
            }
            return res;
          },
          () => {
            return this.Ratio();
          }
        );
      default:
        this.error("Number, dimension, ratio or identifier is expected");
    }
  }
  function readComparison(expectColon) {
    this.skipSC();
    if (this.isDelim(LESSTHANSIGN2) || this.isDelim(GREATERTHANSIGN3)) {
      const value = this.source[this.tokenStart];
      this.next();
      if (this.isDelim(EQUALSSIGN2)) {
        this.next();
        return value + "=";
      }
      return value;
    }
    if (this.isDelim(EQUALSSIGN2)) {
      return "=";
    }
    this.error(`Expected ${expectColon ? '":", ' : ""}"<", ">", "=" or ")"`);
  }
  function parse19(kind = "unknown") {
    const start = this.tokenStart;
    this.skipSC();
    this.eat(LeftParenthesis);
    const left = readTerm.call(this);
    const leftComparison = readComparison.call(this, left.type === "Identifier");
    const middle = readTerm.call(this);
    let rightComparison = null;
    let right = null;
    if (this.lookupNonWSType(0) !== RightParenthesis) {
      rightComparison = readComparison.call(this);
      right = readTerm.call(this);
    }
    this.skipSC();
    this.eat(RightParenthesis);
    return {
      type: "FeatureRange",
      loc: this.getLocation(start, this.tokenStart),
      kind,
      left,
      leftComparison,
      middle,
      rightComparison,
      right
    };
  }
  function generate19(node) {
    this.token(LeftParenthesis, "(");
    this.node(node.left);
    this.tokenize(node.leftComparison);
    this.node(node.middle);
    if (node.right) {
      this.tokenize(node.rightComparison);
      this.node(node.right);
    }
    this.token(RightParenthesis, ")");
  }

  // node_modules/css-tree/lib/syntax/node/Function.js
  var Function_exports = {};
  __export(Function_exports, {
    generate: () => generate20,
    name: () => name19,
    parse: () => parse20,
    structure: () => structure19,
    walkContext: () => walkContext5
  });
  var name19 = "Function";
  var walkContext5 = "function";
  var structure19 = {
    name: String,
    children: [[]]
  };
  function parse20(readSequence2, recognizer) {
    const start = this.tokenStart;
    const name50 = this.consumeFunctionName();
    const nameLowerCase = name50.toLowerCase();
    let children;
    children = recognizer.hasOwnProperty(nameLowerCase) ? recognizer[nameLowerCase].call(this, recognizer) : readSequence2.call(this, recognizer);
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "Function",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      children
    };
  }
  function generate20(node) {
    this.token(Function, node.name + "(");
    this.children(node);
    this.token(RightParenthesis, ")");
  }

  // node_modules/css-tree/lib/syntax/node/GeneralEnclosed.js
  var GeneralEnclosed_exports = {};
  __export(GeneralEnclosed_exports, {
    generate: () => generate21,
    name: () => name20,
    parse: () => parse21,
    structure: () => structure20
  });
  var name20 = "GeneralEnclosed";
  var structure20 = {
    kind: String,
    function: [String, null],
    children: [[]]
  };
  function parse21(kind) {
    const start = this.tokenStart;
    let functionName = null;
    if (this.tokenType === Function) {
      functionName = this.consumeFunctionName();
    } else {
      this.eat(LeftParenthesis);
    }
    const children = this.parseWithFallback(
      () => {
        const startValueToken = this.tokenIndex;
        const children2 = this.readSequence(this.scope.Value);
        if (this.eof === false && this.isBalanceEdge(startValueToken) === false) {
          this.error();
        }
        return children2;
      },
      () => this.createSingleNodeList(
        this.Raw(null, false)
      )
    );
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "GeneralEnclosed",
      loc: this.getLocation(start, this.tokenStart),
      kind,
      function: functionName,
      children
    };
  }
  function generate21(node) {
    if (node.function) {
      this.token(Function, node.function + "(");
    } else {
      this.token(LeftParenthesis, "(");
    }
    this.children(node);
    this.token(RightParenthesis, ")");
  }

  // node_modules/css-tree/lib/syntax/node/Hash.js
  var Hash_exports = {};
  __export(Hash_exports, {
    generate: () => generate22,
    name: () => name21,
    parse: () => parse22,
    structure: () => structure21,
    xxx: () => xxx
  });
  var xxx = "XXX";
  var name21 = "Hash";
  var structure21 = {
    value: String
  };
  function parse22() {
    const start = this.tokenStart;
    this.eat(Hash);
    return {
      type: "Hash",
      loc: this.getLocation(start, this.tokenStart),
      value: this.substrToCursor(start + 1)
    };
  }
  function generate22(node) {
    this.token(Hash, "#" + node.value);
  }

  // node_modules/css-tree/lib/syntax/node/Identifier.js
  var Identifier_exports = {};
  __export(Identifier_exports, {
    generate: () => generate23,
    name: () => name22,
    parse: () => parse23,
    structure: () => structure22
  });
  var name22 = "Identifier";
  var structure22 = {
    name: String
  };
  function parse23() {
    return {
      type: "Identifier",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      name: this.consume(Ident)
    };
  }
  function generate23(node) {
    this.token(Ident, node.name);
  }

  // node_modules/css-tree/lib/syntax/node/IdSelector.js
  var IdSelector_exports = {};
  __export(IdSelector_exports, {
    generate: () => generate24,
    name: () => name23,
    parse: () => parse24,
    structure: () => structure23
  });
  var name23 = "IdSelector";
  var structure23 = {
    name: String
  };
  function parse24() {
    const start = this.tokenStart;
    this.eat(Hash);
    return {
      type: "IdSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: this.substrToCursor(start + 1)
    };
  }
  function generate24(node) {
    this.token(Delim, "#" + node.name);
  }

  // node_modules/css-tree/lib/syntax/node/Layer.js
  var Layer_exports = {};
  __export(Layer_exports, {
    generate: () => generate25,
    name: () => name24,
    parse: () => parse25,
    structure: () => structure24
  });
  var FULLSTOP2 = 46;
  var name24 = "Layer";
  var structure24 = {
    name: String
  };
  function parse25() {
    let tokenStart = this.tokenStart;
    let name50 = this.consume(Ident);
    while (this.isDelim(FULLSTOP2)) {
      this.eat(Delim);
      name50 += "." + this.consume(Ident);
    }
    return {
      type: "Layer",
      loc: this.getLocation(tokenStart, this.tokenStart),
      name: name50
    };
  }
  function generate25(node) {
    this.tokenize(node.name);
  }

  // node_modules/css-tree/lib/syntax/node/LayerList.js
  var LayerList_exports = {};
  __export(LayerList_exports, {
    generate: () => generate26,
    name: () => name25,
    parse: () => parse26,
    structure: () => structure25
  });
  var name25 = "LayerList";
  var structure25 = {
    children: [[
      "Layer"
    ]]
  };
  function parse26() {
    const children = this.createList();
    this.skipSC();
    while (!this.eof) {
      children.push(this.Layer());
      if (this.lookupTypeNonSC(0) !== Comma) {
        break;
      }
      this.skipSC();
      this.next();
      this.skipSC();
    }
    return {
      type: "LayerList",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate26(node) {
    this.children(node, () => this.token(Comma, ","));
  }

  // node_modules/css-tree/lib/syntax/node/MediaQuery.js
  var MediaQuery_exports = {};
  __export(MediaQuery_exports, {
    generate: () => generate27,
    name: () => name26,
    parse: () => parse27,
    structure: () => structure26
  });
  var name26 = "MediaQuery";
  var structure26 = {
    modifier: [String, null],
    mediaType: [String, null],
    condition: ["Condition", null]
  };
  function parse27() {
    const start = this.tokenStart;
    let modifier = null;
    let mediaType = null;
    let condition = null;
    this.skipSC();
    if (this.tokenType === Ident && this.lookupTypeNonSC(1) !== LeftParenthesis) {
      const ident = this.consume(Ident);
      const identLowerCase = ident.toLowerCase();
      if (identLowerCase === "not" || identLowerCase === "only") {
        this.skipSC();
        modifier = identLowerCase;
        mediaType = this.consume(Ident);
      } else {
        mediaType = ident;
      }
      switch (this.lookupTypeNonSC(0)) {
        case Ident: {
          this.skipSC();
          this.eatIdent("and");
          condition = this.Condition("media");
          break;
        }
        case LeftCurlyBracket:
        case Semicolon:
        case Comma:
        case EOF:
          break;
        default:
          this.error("Identifier or parenthesis is expected");
      }
    } else {
      switch (this.tokenType) {
        case Ident:
        case LeftParenthesis:
        case Function: {
          condition = this.Condition("media");
          break;
        }
        case LeftCurlyBracket:
        case Semicolon:
        case EOF:
          break;
        default:
          this.error("Identifier or parenthesis is expected");
      }
    }
    return {
      type: "MediaQuery",
      loc: this.getLocation(start, this.tokenStart),
      modifier,
      mediaType,
      condition
    };
  }
  function generate27(node) {
    if (node.mediaType) {
      if (node.modifier) {
        this.token(Ident, node.modifier);
      }
      this.token(Ident, node.mediaType);
      if (node.condition) {
        this.token(Ident, "and");
        this.node(node.condition);
      }
    } else if (node.condition) {
      this.node(node.condition);
    }
  }

  // node_modules/css-tree/lib/syntax/node/MediaQueryList.js
  var MediaQueryList_exports = {};
  __export(MediaQueryList_exports, {
    generate: () => generate28,
    name: () => name27,
    parse: () => parse28,
    structure: () => structure27
  });
  var name27 = "MediaQueryList";
  var structure27 = {
    children: [[
      "MediaQuery"
    ]]
  };
  function parse28() {
    const children = this.createList();
    this.skipSC();
    while (!this.eof) {
      children.push(this.MediaQuery());
      if (this.tokenType !== Comma) {
        break;
      }
      this.next();
    }
    return {
      type: "MediaQueryList",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate28(node) {
    this.children(node, () => this.token(Comma, ","));
  }

  // node_modules/css-tree/lib/syntax/node/NestingSelector.js
  var NestingSelector_exports = {};
  __export(NestingSelector_exports, {
    generate: () => generate29,
    name: () => name28,
    parse: () => parse29,
    structure: () => structure28
  });
  var AMPERSAND5 = 38;
  var name28 = "NestingSelector";
  var structure28 = {};
  function parse29() {
    const start = this.tokenStart;
    this.eatDelim(AMPERSAND5);
    return {
      type: "NestingSelector",
      loc: this.getLocation(start, this.tokenStart)
    };
  }
  function generate29() {
    this.token(Delim, "&");
  }

  // node_modules/css-tree/lib/syntax/node/Nth.js
  var Nth_exports = {};
  __export(Nth_exports, {
    generate: () => generate30,
    name: () => name29,
    parse: () => parse30,
    structure: () => structure29
  });
  var name29 = "Nth";
  var structure29 = {
    nth: ["AnPlusB", "Identifier"],
    selector: ["SelectorList", null]
  };
  function parse30() {
    this.skipSC();
    const start = this.tokenStart;
    let end = start;
    let selector2 = null;
    let nth2;
    if (this.lookupValue(0, "odd") || this.lookupValue(0, "even")) {
      nth2 = this.Identifier();
    } else {
      nth2 = this.AnPlusB();
    }
    end = this.tokenStart;
    this.skipSC();
    if (this.lookupValue(0, "of")) {
      this.next();
      selector2 = this.SelectorList();
      end = this.tokenStart;
    }
    return {
      type: "Nth",
      loc: this.getLocation(start, end),
      nth: nth2,
      selector: selector2
    };
  }
  function generate30(node) {
    this.node(node.nth);
    if (node.selector !== null) {
      this.token(Ident, "of");
      this.node(node.selector);
    }
  }

  // node_modules/css-tree/lib/syntax/node/Number.js
  var Number_exports = {};
  __export(Number_exports, {
    generate: () => generate31,
    name: () => name30,
    parse: () => parse31,
    structure: () => structure30
  });
  var name30 = "Number";
  var structure30 = {
    value: String
  };
  function parse31() {
    return {
      type: "Number",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consume(Number2)
    };
  }
  function generate31(node) {
    this.token(Number2, node.value);
  }

  // node_modules/css-tree/lib/syntax/node/Operator.js
  var Operator_exports = {};
  __export(Operator_exports, {
    generate: () => generate32,
    name: () => name31,
    parse: () => parse32,
    structure: () => structure31
  });
  var name31 = "Operator";
  var structure31 = {
    value: String
  };
  function parse32() {
    const start = this.tokenStart;
    this.next();
    return {
      type: "Operator",
      loc: this.getLocation(start, this.tokenStart),
      value: this.substrToCursor(start)
    };
  }
  function generate32(node) {
    this.tokenize(node.value);
  }

  // node_modules/css-tree/lib/syntax/node/Parentheses.js
  var Parentheses_exports = {};
  __export(Parentheses_exports, {
    generate: () => generate33,
    name: () => name32,
    parse: () => parse33,
    structure: () => structure32
  });
  var name32 = "Parentheses";
  var structure32 = {
    children: [[]]
  };
  function parse33(readSequence2, recognizer) {
    const start = this.tokenStart;
    let children = null;
    this.eat(LeftParenthesis);
    children = readSequence2.call(this, recognizer);
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "Parentheses",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate33(node) {
    this.token(LeftParenthesis, "(");
    this.children(node);
    this.token(RightParenthesis, ")");
  }

  // node_modules/css-tree/lib/syntax/node/Percentage.js
  var Percentage_exports = {};
  __export(Percentage_exports, {
    generate: () => generate34,
    name: () => name33,
    parse: () => parse34,
    structure: () => structure33
  });
  var name33 = "Percentage";
  var structure33 = {
    value: String
  };
  function parse34() {
    return {
      type: "Percentage",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consumeNumber(Percentage)
    };
  }
  function generate34(node) {
    this.token(Percentage, node.value + "%");
  }

  // node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js
  var PseudoClassSelector_exports = {};
  __export(PseudoClassSelector_exports, {
    generate: () => generate35,
    name: () => name34,
    parse: () => parse35,
    structure: () => structure34,
    walkContext: () => walkContext6
  });
  var name34 = "PseudoClassSelector";
  var walkContext6 = "function";
  var structure34 = {
    name: String,
    children: [["Raw"], null]
  };
  function parse35() {
    const start = this.tokenStart;
    let children = null;
    let name50;
    let nameLowerCase;
    this.eat(Colon);
    if (this.tokenType === Function) {
      name50 = this.consumeFunctionName();
      nameLowerCase = name50.toLowerCase();
      if (this.lookupNonWSType(0) == RightParenthesis) {
        children = this.createList();
      } else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
        this.skipSC();
        children = this.pseudo[nameLowerCase].call(this);
        this.skipSC();
      } else {
        children = this.createList();
        children.push(
          this.Raw(null, false)
        );
      }
      this.eat(RightParenthesis);
    } else {
      name50 = this.consume(Ident);
    }
    return {
      type: "PseudoClassSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      children
    };
  }
  function generate35(node) {
    this.token(Colon, ":");
    if (node.children === null) {
      this.token(Ident, node.name);
    } else {
      this.token(Function, node.name + "(");
      this.children(node);
      this.token(RightParenthesis, ")");
    }
  }

  // node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js
  var PseudoElementSelector_exports = {};
  __export(PseudoElementSelector_exports, {
    generate: () => generate36,
    name: () => name35,
    parse: () => parse36,
    structure: () => structure35,
    walkContext: () => walkContext7
  });
  var name35 = "PseudoElementSelector";
  var walkContext7 = "function";
  var structure35 = {
    name: String,
    children: [["Raw"], null]
  };
  function parse36() {
    const start = this.tokenStart;
    let children = null;
    let name50;
    let nameLowerCase;
    this.eat(Colon);
    this.eat(Colon);
    if (this.tokenType === Function) {
      name50 = this.consumeFunctionName();
      nameLowerCase = name50.toLowerCase();
      if (this.lookupNonWSType(0) == RightParenthesis) {
        children = this.createList();
      } else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
        this.skipSC();
        children = this.pseudo[nameLowerCase].call(this);
        this.skipSC();
      } else {
        children = this.createList();
        children.push(
          this.Raw(null, false)
        );
      }
      this.eat(RightParenthesis);
    } else {
      name50 = this.consume(Ident);
    }
    return {
      type: "PseudoElementSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      children
    };
  }
  function generate36(node) {
    this.token(Colon, ":");
    this.token(Colon, ":");
    if (node.children === null) {
      this.token(Ident, node.name);
    } else {
      this.token(Function, node.name + "(");
      this.children(node);
      this.token(RightParenthesis, ")");
    }
  }

  // node_modules/css-tree/lib/syntax/node/Ratio.js
  var Ratio_exports = {};
  __export(Ratio_exports, {
    generate: () => generate37,
    name: () => name36,
    parse: () => parse37,
    structure: () => structure36
  });
  var SOLIDUS6 = 47;
  function consumeTerm() {
    this.skipSC();
    switch (this.tokenType) {
      case Number2:
        return this.Number();
      case Function:
        return this.Function(this.readSequence, this.scope.Value);
      default:
        this.error("Number of function is expected");
    }
  }
  var name36 = "Ratio";
  var structure36 = {
    left: ["Number", "Function"],
    right: ["Number", "Function", null]
  };
  function parse37() {
    const start = this.tokenStart;
    const left = consumeTerm.call(this);
    let right = null;
    this.skipSC();
    if (this.isDelim(SOLIDUS6)) {
      this.eatDelim(SOLIDUS6);
      right = consumeTerm.call(this);
    }
    return {
      type: "Ratio",
      loc: this.getLocation(start, this.tokenStart),
      left,
      right
    };
  }
  function generate37(node) {
    this.node(node.left);
    this.token(Delim, "/");
    if (node.right) {
      this.node(node.right);
    } else {
      this.node(Number2, 1);
    }
  }

  // node_modules/css-tree/lib/syntax/node/Raw.js
  var Raw_exports = {};
  __export(Raw_exports, {
    generate: () => generate38,
    name: () => name37,
    parse: () => parse38,
    structure: () => structure37
  });
  function getOffsetExcludeWS() {
    if (this.tokenIndex > 0) {
      if (this.lookupType(-1) === WhiteSpace) {
        return this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset;
      }
    }
    return this.tokenStart;
  }
  var name37 = "Raw";
  var structure37 = {
    value: String
  };
  function parse38(consumeUntil, excludeWhiteSpace) {
    const startOffset = this.getTokenStart(this.tokenIndex);
    let endOffset;
    this.skipUntilBalanced(this.tokenIndex, consumeUntil || this.consumeUntilBalanceEnd);
    if (excludeWhiteSpace && this.tokenStart > startOffset) {
      endOffset = getOffsetExcludeWS.call(this);
    } else {
      endOffset = this.tokenStart;
    }
    return {
      type: "Raw",
      loc: this.getLocation(startOffset, endOffset),
      value: this.substring(startOffset, endOffset)
    };
  }
  function generate38(node) {
    this.tokenize(node.value);
  }

  // node_modules/css-tree/lib/syntax/node/Rule.js
  var Rule_exports = {};
  __export(Rule_exports, {
    generate: () => generate39,
    name: () => name38,
    parse: () => parse39,
    structure: () => structure38,
    walkContext: () => walkContext8
  });
  function consumeRaw4() {
    return this.Raw(this.consumeUntilLeftCurlyBracket, true);
  }
  function consumePrelude() {
    const prelude = this.SelectorList();
    if (prelude.type !== "Raw" && this.eof === false && this.tokenType !== LeftCurlyBracket) {
      this.error();
    }
    return prelude;
  }
  var name38 = "Rule";
  var walkContext8 = "rule";
  var structure38 = {
    prelude: ["SelectorList", "Raw"],
    block: ["Block"]
  };
  function parse39() {
    const startToken = this.tokenIndex;
    const startOffset = this.tokenStart;
    let prelude;
    let block;
    if (this.parseRulePrelude) {
      prelude = this.parseWithFallback(consumePrelude, consumeRaw4);
    } else {
      prelude = consumeRaw4.call(this, startToken);
    }
    block = this.Block(true);
    return {
      type: "Rule",
      loc: this.getLocation(startOffset, this.tokenStart),
      prelude,
      block
    };
  }
  function generate39(node) {
    this.node(node.prelude);
    this.node(node.block);
  }

  // node_modules/css-tree/lib/syntax/node/Scope.js
  var Scope_exports = {};
  __export(Scope_exports, {
    generate: () => generate40,
    name: () => name39,
    parse: () => parse40,
    structure: () => structure39
  });
  var name39 = "Scope";
  var structure39 = {
    root: ["SelectorList", "Raw", null],
    limit: ["SelectorList", "Raw", null]
  };
  function parse40() {
    let root = null;
    let limit = null;
    this.skipSC();
    const startOffset = this.tokenStart;
    if (this.tokenType === LeftParenthesis) {
      this.next();
      this.skipSC();
      root = this.parseWithFallback(
        this.SelectorList,
        () => this.Raw(false, true)
      );
      this.skipSC();
      this.eat(RightParenthesis);
    }
    if (this.lookupNonWSType(0) === Ident) {
      this.skipSC();
      this.eatIdent("to");
      this.skipSC();
      this.eat(LeftParenthesis);
      this.skipSC();
      limit = this.parseWithFallback(
        this.SelectorList,
        () => this.Raw(false, true)
      );
      this.skipSC();
      this.eat(RightParenthesis);
    }
    return {
      type: "Scope",
      loc: this.getLocation(startOffset, this.tokenStart),
      root,
      limit
    };
  }
  function generate40(node) {
    if (node.root) {
      this.token(LeftParenthesis, "(");
      this.node(node.root);
      this.token(RightParenthesis, ")");
    }
    if (node.limit) {
      this.token(Ident, "to");
      this.token(LeftParenthesis, "(");
      this.node(node.limit);
      this.token(RightParenthesis, ")");
    }
  }

  // node_modules/css-tree/lib/syntax/node/Selector.js
  var Selector_exports = {};
  __export(Selector_exports, {
    generate: () => generate41,
    name: () => name40,
    parse: () => parse41,
    structure: () => structure40
  });
  var name40 = "Selector";
  var structure40 = {
    children: [[
      "TypeSelector",
      "IdSelector",
      "ClassSelector",
      "AttributeSelector",
      "PseudoClassSelector",
      "PseudoElementSelector",
      "Combinator"
    ]]
  };
  function parse41() {
    const children = this.readSequence(this.scope.Selector);
    if (this.getFirstListNode(children) === null) {
      this.error("Selector is expected");
    }
    return {
      type: "Selector",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate41(node) {
    this.children(node);
  }

  // node_modules/css-tree/lib/syntax/node/SelectorList.js
  var SelectorList_exports = {};
  __export(SelectorList_exports, {
    generate: () => generate42,
    name: () => name41,
    parse: () => parse42,
    structure: () => structure41,
    walkContext: () => walkContext9
  });
  var name41 = "SelectorList";
  var walkContext9 = "selector";
  var structure41 = {
    children: [[
      "Selector",
      "Raw"
    ]]
  };
  function parse42() {
    const children = this.createList();
    while (!this.eof) {
      children.push(this.Selector());
      if (this.tokenType === Comma) {
        this.next();
        continue;
      }
      break;
    }
    return {
      type: "SelectorList",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate42(node) {
    this.children(node, () => this.token(Comma, ","));
  }

  // node_modules/css-tree/lib/syntax/node/String.js
  var String_exports = {};
  __export(String_exports, {
    generate: () => generate43,
    name: () => name42,
    parse: () => parse43,
    structure: () => structure42
  });

  // node_modules/css-tree/lib/utils/string.js
  var REVERSE_SOLIDUS = 92;
  var QUOTATION_MARK = 34;
  var APOSTROPHE2 = 39;
  function decode(str) {
    const len = str.length;
    const firstChar = str.charCodeAt(0);
    const start = firstChar === QUOTATION_MARK || firstChar === APOSTROPHE2 ? 1 : 0;
    const end = start === 1 && len > 1 && str.charCodeAt(len - 1) === firstChar ? len - 2 : len - 1;
    let decoded = "";
    for (let i = start; i <= end; i++) {
      let code2 = str.charCodeAt(i);
      if (code2 === REVERSE_SOLIDUS) {
        if (i === end) {
          if (i !== len - 1) {
            decoded = str.substr(i + 1);
          }
          break;
        }
        code2 = str.charCodeAt(++i);
        if (isValidEscape(REVERSE_SOLIDUS, code2)) {
          const escapeStart = i - 1;
          const escapeEnd = consumeEscaped(str, escapeStart);
          i = escapeEnd - 1;
          decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
        } else {
          if (code2 === 13 && str.charCodeAt(i + 1) === 10) {
            i++;
          }
        }
      } else {
        decoded += str[i];
      }
    }
    return decoded;
  }
  function encode(str, apostrophe) {
    const quote = apostrophe ? "'" : '"';
    const quoteCode = apostrophe ? APOSTROPHE2 : QUOTATION_MARK;
    let encoded = "";
    let wsBeforeHexIsNeeded = false;
    for (let i = 0; i < str.length; i++) {
      const code2 = str.charCodeAt(i);
      if (code2 === 0) {
        encoded += "\uFFFD";
        continue;
      }
      if (code2 <= 31 || code2 === 127) {
        encoded += "\\" + code2.toString(16);
        wsBeforeHexIsNeeded = true;
        continue;
      }
      if (code2 === quoteCode || code2 === REVERSE_SOLIDUS) {
        encoded += "\\" + str.charAt(i);
        wsBeforeHexIsNeeded = false;
      } else {
        if (wsBeforeHexIsNeeded && (isHexDigit(code2) || isWhiteSpace(code2))) {
          encoded += " ";
        }
        encoded += str.charAt(i);
        wsBeforeHexIsNeeded = false;
      }
    }
    return quote + encoded + quote;
  }

  // node_modules/css-tree/lib/syntax/node/String.js
  var name42 = "String";
  var structure42 = {
    value: String
  };
  function parse43() {
    return {
      type: "String",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: decode(this.consume(String2))
    };
  }
  function generate43(node) {
    this.token(String2, encode(node.value));
  }

  // node_modules/css-tree/lib/syntax/node/StyleSheet.js
  var StyleSheet_exports = {};
  __export(StyleSheet_exports, {
    generate: () => generate44,
    name: () => name43,
    parse: () => parse44,
    structure: () => structure43,
    walkContext: () => walkContext10
  });
  var EXCLAMATIONMARK4 = 33;
  function consumeRaw5() {
    return this.Raw(null, false);
  }
  var name43 = "StyleSheet";
  var walkContext10 = "stylesheet";
  var structure43 = {
    children: [[
      "Comment",
      "CDO",
      "CDC",
      "Atrule",
      "Rule",
      "Raw"
    ]]
  };
  function parse44() {
    const start = this.tokenStart;
    const children = this.createList();
    let child;
    scan:
      while (!this.eof) {
        switch (this.tokenType) {
          case WhiteSpace:
            this.next();
            continue;
          case Comment:
            if (this.charCodeAt(this.tokenStart + 2) !== EXCLAMATIONMARK4) {
              this.next();
              continue;
            }
            child = this.Comment();
            break;
          case CDO:
            child = this.CDO();
            break;
          case CDC:
            child = this.CDC();
            break;
          // CSS Syntax Module Level 3
          // §2.2 Error handling
          // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
          case AtKeyword:
            child = this.parseWithFallback(this.Atrule, consumeRaw5);
            break;
          // Anything else starts a qualified rule ...
          default:
            child = this.parseWithFallback(this.Rule, consumeRaw5);
        }
        children.push(child);
      }
    return {
      type: "StyleSheet",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate44(node) {
    this.children(node);
  }

  // node_modules/css-tree/lib/syntax/node/SupportsDeclaration.js
  var SupportsDeclaration_exports = {};
  __export(SupportsDeclaration_exports, {
    generate: () => generate45,
    name: () => name44,
    parse: () => parse45,
    structure: () => structure44
  });
  var name44 = "SupportsDeclaration";
  var structure44 = {
    declaration: "Declaration"
  };
  function parse45() {
    const start = this.tokenStart;
    this.eat(LeftParenthesis);
    this.skipSC();
    const declaration = this.Declaration();
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "SupportsDeclaration",
      loc: this.getLocation(start, this.tokenStart),
      declaration
    };
  }
  function generate45(node) {
    this.token(LeftParenthesis, "(");
    this.node(node.declaration);
    this.token(RightParenthesis, ")");
  }

  // node_modules/css-tree/lib/syntax/node/TypeSelector.js
  var TypeSelector_exports = {};
  __export(TypeSelector_exports, {
    generate: () => generate46,
    name: () => name45,
    parse: () => parse46,
    structure: () => structure45
  });
  var ASTERISK5 = 42;
  var VERTICALLINE3 = 124;
  function eatIdentifierOrAsterisk() {
    if (this.tokenType !== Ident && this.isDelim(ASTERISK5) === false) {
      this.error("Identifier or asterisk is expected");
    }
    this.next();
  }
  var name45 = "TypeSelector";
  var structure45 = {
    name: String
  };
  function parse46() {
    const start = this.tokenStart;
    if (this.isDelim(VERTICALLINE3)) {
      this.next();
      eatIdentifierOrAsterisk.call(this);
    } else {
      eatIdentifierOrAsterisk.call(this);
      if (this.isDelim(VERTICALLINE3)) {
        this.next();
        eatIdentifierOrAsterisk.call(this);
      }
    }
    return {
      type: "TypeSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: this.substrToCursor(start)
    };
  }
  function generate46(node) {
    this.tokenize(node.name);
  }

  // node_modules/css-tree/lib/syntax/node/UnicodeRange.js
  var UnicodeRange_exports = {};
  __export(UnicodeRange_exports, {
    generate: () => generate47,
    name: () => name46,
    parse: () => parse47,
    structure: () => structure46
  });
  var PLUSSIGN8 = 43;
  var HYPHENMINUS6 = 45;
  var QUESTIONMARK3 = 63;
  function eatHexSequence(offset, allowDash) {
    let len = 0;
    for (let pos = this.tokenStart + offset; pos < this.tokenEnd; pos++) {
      const code2 = this.charCodeAt(pos);
      if (code2 === HYPHENMINUS6 && allowDash && len !== 0) {
        eatHexSequence.call(this, offset + len + 1, false);
        return -1;
      }
      if (!isHexDigit(code2)) {
        this.error(
          allowDash && len !== 0 ? "Hyphen minus" + (len < 6 ? " or hex digit" : "") + " is expected" : len < 6 ? "Hex digit is expected" : "Unexpected input",
          pos
        );
      }
      if (++len > 6) {
        this.error("Too many hex digits", pos);
      }
      ;
    }
    this.next();
    return len;
  }
  function eatQuestionMarkSequence(max) {
    let count = 0;
    while (this.isDelim(QUESTIONMARK3)) {
      if (++count > max) {
        this.error("Too many question marks");
      }
      this.next();
    }
  }
  function startsWith2(code2) {
    if (this.charCodeAt(this.tokenStart) !== code2) {
      this.error((code2 === PLUSSIGN8 ? "Plus sign" : "Hyphen minus") + " is expected");
    }
  }
  function scanUnicodeRange() {
    let hexLength = 0;
    switch (this.tokenType) {
      case Number2:
        hexLength = eatHexSequence.call(this, 1, true);
        if (this.isDelim(QUESTIONMARK3)) {
          eatQuestionMarkSequence.call(this, 6 - hexLength);
          break;
        }
        if (this.tokenType === Dimension || this.tokenType === Number2) {
          startsWith2.call(this, HYPHENMINUS6);
          eatHexSequence.call(this, 1, false);
          break;
        }
        break;
      case Dimension:
        hexLength = eatHexSequence.call(this, 1, true);
        if (hexLength > 0) {
          eatQuestionMarkSequence.call(this, 6 - hexLength);
        }
        break;
      default:
        this.eatDelim(PLUSSIGN8);
        if (this.tokenType === Ident) {
          hexLength = eatHexSequence.call(this, 0, true);
          if (hexLength > 0) {
            eatQuestionMarkSequence.call(this, 6 - hexLength);
          }
          break;
        }
        if (this.isDelim(QUESTIONMARK3)) {
          this.next();
          eatQuestionMarkSequence.call(this, 5);
          break;
        }
        this.error("Hex digit or question mark is expected");
    }
  }
  var name46 = "UnicodeRange";
  var structure46 = {
    value: String
  };
  function parse47() {
    const start = this.tokenStart;
    this.eatIdent("u");
    scanUnicodeRange.call(this);
    return {
      type: "UnicodeRange",
      loc: this.getLocation(start, this.tokenStart),
      value: this.substrToCursor(start)
    };
  }
  function generate47(node) {
    this.tokenize(node.value);
  }

  // node_modules/css-tree/lib/syntax/node/Url.js
  var Url_exports = {};
  __export(Url_exports, {
    generate: () => generate48,
    name: () => name47,
    parse: () => parse48,
    structure: () => structure47
  });

  // node_modules/css-tree/lib/utils/url.js
  var SPACE3 = 32;
  var REVERSE_SOLIDUS2 = 92;
  var QUOTATION_MARK2 = 34;
  var APOSTROPHE3 = 39;
  var LEFTPARENTHESIS3 = 40;
  var RIGHTPARENTHESIS3 = 41;
  function decode2(str) {
    const len = str.length;
    let start = 4;
    let end = str.charCodeAt(len - 1) === RIGHTPARENTHESIS3 ? len - 2 : len - 1;
    let decoded = "";
    while (start < end && isWhiteSpace(str.charCodeAt(start))) {
      start++;
    }
    while (start < end && isWhiteSpace(str.charCodeAt(end))) {
      end--;
    }
    for (let i = start; i <= end; i++) {
      let code2 = str.charCodeAt(i);
      if (code2 === REVERSE_SOLIDUS2) {
        if (i === end) {
          if (i !== len - 1) {
            decoded = str.substr(i + 1);
          }
          break;
        }
        code2 = str.charCodeAt(++i);
        if (isValidEscape(REVERSE_SOLIDUS2, code2)) {
          const escapeStart = i - 1;
          const escapeEnd = consumeEscaped(str, escapeStart);
          i = escapeEnd - 1;
          decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
        } else {
          if (code2 === 13 && str.charCodeAt(i + 1) === 10) {
            i++;
          }
        }
      } else {
        decoded += str[i];
      }
    }
    return decoded;
  }
  function encode2(str) {
    let encoded = "";
    let wsBeforeHexIsNeeded = false;
    for (let i = 0; i < str.length; i++) {
      const code2 = str.charCodeAt(i);
      if (code2 === 0) {
        encoded += "\uFFFD";
        continue;
      }
      if (code2 <= 31 || code2 === 127) {
        encoded += "\\" + code2.toString(16);
        wsBeforeHexIsNeeded = true;
        continue;
      }
      if (code2 === SPACE3 || code2 === REVERSE_SOLIDUS2 || code2 === QUOTATION_MARK2 || code2 === APOSTROPHE3 || code2 === LEFTPARENTHESIS3 || code2 === RIGHTPARENTHESIS3) {
        encoded += "\\" + str.charAt(i);
        wsBeforeHexIsNeeded = false;
      } else {
        if (wsBeforeHexIsNeeded && isHexDigit(code2)) {
          encoded += " ";
        }
        encoded += str.charAt(i);
        wsBeforeHexIsNeeded = false;
      }
    }
    return "url(" + encoded + ")";
  }

  // node_modules/css-tree/lib/syntax/node/Url.js
  var name47 = "Url";
  var structure47 = {
    value: String
  };
  function parse48() {
    const start = this.tokenStart;
    let value;
    switch (this.tokenType) {
      case Url:
        value = decode2(this.consume(Url));
        break;
      case Function:
        if (!this.cmpStr(this.tokenStart, this.tokenEnd, "url(")) {
          this.error("Function name must be `url`");
        }
        this.eat(Function);
        this.skipSC();
        value = decode(this.consume(String2));
        this.skipSC();
        if (!this.eof) {
          this.eat(RightParenthesis);
        }
        break;
      default:
        this.error("Url or Function is expected");
    }
    return {
      type: "Url",
      loc: this.getLocation(start, this.tokenStart),
      value
    };
  }
  function generate48(node) {
    this.token(Url, encode2(node.value));
  }

  // node_modules/css-tree/lib/syntax/node/Value.js
  var Value_exports = {};
  __export(Value_exports, {
    generate: () => generate49,
    name: () => name48,
    parse: () => parse49,
    structure: () => structure48
  });
  var name48 = "Value";
  var structure48 = {
    children: [[]]
  };
  function parse49() {
    const start = this.tokenStart;
    const children = this.readSequence(this.scope.Value);
    return {
      type: "Value",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate49(node) {
    this.children(node);
  }

  // node_modules/css-tree/lib/syntax/node/WhiteSpace.js
  var WhiteSpace_exports = {};
  __export(WhiteSpace_exports, {
    generate: () => generate50,
    name: () => name49,
    parse: () => parse50,
    structure: () => structure49
  });
  var SPACE4 = Object.freeze({
    type: "WhiteSpace",
    loc: null,
    value: " "
  });
  var name49 = "WhiteSpace";
  var structure49 = {
    value: String
  };
  function parse50() {
    this.eat(WhiteSpace);
    return SPACE4;
  }
  function generate50(node) {
    this.token(WhiteSpace, node.value);
  }

  // node_modules/css-tree/lib/syntax/config/lexer.js
  var lexer_default = {
    generic: true,
    cssWideKeywords,
    ...data_default,
    node: node_exports
  };

  // node_modules/css-tree/lib/syntax/scope/index.js
  var scope_exports = {};
  __export(scope_exports, {
    AtrulePrelude: () => atrulePrelude_default,
    Selector: () => selector_default,
    Value: () => value_default
  });

  // node_modules/css-tree/lib/syntax/scope/default.js
  var NUMBERSIGN4 = 35;
  var ASTERISK6 = 42;
  var PLUSSIGN9 = 43;
  var HYPHENMINUS7 = 45;
  var SOLIDUS7 = 47;
  var U2 = 117;
  function defaultRecognizer(context) {
    switch (this.tokenType) {
      case Hash:
        return this.Hash();
      case Comma:
        return this.Operator();
      case LeftParenthesis:
        return this.Parentheses(this.readSequence, context.recognizer);
      case LeftSquareBracket:
        return this.Brackets(this.readSequence, context.recognizer);
      case String2:
        return this.String();
      case Dimension:
        return this.Dimension();
      case Percentage:
        return this.Percentage();
      case Number2:
        return this.Number();
      case Function:
        return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, context.recognizer);
      case Url:
        return this.Url();
      case Ident:
        if (this.cmpChar(this.tokenStart, U2) && this.cmpChar(this.tokenStart + 1, PLUSSIGN9)) {
          return this.UnicodeRange();
        } else {
          return this.Identifier();
        }
      case Delim: {
        const code2 = this.charCodeAt(this.tokenStart);
        if (code2 === SOLIDUS7 || code2 === ASTERISK6 || code2 === PLUSSIGN9 || code2 === HYPHENMINUS7) {
          return this.Operator();
        }
        if (code2 === NUMBERSIGN4) {
          this.error("Hex or identifier is expected", this.tokenStart + 1);
        }
        break;
      }
    }
  }

  // node_modules/css-tree/lib/syntax/scope/atrulePrelude.js
  var atrulePrelude_default = {
    getNode: defaultRecognizer
  };

  // node_modules/css-tree/lib/syntax/scope/selector.js
  var NUMBERSIGN5 = 35;
  var AMPERSAND6 = 38;
  var ASTERISK7 = 42;
  var PLUSSIGN10 = 43;
  var SOLIDUS8 = 47;
  var FULLSTOP3 = 46;
  var GREATERTHANSIGN4 = 62;
  var VERTICALLINE4 = 124;
  var TILDE3 = 126;
  function onWhiteSpace(next, children) {
    if (children.last !== null && children.last.type !== "Combinator" && next !== null && next.type !== "Combinator") {
      children.push({
        // FIXME: this.Combinator() should be used instead
        type: "Combinator",
        loc: null,
        name: " "
      });
    }
  }
  function getNode() {
    switch (this.tokenType) {
      case LeftSquareBracket:
        return this.AttributeSelector();
      case Hash:
        return this.IdSelector();
      case Colon:
        if (this.lookupType(1) === Colon) {
          return this.PseudoElementSelector();
        } else {
          return this.PseudoClassSelector();
        }
      case Ident:
        return this.TypeSelector();
      case Number2:
      case Percentage:
        return this.Percentage();
      case Dimension:
        if (this.charCodeAt(this.tokenStart) === FULLSTOP3) {
          this.error("Identifier is expected", this.tokenStart + 1);
        }
        break;
      case Delim: {
        const code2 = this.charCodeAt(this.tokenStart);
        switch (code2) {
          case PLUSSIGN10:
          case GREATERTHANSIGN4:
          case TILDE3:
          case SOLIDUS8:
            return this.Combinator();
          case FULLSTOP3:
            return this.ClassSelector();
          case ASTERISK7:
          case VERTICALLINE4:
            return this.TypeSelector();
          case NUMBERSIGN5:
            return this.IdSelector();
          case AMPERSAND6:
            return this.NestingSelector();
        }
        break;
      }
    }
  }
  var selector_default = {
    onWhiteSpace,
    getNode
  };

  // node_modules/css-tree/lib/syntax/function/expression.js
  function expression_default() {
    return this.createSingleNodeList(
      this.Raw(null, false)
    );
  }

  // node_modules/css-tree/lib/syntax/function/var.js
  function var_default() {
    const children = this.createList();
    this.skipSC();
    children.push(this.Identifier());
    this.skipSC();
    if (this.tokenType === Comma) {
      children.push(this.Operator());
      const startIndex = this.tokenIndex;
      const value = this.parseCustomProperty ? this.Value(null) : this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
      if (value.type === "Value" && value.children.isEmpty) {
        for (let offset = startIndex - this.tokenIndex; offset <= 0; offset++) {
          if (this.lookupType(offset) === WhiteSpace) {
            value.children.appendData({
              type: "WhiteSpace",
              loc: null,
              value: " "
            });
            break;
          }
        }
      }
      children.push(value);
    }
    return children;
  }

  // node_modules/css-tree/lib/syntax/scope/value.js
  function isPlusMinusOperator(node) {
    return node !== null && node.type === "Operator" && (node.value[node.value.length - 1] === "-" || node.value[node.value.length - 1] === "+");
  }
  var value_default = {
    getNode: defaultRecognizer,
    onWhiteSpace(next, children) {
      if (isPlusMinusOperator(next)) {
        next.value = " " + next.value;
      }
      if (isPlusMinusOperator(children.last)) {
        children.last.value += " ";
      }
    },
    "expression": expression_default,
    "var": var_default
  };

  // node_modules/css-tree/lib/syntax/atrule/container.js
  var nonContainerNameKeywords = /* @__PURE__ */ new Set(["none", "and", "not", "or"]);
  var container_default = {
    parse: {
      prelude() {
        const children = this.createList();
        if (this.tokenType === Ident) {
          const name50 = this.substring(this.tokenStart, this.tokenEnd);
          if (!nonContainerNameKeywords.has(name50.toLowerCase())) {
            children.push(this.Identifier());
          }
        }
        children.push(this.Condition("container"));
        return children;
      },
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/font-face.js
  var font_face_default = {
    parse: {
      prelude: null,
      block() {
        return this.Block(true);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/import.js
  function parseWithFallback(parse52, fallback) {
    return this.parseWithFallback(
      () => {
        try {
          return parse52.call(this);
        } finally {
          this.skipSC();
          if (this.lookupNonWSType(0) !== RightParenthesis) {
            this.error();
          }
        }
      },
      fallback || (() => this.Raw(null, true))
    );
  }
  var parseFunctions = {
    layer() {
      this.skipSC();
      const children = this.createList();
      const node = parseWithFallback.call(this, this.Layer);
      if (node.type !== "Raw" || node.value !== "") {
        children.push(node);
      }
      return children;
    },
    supports() {
      this.skipSC();
      const children = this.createList();
      const node = parseWithFallback.call(
        this,
        this.Declaration,
        () => parseWithFallback.call(this, () => this.Condition("supports"))
      );
      if (node.type !== "Raw" || node.value !== "") {
        children.push(node);
      }
      return children;
    }
  };
  var import_default3 = {
    parse: {
      prelude() {
        const children = this.createList();
        switch (this.tokenType) {
          case String2:
            children.push(this.String());
            break;
          case Url:
          case Function:
            children.push(this.Url());
            break;
          default:
            this.error("String or url() is expected");
        }
        this.skipSC();
        if (this.tokenType === Ident && this.cmpStr(this.tokenStart, this.tokenEnd, "layer")) {
          children.push(this.Identifier());
        } else if (this.tokenType === Function && this.cmpStr(this.tokenStart, this.tokenEnd, "layer(")) {
          children.push(this.Function(null, parseFunctions));
        }
        this.skipSC();
        if (this.tokenType === Function && this.cmpStr(this.tokenStart, this.tokenEnd, "supports(")) {
          children.push(this.Function(null, parseFunctions));
        }
        if (this.lookupNonWSType(0) === Ident || this.lookupNonWSType(0) === LeftParenthesis) {
          children.push(this.MediaQueryList());
        }
        return children;
      },
      block: null
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/layer.js
  var layer_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.LayerList()
        );
      },
      block() {
        return this.Block(false);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/media.js
  var media_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.MediaQueryList()
        );
      },
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/nest.js
  var nest_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block() {
        return this.Block(true);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/page.js
  var page_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block() {
        return this.Block(true);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/scope.js
  var scope_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.Scope()
        );
      },
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/starting-style.js
  var starting_style_default = {
    parse: {
      prelude: null,
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/supports.js
  var supports_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.Condition("supports")
        );
      },
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/css-tree/lib/syntax/atrule/index.js
  var atrule_default = {
    container: container_default,
    "font-face": font_face_default,
    import: import_default3,
    layer: layer_default,
    media: media_default,
    nest: nest_default,
    page: page_default,
    scope: scope_default,
    "starting-style": starting_style_default,
    supports: supports_default
  };

  // node_modules/css-tree/lib/syntax/pseudo/lang.js
  function parseLanguageRangeList() {
    const children = this.createList();
    this.skipSC();
    loop: while (!this.eof) {
      switch (this.tokenType) {
        case Ident:
          children.push(this.Identifier());
          break;
        case String2:
          children.push(this.String());
          break;
        case Comma:
          children.push(this.Operator());
          break;
        case RightParenthesis:
          break loop;
        default:
          this.error("Identifier, string or comma is expected");
      }
      this.skipSC();
    }
    return children;
  }

  // node_modules/css-tree/lib/syntax/pseudo/index.js
  var selectorList = {
    parse() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    }
  };
  var selector = {
    parse() {
      return this.createSingleNodeList(
        this.Selector()
      );
    }
  };
  var identList = {
    parse() {
      return this.createSingleNodeList(
        this.Identifier()
      );
    }
  };
  var langList = {
    parse: parseLanguageRangeList
  };
  var nth = {
    parse() {
      return this.createSingleNodeList(
        this.Nth()
      );
    }
  };
  var pseudo_default = {
    "dir": identList,
    "has": selectorList,
    "lang": langList,
    "matches": selectorList,
    "is": selectorList,
    "-moz-any": selectorList,
    "-webkit-any": selectorList,
    "where": selectorList,
    "not": selectorList,
    "nth-child": nth,
    "nth-last-child": nth,
    "nth-last-of-type": nth,
    "nth-of-type": nth,
    "slotted": selector,
    "host": selector,
    "host-context": selector
  };

  // node_modules/css-tree/lib/syntax/node/index-parse.js
  var index_parse_exports = {};
  __export(index_parse_exports, {
    AnPlusB: () => parse2,
    Atrule: () => parse3,
    AtrulePrelude: () => parse4,
    AttributeSelector: () => parse5,
    Block: () => parse6,
    Brackets: () => parse7,
    CDC: () => parse8,
    CDO: () => parse9,
    ClassSelector: () => parse10,
    Combinator: () => parse11,
    Comment: () => parse12,
    Condition: () => parse13,
    Declaration: () => parse14,
    DeclarationList: () => parse15,
    Dimension: () => parse16,
    Feature: () => parse17,
    FeatureFunction: () => parse18,
    FeatureRange: () => parse19,
    Function: () => parse20,
    GeneralEnclosed: () => parse21,
    Hash: () => parse22,
    IdSelector: () => parse24,
    Identifier: () => parse23,
    Layer: () => parse25,
    LayerList: () => parse26,
    MediaQuery: () => parse27,
    MediaQueryList: () => parse28,
    NestingSelector: () => parse29,
    Nth: () => parse30,
    Number: () => parse31,
    Operator: () => parse32,
    Parentheses: () => parse33,
    Percentage: () => parse34,
    PseudoClassSelector: () => parse35,
    PseudoElementSelector: () => parse36,
    Ratio: () => parse37,
    Raw: () => parse38,
    Rule: () => parse39,
    Scope: () => parse40,
    Selector: () => parse41,
    SelectorList: () => parse42,
    String: () => parse43,
    StyleSheet: () => parse44,
    SupportsDeclaration: () => parse45,
    TypeSelector: () => parse46,
    UnicodeRange: () => parse47,
    Url: () => parse48,
    Value: () => parse49,
    WhiteSpace: () => parse50
  });

  // node_modules/css-tree/lib/syntax/config/parser.js
  var parser_default = {
    parseContext: {
      default: "StyleSheet",
      stylesheet: "StyleSheet",
      atrule: "Atrule",
      atrulePrelude(options) {
        return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
      },
      mediaQueryList: "MediaQueryList",
      mediaQuery: "MediaQuery",
      condition(options) {
        return this.Condition(options.kind);
      },
      rule: "Rule",
      selectorList: "SelectorList",
      selector: "Selector",
      block() {
        return this.Block(true);
      },
      declarationList: "DeclarationList",
      declaration: "Declaration",
      value: "Value"
    },
    features: {
      supports: {
        selector() {
          return this.Selector();
        }
      },
      container: {
        style() {
          return this.Declaration();
        }
      }
    },
    scope: scope_exports,
    atrule: atrule_default,
    pseudo: pseudo_default,
    node: index_parse_exports
  };

  // node_modules/css-tree/lib/syntax/config/walker.js
  var walker_default = {
    node: node_exports
  };

  // node_modules/css-tree/lib/syntax/index.js
  var syntax_default = create_default({
    ...lexer_default,
    ...parser_default,
    ...walker_default
  });

  // node_modules/css-tree/lib/index.js
  var {
    tokenize: tokenize2,
    parse: parse51,
    generate: generate51,
    lexer,
    createLexer,
    walk: walk2,
    find,
    findLast,
    findAll,
    toPlainObject,
    fromPlainObject,
    fork
  } = syntax_default;

  // node_modules/css-tree/lib/parser/index.js
  var parser_default2 = createParser(parser_default);

  // node_modules/@projectwallace/format-css/dist/format-css.js
  var a = " ";
  var c = "";
  var $ = ":";
  var x = ";";
  var g = '"';
  var I = "(";
  var v = ")";
  var ee = "[";
  var te = "]";
  var V = "{";
  var W = "}";
  var re = "{}";
  var Z = ",";
  var j = "Atrule";
  var F4 = "Rule";
  var G = "Block";
  var Q = "SelectorList";
  var Y = "Selector";
  var w = "Declaration";
  var B = "Operator";
  function C(y) {
    return /[A-Z]/.test(y) ? y.toLowerCase() : y;
  }
  function ne(y, {
    minify: O2 = false,
    tab_size: S = void 0
  } = /* @__PURE__ */ Object.create(null)) {
    if (S !== void 0 && Number(S) < 1)
      throw new TypeError("tab_size must be a number greater than 0");
    let T2 = [], k = parser_default2(y, {
      positions: true,
      parseAtrulePrelude: false,
      parseCustomProperty: true,
      parseValue: true,
      onComment: (n, e) => {
        T2.push(e.start.offset, e.end.offset);
      }
    });
    const u = O2 ? c : `
`, p = O2 ? c : a, h = O2 ? c : x;
    let s = 0;
    function i(n) {
      return O2 === true ? c : S !== void 0 ? a.repeat(S * n) : "	".repeat(n);
    }
    function P2(n) {
      let e = n.loc;
      return e == null ? c : y.slice(e.start.offset, e.end.offset);
    }
    function b(n) {
      return (
        /** @type {import('css-tree').CssLocation} */
        n.loc.start.offset
      );
    }
    function E(n) {
      return (
        /** @type {import('css-tree').CssLocation} */
        n.loc.end.offset
      );
    }
    function m(n, e) {
      if (O2 === true || n === void 0 || e === void 0)
        return c;
      let t = "";
      for (let r = 0; r < T2.length; r += 2) {
        let l = T2[r];
        if (l === void 0 || l < n) continue;
        let f = T2[r + 1];
        if (f === void 0 || f > e) break;
        t.length > 0 && (t += u + i(s)), t += y.slice(l, f);
      }
      return t;
    }
    function M2(n) {
      let e, t = n.prelude, r = n.block;
      t.type === Q && (e = q2(t));
      let l = m(E(t), b(r));
      return l && (e += u + i(s) + l), r.type === G && (e += K2(r)), e;
    }
    function q2(n) {
      let e = c;
      return n.children.forEach((t, r) => {
        t.type === Y && (e += i(s) + A2(t)), r.next !== null && (e += Z + u);
        let l = r.next !== null ? b(r.next.data) : E(n), f = m(E(t), l);
        f && (e += i(s) + f + u);
      }), e;
    }
    function A2(n) {
      let e = c;
      return (n.children || []).forEach((r) => {
        switch (r.type) {
          case "TypeSelector": {
            e += C(r.name);
            break;
          }
          case "Combinator": {
            e += a, r.name !== " " && (e += r.name + a);
            break;
          }
          case "PseudoClassSelector":
          case "PseudoElementSelector": {
            e += $;
            let l = C(r.name);
            (l === "before" || l === "after" || r.type === "PseudoElementSelector") && (e += $), e += l, r.children !== null && (e += I + A2(r) + v);
            break;
          }
          case Q: {
            r.children.forEach((l, f) => {
              l.type === Y && (e += A2(l)), f.next !== null && f.next.data.type === Y && (e += Z + p);
            });
            break;
          }
          case "Nth": {
            let l = r.nth;
            if (l.type === "AnPlusB") {
              let f = l.a, o = l.b;
              f !== null && (e += f + "n"), f !== null && o !== null && (e += a), o !== null && (f !== null && !o.startsWith("-") && (e += "+" + a), e += o);
            } else
              e += P2(l);
            r.selector !== null && (e += a + "of" + a + A2(r.selector));
            break;
          }
          case "AttributeSelector": {
            e += ee, e += r.name.name, r.matcher !== null && r.value !== null && (e += r.matcher, e += g, r.value.type === "String" ? e += r.value.value : r.value.type === "Identifier" && (e += r.value.name), e += g), r.flags !== null && (e += a + r.flags), e += te;
            break;
          }
          case "NestingSelector": {
            e += "&";
            break;
          }
          default: {
            e += P2(r);
            break;
          }
        }
      }), e;
    }
    function K2(n) {
      let e = n.children, t = p;
      if (e.isEmpty) {
        let f = m(b(n), E(n));
        return f ? (t += V + u, t += i(s + 1) + f, t += u + i(s) + W, t) : t + re;
      }
      t += V + u, s++;
      let r = m(b(n), b(
        /** @type {import('css-tree').CssNode} */
        e.first
      ));
      r && (t += i(s) + r + u), e.forEach((f, o) => {
        if (o.prev !== null) {
          let H2 = m(E(o.prev.data), b(f));
          H2 && (t += i(s) + H2 + u);
        }
        f.type === w ? (t += X(f), o.next === null ? t += h : t += x) : (o.prev !== null && o.prev.data.type === w && (t += u), f.type === F4 ? t += M2(f) : f.type === j ? t += U4(f) : t += R5(f, s)), o.next !== null && (t += u, f.type !== w && (t += u));
      });
      let l = m(E(
        /** @type {import('css-tree').CssNode} */
        e.last
      ), E(n));
      return l && (t += u + i(s) + l), s--, t += u + i(s) + W, t;
    }
    function U4(n) {
      let e = i(s) + "@", t = n.prelude, r = n.block;
      return e += C(n.name), t !== null && (e += a + J2(t)), r === null ? e += x : r.type === G && (e += K2(r)), e;
    }
    function J2(n) {
      let e = P2(n);
      return e.replace(/\s*([:,])/g, e.toLowerCase().includes("selector(") ? "$1" : "$1 ").replace(/\)([a-zA-Z])/g, ") $1").replace(/\s*(=>|<=)\s*/g, " $1 ").replace(/([^<>=\s])([<>])([^<>=\s])/g, `$1${p}$2${p}$3`).replace(/\s+/g, p).replace(/calc\(\s*([^()+\-*/]+)\s*([*/+-])\s*([^()+\-*/]+)\s*\)/g, (t, r, l, f) => {
        let o = l === "+" || l === "-" ? a : p;
        return `calc(${r.trim()}${o}${l}${o}${f.trim()})`;
      }).replace(/selector|url|supports|layer\(/ig, (t) => C(t));
    }
    function X(n) {
      let e = n.property;
      e.charCodeAt(0) === 45 && e.charCodeAt(1) === 45 || (e = C(e));
      let t = D(n.value);
      return e === "font" && (t = t.replace(/\s*\/\s*/, "/")), t === c && O2 === true && (t += a), n.important === true ? t += p + "!important" : typeof n.important == "string" && (t += p + "!" + C(n.important)), i(s) + e + $ + p + t;
    }
    function N6(n) {
      let e = c;
      return n.forEach((t, r) => {
        t.type === "Identifier" ? e += t.name : t.type === "Function" ? e += C(t.name) + I + N6(t.children) + v : t.type === "Dimension" ? e += t.value + C(t.unit) : t.type === "Value" ? e += D(t) : t.type === B ? e += z2(t) : t.type === "Parentheses" ? e += I + N6(t.children) + v : t.type === "Url" ? e += "url(" + g + t.value + g + v : e += P2(t), t.type !== B && r.next !== null && r.next.data.type !== B && (e += a);
      }), e;
    }
    function z2(n) {
      let e = c, t = n.value.trim(), r = t.charCodeAt(0);
      return r === 43 || r === 45 ? e += a : r !== 44 && (e += p), e += t, r === 43 || r === 45 ? e += a : e += p, e;
    }
    function D(n) {
      return n.type === "Raw" ? R5(n, 0) : N6(n.children);
    }
    function R5(n, e) {
      return i(e) + P2(n).trim();
    }
    let L = k.children, _ = c;
    if (L.first !== null) {
      let n = m(0, b(L.first));
      n && (_ += n + u), L.forEach((t, r) => {
        if (t.type === F4 ? _ += M2(t) : t.type === j ? _ += U4(t) : _ += R5(t, s), r.next !== null) {
          _ += u;
          let l = m(E(t), b(r.next.data));
          l && (_ += i(s) + l), _ += u;
        }
      });
      let e = m(E(
        /** @type {import('css-tree').CssNode} */
        L.last
      ), E(k));
      e && (_ += u + e);
    } else
      _ += m(0, E(k));
    return _;
  }

  // src/cssom/cssom.js
  function getCSSOMStringFromCSS(cssString) {
    const styleElement = document.createElement("style");
    styleElement.textContent = cssString;
    document.head.appendChild(styleElement);
    const sheet = styleElement.sheet;
    let result = "";
    if (sheet && sheet.cssRules) {
      for (let rule of sheet.cssRules) {
        result += rule.cssText + "\n";
      }
    }
    document.head.removeChild(styleElement);
    return result.trim();
  }

  // src/utils/loadStylesheets.js
  async function getCSStext(link, seen = /* @__PURE__ */ new Set()) {
    try {
      if (seen.has(link)) {
        console.warn(`Skipping circular import: ${link}`);
        return "";
      }
      seen.add(link);
      const res = await fetch(link);
      if (!res.ok) throw new Error(`Failed to load CSS: ${res.status} ${link}`);
      const css = await res.text();
      const ast = parse51(css, { positions: true });
      const imports = [];
      walk2(ast, {
        visit: "Atrule",
        enter(node, list, item) {
          if (node.name === "import" && node.prelude) {
            const importURL = generate51(node.prelude).replace(/url\(|\)|'|"/g, "").trim();
            if (importURL) imports.push(importURL);
          }
        }
      });
      let resolvedImports = "";
      for (const i of imports) {
        const resolved = new URL(i, link).href;
        const importedCSS = await getCSStext(resolved, seen);
        resolvedImports += `
/* Imported from ${resolved} */
${importedCSS}`;
      }
      const cssWithoutImports = generate51(
        fromPlainObject(
          JSON.parse(
            JSON.stringify(
              ast,
              (key, value) => key === "name" && value === "import" ? "paged-imported" : value
            )
          )
        )
      );
      return `${resolvedImports}
${cssWithoutImports}`;
    } catch (err) {
      console.warn(`Could not fetch ${link}:`, err);
      return "";
    }
  }
  async function loadAllStylesheets() {
    const links = [...document.querySelectorAll(`link[href*=".css"]`)];
    const stylesheets = [];
    await Promise.all(
      links.map(async (link) => {
        if (link.dataset.pagedjsIgnore) return;
        const filename = new URL(link.href);
        let rules = await getCSStext(link.href);
        rules = ne(rules, { tab_size: 2 });
        const cssom = getCSSOMStringFromCSS(rules);
        const ast = parse51(rules, { positions: true });
        stylesheets.push({ filename, rules, ast, cssom });
      })
    );
    return stylesheets;
  }

  // src/modules/renames/value.js
  function renameValue({ value, property: property2, replacement, ast }) {
    if (!value) return [];
    const matches = [];
    csstree.walk(ast, {
      visit: "Declaration",
      enter: (node, item, list) => {
        if (!property2 || node.property === property2) {
          const valueString = csstree.generate(node.value);
          if (valueString === value) {
            matches.push({ node, item, list, valueString, valueAST: node.value });
          }
        }
      }
    });
    for (const match of matches) {
      const { node, item, list, valueString, valueAST } = match;
      let replacementValueString;
      if (typeof replacement === "function") {
        replacementValueString = replacement({
          node,
          valueAST,
          valueString
        });
        if (typeof replacementValueString !== "string") {
          throw new Error("replacement function must return a string");
        }
      } else {
        replacementValueString = replacement;
      }
      const newDeclaration = {
        type: "Declaration",
        loc: node.loc,
        important: node.important,
        property: node.property,
        value: csstree.parse(replacementValueString, { context: "value" })
      };
      const newItem = list.createItem(newDeclaration);
      list.replace(item, newItem);
    }
    return matches;
  }

  // src/modules/renames/atrules.js
  function renameAtRule({ name: name50, replacement, ast }) {
    if (!name50) return;
    if (!replacement) return;
    const replacements = [];
    csstree.walk(ast, {
      visit: "Atrule",
      enter: (node, item, list) => {
        if (node.name === name50) {
          replacements.push({ node, item, list });
        }
      }
    });
    for (const { node, item, list } of replacements) {
      let prelude = {};
      if (node.prelude) {
        prelude.name = csstree.generate(node.prelude).trim().split(":")[0].trim();
        if (csstree.generate(node.prelude).trim().split(":")[1]) {
          prelude.pseudo = csstree.generate(node.prelude).replace(/\(/g, "_").replace(/\)/g, "").split(":")[1].trim();
        }
      }
      console.log(prelude);
      const newRule = {
        type: "Rule",
        prelude: csstree.parse(
          `${replacement ? replacement : `.paged-${name50}`}${prelude.name ? `.paged-name-${prelude.name}` : ``}${prelude.pseudo ? `.paged-pseudo-${prelude.pseudo.trim()}` : ``}`,
          { context: "selectorList" }
        ),
        loc: node.loc,
        block: csstree.clone(node.block)
      };
      const newItem = list.createItem(newRule);
      list.replace(item, newItem);
    }
  }

  // src/modules/renames/property.js
  function renameProperty({ property: property2, replacement, ast }) {
    const matches = [];
    csstree.walk(ast, {
      visit: "Declaration",
      enter: (node, item, list) => {
        if (node.property === property2) {
          matches.push({
            node,
            item,
            list,
            valueAST: node.value
          });
        }
      }
    });
    for (const { node, item, list, valueAST } of matches) {
      let newProperty;
      if (typeof replacement === "function") {
        newProperty = replacement({
          node,
          property: node.property,
          valueAST
        });
        if (typeof newProperty !== "string") {
          throw new Error("replacement function must return a string");
        }
      } else {
        newProperty = replacement;
      }
      const newDeclaration = {
        type: "Declaration",
        loc: node.loc,
        important: node.important,
        property: newProperty,
        value: node.value
      };
      const newItem = list.createItem(newDeclaration);
      list.replace(item, newItem);
    }
    return matches;
  }

  // src/modules/dictionnary.js
  var properties2 = [
    ["bleed", "--paged-bleed"],
    ["string-set", "--string-set"],
    ["marks", "--paged-marks"]
  ];
  var atRules = [
    //@page
    ["page", "paged-page"],
    //@footnotes
    ["footnotes", ".paged-footnotes"],
    // @top margins
    ["top-left-corner", "& .top-left-corner"],
    ["top-left", "& .top-left"],
    ["top-center", "& .top-center"],
    ["top-right", "& .top-right"],
    ["top-right-corner", "& .top-right-corner"],
    // @bottom margins
    ["bottom-left-corner", "& .bottom-left-corner"],
    ["bottom-left", "& .bottom-left"],
    ["bottom-center", "& .bottom-center"],
    ["bottom-right", "& .bottom-right"],
    ["bottom-right-corner", "& .bottom-right-corner"],
    // @left margins
    ["left-top", "& .left-top"],
    ["left-middle", "& .left-middle"],
    ["left-bottom", "& .left-bottom"],
    // @right margins
    ["right-top", "& .right-top"],
    ["right-middle", "& .right-middle"],
    ["right-bottom", "& .right-bottom"]
  ];
  var values = [["bottom", "var(--paged-bottom)", "float"]];
  function pagedjsRenamer(ast) {
    for (const [property2, replacement] of properties2) {
      renameProperty({ property: property2, replacement, ast });
    }
    for (const [name50, replacement] of atRules) {
      renameAtRule({ name: name50, replacement, ast });
    }
    for (const [value, replacement, property2] of values) {
      renameValue({ value, replacement, property: property2, ast });
    }
    return ast;
  }

  // node_modules/@andypf/json-viewer/dist/esm/index.js
  var q = `.container{background-color:var(--base00);color:var(--base05);padding:10px;letter-spacing:0.5px;font-family:monospace;border-radius:3px}.toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:5px;border-bottom:solid 1px var(--base02)}.toolbar .options,.toolbar .search-wrapper{display:flex;align-items:center}.toolbar .icon-wrapper{height:15px;display:flex;align-items:center;padding:2px 5px}.toolbar .icon-wrapper:hover{background-color:var(--base02);border-radius:3px}.toolbar .icon-wrapper:first-child{margin-left:0px}.toolbar .search.icon{margin-right:5px}.toolbar .search-input{border:none;background:transparent;outline:none;flex:1;font-size:16px;color:var(--base0D)}.match{background-color:yellow;font-weight:bold;color:red}.data-row{padding:3px 0}.data-row .data-row{border-left:solid 1px var(--base02);padding-left:20px;margin-left:5px;display:none}.data-row.expanded>.data-row{display:block}.data-row .key-value-wrapper{display:flex;align-items:center}.data-row .key{color:var(--base07)}.data-row .key.number{color:var(--base0C)}.data-row .colon{color:var(--base07);margin:0 5px 0 0}.clickable{cursor:pointer}.data-row .opening-parenthesis,.data-row .closing-parenthesis{color:var(--base07)}.data-row .ellipsis{color:var(--base09)}.data-row.expanded>.key-value-wrapper .closing-parenthesis,.data-row.expanded>.key-value-wrapper .ellipsis{display:none}.data-row>.closing-parenthesis{display:none}.data-row.expanded>.closing-parenthesis{display:inline-block}.data-row .items-size{margin-left:10px;color:var(--base04);font-style:italic;display:none}.show-size .data-row .items-size{display:inline-block}.data-row .value.bool,.data-row .value.boolean{color:var(--base0E)}.data-row .value.function{color:var(--base0D)}.data-row .value.int,.data-row .value.integer{color:var(--base0F)}.data-row .value.float{color:var(--base0B)}.data-row .value.string{color:var(--base09)}.data-row .value.string .content{overflow-wrap:break-word}.data-row .value.string .content::before{content:open-quote}.data-row .value.string .content::after{content:close-quote}.data-row .value.regexp{color:var(--base0A)}.data-row .value.nan{color:var(--base08)}.data-row .value.null{color:var(--base0A)}.data-row .value.undefined{color:var(--base05)}.data-row .value.date{color:var(--base0D)}.data-row .value.nan,.data-row .value.null,.data-row .value.undefined{border-radius:3px;background-color:var(--base02);padding:1px 2px}.data-row .value .type{font-size:smaller;margin-right:4px;opacity:0.8;display:none}.data-row .value .value-data{word-break:break-all}.show-data-types .data-row .value .type{display:inline-block}.icon-wrapper,.copy-icon-wrapper{display:inline-block;cursor:pointer}.icon{display:block;position:relative}.icon:before,.icon:after{content:"";position:absolute;display:block}.expand.icon{margin-right:5px}.expand-icon-arrow .expand.icon{margin-left:3px;width:0;height:0;border-left:solid 6px var(--base0E);border-top:solid 6px transparent;border-bottom:solid 6px transparent}.expand-icon-arrow .expanded>.key-value-wrapper .expand.icon,.expand-icon-arrow .expanded.icon.expand{transform:rotate(90deg);border-left-color:var(--base0D)}.expand-icon-square .expand.icon,.expand-icon-circle .expand.icon{display:block;width:9px;height:9px;border-radius:2px;border:solid 1px var(--base0E)}.expand-icon-circle .expand.icon{border-radius:50%}.expand-icon-square .expand.icon:before,.expand-icon-circle .expand.icon:before,.expand-icon-square .expand.icon:after,.expand-icon-circle .expand.icon:after{width:5px;height:1px;background-color:var(--base0E);left:2px;top:4px}.expand-icon-square .expand.icon:after,.expand-icon-circle .expand.icon:after{transform:rotate(90deg)}.expand-icon-square .expanded>.key-value-wrapper .expand.icon:after,.expand-icon-circle .expanded>.key-value-wrapper .expand.icon:after,.expand-icon-square .expand.icon.expanded:after,.expand-icon-circle .expand.icon.expanded:after{display:none}.expand-icon-square .expanded>.key-value-wrapper .expand.icon,.expand-icon-circle .expanded>.key-value-wrapper .expand.icon,.expand-icon-square .expand.icon.expanded,.expand-icon-circle .expanded.expand.icon{border-color:var(--base0D)}.expand-icon-square .expanded>.key-value-wrapper .expand.icon:before,.expand-icon-circle .expanded>.key-value-wrapper .expand.icon:before,.expand-icon-square .expanded.expand.icon:before,.expand-icon-circle .expanded.expand.icon:before{background-color:var(--base0D)}.icon-wrapper{display:inline-block;cursor:pointer}.show-copy .key-value-wrapper:hover .icon.copy{display:block}.copy.icon{margin-left:10px;display:none;width:8px;height:10px;border:solid 1px var(--base0D);border-radius:1px;position:relative;top:4px;transition:0.2s all}.copy.icon:active{transform:scale(1.6);background-color:var(--base0B)}.copy.icon:before{content:"";display:block;left:-3px;top:-3px;width:8px;height:10px;border-top:solid 1px var(--base0D);border-left:solid 1px var(--base0D);border-radius:1px 0 0 0}.plus.icon{width:11px;height:1px;background-color:var(--base0D)}.plus.icon:after{content:"";width:11px;height:1px;background-color:var(--base0D);-webkit-transform:rotate(90deg);transform:rotate(90deg)}.minus.icon{width:11px;height:1px;background-color:var(--base0D)}.indent.icon{color:var(--base0D);width:17px;height:8px;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D)}.indent.icon:before{content:"";position:absolute;top:2px;right:0;width:11px;height:2px;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D)}.indent.icon:after{content:"";position:absolute;top:1px;width:0;height:0;border-top:solid 3px transparent;border-bottom:solid 3px transparent;border-left:solid 3px var(--base0D);border-right:solid 3px transparent}.outdent.icon{color:var(--base0D);margin-left:2px;width:17px;height:8px;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D)}.outdent.icon:before{content:"";top:2px;right:0;width:11px;height:2px;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D)}.outdent.icon:after{content:"";top:1px;left:-3px;width:0;height:0;border-top:solid 3px transparent;border-bottom:solid 3px transparent;border-left:solid 3px transparent;border-right:solid 3px var(--base0D)}.refresh.icon{color:var(--base0D);width:10px;height:10px;border-radius:50%;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D);border-left:solid 1px transparent;border-right:solid 1px var(--base0D)}.refresh.icon:before{content:"";left:1px;top:8px;width:3px;height:3px;border-top:solid 1px var(--base0D);border-left:solid 1px var(--base0D);-webkit-transform:rotate(-22.5deg);transform:rotate(-22.5deg)}.info.icon{width:12px;height:11px;border:solid 1px var(--base0D);border-radius:2px}.info.icon::before{top:5px;left:5px;width:2px;height:5px;background-color:var(--base0D)}.info.icon::after{top:2px;left:5px;width:2px;height:2px;background-color:var(--base0D)}.info.icon.active{background-color:var(--base0D)}.info.icon.active::before,.info.icon.active::after{background-color:var(--base02)}.search.icon{color:var(--base0D);width:11px;height:11px;border:solid 1px var(--base0D);border-radius:100%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.search.icon:before{content:"";top:11px;left:5px;height:6px;width:1px;background-color:var(--base0D)}
`;
  var A = { apathy: ["#031a16", "#0b342d", "#184e45", "#2b685e", "#5f9c92", "#81b5ac", "#a7cec8", "#d2e7e4", "#3e9688", "#3e7996", "#3e4c96", "#883e96", "#963e4c", "#96883e", "#4c963e", "#3e965b"], ashes: ["#1c2023", "#393f45", "#565e65", "#747c84", "#adb3ba", "#c7ccd1", "#dfe2e5", "#f3f4f5", "#c7ae95", "#c7c795", "#aec795", "#95c7ae", "#95aec7", "#ae95c7", "#c795ae", "#c79595"], "atelier-dune-light": ["#fefbec", "#e8e4cf", "#a6a28c", "#999580", "#7d7a68", "#6e6b5e", "#292824", "#20201d", "#d73737", "#b65611", "#ae9513", "#60ac39", "#1fad83", "#6684e1", "#b854d4", "#d43552"], "atelier-dune": ["#20201d", "#292824", "#6e6b5e", "#7d7a68", "#999580", "#a6a28c", "#e8e4cf", "#fefbec", "#d73737", "#b65611", "#ae9513", "#60ac39", "#1fad83", "#6684e1", "#b854d4", "#d43552"], atlas: ["#002635", "#00384d", "#517f8d", "#6c8b91", "#869696", "#a1a19a", "#e6e6dc", "#fafaf8", "#ff5a67", "#f08e48", "#ffcc1b", "#7fc06e", "#14747e", "#5dd7b9", "#9a70a4", "#c43060"], bespin: ["#28211c", "#36312e", "#5e5d5c", "#666666", "#797977", "#8a8986", "#9d9b97", "#baae9e", "#cf6a4c", "#cf7d34", "#f9ee98", "#54be0d", "#afc4db", "#5ea6ea", "#9b859d", "#937121"], "black-metal": ["#000000", "#121212", "#222222", "#333333", "#999999", "#c1c1c1", "#999999", "#c1c1c1", "#5f8787", "#aaaaaa", "#a06666", "#dd9999", "#aaaaaa", "#888888", "#999999", "#444444"], brewer: ["#0c0d0e", "#2e2f30", "#515253", "#737475", "#959697", "#b7b8b9", "#dadbdc", "#fcfdfe", "#e31a1c", "#e6550d", "#dca060", "#31a354", "#80b1d3", "#3182bd", "#756bb1", "#b15928"], bright: ["#000000", "#303030", "#505050", "#b0b0b0", "#d0d0d0", "#e0e0e0", "#f5f5f5", "#ffffff", "#fb0120", "#fc6d24", "#fda331", "#a1c659", "#76c7b7", "#6fb3d2", "#d381c3", "#be643c"], brogrammer: ["#1f1f1f", "#f81118", "#2dc55e", "#ecba0f", "#2a84d2", "#4e5ab7", "#1081d6", "#d6dbe5", "#d6dbe5", "#de352e", "#1dd361", "#f3bd09", "#1081d6", "#5350b9", "#0f7ddb", "#ffffff"], "brushtrees-dark": ["#485867", "#5a6d7a", "#6d828e", "#8299a1", "#98afb5", "#b0c5c8", "#c9dbdc", "#e3efef", "#b38686", "#d8bba2", "#aab386", "#87b386", "#86b3b3", "#868cb3", "#b386b2", "#b39f9f"], brushtrees: ["#e3efef", "#c9dbdc", "#b0c5c8", "#98afb5", "#8299a1", "#6d828e", "#5a6d7a", "#485867", "#b38686", "#d8bba2", "#aab386", "#87b386", "#86b3b3", "#868cb3", "#b386b2", "#b39f9f"], chalk: ["#151515", "#202020", "#303030", "#505050", "#b0b0b0", "#d0d0d0", "#e0e0e0", "#f5f5f5", "#fb9fb1", "#eda987", "#ddb26f", "#acc267", "#12cfc0", "#6fc2ef", "#e1a3ee", "#deaf8f"], circus: ["#191919", "#202020", "#303030", "#5f5a60", "#505050", "#a7a7a7", "#808080", "#ffffff", "#dc657d", "#4bb1a7", "#c3ba63", "#84b97c", "#4bb1a7", "#639ee4", "#b888e2", "#b888e2"], "classic-dark": ["#151515", "#202020", "#303030", "#505050", "#b0b0b0", "#d0d0d0", "#e0e0e0", "#f5f5f5", "#ac4142", "#d28445", "#f4bf75", "#90a959", "#75b5aa", "#6a9fb5", "#aa759f", "#8f5536"], "classic-light": ["#f5f5f5", "#e0e0e0", "#d0d0d0", "#b0b0b0", "#505050", "#303030", "#202020", "#151515", "#ac4142", "#d28445", "#f4bf75", "#90a959", "#75b5aa", "#6a9fb5", "#aa759f", "#8f5536"], codeschool: ["#232c31", "#1c3657", "#2a343a", "#3f4944", "#84898c", "#9ea7a6", "#a7cfa3", "#b5d8f6", "#2a5491", "#43820d", "#a03b1e", "#237986", "#b02f30", "#484d79", "#c59820", "#c98344"], cupcake: ["#fbf1f2", "#f2f1f4", "#d8d5dd", "#bfb9c6", "#a59daf", "#8b8198", "#72677e", "#585062", "#d57e85", "#ebb790", "#dcb16c", "#a3b367", "#69a9a7", "#7297b9", "#bb99b4", "#baa58c"], cupertino: ["#ffffff", "#c0c0c0", "#c0c0c0", "#808080", "#808080", "#404040", "#404040", "#5e5e5e", "#c41a15", "#eb8500", "#826b28", "#007400", "#318495", "#0000ff", "#a90d91", "#826b28"], darcula: ["#2b2b2b", "#323232", "#323232", "#606366", "#a4a3a3", "#a9b7c6", "#ffc66d", "#ffffff", "#4eade5", "#689757", "#bbb529", "#6a8759", "#629755", "#9876aa", "#cc7832", "#808080"], darktooth: ["#1d2021", "#32302f", "#504945", "#665c54", "#928374", "#a89984", "#d5c4a1", "#fdf4c1", "#fb543f", "#fe8625", "#fac03b", "#95c085", "#8ba59b", "#0d6678", "#8f4673", "#a87322"], "default-dark": ["#181818", "#282828", "#383838", "#585858", "#b8b8b8", "#d8d8d8", "#e8e8e8", "#f8f8f8", "#ab4642", "#dc9656", "#f7ca88", "#a1b56c", "#86c1b9", "#7cafc2", "#ba8baf", "#a16946"], "default-light": ["#ffffff", "#e8e8e8", "#d8d8d8", "#b8b8b8", "#585858", "#383838", "#282828", "#181818", "#ab4642", "#dc9656", "#ab4642", "#a1b56c", "#86c1b9", "#7cafc2", "#ba8baf", "#a16946"], dracula: ["#282936", "#3a3c4e", "#4d4f68", "#626483", "#62d6e8", "#e9e9f4", "#f1f2f8", "#f7f7fb", "#ea51b2", "#b45bcf", "#00f769", "#ebff87", "#a1efe4", "#62d6e8", "#b45bcf", "#00f769"], eighties: ["#2d2d2d", "#393939", "#515151", "#747369", "#a09f93", "#d3d0c8", "#e8e6df", "#f2f0ec", "#f2777a", "#f99157", "#ffcc66", "#99cc99", "#66cccc", "#6699cc", "#cc99cc", "#d27b53"], embers: ["#16130f", "#2c2620", "#433b32", "#5a5047", "#8a8075", "#a39a90", "#beb6ae", "#dbd6d1", "#826d57", "#828257", "#6d8257", "#57826d", "#576d82", "#6d5782", "#82576d", "#825757"], flat: ["#2c3e50", "#34495e", "#7f8c8d", "#95a5a6", "#bdc3c7", "#e0e0e0", "#f5f5f5", "#ecf0f1", "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#1abc9c", "#3498db", "#9b59b6", "#be643c"], "fruit-soda": ["#f1ecf1", "#e0dee0", "#d8d5d5", "#b5b4b6", "#979598", "#515151", "#474545", "#2d2c2c", "#fe3e31", "#fe6d08", "#f7e203", "#47f74c", "#0f9cfd", "#2931df", "#611fce", "#b16f40"], github: ["#ffffff", "#f5f5f5", "#c8c8fa", "#969896", "#e8e8e8", "#333333", "#ffffff", "#969896", "#ed6a43", "#0086b3", "#795da3", "#183691", "#183691", "#795da3", "#a71d5d", "#333333"], "google-dark": ["#1d1f21", "#282a2e", "#373b41", "#969896", "#b4b7b4", "#c5c8c6", "#e0e0e0", "#ffffff", "#cc342b", "#f96a38", "#fba922", "#198844", "#3971ed", "#3971ed", "#a36ac7", "#3971ed"], "google-light": ["#ffffff", "#e0e0e0", "#c5c8c6", "#b4b7b4", "#969896", "#373b41", "#282a2e", "#1d1f21", "#cc342b", "#f96a38", "#fba922", "#198844", "#3971ed", "#3971ed", "#a36ac7", "#3971ed"], "grayscale-dark": ["#101010", "#252525", "#464646", "#525252", "#ababab", "#b9b9b9", "#e3e3e3", "#f7f7f7", "#7c7c7c", "#999999", "#a0a0a0", "#8e8e8e", "#868686", "#686868", "#747474", "#5e5e5e"], "grayscale-light": ["#f7f7f7", "#e3e3e3", "#b9b9b9", "#ababab", "#525252", "#464646", "#252525", "#101010", "#7c7c7c", "#999999", "#a0a0a0", "#8e8e8e", "#868686", "#686868", "#747474", "#5e5e5e"], greenscreen: ["#001100", "#003300", "#005500", "#007700", "#009900", "#00bb00", "#00dd00", "#00ff00", "#007700", "#009900", "#007700", "#00bb00", "#005500", "#009900", "#00bb00", "#005500"], "gruvbox-dark-hard": ["#1d2021", "#3c3836", "#504945", "#665c54", "#bdae93", "#d5c4a1", "#ebdbb2", "#fbf1c7", "#fb4934", "#fe8019", "#fabd2f", "#b8bb26", "#8ec07c", "#83a598", "#d3869b", "#d65d0e"], "gruvbox-light-hard": ["#f9f5d7", "#ebdbb2", "#d5c4a1", "#bdae93", "#665c54", "#504945", "#3c3836", "#282828", "#9d0006", "#af3a03", "#b57614", "#79740e", "#427b58", "#076678", "#8f3f71", "#d65d0e"], "harmonic-dark": ["#0b1c2c", "#223b54", "#405c79", "#627e99", "#aabcce", "#cbd6e2", "#e5ebf1", "#f7f9fb", "#bf8b56", "#bfbf56", "#8bbf56", "#56bf8b", "#568bbf", "#8b56bf", "#bf568b", "#bf5656"], "harmonic-light": ["#f7f9fb", "#e5ebf1", "#cbd6e2", "#aabcce", "#627e99", "#405c79", "#223b54", "#0b1c2c", "#bf8b56", "#bfbf56", "#8bbf56", "#56bf8b", "#568bbf", "#8b56bf", "#bf568b", "#bf5656"], "heetch-light": ["#feffff", "#392551", "#7b6d8b", "#9c92a8", "#ddd6e5", "#5a496e", "#470546", "#190134", "#27d9d5", "#bdb6c5", "#5ba2b6", "#f80059", "#c33678", "#47f9f5", "#bd0152", "#dedae2"], heetch: ["#190134", "#392551", "#5a496e", "#7b6d8b", "#9c92a8", "#bdb6c5", "#dedae2", "#feffff", "#27d9d5", "#5ba2b6", "#8f6c97", "#c33678", "#f80059", "#bd0152", "#82034c", "#470546"], helios: ["#1d2021", "#383c3e", "#53585b", "#6f7579", "#cdcdcd", "#d5d5d5", "#dddddd", "#e5e5e5", "#d72638", "#eb8413", "#f19d1a", "#88b92d", "#1ba595", "#1e8bac", "#be4264", "#c85e0d"], hopscotch: ["#322931", "#433b42", "#5c545b", "#797379", "#989498", "#b9b5b8", "#d5d3d5", "#ffffff", "#dd464c", "#fd8b19", "#fdcc59", "#8fc13e", "#149b93", "#1290bf", "#c85e7c", "#b33508"], "horizon-dark": ["#1c1e26", "#232530", "#2e303e", "#676a8d", "#ced1d0", "#cbced0", "#dcdfe4", "#e3e6ee", "#e93c58", "#e58d7d", "#efb993", "#efaf8e", "#24a8b4", "#df5273", "#b072d1", "#e4a382"], "ia-dark": ["#1a1a1a", "#222222", "#1d414d", "#767676", "#b8b8b8", "#cccccc", "#e8e8e8", "#f8f8f8", "#d88568", "#d86868", "#b99353", "#83a471", "#7c9cae", "#8eccdd", "#b98eb2", "#8b6c37"], "ia-light": ["#f6f6f6", "#dedede", "#bde5f2", "#898989", "#767676", "#181818", "#e8e8e8", "#898989", "#9c5a02", "#c43e18", "#c48218", "#38781c", "#2d6bb1", "#48bac2", "#a94598", "#8b6c37"], icy: ["#021012", "#031619", "#041f23", "#052e34", "#064048", "#095b67", "#0c7c8c", "#109cb0", "#16c1d9", "#b3ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7"], isotope: ["#000000", "#404040", "#606060", "#808080", "#c0c0c0", "#d0d0d0", "#e0e0e0", "#ffffff", "#ff0000", "#ff9900", "#ff0099", "#33ff00", "#00ffff", "#0066ff", "#cc00ff", "#3300ff"], macintosh: ["#000000", "#404040", "#404040", "#808080", "#808080", "#c0c0c0", "#c0c0c0", "#ffffff", "#dd0907", "#ff6403", "#fbf305", "#1fb714", "#02abea", "#0000d3", "#4700a5", "#90713a"], marrakesh: ["#201602", "#302e00", "#5f5b17", "#6c6823", "#86813b", "#948e48", "#ccc37a", "#faf0a5", "#c35359", "#b36144", "#a88339", "#18974e", "#75a738", "#477ca1", "#8868b3", "#b3588e"], materia: ["#263238", "#2c393f", "#37474f", "#707880", "#c9ccd3", "#cdd3de", "#d5dbe5", "#ffffff", "#ec5f67", "#ea9560", "#ffcc00", "#8bd649", "#80cbc4", "#89ddff", "#82aaff", "#ec5f67"], "material-lighter": ["#fafafa", "#e7eaec", "#cceae7", "#ccd7da", "#8796b0", "#80cbc4", "#80cbc4", "#666666", "#ff5370", "#f76d47", "#ffb62c", "#91b859", "#39adb5", "#6182b8", "#7c4dff", "#e53935"], material: ["#263238", "#2e3c43", "#314549", "#546e7a", "#b2ccd6", "#eeffff", "#eeffff", "#ffffff", "#f07178", "#f78c6c", "#ffcb6b", "#c3e88d", "#89ddff", "#82aaff", "#c792ea", "#ff5370"], "mellow-purple": ["#1e0528", "#1a092d", "#331354", "#320f55", "#873582", "#ffeeff", "#ffeeff", "#f8c0ff", "#00d9e9", "#aa00a3", "#955ae7", "#05cb0d", "#b900b1", "#550068", "#8991bb", "#4d6fff"], "mexico-light": ["#f8f8f8", "#e8e8e8", "#d8d8d8", "#b8b8b8", "#585858", "#383838", "#282828", "#181818", "#ab4642", "#dc9656", "#f79a0e", "#538947", "#4b8093", "#7cafc2", "#96609e", "#a16946"], mocha: ["#3b3228", "#534636", "#645240", "#7e705a", "#b8afad", "#d0c8c6", "#e9e1dd", "#f5eeeb", "#cb6077", "#d28b71", "#f4bc87", "#beb55b", "#7bbda4", "#8ab3b5", "#a89bb9", "#bb9584"], monokai: ["#272822", "#383830", "#49483e", "#75715e", "#a59f85", "#f8f8f2", "#f5f4f1", "#f9f8f5", "#f92672", "#fd971f", "#f4bf75", "#a6e22e", "#a1efe4", "#66d9ef", "#ae81ff", "#cc6633"], nord: ["#2e3440", "#3b4252", "#434c5e", "#4c566a", "#d8dee9", "#e5e9f0", "#eceff4", "#8fbcbb", "#88c0d0", "#81a1c1", "#5e81ac", "#bf616a", "#d08770", "#ebcb8b", "#a3be8c", "#b48ead"], ocean: ["#2b303b", "#343d46", "#4f5b66", "#65737e", "#a7adba", "#c0c5ce", "#dfe1e8", "#eff1f5", "#bf616a", "#d08770", "#ebcb8b", "#a3be8c", "#96b5b4", "#8fa1b3", "#b48ead", "#ab7967"], "one-light": ["#fafafa", "#f0f0f1", "#e5e5e6", "#a0a1a7", "#696c77", "#383a42", "#202227", "#090a0b", "#ca1243", "#d75f00", "#c18401", "#50a14f", "#0184bc", "#4078f2", "#a626a4", "#986801"], onedark: ["#282c34", "#353b45", "#3e4451", "#545862", "#565c64", "#abb2bf", "#b6bdca", "#c8ccd4", "#e06c75", "#d19a66", "#e5c07b", "#98c379", "#56b6c2", "#61afef", "#c678dd", "#be5046"], "papercolor-dark": ["#1c1c1c", "#af005f", "#5faf00", "#d7af5f", "#5fafd7", "#808080", "#d7875f", "#d0d0d0", "#585858", "#5faf5f", "#afd700", "#af87d7", "#ffaf00", "#ff5faf", "#00afaf", "#5f8787"], "papercolor-light": ["#eeeeee", "#af0000", "#008700", "#5f8700", "#0087af", "#878787", "#005f87", "#444444", "#bcbcbc", "#d70000", "#d70087", "#8700af", "#d75f00", "#d75f00", "#005faf", "#005f87"], paraiso: ["#2f1e2e", "#41323f", "#4f424c", "#776e71", "#8d8687", "#a39e9b", "#b9b6b0", "#e7e9db", "#ef6155", "#f99b15", "#fec418", "#48b685", "#5bc4bf", "#06b6ef", "#815ba4", "#e96ba8"], pico: ["#000000", "#1d2b53", "#7e2553", "#008751", "#ab5236", "#5f574f", "#c2c3c7", "#fff1e8", "#ff004d", "#ffa300", "#fff024", "#00e756", "#29adff", "#83769c", "#ff77a8", "#ffccaa"], pop: ["#000000", "#202020", "#303030", "#505050", "#b0b0b0", "#d0d0d0", "#e0e0e0", "#ffffff", "#eb008a", "#f29333", "#f8ca12", "#37b349", "#00aabb", "#0e5a94", "#b31e8d", "#7a2d00"], railscasts: ["#2b2b2b", "#272935", "#3a4055", "#5a647e", "#d4cfc9", "#e6e1dc", "#f4f1ed", "#f9f7f3", "#da4939", "#cc7833", "#ffc66d", "#a5c261", "#519f50", "#6d9cbe", "#b6b3eb", "#bc9458"], seti: ["#151718", "#282a2b", "#3b758c", "#41535b", "#43a5d5", "#d6d6d6", "#eeeeee", "#ffffff", "#cd3f45", "#db7b55", "#e6cd69", "#9fca56", "#55dbbe", "#55b5db", "#a074c4", "#8a553f"], "solarized-dark": ["#002b36", "#073642", "#586e75", "#657b83", "#839496", "#93a1a1", "#eee8d5", "#fdf6e3", "#dc322f", "#cb4b16", "#b58900", "#859900", "#2aa198", "#268bd2", "#6c71c4", "#d33682"], "solarized-light": ["#fdf6e3", "#eee8d5", "#93a1a1", "#839496", "#657b83", "#586e75", "#073642", "#002b36", "#dc322f", "#cb4b16", "#b58900", "#859900", "#2aa198", "#268bd2", "#6c71c4", "#d33682"], spacemacs: ["#1f2022", "#282828", "#444155", "#585858", "#b8b8b8", "#a3a3a3", "#e8e8e8", "#f8f8f8", "#f2241f", "#ffa500", "#b1951d", "#67b11d", "#2d9574", "#4f97d7", "#a31db1", "#b03060"], "summerfruit-dark": ["#151515", "#202020", "#303030", "#505050", "#b0b0b0", "#d0d0d0", "#e0e0e0", "#ffffff", "#ff0086", "#fd8900", "#aba800", "#00c918", "#1faaaa", "#3777e6", "#ad00a1", "#cc6633"], "summerfruit-light": ["#ffffff", "#e0e0e0", "#d0d0d0", "#b0b0b0", "#000000", "#101010", "#151515", "#202020", "#ff0086", "#fd8900", "#aba800", "#00c918", "#1faaaa", "#3777e6", "#ad00a1", "#cc6633"], "tomorrow-night": ["#1d1f21", "#282a2e", "#373b41", "#969896", "#b4b7b4", "#c5c8c6", "#e0e0e0", "#ffffff", "#cc6666", "#de935f", "#f0c674", "#b5bd68", "#8abeb7", "#81a2be", "#b294bb", "#a3685a"], tomorrow: ["#ffffff", "#e0e0e0", "#d6d6d6", "#8e908c", "#969896", "#4d4d4c", "#282a2e", "#1d1f21", "#c82829", "#f5871f", "#eab700", "#718c00", "#3e999f", "#4271ae", "#8959a8", "#a3685a"], tube: ["#231f20", "#1c3f95", "#5a5758", "#737171", "#959ca1", "#d9d8d8", "#e7e7e8", "#ffffff", "#ee2e24", "#f386a1", "#ffd204", "#00853e", "#85cebc", "#009ddc", "#98005d", "#b06110"], twilight: ["#1e1e1e", "#323537", "#464b50", "#5f5a60", "#838184", "#a7a7a7", "#c3c3c3", "#ffffff", "#cf6a4c", "#cda869", "#f9ee98", "#8f9d6a", "#afc4db", "#7587a6", "#9b859d", "#9b703f"], woodland: ["#231e18", "#302b25", "#48413a", "#9d8b70", "#b4a490", "#cabcb1", "#d7c8bc", "#e4d4c8", "#d35c5c", "#ca7f32", "#e0ac16", "#b7ba53", "#6eb958", "#88a4d3", "#bb90e2", "#b49368"], zenburn: ["#383838", "#404040", "#606060", "#6f6f6f", "#808080", "#dcdccc", "#c0c0c0", "#ffffff", "#dca3a3", "#dfaf8f", "#e0cf9f", "#5f7f5f", "#93e0e3", "#7cb8bb", "#dc8cc3", "#000000"] };
  var V2 = Object.keys(A);
  var R4 = (a3) => {
    let e;
    if (typeof a3 == "string") {
      if (A[a3] === void 0) throw new Error(`${a3} not found`);
      e = A[a3].reduce((d, r, o) => {
        let t = `base0${o.toString(16).toUpperCase()}`;
        return d[t] = r, d;
      }, {});
    } else e = a3;
    return `.container{${Object.keys(e).map((d) => `--${d}: ${e[d]};`).join("")}}`;
  };
  var j2 = (a3) => {
    try {
      return !!new URL(a3);
    } catch {
      return false;
    }
  };
  var W2 = (a3) => {
    if (Array.isArray(a3)) return "array";
    if (a3 === null) return "null";
    if (a3 instanceof RegExp) return "regexp";
    let e = typeof a3;
    return e === "number" ? isNaN(a3) ? "NaN" : isFinite(a3) ? Number.isInteger(a3) ? "int" : "float" : "Infinity" : e === "boolean" ? "bool" : e === "object" && a3 instanceof Date ? "date" : e;
  };
  var $2 = (a3) => {
    if (typeof a3 == "boolean") return a3;
    if (a3 === "true") return true;
    if (a3 === "false") return false;
    throw new Error("should be a boolean!");
  };
  var J = (a3) => {
    if (typeof a3 == "string") return a3;
    throw new Error("should be a string!");
  };
  var O = (a3) => {
    if (typeof a3 == "number" && a3 >= 0) return a3;
    if (typeof a3 == "string" && (a3 = parseFloat(a3)), isNaN(a3) || a3 < 0) throw new Error("should be a positive number!");
    return a3;
  };
  var B2 = (a3) => {
    if (typeof a3 == "boolean" || typeof a3 == "number") return a3;
    if (a3 === "true") return true;
    if (a3 === "false") return false;
    if (typeof a3 == "string" && (a3 = parseFloat(a3), !isNaN(a3) && a3 >= 0)) return a3;
    throw new Error("should be a boolean or a positive number!");
  };
  var z = (a3) => {
    if (typeof a3 == "object") return a3;
    if (typeof a3 == "string") try {
      return JSON.parse(a3);
    } catch {
      return a3;
    }
    throw new Error("should be a string or JSON!");
  };
  var P = function({ key: a3, value: e, expanded: d, indent: r, onToggleExpand: o, level: t = 0, parentRow: v2 }) {
    let n = document.createElement("div");
    this.maxLevel = t;
    let i = W2(e), m = i === "array" || i === "object", x2 = d === true || d > t, p, g2, b, h;
    n.className = `data-row ${x2 ? "expanded" : ""}`, n.dataset.key = a3, n.dataset.level = t, t > 0 && (n.style.paddingLeft = `${r * 5}px`);
    let f = document.createElement("span");
    f.className = "key-value-wrapper", n.appendChild(f);
    let w2 = () => {
      n.classList.toggle("expanded"), o && (n.classList.contains("expanded") ? o(t + 1) : o(t));
    };
    if (m) {
      let c2 = document.createElement("span");
      c2.className = "icon-wrapper", f.appendChild(c2), p = document.createElement("span"), p.className = "expand icon clickable", p.setAttribute("title", x2 ? "Collapse" : "Expand"), c2.appendChild(p), c2.addEventListener("click", () => w2());
    }
    if (a3 !== null && a3 !== "") {
      let c2 = typeof a3;
      b = document.createElement("span"), b.className = `key clickable ${c2 === "number" ? "number" : ""}`, b.textContent = c2 === "number" ? a3 : `${a3}`, b.addEventListener("click", () => w2()), f.appendChild(b);
      let s = document.createElement("span");
      s.classList.add("colon"), s.textContent = ":", f.appendChild(s);
    }
    if (m) {
      let c2 = document.createElement("span");
      c2.className = "opening-parenthesis", c2.textContent = i === "array" ? "[" : "{", f.appendChild(c2);
      let s = document.createElement("span");
      s.className = "ellipsis clickable", s.textContent = "...", s.addEventListener("click", () => w2()), f.appendChild(s);
      let l = document.createElement("span");
      l.className = "closing-parenthesis", l.textContent = i === "array" ? "]" : "}", f.appendChild(l);
      let E = document.createElement("span"), D = i === "array" ? e.length : Object.keys(e).length;
      E.className = "items-size", E.textContent = `${D} item${D === 1 ? "" : "s"}`, f.appendChild(E), g2 = [], (i === "array" ? e.map((C2, k) => k) : Object.keys(e)).forEach((C2) => {
        let k = new P({ key: C2, value: e[C2], expanded: d, indent: r, onToggleExpand: o, level: t + 1, parentRow: n });
        g2.push(k), n.appendChild(k.element), this.maxLevel = Math.max(this.maxLevel, k.maxLevel);
      });
      let S = document.createElement("span");
      S.className = "closing-parenthesis", S.textContent = i === "array" ? "]" : "}", n.appendChild(S);
    } else {
      let c2 = null;
      ["nan", "NaN", "undefined", "null"].includes(i) || (c2 = document.createElement("span"), c2.className = "type", c2.textContent = i.toLowerCase());
      let s = document.createElement("span");
      s.className = `value ${i.toLowerCase()}`, h = document.createElement("span"), h.className = "value-data", h.textContent = i === "string" ? `"${e}"` : e, c2 && s.appendChild(c2), s.appendChild(h), f.appendChild(s);
    }
    let u = document.createElement("span");
    u.className = "copy icon", u.setAttribute("title", "Copy to clipboard");
    let y = document.createElement("span");
    y.className = "icon-wrapper", y.addEventListener("click", () => {
      navigator.clipboard.writeText(JSON.stringify(e, null, r));
    }), y.appendChild(u), f.appendChild(y);
    let N6 = (c2) => {
      let s = new RegExp(c2, "gi"), l = [];
      b && l.push(b), h && l.push(h);
      let E = false;
      l.forEach((D) => {
        let L = D.textContent;
        if (D.innerHTML = L, !c2 || c2 === "") return;
        let S = [...L.matchAll(s)].map((I2) => I2.index), C2 = [], k = 0;
        S.forEach((I2) => {
          E = true, C2.push(L.slice(k, I2)), C2.push(`<span class="match">${c2}</span>`), k = I2 + c2.length;
        }), C2.push(L.slice(k)), D.innerHTML = C2.join("");
      }), E && !n.classList.contains("expanded") && (w2(), v2 && v2.classList.add("expanded"));
    };
    this.update = ({ expanded: c2, indent: s, searchTerm: l }) => {
      s !== void 0 && t > 0 && (n.style.paddingLeft = `${s * 5}px`), c2 !== void 0 && (x2 = c2 === true || c2 > t, n.classList.toggle("expanded", x2), p && (p.title = x2 ? "Collapse" : "Expand")), l != null && N6(l), g2 && g2.forEach((E) => E.update({ expanded: c2, indent: s, searchTerm: l }));
    }, this.element = n;
  };
  var U3 = P;
  var G2 = function({ expanded: a3, indent: e, onChange: d, onSearch: r, showDetails: o }) {
    this.indent = e || 2, this.expanded = typeof a3 == "number" ? a3 : 2, this.showDetails = o !== false, this.maxExpandLevel = 0;
    let t, v2 = document.createElement("div");
    v2.className = "toolbar";
    let n = document.createElement("div");
    n.className = "options", v2.appendChild(n);
    let i = document.createElement("div");
    i.className = "search-wrapper", v2.appendChild(i);
    let m = document.createElement("div");
    m.className = "icon-wrapper clickable", n.appendChild(m);
    let x2 = document.createElement("span");
    x2.className = "icon refresh", m.onclick = () => this.refresh(), m.appendChild(x2);
    let p = document.createElement("div");
    p.className = "icon-wrapper clickable", n.appendChild(p);
    let g2 = document.createElement("span");
    g2.className = "icon plus", p.appendChild(g2), p.onclick = () => {
      this.expanded < this.maxExpandLevel && (this.expanded += 1), d({ expanded: this.expanded });
    };
    let b = document.createElement("div");
    b.className = "icon-wrapper clickable", n.appendChild(b);
    let h = document.createElement("span");
    h.className = "icon minus", b.appendChild(h), b.onclick = () => {
      this.expanded > this.maxExpandLevel && (this.expanded = this.maxExpandLevel), this.expanded > 0 && (this.expanded -= 1), d({ expanded: this.expanded });
    };
    let f = document.createElement("div");
    f.className = "icon-wrapper clickable", n.appendChild(f);
    let w2 = document.createElement("span");
    w2.className = "icon indent", f.onclick = () => {
      this.indent += 1, d({ indent: this.indent });
    }, f.appendChild(w2);
    let u = document.createElement("div");
    u.className = "icon-wrapper clickable", n.appendChild(u);
    let y = document.createElement("span");
    y.className = "icon outdent", u.onclick = () => {
      this.indent -= 1, d({ indent: this.indent });
    }, u.appendChild(y);
    let N6 = document.createElement("div");
    N6.className = "icon-wrapper clickable", n.appendChild(N6);
    let c2 = document.createElement("span");
    c2.className = `icon info ${this.showDetails ? "active" : ""}`, N6.onclick = () => {
      c2.classList.toggle("active"), this.showDetails = !this.showDetails, d({ showDetails: this.showDetails });
    }, N6.appendChild(c2);
    let s = document.createElement("span");
    s.className = "icon search", i.appendChild(s), t = document.createElement("input"), t.className = "search-input", t.placeholder = "Search", t.oninput = (l) => {
      r(l.target.value);
    }, i.appendChild(t), this.refresh = () => {
      this.expanded = 1, this.indent = 2, t && (t.value = ""), d({ indent: 2, expanded: 1 }), r("");
    }, this.updateShowDetails = (l) => {
      this.showDetails = l, this.showDetails ? c2.classList.add("active") : c2.classList.remove("active");
    }, this.element = v2;
  };
  var M = G2;
  function K(a3, e = {}) {
    let d = document.createElement("div");
    d.className = "container", a3.appendChild(d);
    let r = null, o = null, t = {};
    this.update = ({ data: v2, expanded: n, indent: i, expandIconType: m, showDataTypes: x2, showToolbar: p, showSize: g2, showCopy: b }) => {
      if (v2) {
        let f = JSON.stringify(v2);
        t.dataComapreString !== f && (t.dataComapreString = f, r = new U3({ key: "", value: v2, expanded: n, indent: i, onToggleExpand: (w2) => {
          o && (o.expanded = w2), t.expanded = w2;
        } }), d.replaceChildren(r.element), t.showToolbar && o && (d.prepend(o.element), o.maxExpandLevel = r.maxLevel, o.refresh()));
      }
      if (p !== void 0 && t.showToolbar !== p) if (t.showToolbar = p, p) o || (o = new M({ expanded: t.expanded, indent: t.indent, onChange: ({ expanded: f, indent: w2, showDetails: u }) => {
        let y = { expanded: f, indent: w2 };
        u !== void 0 && (y.showCopy = u, y.showSize = u, y.showDataTypes = u), this.update(y);
      }, onSearch: (f) => {
        r && r.update({ searchTerm: f });
      } })), r && (o.maxExpandLevel = r.maxLevel), d.prepend(o.element);
      else {
        let f = d.querySelector(".toolbar");
        f && f.remove();
      }
      let h = {};
      n !== void 0 && t.expanded !== n && (t.expanded = n, h.expanded = n), i !== void 0 && t.indent !== i && (t.indent = i, h.indent = i), Object.keys(h).length > 0 && r && r.update(h), b !== void 0 && t.showCopy !== b && (t.showCopy = b, d.classList.toggle("show-copy", b)), g2 !== void 0 && t.showSize !== g2 && (t.showSize = g2, d.classList.toggle("show-size", g2), o && o.updateShowDetails(t.showSize || t.showDataTypes)), x2 !== void 0 && t.showDataTypes !== x2 && (t.showDataTypes = x2, d.classList.toggle("show-data-types", x2), o && o.updateShowDetails(t.showSize || t.showDataTypes)), m !== void 0 && t.expandIconType !== m && (d.classList.add(`expand-icon-${m}`), d.classList.remove(`expand-icon-${t.expandIconType}`), t.expandIconType = m);
    }, this.update(e);
  }
  var F5 = K;
  var H = { indent: 2, expanded: 1, theme: "default-light", showDataTypes: true, showToolbar: false, expandIconType: "arrow", showCopy: true, showSize: true, data: null };
  var T = class a2 extends HTMLElement {
    #t;
    #e;
    #c;
    #n;
    constructor() {
      super(), this.#e = { ...H }, this.#t = document.createElement("style");
      let e = this.attachShadow({ mode: "open" }), d = document.createElement("style");
      d.textContent = `${q}`, e.appendChild(d), e.appendChild(this.#t), this.theme = this.#e.theme, this.#n = new F5(e, this.#e);
    }
    static get observedAttributes() {
      return Object.keys(H).map((e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase());
    }
    static allowedAttributes = ["id"].concat(a2.observedAttributes);
    #d = (...e) => {
      console.warn(`JsonViewer${this.id ? ` (${this.id})` : ""}:`, ...e);
    };
    #a = (e, d, r, o) => {
      try {
        if (d = r(d), o && !o.includes(d)) throw new Error(`should be one of ${o.join(", ")}`);
        if (this.#e[e] === d) return;
        this.#e[e] = d, this.#o();
      } catch (t) {
        this.#d(`Attribute ${e}: ${t.message}`);
      }
    };
    set showDataTypes(e) {
      this.#a("showDataTypes", e, $2);
    }
    set showToolbar(e) {
      this.#a("showToolbar", e, $2);
    }
    set indent(e) {
      this.#a("indent", e, O);
    }
    set expandIconType(e) {
      this.#a("expandIconType", e, J, ["arrow", "square", "circle"]);
    }
    set expanded(e) {
      this.#a("expanded", e, B2);
    }
    set showSize(e) {
      this.#a("showSize", e, $2);
    }
    set showCopy(e) {
      this.#a("showCopy", e, $2);
    }
    set theme(e) {
      try {
        if (e = z(e), this.#e.theme === e && this.#t.textContent !== "") return;
        this.#t.textContent = R4(e), this.#e.theme = e;
      } catch (d) {
        this.#d(`Attribute theme: ${d.message}`);
      }
    }
    set data(e) {
      try {
        e = z(e);
        let d = JSON.stringify(e);
        if (this.#e.data === d) return;
        this.#e.data = d, j2(e) ? fetch(e).then((r) => r.json()).then((r) => {
          this.#c = r, this.#o();
        }) : (this.#c = e, this.#o());
      } catch (d) {
        this.#d(`Attribute data: ${d.message}`);
      }
    }
    get options() {
      return this.#e;
    }
    connectedCallback() {
      window.addEventListener("DOMContentLoaded", () => {
        let e = this.textContent;
        this.textContent = "", e && (this.data = e);
      });
    }
    attributeChangedCallback(e, d, r) {
      if (a2.allowedAttributes.indexOf(e) > -1) {
        let o = e.replace(/-([a-z])/g, (t) => t[1].toUpperCase());
        this[o] = r;
      } else this.#d(`Attribute ${e} is not supported and will be ignored!`), this.removeAttribute(e);
    }
    #o = () => {
      this.#n.update({ data: this.#c, expanded: this.#e.expanded, expandIconType: this.#e.expandIconType, indent: this.#e.indent, showDataTypes: this.#e.showDataTypes, showToolbar: this.#e.showToolbar, showSize: this.#e.showSize, showCopy: this.#e.showCopy });
    };
  };
  customElements.get("andypf-json-viewer") || customElements.define("andypf-json-viewer", T);

  // src/index.js
  renamer();
  async function renamer() {
    let stylesheets = await loadAllStylesheets();
    const renamedAsts = [];
    stylesheets.forEach((stylesheet) => {
      let section = document.createElement("section");
      section.classList.add("styles");
      section.insertAdjacentHTML("beforeend", `<h2>${stylesheet.filename}</h2>`);
      section.insertAdjacentHTML(
        "beforeend",
        `<div><h3>source</h3><pre>${ne(stylesheet.rules, { tab_size: 2 })}</pre></div>`
      );
      section.insertAdjacentHTML(
        "beforeend",
        `<div><h3>CSSOM from source</h3><pre>${ne(stylesheet.cssom, { tab_size: 2 })}</pre></div>`
      );
      section.insertAdjacentHTML(
        "beforeend",
        `<div><h3>transformed</h3>
<pre>${ne(generate51(pagedjsRenamer(stylesheet.ast)), { tab_size: 2 })}</pre></div>`
      );
      section.insertAdjacentHTML(
        "beforeend",
        `<div><h3>CSSOM from transformed CSS</h3><pre>${ne(getCSSOMStringFromCSS(generate51(pagedjsRenamer(stylesheet.ast))), { tab_size: 2 })}</pre></div>`
      );
      document.body.insertAdjacentElement("beforeend", section);
    });
  }
})();
//# sourceMappingURL=built.js.map
