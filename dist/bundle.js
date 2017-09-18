'use strict';var _promise=require('babel-runtime/core-js/promise');var _promise2=_interopRequireDefault(_promise);var _getOwnPropertyNames=require('babel-runtime/core-js/object/get-own-property-names');var _getOwnPropertyNames2=_interopRequireDefault(_getOwnPropertyNames);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _hasInstance=require('babel-runtime/core-js/symbol/has-instance');var _hasInstance2=_interopRequireDefault(_hasInstance);var _setPrototypeOf=require('babel-runtime/core-js/object/set-prototype-of');var _setPrototypeOf2=_interopRequireDefault(_setPrototypeOf);var _clearImmediate2=require('babel-runtime/core-js/clear-immediate');var _clearImmediate3=_interopRequireDefault(_clearImmediate2);var _setImmediate2=require('babel-runtime/core-js/set-immediate');var _setImmediate3=_interopRequireDefault(_setImmediate2);var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _getOwnPropertyDescriptor=require('babel-runtime/core-js/object/get-own-property-descriptor');var _getOwnPropertyDescriptor2=_interopRequireDefault(_getOwnPropertyDescriptor);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _imul=require('babel-runtime/core-js/math/imul');var _imul2=_interopRequireDefault(_imul);var _clz=require('babel-runtime/core-js/math/clz32');var _clz2=_interopRequireDefault(_clz);var _typeof2=require('babel-runtime/helpers/typeof');var _typeof3=_interopRequireDefault(_typeof2);var _create=require('babel-runtime/core-js/object/create');var _create2=_interopRequireDefault(_create);var _species=require('babel-runtime/core-js/symbol/species');var _species2=_interopRequireDefault(_species);var _symbol=require('babel-runtime/core-js/symbol');var _symbol2=_interopRequireDefault(_symbol);var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/******/(function(modules){// webpackBootstrap
/******/// The module cache
/******/var installedModules={};/******//******/// The require function
/******/function __webpack_require__(moduleId){/******//******/// Check if module is in cache
/******/if(installedModules[moduleId]){/******/return installedModules[moduleId].exports;/******/}/******/// Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/i:moduleId,/******/l:false,/******/exports:{}/******/};/******//******/// Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******//******/// Flag the module as loaded
/******/module.l=true;/******//******/// Return the exports of the module
/******/return module.exports;/******/}/******//******//******/// expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******//******/// expose the module cache
/******/__webpack_require__.c=installedModules;/******//******/// define getter function for harmony exports
/******/__webpack_require__.d=function(exports,name,getter){/******/if(!__webpack_require__.o(exports,name)){/******/(0,_defineProperty2.default)(exports,name,{/******/configurable:false,/******/enumerable:true,/******/get:getter/******/});/******/}/******/};/******//******/// getDefaultExport function for compatibility with non-harmony modules
/******/__webpack_require__.n=function(module){/******/var getter=module&&module.__esModule?/******/function getDefault(){return module['default'];}:/******/function getModuleExports(){return module;};/******/__webpack_require__.d(getter,'a',getter);/******/return getter;/******/};/******//******/// Object.prototype.hasOwnProperty.call
/******/__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};/******//******/// __webpack_public_path__
/******/__webpack_require__.p="";/******//******/// Load entry module and return exports
/******/return __webpack_require__(__webpack_require__.s=104);/******/})(/************************************************************************//******/[/* 0 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(global){/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 *//* eslint-disable no-proto */var base64=__webpack_require__(111);var ieee754=__webpack_require__(112);var isArray=__webpack_require__(55);exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */Buffer.TYPED_ARRAY_SUPPORT=global.TYPED_ARRAY_SUPPORT!==undefined?global.TYPED_ARRAY_SUPPORT:typedArraySupport();/*
 * Export kMaxLength after typed array support is determined.
 */exports.kMaxLength=kMaxLength();function typedArraySupport(){try{var arr=new Uint8Array(1);arr.__proto__={__proto__:Uint8Array.prototype,foo:function foo(){return 42;}};return arr.foo()===42&&// typed array instances can be augmented
typeof arr.subarray==='function'&&// chrome 9-10 lack `subarray`
arr.subarray(1,1).byteLength===0;// ie10 has broken `subarray`
}catch(e){return false;}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?0x7fffffff:0x3fffffff;}function createBuffer(that,length){if(kMaxLength()<length){throw new RangeError('Invalid typed array length');}if(Buffer.TYPED_ARRAY_SUPPORT){// Return an augmented `Uint8Array` instance, for best performance
that=new Uint8Array(length);that.__proto__=Buffer.prototype;}else{// Fallback: Return an object instance of the Buffer class
if(that===null){that=new Buffer(length);}that.length=length;}return that;}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function Buffer(arg,encodingOrOffset,length){if(!Buffer.TYPED_ARRAY_SUPPORT&&!(this instanceof Buffer)){return new Buffer(arg,encodingOrOffset,length);}// Common case.
if(typeof arg==='number'){if(typeof encodingOrOffset==='string'){throw new Error('If encoding is specified then the first argument must be a string');}return allocUnsafe(this,arg);}return from(this,arg,encodingOrOffset,length);}Buffer.poolSize=8192;// not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment=function(arr){arr.__proto__=Buffer.prototype;return arr;};function from(that,value,encodingOrOffset,length){if(typeof value==='number'){throw new TypeError('"value" argument must not be a number');}if(typeof ArrayBuffer!=='undefined'&&value instanceof ArrayBuffer){return fromArrayBuffer(that,value,encodingOrOffset,length);}if(typeof value==='string'){return fromString(that,value,encodingOrOffset);}return fromObject(that,value);}/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/Buffer.from=function(value,encodingOrOffset,length){return from(null,value,encodingOrOffset,length);};if(Buffer.TYPED_ARRAY_SUPPORT){Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;if(typeof _symbol2.default!=='undefined'&&_species2.default&&Buffer[_species2.default]===Buffer){// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
(0,_defineProperty2.default)(Buffer,_species2.default,{value:null,configurable:true});}}function assertSize(size){if(typeof size!=='number'){throw new TypeError('"size" argument must be a number');}else if(size<0){throw new RangeError('"size" argument must not be negative');}}function alloc(that,size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(that,size);}if(fill!==undefined){// Only pay attention to encoding if it's a string. This
// prevents accidentally sending in a number that would
// be interpretted as a start offset.
return typeof encoding==='string'?createBuffer(that,size).fill(fill,encoding):createBuffer(that,size).fill(fill);}return createBuffer(that,size);}/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/Buffer.alloc=function(size,fill,encoding){return alloc(null,size,fill,encoding);};function allocUnsafe(that,size){assertSize(size);that=createBuffer(that,size<0?0:checked(size)|0);if(!Buffer.TYPED_ARRAY_SUPPORT){for(var i=0;i<size;++i){that[i]=0;}}return that;}/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */Buffer.allocUnsafe=function(size){return allocUnsafe(null,size);};/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */Buffer.allocUnsafeSlow=function(size){return allocUnsafe(null,size);};function fromString(that,string,encoding){if(typeof encoding!=='string'||encoding===''){encoding='utf8';}if(!Buffer.isEncoding(encoding)){throw new TypeError('"encoding" must be a valid string encoding');}var length=byteLength(string,encoding)|0;that=createBuffer(that,length);var actual=that.write(string,encoding);if(actual!==length){// Writing a hex string, for example, that contains invalid characters will
// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
that=that.slice(0,actual);}return that;}function fromArrayLike(that,array){var length=array.length<0?0:checked(array.length)|0;that=createBuffer(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255;}return that;}function fromArrayBuffer(that,array,byteOffset,length){array.byteLength;// this throws if `array` is not a valid ArrayBuffer
if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError('\'offset\' is out of bounds');}if(array.byteLength<byteOffset+(length||0)){throw new RangeError('\'length\' is out of bounds');}if(byteOffset===undefined&&length===undefined){array=new Uint8Array(array);}else if(length===undefined){array=new Uint8Array(array,byteOffset);}else{array=new Uint8Array(array,byteOffset,length);}if(Buffer.TYPED_ARRAY_SUPPORT){// Return an augmented `Uint8Array` instance, for best performance
that=array;that.__proto__=Buffer.prototype;}else{// Fallback: Return an object instance of the Buffer class
that=fromArrayLike(that,array);}return that;}function fromObject(that,obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;that=createBuffer(that,len);if(that.length===0){return that;}obj.copy(that,0,0,len);return that;}if(obj){if(typeof ArrayBuffer!=='undefined'&&obj.buffer instanceof ArrayBuffer||'length'in obj){if(typeof obj.length!=='number'||isnan(obj.length)){return createBuffer(that,0);}return fromArrayLike(that,obj);}if(obj.type==='Buffer'&&isArray(obj.data)){return fromArrayLike(that,obj.data);}}throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');}function checked(length){// Note: cannot use `length < kMaxLength()` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(length>=kMaxLength()){throw new RangeError('Attempt to allocate Buffer larger than maximum '+'size: 0x'+kMaxLength().toString(16)+' bytes');}return length|0;}function SlowBuffer(length){if(+length!=length){// eslint-disable-line eqeqeq
length=0;}return Buffer.alloc(+length);}Buffer.isBuffer=function isBuffer(b){return!!(b!=null&&b._isBuffer);};Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError('Arguments must be Buffers');}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'latin1':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return true;default:return false;}};Buffer.concat=function concat(list,length){if(!isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers');}if(list.length===0){return Buffer.alloc(0);}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length;}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers');}buf.copy(buffer,pos);pos+=buf.length;}return buffer;};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length;}if(typeof ArrayBuffer!=='undefined'&&typeof ArrayBuffer.isView==='function'&&(ArrayBuffer.isView(string)||string instanceof ArrayBuffer)){return string.byteLength;}if(typeof string!=='string'){string=''+string;}var len=string.length;if(len===0)return 0;// Use a for loop to avoid recursion
var loweredCase=false;for(;;){switch(encoding){case'ascii':case'latin1':case'binary':return len;case'utf8':case'utf-8':case undefined:return utf8ToBytes(string).length;case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return len*2;case'hex':return len>>>1;case'base64':return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;// assume utf8
encoding=(''+encoding).toLowerCase();loweredCase=true;}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
// property of a typed array.
// This behaves neither like String nor Uint8Array in that we set start/end
// to their upper/lower bounds if the value passed is out of range.
// undefined is handled specially as per ECMA-262 6th Edition,
// Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
if(start===undefined||start<0){start=0;}// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if(start>this.length){return'';}if(end===undefined||end>this.length){end=this.length;}if(end<=0){return'';}// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
end>>>=0;start>>>=0;if(end<=start){return'';}if(!encoding)encoding='utf8';while(true){switch(encoding){case'hex':return hexSlice(this,start,end);case'utf8':case'utf-8':return utf8Slice(this,start,end);case'ascii':return asciiSlice(this,start,end);case'latin1':case'binary':return latin1Slice(this,start,end);case'base64':return base64Slice(this,start,end);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(encoding+'').toLowerCase();loweredCase=true;}}}// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i;}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError('Buffer size must be a multiple of 16-bits');}for(var i=0;i<len;i+=2){swap(this,i,i+1);}return this;};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError('Buffer size must be a multiple of 32-bits');}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2);}return this;};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError('Buffer size must be a multiple of 64-bits');}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4);}return this;};Buffer.prototype.toString=function toString(){var length=this.length|0;if(length===0)return'';if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments);};Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError('Argument must be a Buffer');if(this===b)return true;return Buffer.compare(this,b)===0;};Buffer.prototype.inspect=function inspect(){var str='';var max=exports.INSPECT_MAX_BYTES;if(this.length>0){str=this.toString('hex',0,max).match(/.{2}/g).join(' ');if(this.length>max)str+=' ... ';}return'<Buffer '+str+'>';};Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target)){throw new TypeError('Argument must be a Buffer');}if(start===undefined){start=0;}if(end===undefined){end=target?target.length:0;}if(thisStart===undefined){thisStart=0;}if(thisEnd===undefined){thisEnd=this.length;}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError('out of range index');}if(thisStart>=thisEnd&&start>=end){return 0;}if(thisStart>=thisEnd){return-1;}if(start>=end){return 1;}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){// Empty buffer means no match
if(buffer.length===0)return-1;// Normalize byteOffset
if(typeof byteOffset==='string'){encoding=byteOffset;byteOffset=0;}else if(byteOffset>0x7fffffff){byteOffset=0x7fffffff;}else if(byteOffset<-0x80000000){byteOffset=-0x80000000;}byteOffset=+byteOffset;// Coerce to Number.
if(isNaN(byteOffset)){// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
byteOffset=dir?0:buffer.length-1;}// Normalize byteOffset: negative offsets start from the end of the buffer
if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return-1;else byteOffset=buffer.length-1;}else if(byteOffset<0){if(dir)byteOffset=0;else return-1;}// Normalize val
if(typeof val==='string'){val=Buffer.from(val,encoding);}// Finally, search either indexOf (if dir is true) or lastIndexOf
if(Buffer.isBuffer(val)){// Special case: looking for empty string/buffer always fails
if(val.length===0){return-1;}return arrayIndexOf(buffer,val,byteOffset,encoding,dir);}else if(typeof val==='number'){val=val&0xFF;// Search for a byte value [0-255]
if(Buffer.TYPED_ARRAY_SUPPORT&&typeof Uint8Array.prototype.indexOf==='function'){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset);}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset);}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir);}throw new TypeError('val must be string, number or Buffer');}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==='ucs2'||encoding==='ucs-2'||encoding==='utf16le'||encoding==='utf-16le'){if(arr.length<2||val.length<2){return-1;}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2;}}function read(buf,i){if(indexSize===1){return buf[i];}else{return buf.readUInt16BE(i*indexSize);}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize;}else{if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1;}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break;}}if(found)return i;}}return-1;}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1;};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true);};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false);};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining;}else{length=Number(length);if(length>remaining){length=remaining;}}// must be an even number of digits
var strLen=string.length;if(strLen%2!==0)throw new TypeError('Invalid hex string');if(length>strLen/2){length=strLen/2;}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(isNaN(parsed))return i;buf[offset+i]=parsed;}return i;}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length);}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length);}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length);}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length);}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length);}Buffer.prototype.write=function write(string,offset,length,encoding){// Buffer#write(string)
if(offset===undefined){encoding='utf8';length=this.length;offset=0;// Buffer#write(string, encoding)
}else if(length===undefined&&typeof offset==='string'){encoding=offset;length=this.length;offset=0;// Buffer#write(string, offset[, length][, encoding])
}else if(isFinite(offset)){offset=offset|0;if(isFinite(length)){length=length|0;if(encoding===undefined)encoding='utf8';}else{encoding=length;length=undefined;}// legacy write(string, encoding, offset, length) - remove in v0.13
}else{throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError('Attempt to write outside buffer bounds');}if(!encoding)encoding='utf8';var loweredCase=false;for(;;){switch(encoding){case'hex':return hexWrite(this,string,offset,length);case'utf8':case'utf-8':return utf8Write(this,string,offset,length);case'ascii':return asciiWrite(this,string,offset,length);case'latin1':case'binary':return latin1Write(this,string,offset,length);case'base64':// Warning: maxLength not taken into account in base64Write
return base64Write(this,string,offset,length);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(''+encoding).toLowerCase();loweredCase=true;}}};Buffer.prototype.toJSON=function toJSON(){return{type:'Buffer',data:Array.prototype.slice.call(this._arr||this,0)};};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf);}else{return base64.fromByteArray(buf.slice(start,end));}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>0xEF?4:firstByte>0xDF?3:firstByte>0xBF?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<0x80){codePoint=firstByte;}break;case 2:secondByte=buf[i+1];if((secondByte&0xC0)===0x80){tempCodePoint=(firstByte&0x1F)<<0x6|secondByte&0x3F;if(tempCodePoint>0x7F){codePoint=tempCodePoint;}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0xC|(secondByte&0x3F)<<0x6|thirdByte&0x3F;if(tempCodePoint>0x7FF&&(tempCodePoint<0xD800||tempCodePoint>0xDFFF)){codePoint=tempCodePoint;}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80&&(fourthByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0x12|(secondByte&0x3F)<<0xC|(thirdByte&0x3F)<<0x6|fourthByte&0x3F;if(tempCodePoint>0xFFFF&&tempCodePoint<0x110000){codePoint=tempCodePoint;}}}}if(codePoint===null){// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
codePoint=0xFFFD;bytesPerSequence=1;}else if(codePoint>0xFFFF){// encode to utf16 (surrogate pair dance)
codePoint-=0x10000;res.push(codePoint>>>10&0x3FF|0xD800);codePoint=0xDC00|codePoint&0x3FF;}res.push(codePoint);i+=bytesPerSequence;}return decodeCodePointsArray(res);}// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH=0x1000;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints);// avoid extra slice()
}// Decode in chunks to avoid "call stack size exceeded".
var res='';var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));}return res;}function asciiSlice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&0x7F);}return ret;}function latin1Slice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]);}return ret;}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out='';for(var i=start;i<end;++i){out+=toHex(buf[i]);}return out;}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res='';for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256);}return res;}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0;}else if(start>len){start=len;}if(end<0){end+=len;if(end<0)end=0;}else if(end>len){end=len;}if(end<start)end=start;var newBuf;if(Buffer.TYPED_ARRAY_SUPPORT){newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype;}else{var sliceLen=end-start;newBuf=new Buffer(sliceLen,undefined);for(var i=0;i<sliceLen;++i){newBuf[i]=this[i+start];}}return newBuf;};/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError('offset is not uint');if(offset+ext>length)throw new RangeError('Trying to access beyond buffer length');}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}return val;};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert){checkOffset(offset,byteLength,this.length);}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=0x100)){val+=this[offset+--byteLength]*mul;}return val;};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);return this[offset];};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8;};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1];};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*0x1000000;};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*0x1000000+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3]);};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=0x100)){val+=this[offset+--i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readInt8=function readInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&0x80))return this[offset];return(0xff-this[offset]+1)*-1;};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24;};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3];};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4);};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4);};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8);};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8);};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError('Index out of range');}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var mul=1;var i=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var i=byteLength-1;var mul=1;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,0xff,0);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);this[offset]=value&0xff;return offset+1;};function objectWriteUInt16(buf,value,offset,littleEndian){if(value<0)value=0xffff+value+1;for(var i=0,j=Math.min(buf.length-offset,2);i<j;++i){buf[offset+i]=(value&0xff<<8*(littleEndian?i:1-i))>>>(littleEndian?i:1-i)*8;}}Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;}else{objectWriteUInt16(this,value,offset,true);}return offset+2;};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&0xff;}else{objectWriteUInt16(this,value,offset,false);}return offset+2;};function objectWriteUInt32(buf,value,offset,littleEndian){if(value<0)value=0xffffffff+value+1;for(var i=0,j=Math.min(buf.length-offset,4);i<j;++i){buf[offset+i]=value>>>(littleEndian?i:3-i)*8&0xff;}}Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&0xff;}else{objectWriteUInt32(this,value,offset,true);}return offset+4;};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;}else{objectWriteUInt32(this,value,offset,false);}return offset+4;};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=0;var mul=1;var sub=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,0x7f,-0x80);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);if(value<0)value=0xff+value+1;this[offset]=value&0xff;return offset+1;};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;}else{objectWriteUInt16(this,value,offset,true);}return offset+2;};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&0xff;}else{objectWriteUInt16(this,value,offset,false);}return offset+2;};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;}else{objectWriteUInt32(this,value,offset,true);}return offset+4;};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);if(value<0)value=0xffffffff+value+1;if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;}else{objectWriteUInt32(this,value,offset,false);}return offset+4;};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError('Index out of range');if(offset<0)throw new RangeError('Index out of range');}function writeFloat(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e+38,-3.4028234663852886e+38);}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4;}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert);};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert);};function writeDouble(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157E+308,-1.7976931348623157E+308);}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8;}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert);};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert);};// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;// Copy 0 bytes; we're done
if(end===start)return 0;if(target.length===0||this.length===0)return 0;// Fatal error conditions
if(targetStart<0){throw new RangeError('targetStart out of bounds');}if(start<0||start>=this.length)throw new RangeError('sourceStart out of bounds');if(end<0)throw new RangeError('sourceEnd out of bounds');// Are we oob?
if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start;}var len=end-start;var i;if(this===target&&start<targetStart&&targetStart<end){// descending copy from end
for(i=len-1;i>=0;--i){target[i+targetStart]=this[i+start];}}else if(len<1000||!Buffer.TYPED_ARRAY_SUPPORT){// ascending copy from start
for(i=0;i<len;++i){target[i+targetStart]=this[i+start];}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart);}return len;};// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill=function fill(val,start,end,encoding){// Handle string cases:
if(typeof val==='string'){if(typeof start==='string'){encoding=start;start=0;end=this.length;}else if(typeof end==='string'){encoding=end;end=this.length;}if(val.length===1){var code=val.charCodeAt(0);if(code<256){val=code;}}if(encoding!==undefined&&typeof encoding!=='string'){throw new TypeError('encoding must be a string');}if(typeof encoding==='string'&&!Buffer.isEncoding(encoding)){throw new TypeError('Unknown encoding: '+encoding);}}else if(typeof val==='number'){val=val&255;}// Invalid ranges are not set to a default, so can range check early.
if(start<0||this.length<start||this.length<end){throw new RangeError('Out of range index');}if(end<=start){return this;}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==='number'){for(i=start;i<end;++i){this[i]=val;}}else{var bytes=Buffer.isBuffer(val)?val:utf8ToBytes(new Buffer(val,encoding).toString());var len=bytes.length;for(i=0;i<end-start;++i){this[i+start]=bytes[i%len];}}return this;};// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;function base64clean(str){// Node strips out invalid characters like \n and \t from the string, base64-js does not
str=stringtrim(str).replace(INVALID_BASE64_RE,'');// Node converts strings with length < 2 to ''
if(str.length<2)return'';// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
while(str.length%4!==0){str=str+'=';}return str;}function stringtrim(str){if(str.trim)return str.trim();return str.replace(/^\s+|\s+$/g,'');}function toHex(n){if(n<16)return'0'+n.toString(16);return n.toString(16);}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);// is surrogate component
if(codePoint>0xD7FF&&codePoint<0xE000){// last char was a lead
if(!leadSurrogate){// no lead yet
if(codePoint>0xDBFF){// unexpected trail
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}else if(i+1===length){// unpaired lead
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}// valid lead
leadSurrogate=codePoint;continue;}// 2 leads in a row
if(codePoint<0xDC00){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);leadSurrogate=codePoint;continue;}// valid surrogate pair
codePoint=(leadSurrogate-0xD800<<10|codePoint-0xDC00)+0x10000;}else if(leadSurrogate){// valid bmp char, but last char was a lead
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);}leadSurrogate=null;// encode utf8
if(codePoint<0x80){if((units-=1)<0)break;bytes.push(codePoint);}else if(codePoint<0x800){if((units-=2)<0)break;bytes.push(codePoint>>0x6|0xC0,codePoint&0x3F|0x80);}else if(codePoint<0x10000){if((units-=3)<0)break;bytes.push(codePoint>>0xC|0xE0,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else if(codePoint<0x110000){if((units-=4)<0)break;bytes.push(codePoint>>0x12|0xF0,codePoint>>0xC&0x3F|0x80,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else{throw new Error('Invalid code point');}}return bytes;}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){// Node's code seems to be doing this and not & 0x7F..
byteArray.push(str.charCodeAt(i)&0xFF);}return byteArray;}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi);}return byteArray;}function base64ToBytes(str){return base64.toByteArray(base64clean(str));}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i];}return i;}function isnan(val){return val!==val;// eslint-disable-line no-self-compare
}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6));/***/},/* 1 *//***/function(module,exports){if(typeof _create2.default==='function'){// implementation from standard node.js 'util' module
module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=(0,_create2.default)(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}});};}else{// old school shim for old browsers
module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function TempCtor(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor();ctor.prototype.constructor=ctor;};}/***/},/* 2 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(module){(function(module,exports){'use strict';// Utils
function assert(val,msg){if(!val)throw new Error(msg||'Assertion failed');}// Could use `inherits` module, but don't want to move from single file
// architecture yet.
function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function TempCtor(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor();ctor.prototype.constructor=ctor;}// BN
function BN(number,base,endian){if(BN.isBN(number)){return number;}this.negative=0;this.words=null;this.length=0;// Reduction context
this.red=null;if(number!==null){if(base==='le'||base==='be'){endian=base;base=10;}this._init(number||0,base||10,endian||'be');}}if((typeof module==='undefined'?'undefined':(0,_typeof3.default)(module))==='object'){module.exports=BN;}else{exports.BN=BN;}BN.BN=BN;BN.wordSize=26;var Buffer;try{Buffer=__webpack_require__(173).Buffer;}catch(e){}BN.isBN=function isBN(num){if(num instanceof BN){return true;}return num!==null&&(typeof num==='undefined'?'undefined':(0,_typeof3.default)(num))==='object'&&num.constructor.wordSize===BN.wordSize&&Array.isArray(num.words);};BN.max=function max(left,right){if(left.cmp(right)>0)return left;return right;};BN.min=function min(left,right){if(left.cmp(right)<0)return left;return right;};BN.prototype._init=function init(number,base,endian){if(typeof number==='number'){return this._initNumber(number,base,endian);}if((typeof number==='undefined'?'undefined':(0,_typeof3.default)(number))==='object'){return this._initArray(number,base,endian);}if(base==='hex'){base=16;}assert(base===(base|0)&&base>=2&&base<=36);number=number.toString().replace(/\s+/g,'');var start=0;if(number[0]==='-'){start++;}if(base===16){this._parseHex(number,start);}else{this._parseBase(number,base,start);}if(number[0]==='-'){this.negative=1;}this.strip();if(endian!=='le')return;this._initArray(this.toArray(),base,endian);};BN.prototype._initNumber=function _initNumber(number,base,endian){if(number<0){this.negative=1;number=-number;}if(number<0x4000000){this.words=[number&0x3ffffff];this.length=1;}else if(number<0x10000000000000){this.words=[number&0x3ffffff,number/0x4000000&0x3ffffff];this.length=2;}else{assert(number<0x20000000000000);// 2 ^ 53 (unsafe)
this.words=[number&0x3ffffff,number/0x4000000&0x3ffffff,1];this.length=3;}if(endian!=='le')return;// Reverse the bytes
this._initArray(this.toArray(),base,endian);};BN.prototype._initArray=function _initArray(number,base,endian){// Perhaps a Uint8Array
assert(typeof number.length==='number');if(number.length<=0){this.words=[0];this.length=1;return this;}this.length=Math.ceil(number.length/3);this.words=new Array(this.length);for(var i=0;i<this.length;i++){this.words[i]=0;}var j,w;var off=0;if(endian==='be'){for(i=number.length-1,j=0;i>=0;i-=3){w=number[i]|number[i-1]<<8|number[i-2]<<16;this.words[j]|=w<<off&0x3ffffff;this.words[j+1]=w>>>26-off&0x3ffffff;off+=24;if(off>=26){off-=26;j++;}}}else if(endian==='le'){for(i=0,j=0;i<number.length;i+=3){w=number[i]|number[i+1]<<8|number[i+2]<<16;this.words[j]|=w<<off&0x3ffffff;this.words[j+1]=w>>>26-off&0x3ffffff;off+=24;if(off>=26){off-=26;j++;}}}return this.strip();};function parseHex(str,start,end){var r=0;var len=Math.min(str.length,end);for(var i=start;i<len;i++){var c=str.charCodeAt(i)-48;r<<=4;// 'a' - 'f'
if(c>=49&&c<=54){r|=c-49+0xa;// 'A' - 'F'
}else if(c>=17&&c<=22){r|=c-17+0xa;// '0' - '9'
}else{r|=c&0xf;}}return r;}BN.prototype._parseHex=function _parseHex(number,start){// Create possibly bigger array to ensure that it fits the number
this.length=Math.ceil((number.length-start)/6);this.words=new Array(this.length);for(var i=0;i<this.length;i++){this.words[i]=0;}var j,w;// Scan 24-bit chunks and add them to the number
var off=0;for(i=number.length-6,j=0;i>=start;i-=6){w=parseHex(number,i,i+6);this.words[j]|=w<<off&0x3ffffff;// NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
this.words[j+1]|=w>>>26-off&0x3fffff;off+=24;if(off>=26){off-=26;j++;}}if(i+6!==start){w=parseHex(number,start,i+6);this.words[j]|=w<<off&0x3ffffff;this.words[j+1]|=w>>>26-off&0x3fffff;}this.strip();};function parseBase(str,start,end,mul){var r=0;var len=Math.min(str.length,end);for(var i=start;i<len;i++){var c=str.charCodeAt(i)-48;r*=mul;// 'a'
if(c>=49){r+=c-49+0xa;// 'A'
}else if(c>=17){r+=c-17+0xa;// '0' - '9'
}else{r+=c;}}return r;}BN.prototype._parseBase=function _parseBase(number,base,start){// Initialize as zero
this.words=[0];this.length=1;// Find length of limb in base
for(var limbLen=0,limbPow=1;limbPow<=0x3ffffff;limbPow*=base){limbLen++;}limbLen--;limbPow=limbPow/base|0;var total=number.length-start;var mod=total%limbLen;var end=Math.min(total,total-mod)+start;var word=0;for(var i=start;i<end;i+=limbLen){word=parseBase(number,i,i+limbLen,base);this.imuln(limbPow);if(this.words[0]+word<0x4000000){this.words[0]+=word;}else{this._iaddn(word);}}if(mod!==0){var pow=1;word=parseBase(number,i,number.length,base);for(i=0;i<mod;i++){pow*=base;}this.imuln(pow);if(this.words[0]+word<0x4000000){this.words[0]+=word;}else{this._iaddn(word);}}};BN.prototype.copy=function copy(dest){dest.words=new Array(this.length);for(var i=0;i<this.length;i++){dest.words[i]=this.words[i];}dest.length=this.length;dest.negative=this.negative;dest.red=this.red;};BN.prototype.clone=function clone(){var r=new BN(null);this.copy(r);return r;};BN.prototype._expand=function _expand(size){while(this.length<size){this.words[this.length++]=0;}return this;};// Remove leading `0` from `this`
BN.prototype.strip=function strip(){while(this.length>1&&this.words[this.length-1]===0){this.length--;}return this._normSign();};BN.prototype._normSign=function _normSign(){// -0 = 0
if(this.length===1&&this.words[0]===0){this.negative=0;}return this;};BN.prototype.inspect=function inspect(){return(this.red?'<BN-R: ':'<BN: ')+this.toString(16)+'>';};/*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */var zeros=['','0','00','000','0000','00000','000000','0000000','00000000','000000000','0000000000','00000000000','000000000000','0000000000000','00000000000000','000000000000000','0000000000000000','00000000000000000','000000000000000000','0000000000000000000','00000000000000000000','000000000000000000000','0000000000000000000000','00000000000000000000000','000000000000000000000000','0000000000000000000000000'];var groupSizes=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5];var groupBases=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,10000000,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64000000,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,24300000,28629151,33554432,39135393,45435424,52521875,60466176];BN.prototype.toString=function toString(base,padding){base=base||10;padding=padding|0||1;var out;if(base===16||base==='hex'){out='';var off=0;var carry=0;for(var i=0;i<this.length;i++){var w=this.words[i];var word=((w<<off|carry)&0xffffff).toString(16);carry=w>>>24-off&0xffffff;if(carry!==0||i!==this.length-1){out=zeros[6-word.length]+word+out;}else{out=word+out;}off+=2;if(off>=26){off-=26;i--;}}if(carry!==0){out=carry.toString(16)+out;}while(out.length%padding!==0){out='0'+out;}if(this.negative!==0){out='-'+out;}return out;}if(base===(base|0)&&base>=2&&base<=36){// var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
var groupSize=groupSizes[base];// var groupBase = Math.pow(base, groupSize);
var groupBase=groupBases[base];out='';var c=this.clone();c.negative=0;while(!c.isZero()){var r=c.modn(groupBase).toString(base);c=c.idivn(groupBase);if(!c.isZero()){out=zeros[groupSize-r.length]+r+out;}else{out=r+out;}}if(this.isZero()){out='0'+out;}while(out.length%padding!==0){out='0'+out;}if(this.negative!==0){out='-'+out;}return out;}assert(false,'Base should be between 2 and 36');};BN.prototype.toNumber=function toNumber(){var ret=this.words[0];if(this.length===2){ret+=this.words[1]*0x4000000;}else if(this.length===3&&this.words[2]===0x01){// NOTE: at this stage it is known that the top bit is set
ret+=0x10000000000000+this.words[1]*0x4000000;}else if(this.length>2){assert(false,'Number can only safely store up to 53 bits');}return this.negative!==0?-ret:ret;};BN.prototype.toJSON=function toJSON(){return this.toString(16);};BN.prototype.toBuffer=function toBuffer(endian,length){assert(typeof Buffer!=='undefined');return this.toArrayLike(Buffer,endian,length);};BN.prototype.toArray=function toArray(endian,length){return this.toArrayLike(Array,endian,length);};BN.prototype.toArrayLike=function toArrayLike(ArrayType,endian,length){var byteLength=this.byteLength();var reqLength=length||Math.max(1,byteLength);assert(byteLength<=reqLength,'byte array longer than desired length');assert(reqLength>0,'Requested array length <= 0');this.strip();var littleEndian=endian==='le';var res=new ArrayType(reqLength);var b,i;var q=this.clone();if(!littleEndian){// Assume big-endian
for(i=0;i<reqLength-byteLength;i++){res[i]=0;}for(i=0;!q.isZero();i++){b=q.andln(0xff);q.iushrn(8);res[reqLength-i-1]=b;}}else{for(i=0;!q.isZero();i++){b=q.andln(0xff);q.iushrn(8);res[i]=b;}for(;i<reqLength;i++){res[i]=0;}}return res;};if(_clz2.default){BN.prototype._countBits=function _countBits(w){return 32-(0,_clz2.default)(w);};}else{BN.prototype._countBits=function _countBits(w){var t=w;var r=0;if(t>=0x1000){r+=13;t>>>=13;}if(t>=0x40){r+=7;t>>>=7;}if(t>=0x8){r+=4;t>>>=4;}if(t>=0x02){r+=2;t>>>=2;}return r+t;};}BN.prototype._zeroBits=function _zeroBits(w){// Short-cut
if(w===0)return 26;var t=w;var r=0;if((t&0x1fff)===0){r+=13;t>>>=13;}if((t&0x7f)===0){r+=7;t>>>=7;}if((t&0xf)===0){r+=4;t>>>=4;}if((t&0x3)===0){r+=2;t>>>=2;}if((t&0x1)===0){r++;}return r;};// Return number of used bits in a BN
BN.prototype.bitLength=function bitLength(){var w=this.words[this.length-1];var hi=this._countBits(w);return(this.length-1)*26+hi;};function toBitArray(num){var w=new Array(num.bitLength());for(var bit=0;bit<w.length;bit++){var off=bit/26|0;var wbit=bit%26;w[bit]=(num.words[off]&1<<wbit)>>>wbit;}return w;}// Number of trailing zero bits
BN.prototype.zeroBits=function zeroBits(){if(this.isZero())return 0;var r=0;for(var i=0;i<this.length;i++){var b=this._zeroBits(this.words[i]);r+=b;if(b!==26)break;}return r;};BN.prototype.byteLength=function byteLength(){return Math.ceil(this.bitLength()/8);};BN.prototype.toTwos=function toTwos(width){if(this.negative!==0){return this.abs().inotn(width).iaddn(1);}return this.clone();};BN.prototype.fromTwos=function fromTwos(width){if(this.testn(width-1)){return this.notn(width).iaddn(1).ineg();}return this.clone();};BN.prototype.isNeg=function isNeg(){return this.negative!==0;};// Return negative clone of `this`
BN.prototype.neg=function neg(){return this.clone().ineg();};BN.prototype.ineg=function ineg(){if(!this.isZero()){this.negative^=1;}return this;};// Or `num` with `this` in-place
BN.prototype.iuor=function iuor(num){while(this.length<num.length){this.words[this.length++]=0;}for(var i=0;i<num.length;i++){this.words[i]=this.words[i]|num.words[i];}return this.strip();};BN.prototype.ior=function ior(num){assert((this.negative|num.negative)===0);return this.iuor(num);};// Or `num` with `this`
BN.prototype.or=function or(num){if(this.length>num.length)return this.clone().ior(num);return num.clone().ior(this);};BN.prototype.uor=function uor(num){if(this.length>num.length)return this.clone().iuor(num);return num.clone().iuor(this);};// And `num` with `this` in-place
BN.prototype.iuand=function iuand(num){// b = min-length(num, this)
var b;if(this.length>num.length){b=num;}else{b=this;}for(var i=0;i<b.length;i++){this.words[i]=this.words[i]&num.words[i];}this.length=b.length;return this.strip();};BN.prototype.iand=function iand(num){assert((this.negative|num.negative)===0);return this.iuand(num);};// And `num` with `this`
BN.prototype.and=function and(num){if(this.length>num.length)return this.clone().iand(num);return num.clone().iand(this);};BN.prototype.uand=function uand(num){if(this.length>num.length)return this.clone().iuand(num);return num.clone().iuand(this);};// Xor `num` with `this` in-place
BN.prototype.iuxor=function iuxor(num){// a.length > b.length
var a;var b;if(this.length>num.length){a=this;b=num;}else{a=num;b=this;}for(var i=0;i<b.length;i++){this.words[i]=a.words[i]^b.words[i];}if(this!==a){for(;i<a.length;i++){this.words[i]=a.words[i];}}this.length=a.length;return this.strip();};BN.prototype.ixor=function ixor(num){assert((this.negative|num.negative)===0);return this.iuxor(num);};// Xor `num` with `this`
BN.prototype.xor=function xor(num){if(this.length>num.length)return this.clone().ixor(num);return num.clone().ixor(this);};BN.prototype.uxor=function uxor(num){if(this.length>num.length)return this.clone().iuxor(num);return num.clone().iuxor(this);};// Not ``this`` with ``width`` bitwidth
BN.prototype.inotn=function inotn(width){assert(typeof width==='number'&&width>=0);var bytesNeeded=Math.ceil(width/26)|0;var bitsLeft=width%26;// Extend the buffer with leading zeroes
this._expand(bytesNeeded);if(bitsLeft>0){bytesNeeded--;}// Handle complete words
for(var i=0;i<bytesNeeded;i++){this.words[i]=~this.words[i]&0x3ffffff;}// Handle the residue
if(bitsLeft>0){this.words[i]=~this.words[i]&0x3ffffff>>26-bitsLeft;}// And remove leading zeroes
return this.strip();};BN.prototype.notn=function notn(width){return this.clone().inotn(width);};// Set `bit` of `this`
BN.prototype.setn=function setn(bit,val){assert(typeof bit==='number'&&bit>=0);var off=bit/26|0;var wbit=bit%26;this._expand(off+1);if(val){this.words[off]=this.words[off]|1<<wbit;}else{this.words[off]=this.words[off]&~(1<<wbit);}return this.strip();};// Add `num` to `this` in-place
BN.prototype.iadd=function iadd(num){var r;// negative + positive
if(this.negative!==0&&num.negative===0){this.negative=0;r=this.isub(num);this.negative^=1;return this._normSign();// positive + negative
}else if(this.negative===0&&num.negative!==0){num.negative=0;r=this.isub(num);num.negative=1;return r._normSign();}// a.length > b.length
var a,b;if(this.length>num.length){a=this;b=num;}else{a=num;b=this;}var carry=0;for(var i=0;i<b.length;i++){r=(a.words[i]|0)+(b.words[i]|0)+carry;this.words[i]=r&0x3ffffff;carry=r>>>26;}for(;carry!==0&&i<a.length;i++){r=(a.words[i]|0)+carry;this.words[i]=r&0x3ffffff;carry=r>>>26;}this.length=a.length;if(carry!==0){this.words[this.length]=carry;this.length++;// Copy the rest of the words
}else if(a!==this){for(;i<a.length;i++){this.words[i]=a.words[i];}}return this;};// Add `num` to `this`
BN.prototype.add=function add(num){var res;if(num.negative!==0&&this.negative===0){num.negative=0;res=this.sub(num);num.negative^=1;return res;}else if(num.negative===0&&this.negative!==0){this.negative=0;res=num.sub(this);this.negative=1;return res;}if(this.length>num.length)return this.clone().iadd(num);return num.clone().iadd(this);};// Subtract `num` from `this` in-place
BN.prototype.isub=function isub(num){// this - (-num) = this + num
if(num.negative!==0){num.negative=0;var r=this.iadd(num);num.negative=1;return r._normSign();// -this - num = -(this + num)
}else if(this.negative!==0){this.negative=0;this.iadd(num);this.negative=1;return this._normSign();}// At this point both numbers are positive
var cmp=this.cmp(num);// Optimization - zeroify
if(cmp===0){this.negative=0;this.length=1;this.words[0]=0;return this;}// a > b
var a,b;if(cmp>0){a=this;b=num;}else{a=num;b=this;}var carry=0;for(var i=0;i<b.length;i++){r=(a.words[i]|0)-(b.words[i]|0)+carry;carry=r>>26;this.words[i]=r&0x3ffffff;}for(;carry!==0&&i<a.length;i++){r=(a.words[i]|0)+carry;carry=r>>26;this.words[i]=r&0x3ffffff;}// Copy rest of the words
if(carry===0&&i<a.length&&a!==this){for(;i<a.length;i++){this.words[i]=a.words[i];}}this.length=Math.max(this.length,i);if(a!==this){this.negative=1;}return this.strip();};// Subtract `num` from `this`
BN.prototype.sub=function sub(num){return this.clone().isub(num);};function smallMulTo(self,num,out){out.negative=num.negative^self.negative;var len=self.length+num.length|0;out.length=len;len=len-1|0;// Peel one iteration (compiler can't do it, because of code complexity)
var a=self.words[0]|0;var b=num.words[0]|0;var r=a*b;var lo=r&0x3ffffff;var carry=r/0x4000000|0;out.words[0]=lo;for(var k=1;k<len;k++){// Sum all words with the same `i + j = k` and accumulate `ncarry`,
// note that ncarry could be >= 0x3ffffff
var ncarry=carry>>>26;var rword=carry&0x3ffffff;var maxJ=Math.min(k,num.length-1);for(var j=Math.max(0,k-self.length+1);j<=maxJ;j++){var i=k-j|0;a=self.words[i]|0;b=num.words[j]|0;r=a*b+rword;ncarry+=r/0x4000000|0;rword=r&0x3ffffff;}out.words[k]=rword|0;carry=ncarry|0;}if(carry!==0){out.words[k]=carry|0;}else{out.length--;}return out.strip();}// TODO(indutny): it may be reasonable to omit it for users who don't need
// to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
// multiplication (like elliptic secp256k1).
var comb10MulTo=function comb10MulTo(self,num,out){var a=self.words;var b=num.words;var o=out.words;var c=0;var lo;var mid;var hi;var a0=a[0]|0;var al0=a0&0x1fff;var ah0=a0>>>13;var a1=a[1]|0;var al1=a1&0x1fff;var ah1=a1>>>13;var a2=a[2]|0;var al2=a2&0x1fff;var ah2=a2>>>13;var a3=a[3]|0;var al3=a3&0x1fff;var ah3=a3>>>13;var a4=a[4]|0;var al4=a4&0x1fff;var ah4=a4>>>13;var a5=a[5]|0;var al5=a5&0x1fff;var ah5=a5>>>13;var a6=a[6]|0;var al6=a6&0x1fff;var ah6=a6>>>13;var a7=a[7]|0;var al7=a7&0x1fff;var ah7=a7>>>13;var a8=a[8]|0;var al8=a8&0x1fff;var ah8=a8>>>13;var a9=a[9]|0;var al9=a9&0x1fff;var ah9=a9>>>13;var b0=b[0]|0;var bl0=b0&0x1fff;var bh0=b0>>>13;var b1=b[1]|0;var bl1=b1&0x1fff;var bh1=b1>>>13;var b2=b[2]|0;var bl2=b2&0x1fff;var bh2=b2>>>13;var b3=b[3]|0;var bl3=b3&0x1fff;var bh3=b3>>>13;var b4=b[4]|0;var bl4=b4&0x1fff;var bh4=b4>>>13;var b5=b[5]|0;var bl5=b5&0x1fff;var bh5=b5>>>13;var b6=b[6]|0;var bl6=b6&0x1fff;var bh6=b6>>>13;var b7=b[7]|0;var bl7=b7&0x1fff;var bh7=b7>>>13;var b8=b[8]|0;var bl8=b8&0x1fff;var bh8=b8>>>13;var b9=b[9]|0;var bl9=b9&0x1fff;var bh9=b9>>>13;out.negative=self.negative^num.negative;out.length=19;/* k = 0 */lo=(0,_imul2.default)(al0,bl0);mid=(0,_imul2.default)(al0,bh0);mid=mid+(0,_imul2.default)(ah0,bl0)|0;hi=(0,_imul2.default)(ah0,bh0);var w0=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w0>>>26)|0;w0&=0x3ffffff;/* k = 1 */lo=(0,_imul2.default)(al1,bl0);mid=(0,_imul2.default)(al1,bh0);mid=mid+(0,_imul2.default)(ah1,bl0)|0;hi=(0,_imul2.default)(ah1,bh0);lo=lo+(0,_imul2.default)(al0,bl1)|0;mid=mid+(0,_imul2.default)(al0,bh1)|0;mid=mid+(0,_imul2.default)(ah0,bl1)|0;hi=hi+(0,_imul2.default)(ah0,bh1)|0;var w1=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w1>>>26)|0;w1&=0x3ffffff;/* k = 2 */lo=(0,_imul2.default)(al2,bl0);mid=(0,_imul2.default)(al2,bh0);mid=mid+(0,_imul2.default)(ah2,bl0)|0;hi=(0,_imul2.default)(ah2,bh0);lo=lo+(0,_imul2.default)(al1,bl1)|0;mid=mid+(0,_imul2.default)(al1,bh1)|0;mid=mid+(0,_imul2.default)(ah1,bl1)|0;hi=hi+(0,_imul2.default)(ah1,bh1)|0;lo=lo+(0,_imul2.default)(al0,bl2)|0;mid=mid+(0,_imul2.default)(al0,bh2)|0;mid=mid+(0,_imul2.default)(ah0,bl2)|0;hi=hi+(0,_imul2.default)(ah0,bh2)|0;var w2=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w2>>>26)|0;w2&=0x3ffffff;/* k = 3 */lo=(0,_imul2.default)(al3,bl0);mid=(0,_imul2.default)(al3,bh0);mid=mid+(0,_imul2.default)(ah3,bl0)|0;hi=(0,_imul2.default)(ah3,bh0);lo=lo+(0,_imul2.default)(al2,bl1)|0;mid=mid+(0,_imul2.default)(al2,bh1)|0;mid=mid+(0,_imul2.default)(ah2,bl1)|0;hi=hi+(0,_imul2.default)(ah2,bh1)|0;lo=lo+(0,_imul2.default)(al1,bl2)|0;mid=mid+(0,_imul2.default)(al1,bh2)|0;mid=mid+(0,_imul2.default)(ah1,bl2)|0;hi=hi+(0,_imul2.default)(ah1,bh2)|0;lo=lo+(0,_imul2.default)(al0,bl3)|0;mid=mid+(0,_imul2.default)(al0,bh3)|0;mid=mid+(0,_imul2.default)(ah0,bl3)|0;hi=hi+(0,_imul2.default)(ah0,bh3)|0;var w3=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w3>>>26)|0;w3&=0x3ffffff;/* k = 4 */lo=(0,_imul2.default)(al4,bl0);mid=(0,_imul2.default)(al4,bh0);mid=mid+(0,_imul2.default)(ah4,bl0)|0;hi=(0,_imul2.default)(ah4,bh0);lo=lo+(0,_imul2.default)(al3,bl1)|0;mid=mid+(0,_imul2.default)(al3,bh1)|0;mid=mid+(0,_imul2.default)(ah3,bl1)|0;hi=hi+(0,_imul2.default)(ah3,bh1)|0;lo=lo+(0,_imul2.default)(al2,bl2)|0;mid=mid+(0,_imul2.default)(al2,bh2)|0;mid=mid+(0,_imul2.default)(ah2,bl2)|0;hi=hi+(0,_imul2.default)(ah2,bh2)|0;lo=lo+(0,_imul2.default)(al1,bl3)|0;mid=mid+(0,_imul2.default)(al1,bh3)|0;mid=mid+(0,_imul2.default)(ah1,bl3)|0;hi=hi+(0,_imul2.default)(ah1,bh3)|0;lo=lo+(0,_imul2.default)(al0,bl4)|0;mid=mid+(0,_imul2.default)(al0,bh4)|0;mid=mid+(0,_imul2.default)(ah0,bl4)|0;hi=hi+(0,_imul2.default)(ah0,bh4)|0;var w4=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w4>>>26)|0;w4&=0x3ffffff;/* k = 5 */lo=(0,_imul2.default)(al5,bl0);mid=(0,_imul2.default)(al5,bh0);mid=mid+(0,_imul2.default)(ah5,bl0)|0;hi=(0,_imul2.default)(ah5,bh0);lo=lo+(0,_imul2.default)(al4,bl1)|0;mid=mid+(0,_imul2.default)(al4,bh1)|0;mid=mid+(0,_imul2.default)(ah4,bl1)|0;hi=hi+(0,_imul2.default)(ah4,bh1)|0;lo=lo+(0,_imul2.default)(al3,bl2)|0;mid=mid+(0,_imul2.default)(al3,bh2)|0;mid=mid+(0,_imul2.default)(ah3,bl2)|0;hi=hi+(0,_imul2.default)(ah3,bh2)|0;lo=lo+(0,_imul2.default)(al2,bl3)|0;mid=mid+(0,_imul2.default)(al2,bh3)|0;mid=mid+(0,_imul2.default)(ah2,bl3)|0;hi=hi+(0,_imul2.default)(ah2,bh3)|0;lo=lo+(0,_imul2.default)(al1,bl4)|0;mid=mid+(0,_imul2.default)(al1,bh4)|0;mid=mid+(0,_imul2.default)(ah1,bl4)|0;hi=hi+(0,_imul2.default)(ah1,bh4)|0;lo=lo+(0,_imul2.default)(al0,bl5)|0;mid=mid+(0,_imul2.default)(al0,bh5)|0;mid=mid+(0,_imul2.default)(ah0,bl5)|0;hi=hi+(0,_imul2.default)(ah0,bh5)|0;var w5=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w5>>>26)|0;w5&=0x3ffffff;/* k = 6 */lo=(0,_imul2.default)(al6,bl0);mid=(0,_imul2.default)(al6,bh0);mid=mid+(0,_imul2.default)(ah6,bl0)|0;hi=(0,_imul2.default)(ah6,bh0);lo=lo+(0,_imul2.default)(al5,bl1)|0;mid=mid+(0,_imul2.default)(al5,bh1)|0;mid=mid+(0,_imul2.default)(ah5,bl1)|0;hi=hi+(0,_imul2.default)(ah5,bh1)|0;lo=lo+(0,_imul2.default)(al4,bl2)|0;mid=mid+(0,_imul2.default)(al4,bh2)|0;mid=mid+(0,_imul2.default)(ah4,bl2)|0;hi=hi+(0,_imul2.default)(ah4,bh2)|0;lo=lo+(0,_imul2.default)(al3,bl3)|0;mid=mid+(0,_imul2.default)(al3,bh3)|0;mid=mid+(0,_imul2.default)(ah3,bl3)|0;hi=hi+(0,_imul2.default)(ah3,bh3)|0;lo=lo+(0,_imul2.default)(al2,bl4)|0;mid=mid+(0,_imul2.default)(al2,bh4)|0;mid=mid+(0,_imul2.default)(ah2,bl4)|0;hi=hi+(0,_imul2.default)(ah2,bh4)|0;lo=lo+(0,_imul2.default)(al1,bl5)|0;mid=mid+(0,_imul2.default)(al1,bh5)|0;mid=mid+(0,_imul2.default)(ah1,bl5)|0;hi=hi+(0,_imul2.default)(ah1,bh5)|0;lo=lo+(0,_imul2.default)(al0,bl6)|0;mid=mid+(0,_imul2.default)(al0,bh6)|0;mid=mid+(0,_imul2.default)(ah0,bl6)|0;hi=hi+(0,_imul2.default)(ah0,bh6)|0;var w6=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w6>>>26)|0;w6&=0x3ffffff;/* k = 7 */lo=(0,_imul2.default)(al7,bl0);mid=(0,_imul2.default)(al7,bh0);mid=mid+(0,_imul2.default)(ah7,bl0)|0;hi=(0,_imul2.default)(ah7,bh0);lo=lo+(0,_imul2.default)(al6,bl1)|0;mid=mid+(0,_imul2.default)(al6,bh1)|0;mid=mid+(0,_imul2.default)(ah6,bl1)|0;hi=hi+(0,_imul2.default)(ah6,bh1)|0;lo=lo+(0,_imul2.default)(al5,bl2)|0;mid=mid+(0,_imul2.default)(al5,bh2)|0;mid=mid+(0,_imul2.default)(ah5,bl2)|0;hi=hi+(0,_imul2.default)(ah5,bh2)|0;lo=lo+(0,_imul2.default)(al4,bl3)|0;mid=mid+(0,_imul2.default)(al4,bh3)|0;mid=mid+(0,_imul2.default)(ah4,bl3)|0;hi=hi+(0,_imul2.default)(ah4,bh3)|0;lo=lo+(0,_imul2.default)(al3,bl4)|0;mid=mid+(0,_imul2.default)(al3,bh4)|0;mid=mid+(0,_imul2.default)(ah3,bl4)|0;hi=hi+(0,_imul2.default)(ah3,bh4)|0;lo=lo+(0,_imul2.default)(al2,bl5)|0;mid=mid+(0,_imul2.default)(al2,bh5)|0;mid=mid+(0,_imul2.default)(ah2,bl5)|0;hi=hi+(0,_imul2.default)(ah2,bh5)|0;lo=lo+(0,_imul2.default)(al1,bl6)|0;mid=mid+(0,_imul2.default)(al1,bh6)|0;mid=mid+(0,_imul2.default)(ah1,bl6)|0;hi=hi+(0,_imul2.default)(ah1,bh6)|0;lo=lo+(0,_imul2.default)(al0,bl7)|0;mid=mid+(0,_imul2.default)(al0,bh7)|0;mid=mid+(0,_imul2.default)(ah0,bl7)|0;hi=hi+(0,_imul2.default)(ah0,bh7)|0;var w7=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w7>>>26)|0;w7&=0x3ffffff;/* k = 8 */lo=(0,_imul2.default)(al8,bl0);mid=(0,_imul2.default)(al8,bh0);mid=mid+(0,_imul2.default)(ah8,bl0)|0;hi=(0,_imul2.default)(ah8,bh0);lo=lo+(0,_imul2.default)(al7,bl1)|0;mid=mid+(0,_imul2.default)(al7,bh1)|0;mid=mid+(0,_imul2.default)(ah7,bl1)|0;hi=hi+(0,_imul2.default)(ah7,bh1)|0;lo=lo+(0,_imul2.default)(al6,bl2)|0;mid=mid+(0,_imul2.default)(al6,bh2)|0;mid=mid+(0,_imul2.default)(ah6,bl2)|0;hi=hi+(0,_imul2.default)(ah6,bh2)|0;lo=lo+(0,_imul2.default)(al5,bl3)|0;mid=mid+(0,_imul2.default)(al5,bh3)|0;mid=mid+(0,_imul2.default)(ah5,bl3)|0;hi=hi+(0,_imul2.default)(ah5,bh3)|0;lo=lo+(0,_imul2.default)(al4,bl4)|0;mid=mid+(0,_imul2.default)(al4,bh4)|0;mid=mid+(0,_imul2.default)(ah4,bl4)|0;hi=hi+(0,_imul2.default)(ah4,bh4)|0;lo=lo+(0,_imul2.default)(al3,bl5)|0;mid=mid+(0,_imul2.default)(al3,bh5)|0;mid=mid+(0,_imul2.default)(ah3,bl5)|0;hi=hi+(0,_imul2.default)(ah3,bh5)|0;lo=lo+(0,_imul2.default)(al2,bl6)|0;mid=mid+(0,_imul2.default)(al2,bh6)|0;mid=mid+(0,_imul2.default)(ah2,bl6)|0;hi=hi+(0,_imul2.default)(ah2,bh6)|0;lo=lo+(0,_imul2.default)(al1,bl7)|0;mid=mid+(0,_imul2.default)(al1,bh7)|0;mid=mid+(0,_imul2.default)(ah1,bl7)|0;hi=hi+(0,_imul2.default)(ah1,bh7)|0;lo=lo+(0,_imul2.default)(al0,bl8)|0;mid=mid+(0,_imul2.default)(al0,bh8)|0;mid=mid+(0,_imul2.default)(ah0,bl8)|0;hi=hi+(0,_imul2.default)(ah0,bh8)|0;var w8=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w8>>>26)|0;w8&=0x3ffffff;/* k = 9 */lo=(0,_imul2.default)(al9,bl0);mid=(0,_imul2.default)(al9,bh0);mid=mid+(0,_imul2.default)(ah9,bl0)|0;hi=(0,_imul2.default)(ah9,bh0);lo=lo+(0,_imul2.default)(al8,bl1)|0;mid=mid+(0,_imul2.default)(al8,bh1)|0;mid=mid+(0,_imul2.default)(ah8,bl1)|0;hi=hi+(0,_imul2.default)(ah8,bh1)|0;lo=lo+(0,_imul2.default)(al7,bl2)|0;mid=mid+(0,_imul2.default)(al7,bh2)|0;mid=mid+(0,_imul2.default)(ah7,bl2)|0;hi=hi+(0,_imul2.default)(ah7,bh2)|0;lo=lo+(0,_imul2.default)(al6,bl3)|0;mid=mid+(0,_imul2.default)(al6,bh3)|0;mid=mid+(0,_imul2.default)(ah6,bl3)|0;hi=hi+(0,_imul2.default)(ah6,bh3)|0;lo=lo+(0,_imul2.default)(al5,bl4)|0;mid=mid+(0,_imul2.default)(al5,bh4)|0;mid=mid+(0,_imul2.default)(ah5,bl4)|0;hi=hi+(0,_imul2.default)(ah5,bh4)|0;lo=lo+(0,_imul2.default)(al4,bl5)|0;mid=mid+(0,_imul2.default)(al4,bh5)|0;mid=mid+(0,_imul2.default)(ah4,bl5)|0;hi=hi+(0,_imul2.default)(ah4,bh5)|0;lo=lo+(0,_imul2.default)(al3,bl6)|0;mid=mid+(0,_imul2.default)(al3,bh6)|0;mid=mid+(0,_imul2.default)(ah3,bl6)|0;hi=hi+(0,_imul2.default)(ah3,bh6)|0;lo=lo+(0,_imul2.default)(al2,bl7)|0;mid=mid+(0,_imul2.default)(al2,bh7)|0;mid=mid+(0,_imul2.default)(ah2,bl7)|0;hi=hi+(0,_imul2.default)(ah2,bh7)|0;lo=lo+(0,_imul2.default)(al1,bl8)|0;mid=mid+(0,_imul2.default)(al1,bh8)|0;mid=mid+(0,_imul2.default)(ah1,bl8)|0;hi=hi+(0,_imul2.default)(ah1,bh8)|0;lo=lo+(0,_imul2.default)(al0,bl9)|0;mid=mid+(0,_imul2.default)(al0,bh9)|0;mid=mid+(0,_imul2.default)(ah0,bl9)|0;hi=hi+(0,_imul2.default)(ah0,bh9)|0;var w9=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w9>>>26)|0;w9&=0x3ffffff;/* k = 10 */lo=(0,_imul2.default)(al9,bl1);mid=(0,_imul2.default)(al9,bh1);mid=mid+(0,_imul2.default)(ah9,bl1)|0;hi=(0,_imul2.default)(ah9,bh1);lo=lo+(0,_imul2.default)(al8,bl2)|0;mid=mid+(0,_imul2.default)(al8,bh2)|0;mid=mid+(0,_imul2.default)(ah8,bl2)|0;hi=hi+(0,_imul2.default)(ah8,bh2)|0;lo=lo+(0,_imul2.default)(al7,bl3)|0;mid=mid+(0,_imul2.default)(al7,bh3)|0;mid=mid+(0,_imul2.default)(ah7,bl3)|0;hi=hi+(0,_imul2.default)(ah7,bh3)|0;lo=lo+(0,_imul2.default)(al6,bl4)|0;mid=mid+(0,_imul2.default)(al6,bh4)|0;mid=mid+(0,_imul2.default)(ah6,bl4)|0;hi=hi+(0,_imul2.default)(ah6,bh4)|0;lo=lo+(0,_imul2.default)(al5,bl5)|0;mid=mid+(0,_imul2.default)(al5,bh5)|0;mid=mid+(0,_imul2.default)(ah5,bl5)|0;hi=hi+(0,_imul2.default)(ah5,bh5)|0;lo=lo+(0,_imul2.default)(al4,bl6)|0;mid=mid+(0,_imul2.default)(al4,bh6)|0;mid=mid+(0,_imul2.default)(ah4,bl6)|0;hi=hi+(0,_imul2.default)(ah4,bh6)|0;lo=lo+(0,_imul2.default)(al3,bl7)|0;mid=mid+(0,_imul2.default)(al3,bh7)|0;mid=mid+(0,_imul2.default)(ah3,bl7)|0;hi=hi+(0,_imul2.default)(ah3,bh7)|0;lo=lo+(0,_imul2.default)(al2,bl8)|0;mid=mid+(0,_imul2.default)(al2,bh8)|0;mid=mid+(0,_imul2.default)(ah2,bl8)|0;hi=hi+(0,_imul2.default)(ah2,bh8)|0;lo=lo+(0,_imul2.default)(al1,bl9)|0;mid=mid+(0,_imul2.default)(al1,bh9)|0;mid=mid+(0,_imul2.default)(ah1,bl9)|0;hi=hi+(0,_imul2.default)(ah1,bh9)|0;var w10=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w10>>>26)|0;w10&=0x3ffffff;/* k = 11 */lo=(0,_imul2.default)(al9,bl2);mid=(0,_imul2.default)(al9,bh2);mid=mid+(0,_imul2.default)(ah9,bl2)|0;hi=(0,_imul2.default)(ah9,bh2);lo=lo+(0,_imul2.default)(al8,bl3)|0;mid=mid+(0,_imul2.default)(al8,bh3)|0;mid=mid+(0,_imul2.default)(ah8,bl3)|0;hi=hi+(0,_imul2.default)(ah8,bh3)|0;lo=lo+(0,_imul2.default)(al7,bl4)|0;mid=mid+(0,_imul2.default)(al7,bh4)|0;mid=mid+(0,_imul2.default)(ah7,bl4)|0;hi=hi+(0,_imul2.default)(ah7,bh4)|0;lo=lo+(0,_imul2.default)(al6,bl5)|0;mid=mid+(0,_imul2.default)(al6,bh5)|0;mid=mid+(0,_imul2.default)(ah6,bl5)|0;hi=hi+(0,_imul2.default)(ah6,bh5)|0;lo=lo+(0,_imul2.default)(al5,bl6)|0;mid=mid+(0,_imul2.default)(al5,bh6)|0;mid=mid+(0,_imul2.default)(ah5,bl6)|0;hi=hi+(0,_imul2.default)(ah5,bh6)|0;lo=lo+(0,_imul2.default)(al4,bl7)|0;mid=mid+(0,_imul2.default)(al4,bh7)|0;mid=mid+(0,_imul2.default)(ah4,bl7)|0;hi=hi+(0,_imul2.default)(ah4,bh7)|0;lo=lo+(0,_imul2.default)(al3,bl8)|0;mid=mid+(0,_imul2.default)(al3,bh8)|0;mid=mid+(0,_imul2.default)(ah3,bl8)|0;hi=hi+(0,_imul2.default)(ah3,bh8)|0;lo=lo+(0,_imul2.default)(al2,bl9)|0;mid=mid+(0,_imul2.default)(al2,bh9)|0;mid=mid+(0,_imul2.default)(ah2,bl9)|0;hi=hi+(0,_imul2.default)(ah2,bh9)|0;var w11=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w11>>>26)|0;w11&=0x3ffffff;/* k = 12 */lo=(0,_imul2.default)(al9,bl3);mid=(0,_imul2.default)(al9,bh3);mid=mid+(0,_imul2.default)(ah9,bl3)|0;hi=(0,_imul2.default)(ah9,bh3);lo=lo+(0,_imul2.default)(al8,bl4)|0;mid=mid+(0,_imul2.default)(al8,bh4)|0;mid=mid+(0,_imul2.default)(ah8,bl4)|0;hi=hi+(0,_imul2.default)(ah8,bh4)|0;lo=lo+(0,_imul2.default)(al7,bl5)|0;mid=mid+(0,_imul2.default)(al7,bh5)|0;mid=mid+(0,_imul2.default)(ah7,bl5)|0;hi=hi+(0,_imul2.default)(ah7,bh5)|0;lo=lo+(0,_imul2.default)(al6,bl6)|0;mid=mid+(0,_imul2.default)(al6,bh6)|0;mid=mid+(0,_imul2.default)(ah6,bl6)|0;hi=hi+(0,_imul2.default)(ah6,bh6)|0;lo=lo+(0,_imul2.default)(al5,bl7)|0;mid=mid+(0,_imul2.default)(al5,bh7)|0;mid=mid+(0,_imul2.default)(ah5,bl7)|0;hi=hi+(0,_imul2.default)(ah5,bh7)|0;lo=lo+(0,_imul2.default)(al4,bl8)|0;mid=mid+(0,_imul2.default)(al4,bh8)|0;mid=mid+(0,_imul2.default)(ah4,bl8)|0;hi=hi+(0,_imul2.default)(ah4,bh8)|0;lo=lo+(0,_imul2.default)(al3,bl9)|0;mid=mid+(0,_imul2.default)(al3,bh9)|0;mid=mid+(0,_imul2.default)(ah3,bl9)|0;hi=hi+(0,_imul2.default)(ah3,bh9)|0;var w12=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w12>>>26)|0;w12&=0x3ffffff;/* k = 13 */lo=(0,_imul2.default)(al9,bl4);mid=(0,_imul2.default)(al9,bh4);mid=mid+(0,_imul2.default)(ah9,bl4)|0;hi=(0,_imul2.default)(ah9,bh4);lo=lo+(0,_imul2.default)(al8,bl5)|0;mid=mid+(0,_imul2.default)(al8,bh5)|0;mid=mid+(0,_imul2.default)(ah8,bl5)|0;hi=hi+(0,_imul2.default)(ah8,bh5)|0;lo=lo+(0,_imul2.default)(al7,bl6)|0;mid=mid+(0,_imul2.default)(al7,bh6)|0;mid=mid+(0,_imul2.default)(ah7,bl6)|0;hi=hi+(0,_imul2.default)(ah7,bh6)|0;lo=lo+(0,_imul2.default)(al6,bl7)|0;mid=mid+(0,_imul2.default)(al6,bh7)|0;mid=mid+(0,_imul2.default)(ah6,bl7)|0;hi=hi+(0,_imul2.default)(ah6,bh7)|0;lo=lo+(0,_imul2.default)(al5,bl8)|0;mid=mid+(0,_imul2.default)(al5,bh8)|0;mid=mid+(0,_imul2.default)(ah5,bl8)|0;hi=hi+(0,_imul2.default)(ah5,bh8)|0;lo=lo+(0,_imul2.default)(al4,bl9)|0;mid=mid+(0,_imul2.default)(al4,bh9)|0;mid=mid+(0,_imul2.default)(ah4,bl9)|0;hi=hi+(0,_imul2.default)(ah4,bh9)|0;var w13=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w13>>>26)|0;w13&=0x3ffffff;/* k = 14 */lo=(0,_imul2.default)(al9,bl5);mid=(0,_imul2.default)(al9,bh5);mid=mid+(0,_imul2.default)(ah9,bl5)|0;hi=(0,_imul2.default)(ah9,bh5);lo=lo+(0,_imul2.default)(al8,bl6)|0;mid=mid+(0,_imul2.default)(al8,bh6)|0;mid=mid+(0,_imul2.default)(ah8,bl6)|0;hi=hi+(0,_imul2.default)(ah8,bh6)|0;lo=lo+(0,_imul2.default)(al7,bl7)|0;mid=mid+(0,_imul2.default)(al7,bh7)|0;mid=mid+(0,_imul2.default)(ah7,bl7)|0;hi=hi+(0,_imul2.default)(ah7,bh7)|0;lo=lo+(0,_imul2.default)(al6,bl8)|0;mid=mid+(0,_imul2.default)(al6,bh8)|0;mid=mid+(0,_imul2.default)(ah6,bl8)|0;hi=hi+(0,_imul2.default)(ah6,bh8)|0;lo=lo+(0,_imul2.default)(al5,bl9)|0;mid=mid+(0,_imul2.default)(al5,bh9)|0;mid=mid+(0,_imul2.default)(ah5,bl9)|0;hi=hi+(0,_imul2.default)(ah5,bh9)|0;var w14=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w14>>>26)|0;w14&=0x3ffffff;/* k = 15 */lo=(0,_imul2.default)(al9,bl6);mid=(0,_imul2.default)(al9,bh6);mid=mid+(0,_imul2.default)(ah9,bl6)|0;hi=(0,_imul2.default)(ah9,bh6);lo=lo+(0,_imul2.default)(al8,bl7)|0;mid=mid+(0,_imul2.default)(al8,bh7)|0;mid=mid+(0,_imul2.default)(ah8,bl7)|0;hi=hi+(0,_imul2.default)(ah8,bh7)|0;lo=lo+(0,_imul2.default)(al7,bl8)|0;mid=mid+(0,_imul2.default)(al7,bh8)|0;mid=mid+(0,_imul2.default)(ah7,bl8)|0;hi=hi+(0,_imul2.default)(ah7,bh8)|0;lo=lo+(0,_imul2.default)(al6,bl9)|0;mid=mid+(0,_imul2.default)(al6,bh9)|0;mid=mid+(0,_imul2.default)(ah6,bl9)|0;hi=hi+(0,_imul2.default)(ah6,bh9)|0;var w15=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w15>>>26)|0;w15&=0x3ffffff;/* k = 16 */lo=(0,_imul2.default)(al9,bl7);mid=(0,_imul2.default)(al9,bh7);mid=mid+(0,_imul2.default)(ah9,bl7)|0;hi=(0,_imul2.default)(ah9,bh7);lo=lo+(0,_imul2.default)(al8,bl8)|0;mid=mid+(0,_imul2.default)(al8,bh8)|0;mid=mid+(0,_imul2.default)(ah8,bl8)|0;hi=hi+(0,_imul2.default)(ah8,bh8)|0;lo=lo+(0,_imul2.default)(al7,bl9)|0;mid=mid+(0,_imul2.default)(al7,bh9)|0;mid=mid+(0,_imul2.default)(ah7,bl9)|0;hi=hi+(0,_imul2.default)(ah7,bh9)|0;var w16=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w16>>>26)|0;w16&=0x3ffffff;/* k = 17 */lo=(0,_imul2.default)(al9,bl8);mid=(0,_imul2.default)(al9,bh8);mid=mid+(0,_imul2.default)(ah9,bl8)|0;hi=(0,_imul2.default)(ah9,bh8);lo=lo+(0,_imul2.default)(al8,bl9)|0;mid=mid+(0,_imul2.default)(al8,bh9)|0;mid=mid+(0,_imul2.default)(ah8,bl9)|0;hi=hi+(0,_imul2.default)(ah8,bh9)|0;var w17=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w17>>>26)|0;w17&=0x3ffffff;/* k = 18 */lo=(0,_imul2.default)(al9,bl9);mid=(0,_imul2.default)(al9,bh9);mid=mid+(0,_imul2.default)(ah9,bl9)|0;hi=(0,_imul2.default)(ah9,bh9);var w18=(c+lo|0)+((mid&0x1fff)<<13)|0;c=(hi+(mid>>>13)|0)+(w18>>>26)|0;w18&=0x3ffffff;o[0]=w0;o[1]=w1;o[2]=w2;o[3]=w3;o[4]=w4;o[5]=w5;o[6]=w6;o[7]=w7;o[8]=w8;o[9]=w9;o[10]=w10;o[11]=w11;o[12]=w12;o[13]=w13;o[14]=w14;o[15]=w15;o[16]=w16;o[17]=w17;o[18]=w18;if(c!==0){o[19]=c;out.length++;}return out;};// Polyfill comb
if(!_imul2.default){comb10MulTo=smallMulTo;}function bigMulTo(self,num,out){out.negative=num.negative^self.negative;out.length=self.length+num.length;var carry=0;var hncarry=0;for(var k=0;k<out.length-1;k++){// Sum all words with the same `i + j = k` and accumulate `ncarry`,
// note that ncarry could be >= 0x3ffffff
var ncarry=hncarry;hncarry=0;var rword=carry&0x3ffffff;var maxJ=Math.min(k,num.length-1);for(var j=Math.max(0,k-self.length+1);j<=maxJ;j++){var i=k-j;var a=self.words[i]|0;var b=num.words[j]|0;var r=a*b;var lo=r&0x3ffffff;ncarry=ncarry+(r/0x4000000|0)|0;lo=lo+rword|0;rword=lo&0x3ffffff;ncarry=ncarry+(lo>>>26)|0;hncarry+=ncarry>>>26;ncarry&=0x3ffffff;}out.words[k]=rword;carry=ncarry;ncarry=hncarry;}if(carry!==0){out.words[k]=carry;}else{out.length--;}return out.strip();}function jumboMulTo(self,num,out){var fftm=new FFTM();return fftm.mulp(self,num,out);}BN.prototype.mulTo=function mulTo(num,out){var res;var len=this.length+num.length;if(this.length===10&&num.length===10){res=comb10MulTo(this,num,out);}else if(len<63){res=smallMulTo(this,num,out);}else if(len<1024){res=bigMulTo(this,num,out);}else{res=jumboMulTo(this,num,out);}return res;};// Cooley-Tukey algorithm for FFT
// slightly revisited to rely on looping instead of recursion
function FFTM(x,y){this.x=x;this.y=y;}FFTM.prototype.makeRBT=function makeRBT(N){var t=new Array(N);var l=BN.prototype._countBits(N)-1;for(var i=0;i<N;i++){t[i]=this.revBin(i,l,N);}return t;};// Returns binary-reversed representation of `x`
FFTM.prototype.revBin=function revBin(x,l,N){if(x===0||x===N-1)return x;var rb=0;for(var i=0;i<l;i++){rb|=(x&1)<<l-i-1;x>>=1;}return rb;};// Performs "tweedling" phase, therefore 'emulating'
// behaviour of the recursive algorithm
FFTM.prototype.permute=function permute(rbt,rws,iws,rtws,itws,N){for(var i=0;i<N;i++){rtws[i]=rws[rbt[i]];itws[i]=iws[rbt[i]];}};FFTM.prototype.transform=function transform(rws,iws,rtws,itws,N,rbt){this.permute(rbt,rws,iws,rtws,itws,N);for(var s=1;s<N;s<<=1){var l=s<<1;var rtwdf=Math.cos(2*Math.PI/l);var itwdf=Math.sin(2*Math.PI/l);for(var p=0;p<N;p+=l){var rtwdf_=rtwdf;var itwdf_=itwdf;for(var j=0;j<s;j++){var re=rtws[p+j];var ie=itws[p+j];var ro=rtws[p+j+s];var io=itws[p+j+s];var rx=rtwdf_*ro-itwdf_*io;io=rtwdf_*io+itwdf_*ro;ro=rx;rtws[p+j]=re+ro;itws[p+j]=ie+io;rtws[p+j+s]=re-ro;itws[p+j+s]=ie-io;/* jshint maxdepth : false */if(j!==l){rx=rtwdf*rtwdf_-itwdf*itwdf_;itwdf_=rtwdf*itwdf_+itwdf*rtwdf_;rtwdf_=rx;}}}}};FFTM.prototype.guessLen13b=function guessLen13b(n,m){var N=Math.max(m,n)|1;var odd=N&1;var i=0;for(N=N/2|0;N;N=N>>>1){i++;}return 1<<i+1+odd;};FFTM.prototype.conjugate=function conjugate(rws,iws,N){if(N<=1)return;for(var i=0;i<N/2;i++){var t=rws[i];rws[i]=rws[N-i-1];rws[N-i-1]=t;t=iws[i];iws[i]=-iws[N-i-1];iws[N-i-1]=-t;}};FFTM.prototype.normalize13b=function normalize13b(ws,N){var carry=0;for(var i=0;i<N/2;i++){var w=Math.round(ws[2*i+1]/N)*0x2000+Math.round(ws[2*i]/N)+carry;ws[i]=w&0x3ffffff;if(w<0x4000000){carry=0;}else{carry=w/0x4000000|0;}}return ws;};FFTM.prototype.convert13b=function convert13b(ws,len,rws,N){var carry=0;for(var i=0;i<len;i++){carry=carry+(ws[i]|0);rws[2*i]=carry&0x1fff;carry=carry>>>13;rws[2*i+1]=carry&0x1fff;carry=carry>>>13;}// Pad with zeroes
for(i=2*len;i<N;++i){rws[i]=0;}assert(carry===0);assert((carry&~0x1fff)===0);};FFTM.prototype.stub=function stub(N){var ph=new Array(N);for(var i=0;i<N;i++){ph[i]=0;}return ph;};FFTM.prototype.mulp=function mulp(x,y,out){var N=2*this.guessLen13b(x.length,y.length);var rbt=this.makeRBT(N);var _=this.stub(N);var rws=new Array(N);var rwst=new Array(N);var iwst=new Array(N);var nrws=new Array(N);var nrwst=new Array(N);var niwst=new Array(N);var rmws=out.words;rmws.length=N;this.convert13b(x.words,x.length,rws,N);this.convert13b(y.words,y.length,nrws,N);this.transform(rws,_,rwst,iwst,N,rbt);this.transform(nrws,_,nrwst,niwst,N,rbt);for(var i=0;i<N;i++){var rx=rwst[i]*nrwst[i]-iwst[i]*niwst[i];iwst[i]=rwst[i]*niwst[i]+iwst[i]*nrwst[i];rwst[i]=rx;}this.conjugate(rwst,iwst,N);this.transform(rwst,iwst,rmws,_,N,rbt);this.conjugate(rmws,_,N);this.normalize13b(rmws,N);out.negative=x.negative^y.negative;out.length=x.length+y.length;return out.strip();};// Multiply `this` by `num`
BN.prototype.mul=function mul(num){var out=new BN(null);out.words=new Array(this.length+num.length);return this.mulTo(num,out);};// Multiply employing FFT
BN.prototype.mulf=function mulf(num){var out=new BN(null);out.words=new Array(this.length+num.length);return jumboMulTo(this,num,out);};// In-place Multiplication
BN.prototype.imul=function imul(num){return this.clone().mulTo(num,this);};BN.prototype.imuln=function imuln(num){assert(typeof num==='number');assert(num<0x4000000);// Carry
var carry=0;for(var i=0;i<this.length;i++){var w=(this.words[i]|0)*num;var lo=(w&0x3ffffff)+(carry&0x3ffffff);carry>>=26;carry+=w/0x4000000|0;// NOTE: lo is 27bit maximum
carry+=lo>>>26;this.words[i]=lo&0x3ffffff;}if(carry!==0){this.words[i]=carry;this.length++;}return this;};BN.prototype.muln=function muln(num){return this.clone().imuln(num);};// `this` * `this`
BN.prototype.sqr=function sqr(){return this.mul(this);};// `this` * `this` in-place
BN.prototype.isqr=function isqr(){return this.imul(this.clone());};// Math.pow(`this`, `num`)
BN.prototype.pow=function pow(num){var w=toBitArray(num);if(w.length===0)return new BN(1);// Skip leading zeroes
var res=this;for(var i=0;i<w.length;i++,res=res.sqr()){if(w[i]!==0)break;}if(++i<w.length){for(var q=res.sqr();i<w.length;i++,q=q.sqr()){if(w[i]===0)continue;res=res.mul(q);}}return res;};// Shift-left in-place
BN.prototype.iushln=function iushln(bits){assert(typeof bits==='number'&&bits>=0);var r=bits%26;var s=(bits-r)/26;var carryMask=0x3ffffff>>>26-r<<26-r;var i;if(r!==0){var carry=0;for(i=0;i<this.length;i++){var newCarry=this.words[i]&carryMask;var c=(this.words[i]|0)-newCarry<<r;this.words[i]=c|carry;carry=newCarry>>>26-r;}if(carry){this.words[i]=carry;this.length++;}}if(s!==0){for(i=this.length-1;i>=0;i--){this.words[i+s]=this.words[i];}for(i=0;i<s;i++){this.words[i]=0;}this.length+=s;}return this.strip();};BN.prototype.ishln=function ishln(bits){// TODO(indutny): implement me
assert(this.negative===0);return this.iushln(bits);};// Shift-right in-place
// NOTE: `hint` is a lowest bit before trailing zeroes
// NOTE: if `extended` is present - it will be filled with destroyed bits
BN.prototype.iushrn=function iushrn(bits,hint,extended){assert(typeof bits==='number'&&bits>=0);var h;if(hint){h=(hint-hint%26)/26;}else{h=0;}var r=bits%26;var s=Math.min((bits-r)/26,this.length);var mask=0x3ffffff^0x3ffffff>>>r<<r;var maskedWords=extended;h-=s;h=Math.max(0,h);// Extended mode, copy masked part
if(maskedWords){for(var i=0;i<s;i++){maskedWords.words[i]=this.words[i];}maskedWords.length=s;}if(s===0){// No-op, we should not move anything at all
}else if(this.length>s){this.length-=s;for(i=0;i<this.length;i++){this.words[i]=this.words[i+s];}}else{this.words[0]=0;this.length=1;}var carry=0;for(i=this.length-1;i>=0&&(carry!==0||i>=h);i--){var word=this.words[i]|0;this.words[i]=carry<<26-r|word>>>r;carry=word&mask;}// Push carried bits as a mask
if(maskedWords&&carry!==0){maskedWords.words[maskedWords.length++]=carry;}if(this.length===0){this.words[0]=0;this.length=1;}return this.strip();};BN.prototype.ishrn=function ishrn(bits,hint,extended){// TODO(indutny): implement me
assert(this.negative===0);return this.iushrn(bits,hint,extended);};// Shift-left
BN.prototype.shln=function shln(bits){return this.clone().ishln(bits);};BN.prototype.ushln=function ushln(bits){return this.clone().iushln(bits);};// Shift-right
BN.prototype.shrn=function shrn(bits){return this.clone().ishrn(bits);};BN.prototype.ushrn=function ushrn(bits){return this.clone().iushrn(bits);};// Test if n bit is set
BN.prototype.testn=function testn(bit){assert(typeof bit==='number'&&bit>=0);var r=bit%26;var s=(bit-r)/26;var q=1<<r;// Fast case: bit is much higher than all existing words
if(this.length<=s)return false;// Check bit and return
var w=this.words[s];return!!(w&q);};// Return only lowers bits of number (in-place)
BN.prototype.imaskn=function imaskn(bits){assert(typeof bits==='number'&&bits>=0);var r=bits%26;var s=(bits-r)/26;assert(this.negative===0,'imaskn works only with positive numbers');if(this.length<=s){return this;}if(r!==0){s++;}this.length=Math.min(s,this.length);if(r!==0){var mask=0x3ffffff^0x3ffffff>>>r<<r;this.words[this.length-1]&=mask;}return this.strip();};// Return only lowers bits of number
BN.prototype.maskn=function maskn(bits){return this.clone().imaskn(bits);};// Add plain number `num` to `this`
BN.prototype.iaddn=function iaddn(num){assert(typeof num==='number');assert(num<0x4000000);if(num<0)return this.isubn(-num);// Possible sign change
if(this.negative!==0){if(this.length===1&&(this.words[0]|0)<num){this.words[0]=num-(this.words[0]|0);this.negative=0;return this;}this.negative=0;this.isubn(num);this.negative=1;return this;}// Add without checks
return this._iaddn(num);};BN.prototype._iaddn=function _iaddn(num){this.words[0]+=num;// Carry
for(var i=0;i<this.length&&this.words[i]>=0x4000000;i++){this.words[i]-=0x4000000;if(i===this.length-1){this.words[i+1]=1;}else{this.words[i+1]++;}}this.length=Math.max(this.length,i+1);return this;};// Subtract plain number `num` from `this`
BN.prototype.isubn=function isubn(num){assert(typeof num==='number');assert(num<0x4000000);if(num<0)return this.iaddn(-num);if(this.negative!==0){this.negative=0;this.iaddn(num);this.negative=1;return this;}this.words[0]-=num;if(this.length===1&&this.words[0]<0){this.words[0]=-this.words[0];this.negative=1;}else{// Carry
for(var i=0;i<this.length&&this.words[i]<0;i++){this.words[i]+=0x4000000;this.words[i+1]-=1;}}return this.strip();};BN.prototype.addn=function addn(num){return this.clone().iaddn(num);};BN.prototype.subn=function subn(num){return this.clone().isubn(num);};BN.prototype.iabs=function iabs(){this.negative=0;return this;};BN.prototype.abs=function abs(){return this.clone().iabs();};BN.prototype._ishlnsubmul=function _ishlnsubmul(num,mul,shift){var len=num.length+shift;var i;this._expand(len);var w;var carry=0;for(i=0;i<num.length;i++){w=(this.words[i+shift]|0)+carry;var right=(num.words[i]|0)*mul;w-=right&0x3ffffff;carry=(w>>26)-(right/0x4000000|0);this.words[i+shift]=w&0x3ffffff;}for(;i<this.length-shift;i++){w=(this.words[i+shift]|0)+carry;carry=w>>26;this.words[i+shift]=w&0x3ffffff;}if(carry===0)return this.strip();// Subtraction overflow
assert(carry===-1);carry=0;for(i=0;i<this.length;i++){w=-(this.words[i]|0)+carry;carry=w>>26;this.words[i]=w&0x3ffffff;}this.negative=1;return this.strip();};BN.prototype._wordDiv=function _wordDiv(num,mode){var shift=this.length-num.length;var a=this.clone();var b=num;// Normalize
var bhi=b.words[b.length-1]|0;var bhiBits=this._countBits(bhi);shift=26-bhiBits;if(shift!==0){b=b.ushln(shift);a.iushln(shift);bhi=b.words[b.length-1]|0;}// Initialize quotient
var m=a.length-b.length;var q;if(mode!=='mod'){q=new BN(null);q.length=m+1;q.words=new Array(q.length);for(var i=0;i<q.length;i++){q.words[i]=0;}}var diff=a.clone()._ishlnsubmul(b,1,m);if(diff.negative===0){a=diff;if(q){q.words[m]=1;}}for(var j=m-1;j>=0;j--){var qj=(a.words[b.length+j]|0)*0x4000000+(a.words[b.length+j-1]|0);// NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
// (0x7ffffff)
qj=Math.min(qj/bhi|0,0x3ffffff);a._ishlnsubmul(b,qj,j);while(a.negative!==0){qj--;a.negative=0;a._ishlnsubmul(b,1,j);if(!a.isZero()){a.negative^=1;}}if(q){q.words[j]=qj;}}if(q){q.strip();}a.strip();// Denormalize
if(mode!=='div'&&shift!==0){a.iushrn(shift);}return{div:q||null,mod:a};};// NOTE: 1) `mode` can be set to `mod` to request mod only,
//       to `div` to request div only, or be absent to
//       request both div & mod
//       2) `positive` is true if unsigned mod is requested
BN.prototype.divmod=function divmod(num,mode,positive){assert(!num.isZero());if(this.isZero()){return{div:new BN(0),mod:new BN(0)};}var div,mod,res;if(this.negative!==0&&num.negative===0){res=this.neg().divmod(num,mode);if(mode!=='mod'){div=res.div.neg();}if(mode!=='div'){mod=res.mod.neg();if(positive&&mod.negative!==0){mod.iadd(num);}}return{div:div,mod:mod};}if(this.negative===0&&num.negative!==0){res=this.divmod(num.neg(),mode);if(mode!=='mod'){div=res.div.neg();}return{div:div,mod:res.mod};}if((this.negative&num.negative)!==0){res=this.neg().divmod(num.neg(),mode);if(mode!=='div'){mod=res.mod.neg();if(positive&&mod.negative!==0){mod.isub(num);}}return{div:res.div,mod:mod};}// Both numbers are positive at this point
// Strip both numbers to approximate shift value
if(num.length>this.length||this.cmp(num)<0){return{div:new BN(0),mod:this};}// Very short reduction
if(num.length===1){if(mode==='div'){return{div:this.divn(num.words[0]),mod:null};}if(mode==='mod'){return{div:null,mod:new BN(this.modn(num.words[0]))};}return{div:this.divn(num.words[0]),mod:new BN(this.modn(num.words[0]))};}return this._wordDiv(num,mode);};// Find `this` / `num`
BN.prototype.div=function div(num){return this.divmod(num,'div',false).div;};// Find `this` % `num`
BN.prototype.mod=function mod(num){return this.divmod(num,'mod',false).mod;};BN.prototype.umod=function umod(num){return this.divmod(num,'mod',true).mod;};// Find Round(`this` / `num`)
BN.prototype.divRound=function divRound(num){var dm=this.divmod(num);// Fast case - exact division
if(dm.mod.isZero())return dm.div;var mod=dm.div.negative!==0?dm.mod.isub(num):dm.mod;var half=num.ushrn(1);var r2=num.andln(1);var cmp=mod.cmp(half);// Round down
if(cmp<0||r2===1&&cmp===0)return dm.div;// Round up
return dm.div.negative!==0?dm.div.isubn(1):dm.div.iaddn(1);};BN.prototype.modn=function modn(num){assert(num<=0x3ffffff);var p=(1<<26)%num;var acc=0;for(var i=this.length-1;i>=0;i--){acc=(p*acc+(this.words[i]|0))%num;}return acc;};// In-place division by number
BN.prototype.idivn=function idivn(num){assert(num<=0x3ffffff);var carry=0;for(var i=this.length-1;i>=0;i--){var w=(this.words[i]|0)+carry*0x4000000;this.words[i]=w/num|0;carry=w%num;}return this.strip();};BN.prototype.divn=function divn(num){return this.clone().idivn(num);};BN.prototype.egcd=function egcd(p){assert(p.negative===0);assert(!p.isZero());var x=this;var y=p.clone();if(x.negative!==0){x=x.umod(p);}else{x=x.clone();}// A * x + B * y = x
var A=new BN(1);var B=new BN(0);// C * x + D * y = y
var C=new BN(0);var D=new BN(1);var g=0;while(x.isEven()&&y.isEven()){x.iushrn(1);y.iushrn(1);++g;}var yp=y.clone();var xp=x.clone();while(!x.isZero()){for(var i=0,im=1;(x.words[0]&im)===0&&i<26;++i,im<<=1){}if(i>0){x.iushrn(i);while(i-->0){if(A.isOdd()||B.isOdd()){A.iadd(yp);B.isub(xp);}A.iushrn(1);B.iushrn(1);}}for(var j=0,jm=1;(y.words[0]&jm)===0&&j<26;++j,jm<<=1){}if(j>0){y.iushrn(j);while(j-->0){if(C.isOdd()||D.isOdd()){C.iadd(yp);D.isub(xp);}C.iushrn(1);D.iushrn(1);}}if(x.cmp(y)>=0){x.isub(y);A.isub(C);B.isub(D);}else{y.isub(x);C.isub(A);D.isub(B);}}return{a:C,b:D,gcd:y.iushln(g)};};// This is reduced incarnation of the binary EEA
// above, designated to invert members of the
// _prime_ fields F(p) at a maximal speed
BN.prototype._invmp=function _invmp(p){assert(p.negative===0);assert(!p.isZero());var a=this;var b=p.clone();if(a.negative!==0){a=a.umod(p);}else{a=a.clone();}var x1=new BN(1);var x2=new BN(0);var delta=b.clone();while(a.cmpn(1)>0&&b.cmpn(1)>0){for(var i=0,im=1;(a.words[0]&im)===0&&i<26;++i,im<<=1){}if(i>0){a.iushrn(i);while(i-->0){if(x1.isOdd()){x1.iadd(delta);}x1.iushrn(1);}}for(var j=0,jm=1;(b.words[0]&jm)===0&&j<26;++j,jm<<=1){}if(j>0){b.iushrn(j);while(j-->0){if(x2.isOdd()){x2.iadd(delta);}x2.iushrn(1);}}if(a.cmp(b)>=0){a.isub(b);x1.isub(x2);}else{b.isub(a);x2.isub(x1);}}var res;if(a.cmpn(1)===0){res=x1;}else{res=x2;}if(res.cmpn(0)<0){res.iadd(p);}return res;};BN.prototype.gcd=function gcd(num){if(this.isZero())return num.abs();if(num.isZero())return this.abs();var a=this.clone();var b=num.clone();a.negative=0;b.negative=0;// Remove common factor of two
for(var shift=0;a.isEven()&&b.isEven();shift++){a.iushrn(1);b.iushrn(1);}do{while(a.isEven()){a.iushrn(1);}while(b.isEven()){b.iushrn(1);}var r=a.cmp(b);if(r<0){// Swap `a` and `b` to make `a` always bigger than `b`
var t=a;a=b;b=t;}else if(r===0||b.cmpn(1)===0){break;}a.isub(b);}while(true);return b.iushln(shift);};// Invert number in the field F(num)
BN.prototype.invm=function invm(num){return this.egcd(num).a.umod(num);};BN.prototype.isEven=function isEven(){return(this.words[0]&1)===0;};BN.prototype.isOdd=function isOdd(){return(this.words[0]&1)===1;};// And first word and num
BN.prototype.andln=function andln(num){return this.words[0]&num;};// Increment at the bit position in-line
BN.prototype.bincn=function bincn(bit){assert(typeof bit==='number');var r=bit%26;var s=(bit-r)/26;var q=1<<r;// Fast case: bit is much higher than all existing words
if(this.length<=s){this._expand(s+1);this.words[s]|=q;return this;}// Add bit and propagate, if needed
var carry=q;for(var i=s;carry!==0&&i<this.length;i++){var w=this.words[i]|0;w+=carry;carry=w>>>26;w&=0x3ffffff;this.words[i]=w;}if(carry!==0){this.words[i]=carry;this.length++;}return this;};BN.prototype.isZero=function isZero(){return this.length===1&&this.words[0]===0;};BN.prototype.cmpn=function cmpn(num){var negative=num<0;if(this.negative!==0&&!negative)return-1;if(this.negative===0&&negative)return 1;this.strip();var res;if(this.length>1){res=1;}else{if(negative){num=-num;}assert(num<=0x3ffffff,'Number is too big');var w=this.words[0]|0;res=w===num?0:w<num?-1:1;}if(this.negative!==0)return-res|0;return res;};// Compare two numbers and return:
// 1 - if `this` > `num`
// 0 - if `this` == `num`
// -1 - if `this` < `num`
BN.prototype.cmp=function cmp(num){if(this.negative!==0&&num.negative===0)return-1;if(this.negative===0&&num.negative!==0)return 1;var res=this.ucmp(num);if(this.negative!==0)return-res|0;return res;};// Unsigned comparison
BN.prototype.ucmp=function ucmp(num){// At this point both numbers have the same sign
if(this.length>num.length)return 1;if(this.length<num.length)return-1;var res=0;for(var i=this.length-1;i>=0;i--){var a=this.words[i]|0;var b=num.words[i]|0;if(a===b)continue;if(a<b){res=-1;}else if(a>b){res=1;}break;}return res;};BN.prototype.gtn=function gtn(num){return this.cmpn(num)===1;};BN.prototype.gt=function gt(num){return this.cmp(num)===1;};BN.prototype.gten=function gten(num){return this.cmpn(num)>=0;};BN.prototype.gte=function gte(num){return this.cmp(num)>=0;};BN.prototype.ltn=function ltn(num){return this.cmpn(num)===-1;};BN.prototype.lt=function lt(num){return this.cmp(num)===-1;};BN.prototype.lten=function lten(num){return this.cmpn(num)<=0;};BN.prototype.lte=function lte(num){return this.cmp(num)<=0;};BN.prototype.eqn=function eqn(num){return this.cmpn(num)===0;};BN.prototype.eq=function eq(num){return this.cmp(num)===0;};//
// A reduce context, could be using montgomery or something better, depending
// on the `m` itself.
//
BN.red=function red(num){return new Red(num);};BN.prototype.toRed=function toRed(ctx){assert(!this.red,'Already a number in reduction context');assert(this.negative===0,'red works only with positives');return ctx.convertTo(this)._forceRed(ctx);};BN.prototype.fromRed=function fromRed(){assert(this.red,'fromRed works only with numbers in reduction context');return this.red.convertFrom(this);};BN.prototype._forceRed=function _forceRed(ctx){this.red=ctx;return this;};BN.prototype.forceRed=function forceRed(ctx){assert(!this.red,'Already a number in reduction context');return this._forceRed(ctx);};BN.prototype.redAdd=function redAdd(num){assert(this.red,'redAdd works only with red numbers');return this.red.add(this,num);};BN.prototype.redIAdd=function redIAdd(num){assert(this.red,'redIAdd works only with red numbers');return this.red.iadd(this,num);};BN.prototype.redSub=function redSub(num){assert(this.red,'redSub works only with red numbers');return this.red.sub(this,num);};BN.prototype.redISub=function redISub(num){assert(this.red,'redISub works only with red numbers');return this.red.isub(this,num);};BN.prototype.redShl=function redShl(num){assert(this.red,'redShl works only with red numbers');return this.red.shl(this,num);};BN.prototype.redMul=function redMul(num){assert(this.red,'redMul works only with red numbers');this.red._verify2(this,num);return this.red.mul(this,num);};BN.prototype.redIMul=function redIMul(num){assert(this.red,'redMul works only with red numbers');this.red._verify2(this,num);return this.red.imul(this,num);};BN.prototype.redSqr=function redSqr(){assert(this.red,'redSqr works only with red numbers');this.red._verify1(this);return this.red.sqr(this);};BN.prototype.redISqr=function redISqr(){assert(this.red,'redISqr works only with red numbers');this.red._verify1(this);return this.red.isqr(this);};// Square root over p
BN.prototype.redSqrt=function redSqrt(){assert(this.red,'redSqrt works only with red numbers');this.red._verify1(this);return this.red.sqrt(this);};BN.prototype.redInvm=function redInvm(){assert(this.red,'redInvm works only with red numbers');this.red._verify1(this);return this.red.invm(this);};// Return negative clone of `this` % `red modulo`
BN.prototype.redNeg=function redNeg(){assert(this.red,'redNeg works only with red numbers');this.red._verify1(this);return this.red.neg(this);};BN.prototype.redPow=function redPow(num){assert(this.red&&!num.red,'redPow(normalNum)');this.red._verify1(this);return this.red.pow(this,num);};// Prime numbers with efficient reduction
var primes={k256:null,p224:null,p192:null,p25519:null};// Pseudo-Mersenne prime
function MPrime(name,p){// P = 2 ^ N - K
this.name=name;this.p=new BN(p,16);this.n=this.p.bitLength();this.k=new BN(1).iushln(this.n).isub(this.p);this.tmp=this._tmp();}MPrime.prototype._tmp=function _tmp(){var tmp=new BN(null);tmp.words=new Array(Math.ceil(this.n/13));return tmp;};MPrime.prototype.ireduce=function ireduce(num){// Assumes that `num` is less than `P^2`
// num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
var r=num;var rlen;do{this.split(r,this.tmp);r=this.imulK(r);r=r.iadd(this.tmp);rlen=r.bitLength();}while(rlen>this.n);var cmp=rlen<this.n?-1:r.ucmp(this.p);if(cmp===0){r.words[0]=0;r.length=1;}else if(cmp>0){r.isub(this.p);}else{r.strip();}return r;};MPrime.prototype.split=function split(input,out){input.iushrn(this.n,0,out);};MPrime.prototype.imulK=function imulK(num){return num.imul(this.k);};function K256(){MPrime.call(this,'k256','ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');}inherits(K256,MPrime);K256.prototype.split=function split(input,output){// 256 = 9 * 26 + 22
var mask=0x3fffff;var outLen=Math.min(input.length,9);for(var i=0;i<outLen;i++){output.words[i]=input.words[i];}output.length=outLen;if(input.length<=9){input.words[0]=0;input.length=1;return;}// Shift by 9 limbs
var prev=input.words[9];output.words[output.length++]=prev&mask;for(i=10;i<input.length;i++){var next=input.words[i]|0;input.words[i-10]=(next&mask)<<4|prev>>>22;prev=next;}prev>>>=22;input.words[i-10]=prev;if(prev===0&&input.length>10){input.length-=10;}else{input.length-=9;}};K256.prototype.imulK=function imulK(num){// K = 0x1000003d1 = [ 0x40, 0x3d1 ]
num.words[num.length]=0;num.words[num.length+1]=0;num.length+=2;// bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
var lo=0;for(var i=0;i<num.length;i++){var w=num.words[i]|0;lo+=w*0x3d1;num.words[i]=lo&0x3ffffff;lo=w*0x40+(lo/0x4000000|0);}// Fast length reduction
if(num.words[num.length-1]===0){num.length--;if(num.words[num.length-1]===0){num.length--;}}return num;};function P224(){MPrime.call(this,'p224','ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');}inherits(P224,MPrime);function P192(){MPrime.call(this,'p192','ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');}inherits(P192,MPrime);function P25519(){// 2 ^ 255 - 19
MPrime.call(this,'25519','7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');}inherits(P25519,MPrime);P25519.prototype.imulK=function imulK(num){// K = 0x13
var carry=0;for(var i=0;i<num.length;i++){var hi=(num.words[i]|0)*0x13+carry;var lo=hi&0x3ffffff;hi>>>=26;num.words[i]=lo;carry=hi;}if(carry!==0){num.words[num.length++]=carry;}return num;};// Exported mostly for testing purposes, use plain name instead
BN._prime=function prime(name){// Cached version of prime
if(primes[name])return primes[name];var prime;if(name==='k256'){prime=new K256();}else if(name==='p224'){prime=new P224();}else if(name==='p192'){prime=new P192();}else if(name==='p25519'){prime=new P25519();}else{throw new Error('Unknown prime '+name);}primes[name]=prime;return prime;};//
// Base reduction engine
//
function Red(m){if(typeof m==='string'){var prime=BN._prime(m);this.m=prime.p;this.prime=prime;}else{assert(m.gtn(1),'modulus must be greater than 1');this.m=m;this.prime=null;}}Red.prototype._verify1=function _verify1(a){assert(a.negative===0,'red works only with positives');assert(a.red,'red works only with red numbers');};Red.prototype._verify2=function _verify2(a,b){assert((a.negative|b.negative)===0,'red works only with positives');assert(a.red&&a.red===b.red,'red works only with red numbers');};Red.prototype.imod=function imod(a){if(this.prime)return this.prime.ireduce(a)._forceRed(this);return a.umod(this.m)._forceRed(this);};Red.prototype.neg=function neg(a){if(a.isZero()){return a.clone();}return this.m.sub(a)._forceRed(this);};Red.prototype.add=function add(a,b){this._verify2(a,b);var res=a.add(b);if(res.cmp(this.m)>=0){res.isub(this.m);}return res._forceRed(this);};Red.prototype.iadd=function iadd(a,b){this._verify2(a,b);var res=a.iadd(b);if(res.cmp(this.m)>=0){res.isub(this.m);}return res;};Red.prototype.sub=function sub(a,b){this._verify2(a,b);var res=a.sub(b);if(res.cmpn(0)<0){res.iadd(this.m);}return res._forceRed(this);};Red.prototype.isub=function isub(a,b){this._verify2(a,b);var res=a.isub(b);if(res.cmpn(0)<0){res.iadd(this.m);}return res;};Red.prototype.shl=function shl(a,num){this._verify1(a);return this.imod(a.ushln(num));};Red.prototype.imul=function imul(a,b){this._verify2(a,b);return this.imod(a.imul(b));};Red.prototype.mul=function mul(a,b){this._verify2(a,b);return this.imod(a.mul(b));};Red.prototype.isqr=function isqr(a){return this.imul(a,a.clone());};Red.prototype.sqr=function sqr(a){return this.mul(a,a);};Red.prototype.sqrt=function sqrt(a){if(a.isZero())return a.clone();var mod3=this.m.andln(3);assert(mod3%2===1);// Fast case
if(mod3===3){var pow=this.m.add(new BN(1)).iushrn(2);return this.pow(a,pow);}// Tonelli-Shanks algorithm (Totally unoptimized and slow)
//
// Find Q and S, that Q * 2 ^ S = (P - 1)
var q=this.m.subn(1);var s=0;while(!q.isZero()&&q.andln(1)===0){s++;q.iushrn(1);}assert(!q.isZero());var one=new BN(1).toRed(this);var nOne=one.redNeg();// Find quadratic non-residue
// NOTE: Max is such because of generalized Riemann hypothesis.
var lpow=this.m.subn(1).iushrn(1);var z=this.m.bitLength();z=new BN(2*z*z).toRed(this);while(this.pow(z,lpow).cmp(nOne)!==0){z.redIAdd(nOne);}var c=this.pow(z,q);var r=this.pow(a,q.addn(1).iushrn(1));var t=this.pow(a,q);var m=s;while(t.cmp(one)!==0){var tmp=t;for(var i=0;tmp.cmp(one)!==0;i++){tmp=tmp.redSqr();}assert(i<m);var b=this.pow(c,new BN(1).iushln(m-i-1));r=r.redMul(b);c=b.redSqr();t=t.redMul(c);m=i;}return r;};Red.prototype.invm=function invm(a){var inv=a._invmp(this.m);if(inv.negative!==0){inv.negative=0;return this.imod(inv).redNeg();}else{return this.imod(inv);}};Red.prototype.pow=function pow(a,num){if(num.isZero())return new BN(1).toRed(this);if(num.cmpn(1)===0)return a.clone();var windowSize=4;var wnd=new Array(1<<windowSize);wnd[0]=new BN(1).toRed(this);wnd[1]=a;for(var i=2;i<wnd.length;i++){wnd[i]=this.mul(wnd[i-1],a);}var res=wnd[0];var current=0;var currentLen=0;var start=num.bitLength()%26;if(start===0){start=26;}for(i=num.length-1;i>=0;i--){var word=num.words[i];for(var j=start-1;j>=0;j--){var bit=word>>j&1;if(res!==wnd[0]){res=this.sqr(res);}if(bit===0&&current===0){currentLen=0;continue;}current<<=1;current|=bit;currentLen++;if(currentLen!==windowSize&&(i!==0||j!==0))continue;res=this.mul(res,wnd[current]);currentLen=0;current=0;}start=26;}return res;};Red.prototype.convertTo=function convertTo(num){var r=num.umod(this.m);return r===num?r.clone():r;};Red.prototype.convertFrom=function convertFrom(num){var res=num.clone();res.red=null;return res;};//
// Montgomery method engine
//
BN.mont=function mont(num){return new Mont(num);};function Mont(m){Red.call(this,m);this.shift=this.m.bitLength();if(this.shift%26!==0){this.shift+=26-this.shift%26;}this.r=new BN(1).iushln(this.shift);this.r2=this.imod(this.r.sqr());this.rinv=this.r._invmp(this.m);this.minv=this.rinv.mul(this.r).isubn(1).div(this.m);this.minv=this.minv.umod(this.r);this.minv=this.r.sub(this.minv);}inherits(Mont,Red);Mont.prototype.convertTo=function convertTo(num){return this.imod(num.ushln(this.shift));};Mont.prototype.convertFrom=function convertFrom(num){var r=this.imod(num.mul(this.rinv));r.red=null;return r;};Mont.prototype.imul=function imul(a,b){if(a.isZero()||b.isZero()){a.words[0]=0;a.length=1;return a;}var t=a.imul(b);var c=t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);var u=t.isub(c).iushrn(this.shift);var res=u;if(u.cmp(this.m)>=0){res=u.isub(this.m);}else if(u.cmpn(0)<0){res=u.iadd(this.m);}return res._forceRed(this);};Mont.prototype.mul=function mul(a,b){if(a.isZero()||b.isZero())return new BN(0)._forceRed(this);var t=a.mul(b);var c=t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);var u=t.isub(c).iushrn(this.shift);var res=u;if(u.cmp(this.m)>=0){res=u.isub(this.m);}else if(u.cmpn(0)<0){res=u.iadd(this.m);}return res._forceRed(this);};Mont.prototype.invm=function invm(a){// (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
var res=this.imod(a._invmp(this.m).mul(this.r2));return res._forceRed(this);};})(typeof module==='undefined'||module,this);/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(41)(module));/***/},/* 3 *//***/function(module,exports,__webpack_require__){/* eslint-disable node/no-deprecated-api */var buffer=__webpack_require__(0);var Buffer=buffer.Buffer;// alternative to using Object.keys for old browsers
function copyProps(src,dst){for(var key in src){dst[key]=src[key];}}if(Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow){module.exports=buffer;}else{// Copy properties from require('buffer')
copyProps(buffer,exports);exports.Buffer=SafeBuffer;}function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length);}// Copy static methods from Buffer
copyProps(Buffer,SafeBuffer);SafeBuffer.from=function(arg,encodingOrOffset,length){if(typeof arg==='number'){throw new TypeError('Argument must not be a number');}return Buffer(arg,encodingOrOffset,length);};SafeBuffer.alloc=function(size,fill,encoding){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}var buf=Buffer(size);if(fill!==undefined){if(typeof encoding==='string'){buf.fill(fill,encoding);}else{buf.fill(fill);}}else{buf.fill(0);}return buf;};SafeBuffer.allocUnsafe=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}return Buffer(size);};SafeBuffer.allocUnsafeSlow=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}return buffer.SlowBuffer(size);};/***/},/* 4 *//***/function(module,exports){// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[];};process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};/***/},/* 5 *//***/function(module,exports,__webpack_require__){"use strict";var elliptic=exports;elliptic.version=__webpack_require__(179).version;elliptic.utils=__webpack_require__(180);elliptic.rand=__webpack_require__(87);elliptic.curve=__webpack_require__(37);elliptic.curves=__webpack_require__(185);// Protocols
elliptic.ec=__webpack_require__(193);elliptic.eddsa=__webpack_require__(197);/***/},/* 6 *//***/function(module,exports){var g;// This works in non-strict mode
g=function(){return this;}();try{// This works if eval is allowed (see CSP)
g=g||Function("return this")()||(1,eval)("this");}catch(e){// This works if the window reference is available
if((typeof window==='undefined'?'undefined':(0,_typeof3.default)(window))==="object")g=window;}// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}
module.exports=g;/***/},/* 7 *//***/function(module,exports){module.exports=assert;function assert(val,msg){if(!val)throw new Error(msg||'Assertion failed');}assert.equal=function assertEqual(l,r,msg){if(l!=r)throw new Error(msg||'Assertion failed: '+l+' != '+r);};/***/},/* 8 *//***/function(module,exports,__webpack_require__){"use strict";var assert=__webpack_require__(7);var inherits=__webpack_require__(1);exports.inherits=inherits;function toArray(msg,enc){if(Array.isArray(msg))return msg.slice();if(!msg)return[];var res=[];if(typeof msg==='string'){if(!enc){for(var i=0;i<msg.length;i++){var c=msg.charCodeAt(i);var hi=c>>8;var lo=c&0xff;if(hi)res.push(hi,lo);else res.push(lo);}}else if(enc==='hex'){msg=msg.replace(/[^a-z0-9]+/ig,'');if(msg.length%2!==0)msg='0'+msg;for(i=0;i<msg.length;i+=2){res.push(parseInt(msg[i]+msg[i+1],16));}}}else{for(i=0;i<msg.length;i++){res[i]=msg[i]|0;}}return res;}exports.toArray=toArray;function toHex(msg){var res='';for(var i=0;i<msg.length;i++){res+=zero2(msg[i].toString(16));}return res;}exports.toHex=toHex;function htonl(w){var res=w>>>24|w>>>8&0xff00|w<<8&0xff0000|(w&0xff)<<24;return res>>>0;}exports.htonl=htonl;function toHex32(msg,endian){var res='';for(var i=0;i<msg.length;i++){var w=msg[i];if(endian==='little')w=htonl(w);res+=zero8(w.toString(16));}return res;}exports.toHex32=toHex32;function zero2(word){if(word.length===1)return'0'+word;else return word;}exports.zero2=zero2;function zero8(word){if(word.length===7)return'0'+word;else if(word.length===6)return'00'+word;else if(word.length===5)return'000'+word;else if(word.length===4)return'0000'+word;else if(word.length===3)return'00000'+word;else if(word.length===2)return'000000'+word;else if(word.length===1)return'0000000'+word;else return word;}exports.zero8=zero8;function join32(msg,start,end,endian){var len=end-start;assert(len%4===0);var res=new Array(len/4);for(var i=0,k=start;i<res.length;i++,k+=4){var w;if(endian==='big')w=msg[k]<<24|msg[k+1]<<16|msg[k+2]<<8|msg[k+3];else w=msg[k+3]<<24|msg[k+2]<<16|msg[k+1]<<8|msg[k];res[i]=w>>>0;}return res;}exports.join32=join32;function split32(msg,endian){var res=new Array(msg.length*4);for(var i=0,k=0;i<msg.length;i++,k+=4){var m=msg[i];if(endian==='big'){res[k]=m>>>24;res[k+1]=m>>>16&0xff;res[k+2]=m>>>8&0xff;res[k+3]=m&0xff;}else{res[k+3]=m>>>24;res[k+2]=m>>>16&0xff;res[k+1]=m>>>8&0xff;res[k]=m&0xff;}}return res;}exports.split32=split32;function rotr32(w,b){return w>>>b|w<<32-b;}exports.rotr32=rotr32;function rotl32(w,b){return w<<b|w>>>32-b;}exports.rotl32=rotl32;function sum32(a,b){return a+b>>>0;}exports.sum32=sum32;function sum32_3(a,b,c){return a+b+c>>>0;}exports.sum32_3=sum32_3;function sum32_4(a,b,c,d){return a+b+c+d>>>0;}exports.sum32_4=sum32_4;function sum32_5(a,b,c,d,e){return a+b+c+d+e>>>0;}exports.sum32_5=sum32_5;function sum64(buf,pos,ah,al){var bh=buf[pos];var bl=buf[pos+1];var lo=al+bl>>>0;var hi=(lo<al?1:0)+ah+bh;buf[pos]=hi>>>0;buf[pos+1]=lo;}exports.sum64=sum64;function sum64_hi(ah,al,bh,bl){var lo=al+bl>>>0;var hi=(lo<al?1:0)+ah+bh;return hi>>>0;}exports.sum64_hi=sum64_hi;function sum64_lo(ah,al,bh,bl){var lo=al+bl;return lo>>>0;}exports.sum64_lo=sum64_lo;function sum64_4_hi(ah,al,bh,bl,ch,cl,dh,dl){var carry=0;var lo=al;lo=lo+bl>>>0;carry+=lo<al?1:0;lo=lo+cl>>>0;carry+=lo<cl?1:0;lo=lo+dl>>>0;carry+=lo<dl?1:0;var hi=ah+bh+ch+dh+carry;return hi>>>0;}exports.sum64_4_hi=sum64_4_hi;function sum64_4_lo(ah,al,bh,bl,ch,cl,dh,dl){var lo=al+bl+cl+dl;return lo>>>0;}exports.sum64_4_lo=sum64_4_lo;function sum64_5_hi(ah,al,bh,bl,ch,cl,dh,dl,eh,el){var carry=0;var lo=al;lo=lo+bl>>>0;carry+=lo<al?1:0;lo=lo+cl>>>0;carry+=lo<cl?1:0;lo=lo+dl>>>0;carry+=lo<dl?1:0;lo=lo+el>>>0;carry+=lo<el?1:0;var hi=ah+bh+ch+dh+eh+carry;return hi>>>0;}exports.sum64_5_hi=sum64_5_hi;function sum64_5_lo(ah,al,bh,bl,ch,cl,dh,dl,eh,el){var lo=al+bl+cl+dl+el;return lo>>>0;}exports.sum64_5_lo=sum64_5_lo;function rotr64_hi(ah,al,num){var r=al<<32-num|ah>>>num;return r>>>0;}exports.rotr64_hi=rotr64_hi;function rotr64_lo(ah,al,num){var r=ah<<32-num|al>>>num;return r>>>0;}exports.rotr64_lo=rotr64_lo;function shr64_hi(ah,al,num){return ah>>>num;}exports.shr64_hi=shr64_hi;function shr64_lo(ah,al,num){var r=ah<<32-num|al>>>num;return r>>>0;}exports.shr64_lo=shr64_lo;/***/},/* 9 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(process){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts,allowAboveRoot){// if the path tries to go above the root, `up` ends up > 0
var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==='.'){parts.splice(i,1);}else if(last==='..'){parts.splice(i,1);up++;}else if(up){parts.splice(i,1);up--;}}// if the path is allowed to go above the root, restore leading ..s
if(allowAboveRoot){for(;up--;up){parts.unshift('..');}}return parts;}// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;var splitPath=function splitPath(filename){return splitPathRe.exec(filename).slice(1);};// path.resolve([from ...], to)
// posix version
exports.resolve=function(){var resolvedPath='',resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:process.cwd();// Skip empty and invalid entries
if(typeof path!=='string'){throw new TypeError('Arguments to path.resolve must be strings');}else if(!path){continue;}resolvedPath=path+'/'+resolvedPath;resolvedAbsolute=path.charAt(0)==='/';}// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)
// Normalize the path
resolvedPath=normalizeArray(filter(resolvedPath.split('/'),function(p){return!!p;}),!resolvedAbsolute).join('/');return(resolvedAbsolute?'/':'')+resolvedPath||'.';};// path.normalize(path)
// posix version
exports.normalize=function(path){var isAbsolute=exports.isAbsolute(path),trailingSlash=substr(path,-1)==='/';// Normalize the path
path=normalizeArray(filter(path.split('/'),function(p){return!!p;}),!isAbsolute).join('/');if(!path&&!isAbsolute){path='.';}if(path&&trailingSlash){path+='/';}return(isAbsolute?'/':'')+path;};// posix version
exports.isAbsolute=function(path){return path.charAt(0)==='/';};// posix version
exports.join=function(){var paths=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(paths,function(p,index){if(typeof p!=='string'){throw new TypeError('Arguments to path.join must be strings');}return p;}).join('/'));};// path.relative(from, to)
// posix version
exports.relative=function(from,to){from=exports.resolve(from).substr(1);to=exports.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=='')break;}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=='')break;}if(start>end)return[];return arr.slice(start,end-start+1);}var fromParts=trim(from.split('/'));var toParts=trim(to.split('/'));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break;}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push('..');}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join('/');};exports.sep='/';exports.delimiter=':';exports.dirname=function(path){var result=splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){// No dirname whatsoever
return'.';}if(dir){// It has a dirname, strip trailing slash
dir=dir.substr(0,dir.length-1);}return root+dir;};exports.basename=function(path,ext){var f=splitPath(path)[2];// TODO: make this comparison case-insensitive on windows?
if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length);}return f;};exports.extname=function(path){return splitPath(path)[3];};function filter(xs,f){if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){if(f(xs[i],i,xs))res.push(xs[i]);}return res;}// String.prototype.substr - negative index don't work in IE8
var substr='ab'.substr(-1)==='b'?function(str,start,len){return str.substr(start,len);}:function(str,start,len){if(start<0)start=str.length+start;return str.substr(start,len);};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4));/***/},/* 10 *//***/function(module,exports,__webpack_require__){var Buffer=__webpack_require__(3).Buffer;var Transform=__webpack_require__(15).Transform;var StringDecoder=__webpack_require__(45).StringDecoder;var inherits=__webpack_require__(1);function CipherBase(hashMode){Transform.call(this);this.hashMode=typeof hashMode==='string';if(this.hashMode){this[hashMode]=this._finalOrDigest;}else{this.final=this._finalOrDigest;}if(this._final){this.__final=this._final;this._final=null;}this._decoder=null;this._encoding=null;}inherits(CipherBase,Transform);CipherBase.prototype.update=function(data,inputEnc,outputEnc){if(typeof data==='string'){data=Buffer.from(data,inputEnc);}var outData=this._update(data);if(this.hashMode)return this;if(outputEnc){outData=this._toString(outData,outputEnc);}return outData;};CipherBase.prototype.setAutoPadding=function(){};CipherBase.prototype.getAuthTag=function(){throw new Error('trying to get auth tag in unsupported state');};CipherBase.prototype.setAuthTag=function(){throw new Error('trying to set auth tag in unsupported state');};CipherBase.prototype.setAAD=function(){throw new Error('trying to set aad in unsupported state');};CipherBase.prototype._transform=function(data,_,next){var err;try{if(this.hashMode){this._update(data);}else{this.push(this._update(data));}}catch(e){err=e;}finally{next(err);}};CipherBase.prototype._flush=function(done){var err;try{this.push(this.__final());}catch(e){err=e;}done(err);};CipherBase.prototype._finalOrDigest=function(outputEnc){var outData=this.__final()||Buffer.alloc(0);if(outputEnc){outData=this._toString(outData,outputEnc,true);}return outData;};CipherBase.prototype._toString=function(value,enc,fin){if(!this._decoder){this._decoder=new StringDecoder(enc);this._encoding=enc;}if(this._encoding!==enc)throw new Error('can\'t switch encodings');var out=this._decoder.write(value);if(fin){out+=this._decoder.end();}return out;};module.exports=CipherBase;/***/},/* 11 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(process){/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */exports=module.exports=__webpack_require__(113);exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.storage='undefined'!=typeof chrome&&'undefined'!=typeof chrome.storage?chrome.storage.local:localstorage();/**
 * Colors.
 */exports.colors=['lightseagreen','forestgreen','goldenrod','dodgerblue','darkorchid','crimson'];/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */function useColors(){// NB: In an Electron preload script, document will be defined but not fully
// initialized. Since we know we're in Chrome, we'll just detect this case
// explicitly
if(typeof window!=='undefined'&&window.process&&window.process.type==='renderer'){return true;}// is webkit? http://stackoverflow.com/a/16459606/376773
// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
return typeof document!=='undefined'&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||// is firebug? http://stackoverflow.com/a/398120/376773
typeof window!=='undefined'&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||// is firefox >= v31?
// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
typeof navigator!=='undefined'&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||// double check webkit in userAgent just in case we are in a worker
typeof navigator!=='undefined'&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);}/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */exports.formatters.j=function(v){try{return(0,_stringify2.default)(v);}catch(err){return'[UnexpectedJSONParseError]: '+err.message;}};/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */function formatArgs(args){var useColors=this.useColors;args[0]=(useColors?'%c':'')+this.namespace+(useColors?' %c':' ')+args[0]+(useColors?'%c ':' ')+'+'+exports.humanize(this.diff);if(!useColors)return;var c='color: '+this.color;args.splice(1,0,c,'color: inherit');// the final "%c" is somewhat tricky, because there could be other
// arguments passed either before or after the %c, so we need to
// figure out the correct index to insert the CSS into
var index=0;var lastC=0;args[0].replace(/%[a-zA-Z%]/g,function(match){if('%%'===match)return;index++;if('%c'===match){// we only are interested in the *last* %c
// (the user may have provided their own)
lastC=index;}});args.splice(lastC,0,c);}/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */function log(){// this hackery is required for IE8/9, where
// the `console.log` function doesn't have 'apply'
return'object'===(typeof console==='undefined'?'undefined':(0,_typeof3.default)(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments);}/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */function save(namespaces){try{if(null==namespaces){exports.storage.removeItem('debug');}else{exports.storage.debug=namespaces;}}catch(e){}}/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */function load(){var r;try{r=exports.storage.debug;}catch(e){}// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
if(!r&&typeof process!=='undefined'&&'env'in process){r=process.env.DEBUG;}return r;}/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */exports.enable(load());/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */function localstorage(){try{return window.localStorage;}catch(e){}}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4));/***/},/* 12 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=depd;/**
 * Create deprecate for namespace in caller.
 */function depd(namespace){if(!namespace){throw new TypeError('argument namespace is required');}function deprecate(message){// no-op in browser
}deprecate._file=undefined;deprecate._ignored=true;deprecate._namespace=namespace;deprecate._traced=false;deprecate._warned=(0,_create2.default)(null);deprecate.function=wrapfunction;deprecate.property=wrapproperty;return deprecate;}/**
 * Return a wrapped function in a deprecation message.
 *
 * This is a no-op version of the wrapper, which does nothing but call
 * validation.
 */function wrapfunction(fn,message){if(typeof fn!=='function'){throw new TypeError('argument fn must be a function');}return fn;}/**
 * Wrap property in a deprecation message.
 *
 * This is a no-op version of the wrapper, which does nothing but call
 * validation.
 */function wrapproperty(obj,prop,message){if(!obj||(typeof obj==='undefined'?'undefined':(0,_typeof3.default)(obj))!=='object'&&typeof obj!=='function'){throw new TypeError('argument obj must be object');}var descriptor=(0,_getOwnPropertyDescriptor2.default)(obj,prop);if(!descriptor){throw new TypeError('must call property on owner object');}if(!descriptor.configurable){throw new TypeError('property must be configurable');}}/***/},/* 13 *//***/function(module,exports,__webpack_require__){"use strict";// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
/*<replacement>*/var processNextTick=__webpack_require__(34);/*</replacement>*//*<replacement>*/var objectKeys=_keys2.default||function(obj){var keys=[];for(var key in obj){keys.push(key);}return keys;};/*</replacement>*/module.exports=Duplex;/*<replacement>*/var util=__webpack_require__(21);util.inherits=__webpack_require__(1);/*</replacement>*/var Readable=__webpack_require__(66);var Writable=__webpack_require__(44);util.inherits(Duplex,Readable);var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method];}function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);if(options&&options.readable===false)this.readable=false;if(options&&options.writable===false)this.writable=false;this.allowHalfOpen=true;if(options&&options.allowHalfOpen===false)this.allowHalfOpen=false;this.once('end',onend);}// the no-half-open enforcer
function onend(){// if we allow half-open state, or if the writable side ended,
// then we're ok.
if(this.allowHalfOpen||this._writableState.ended)return;// no more data can be written.
// But allow more writes to happen in this tick.
processNextTick(onEndNT,this);}function onEndNT(self){self.end();}Object.defineProperty(Duplex.prototype,'destroyed',{get:function get(){if(this._readableState===undefined||this._writableState===undefined){return false;}return this._readableState.destroyed&&this._writableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(this._readableState===undefined||this._writableState===undefined){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._readableState.destroyed=value;this._writableState.destroyed=value;}});Duplex.prototype._destroy=function(err,cb){this.push(null);this.end();processNextTick(cb,err);};function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i);}}/***/},/* 14 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @api private
 */var contentDisposition=__webpack_require__(70);var contentType=__webpack_require__(137);var deprecate=__webpack_require__(12)('express');var flatten=__webpack_require__(31);var mime=__webpack_require__(46).mime;var etag=__webpack_require__(71);var proxyaddr=__webpack_require__(102);var qs=__webpack_require__(62);var querystring=__webpack_require__(57);/**
 * Return strong ETag for `body`.
 *
 * @param {String|Buffer} body
 * @param {String} [encoding]
 * @return {String}
 * @api private
 */exports.etag=function(body,encoding){var buf=!Buffer.isBuffer(body)?new Buffer(body,encoding):body;return etag(buf,{weak:false});};/**
 * Return weak ETag for `body`.
 *
 * @param {String|Buffer} body
 * @param {String} [encoding]
 * @return {String}
 * @api private
 */exports.wetag=function wetag(body,encoding){var buf=!Buffer.isBuffer(body)?new Buffer(body,encoding):body;return etag(buf,{weak:true});};/**
 * Check if `path` looks absolute.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */exports.isAbsolute=function(path){if('/'===path[0])return true;if(':'===path[1]&&('\\'===path[2]||'/'===path[2]))return true;// Windows device path
if('\\\\'===path.substring(0,2))return true;// Microsoft Azure absolute path
};/**
 * Flatten the given `arr`.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */exports.flatten=deprecate.function(flatten,'utils.flatten: use array-flatten npm module instead');/**
 * Normalize the given `type`, for example "html" becomes "text/html".
 *
 * @param {String} type
 * @return {Object}
 * @api private
 */exports.normalizeType=function(type){return~type.indexOf('/')?acceptParams(type):{value:mime.lookup(type),params:{}};};/**
 * Normalize `types`, for example "html" becomes "text/html".
 *
 * @param {Array} types
 * @return {Array}
 * @api private
 */exports.normalizeTypes=function(types){var ret=[];for(var i=0;i<types.length;++i){ret.push(exports.normalizeType(types[i]));}return ret;};/**
 * Generate Content-Disposition header appropriate for the filename.
 * non-ascii filenames are urlencoded and a filename* parameter is added
 *
 * @param {String} filename
 * @return {String}
 * @api private
 */exports.contentDisposition=deprecate.function(contentDisposition,'utils.contentDisposition: use content-disposition npm module instead');/**
 * Parse accept params `str` returning an
 * object with `.value`, `.quality` and `.params`.
 * also includes `.originalIndex` for stable sorting
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */function acceptParams(str,index){var parts=str.split(/ *; */);var ret={value:parts[0],quality:1,params:{},originalIndex:index};for(var i=1;i<parts.length;++i){var pms=parts[i].split(/ *= */);if('q'===pms[0]){ret.quality=parseFloat(pms[1]);}else{ret.params[pms[0]]=pms[1];}}return ret;}/**
 * Compile "etag" value to function.
 *
 * @param  {Boolean|String|Function} val
 * @return {Function}
 * @api private
 */exports.compileETag=function(val){var fn;if(typeof val==='function'){return val;}switch(val){case true:fn=exports.wetag;break;case false:break;case'strong':fn=exports.etag;break;case'weak':fn=exports.wetag;break;default:throw new TypeError('unknown value for etag function: '+val);}return fn;};/**
 * Compile "query parser" value to function.
 *
 * @param  {String|Function} val
 * @return {Function}
 * @api private
 */exports.compileQueryParser=function compileQueryParser(val){var fn;if(typeof val==='function'){return val;}switch(val){case true:fn=querystring.parse;break;case false:fn=newObject;break;case'extended':fn=parseExtendedQueryString;break;case'simple':fn=querystring.parse;break;default:throw new TypeError('unknown value for query parser function: '+val);}return fn;};/**
 * Compile "proxy trust" value to function.
 *
 * @param  {Boolean|String|Number|Array|Function} val
 * @return {Function}
 * @api private
 */exports.compileTrust=function(val){if(typeof val==='function')return val;if(val===true){// Support plain true/false
return function(){return true;};}if(typeof val==='number'){// Support trusting hop count
return function(a,i){return i<val;};}if(typeof val==='string'){// Support comma-separated values
val=val.split(/ *, */);}return proxyaddr.compile(val||[]);};/**
 * Set the charset in a given Content-Type string.
 *
 * @param {String} type
 * @param {String} charset
 * @return {String}
 * @api private
 */exports.setCharset=function setCharset(type,charset){if(!type||!charset){return type;}// parse type
var parsed=contentType.parse(type);// set charset
parsed.parameters.charset=charset;// format type
return contentType.format(parsed);};/**
 * Parse an extended query string with qs.
 *
 * @return {Object}
 * @private
 */function parseExtendedQueryString(str){return qs.parse(str,{allowPrototypes:true});}/**
 * Return new empty object.
 *
 * @return {Object}
 * @api private
 */function newObject(){return{};}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 15 *//***/function(module,exports,__webpack_require__){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
module.exports=Stream;var EE=__webpack_require__(17).EventEmitter;var inherits=__webpack_require__(1);inherits(Stream,EE);Stream.Readable=__webpack_require__(20);Stream.Writable=__webpack_require__(140);Stream.Duplex=__webpack_require__(141);Stream.Transform=__webpack_require__(142);Stream.PassThrough=__webpack_require__(143);// Backwards-compat with node 0.4.x
Stream.Stream=Stream;// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.
function Stream(){EE.call(this);}Stream.prototype.pipe=function(dest,options){var source=this;function ondata(chunk){if(dest.writable){if(false===dest.write(chunk)&&source.pause){source.pause();}}}source.on('data',ondata);function ondrain(){if(source.readable&&source.resume){source.resume();}}dest.on('drain',ondrain);// If the 'end' option is not supplied, dest.end() will be called when
// source gets the 'end' or 'close' events.  Only dest.end() once.
if(!dest._isStdio&&(!options||options.end!==false)){source.on('end',onend);source.on('close',onclose);}var didOnEnd=false;function onend(){if(didOnEnd)return;didOnEnd=true;dest.end();}function onclose(){if(didOnEnd)return;didOnEnd=true;if(typeof dest.destroy==='function')dest.destroy();}// don't leave dangling pipes when there are errors.
function onerror(er){cleanup();if(EE.listenerCount(this,'error')===0){throw er;// Unhandled stream error in pipe.
}}source.on('error',onerror);dest.on('error',onerror);// remove all the event listeners that were added.
function cleanup(){source.removeListener('data',ondata);dest.removeListener('drain',ondrain);source.removeListener('end',onend);source.removeListener('close',onclose);source.removeListener('error',onerror);dest.removeListener('error',onerror);source.removeListener('end',cleanup);source.removeListener('close',cleanup);dest.removeListener('close',cleanup);}source.on('end',cleanup);source.on('close',cleanup);dest.on('close',cleanup);dest.emit('pipe',source);// Allow for unix-like usage: A.pipe(B).pipe(C)
return dest;};/***/},/* 16 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){// prototype class for hash functions
function Hash(blockSize,finalSize){this._block=new Buffer(blockSize);this._finalSize=finalSize;this._blockSize=blockSize;this._len=0;this._s=0;}Hash.prototype.update=function(data,enc){if(typeof data==='string'){enc=enc||'utf8';data=new Buffer(data,enc);}var l=this._len+=data.length;var s=this._s||0;var f=0;var buffer=this._block;while(s<l){var t=Math.min(data.length,f+this._blockSize-s%this._blockSize);var ch=t-f;for(var i=0;i<ch;i++){buffer[s%this._blockSize+i]=data[i+f];}s+=ch;f+=ch;if(s%this._blockSize===0){this._update(buffer);}}this._s=s;return this;};Hash.prototype.digest=function(enc){// Suppose the length of the message M, in bits, is l
var l=this._len*8;// Append the bit 1 to the end of the message
this._block[this._len%this._blockSize]=0x80;// and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
this._block.fill(0,this._len%this._blockSize+1);if(l%(this._blockSize*8)>=this._finalSize*8){this._update(this._block);this._block.fill(0);}// to this append the block which is equal to the number l written in binary
// TODO: handle case where l is > Math.pow(2, 29)
this._block.writeInt32BE(l,this._blockSize-4);var hash=this._update(this._block)||this._hash();return enc?hash.toString(enc):hash;};Hash.prototype._update=function(){throw new Error('_update must be implemented by subclass');};module.exports=Hash;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 17 *//***/function(module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined;}module.exports=EventEmitter;// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners=10;// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError('n must be a positive number');this._maxListeners=n;return this;};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};// If there is no 'error' event listener then throw.
if(type==='error'){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er;// Unhandled 'error' event
}else{// At least give some kind of context to the user
var err=new Error('Uncaught, unspecified "error" event. ('+er+')');err.context=er;throw err;}}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){// fast cases
case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;// slower
default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args);}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++){listeners[i].apply(this,args);}}return true;};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError('listener must be a function');if(!this._events)this._events={};// To avoid recursion in the case that type === "newListener"! Before
// adding it to the listeners, first emit "newListener".
if(this._events.newListener)this.emit('newListener',type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])// Optimize the case of one listener. Don't need the extra array object.
this._events[type]=listener;else if(isObject(this._events[type]))// If we've already got an array, just append.
this._events[type].push(listener);else// Adding the second element, need to change to array.
this._events[type]=[this._events[type],listener];// Check for listener leak
if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners;}else{m=EventEmitter.defaultMaxListeners;}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error('(node) warning: possible EventEmitter memory '+'leak detected. %d listeners added. '+'Use emitter.setMaxListeners() to increase limit.',this._events[type].length);if(typeof console.trace==='function'){// not supported in IE 10
console.trace();}}}return this;};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError('listener must be a function');var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments);}}g.listener=listener;this.on(type,g);return this;};// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError('listener must be a function');if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit('removeListener',type,listener);}else if(isObject(list)){for(i=length;i-->0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break;}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type];}else{list.splice(position,1);}if(this._events.removeListener)this.emit('removeListener',type,listener);}return this;};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;// not listening for removeListener, no need to emit
if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this;}// emit removeListener for all listeners on all events
if(arguments.length===0){for(key in this._events){if(key==='removeListener')continue;this.removeAllListeners(key);}this.removeAllListeners('removeListener');this._events={};return this;}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners);}else if(listeners){// LIFO order
while(listeners.length){this.removeListener(type,listeners[listeners.length-1]);}}delete this._events[type];return this;};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret;};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;else if(evlistener)return evlistener.length;}return 0;};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type);};function isFunction(arg){return typeof arg==='function';}function isNumber(arg){return typeof arg==='number';}function isObject(arg){return(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='object'&&arg!==null;}function isUndefined(arg){return arg===void 0;}/***/},/* 18 *//***/function(module,exports,__webpack_require__){var apply=Function.prototype.apply;// DOM APIs, for completeness
exports.setTimeout=function(){return new Timeout(apply.call(setTimeout,window,arguments),clearTimeout);};exports.setInterval=function(){return new Timeout(apply.call(setInterval,window,arguments),clearInterval);};exports.clearTimeout=exports.clearInterval=function(timeout){if(timeout){timeout.close();}};function Timeout(id,clearFn){this._id=id;this._clearFn=clearFn;}Timeout.prototype.unref=Timeout.prototype.ref=function(){};Timeout.prototype.close=function(){this._clearFn.call(window,this._id);};// Does not start the time, just sets up the members needed.
exports.enroll=function(item,msecs){clearTimeout(item._idleTimeoutId);item._idleTimeout=msecs;};exports.unenroll=function(item){clearTimeout(item._idleTimeoutId);item._idleTimeout=-1;};exports._unrefActive=exports.active=function(item){clearTimeout(item._idleTimeoutId);var msecs=item._idleTimeout;if(msecs>=0){item._idleTimeoutId=setTimeout(function onTimeout(){if(item._onTimeout)item._onTimeout();},msecs);}};// setimmediate attaches itself to the global object
__webpack_require__(110);exports.setImmediate=_setImmediate3.default;exports.clearImmediate=_clearImmediate3.default;/***/},/* 19 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * parseurl
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 */var url=__webpack_require__(40);var parse=url.parse;var Url=url.Url;/**
 * Pattern for a simple path case.
 * See: https://github.com/joyent/node/pull/7878
 */var simplePathRegExp=/^(\/\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?$/;/**
 * Exports.
 */module.exports=parseurl;module.exports.original=originalurl;/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api public
 */function parseurl(req){var url=req.url;if(url===undefined){// URL is undefined
return undefined;}var parsed=req._parsedUrl;if(fresh(url,parsed)){// Return cached URL parse
return parsed;}// Parse the URL
parsed=fastparse(url);parsed._raw=url;return req._parsedUrl=parsed;};/**
 * Parse the `req` original url with fallback and memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api public
 */function originalurl(req){var url=req.originalUrl;if(typeof url!=='string'){// Fallback
return parseurl(req);}var parsed=req._parsedOriginalUrl;if(fresh(url,parsed)){// Return cached URL parse
return parsed;}// Parse the URL
parsed=fastparse(url);parsed._raw=url;return req._parsedOriginalUrl=parsed;};/**
 * Parse the `str` url with fast-path short-cut.
 *
 * @param {string} str
 * @return {Object}
 * @api private
 */function fastparse(str){// Try fast path regexp
// See: https://github.com/joyent/node/pull/7878
var simplePath=typeof str==='string'&&simplePathRegExp.exec(str);// Construct simple URL
if(simplePath){var pathname=simplePath[1];var search=simplePath[2]||null;var url=Url!==undefined?new Url():{};url.path=str;url.href=str;url.pathname=pathname;url.search=search;url.query=search&&search.substr(1);return url;}return parse(str);}/**
 * Determine if parsed is still fresh for url.
 *
 * @param {string} url
 * @param {object} parsedUrl
 * @return {boolean}
 * @api private
 */function fresh(url,parsedUrl){return(typeof parsedUrl==='undefined'?'undefined':(0,_typeof3.default)(parsedUrl))==='object'&&parsedUrl!==null&&(Url===undefined||parsedUrl instanceof Url)&&parsedUrl._raw===url;}/***/},/* 20 *//***/function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(66);exports.Stream=exports;exports.Readable=exports;exports.Writable=__webpack_require__(44);exports.Duplex=__webpack_require__(13);exports.Transform=__webpack_require__(69);exports.PassThrough=__webpack_require__(133);/***/},/* 21 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(arg){if(Array.isArray){return Array.isArray(arg);}return objectToString(arg)==='[object Array]';}exports.isArray=isArray;function isBoolean(arg){return typeof arg==='boolean';}exports.isBoolean=isBoolean;function isNull(arg){return arg===null;}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null;}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==='number';}exports.isNumber=isNumber;function isString(arg){return typeof arg==='string';}exports.isString=isString;function isSymbol(arg){return(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='symbol';}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0;}exports.isUndefined=isUndefined;function isRegExp(re){return objectToString(re)==='[object RegExp]';}exports.isRegExp=isRegExp;function isObject(arg){return(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='object'&&arg!==null;}exports.isObject=isObject;function isDate(d){return objectToString(d)==='[object Date]';}exports.isDate=isDate;function isError(e){return objectToString(e)==='[object Error]'||e instanceof Error;}exports.isError=isError;function isFunction(arg){return typeof arg==='function';}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==='boolean'||typeof arg==='number'||typeof arg==='string'||(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='symbol'||// ES6 symbol
typeof arg==='undefined';}exports.isPrimitive=isPrimitive;exports.isBuffer=Buffer.isBuffer;function objectToString(o){return Object.prototype.toString.call(o);}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 22 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(global,process){function oldBrowser(){throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11');}var Buffer=__webpack_require__(3).Buffer;var crypto=global.crypto||global.msCrypto;if(crypto&&crypto.getRandomValues){module.exports=randomBytes;}else{module.exports=oldBrowser;}function randomBytes(size,cb){// phantomjs needs to throw
if(size>65536)throw new Error('requested too many random bytes');// in case browserify  isn't using the Uint8Array version
var rawBytes=new global.Uint8Array(size);// This will not work in older browsers.
// See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
if(size>0){// getRandomValues fails on IE if size == 0
crypto.getRandomValues(rawBytes);}// XXX: phantomjs doesn't like a buffer being passed here
var bytes=Buffer.from(rawBytes.buffer);if(typeof cb==='function'){return process.nextTick(function(){cb(null,bytes);});}return bytes;}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6),__webpack_require__(4));/***/},/* 23 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){var inherits=__webpack_require__(1);var md5=__webpack_require__(47);var RIPEMD160=__webpack_require__(48);var sha=__webpack_require__(49);var Base=__webpack_require__(10);function HashNoConstructor(hash){Base.call(this,'digest');this._hash=hash;this.buffers=[];}inherits(HashNoConstructor,Base);HashNoConstructor.prototype._update=function(data){this.buffers.push(data);};HashNoConstructor.prototype._final=function(){var buf=Buffer.concat(this.buffers);var r=this._hash(buf);this.buffers=null;return r;};function Hash(hash){Base.call(this,'digest');this._hash=hash;}inherits(Hash,Base);Hash.prototype._update=function(data){this._hash.update(data);};Hash.prototype._final=function(){return this._hash.digest();};module.exports=function createHash(alg){alg=alg.toLowerCase();if(alg==='md5')return new HashNoConstructor(md5);if(alg==='rmd160'||alg==='ripemd160')return new Hash(new RIPEMD160());return new Hash(sha(alg));};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 24 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){module.exports=function xor(a,b){var length=Math.min(a.length,b.length);var buffer=new Buffer(length);for(var i=0;i<length;++i){buffer[i]=a[i]^b[i];}return buffer;};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 25 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var assert=__webpack_require__(7);function BlockHash(){this.pending=null;this.pendingTotal=0;this.blockSize=this.constructor.blockSize;this.outSize=this.constructor.outSize;this.hmacStrength=this.constructor.hmacStrength;this.padLength=this.constructor.padLength/8;this.endian='big';this._delta8=this.blockSize/8;this._delta32=this.blockSize/32;}exports.BlockHash=BlockHash;BlockHash.prototype.update=function update(msg,enc){// Convert message to array, pad it, and join into 32bit blocks
msg=utils.toArray(msg,enc);if(!this.pending)this.pending=msg;else this.pending=this.pending.concat(msg);this.pendingTotal+=msg.length;// Enough data, try updating
if(this.pending.length>=this._delta8){msg=this.pending;// Process pending data in blocks
var r=msg.length%this._delta8;this.pending=msg.slice(msg.length-r,msg.length);if(this.pending.length===0)this.pending=null;msg=utils.join32(msg,0,msg.length-r,this.endian);for(var i=0;i<msg.length;i+=this._delta32){this._update(msg,i,i+this._delta32);}}return this;};BlockHash.prototype.digest=function digest(enc){this.update(this._pad());assert(this.pending===null);return this._digest(enc);};BlockHash.prototype._pad=function pad(){var len=this.pendingTotal;var bytes=this._delta8;var k=bytes-(len+this.padLength)%bytes;var res=new Array(k+this.padLength);res[0]=0x80;for(var i=1;i<k;i++){res[i]=0;}// Append length
len<<=3;if(this.endian==='big'){for(var t=8;t<this.padLength;t++){res[i++]=0;}res[i++]=0;res[i++]=0;res[i++]=0;res[i++]=0;res[i++]=len>>>24&0xff;res[i++]=len>>>16&0xff;res[i++]=len>>>8&0xff;res[i++]=len&0xff;}else{res[i++]=len&0xff;res[i++]=len>>>8&0xff;res[i++]=len>>>16&0xff;res[i++]=len>>>24&0xff;res[i++]=0;res[i++]=0;res[i++]=0;res[i++]=0;for(t=8;t<this.padLength;t++){res[i++]=0;}}return res;};/***/},/* 26 *//***/function(module,exports,__webpack_require__){var asn1=exports;asn1.bignum=__webpack_require__(2);asn1.define=__webpack_require__(201).define;asn1.base=__webpack_require__(27);asn1.constants=__webpack_require__(93);asn1.decoders=__webpack_require__(207);asn1.encoders=__webpack_require__(209);/***/},/* 27 *//***/function(module,exports,__webpack_require__){var base=exports;base.Reporter=__webpack_require__(204).Reporter;base.DecoderBuffer=__webpack_require__(92).DecoderBuffer;base.EncoderBuffer=__webpack_require__(92).EncoderBuffer;base.Node=__webpack_require__(205);/***/},/* 28 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * encodeurl
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=encodeUrl;/**
 * RegExp to match non-URL code points, *after* encoding (i.e. not including "%")
 * and including invalid escape sequences.
 * @private
 */var ENCODE_CHARS_REGEXP=/(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]))+/g;/**
 * RegExp to match unmatched surrogate pair.
 * @private
 */var UNMATCHED_SURROGATE_PAIR_REGEXP=/(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;/**
 * String to replace unmatched surrogate pair with.
 * @private
 */var UNMATCHED_SURROGATE_PAIR_REPLACE='$1\uFFFD$2';/**
 * Encode a URL to a percent-encoded form, excluding already-encoded sequences.
 *
 * This function will take an already-encoded URL and encode all the non-URL
 * code points. This function will not encode the "%" character unless it is
 * not part of a valid sequence (`%20` will be left as-is, but `%foo` will
 * be encoded as `%25foo`).
 *
 * This encode is meant to be "safe" and does not throw errors. It will try as
 * hard as it can to properly encode the given URL, including replacing any raw,
 * unpaired surrogate pairs with the Unicode replacement character prior to
 * encoding.
 *
 * @param {string} url
 * @return {string}
 * @public
 */function encodeUrl(url){return String(url).replace(UNMATCHED_SURROGATE_PAIR_REGEXP,UNMATCHED_SURROGATE_PAIR_REPLACE).replace(ENCODE_CHARS_REGEXP,encodeURI);}/***/},/* 29 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 *//**
 * Module variables.
 * @private
 */var matchHtmlRegExp=/["'&<>]/;/**
 * Module exports.
 * @public
 */module.exports=escapeHtml;/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */function escapeHtml(string){var str=''+string;var match=matchHtmlRegExp.exec(str);if(!match){return str;}var escape;var html='';var index=0;var lastIndex=0;for(index=match.index;index<str.length;index++){switch(str.charCodeAt(index)){case 34:// "
escape='&quot;';break;case 38:// &
escape='&amp;';break;case 39:// '
escape='&#39;';break;case 60:// <
escape='&lt;';break;case 62:// >
escape='&gt;';break;default:continue;}if(lastIndex!==index){html+=str.substring(lastIndex,index);}lastIndex=index+1;html+=escape;}return lastIndex!==index?html+str.substring(lastIndex,index):html;}/***/},/* 30 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var codes=__webpack_require__(119);/**
 * Module exports.
 * @public
 */module.exports=status;// array of status codes
status.codes=populateStatusesMap(status,codes);// status codes for redirects
status.redirect={300:true,301:true,302:true,303:true,305:true,307:true,308:true// status codes for empty bodies
};status.empty={204:true,205:true,304:true// status codes for when you should retry the request
};status.retry={502:true,503:true,504:true/**
 * Populate the statuses map for given codes.
 * @private
 */};function populateStatusesMap(statuses,codes){var arr=[];(0,_keys2.default)(codes).forEach(function forEachCode(code){var message=codes[code];var status=Number(code);// Populate properties
statuses[status]=message;statuses[message]=status;statuses[message.toLowerCase()]=status;// Add to array
arr.push(status);});return arr;}/**
 * Get the status code.
 *
 * Given a number, this will throw if it is not a known status
 * code, otherwise the code will be returned. Given a string,
 * the string will be parsed for a number and return the code
 * if valid, otherwise will lookup the code assuming this is
 * the status message.
 *
 * @param {string|number} code
 * @returns {number}
 * @public
 */function status(code){if(typeof code==='number'){if(!status[code])throw new Error('invalid status code: '+code);return code;}if(typeof code!=='string'){throw new TypeError('code must be a number or string');}// '403'
var n=parseInt(code,10);if(!isNaN(n)){if(!status[n])throw new Error('invalid status code: '+n);return n;}n=status[code.toLowerCase()];if(!n)throw new Error('invalid status message: "'+code+'"');return n;}/***/},/* 31 *//***/function(module,exports,__webpack_require__){"use strict";/**
 * Expose `arrayFlatten`.
 */module.exports=arrayFlatten;/**
 * Recursive flatten function with depth.
 *
 * @param  {Array}  array
 * @param  {Array}  result
 * @param  {Number} depth
 * @return {Array}
 */function flattenWithDepth(array,result,depth){for(var i=0;i<array.length;i++){var value=array[i];if(depth>0&&Array.isArray(value)){flattenWithDepth(value,result,depth-1);}else{result.push(value);}}return result;}/**
 * Recursive flatten function. Omitting depth is slightly faster.
 *
 * @param  {Array} array
 * @param  {Array} result
 * @return {Array}
 */function flattenForever(array,result){for(var i=0;i<array.length;i++){var value=array[i];if(Array.isArray(value)){flattenForever(value,result);}else{result.push(value);}}return result;}/**
 * Flatten an array, with the ability to define a depth.
 *
 * @param  {Array}  array
 * @param  {Number} depth
 * @return {Array}
 */function arrayFlatten(array,depth){if(depth==null){return flattenForever(array,[]);}return flattenWithDepth(array,[],depth);}/***/},/* 32 *//***/function(module,exports){/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */exports=module.exports=function(a,b){if(a&&b){for(var key in b){a[key]=b[key];}}return a;};/***/},/* 33 *//***/function(module,exports){module.exports=_setPrototypeOf2.default||({__proto__:[]}instanceof Array?setProtoOf:mixinProperties);function setProtoOf(obj,proto){obj.__proto__=proto;return obj;}function mixinProperties(obj,proto){for(var prop in proto){if(!obj.hasOwnProperty(prop)){obj[prop]=proto[prop];}}return obj;}/***/},/* 34 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(process){if(!process.version||process.version.indexOf('v0.')===0||process.version.indexOf('v1.')===0&&process.version.indexOf('v1.8.')!==0){module.exports=nextTick;}else{module.exports=process.nextTick;}function nextTick(fn,arg1,arg2,arg3){if(typeof fn!=='function'){throw new TypeError('"callback" argument must be a function');}var len=arguments.length;var args,i;switch(len){case 0:case 1:return process.nextTick(fn);case 2:return process.nextTick(function afterTickOne(){fn.call(null,arg1);});case 3:return process.nextTick(function afterTickTwo(){fn.call(null,arg1,arg2);});case 4:return process.nextTick(function afterTickThree(){fn.call(null,arg1,arg2,arg3);});default:args=new Array(len-1);i=0;while(i<args.length){args[i++]=arguments[i];}return process.nextTick(function afterTick(){fn.apply(null,args);});}}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4));/***/},/* 35 *//***/function(module,exports,__webpack_require__){var Buffer=__webpack_require__(3).Buffer;var MD5=__webpack_require__(154);/* eslint-disable camelcase */function EVP_BytesToKey(password,salt,keyBits,ivLen){if(!Buffer.isBuffer(password))password=Buffer.from(password,'binary');if(salt){if(!Buffer.isBuffer(salt))salt=Buffer.from(salt,'binary');if(salt.length!==8)throw new RangeError('salt should be Buffer with 8 byte length');}var keyLen=keyBits/8;var key=Buffer.alloc(keyLen);var iv=Buffer.alloc(ivLen||0);var tmp=Buffer.alloc(0);while(keyLen>0||ivLen>0){var hash=new MD5();hash.update(tmp);hash.update(password);if(salt)hash.update(salt);tmp=hash.digest();var used=0;if(keyLen>0){var keyStart=key.length-keyLen;used=Math.min(keyLen,tmp.length);tmp.copy(key,keyStart,0,used);keyLen-=used;}if(used<tmp.length&&ivLen>0){var ivStart=iv.length-ivLen;var length=Math.min(ivLen,tmp.length-used);tmp.copy(iv,ivStart,used,used+length);ivLen-=length;}}tmp.fill(0);return{key:key,iv:iv};}module.exports=EVP_BytesToKey;/***/},/* 36 *//***/function(module,exports,__webpack_require__){// based on the aes implimentation in triple sec
// https://github.com/keybase/triplesec
// which is in turn based on the one from crypto-js
// https://code.google.com/p/crypto-js/
var Buffer=__webpack_require__(3).Buffer;function asUInt32Array(buf){if(!Buffer.isBuffer(buf))buf=Buffer.from(buf);var len=buf.length/4|0;var out=new Array(len);for(var i=0;i<len;i++){out[i]=buf.readUInt32BE(i*4);}return out;}function scrubVec(v){for(var i=0;i<v.length;v++){v[i]=0;}}function cryptBlock(M,keySchedule,SUB_MIX,SBOX,nRounds){var SUB_MIX0=SUB_MIX[0];var SUB_MIX1=SUB_MIX[1];var SUB_MIX2=SUB_MIX[2];var SUB_MIX3=SUB_MIX[3];var s0=M[0]^keySchedule[0];var s1=M[1]^keySchedule[1];var s2=M[2]^keySchedule[2];var s3=M[3]^keySchedule[3];var t0,t1,t2,t3;var ksRow=4;for(var round=1;round<nRounds;round++){t0=SUB_MIX0[s0>>>24]^SUB_MIX1[s1>>>16&0xff]^SUB_MIX2[s2>>>8&0xff]^SUB_MIX3[s3&0xff]^keySchedule[ksRow++];t1=SUB_MIX0[s1>>>24]^SUB_MIX1[s2>>>16&0xff]^SUB_MIX2[s3>>>8&0xff]^SUB_MIX3[s0&0xff]^keySchedule[ksRow++];t2=SUB_MIX0[s2>>>24]^SUB_MIX1[s3>>>16&0xff]^SUB_MIX2[s0>>>8&0xff]^SUB_MIX3[s1&0xff]^keySchedule[ksRow++];t3=SUB_MIX0[s3>>>24]^SUB_MIX1[s0>>>16&0xff]^SUB_MIX2[s1>>>8&0xff]^SUB_MIX3[s2&0xff]^keySchedule[ksRow++];s0=t0;s1=t1;s2=t2;s3=t3;}t0=(SBOX[s0>>>24]<<24|SBOX[s1>>>16&0xff]<<16|SBOX[s2>>>8&0xff]<<8|SBOX[s3&0xff])^keySchedule[ksRow++];t1=(SBOX[s1>>>24]<<24|SBOX[s2>>>16&0xff]<<16|SBOX[s3>>>8&0xff]<<8|SBOX[s0&0xff])^keySchedule[ksRow++];t2=(SBOX[s2>>>24]<<24|SBOX[s3>>>16&0xff]<<16|SBOX[s0>>>8&0xff]<<8|SBOX[s1&0xff])^keySchedule[ksRow++];t3=(SBOX[s3>>>24]<<24|SBOX[s0>>>16&0xff]<<16|SBOX[s1>>>8&0xff]<<8|SBOX[s2&0xff])^keySchedule[ksRow++];t0=t0>>>0;t1=t1>>>0;t2=t2>>>0;t3=t3>>>0;return[t0,t1,t2,t3];}// AES constants
var RCON=[0x00,0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1b,0x36];var G=function(){// Compute double table
var d=new Array(256);for(var j=0;j<256;j++){if(j<128){d[j]=j<<1;}else{d[j]=j<<1^0x11b;}}var SBOX=[];var INV_SBOX=[];var SUB_MIX=[[],[],[],[]];var INV_SUB_MIX=[[],[],[],[]];// Walk GF(2^8)
var x=0;var xi=0;for(var i=0;i<256;++i){// Compute sbox
var sx=xi^xi<<1^xi<<2^xi<<3^xi<<4;sx=sx>>>8^sx&0xff^0x63;SBOX[x]=sx;INV_SBOX[sx]=x;// Compute multiplication
var x2=d[x];var x4=d[x2];var x8=d[x4];// Compute sub bytes, mix columns tables
var t=d[sx]*0x101^sx*0x1010100;SUB_MIX[0][x]=t<<24|t>>>8;SUB_MIX[1][x]=t<<16|t>>>16;SUB_MIX[2][x]=t<<8|t>>>24;SUB_MIX[3][x]=t;// Compute inv sub bytes, inv mix columns tables
t=x8*0x1010101^x4*0x10001^x2*0x101^x*0x1010100;INV_SUB_MIX[0][sx]=t<<24|t>>>8;INV_SUB_MIX[1][sx]=t<<16|t>>>16;INV_SUB_MIX[2][sx]=t<<8|t>>>24;INV_SUB_MIX[3][sx]=t;if(x===0){x=xi=1;}else{x=x2^d[d[d[x8^x2]]];xi^=d[d[xi]];}}return{SBOX:SBOX,INV_SBOX:INV_SBOX,SUB_MIX:SUB_MIX,INV_SUB_MIX:INV_SUB_MIX};}();function AES(key){this._key=asUInt32Array(key);this._reset();}AES.blockSize=4*4;AES.keySize=256/8;AES.prototype.blockSize=AES.blockSize;AES.prototype.keySize=AES.keySize;AES.prototype._reset=function(){var keyWords=this._key;var keySize=keyWords.length;var nRounds=keySize+6;var ksRows=(nRounds+1)*4;var keySchedule=[];for(var k=0;k<keySize;k++){keySchedule[k]=keyWords[k];}for(k=keySize;k<ksRows;k++){var t=keySchedule[k-1];if(k%keySize===0){t=t<<8|t>>>24;t=G.SBOX[t>>>24]<<24|G.SBOX[t>>>16&0xff]<<16|G.SBOX[t>>>8&0xff]<<8|G.SBOX[t&0xff];t^=RCON[k/keySize|0]<<24;}else if(keySize>6&&k%keySize===4){t=G.SBOX[t>>>24]<<24|G.SBOX[t>>>16&0xff]<<16|G.SBOX[t>>>8&0xff]<<8|G.SBOX[t&0xff];}keySchedule[k]=keySchedule[k-keySize]^t;}var invKeySchedule=[];for(var ik=0;ik<ksRows;ik++){var ksR=ksRows-ik;var tt=keySchedule[ksR-(ik%4?0:4)];if(ik<4||ksR<=4){invKeySchedule[ik]=tt;}else{invKeySchedule[ik]=G.INV_SUB_MIX[0][G.SBOX[tt>>>24]]^G.INV_SUB_MIX[1][G.SBOX[tt>>>16&0xff]]^G.INV_SUB_MIX[2][G.SBOX[tt>>>8&0xff]]^G.INV_SUB_MIX[3][G.SBOX[tt&0xff]];}}this._nRounds=nRounds;this._keySchedule=keySchedule;this._invKeySchedule=invKeySchedule;};AES.prototype.encryptBlockRaw=function(M){M=asUInt32Array(M);return cryptBlock(M,this._keySchedule,G.SUB_MIX,G.SBOX,this._nRounds);};AES.prototype.encryptBlock=function(M){var out=this.encryptBlockRaw(M);var buf=Buffer.allocUnsafe(16);buf.writeUInt32BE(out[0],0);buf.writeUInt32BE(out[1],4);buf.writeUInt32BE(out[2],8);buf.writeUInt32BE(out[3],12);return buf;};AES.prototype.decryptBlock=function(M){M=asUInt32Array(M);// swap
var m1=M[1];M[1]=M[3];M[3]=m1;var out=cryptBlock(M,this._invKeySchedule,G.INV_SUB_MIX,G.INV_SBOX,this._nRounds);var buf=Buffer.allocUnsafe(16);buf.writeUInt32BE(out[0],0);buf.writeUInt32BE(out[3],4);buf.writeUInt32BE(out[2],8);buf.writeUInt32BE(out[1],12);return buf;};AES.prototype.scrub=function(){scrubVec(this._keySchedule);scrubVec(this._invKeySchedule);scrubVec(this._key);};module.exports.AES=AES;/***/},/* 37 *//***/function(module,exports,__webpack_require__){"use strict";var curve=exports;curve.base=__webpack_require__(181);curve.short=__webpack_require__(182);curve.mont=__webpack_require__(183);curve.edwards=__webpack_require__(184);/***/},/* 38 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var asn1=__webpack_require__(200);var aesid=__webpack_require__(212);var fixProc=__webpack_require__(213);var ciphers=__webpack_require__(50);var compat=__webpack_require__(77);module.exports=parseKeys;function parseKeys(buffer){var password;if((typeof buffer==='undefined'?'undefined':(0,_typeof3.default)(buffer))==='object'&&!Buffer.isBuffer(buffer)){password=buffer.passphrase;buffer=buffer.key;}if(typeof buffer==='string'){buffer=new Buffer(buffer);}var stripped=fixProc(buffer,password);var type=stripped.tag;var data=stripped.data;var subtype,ndata;switch(type){case'CERTIFICATE':ndata=asn1.certificate.decode(data,'der').tbsCertificate.subjectPublicKeyInfo;// falls through
case'PUBLIC KEY':if(!ndata){ndata=asn1.PublicKey.decode(data,'der');}subtype=ndata.algorithm.algorithm.join('.');switch(subtype){case'1.2.840.113549.1.1.1':return asn1.RSAPublicKey.decode(ndata.subjectPublicKey.data,'der');case'1.2.840.10045.2.1':ndata.subjectPrivateKey=ndata.subjectPublicKey;return{type:'ec',data:ndata};case'1.2.840.10040.4.1':ndata.algorithm.params.pub_key=asn1.DSAparam.decode(ndata.subjectPublicKey.data,'der');return{type:'dsa',data:ndata.algorithm.params};default:throw new Error('unknown key id '+subtype);}throw new Error('unknown key type '+type);case'ENCRYPTED PRIVATE KEY':data=asn1.EncryptedPrivateKey.decode(data,'der');data=decrypt(data,password);// falls through
case'PRIVATE KEY':ndata=asn1.PrivateKey.decode(data,'der');subtype=ndata.algorithm.algorithm.join('.');switch(subtype){case'1.2.840.113549.1.1.1':return asn1.RSAPrivateKey.decode(ndata.subjectPrivateKey,'der');case'1.2.840.10045.2.1':return{curve:ndata.algorithm.curve,privateKey:asn1.ECPrivateKey.decode(ndata.subjectPrivateKey,'der').privateKey};case'1.2.840.10040.4.1':ndata.algorithm.params.priv_key=asn1.DSAparam.decode(ndata.subjectPrivateKey,'der');return{type:'dsa',params:ndata.algorithm.params};default:throw new Error('unknown key id '+subtype);}throw new Error('unknown key type '+type);case'RSA PUBLIC KEY':return asn1.RSAPublicKey.decode(data,'der');case'RSA PRIVATE KEY':return asn1.RSAPrivateKey.decode(data,'der');case'DSA PRIVATE KEY':return{type:'dsa',params:asn1.DSAPrivateKey.decode(data,'der')};case'EC PRIVATE KEY':data=asn1.ECPrivateKey.decode(data,'der');return{curve:data.parameters.value,privateKey:data.privateKey};default:throw new Error('unknown key type '+type);}}parseKeys.signature=asn1.signature;function decrypt(data,password){var salt=data.algorithm.decrypt.kde.kdeparams.salt;var iters=parseInt(data.algorithm.decrypt.kde.kdeparams.iters.toString(),10);var algo=aesid[data.algorithm.decrypt.cipher.algo.join('.')];var iv=data.algorithm.decrypt.cipher.iv;var cipherText=data.subjectPrivateKey;var keylen=parseInt(algo.split('-')[1],10)/8;var key=compat.pbkdf2Sync(password,salt,iters,keylen);var cipher=ciphers.createDecipheriv(algo,key,iv);var out=[];out.push(cipher.update(cipherText));out.push(cipher.final());return Buffer.concat(out);}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 39 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(setImmediate,process){/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=onFinished;module.exports.isFinished=isFinished;/**
 * Module dependencies.
 * @private
 */var first=__webpack_require__(114);/**
 * Variables.
 * @private
 *//* istanbul ignore next */var defer=typeof setImmediate==='function'?setImmediate:function(fn){process.nextTick(fn.bind.apply(fn,arguments));};/**
 * Invoke callback when the response has finished, useful for
 * cleaning up resources afterwards.
 *
 * @param {object} msg
 * @param {function} listener
 * @return {object}
 * @public
 */function onFinished(msg,listener){if(isFinished(msg)!==false){defer(listener,null,msg);return msg;}// attach the listener to the message
attachListener(msg,listener);return msg;}/**
 * Determine if message is already finished.
 *
 * @param {object} msg
 * @return {boolean}
 * @public
 */function isFinished(msg){var socket=msg.socket;if(typeof msg.finished==='boolean'){// OutgoingMessage
return Boolean(msg.finished||socket&&!socket.writable);}if(typeof msg.complete==='boolean'){// IncomingMessage
return Boolean(msg.upgrade||!socket||!socket.readable||msg.complete&&!msg.readable);}// don't know
return undefined;}/**
 * Attach a finished listener to the message.
 *
 * @param {object} msg
 * @param {function} callback
 * @private
 */function attachFinishedListener(msg,callback){var eeMsg;var eeSocket;var finished=false;function onFinish(error){eeMsg.cancel();eeSocket.cancel();finished=true;callback(error);}// finished on first message event
eeMsg=eeSocket=first([[msg,'end','finish']],onFinish);function onSocket(socket){// remove listener
msg.removeListener('socket',onSocket);if(finished)return;if(eeMsg!==eeSocket)return;// finished on first socket event
eeSocket=first([[socket,'error','close']],onFinish);}if(msg.socket){// socket already assigned
onSocket(msg.socket);return;}// wait for socket to be assigned
msg.on('socket',onSocket);if(msg.socket===undefined){// node.js 0.8 patch
patchAssignSocket(msg,onSocket);}}/**
 * Attach the listener to the message.
 *
 * @param {object} msg
 * @return {function}
 * @private
 */function attachListener(msg,listener){var attached=msg.__onFinished;// create a private single listener with queue
if(!attached||!attached.queue){attached=msg.__onFinished=createListener(msg);attachFinishedListener(msg,attached);}attached.queue.push(listener);}/**
 * Create listener on message.
 *
 * @param {object} msg
 * @return {function}
 * @private
 */function createListener(msg){function listener(err){if(msg.__onFinished===listener)msg.__onFinished=null;if(!listener.queue)return;var queue=listener.queue;listener.queue=null;for(var i=0;i<queue.length;i++){queue[i](err,msg);}}listener.queue=[];return listener;}/**
 * Patch ServerResponse.prototype.assignSocket for node.js 0.8.
 *
 * @param {ServerResponse} res
 * @param {function} callback
 * @private
 */function patchAssignSocket(res,callback){var assignSocket=res.assignSocket;if(typeof assignSocket!=='function')return;// res.on('socket', callback) is broken in 0.8
res.assignSocket=function _assignSocket(socket){assignSocket.call(this,socket);callback(socket);};}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(18).setImmediate,__webpack_require__(4));/***/},/* 40 *//***/function(module,exports,__webpack_require__){"use strict";// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var punycode=__webpack_require__(115);var util=__webpack_require__(116);exports.parse=urlParse;exports.resolve=urlResolve;exports.resolveObject=urlResolveObject;exports.format=urlFormat;exports.Url=Url;function Url(){this.protocol=null;this.slashes=null;this.auth=null;this.host=null;this.port=null;this.hostname=null;this.hash=null;this.search=null;this.query=null;this.pathname=null;this.path=null;this.href=null;}// Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,// Special case for a simple path URL
simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,// RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims=['<','>','"','`',' ','\r','\n','\t'],// RFC 2396: characters not allowed for various reasons.
unwise=['{','}','|','\\','^','`'].concat(delims),// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape=['\''].concat(unwise),// Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars=['%','/','?',';','#'].concat(autoEscape),hostEndingChars=['/','?','#'],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,// protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol={'javascript':true,'javascript:':true},// protocols that never have a hostname.
hostlessProtocol={'javascript':true,'javascript:':true},// protocols that always contain a // bit.
slashedProtocol={'http':true,'https':true,'ftp':true,'gopher':true,'file':true,'http:':true,'https:':true,'ftp:':true,'gopher:':true,'file:':true},querystring=__webpack_require__(57);function urlParse(url,parseQueryString,slashesDenoteHost){if(url&&util.isObject(url)&&url instanceof Url)return url;var u=new Url();u.parse(url,parseQueryString,slashesDenoteHost);return u;}Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){if(!util.isString(url)){throw new TypeError("Parameter 'url' must be a string, not "+(typeof url==='undefined'?'undefined':(0,_typeof3.default)(url)));}// Copy chrome, IE, opera backslash-handling behavior.
// Back slashes before the query string get converted to forward slashes
// See: https://code.google.com/p/chromium/issues/detail?id=25916
var queryIndex=url.indexOf('?'),splitter=queryIndex!==-1&&queryIndex<url.indexOf('#')?'?':'#',uSplit=url.split(splitter),slashRegex=/\\/g;uSplit[0]=uSplit[0].replace(slashRegex,'/');url=uSplit.join(splitter);var rest=url;// trim before proceeding.
// This is to support parse stuff like "  http://foo.com  \n"
rest=rest.trim();if(!slashesDenoteHost&&url.split('#').length===1){// Try fast path regexp
var simplePath=simplePathPattern.exec(rest);if(simplePath){this.path=rest;this.href=rest;this.pathname=simplePath[1];if(simplePath[2]){this.search=simplePath[2];if(parseQueryString){this.query=querystring.parse(this.search.substr(1));}else{this.query=this.search.substr(1);}}else if(parseQueryString){this.search='';this.query={};}return this;}}var proto=protocolPattern.exec(rest);if(proto){proto=proto[0];var lowerProto=proto.toLowerCase();this.protocol=lowerProto;rest=rest.substr(proto.length);}// figure out if it's got a host
// user@server is *always* interpreted as a hostname, and url
// resolution will treat //foo/bar as host=foo,path=bar because that's
// how the browser resolves relative URLs.
if(slashesDenoteHost||proto||rest.match(/^\/\/[^@\/]+@[^@\/]+/)){var slashes=rest.substr(0,2)==='//';if(slashes&&!(proto&&hostlessProtocol[proto])){rest=rest.substr(2);this.slashes=true;}}if(!hostlessProtocol[proto]&&(slashes||proto&&!slashedProtocol[proto])){// there's a hostname.
// the first instance of /, ?, ;, or # ends the host.
//
// If there is an @ in the hostname, then non-host chars *are* allowed
// to the left of the last @ sign, unless some host-ending character
// comes *before* the @-sign.
// URLs are obnoxious.
//
// ex:
// http://a@b@c/ => user:a@b host:c
// http://a@b?@c => user:a host:c path:/?@c
// v0.12 TODO(isaacs): This is not quite how Chrome does things.
// Review our test case against browsers more comprehensively.
// find the first instance of any hostEndingChars
var hostEnd=-1;for(var i=0;i<hostEndingChars.length;i++){var hec=rest.indexOf(hostEndingChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd))hostEnd=hec;}// at this point, either we have an explicit point where the
// auth portion cannot go past, or the last @ char is the decider.
var auth,atSign;if(hostEnd===-1){// atSign can be anywhere.
atSign=rest.lastIndexOf('@');}else{// atSign must be in auth portion.
// http://a@b/c@d => host:b auth:a path:/c@d
atSign=rest.lastIndexOf('@',hostEnd);}// Now we have a portion which is definitely the auth.
// Pull that off.
if(atSign!==-1){auth=rest.slice(0,atSign);rest=rest.slice(atSign+1);this.auth=decodeURIComponent(auth);}// the host is the remaining to the left of the first non-host char
hostEnd=-1;for(var i=0;i<nonHostChars.length;i++){var hec=rest.indexOf(nonHostChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd))hostEnd=hec;}// if we still have not hit it, then the entire thing is a host.
if(hostEnd===-1)hostEnd=rest.length;this.host=rest.slice(0,hostEnd);rest=rest.slice(hostEnd);// pull out port.
this.parseHost();// we've indicated that there is a hostname,
// so even if it's empty, it has to be present.
this.hostname=this.hostname||'';// if hostname begins with [ and ends with ]
// assume that it's an IPv6 address.
var ipv6Hostname=this.hostname[0]==='['&&this.hostname[this.hostname.length-1]===']';// validate a little.
if(!ipv6Hostname){var hostparts=this.hostname.split(/\./);for(var i=0,l=hostparts.length;i<l;i++){var part=hostparts[i];if(!part)continue;if(!part.match(hostnamePartPattern)){var newpart='';for(var j=0,k=part.length;j<k;j++){if(part.charCodeAt(j)>127){// we replace non-ASCII char with a temporary placeholder
// we need this to make sure size of hostname is not
// broken by replacing non-ASCII by nothing
newpart+='x';}else{newpart+=part[j];}}// we test again with ASCII char only
if(!newpart.match(hostnamePartPattern)){var validParts=hostparts.slice(0,i);var notHost=hostparts.slice(i+1);var bit=part.match(hostnamePartStart);if(bit){validParts.push(bit[1]);notHost.unshift(bit[2]);}if(notHost.length){rest='/'+notHost.join('.')+rest;}this.hostname=validParts.join('.');break;}}}}if(this.hostname.length>hostnameMaxLen){this.hostname='';}else{// hostnames are always lower case.
this.hostname=this.hostname.toLowerCase();}if(!ipv6Hostname){// IDNA Support: Returns a punycoded representation of "domain".
// It only converts parts of the domain name that
// have non-ASCII characters, i.e. it doesn't matter if
// you call it with a domain that already is ASCII-only.
this.hostname=punycode.toASCII(this.hostname);}var p=this.port?':'+this.port:'';var h=this.hostname||'';this.host=h+p;this.href+=this.host;// strip [ and ] from the hostname
// the host field still retains them, though
if(ipv6Hostname){this.hostname=this.hostname.substr(1,this.hostname.length-2);if(rest[0]!=='/'){rest='/'+rest;}}}// now rest is set to the post-host stuff.
// chop off any delim chars.
if(!unsafeProtocol[lowerProto]){// First, make 100% sure that any "autoEscape" chars get
// escaped, even if encodeURIComponent doesn't think they
// need to be.
for(var i=0,l=autoEscape.length;i<l;i++){var ae=autoEscape[i];if(rest.indexOf(ae)===-1)continue;var esc=encodeURIComponent(ae);if(esc===ae){esc=escape(ae);}rest=rest.split(ae).join(esc);}}// chop off from the tail first.
var hash=rest.indexOf('#');if(hash!==-1){// got a fragment string.
this.hash=rest.substr(hash);rest=rest.slice(0,hash);}var qm=rest.indexOf('?');if(qm!==-1){this.search=rest.substr(qm);this.query=rest.substr(qm+1);if(parseQueryString){this.query=querystring.parse(this.query);}rest=rest.slice(0,qm);}else if(parseQueryString){// no query string, but parseQueryString still requested
this.search='';this.query={};}if(rest)this.pathname=rest;if(slashedProtocol[lowerProto]&&this.hostname&&!this.pathname){this.pathname='/';}//to support http.request
if(this.pathname||this.search){var p=this.pathname||'';var s=this.search||'';this.path=p+s;}// finally, reconstruct the href based on what has been validated.
this.href=this.format();return this;};// format a parsed object into a url string
function urlFormat(obj){// ensure it's an object, and not a string url.
// If it's an obj, this is a no-op.
// this way, you can call url_format() on strings
// to clean up potentially wonky urls.
if(util.isString(obj))obj=urlParse(obj);if(!(obj instanceof Url))return Url.prototype.format.call(obj);return obj.format();}Url.prototype.format=function(){var auth=this.auth||'';if(auth){auth=encodeURIComponent(auth);auth=auth.replace(/%3A/i,':');auth+='@';}var protocol=this.protocol||'',pathname=this.pathname||'',hash=this.hash||'',host=false,query='';if(this.host){host=auth+this.host;}else if(this.hostname){host=auth+(this.hostname.indexOf(':')===-1?this.hostname:'['+this.hostname+']');if(this.port){host+=':'+this.port;}}if(this.query&&util.isObject(this.query)&&(0,_keys2.default)(this.query).length){query=querystring.stringify(this.query);}var search=this.search||query&&'?'+query||'';if(protocol&&protocol.substr(-1)!==':')protocol+=':';// only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
// unless they had them to begin with.
if(this.slashes||(!protocol||slashedProtocol[protocol])&&host!==false){host='//'+(host||'');if(pathname&&pathname.charAt(0)!=='/')pathname='/'+pathname;}else if(!host){host='';}if(hash&&hash.charAt(0)!=='#')hash='#'+hash;if(search&&search.charAt(0)!=='?')search='?'+search;pathname=pathname.replace(/[?#]/g,function(match){return encodeURIComponent(match);});search=search.replace('#','%23');return protocol+host+pathname+search+hash;};function urlResolve(source,relative){return urlParse(source,false,true).resolve(relative);}Url.prototype.resolve=function(relative){return this.resolveObject(urlParse(relative,false,true)).format();};function urlResolveObject(source,relative){if(!source)return relative;return urlParse(source,false,true).resolveObject(relative);}Url.prototype.resolveObject=function(relative){if(util.isString(relative)){var rel=new Url();rel.parse(relative,false,true);relative=rel;}var result=new Url();var tkeys=(0,_keys2.default)(this);for(var tk=0;tk<tkeys.length;tk++){var tkey=tkeys[tk];result[tkey]=this[tkey];}// hash is always overridden, no matter what.
// even href="" will remove it.
result.hash=relative.hash;// if the relative url is empty, then there's nothing left to do here.
if(relative.href===''){result.href=result.format();return result;}// hrefs like //foo/bar always cut to the protocol.
if(relative.slashes&&!relative.protocol){// take everything except the protocol from relative
var rkeys=(0,_keys2.default)(relative);for(var rk=0;rk<rkeys.length;rk++){var rkey=rkeys[rk];if(rkey!=='protocol')result[rkey]=relative[rkey];}//urlParse appends trailing / to urls like http://www.example.com
if(slashedProtocol[result.protocol]&&result.hostname&&!result.pathname){result.path=result.pathname='/';}result.href=result.format();return result;}if(relative.protocol&&relative.protocol!==result.protocol){// if it's a known url protocol, then changing
// the protocol does weird things
// first, if it's not file:, then we MUST have a host,
// and if there was a path
// to begin with, then we MUST have a path.
// if it is file:, then the host is dropped,
// because that's known to be hostless.
// anything else is assumed to be absolute.
if(!slashedProtocol[relative.protocol]){var keys=(0,_keys2.default)(relative);for(var v=0;v<keys.length;v++){var k=keys[v];result[k]=relative[k];}result.href=result.format();return result;}result.protocol=relative.protocol;if(!relative.host&&!hostlessProtocol[relative.protocol]){var relPath=(relative.pathname||'').split('/');while(relPath.length&&!(relative.host=relPath.shift())){}if(!relative.host)relative.host='';if(!relative.hostname)relative.hostname='';if(relPath[0]!=='')relPath.unshift('');if(relPath.length<2)relPath.unshift('');result.pathname=relPath.join('/');}else{result.pathname=relative.pathname;}result.search=relative.search;result.query=relative.query;result.host=relative.host||'';result.auth=relative.auth;result.hostname=relative.hostname||relative.host;result.port=relative.port;// to support http.request
if(result.pathname||result.search){var p=result.pathname||'';var s=result.search||'';result.path=p+s;}result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;}var isSourceAbs=result.pathname&&result.pathname.charAt(0)==='/',isRelAbs=relative.host||relative.pathname&&relative.pathname.charAt(0)==='/',mustEndAbs=isRelAbs||isSourceAbs||result.host&&relative.pathname,removeAllDots=mustEndAbs,srcPath=result.pathname&&result.pathname.split('/')||[],relPath=relative.pathname&&relative.pathname.split('/')||[],psychotic=result.protocol&&!slashedProtocol[result.protocol];// if the url is a non-slashed url, then relative
// links like ../.. should be able
// to crawl up to the hostname, as well.  This is strange.
// result.protocol has already been set by now.
// Later on, put the first path part into the host field.
if(psychotic){result.hostname='';result.port=null;if(result.host){if(srcPath[0]==='')srcPath[0]=result.host;else srcPath.unshift(result.host);}result.host='';if(relative.protocol){relative.hostname=null;relative.port=null;if(relative.host){if(relPath[0]==='')relPath[0]=relative.host;else relPath.unshift(relative.host);}relative.host=null;}mustEndAbs=mustEndAbs&&(relPath[0]===''||srcPath[0]==='');}if(isRelAbs){// it's absolute.
result.host=relative.host||relative.host===''?relative.host:result.host;result.hostname=relative.hostname||relative.hostname===''?relative.hostname:result.hostname;result.search=relative.search;result.query=relative.query;srcPath=relPath;// fall through to the dot-handling below.
}else if(relPath.length){// it's relative
// throw away the existing file, and take the new path instead.
if(!srcPath)srcPath=[];srcPath.pop();srcPath=srcPath.concat(relPath);result.search=relative.search;result.query=relative.query;}else if(!util.isNullOrUndefined(relative.search)){// just pull out the search.
// like href='?foo'.
// Put this after the other two cases because it simplifies the booleans
if(psychotic){result.hostname=result.host=srcPath.shift();//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.host=result.hostname=authInHost.shift();}}result.search=relative.search;result.query=relative.query;//to support http.request
if(!util.isNull(result.pathname)||!util.isNull(result.search)){result.path=(result.pathname?result.pathname:'')+(result.search?result.search:'');}result.href=result.format();return result;}if(!srcPath.length){// no path at all.  easy.
// we've already handled the other stuff above.
result.pathname=null;//to support http.request
if(result.search){result.path='/'+result.search;}else{result.path=null;}result.href=result.format();return result;}// if a url ENDs in . or .., then it must get a trailing slash.
// however, if it ends in anything else non-slashy,
// then it must NOT get a trailing slash.
var last=srcPath.slice(-1)[0];var hasTrailingSlash=(result.host||relative.host||srcPath.length>1)&&(last==='.'||last==='..')||last==='';// strip single dots, resolve double dots to parent dir
// if the path tries to go above the root, `up` ends up > 0
var up=0;for(var i=srcPath.length;i>=0;i--){last=srcPath[i];if(last==='.'){srcPath.splice(i,1);}else if(last==='..'){srcPath.splice(i,1);up++;}else if(up){srcPath.splice(i,1);up--;}}// if the path is allowed to go above the root, restore leading ..s
if(!mustEndAbs&&!removeAllDots){for(;up--;up){srcPath.unshift('..');}}if(mustEndAbs&&srcPath[0]!==''&&(!srcPath[0]||srcPath[0].charAt(0)!=='/')){srcPath.unshift('');}if(hasTrailingSlash&&srcPath.join('/').substr(-1)!=='/'){srcPath.push('');}var isAbsolute=srcPath[0]===''||srcPath[0]&&srcPath[0].charAt(0)==='/';// put the host back
if(psychotic){result.hostname=result.host=isAbsolute?'':srcPath.length?srcPath.shift():'';//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.host=result.hostname=authInHost.shift();}}mustEndAbs=mustEndAbs||result.host&&srcPath.length;if(mustEndAbs&&!isAbsolute){srcPath.unshift('');}if(!srcPath.length){result.pathname=null;result.path=null;}else{result.pathname=srcPath.join('/');}//to support request.http
if(!util.isNull(result.pathname)||!util.isNull(result.search)){result.path=(result.pathname?result.pathname:'')+(result.search?result.search:'');}result.auth=relative.auth||result.auth;result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;};Url.prototype.parseHost=function(){var host=this.host;var port=portPattern.exec(host);if(port){port=port[0];if(port!==':'){this.port=port.substr(1);}host=host.substr(0,host.length-port.length);}if(host)this.hostname=host;};/***/},/* 41 *//***/function(module,exports){module.exports=function(module){if(!module.webpackPolyfill){module.deprecate=function(){};module.paths=[];// module.parent = undefined by default
if(!module.children)module.children=[];Object.defineProperty(module,"loaded",{enumerable:true,get:function get(){return module.l;}});Object.defineProperty(module,"id",{enumerable:true,get:function get(){return module.i;}});module.webpackPolyfill=1;}return module;};/***/},/* 42 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var http=__webpack_require__(122);/**
 * Module exports.
 * @public
 */module.exports=getCurrentNodeMethods()||getBasicNodeMethods();/**
 * Get the current Node.js methods.
 * @private
 */function getCurrentNodeMethods(){return http.METHODS&&http.METHODS.map(function lowerCaseMethod(method){return method.toLowerCase();});}/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */function getBasicNodeMethods(){return['get','post','put','head','delete','options','trace','copy','lock','mkcol','move','purge','propfind','proppatch','unlock','report','mkactivity','checkout','merge','m-search','notify','subscribe','unsubscribe','patch','search','connect'];}/***/},/* 43 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){var ClientRequest=__webpack_require__(128);var extend=__webpack_require__(135);var statusCodes=__webpack_require__(136);var url=__webpack_require__(40);var http=exports;http.request=function(opts,cb){if(typeof opts==='string')opts=url.parse(opts);else opts=extend(opts);// Normally, the page is loaded from http or https, so not specifying a protocol
// will result in a (valid) protocol-relative url. However, this won't work if
// the protocol is something else, like 'file:'
var defaultProtocol=global.location.protocol.search(/^https?:$/)===-1?'http:':'';var protocol=opts.protocol||defaultProtocol;var host=opts.hostname||opts.host;var port=opts.port;var path=opts.path||'/';// Necessary for IPv6 addresses
if(host&&host.indexOf(':')!==-1)host='['+host+']';// This may be a relative url. The browser should always be able to interpret it correctly.
opts.url=(host?protocol+'//'+host:'')+(port?':'+port:'')+path;opts.method=(opts.method||'GET').toUpperCase();opts.headers=opts.headers||{};// Also valid opts.auth, opts.mode
var req=new ClientRequest(opts);if(cb)req.on('response',cb);return req;};http.get=function get(opts,cb){var req=http.request(opts,cb);req.end();return req;};http.Agent=function(){};http.Agent.defaultMaxSockets=4;http.STATUS_CODES=statusCodes;http.METHODS=['CHECKOUT','CONNECT','COPY','DELETE','GET','HEAD','LOCK','M-SEARCH','MERGE','MKACTIVITY','MKCOL','MOVE','NOTIFY','OPTIONS','PATCH','POST','PROPFIND','PROPPATCH','PURGE','PUT','REPORT','SEARCH','SUBSCRIBE','TRACE','UNLOCK','UNSUBSCRIBE'];/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6));/***/},/* 44 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(process,setImmediate,global){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
/*<replacement>*/var processNextTick=__webpack_require__(34);/*</replacement>*/module.exports=Writable;/* <replacement> */function WriteReq(chunk,encoding,cb){this.chunk=chunk;this.encoding=encoding;this.callback=cb;this.next=null;}// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state){var _this=this;this.next=null;this.entry=null;this.finish=function(){onCorkedFinish(_this,state);};}/* </replacement> *//*<replacement>*/var asyncWrite=!process.browser&&['v0.10','v0.9.'].indexOf(process.version.slice(0,5))>-1?setImmediate:processNextTick;/*</replacement>*//*<replacement>*/var Duplex;/*</replacement>*/Writable.WritableState=WritableState;/*<replacement>*/var util=__webpack_require__(21);util.inherits=__webpack_require__(1);/*</replacement>*//*<replacement>*/var internalUtil={deprecate:__webpack_require__(132)};/*</replacement>*//*<replacement>*/var Stream=__webpack_require__(67);/*</replacement>*//*<replacement>*/var Buffer=__webpack_require__(3).Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk);}function _isUint8Array(obj){return Buffer.isBuffer(obj)||obj instanceof OurUint8Array;}/*</replacement>*/var destroyImpl=__webpack_require__(68);util.inherits(Writable,Stream);function nop(){}function WritableState(options,stream){Duplex=Duplex||__webpack_require__(13);options=options||{};// object stream flag to indicate whether or not this stream
// contains buffers or objects.
this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.writableObjectMode;// the point at which write() starts returning false
// Note: 0 is a valid value, means that we always return false if
// the entire buffer is not flushed immediately on write()
var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;// cast to ints.
this.highWaterMark=Math.floor(this.highWaterMark);// if _final has been called
this.finalCalled=false;// drain event flag.
this.needDrain=false;// at the start of calling end()
this.ending=false;// when end() has been called, and returned
this.ended=false;// when 'finish' is emitted
this.finished=false;// has it been destroyed
this.destroyed=false;// should we decode strings into buffers before passing to _write?
// this is here so that some node-core streams can optimize string
// handling at a lower level.
var noDecode=options.decodeStrings===false;this.decodeStrings=!noDecode;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// not an actual buffer we keep track of, but a measurement
// of how much we're waiting to get pushed to some underlying
// socket or file.
this.length=0;// a flag to see when we're in the middle of a write.
this.writing=false;// when true all writes will be buffered until .uncork() call
this.corked=0;// a flag to be able to tell if the onwrite cb is called immediately,
// or on a later tick.  We set this to true at first, because any
// actions that shouldn't happen until "later" should generally also
// not happen before the first write call.
this.sync=true;// a flag to know if we're processing previously buffered items, which
// may call the _write() callback in the same tick, so that we don't
// end up in an overlapped onwrite situation.
this.bufferProcessing=false;// the callback that's passed to _write(chunk,cb)
this.onwrite=function(er){onwrite(stream,er);};// the callback that the user supplies to write(chunk,encoding,cb)
this.writecb=null;// the amount that is being written when _write is called.
this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;// number of pending user-supplied write callbacks
// this must be 0 before 'finish' can be emitted
this.pendingcb=0;// emit prefinish if the only thing we're waiting for is _write cbs
// This is relevant for synchronous Transform streams
this.prefinished=false;// True if the error was already emitted and should not be thrown again
this.errorEmitted=false;// count buffered requests
this.bufferedRequestCount=0;// allocate the first CorkedRequest, there is always
// one allocated and free to use, and we maintain at most two
this.corkedRequestsFree=new CorkedRequest(this);}WritableState.prototype.getBuffer=function getBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next;}return out;};(function(){try{Object.defineProperty(WritableState.prototype,'buffer',{get:internalUtil.deprecate(function(){return this.getBuffer();},'_writableState.buffer is deprecated. Use _writableState.getBuffer '+'instead.','DEP0003')});}catch(_){}})();// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;if(typeof _symbol2.default==='function'&&_hasInstance2.default&&typeof Function.prototype[_hasInstance2.default]==='function'){realHasInstance=Function.prototype[_hasInstance2.default];(0,_defineProperty2.default)(Writable,_hasInstance2.default,{value:function value(object){if(realHasInstance.call(this,object))return true;return object&&object._writableState instanceof WritableState;}});}else{realHasInstance=function realHasInstance(object){return object instanceof this;};}function Writable(options){Duplex=Duplex||__webpack_require__(13);// Writable ctor is applied to Duplexes, too.
// `realHasInstance` is necessary because using plain `instanceof`
// would return false, as no `_writableState` property is attached.
// Trying to use the custom `instanceof` for Writable here will also break the
// Node.js LazyTransform implementation, which has a non-trivial getter for
// `_writableState` that would lead to infinite recursion.
if(!realHasInstance.call(Writable,this)&&!(this instanceof Duplex)){return new Writable(options);}this._writableState=new WritableState(options,this);// legacy.
this.writable=true;if(options){if(typeof options.write==='function')this._write=options.write;if(typeof options.writev==='function')this._writev=options.writev;if(typeof options.destroy==='function')this._destroy=options.destroy;if(typeof options.final==='function')this._final=options.final;}Stream.call(this);}// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe=function(){this.emit('error',new Error('Cannot pipe, not readable'));};function writeAfterEnd(stream,cb){var er=new Error('write after end');// TODO: defer error events consistently everywhere, not just the cb
stream.emit('error',er);processNextTick(cb,er);}// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream,state,chunk,cb){var valid=true;var er=false;if(chunk===null){er=new TypeError('May not write null values to stream');}else if(typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new TypeError('Invalid non-string/buffer chunk');}if(er){stream.emit('error',er);processNextTick(cb,er);valid=false;}return valid;}Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=false;var isBuf=_isUint8Array(chunk)&&!state.objectMode;if(isBuf&&!Buffer.isBuffer(chunk)){chunk=_uint8ArrayToBuffer(chunk);}if(typeof encoding==='function'){cb=encoding;encoding=null;}if(isBuf)encoding='buffer';else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=='function')cb=nop;if(state.ended)writeAfterEnd(this,cb);else if(isBuf||validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,isBuf,chunk,encoding,cb);}return ret;};Writable.prototype.cork=function(){var state=this._writableState;state.corked++;};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.finished&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state);}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){// node::ParseEncoding() requires lower case.
if(typeof encoding==='string')encoding=encoding.toLowerCase();if(!(['hex','utf8','utf-8','ascii','binary','base64','ucs2','ucs-2','utf16le','utf-16le','raw'].indexOf((encoding+'').toLowerCase())>-1))throw new TypeError('Unknown encoding: '+encoding);this._writableState.defaultEncoding=encoding;return this;};function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==='string'){chunk=Buffer.from(chunk,encoding);}return chunk;}// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream,state,isBuf,chunk,encoding,cb){if(!isBuf){var newChunk=decodeChunk(state,chunk,encoding);if(chunk!==newChunk){isBuf=true;encoding='buffer';chunk=newChunk;}}var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;// we must ensure that previous needDrain will not be reset to false.
if(!ret)state.needDrain=true;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest={chunk:chunk,encoding:encoding,isBuf:isBuf,callback:cb,next:null};if(last){last.next=state.lastBufferedRequest;}else{state.bufferedRequest=state.lastBufferedRequest;}state.bufferedRequestCount+=1;}else{doWrite(stream,state,false,len,chunk,encoding,cb);}return ret;}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=true;state.sync=true;if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=false;}function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync){// defer the callback if we are being called synchronously
// to avoid piling up things on the stack
processNextTick(cb,er);// this can emit finish, and it will always happen
// after error
processNextTick(finishMaybe,stream,state);stream._writableState.errorEmitted=true;stream.emit('error',er);}else{// the caller expect this to happen before if
// it is async
cb(er);stream._writableState.errorEmitted=true;stream.emit('error',er);// this can emit finish, but finish must
// always follow error
finishMaybe(stream,state);}}function onwriteStateUpdate(state){state.writing=false;state.writecb=null;state.length-=state.writelen;state.writelen=0;}function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else{// Check if we're actually ready to finish, but don't emit yet
var finished=needFinish(state);if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state);}if(sync){/*<replacement>*/asyncWrite(afterWrite,stream,state,finished,cb);/*</replacement>*/}else{afterWrite(stream,state,finished,cb);}}}function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state);}// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=false;stream.emit('drain');}}// if there's something in the buffer waiting, then process it
function clearBuffer(stream,state){state.bufferProcessing=true;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){// Fast case, write everything using _writev()
var l=state.bufferedRequestCount;var buffer=new Array(l);var holder=state.corkedRequestsFree;holder.entry=entry;var count=0;var allBuffers=true;while(entry){buffer[count]=entry;if(!entry.isBuf)allBuffers=false;entry=entry.next;count+=1;}buffer.allBuffers=allBuffers;doWrite(stream,state,true,state.length,buffer,'',holder.finish);// doWrite is almost always async, defer these to save a bit of time
// as the hot path ends with doWrite
state.pendingcb++;state.lastBufferedRequest=null;if(holder.next){state.corkedRequestsFree=holder.next;holder.next=null;}else{state.corkedRequestsFree=new CorkedRequest(state);}}else{// Slow case, write chunks one-by-one
while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,false,len,chunk,encoding,cb);entry=entry.next;// if we didn't call the onwrite immediately, then
// it means that we need to wait until it does.
// also, that means that the chunk and cb are currently
// being processed, so move the buffer counter past them.
if(state.writing){break;}}if(entry===null)state.lastBufferedRequest=null;}state.bufferedRequestCount=0;state.bufferedRequest=entry;state.bufferProcessing=false;}Writable.prototype._write=function(chunk,encoding,cb){cb(new Error('_write() is not implemented'));};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==='function'){cb=chunk;chunk=null;encoding=null;}else if(typeof encoding==='function'){cb=encoding;encoding=null;}if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);// .end() fully uncorks
if(state.corked){state.corked=1;this.uncork();}// ignore unnecessary end() calls.
if(!state.ending&&!state.finished)endWritable(this,state,cb);};function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing;}function callFinal(stream,state){stream._final(function(err){state.pendingcb--;if(err){stream.emit('error',err);}state.prefinished=true;stream.emit('prefinish');finishMaybe(stream,state);});}function prefinish(stream,state){if(!state.prefinished&&!state.finalCalled){if(typeof stream._final==='function'){state.pendingcb++;state.finalCalled=true;processNextTick(callFinal,stream,state);}else{state.prefinished=true;stream.emit('prefinish');}}}function finishMaybe(stream,state){var need=needFinish(state);if(need){prefinish(stream,state);if(state.pendingcb===0){state.finished=true;stream.emit('finish');}}return need;}function endWritable(stream,state,cb){state.ending=true;finishMaybe(stream,state);if(cb){if(state.finished)processNextTick(cb);else stream.once('finish',cb);}state.ended=true;stream.writable=false;}function onCorkedFinish(corkReq,state,err){var entry=corkReq.entry;corkReq.entry=null;while(entry){var cb=entry.callback;state.pendingcb--;cb(err);entry=entry.next;}if(state.corkedRequestsFree){state.corkedRequestsFree.next=corkReq;}else{state.corkedRequestsFree=corkReq;}}Object.defineProperty(Writable.prototype,'destroyed',{get:function get(){if(this._writableState===undefined){return false;}return this._writableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(!this._writableState){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._writableState.destroyed=value;}});Writable.prototype.destroy=destroyImpl.destroy;Writable.prototype._undestroy=destroyImpl.undestroy;Writable.prototype._destroy=function(err,cb){this.end();cb(err);};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4),__webpack_require__(18).setImmediate,__webpack_require__(6));/***/},/* 45 *//***/function(module,exports,__webpack_require__){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var Buffer=__webpack_require__(0).Buffer;var isBufferEncoding=Buffer.isEncoding||function(encoding){switch(encoding&&encoding.toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':case'raw':return true;default:return false;}};function assertEncoding(encoding){if(encoding&&!isBufferEncoding(encoding)){throw new Error('Unknown encoding: '+encoding);}}// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder=exports.StringDecoder=function(encoding){this.encoding=(encoding||'utf8').toLowerCase().replace(/[-_]/,'');assertEncoding(encoding);switch(this.encoding){case'utf8':// CESU-8 represents each of Surrogate Pair by 3-bytes
this.surrogateSize=3;break;case'ucs2':case'utf16le':// UTF-16 represents each of Surrogate Pair by 2-bytes
this.surrogateSize=2;this.detectIncompleteChar=utf16DetectIncompleteChar;break;case'base64':// Base-64 stores 3 bytes in 4 chars, and pads the remainder.
this.surrogateSize=3;this.detectIncompleteChar=base64DetectIncompleteChar;break;default:this.write=passThroughWrite;return;}// Enough space to store all bytes of a single character. UTF-8 needs 4
// bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
this.charBuffer=new Buffer(6);// Number of bytes received for the current incomplete multi-byte character.
this.charReceived=0;// Number of bytes expected for the current incomplete multi-byte character.
this.charLength=0;};// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write=function(buffer){var charStr='';// if our last write ended with an incomplete multibyte character
while(this.charLength){// determine how many remaining bytes this buffer has to offer for this char
var available=buffer.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:buffer.length;// add the new bytes to the char buffer
buffer.copy(this.charBuffer,this.charReceived,0,available);this.charReceived+=available;if(this.charReceived<this.charLength){// still not enough chars in this buffer? wait for more ...
return'';}// remove bytes belonging to the current character from the buffer
buffer=buffer.slice(available,buffer.length);// get the character that was split
charStr=this.charBuffer.slice(0,this.charLength).toString(this.encoding);// CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
var charCode=charStr.charCodeAt(charStr.length-1);if(charCode>=0xD800&&charCode<=0xDBFF){this.charLength+=this.surrogateSize;charStr='';continue;}this.charReceived=this.charLength=0;// if there are no more bytes in this buffer, just emit our char
if(buffer.length===0){return charStr;}break;}// determine and set charLength / charReceived
this.detectIncompleteChar(buffer);var end=buffer.length;if(this.charLength){// buffer the incomplete character bytes we got
buffer.copy(this.charBuffer,0,buffer.length-this.charReceived,end);end-=this.charReceived;}charStr+=buffer.toString(this.encoding,0,end);var end=charStr.length-1;var charCode=charStr.charCodeAt(end);// CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
if(charCode>=0xD800&&charCode<=0xDBFF){var size=this.surrogateSize;this.charLength+=size;this.charReceived+=size;this.charBuffer.copy(this.charBuffer,size,0,size);buffer.copy(this.charBuffer,0,0,size);return charStr.substring(0,end);}// or just emit the charStr
return charStr;};// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar=function(buffer){// determine how many bytes we have to check at the end of this buffer
var i=buffer.length>=3?3:buffer.length;// Figure out if one of the last i bytes of our buffer announces an
// incomplete char.
for(;i>0;i--){var c=buffer[buffer.length-i];// See http://en.wikipedia.org/wiki/UTF-8#Description
// 110XXXXX
if(i==1&&c>>5==0x06){this.charLength=2;break;}// 1110XXXX
if(i<=2&&c>>4==0x0E){this.charLength=3;break;}// 11110XXX
if(i<=3&&c>>3==0x1E){this.charLength=4;break;}}this.charReceived=i;};StringDecoder.prototype.end=function(buffer){var res='';if(buffer&&buffer.length)res=this.write(buffer);if(this.charReceived){var cr=this.charReceived;var buf=this.charBuffer;var enc=this.encoding;res+=buf.slice(0,cr).toString(enc);}return res;};function passThroughWrite(buffer){return buffer.toString(this.encoding);}function utf16DetectIncompleteChar(buffer){this.charReceived=buffer.length%2;this.charLength=this.charReceived?2:0;}function base64DetectIncompleteChar(buffer){this.charReceived=buffer.length%3;this.charLength=this.charReceived?3:0;}/***/},/* 46 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){/*!
 * send
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var createError=__webpack_require__(138);var debug=__webpack_require__(11)('send');var deprecate=__webpack_require__(12)('send');var destroy=__webpack_require__(139);var encodeUrl=__webpack_require__(28);var escapeHtml=__webpack_require__(29);var etag=__webpack_require__(71);var EventEmitter=__webpack_require__(17).EventEmitter;var fresh=__webpack_require__(100);var fs=__webpack_require__(!function webpackMissingModule(){var e=new Error("Cannot find module \"fs\"");e.code='MODULE_NOT_FOUND';throw e;}());var mime=__webpack_require__(219);var ms=__webpack_require__(56);var onFinished=__webpack_require__(39);var parseRange=__webpack_require__(101);var path=__webpack_require__(9);var statuses=__webpack_require__(30);var Stream=__webpack_require__(15);var util=__webpack_require__(221);/**
 * Path function references.
 * @private
 */var extname=path.extname;var join=path.join;var normalize=path.normalize;var resolve=path.resolve;var sep=path.sep;/**
 * Regular expression for identifying a bytes Range header.
 * @private
 */var BYTES_RANGE_REGEXP=/^ *bytes=/;/**
 * Simple expression to split token list.
 * @private
 */var TOKEN_LIST_REGEXP=/ *, */;/**
 * Maximum value allowed for the max age.
 * @private
 */var MAX_MAXAGE=60*60*24*365*1000;// 1 year
/**
 * Regular expression to match a path with a directory up component.
 * @private
 */var UP_PATH_REGEXP=/(?:^|[\\/])\.\.(?:[\\/]|$)/;/**
 * Module exports.
 * @public
 */module.exports=send;module.exports.mime=mime;/**
 * Shim EventEmitter.listenerCount for node.js < 0.10
 *//* istanbul ignore next */var listenerCount=EventEmitter.listenerCount||function(emitter,type){return emitter.listeners(type).length;};/**
 * Return a `SendStream` for `req` and `path`.
 *
 * @param {object} req
 * @param {string} path
 * @param {object} [options]
 * @return {SendStream}
 * @public
 */function send(req,path,options){return new SendStream(req,path,options);}/**
 * Initialize a `SendStream` with the given `path`.
 *
 * @param {Request} req
 * @param {String} path
 * @param {object} [options]
 * @private
 */function SendStream(req,path,options){Stream.call(this);var opts=options||{};this.options=opts;this.path=path;this.req=req;this._acceptRanges=opts.acceptRanges!==undefined?Boolean(opts.acceptRanges):true;this._cacheControl=opts.cacheControl!==undefined?Boolean(opts.cacheControl):true;this._etag=opts.etag!==undefined?Boolean(opts.etag):true;this._dotfiles=opts.dotfiles!==undefined?opts.dotfiles:'ignore';if(this._dotfiles!=='ignore'&&this._dotfiles!=='allow'&&this._dotfiles!=='deny'){throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"');}this._hidden=Boolean(opts.hidden);if(opts.hidden!==undefined){deprecate('hidden: use dotfiles: \''+(this._hidden?'allow':'ignore')+'\' instead');}// legacy support
if(opts.dotfiles===undefined){this._dotfiles=undefined;}this._extensions=opts.extensions!==undefined?normalizeList(opts.extensions,'extensions option'):[];this._index=opts.index!==undefined?normalizeList(opts.index,'index option'):['index.html'];this._lastModified=opts.lastModified!==undefined?Boolean(opts.lastModified):true;this._maxage=opts.maxAge||opts.maxage;this._maxage=typeof this._maxage==='string'?ms(this._maxage):Number(this._maxage);this._maxage=!isNaN(this._maxage)?Math.min(Math.max(0,this._maxage),MAX_MAXAGE):0;this._root=opts.root?resolve(opts.root):null;if(!this._root&&opts.from){this.from(opts.from);}}/**
 * Inherits from `Stream`.
 */util.inherits(SendStream,Stream);/**
 * Enable or disable etag generation.
 *
 * @param {Boolean} val
 * @return {SendStream}
 * @api public
 */SendStream.prototype.etag=deprecate.function(function etag(val){this._etag=Boolean(val);debug('etag %s',this._etag);return this;},'send.etag: pass etag as option');/**
 * Enable or disable "hidden" (dot) files.
 *
 * @param {Boolean} path
 * @return {SendStream}
 * @api public
 */SendStream.prototype.hidden=deprecate.function(function hidden(val){this._hidden=Boolean(val);this._dotfiles=undefined;debug('hidden %s',this._hidden);return this;},'send.hidden: use dotfiles option');/**
 * Set index `paths`, set to a falsy
 * value to disable index support.
 *
 * @param {String|Boolean|Array} paths
 * @return {SendStream}
 * @api public
 */SendStream.prototype.index=deprecate.function(function index(paths){var index=!paths?[]:normalizeList(paths,'paths argument');debug('index %o',paths);this._index=index;return this;},'send.index: pass index as option');/**
 * Set root `path`.
 *
 * @param {String} path
 * @return {SendStream}
 * @api public
 */SendStream.prototype.root=function root(path){this._root=resolve(String(path));debug('root %s',this._root);return this;};SendStream.prototype.from=deprecate.function(SendStream.prototype.root,'send.from: pass root as option');SendStream.prototype.root=deprecate.function(SendStream.prototype.root,'send.root: pass root as option');/**
 * Set max-age to `maxAge`.
 *
 * @param {Number} maxAge
 * @return {SendStream}
 * @api public
 */SendStream.prototype.maxage=deprecate.function(function maxage(maxAge){this._maxage=typeof maxAge==='string'?ms(maxAge):Number(maxAge);this._maxage=!isNaN(this._maxage)?Math.min(Math.max(0,this._maxage),MAX_MAXAGE):0;debug('max-age %d',this._maxage);return this;},'send.maxage: pass maxAge as option');/**
 * Emit error with `status`.
 *
 * @param {number} status
 * @param {Error} [err]
 * @private
 */SendStream.prototype.error=function error(status,err){// emit if listeners instead of responding
if(listenerCount(this,'error')!==0){return this.emit('error',createError(status,err,{expose:false}));}var res=this.res;var msg=statuses[status]||String(status);var doc=createHtmlDocument('Error',escapeHtml(msg));// clear existing headers
clearHeaders(res);// add error headers
if(err&&err.headers){setHeaders(res,err.headers);}// send basic response
res.statusCode=status;res.setHeader('Content-Type','text/html; charset=UTF-8');res.setHeader('Content-Length',Buffer.byteLength(doc));res.setHeader('Content-Security-Policy',"default-src 'self'");res.setHeader('X-Content-Type-Options','nosniff');res.end(doc);};/**
 * Check if the pathname ends with "/".
 *
 * @return {boolean}
 * @private
 */SendStream.prototype.hasTrailingSlash=function hasTrailingSlash(){return this.path[this.path.length-1]==='/';};/**
 * Check if this is a conditional GET request.
 *
 * @return {Boolean}
 * @api private
 */SendStream.prototype.isConditionalGET=function isConditionalGET(){return this.req.headers['if-match']||this.req.headers['if-unmodified-since']||this.req.headers['if-none-match']||this.req.headers['if-modified-since'];};/**
 * Check if the request preconditions failed.
 *
 * @return {boolean}
 * @private
 */SendStream.prototype.isPreconditionFailure=function isPreconditionFailure(){var req=this.req;var res=this.res;// if-match
var match=req.headers['if-match'];if(match){var etag=res.getHeader('ETag');return!etag||match!=='*'&&match.split(TOKEN_LIST_REGEXP).every(function(match){return match!==etag&&match!=='W/'+etag&&'W/'+match!==etag;});}// if-unmodified-since
var unmodifiedSince=parseHttpDate(req.headers['if-unmodified-since']);if(!isNaN(unmodifiedSince)){var lastModified=parseHttpDate(res.getHeader('Last-Modified'));return isNaN(lastModified)||lastModified>unmodifiedSince;}return false;};/**
 * Strip content-* header fields.
 *
 * @private
 */SendStream.prototype.removeContentHeaderFields=function removeContentHeaderFields(){var res=this.res;var headers=getHeaderNames(res);for(var i=0;i<headers.length;i++){var header=headers[i];if(header.substr(0,8)==='content-'&&header!=='content-location'){res.removeHeader(header);}}};/**
 * Respond with 304 not modified.
 *
 * @api private
 */SendStream.prototype.notModified=function notModified(){var res=this.res;debug('not modified');this.removeContentHeaderFields();res.statusCode=304;res.end();};/**
 * Raise error that headers already sent.
 *
 * @api private
 */SendStream.prototype.headersAlreadySent=function headersAlreadySent(){var err=new Error('Can\'t set headers after they are sent.');debug('headers already sent');this.error(500,err);};/**
 * Check if the request is cacheable, aka
 * responded with 2xx or 304 (see RFC 2616 section 14.2{5,6}).
 *
 * @return {Boolean}
 * @api private
 */SendStream.prototype.isCachable=function isCachable(){var statusCode=this.res.statusCode;return statusCode>=200&&statusCode<300||statusCode===304;};/**
 * Handle stat() error.
 *
 * @param {Error} error
 * @private
 */SendStream.prototype.onStatError=function onStatError(error){switch(error.code){case'ENAMETOOLONG':case'ENOENT':case'ENOTDIR':this.error(404,error);break;default:this.error(500,error);break;}};/**
 * Check if the cache is fresh.
 *
 * @return {Boolean}
 * @api private
 */SendStream.prototype.isFresh=function isFresh(){return fresh(this.req.headers,{'etag':this.res.getHeader('ETag'),'last-modified':this.res.getHeader('Last-Modified')});};/**
 * Check if the range is fresh.
 *
 * @return {Boolean}
 * @api private
 */SendStream.prototype.isRangeFresh=function isRangeFresh(){var ifRange=this.req.headers['if-range'];if(!ifRange){return true;}// if-range as etag
if(ifRange.indexOf('"')!==-1){var etag=this.res.getHeader('ETag');return Boolean(etag&&ifRange.indexOf(etag)!==-1);}// if-range as modified date
var lastModified=this.res.getHeader('Last-Modified');return parseHttpDate(lastModified)<=parseHttpDate(ifRange);};/**
 * Redirect to path.
 *
 * @param {string} path
 * @private
 */SendStream.prototype.redirect=function redirect(path){var res=this.res;if(listenerCount(this,'directory')!==0){this.emit('directory',res,path);return;}if(this.hasTrailingSlash()){this.error(403);return;}var loc=encodeUrl(collapseLeadingSlashes(this.path+'/'));var doc=createHtmlDocument('Redirecting','Redirecting to <a href="'+escapeHtml(loc)+'">'+escapeHtml(loc)+'</a>');// redirect
res.statusCode=301;res.setHeader('Content-Type','text/html; charset=UTF-8');res.setHeader('Content-Length',Buffer.byteLength(doc));res.setHeader('Content-Security-Policy',"default-src 'self'");res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Location',loc);res.end(doc);};/**
 * Pipe to `res.
 *
 * @param {Stream} res
 * @return {Stream} res
 * @api public
 */SendStream.prototype.pipe=function pipe(res){// root path
var root=this._root;// references
this.res=res;// decode the path
var path=decode(this.path);if(path===-1){this.error(400);return res;}// null byte(s)
if(~path.indexOf('\0')){this.error(400);return res;}var parts;if(root!==null){// malicious path
if(UP_PATH_REGEXP.test(normalize('.'+sep+path))){debug('malicious path "%s"',path);this.error(403);return res;}// join / normalize from optional root dir
path=normalize(join(root,path));root=normalize(root+sep);// explode path parts
parts=path.substr(root.length).split(sep);}else{// ".." is malicious without "root"
if(UP_PATH_REGEXP.test(path)){debug('malicious path "%s"',path);this.error(403);return res;}// explode path parts
parts=normalize(path).split(sep);// resolve the path
path=resolve(path);}// dotfile handling
if(containsDotFile(parts)){var access=this._dotfiles;// legacy support
if(access===undefined){access=parts[parts.length-1][0]==='.'?this._hidden?'allow':'ignore':'allow';}debug('%s dotfile "%s"',access,path);switch(access){case'allow':break;case'deny':this.error(403);return res;case'ignore':default:this.error(404);return res;}}// index file support
if(this._index.length&&this.hasTrailingSlash()){this.sendIndex(path);return res;}this.sendFile(path);return res;};/**
 * Transfer `path`.
 *
 * @param {String} path
 * @api public
 */SendStream.prototype.send=function send(path,stat){var len=stat.size;var options=this.options;var opts={};var res=this.res;var req=this.req;var ranges=req.headers.range;var offset=options.start||0;if(headersSent(res)){// impossible to send now
this.headersAlreadySent();return;}debug('pipe "%s"',path);// set header fields
this.setHeader(path,stat);// set content-type
this.type(path);// conditional GET support
if(this.isConditionalGET()){if(this.isPreconditionFailure()){this.error(412);return;}if(this.isCachable()&&this.isFresh()){this.notModified();return;}}// adjust len to start/end options
len=Math.max(0,len-offset);if(options.end!==undefined){var bytes=options.end-offset+1;if(len>bytes)len=bytes;}// Range support
if(this._acceptRanges&&BYTES_RANGE_REGEXP.test(ranges)){// parse
ranges=parseRange(len,ranges,{combine:true});// If-Range support
if(!this.isRangeFresh()){debug('range stale');ranges=-2;}// unsatisfiable
if(ranges===-1){debug('range unsatisfiable');// Content-Range
res.setHeader('Content-Range',contentRange('bytes',len));// 416 Requested Range Not Satisfiable
return this.error(416,{headers:{'Content-Range':res.getHeader('Content-Range')}});}// valid (syntactically invalid/multiple ranges are treated as a regular response)
if(ranges!==-2&&ranges.length===1){debug('range %j',ranges);// Content-Range
res.statusCode=206;res.setHeader('Content-Range',contentRange('bytes',len,ranges[0]));// adjust for requested range
offset+=ranges[0].start;len=ranges[0].end-ranges[0].start+1;}}// clone options
for(var prop in options){opts[prop]=options[prop];}// set read options
opts.start=offset;opts.end=Math.max(offset,offset+len-1);// content-length
res.setHeader('Content-Length',len);// HEAD support
if(req.method==='HEAD'){res.end();return;}this.stream(path,opts);};/**
 * Transfer file for `path`.
 *
 * @param {String} path
 * @api private
 */SendStream.prototype.sendFile=function sendFile(path){var i=0;var self=this;debug('stat "%s"',path);fs.stat(path,function onstat(err,stat){if(err&&err.code==='ENOENT'&&!extname(path)&&path[path.length-1]!==sep){// not found, check extensions
return next(err);}if(err)return self.onStatError(err);if(stat.isDirectory())return self.redirect(path);self.emit('file',path,stat);self.send(path,stat);});function next(err){if(self._extensions.length<=i){return err?self.onStatError(err):self.error(404);}var p=path+'.'+self._extensions[i++];debug('stat "%s"',p);fs.stat(p,function(err,stat){if(err)return next(err);if(stat.isDirectory())return next();self.emit('file',p,stat);self.send(p,stat);});}};/**
 * Transfer index for `path`.
 *
 * @param {String} path
 * @api private
 */SendStream.prototype.sendIndex=function sendIndex(path){var i=-1;var self=this;function next(err){if(++i>=self._index.length){if(err)return self.onStatError(err);return self.error(404);}var p=join(path,self._index[i]);debug('stat "%s"',p);fs.stat(p,function(err,stat){if(err)return next(err);if(stat.isDirectory())return next();self.emit('file',p,stat);self.send(p,stat);});}next();};/**
 * Stream `path` to the response.
 *
 * @param {String} path
 * @param {Object} options
 * @api private
 */SendStream.prototype.stream=function stream(path,options){// TODO: this is all lame, refactor meeee
var finished=false;var self=this;var res=this.res;// pipe
var stream=fs.createReadStream(path,options);this.emit('stream',stream);stream.pipe(res);// response finished, done with the fd
onFinished(res,function onfinished(){finished=true;destroy(stream);});// error handling code-smell
stream.on('error',function onerror(err){// request already finished
if(finished)return;// clean up stream
finished=true;destroy(stream);// error
self.onStatError(err);});// end
stream.on('end',function onend(){self.emit('end');});};/**
 * Set content-type based on `path`
 * if it hasn't been explicitly set.
 *
 * @param {String} path
 * @api private
 */SendStream.prototype.type=function type(path){var res=this.res;if(res.getHeader('Content-Type'))return;var type=mime.lookup(path);if(!type){debug('no content-type');return;}var charset=mime.charsets.lookup(type);debug('content-type %s',type);res.setHeader('Content-Type',type+(charset?'; charset='+charset:''));};/**
 * Set response header fields, most
 * fields may be pre-defined.
 *
 * @param {String} path
 * @param {Object} stat
 * @api private
 */SendStream.prototype.setHeader=function setHeader(path,stat){var res=this.res;this.emit('headers',res,path,stat);if(this._acceptRanges&&!res.getHeader('Accept-Ranges')){debug('accept ranges');res.setHeader('Accept-Ranges','bytes');}if(this._cacheControl&&!res.getHeader('Cache-Control')){var cacheControl='public, max-age='+Math.floor(this._maxage/1000);debug('cache-control %s',cacheControl);res.setHeader('Cache-Control',cacheControl);}if(this._lastModified&&!res.getHeader('Last-Modified')){var modified=stat.mtime.toUTCString();debug('modified %s',modified);res.setHeader('Last-Modified',modified);}if(this._etag&&!res.getHeader('ETag')){var val=etag(stat);debug('etag %s',val);res.setHeader('ETag',val);}};/**
 * Clear all headers from a response.
 *
 * @param {object} res
 * @private
 */function clearHeaders(res){var headers=getHeaderNames(res);for(var i=0;i<headers.length;i++){res.removeHeader(headers[i]);}}/**
 * Collapse all leading slashes into a single slash
 *
 * @param {string} str
 * @private
 */function collapseLeadingSlashes(str){for(var i=0;i<str.length;i++){if(str[i]!=='/'){break;}}return i>1?'/'+str.substr(i):str;}/**
 * Determine if path parts contain a dotfile.
 *
 * @api private
 */function containsDotFile(parts){for(var i=0;i<parts.length;i++){if(parts[i][0]==='.'){return true;}}return false;}/**
 * Create a Content-Range header.
 *
 * @param {string} type
 * @param {number} size
 * @param {array} [range]
 */function contentRange(type,size,range){return type+' '+(range?range.start+'-'+range.end:'*')+'/'+size;}/**
 * Create a minimal HTML document.
 *
 * @param {string} title
 * @param {string} body
 * @private
 */function createHtmlDocument(title,body){return'<!DOCTYPE html>\n'+'<html lang="en">\n'+'<head>\n'+'<meta charset="utf-8">\n'+'<title>'+title+'</title>\n'+'</head>\n'+'<body>\n'+'<pre>'+body+'</pre>\n'+'</body>\n';}/**
 * decodeURIComponent.
 *
 * Allows V8 to only deoptimize this fn instead of all
 * of send().
 *
 * @param {String} path
 * @api private
 */function decode(path){try{return decodeURIComponent(path);}catch(err){return-1;}}/**
 * Get the header names on a respnse.
 *
 * @param {object} res
 * @returns {array[string]}
 * @private
 */function getHeaderNames(res){return typeof res.getHeaderNames!=='function'?(0,_keys2.default)(res._headers||{}):res.getHeaderNames();}/**
 * Determine if the response headers have been sent.
 *
 * @param {object} res
 * @returns {boolean}
 * @private
 */function headersSent(res){return typeof res.headersSent!=='boolean'?Boolean(res._header):res.headersSent;}/**
 * Normalize the index option into an array.
 *
 * @param {boolean|string|array} val
 * @param {string} name
 * @private
 */function normalizeList(val,name){var list=[].concat(val||[]);for(var i=0;i<list.length;i++){if(typeof list[i]!=='string'){throw new TypeError(name+' must be array of strings or false');}}return list;}/**
 * Parse an HTTP Date into a number.
 *
 * @param {string} date
 * @private
 */function parseHttpDate(date){var timestamp=date&&Date.parse(date);return typeof timestamp==='number'?timestamp:NaN;}/**
 * Set an object of headers on a response.
 *
 * @param {object} res
 * @param {object} headers
 * @private
 */function setHeaders(res,headers){var keys=(0,_keys2.default)(headers);for(var i=0;i<keys.length;i++){var key=keys[i];res.setHeader(key,headers[key]);}}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 47 *//***/function(module,exports,__webpack_require__){"use strict";/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */var makeHash=__webpack_require__(144);/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */function core_md5(x,len){/* append padding */x[len>>5]|=0x80<<len%32;x[(len+64>>>9<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}return[a,b,c,d];}/*
 * These functions implement the four basic operations the algorithm uses.
 */function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn(b&c|~b&d,a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn(b&d|c&~d,a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|~d),a,b,x,s,t);}/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&0xFFFF;}/*
 * Bitwise rotate a 32-bit number to the left.
 */function bit_rol(num,cnt){return num<<cnt|num>>>32-cnt;}module.exports=function md5(buf){return makeHash(buf,core_md5);};/***/},/* 48 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){var inherits=__webpack_require__(1);var HashBase=__webpack_require__(145);function RIPEMD160(){HashBase.call(this,64);// state
this._a=0x67452301;this._b=0xefcdab89;this._c=0x98badcfe;this._d=0x10325476;this._e=0xc3d2e1f0;}inherits(RIPEMD160,HashBase);RIPEMD160.prototype._update=function(){var m=new Array(16);for(var i=0;i<16;++i){m[i]=this._block.readInt32LE(i*4);}var al=this._a;var bl=this._b;var cl=this._c;var dl=this._d;var el=this._e;// Mj = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
// K = 0x00000000
// Sj = 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8
al=fn1(al,bl,cl,dl,el,m[0],0x00000000,11);cl=rotl(cl,10);el=fn1(el,al,bl,cl,dl,m[1],0x00000000,14);bl=rotl(bl,10);dl=fn1(dl,el,al,bl,cl,m[2],0x00000000,15);al=rotl(al,10);cl=fn1(cl,dl,el,al,bl,m[3],0x00000000,12);el=rotl(el,10);bl=fn1(bl,cl,dl,el,al,m[4],0x00000000,5);dl=rotl(dl,10);al=fn1(al,bl,cl,dl,el,m[5],0x00000000,8);cl=rotl(cl,10);el=fn1(el,al,bl,cl,dl,m[6],0x00000000,7);bl=rotl(bl,10);dl=fn1(dl,el,al,bl,cl,m[7],0x00000000,9);al=rotl(al,10);cl=fn1(cl,dl,el,al,bl,m[8],0x00000000,11);el=rotl(el,10);bl=fn1(bl,cl,dl,el,al,m[9],0x00000000,13);dl=rotl(dl,10);al=fn1(al,bl,cl,dl,el,m[10],0x00000000,14);cl=rotl(cl,10);el=fn1(el,al,bl,cl,dl,m[11],0x00000000,15);bl=rotl(bl,10);dl=fn1(dl,el,al,bl,cl,m[12],0x00000000,6);al=rotl(al,10);cl=fn1(cl,dl,el,al,bl,m[13],0x00000000,7);el=rotl(el,10);bl=fn1(bl,cl,dl,el,al,m[14],0x00000000,9);dl=rotl(dl,10);al=fn1(al,bl,cl,dl,el,m[15],0x00000000,8);cl=rotl(cl,10);// Mj = 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8
// K = 0x5a827999
// Sj = 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12
el=fn2(el,al,bl,cl,dl,m[7],0x5a827999,7);bl=rotl(bl,10);dl=fn2(dl,el,al,bl,cl,m[4],0x5a827999,6);al=rotl(al,10);cl=fn2(cl,dl,el,al,bl,m[13],0x5a827999,8);el=rotl(el,10);bl=fn2(bl,cl,dl,el,al,m[1],0x5a827999,13);dl=rotl(dl,10);al=fn2(al,bl,cl,dl,el,m[10],0x5a827999,11);cl=rotl(cl,10);el=fn2(el,al,bl,cl,dl,m[6],0x5a827999,9);bl=rotl(bl,10);dl=fn2(dl,el,al,bl,cl,m[15],0x5a827999,7);al=rotl(al,10);cl=fn2(cl,dl,el,al,bl,m[3],0x5a827999,15);el=rotl(el,10);bl=fn2(bl,cl,dl,el,al,m[12],0x5a827999,7);dl=rotl(dl,10);al=fn2(al,bl,cl,dl,el,m[0],0x5a827999,12);cl=rotl(cl,10);el=fn2(el,al,bl,cl,dl,m[9],0x5a827999,15);bl=rotl(bl,10);dl=fn2(dl,el,al,bl,cl,m[5],0x5a827999,9);al=rotl(al,10);cl=fn2(cl,dl,el,al,bl,m[2],0x5a827999,11);el=rotl(el,10);bl=fn2(bl,cl,dl,el,al,m[14],0x5a827999,7);dl=rotl(dl,10);al=fn2(al,bl,cl,dl,el,m[11],0x5a827999,13);cl=rotl(cl,10);el=fn2(el,al,bl,cl,dl,m[8],0x5a827999,12);bl=rotl(bl,10);// Mj = 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12
// K = 0x6ed9eba1
// Sj = 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5
dl=fn3(dl,el,al,bl,cl,m[3],0x6ed9eba1,11);al=rotl(al,10);cl=fn3(cl,dl,el,al,bl,m[10],0x6ed9eba1,13);el=rotl(el,10);bl=fn3(bl,cl,dl,el,al,m[14],0x6ed9eba1,6);dl=rotl(dl,10);al=fn3(al,bl,cl,dl,el,m[4],0x6ed9eba1,7);cl=rotl(cl,10);el=fn3(el,al,bl,cl,dl,m[9],0x6ed9eba1,14);bl=rotl(bl,10);dl=fn3(dl,el,al,bl,cl,m[15],0x6ed9eba1,9);al=rotl(al,10);cl=fn3(cl,dl,el,al,bl,m[8],0x6ed9eba1,13);el=rotl(el,10);bl=fn3(bl,cl,dl,el,al,m[1],0x6ed9eba1,15);dl=rotl(dl,10);al=fn3(al,bl,cl,dl,el,m[2],0x6ed9eba1,14);cl=rotl(cl,10);el=fn3(el,al,bl,cl,dl,m[7],0x6ed9eba1,8);bl=rotl(bl,10);dl=fn3(dl,el,al,bl,cl,m[0],0x6ed9eba1,13);al=rotl(al,10);cl=fn3(cl,dl,el,al,bl,m[6],0x6ed9eba1,6);el=rotl(el,10);bl=fn3(bl,cl,dl,el,al,m[13],0x6ed9eba1,5);dl=rotl(dl,10);al=fn3(al,bl,cl,dl,el,m[11],0x6ed9eba1,12);cl=rotl(cl,10);el=fn3(el,al,bl,cl,dl,m[5],0x6ed9eba1,7);bl=rotl(bl,10);dl=fn3(dl,el,al,bl,cl,m[12],0x6ed9eba1,5);al=rotl(al,10);// Mj = 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2
// K = 0x8f1bbcdc
// Sj = 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12
cl=fn4(cl,dl,el,al,bl,m[1],0x8f1bbcdc,11);el=rotl(el,10);bl=fn4(bl,cl,dl,el,al,m[9],0x8f1bbcdc,12);dl=rotl(dl,10);al=fn4(al,bl,cl,dl,el,m[11],0x8f1bbcdc,14);cl=rotl(cl,10);el=fn4(el,al,bl,cl,dl,m[10],0x8f1bbcdc,15);bl=rotl(bl,10);dl=fn4(dl,el,al,bl,cl,m[0],0x8f1bbcdc,14);al=rotl(al,10);cl=fn4(cl,dl,el,al,bl,m[8],0x8f1bbcdc,15);el=rotl(el,10);bl=fn4(bl,cl,dl,el,al,m[12],0x8f1bbcdc,9);dl=rotl(dl,10);al=fn4(al,bl,cl,dl,el,m[4],0x8f1bbcdc,8);cl=rotl(cl,10);el=fn4(el,al,bl,cl,dl,m[13],0x8f1bbcdc,9);bl=rotl(bl,10);dl=fn4(dl,el,al,bl,cl,m[3],0x8f1bbcdc,14);al=rotl(al,10);cl=fn4(cl,dl,el,al,bl,m[7],0x8f1bbcdc,5);el=rotl(el,10);bl=fn4(bl,cl,dl,el,al,m[15],0x8f1bbcdc,6);dl=rotl(dl,10);al=fn4(al,bl,cl,dl,el,m[14],0x8f1bbcdc,8);cl=rotl(cl,10);el=fn4(el,al,bl,cl,dl,m[5],0x8f1bbcdc,6);bl=rotl(bl,10);dl=fn4(dl,el,al,bl,cl,m[6],0x8f1bbcdc,5);al=rotl(al,10);cl=fn4(cl,dl,el,al,bl,m[2],0x8f1bbcdc,12);el=rotl(el,10);// Mj = 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
// K = 0xa953fd4e
// Sj = 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
bl=fn5(bl,cl,dl,el,al,m[4],0xa953fd4e,9);dl=rotl(dl,10);al=fn5(al,bl,cl,dl,el,m[0],0xa953fd4e,15);cl=rotl(cl,10);el=fn5(el,al,bl,cl,dl,m[5],0xa953fd4e,5);bl=rotl(bl,10);dl=fn5(dl,el,al,bl,cl,m[9],0xa953fd4e,11);al=rotl(al,10);cl=fn5(cl,dl,el,al,bl,m[7],0xa953fd4e,6);el=rotl(el,10);bl=fn5(bl,cl,dl,el,al,m[12],0xa953fd4e,8);dl=rotl(dl,10);al=fn5(al,bl,cl,dl,el,m[2],0xa953fd4e,13);cl=rotl(cl,10);el=fn5(el,al,bl,cl,dl,m[10],0xa953fd4e,12);bl=rotl(bl,10);dl=fn5(dl,el,al,bl,cl,m[14],0xa953fd4e,5);al=rotl(al,10);cl=fn5(cl,dl,el,al,bl,m[1],0xa953fd4e,12);el=rotl(el,10);bl=fn5(bl,cl,dl,el,al,m[3],0xa953fd4e,13);dl=rotl(dl,10);al=fn5(al,bl,cl,dl,el,m[8],0xa953fd4e,14);cl=rotl(cl,10);el=fn5(el,al,bl,cl,dl,m[11],0xa953fd4e,11);bl=rotl(bl,10);dl=fn5(dl,el,al,bl,cl,m[6],0xa953fd4e,8);al=rotl(al,10);cl=fn5(cl,dl,el,al,bl,m[15],0xa953fd4e,5);el=rotl(el,10);bl=fn5(bl,cl,dl,el,al,m[13],0xa953fd4e,6);dl=rotl(dl,10);var ar=this._a;var br=this._b;var cr=this._c;var dr=this._d;var er=this._e;// M'j = 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12
// K' = 0x50a28be6
// S'j = 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6
ar=fn5(ar,br,cr,dr,er,m[5],0x50a28be6,8);cr=rotl(cr,10);er=fn5(er,ar,br,cr,dr,m[14],0x50a28be6,9);br=rotl(br,10);dr=fn5(dr,er,ar,br,cr,m[7],0x50a28be6,9);ar=rotl(ar,10);cr=fn5(cr,dr,er,ar,br,m[0],0x50a28be6,11);er=rotl(er,10);br=fn5(br,cr,dr,er,ar,m[9],0x50a28be6,13);dr=rotl(dr,10);ar=fn5(ar,br,cr,dr,er,m[2],0x50a28be6,15);cr=rotl(cr,10);er=fn5(er,ar,br,cr,dr,m[11],0x50a28be6,15);br=rotl(br,10);dr=fn5(dr,er,ar,br,cr,m[4],0x50a28be6,5);ar=rotl(ar,10);cr=fn5(cr,dr,er,ar,br,m[13],0x50a28be6,7);er=rotl(er,10);br=fn5(br,cr,dr,er,ar,m[6],0x50a28be6,7);dr=rotl(dr,10);ar=fn5(ar,br,cr,dr,er,m[15],0x50a28be6,8);cr=rotl(cr,10);er=fn5(er,ar,br,cr,dr,m[8],0x50a28be6,11);br=rotl(br,10);dr=fn5(dr,er,ar,br,cr,m[1],0x50a28be6,14);ar=rotl(ar,10);cr=fn5(cr,dr,er,ar,br,m[10],0x50a28be6,14);er=rotl(er,10);br=fn5(br,cr,dr,er,ar,m[3],0x50a28be6,12);dr=rotl(dr,10);ar=fn5(ar,br,cr,dr,er,m[12],0x50a28be6,6);cr=rotl(cr,10);// M'j = 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2
// K' = 0x5c4dd124
// S'j = 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11
er=fn4(er,ar,br,cr,dr,m[6],0x5c4dd124,9);br=rotl(br,10);dr=fn4(dr,er,ar,br,cr,m[11],0x5c4dd124,13);ar=rotl(ar,10);cr=fn4(cr,dr,er,ar,br,m[3],0x5c4dd124,15);er=rotl(er,10);br=fn4(br,cr,dr,er,ar,m[7],0x5c4dd124,7);dr=rotl(dr,10);ar=fn4(ar,br,cr,dr,er,m[0],0x5c4dd124,12);cr=rotl(cr,10);er=fn4(er,ar,br,cr,dr,m[13],0x5c4dd124,8);br=rotl(br,10);dr=fn4(dr,er,ar,br,cr,m[5],0x5c4dd124,9);ar=rotl(ar,10);cr=fn4(cr,dr,er,ar,br,m[10],0x5c4dd124,11);er=rotl(er,10);br=fn4(br,cr,dr,er,ar,m[14],0x5c4dd124,7);dr=rotl(dr,10);ar=fn4(ar,br,cr,dr,er,m[15],0x5c4dd124,7);cr=rotl(cr,10);er=fn4(er,ar,br,cr,dr,m[8],0x5c4dd124,12);br=rotl(br,10);dr=fn4(dr,er,ar,br,cr,m[12],0x5c4dd124,7);ar=rotl(ar,10);cr=fn4(cr,dr,er,ar,br,m[4],0x5c4dd124,6);er=rotl(er,10);br=fn4(br,cr,dr,er,ar,m[9],0x5c4dd124,15);dr=rotl(dr,10);ar=fn4(ar,br,cr,dr,er,m[1],0x5c4dd124,13);cr=rotl(cr,10);er=fn4(er,ar,br,cr,dr,m[2],0x5c4dd124,11);br=rotl(br,10);// M'j = 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13
// K' = 0x6d703ef3
// S'j = 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5
dr=fn3(dr,er,ar,br,cr,m[15],0x6d703ef3,9);ar=rotl(ar,10);cr=fn3(cr,dr,er,ar,br,m[5],0x6d703ef3,7);er=rotl(er,10);br=fn3(br,cr,dr,er,ar,m[1],0x6d703ef3,15);dr=rotl(dr,10);ar=fn3(ar,br,cr,dr,er,m[3],0x6d703ef3,11);cr=rotl(cr,10);er=fn3(er,ar,br,cr,dr,m[7],0x6d703ef3,8);br=rotl(br,10);dr=fn3(dr,er,ar,br,cr,m[14],0x6d703ef3,6);ar=rotl(ar,10);cr=fn3(cr,dr,er,ar,br,m[6],0x6d703ef3,6);er=rotl(er,10);br=fn3(br,cr,dr,er,ar,m[9],0x6d703ef3,14);dr=rotl(dr,10);ar=fn3(ar,br,cr,dr,er,m[11],0x6d703ef3,12);cr=rotl(cr,10);er=fn3(er,ar,br,cr,dr,m[8],0x6d703ef3,13);br=rotl(br,10);dr=fn3(dr,er,ar,br,cr,m[12],0x6d703ef3,5);ar=rotl(ar,10);cr=fn3(cr,dr,er,ar,br,m[2],0x6d703ef3,14);er=rotl(er,10);br=fn3(br,cr,dr,er,ar,m[10],0x6d703ef3,13);dr=rotl(dr,10);ar=fn3(ar,br,cr,dr,er,m[0],0x6d703ef3,13);cr=rotl(cr,10);er=fn3(er,ar,br,cr,dr,m[4],0x6d703ef3,7);br=rotl(br,10);dr=fn3(dr,er,ar,br,cr,m[13],0x6d703ef3,5);ar=rotl(ar,10);// M'j = 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14
// K' = 0x7a6d76e9
// S'j = 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8
cr=fn2(cr,dr,er,ar,br,m[8],0x7a6d76e9,15);er=rotl(er,10);br=fn2(br,cr,dr,er,ar,m[6],0x7a6d76e9,5);dr=rotl(dr,10);ar=fn2(ar,br,cr,dr,er,m[4],0x7a6d76e9,8);cr=rotl(cr,10);er=fn2(er,ar,br,cr,dr,m[1],0x7a6d76e9,11);br=rotl(br,10);dr=fn2(dr,er,ar,br,cr,m[3],0x7a6d76e9,14);ar=rotl(ar,10);cr=fn2(cr,dr,er,ar,br,m[11],0x7a6d76e9,14);er=rotl(er,10);br=fn2(br,cr,dr,er,ar,m[15],0x7a6d76e9,6);dr=rotl(dr,10);ar=fn2(ar,br,cr,dr,er,m[0],0x7a6d76e9,14);cr=rotl(cr,10);er=fn2(er,ar,br,cr,dr,m[5],0x7a6d76e9,6);br=rotl(br,10);dr=fn2(dr,er,ar,br,cr,m[12],0x7a6d76e9,9);ar=rotl(ar,10);cr=fn2(cr,dr,er,ar,br,m[2],0x7a6d76e9,12);er=rotl(er,10);br=fn2(br,cr,dr,er,ar,m[13],0x7a6d76e9,9);dr=rotl(dr,10);ar=fn2(ar,br,cr,dr,er,m[9],0x7a6d76e9,12);cr=rotl(cr,10);er=fn2(er,ar,br,cr,dr,m[7],0x7a6d76e9,5);br=rotl(br,10);dr=fn2(dr,er,ar,br,cr,m[10],0x7a6d76e9,15);ar=rotl(ar,10);cr=fn2(cr,dr,er,ar,br,m[14],0x7a6d76e9,8);er=rotl(er,10);// M'j = 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
// K' = 0x00000000
// S'j = 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
br=fn1(br,cr,dr,er,ar,m[12],0x00000000,8);dr=rotl(dr,10);ar=fn1(ar,br,cr,dr,er,m[15],0x00000000,5);cr=rotl(cr,10);er=fn1(er,ar,br,cr,dr,m[10],0x00000000,12);br=rotl(br,10);dr=fn1(dr,er,ar,br,cr,m[4],0x00000000,9);ar=rotl(ar,10);cr=fn1(cr,dr,er,ar,br,m[1],0x00000000,12);er=rotl(er,10);br=fn1(br,cr,dr,er,ar,m[5],0x00000000,5);dr=rotl(dr,10);ar=fn1(ar,br,cr,dr,er,m[8],0x00000000,14);cr=rotl(cr,10);er=fn1(er,ar,br,cr,dr,m[7],0x00000000,6);br=rotl(br,10);dr=fn1(dr,er,ar,br,cr,m[6],0x00000000,8);ar=rotl(ar,10);cr=fn1(cr,dr,er,ar,br,m[2],0x00000000,13);er=rotl(er,10);br=fn1(br,cr,dr,er,ar,m[13],0x00000000,6);dr=rotl(dr,10);ar=fn1(ar,br,cr,dr,er,m[14],0x00000000,5);cr=rotl(cr,10);er=fn1(er,ar,br,cr,dr,m[0],0x00000000,15);br=rotl(br,10);dr=fn1(dr,er,ar,br,cr,m[3],0x00000000,13);ar=rotl(ar,10);cr=fn1(cr,dr,er,ar,br,m[9],0x00000000,11);er=rotl(er,10);br=fn1(br,cr,dr,er,ar,m[11],0x00000000,11);dr=rotl(dr,10);// change state
var t=this._b+cl+dr|0;this._b=this._c+dl+er|0;this._c=this._d+el+ar|0;this._d=this._e+al+br|0;this._e=this._a+bl+cr|0;this._a=t;};RIPEMD160.prototype._digest=function(){// create padding and handle blocks
this._block[this._blockOffset++]=0x80;if(this._blockOffset>56){this._block.fill(0,this._blockOffset,64);this._update();this._blockOffset=0;}this._block.fill(0,this._blockOffset,56);this._block.writeUInt32LE(this._length[0],56);this._block.writeUInt32LE(this._length[1],60);this._update();// produce result
var buffer=new Buffer(20);buffer.writeInt32LE(this._a,0);buffer.writeInt32LE(this._b,4);buffer.writeInt32LE(this._c,8);buffer.writeInt32LE(this._d,12);buffer.writeInt32LE(this._e,16);return buffer;};function rotl(x,n){return x<<n|x>>>32-n;}function fn1(a,b,c,d,e,m,k,s){return rotl(a+(b^c^d)+m+k|0,s)+e|0;}function fn2(a,b,c,d,e,m,k,s){return rotl(a+(b&c|~b&d)+m+k|0,s)+e|0;}function fn3(a,b,c,d,e,m,k,s){return rotl(a+((b|~c)^d)+m+k|0,s)+e|0;}function fn4(a,b,c,d,e,m,k,s){return rotl(a+(b&d|c&~d)+m+k|0,s)+e|0;}function fn5(a,b,c,d,e,m,k,s){return rotl(a+(b^(c|~d))+m+k|0,s)+e|0;}module.exports=RIPEMD160;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 49 *//***/function(module,exports,__webpack_require__){var exports=module.exports=function SHA(algorithm){algorithm=algorithm.toLowerCase();var Algorithm=exports[algorithm];if(!Algorithm)throw new Error(algorithm+' is not supported (we accept pull requests)');return new Algorithm();};exports.sha=__webpack_require__(146);exports.sha1=__webpack_require__(147);exports.sha224=__webpack_require__(148);exports.sha256=__webpack_require__(73);exports.sha384=__webpack_require__(149);exports.sha512=__webpack_require__(74);/***/},/* 50 *//***/function(module,exports,__webpack_require__){var ciphers=__webpack_require__(156);var deciphers=__webpack_require__(164);var modes=__webpack_require__(82);function getCiphers(){return(0,_keys2.default)(modes);}exports.createCipher=exports.Cipher=ciphers.createCipher;exports.createCipheriv=exports.Cipheriv=ciphers.createCipheriv;exports.createDecipher=exports.Decipher=deciphers.createDecipher;exports.createDecipheriv=exports.Decipheriv=deciphers.createDecipheriv;exports.listCiphers=exports.getCiphers=getCiphers;/***/},/* 51 *//***/function(module,exports,__webpack_require__){var modeModules={ECB:__webpack_require__(157),CBC:__webpack_require__(158),CFB:__webpack_require__(159),CFB8:__webpack_require__(160),CFB1:__webpack_require__(161),OFB:__webpack_require__(162),CTR:__webpack_require__(81),GCM:__webpack_require__(81)};var modes=__webpack_require__(82);for(var key in modes){modes[key].module=modeModules[modes[key].mode];}module.exports=modes;/***/},/* 52 *//***/function(module,exports,__webpack_require__){"use strict";exports.utils=__webpack_require__(166);exports.Cipher=__webpack_require__(167);exports.DES=__webpack_require__(168);exports.CBC=__webpack_require__(169);exports.EDE=__webpack_require__(170);/***/},/* 53 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var bn=__webpack_require__(2);var randomBytes=__webpack_require__(22);module.exports=crt;function blind(priv){var r=getr(priv);var blinder=r.toRed(bn.mont(priv.modulus)).redPow(new bn(priv.publicExponent)).fromRed();return{blinder:blinder,unblinder:r.invm(priv.modulus)};}function crt(msg,priv){var blinds=blind(priv);var len=priv.modulus.byteLength();var mod=bn.mont(priv.modulus);var blinded=new bn(msg).mul(blinds.blinder).umod(priv.modulus);var c1=blinded.toRed(bn.mont(priv.prime1));var c2=blinded.toRed(bn.mont(priv.prime2));var qinv=priv.coefficient;var p=priv.prime1;var q=priv.prime2;var m1=c1.redPow(priv.exponent1);var m2=c2.redPow(priv.exponent2);m1=m1.fromRed();m2=m2.fromRed();var h=m1.isub(m2).imul(qinv).umod(p);h.imul(q);m2.iadd(h);return new Buffer(m2.imul(blinds.unblinder).umod(priv.modulus).toArray(false,len));}crt.getr=getr;function getr(priv){var len=priv.modulus.byteLength();var r=new bn(randomBytes(len));while(r.cmp(priv.modulus)>=0||!r.umod(priv.prime1)||!r.umod(priv.prime2)){r=new bn(randomBytes(len));}return r;}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 54 *//***/function(module,exports,__webpack_require__){var hash=exports;hash.utils=__webpack_require__(8);hash.common=__webpack_require__(25);hash.sha=__webpack_require__(186);hash.ripemd=__webpack_require__(190);hash.hmac=__webpack_require__(191);// Proxy hash functions to the main object
hash.sha1=hash.sha.sha1;hash.sha256=hash.sha.sha256;hash.sha224=hash.sha.sha224;hash.sha384=hash.sha.sha384;hash.sha512=hash.sha.sha512;hash.ripemd160=hash.ripemd.ripemd160;/***/},/* 55 *//***/function(module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=='[object Array]';};/***/},/* 56 *//***/function(module,exports){/**
 * Helpers.
 */var s=1000;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */module.exports=function(val,options){options=options||{};var type=typeof val==='undefined'?'undefined':(0,_typeof3.default)(val);if(type==='string'&&val.length>0){return parse(val);}else if(type==='number'&&isNaN(val)===false){return options.long?fmtLong(val):fmtShort(val);}throw new Error('val is not a non-empty string or a valid number. val='+(0,_stringify2.default)(val));};/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */function parse(str){str=String(str);if(str.length>100){return;}var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match){return;}var n=parseFloat(match[1]);var type=(match[2]||'ms').toLowerCase();switch(type){case'years':case'year':case'yrs':case'yr':case'y':return n*y;case'days':case'day':case'd':return n*d;case'hours':case'hour':case'hrs':case'hr':case'h':return n*h;case'minutes':case'minute':case'mins':case'min':case'm':return n*m;case'seconds':case'second':case'secs':case'sec':case's':return n*s;case'milliseconds':case'millisecond':case'msecs':case'msec':case'ms':return n;default:return undefined;}}/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */function fmtShort(ms){if(ms>=d){return Math.round(ms/d)+'d';}if(ms>=h){return Math.round(ms/h)+'h';}if(ms>=m){return Math.round(ms/m)+'m';}if(ms>=s){return Math.round(ms/s)+'s';}return ms+'ms';}/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */function fmtLong(ms){return plural(ms,d,'day')||plural(ms,h,'hour')||plural(ms,m,'minute')||plural(ms,s,'second')||ms+' ms';}/**
 * Pluralization helper.
 */function plural(ms,n,name){if(ms<n){return;}if(ms<n*1.5){return Math.floor(ms/n)+' '+name;}return Math.ceil(ms/n)+' '+name+'s';}/***/},/* 57 *//***/function(module,exports,__webpack_require__){"use strict";exports.decode=exports.parse=__webpack_require__(117);exports.encode=exports.stringify=__webpack_require__(118);/***/},/* 58 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(setImmediate){/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var Route=__webpack_require__(59);var Layer=__webpack_require__(60);var methods=__webpack_require__(42);var mixin=__webpack_require__(32);var debug=__webpack_require__(11)('express:router');var deprecate=__webpack_require__(12)('express');var flatten=__webpack_require__(31);var parseUrl=__webpack_require__(19);var setPrototypeOf=__webpack_require__(33);/**
 * Module variables.
 * @private
 */var objectRegExp=/^\[object (\S+)\]$/;var slice=Array.prototype.slice;var toString=Object.prototype.toString;/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} options
 * @return {Router} which is an callable function
 * @public
 */var proto=module.exports=function(options){var opts=options||{};function router(req,res,next){router.handle(req,res,next);}// mixin Router class functions
setPrototypeOf(router,proto);router.params={};router._params=[];router.caseSensitive=opts.caseSensitive;router.mergeParams=opts.mergeParams;router.strict=opts.strict;router.stack=[];return router;};/**
 * Map the given param placeholder `name`(s) to the given callback.
 *
 * Parameter mapping is used to provide pre-conditions to routes
 * which use normalized placeholders. For example a _:user_id_ parameter
 * could automatically load a user's information from the database without
 * any additional code,
 *
 * The callback uses the same signature as middleware, the only difference
 * being that the value of the placeholder is passed, in this case the _id_
 * of the user. Once the `next()` function is invoked, just like middleware
 * it will continue on to execute the route, or subsequent parameter functions.
 *
 * Just like in middleware, you must either respond to the request or call next
 * to avoid stalling the request.
 *
 *  app.param('user_id', function(req, res, next, id){
 *    User.find(id, function(err, user){
 *      if (err) {
 *        return next(err);
 *      } else if (!user) {
 *        return next(new Error('failed to load user'));
 *      }
 *      req.user = user;
 *      next();
 *    });
 *  });
 *
 * @param {String} name
 * @param {Function} fn
 * @return {app} for chaining
 * @public
 */proto.param=function param(name,fn){// param logic
if(typeof name==='function'){deprecate('router.param(fn): Refactor to use path params');this._params.push(name);return;}// apply param functions
var params=this._params;var len=params.length;var ret;if(name[0]===':'){deprecate('router.param('+(0,_stringify2.default)(name)+', fn): Use router.param('+(0,_stringify2.default)(name.substr(1))+', fn) instead');name=name.substr(1);}for(var i=0;i<len;++i){if(ret=params[i](name,fn)){fn=ret;}}// ensure we end up with a
// middleware function
if('function'!==typeof fn){throw new Error('invalid param() call for '+name+', got '+fn);}(this.params[name]=this.params[name]||[]).push(fn);return this;};/**
 * Dispatch a req, res into the router.
 * @private
 */proto.handle=function handle(req,res,out){var self=this;debug('dispatching %s %s',req.method,req.url);var idx=0;var protohost=getProtohost(req.url)||'';var removed='';var slashAdded=false;var paramcalled={};// store options for OPTIONS request
// only used if OPTIONS request
var options=[];// middleware and routes
var stack=self.stack;// manage inter-router variables
var parentParams=req.params;var parentUrl=req.baseUrl||'';var done=restore(out,req,'baseUrl','next','params');// setup next layer
req.next=next;// for options requests, respond with a default if nothing else responds
if(req.method==='OPTIONS'){done=wrap(done,function(old,err){if(err||options.length===0)return old(err);sendOptionsResponse(res,options,old);});}// setup basic req values
req.baseUrl=parentUrl;req.originalUrl=req.originalUrl||req.url;next();function next(err){var layerError=err==='route'?null:err;// remove added slash
if(slashAdded){req.url=req.url.substr(1);slashAdded=false;}// restore altered req.url
if(removed.length!==0){req.baseUrl=parentUrl;req.url=protohost+removed+req.url.substr(protohost.length);removed='';}// signal to exit router
if(layerError==='router'){setImmediate(done,null);return;}// no more matching layers
if(idx>=stack.length){setImmediate(done,layerError);return;}// get pathname of request
var path=getPathname(req);if(path==null){return done(layerError);}// find next matching layer
var layer;var match;var route;while(match!==true&&idx<stack.length){layer=stack[idx++];match=matchLayer(layer,path);route=layer.route;if(typeof match!=='boolean'){// hold on to layerError
layerError=layerError||match;}if(match!==true){continue;}if(!route){// process non-route handlers normally
continue;}if(layerError){// routes do not match with a pending error
match=false;continue;}var method=req.method;var has_method=route._handles_method(method);// build up automatic options response
if(!has_method&&method==='OPTIONS'){appendMethods(options,route._options());}// don't even bother matching route
if(!has_method&&method!=='HEAD'){match=false;continue;}}// no match
if(match!==true){return done(layerError);}// store route for dispatch on change
if(route){req.route=route;}// Capture one-time layer values
req.params=self.mergeParams?mergeParams(layer.params,parentParams):layer.params;var layerPath=layer.path;// this should be done for the layer
self.process_params(layer,paramcalled,req,res,function(err){if(err){return next(layerError||err);}if(route){return layer.handle_request(req,res,next);}trim_prefix(layer,layerError,layerPath,path);});}function trim_prefix(layer,layerError,layerPath,path){if(layerPath.length!==0){// Validate path breaks on a path separator
var c=path[layerPath.length];if(c&&c!=='/'&&c!=='.')return next(layerError);// Trim off the part of the url that matches the route
// middleware (.use stuff) needs to have the path stripped
debug('trim prefix (%s) from url %s',layerPath,req.url);removed=layerPath;req.url=protohost+req.url.substr(protohost.length+removed.length);// Ensure leading slash
if(!protohost&&req.url[0]!=='/'){req.url='/'+req.url;slashAdded=true;}// Setup base URL (no trailing slash)
req.baseUrl=parentUrl+(removed[removed.length-1]==='/'?removed.substring(0,removed.length-1):removed);}debug('%s %s : %s',layer.name,layerPath,req.originalUrl);if(layerError){layer.handle_error(layerError,req,res,next);}else{layer.handle_request(req,res,next);}}};/**
 * Process any parameters for the layer.
 * @private
 */proto.process_params=function process_params(layer,called,req,res,done){var params=this.params;// captured parameters from the layer, keys and values
var keys=layer.keys;// fast track
if(!keys||keys.length===0){return done();}var i=0;var name;var paramIndex=0;var key;var paramVal;var paramCallbacks;var paramCalled;// process params in order
// param callbacks can be async
function param(err){if(err){return done(err);}if(i>=keys.length){return done();}paramIndex=0;key=keys[i++];name=key.name;paramVal=req.params[name];paramCallbacks=params[name];paramCalled=called[name];if(paramVal===undefined||!paramCallbacks){return param();}// param previously called with same value or error occurred
if(paramCalled&&(paramCalled.match===paramVal||paramCalled.error&&paramCalled.error!=='route')){// restore value
req.params[name]=paramCalled.value;// next param
return param(paramCalled.error);}called[name]=paramCalled={error:null,match:paramVal,value:paramVal};paramCallback();}// single param callbacks
function paramCallback(err){var fn=paramCallbacks[paramIndex++];// store updated value
paramCalled.value=req.params[key.name];if(err){// store error
paramCalled.error=err;param(err);return;}if(!fn)return param();try{fn(req,res,paramCallback,paramVal,key.name);}catch(e){paramCallback(e);}}param();};/**
 * Use the given middleware function, with optional path, defaulting to "/".
 *
 * Use (like `.all`) will run for any http METHOD, but it will not add
 * handlers for those methods so OPTIONS requests will not consider `.use`
 * functions even if they could respond.
 *
 * The other difference is that _route_ path is stripped and not visible
 * to the handler function. The main effect of this feature is that mounted
 * handlers can operate without any code changes regardless of the "prefix"
 * pathname.
 *
 * @public
 */proto.use=function use(fn){var offset=0;var path='/';// default path to '/'
// disambiguate router.use([fn])
if(typeof fn!=='function'){var arg=fn;while(Array.isArray(arg)&&arg.length!==0){arg=arg[0];}// first arg is the path
if(typeof arg!=='function'){offset=1;path=fn;}}var callbacks=flatten(slice.call(arguments,offset));if(callbacks.length===0){throw new TypeError('Router.use() requires middleware functions');}for(var i=0;i<callbacks.length;i++){var fn=callbacks[i];if(typeof fn!=='function'){throw new TypeError('Router.use() requires middleware function but got a '+gettype(fn));}// add the middleware
debug('use %o %s',path,fn.name||'<anonymous>');var layer=new Layer(path,{sensitive:this.caseSensitive,strict:false,end:false},fn);layer.route=undefined;this.stack.push(layer);}return this;};/**
 * Create a new Route for the given path.
 *
 * Each route contains a separate middleware stack and VERB handlers.
 *
 * See the Route api documentation for details on adding handlers
 * and middleware to routes.
 *
 * @param {String} path
 * @return {Route}
 * @public
 */proto.route=function route(path){var route=new Route(path);var layer=new Layer(path,{sensitive:this.caseSensitive,strict:this.strict,end:true},route.dispatch.bind(route));layer.route=route;this.stack.push(layer);return route;};// create Router#VERB functions
methods.concat('all').forEach(function(method){proto[method]=function(path){var route=this.route(path);route[method].apply(route,slice.call(arguments,1));return this;};});// append methods to a list of methods
function appendMethods(list,addition){for(var i=0;i<addition.length;i++){var method=addition[i];if(list.indexOf(method)===-1){list.push(method);}}}// get pathname of request
function getPathname(req){try{return parseUrl(req).pathname;}catch(err){return undefined;}}// Get get protocol + host for a URL
function getProtohost(url){if(typeof url!=='string'||url.length===0||url[0]==='/'){return undefined;}var searchIndex=url.indexOf('?');var pathLength=searchIndex!==-1?searchIndex:url.length;var fqdnIndex=url.substr(0,pathLength).indexOf('://');return fqdnIndex!==-1?url.substr(0,url.indexOf('/',3+fqdnIndex)):undefined;}// get type for error message
function gettype(obj){var type=typeof obj==='undefined'?'undefined':(0,_typeof3.default)(obj);if(type!=='object'){return type;}// inspect [[Class]] for objects
return toString.call(obj).replace(objectRegExp,'$1');}/**
 * Match path to a layer.
 *
 * @param {Layer} layer
 * @param {string} path
 * @private
 */function matchLayer(layer,path){try{return layer.match(path);}catch(err){return err;}}// merge params with parent params
function mergeParams(params,parent){if((typeof parent==='undefined'?'undefined':(0,_typeof3.default)(parent))!=='object'||!parent){return params;}// make copy of parent for base
var obj=mixin({},parent);// simple non-numeric merging
if(!(0 in params)||!(0 in parent)){return mixin(obj,params);}var i=0;var o=0;// determine numeric gaps
while(i in params){i++;}while(o in parent){o++;}// offset numeric indices in params before merge
for(i--;i>=0;i--){params[i+o]=params[i];// create holes for the merge when necessary
if(i<o){delete params[i];}}return mixin(obj,params);}// restore obj props after function
function restore(fn,obj){var props=new Array(arguments.length-2);var vals=new Array(arguments.length-2);for(var i=0;i<props.length;i++){props[i]=arguments[i+2];vals[i]=obj[props[i]];}return function(){// restore vals
for(var i=0;i<props.length;i++){obj[props[i]]=vals[i];}return fn.apply(this,arguments);};}// send an OPTIONS response
function sendOptionsResponse(res,options,next){try{var body=options.join(',');res.set('Allow',body);res.send(body);}catch(err){next(err);}}// wrap a function
function wrap(old,fn){return function proxy(){var args=new Array(arguments.length+1);args[0]=old;for(var i=0,len=arguments.length;i<len;i++){args[i+1]=arguments[i];}fn.apply(this,args);};}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(18).setImmediate);/***/},/* 59 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var debug=__webpack_require__(11)('express:router:route');var flatten=__webpack_require__(31);var Layer=__webpack_require__(60);var methods=__webpack_require__(42);/**
 * Module variables.
 * @private
 */var slice=Array.prototype.slice;var toString=Object.prototype.toString;/**
 * Module exports.
 * @public
 */module.exports=Route;/**
 * Initialize `Route` with the given `path`,
 *
 * @param {String} path
 * @public
 */function Route(path){this.path=path;this.stack=[];debug('new %o',path);// route handlers for various http methods
this.methods={};}/**
 * Determine if the route handles a given method.
 * @private
 */Route.prototype._handles_method=function _handles_method(method){if(this.methods._all){return true;}var name=method.toLowerCase();if(name==='head'&&!this.methods['head']){name='get';}return Boolean(this.methods[name]);};/**
 * @return {Array} supported HTTP methods
 * @private
 */Route.prototype._options=function _options(){var methods=(0,_keys2.default)(this.methods);// append automatic head
if(this.methods.get&&!this.methods.head){methods.push('head');}for(var i=0;i<methods.length;i++){// make upper case
methods[i]=methods[i].toUpperCase();}return methods;};/**
 * dispatch req, res into this route
 * @private
 */Route.prototype.dispatch=function dispatch(req,res,done){var idx=0;var stack=this.stack;if(stack.length===0){return done();}var method=req.method.toLowerCase();if(method==='head'&&!this.methods['head']){method='get';}req.route=this;next();function next(err){// signal to exit route
if(err&&err==='route'){return done();}// signal to exit router
if(err&&err==='router'){return done(err);}var layer=stack[idx++];if(!layer){return done(err);}if(layer.method&&layer.method!==method){return next(err);}if(err){layer.handle_error(err,req,res,next);}else{layer.handle_request(req,res,next);}}};/**
 * Add a handler for all HTTP verbs to this route.
 *
 * Behaves just like middleware and can respond or call `next`
 * to continue processing.
 *
 * You can use multiple `.all` call to add multiple handlers.
 *
 *   function check_something(req, res, next){
 *     next();
 *   };
 *
 *   function validate_user(req, res, next){
 *     next();
 *   };
 *
 *   route
 *   .all(validate_user)
 *   .all(check_something)
 *   .get(function(req, res, next){
 *     res.send('hello world');
 *   });
 *
 * @param {function} handler
 * @return {Route} for chaining
 * @api public
 */Route.prototype.all=function all(){var handles=flatten(slice.call(arguments));for(var i=0;i<handles.length;i++){var handle=handles[i];if(typeof handle!=='function'){var type=toString.call(handle);var msg='Route.all() requires callback functions but got a '+type;throw new TypeError(msg);}var layer=Layer('/',{},handle);layer.method=undefined;this.methods._all=true;this.stack.push(layer);}return this;};methods.forEach(function(method){Route.prototype[method]=function(){var handles=flatten(slice.call(arguments));for(var i=0;i<handles.length;i++){var handle=handles[i];if(typeof handle!=='function'){var type=toString.call(handle);var msg='Route.'+method+'() requires callback functions but got a '+type;throw new Error(msg);}debug('%s %o',method,this.path);var layer=Layer('/',{},handle);layer.method=method;this.methods[method]=true;this.stack.push(layer);}return this;};});/***/},/* 60 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var pathRegexp=__webpack_require__(121);var debug=__webpack_require__(11)('express:router:layer');/**
 * Module variables.
 * @private
 */var hasOwnProperty=Object.prototype.hasOwnProperty;/**
 * Module exports.
 * @public
 */module.exports=Layer;function Layer(path,options,fn){if(!(this instanceof Layer)){return new Layer(path,options,fn);}debug('new %o',path);var opts=options||{};this.handle=fn;this.name=fn.name||'<anonymous>';this.params=undefined;this.path=undefined;this.regexp=pathRegexp(path,this.keys=[],opts);// set fast path flags
this.regexp.fast_star=path==='*';this.regexp.fast_slash=path==='/'&&opts.end===false;}/**
 * Handle the error for the layer.
 *
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @api private
 */Layer.prototype.handle_error=function handle_error(error,req,res,next){var fn=this.handle;if(fn.length!==4){// not a standard error handler
return next(error);}try{fn(error,req,res,next);}catch(err){next(err);}};/**
 * Handle the request for the layer.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @api private
 */Layer.prototype.handle_request=function handle(req,res,next){var fn=this.handle;if(fn.length>3){// not a standard request handler
return next();}try{fn(req,res,next);}catch(err){next(err);}};/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */Layer.prototype.match=function match(path){var match;if(path!=null){// fast path non-ending match for / (any path matches)
if(this.regexp.fast_slash){this.params={};this.path='';return true;}// fast path for * (everything matched in a param)
if(this.regexp.fast_star){this.params={'0':decode_param(path)};this.path=path;return true;}// match the path
match=this.regexp.exec(path);}if(!match){this.params=undefined;this.path=undefined;return false;}// store values
this.params={};this.path=match[0];var keys=this.keys;var params=this.params;for(var i=1;i<match.length;i++){var key=keys[i-1];var prop=key.name;var val=decode_param(match[i]);if(val!==undefined||!hasOwnProperty.call(params,prop)){params[prop]=val;}}return true;};/**
 * Decode param value.
 *
 * @param {string} val
 * @return {string}
 * @private
 */function decode_param(val){if(typeof val!=='string'||val.length===0){return val;}try{return decodeURIComponent(val);}catch(err){if(err instanceof URIError){err.message='Failed to decode param \''+val+'\'';err.status=err.statusCode=400;}throw err;}}/***/},/* 61 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 */var merge=__webpack_require__(32);var parseUrl=__webpack_require__(19);var qs=__webpack_require__(62);/**
 * @param {Object} options
 * @return {Function}
 * @api public
 */module.exports=function query(options){var opts=merge({},options);var queryparse=qs.parse;if(typeof options==='function'){queryparse=options;opts=undefined;}if(opts!==undefined&&opts.allowPrototypes===undefined){// back-compat for qs module
opts.allowPrototypes=true;}return function query(req,res,next){if(!req.query){var val=parseUrl(req).query;req.query=queryparse(val,opts);}next();};};/***/},/* 62 *//***/function(module,exports,__webpack_require__){"use strict";var stringify=__webpack_require__(124);var parse=__webpack_require__(125);var formats=__webpack_require__(64);module.exports={formats:formats,parse:parse,stringify:stringify};/***/},/* 63 *//***/function(module,exports,__webpack_require__){"use strict";var has=Object.prototype.hasOwnProperty;var hexTable=function(){var array=[];for(var i=0;i<256;++i){array.push('%'+((i<16?'0':'')+i.toString(16)).toUpperCase());}return array;}();exports.arrayToObject=function(source,options){var obj=options&&options.plainObjects?(0,_create2.default)(null):{};for(var i=0;i<source.length;++i){if(typeof source[i]!=='undefined'){obj[i]=source[i];}}return obj;};exports.merge=function(target,source,options){if(!source){return target;}if((typeof source==='undefined'?'undefined':(0,_typeof3.default)(source))!=='object'){if(Array.isArray(target)){target.push(source);}else if((typeof target==='undefined'?'undefined':(0,_typeof3.default)(target))==='object'){if(options.plainObjects||options.allowPrototypes||!has.call(Object.prototype,source)){target[source]=true;}}else{return[target,source];}return target;}if((typeof target==='undefined'?'undefined':(0,_typeof3.default)(target))!=='object'){return[target].concat(source);}var mergeTarget=target;if(Array.isArray(target)&&!Array.isArray(source)){mergeTarget=exports.arrayToObject(target,options);}if(Array.isArray(target)&&Array.isArray(source)){source.forEach(function(item,i){if(has.call(target,i)){if(target[i]&&(0,_typeof3.default)(target[i])==='object'){target[i]=exports.merge(target[i],item,options);}else{target.push(item);}}else{target[i]=item;}});return target;}return(0,_keys2.default)(source).reduce(function(acc,key){var value=source[key];if(has.call(acc,key)){acc[key]=exports.merge(acc[key],value,options);}else{acc[key]=value;}return acc;},mergeTarget);};exports.assign=function assignSingleSource(target,source){return(0,_keys2.default)(source).reduce(function(acc,key){acc[key]=source[key];return acc;},target);};exports.decode=function(str){try{return decodeURIComponent(str.replace(/\+/g,' '));}catch(e){return str;}};exports.encode=function(str){// This code was originally written by Brian White (mscdex) for the io.js core querystring library.
// It has been adapted here for stricter adherence to RFC 3986
if(str.length===0){return str;}var string=typeof str==='string'?str:String(str);var out='';for(var i=0;i<string.length;++i){var c=string.charCodeAt(i);if(c===0x2D// -
||c===0x2E// .
||c===0x5F// _
||c===0x7E// ~
||c>=0x30&&c<=0x39// 0-9
||c>=0x41&&c<=0x5A// a-z
||c>=0x61&&c<=0x7A// A-Z
){out+=string.charAt(i);continue;}if(c<0x80){out=out+hexTable[c];continue;}if(c<0x800){out=out+(hexTable[0xC0|c>>6]+hexTable[0x80|c&0x3F]);continue;}if(c<0xD800||c>=0xE000){out=out+(hexTable[0xE0|c>>12]+hexTable[0x80|c>>6&0x3F]+hexTable[0x80|c&0x3F]);continue;}i+=1;c=0x10000+((c&0x3FF)<<10|string.charCodeAt(i)&0x3FF);out+=hexTable[0xF0|c>>18]+hexTable[0x80|c>>12&0x3F]+hexTable[0x80|c>>6&0x3F]+hexTable[0x80|c&0x3F];}return out;};exports.compact=function(obj,references){if((typeof obj==='undefined'?'undefined':(0,_typeof3.default)(obj))!=='object'||obj===null){return obj;}var refs=references||[];var lookup=refs.indexOf(obj);if(lookup!==-1){return refs[lookup];}refs.push(obj);if(Array.isArray(obj)){var compacted=[];for(var i=0;i<obj.length;++i){if(obj[i]&&(0,_typeof3.default)(obj[i])==='object'){compacted.push(exports.compact(obj[i],refs));}else if(typeof obj[i]!=='undefined'){compacted.push(obj[i]);}}return compacted;}var keys=(0,_keys2.default)(obj);keys.forEach(function(key){obj[key]=exports.compact(obj[key],refs);});return obj;};exports.isRegExp=function(obj){return Object.prototype.toString.call(obj)==='[object RegExp]';};exports.isBuffer=function(obj){if(obj===null||typeof obj==='undefined'){return false;}return!!(obj.constructor&&obj.constructor.isBuffer&&obj.constructor.isBuffer(obj));};/***/},/* 64 *//***/function(module,exports,__webpack_require__){"use strict";var replace=String.prototype.replace;var percentTwenties=/%20/g;module.exports={'default':'RFC3986',formatters:{RFC1738:function RFC1738(value){return replace.call(value,percentTwenties,'+');},RFC3986:function RFC3986(value){return value;}},RFC1738:'RFC1738',RFC3986:'RFC3986'};/***/},/* 65 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){exports.fetch=isFunction(global.fetch)&&isFunction(global.ReadableStream);exports.blobConstructor=false;try{new Blob([new ArrayBuffer(1)]);exports.blobConstructor=true;}catch(e){}// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr;function getXHR(){// Cache the xhr value
if(xhr!==undefined)return xhr;if(global.XMLHttpRequest){xhr=new global.XMLHttpRequest();// If XDomainRequest is available (ie only, where xhr might not work
// cross domain), use the page location. Otherwise use example.com
// Note: this doesn't actually make an http request.
try{xhr.open('GET',global.XDomainRequest?'/':'https://example.com');}catch(e){xhr=null;}}else{// Service workers don't have XHR
xhr=null;}return xhr;}function checkTypeSupport(type){var xhr=getXHR();if(!xhr)return false;try{xhr.responseType=type;return xhr.responseType===type;}catch(e){}return false;}// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer=typeof global.ArrayBuffer!=='undefined';var haveSlice=haveArrayBuffer&&isFunction(global.ArrayBuffer.prototype.slice);// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer=exports.fetch||haveArrayBuffer&&checkTypeSupport('arraybuffer');// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream=!exports.fetch&&haveSlice&&checkTypeSupport('ms-stream');exports.mozchunkedarraybuffer=!exports.fetch&&haveArrayBuffer&&checkTypeSupport('moz-chunked-arraybuffer');// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType=exports.fetch||(getXHR()?isFunction(getXHR().overrideMimeType):false);exports.vbArray=isFunction(global.VBArray);function isFunction(value){return typeof value==='function';}xhr=null;// Help gc
/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6));/***/},/* 66 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(global,process){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/var processNextTick=__webpack_require__(34);/*</replacement>*/module.exports=Readable;/*<replacement>*/var isArray=__webpack_require__(55);/*</replacement>*//*<replacement>*/var Duplex;/*</replacement>*/Readable.ReadableState=ReadableState;/*<replacement>*/var EE=__webpack_require__(17).EventEmitter;var EElistenerCount=function EElistenerCount(emitter,type){return emitter.listeners(type).length;};/*</replacement>*//*<replacement>*/var Stream=__webpack_require__(67);/*</replacement>*/// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/var Buffer=__webpack_require__(3).Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk);}function _isUint8Array(obj){return Buffer.isBuffer(obj)||obj instanceof OurUint8Array;}/*</replacement>*//*<replacement>*/var util=__webpack_require__(21);util.inherits=__webpack_require__(1);/*</replacement>*//*<replacement>*/var debugUtil=__webpack_require__(130);var debug=void 0;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog('stream');}else{debug=function debug(){};}/*</replacement>*/var BufferList=__webpack_require__(131);var destroyImpl=__webpack_require__(68);var StringDecoder;util.inherits(Readable,Stream);var kProxyEvents=['error','close','destroy','pause','resume'];function prependListener(emitter,event,fn){// Sadly this is not cacheable as some libraries bundle their own
// event emitter implementation with them.
if(typeof emitter.prependListener==='function'){return emitter.prependListener(event,fn);}else{// This is a hack to make sure that our error handler is attached before any
// userland ones.  NEVER DO THIS. This is here only because this code needs
// to continue to work with older versions of Node.js that do not include
// the prependListener() method. The goal is to eventually remove this hack.
if(!emitter._events||!emitter._events[event])emitter.on(event,fn);else if(isArray(emitter._events[event]))emitter._events[event].unshift(fn);else emitter._events[event]=[fn,emitter._events[event]];}}function ReadableState(options,stream){Duplex=Duplex||__webpack_require__(13);options=options||{};// object stream flag. Used to make read(n) ignore n and to
// make all the buffer merging and length checks go away
this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.readableObjectMode;// the point at which it stops calling _read() to fill the buffer
// Note: 0 is a valid value, means "don't call _read preemptively ever"
var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;// cast to ints.
this.highWaterMark=Math.floor(this.highWaterMark);// A linked list is used to store data chunks instead of an array because the
// linked list can remove elements from the beginning faster than
// array.shift()
this.buffer=new BufferList();this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;// a flag to be able to tell if the event 'readable'/'data' is emitted
// immediately, or on a later tick.  We set this to true at first, because
// any actions that shouldn't happen until "later" should generally also
// not happen before the first read call.
this.sync=true;// whenever we return null, then we set a flag to say
// that we're awaiting a 'readable' event emission.
this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.resumeScheduled=false;// has it been destroyed
this.destroyed=false;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// the number of writers that are awaiting a drain event in .pipe()s
this.awaitDrain=0;// if true, a maybeReadMore has been scheduled
this.readingMore=false;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=__webpack_require__(45).StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding;}}function Readable(options){Duplex=Duplex||__webpack_require__(13);if(!(this instanceof Readable))return new Readable(options);this._readableState=new ReadableState(options,this);// legacy
this.readable=true;if(options){if(typeof options.read==='function')this._read=options.read;if(typeof options.destroy==='function')this._destroy=options.destroy;}Stream.call(this);}Object.defineProperty(Readable.prototype,'destroyed',{get:function get(){if(this._readableState===undefined){return false;}return this._readableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(!this._readableState){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._readableState.destroyed=value;}});Readable.prototype.destroy=destroyImpl.destroy;Readable.prototype._undestroy=destroyImpl.undestroy;Readable.prototype._destroy=function(err,cb){this.push(null);cb(err);};// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push=function(chunk,encoding){var state=this._readableState;var skipChunkCheck;if(!state.objectMode){if(typeof chunk==='string'){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=Buffer.from(chunk,encoding);encoding='';}skipChunkCheck=true;}}else{skipChunkCheck=true;}return readableAddChunk(this,chunk,encoding,false,skipChunkCheck);};// Unshift should *always* be something directly out of read()
Readable.prototype.unshift=function(chunk){return readableAddChunk(this,chunk,null,true,false);};function readableAddChunk(stream,chunk,encoding,addToFront,skipChunkCheck){var state=stream._readableState;if(chunk===null){state.reading=false;onEofChunk(stream,state);}else{var er;if(!skipChunkCheck)er=chunkInvalid(state,chunk);if(er){stream.emit('error',er);}else if(state.objectMode||chunk&&chunk.length>0){if(typeof chunk!=='string'&&!state.objectMode&&(0,_getPrototypeOf2.default)(chunk)!==Buffer.prototype){chunk=_uint8ArrayToBuffer(chunk);}if(addToFront){if(state.endEmitted)stream.emit('error',new Error('stream.unshift() after end event'));else addChunk(stream,state,chunk,true);}else if(state.ended){stream.emit('error',new Error('stream.push() after EOF'));}else{state.reading=false;if(state.decoder&&!encoding){chunk=state.decoder.write(chunk);if(state.objectMode||chunk.length!==0)addChunk(stream,state,chunk,false);else maybeReadMore(stream,state);}else{addChunk(stream,state,chunk,false);}}}else if(!addToFront){state.reading=false;}}return needMoreData(state);}function addChunk(stream,state,chunk,addToFront){if(state.flowing&&state.length===0&&!state.sync){stream.emit('data',chunk);stream.read(0);}else{// update the buffer info.
state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream);}maybeReadMore(stream,state);}function chunkInvalid(state,chunk){var er;if(!_isUint8Array(chunk)&&typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new TypeError('Invalid non-string/buffer chunk');}return er;}// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state){return!state.ended&&(state.needReadable||state.length<state.highWaterMark||state.length===0);}Readable.prototype.isPaused=function(){return this._readableState.flowing===false;};// backwards compatibility.
Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=__webpack_require__(45).StringDecoder;this._readableState.decoder=new StringDecoder(enc);this._readableState.encoding=enc;return this;};// Don't raise the hwm > 8MB
var MAX_HWM=0x800000;function computeNewHighWaterMark(n){if(n>=MAX_HWM){n=MAX_HWM;}else{// Get the next highest power of 2 to prevent increasing hwm excessively in
// tiny amounts
n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++;}return n;}// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n,state){if(n<=0||state.length===0&&state.ended)return 0;if(state.objectMode)return 1;if(n!==n){// Only flow one buffer at a time
if(state.flowing&&state.length)return state.buffer.head.data.length;else return state.length;}// If we're asking for more than the current hwm, then raise the hwm.
if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);if(n<=state.length)return n;// Don't have enough
if(!state.ended){state.needReadable=true;return 0;}return state.length;}// you can override either this method, or the async _read(n) below.
Readable.prototype.read=function(n){debug('read',n);n=parseInt(n,10);var state=this._readableState;var nOrig=n;if(n!==0)state.emittedReadable=false;// if we're doing read(0) to trigger a readable event, but we
// already have a bunch of data in the buffer, then just trigger
// the 'readable' event and move on.
if(n===0&&state.needReadable&&(state.length>=state.highWaterMark||state.ended)){debug('read: emitReadable',state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null;}n=howMuchToRead(n,state);// if we've ended, and we're now clear, then finish it up.
if(n===0&&state.ended){if(state.length===0)endReadable(this);return null;}// All the actual chunk generation logic needs to be
// *below* the call to _read.  The reason is that in certain
// synthetic stream cases, such as passthrough streams, _read
// may be a completely synchronous operation which may change
// the state of the read buffer, providing enough data when
// before there was *not* enough.
//
// So, the steps are:
// 1. Figure out what the state of things will be after we do
// a read from the buffer.
//
// 2. If that resulting state will trigger a _read, then call _read.
// Note that this may be asynchronous, or synchronous.  Yes, it is
// deeply ugly to write APIs this way, but that still doesn't mean
// that the Readable class should behave improperly, as streams are
// designed to be sync/async agnostic.
// Take note if the _read call is sync or async (ie, if the read call
// has returned yet), so that we know whether or not it's safe to emit
// 'readable' etc.
//
// 3. Actually pull the requested chunks out of the buffer and return.
// if we need a readable event, then we need to do some reading.
var doRead=state.needReadable;debug('need readable',doRead);// if we currently have less than the highWaterMark, then also read some
if(state.length===0||state.length-n<state.highWaterMark){doRead=true;debug('length less than watermark',doRead);}// however, if we've ended, then there's no point, and if we're already
// reading, then it's unnecessary.
if(state.ended||state.reading){doRead=false;debug('reading or ended',doRead);}else if(doRead){debug('do read');state.reading=true;state.sync=true;// if the length is currently zero, then we *need* a readable event.
if(state.length===0)state.needReadable=true;// call internal read method
this._read(state.highWaterMark);state.sync=false;// If _read pushed data synchronously, then `reading` will be false,
// and we need to re-evaluate how much data we can return to the user.
if(!state.reading)n=howMuchToRead(nOrig,state);}var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=true;n=0;}else{state.length-=n;}if(state.length===0){// If we have nothing in the buffer, then we want to know
// as soon as we *do* get something into the buffer.
if(!state.ended)state.needReadable=true;// If we tried to read() past the EOF, then emit end on the next tick.
if(nOrig!==n&&state.ended)endReadable(this);}if(ret!==null)this.emit('data',ret);return ret;};function onEofChunk(stream,state){if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length;}}state.ended=true;// emit 'readable' now to make sure it gets picked up.
emitReadable(stream);}// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream){var state=stream._readableState;state.needReadable=false;if(!state.emittedReadable){debug('emitReadable',state.flowing);state.emittedReadable=true;if(state.sync)processNextTick(emitReadable_,stream);else emitReadable_(stream);}}function emitReadable_(stream){debug('emit readable');stream.emit('readable');flow(stream);}// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=true;processNextTick(maybeReadMore_,stream,state);}}function maybeReadMore_(stream,state){var len=state.length;while(!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark){debug('maybeReadMore read 0');stream.read(0);if(len===state.length)// didn't get any data, stop spinning.
break;else len=state.length;}state.readingMore=false;}// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read=function(n){this.emit('error',new Error('_read() is not implemented'));};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break;}state.pipesCount+=1;debug('pipe count=%d opts=%j',state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:unpipe;if(state.endEmitted)processNextTick(endFn);else src.once('end',endFn);dest.on('unpipe',onunpipe);function onunpipe(readable,unpipeInfo){debug('onunpipe');if(readable===src){if(unpipeInfo&&unpipeInfo.hasUnpiped===false){unpipeInfo.hasUnpiped=true;cleanup();}}}function onend(){debug('onend');dest.end();}// when the dest drains, it reduces the awaitDrain counter
// on the source.  This would be more elegant with a .once()
// handler in flow(), but adding and removing repeatedly is
// too slow.
var ondrain=pipeOnDrain(src);dest.on('drain',ondrain);var cleanedUp=false;function cleanup(){debug('cleanup');// cleanup event handlers once the pipe is broken
dest.removeListener('close',onclose);dest.removeListener('finish',onfinish);dest.removeListener('drain',ondrain);dest.removeListener('error',onerror);dest.removeListener('unpipe',onunpipe);src.removeListener('end',onend);src.removeListener('end',unpipe);src.removeListener('data',ondata);cleanedUp=true;// if the reader is waiting for a drain event from this
// specific writer, then it would cause it to never start
// flowing again.
// So, if this is awaiting a drain, then we just call it now.
// If we don't know, then assume that we are waiting for one.
if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain();}// If the user pushes more data while we're writing to dest then we'll end up
// in ondata again. However, we only want to increase awaitDrain once because
// dest will only emit one 'drain' event for the multiple writes.
// => Introduce a guard on increasing awaitDrain.
var increasedAwaitDrain=false;src.on('data',ondata);function ondata(chunk){debug('ondata');increasedAwaitDrain=false;var ret=dest.write(chunk);if(false===ret&&!increasedAwaitDrain){// If the user unpiped during `dest.write()`, it is possible
// to get stuck in a permanently paused state if that write
// also returned false.
// => Check whether `dest` is still a piping destination.
if((state.pipesCount===1&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp){debug('false write response, pause',src._readableState.awaitDrain);src._readableState.awaitDrain++;increasedAwaitDrain=true;}src.pause();}}// if the dest has an error, then stop piping into it.
// however, don't suppress the throwing behavior for this.
function onerror(er){debug('onerror',er);unpipe();dest.removeListener('error',onerror);if(EElistenerCount(dest,'error')===0)dest.emit('error',er);}// Make sure our error handler is attached before userland ones.
prependListener(dest,'error',onerror);// Both close and finish should trigger unpipe, but only once.
function onclose(){dest.removeListener('finish',onfinish);unpipe();}dest.once('close',onclose);function onfinish(){debug('onfinish');dest.removeListener('close',onclose);unpipe();}dest.once('finish',onfinish);function unpipe(){debug('unpipe');src.unpipe(dest);}// tell the dest that it's being piped to
dest.emit('pipe',src);// start the flow if it hasn't been started already.
if(!state.flowing){debug('pipe resume');src.resume();}return dest;};function pipeOnDrain(src){return function(){var state=src._readableState;debug('pipeOnDrain',state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,'data')){state.flowing=true;flow(src);}};}Readable.prototype.unpipe=function(dest){var state=this._readableState;var unpipeInfo={hasUnpiped:false};// if we're not piping anywhere, then do nothing.
if(state.pipesCount===0)return this;// just one destination.  most common case.
if(state.pipesCount===1){// passed in one, but it's not the right one.
if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;// got a match.
state.pipes=null;state.pipesCount=0;state.flowing=false;if(dest)dest.emit('unpipe',this,unpipeInfo);return this;}// slow case. multiple pipe destinations.
if(!dest){// remove all.
var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=false;for(var i=0;i<len;i++){dests[i].emit('unpipe',this,unpipeInfo);}return this;}// try to find the right one.
var index=indexOf(state.pipes,dest);if(index===-1)return this;state.pipes.splice(index,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit('unpipe',this,unpipeInfo);return this;};// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);if(ev==='data'){// Start flowing on next tick if stream isn't explicitly paused
if(this._readableState.flowing!==false)this.resume();}else if(ev==='readable'){var state=this._readableState;if(!state.endEmitted&&!state.readableListening){state.readableListening=state.needReadable=true;state.emittedReadable=false;if(!state.reading){processNextTick(nReadingNextTick,this);}else if(state.length){emitReadable(this);}}}return res;};Readable.prototype.addListener=Readable.prototype.on;function nReadingNextTick(self){debug('readable nexttick read 0');self.read(0);}// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug('resume');state.flowing=true;resume(this,state);}return this;};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=true;processNextTick(resume_,stream,state);}}function resume_(stream,state){if(!state.reading){debug('resume read 0');stream.read(0);}state.resumeScheduled=false;state.awaitDrain=0;stream.emit('resume');flow(stream);if(state.flowing&&!state.reading)stream.read(0);}Readable.prototype.pause=function(){debug('call pause flowing=%j',this._readableState.flowing);if(false!==this._readableState.flowing){debug('pause');this._readableState.flowing=false;this.emit('pause');}return this;};function flow(stream){var state=stream._readableState;debug('flow',state.flowing);while(state.flowing&&stream.read()!==null){}}// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap=function(stream){var state=this._readableState;var paused=false;var self=this;stream.on('end',function(){debug('wrapped end');if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)self.push(chunk);}self.push(null);});stream.on('data',function(chunk){debug('wrapped data');if(state.decoder)chunk=state.decoder.write(chunk);// don't skip over falsy values in objectMode
if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=self.push(chunk);if(!ret){paused=true;stream.pause();}});// proxy all the other methods.
// important when wrapping filters and duplexes.
for(var i in stream){if(this[i]===undefined&&typeof stream[i]==='function'){this[i]=function(method){return function(){return stream[method].apply(stream,arguments);};}(i);}}// proxy certain important events.
for(var n=0;n<kProxyEvents.length;n++){stream.on(kProxyEvents[n],self.emit.bind(self,kProxyEvents[n]));}// when we try to consume some more bytes, simply unpause the
// underlying stream.
self._read=function(n){debug('wrapped _read',n);if(paused){paused=false;stream.resume();}};return self;};// exposed for testing purposes only.
Readable._fromList=fromList;// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n,state){// nothing buffered
if(state.length===0)return null;var ret;if(state.objectMode)ret=state.buffer.shift();else if(!n||n>=state.length){// read it all, truncate the list
if(state.decoder)ret=state.buffer.join('');else if(state.buffer.length===1)ret=state.buffer.head.data;else ret=state.buffer.concat(state.length);state.buffer.clear();}else{// read part of list
ret=fromListPartial(n,state.buffer,state.decoder);}return ret;}// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n,list,hasStrings){var ret;if(n<list.head.data.length){// slice is the same for buffers and strings
ret=list.head.data.slice(0,n);list.head.data=list.head.data.slice(n);}else if(n===list.head.data.length){// first chunk is a perfect match
ret=list.shift();}else{// result spans more than one buffer
ret=hasStrings?copyFromBufferString(n,list):copyFromBuffer(n,list);}return ret;}// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n,list){var p=list.head;var c=1;var ret=p.data;n-=ret.length;while(p=p.next){var str=p.data;var nb=n>str.length?str.length:n;if(nb===str.length)ret+=str;else ret+=str.slice(0,n);n-=nb;if(n===0){if(nb===str.length){++c;if(p.next)list.head=p.next;else list.head=list.tail=null;}else{list.head=p;p.data=str.slice(nb);}break;}++c;}list.length-=c;return ret;}// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n,list){var ret=Buffer.allocUnsafe(n);var p=list.head;var c=1;p.data.copy(ret);n-=p.data.length;while(p=p.next){var buf=p.data;var nb=n>buf.length?buf.length:n;buf.copy(ret,ret.length-n,0,nb);n-=nb;if(n===0){if(nb===buf.length){++c;if(p.next)list.head=p.next;else list.head=list.tail=null;}else{list.head=p;p.data=buf.slice(nb);}break;}++c;}list.length-=c;return ret;}function endReadable(stream){var state=stream._readableState;// If we get here before consuming all the bytes, then that is a
// bug in node.  Should never happen.
if(state.length>0)throw new Error('"endReadable()" called on non-empty stream');if(!state.endEmitted){state.ended=true;processNextTick(endReadableNT,state,stream);}}function endReadableNT(state,stream){// Check that we didn't get one last unshift.
if(!state.endEmitted&&state.length===0){state.endEmitted=true;stream.readable=false;stream.emit('end');}}function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i);}}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i;}return-1;}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6),__webpack_require__(4));/***/},/* 67 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(17).EventEmitter;/***/},/* 68 *//***/function(module,exports,__webpack_require__){"use strict";/*<replacement>*/var processNextTick=__webpack_require__(34);/*</replacement>*/// undocumented cb() API, needed for core, not for public API
function destroy(err,cb){var _this=this;var readableDestroyed=this._readableState&&this._readableState.destroyed;var writableDestroyed=this._writableState&&this._writableState.destroyed;if(readableDestroyed||writableDestroyed){if(cb){cb(err);}else if(err&&(!this._writableState||!this._writableState.errorEmitted)){processNextTick(emitErrorNT,this,err);}return;}// we set destroyed to true before firing error callbacks in order
// to make it re-entrance safe in case destroy() is called within callbacks
if(this._readableState){this._readableState.destroyed=true;}// if this is a duplex stream mark the writable part as destroyed as well
if(this._writableState){this._writableState.destroyed=true;}this._destroy(err||null,function(err){if(!cb&&err){processNextTick(emitErrorNT,_this,err);if(_this._writableState){_this._writableState.errorEmitted=true;}}else if(cb){cb(err);}});}function undestroy(){if(this._readableState){this._readableState.destroyed=false;this._readableState.reading=false;this._readableState.ended=false;this._readableState.endEmitted=false;}if(this._writableState){this._writableState.destroyed=false;this._writableState.ended=false;this._writableState.ending=false;this._writableState.finished=false;this._writableState.errorEmitted=false;}}function emitErrorNT(self,err){self.emit('error',err);}module.exports={destroy:destroy,undestroy:undestroy};/***/},/* 69 *//***/function(module,exports,__webpack_require__){"use strict";// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
module.exports=Transform;var Duplex=__webpack_require__(13);/*<replacement>*/var util=__webpack_require__(21);util.inherits=__webpack_require__(1);/*</replacement>*/util.inherits(Transform,Duplex);function TransformState(stream){this.afterTransform=function(er,data){return afterTransform(stream,er,data);};this.needTransform=false;this.transforming=false;this.writecb=null;this.writechunk=null;this.writeencoding=null;}function afterTransform(stream,er,data){var ts=stream._transformState;ts.transforming=false;var cb=ts.writecb;if(!cb){return stream.emit('error',new Error('write callback called multiple times'));}ts.writechunk=null;ts.writecb=null;if(data!==null&&data!==undefined)stream.push(data);cb(er);var rs=stream._readableState;rs.reading=false;if(rs.needReadable||rs.length<rs.highWaterMark){stream._read(rs.highWaterMark);}}function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options);this._transformState=new TransformState(this);var stream=this;// start out asking for a readable event once data is transformed.
this._readableState.needReadable=true;// we have implemented the _read method, and done the other things
// that Readable wants before the first _read call, so unset the
// sync guard flag.
this._readableState.sync=false;if(options){if(typeof options.transform==='function')this._transform=options.transform;if(typeof options.flush==='function')this._flush=options.flush;}// When the writable side finishes, then flush out anything remaining.
this.once('prefinish',function(){if(typeof this._flush==='function')this._flush(function(er,data){done(stream,er,data);});else done(stream);});}Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=false;return Duplex.prototype.push.call(this,chunk,encoding);};// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform=function(chunk,encoding,cb){throw new Error('_transform() is not implemented');};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark);}};// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&ts.writecb&&!ts.transforming){ts.transforming=true;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform);}else{// mark that we need a transform, so that any data that comes in
// will get processed, now that we've asked for it.
ts.needTransform=true;}};Transform.prototype._destroy=function(err,cb){var _this=this;Duplex.prototype._destroy.call(this,err,function(err2){cb(err2);_this.emit('close');});};function done(stream,er,data){if(er)return stream.emit('error',er);if(data!==null&&data!==undefined)stream.push(data);// if there's nothing in the write buffer, then that means
// that nothing more will ever be provided
var ws=stream._writableState;var ts=stream._transformState;if(ws.length)throw new Error('Calling transform done when ws.length != 0');if(ts.transforming)throw new Error('Calling transform done when still transforming');return stream.push(null);}/***/},/* 70 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){/*!
 * content-disposition
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 */module.exports=contentDisposition;module.exports.parse=parse;/**
 * Module dependencies.
 */var basename=__webpack_require__(9).basename;/**
 * RegExp to match non attr-char, *after* encodeURIComponent (i.e. not including "%")
 */var ENCODE_URL_ATTR_CHAR_REGEXP=/[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g;// eslint-disable-line no-control-regex
/**
 * RegExp to match percent encoding escape.
 */var HEX_ESCAPE_REGEXP=/%[0-9A-Fa-f]{2}/;var HEX_ESCAPE_REPLACE_REGEXP=/%([0-9A-Fa-f]{2})/g;/**
 * RegExp to match non-latin1 characters.
 */var NON_LATIN1_REGEXP=/[^\x20-\x7e\xa0-\xff]/g;/**
 * RegExp to match quoted-pair in RFC 2616
 *
 * quoted-pair = "\" CHAR
 * CHAR        = <any US-ASCII character (octets 0 - 127)>
 */var QESC_REGEXP=/\\([\u0000-\u007f])/g;/**
 * RegExp to match chars that must be quoted-pair in RFC 2616
 */var QUOTE_REGEXP=/([\\"])/g;/**
 * RegExp for various RFC 2616 grammar
 *
 * parameter     = token "=" ( token | quoted-string )
 * token         = 1*<any CHAR except CTLs or separators>
 * separators    = "(" | ")" | "<" | ">" | "@"
 *               | "," | ";" | ":" | "\" | <">
 *               | "/" | "[" | "]" | "?" | "="
 *               | "{" | "}" | SP | HT
 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
 * qdtext        = <any TEXT except <">>
 * quoted-pair   = "\" CHAR
 * CHAR          = <any US-ASCII character (octets 0 - 127)>
 * TEXT          = <any OCTET except CTLs, but including LWS>
 * LWS           = [CRLF] 1*( SP | HT )
 * CRLF          = CR LF
 * CR            = <US-ASCII CR, carriage return (13)>
 * LF            = <US-ASCII LF, linefeed (10)>
 * SP            = <US-ASCII SP, space (32)>
 * HT            = <US-ASCII HT, horizontal-tab (9)>
 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
 * OCTET         = <any 8-bit sequence of data>
 */var PARAM_REGEXP=/;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g;// eslint-disable-line no-control-regex
var TEXT_REGEXP=/^[\x20-\x7e\x80-\xff]+$/;var TOKEN_REGEXP=/^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;/**
 * RegExp for various RFC 5987 grammar
 *
 * ext-value     = charset  "'" [ language ] "'" value-chars
 * charset       = "UTF-8" / "ISO-8859-1" / mime-charset
 * mime-charset  = 1*mime-charsetc
 * mime-charsetc = ALPHA / DIGIT
 *               / "!" / "#" / "$" / "%" / "&"
 *               / "+" / "-" / "^" / "_" / "`"
 *               / "{" / "}" / "~"
 * language      = ( 2*3ALPHA [ extlang ] )
 *               / 4ALPHA
 *               / 5*8ALPHA
 * extlang       = *3( "-" 3ALPHA )
 * value-chars   = *( pct-encoded / attr-char )
 * pct-encoded   = "%" HEXDIG HEXDIG
 * attr-char     = ALPHA / DIGIT
 *               / "!" / "#" / "$" / "&" / "+" / "-" / "."
 *               / "^" / "_" / "`" / "|" / "~"
 */var EXT_VALUE_REGEXP=/^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/;/**
 * RegExp for various RFC 6266 grammar
 *
 * disposition-type = "inline" | "attachment" | disp-ext-type
 * disp-ext-type    = token
 * disposition-parm = filename-parm | disp-ext-parm
 * filename-parm    = "filename" "=" value
 *                  | "filename*" "=" ext-value
 * disp-ext-parm    = token "=" value
 *                  | ext-token "=" ext-value
 * ext-token        = <the characters in token, followed by "*">
 */var DISPOSITION_TYPE_REGEXP=/^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/;// eslint-disable-line no-control-regex
/**
 * Create an attachment Content-Disposition header.
 *
 * @param {string} [filename]
 * @param {object} [options]
 * @param {string} [options.type=attachment]
 * @param {string|boolean} [options.fallback=true]
 * @return {string}
 * @api public
 */function contentDisposition(filename,options){var opts=options||{};// get type
var type=opts.type||'attachment';// get parameters
var params=createparams(filename,opts.fallback);// format into string
return format(new ContentDisposition(type,params));}/**
 * Create parameters object from filename and fallback.
 *
 * @param {string} [filename]
 * @param {string|boolean} [fallback=true]
 * @return {object}
 * @api private
 */function createparams(filename,fallback){if(filename===undefined){return;}var params={};if(typeof filename!=='string'){throw new TypeError('filename must be a string');}// fallback defaults to true
if(fallback===undefined){fallback=true;}if(typeof fallback!=='string'&&typeof fallback!=='boolean'){throw new TypeError('fallback must be a string or boolean');}if(typeof fallback==='string'&&NON_LATIN1_REGEXP.test(fallback)){throw new TypeError('fallback must be ISO-8859-1 string');}// restrict to file base name
var name=basename(filename);// determine if name is suitable for quoted string
var isQuotedString=TEXT_REGEXP.test(name);// generate fallback name
var fallbackName=typeof fallback!=='string'?fallback&&getlatin1(name):basename(fallback);var hasFallback=typeof fallbackName==='string'&&fallbackName!==name;// set extended filename parameter
if(hasFallback||!isQuotedString||HEX_ESCAPE_REGEXP.test(name)){params['filename*']=name;}// set filename parameter
if(isQuotedString||hasFallback){params.filename=hasFallback?fallbackName:name;}return params;}/**
 * Format object to Content-Disposition header.
 *
 * @param {object} obj
 * @param {string} obj.type
 * @param {object} [obj.parameters]
 * @return {string}
 * @api private
 */function format(obj){var parameters=obj.parameters;var type=obj.type;if(!type||typeof type!=='string'||!TOKEN_REGEXP.test(type)){throw new TypeError('invalid type');}// start with normalized type
var string=String(type).toLowerCase();// append parameters
if(parameters&&(typeof parameters==='undefined'?'undefined':(0,_typeof3.default)(parameters))==='object'){var param;var params=(0,_keys2.default)(parameters).sort();for(var i=0;i<params.length;i++){param=params[i];var val=param.substr(-1)==='*'?ustring(parameters[param]):qstring(parameters[param]);string+='; '+param+'='+val;}}return string;}/**
 * Decode a RFC 6987 field value (gracefully).
 *
 * @param {string} str
 * @return {string}
 * @api private
 */function decodefield(str){var match=EXT_VALUE_REGEXP.exec(str);if(!match){throw new TypeError('invalid extended field value');}var charset=match[1].toLowerCase();var encoded=match[2];var value;// to binary string
var binary=encoded.replace(HEX_ESCAPE_REPLACE_REGEXP,pdecode);switch(charset){case'iso-8859-1':value=getlatin1(binary);break;case'utf-8':value=new Buffer(binary,'binary').toString('utf8');break;default:throw new TypeError('unsupported charset in extended field');}return value;}/**
 * Get ISO-8859-1 version of string.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */function getlatin1(val){// simple Unicode -> ISO-8859-1 transformation
return String(val).replace(NON_LATIN1_REGEXP,'?');}/**
 * Parse Content-Disposition header string.
 *
 * @param {string} string
 * @return {object}
 * @api private
 */function parse(string){if(!string||typeof string!=='string'){throw new TypeError('argument string is required');}var match=DISPOSITION_TYPE_REGEXP.exec(string);if(!match){throw new TypeError('invalid type format');}// normalize type
var index=match[0].length;var type=match[1].toLowerCase();var key;var names=[];var params={};var value;// calculate index to start at
index=PARAM_REGEXP.lastIndex=match[0].substr(-1)===';'?index-1:index;// match parameters
while(match=PARAM_REGEXP.exec(string)){if(match.index!==index){throw new TypeError('invalid parameter format');}index+=match[0].length;key=match[1].toLowerCase();value=match[2];if(names.indexOf(key)!==-1){throw new TypeError('invalid duplicate parameter');}names.push(key);if(key.indexOf('*')+1===key.length){// decode extended value
key=key.slice(0,-1);value=decodefield(value);// overwrite existing value
params[key]=value;continue;}if(typeof params[key]==='string'){continue;}if(value[0]==='"'){// remove quotes and escapes
value=value.substr(1,value.length-2).replace(QESC_REGEXP,'$1');}params[key]=value;}if(index!==-1&&index!==string.length){throw new TypeError('invalid parameter format');}return new ContentDisposition(type,params);}/**
 * Percent decode a single character.
 *
 * @param {string} str
 * @param {string} hex
 * @return {string}
 * @api private
 */function pdecode(str,hex){return String.fromCharCode(parseInt(hex,16));}/**
 * Percent encode a single character.
 *
 * @param {string} char
 * @return {string}
 * @api private
 */function pencode(char){var hex=String(char).charCodeAt(0).toString(16).toUpperCase();return hex.length===1?'%0'+hex:'%'+hex;}/**
 * Quote a string for HTTP.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */function qstring(val){var str=String(val);return'"'+str.replace(QUOTE_REGEXP,'\\$1')+'"';}/**
 * Encode a Unicode string for HTTP (RFC 5987).
 *
 * @param {string} val
 * @return {string}
 * @api private
 */function ustring(val){var str=String(val);// percent encode as UTF-8
var encoded=encodeURIComponent(str).replace(ENCODE_URL_ATTR_CHAR_REGEXP,pencode);return'UTF-8\'\''+encoded;}/**
 * Class for parsed Content-Disposition header for v8 optimization
 */function ContentDisposition(type,parameters){this.type=type;this.parameters=parameters;}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 71 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){/*!
 * etag
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=etag;/**
 * Module dependencies.
 * @private
 */var crypto=__webpack_require__(72);var Stats=__webpack_require__(!function webpackMissingModule(){var e=new Error("Cannot find module \"fs\"");e.code='MODULE_NOT_FOUND';throw e;}()).Stats;/**
 * Module variables.
 * @private
 */var base64PadCharRegExp=/=+$/;var toString=Object.prototype.toString;/**
 * Generate an entity tag.
 *
 * @param {Buffer|string} entity
 * @return {string}
 * @private
 */function entitytag(entity){if(entity.length===0){// fast-path empty
return'"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"';}// compute hash of entity
var hash=crypto.createHash('sha1').update(entity,'utf8').digest('base64').replace(base64PadCharRegExp,'');// compute length of entity
var len=typeof entity==='string'?Buffer.byteLength(entity,'utf8'):entity.length;return'"'+len.toString(16)+'-'+hash+'"';}/**
 * Create a simple ETag.
 *
 * @param {string|Buffer|Stats} entity
 * @param {object} [options]
 * @param {boolean} [options.weak]
 * @return {String}
 * @public
 */function etag(entity,options){if(entity==null){throw new TypeError('argument entity is required');}// support fs.Stats object
var isStats=isstats(entity);var weak=options&&typeof options.weak==='boolean'?options.weak:isStats;// validate argument
if(!isStats&&typeof entity!=='string'&&!Buffer.isBuffer(entity)){throw new TypeError('argument entity must be string, Buffer, or fs.Stats');}// generate entity tag
var tag=isStats?stattag(entity):entitytag(entity);return weak?'W/'+tag:tag;}/**
 * Determine if object is a Stats object.
 *
 * @param {object} obj
 * @return {boolean}
 * @api private
 */function isstats(obj){// genuine fs.Stats
if(typeof Stats==='function'&&obj instanceof Stats){return true;}// quack quack
return obj&&(typeof obj==='undefined'?'undefined':(0,_typeof3.default)(obj))==='object'&&'ctime'in obj&&toString.call(obj.ctime)==='[object Date]'&&'mtime'in obj&&toString.call(obj.mtime)==='[object Date]'&&'ino'in obj&&typeof obj.ino==='number'&&'size'in obj&&typeof obj.size==='number';}/**
 * Generate a tag for a stat.
 *
 * @param {object} stat
 * @return {string}
 * @private
 */function stattag(stat){var mtime=stat.mtime.getTime().toString(16);var size=stat.size.toString(16);return'"'+size+'-'+mtime+'"';}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 72 *//***/function(module,exports,__webpack_require__){"use strict";exports.randomBytes=exports.rng=exports.pseudoRandomBytes=exports.prng=__webpack_require__(22);exports.createHash=exports.Hash=__webpack_require__(23);exports.createHmac=exports.Hmac=__webpack_require__(75);var algos=__webpack_require__(151);var algoKeys=(0,_keys2.default)(algos);var hashes=['sha1','sha224','sha256','sha384','sha512','md5','rmd160'].concat(algoKeys);exports.getHashes=function(){return hashes;};var p=__webpack_require__(77);exports.pbkdf2=p.pbkdf2;exports.pbkdf2Sync=p.pbkdf2Sync;var aes=__webpack_require__(153);exports.Cipher=aes.Cipher;exports.createCipher=aes.createCipher;exports.Cipheriv=aes.Cipheriv;exports.createCipheriv=aes.createCipheriv;exports.Decipher=aes.Decipher;exports.createDecipher=aes.createDecipher;exports.Decipheriv=aes.Decipheriv;exports.createDecipheriv=aes.createDecipheriv;exports.getCiphers=aes.getCiphers;exports.listCiphers=aes.listCiphers;var dh=__webpack_require__(172);exports.DiffieHellmanGroup=dh.DiffieHellmanGroup;exports.createDiffieHellmanGroup=dh.createDiffieHellmanGroup;exports.getDiffieHellman=dh.getDiffieHellman;exports.createDiffieHellman=dh.createDiffieHellman;exports.DiffieHellman=dh.DiffieHellman;var sign=__webpack_require__(177);exports.createSign=sign.createSign;exports.Sign=sign.Sign;exports.createVerify=sign.createVerify;exports.Verify=sign.Verify;exports.createECDH=__webpack_require__(215);var publicEncrypt=__webpack_require__(216);exports.publicEncrypt=publicEncrypt.publicEncrypt;exports.privateEncrypt=publicEncrypt.privateEncrypt;exports.publicDecrypt=publicEncrypt.publicDecrypt;exports.privateDecrypt=publicEncrypt.privateDecrypt;// the least I can do is make error messages for the rest of the node.js/crypto api.
// ;[
//   'createCredentials'
// ].forEach(function (name) {
//   exports[name] = function () {
//     throw new Error([
//       'sorry, ' + name + ' is not implemented yet',
//       'we accept pull requests',
//       'https://github.com/crypto-browserify/crypto-browserify'
//     ].join('\n'))
//   }
// })
exports.createCredentials=function(){throw new Error(['sorry, createCredentials is not implemented yet','we accept pull requests','https://github.com/crypto-browserify/crypto-browserify'].join('\n'));};exports.constants={'DH_CHECK_P_NOT_SAFE_PRIME':2,'DH_CHECK_P_NOT_PRIME':1,'DH_UNABLE_TO_CHECK_GENERATOR':4,'DH_NOT_SUITABLE_GENERATOR':8,'NPN_ENABLED':1,'ALPN_ENABLED':1,'RSA_PKCS1_PADDING':1,'RSA_SSLV23_PADDING':2,'RSA_NO_PADDING':3,'RSA_PKCS1_OAEP_PADDING':4,'RSA_X931_PADDING':5,'RSA_PKCS1_PSS_PADDING':6,'POINT_CONVERSION_COMPRESSED':2,'POINT_CONVERSION_UNCOMPRESSED':4,'POINT_CONVERSION_HYBRID':6/***/};},/* 73 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */var inherits=__webpack_require__(1);var Hash=__webpack_require__(16);var K=[0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];var W=new Array(64);function Sha256(){this.init();this._w=W;// new Array(64)
Hash.call(this,64,56);}inherits(Sha256,Hash);Sha256.prototype.init=function(){this._a=0x6a09e667;this._b=0xbb67ae85;this._c=0x3c6ef372;this._d=0xa54ff53a;this._e=0x510e527f;this._f=0x9b05688c;this._g=0x1f83d9ab;this._h=0x5be0cd19;return this;};function ch(x,y,z){return z^x&(y^z);}function maj(x,y,z){return x&y|z&(x|y);}function sigma0(x){return(x>>>2|x<<30)^(x>>>13|x<<19)^(x>>>22|x<<10);}function sigma1(x){return(x>>>6|x<<26)^(x>>>11|x<<21)^(x>>>25|x<<7);}function gamma0(x){return(x>>>7|x<<25)^(x>>>18|x<<14)^x>>>3;}function gamma1(x){return(x>>>17|x<<15)^(x>>>19|x<<13)^x>>>10;}Sha256.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;var f=this._f|0;var g=this._g|0;var h=this._h|0;for(var i=0;i<16;++i){W[i]=M.readInt32BE(i*4);}for(;i<64;++i){W[i]=gamma1(W[i-2])+W[i-7]+gamma0(W[i-15])+W[i-16]|0;}for(var j=0;j<64;++j){var T1=h+sigma1(e)+ch(e,f,g)+K[j]+W[j]|0;var T2=sigma0(a)+maj(a,b,c)|0;h=g;g=f;f=e;e=d+T1|0;d=c;c=b;b=a;a=T1+T2|0;}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0;this._f=f+this._f|0;this._g=g+this._g|0;this._h=h+this._h|0;};Sha256.prototype._hash=function(){var H=new Buffer(32);H.writeInt32BE(this._a,0);H.writeInt32BE(this._b,4);H.writeInt32BE(this._c,8);H.writeInt32BE(this._d,12);H.writeInt32BE(this._e,16);H.writeInt32BE(this._f,20);H.writeInt32BE(this._g,24);H.writeInt32BE(this._h,28);return H;};module.exports=Sha256;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 74 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var inherits=__webpack_require__(1);var Hash=__webpack_require__(16);var K=[0x428a2f98,0xd728ae22,0x71374491,0x23ef65cd,0xb5c0fbcf,0xec4d3b2f,0xe9b5dba5,0x8189dbbc,0x3956c25b,0xf348b538,0x59f111f1,0xb605d019,0x923f82a4,0xaf194f9b,0xab1c5ed5,0xda6d8118,0xd807aa98,0xa3030242,0x12835b01,0x45706fbe,0x243185be,0x4ee4b28c,0x550c7dc3,0xd5ffb4e2,0x72be5d74,0xf27b896f,0x80deb1fe,0x3b1696b1,0x9bdc06a7,0x25c71235,0xc19bf174,0xcf692694,0xe49b69c1,0x9ef14ad2,0xefbe4786,0x384f25e3,0x0fc19dc6,0x8b8cd5b5,0x240ca1cc,0x77ac9c65,0x2de92c6f,0x592b0275,0x4a7484aa,0x6ea6e483,0x5cb0a9dc,0xbd41fbd4,0x76f988da,0x831153b5,0x983e5152,0xee66dfab,0xa831c66d,0x2db43210,0xb00327c8,0x98fb213f,0xbf597fc7,0xbeef0ee4,0xc6e00bf3,0x3da88fc2,0xd5a79147,0x930aa725,0x06ca6351,0xe003826f,0x14292967,0x0a0e6e70,0x27b70a85,0x46d22ffc,0x2e1b2138,0x5c26c926,0x4d2c6dfc,0x5ac42aed,0x53380d13,0x9d95b3df,0x650a7354,0x8baf63de,0x766a0abb,0x3c77b2a8,0x81c2c92e,0x47edaee6,0x92722c85,0x1482353b,0xa2bfe8a1,0x4cf10364,0xa81a664b,0xbc423001,0xc24b8b70,0xd0f89791,0xc76c51a3,0x0654be30,0xd192e819,0xd6ef5218,0xd6990624,0x5565a910,0xf40e3585,0x5771202a,0x106aa070,0x32bbd1b8,0x19a4c116,0xb8d2d0c8,0x1e376c08,0x5141ab53,0x2748774c,0xdf8eeb99,0x34b0bcb5,0xe19b48a8,0x391c0cb3,0xc5c95a63,0x4ed8aa4a,0xe3418acb,0x5b9cca4f,0x7763e373,0x682e6ff3,0xd6b2b8a3,0x748f82ee,0x5defb2fc,0x78a5636f,0x43172f60,0x84c87814,0xa1f0ab72,0x8cc70208,0x1a6439ec,0x90befffa,0x23631e28,0xa4506ceb,0xde82bde9,0xbef9a3f7,0xb2c67915,0xc67178f2,0xe372532b,0xca273ece,0xea26619c,0xd186b8c7,0x21c0c207,0xeada7dd6,0xcde0eb1e,0xf57d4f7f,0xee6ed178,0x06f067aa,0x72176fba,0x0a637dc5,0xa2c898a6,0x113f9804,0xbef90dae,0x1b710b35,0x131c471b,0x28db77f5,0x23047d84,0x32caab7b,0x40c72493,0x3c9ebe0a,0x15c9bebc,0x431d67c4,0x9c100d4c,0x4cc5d4be,0xcb3e42b6,0x597f299c,0xfc657e2a,0x5fcb6fab,0x3ad6faec,0x6c44198c,0x4a475817];var W=new Array(160);function Sha512(){this.init();this._w=W;Hash.call(this,128,112);}inherits(Sha512,Hash);Sha512.prototype.init=function(){this._ah=0x6a09e667;this._bh=0xbb67ae85;this._ch=0x3c6ef372;this._dh=0xa54ff53a;this._eh=0x510e527f;this._fh=0x9b05688c;this._gh=0x1f83d9ab;this._hh=0x5be0cd19;this._al=0xf3bcc908;this._bl=0x84caa73b;this._cl=0xfe94f82b;this._dl=0x5f1d36f1;this._el=0xade682d1;this._fl=0x2b3e6c1f;this._gl=0xfb41bd6b;this._hl=0x137e2179;return this;};function Ch(x,y,z){return z^x&(y^z);}function maj(x,y,z){return x&y|z&(x|y);}function sigma0(x,xl){return(x>>>28|xl<<4)^(xl>>>2|x<<30)^(xl>>>7|x<<25);}function sigma1(x,xl){return(x>>>14|xl<<18)^(x>>>18|xl<<14)^(xl>>>9|x<<23);}function Gamma0(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^x>>>7;}function Gamma0l(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^(x>>>7|xl<<25);}function Gamma1(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^x>>>6;}function Gamma1l(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^(x>>>6|xl<<26);}function getCarry(a,b){return a>>>0<b>>>0?1:0;}Sha512.prototype._update=function(M){var W=this._w;var ah=this._ah|0;var bh=this._bh|0;var ch=this._ch|0;var dh=this._dh|0;var eh=this._eh|0;var fh=this._fh|0;var gh=this._gh|0;var hh=this._hh|0;var al=this._al|0;var bl=this._bl|0;var cl=this._cl|0;var dl=this._dl|0;var el=this._el|0;var fl=this._fl|0;var gl=this._gl|0;var hl=this._hl|0;for(var i=0;i<32;i+=2){W[i]=M.readInt32BE(i*4);W[i+1]=M.readInt32BE(i*4+4);}for(;i<160;i+=2){var xh=W[i-15*2];var xl=W[i-15*2+1];var gamma0=Gamma0(xh,xl);var gamma0l=Gamma0l(xl,xh);xh=W[i-2*2];xl=W[i-2*2+1];var gamma1=Gamma1(xh,xl);var gamma1l=Gamma1l(xl,xh);// W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
var Wi7h=W[i-7*2];var Wi7l=W[i-7*2+1];var Wi16h=W[i-16*2];var Wi16l=W[i-16*2+1];var Wil=gamma0l+Wi7l|0;var Wih=gamma0+Wi7h+getCarry(Wil,gamma0l)|0;Wil=Wil+gamma1l|0;Wih=Wih+gamma1+getCarry(Wil,gamma1l)|0;Wil=Wil+Wi16l|0;Wih=Wih+Wi16h+getCarry(Wil,Wi16l)|0;W[i]=Wih;W[i+1]=Wil;}for(var j=0;j<160;j+=2){Wih=W[j];Wil=W[j+1];var majh=maj(ah,bh,ch);var majl=maj(al,bl,cl);var sigma0h=sigma0(ah,al);var sigma0l=sigma0(al,ah);var sigma1h=sigma1(eh,el);var sigma1l=sigma1(el,eh);// t1 = h + sigma1 + ch + K[j] + W[j]
var Kih=K[j];var Kil=K[j+1];var chh=Ch(eh,fh,gh);var chl=Ch(el,fl,gl);var t1l=hl+sigma1l|0;var t1h=hh+sigma1h+getCarry(t1l,hl)|0;t1l=t1l+chl|0;t1h=t1h+chh+getCarry(t1l,chl)|0;t1l=t1l+Kil|0;t1h=t1h+Kih+getCarry(t1l,Kil)|0;t1l=t1l+Wil|0;t1h=t1h+Wih+getCarry(t1l,Wil)|0;// t2 = sigma0 + maj
var t2l=sigma0l+majl|0;var t2h=sigma0h+majh+getCarry(t2l,sigma0l)|0;hh=gh;hl=gl;gh=fh;gl=fl;fh=eh;fl=el;el=dl+t1l|0;eh=dh+t1h+getCarry(el,dl)|0;dh=ch;dl=cl;ch=bh;cl=bl;bh=ah;bl=al;al=t1l+t2l|0;ah=t1h+t2h+getCarry(al,t1l)|0;}this._al=this._al+al|0;this._bl=this._bl+bl|0;this._cl=this._cl+cl|0;this._dl=this._dl+dl|0;this._el=this._el+el|0;this._fl=this._fl+fl|0;this._gl=this._gl+gl|0;this._hl=this._hl+hl|0;this._ah=this._ah+ah+getCarry(this._al,al)|0;this._bh=this._bh+bh+getCarry(this._bl,bl)|0;this._ch=this._ch+ch+getCarry(this._cl,cl)|0;this._dh=this._dh+dh+getCarry(this._dl,dl)|0;this._eh=this._eh+eh+getCarry(this._el,el)|0;this._fh=this._fh+fh+getCarry(this._fl,fl)|0;this._gh=this._gh+gh+getCarry(this._gl,gl)|0;this._hh=this._hh+hh+getCarry(this._hl,hl)|0;};Sha512.prototype._hash=function(){var H=new Buffer(64);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset);H.writeInt32BE(l,offset+4);}writeInt64BE(this._ah,this._al,0);writeInt64BE(this._bh,this._bl,8);writeInt64BE(this._ch,this._cl,16);writeInt64BE(this._dh,this._dl,24);writeInt64BE(this._eh,this._el,32);writeInt64BE(this._fh,this._fl,40);writeInt64BE(this._gh,this._gl,48);writeInt64BE(this._hh,this._hl,56);return H;};module.exports=Sha512;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 75 *//***/function(module,exports,__webpack_require__){"use strict";var inherits=__webpack_require__(1);var Legacy=__webpack_require__(150);var Base=__webpack_require__(10);var Buffer=__webpack_require__(3).Buffer;var md5=__webpack_require__(47);var RIPEMD160=__webpack_require__(48);var sha=__webpack_require__(49);var ZEROS=Buffer.alloc(128);function Hmac(alg,key){Base.call(this,'digest');if(typeof key==='string'){key=Buffer.from(key);}var blocksize=alg==='sha512'||alg==='sha384'?128:64;this._alg=alg;this._key=key;if(key.length>blocksize){var hash=alg==='rmd160'?new RIPEMD160():sha(alg);key=hash.update(key).digest();}else if(key.length<blocksize){key=Buffer.concat([key,ZEROS],blocksize);}var ipad=this._ipad=Buffer.allocUnsafe(blocksize);var opad=this._opad=Buffer.allocUnsafe(blocksize);for(var i=0;i<blocksize;i++){ipad[i]=key[i]^0x36;opad[i]=key[i]^0x5C;}this._hash=alg==='rmd160'?new RIPEMD160():sha(alg);this._hash.update(ipad);}inherits(Hmac,Base);Hmac.prototype._update=function(data){this._hash.update(data);};Hmac.prototype._final=function(){var h=this._hash.digest();var hash=this._alg==='rmd160'?new RIPEMD160():sha(this._alg);return hash.update(this._opad).update(h).digest();};module.exports=function createHmac(alg,key){alg=alg.toLowerCase();if(alg==='rmd160'||alg==='ripemd160'){return new Hmac('rmd160',key);}if(alg==='md5'){return new Legacy(md5,key);}return new Hmac(alg,key);};/***/},/* 76 *//***/function(module,exports){module.exports={"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}/***/};},/* 77 *//***/function(module,exports,__webpack_require__){exports.pbkdf2=__webpack_require__(152);exports.pbkdf2Sync=__webpack_require__(80);/***/},/* 78 *//***/function(module,exports){var MAX_ALLOC=Math.pow(2,30)-1;// default in iojs
module.exports=function(iterations,keylen){if(typeof iterations!=='number'){throw new TypeError('Iterations not a number');}if(iterations<0){throw new TypeError('Bad iterations');}if(typeof keylen!=='number'){throw new TypeError('Key length not a number');}if(keylen<0||keylen>MAX_ALLOC||keylen!==keylen){/* eslint no-self-compare: 0 */throw new TypeError('Bad key length');}};/***/},/* 79 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(process){var defaultEncoding;/* istanbul ignore next */if(process.browser){defaultEncoding='utf-8';}else{var pVersionMajor=parseInt(process.version.split('.')[0].slice(1),10);defaultEncoding=pVersionMajor>=6?'utf-8':'binary';}module.exports=defaultEncoding;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4));/***/},/* 80 *//***/function(module,exports,__webpack_require__){var md5=__webpack_require__(47);var rmd160=__webpack_require__(48);var sha=__webpack_require__(49);var checkParameters=__webpack_require__(78);var defaultEncoding=__webpack_require__(79);var Buffer=__webpack_require__(3).Buffer;var ZEROS=Buffer.alloc(128);var sizes={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,rmd160:20,ripemd160:20};function Hmac(alg,key,saltLen){var hash=getDigest(alg);var blocksize=alg==='sha512'||alg==='sha384'?128:64;if(key.length>blocksize){key=hash(key);}else if(key.length<blocksize){key=Buffer.concat([key,ZEROS],blocksize);}var ipad=Buffer.allocUnsafe(blocksize+sizes[alg]);var opad=Buffer.allocUnsafe(blocksize+sizes[alg]);for(var i=0;i<blocksize;i++){ipad[i]=key[i]^0x36;opad[i]=key[i]^0x5C;}var ipad1=Buffer.allocUnsafe(blocksize+saltLen+4);ipad.copy(ipad1,0,0,blocksize);this.ipad1=ipad1;this.ipad2=ipad;this.opad=opad;this.alg=alg;this.blocksize=blocksize;this.hash=hash;this.size=sizes[alg];}Hmac.prototype.run=function(data,ipad){data.copy(ipad,this.blocksize);var h=this.hash(ipad);h.copy(this.opad,this.blocksize);return this.hash(this.opad);};function getDigest(alg){function shaFunc(data){return sha(alg).update(data).digest();}if(alg==='rmd160'||alg==='ripemd160')return rmd160;if(alg==='md5')return md5;return shaFunc;}function pbkdf2(password,salt,iterations,keylen,digest){if(!Buffer.isBuffer(password))password=Buffer.from(password,defaultEncoding);if(!Buffer.isBuffer(salt))salt=Buffer.from(salt,defaultEncoding);checkParameters(iterations,keylen);digest=digest||'sha1';var hmac=new Hmac(digest,password,salt.length);var DK=Buffer.allocUnsafe(keylen);var block1=Buffer.allocUnsafe(salt.length+4);salt.copy(block1,0,0,salt.length);var destPos=0;var hLen=sizes[digest];var l=Math.ceil(keylen/hLen);for(var i=1;i<=l;i++){block1.writeUInt32BE(i,salt.length);var T=hmac.run(block1,hmac.ipad1);var U=T;for(var j=1;j<iterations;j++){U=hmac.run(U,hmac.ipad2);for(var k=0;k<hLen;k++){T[k]^=U[k];}}T.copy(DK,destPos);destPos+=hLen;}return DK;}module.exports=pbkdf2;/***/},/* 81 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var xor=__webpack_require__(24);function incr32(iv){var len=iv.length;var item;while(len--){item=iv.readUInt8(len);if(item===255){iv.writeUInt8(0,len);}else{item++;iv.writeUInt8(item,len);break;}}}function getBlock(self){var out=self._cipher.encryptBlockRaw(self._prev);incr32(self._prev);return out;}var blockSize=16;exports.encrypt=function(self,chunk){var chunkNum=Math.ceil(chunk.length/blockSize);var start=self._cache.length;self._cache=Buffer.concat([self._cache,Buffer.allocUnsafe(chunkNum*blockSize)]);for(var i=0;i<chunkNum;i++){var out=getBlock(self);var offset=start+i*blockSize;self._cache.writeUInt32BE(out[0],offset+0);self._cache.writeUInt32BE(out[1],offset+4);self._cache.writeUInt32BE(out[2],offset+8);self._cache.writeUInt32BE(out[3],offset+12);}var pad=self._cache.slice(0,chunk.length);self._cache=self._cache.slice(chunk.length);return xor(chunk,pad);};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 82 *//***/function(module,exports){module.exports={"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}/***/};},/* 83 *//***/function(module,exports,__webpack_require__){var aes=__webpack_require__(36);var Buffer=__webpack_require__(3).Buffer;var Transform=__webpack_require__(10);var inherits=__webpack_require__(1);var GHASH=__webpack_require__(163);var xor=__webpack_require__(24);function xorTest(a,b){var out=0;if(a.length!==b.length)out++;var len=Math.min(a.length,b.length);for(var i=0;i<len;++i){out+=a[i]^b[i];}return out;}function StreamCipher(mode,key,iv,decrypt){Transform.call(this);this._finID=Buffer.concat([iv,Buffer.from([0,0,0,1])]);iv=Buffer.concat([iv,Buffer.from([0,0,0,2])]);this._cipher=new aes.AES(key);this._prev=Buffer.from(iv);this._cache=Buffer.allocUnsafe(0);this._secCache=Buffer.allocUnsafe(0);this._decrypt=decrypt;this._alen=0;this._len=0;this._mode=mode;var h=Buffer.alloc(4,0);this._ghash=new GHASH(this._cipher.encryptBlock(h));this._authTag=null;this._called=false;}inherits(StreamCipher,Transform);StreamCipher.prototype._update=function(chunk){if(!this._called&&this._alen){var rump=16-this._alen%16;if(rump<16){rump=Buffer.alloc(rump,0);this._ghash.update(rump);}}this._called=true;var out=this._mode.encrypt(this,chunk);if(this._decrypt){this._ghash.update(chunk);}else{this._ghash.update(out);}this._len+=chunk.length;return out;};StreamCipher.prototype._final=function(){if(this._decrypt&&!this._authTag)throw new Error('Unsupported state or unable to authenticate data');var tag=xor(this._ghash.final(this._alen*8,this._len*8),this._cipher.encryptBlock(this._finID));if(this._decrypt&&xorTest(tag,this._authTag))throw new Error('Unsupported state or unable to authenticate data');this._authTag=tag;this._cipher.scrub();};StreamCipher.prototype.getAuthTag=function getAuthTag(){if(this._decrypt||!Buffer.isBuffer(this._authTag))throw new Error('Attempting to get auth tag in unsupported state');return this._authTag;};StreamCipher.prototype.setAuthTag=function setAuthTag(tag){if(!this._decrypt)throw new Error('Attempting to set auth tag in unsupported state');this._authTag=tag;};StreamCipher.prototype.setAAD=function setAAD(buf){if(this._called)throw new Error('Attempting to set AAD in unsupported state');this._ghash.update(buf);this._alen+=buf.length;};module.exports=StreamCipher;/***/},/* 84 *//***/function(module,exports,__webpack_require__){var aes=__webpack_require__(36);var Buffer=__webpack_require__(3).Buffer;var Transform=__webpack_require__(10);var inherits=__webpack_require__(1);function StreamCipher(mode,key,iv,decrypt){Transform.call(this);this._cipher=new aes.AES(key);this._prev=Buffer.from(iv);this._cache=Buffer.allocUnsafe(0);this._secCache=Buffer.allocUnsafe(0);this._decrypt=decrypt;this._mode=mode;}inherits(StreamCipher,Transform);StreamCipher.prototype._update=function(chunk){return this._mode.encrypt(this,chunk,this._decrypt);};StreamCipher.prototype._final=function(){this._cipher.scrub();};module.exports=StreamCipher;/***/},/* 85 *//***/function(module,exports,__webpack_require__){var randomBytes=__webpack_require__(22);module.exports=findPrime;findPrime.simpleSieve=simpleSieve;findPrime.fermatTest=fermatTest;var BN=__webpack_require__(2);var TWENTYFOUR=new BN(24);var MillerRabin=__webpack_require__(86);var millerRabin=new MillerRabin();var ONE=new BN(1);var TWO=new BN(2);var FIVE=new BN(5);var SIXTEEN=new BN(16);var EIGHT=new BN(8);var TEN=new BN(10);var THREE=new BN(3);var SEVEN=new BN(7);var ELEVEN=new BN(11);var FOUR=new BN(4);var TWELVE=new BN(12);var primes=null;function _getPrimes(){if(primes!==null)return primes;var limit=0x100000;var res=[];res[0]=2;for(var i=1,k=3;k<limit;k+=2){var sqrt=Math.ceil(Math.sqrt(k));for(var j=0;j<i&&res[j]<=sqrt;j++){if(k%res[j]===0)break;}if(i!==j&&res[j]<=sqrt)continue;res[i++]=k;}primes=res;return res;}function simpleSieve(p){var primes=_getPrimes();for(var i=0;i<primes.length;i++){if(p.modn(primes[i])===0){if(p.cmpn(primes[i])===0){return true;}else{return false;}}}return true;}function fermatTest(p){var red=BN.mont(p);return TWO.toRed(red).redPow(p.subn(1)).fromRed().cmpn(1)===0;}function findPrime(bits,gen){if(bits<16){// this is what openssl does
if(gen===2||gen===5){return new BN([0x8c,0x7b]);}else{return new BN([0x8c,0x27]);}}gen=new BN(gen);var num,n2;while(true){num=new BN(randomBytes(Math.ceil(bits/8)));while(num.bitLength()>bits){num.ishrn(1);}if(num.isEven()){num.iadd(ONE);}if(!num.testn(1)){num.iadd(TWO);}if(!gen.cmp(TWO)){while(num.mod(TWENTYFOUR).cmp(ELEVEN)){num.iadd(FOUR);}}else if(!gen.cmp(FIVE)){while(num.mod(TEN).cmp(THREE)){num.iadd(FOUR);}}n2=num.shrn(1);if(simpleSieve(n2)&&simpleSieve(num)&&fermatTest(n2)&&fermatTest(num)&&millerRabin.test(n2)&&millerRabin.test(num)){return num;}}}/***/},/* 86 *//***/function(module,exports,__webpack_require__){var bn=__webpack_require__(2);var brorand=__webpack_require__(87);function MillerRabin(rand){this.rand=rand||new brorand.Rand();}module.exports=MillerRabin;MillerRabin.create=function create(rand){return new MillerRabin(rand);};MillerRabin.prototype._rand=function _rand(n){var len=n.bitLength();var buf=this.rand.generate(Math.ceil(len/8));// Set low bits
buf[0]|=3;// Mask high bits
var mask=len&0x7;if(mask!==0)buf[buf.length-1]>>=7-mask;return new bn(buf);};MillerRabin.prototype.test=function test(n,k,cb){var len=n.bitLength();var red=bn.mont(n);var rone=new bn(1).toRed(red);if(!k)k=Math.max(1,len/48|0);// Find d and s, (n - 1) = (2 ^ s) * d;
var n1=n.subn(1);var n2=n1.subn(1);for(var s=0;!n1.testn(s);s++){}var d=n.shrn(s);var rn1=n1.toRed(red);var prime=true;for(;k>0;k--){var a=this._rand(n2);if(cb)cb(a);var x=a.toRed(red).redPow(d);if(x.cmp(rone)===0||x.cmp(rn1)===0)continue;for(var i=1;i<s;i++){x=x.redSqr();if(x.cmp(rone)===0)return false;if(x.cmp(rn1)===0)break;}if(i===s)return false;}return prime;};MillerRabin.prototype.getDivisor=function getDivisor(n,k){var len=n.bitLength();var red=bn.mont(n);var rone=new bn(1).toRed(red);if(!k)k=Math.max(1,len/48|0);// Find d and s, (n - 1) = (2 ^ s) * d;
var n1=n.subn(1);var n2=n1.subn(1);for(var s=0;!n1.testn(s);s++){}var d=n.shrn(s);var rn1=n1.toRed(red);for(;k>0;k--){var a=this._rand(n2);var g=n.gcd(a);if(g.cmpn(1)!==0)return g;var x=a.toRed(red).redPow(d);if(x.cmp(rone)===0||x.cmp(rn1)===0)continue;for(var i=1;i<s;i++){x=x.redSqr();if(x.cmp(rone)===0)return x.fromRed().subn(1).gcd(n);if(x.cmp(rn1)===0)break;}if(i===s){x=x.redSqr();return x.fromRed().subn(1).gcd(n);}}return false;};/***/},/* 87 *//***/function(module,exports,__webpack_require__){var r;module.exports=function rand(len){if(!r)r=new Rand(null);return r.generate(len);};function Rand(rand){this.rand=rand;}module.exports.Rand=Rand;Rand.prototype.generate=function generate(len){return this._rand(len);};// Emulate crypto API using randy
Rand.prototype._rand=function _rand(n){if(this.rand.getBytes)return this.rand.getBytes(n);var res=new Uint8Array(n);for(var i=0;i<res.length;i++){res[i]=this.rand.getByte();}return res;};if((typeof self==='undefined'?'undefined':(0,_typeof3.default)(self))==='object'){if(self.crypto&&self.crypto.getRandomValues){// Modern browsers
Rand.prototype._rand=function _rand(n){var arr=new Uint8Array(n);self.crypto.getRandomValues(arr);return arr;};}else if(self.msCrypto&&self.msCrypto.getRandomValues){// IE
Rand.prototype._rand=function _rand(n){var arr=new Uint8Array(n);self.msCrypto.getRandomValues(arr);return arr;};// Safari's WebWorkers do not have `crypto`
}else if((typeof window==='undefined'?'undefined':(0,_typeof3.default)(window))==='object'){// Old junk
Rand.prototype._rand=function(){throw new Error('Not implemented yet');};}}else{// Node.js or Web worker with no crypto support
try{var crypto=__webpack_require__(174);if(typeof crypto.randomBytes!=='function')throw new Error('Not supported');Rand.prototype._rand=function _rand(n){return crypto.randomBytes(n);};}catch(e){}}/***/},/* 88 *//***/function(module,exports,__webpack_require__){"use strict";var utils=exports;function toArray(msg,enc){if(Array.isArray(msg))return msg.slice();if(!msg)return[];var res=[];if(typeof msg!=='string'){for(var i=0;i<msg.length;i++){res[i]=msg[i]|0;}return res;}if(enc==='hex'){msg=msg.replace(/[^a-z0-9]+/ig,'');if(msg.length%2!==0)msg='0'+msg;for(var i=0;i<msg.length;i+=2){res.push(parseInt(msg[i]+msg[i+1],16));}}else{for(var i=0;i<msg.length;i++){var c=msg.charCodeAt(i);var hi=c>>8;var lo=c&0xff;if(hi)res.push(hi,lo);else res.push(lo);}}return res;}utils.toArray=toArray;function zero2(word){if(word.length===1)return'0'+word;else return word;}utils.zero2=zero2;function toHex(msg){var res='';for(var i=0;i<msg.length;i++){res+=zero2(msg[i].toString(16));}return res;}utils.toHex=toHex;utils.encode=function encode(arr,enc){if(enc==='hex')return toHex(arr);else return arr;};/***/},/* 89 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var rotr32=utils.rotr32;function ft_1(s,x,y,z){if(s===0)return ch32(x,y,z);if(s===1||s===3)return p32(x,y,z);if(s===2)return maj32(x,y,z);}exports.ft_1=ft_1;function ch32(x,y,z){return x&y^~x&z;}exports.ch32=ch32;function maj32(x,y,z){return x&y^x&z^y&z;}exports.maj32=maj32;function p32(x,y,z){return x^y^z;}exports.p32=p32;function s0_256(x){return rotr32(x,2)^rotr32(x,13)^rotr32(x,22);}exports.s0_256=s0_256;function s1_256(x){return rotr32(x,6)^rotr32(x,11)^rotr32(x,25);}exports.s1_256=s1_256;function g0_256(x){return rotr32(x,7)^rotr32(x,18)^x>>>3;}exports.g0_256=g0_256;function g1_256(x){return rotr32(x,17)^rotr32(x,19)^x>>>10;}exports.g1_256=g1_256;/***/},/* 90 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var common=__webpack_require__(25);var shaCommon=__webpack_require__(89);var assert=__webpack_require__(7);var sum32=utils.sum32;var sum32_4=utils.sum32_4;var sum32_5=utils.sum32_5;var ch32=shaCommon.ch32;var maj32=shaCommon.maj32;var s0_256=shaCommon.s0_256;var s1_256=shaCommon.s1_256;var g0_256=shaCommon.g0_256;var g1_256=shaCommon.g1_256;var BlockHash=common.BlockHash;var sha256_K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];function SHA256(){if(!(this instanceof SHA256))return new SHA256();BlockHash.call(this);this.h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];this.k=sha256_K;this.W=new Array(64);}utils.inherits(SHA256,BlockHash);module.exports=SHA256;SHA256.blockSize=512;SHA256.outSize=256;SHA256.hmacStrength=192;SHA256.padLength=64;SHA256.prototype._update=function _update(msg,start){var W=this.W;for(var i=0;i<16;i++){W[i]=msg[start+i];}for(;i<W.length;i++){W[i]=sum32_4(g1_256(W[i-2]),W[i-7],g0_256(W[i-15]),W[i-16]);}var a=this.h[0];var b=this.h[1];var c=this.h[2];var d=this.h[3];var e=this.h[4];var f=this.h[5];var g=this.h[6];var h=this.h[7];assert(this.k.length===W.length);for(i=0;i<W.length;i++){var T1=sum32_5(h,s1_256(e),ch32(e,f,g),this.k[i],W[i]);var T2=sum32(s0_256(a),maj32(a,b,c));h=g;g=f;f=e;e=sum32(d,T1);d=c;c=b;b=a;a=sum32(T1,T2);}this.h[0]=sum32(this.h[0],a);this.h[1]=sum32(this.h[1],b);this.h[2]=sum32(this.h[2],c);this.h[3]=sum32(this.h[3],d);this.h[4]=sum32(this.h[4],e);this.h[5]=sum32(this.h[5],f);this.h[6]=sum32(this.h[6],g);this.h[7]=sum32(this.h[7],h);};SHA256.prototype._digest=function digest(enc){if(enc==='hex')return utils.toHex32(this.h,'big');else return utils.split32(this.h,'big');};/***/},/* 91 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var common=__webpack_require__(25);var assert=__webpack_require__(7);var rotr64_hi=utils.rotr64_hi;var rotr64_lo=utils.rotr64_lo;var shr64_hi=utils.shr64_hi;var shr64_lo=utils.shr64_lo;var sum64=utils.sum64;var sum64_hi=utils.sum64_hi;var sum64_lo=utils.sum64_lo;var sum64_4_hi=utils.sum64_4_hi;var sum64_4_lo=utils.sum64_4_lo;var sum64_5_hi=utils.sum64_5_hi;var sum64_5_lo=utils.sum64_5_lo;var BlockHash=common.BlockHash;var sha512_K=[0x428a2f98,0xd728ae22,0x71374491,0x23ef65cd,0xb5c0fbcf,0xec4d3b2f,0xe9b5dba5,0x8189dbbc,0x3956c25b,0xf348b538,0x59f111f1,0xb605d019,0x923f82a4,0xaf194f9b,0xab1c5ed5,0xda6d8118,0xd807aa98,0xa3030242,0x12835b01,0x45706fbe,0x243185be,0x4ee4b28c,0x550c7dc3,0xd5ffb4e2,0x72be5d74,0xf27b896f,0x80deb1fe,0x3b1696b1,0x9bdc06a7,0x25c71235,0xc19bf174,0xcf692694,0xe49b69c1,0x9ef14ad2,0xefbe4786,0x384f25e3,0x0fc19dc6,0x8b8cd5b5,0x240ca1cc,0x77ac9c65,0x2de92c6f,0x592b0275,0x4a7484aa,0x6ea6e483,0x5cb0a9dc,0xbd41fbd4,0x76f988da,0x831153b5,0x983e5152,0xee66dfab,0xa831c66d,0x2db43210,0xb00327c8,0x98fb213f,0xbf597fc7,0xbeef0ee4,0xc6e00bf3,0x3da88fc2,0xd5a79147,0x930aa725,0x06ca6351,0xe003826f,0x14292967,0x0a0e6e70,0x27b70a85,0x46d22ffc,0x2e1b2138,0x5c26c926,0x4d2c6dfc,0x5ac42aed,0x53380d13,0x9d95b3df,0x650a7354,0x8baf63de,0x766a0abb,0x3c77b2a8,0x81c2c92e,0x47edaee6,0x92722c85,0x1482353b,0xa2bfe8a1,0x4cf10364,0xa81a664b,0xbc423001,0xc24b8b70,0xd0f89791,0xc76c51a3,0x0654be30,0xd192e819,0xd6ef5218,0xd6990624,0x5565a910,0xf40e3585,0x5771202a,0x106aa070,0x32bbd1b8,0x19a4c116,0xb8d2d0c8,0x1e376c08,0x5141ab53,0x2748774c,0xdf8eeb99,0x34b0bcb5,0xe19b48a8,0x391c0cb3,0xc5c95a63,0x4ed8aa4a,0xe3418acb,0x5b9cca4f,0x7763e373,0x682e6ff3,0xd6b2b8a3,0x748f82ee,0x5defb2fc,0x78a5636f,0x43172f60,0x84c87814,0xa1f0ab72,0x8cc70208,0x1a6439ec,0x90befffa,0x23631e28,0xa4506ceb,0xde82bde9,0xbef9a3f7,0xb2c67915,0xc67178f2,0xe372532b,0xca273ece,0xea26619c,0xd186b8c7,0x21c0c207,0xeada7dd6,0xcde0eb1e,0xf57d4f7f,0xee6ed178,0x06f067aa,0x72176fba,0x0a637dc5,0xa2c898a6,0x113f9804,0xbef90dae,0x1b710b35,0x131c471b,0x28db77f5,0x23047d84,0x32caab7b,0x40c72493,0x3c9ebe0a,0x15c9bebc,0x431d67c4,0x9c100d4c,0x4cc5d4be,0xcb3e42b6,0x597f299c,0xfc657e2a,0x5fcb6fab,0x3ad6faec,0x6c44198c,0x4a475817];function SHA512(){if(!(this instanceof SHA512))return new SHA512();BlockHash.call(this);this.h=[0x6a09e667,0xf3bcc908,0xbb67ae85,0x84caa73b,0x3c6ef372,0xfe94f82b,0xa54ff53a,0x5f1d36f1,0x510e527f,0xade682d1,0x9b05688c,0x2b3e6c1f,0x1f83d9ab,0xfb41bd6b,0x5be0cd19,0x137e2179];this.k=sha512_K;this.W=new Array(160);}utils.inherits(SHA512,BlockHash);module.exports=SHA512;SHA512.blockSize=1024;SHA512.outSize=512;SHA512.hmacStrength=192;SHA512.padLength=128;SHA512.prototype._prepareBlock=function _prepareBlock(msg,start){var W=this.W;// 32 x 32bit words
for(var i=0;i<32;i++){W[i]=msg[start+i];}for(;i<W.length;i+=2){var c0_hi=g1_512_hi(W[i-4],W[i-3]);// i - 2
var c0_lo=g1_512_lo(W[i-4],W[i-3]);var c1_hi=W[i-14];// i - 7
var c1_lo=W[i-13];var c2_hi=g0_512_hi(W[i-30],W[i-29]);// i - 15
var c2_lo=g0_512_lo(W[i-30],W[i-29]);var c3_hi=W[i-32];// i - 16
var c3_lo=W[i-31];W[i]=sum64_4_hi(c0_hi,c0_lo,c1_hi,c1_lo,c2_hi,c2_lo,c3_hi,c3_lo);W[i+1]=sum64_4_lo(c0_hi,c0_lo,c1_hi,c1_lo,c2_hi,c2_lo,c3_hi,c3_lo);}};SHA512.prototype._update=function _update(msg,start){this._prepareBlock(msg,start);var W=this.W;var ah=this.h[0];var al=this.h[1];var bh=this.h[2];var bl=this.h[3];var ch=this.h[4];var cl=this.h[5];var dh=this.h[6];var dl=this.h[7];var eh=this.h[8];var el=this.h[9];var fh=this.h[10];var fl=this.h[11];var gh=this.h[12];var gl=this.h[13];var hh=this.h[14];var hl=this.h[15];assert(this.k.length===W.length);for(var i=0;i<W.length;i+=2){var c0_hi=hh;var c0_lo=hl;var c1_hi=s1_512_hi(eh,el);var c1_lo=s1_512_lo(eh,el);var c2_hi=ch64_hi(eh,el,fh,fl,gh,gl);var c2_lo=ch64_lo(eh,el,fh,fl,gh,gl);var c3_hi=this.k[i];var c3_lo=this.k[i+1];var c4_hi=W[i];var c4_lo=W[i+1];var T1_hi=sum64_5_hi(c0_hi,c0_lo,c1_hi,c1_lo,c2_hi,c2_lo,c3_hi,c3_lo,c4_hi,c4_lo);var T1_lo=sum64_5_lo(c0_hi,c0_lo,c1_hi,c1_lo,c2_hi,c2_lo,c3_hi,c3_lo,c4_hi,c4_lo);c0_hi=s0_512_hi(ah,al);c0_lo=s0_512_lo(ah,al);c1_hi=maj64_hi(ah,al,bh,bl,ch,cl);c1_lo=maj64_lo(ah,al,bh,bl,ch,cl);var T2_hi=sum64_hi(c0_hi,c0_lo,c1_hi,c1_lo);var T2_lo=sum64_lo(c0_hi,c0_lo,c1_hi,c1_lo);hh=gh;hl=gl;gh=fh;gl=fl;fh=eh;fl=el;eh=sum64_hi(dh,dl,T1_hi,T1_lo);el=sum64_lo(dl,dl,T1_hi,T1_lo);dh=ch;dl=cl;ch=bh;cl=bl;bh=ah;bl=al;ah=sum64_hi(T1_hi,T1_lo,T2_hi,T2_lo);al=sum64_lo(T1_hi,T1_lo,T2_hi,T2_lo);}sum64(this.h,0,ah,al);sum64(this.h,2,bh,bl);sum64(this.h,4,ch,cl);sum64(this.h,6,dh,dl);sum64(this.h,8,eh,el);sum64(this.h,10,fh,fl);sum64(this.h,12,gh,gl);sum64(this.h,14,hh,hl);};SHA512.prototype._digest=function digest(enc){if(enc==='hex')return utils.toHex32(this.h,'big');else return utils.split32(this.h,'big');};function ch64_hi(xh,xl,yh,yl,zh){var r=xh&yh^~xh&zh;if(r<0)r+=0x100000000;return r;}function ch64_lo(xh,xl,yh,yl,zh,zl){var r=xl&yl^~xl&zl;if(r<0)r+=0x100000000;return r;}function maj64_hi(xh,xl,yh,yl,zh){var r=xh&yh^xh&zh^yh&zh;if(r<0)r+=0x100000000;return r;}function maj64_lo(xh,xl,yh,yl,zh,zl){var r=xl&yl^xl&zl^yl&zl;if(r<0)r+=0x100000000;return r;}function s0_512_hi(xh,xl){var c0_hi=rotr64_hi(xh,xl,28);var c1_hi=rotr64_hi(xl,xh,2);// 34
var c2_hi=rotr64_hi(xl,xh,7);// 39
var r=c0_hi^c1_hi^c2_hi;if(r<0)r+=0x100000000;return r;}function s0_512_lo(xh,xl){var c0_lo=rotr64_lo(xh,xl,28);var c1_lo=rotr64_lo(xl,xh,2);// 34
var c2_lo=rotr64_lo(xl,xh,7);// 39
var r=c0_lo^c1_lo^c2_lo;if(r<0)r+=0x100000000;return r;}function s1_512_hi(xh,xl){var c0_hi=rotr64_hi(xh,xl,14);var c1_hi=rotr64_hi(xh,xl,18);var c2_hi=rotr64_hi(xl,xh,9);// 41
var r=c0_hi^c1_hi^c2_hi;if(r<0)r+=0x100000000;return r;}function s1_512_lo(xh,xl){var c0_lo=rotr64_lo(xh,xl,14);var c1_lo=rotr64_lo(xh,xl,18);var c2_lo=rotr64_lo(xl,xh,9);// 41
var r=c0_lo^c1_lo^c2_lo;if(r<0)r+=0x100000000;return r;}function g0_512_hi(xh,xl){var c0_hi=rotr64_hi(xh,xl,1);var c1_hi=rotr64_hi(xh,xl,8);var c2_hi=shr64_hi(xh,xl,7);var r=c0_hi^c1_hi^c2_hi;if(r<0)r+=0x100000000;return r;}function g0_512_lo(xh,xl){var c0_lo=rotr64_lo(xh,xl,1);var c1_lo=rotr64_lo(xh,xl,8);var c2_lo=shr64_lo(xh,xl,7);var r=c0_lo^c1_lo^c2_lo;if(r<0)r+=0x100000000;return r;}function g1_512_hi(xh,xl){var c0_hi=rotr64_hi(xh,xl,19);var c1_hi=rotr64_hi(xl,xh,29);// 61
var c2_hi=shr64_hi(xh,xl,6);var r=c0_hi^c1_hi^c2_hi;if(r<0)r+=0x100000000;return r;}function g1_512_lo(xh,xl){var c0_lo=rotr64_lo(xh,xl,19);var c1_lo=rotr64_lo(xl,xh,29);// 61
var c2_lo=shr64_lo(xh,xl,6);var r=c0_lo^c1_lo^c2_lo;if(r<0)r+=0x100000000;return r;}/***/},/* 92 *//***/function(module,exports,__webpack_require__){var inherits=__webpack_require__(1);var Reporter=__webpack_require__(27).Reporter;var Buffer=__webpack_require__(0).Buffer;function DecoderBuffer(base,options){Reporter.call(this,options);if(!Buffer.isBuffer(base)){this.error('Input not Buffer');return;}this.base=base;this.offset=0;this.length=base.length;}inherits(DecoderBuffer,Reporter);exports.DecoderBuffer=DecoderBuffer;DecoderBuffer.prototype.save=function save(){return{offset:this.offset,reporter:Reporter.prototype.save.call(this)};};DecoderBuffer.prototype.restore=function restore(save){// Return skipped data
var res=new DecoderBuffer(this.base);res.offset=save.offset;res.length=this.offset;this.offset=save.offset;Reporter.prototype.restore.call(this,save.reporter);return res;};DecoderBuffer.prototype.isEmpty=function isEmpty(){return this.offset===this.length;};DecoderBuffer.prototype.readUInt8=function readUInt8(fail){if(this.offset+1<=this.length)return this.base.readUInt8(this.offset++,true);else return this.error(fail||'DecoderBuffer overrun');};DecoderBuffer.prototype.skip=function skip(bytes,fail){if(!(this.offset+bytes<=this.length))return this.error(fail||'DecoderBuffer overrun');var res=new DecoderBuffer(this.base);// Share reporter state
res._reporterState=this._reporterState;res.offset=this.offset;res.length=this.offset+bytes;this.offset+=bytes;return res;};DecoderBuffer.prototype.raw=function raw(save){return this.base.slice(save?save.offset:this.offset,this.length);};function EncoderBuffer(value,reporter){if(Array.isArray(value)){this.length=0;this.value=value.map(function(item){if(!(item instanceof EncoderBuffer))item=new EncoderBuffer(item,reporter);this.length+=item.length;return item;},this);}else if(typeof value==='number'){if(!(0<=value&&value<=0xff))return reporter.error('non-byte EncoderBuffer value');this.value=value;this.length=1;}else if(typeof value==='string'){this.value=value;this.length=Buffer.byteLength(value);}else if(Buffer.isBuffer(value)){this.value=value;this.length=value.length;}else{return reporter.error('Unsupported type: '+(typeof value==='undefined'?'undefined':(0,_typeof3.default)(value)));}}exports.EncoderBuffer=EncoderBuffer;EncoderBuffer.prototype.join=function join(out,offset){if(!out)out=new Buffer(this.length);if(!offset)offset=0;if(this.length===0)return out;if(Array.isArray(this.value)){this.value.forEach(function(item){item.join(out,offset);offset+=item.length;});}else{if(typeof this.value==='number')out[offset]=this.value;else if(typeof this.value==='string')out.write(this.value,offset);else if(Buffer.isBuffer(this.value))this.value.copy(out,offset);offset+=this.length;}return out;};/***/},/* 93 *//***/function(module,exports,__webpack_require__){var constants=exports;// Helper
constants._reverse=function reverse(map){var res={};(0,_keys2.default)(map).forEach(function(key){// Convert key to integer if it is stringified
if((key|0)==key)key=key|0;var value=map[key];res[value]=key;});return res;};constants.der=__webpack_require__(206);/***/},/* 94 *//***/function(module,exports,__webpack_require__){var inherits=__webpack_require__(1);var asn1=__webpack_require__(26);var base=asn1.base;var bignum=asn1.bignum;// Import DER constants
var der=asn1.constants.der;function DERDecoder(entity){this.enc='der';this.name=entity.name;this.entity=entity;// Construct base tree
this.tree=new DERNode();this.tree._init(entity.body);};module.exports=DERDecoder;DERDecoder.prototype.decode=function decode(data,options){if(!(data instanceof base.DecoderBuffer))data=new base.DecoderBuffer(data,options);return this.tree._decode(data,options);};// Tree methods
function DERNode(parent){base.Node.call(this,'der',parent);}inherits(DERNode,base.Node);DERNode.prototype._peekTag=function peekTag(buffer,tag,any){if(buffer.isEmpty())return false;var state=buffer.save();var decodedTag=derDecodeTag(buffer,'Failed to peek tag: "'+tag+'"');if(buffer.isError(decodedTag))return decodedTag;buffer.restore(state);return decodedTag.tag===tag||decodedTag.tagStr===tag||decodedTag.tagStr+'of'===tag||any;};DERNode.prototype._decodeTag=function decodeTag(buffer,tag,any){var decodedTag=derDecodeTag(buffer,'Failed to decode tag of "'+tag+'"');if(buffer.isError(decodedTag))return decodedTag;var len=derDecodeLen(buffer,decodedTag.primitive,'Failed to get length of "'+tag+'"');// Failure
if(buffer.isError(len))return len;if(!any&&decodedTag.tag!==tag&&decodedTag.tagStr!==tag&&decodedTag.tagStr+'of'!==tag){return buffer.error('Failed to match tag: "'+tag+'"');}if(decodedTag.primitive||len!==null)return buffer.skip(len,'Failed to match body of: "'+tag+'"');// Indefinite length... find END tag
var state=buffer.save();var res=this._skipUntilEnd(buffer,'Failed to skip indefinite length body: "'+this.tag+'"');if(buffer.isError(res))return res;len=buffer.offset-state.offset;buffer.restore(state);return buffer.skip(len,'Failed to match body of: "'+tag+'"');};DERNode.prototype._skipUntilEnd=function skipUntilEnd(buffer,fail){while(true){var tag=derDecodeTag(buffer,fail);if(buffer.isError(tag))return tag;var len=derDecodeLen(buffer,tag.primitive,fail);if(buffer.isError(len))return len;var res;if(tag.primitive||len!==null)res=buffer.skip(len);else res=this._skipUntilEnd(buffer,fail);// Failure
if(buffer.isError(res))return res;if(tag.tagStr==='end')break;}};DERNode.prototype._decodeList=function decodeList(buffer,tag,decoder,options){var result=[];while(!buffer.isEmpty()){var possibleEnd=this._peekTag(buffer,'end');if(buffer.isError(possibleEnd))return possibleEnd;var res=decoder.decode(buffer,'der',options);if(buffer.isError(res)&&possibleEnd)break;result.push(res);}return result;};DERNode.prototype._decodeStr=function decodeStr(buffer,tag){if(tag==='bitstr'){var unused=buffer.readUInt8();if(buffer.isError(unused))return unused;return{unused:unused,data:buffer.raw()};}else if(tag==='bmpstr'){var raw=buffer.raw();if(raw.length%2===1)return buffer.error('Decoding of string type: bmpstr length mismatch');var str='';for(var i=0;i<raw.length/2;i++){str+=String.fromCharCode(raw.readUInt16BE(i*2));}return str;}else if(tag==='numstr'){var numstr=buffer.raw().toString('ascii');if(!this._isNumstr(numstr)){return buffer.error('Decoding of string type: '+'numstr unsupported characters');}return numstr;}else if(tag==='octstr'){return buffer.raw();}else if(tag==='objDesc'){return buffer.raw();}else if(tag==='printstr'){var printstr=buffer.raw().toString('ascii');if(!this._isPrintstr(printstr)){return buffer.error('Decoding of string type: '+'printstr unsupported characters');}return printstr;}else if(/str$/.test(tag)){return buffer.raw().toString();}else{return buffer.error('Decoding of string type: '+tag+' unsupported');}};DERNode.prototype._decodeObjid=function decodeObjid(buffer,values,relative){var result;var identifiers=[];var ident=0;while(!buffer.isEmpty()){var subident=buffer.readUInt8();ident<<=7;ident|=subident&0x7f;if((subident&0x80)===0){identifiers.push(ident);ident=0;}}if(subident&0x80)identifiers.push(ident);var first=identifiers[0]/40|0;var second=identifiers[0]%40;if(relative)result=identifiers;else result=[first,second].concat(identifiers.slice(1));if(values){var tmp=values[result.join(' ')];if(tmp===undefined)tmp=values[result.join('.')];if(tmp!==undefined)result=tmp;}return result;};DERNode.prototype._decodeTime=function decodeTime(buffer,tag){var str=buffer.raw().toString();if(tag==='gentime'){var year=str.slice(0,4)|0;var mon=str.slice(4,6)|0;var day=str.slice(6,8)|0;var hour=str.slice(8,10)|0;var min=str.slice(10,12)|0;var sec=str.slice(12,14)|0;}else if(tag==='utctime'){var year=str.slice(0,2)|0;var mon=str.slice(2,4)|0;var day=str.slice(4,6)|0;var hour=str.slice(6,8)|0;var min=str.slice(8,10)|0;var sec=str.slice(10,12)|0;if(year<70)year=2000+year;else year=1900+year;}else{return buffer.error('Decoding '+tag+' time is not supported yet');}return Date.UTC(year,mon-1,day,hour,min,sec,0);};DERNode.prototype._decodeNull=function decodeNull(buffer){return null;};DERNode.prototype._decodeBool=function decodeBool(buffer){var res=buffer.readUInt8();if(buffer.isError(res))return res;else return res!==0;};DERNode.prototype._decodeInt=function decodeInt(buffer,values){// Bigint, return as it is (assume big endian)
var raw=buffer.raw();var res=new bignum(raw);if(values)res=values[res.toString(10)]||res;return res;};DERNode.prototype._use=function use(entity,obj){if(typeof entity==='function')entity=entity(obj);return entity._getDecoder('der').tree;};// Utility methods
function derDecodeTag(buf,fail){var tag=buf.readUInt8(fail);if(buf.isError(tag))return tag;var cls=der.tagClass[tag>>6];var primitive=(tag&0x20)===0;// Multi-octet tag - load
if((tag&0x1f)===0x1f){var oct=tag;tag=0;while((oct&0x80)===0x80){oct=buf.readUInt8(fail);if(buf.isError(oct))return oct;tag<<=7;tag|=oct&0x7f;}}else{tag&=0x1f;}var tagStr=der.tag[tag];return{cls:cls,primitive:primitive,tag:tag,tagStr:tagStr};}function derDecodeLen(buf,primitive,fail){var len=buf.readUInt8(fail);if(buf.isError(len))return len;// Indefinite form
if(!primitive&&len===0x80)return null;// Definite form
if((len&0x80)===0){// Short form
return len;}// Long form
var num=len&0x7f;if(num>4)return buf.error('length octect is too long');len=0;for(var i=0;i<num;i++){len<<=8;var j=buf.readUInt8(fail);if(buf.isError(j))return j;len|=j;}return len;}/***/},/* 95 *//***/function(module,exports,__webpack_require__){var inherits=__webpack_require__(1);var Buffer=__webpack_require__(0).Buffer;var asn1=__webpack_require__(26);var base=asn1.base;// Import DER constants
var der=asn1.constants.der;function DEREncoder(entity){this.enc='der';this.name=entity.name;this.entity=entity;// Construct base tree
this.tree=new DERNode();this.tree._init(entity.body);};module.exports=DEREncoder;DEREncoder.prototype.encode=function encode(data,reporter){return this.tree._encode(data,reporter).join();};// Tree methods
function DERNode(parent){base.Node.call(this,'der',parent);}inherits(DERNode,base.Node);DERNode.prototype._encodeComposite=function encodeComposite(tag,primitive,cls,content){var encodedTag=encodeTag(tag,primitive,cls,this.reporter);// Short form
if(content.length<0x80){var header=new Buffer(2);header[0]=encodedTag;header[1]=content.length;return this._createEncoderBuffer([header,content]);}// Long form
// Count octets required to store length
var lenOctets=1;for(var i=content.length;i>=0x100;i>>=8){lenOctets++;}var header=new Buffer(1+1+lenOctets);header[0]=encodedTag;header[1]=0x80|lenOctets;for(var i=1+lenOctets,j=content.length;j>0;i--,j>>=8){header[i]=j&0xff;}return this._createEncoderBuffer([header,content]);};DERNode.prototype._encodeStr=function encodeStr(str,tag){if(tag==='bitstr'){return this._createEncoderBuffer([str.unused|0,str.data]);}else if(tag==='bmpstr'){var buf=new Buffer(str.length*2);for(var i=0;i<str.length;i++){buf.writeUInt16BE(str.charCodeAt(i),i*2);}return this._createEncoderBuffer(buf);}else if(tag==='numstr'){if(!this._isNumstr(str)){return this.reporter.error('Encoding of string type: numstr supports '+'only digits and space');}return this._createEncoderBuffer(str);}else if(tag==='printstr'){if(!this._isPrintstr(str)){return this.reporter.error('Encoding of string type: printstr supports '+'only latin upper and lower case letters, '+'digits, space, apostrophe, left and rigth '+'parenthesis, plus sign, comma, hyphen, '+'dot, slash, colon, equal sign, '+'question mark');}return this._createEncoderBuffer(str);}else if(/str$/.test(tag)){return this._createEncoderBuffer(str);}else if(tag==='objDesc'){return this._createEncoderBuffer(str);}else{return this.reporter.error('Encoding of string type: '+tag+' unsupported');}};DERNode.prototype._encodeObjid=function encodeObjid(id,values,relative){if(typeof id==='string'){if(!values)return this.reporter.error('string objid given, but no values map found');if(!values.hasOwnProperty(id))return this.reporter.error('objid not found in values map');id=values[id].split(/[\s\.]+/g);for(var i=0;i<id.length;i++){id[i]|=0;}}else if(Array.isArray(id)){id=id.slice();for(var i=0;i<id.length;i++){id[i]|=0;}}if(!Array.isArray(id)){return this.reporter.error('objid() should be either array or string, '+'got: '+(0,_stringify2.default)(id));}if(!relative){if(id[1]>=40)return this.reporter.error('Second objid identifier OOB');id.splice(0,2,id[0]*40+id[1]);}// Count number of octets
var size=0;for(var i=0;i<id.length;i++){var ident=id[i];for(size++;ident>=0x80;ident>>=7){size++;}}var objid=new Buffer(size);var offset=objid.length-1;for(var i=id.length-1;i>=0;i--){var ident=id[i];objid[offset--]=ident&0x7f;while((ident>>=7)>0){objid[offset--]=0x80|ident&0x7f;}}return this._createEncoderBuffer(objid);};function two(num){if(num<10)return'0'+num;else return num;}DERNode.prototype._encodeTime=function encodeTime(time,tag){var str;var date=new Date(time);if(tag==='gentime'){str=[two(date.getFullYear()),two(date.getUTCMonth()+1),two(date.getUTCDate()),two(date.getUTCHours()),two(date.getUTCMinutes()),two(date.getUTCSeconds()),'Z'].join('');}else if(tag==='utctime'){str=[two(date.getFullYear()%100),two(date.getUTCMonth()+1),two(date.getUTCDate()),two(date.getUTCHours()),two(date.getUTCMinutes()),two(date.getUTCSeconds()),'Z'].join('');}else{this.reporter.error('Encoding '+tag+' time is not supported yet');}return this._encodeStr(str,'octstr');};DERNode.prototype._encodeNull=function encodeNull(){return this._createEncoderBuffer('');};DERNode.prototype._encodeInt=function encodeInt(num,values){if(typeof num==='string'){if(!values)return this.reporter.error('String int or enum given, but no values map');if(!values.hasOwnProperty(num)){return this.reporter.error('Values map doesn\'t contain: '+(0,_stringify2.default)(num));}num=values[num];}// Bignum, assume big endian
if(typeof num!=='number'&&!Buffer.isBuffer(num)){var numArray=num.toArray();if(!num.sign&&numArray[0]&0x80){numArray.unshift(0);}num=new Buffer(numArray);}if(Buffer.isBuffer(num)){var size=num.length;if(num.length===0)size++;var out=new Buffer(size);num.copy(out);if(num.length===0)out[0]=0;return this._createEncoderBuffer(out);}if(num<0x80)return this._createEncoderBuffer(num);if(num<0x100)return this._createEncoderBuffer([0,num]);var size=1;for(var i=num;i>=0x100;i>>=8){size++;}var out=new Array(size);for(var i=out.length-1;i>=0;i--){out[i]=num&0xff;num>>=8;}if(out[0]&0x80){out.unshift(0);}return this._createEncoderBuffer(new Buffer(out));};DERNode.prototype._encodeBool=function encodeBool(value){return this._createEncoderBuffer(value?0xff:0);};DERNode.prototype._use=function use(entity,obj){if(typeof entity==='function')entity=entity(obj);return entity._getEncoder('der').tree;};DERNode.prototype._skipDefault=function skipDefault(dataBuffer,reporter,parent){var state=this._baseState;var i;if(state['default']===null)return false;var data=dataBuffer.join();if(state.defaultBuffer===undefined)state.defaultBuffer=this._encodeValue(state['default'],reporter,parent).join();if(data.length!==state.defaultBuffer.length)return false;for(i=0;i<data.length;i++){if(data[i]!==state.defaultBuffer[i])return false;}return true;};// Utility methods
function encodeTag(tag,primitive,cls,reporter){var res;if(tag==='seqof')tag='seq';else if(tag==='setof')tag='set';if(der.tagByName.hasOwnProperty(tag))res=der.tagByName[tag];else if(typeof tag==='number'&&(tag|0)===tag)res=tag;else return reporter.error('Unknown tag: '+tag);if(res>=0x1f)return reporter.error('Multi-octet tag encoding unsupported');if(!primitive)res|=0x20;res|=der.tagClassByName[cls||'universal']<<6;return res;}/***/},/* 96 *//***/function(module,exports){module.exports={"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"/***/};},/* 97 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var createHash=__webpack_require__(23);module.exports=function(seed,len){var t=new Buffer('');var i=0,c;while(t.length<len){c=i2ops(i++);t=Buffer.concat([t,createHash('sha1').update(seed).update(c).digest()]);}return t.slice(0,len);};function i2ops(c){var out=new Buffer(4);out.writeUInt32BE(c,0);return out;}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 98 *//***/function(module,exports){module.exports=function xor(a,b){var len=a.length;var i=-1;while(++i<len){a[i]^=b[i];}return a;};/***/},/* 99 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var bn=__webpack_require__(2);function withPublic(paddedMsg,key){return new Buffer(paddedMsg.toRed(bn.mont(key.modulus)).redPow(new bn(key.publicExponent)).fromRed().toArray());}module.exports=withPublic;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 100 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * RegExp to check for no-cache token in Cache-Control.
 * @private
 */var CACHE_CONTROL_NO_CACHE_REGEXP=/(?:^|,)\s*?no-cache\s*?(?:,|$)/;/**
 * Simple expression to split token list.
 * @private
 */var TOKEN_LIST_REGEXP=/ *, */;/**
 * Module exports.
 * @public
 */module.exports=fresh;/**
 * Check freshness of the response using request and response headers.
 *
 * @param {Object} reqHeaders
 * @param {Object} resHeaders
 * @return {Boolean}
 * @public
 */function fresh(reqHeaders,resHeaders){// fields
var modifiedSince=reqHeaders['if-modified-since'];var noneMatch=reqHeaders['if-none-match'];// unconditional request
if(!modifiedSince&&!noneMatch){return false;}// Always return stale when Cache-Control: no-cache
// to support end-to-end reload requests
// https://tools.ietf.org/html/rfc2616#section-14.9.4
var cacheControl=reqHeaders['cache-control'];if(cacheControl&&CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)){return false;}// if-none-match
if(noneMatch&&noneMatch!=='*'){var etag=resHeaders['etag'];var etagStale=!etag||noneMatch.split(TOKEN_LIST_REGEXP).every(function(match){return match!==etag&&match!=='W/'+etag&&'W/'+match!==etag;});if(etagStale){return false;}}// if-modified-since
if(modifiedSince){var lastModified=resHeaders['last-modified'];var modifiedStale=!lastModified||Date.parse(lastModified)>Date.parse(modifiedSince);if(modifiedStale){return false;}}return true;}/***/},/* 101 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * range-parser
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=rangeParser;/**
 * Parse "Range" header `str` relative to the given file `size`.
 *
 * @param {Number} size
 * @param {String} str
 * @param {Object} [options]
 * @return {Array}
 * @public
 */function rangeParser(size,str,options){var index=str.indexOf('=');if(index===-1){return-2;}// split the range string
var arr=str.slice(index+1).split(',');var ranges=[];// add ranges type
ranges.type=str.slice(0,index);// parse all ranges
for(var i=0;i<arr.length;i++){var range=arr[i].split('-');var start=parseInt(range[0],10);var end=parseInt(range[1],10);// -nnn
if(isNaN(start)){start=size-end;end=size-1;// nnn-
}else if(isNaN(end)){end=size-1;}// limit last-byte-pos to current length
if(end>size-1){end=size-1;}// invalid or unsatisifiable
if(isNaN(start)||isNaN(end)||start>end||start<0){continue;}// add range
ranges.push({start:start,end:end});}if(ranges.length<1){// unsatisifiable
return-1;}return options&&options.combine?combineRanges(ranges):ranges;}/**
 * Combine overlapping & adjacent ranges.
 * @private
 */function combineRanges(ranges){var ordered=ranges.map(mapWithIndex).sort(sortByRangeStart);for(var j=0,i=1;i<ordered.length;i++){var range=ordered[i];var current=ordered[j];if(range.start>current.end+1){// next range
ordered[++j]=range;}else if(range.end>current.end){// extend range
current.end=range.end;current.index=Math.min(current.index,range.index);}}// trim ordered array
ordered.length=j+1;// generate combined range
var combined=ordered.sort(sortByRangeIndex).map(mapWithoutIndex);// copy ranges type
combined.type=ranges.type;return combined;}/**
 * Map function to add index value to ranges.
 * @private
 */function mapWithIndex(range,index){return{start:range.start,end:range.end,index:index};}/**
 * Map function to remove index value from ranges.
 * @private
 */function mapWithoutIndex(range){return{start:range.start,end:range.end};}/**
 * Sort function to sort ranges by index.
 * @private
 */function sortByRangeIndex(a,b){return a.index-b.index;}/**
 * Sort function to sort ranges by start position.
 * @private
 */function sortByRangeStart(a,b){return a.start-b.start;}/***/},/* 102 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * proxy-addr
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=proxyaddr;module.exports.all=alladdrs;module.exports.compile=compile;/**
 * Module dependencies.
 * @private
 */var forwarded=__webpack_require__(224);var ipaddr=__webpack_require__(225);/**
 * Variables.
 * @private
 */var digitre=/^[0-9]+$/;var isip=ipaddr.isValid;var parseip=ipaddr.parse;/**
 * Pre-defined IP ranges.
 * @private
 */var ipranges={linklocal:['169.254.0.0/16','fe80::/10'],loopback:['127.0.0.1/8','::1/128'],uniquelocal:['10.0.0.0/8','172.16.0.0/12','192.168.0.0/16','fc00::/7']};/**
 * Get all addresses in the request, optionally stopping
 * at the first untrusted.
 *
 * @param {Object} request
 * @param {Function|Array|String} [trust]
 * @public
 */function alladdrs(req,trust){// get addresses
var addrs=forwarded(req);if(!trust){// Return all addresses
return addrs;}if(typeof trust!=='function'){trust=compile(trust);}for(var i=0;i<addrs.length-1;i++){if(trust(addrs[i],i))continue;addrs.length=i+1;}return addrs;}/**
 * Compile argument into trust function.
 *
 * @param {Array|String} val
 * @private
 */function compile(val){if(!val){throw new TypeError('argument is required');}var trust;if(typeof val==='string'){trust=[val];}else if(Array.isArray(val)){trust=val.slice();}else{throw new TypeError('unsupported trust argument');}for(var i=0;i<trust.length;i++){val=trust[i];if(!ipranges.hasOwnProperty(val)){continue;}// Splice in pre-defined range
val=ipranges[val];trust.splice.apply(trust,[i,1].concat(val));i+=val.length-1;}return compileTrust(compileRangeSubnets(trust));}/**
 * Compile `arr` elements into range subnets.
 *
 * @param {Array} arr
 * @private
 */function compileRangeSubnets(arr){var rangeSubnets=new Array(arr.length);for(var i=0;i<arr.length;i++){rangeSubnets[i]=parseipNotation(arr[i]);}return rangeSubnets;}/**
 * Compile range subnet array into trust function.
 *
 * @param {Array} rangeSubnets
 * @private
 */function compileTrust(rangeSubnets){// Return optimized function based on length
var len=rangeSubnets.length;return len===0?trustNone:len===1?trustSingle(rangeSubnets[0]):trustMulti(rangeSubnets);}/**
 * Parse IP notation string into range subnet.
 *
 * @param {String} note
 * @private
 */function parseipNotation(note){var pos=note.lastIndexOf('/');var str=pos!==-1?note.substring(0,pos):note;if(!isip(str)){throw new TypeError('invalid IP address: '+str);}var ip=parseip(str);if(pos===-1&&ip.kind()==='ipv6'&&ip.isIPv4MappedAddress()){// Store as IPv4
ip=ip.toIPv4Address();}var max=ip.kind()==='ipv6'?128:32;var range=pos!==-1?note.substring(pos+1,note.length):null;if(range===null){range=max;}else if(digitre.test(range)){range=parseInt(range,10);}else if(ip.kind()==='ipv4'&&isip(range)){range=parseNetmask(range);}else{range=null;}if(range<=0||range>max){throw new TypeError('invalid range on address: '+note);}return[ip,range];}/**
 * Parse netmask string into CIDR range.
 *
 * @param {String} netmask
 * @private
 */function parseNetmask(netmask){var ip=parseip(netmask);var kind=ip.kind();return kind==='ipv4'?ip.prefixLengthFromSubnetMask():null;}/**
 * Determine address of proxied request.
 *
 * @param {Object} request
 * @param {Function|Array|String} trust
 * @public
 */function proxyaddr(req,trust){if(!req){throw new TypeError('req argument is required');}if(!trust){throw new TypeError('trust argument is required');}var addrs=alladdrs(req,trust);var addr=addrs[addrs.length-1];return addr;}/**
 * Static trust function to trust nothing.
 *
 * @private
 */function trustNone(){return false;}/**
 * Compile trust function for multiple subnets.
 *
 * @param {Array} subnets
 * @private
 */function trustMulti(subnets){return function trust(addr){if(!isip(addr))return false;var ip=parseip(addr);var ipconv;var kind=ip.kind();for(var i=0;i<subnets.length;i++){var subnet=subnets[i];var subnetip=subnet[0];var subnetkind=subnetip.kind();var subnetrange=subnet[1];var trusted=ip;if(kind!==subnetkind){if(subnetkind==='ipv4'&&!ip.isIPv4MappedAddress()){// Incompatible IP addresses
continue;}if(!ipconv){// Convert IP to match subnet IP kind
ipconv=subnetkind==='ipv4'?ip.toIPv4Address():ip.toIPv4MappedAddress();}trusted=ipconv;}if(trusted.match(subnetip,subnetrange)){return true;}}return false;};}/**
 * Compile trust function for single subnet.
 *
 * @param {Object} subnet
 * @private
 */function trustSingle(subnet){var subnetip=subnet[0];var subnetkind=subnetip.kind();var subnetisipv4=subnetkind==='ipv4';var subnetrange=subnet[1];return function trust(addr){if(!isip(addr))return false;var ip=parseip(addr);var kind=ip.kind();if(kind!==subnetkind){if(subnetisipv4&&!ip.isIPv4MappedAddress()){// Incompatible IP addresses
return false;}// Convert IP to match subnet IP kind
ip=subnetisipv4?ip.toIPv4Address():ip.toIPv4MappedAddress();}return ip.match(subnetip,subnetrange);};}/***/},/* 103 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var db=__webpack_require__(233);var extname=__webpack_require__(9).extname;/**
 * Module variables.
 * @private
 */var EXTRACT_TYPE_REGEXP=/^\s*([^;\s]*)(?:;|\s|$)/;var TEXT_TYPE_REGEXP=/^text\//i;/**
 * Module exports.
 * @public
 */exports.charset=charset;exports.charsets={lookup:charset};exports.contentType=contentType;exports.extension=extension;exports.extensions=(0,_create2.default)(null);exports.lookup=lookup;exports.types=(0,_create2.default)(null);// Populate the extensions/types maps
populateMaps(exports.extensions,exports.types);/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */function charset(type){if(!type||typeof type!=='string'){return false;}// TODO: use media-typer
var match=EXTRACT_TYPE_REGEXP.exec(type);var mime=match&&db[match[1].toLowerCase()];if(mime&&mime.charset){return mime.charset;}// default text/* to utf-8
if(match&&TEXT_TYPE_REGEXP.test(match[1])){return'UTF-8';}return false;}/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */function contentType(str){// TODO: should this even be in this module?
if(!str||typeof str!=='string'){return false;}var mime=str.indexOf('/')===-1?exports.lookup(str):str;if(!mime){return false;}// TODO: use content-type or other module
if(mime.indexOf('charset')===-1){var charset=exports.charset(mime);if(charset)mime+='; charset='+charset.toLowerCase();}return mime;}/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */function extension(type){if(!type||typeof type!=='string'){return false;}// TODO: use media-typer
var match=EXTRACT_TYPE_REGEXP.exec(type);// get extensions
var exts=match&&exports.extensions[match[1].toLowerCase()];if(!exts||!exts.length){return false;}return exts[0];}/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */function lookup(path){if(!path||typeof path!=='string'){return false;}// get the extension ("ext" or ".ext" or full path)
var extension=extname('x.'+path).toLowerCase().substr(1);if(!extension){return false;}return exports.types[extension]||false;}/**
 * Populate the extensions and types maps.
 * @private
 */function populateMaps(extensions,types){// source preference (least -> most)
var preference=['nginx','apache',undefined,'iana'];(0,_keys2.default)(db).forEach(function forEachMimeType(type){var mime=db[type];var exts=mime.extensions;if(!exts||!exts.length){return;}// mime -> extensions
extensions[type]=exts;// extension -> mime
for(var i=0;i<exts.length;i++){var extension=exts[i];if(types[extension]){var from=preference.indexOf(db[types[extension]].source);var to=preference.indexOf(mime.source);if(types[extension]!=='application/octet-stream'&&(from>to||from===to&&types[extension].substr(0,12)==='application/')){// skip the remapping
continue;}}// set the extension -> mime
types[extension]=type;}});}/***/},/* 104 *//***/function(module,exports,__webpack_require__){"use strict";/**
 * Created by Yoana on 9/7/2017.
 *///import  FirstComponent from './firstReactComponent'
var express=__webpack_require__(105);var app=express();app.use(express.static('../public'));//app.get('/',function(request,response){
// response.sendfile(__dirname,'/public/index.html');
//});
app.listen(3000);/***/},/* 105 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */module.exports=__webpack_require__(106);/***/},/* 106 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 */var EventEmitter=__webpack_require__(17).EventEmitter;var mixin=__webpack_require__(107);var proto=__webpack_require__(108);var Route=__webpack_require__(59);var Router=__webpack_require__(58);var req=__webpack_require__(226);var res=__webpack_require__(237);/**
 * Expose `createApplication()`.
 */exports=module.exports=createApplication;/**
 * Create an express application.
 *
 * @return {Function}
 * @api public
 */function createApplication(){var app=function app(req,res,next){app.handle(req,res,next);};mixin(app,EventEmitter.prototype,false);mixin(app,proto,false);// expose the prototype that will get set on requests
app.request=(0,_create2.default)(req,{app:{configurable:true,enumerable:true,writable:true,value:app}});// expose the prototype that will get set on responses
app.response=(0,_create2.default)(res,{app:{configurable:true,enumerable:true,writable:true,value:app}});app.init();return app;}/**
 * Expose the prototypes.
 */exports.application=proto;exports.request=req;exports.response=res;/**
 * Expose constructors.
 */exports.Route=Route;exports.Router=Router;/**
 * Expose middleware
 */exports.query=__webpack_require__(61);exports.static=__webpack_require__(241);/**
 * Replace removed middleware with an appropriate error message.
 */['json','urlencoded','bodyParser','compress','cookieSession','session','logger','cookieParser','favicon','responseTime','errorHandler','timeout','methodOverride','vhost','csrf','directory','limit','multipart','staticCache'].forEach(function(name){(0,_defineProperty2.default)(exports,name,{get:function get(){throw new Error('Most middleware (like '+name+') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');},configurable:true});});/***/},/* 107 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=merge;/**
 * Module variables.
 * @private
 */var hasOwnProperty=Object.prototype.hasOwnProperty;/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */function merge(dest,src,redefine){if(!dest){throw new TypeError('argument dest is required');}if(!src){throw new TypeError('argument src is required');}if(redefine===undefined){// Default to true
redefine=true;}(0,_getOwnPropertyNames2.default)(src).forEach(function forEachOwnPropertyName(name){if(!redefine&&hasOwnProperty.call(dest,name)){// Skip desriptor
return;}// Copy descriptor
var descriptor=(0,_getOwnPropertyDescriptor2.default)(src,name);(0,_defineProperty2.default)(dest,name,descriptor);});return dest;}/***/},/* 108 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(process){/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var finalhandler=__webpack_require__(109);var Router=__webpack_require__(58);var methods=__webpack_require__(42);var middleware=__webpack_require__(123);var query=__webpack_require__(61);var debug=__webpack_require__(11)('express:application');var View=__webpack_require__(126);var http=__webpack_require__(43);var compileETag=__webpack_require__(14).compileETag;var compileQueryParser=__webpack_require__(14).compileQueryParser;var compileTrust=__webpack_require__(14).compileTrust;var deprecate=__webpack_require__(12)('express');var flatten=__webpack_require__(31);var merge=__webpack_require__(32);var resolve=__webpack_require__(9).resolve;var setPrototypeOf=__webpack_require__(33);var slice=Array.prototype.slice;/**
 * Application prototype.
 */var app=exports=module.exports={};/**
 * Variable for trust proxy inheritance back-compat
 * @private
 */var trustProxyDefaultSymbol='@@symbol:trust_proxy_default';/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 *   - setup route reflection methods
 *
 * @private
 */app.init=function init(){this.cache={};this.engines={};this.settings={};this.defaultConfiguration();};/**
 * Initialize application configuration.
 * @private
 */app.defaultConfiguration=function defaultConfiguration(){var env=process.env.NODE_ENV||'development';// default settings
this.enable('x-powered-by');this.set('etag','weak');this.set('env',env);this.set('query parser','extended');this.set('subdomain offset',2);this.set('trust proxy',false);// trust proxy inherit back-compat
(0,_defineProperty2.default)(this.settings,trustProxyDefaultSymbol,{configurable:true,value:true});debug('booting in %s mode',env);this.on('mount',function onmount(parent){// inherit trust proxy
if(this.settings[trustProxyDefaultSymbol]===true&&typeof parent.settings['trust proxy fn']==='function'){delete this.settings['trust proxy'];delete this.settings['trust proxy fn'];}// inherit protos
setPrototypeOf(this.request,parent.request);setPrototypeOf(this.response,parent.response);setPrototypeOf(this.engines,parent.engines);setPrototypeOf(this.settings,parent.settings);});// setup locals
this.locals=(0,_create2.default)(null);// top-most app is mounted at /
this.mountpath='/';// default locals
this.locals.settings=this.settings;// default configuration
this.set('view',View);this.set('views',resolve('views'));this.set('jsonp callback name','callback');if(env==='production'){this.enable('view cache');}Object.defineProperty(this,'router',{get:function get(){throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');}});};/**
 * lazily adds the base router if it has not yet been added.
 *
 * We cannot add the base router in the defaultConfiguration because
 * it reads app settings which might be set after that has run.
 *
 * @private
 */app.lazyrouter=function lazyrouter(){if(!this._router){this._router=new Router({caseSensitive:this.enabled('case sensitive routing'),strict:this.enabled('strict routing')});this._router.use(query(this.get('query parser fn')));this._router.use(middleware.init(this));}};/**
 * Dispatch a req, res pair into the application. Starts pipeline processing.
 *
 * If no callback is provided, then default error handlers will respond
 * in the event of an error bubbling through the stack.
 *
 * @private
 */app.handle=function handle(req,res,callback){var router=this._router;// final handler
var done=callback||finalhandler(req,res,{env:this.get('env'),onerror:logerror.bind(this)});// no routes
if(!router){debug('no routes defined on app');done();return;}router.handle(req,res,done);};/**
 * Proxy `Router#use()` to add middleware to the app router.
 * See Router#use() documentation for details.
 *
 * If the _fn_ parameter is an express app, then it will be
 * mounted at the _route_ specified.
 *
 * @public
 */app.use=function use(fn){var offset=0;var path='/';// default path to '/'
// disambiguate app.use([fn])
if(typeof fn!=='function'){var arg=fn;while(Array.isArray(arg)&&arg.length!==0){arg=arg[0];}// first arg is the path
if(typeof arg!=='function'){offset=1;path=fn;}}var fns=flatten(slice.call(arguments,offset));if(fns.length===0){throw new TypeError('app.use() requires middleware functions');}// setup router
this.lazyrouter();var router=this._router;fns.forEach(function(fn){// non-express app
if(!fn||!fn.handle||!fn.set){return router.use(path,fn);}debug('.use app under %s',path);fn.mountpath=path;fn.parent=this;// restore .app property on req and res
router.use(path,function mounted_app(req,res,next){var orig=req.app;fn.handle(req,res,function(err){setPrototypeOf(req,orig.request);setPrototypeOf(res,orig.response);next(err);});});// mounted an app
fn.emit('mount',this);},this);return this;};/**
 * Proxy to the app `Router#route()`
 * Returns a new `Route` instance for the _path_.
 *
 * Routes are isolated middleware stacks for specific paths.
 * See the Route api docs for details.
 *
 * @public
 */app.route=function route(path){this.lazyrouter();return this._router.route(path);};/**
 * Register the given template engine callback `fn`
 * as `ext`.
 *
 * By default will `require()` the engine based on the
 * file extension. For example if you try to render
 * a "foo.ejs" file Express will invoke the following internally:
 *
 *     app.engine('ejs', require('ejs').__express);
 *
 * For engines that do not provide `.__express` out of the box,
 * or if you wish to "map" a different extension to the template engine
 * you may use this method. For example mapping the EJS template engine to
 * ".html" files:
 *
 *     app.engine('html', require('ejs').renderFile);
 *
 * In this case EJS provides a `.renderFile()` method with
 * the same signature that Express expects: `(path, options, callback)`,
 * though note that it aliases this method as `ejs.__express` internally
 * so if you're using ".ejs" extensions you dont need to do anything.
 *
 * Some template engines do not follow this convention, the
 * [Consolidate.js](https://github.com/tj/consolidate.js)
 * library was created to map all of node's popular template
 * engines to follow this convention, thus allowing them to
 * work seamlessly within Express.
 *
 * @param {String} ext
 * @param {Function} fn
 * @return {app} for chaining
 * @public
 */app.engine=function engine(ext,fn){if(typeof fn!=='function'){throw new Error('callback function required');}// get file extension
var extension=ext[0]!=='.'?'.'+ext:ext;// store engine
this.engines[extension]=fn;return this;};/**
 * Proxy to `Router#param()` with one added api feature. The _name_ parameter
 * can be an array of names.
 *
 * See the Router#param() docs for more details.
 *
 * @param {String|Array} name
 * @param {Function} fn
 * @return {app} for chaining
 * @public
 */app.param=function param(name,fn){this.lazyrouter();if(Array.isArray(name)){for(var i=0;i<name.length;i++){this.param(name[i],fn);}return this;}this._router.param(name,fn);return this;};/**
 * Assign `setting` to `val`, or return `setting`'s value.
 *
 *    app.set('foo', 'bar');
 *    app.get('foo');
 *    // => "bar"
 *
 * Mounted servers inherit their parent server's settings.
 *
 * @param {String} setting
 * @param {*} [val]
 * @return {Server} for chaining
 * @public
 */app.set=function set(setting,val){if(arguments.length===1){// app.get(setting)
return this.settings[setting];}debug('set "%s" to %o',setting,val);// set value
this.settings[setting]=val;// trigger matched settings
switch(setting){case'etag':this.set('etag fn',compileETag(val));break;case'query parser':this.set('query parser fn',compileQueryParser(val));break;case'trust proxy':this.set('trust proxy fn',compileTrust(val));// trust proxy inherit back-compat
(0,_defineProperty2.default)(this.settings,trustProxyDefaultSymbol,{configurable:true,value:false});break;}return this;};/**
 * Return the app's absolute pathname
 * based on the parent(s) that have
 * mounted it.
 *
 * For example if the application was
 * mounted as "/admin", which itself
 * was mounted as "/blog" then the
 * return value would be "/blog/admin".
 *
 * @return {String}
 * @private
 */app.path=function path(){return this.parent?this.parent.path()+this.mountpath:'';};/**
 * Check if `setting` is enabled (truthy).
 *
 *    app.enabled('foo')
 *    // => false
 *
 *    app.enable('foo')
 *    app.enabled('foo')
 *    // => true
 *
 * @param {String} setting
 * @return {Boolean}
 * @public
 */app.enabled=function enabled(setting){return Boolean(this.set(setting));};/**
 * Check if `setting` is disabled.
 *
 *    app.disabled('foo')
 *    // => true
 *
 *    app.enable('foo')
 *    app.disabled('foo')
 *    // => false
 *
 * @param {String} setting
 * @return {Boolean}
 * @public
 */app.disabled=function disabled(setting){return!this.set(setting);};/**
 * Enable `setting`.
 *
 * @param {String} setting
 * @return {app} for chaining
 * @public
 */app.enable=function enable(setting){return this.set(setting,true);};/**
 * Disable `setting`.
 *
 * @param {String} setting
 * @return {app} for chaining
 * @public
 */app.disable=function disable(setting){return this.set(setting,false);};/**
 * Delegate `.VERB(...)` calls to `router.VERB(...)`.
 */methods.forEach(function(method){app[method]=function(path){if(method==='get'&&arguments.length===1){// app.get(setting)
return this.set(path);}this.lazyrouter();var route=this._router.route(path);route[method].apply(route,slice.call(arguments,1));return this;};});/**
 * Special-cased "all" method, applying the given route `path`,
 * middleware, and callback to _every_ HTTP method.
 *
 * @param {String} path
 * @param {Function} ...
 * @return {app} for chaining
 * @public
 */app.all=function all(path){this.lazyrouter();var route=this._router.route(path);var args=slice.call(arguments,1);for(var i=0;i<methods.length;i++){route[methods[i]].apply(route,args);}return this;};// del -> delete alias
app.del=deprecate.function(app.delete,'app.del: Use app.delete instead');/**
 * Render the given view `name` name with `options`
 * and a callback accepting an error and the
 * rendered template string.
 *
 * Example:
 *
 *    app.render('email', { name: 'Tobi' }, function(err, html){
 *      // ...
 *    })
 *
 * @param {String} name
 * @param {Object|Function} options or fn
 * @param {Function} callback
 * @public
 */app.render=function render(name,options,callback){var cache=this.cache;var done=callback;var engines=this.engines;var opts=options;var renderOptions={};var view;// support callback function as second arg
if(typeof options==='function'){done=options;opts={};}// merge app.locals
merge(renderOptions,this.locals);// merge options._locals
if(opts._locals){merge(renderOptions,opts._locals);}// merge options
merge(renderOptions,opts);// set .cache unless explicitly provided
if(renderOptions.cache==null){renderOptions.cache=this.enabled('view cache');}// primed cache
if(renderOptions.cache){view=cache[name];}// view
if(!view){var View=this.get('view');view=new View(name,{defaultEngine:this.get('view engine'),root:this.get('views'),engines:engines});if(!view.path){var dirs=Array.isArray(view.root)&&view.root.length>1?'directories "'+view.root.slice(0,-1).join('", "')+'" or "'+view.root[view.root.length-1]+'"':'directory "'+view.root+'"';var err=new Error('Failed to lookup view "'+name+'" in views '+dirs);err.view=view;return done(err);}// prime the cache
if(renderOptions.cache){cache[name]=view;}}// render
tryRender(view,renderOptions,done);};/**
 * Listen for connections.
 *
 * A node `http.Server` is returned, with this
 * application (which is a `Function`) as its
 * callback. If you wish to create both an HTTP
 * and HTTPS server you may do so with the "http"
 * and "https" modules as shown here:
 *
 *    var http = require('http')
 *      , https = require('https')
 *      , express = require('express')
 *      , app = express();
 *
 *    http.createServer(app).listen(80);
 *    https.createServer({ ... }, app).listen(443);
 *
 * @return {http.Server}
 * @public
 */app.listen=function listen(){var server=http.createServer(this);return server.listen.apply(server,arguments);};/**
 * Log error using console.error.
 *
 * @param {Error} err
 * @private
 */function logerror(err){/* istanbul ignore next */if(this.get('env')!=='test')console.error(err.stack||err.toString());}/**
 * Try rendering a view.
 * @private
 */function tryRender(view,options,callback){try{view.render(options,callback);}catch(err){callback(err);}}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4));/***/},/* 109 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(setImmediate,process,Buffer){/*!
 * finalhandler
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var debug=__webpack_require__(11)('finalhandler');var encodeUrl=__webpack_require__(28);var escapeHtml=__webpack_require__(29);var onFinished=__webpack_require__(39);var parseUrl=__webpack_require__(19);var statuses=__webpack_require__(30);var unpipe=__webpack_require__(120);/**
 * Module variables.
 * @private
 */var DOUBLE_SPACE_REGEXP=/\x20{2}/g;var NEWLINE_REGEXP=/\n/g;/* istanbul ignore next */var defer=typeof setImmediate==='function'?setImmediate:function(fn){process.nextTick(fn.bind.apply(fn,arguments));};var isFinished=onFinished.isFinished;/**
 * Create a minimal HTML document.
 *
 * @param {string} message
 * @private
 */function createHtmlDocument(message){var body=escapeHtml(message).replace(NEWLINE_REGEXP,'<br>').replace(DOUBLE_SPACE_REGEXP,' &nbsp;');return'<!DOCTYPE html>\n'+'<html lang="en">\n'+'<head>\n'+'<meta charset="utf-8">\n'+'<title>Error</title>\n'+'</head>\n'+'<body>\n'+'<pre>'+body+'</pre>\n'+'</body>\n'+'</html>\n';}/**
 * Module exports.
 * @public
 */module.exports=finalhandler;/**
 * Create a function to handle the final response.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} [options]
 * @return {Function}
 * @public
 */function finalhandler(req,res,options){var opts=options||{};// get environment
var env=opts.env||process.env.NODE_ENV||'development';// get error callback
var onerror=opts.onerror;return function(err){var headers;var msg;var status;// ignore 404 on in-flight response
if(!err&&res._header){debug('cannot 404 after headers sent');return;}// unhandled error
if(err){// respect status code from error
status=getErrorStatusCode(err);// respect headers from error
if(status!==undefined){headers=getErrorHeaders(err);}// fallback to status code on response
if(status===undefined){status=getResponseStatusCode(res);}// get error message
msg=getErrorMessage(err,status,env);}else{// not found
status=404;msg='Cannot '+req.method+' '+encodeUrl(parseUrl.original(req).pathname);}debug('default %s',status);// schedule onerror callback
if(err&&onerror){defer(onerror,err,req,res);}// cannot actually respond
if(res._header){debug('cannot %d after headers sent',status);req.socket.destroy();return;}// send response
send(req,res,status,headers,msg);};}/**
 * Get headers from Error object.
 *
 * @param {Error} err
 * @return {object}
 * @private
 */function getErrorHeaders(err){if(!err.headers||(0,_typeof3.default)(err.headers)!=='object'){return undefined;}var headers=(0,_create2.default)(null);var keys=(0,_keys2.default)(err.headers);for(var i=0;i<keys.length;i++){var key=keys[i];headers[key]=err.headers[key];}return headers;}/**
 * Get message from Error object, fallback to status message.
 *
 * @param {Error} err
 * @param {number} status
 * @param {string} env
 * @return {string}
 * @private
 */function getErrorMessage(err,status,env){var msg;if(env!=='production'){// use err.stack, which typically includes err.message
msg=err.stack;// fallback to err.toString() when possible
if(!msg&&typeof err.toString==='function'){msg=err.toString();}}return msg||statuses[status];}/**
 * Get status code from Error object.
 *
 * @param {Error} err
 * @return {number}
 * @private
 */function getErrorStatusCode(err){// check err.status
if(typeof err.status==='number'&&err.status>=400&&err.status<600){return err.status;}// check err.statusCode
if(typeof err.statusCode==='number'&&err.statusCode>=400&&err.statusCode<600){return err.statusCode;}return undefined;}/**
 * Get status code from response.
 *
 * @param {OutgoingMessage} res
 * @return {number}
 * @private
 */function getResponseStatusCode(res){var status=res.statusCode;// default status code to 500 if outside valid range
if(typeof status!=='number'||status<400||status>599){status=500;}return status;}/**
 * Send response.
 *
 * @param {IncomingMessage} req
 * @param {OutgoingMessage} res
 * @param {number} status
 * @param {object} headers
 * @param {string} message
 * @private
 */function send(req,res,status,headers,message){function write(){// response body
var body=createHtmlDocument(message);// response status
res.statusCode=status;res.statusMessage=statuses[status];// response headers
setHeaders(res,headers);// security headers
res.setHeader('Content-Security-Policy',"default-src 'self'");res.setHeader('X-Content-Type-Options','nosniff');// standard headers
res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Content-Length',Buffer.byteLength(body,'utf8'));if(req.method==='HEAD'){res.end();return;}res.end(body,'utf8');}if(isFinished(req)){write();return;}// unpipe everything from the request
unpipe(req);// flush the request
onFinished(req,write);req.resume();}/**
 * Set response headers from an object.
 *
 * @param {OutgoingMessage} res
 * @param {object} headers
 * @private
 */function setHeaders(res,headers){if(!headers){return;}var keys=(0,_keys2.default)(headers);for(var i=0;i<keys.length;i++){var key=keys[i];res.setHeader(key,headers[key]);}}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(18).setImmediate,__webpack_require__(4),__webpack_require__(0).Buffer);/***/},/* 110 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global,process){(function(global,undefined){"use strict";if(global.setImmediate){return;}var nextHandle=1;// Spec says greater than zero
var tasksByHandle={};var currentlyRunningATask=false;var doc=global.document;var registerImmediate;function setImmediate(callback){// Callback can either be a function or a string
if(typeof callback!=="function"){callback=new Function(""+callback);}// Copy function arguments
var args=new Array(arguments.length-1);for(var i=0;i<args.length;i++){args[i]=arguments[i+1];}// Store and register the task
var task={callback:callback,args:args};tasksByHandle[nextHandle]=task;registerImmediate(nextHandle);return nextHandle++;}function clearImmediate(handle){delete tasksByHandle[handle];}function run(task){var callback=task.callback;var args=task.args;switch(args.length){case 0:callback();break;case 1:callback(args[0]);break;case 2:callback(args[0],args[1]);break;case 3:callback(args[0],args[1],args[2]);break;default:callback.apply(undefined,args);break;}}function runIfPresent(handle){// From the spec: "Wait until any invocations of this algorithm started before this one have completed."
// So if we're currently running a task, we'll need to delay this invocation.
if(currentlyRunningATask){// Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
// "too much recursion" error.
setTimeout(runIfPresent,0,handle);}else{var task=tasksByHandle[handle];if(task){currentlyRunningATask=true;try{run(task);}finally{clearImmediate(handle);currentlyRunningATask=false;}}}}function installNextTickImplementation(){registerImmediate=function registerImmediate(handle){process.nextTick(function(){runIfPresent(handle);});};}function canUsePostMessage(){// The test against `importScripts` prevents this implementation from being installed inside a web worker,
// where `global.postMessage` means something completely different and can't be used for this purpose.
if(global.postMessage&&!global.importScripts){var postMessageIsAsynchronous=true;var oldOnMessage=global.onmessage;global.onmessage=function(){postMessageIsAsynchronous=false;};global.postMessage("","*");global.onmessage=oldOnMessage;return postMessageIsAsynchronous;}}function installPostMessageImplementation(){// Installs an event handler on `global` for the `message` event: see
// * https://developer.mozilla.org/en/DOM/window.postMessage
// * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
var messagePrefix="setImmediate$"+Math.random()+"$";var onGlobalMessage=function onGlobalMessage(event){if(event.source===global&&typeof event.data==="string"&&event.data.indexOf(messagePrefix)===0){runIfPresent(+event.data.slice(messagePrefix.length));}};if(global.addEventListener){global.addEventListener("message",onGlobalMessage,false);}else{global.attachEvent("onmessage",onGlobalMessage);}registerImmediate=function registerImmediate(handle){global.postMessage(messagePrefix+handle,"*");};}function installMessageChannelImplementation(){var channel=new MessageChannel();channel.port1.onmessage=function(event){var handle=event.data;runIfPresent(handle);};registerImmediate=function registerImmediate(handle){channel.port2.postMessage(handle);};}function installReadyStateChangeImplementation(){var html=doc.documentElement;registerImmediate=function registerImmediate(handle){// Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
// into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
var script=doc.createElement("script");script.onreadystatechange=function(){runIfPresent(handle);script.onreadystatechange=null;html.removeChild(script);script=null;};html.appendChild(script);};}function installSetTimeoutImplementation(){registerImmediate=function registerImmediate(handle){setTimeout(runIfPresent,0,handle);};}// If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
var attachTo=_getPrototypeOf2.default&&(0,_getPrototypeOf2.default)(global);attachTo=attachTo&&attachTo.setTimeout?attachTo:global;// Don't get fooled by e.g. browserify environments.
if({}.toString.call(global.process)==="[object process]"){// For Node.js before 0.9
installNextTickImplementation();}else if(canUsePostMessage()){// For non-IE10 modern browsers
installPostMessageImplementation();}else if(global.MessageChannel){// For web workers, where supported
installMessageChannelImplementation();}else if(doc&&"onreadystatechange"in doc.createElement("script")){// For IE 6–8
installReadyStateChangeImplementation();}else{// For older browsers
installSetTimeoutImplementation();}attachTo.setImmediate=setImmediate;attachTo.clearImmediate=clearImmediate;})(typeof self==="undefined"?typeof global==="undefined"?this:global:self);/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6),__webpack_require__(4));/***/},/* 111 *//***/function(module,exports,__webpack_require__){"use strict";exports.byteLength=byteLength;exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=='undefined'?Uint8Array:Array;var code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i;}revLookup['-'.charCodeAt(0)]=62;revLookup['_'.charCodeAt(0)]=63;function placeHoldersCount(b64){var len=b64.length;if(len%4>0){throw new Error('Invalid string. Length must be a multiple of 4');}// the number of equal signs (place holders)
// if there are two placeholders, than the two characters before it
// represent one byte
// if there is only one, then the three characters before it represent 2 bytes
// this is just a cheap hack to not do indexOf twice
return b64[len-2]==='='?2:b64[len-1]==='='?1:0;}function byteLength(b64){// base64 is 4/3 + up to two characters of the original data
return b64.length*3/4-placeHoldersCount(b64);}function toByteArray(b64){var i,l,tmp,placeHolders,arr;var len=b64.length;placeHolders=placeHoldersCount(b64);arr=new Arr(len*3/4-placeHolders);// if there are placeholders, only get up to the last complete 4 chars
l=placeHolders>0?len-4:len;var L=0;for(i=0;i<l;i+=4){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[L++]=tmp>>16&0xFF;arr[L++]=tmp>>8&0xFF;arr[L++]=tmp&0xFF;}if(placeHolders===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[L++]=tmp&0xFF;}else if(placeHolders===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[L++]=tmp>>8&0xFF;arr[L++]=tmp&0xFF;}return arr;}function tripletToBase64(num){return lookup[num>>18&0x3F]+lookup[num>>12&0x3F]+lookup[num>>6&0x3F]+lookup[num&0x3F];}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output.push(tripletToBase64(tmp));}return output.join('');}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;// if we have 1 byte left, pad 2 bytes
var output='';var parts=[];var maxChunkLength=16383;// must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff later
for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));}// pad the end with zeros, but make sure to not forget the extra bytes
if(extraBytes===1){tmp=uint8[len-1];output+=lookup[tmp>>2];output+=lookup[tmp<<4&0x3F];output+='==';}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];output+=lookup[tmp>>10];output+=lookup[tmp>>4&0x3F];output+=lookup[tmp<<2&0x3F];output+='=';}parts.push(output);return parts.join('');}/***/},/* 112 *//***/function(module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias;}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity;}else{m=m+Math.pow(2,mLen);e=e-eBias;}return(s?-1:1)*m*Math.pow(2,e-mLen);};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax;}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2;}if(e+eBias>=1){value+=rt/c;}else{value+=rt*Math.pow(2,1-eBias);}if(value*c>=2){e++;c/=2;}if(e+eBias>=eMax){m=0;e=eMax;}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias;}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0;}}for(;mLen>=8;buffer[offset+i]=m&0xff,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&0xff,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128;};/***/},/* 113 *//***/function(module,exports,__webpack_require__){/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */exports=module.exports=createDebug.debug=createDebug['default']=createDebug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=__webpack_require__(56);/**
 * The currently active debug mode names, and names to skip.
 */exports.names=[];exports.skips=[];/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */exports.formatters={};/**
 * Previous log timestamp.
 */var prevTime;/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */function selectColor(namespace){var hash=0,i;for(i in namespace){hash=(hash<<5)-hash+namespace.charCodeAt(i);hash|=0;// Convert to 32bit integer
}return exports.colors[Math.abs(hash)%exports.colors.length];}/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */function createDebug(namespace){function debug(){// disabled?
if(!debug.enabled)return;var self=debug;// set `diff` timestamp
var curr=+new Date();var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;// turn the `arguments` into a proper Array
var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i];}args[0]=exports.coerce(args[0]);if('string'!==typeof args[0]){// anything else let's inspect with %O
args.unshift('%O');}// apply any `formatters` transformations
var index=0;args[0]=args[0].replace(/%([a-zA-Z%])/g,function(match,format){// if we encounter an escaped % then don't increase the array index
if(match==='%%')return match;index++;var formatter=exports.formatters[format];if('function'===typeof formatter){var val=args[index];match=formatter.call(self,val);// now we need to remove `args[index]` since it's inlined in the `format`
args.splice(index,1);index--;}return match;});// apply env-specific formatting (colors, etc.)
exports.formatArgs.call(self,args);var logFn=debug.log||exports.log||console.log.bind(console);logFn.apply(self,args);}debug.namespace=namespace;debug.enabled=exports.enabled(namespace);debug.useColors=exports.useColors();debug.color=selectColor(namespace);// env-specific initialization logic for debug instances
if('function'===typeof exports.init){exports.init(debug);}return debug;}/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */function enable(namespaces){exports.save(namespaces);exports.names=[];exports.skips=[];var split=(typeof namespaces==='string'?namespaces:'').split(/[\s,]+/);var len=split.length;for(var i=0;i<len;i++){if(!split[i])continue;// ignore empty strings
namespaces=split[i].replace(/\*/g,'.*?');if(namespaces[0]==='-'){exports.skips.push(new RegExp('^'+namespaces.substr(1)+'$'));}else{exports.names.push(new RegExp('^'+namespaces+'$'));}}}/**
 * Disable debug output.
 *
 * @api public
 */function disable(){exports.enable('');}/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */function enabled(name){var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return false;}}for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return true;}}return false;}/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */function coerce(val){if(val instanceof Error)return val.stack||val.message;return val;}/***/},/* 114 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=first;/**
 * Get the first event in a set of event emitters and event pairs.
 *
 * @param {array} stuff
 * @param {function} done
 * @public
 */function first(stuff,done){if(!Array.isArray(stuff))throw new TypeError('arg must be an array of [ee, events...] arrays');var cleanups=[];for(var i=0;i<stuff.length;i++){var arr=stuff[i];if(!Array.isArray(arr)||arr.length<2)throw new TypeError('each array member must be [ee, events...]');var ee=arr[0];for(var j=1;j<arr.length;j++){var event=arr[j];var fn=listener(event,callback);// listen to the event
ee.on(event,fn);// push this listener to the list of cleanups
cleanups.push({ee:ee,event:event,fn:fn});}}function callback(){cleanup();done.apply(null,arguments);}function cleanup(){var x;for(var i=0;i<cleanups.length;i++){x=cleanups[i];x.ee.removeListener(x.event,x.fn);}}function thunk(fn){done=fn;}thunk.cancel=cleanup;return thunk;}/**
 * Create the event listener.
 * @private
 */function listener(event,done){return function onevent(arg1){var args=new Array(arguments.length);var ee=this;var err=event==='error'?arg1:null;// copy args to prevent arguments escaping scope
for(var i=0;i<args.length;i++){args[i]=arguments[i];}done(err,ee,event,args);};}/***/},/* 115 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(module,global){var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */;(function(root){/** Detect free variables */var freeExports=(typeof exports==='undefined'?'undefined':(0,_typeof3.default)(exports))=='object'&&exports&&!exports.nodeType&&exports;var freeModule=(typeof module==='undefined'?'undefined':(0,_typeof3.default)(module))=='object'&&module&&!module.nodeType&&module;var freeGlobal=(typeof global==='undefined'?'undefined':(0,_typeof3.default)(global))=='object'&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal||freeGlobal.self===freeGlobal){root=freeGlobal;}/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */var punycode,/** Highest positive signed 32-bit float value */maxInt=2147483647,// aka. 0x7FFFFFFF or 2^31-1
/** Bootstring parameters */base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,// 0x80
delimiter='-',// '\x2D'
/** Regular expressions */regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,// unprintable ASCII chars + non-ASCII chars
regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,// RFC 3490 separators
/** Error messages */errors={'overflow':'Overflow: input needs wider integers to process','not-basic':'Illegal input >= 0x80 (not a basic code point)','invalid-input':'Invalid input'},/** Convenience shortcuts */baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode,/** Temporary variable */key;/*--------------------------------------------------------------------------*//**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */function error(type){throw new RangeError(errors[type]);}/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */function map(array,fn){var length=array.length;var result=[];while(length--){result[length]=fn(array[length]);}return result;}/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */function mapDomain(string,fn){var parts=string.split('@');var result='';if(parts.length>1){// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
result=parts[0]+'@';string=parts[1];}// Avoid `split(regex)` for IE8 compatibility. See #17.
string=string.replace(regexSeparators,'\x2E');var labels=string.split('.');var encoded=map(labels,fn).join('.');return result+encoded;}/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */function ucs2decode(string){var output=[],counter=0,length=string.length,value,extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){// high surrogate, and there is a next character
extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){// low surrogate
output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
output.push(value);counter--;}}else{output.push(value);}}return output;}/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */function ucs2encode(array){return map(array,function(value){var output='';if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}output+=stringFromCharCode(value);return output;}).join('');}/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */function basicToDigit(codePoint){if(codePoint-48<10){return codePoint-22;}if(codePoint-65<26){return codePoint-65;}if(codePoint-97<26){return codePoint-97;}return base;}/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */function digitToBasic(digit,flag){//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
return digit+22+75*(digit<26)-((flag!=0)<<5);}/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */function adapt(delta,numPoints,firstTime){var k=0;delta=firstTime?floor(delta/damp):delta>>1;delta+=floor(delta/numPoints);for(;/* no initialization */delta>baseMinusTMin*tMax>>1;k+=base){delta=floor(delta/baseMinusTMin);}return floor(k+(baseMinusTMin+1)*delta/(delta+skew));}/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */function decode(input){// Don't use UCS-2
var output=[],inputLength=input.length,out,i=0,n=initialN,bias=initialBias,basic,j,index,oldi,w,k,digit,t,/** Cached calculation results */baseMinusT;// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.
basic=input.lastIndexOf(delimiter);if(basic<0){basic=0;}for(j=0;j<basic;++j){// if it's not a basic code point
if(input.charCodeAt(j)>=0x80){error('not-basic');}output.push(input.charCodeAt(j));}// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.
for(index=basic>0?basic+1:0;index<inputLength;)/* no final expression */{// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
for(oldi=i,w=1,k=base;;/* no condition */k+=base){if(index>=inputLength){error('invalid-input');}digit=basicToDigit(input.charCodeAt(index++));if(digit>=base||digit>floor((maxInt-i)/w)){error('overflow');}i+=digit*w;t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(digit<t){break;}baseMinusT=base-t;if(w>floor(maxInt/baseMinusT)){error('overflow');}w*=baseMinusT;}out=output.length+1;bias=adapt(i-oldi,out,oldi==0);// `i` was supposed to wrap around from `out` to `0`,
// incrementing `n` each time, so we'll fix that now:
if(floor(i/out)>maxInt-n){error('overflow');}n+=floor(i/out);i%=out;// Insert `n` at position `i` of the output
output.splice(i++,0,n);}return ucs2encode(output);}/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output=[],/** `inputLength` will hold the number of code points in `input`. */inputLength,/** Cached calculation results */handledCPCountPlusOne,baseMinusT,qMinusT;// Convert the input in UCS-2 to Unicode
input=ucs2decode(input);// Cache the length
inputLength=input.length;// Initialize the state
n=initialN;delta=0;bias=initialBias;// Handle the basic code points
for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<0x80){output.push(stringFromCharCode(currentValue));}}handledCPCount=basicLength=output.length;// `handledCPCount` is the number of code points that have been handled;
// `basicLength` is the number of basic code points.
// Finish the basic string - if it is not empty - with a delimiter
if(basicLength){output.push(delimiter);}// Main encoding loop:
while(handledCPCount<inputLength){// All non-basic code points < n have been handled already. Find the next
// larger one:
for(m=maxInt,j=0;j<inputLength;++j){currentValue=input[j];if(currentValue>=n&&currentValue<m){m=currentValue;}}// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
handledCPCountPlusOne=handledCPCount+1;if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){error('overflow');}delta+=(m-n)*handledCPCountPlusOne;n=m;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<n&&++delta>maxInt){error('overflow');}if(currentValue==n){// Represent delta as a generalized variable-length integer
for(q=delta,k=base;;/* no condition */k+=base){t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(q<t){break;}qMinusT=q-t;baseMinusT=base-t;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));q=floor(qMinusT/baseMinusT);}output.push(stringFromCharCode(digitToBasic(q,0)));bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);delta=0;++handledCPCount;}}++delta;++n;}return output.join('');}/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string;});}/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?'xn--'+encode(string):string;});}/*--------------------------------------------------------------------------*//** Define the public API */punycode={/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */'version':'1.4.1',/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */'ucs2':{'decode':ucs2decode,'encode':ucs2encode},'decode':decode,'encode':encode,'toASCII':toASCII,'toUnicode':toUnicode};/** Expose `punycode` */// Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(true){!(__WEBPACK_AMD_DEFINE_RESULT__=function(){return punycode;}.call(exports,__webpack_require__,exports,module),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(freeExports&&freeModule){if(module.exports==freeExports){// in Node.js, io.js, or RingoJS v0.8.0+
freeModule.exports=punycode;}else{// in Narwhal or RingoJS v0.7.0-
for(key in punycode){punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);}}}else{// in Rhino or a web browser
root.punycode=punycode;}})(this);/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(41)(module),__webpack_require__(6));/***/},/* 116 *//***/function(module,exports,__webpack_require__){"use strict";module.exports={isString:function isString(arg){return typeof arg==='string';},isObject:function isObject(arg){return(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='object'&&arg!==null;},isNull:function isNull(arg){return arg===null;},isNullOrUndefined:function isNullOrUndefined(arg){return arg==null;}};/***/},/* 117 *//***/function(module,exports,__webpack_require__){"use strict";// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}module.exports=function(qs,sep,eq,options){sep=sep||'&';eq=eq||'=';var obj={};if(typeof qs!=='string'||qs.length===0){return obj;}var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1000;if(options&&typeof options.maxKeys==='number'){maxKeys=options.maxKeys;}var len=qs.length;// maxKeys <= 0 means that we should not limit keys count
if(maxKeys>0&&len>maxKeys){len=maxKeys;}for(var i=0;i<len;++i){var x=qs[i].replace(regexp,'%20'),idx=x.indexOf(eq),kstr,vstr,k,v;if(idx>=0){kstr=x.substr(0,idx);vstr=x.substr(idx+1);}else{kstr=x;vstr='';}k=decodeURIComponent(kstr);v=decodeURIComponent(vstr);if(!hasOwnProperty(obj,k)){obj[k]=v;}else if(isArray(obj[k])){obj[k].push(v);}else{obj[k]=[obj[k],v];}}return obj;};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};/***/},/* 118 *//***/function(module,exports,__webpack_require__){"use strict";// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var stringifyPrimitive=function stringifyPrimitive(v){switch(typeof v==='undefined'?'undefined':(0,_typeof3.default)(v)){case'string':return v;case'boolean':return v?'true':'false';case'number':return isFinite(v)?v:'';default:return'';}};module.exports=function(obj,sep,eq,name){sep=sep||'&';eq=eq||'=';if(obj===null){obj=undefined;}if((typeof obj==='undefined'?'undefined':(0,_typeof3.default)(obj))==='object'){return map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;if(isArray(obj[k])){return map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v));}).join(sep);}else{return ks+encodeURIComponent(stringifyPrimitive(obj[k]));}}).join(sep);}if(!name)return'';return encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj));};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};function map(xs,f){if(xs.map)return xs.map(f);var res=[];for(var i=0;i<xs.length;i++){res.push(f(xs[i],i));}return res;}var objectKeys=_keys2.default||function(obj){var res=[];for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))res.push(key);}return res;};/***/},/* 119 *//***/function(module,exports){module.exports={"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"(Unused)","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"/***/};},/* 120 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * unpipe
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=unpipe;/**
 * Determine if there are Node.js pipe-like data listeners.
 * @private
 */function hasPipeDataListeners(stream){var listeners=stream.listeners('data');for(var i=0;i<listeners.length;i++){if(listeners[i].name==='ondata'){return true;}}return false;}/**
 * Unpipe a stream from all destinations.
 *
 * @param {object} stream
 * @public
 */function unpipe(stream){if(!stream){throw new TypeError('argument stream is required');}if(typeof stream.unpipe==='function'){// new-style
stream.unpipe();return;}// Node.js 0.8 hack
if(!hasPipeDataListeners(stream)){return;}var listener;var listeners=stream.listeners('close');for(var i=0;i<listeners.length;i++){listener=listeners[i];if(listener.name!=='cleanup'&&listener.name!=='onclose'){continue;}// invoke the listener
listener.call(stream);}}/***/},/* 121 *//***/function(module,exports){/**
 * Expose `pathtoRegexp`.
 */module.exports=pathtoRegexp;/**
 * Match matching groups in a regular expression.
 */var MATCHING_GROUP_REGEXP=/\((?!\?)/g;/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {Object} options
 * @return {RegExp}
 * @api private
 */function pathtoRegexp(path,keys,options){options=options||{};keys=keys||[];var strict=options.strict;var end=options.end!==false;var flags=options.sensitive?'':'i';var extraOffset=0;var keysOffset=keys.length;var i=0;var name=0;var m;if(path instanceof RegExp){while(m=MATCHING_GROUP_REGEXP.exec(path.source)){keys.push({name:name++,optional:false,offset:m.index});}return path;}if(Array.isArray(path)){// Map array parts into regexps and return their source. We also pass
// the same keys and options instance into every generation to get
// consistent matching groups before we join the sources together.
path=path.map(function(value){return pathtoRegexp(value,keys,options).source;});return new RegExp('(?:'+path.join('|')+')',flags);}path=('^'+path+(strict?'':path[path.length-1]==='/'?'?':'/?')).replace(/\/\(/g,'/(?:').replace(/([\/\.])/g,'\\$1').replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g,function(match,slash,format,key,capture,star,optional,offset){slash=slash||'';format=format||'';capture=capture||'([^\\/'+format+']+?)';optional=optional||'';keys.push({name:key,optional:!!optional,offset:offset+extraOffset});var result=''+(optional?'':slash)+'(?:'+format+(optional?slash:'')+capture+(star?'((?:[\\/'+format+'].+?)?)':'')+')'+optional;extraOffset+=result.length-match.length;return result;}).replace(/\*/g,function(star,index){var len=keys.length;while(len-->keysOffset&&keys[len].offset>index){keys[len].offset+=3;// Replacement length minus asterisk length.
}return'(.*)';});// This is a workaround for handling unnamed matching groups.
while(m=MATCHING_GROUP_REGEXP.exec(path)){var escapeCount=0;var index=m.index;while(path.charAt(--index)==='\\'){escapeCount++;}// It's possible to escape the bracket.
if(escapeCount%2===1){continue;}if(keysOffset+i===keys.length||keys[keysOffset+i].offset>m.index){keys.splice(keysOffset+i,0,{name:name++,// Unnamed matching groups must be consistently linear.
optional:false,offset:m.index});}i++;}// If the path is non-ending, match until the end or a slash.
path+=end?'$':path[path.length-1]==='/'?'':'(?=\\/|$)';return new RegExp(path,flags);};/***/},/* 122 *//***/function(module,exports){/* (ignored) *//***/},/* 123 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var setPrototypeOf=__webpack_require__(33);/**
 * Initialization middleware, exposing the
 * request and response to each other, as well
 * as defaulting the X-Powered-By header field.
 *
 * @param {Function} app
 * @return {Function}
 * @api private
 */exports.init=function(app){return function expressInit(req,res,next){if(app.enabled('x-powered-by'))res.setHeader('X-Powered-By','Express');req.res=res;res.req=req;req.next=next;setPrototypeOf(req,app.request);setPrototypeOf(res,app.response);res.locals=res.locals||(0,_create2.default)(null);next();};};/***/},/* 124 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(63);var formats=__webpack_require__(64);var arrayPrefixGenerators={brackets:function brackets(prefix){// eslint-disable-line func-name-matching
return prefix+'[]';},indices:function indices(prefix,key){// eslint-disable-line func-name-matching
return prefix+'['+key+']';},repeat:function repeat(prefix){// eslint-disable-line func-name-matching
return prefix;}};var toISO=Date.prototype.toISOString;var defaults={delimiter:'&',encode:true,encoder:utils.encode,encodeValuesOnly:false,serializeDate:function serializeDate(date){// eslint-disable-line func-name-matching
return toISO.call(date);},skipNulls:false,strictNullHandling:false};var stringify=function stringify(// eslint-disable-line func-name-matching
object,prefix,generateArrayPrefix,strictNullHandling,skipNulls,encoder,filter,sort,allowDots,serializeDate,formatter,encodeValuesOnly){var obj=object;if(typeof filter==='function'){obj=filter(prefix,obj);}else if(obj instanceof Date){obj=serializeDate(obj);}else if(obj===null){if(strictNullHandling){return encoder&&!encodeValuesOnly?encoder(prefix,defaults.encoder):prefix;}obj='';}if(typeof obj==='string'||typeof obj==='number'||typeof obj==='boolean'||utils.isBuffer(obj)){if(encoder){var keyValue=encodeValuesOnly?prefix:encoder(prefix,defaults.encoder);return[formatter(keyValue)+'='+formatter(encoder(obj,defaults.encoder))];}return[formatter(prefix)+'='+formatter(String(obj))];}var values=[];if(typeof obj==='undefined'){return values;}var objKeys;if(Array.isArray(filter)){objKeys=filter;}else{var keys=(0,_keys2.default)(obj);objKeys=sort?keys.sort(sort):keys;}for(var i=0;i<objKeys.length;++i){var key=objKeys[i];if(skipNulls&&obj[key]===null){continue;}if(Array.isArray(obj)){values=values.concat(stringify(obj[key],generateArrayPrefix(prefix,key),generateArrayPrefix,strictNullHandling,skipNulls,encoder,filter,sort,allowDots,serializeDate,formatter,encodeValuesOnly));}else{values=values.concat(stringify(obj[key],prefix+(allowDots?'.'+key:'['+key+']'),generateArrayPrefix,strictNullHandling,skipNulls,encoder,filter,sort,allowDots,serializeDate,formatter,encodeValuesOnly));}}return values;};module.exports=function(object,opts){var obj=object;var options=opts?utils.assign({},opts):{};if(options.encoder!==null&&options.encoder!==undefined&&typeof options.encoder!=='function'){throw new TypeError('Encoder has to be a function.');}var delimiter=typeof options.delimiter==='undefined'?defaults.delimiter:options.delimiter;var strictNullHandling=typeof options.strictNullHandling==='boolean'?options.strictNullHandling:defaults.strictNullHandling;var skipNulls=typeof options.skipNulls==='boolean'?options.skipNulls:defaults.skipNulls;var encode=typeof options.encode==='boolean'?options.encode:defaults.encode;var encoder=typeof options.encoder==='function'?options.encoder:defaults.encoder;var sort=typeof options.sort==='function'?options.sort:null;var allowDots=typeof options.allowDots==='undefined'?false:options.allowDots;var serializeDate=typeof options.serializeDate==='function'?options.serializeDate:defaults.serializeDate;var encodeValuesOnly=typeof options.encodeValuesOnly==='boolean'?options.encodeValuesOnly:defaults.encodeValuesOnly;if(typeof options.format==='undefined'){options.format=formats.default;}else if(!Object.prototype.hasOwnProperty.call(formats.formatters,options.format)){throw new TypeError('Unknown format option provided.');}var formatter=formats.formatters[options.format];var objKeys;var filter;if(typeof options.filter==='function'){filter=options.filter;obj=filter('',obj);}else if(Array.isArray(options.filter)){filter=options.filter;objKeys=filter;}var keys=[];if((typeof obj==='undefined'?'undefined':(0,_typeof3.default)(obj))!=='object'||obj===null){return'';}var arrayFormat;if(options.arrayFormat in arrayPrefixGenerators){arrayFormat=options.arrayFormat;}else if('indices'in options){arrayFormat=options.indices?'indices':'repeat';}else{arrayFormat='indices';}var generateArrayPrefix=arrayPrefixGenerators[arrayFormat];if(!objKeys){objKeys=(0,_keys2.default)(obj);}if(sort){objKeys.sort(sort);}for(var i=0;i<objKeys.length;++i){var key=objKeys[i];if(skipNulls&&obj[key]===null){continue;}keys=keys.concat(stringify(obj[key],key,generateArrayPrefix,strictNullHandling,skipNulls,encode?encoder:null,filter,sort,allowDots,serializeDate,formatter,encodeValuesOnly));}var joined=keys.join(delimiter);var prefix=options.addQueryPrefix===true?'?':'';return joined.length>0?prefix+joined:'';};/***/},/* 125 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(63);var has=Object.prototype.hasOwnProperty;var defaults={allowDots:false,allowPrototypes:false,arrayLimit:20,decoder:utils.decode,delimiter:'&',depth:5,parameterLimit:1000,plainObjects:false,strictNullHandling:false};var parseValues=function parseQueryStringValues(str,options){var obj={};var cleanStr=options.ignoreQueryPrefix?str.replace(/^\?/,''):str;var limit=options.parameterLimit===Infinity?undefined:options.parameterLimit;var parts=cleanStr.split(options.delimiter,limit);for(var i=0;i<parts.length;++i){var part=parts[i];var bracketEqualsPos=part.indexOf(']=');var pos=bracketEqualsPos===-1?part.indexOf('='):bracketEqualsPos+1;var key,val;if(pos===-1){key=options.decoder(part,defaults.decoder);val=options.strictNullHandling?null:'';}else{key=options.decoder(part.slice(0,pos),defaults.decoder);val=options.decoder(part.slice(pos+1),defaults.decoder);}if(has.call(obj,key)){obj[key]=[].concat(obj[key]).concat(val);}else{obj[key]=val;}}return obj;};var parseObject=function parseObjectRecursive(chain,val,options){if(!chain.length){return val;}var root=chain.shift();var obj;if(root==='[]'){obj=[];obj=obj.concat(parseObject(chain,val,options));}else{obj=options.plainObjects?(0,_create2.default)(null):{};var cleanRoot=root.charAt(0)==='['&&root.charAt(root.length-1)===']'?root.slice(1,-1):root;var index=parseInt(cleanRoot,10);if(!isNaN(index)&&root!==cleanRoot&&String(index)===cleanRoot&&index>=0&&options.parseArrays&&index<=options.arrayLimit){obj=[];obj[index]=parseObject(chain,val,options);}else{obj[cleanRoot]=parseObject(chain,val,options);}}return obj;};var parseKeys=function parseQueryStringKeys(givenKey,val,options){if(!givenKey){return;}// Transform dot notation to bracket notation
var key=options.allowDots?givenKey.replace(/\.([^.[]+)/g,'[$1]'):givenKey;// The regex chunks
var brackets=/(\[[^[\]]*])/;var child=/(\[[^[\]]*])/g;// Get the parent
var segment=brackets.exec(key);var parent=segment?key.slice(0,segment.index):key;// Stash the parent if it exists
var keys=[];if(parent){// If we aren't using plain objects, optionally prefix keys
// that would overwrite object prototype properties
if(!options.plainObjects&&has.call(Object.prototype,parent)){if(!options.allowPrototypes){return;}}keys.push(parent);}// Loop through children appending to the array until we hit depth
var i=0;while((segment=child.exec(key))!==null&&i<options.depth){i+=1;if(!options.plainObjects&&has.call(Object.prototype,segment[1].slice(1,-1))){if(!options.allowPrototypes){return;}}keys.push(segment[1]);}// If there's a remainder, just add whatever is left
if(segment){keys.push('['+key.slice(segment.index)+']');}return parseObject(keys,val,options);};module.exports=function(str,opts){var options=opts?utils.assign({},opts):{};if(options.decoder!==null&&options.decoder!==undefined&&typeof options.decoder!=='function'){throw new TypeError('Decoder has to be a function.');}options.ignoreQueryPrefix=options.ignoreQueryPrefix===true;options.delimiter=typeof options.delimiter==='string'||utils.isRegExp(options.delimiter)?options.delimiter:defaults.delimiter;options.depth=typeof options.depth==='number'?options.depth:defaults.depth;options.arrayLimit=typeof options.arrayLimit==='number'?options.arrayLimit:defaults.arrayLimit;options.parseArrays=options.parseArrays!==false;options.decoder=typeof options.decoder==='function'?options.decoder:defaults.decoder;options.allowDots=typeof options.allowDots==='boolean'?options.allowDots:defaults.allowDots;options.plainObjects=typeof options.plainObjects==='boolean'?options.plainObjects:defaults.plainObjects;options.allowPrototypes=typeof options.allowPrototypes==='boolean'?options.allowPrototypes:defaults.allowPrototypes;options.parameterLimit=typeof options.parameterLimit==='number'?options.parameterLimit:defaults.parameterLimit;options.strictNullHandling=typeof options.strictNullHandling==='boolean'?options.strictNullHandling:defaults.strictNullHandling;if(str===''||str===null||typeof str==='undefined'){return options.plainObjects?(0,_create2.default)(null):{};}var tempObj=typeof str==='string'?parseValues(str,options):str;var obj=options.plainObjects?(0,_create2.default)(null):{};// Iterate over the keys and setup the new object
var keys=(0,_keys2.default)(tempObj);for(var i=0;i<keys.length;++i){var key=keys[i];var newObj=parseKeys(key,tempObj[key],options);obj=utils.merge(obj,newObj,options);}return utils.compact(obj);};/***/},/* 126 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var debug=__webpack_require__(11)('express:view');var path=__webpack_require__(9);var fs=__webpack_require__(!function webpackMissingModule(){var e=new Error("Cannot find module \"fs\"");e.code='MODULE_NOT_FOUND';throw e;}());/**
 * Module variables.
 * @private
 */var dirname=path.dirname;var basename=path.basename;var extname=path.extname;var join=path.join;var resolve=path.resolve;/**
 * Module exports.
 * @public
 */module.exports=View;/**
 * Initialize a new `View` with the given `name`.
 *
 * Options:
 *
 *   - `defaultEngine` the default template engine name
 *   - `engines` template engine require() cache
 *   - `root` root path for view lookup
 *
 * @param {string} name
 * @param {object} options
 * @public
 */function View(name,options){var opts=options||{};this.defaultEngine=opts.defaultEngine;this.ext=extname(name);this.name=name;this.root=opts.root;if(!this.ext&&!this.defaultEngine){throw new Error('No default engine was specified and no extension was provided.');}var fileName=name;if(!this.ext){// get extension from default engine name
this.ext=this.defaultEngine[0]!=='.'?'.'+this.defaultEngine:this.defaultEngine;fileName+=this.ext;}if(!opts.engines[this.ext]){// load engine
var mod=this.ext.substr(1);debug('require "%s"',mod);opts.engines[this.ext]=!function webpackMissingModule(){var e=new Error("Cannot find module \".\"");e.code='MODULE_NOT_FOUND';throw e;}().__express;}// store loaded engine
this.engine=opts.engines[this.ext];// lookup path
this.path=this.lookup(fileName);}/**
 * Lookup view by the given `name`
 *
 * @param {string} name
 * @private
 */View.prototype.lookup=function lookup(name){var path;var roots=[].concat(this.root);debug('lookup "%s"',name);for(var i=0;i<roots.length&&!path;i++){var root=roots[i];// resolve the path
var loc=resolve(root,name);var dir=dirname(loc);var file=basename(loc);// resolve the file
path=this.resolve(dir,file);}return path;};/**
 * Render with the given options.
 *
 * @param {object} options
 * @param {function} callback
 * @private
 */View.prototype.render=function render(options,callback){debug('render "%s"',this.path);this.engine(this.path,options,callback);};/**
 * Resolve the file within the given directory.
 *
 * @param {string} dir
 * @param {string} file
 * @private
 */View.prototype.resolve=function resolve(dir,file){var ext=this.ext;// <path>.<ext>
var path=join(dir,file);var stat=tryStat(path);if(stat&&stat.isFile()){return path;}// <path>/index.<ext>
path=join(dir,basename(file,ext),'index'+ext);stat=tryStat(path);if(stat&&stat.isFile()){return path;}};/**
 * Return a stat, maybe.
 *
 * @param {string} path
 * @return {fs.Stats}
 * @private
 */function tryStat(path){debug('stat "%s"',path);try{return fs.statSync(path);}catch(e){return undefined;}}/***/},/* 127 *//***/function(module,exports){function webpackEmptyContext(req){throw new Error("Cannot find module '"+req+"'.");}webpackEmptyContext.keys=function(){return[];};webpackEmptyContext.resolve=webpackEmptyContext;module.exports=webpackEmptyContext;webpackEmptyContext.id=127;/***/},/* 128 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer,global,process){var capability=__webpack_require__(65);var inherits=__webpack_require__(1);var response=__webpack_require__(129);var stream=__webpack_require__(20);var toArrayBuffer=__webpack_require__(134);var IncomingMessage=response.IncomingMessage;var rStates=response.readyStates;function decideMode(preferBinary,useFetch){if(capability.fetch&&useFetch){return'fetch';}else if(capability.mozchunkedarraybuffer){return'moz-chunked-arraybuffer';}else if(capability.msstream){return'ms-stream';}else if(capability.arraybuffer&&preferBinary){return'arraybuffer';}else if(capability.vbArray&&preferBinary){return'text:vbarray';}else{return'text';}}var ClientRequest=module.exports=function(opts){var self=this;stream.Writable.call(self);self._opts=opts;self._body=[];self._headers={};if(opts.auth)self.setHeader('Authorization','Basic '+new Buffer(opts.auth).toString('base64'));(0,_keys2.default)(opts.headers).forEach(function(name){self.setHeader(name,opts.headers[name]);});var preferBinary;var useFetch=true;if(opts.mode==='disable-fetch'||'timeout'in opts){// If the use of XHR should be preferred and includes preserving the 'content-type' header.
// Force XHR to be used since the Fetch API does not yet support timeouts.
useFetch=false;preferBinary=true;}else if(opts.mode==='prefer-streaming'){// If streaming is a high priority but binary compatibility and
// the accuracy of the 'content-type' header aren't
preferBinary=false;}else if(opts.mode==='allow-wrong-content-type'){// If streaming is more important than preserving the 'content-type' header
preferBinary=!capability.overrideMimeType;}else if(!opts.mode||opts.mode==='default'||opts.mode==='prefer-fast'){// Use binary if text streaming may corrupt data or the content-type header, or for speed
preferBinary=true;}else{throw new Error('Invalid value for opts.mode');}self._mode=decideMode(preferBinary,useFetch);self.on('finish',function(){self._onFinish();});};inherits(ClientRequest,stream.Writable);ClientRequest.prototype.setHeader=function(name,value){var self=this;var lowerName=name.toLowerCase();// This check is not necessary, but it prevents warnings from browsers about setting unsafe
// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
// http-browserify did it, so I will too.
if(unsafeHeaders.indexOf(lowerName)!==-1)return;self._headers[lowerName]={name:name,value:value};};ClientRequest.prototype.getHeader=function(name){var header=this._headers[name.toLowerCase()];if(header)return header.value;return null;};ClientRequest.prototype.removeHeader=function(name){var self=this;delete self._headers[name.toLowerCase()];};ClientRequest.prototype._onFinish=function(){var self=this;if(self._destroyed)return;var opts=self._opts;var headersObj=self._headers;var body=null;if(opts.method!=='GET'&&opts.method!=='HEAD'){if(capability.blobConstructor){body=new global.Blob(self._body.map(function(buffer){return toArrayBuffer(buffer);}),{type:(headersObj['content-type']||{}).value||''});}else{// get utf8 string
body=Buffer.concat(self._body).toString();}}// create flattened list of headers
var headersList=[];(0,_keys2.default)(headersObj).forEach(function(keyName){var name=headersObj[keyName].name;var value=headersObj[keyName].value;if(Array.isArray(value)){value.forEach(function(v){headersList.push([name,v]);});}else{headersList.push([name,value]);}});if(self._mode==='fetch'){global.fetch(self._opts.url,{method:self._opts.method,headers:headersList,body:body||undefined,mode:'cors',credentials:opts.withCredentials?'include':'same-origin'}).then(function(response){self._fetchResponse=response;self._connect();},function(reason){self.emit('error',reason);});}else{var xhr=self._xhr=new global.XMLHttpRequest();try{xhr.open(self._opts.method,self._opts.url,true);}catch(err){process.nextTick(function(){self.emit('error',err);});return;}// Can't set responseType on really old browsers
if('responseType'in xhr)xhr.responseType=self._mode.split(':')[0];if('withCredentials'in xhr)xhr.withCredentials=!!opts.withCredentials;if(self._mode==='text'&&'overrideMimeType'in xhr)xhr.overrideMimeType('text/plain; charset=x-user-defined');if('timeout'in opts){xhr.timeout=opts.timeout;xhr.ontimeout=function(){self.emit('timeout');};}headersList.forEach(function(header){xhr.setRequestHeader(header[0],header[1]);});self._response=null;xhr.onreadystatechange=function(){switch(xhr.readyState){case rStates.LOADING:case rStates.DONE:self._onXHRProgress();break;}};// Necessary for streaming in Firefox, since xhr.response is ONLY defined
// in onprogress, not in onreadystatechange with xhr.readyState = 3
if(self._mode==='moz-chunked-arraybuffer'){xhr.onprogress=function(){self._onXHRProgress();};}xhr.onerror=function(){if(self._destroyed)return;self.emit('error',new Error('XHR error'));};try{xhr.send(body);}catch(err){process.nextTick(function(){self.emit('error',err);});return;}}};/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */function statusValid(xhr){try{var status=xhr.status;return status!==null&&status!==0;}catch(e){return false;}}ClientRequest.prototype._onXHRProgress=function(){var self=this;if(!statusValid(self._xhr)||self._destroyed)return;if(!self._response)self._connect();self._response._onXHRProgress();};ClientRequest.prototype._connect=function(){var self=this;if(self._destroyed)return;self._response=new IncomingMessage(self._xhr,self._fetchResponse,self._mode);self._response.on('error',function(err){self.emit('error',err);});self.emit('response',self._response);};ClientRequest.prototype._write=function(chunk,encoding,cb){var self=this;self._body.push(chunk);cb();};ClientRequest.prototype.abort=ClientRequest.prototype.destroy=function(){var self=this;self._destroyed=true;if(self._response)self._response._destroyed=true;if(self._xhr)self._xhr.abort();// Currently, there isn't a way to truly abort a fetch.
// If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
};ClientRequest.prototype.end=function(data,encoding,cb){var self=this;if(typeof data==='function'){cb=data;data=undefined;}stream.Writable.prototype.end.call(self,data,encoding,cb);};ClientRequest.prototype.flushHeaders=function(){};ClientRequest.prototype.setTimeout=function(){};ClientRequest.prototype.setNoDelay=function(){};ClientRequest.prototype.setSocketKeepAlive=function(){};// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders=['accept-charset','accept-encoding','access-control-request-headers','access-control-request-method','connection','content-length','cookie','cookie2','date','dnt','expect','host','keep-alive','origin','referer','te','trailer','transfer-encoding','upgrade','user-agent','via'];/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer,__webpack_require__(6),__webpack_require__(4));/***/},/* 129 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(process,Buffer,global){var capability=__webpack_require__(65);var inherits=__webpack_require__(1);var stream=__webpack_require__(20);var rStates=exports.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4};var IncomingMessage=exports.IncomingMessage=function(xhr,response,mode){var self=this;stream.Readable.call(self);self._mode=mode;self.headers={};self.rawHeaders=[];self.trailers={};self.rawTrailers=[];// Fake the 'close' event, but only once 'end' fires
self.on('end',function(){// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
process.nextTick(function(){self.emit('close');});});if(mode==='fetch'){var read=function read(){reader.read().then(function(result){if(self._destroyed)return;if(result.done){self.push(null);return;}self.push(new Buffer(result.value));read();}).catch(function(err){self.emit('error',err);});};self._fetchResponse=response;self.url=response.url;self.statusCode=response.status;self.statusMessage=response.statusText;response.headers.forEach(function(header,key){self.headers[key.toLowerCase()]=header;self.rawHeaders.push(key,header);});// TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
var reader=response.body.getReader();read();}else{self._xhr=xhr;self._pos=0;self.url=xhr.responseURL;self.statusCode=xhr.status;self.statusMessage=xhr.statusText;var headers=xhr.getAllResponseHeaders().split(/\r?\n/);headers.forEach(function(header){var matches=header.match(/^([^:]+):\s*(.*)/);if(matches){var key=matches[1].toLowerCase();if(key==='set-cookie'){if(self.headers[key]===undefined){self.headers[key]=[];}self.headers[key].push(matches[2]);}else if(self.headers[key]!==undefined){self.headers[key]+=', '+matches[2];}else{self.headers[key]=matches[2];}self.rawHeaders.push(matches[1],matches[2]);}});self._charset='x-user-defined';if(!capability.overrideMimeType){var mimeType=self.rawHeaders['mime-type'];if(mimeType){var charsetMatch=mimeType.match(/;\s*charset=([^;])(;|$)/);if(charsetMatch){self._charset=charsetMatch[1].toLowerCase();}}if(!self._charset)self._charset='utf-8';// best guess
}}};inherits(IncomingMessage,stream.Readable);IncomingMessage.prototype._read=function(){};IncomingMessage.prototype._onXHRProgress=function(){var self=this;var xhr=self._xhr;var response=null;switch(self._mode){case'text:vbarray':// For IE9
if(xhr.readyState!==rStates.DONE)break;try{// This fails in IE8
response=new global.VBArray(xhr.responseBody).toArray();}catch(e){}if(response!==null){self.push(new Buffer(response));break;}// Falls through in IE8	
case'text':try{// This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
response=xhr.responseText;}catch(e){self._mode='text:vbarray';break;}if(response.length>self._pos){var newData=response.substr(self._pos);if(self._charset==='x-user-defined'){var buffer=new Buffer(newData.length);for(var i=0;i<newData.length;i++){buffer[i]=newData.charCodeAt(i)&0xff;}self.push(buffer);}else{self.push(newData,self._charset);}self._pos=response.length;}break;case'arraybuffer':if(xhr.readyState!==rStates.DONE||!xhr.response)break;response=xhr.response;self.push(new Buffer(new Uint8Array(response)));break;case'moz-chunked-arraybuffer':// take whole
response=xhr.response;if(xhr.readyState!==rStates.LOADING||!response)break;self.push(new Buffer(new Uint8Array(response)));break;case'ms-stream':response=xhr.response;if(xhr.readyState!==rStates.LOADING)break;var reader=new global.MSStreamReader();reader.onprogress=function(){if(reader.result.byteLength>self._pos){self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))));self._pos=reader.result.byteLength;}};reader.onload=function(){self.push(null);};// reader.onerror = ??? // TODO: this
reader.readAsArrayBuffer(response);break;}// The ms-stream case handles end separately in reader.onload()
if(self._xhr.readyState===rStates.DONE&&self._mode!=='ms-stream'){self.push(null);}};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4),__webpack_require__(0).Buffer,__webpack_require__(6));/***/},/* 130 *//***/function(module,exports){/* (ignored) *//***/},/* 131 *//***/function(module,exports,__webpack_require__){"use strict";/*<replacement>*/function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Buffer=__webpack_require__(3).Buffer;/*</replacement>*/function copyBuffer(src,target,offset){src.copy(target,offset);}module.exports=function(){function BufferList(){_classCallCheck(this,BufferList);this.head=null;this.tail=null;this.length=0;}BufferList.prototype.push=function push(v){var entry={data:v,next:null};if(this.length>0)this.tail.next=entry;else this.head=entry;this.tail=entry;++this.length;};BufferList.prototype.unshift=function unshift(v){var entry={data:v,next:this.head};if(this.length===0)this.tail=entry;this.head=entry;++this.length;};BufferList.prototype.shift=function shift(){if(this.length===0)return;var ret=this.head.data;if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;--this.length;return ret;};BufferList.prototype.clear=function clear(){this.head=this.tail=null;this.length=0;};BufferList.prototype.join=function join(s){if(this.length===0)return'';var p=this.head;var ret=''+p.data;while(p=p.next){ret+=s+p.data;}return ret;};BufferList.prototype.concat=function concat(n){if(this.length===0)return Buffer.alloc(0);if(this.length===1)return this.head.data;var ret=Buffer.allocUnsafe(n>>>0);var p=this.head;var i=0;while(p){copyBuffer(p.data,ret,i);i+=p.data.length;p=p.next;}return ret;};return BufferList;}();/***/},/* 132 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/**
 * Module exports.
 */module.exports=deprecate;/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */function deprecate(fn,msg){if(config('noDeprecation')){return fn;}var warned=false;function deprecated(){if(!warned){if(config('throwDeprecation')){throw new Error(msg);}else if(config('traceDeprecation')){console.trace(msg);}else{console.warn(msg);}warned=true;}return fn.apply(this,arguments);}return deprecated;}/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */function config(name){// accessing global.localStorage can trigger a DOMException in sandboxed iframes
try{if(!global.localStorage)return false;}catch(_){return false;}var val=global.localStorage[name];if(null==val)return false;return String(val).toLowerCase()==='true';}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6));/***/},/* 133 *//***/function(module,exports,__webpack_require__){"use strict";// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
module.exports=PassThrough;var Transform=__webpack_require__(69);/*<replacement>*/var util=__webpack_require__(21);util.inherits=__webpack_require__(1);/*</replacement>*/util.inherits(PassThrough,Transform);function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options);Transform.call(this,options);}PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk);};/***/},/* 134 *//***/function(module,exports,__webpack_require__){var Buffer=__webpack_require__(0).Buffer;module.exports=function(buf){// If the buffer is backed by a Uint8Array, a faster version will work
if(buf instanceof Uint8Array){// If the buffer isn't a subarray, return the underlying ArrayBuffer
if(buf.byteOffset===0&&buf.byteLength===buf.buffer.byteLength){return buf.buffer;}else if(typeof buf.buffer.slice==='function'){// Otherwise we need to get a proper copy
return buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength);}}if(Buffer.isBuffer(buf)){// This is the slow version that will work with any Buffer
// implementation (even in old browsers)
var arrayCopy=new Uint8Array(buf.length);var len=buf.length;for(var i=0;i<len;i++){arrayCopy[i]=buf[i];}return arrayCopy.buffer;}else{throw new Error('Argument must be a Buffer');}};/***/},/* 135 *//***/function(module,exports){module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;function extend(){var target={};for(var i=0;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}/***/},/* 136 *//***/function(module,exports){module.exports={"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"/***/};},/* 137 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */var paramRegExp=/; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g;var textRegExp=/^[\u000b\u0020-\u007e\u0080-\u00ff]+$/;var tokenRegExp=/^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/;/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */var qescRegExp=/\\([\u000b\u0020-\u00ff])/g;/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */var quoteRegExp=/([\\"])/g;/**
 * RegExp to match type in RFC 6838
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */var typeRegExp=/^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/;/**
 * Module exports.
 * @public
 */exports.format=format;exports.parse=parse;/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */function format(obj){if(!obj||(typeof obj==='undefined'?'undefined':(0,_typeof3.default)(obj))!=='object'){throw new TypeError('argument obj is required');}var parameters=obj.parameters;var type=obj.type;if(!type||!typeRegExp.test(type)){throw new TypeError('invalid type');}var string=type;// append parameters
if(parameters&&(typeof parameters==='undefined'?'undefined':(0,_typeof3.default)(parameters))==='object'){var param;var params=(0,_keys2.default)(parameters).sort();for(var i=0;i<params.length;i++){param=params[i];if(!tokenRegExp.test(param)){throw new TypeError('invalid parameter name');}string+='; '+param+'='+qstring(parameters[param]);}}return string;}/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */function parse(string){if(!string){throw new TypeError('argument string is required');}if((typeof string==='undefined'?'undefined':(0,_typeof3.default)(string))==='object'){// support req/res-like objects as argument
string=getcontenttype(string);if(typeof string!=='string'){throw new TypeError('content-type header is missing from object');}}if(typeof string!=='string'){throw new TypeError('argument string is required to be a string');}var index=string.indexOf(';');var type=index!==-1?string.substr(0,index).trim():string.trim();if(!typeRegExp.test(type)){throw new TypeError('invalid media type');}var key;var match;var obj=new ContentType(type.toLowerCase());var value;paramRegExp.lastIndex=index;while(match=paramRegExp.exec(string)){if(match.index!==index){throw new TypeError('invalid parameter format');}index+=match[0].length;key=match[1].toLowerCase();value=match[2];if(value[0]==='"'){// remove quotes and escapes
value=value.substr(1,value.length-2).replace(qescRegExp,'$1');}obj.parameters[key]=value;}if(index!==-1&&index!==string.length){throw new TypeError('invalid parameter format');}return obj;}/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */function getcontenttype(obj){if(typeof obj.getHeader==='function'){// res-like
return obj.getHeader('content-type');}if((0,_typeof3.default)(obj.headers)==='object'){// req-like
return obj.headers&&obj.headers['content-type'];}}/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */function qstring(val){var str=String(val);// no need to quote tokens
if(tokenRegExp.test(str)){return str;}if(str.length>0&&!textRegExp.test(str)){throw new TypeError('invalid parameter value');}return'"'+str.replace(quoteRegExp,'\\$1')+'"';}/**
 * Class to represent a content type.
 * @private
 */function ContentType(type){this.parameters=(0,_create2.default)(null);this.type=type;}/***/},/* 138 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var deprecate=__webpack_require__(12)('http-errors');var setPrototypeOf=__webpack_require__(33);var statuses=__webpack_require__(30);var inherits=__webpack_require__(1);/**
 * Module exports.
 * @public
 */module.exports=createError;module.exports.HttpError=createHttpErrorConstructor();// Populate exports for all constructors
populateConstructorExports(module.exports,statuses.codes,module.exports.HttpError);/**
 * Get the code class of a status code.
 * @private
 */function codeClass(status){return Number(String(status).charAt(0)+'00');}/**
 * Create a new HTTP Error.
 *
 * @returns {Error}
 * @public
 */function createError(){// so much arity going on ~_~
var err;var msg;var status=500;var props={};for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(arg instanceof Error){err=arg;status=err.status||err.statusCode||status;continue;}switch(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg)){case'string':msg=arg;break;case'number':status=arg;if(i!==0){deprecate('non-first-argument status code; replace with createError('+arg+', ...)');}break;case'object':props=arg;break;}}if(typeof status==='number'&&(status<400||status>=600)){deprecate('non-error status code; use only 4xx or 5xx status codes');}if(typeof status!=='number'||!statuses[status]&&(status<400||status>=600)){status=500;}// constructor
var HttpError=createError[status]||createError[codeClass(status)];if(!err){// create error
err=HttpError?new HttpError(msg):new Error(msg||statuses[status]);Error.captureStackTrace(err,createError);}if(!HttpError||!(err instanceof HttpError)||err.status!==status){// add properties to generic error
err.expose=status<500;err.status=err.statusCode=status;}for(var key in props){if(key!=='status'&&key!=='statusCode'){err[key]=props[key];}}return err;}/**
 * Create HTTP error abstract base class.
 * @private
 */function createHttpErrorConstructor(){function HttpError(){throw new TypeError('cannot construct abstract class');}inherits(HttpError,Error);return HttpError;}/**
 * Create a constructor for a client error.
 * @private
 */function createClientErrorConstructor(HttpError,name,code){var className=name.match(/Error$/)?name:name+'Error';function ClientError(message){// create the error object
var msg=message!=null?message:statuses[code];var err=new Error(msg);// capture a stack trace to the construction point
Error.captureStackTrace(err,ClientError);// adjust the [[Prototype]]
setPrototypeOf(err,ClientError.prototype);// redefine the error message
Object.defineProperty(err,'message',{enumerable:true,configurable:true,value:msg,writable:true});// redefine the error name
Object.defineProperty(err,'name',{enumerable:false,configurable:true,value:className,writable:true});return err;}inherits(ClientError,HttpError);ClientError.prototype.status=code;ClientError.prototype.statusCode=code;ClientError.prototype.expose=true;return ClientError;}/**
 * Create a constructor for a server error.
 * @private
 */function createServerErrorConstructor(HttpError,name,code){var className=name.match(/Error$/)?name:name+'Error';function ServerError(message){// create the error object
var msg=message!=null?message:statuses[code];var err=new Error(msg);// capture a stack trace to the construction point
Error.captureStackTrace(err,ServerError);// adjust the [[Prototype]]
setPrototypeOf(err,ServerError.prototype);// redefine the error message
Object.defineProperty(err,'message',{enumerable:true,configurable:true,value:msg,writable:true});// redefine the error name
Object.defineProperty(err,'name',{enumerable:false,configurable:true,value:className,writable:true});return err;}inherits(ServerError,HttpError);ServerError.prototype.status=code;ServerError.prototype.statusCode=code;ServerError.prototype.expose=false;return ServerError;}/**
 * Populate the exports object with constructors for every error class.
 * @private
 */function populateConstructorExports(exports,codes,HttpError){codes.forEach(function forEachCode(code){var CodeError;var name=toIdentifier(statuses[code]);switch(codeClass(code)){case 400:CodeError=createClientErrorConstructor(HttpError,name,code);break;case 500:CodeError=createServerErrorConstructor(HttpError,name,code);break;}if(CodeError){// export the constructor
exports[code]=CodeError;exports[name]=CodeError;}});// backwards-compatibility
exports["I'mateapot"]=deprecate.function(exports.ImATeapot,'"I\'mateapot"; use "ImATeapot" instead');}/**
 * Convert a string of words to a JavaScript identifier.
 * @private
 */function toIdentifier(str){return str.split(' ').map(function(token){return token.slice(0,1).toUpperCase()+token.slice(1);}).join('').replace(/[^ _0-9a-z]/gi,'');}/***/},/* 139 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * destroy
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var ReadStream=__webpack_require__(!function webpackMissingModule(){var e=new Error("Cannot find module \"fs\"");e.code='MODULE_NOT_FOUND';throw e;}()).ReadStream;var Stream=__webpack_require__(15);/**
 * Module exports.
 * @public
 */module.exports=destroy;/**
 * Destroy a stream.
 *
 * @param {object} stream
 * @public
 */function destroy(stream){if(stream instanceof ReadStream){return destroyReadStream(stream);}if(!(stream instanceof Stream)){return stream;}if(typeof stream.destroy==='function'){stream.destroy();}return stream;}/**
 * Destroy a ReadStream.
 *
 * @param {object} stream
 * @private
 */function destroyReadStream(stream){stream.destroy();if(typeof stream.close==='function'){// node.js core bug work-around
stream.on('open',onOpenClose);}return stream;}/**
 * On open handler to close stream.
 * @private
 */function onOpenClose(){if(typeof this.fd==='number'){// actually close down the fd
this.close();}}/***/},/* 140 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(44);/***/},/* 141 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(13);/***/},/* 142 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(20).Transform;/***/},/* 143 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(20).PassThrough;/***/},/* 144 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){var intSize=4;var zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);var charSize=8;var hashSize=16;function toArray(buf){if(buf.length%intSize!==0){var len=buf.length+(intSize-buf.length%intSize);buf=Buffer.concat([buf,zeroBuffer],len);}var arr=new Array(buf.length>>>2);for(var i=0,j=0;i<buf.length;i+=intSize,j++){arr[j]=buf.readInt32LE(i);}return arr;}module.exports=function hash(buf,fn){var arr=fn(toArray(buf),buf.length*charSize);buf=new Buffer(hashSize);for(var i=0;i<arr.length;i++){buf.writeInt32LE(arr[i],i<<2,true);}return buf;};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 145 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){var Transform=__webpack_require__(15).Transform;var inherits=__webpack_require__(1);function HashBase(blockSize){Transform.call(this);this._block=new Buffer(blockSize);this._blockSize=blockSize;this._blockOffset=0;this._length=[0,0,0,0];this._finalized=false;}inherits(HashBase,Transform);HashBase.prototype._transform=function(chunk,encoding,callback){var error=null;try{if(encoding!=='buffer')chunk=new Buffer(chunk,encoding);this.update(chunk);}catch(err){error=err;}callback(error);};HashBase.prototype._flush=function(callback){var error=null;try{this.push(this._digest());}catch(err){error=err;}callback(error);};HashBase.prototype.update=function(data,encoding){if(!Buffer.isBuffer(data)&&typeof data!=='string')throw new TypeError('Data must be a string or a buffer');if(this._finalized)throw new Error('Digest already called');if(!Buffer.isBuffer(data))data=new Buffer(data,encoding||'binary');// consume data
var block=this._block;var offset=0;while(this._blockOffset+data.length-offset>=this._blockSize){for(var i=this._blockOffset;i<this._blockSize;){block[i++]=data[offset++];}this._update();this._blockOffset=0;}while(offset<data.length){block[this._blockOffset++]=data[offset++];}// update length
for(var j=0,carry=data.length*8;carry>0;++j){this._length[j]+=carry;carry=this._length[j]/0x0100000000|0;if(carry>0)this._length[j]-=0x0100000000*carry;}return this;};HashBase.prototype._update=function(data){throw new Error('_update is not implemented');};HashBase.prototype.digest=function(encoding){if(this._finalized)throw new Error('Digest already called');this._finalized=true;var digest=this._digest();if(encoding!==undefined)digest=digest.toString(encoding);return digest;};HashBase.prototype._digest=function(){throw new Error('_digest is not implemented');};module.exports=HashBase;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 146 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
 * in FIPS PUB 180-1
 * This source code is derived from sha1.js of the same repository.
 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
 * operation was added.
 */var inherits=__webpack_require__(1);var Hash=__webpack_require__(16);var K=[0x5a827999,0x6ed9eba1,0x8f1bbcdc|0,0xca62c1d6|0];var W=new Array(80);function Sha(){this.init();this._w=W;Hash.call(this,64,56);}inherits(Sha,Hash);Sha.prototype.init=function(){this._a=0x67452301;this._b=0xefcdab89;this._c=0x98badcfe;this._d=0x10325476;this._e=0xc3d2e1f0;return this;};function rotl5(num){return num<<5|num>>>27;}function rotl30(num){return num<<30|num>>>2;}function ft(s,b,c,d){if(s===0)return b&c|~b&d;if(s===2)return b&c|b&d|c&d;return b^c^d;}Sha.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;for(var i=0;i<16;++i){W[i]=M.readInt32BE(i*4);}for(;i<80;++i){W[i]=W[i-3]^W[i-8]^W[i-14]^W[i-16];}for(var j=0;j<80;++j){var s=~~(j/20);var t=rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s]|0;e=d;d=c;c=rotl30(b);b=a;a=t;}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0;};Sha.prototype._hash=function(){var H=new Buffer(20);H.writeInt32BE(this._a|0,0);H.writeInt32BE(this._b|0,4);H.writeInt32BE(this._c|0,8);H.writeInt32BE(this._d|0,12);H.writeInt32BE(this._e|0,16);return H;};module.exports=Sha;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 147 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */var inherits=__webpack_require__(1);var Hash=__webpack_require__(16);var K=[0x5a827999,0x6ed9eba1,0x8f1bbcdc|0,0xca62c1d6|0];var W=new Array(80);function Sha1(){this.init();this._w=W;Hash.call(this,64,56);}inherits(Sha1,Hash);Sha1.prototype.init=function(){this._a=0x67452301;this._b=0xefcdab89;this._c=0x98badcfe;this._d=0x10325476;this._e=0xc3d2e1f0;return this;};function rotl1(num){return num<<1|num>>>31;}function rotl5(num){return num<<5|num>>>27;}function rotl30(num){return num<<30|num>>>2;}function ft(s,b,c,d){if(s===0)return b&c|~b&d;if(s===2)return b&c|b&d|c&d;return b^c^d;}Sha1.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;for(var i=0;i<16;++i){W[i]=M.readInt32BE(i*4);}for(;i<80;++i){W[i]=rotl1(W[i-3]^W[i-8]^W[i-14]^W[i-16]);}for(var j=0;j<80;++j){var s=~~(j/20);var t=rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s]|0;e=d;d=c;c=rotl30(b);b=a;a=t;}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0;};Sha1.prototype._hash=function(){var H=new Buffer(20);H.writeInt32BE(this._a|0,0);H.writeInt32BE(this._b|0,4);H.writeInt32BE(this._c|0,8);H.writeInt32BE(this._d|0,12);H.writeInt32BE(this._e|0,16);return H;};module.exports=Sha1;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 148 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */var inherits=__webpack_require__(1);var Sha256=__webpack_require__(73);var Hash=__webpack_require__(16);var W=new Array(64);function Sha224(){this.init();this._w=W;// new Array(64)
Hash.call(this,64,56);}inherits(Sha224,Sha256);Sha224.prototype.init=function(){this._a=0xc1059ed8;this._b=0x367cd507;this._c=0x3070dd17;this._d=0xf70e5939;this._e=0xffc00b31;this._f=0x68581511;this._g=0x64f98fa7;this._h=0xbefa4fa4;return this;};Sha224.prototype._hash=function(){var H=new Buffer(28);H.writeInt32BE(this._a,0);H.writeInt32BE(this._b,4);H.writeInt32BE(this._c,8);H.writeInt32BE(this._d,12);H.writeInt32BE(this._e,16);H.writeInt32BE(this._f,20);H.writeInt32BE(this._g,24);return H;};module.exports=Sha224;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 149 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var inherits=__webpack_require__(1);var SHA512=__webpack_require__(74);var Hash=__webpack_require__(16);var W=new Array(160);function Sha384(){this.init();this._w=W;Hash.call(this,128,112);}inherits(Sha384,SHA512);Sha384.prototype.init=function(){this._ah=0xcbbb9d5d;this._bh=0x629a292a;this._ch=0x9159015a;this._dh=0x152fecd8;this._eh=0x67332667;this._fh=0x8eb44a87;this._gh=0xdb0c2e0d;this._hh=0x47b5481d;this._al=0xc1059ed8;this._bl=0x367cd507;this._cl=0x3070dd17;this._dl=0xf70e5939;this._el=0xffc00b31;this._fl=0x68581511;this._gl=0x64f98fa7;this._hl=0xbefa4fa4;return this;};Sha384.prototype._hash=function(){var H=new Buffer(48);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset);H.writeInt32BE(l,offset+4);}writeInt64BE(this._ah,this._al,0);writeInt64BE(this._bh,this._bl,8);writeInt64BE(this._ch,this._cl,16);writeInt64BE(this._dh,this._dl,24);writeInt64BE(this._eh,this._el,32);writeInt64BE(this._fh,this._fl,40);return H;};module.exports=Sha384;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 150 *//***/function(module,exports,__webpack_require__){"use strict";var inherits=__webpack_require__(1);var Buffer=__webpack_require__(3).Buffer;var Base=__webpack_require__(10);var ZEROS=Buffer.alloc(128);var blocksize=64;function Hmac(alg,key){Base.call(this,'digest');if(typeof key==='string'){key=Buffer.from(key);}this._alg=alg;this._key=key;if(key.length>blocksize){key=alg(key);}else if(key.length<blocksize){key=Buffer.concat([key,ZEROS],blocksize);}var ipad=this._ipad=Buffer.allocUnsafe(blocksize);var opad=this._opad=Buffer.allocUnsafe(blocksize);for(var i=0;i<blocksize;i++){ipad[i]=key[i]^0x36;opad[i]=key[i]^0x5C;}this._hash=[ipad];}inherits(Hmac,Base);Hmac.prototype._update=function(data){this._hash.push(data);};Hmac.prototype._final=function(){var h=this._alg(Buffer.concat(this._hash));return this._alg(Buffer.concat([this._opad,h]));};module.exports=Hmac;/***/},/* 151 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(76);/***/},/* 152 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global,process){var checkParameters=__webpack_require__(78);var defaultEncoding=__webpack_require__(79);var sync=__webpack_require__(80);var Buffer=__webpack_require__(3).Buffer;var ZERO_BUF;var subtle=global.crypto&&global.crypto.subtle;var toBrowser={'sha':'SHA-1','sha-1':'SHA-1','sha1':'SHA-1','sha256':'SHA-256','sha-256':'SHA-256','sha384':'SHA-384','sha-384':'SHA-384','sha-512':'SHA-512','sha512':'SHA-512'};var checks=[];function checkNative(algo){if(global.process&&!global.process.browser){return _promise2.default.resolve(false);}if(!subtle||!subtle.importKey||!subtle.deriveBits){return _promise2.default.resolve(false);}if(checks[algo]!==undefined){return checks[algo];}ZERO_BUF=ZERO_BUF||Buffer.alloc(8);var prom=browserPbkdf2(ZERO_BUF,ZERO_BUF,10,128,algo).then(function(){return true;}).catch(function(){return false;});checks[algo]=prom;return prom;}function browserPbkdf2(password,salt,iterations,length,algo){return subtle.importKey('raw',password,{name:'PBKDF2'},false,['deriveBits']).then(function(key){return subtle.deriveBits({name:'PBKDF2',salt:salt,iterations:iterations,hash:{name:algo}},key,length<<3);}).then(function(res){return Buffer.from(res);});}function resolvePromise(promise,callback){promise.then(function(out){process.nextTick(function(){callback(null,out);});},function(e){process.nextTick(function(){callback(e);});});}module.exports=function(password,salt,iterations,keylen,digest,callback){if(!Buffer.isBuffer(password))password=Buffer.from(password,defaultEncoding);if(!Buffer.isBuffer(salt))salt=Buffer.from(salt,defaultEncoding);checkParameters(iterations,keylen);if(typeof digest==='function'){callback=digest;digest=undefined;}if(typeof callback!=='function')throw new Error('No callback provided to pbkdf2');digest=digest||'sha1';var algo=toBrowser[digest.toLowerCase()];if(!algo||typeof global.Promise!=='function'){return process.nextTick(function(){var out;try{out=sync(password,salt,iterations,keylen,digest);}catch(e){return callback(e);}callback(null,out);});}resolvePromise(checkNative(algo).then(function(resp){if(resp){return browserPbkdf2(password,salt,iterations,keylen,algo);}else{return sync(password,salt,iterations,keylen,digest);}}),callback);};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6),__webpack_require__(4));/***/},/* 153 *//***/function(module,exports,__webpack_require__){var ebtk=__webpack_require__(35);var aes=__webpack_require__(50);var DES=__webpack_require__(165);var desModes=__webpack_require__(171);var aesModes=__webpack_require__(51);function createCipher(suite,password){var keyLen,ivLen;suite=suite.toLowerCase();if(aesModes[suite]){keyLen=aesModes[suite].key;ivLen=aesModes[suite].iv;}else if(desModes[suite]){keyLen=desModes[suite].key*8;ivLen=desModes[suite].iv;}else{throw new TypeError('invalid suite type');}var keys=ebtk(password,false,keyLen,ivLen);return createCipheriv(suite,keys.key,keys.iv);}function createDecipher(suite,password){var keyLen,ivLen;suite=suite.toLowerCase();if(aesModes[suite]){keyLen=aesModes[suite].key;ivLen=aesModes[suite].iv;}else if(desModes[suite]){keyLen=desModes[suite].key*8;ivLen=desModes[suite].iv;}else{throw new TypeError('invalid suite type');}var keys=ebtk(password,false,keyLen,ivLen);return createDecipheriv(suite,keys.key,keys.iv);}function createCipheriv(suite,key,iv){suite=suite.toLowerCase();if(aesModes[suite]){return aes.createCipheriv(suite,key,iv);}else if(desModes[suite]){return new DES({key:key,iv:iv,mode:suite});}else{throw new TypeError('invalid suite type');}}function createDecipheriv(suite,key,iv){suite=suite.toLowerCase();if(aesModes[suite]){return aes.createDecipheriv(suite,key,iv);}else if(desModes[suite]){return new DES({key:key,iv:iv,mode:suite,decrypt:true});}else{throw new TypeError('invalid suite type');}}exports.createCipher=exports.Cipher=createCipher;exports.createCipheriv=exports.Cipheriv=createCipheriv;exports.createDecipher=exports.Decipher=createDecipher;exports.createDecipheriv=exports.Decipheriv=createDecipheriv;function getCiphers(){return(0,_keys2.default)(desModes).concat(aes.getCiphers());}exports.listCiphers=exports.getCiphers=getCiphers;/***/},/* 154 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){var inherits=__webpack_require__(1);var HashBase=__webpack_require__(155);var ARRAY16=new Array(16);function MD5(){HashBase.call(this,64);// state
this._a=0x67452301;this._b=0xefcdab89;this._c=0x98badcfe;this._d=0x10325476;}inherits(MD5,HashBase);MD5.prototype._update=function(){var M=ARRAY16;for(var i=0;i<16;++i){M[i]=this._block.readInt32LE(i*4);}var a=this._a;var b=this._b;var c=this._c;var d=this._d;a=fnF(a,b,c,d,M[0],0xd76aa478,7);d=fnF(d,a,b,c,M[1],0xe8c7b756,12);c=fnF(c,d,a,b,M[2],0x242070db,17);b=fnF(b,c,d,a,M[3],0xc1bdceee,22);a=fnF(a,b,c,d,M[4],0xf57c0faf,7);d=fnF(d,a,b,c,M[5],0x4787c62a,12);c=fnF(c,d,a,b,M[6],0xa8304613,17);b=fnF(b,c,d,a,M[7],0xfd469501,22);a=fnF(a,b,c,d,M[8],0x698098d8,7);d=fnF(d,a,b,c,M[9],0x8b44f7af,12);c=fnF(c,d,a,b,M[10],0xffff5bb1,17);b=fnF(b,c,d,a,M[11],0x895cd7be,22);a=fnF(a,b,c,d,M[12],0x6b901122,7);d=fnF(d,a,b,c,M[13],0xfd987193,12);c=fnF(c,d,a,b,M[14],0xa679438e,17);b=fnF(b,c,d,a,M[15],0x49b40821,22);a=fnG(a,b,c,d,M[1],0xf61e2562,5);d=fnG(d,a,b,c,M[6],0xc040b340,9);c=fnG(c,d,a,b,M[11],0x265e5a51,14);b=fnG(b,c,d,a,M[0],0xe9b6c7aa,20);a=fnG(a,b,c,d,M[5],0xd62f105d,5);d=fnG(d,a,b,c,M[10],0x02441453,9);c=fnG(c,d,a,b,M[15],0xd8a1e681,14);b=fnG(b,c,d,a,M[4],0xe7d3fbc8,20);a=fnG(a,b,c,d,M[9],0x21e1cde6,5);d=fnG(d,a,b,c,M[14],0xc33707d6,9);c=fnG(c,d,a,b,M[3],0xf4d50d87,14);b=fnG(b,c,d,a,M[8],0x455a14ed,20);a=fnG(a,b,c,d,M[13],0xa9e3e905,5);d=fnG(d,a,b,c,M[2],0xfcefa3f8,9);c=fnG(c,d,a,b,M[7],0x676f02d9,14);b=fnG(b,c,d,a,M[12],0x8d2a4c8a,20);a=fnH(a,b,c,d,M[5],0xfffa3942,4);d=fnH(d,a,b,c,M[8],0x8771f681,11);c=fnH(c,d,a,b,M[11],0x6d9d6122,16);b=fnH(b,c,d,a,M[14],0xfde5380c,23);a=fnH(a,b,c,d,M[1],0xa4beea44,4);d=fnH(d,a,b,c,M[4],0x4bdecfa9,11);c=fnH(c,d,a,b,M[7],0xf6bb4b60,16);b=fnH(b,c,d,a,M[10],0xbebfbc70,23);a=fnH(a,b,c,d,M[13],0x289b7ec6,4);d=fnH(d,a,b,c,M[0],0xeaa127fa,11);c=fnH(c,d,a,b,M[3],0xd4ef3085,16);b=fnH(b,c,d,a,M[6],0x04881d05,23);a=fnH(a,b,c,d,M[9],0xd9d4d039,4);d=fnH(d,a,b,c,M[12],0xe6db99e5,11);c=fnH(c,d,a,b,M[15],0x1fa27cf8,16);b=fnH(b,c,d,a,M[2],0xc4ac5665,23);a=fnI(a,b,c,d,M[0],0xf4292244,6);d=fnI(d,a,b,c,M[7],0x432aff97,10);c=fnI(c,d,a,b,M[14],0xab9423a7,15);b=fnI(b,c,d,a,M[5],0xfc93a039,21);a=fnI(a,b,c,d,M[12],0x655b59c3,6);d=fnI(d,a,b,c,M[3],0x8f0ccc92,10);c=fnI(c,d,a,b,M[10],0xffeff47d,15);b=fnI(b,c,d,a,M[1],0x85845dd1,21);a=fnI(a,b,c,d,M[8],0x6fa87e4f,6);d=fnI(d,a,b,c,M[15],0xfe2ce6e0,10);c=fnI(c,d,a,b,M[6],0xa3014314,15);b=fnI(b,c,d,a,M[13],0x4e0811a1,21);a=fnI(a,b,c,d,M[4],0xf7537e82,6);d=fnI(d,a,b,c,M[11],0xbd3af235,10);c=fnI(c,d,a,b,M[2],0x2ad7d2bb,15);b=fnI(b,c,d,a,M[9],0xeb86d391,21);this._a=this._a+a|0;this._b=this._b+b|0;this._c=this._c+c|0;this._d=this._d+d|0;};MD5.prototype._digest=function(){// create padding and handle blocks
this._block[this._blockOffset++]=0x80;if(this._blockOffset>56){this._block.fill(0,this._blockOffset,64);this._update();this._blockOffset=0;}this._block.fill(0,this._blockOffset,56);this._block.writeUInt32LE(this._length[0],56);this._block.writeUInt32LE(this._length[1],60);this._update();// produce result
var buffer=new Buffer(16);buffer.writeInt32LE(this._a,0);buffer.writeInt32LE(this._b,4);buffer.writeInt32LE(this._c,8);buffer.writeInt32LE(this._d,12);return buffer;};function rotl(x,n){return x<<n|x>>>32-n;}function fnF(a,b,c,d,m,k,s){return rotl(a+(b&c|~b&d)+m+k|0,s)+b|0;}function fnG(a,b,c,d,m,k,s){return rotl(a+(b&d|c&~d)+m+k|0,s)+b|0;}function fnH(a,b,c,d,m,k,s){return rotl(a+(b^c^d)+m+k|0,s)+b|0;}function fnI(a,b,c,d,m,k,s){return rotl(a+(c^(b|~d))+m+k|0,s)+b|0;}module.exports=MD5;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 155 *//***/function(module,exports,__webpack_require__){"use strict";var Buffer=__webpack_require__(3).Buffer;var Transform=__webpack_require__(15).Transform;var inherits=__webpack_require__(1);function throwIfNotStringOrBuffer(val,prefix){if(!Buffer.isBuffer(val)&&typeof val!=='string'){throw new TypeError(prefix+' must be a string or a buffer');}}function HashBase(blockSize){Transform.call(this);this._block=Buffer.allocUnsafe(blockSize);this._blockSize=blockSize;this._blockOffset=0;this._length=[0,0,0,0];this._finalized=false;}inherits(HashBase,Transform);HashBase.prototype._transform=function(chunk,encoding,callback){var error=null;try{this.update(chunk,encoding);}catch(err){error=err;}callback(error);};HashBase.prototype._flush=function(callback){var error=null;try{this.push(this.digest());}catch(err){error=err;}callback(error);};HashBase.prototype.update=function(data,encoding){throwIfNotStringOrBuffer(data,'Data');if(this._finalized)throw new Error('Digest already called');if(!Buffer.isBuffer(data))data=Buffer.from(data,encoding);// consume data
var block=this._block;var offset=0;while(this._blockOffset+data.length-offset>=this._blockSize){for(var i=this._blockOffset;i<this._blockSize;){block[i++]=data[offset++];}this._update();this._blockOffset=0;}while(offset<data.length){block[this._blockOffset++]=data[offset++];}// update length
for(var j=0,carry=data.length*8;carry>0;++j){this._length[j]+=carry;carry=this._length[j]/0x0100000000|0;if(carry>0)this._length[j]-=0x0100000000*carry;}return this;};HashBase.prototype._update=function(){throw new Error('_update is not implemented');};HashBase.prototype.digest=function(encoding){if(this._finalized)throw new Error('Digest already called');this._finalized=true;var digest=this._digest();if(encoding!==undefined)digest=digest.toString(encoding);// reset state
this._block.fill(0);this._blockOffset=0;for(var i=0;i<4;++i){this._length[i]=0;}return digest;};HashBase.prototype._digest=function(){throw new Error('_digest is not implemented');};module.exports=HashBase;/***/},/* 156 *//***/function(module,exports,__webpack_require__){var MODES=__webpack_require__(51);var AuthCipher=__webpack_require__(83);var Buffer=__webpack_require__(3).Buffer;var StreamCipher=__webpack_require__(84);var Transform=__webpack_require__(10);var aes=__webpack_require__(36);var ebtk=__webpack_require__(35);var inherits=__webpack_require__(1);function Cipher(mode,key,iv){Transform.call(this);this._cache=new Splitter();this._cipher=new aes.AES(key);this._prev=Buffer.from(iv);this._mode=mode;this._autopadding=true;}inherits(Cipher,Transform);Cipher.prototype._update=function(data){this._cache.add(data);var chunk;var thing;var out=[];while(chunk=this._cache.get()){thing=this._mode.encrypt(this,chunk);out.push(thing);}return Buffer.concat(out);};var PADDING=Buffer.alloc(16,0x10);Cipher.prototype._final=function(){var chunk=this._cache.flush();if(this._autopadding){chunk=this._mode.encrypt(this,chunk);this._cipher.scrub();return chunk;}if(!chunk.equals(PADDING)){this._cipher.scrub();throw new Error('data not multiple of block length');}};Cipher.prototype.setAutoPadding=function(setTo){this._autopadding=!!setTo;return this;};function Splitter(){this.cache=Buffer.allocUnsafe(0);}Splitter.prototype.add=function(data){this.cache=Buffer.concat([this.cache,data]);};Splitter.prototype.get=function(){if(this.cache.length>15){var out=this.cache.slice(0,16);this.cache=this.cache.slice(16);return out;}return null;};Splitter.prototype.flush=function(){var len=16-this.cache.length;var padBuff=Buffer.allocUnsafe(len);var i=-1;while(++i<len){padBuff.writeUInt8(len,i);}return Buffer.concat([this.cache,padBuff]);};function createCipheriv(suite,password,iv){var config=MODES[suite.toLowerCase()];if(!config)throw new TypeError('invalid suite type');if(typeof password==='string')password=Buffer.from(password);if(password.length!==config.key/8)throw new TypeError('invalid key length '+password.length);if(typeof iv==='string')iv=Buffer.from(iv);if(iv.length!==config.iv)throw new TypeError('invalid iv length '+iv.length);if(config.type==='stream'){return new StreamCipher(config.module,password,iv);}else if(config.type==='auth'){return new AuthCipher(config.module,password,iv);}return new Cipher(config.module,password,iv);}function createCipher(suite,password){var config=MODES[suite.toLowerCase()];if(!config)throw new TypeError('invalid suite type');var keys=ebtk(password,false,config.key,config.iv);return createCipheriv(suite,keys.key,keys.iv);}exports.createCipheriv=createCipheriv;exports.createCipher=createCipher;/***/},/* 157 *//***/function(module,exports){exports.encrypt=function(self,block){return self._cipher.encryptBlock(block);};exports.decrypt=function(self,block){return self._cipher.decryptBlock(block);};/***/},/* 158 *//***/function(module,exports,__webpack_require__){var xor=__webpack_require__(24);exports.encrypt=function(self,block){var data=xor(block,self._prev);self._prev=self._cipher.encryptBlock(data);return self._prev;};exports.decrypt=function(self,block){var pad=self._prev;self._prev=block;var out=self._cipher.decryptBlock(block);return xor(out,pad);};/***/},/* 159 *//***/function(module,exports,__webpack_require__){var Buffer=__webpack_require__(3).Buffer;var xor=__webpack_require__(24);function encryptStart(self,data,decrypt){var len=data.length;var out=xor(data,self._cache);self._cache=self._cache.slice(len);self._prev=Buffer.concat([self._prev,decrypt?data:out]);return out;}exports.encrypt=function(self,data,decrypt){var out=Buffer.allocUnsafe(0);var len;while(data.length){if(self._cache.length===0){self._cache=self._cipher.encryptBlock(self._prev);self._prev=Buffer.allocUnsafe(0);}if(self._cache.length<=data.length){len=self._cache.length;out=Buffer.concat([out,encryptStart(self,data.slice(0,len),decrypt)]);data=data.slice(len);}else{out=Buffer.concat([out,encryptStart(self,data,decrypt)]);break;}}return out;};/***/},/* 160 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){function encryptByte(self,byteParam,decrypt){var pad=self._cipher.encryptBlock(self._prev);var out=pad[0]^byteParam;self._prev=Buffer.concat([self._prev.slice(1),Buffer.from([decrypt?byteParam:out])]);return out;}exports.encrypt=function(self,chunk,decrypt){var len=chunk.length;var out=Buffer.allocUnsafe(len);var i=-1;while(++i<len){out[i]=encryptByte(self,chunk[i],decrypt);}return out;};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 161 *//***/function(module,exports,__webpack_require__){var Buffer=__webpack_require__(3).Buffer;function encryptByte(self,byteParam,decrypt){var pad;var i=-1;var len=8;var out=0;var bit,value;while(++i<len){pad=self._cipher.encryptBlock(self._prev);bit=byteParam&1<<7-i?0x80:0;value=pad[0]^bit;out+=(value&0x80)>>i%8;self._prev=shiftIn(self._prev,decrypt?bit:value);}return out;}function shiftIn(buffer,value){var len=buffer.length;var i=-1;var out=Buffer.allocUnsafe(buffer.length);buffer=Buffer.concat([buffer,Buffer.from([value])]);while(++i<len){out[i]=buffer[i]<<1|buffer[i+1]>>7;}return out;}exports.encrypt=function(self,chunk,decrypt){var len=chunk.length;var out=Buffer.allocUnsafe(len);var i=-1;while(++i<len){out[i]=encryptByte(self,chunk[i],decrypt);}return out;};/***/},/* 162 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var xor=__webpack_require__(24);function getBlock(self){self._prev=self._cipher.encryptBlock(self._prev);return self._prev;}exports.encrypt=function(self,chunk){while(self._cache.length<chunk.length){self._cache=Buffer.concat([self._cache,getBlock(self)]);}var pad=self._cache.slice(0,chunk.length);self._cache=self._cache.slice(chunk.length);return xor(chunk,pad);};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 163 *//***/function(module,exports,__webpack_require__){var Buffer=__webpack_require__(3).Buffer;var ZEROES=Buffer.alloc(16,0);function toArray(buf){return[buf.readUInt32BE(0),buf.readUInt32BE(4),buf.readUInt32BE(8),buf.readUInt32BE(12)];}function fromArray(out){var buf=Buffer.allocUnsafe(16);buf.writeUInt32BE(out[0]>>>0,0);buf.writeUInt32BE(out[1]>>>0,4);buf.writeUInt32BE(out[2]>>>0,8);buf.writeUInt32BE(out[3]>>>0,12);return buf;}function GHASH(key){this.h=key;this.state=Buffer.alloc(16,0);this.cache=Buffer.allocUnsafe(0);}// from http://bitwiseshiftleft.github.io/sjcl/doc/symbols/src/core_gcm.js.html
// by Juho Vähä-Herttua
GHASH.prototype.ghash=function(block){var i=-1;while(++i<block.length){this.state[i]^=block[i];}this._multiply();};GHASH.prototype._multiply=function(){var Vi=toArray(this.h);var Zi=[0,0,0,0];var j,xi,lsbVi;var i=-1;while(++i<128){xi=(this.state[~~(i/8)]&1<<7-i%8)!==0;if(xi){// Z_i+1 = Z_i ^ V_i
Zi[0]^=Vi[0];Zi[1]^=Vi[1];Zi[2]^=Vi[2];Zi[3]^=Vi[3];}// Store the value of LSB(V_i)
lsbVi=(Vi[3]&1)!==0;// V_i+1 = V_i >> 1
for(j=3;j>0;j--){Vi[j]=Vi[j]>>>1|(Vi[j-1]&1)<<31;}Vi[0]=Vi[0]>>>1;// If LSB(V_i) is 1, V_i+1 = (V_i >> 1) ^ R
if(lsbVi){Vi[0]=Vi[0]^0xe1<<24;}}this.state=fromArray(Zi);};GHASH.prototype.update=function(buf){this.cache=Buffer.concat([this.cache,buf]);var chunk;while(this.cache.length>=16){chunk=this.cache.slice(0,16);this.cache=this.cache.slice(16);this.ghash(chunk);}};GHASH.prototype.final=function(abl,bl){if(this.cache.length){this.ghash(Buffer.concat([this.cache,ZEROES],16));}this.ghash(fromArray([0,abl,0,bl]));return this.state;};module.exports=GHASH;/***/},/* 164 *//***/function(module,exports,__webpack_require__){var AuthCipher=__webpack_require__(83);var Buffer=__webpack_require__(3).Buffer;var MODES=__webpack_require__(51);var StreamCipher=__webpack_require__(84);var Transform=__webpack_require__(10);var aes=__webpack_require__(36);var ebtk=__webpack_require__(35);var inherits=__webpack_require__(1);function Decipher(mode,key,iv){Transform.call(this);this._cache=new Splitter();this._last=void 0;this._cipher=new aes.AES(key);this._prev=Buffer.from(iv);this._mode=mode;this._autopadding=true;}inherits(Decipher,Transform);Decipher.prototype._update=function(data){this._cache.add(data);var chunk;var thing;var out=[];while(chunk=this._cache.get(this._autopadding)){thing=this._mode.decrypt(this,chunk);out.push(thing);}return Buffer.concat(out);};Decipher.prototype._final=function(){var chunk=this._cache.flush();if(this._autopadding){return unpad(this._mode.decrypt(this,chunk));}else if(chunk){throw new Error('data not multiple of block length');}};Decipher.prototype.setAutoPadding=function(setTo){this._autopadding=!!setTo;return this;};function Splitter(){this.cache=Buffer.allocUnsafe(0);}Splitter.prototype.add=function(data){this.cache=Buffer.concat([this.cache,data]);};Splitter.prototype.get=function(autoPadding){var out;if(autoPadding){if(this.cache.length>16){out=this.cache.slice(0,16);this.cache=this.cache.slice(16);return out;}}else{if(this.cache.length>=16){out=this.cache.slice(0,16);this.cache=this.cache.slice(16);return out;}}return null;};Splitter.prototype.flush=function(){if(this.cache.length)return this.cache;};function unpad(last){var padded=last[15];var i=-1;while(++i<padded){if(last[i+(16-padded)]!==padded){throw new Error('unable to decrypt data');}}if(padded===16)return;return last.slice(0,16-padded);}function createDecipheriv(suite,password,iv){var config=MODES[suite.toLowerCase()];if(!config)throw new TypeError('invalid suite type');if(typeof iv==='string')iv=Buffer.from(iv);if(iv.length!==config.iv)throw new TypeError('invalid iv length '+iv.length);if(typeof password==='string')password=Buffer.from(password);if(password.length!==config.key/8)throw new TypeError('invalid key length '+password.length);if(config.type==='stream'){return new StreamCipher(config.module,password,iv,true);}else if(config.type==='auth'){return new AuthCipher(config.module,password,iv,true);}return new Decipher(config.module,password,iv);}function createDecipher(suite,password){var config=MODES[suite.toLowerCase()];if(!config)throw new TypeError('invalid suite type');var keys=ebtk(password,false,config.key,config.iv);return createDecipheriv(suite,keys.key,keys.iv);}exports.createDecipher=createDecipher;exports.createDecipheriv=createDecipheriv;/***/},/* 165 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var CipherBase=__webpack_require__(10);var des=__webpack_require__(52);var inherits=__webpack_require__(1);var modes={'des-ede3-cbc':des.CBC.instantiate(des.EDE),'des-ede3':des.EDE,'des-ede-cbc':des.CBC.instantiate(des.EDE),'des-ede':des.EDE,'des-cbc':des.CBC.instantiate(des.DES),'des-ecb':des.DES};modes.des=modes['des-cbc'];modes.des3=modes['des-ede3-cbc'];module.exports=DES;inherits(DES,CipherBase);function DES(opts){CipherBase.call(this);var modeName=opts.mode.toLowerCase();var mode=modes[modeName];var type;if(opts.decrypt){type='decrypt';}else{type='encrypt';}var key=opts.key;if(modeName==='des-ede'||modeName==='des-ede-cbc'){key=Buffer.concat([key,key.slice(0,8)]);}var iv=opts.iv;this._des=mode.create({key:key,iv:iv,type:type});}DES.prototype._update=function(data){return new Buffer(this._des.update(data));};DES.prototype._final=function(){return new Buffer(this._des.final());};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 166 *//***/function(module,exports,__webpack_require__){"use strict";exports.readUInt32BE=function readUInt32BE(bytes,off){var res=bytes[0+off]<<24|bytes[1+off]<<16|bytes[2+off]<<8|bytes[3+off];return res>>>0;};exports.writeUInt32BE=function writeUInt32BE(bytes,value,off){bytes[0+off]=value>>>24;bytes[1+off]=value>>>16&0xff;bytes[2+off]=value>>>8&0xff;bytes[3+off]=value&0xff;};exports.ip=function ip(inL,inR,out,off){var outL=0;var outR=0;for(var i=6;i>=0;i-=2){for(var j=0;j<=24;j+=8){outL<<=1;outL|=inR>>>j+i&1;}for(var j=0;j<=24;j+=8){outL<<=1;outL|=inL>>>j+i&1;}}for(var i=6;i>=0;i-=2){for(var j=1;j<=25;j+=8){outR<<=1;outR|=inR>>>j+i&1;}for(var j=1;j<=25;j+=8){outR<<=1;outR|=inL>>>j+i&1;}}out[off+0]=outL>>>0;out[off+1]=outR>>>0;};exports.rip=function rip(inL,inR,out,off){var outL=0;var outR=0;for(var i=0;i<4;i++){for(var j=24;j>=0;j-=8){outL<<=1;outL|=inR>>>j+i&1;outL<<=1;outL|=inL>>>j+i&1;}}for(var i=4;i<8;i++){for(var j=24;j>=0;j-=8){outR<<=1;outR|=inR>>>j+i&1;outR<<=1;outR|=inL>>>j+i&1;}}out[off+0]=outL>>>0;out[off+1]=outR>>>0;};exports.pc1=function pc1(inL,inR,out,off){var outL=0;var outR=0;// 7, 15, 23, 31, 39, 47, 55, 63
// 6, 14, 22, 30, 39, 47, 55, 63
// 5, 13, 21, 29, 39, 47, 55, 63
// 4, 12, 20, 28
for(var i=7;i>=5;i--){for(var j=0;j<=24;j+=8){outL<<=1;outL|=inR>>j+i&1;}for(var j=0;j<=24;j+=8){outL<<=1;outL|=inL>>j+i&1;}}for(var j=0;j<=24;j+=8){outL<<=1;outL|=inR>>j+i&1;}// 1, 9, 17, 25, 33, 41, 49, 57
// 2, 10, 18, 26, 34, 42, 50, 58
// 3, 11, 19, 27, 35, 43, 51, 59
// 36, 44, 52, 60
for(var i=1;i<=3;i++){for(var j=0;j<=24;j+=8){outR<<=1;outR|=inR>>j+i&1;}for(var j=0;j<=24;j+=8){outR<<=1;outR|=inL>>j+i&1;}}for(var j=0;j<=24;j+=8){outR<<=1;outR|=inL>>j+i&1;}out[off+0]=outL>>>0;out[off+1]=outR>>>0;};exports.r28shl=function r28shl(num,shift){return num<<shift&0xfffffff|num>>>28-shift;};var pc2table=[// inL => outL
14,11,17,4,27,23,25,0,13,22,7,18,5,9,16,24,2,20,12,21,1,8,15,26,// inR => outR
15,4,25,19,9,1,26,16,5,11,23,8,12,7,17,0,22,3,10,14,6,20,27,24];exports.pc2=function pc2(inL,inR,out,off){var outL=0;var outR=0;var len=pc2table.length>>>1;for(var i=0;i<len;i++){outL<<=1;outL|=inL>>>pc2table[i]&0x1;}for(var i=len;i<pc2table.length;i++){outR<<=1;outR|=inR>>>pc2table[i]&0x1;}out[off+0]=outL>>>0;out[off+1]=outR>>>0;};exports.expand=function expand(r,out,off){var outL=0;var outR=0;outL=(r&1)<<5|r>>>27;for(var i=23;i>=15;i-=4){outL<<=6;outL|=r>>>i&0x3f;}for(var i=11;i>=3;i-=4){outR|=r>>>i&0x3f;outR<<=6;}outR|=(r&0x1f)<<1|r>>>31;out[off+0]=outL>>>0;out[off+1]=outR>>>0;};var sTable=[14,0,4,15,13,7,1,4,2,14,15,2,11,13,8,1,3,10,10,6,6,12,12,11,5,9,9,5,0,3,7,8,4,15,1,12,14,8,8,2,13,4,6,9,2,1,11,7,15,5,12,11,9,3,7,14,3,10,10,0,5,6,0,13,15,3,1,13,8,4,14,7,6,15,11,2,3,8,4,14,9,12,7,0,2,1,13,10,12,6,0,9,5,11,10,5,0,13,14,8,7,10,11,1,10,3,4,15,13,4,1,2,5,11,8,6,12,7,6,12,9,0,3,5,2,14,15,9,10,13,0,7,9,0,14,9,6,3,3,4,15,6,5,10,1,2,13,8,12,5,7,14,11,12,4,11,2,15,8,1,13,1,6,10,4,13,9,0,8,6,15,9,3,8,0,7,11,4,1,15,2,14,12,3,5,11,10,5,14,2,7,12,7,13,13,8,14,11,3,5,0,6,6,15,9,0,10,3,1,4,2,7,8,2,5,12,11,1,12,10,4,14,15,9,10,3,6,15,9,0,0,6,12,10,11,1,7,13,13,8,15,9,1,4,3,5,14,11,5,12,2,7,8,2,4,14,2,14,12,11,4,2,1,12,7,4,10,7,11,13,6,1,8,5,5,0,3,15,15,10,13,3,0,9,14,8,9,6,4,11,2,8,1,12,11,7,10,1,13,14,7,2,8,13,15,6,9,15,12,0,5,9,6,10,3,4,0,5,14,3,12,10,1,15,10,4,15,2,9,7,2,12,6,9,8,5,0,6,13,1,3,13,4,14,14,0,7,11,5,3,11,8,9,4,14,3,15,2,5,12,2,9,8,5,12,15,3,10,7,11,0,14,4,1,10,7,1,6,13,0,11,8,6,13,4,13,11,0,2,11,14,7,15,4,0,9,8,1,13,10,3,14,12,3,9,5,7,12,5,2,10,15,6,8,1,6,1,6,4,11,11,13,13,8,12,1,3,4,7,10,14,7,10,9,15,5,6,0,8,15,0,14,5,2,9,3,2,12,13,1,2,15,8,13,4,8,6,10,15,3,11,7,1,4,10,12,9,5,3,6,14,11,5,0,0,14,12,9,7,2,7,2,11,1,4,14,1,7,9,4,12,10,14,8,2,13,0,15,6,12,10,9,13,0,15,3,3,5,5,6,8,11];exports.substitute=function substitute(inL,inR){var out=0;for(var i=0;i<4;i++){var b=inL>>>18-i*6&0x3f;var sb=sTable[i*0x40+b];out<<=4;out|=sb;}for(var i=0;i<4;i++){var b=inR>>>18-i*6&0x3f;var sb=sTable[4*0x40+i*0x40+b];out<<=4;out|=sb;}return out>>>0;};var permuteTable=[16,25,12,11,3,20,4,15,31,17,9,6,27,14,1,22,30,24,8,18,0,5,29,23,13,19,2,26,10,21,28,7];exports.permute=function permute(num){var out=0;for(var i=0;i<permuteTable.length;i++){out<<=1;out|=num>>>permuteTable[i]&0x1;}return out>>>0;};exports.padSplit=function padSplit(num,size,group){var str=num.toString(2);while(str.length<size){str='0'+str;}var out=[];for(var i=0;i<size;i+=group){out.push(str.slice(i,i+group));}return out.join(' ');};/***/},/* 167 *//***/function(module,exports,__webpack_require__){"use strict";var assert=__webpack_require__(7);function Cipher(options){this.options=options;this.type=this.options.type;this.blockSize=8;this._init();this.buffer=new Array(this.blockSize);this.bufferOff=0;}module.exports=Cipher;Cipher.prototype._init=function _init(){// Might be overrided
};Cipher.prototype.update=function update(data){if(data.length===0)return[];if(this.type==='decrypt')return this._updateDecrypt(data);else return this._updateEncrypt(data);};Cipher.prototype._buffer=function _buffer(data,off){// Append data to buffer
var min=Math.min(this.buffer.length-this.bufferOff,data.length-off);for(var i=0;i<min;i++){this.buffer[this.bufferOff+i]=data[off+i];}this.bufferOff+=min;// Shift next
return min;};Cipher.prototype._flushBuffer=function _flushBuffer(out,off){this._update(this.buffer,0,out,off);this.bufferOff=0;return this.blockSize;};Cipher.prototype._updateEncrypt=function _updateEncrypt(data){var inputOff=0;var outputOff=0;var count=(this.bufferOff+data.length)/this.blockSize|0;var out=new Array(count*this.blockSize);if(this.bufferOff!==0){inputOff+=this._buffer(data,inputOff);if(this.bufferOff===this.buffer.length)outputOff+=this._flushBuffer(out,outputOff);}// Write blocks
var max=data.length-(data.length-inputOff)%this.blockSize;for(;inputOff<max;inputOff+=this.blockSize){this._update(data,inputOff,out,outputOff);outputOff+=this.blockSize;}// Queue rest
for(;inputOff<data.length;inputOff++,this.bufferOff++){this.buffer[this.bufferOff]=data[inputOff];}return out;};Cipher.prototype._updateDecrypt=function _updateDecrypt(data){var inputOff=0;var outputOff=0;var count=Math.ceil((this.bufferOff+data.length)/this.blockSize)-1;var out=new Array(count*this.blockSize);// TODO(indutny): optimize it, this is far from optimal
for(;count>0;count--){inputOff+=this._buffer(data,inputOff);outputOff+=this._flushBuffer(out,outputOff);}// Buffer rest of the input
inputOff+=this._buffer(data,inputOff);return out;};Cipher.prototype.final=function final(buffer){var first;if(buffer)first=this.update(buffer);var last;if(this.type==='encrypt')last=this._finalEncrypt();else last=this._finalDecrypt();if(first)return first.concat(last);else return last;};Cipher.prototype._pad=function _pad(buffer,off){if(off===0)return false;while(off<buffer.length){buffer[off++]=0;}return true;};Cipher.prototype._finalEncrypt=function _finalEncrypt(){if(!this._pad(this.buffer,this.bufferOff))return[];var out=new Array(this.blockSize);this._update(this.buffer,0,out,0);return out;};Cipher.prototype._unpad=function _unpad(buffer){return buffer;};Cipher.prototype._finalDecrypt=function _finalDecrypt(){assert.equal(this.bufferOff,this.blockSize,'Not enough data to decrypt');var out=new Array(this.blockSize);this._flushBuffer(out,0);return this._unpad(out);};/***/},/* 168 *//***/function(module,exports,__webpack_require__){"use strict";var assert=__webpack_require__(7);var inherits=__webpack_require__(1);var des=__webpack_require__(52);var utils=des.utils;var Cipher=des.Cipher;function DESState(){this.tmp=new Array(2);this.keys=null;}function DES(options){Cipher.call(this,options);var state=new DESState();this._desState=state;this.deriveKeys(state,options.key);}inherits(DES,Cipher);module.exports=DES;DES.create=function create(options){return new DES(options);};var shiftTable=[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];DES.prototype.deriveKeys=function deriveKeys(state,key){state.keys=new Array(16*2);assert.equal(key.length,this.blockSize,'Invalid key length');var kL=utils.readUInt32BE(key,0);var kR=utils.readUInt32BE(key,4);utils.pc1(kL,kR,state.tmp,0);kL=state.tmp[0];kR=state.tmp[1];for(var i=0;i<state.keys.length;i+=2){var shift=shiftTable[i>>>1];kL=utils.r28shl(kL,shift);kR=utils.r28shl(kR,shift);utils.pc2(kL,kR,state.keys,i);}};DES.prototype._update=function _update(inp,inOff,out,outOff){var state=this._desState;var l=utils.readUInt32BE(inp,inOff);var r=utils.readUInt32BE(inp,inOff+4);// Initial Permutation
utils.ip(l,r,state.tmp,0);l=state.tmp[0];r=state.tmp[1];if(this.type==='encrypt')this._encrypt(state,l,r,state.tmp,0);else this._decrypt(state,l,r,state.tmp,0);l=state.tmp[0];r=state.tmp[1];utils.writeUInt32BE(out,l,outOff);utils.writeUInt32BE(out,r,outOff+4);};DES.prototype._pad=function _pad(buffer,off){var value=buffer.length-off;for(var i=off;i<buffer.length;i++){buffer[i]=value;}return true;};DES.prototype._unpad=function _unpad(buffer){var pad=buffer[buffer.length-1];for(var i=buffer.length-pad;i<buffer.length;i++){assert.equal(buffer[i],pad);}return buffer.slice(0,buffer.length-pad);};DES.prototype._encrypt=function _encrypt(state,lStart,rStart,out,off){var l=lStart;var r=rStart;// Apply f() x16 times
for(var i=0;i<state.keys.length;i+=2){var keyL=state.keys[i];var keyR=state.keys[i+1];// f(r, k)
utils.expand(r,state.tmp,0);keyL^=state.tmp[0];keyR^=state.tmp[1];var s=utils.substitute(keyL,keyR);var f=utils.permute(s);var t=r;r=(l^f)>>>0;l=t;}// Reverse Initial Permutation
utils.rip(r,l,out,off);};DES.prototype._decrypt=function _decrypt(state,lStart,rStart,out,off){var l=rStart;var r=lStart;// Apply f() x16 times
for(var i=state.keys.length-2;i>=0;i-=2){var keyL=state.keys[i];var keyR=state.keys[i+1];// f(r, k)
utils.expand(l,state.tmp,0);keyL^=state.tmp[0];keyR^=state.tmp[1];var s=utils.substitute(keyL,keyR);var f=utils.permute(s);var t=l;l=(r^f)>>>0;r=t;}// Reverse Initial Permutation
utils.rip(l,r,out,off);};/***/},/* 169 *//***/function(module,exports,__webpack_require__){"use strict";var assert=__webpack_require__(7);var inherits=__webpack_require__(1);var proto={};function CBCState(iv){assert.equal(iv.length,8,'Invalid IV length');this.iv=new Array(8);for(var i=0;i<this.iv.length;i++){this.iv[i]=iv[i];}}function instantiate(Base){function CBC(options){Base.call(this,options);this._cbcInit();}inherits(CBC,Base);var keys=(0,_keys2.default)(proto);for(var i=0;i<keys.length;i++){var key=keys[i];CBC.prototype[key]=proto[key];}CBC.create=function create(options){return new CBC(options);};return CBC;}exports.instantiate=instantiate;proto._cbcInit=function _cbcInit(){var state=new CBCState(this.options.iv);this._cbcState=state;};proto._update=function _update(inp,inOff,out,outOff){var state=this._cbcState;var superProto=this.constructor.super_.prototype;var iv=state.iv;if(this.type==='encrypt'){for(var i=0;i<this.blockSize;i++){iv[i]^=inp[inOff+i];}superProto._update.call(this,iv,0,out,outOff);for(var i=0;i<this.blockSize;i++){iv[i]=out[outOff+i];}}else{superProto._update.call(this,inp,inOff,out,outOff);for(var i=0;i<this.blockSize;i++){out[outOff+i]^=iv[i];}for(var i=0;i<this.blockSize;i++){iv[i]=inp[inOff+i];}}};/***/},/* 170 *//***/function(module,exports,__webpack_require__){"use strict";var assert=__webpack_require__(7);var inherits=__webpack_require__(1);var des=__webpack_require__(52);var Cipher=des.Cipher;var DES=des.DES;function EDEState(type,key){assert.equal(key.length,24,'Invalid key length');var k1=key.slice(0,8);var k2=key.slice(8,16);var k3=key.slice(16,24);if(type==='encrypt'){this.ciphers=[DES.create({type:'encrypt',key:k1}),DES.create({type:'decrypt',key:k2}),DES.create({type:'encrypt',key:k3})];}else{this.ciphers=[DES.create({type:'decrypt',key:k3}),DES.create({type:'encrypt',key:k2}),DES.create({type:'decrypt',key:k1})];}}function EDE(options){Cipher.call(this,options);var state=new EDEState(this.type,this.options.key);this._edeState=state;}inherits(EDE,Cipher);module.exports=EDE;EDE.create=function create(options){return new EDE(options);};EDE.prototype._update=function _update(inp,inOff,out,outOff){var state=this._edeState;state.ciphers[0]._update(inp,inOff,out,outOff);state.ciphers[1]._update(out,outOff,out,outOff);state.ciphers[2]._update(out,outOff,out,outOff);};EDE.prototype._pad=DES.prototype._pad;EDE.prototype._unpad=DES.prototype._unpad;/***/},/* 171 *//***/function(module,exports){exports['des-ecb']={key:8,iv:0};exports['des-cbc']=exports.des={key:8,iv:8};exports['des-ede3-cbc']=exports.des3={key:24,iv:8};exports['des-ede3']={key:24,iv:0};exports['des-ede-cbc']={key:16,iv:8};exports['des-ede']={key:16,iv:0/***/};},/* 172 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var generatePrime=__webpack_require__(85);var primes=__webpack_require__(175);var DH=__webpack_require__(176);function getDiffieHellman(mod){var prime=new Buffer(primes[mod].prime,'hex');var gen=new Buffer(primes[mod].gen,'hex');return new DH(prime,gen);}var ENCODINGS={'binary':true,'hex':true,'base64':true};function createDiffieHellman(prime,enc,generator,genc){if(Buffer.isBuffer(enc)||ENCODINGS[enc]===undefined){return createDiffieHellman(prime,'binary',enc,generator);}enc=enc||'binary';genc=genc||'binary';generator=generator||new Buffer([2]);if(!Buffer.isBuffer(generator)){generator=new Buffer(generator,genc);}if(typeof prime==='number'){return new DH(generatePrime(prime,generator),generator,true);}if(!Buffer.isBuffer(prime)){prime=new Buffer(prime,enc);}return new DH(prime,generator,true);}exports.DiffieHellmanGroup=exports.createDiffieHellmanGroup=exports.getDiffieHellman=getDiffieHellman;exports.createDiffieHellman=exports.DiffieHellman=createDiffieHellman;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 173 *//***/function(module,exports){/* (ignored) *//***/},/* 174 *//***/function(module,exports){/* (ignored) *//***/},/* 175 *//***/function(module,exports){module.exports={"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}/***/};},/* 176 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var BN=__webpack_require__(2);var MillerRabin=__webpack_require__(86);var millerRabin=new MillerRabin();var TWENTYFOUR=new BN(24);var ELEVEN=new BN(11);var TEN=new BN(10);var THREE=new BN(3);var SEVEN=new BN(7);var primes=__webpack_require__(85);var randomBytes=__webpack_require__(22);module.exports=DH;function setPublicKey(pub,enc){enc=enc||'utf8';if(!Buffer.isBuffer(pub)){pub=new Buffer(pub,enc);}this._pub=new BN(pub);return this;}function setPrivateKey(priv,enc){enc=enc||'utf8';if(!Buffer.isBuffer(priv)){priv=new Buffer(priv,enc);}this._priv=new BN(priv);return this;}var primeCache={};function checkPrime(prime,generator){var gen=generator.toString('hex');var hex=[gen,prime.toString(16)].join('_');if(hex in primeCache){return primeCache[hex];}var error=0;if(prime.isEven()||!primes.simpleSieve||!primes.fermatTest(prime)||!millerRabin.test(prime)){//not a prime so +1
error+=1;if(gen==='02'||gen==='05'){// we'd be able to check the generator
// it would fail so +8
error+=8;}else{//we wouldn't be able to test the generator
// so +4
error+=4;}primeCache[hex]=error;return error;}if(!millerRabin.test(prime.shrn(1))){//not a safe prime
error+=2;}var rem;switch(gen){case'02':if(prime.mod(TWENTYFOUR).cmp(ELEVEN)){// unsuidable generator
error+=8;}break;case'05':rem=prime.mod(TEN);if(rem.cmp(THREE)&&rem.cmp(SEVEN)){// prime mod 10 needs to equal 3 or 7
error+=8;}break;default:error+=4;}primeCache[hex]=error;return error;}function DH(prime,generator,malleable){this.setGenerator(generator);this.__prime=new BN(prime);this._prime=BN.mont(this.__prime);this._primeLen=prime.length;this._pub=undefined;this._priv=undefined;this._primeCode=undefined;if(malleable){this.setPublicKey=setPublicKey;this.setPrivateKey=setPrivateKey;}else{this._primeCode=8;}}Object.defineProperty(DH.prototype,'verifyError',{enumerable:true,get:function get(){if(typeof this._primeCode!=='number'){this._primeCode=checkPrime(this.__prime,this.__gen);}return this._primeCode;}});DH.prototype.generateKeys=function(){if(!this._priv){this._priv=new BN(randomBytes(this._primeLen));}this._pub=this._gen.toRed(this._prime).redPow(this._priv).fromRed();return this.getPublicKey();};DH.prototype.computeSecret=function(other){other=new BN(other);other=other.toRed(this._prime);var secret=other.redPow(this._priv).fromRed();var out=new Buffer(secret.toArray());var prime=this.getPrime();if(out.length<prime.length){var front=new Buffer(prime.length-out.length);front.fill(0);out=Buffer.concat([front,out]);}return out;};DH.prototype.getPublicKey=function getPublicKey(enc){return formatReturnValue(this._pub,enc);};DH.prototype.getPrivateKey=function getPrivateKey(enc){return formatReturnValue(this._priv,enc);};DH.prototype.getPrime=function(enc){return formatReturnValue(this.__prime,enc);};DH.prototype.getGenerator=function(enc){return formatReturnValue(this._gen,enc);};DH.prototype.setGenerator=function(gen,enc){enc=enc||'utf8';if(!Buffer.isBuffer(gen)){gen=new Buffer(gen,enc);}this.__gen=gen;this._gen=new BN(gen);return this;};function formatReturnValue(bn,enc){var buf=new Buffer(bn.toArray());if(!enc){return buf;}else{return buf.toString(enc);}}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 177 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var createHash=__webpack_require__(23);var stream=__webpack_require__(15);var inherits=__webpack_require__(1);var sign=__webpack_require__(178);var verify=__webpack_require__(214);var algorithms=__webpack_require__(76);(0,_keys2.default)(algorithms).forEach(function(key){algorithms[key].id=new Buffer(algorithms[key].id,'hex');algorithms[key.toLowerCase()]=algorithms[key];});function Sign(algorithm){stream.Writable.call(this);var data=algorithms[algorithm];if(!data)throw new Error('Unknown message digest');this._hashType=data.hash;this._hash=createHash(data.hash);this._tag=data.id;this._signType=data.sign;}inherits(Sign,stream.Writable);Sign.prototype._write=function _write(data,_,done){this._hash.update(data);done();};Sign.prototype.update=function update(data,enc){if(typeof data==='string')data=new Buffer(data,enc);this._hash.update(data);return this;};Sign.prototype.sign=function signMethod(key,enc){this.end();var hash=this._hash.digest();var sig=sign(hash,key,this._hashType,this._signType,this._tag);return enc?sig.toString(enc):sig;};function Verify(algorithm){stream.Writable.call(this);var data=algorithms[algorithm];if(!data)throw new Error('Unknown message digest');this._hash=createHash(data.hash);this._tag=data.id;this._signType=data.sign;}inherits(Verify,stream.Writable);Verify.prototype._write=function _write(data,_,done){this._hash.update(data);done();};Verify.prototype.update=function update(data,enc){if(typeof data==='string')data=new Buffer(data,enc);this._hash.update(data);return this;};Verify.prototype.verify=function verifyMethod(key,sig,enc){if(typeof sig==='string')sig=new Buffer(sig,enc);this.end();var hash=this._hash.digest();return verify(sig,hash,key,this._signType,this._tag);};function createSign(algorithm){return new Sign(algorithm);}function createVerify(algorithm){return new Verify(algorithm);}module.exports={Sign:createSign,Verify:createVerify,createSign:createSign,createVerify:createVerify/* WEBPACK VAR INJECTION */};}).call(exports,__webpack_require__(0).Buffer);/***/},/* 178 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){// much of this based on https://github.com/indutny/self-signed/blob/gh-pages/lib/rsa.js
var createHmac=__webpack_require__(75);var crt=__webpack_require__(53);var EC=__webpack_require__(5).ec;var BN=__webpack_require__(2);var parseKeys=__webpack_require__(38);var curves=__webpack_require__(96);function sign(hash,key,hashType,signType,tag){var priv=parseKeys(key);if(priv.curve){// rsa keys can be interpreted as ecdsa ones in openssl
if(signType!=='ecdsa'&&signType!=='ecdsa/rsa')throw new Error('wrong private key type');return ecSign(hash,priv);}else if(priv.type==='dsa'){if(signType!=='dsa')throw new Error('wrong private key type');return dsaSign(hash,priv,hashType);}else{if(signType!=='rsa'&&signType!=='ecdsa/rsa')throw new Error('wrong private key type');}hash=Buffer.concat([tag,hash]);var len=priv.modulus.byteLength();var pad=[0,1];while(hash.length+pad.length+1<len){pad.push(0xff);}pad.push(0x00);var i=-1;while(++i<hash.length){pad.push(hash[i]);}var out=crt(pad,priv);return out;}function ecSign(hash,priv){var curveId=curves[priv.curve.join('.')];if(!curveId)throw new Error('unknown curve '+priv.curve.join('.'));var curve=new EC(curveId);var key=curve.keyFromPrivate(priv.privateKey);var out=key.sign(hash);return new Buffer(out.toDER());}function dsaSign(hash,priv,algo){var x=priv.params.priv_key;var p=priv.params.p;var q=priv.params.q;var g=priv.params.g;var r=new BN(0);var k;var H=bits2int(hash,q).mod(q);var s=false;var kv=getKey(x,q,hash,algo);while(s===false){k=makeKey(q,kv,algo);r=makeR(g,k,p,q);s=k.invm(q).imul(H.add(x.mul(r))).mod(q);if(s.cmpn(0)===0){s=false;r=new BN(0);}}return toDER(r,s);}function toDER(r,s){r=r.toArray();s=s.toArray();// Pad values
if(r[0]&0x80)r=[0].concat(r);if(s[0]&0x80)s=[0].concat(s);var total=r.length+s.length+4;var res=[0x30,total,0x02,r.length];res=res.concat(r,[0x02,s.length],s);return new Buffer(res);}function getKey(x,q,hash,algo){x=new Buffer(x.toArray());if(x.length<q.byteLength()){var zeros=new Buffer(q.byteLength()-x.length);zeros.fill(0);x=Buffer.concat([zeros,x]);}var hlen=hash.length;var hbits=bits2octets(hash,q);var v=new Buffer(hlen);v.fill(1);var k=new Buffer(hlen);k.fill(0);k=createHmac(algo,k).update(v).update(new Buffer([0])).update(x).update(hbits).digest();v=createHmac(algo,k).update(v).digest();k=createHmac(algo,k).update(v).update(new Buffer([1])).update(x).update(hbits).digest();v=createHmac(algo,k).update(v).digest();return{k:k,v:v};}function bits2int(obits,q){var bits=new BN(obits);var shift=(obits.length<<3)-q.bitLength();if(shift>0)bits.ishrn(shift);return bits;}function bits2octets(bits,q){bits=bits2int(bits,q);bits=bits.mod(q);var out=new Buffer(bits.toArray());if(out.length<q.byteLength()){var zeros=new Buffer(q.byteLength()-out.length);zeros.fill(0);out=Buffer.concat([zeros,out]);}return out;}function makeKey(q,kv,algo){var t;var k;do{t=new Buffer(0);while(t.length*8<q.bitLength()){kv.v=createHmac(algo,kv.k).update(kv.v).digest();t=Buffer.concat([t,kv.v]);}k=bits2int(t,q);kv.k=createHmac(algo,kv.k).update(kv.v).update(new Buffer([0])).digest();kv.v=createHmac(algo,kv.k).update(kv.v).digest();}while(k.cmp(q)!==-1);return k;}function makeR(g,k,p,q){return g.toRed(BN.mont(p)).redPow(k).fromRed().mod(q);}module.exports=sign;module.exports.getKey=getKey;module.exports.makeKey=makeKey;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 179 *//***/function(module,exports){module.exports={"_args":[[{"raw":"elliptic@^6.0.0","scope":null,"escapedName":"elliptic","name":"elliptic","rawSpec":"^6.0.0","spec":">=6.0.0 <7.0.0","type":"range"},'C:\\Users\\Yoana\\WebstormProjects\\untitled2\\node_modules\\browserify-sign']],"_from":"elliptic@>=6.0.0 <7.0.0","_id":"elliptic@6.4.0","_inCache":true,"_location":"/elliptic","_nodeVersion":"7.0.0","_npmOperationalInternal":{"host":"packages-18-east.internal.npmjs.com","tmp":"tmp/elliptic-6.4.0.tgz_1487798866428_0.30510620190761983"},"_npmUser":{"name":"indutny","email":"fedor@indutny.com"},"_npmVersion":"3.10.8","_phantomChildren":{},"_requested":{"raw":"elliptic@^6.0.0","scope":null,"escapedName":"elliptic","name":"elliptic","rawSpec":"^6.0.0","spec":">=6.0.0 <7.0.0","type":"range"},"_requiredBy":["/browserify-sign","/create-ecdh"],"_resolved":"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz","_shasum":"cac9af8762c85836187003c8dfe193e5e2eae5df","_shrinkwrap":null,"_spec":"elliptic@^6.0.0","_where":'C:\\Users\\Yoana\\WebstormProjects\\untitled2\\node_modules\\browserify-sign',"author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"dependencies":{"bn.js":"^4.4.0","brorand":"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0","inherits":"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"},"description":"EC cryptography","devDependencies":{"brfs":"^1.4.3","coveralls":"^2.11.3","grunt":"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2","istanbul":"^0.4.2","jscs":"^2.9.0","jshint":"^2.6.0","mocha":"^2.1.0"},"directories":{},"dist":{"shasum":"cac9af8762c85836187003c8dfe193e5e2eae5df","tarball":"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz"},"files":["lib"],"gitHead":"6b0d2b76caae91471649c8e21f0b1d3ba0f96090","homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","maintainers":[{"name":"indutny","email":"fedor@indutny.com"}],"name":"elliptic","optionalDependencies":{},"readme":"ERROR: No README data found!","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"jscs":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","jshint":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","lint":"npm run jscs && npm run jshint","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.4.0"/***/};},/* 180 *//***/function(module,exports,__webpack_require__){"use strict";var utils=exports;var BN=__webpack_require__(2);var minAssert=__webpack_require__(7);var minUtils=__webpack_require__(88);utils.assert=minAssert;utils.toArray=minUtils.toArray;utils.zero2=minUtils.zero2;utils.toHex=minUtils.toHex;utils.encode=minUtils.encode;// Represent num in a w-NAF form
function getNAF(num,w){var naf=[];var ws=1<<w+1;var k=num.clone();while(k.cmpn(1)>=0){var z;if(k.isOdd()){var mod=k.andln(ws-1);if(mod>(ws>>1)-1)z=(ws>>1)-mod;else z=mod;k.isubn(z);}else{z=0;}naf.push(z);// Optimization, shift by word if possible
var shift=k.cmpn(0)!==0&&k.andln(ws-1)===0?w+1:1;for(var i=1;i<shift;i++){naf.push(0);}k.iushrn(shift);}return naf;}utils.getNAF=getNAF;// Represent k1, k2 in a Joint Sparse Form
function getJSF(k1,k2){var jsf=[[],[]];k1=k1.clone();k2=k2.clone();var d1=0;var d2=0;while(k1.cmpn(-d1)>0||k2.cmpn(-d2)>0){// First phase
var m14=k1.andln(3)+d1&3;var m24=k2.andln(3)+d2&3;if(m14===3)m14=-1;if(m24===3)m24=-1;var u1;if((m14&1)===0){u1=0;}else{var m8=k1.andln(7)+d1&7;if((m8===3||m8===5)&&m24===2)u1=-m14;else u1=m14;}jsf[0].push(u1);var u2;if((m24&1)===0){u2=0;}else{var m8=k2.andln(7)+d2&7;if((m8===3||m8===5)&&m14===2)u2=-m24;else u2=m24;}jsf[1].push(u2);// Second phase
if(2*d1===u1+1)d1=1-d1;if(2*d2===u2+1)d2=1-d2;k1.iushrn(1);k2.iushrn(1);}return jsf;}utils.getJSF=getJSF;function cachedProperty(obj,name,computer){var key='_'+name;obj.prototype[name]=function cachedProperty(){return this[key]!==undefined?this[key]:this[key]=computer.call(this);};}utils.cachedProperty=cachedProperty;function parseBytes(bytes){return typeof bytes==='string'?utils.toArray(bytes,'hex'):bytes;}utils.parseBytes=parseBytes;function intFromLE(bytes){return new BN(bytes,'hex','le');}utils.intFromLE=intFromLE;/***/},/* 181 *//***/function(module,exports,__webpack_require__){"use strict";var BN=__webpack_require__(2);var elliptic=__webpack_require__(5);var utils=elliptic.utils;var getNAF=utils.getNAF;var getJSF=utils.getJSF;var assert=utils.assert;function BaseCurve(type,conf){this.type=type;this.p=new BN(conf.p,16);// Use Montgomery, when there is no fast reduction for the prime
this.red=conf.prime?BN.red(conf.prime):BN.mont(this.p);// Useful for many curves
this.zero=new BN(0).toRed(this.red);this.one=new BN(1).toRed(this.red);this.two=new BN(2).toRed(this.red);// Curve configuration, optional
this.n=conf.n&&new BN(conf.n,16);this.g=conf.g&&this.pointFromJSON(conf.g,conf.gRed);// Temporary arrays
this._wnafT1=new Array(4);this._wnafT2=new Array(4);this._wnafT3=new Array(4);this._wnafT4=new Array(4);// Generalized Greg Maxwell's trick
var adjustCount=this.n&&this.p.div(this.n);if(!adjustCount||adjustCount.cmpn(100)>0){this.redN=null;}else{this._maxwellTrick=true;this.redN=this.n.toRed(this.red);}}module.exports=BaseCurve;BaseCurve.prototype.point=function point(){throw new Error('Not implemented');};BaseCurve.prototype.validate=function validate(){throw new Error('Not implemented');};BaseCurve.prototype._fixedNafMul=function _fixedNafMul(p,k){assert(p.precomputed);var doubles=p._getDoubles();var naf=getNAF(k,1);var I=(1<<doubles.step+1)-(doubles.step%2===0?2:1);I/=3;// Translate into more windowed form
var repr=[];for(var j=0;j<naf.length;j+=doubles.step){var nafW=0;for(var k=j+doubles.step-1;k>=j;k--){nafW=(nafW<<1)+naf[k];}repr.push(nafW);}var a=this.jpoint(null,null,null);var b=this.jpoint(null,null,null);for(var i=I;i>0;i--){for(var j=0;j<repr.length;j++){var nafW=repr[j];if(nafW===i)b=b.mixedAdd(doubles.points[j]);else if(nafW===-i)b=b.mixedAdd(doubles.points[j].neg());}a=a.add(b);}return a.toP();};BaseCurve.prototype._wnafMul=function _wnafMul(p,k){var w=4;// Precompute window
var nafPoints=p._getNAFPoints(w);w=nafPoints.wnd;var wnd=nafPoints.points;// Get NAF form
var naf=getNAF(k,w);// Add `this`*(N+1) for every w-NAF index
var acc=this.jpoint(null,null,null);for(var i=naf.length-1;i>=0;i--){// Count zeroes
for(var k=0;i>=0&&naf[i]===0;i--){k++;}if(i>=0)k++;acc=acc.dblp(k);if(i<0)break;var z=naf[i];assert(z!==0);if(p.type==='affine'){// J +- P
if(z>0)acc=acc.mixedAdd(wnd[z-1>>1]);else acc=acc.mixedAdd(wnd[-z-1>>1].neg());}else{// J +- J
if(z>0)acc=acc.add(wnd[z-1>>1]);else acc=acc.add(wnd[-z-1>>1].neg());}}return p.type==='affine'?acc.toP():acc;};BaseCurve.prototype._wnafMulAdd=function _wnafMulAdd(defW,points,coeffs,len,jacobianResult){var wndWidth=this._wnafT1;var wnd=this._wnafT2;var naf=this._wnafT3;// Fill all arrays
var max=0;for(var i=0;i<len;i++){var p=points[i];var nafPoints=p._getNAFPoints(defW);wndWidth[i]=nafPoints.wnd;wnd[i]=nafPoints.points;}// Comb small window NAFs
for(var i=len-1;i>=1;i-=2){var a=i-1;var b=i;if(wndWidth[a]!==1||wndWidth[b]!==1){naf[a]=getNAF(coeffs[a],wndWidth[a]);naf[b]=getNAF(coeffs[b],wndWidth[b]);max=Math.max(naf[a].length,max);max=Math.max(naf[b].length,max);continue;}var comb=[points[a],/* 1 */null,/* 3 */null,/* 5 */points[b]/* 7 */];// Try to avoid Projective points, if possible
if(points[a].y.cmp(points[b].y)===0){comb[1]=points[a].add(points[b]);comb[2]=points[a].toJ().mixedAdd(points[b].neg());}else if(points[a].y.cmp(points[b].y.redNeg())===0){comb[1]=points[a].toJ().mixedAdd(points[b]);comb[2]=points[a].add(points[b].neg());}else{comb[1]=points[a].toJ().mixedAdd(points[b]);comb[2]=points[a].toJ().mixedAdd(points[b].neg());}var index=[-3,/* -1 -1 */-1,/* -1 0 */-5,/* -1 1 */-7,/* 0 -1 */0,/* 0 0 */7,/* 0 1 */5,/* 1 -1 */1,/* 1 0 */3/* 1 1 */];var jsf=getJSF(coeffs[a],coeffs[b]);max=Math.max(jsf[0].length,max);naf[a]=new Array(max);naf[b]=new Array(max);for(var j=0;j<max;j++){var ja=jsf[0][j]|0;var jb=jsf[1][j]|0;naf[a][j]=index[(ja+1)*3+(jb+1)];naf[b][j]=0;wnd[a]=comb;}}var acc=this.jpoint(null,null,null);var tmp=this._wnafT4;for(var i=max;i>=0;i--){var k=0;while(i>=0){var zero=true;for(var j=0;j<len;j++){tmp[j]=naf[j][i]|0;if(tmp[j]!==0)zero=false;}if(!zero)break;k++;i--;}if(i>=0)k++;acc=acc.dblp(k);if(i<0)break;for(var j=0;j<len;j++){var z=tmp[j];var p;if(z===0)continue;else if(z>0)p=wnd[j][z-1>>1];else if(z<0)p=wnd[j][-z-1>>1].neg();if(p.type==='affine')acc=acc.mixedAdd(p);else acc=acc.add(p);}}// Zeroify references
for(var i=0;i<len;i++){wnd[i]=null;}if(jacobianResult)return acc;else return acc.toP();};function BasePoint(curve,type){this.curve=curve;this.type=type;this.precomputed=null;}BaseCurve.BasePoint=BasePoint;BasePoint.prototype.eq=function eq()/*other*/{throw new Error('Not implemented');};BasePoint.prototype.validate=function validate(){return this.curve.validate(this);};BaseCurve.prototype.decodePoint=function decodePoint(bytes,enc){bytes=utils.toArray(bytes,enc);var len=this.p.byteLength();// uncompressed, hybrid-odd, hybrid-even
if((bytes[0]===0x04||bytes[0]===0x06||bytes[0]===0x07)&&bytes.length-1===2*len){if(bytes[0]===0x06)assert(bytes[bytes.length-1]%2===0);else if(bytes[0]===0x07)assert(bytes[bytes.length-1]%2===1);var res=this.point(bytes.slice(1,1+len),bytes.slice(1+len,1+2*len));return res;}else if((bytes[0]===0x02||bytes[0]===0x03)&&bytes.length-1===len){return this.pointFromX(bytes.slice(1,1+len),bytes[0]===0x03);}throw new Error('Unknown point format');};BasePoint.prototype.encodeCompressed=function encodeCompressed(enc){return this.encode(enc,true);};BasePoint.prototype._encode=function _encode(compact){var len=this.curve.p.byteLength();var x=this.getX().toArray('be',len);if(compact)return[this.getY().isEven()?0x02:0x03].concat(x);return[0x04].concat(x,this.getY().toArray('be',len));};BasePoint.prototype.encode=function encode(enc,compact){return utils.encode(this._encode(compact),enc);};BasePoint.prototype.precompute=function precompute(power){if(this.precomputed)return this;var precomputed={doubles:null,naf:null,beta:null};precomputed.naf=this._getNAFPoints(8);precomputed.doubles=this._getDoubles(4,power);precomputed.beta=this._getBeta();this.precomputed=precomputed;return this;};BasePoint.prototype._hasDoubles=function _hasDoubles(k){if(!this.precomputed)return false;var doubles=this.precomputed.doubles;if(!doubles)return false;return doubles.points.length>=Math.ceil((k.bitLength()+1)/doubles.step);};BasePoint.prototype._getDoubles=function _getDoubles(step,power){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;var doubles=[this];var acc=this;for(var i=0;i<power;i+=step){for(var j=0;j<step;j++){acc=acc.dbl();}doubles.push(acc);}return{step:step,points:doubles};};BasePoint.prototype._getNAFPoints=function _getNAFPoints(wnd){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;var res=[this];var max=(1<<wnd)-1;var dbl=max===1?null:this.dbl();for(var i=1;i<max;i++){res[i]=res[i-1].add(dbl);}return{wnd:wnd,points:res};};BasePoint.prototype._getBeta=function _getBeta(){return null;};BasePoint.prototype.dblp=function dblp(k){var r=this;for(var i=0;i<k;i++){r=r.dbl();}return r;};/***/},/* 182 *//***/function(module,exports,__webpack_require__){"use strict";var curve=__webpack_require__(37);var elliptic=__webpack_require__(5);var BN=__webpack_require__(2);var inherits=__webpack_require__(1);var Base=curve.base;var assert=elliptic.utils.assert;function ShortCurve(conf){Base.call(this,'short',conf);this.a=new BN(conf.a,16).toRed(this.red);this.b=new BN(conf.b,16).toRed(this.red);this.tinv=this.two.redInvm();this.zeroA=this.a.fromRed().cmpn(0)===0;this.threeA=this.a.fromRed().sub(this.p).cmpn(-3)===0;// If the curve is endomorphic, precalculate beta and lambda
this.endo=this._getEndomorphism(conf);this._endoWnafT1=new Array(4);this._endoWnafT2=new Array(4);}inherits(ShortCurve,Base);module.exports=ShortCurve;ShortCurve.prototype._getEndomorphism=function _getEndomorphism(conf){// No efficient endomorphism
if(!this.zeroA||!this.g||!this.n||this.p.modn(3)!==1)return;// Compute beta and lambda, that lambda * P = (beta * Px; Py)
var beta;var lambda;if(conf.beta){beta=new BN(conf.beta,16).toRed(this.red);}else{var betas=this._getEndoRoots(this.p);// Choose the smallest beta
beta=betas[0].cmp(betas[1])<0?betas[0]:betas[1];beta=beta.toRed(this.red);}if(conf.lambda){lambda=new BN(conf.lambda,16);}else{// Choose the lambda that is matching selected beta
var lambdas=this._getEndoRoots(this.n);if(this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta))===0){lambda=lambdas[0];}else{lambda=lambdas[1];assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta))===0);}}// Get basis vectors, used for balanced length-two representation
var basis;if(conf.basis){basis=conf.basis.map(function(vec){return{a:new BN(vec.a,16),b:new BN(vec.b,16)};});}else{basis=this._getEndoBasis(lambda);}return{beta:beta,lambda:lambda,basis:basis};};ShortCurve.prototype._getEndoRoots=function _getEndoRoots(num){// Find roots of for x^2 + x + 1 in F
// Root = (-1 +- Sqrt(-3)) / 2
//
var red=num===this.p?this.red:BN.mont(num);var tinv=new BN(2).toRed(red).redInvm();var ntinv=tinv.redNeg();var s=new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);var l1=ntinv.redAdd(s).fromRed();var l2=ntinv.redSub(s).fromRed();return[l1,l2];};ShortCurve.prototype._getEndoBasis=function _getEndoBasis(lambda){// aprxSqrt >= sqrt(this.n)
var aprxSqrt=this.n.ushrn(Math.floor(this.n.bitLength()/2));// 3.74
// Run EGCD, until r(L + 1) < aprxSqrt
var u=lambda;var v=this.n.clone();var x1=new BN(1);var y1=new BN(0);var x2=new BN(0);var y2=new BN(1);// NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
var a0;var b0;// First vector
var a1;var b1;// Second vector
var a2;var b2;var prevR;var i=0;var r;var x;while(u.cmpn(0)!==0){var q=v.div(u);r=v.sub(q.mul(u));x=x2.sub(q.mul(x1));var y=y2.sub(q.mul(y1));if(!a1&&r.cmp(aprxSqrt)<0){a0=prevR.neg();b0=x1;a1=r.neg();b1=x;}else if(a1&&++i===2){break;}prevR=r;v=u;u=r;x2=x1;x1=x;y2=y1;y1=y;}a2=r.neg();b2=x;var len1=a1.sqr().add(b1.sqr());var len2=a2.sqr().add(b2.sqr());if(len2.cmp(len1)>=0){a2=a0;b2=b0;}// Normalize signs
if(a1.negative){a1=a1.neg();b1=b1.neg();}if(a2.negative){a2=a2.neg();b2=b2.neg();}return[{a:a1,b:b1},{a:a2,b:b2}];};ShortCurve.prototype._endoSplit=function _endoSplit(k){var basis=this.endo.basis;var v1=basis[0];var v2=basis[1];var c1=v2.b.mul(k).divRound(this.n);var c2=v1.b.neg().mul(k).divRound(this.n);var p1=c1.mul(v1.a);var p2=c2.mul(v2.a);var q1=c1.mul(v1.b);var q2=c2.mul(v2.b);// Calculate answer
var k1=k.sub(p1).sub(p2);var k2=q1.add(q2).neg();return{k1:k1,k2:k2};};ShortCurve.prototype.pointFromX=function pointFromX(x,odd){x=new BN(x,16);if(!x.red)x=x.toRed(this.red);var y2=x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);var y=y2.redSqrt();if(y.redSqr().redSub(y2).cmp(this.zero)!==0)throw new Error('invalid point');// XXX Is there any way to tell if the number is odd without converting it
// to non-red form?
var isOdd=y.fromRed().isOdd();if(odd&&!isOdd||!odd&&isOdd)y=y.redNeg();return this.point(x,y);};ShortCurve.prototype.validate=function validate(point){if(point.inf)return true;var x=point.x;var y=point.y;var ax=this.a.redMul(x);var rhs=x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);return y.redSqr().redISub(rhs).cmpn(0)===0;};ShortCurve.prototype._endoWnafMulAdd=function _endoWnafMulAdd(points,coeffs,jacobianResult){var npoints=this._endoWnafT1;var ncoeffs=this._endoWnafT2;for(var i=0;i<points.length;i++){var split=this._endoSplit(coeffs[i]);var p=points[i];var beta=p._getBeta();if(split.k1.negative){split.k1.ineg();p=p.neg(true);}if(split.k2.negative){split.k2.ineg();beta=beta.neg(true);}npoints[i*2]=p;npoints[i*2+1]=beta;ncoeffs[i*2]=split.k1;ncoeffs[i*2+1]=split.k2;}var res=this._wnafMulAdd(1,npoints,ncoeffs,i*2,jacobianResult);// Clean-up references to points and coefficients
for(var j=0;j<i*2;j++){npoints[j]=null;ncoeffs[j]=null;}return res;};function Point(curve,x,y,isRed){Base.BasePoint.call(this,curve,'affine');if(x===null&&y===null){this.x=null;this.y=null;this.inf=true;}else{this.x=new BN(x,16);this.y=new BN(y,16);// Force redgomery representation when loading from JSON
if(isRed){this.x.forceRed(this.curve.red);this.y.forceRed(this.curve.red);}if(!this.x.red)this.x=this.x.toRed(this.curve.red);if(!this.y.red)this.y=this.y.toRed(this.curve.red);this.inf=false;}}inherits(Point,Base.BasePoint);ShortCurve.prototype.point=function point(x,y,isRed){return new Point(this,x,y,isRed);};ShortCurve.prototype.pointFromJSON=function pointFromJSON(obj,red){return Point.fromJSON(this,obj,red);};Point.prototype._getBeta=function _getBeta(){if(!this.curve.endo)return;var pre=this.precomputed;if(pre&&pre.beta)return pre.beta;var beta=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(pre){var curve=this.curve;var endoMul=function endoMul(p){return curve.point(p.x.redMul(curve.endo.beta),p.y);};pre.beta=beta;beta.precomputed={beta:null,naf:pre.naf&&{wnd:pre.naf.wnd,points:pre.naf.points.map(endoMul)},doubles:pre.doubles&&{step:pre.doubles.step,points:pre.doubles.points.map(endoMul)}};}return beta;};Point.prototype.toJSON=function toJSON(){if(!this.precomputed)return[this.x,this.y];return[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}];};Point.fromJSON=function fromJSON(curve,obj,red){if(typeof obj==='string')obj=JSON.parse(obj);var res=curve.point(obj[0],obj[1],red);if(!obj[2])return res;function obj2point(obj){return curve.point(obj[0],obj[1],red);}var pre=obj[2];res.precomputed={beta:null,doubles:pre.doubles&&{step:pre.doubles.step,points:[res].concat(pre.doubles.points.map(obj2point))},naf:pre.naf&&{wnd:pre.naf.wnd,points:[res].concat(pre.naf.points.map(obj2point))}};return res;};Point.prototype.inspect=function inspect(){if(this.isInfinity())return'<EC Point Infinity>';return'<EC Point x: '+this.x.fromRed().toString(16,2)+' y: '+this.y.fromRed().toString(16,2)+'>';};Point.prototype.isInfinity=function isInfinity(){return this.inf;};Point.prototype.add=function add(p){// O + P = P
if(this.inf)return p;// P + O = P
if(p.inf)return this;// P + P = 2P
if(this.eq(p))return this.dbl();// P + (-P) = O
if(this.neg().eq(p))return this.curve.point(null,null);// P + Q = O
if(this.x.cmp(p.x)===0)return this.curve.point(null,null);var c=this.y.redSub(p.y);if(c.cmpn(0)!==0)c=c.redMul(this.x.redSub(p.x).redInvm());var nx=c.redSqr().redISub(this.x).redISub(p.x);var ny=c.redMul(this.x.redSub(nx)).redISub(this.y);return this.curve.point(nx,ny);};Point.prototype.dbl=function dbl(){if(this.inf)return this;// 2P = O
var ys1=this.y.redAdd(this.y);if(ys1.cmpn(0)===0)return this.curve.point(null,null);var a=this.curve.a;var x2=this.x.redSqr();var dyinv=ys1.redInvm();var c=x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);var nx=c.redSqr().redISub(this.x.redAdd(this.x));var ny=c.redMul(this.x.redSub(nx)).redISub(this.y);return this.curve.point(nx,ny);};Point.prototype.getX=function getX(){return this.x.fromRed();};Point.prototype.getY=function getY(){return this.y.fromRed();};Point.prototype.mul=function mul(k){k=new BN(k,16);if(this._hasDoubles(k))return this.curve._fixedNafMul(this,k);else if(this.curve.endo)return this.curve._endoWnafMulAdd([this],[k]);else return this.curve._wnafMul(this,k);};Point.prototype.mulAdd=function mulAdd(k1,p2,k2){var points=[this,p2];var coeffs=[k1,k2];if(this.curve.endo)return this.curve._endoWnafMulAdd(points,coeffs);else return this.curve._wnafMulAdd(1,points,coeffs,2);};Point.prototype.jmulAdd=function jmulAdd(k1,p2,k2){var points=[this,p2];var coeffs=[k1,k2];if(this.curve.endo)return this.curve._endoWnafMulAdd(points,coeffs,true);else return this.curve._wnafMulAdd(1,points,coeffs,2,true);};Point.prototype.eq=function eq(p){return this===p||this.inf===p.inf&&(this.inf||this.x.cmp(p.x)===0&&this.y.cmp(p.y)===0);};Point.prototype.neg=function neg(_precompute){if(this.inf)return this;var res=this.curve.point(this.x,this.y.redNeg());if(_precompute&&this.precomputed){var pre=this.precomputed;var negate=function negate(p){return p.neg();};res.precomputed={naf:pre.naf&&{wnd:pre.naf.wnd,points:pre.naf.points.map(negate)},doubles:pre.doubles&&{step:pre.doubles.step,points:pre.doubles.points.map(negate)}};}return res;};Point.prototype.toJ=function toJ(){if(this.inf)return this.curve.jpoint(null,null,null);var res=this.curve.jpoint(this.x,this.y,this.curve.one);return res;};function JPoint(curve,x,y,z){Base.BasePoint.call(this,curve,'jacobian');if(x===null&&y===null&&z===null){this.x=this.curve.one;this.y=this.curve.one;this.z=new BN(0);}else{this.x=new BN(x,16);this.y=new BN(y,16);this.z=new BN(z,16);}if(!this.x.red)this.x=this.x.toRed(this.curve.red);if(!this.y.red)this.y=this.y.toRed(this.curve.red);if(!this.z.red)this.z=this.z.toRed(this.curve.red);this.zOne=this.z===this.curve.one;}inherits(JPoint,Base.BasePoint);ShortCurve.prototype.jpoint=function jpoint(x,y,z){return new JPoint(this,x,y,z);};JPoint.prototype.toP=function toP(){if(this.isInfinity())return this.curve.point(null,null);var zinv=this.z.redInvm();var zinv2=zinv.redSqr();var ax=this.x.redMul(zinv2);var ay=this.y.redMul(zinv2).redMul(zinv);return this.curve.point(ax,ay);};JPoint.prototype.neg=function neg(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z);};JPoint.prototype.add=function add(p){// O + P = P
if(this.isInfinity())return p;// P + O = P
if(p.isInfinity())return this;// 12M + 4S + 7A
var pz2=p.z.redSqr();var z2=this.z.redSqr();var u1=this.x.redMul(pz2);var u2=p.x.redMul(z2);var s1=this.y.redMul(pz2.redMul(p.z));var s2=p.y.redMul(z2.redMul(this.z));var h=u1.redSub(u2);var r=s1.redSub(s2);if(h.cmpn(0)===0){if(r.cmpn(0)!==0)return this.curve.jpoint(null,null,null);else return this.dbl();}var h2=h.redSqr();var h3=h2.redMul(h);var v=u1.redMul(h2);var nx=r.redSqr().redIAdd(h3).redISub(v).redISub(v);var ny=r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));var nz=this.z.redMul(p.z).redMul(h);return this.curve.jpoint(nx,ny,nz);};JPoint.prototype.mixedAdd=function mixedAdd(p){// O + P = P
if(this.isInfinity())return p.toJ();// P + O = P
if(p.isInfinity())return this;// 8M + 3S + 7A
var z2=this.z.redSqr();var u1=this.x;var u2=p.x.redMul(z2);var s1=this.y;var s2=p.y.redMul(z2).redMul(this.z);var h=u1.redSub(u2);var r=s1.redSub(s2);if(h.cmpn(0)===0){if(r.cmpn(0)!==0)return this.curve.jpoint(null,null,null);else return this.dbl();}var h2=h.redSqr();var h3=h2.redMul(h);var v=u1.redMul(h2);var nx=r.redSqr().redIAdd(h3).redISub(v).redISub(v);var ny=r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));var nz=this.z.redMul(h);return this.curve.jpoint(nx,ny,nz);};JPoint.prototype.dblp=function dblp(pow){if(pow===0)return this;if(this.isInfinity())return this;if(!pow)return this.dbl();if(this.curve.zeroA||this.curve.threeA){var r=this;for(var i=0;i<pow;i++){r=r.dbl();}return r;}// 1M + 2S + 1A + N * (4S + 5M + 8A)
// N = 1 => 6M + 6S + 9A
var a=this.curve.a;var tinv=this.curve.tinv;var jx=this.x;var jy=this.y;var jz=this.z;var jz4=jz.redSqr().redSqr();// Reuse results
var jyd=jy.redAdd(jy);for(var i=0;i<pow;i++){var jx2=jx.redSqr();var jyd2=jyd.redSqr();var jyd4=jyd2.redSqr();var c=jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));var t1=jx.redMul(jyd2);var nx=c.redSqr().redISub(t1.redAdd(t1));var t2=t1.redISub(nx);var dny=c.redMul(t2);dny=dny.redIAdd(dny).redISub(jyd4);var nz=jyd.redMul(jz);if(i+1<pow)jz4=jz4.redMul(jyd4);jx=nx;jz=nz;jyd=dny;}return this.curve.jpoint(jx,jyd.redMul(tinv),jz);};JPoint.prototype.dbl=function dbl(){if(this.isInfinity())return this;if(this.curve.zeroA)return this._zeroDbl();else if(this.curve.threeA)return this._threeDbl();else return this._dbl();};JPoint.prototype._zeroDbl=function _zeroDbl(){var nx;var ny;var nz;// Z = 1
if(this.zOne){// hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
//     #doubling-mdbl-2007-bl
// 1M + 5S + 14A
// XX = X1^2
var xx=this.x.redSqr();// YY = Y1^2
var yy=this.y.redSqr();// YYYY = YY^2
var yyyy=yy.redSqr();// S = 2 * ((X1 + YY)^2 - XX - YYYY)
var s=this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);s=s.redIAdd(s);// M = 3 * XX + a; a = 0
var m=xx.redAdd(xx).redIAdd(xx);// T = M ^ 2 - 2*S
var t=m.redSqr().redISub(s).redISub(s);// 8 * YYYY
var yyyy8=yyyy.redIAdd(yyyy);yyyy8=yyyy8.redIAdd(yyyy8);yyyy8=yyyy8.redIAdd(yyyy8);// X3 = T
nx=t;// Y3 = M * (S - T) - 8 * YYYY
ny=m.redMul(s.redISub(t)).redISub(yyyy8);// Z3 = 2*Y1
nz=this.y.redAdd(this.y);}else{// hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
//     #doubling-dbl-2009-l
// 2M + 5S + 13A
// A = X1^2
var a=this.x.redSqr();// B = Y1^2
var b=this.y.redSqr();// C = B^2
var c=b.redSqr();// D = 2 * ((X1 + B)^2 - A - C)
var d=this.x.redAdd(b).redSqr().redISub(a).redISub(c);d=d.redIAdd(d);// E = 3 * A
var e=a.redAdd(a).redIAdd(a);// F = E^2
var f=e.redSqr();// 8 * C
var c8=c.redIAdd(c);c8=c8.redIAdd(c8);c8=c8.redIAdd(c8);// X3 = F - 2 * D
nx=f.redISub(d).redISub(d);// Y3 = E * (D - X3) - 8 * C
ny=e.redMul(d.redISub(nx)).redISub(c8);// Z3 = 2 * Y1 * Z1
nz=this.y.redMul(this.z);nz=nz.redIAdd(nz);}return this.curve.jpoint(nx,ny,nz);};JPoint.prototype._threeDbl=function _threeDbl(){var nx;var ny;var nz;// Z = 1
if(this.zOne){// hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
//     #doubling-mdbl-2007-bl
// 1M + 5S + 15A
// XX = X1^2
var xx=this.x.redSqr();// YY = Y1^2
var yy=this.y.redSqr();// YYYY = YY^2
var yyyy=yy.redSqr();// S = 2 * ((X1 + YY)^2 - XX - YYYY)
var s=this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);s=s.redIAdd(s);// M = 3 * XX + a
var m=xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);// T = M^2 - 2 * S
var t=m.redSqr().redISub(s).redISub(s);// X3 = T
nx=t;// Y3 = M * (S - T) - 8 * YYYY
var yyyy8=yyyy.redIAdd(yyyy);yyyy8=yyyy8.redIAdd(yyyy8);yyyy8=yyyy8.redIAdd(yyyy8);ny=m.redMul(s.redISub(t)).redISub(yyyy8);// Z3 = 2 * Y1
nz=this.y.redAdd(this.y);}else{// hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
// 3M + 5S
// delta = Z1^2
var delta=this.z.redSqr();// gamma = Y1^2
var gamma=this.y.redSqr();// beta = X1 * gamma
var beta=this.x.redMul(gamma);// alpha = 3 * (X1 - delta) * (X1 + delta)
var alpha=this.x.redSub(delta).redMul(this.x.redAdd(delta));alpha=alpha.redAdd(alpha).redIAdd(alpha);// X3 = alpha^2 - 8 * beta
var beta4=beta.redIAdd(beta);beta4=beta4.redIAdd(beta4);var beta8=beta4.redAdd(beta4);nx=alpha.redSqr().redISub(beta8);// Z3 = (Y1 + Z1)^2 - gamma - delta
nz=this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);// Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
var ggamma8=gamma.redSqr();ggamma8=ggamma8.redIAdd(ggamma8);ggamma8=ggamma8.redIAdd(ggamma8);ggamma8=ggamma8.redIAdd(ggamma8);ny=alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);}return this.curve.jpoint(nx,ny,nz);};JPoint.prototype._dbl=function _dbl(){var a=this.curve.a;// 4M + 6S + 10A
var jx=this.x;var jy=this.y;var jz=this.z;var jz4=jz.redSqr().redSqr();var jx2=jx.redSqr();var jy2=jy.redSqr();var c=jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));var jxd4=jx.redAdd(jx);jxd4=jxd4.redIAdd(jxd4);var t1=jxd4.redMul(jy2);var nx=c.redSqr().redISub(t1.redAdd(t1));var t2=t1.redISub(nx);var jyd8=jy2.redSqr();jyd8=jyd8.redIAdd(jyd8);jyd8=jyd8.redIAdd(jyd8);jyd8=jyd8.redIAdd(jyd8);var ny=c.redMul(t2).redISub(jyd8);var nz=jy.redAdd(jy).redMul(jz);return this.curve.jpoint(nx,ny,nz);};JPoint.prototype.trpl=function trpl(){if(!this.curve.zeroA)return this.dbl().add(this);// hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
// 5M + 10S + ...
// XX = X1^2
var xx=this.x.redSqr();// YY = Y1^2
var yy=this.y.redSqr();// ZZ = Z1^2
var zz=this.z.redSqr();// YYYY = YY^2
var yyyy=yy.redSqr();// M = 3 * XX + a * ZZ2; a = 0
var m=xx.redAdd(xx).redIAdd(xx);// MM = M^2
var mm=m.redSqr();// E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
var e=this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);e=e.redIAdd(e);e=e.redAdd(e).redIAdd(e);e=e.redISub(mm);// EE = E^2
var ee=e.redSqr();// T = 16*YYYY
var t=yyyy.redIAdd(yyyy);t=t.redIAdd(t);t=t.redIAdd(t);t=t.redIAdd(t);// U = (M + E)^2 - MM - EE - T
var u=m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);// X3 = 4 * (X1 * EE - 4 * YY * U)
var yyu4=yy.redMul(u);yyu4=yyu4.redIAdd(yyu4);yyu4=yyu4.redIAdd(yyu4);var nx=this.x.redMul(ee).redISub(yyu4);nx=nx.redIAdd(nx);nx=nx.redIAdd(nx);// Y3 = 8 * Y1 * (U * (T - U) - E * EE)
var ny=this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));ny=ny.redIAdd(ny);ny=ny.redIAdd(ny);ny=ny.redIAdd(ny);// Z3 = (Z1 + E)^2 - ZZ - EE
var nz=this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);return this.curve.jpoint(nx,ny,nz);};JPoint.prototype.mul=function mul(k,kbase){k=new BN(k,kbase);return this.curve._wnafMul(this,k);};JPoint.prototype.eq=function eq(p){if(p.type==='affine')return this.eq(p.toJ());if(this===p)return true;// x1 * z2^2 == x2 * z1^2
var z2=this.z.redSqr();var pz2=p.z.redSqr();if(this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0)!==0)return false;// y1 * z2^3 == y2 * z1^3
var z3=z2.redMul(this.z);var pz3=pz2.redMul(p.z);return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0)===0;};JPoint.prototype.eqXToP=function eqXToP(x){var zs=this.z.redSqr();var rx=x.toRed(this.curve.red).redMul(zs);if(this.x.cmp(rx)===0)return true;var xc=x.clone();var t=this.curve.redN.redMul(zs);for(;;){xc.iadd(this.curve.n);if(xc.cmp(this.curve.p)>=0)return false;rx.redIAdd(t);if(this.x.cmp(rx)===0)return true;}return false;};JPoint.prototype.inspect=function inspect(){if(this.isInfinity())return'<EC JPoint Infinity>';return'<EC JPoint x: '+this.x.toString(16,2)+' y: '+this.y.toString(16,2)+' z: '+this.z.toString(16,2)+'>';};JPoint.prototype.isInfinity=function isInfinity(){// XXX This code assumes that zero is always zero in red
return this.z.cmpn(0)===0;};/***/},/* 183 *//***/function(module,exports,__webpack_require__){"use strict";var curve=__webpack_require__(37);var BN=__webpack_require__(2);var inherits=__webpack_require__(1);var Base=curve.base;var elliptic=__webpack_require__(5);var utils=elliptic.utils;function MontCurve(conf){Base.call(this,'mont',conf);this.a=new BN(conf.a,16).toRed(this.red);this.b=new BN(conf.b,16).toRed(this.red);this.i4=new BN(4).toRed(this.red).redInvm();this.two=new BN(2).toRed(this.red);this.a24=this.i4.redMul(this.a.redAdd(this.two));}inherits(MontCurve,Base);module.exports=MontCurve;MontCurve.prototype.validate=function validate(point){var x=point.normalize().x;var x2=x.redSqr();var rhs=x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);var y=rhs.redSqrt();return y.redSqr().cmp(rhs)===0;};function Point(curve,x,z){Base.BasePoint.call(this,curve,'projective');if(x===null&&z===null){this.x=this.curve.one;this.z=this.curve.zero;}else{this.x=new BN(x,16);this.z=new BN(z,16);if(!this.x.red)this.x=this.x.toRed(this.curve.red);if(!this.z.red)this.z=this.z.toRed(this.curve.red);}}inherits(Point,Base.BasePoint);MontCurve.prototype.decodePoint=function decodePoint(bytes,enc){return this.point(utils.toArray(bytes,enc),1);};MontCurve.prototype.point=function point(x,z){return new Point(this,x,z);};MontCurve.prototype.pointFromJSON=function pointFromJSON(obj){return Point.fromJSON(this,obj);};Point.prototype.precompute=function precompute(){// No-op
};Point.prototype._encode=function _encode(){return this.getX().toArray('be',this.curve.p.byteLength());};Point.fromJSON=function fromJSON(curve,obj){return new Point(curve,obj[0],obj[1]||curve.one);};Point.prototype.inspect=function inspect(){if(this.isInfinity())return'<EC Point Infinity>';return'<EC Point x: '+this.x.fromRed().toString(16,2)+' z: '+this.z.fromRed().toString(16,2)+'>';};Point.prototype.isInfinity=function isInfinity(){// XXX This code assumes that zero is always zero in red
return this.z.cmpn(0)===0;};Point.prototype.dbl=function dbl(){// http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
// 2M + 2S + 4A
// A = X1 + Z1
var a=this.x.redAdd(this.z);// AA = A^2
var aa=a.redSqr();// B = X1 - Z1
var b=this.x.redSub(this.z);// BB = B^2
var bb=b.redSqr();// C = AA - BB
var c=aa.redSub(bb);// X3 = AA * BB
var nx=aa.redMul(bb);// Z3 = C * (BB + A24 * C)
var nz=c.redMul(bb.redAdd(this.curve.a24.redMul(c)));return this.curve.point(nx,nz);};Point.prototype.add=function add(){throw new Error('Not supported on Montgomery curve');};Point.prototype.diffAdd=function diffAdd(p,diff){// http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
// 4M + 2S + 6A
// A = X2 + Z2
var a=this.x.redAdd(this.z);// B = X2 - Z2
var b=this.x.redSub(this.z);// C = X3 + Z3
var c=p.x.redAdd(p.z);// D = X3 - Z3
var d=p.x.redSub(p.z);// DA = D * A
var da=d.redMul(a);// CB = C * B
var cb=c.redMul(b);// X5 = Z1 * (DA + CB)^2
var nx=diff.z.redMul(da.redAdd(cb).redSqr());// Z5 = X1 * (DA - CB)^2
var nz=diff.x.redMul(da.redISub(cb).redSqr());return this.curve.point(nx,nz);};Point.prototype.mul=function mul(k){var t=k.clone();var a=this;// (N / 2) * Q + Q
var b=this.curve.point(null,null);// (N / 2) * Q
var c=this;// Q
for(var bits=[];t.cmpn(0)!==0;t.iushrn(1)){bits.push(t.andln(1));}for(var i=bits.length-1;i>=0;i--){if(bits[i]===0){// N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
a=a.diffAdd(b,c);// N * Q = 2 * ((N / 2) * Q + Q))
b=b.dbl();}else{// N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
b=a.diffAdd(b,c);// N * Q + Q = 2 * ((N / 2) * Q + Q)
a=a.dbl();}}return b;};Point.prototype.mulAdd=function mulAdd(){throw new Error('Not supported on Montgomery curve');};Point.prototype.jumlAdd=function jumlAdd(){throw new Error('Not supported on Montgomery curve');};Point.prototype.eq=function eq(other){return this.getX().cmp(other.getX())===0;};Point.prototype.normalize=function normalize(){this.x=this.x.redMul(this.z.redInvm());this.z=this.curve.one;return this;};Point.prototype.getX=function getX(){// Normalize coordinates
this.normalize();return this.x.fromRed();};/***/},/* 184 *//***/function(module,exports,__webpack_require__){"use strict";var curve=__webpack_require__(37);var elliptic=__webpack_require__(5);var BN=__webpack_require__(2);var inherits=__webpack_require__(1);var Base=curve.base;var assert=elliptic.utils.assert;function EdwardsCurve(conf){// NOTE: Important as we are creating point in Base.call()
this.twisted=(conf.a|0)!==1;this.mOneA=this.twisted&&(conf.a|0)===-1;this.extended=this.mOneA;Base.call(this,'edwards',conf);this.a=new BN(conf.a,16).umod(this.red.m);this.a=this.a.toRed(this.red);this.c=new BN(conf.c,16).toRed(this.red);this.c2=this.c.redSqr();this.d=new BN(conf.d,16).toRed(this.red);this.dd=this.d.redAdd(this.d);assert(!this.twisted||this.c.fromRed().cmpn(1)===0);this.oneC=(conf.c|0)===1;}inherits(EdwardsCurve,Base);module.exports=EdwardsCurve;EdwardsCurve.prototype._mulA=function _mulA(num){if(this.mOneA)return num.redNeg();else return this.a.redMul(num);};EdwardsCurve.prototype._mulC=function _mulC(num){if(this.oneC)return num;else return this.c.redMul(num);};// Just for compatibility with Short curve
EdwardsCurve.prototype.jpoint=function jpoint(x,y,z,t){return this.point(x,y,z,t);};EdwardsCurve.prototype.pointFromX=function pointFromX(x,odd){x=new BN(x,16);if(!x.red)x=x.toRed(this.red);var x2=x.redSqr();var rhs=this.c2.redSub(this.a.redMul(x2));var lhs=this.one.redSub(this.c2.redMul(this.d).redMul(x2));var y2=rhs.redMul(lhs.redInvm());var y=y2.redSqrt();if(y.redSqr().redSub(y2).cmp(this.zero)!==0)throw new Error('invalid point');var isOdd=y.fromRed().isOdd();if(odd&&!isOdd||!odd&&isOdd)y=y.redNeg();return this.point(x,y);};EdwardsCurve.prototype.pointFromY=function pointFromY(y,odd){y=new BN(y,16);if(!y.red)y=y.toRed(this.red);// x^2 = (y^2 - 1) / (d y^2 + 1)
var y2=y.redSqr();var lhs=y2.redSub(this.one);var rhs=y2.redMul(this.d).redAdd(this.one);var x2=lhs.redMul(rhs.redInvm());if(x2.cmp(this.zero)===0){if(odd)throw new Error('invalid point');else return this.point(this.zero,y);}var x=x2.redSqrt();if(x.redSqr().redSub(x2).cmp(this.zero)!==0)throw new Error('invalid point');if(x.isOdd()!==odd)x=x.redNeg();return this.point(x,y);};EdwardsCurve.prototype.validate=function validate(point){if(point.isInfinity())return true;// Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
point.normalize();var x2=point.x.redSqr();var y2=point.y.redSqr();var lhs=x2.redMul(this.a).redAdd(y2);var rhs=this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));return lhs.cmp(rhs)===0;};function Point(curve,x,y,z,t){Base.BasePoint.call(this,curve,'projective');if(x===null&&y===null&&z===null){this.x=this.curve.zero;this.y=this.curve.one;this.z=this.curve.one;this.t=this.curve.zero;this.zOne=true;}else{this.x=new BN(x,16);this.y=new BN(y,16);this.z=z?new BN(z,16):this.curve.one;this.t=t&&new BN(t,16);if(!this.x.red)this.x=this.x.toRed(this.curve.red);if(!this.y.red)this.y=this.y.toRed(this.curve.red);if(!this.z.red)this.z=this.z.toRed(this.curve.red);if(this.t&&!this.t.red)this.t=this.t.toRed(this.curve.red);this.zOne=this.z===this.curve.one;// Use extended coordinates
if(this.curve.extended&&!this.t){this.t=this.x.redMul(this.y);if(!this.zOne)this.t=this.t.redMul(this.z.redInvm());}}}inherits(Point,Base.BasePoint);EdwardsCurve.prototype.pointFromJSON=function pointFromJSON(obj){return Point.fromJSON(this,obj);};EdwardsCurve.prototype.point=function point(x,y,z,t){return new Point(this,x,y,z,t);};Point.fromJSON=function fromJSON(curve,obj){return new Point(curve,obj[0],obj[1],obj[2]);};Point.prototype.inspect=function inspect(){if(this.isInfinity())return'<EC Point Infinity>';return'<EC Point x: '+this.x.fromRed().toString(16,2)+' y: '+this.y.fromRed().toString(16,2)+' z: '+this.z.fromRed().toString(16,2)+'>';};Point.prototype.isInfinity=function isInfinity(){// XXX This code assumes that zero is always zero in red
return this.x.cmpn(0)===0&&this.y.cmp(this.z)===0;};Point.prototype._extDbl=function _extDbl(){// hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
//     #doubling-dbl-2008-hwcd
// 4M + 4S
// A = X1^2
var a=this.x.redSqr();// B = Y1^2
var b=this.y.redSqr();// C = 2 * Z1^2
var c=this.z.redSqr();c=c.redIAdd(c);// D = a * A
var d=this.curve._mulA(a);// E = (X1 + Y1)^2 - A - B
var e=this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);// G = D + B
var g=d.redAdd(b);// F = G - C
var f=g.redSub(c);// H = D - B
var h=d.redSub(b);// X3 = E * F
var nx=e.redMul(f);// Y3 = G * H
var ny=g.redMul(h);// T3 = E * H
var nt=e.redMul(h);// Z3 = F * G
var nz=f.redMul(g);return this.curve.point(nx,ny,nz,nt);};Point.prototype._projDbl=function _projDbl(){// hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
//     #doubling-dbl-2008-bbjlp
//     #doubling-dbl-2007-bl
// and others
// Generally 3M + 4S or 2M + 4S
// B = (X1 + Y1)^2
var b=this.x.redAdd(this.y).redSqr();// C = X1^2
var c=this.x.redSqr();// D = Y1^2
var d=this.y.redSqr();var nx;var ny;var nz;if(this.curve.twisted){// E = a * C
var e=this.curve._mulA(c);// F = E + D
var f=e.redAdd(d);if(this.zOne){// X3 = (B - C - D) * (F - 2)
nx=b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));// Y3 = F * (E - D)
ny=f.redMul(e.redSub(d));// Z3 = F^2 - 2 * F
nz=f.redSqr().redSub(f).redSub(f);}else{// H = Z1^2
var h=this.z.redSqr();// J = F - 2 * H
var j=f.redSub(h).redISub(h);// X3 = (B-C-D)*J
nx=b.redSub(c).redISub(d).redMul(j);// Y3 = F * (E - D)
ny=f.redMul(e.redSub(d));// Z3 = F * J
nz=f.redMul(j);}}else{// E = C + D
var e=c.redAdd(d);// H = (c * Z1)^2
var h=this.curve._mulC(this.c.redMul(this.z)).redSqr();// J = E - 2 * H
var j=e.redSub(h).redSub(h);// X3 = c * (B - E) * J
nx=this.curve._mulC(b.redISub(e)).redMul(j);// Y3 = c * E * (C - D)
ny=this.curve._mulC(e).redMul(c.redISub(d));// Z3 = E * J
nz=e.redMul(j);}return this.curve.point(nx,ny,nz);};Point.prototype.dbl=function dbl(){if(this.isInfinity())return this;// Double in extended coordinates
if(this.curve.extended)return this._extDbl();else return this._projDbl();};Point.prototype._extAdd=function _extAdd(p){// hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
//     #addition-add-2008-hwcd-3
// 8M
// A = (Y1 - X1) * (Y2 - X2)
var a=this.y.redSub(this.x).redMul(p.y.redSub(p.x));// B = (Y1 + X1) * (Y2 + X2)
var b=this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));// C = T1 * k * T2
var c=this.t.redMul(this.curve.dd).redMul(p.t);// D = Z1 * 2 * Z2
var d=this.z.redMul(p.z.redAdd(p.z));// E = B - A
var e=b.redSub(a);// F = D - C
var f=d.redSub(c);// G = D + C
var g=d.redAdd(c);// H = B + A
var h=b.redAdd(a);// X3 = E * F
var nx=e.redMul(f);// Y3 = G * H
var ny=g.redMul(h);// T3 = E * H
var nt=e.redMul(h);// Z3 = F * G
var nz=f.redMul(g);return this.curve.point(nx,ny,nz,nt);};Point.prototype._projAdd=function _projAdd(p){// hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
//     #addition-add-2008-bbjlp
//     #addition-add-2007-bl
// 10M + 1S
// A = Z1 * Z2
var a=this.z.redMul(p.z);// B = A^2
var b=a.redSqr();// C = X1 * X2
var c=this.x.redMul(p.x);// D = Y1 * Y2
var d=this.y.redMul(p.y);// E = d * C * D
var e=this.curve.d.redMul(c).redMul(d);// F = B - E
var f=b.redSub(e);// G = B + E
var g=b.redAdd(e);// X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
var tmp=this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);var nx=a.redMul(f).redMul(tmp);var ny;var nz;if(this.curve.twisted){// Y3 = A * G * (D - a * C)
ny=a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));// Z3 = F * G
nz=f.redMul(g);}else{// Y3 = A * G * (D - C)
ny=a.redMul(g).redMul(d.redSub(c));// Z3 = c * F * G
nz=this.curve._mulC(f).redMul(g);}return this.curve.point(nx,ny,nz);};Point.prototype.add=function add(p){if(this.isInfinity())return p;if(p.isInfinity())return this;if(this.curve.extended)return this._extAdd(p);else return this._projAdd(p);};Point.prototype.mul=function mul(k){if(this._hasDoubles(k))return this.curve._fixedNafMul(this,k);else return this.curve._wnafMul(this,k);};Point.prototype.mulAdd=function mulAdd(k1,p,k2){return this.curve._wnafMulAdd(1,[this,p],[k1,k2],2,false);};Point.prototype.jmulAdd=function jmulAdd(k1,p,k2){return this.curve._wnafMulAdd(1,[this,p],[k1,k2],2,true);};Point.prototype.normalize=function normalize(){if(this.zOne)return this;// Normalize coordinates
var zi=this.z.redInvm();this.x=this.x.redMul(zi);this.y=this.y.redMul(zi);if(this.t)this.t=this.t.redMul(zi);this.z=this.curve.one;this.zOne=true;return this;};Point.prototype.neg=function neg(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg());};Point.prototype.getX=function getX(){this.normalize();return this.x.fromRed();};Point.prototype.getY=function getY(){this.normalize();return this.y.fromRed();};Point.prototype.eq=function eq(other){return this===other||this.getX().cmp(other.getX())===0&&this.getY().cmp(other.getY())===0;};Point.prototype.eqXToP=function eqXToP(x){var rx=x.toRed(this.curve.red).redMul(this.z);if(this.x.cmp(rx)===0)return true;var xc=x.clone();var t=this.curve.redN.redMul(this.z);for(;;){xc.iadd(this.curve.n);if(xc.cmp(this.curve.p)>=0)return false;rx.redIAdd(t);if(this.x.cmp(rx)===0)return true;}return false;};// Compatibility with BaseCurve
Point.prototype.toP=Point.prototype.normalize;Point.prototype.mixedAdd=Point.prototype.add;/***/},/* 185 *//***/function(module,exports,__webpack_require__){"use strict";var curves=exports;var hash=__webpack_require__(54);var elliptic=__webpack_require__(5);var assert=elliptic.utils.assert;function PresetCurve(options){if(options.type==='short')this.curve=new elliptic.curve.short(options);else if(options.type==='edwards')this.curve=new elliptic.curve.edwards(options);else this.curve=new elliptic.curve.mont(options);this.g=this.curve.g;this.n=this.curve.n;this.hash=options.hash;assert(this.g.validate(),'Invalid curve');assert(this.g.mul(this.n).isInfinity(),'Invalid curve, G*N != O');}curves.PresetCurve=PresetCurve;function defineCurve(name,options){(0,_defineProperty2.default)(curves,name,{configurable:true,enumerable:true,get:function get(){var curve=new PresetCurve(options);(0,_defineProperty2.default)(curves,name,{configurable:true,enumerable:true,value:curve});return curve;}});}defineCurve('p192',{type:'short',prime:'p192',p:'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',a:'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',b:'64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',n:'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',hash:hash.sha256,gRed:false,g:['188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012','07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811']});defineCurve('p224',{type:'short',prime:'p224',p:'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',a:'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',b:'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',n:'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',hash:hash.sha256,gRed:false,g:['b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21','bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34']});defineCurve('p256',{type:'short',prime:null,p:'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',a:'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',b:'5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',n:'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',hash:hash.sha256,gRed:false,g:['6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296','4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5']});defineCurve('p384',{type:'short',prime:null,p:'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff '+'fffffffe ffffffff 00000000 00000000 ffffffff',a:'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff '+'fffffffe ffffffff 00000000 00000000 fffffffc',b:'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f '+'5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',n:'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 '+'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',hash:hash.sha384,gRed:false,g:['aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 '+'5502f25d bf55296c 3a545e38 72760ab7','3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 '+'0a60b1ce 1d7e819d 7a431d7c 90ea0e5f']});defineCurve('p521',{type:'short',prime:null,p:'000001ff ffffffff ffffffff ffffffff ffffffff ffffffff '+'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff '+'ffffffff ffffffff ffffffff ffffffff ffffffff',a:'000001ff ffffffff ffffffff ffffffff ffffffff ffffffff '+'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff '+'ffffffff ffffffff ffffffff ffffffff fffffffc',b:'00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b '+'99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd '+'3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',n:'000001ff ffffffff ffffffff ffffffff ffffffff ffffffff '+'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 '+'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',hash:hash.sha512,gRed:false,g:['000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 '+'053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 '+'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66','00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 '+'579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 '+'3fad0761 353c7086 a272c240 88be9476 9fd16650']});defineCurve('curve25519',{type:'mont',prime:'p25519',p:'7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',a:'76d06',b:'1',n:'1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',hash:hash.sha256,gRed:false,g:['9']});defineCurve('ed25519',{type:'edwards',prime:'p25519',p:'7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',a:'-1',c:'1',// -121665 * (121666^(-1)) (mod P)
d:'52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',n:'1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',hash:hash.sha256,gRed:false,g:['216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',// 4/5
'6666666666666666666666666666666666666666666666666666666666666658']});var pre;try{pre=__webpack_require__(192);}catch(e){pre=undefined;}defineCurve('secp256k1',{type:'short',prime:'k256',p:'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',a:'0',b:'7',n:'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',h:'1',hash:hash.sha256,// Precomputed endomorphism
beta:'7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',lambda:'5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',basis:[{a:'3086d221a7d46bcde86c90e49284eb15',b:'-e4437ed6010e88286f547fa90abfe4c3'},{a:'114ca50f7a8e2f3f657c1108d9d44cfd8',b:'3086d221a7d46bcde86c90e49284eb15'}],gRed:false,g:['79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798','483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',pre]});/***/},/* 186 *//***/function(module,exports,__webpack_require__){"use strict";exports.sha1=__webpack_require__(187);exports.sha224=__webpack_require__(188);exports.sha256=__webpack_require__(90);exports.sha384=__webpack_require__(189);exports.sha512=__webpack_require__(91);/***/},/* 187 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var common=__webpack_require__(25);var shaCommon=__webpack_require__(89);var rotl32=utils.rotl32;var sum32=utils.sum32;var sum32_5=utils.sum32_5;var ft_1=shaCommon.ft_1;var BlockHash=common.BlockHash;var sha1_K=[0x5A827999,0x6ED9EBA1,0x8F1BBCDC,0xCA62C1D6];function SHA1(){if(!(this instanceof SHA1))return new SHA1();BlockHash.call(this);this.h=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0];this.W=new Array(80);}utils.inherits(SHA1,BlockHash);module.exports=SHA1;SHA1.blockSize=512;SHA1.outSize=160;SHA1.hmacStrength=80;SHA1.padLength=64;SHA1.prototype._update=function _update(msg,start){var W=this.W;for(var i=0;i<16;i++){W[i]=msg[start+i];}for(;i<W.length;i++){W[i]=rotl32(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);}var a=this.h[0];var b=this.h[1];var c=this.h[2];var d=this.h[3];var e=this.h[4];for(i=0;i<W.length;i++){var s=~~(i/20);var t=sum32_5(rotl32(a,5),ft_1(s,b,c,d),e,W[i],sha1_K[s]);e=d;d=c;c=rotl32(b,30);b=a;a=t;}this.h[0]=sum32(this.h[0],a);this.h[1]=sum32(this.h[1],b);this.h[2]=sum32(this.h[2],c);this.h[3]=sum32(this.h[3],d);this.h[4]=sum32(this.h[4],e);};SHA1.prototype._digest=function digest(enc){if(enc==='hex')return utils.toHex32(this.h,'big');else return utils.split32(this.h,'big');};/***/},/* 188 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var SHA256=__webpack_require__(90);function SHA224(){if(!(this instanceof SHA224))return new SHA224();SHA256.call(this);this.h=[0xc1059ed8,0x367cd507,0x3070dd17,0xf70e5939,0xffc00b31,0x68581511,0x64f98fa7,0xbefa4fa4];}utils.inherits(SHA224,SHA256);module.exports=SHA224;SHA224.blockSize=512;SHA224.outSize=224;SHA224.hmacStrength=192;SHA224.padLength=64;SHA224.prototype._digest=function digest(enc){// Just truncate output
if(enc==='hex')return utils.toHex32(this.h.slice(0,7),'big');else return utils.split32(this.h.slice(0,7),'big');};/***/},/* 189 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var SHA512=__webpack_require__(91);function SHA384(){if(!(this instanceof SHA384))return new SHA384();SHA512.call(this);this.h=[0xcbbb9d5d,0xc1059ed8,0x629a292a,0x367cd507,0x9159015a,0x3070dd17,0x152fecd8,0xf70e5939,0x67332667,0xffc00b31,0x8eb44a87,0x68581511,0xdb0c2e0d,0x64f98fa7,0x47b5481d,0xbefa4fa4];}utils.inherits(SHA384,SHA512);module.exports=SHA384;SHA384.blockSize=1024;SHA384.outSize=384;SHA384.hmacStrength=192;SHA384.padLength=128;SHA384.prototype._digest=function digest(enc){if(enc==='hex')return utils.toHex32(this.h.slice(0,12),'big');else return utils.split32(this.h.slice(0,12),'big');};/***/},/* 190 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var common=__webpack_require__(25);var rotl32=utils.rotl32;var sum32=utils.sum32;var sum32_3=utils.sum32_3;var sum32_4=utils.sum32_4;var BlockHash=common.BlockHash;function RIPEMD160(){if(!(this instanceof RIPEMD160))return new RIPEMD160();BlockHash.call(this);this.h=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0];this.endian='little';}utils.inherits(RIPEMD160,BlockHash);exports.ripemd160=RIPEMD160;RIPEMD160.blockSize=512;RIPEMD160.outSize=160;RIPEMD160.hmacStrength=192;RIPEMD160.padLength=64;RIPEMD160.prototype._update=function update(msg,start){var A=this.h[0];var B=this.h[1];var C=this.h[2];var D=this.h[3];var E=this.h[4];var Ah=A;var Bh=B;var Ch=C;var Dh=D;var Eh=E;for(var j=0;j<80;j++){var T=sum32(rotl32(sum32_4(A,f(j,B,C,D),msg[r[j]+start],K(j)),s[j]),E);A=E;E=D;D=rotl32(C,10);C=B;B=T;T=sum32(rotl32(sum32_4(Ah,f(79-j,Bh,Ch,Dh),msg[rh[j]+start],Kh(j)),sh[j]),Eh);Ah=Eh;Eh=Dh;Dh=rotl32(Ch,10);Ch=Bh;Bh=T;}T=sum32_3(this.h[1],C,Dh);this.h[1]=sum32_3(this.h[2],D,Eh);this.h[2]=sum32_3(this.h[3],E,Ah);this.h[3]=sum32_3(this.h[4],A,Bh);this.h[4]=sum32_3(this.h[0],B,Ch);this.h[0]=T;};RIPEMD160.prototype._digest=function digest(enc){if(enc==='hex')return utils.toHex32(this.h,'little');else return utils.split32(this.h,'little');};function f(j,x,y,z){if(j<=15)return x^y^z;else if(j<=31)return x&y|~x&z;else if(j<=47)return(x|~y)^z;else if(j<=63)return x&z|y&~z;else return x^(y|~z);}function K(j){if(j<=15)return 0x00000000;else if(j<=31)return 0x5a827999;else if(j<=47)return 0x6ed9eba1;else if(j<=63)return 0x8f1bbcdc;else return 0xa953fd4e;}function Kh(j){if(j<=15)return 0x50a28be6;else if(j<=31)return 0x5c4dd124;else if(j<=47)return 0x6d703ef3;else if(j<=63)return 0x7a6d76e9;else return 0x00000000;}var r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13];var rh=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11];var s=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6];var sh=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];/***/},/* 191 *//***/function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(8);var assert=__webpack_require__(7);function Hmac(hash,key,enc){if(!(this instanceof Hmac))return new Hmac(hash,key,enc);this.Hash=hash;this.blockSize=hash.blockSize/8;this.outSize=hash.outSize/8;this.inner=null;this.outer=null;this._init(utils.toArray(key,enc));}module.exports=Hmac;Hmac.prototype._init=function init(key){// Shorten key, if needed
if(key.length>this.blockSize)key=new this.Hash().update(key).digest();assert(key.length<=this.blockSize);// Add padding to key
for(var i=key.length;i<this.blockSize;i++){key.push(0);}for(i=0;i<key.length;i++){key[i]^=0x36;}this.inner=new this.Hash().update(key);// 0x36 ^ 0x5c = 0x6a
for(i=0;i<key.length;i++){key[i]^=0x6a;}this.outer=new this.Hash().update(key);};Hmac.prototype.update=function update(msg,enc){this.inner.update(msg,enc);return this;};Hmac.prototype.digest=function digest(enc){this.outer.update(this.inner.digest());return this.outer.digest(enc);};/***/},/* 192 *//***/function(module,exports){module.exports={doubles:{step:4,points:[['e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a','f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'],['8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508','11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'],['175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739','d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'],['363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640','4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'],['8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c','4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'],['723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda','96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'],['eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa','5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'],['100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0','cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'],['e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d','9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'],['feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d','e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'],['da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1','9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'],['53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0','5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'],['8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047','10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'],['385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862','283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'],['6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7','7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'],['3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd','56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'],['85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83','7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'],['948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a','53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'],['6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8','bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'],['e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d','4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'],['e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725','7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'],['213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754','4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'],['4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c','17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'],['fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6','6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'],['76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39','c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'],['c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891','893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'],['d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b','febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'],['b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03','2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'],['e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d','eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'],['a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070','7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'],['90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4','e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'],['8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da','662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'],['e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11','1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'],['8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e','efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'],['e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41','2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'],['b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef','67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'],['d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8','db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'],['324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d','648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'],['4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96','35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'],['9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd','ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'],['6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5','9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'],['a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266','40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'],['7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71','34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'],['928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac','c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'],['85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751','1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'],['ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e','493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'],['827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241','c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'],['eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3','be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'],['e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f','4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'],['1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19','aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'],['146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be','b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'],['fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9','6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'],['da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2','8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'],['a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13','7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'],['174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c','ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'],['959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba','2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'],['d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151','e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'],['64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073','d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'],['8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458','38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'],['13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b','69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'],['bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366','d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'],['8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa','40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'],['8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0','620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'],['dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787','7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'],['f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e','ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82']]},naf:{wnd:7,points:[['f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9','388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'],['2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4','d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'],['5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc','6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'],['acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe','cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'],['774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb','d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'],['f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8','ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'],['d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e','581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'],['defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34','4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'],['2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c','85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'],['352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5','321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'],['2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f','2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'],['9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714','73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'],['daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729','a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'],['c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db','2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'],['6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4','e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'],['1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5','b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'],['605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479','2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'],['62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d','80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'],['80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f','1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'],['7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb','d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'],['d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9','eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'],['49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963','758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'],['77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74','958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'],['f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530','e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'],['463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b','5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'],['f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247','cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'],['caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1','cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'],['2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120','4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'],['7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435','91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'],['754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18','673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'],['e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8','59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'],['186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb','3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'],['df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f','55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'],['5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143','efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'],['290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba','e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'],['af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45','f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'],['766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a','744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'],['59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e','c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'],['f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8','e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'],['7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c','30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'],['948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519','e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'],['7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab','100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'],['3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca','ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'],['d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf','8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'],['1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610','68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'],['733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4','f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'],['15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c','d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'],['a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940','edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'],['e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980','a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'],['311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3','66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'],['34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf','9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'],['f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63','4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'],['d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448','fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'],['32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf','5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'],['7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5','8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'],['ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6','8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'],['16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5','5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'],['eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99','f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'],['78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51','f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'],['494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5','42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'],['a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5','204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'],['c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997','4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'],['841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881','73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'],['5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5','39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'],['36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66','d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'],['336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726','ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'],['8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede','6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'],['1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94','60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'],['85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31','3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'],['29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51','b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'],['a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252','ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'],['4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5','cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'],['d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b','6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'],['ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4','322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'],['af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f','6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'],['e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889','2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'],['591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246','b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'],['11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984','998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'],['3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a','b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'],['cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030','bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'],['c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197','6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'],['c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593','c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'],['a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef','21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'],['347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38','60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'],['da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a','49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'],['c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111','5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'],['4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502','7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'],['3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea','be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'],['cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26','8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'],['b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986','39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'],['d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e','62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'],['48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4','25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'],['dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda','ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'],['6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859','cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'],['e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f','f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'],['eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c','6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'],['13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942','fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'],['ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a','1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'],['b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80','5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'],['ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d','438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'],['8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1','cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'],['52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63','c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'],['e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352','6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'],['7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193','ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'],['5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00','9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'],['32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58','ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'],['e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7','d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'],['8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8','c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'],['4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e','67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'],['3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d','cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'],['674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b','299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'],['d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f','f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'],['30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6','462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'],['be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297','62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'],['93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a','7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'],['b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c','ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'],['d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52','4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'],['d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb','bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'],['463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065','bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'],['7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917','603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'],['74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9','cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'],['30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3','553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'],['9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57','712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'],['176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66','ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'],['75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8','9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'],['809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721','9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'],['1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180','4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9']]}};/***/},/* 193 *//***/function(module,exports,__webpack_require__){"use strict";var BN=__webpack_require__(2);var HmacDRBG=__webpack_require__(194);var elliptic=__webpack_require__(5);var utils=elliptic.utils;var assert=utils.assert;var KeyPair=__webpack_require__(195);var Signature=__webpack_require__(196);function EC(options){if(!(this instanceof EC))return new EC(options);// Shortcut `elliptic.ec(curve-name)`
if(typeof options==='string'){assert(elliptic.curves.hasOwnProperty(options),'Unknown curve '+options);options=elliptic.curves[options];}// Shortcut for `elliptic.ec(elliptic.curves.curveName)`
if(options instanceof elliptic.curves.PresetCurve)options={curve:options};this.curve=options.curve.curve;this.n=this.curve.n;this.nh=this.n.ushrn(1);this.g=this.curve.g;// Point on curve
this.g=options.curve.g;this.g.precompute(options.curve.n.bitLength()+1);// Hash for function for DRBG
this.hash=options.hash||options.curve.hash;}module.exports=EC;EC.prototype.keyPair=function keyPair(options){return new KeyPair(this,options);};EC.prototype.keyFromPrivate=function keyFromPrivate(priv,enc){return KeyPair.fromPrivate(this,priv,enc);};EC.prototype.keyFromPublic=function keyFromPublic(pub,enc){return KeyPair.fromPublic(this,pub,enc);};EC.prototype.genKeyPair=function genKeyPair(options){if(!options)options={};// Instantiate Hmac_DRBG
var drbg=new HmacDRBG({hash:this.hash,pers:options.pers,persEnc:options.persEnc||'utf8',entropy:options.entropy||elliptic.rand(this.hash.hmacStrength),entropyEnc:options.entropy&&options.entropyEnc||'utf8',nonce:this.n.toArray()});var bytes=this.n.byteLength();var ns2=this.n.sub(new BN(2));do{var priv=new BN(drbg.generate(bytes));if(priv.cmp(ns2)>0)continue;priv.iaddn(1);return this.keyFromPrivate(priv);}while(true);};EC.prototype._truncateToN=function truncateToN(msg,truncOnly){var delta=msg.byteLength()*8-this.n.bitLength();if(delta>0)msg=msg.ushrn(delta);if(!truncOnly&&msg.cmp(this.n)>=0)return msg.sub(this.n);else return msg;};EC.prototype.sign=function sign(msg,key,enc,options){if((typeof enc==='undefined'?'undefined':(0,_typeof3.default)(enc))==='object'){options=enc;enc=null;}if(!options)options={};key=this.keyFromPrivate(key,enc);msg=this._truncateToN(new BN(msg,16));// Zero-extend key to provide enough entropy
var bytes=this.n.byteLength();var bkey=key.getPrivate().toArray('be',bytes);// Zero-extend nonce to have the same byte size as N
var nonce=msg.toArray('be',bytes);// Instantiate Hmac_DRBG
var drbg=new HmacDRBG({hash:this.hash,entropy:bkey,nonce:nonce,pers:options.pers,persEnc:options.persEnc||'utf8'});// Number of bytes to generate
var ns1=this.n.sub(new BN(1));for(var iter=0;true;iter++){var k=options.k?options.k(iter):new BN(drbg.generate(this.n.byteLength()));k=this._truncateToN(k,true);if(k.cmpn(1)<=0||k.cmp(ns1)>=0)continue;var kp=this.g.mul(k);if(kp.isInfinity())continue;var kpX=kp.getX();var r=kpX.umod(this.n);if(r.cmpn(0)===0)continue;var s=k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));s=s.umod(this.n);if(s.cmpn(0)===0)continue;var recoveryParam=(kp.getY().isOdd()?1:0)|(kpX.cmp(r)!==0?2:0);// Use complement of `s`, if it is > `n / 2`
if(options.canonical&&s.cmp(this.nh)>0){s=this.n.sub(s);recoveryParam^=1;}return new Signature({r:r,s:s,recoveryParam:recoveryParam});}};EC.prototype.verify=function verify(msg,signature,key,enc){msg=this._truncateToN(new BN(msg,16));key=this.keyFromPublic(key,enc);signature=new Signature(signature,'hex');// Perform primitive values validation
var r=signature.r;var s=signature.s;if(r.cmpn(1)<0||r.cmp(this.n)>=0)return false;if(s.cmpn(1)<0||s.cmp(this.n)>=0)return false;// Validate signature
var sinv=s.invm(this.n);var u1=sinv.mul(msg).umod(this.n);var u2=sinv.mul(r).umod(this.n);if(!this.curve._maxwellTrick){var p=this.g.mulAdd(u1,key.getPublic(),u2);if(p.isInfinity())return false;return p.getX().umod(this.n).cmp(r)===0;}// NOTE: Greg Maxwell's trick, inspired by:
// https://git.io/vad3K
var p=this.g.jmulAdd(u1,key.getPublic(),u2);if(p.isInfinity())return false;// Compare `p.x` of Jacobian point with `r`,
// this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
// inverse of `p.z^2`
return p.eqXToP(r);};EC.prototype.recoverPubKey=function(msg,signature,j,enc){assert((3&j)===j,'The recovery param is more than two bits');signature=new Signature(signature,enc);var n=this.n;var e=new BN(msg);var r=signature.r;var s=signature.s;// A set LSB signifies that the y-coordinate is odd
var isYOdd=j&1;var isSecondKey=j>>1;if(r.cmp(this.curve.p.umod(this.curve.n))>=0&&isSecondKey)throw new Error('Unable to find sencond key candinate');// 1.1. Let x = r + jn.
if(isSecondKey)r=this.curve.pointFromX(r.add(this.curve.n),isYOdd);else r=this.curve.pointFromX(r,isYOdd);var rInv=signature.r.invm(n);var s1=n.sub(e).mul(rInv).umod(n);var s2=s.mul(rInv).umod(n);// 1.6.1 Compute Q = r^-1 (sR -  eG)
//               Q = r^-1 (sR + -eG)
return this.g.mulAdd(s1,r,s2);};EC.prototype.getKeyRecoveryParam=function(e,signature,Q,enc){signature=new Signature(signature,enc);if(signature.recoveryParam!==null)return signature.recoveryParam;for(var i=0;i<4;i++){var Qprime;try{Qprime=this.recoverPubKey(e,signature,i);}catch(e){continue;}if(Qprime.eq(Q))return i;}throw new Error('Unable to find valid recovery factor');};/***/},/* 194 *//***/function(module,exports,__webpack_require__){"use strict";var hash=__webpack_require__(54);var utils=__webpack_require__(88);var assert=__webpack_require__(7);function HmacDRBG(options){if(!(this instanceof HmacDRBG))return new HmacDRBG(options);this.hash=options.hash;this.predResist=!!options.predResist;this.outLen=this.hash.outSize;this.minEntropy=options.minEntropy||this.hash.hmacStrength;this._reseed=null;this.reseedInterval=null;this.K=null;this.V=null;var entropy=utils.toArray(options.entropy,options.entropyEnc||'hex');var nonce=utils.toArray(options.nonce,options.nonceEnc||'hex');var pers=utils.toArray(options.pers,options.persEnc||'hex');assert(entropy.length>=this.minEntropy/8,'Not enough entropy. Minimum is: '+this.minEntropy+' bits');this._init(entropy,nonce,pers);}module.exports=HmacDRBG;HmacDRBG.prototype._init=function init(entropy,nonce,pers){var seed=entropy.concat(nonce).concat(pers);this.K=new Array(this.outLen/8);this.V=new Array(this.outLen/8);for(var i=0;i<this.V.length;i++){this.K[i]=0x00;this.V[i]=0x01;}this._update(seed);this._reseed=1;this.reseedInterval=0x1000000000000;// 2^48
};HmacDRBG.prototype._hmac=function hmac(){return new hash.hmac(this.hash,this.K);};HmacDRBG.prototype._update=function update(seed){var kmac=this._hmac().update(this.V).update([0x00]);if(seed)kmac=kmac.update(seed);this.K=kmac.digest();this.V=this._hmac().update(this.V).digest();if(!seed)return;this.K=this._hmac().update(this.V).update([0x01]).update(seed).digest();this.V=this._hmac().update(this.V).digest();};HmacDRBG.prototype.reseed=function reseed(entropy,entropyEnc,add,addEnc){// Optional entropy enc
if(typeof entropyEnc!=='string'){addEnc=add;add=entropyEnc;entropyEnc=null;}entropy=utils.toArray(entropy,entropyEnc);add=utils.toArray(add,addEnc);assert(entropy.length>=this.minEntropy/8,'Not enough entropy. Minimum is: '+this.minEntropy+' bits');this._update(entropy.concat(add||[]));this._reseed=1;};HmacDRBG.prototype.generate=function generate(len,enc,add,addEnc){if(this._reseed>this.reseedInterval)throw new Error('Reseed is required');// Optional encoding
if(typeof enc!=='string'){addEnc=add;add=enc;enc=null;}// Optional additional data
if(add){add=utils.toArray(add,addEnc||'hex');this._update(add);}var temp=[];while(temp.length<len){this.V=this._hmac().update(this.V).digest();temp=temp.concat(this.V);}var res=temp.slice(0,len);this._update(add);this._reseed++;return utils.encode(res,enc);};/***/},/* 195 *//***/function(module,exports,__webpack_require__){"use strict";var BN=__webpack_require__(2);var elliptic=__webpack_require__(5);var utils=elliptic.utils;var assert=utils.assert;function KeyPair(ec,options){this.ec=ec;this.priv=null;this.pub=null;// KeyPair(ec, { priv: ..., pub: ... })
if(options.priv)this._importPrivate(options.priv,options.privEnc);if(options.pub)this._importPublic(options.pub,options.pubEnc);}module.exports=KeyPair;KeyPair.fromPublic=function fromPublic(ec,pub,enc){if(pub instanceof KeyPair)return pub;return new KeyPair(ec,{pub:pub,pubEnc:enc});};KeyPair.fromPrivate=function fromPrivate(ec,priv,enc){if(priv instanceof KeyPair)return priv;return new KeyPair(ec,{priv:priv,privEnc:enc});};KeyPair.prototype.validate=function validate(){var pub=this.getPublic();if(pub.isInfinity())return{result:false,reason:'Invalid public key'};if(!pub.validate())return{result:false,reason:'Public key is not a point'};if(!pub.mul(this.ec.curve.n).isInfinity())return{result:false,reason:'Public key * N != O'};return{result:true,reason:null};};KeyPair.prototype.getPublic=function getPublic(compact,enc){// compact is optional argument
if(typeof compact==='string'){enc=compact;compact=null;}if(!this.pub)this.pub=this.ec.g.mul(this.priv);if(!enc)return this.pub;return this.pub.encode(enc,compact);};KeyPair.prototype.getPrivate=function getPrivate(enc){if(enc==='hex')return this.priv.toString(16,2);else return this.priv;};KeyPair.prototype._importPrivate=function _importPrivate(key,enc){this.priv=new BN(key,enc||16);// Ensure that the priv won't be bigger than n, otherwise we may fail
// in fixed multiplication method
this.priv=this.priv.umod(this.ec.curve.n);};KeyPair.prototype._importPublic=function _importPublic(key,enc){if(key.x||key.y){// Montgomery points only have an `x` coordinate.
// Weierstrass/Edwards points on the other hand have both `x` and
// `y` coordinates.
if(this.ec.curve.type==='mont'){assert(key.x,'Need x coordinate');}else if(this.ec.curve.type==='short'||this.ec.curve.type==='edwards'){assert(key.x&&key.y,'Need both x and y coordinate');}this.pub=this.ec.curve.point(key.x,key.y);return;}this.pub=this.ec.curve.decodePoint(key,enc);};// ECDH
KeyPair.prototype.derive=function derive(pub){return pub.mul(this.priv).getX();};// ECDSA
KeyPair.prototype.sign=function sign(msg,enc,options){return this.ec.sign(msg,this,enc,options);};KeyPair.prototype.verify=function verify(msg,signature){return this.ec.verify(msg,signature,this);};KeyPair.prototype.inspect=function inspect(){return'<Key priv: '+(this.priv&&this.priv.toString(16,2))+' pub: '+(this.pub&&this.pub.inspect())+' >';};/***/},/* 196 *//***/function(module,exports,__webpack_require__){"use strict";var BN=__webpack_require__(2);var elliptic=__webpack_require__(5);var utils=elliptic.utils;var assert=utils.assert;function Signature(options,enc){if(options instanceof Signature)return options;if(this._importDER(options,enc))return;assert(options.r&&options.s,'Signature without r or s');this.r=new BN(options.r,16);this.s=new BN(options.s,16);if(options.recoveryParam===undefined)this.recoveryParam=null;else this.recoveryParam=options.recoveryParam;}module.exports=Signature;function Position(){this.place=0;}function getLength(buf,p){var initial=buf[p.place++];if(!(initial&0x80)){return initial;}var octetLen=initial&0xf;var val=0;for(var i=0,off=p.place;i<octetLen;i++,off++){val<<=8;val|=buf[off];}p.place=off;return val;}function rmPadding(buf){var i=0;var len=buf.length-1;while(!buf[i]&&!(buf[i+1]&0x80)&&i<len){i++;}if(i===0){return buf;}return buf.slice(i);}Signature.prototype._importDER=function _importDER(data,enc){data=utils.toArray(data,enc);var p=new Position();if(data[p.place++]!==0x30){return false;}var len=getLength(data,p);if(len+p.place!==data.length){return false;}if(data[p.place++]!==0x02){return false;}var rlen=getLength(data,p);var r=data.slice(p.place,rlen+p.place);p.place+=rlen;if(data[p.place++]!==0x02){return false;}var slen=getLength(data,p);if(data.length!==slen+p.place){return false;}var s=data.slice(p.place,slen+p.place);if(r[0]===0&&r[1]&0x80){r=r.slice(1);}if(s[0]===0&&s[1]&0x80){s=s.slice(1);}this.r=new BN(r);this.s=new BN(s);this.recoveryParam=null;return true;};function constructLength(arr,len){if(len<0x80){arr.push(len);return;}var octets=1+(Math.log(len)/Math.LN2>>>3);arr.push(octets|0x80);while(--octets){arr.push(len>>>(octets<<3)&0xff);}arr.push(len);}Signature.prototype.toDER=function toDER(enc){var r=this.r.toArray();var s=this.s.toArray();// Pad values
if(r[0]&0x80)r=[0].concat(r);// Pad values
if(s[0]&0x80)s=[0].concat(s);r=rmPadding(r);s=rmPadding(s);while(!s[0]&&!(s[1]&0x80)){s=s.slice(1);}var arr=[0x02];constructLength(arr,r.length);arr=arr.concat(r);arr.push(0x02);constructLength(arr,s.length);var backHalf=arr.concat(s);var res=[0x30];constructLength(res,backHalf.length);res=res.concat(backHalf);return utils.encode(res,enc);};/***/},/* 197 *//***/function(module,exports,__webpack_require__){"use strict";var hash=__webpack_require__(54);var elliptic=__webpack_require__(5);var utils=elliptic.utils;var assert=utils.assert;var parseBytes=utils.parseBytes;var KeyPair=__webpack_require__(198);var Signature=__webpack_require__(199);function EDDSA(curve){assert(curve==='ed25519','only tested with ed25519 so far');if(!(this instanceof EDDSA))return new EDDSA(curve);var curve=elliptic.curves[curve].curve;this.curve=curve;this.g=curve.g;this.g.precompute(curve.n.bitLength()+1);this.pointClass=curve.point().constructor;this.encodingLength=Math.ceil(curve.n.bitLength()/8);this.hash=hash.sha512;}module.exports=EDDSA;/**
* @param {Array|String} message - message bytes
* @param {Array|String|KeyPair} secret - secret bytes or a keypair
* @returns {Signature} - signature
*/EDDSA.prototype.sign=function sign(message,secret){message=parseBytes(message);var key=this.keyFromSecret(secret);var r=this.hashInt(key.messagePrefix(),message);var R=this.g.mul(r);var Rencoded=this.encodePoint(R);var s_=this.hashInt(Rencoded,key.pubBytes(),message).mul(key.priv());var S=r.add(s_).umod(this.curve.n);return this.makeSignature({R:R,S:S,Rencoded:Rencoded});};/**
* @param {Array} message - message bytes
* @param {Array|String|Signature} sig - sig bytes
* @param {Array|String|Point|KeyPair} pub - public key
* @returns {Boolean} - true if public key matches sig of message
*/EDDSA.prototype.verify=function verify(message,sig,pub){message=parseBytes(message);sig=this.makeSignature(sig);var key=this.keyFromPublic(pub);var h=this.hashInt(sig.Rencoded(),key.pubBytes(),message);var SG=this.g.mul(sig.S());var RplusAh=sig.R().add(key.pub().mul(h));return RplusAh.eq(SG);};EDDSA.prototype.hashInt=function hashInt(){var hash=this.hash();for(var i=0;i<arguments.length;i++){hash.update(arguments[i]);}return utils.intFromLE(hash.digest()).umod(this.curve.n);};EDDSA.prototype.keyFromPublic=function keyFromPublic(pub){return KeyPair.fromPublic(this,pub);};EDDSA.prototype.keyFromSecret=function keyFromSecret(secret){return KeyPair.fromSecret(this,secret);};EDDSA.prototype.makeSignature=function makeSignature(sig){if(sig instanceof Signature)return sig;return new Signature(this,sig);};/**
* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
*
* EDDSA defines methods for encoding and decoding points and integers. These are
* helper convenience methods, that pass along to utility functions implied
* parameters.
*
*/EDDSA.prototype.encodePoint=function encodePoint(point){var enc=point.getY().toArray('le',this.encodingLength);enc[this.encodingLength-1]|=point.getX().isOdd()?0x80:0;return enc;};EDDSA.prototype.decodePoint=function decodePoint(bytes){bytes=utils.parseBytes(bytes);var lastIx=bytes.length-1;var normed=bytes.slice(0,lastIx).concat(bytes[lastIx]&~0x80);var xIsOdd=(bytes[lastIx]&0x80)!==0;var y=utils.intFromLE(normed);return this.curve.pointFromY(y,xIsOdd);};EDDSA.prototype.encodeInt=function encodeInt(num){return num.toArray('le',this.encodingLength);};EDDSA.prototype.decodeInt=function decodeInt(bytes){return utils.intFromLE(bytes);};EDDSA.prototype.isPoint=function isPoint(val){return val instanceof this.pointClass;};/***/},/* 198 *//***/function(module,exports,__webpack_require__){"use strict";var elliptic=__webpack_require__(5);var utils=elliptic.utils;var assert=utils.assert;var parseBytes=utils.parseBytes;var cachedProperty=utils.cachedProperty;/**
* @param {EDDSA} eddsa - instance
* @param {Object} params - public/private key parameters
*
* @param {Array<Byte>} [params.secret] - secret seed bytes
* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
*
*/function KeyPair(eddsa,params){this.eddsa=eddsa;this._secret=parseBytes(params.secret);if(eddsa.isPoint(params.pub))this._pub=params.pub;else this._pubBytes=parseBytes(params.pub);}KeyPair.fromPublic=function fromPublic(eddsa,pub){if(pub instanceof KeyPair)return pub;return new KeyPair(eddsa,{pub:pub});};KeyPair.fromSecret=function fromSecret(eddsa,secret){if(secret instanceof KeyPair)return secret;return new KeyPair(eddsa,{secret:secret});};KeyPair.prototype.secret=function secret(){return this._secret;};cachedProperty(KeyPair,'pubBytes',function pubBytes(){return this.eddsa.encodePoint(this.pub());});cachedProperty(KeyPair,'pub',function pub(){if(this._pubBytes)return this.eddsa.decodePoint(this._pubBytes);return this.eddsa.g.mul(this.priv());});cachedProperty(KeyPair,'privBytes',function privBytes(){var eddsa=this.eddsa;var hash=this.hash();var lastIx=eddsa.encodingLength-1;var a=hash.slice(0,eddsa.encodingLength);a[0]&=248;a[lastIx]&=127;a[lastIx]|=64;return a;});cachedProperty(KeyPair,'priv',function priv(){return this.eddsa.decodeInt(this.privBytes());});cachedProperty(KeyPair,'hash',function hash(){return this.eddsa.hash().update(this.secret()).digest();});cachedProperty(KeyPair,'messagePrefix',function messagePrefix(){return this.hash().slice(this.eddsa.encodingLength);});KeyPair.prototype.sign=function sign(message){assert(this._secret,'KeyPair can only verify');return this.eddsa.sign(message,this);};KeyPair.prototype.verify=function verify(message,sig){return this.eddsa.verify(message,sig,this);};KeyPair.prototype.getSecret=function getSecret(enc){assert(this._secret,'KeyPair is public only');return utils.encode(this.secret(),enc);};KeyPair.prototype.getPublic=function getPublic(enc){return utils.encode(this.pubBytes(),enc);};module.exports=KeyPair;/***/},/* 199 *//***/function(module,exports,__webpack_require__){"use strict";var BN=__webpack_require__(2);var elliptic=__webpack_require__(5);var utils=elliptic.utils;var assert=utils.assert;var cachedProperty=utils.cachedProperty;var parseBytes=utils.parseBytes;/**
* @param {EDDSA} eddsa - eddsa instance
* @param {Array<Bytes>|Object} sig -
* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
*/function Signature(eddsa,sig){this.eddsa=eddsa;if((typeof sig==='undefined'?'undefined':(0,_typeof3.default)(sig))!=='object')sig=parseBytes(sig);if(Array.isArray(sig)){sig={R:sig.slice(0,eddsa.encodingLength),S:sig.slice(eddsa.encodingLength)};}assert(sig.R&&sig.S,'Signature without R or S');if(eddsa.isPoint(sig.R))this._R=sig.R;if(sig.S instanceof BN)this._S=sig.S;this._Rencoded=Array.isArray(sig.R)?sig.R:sig.Rencoded;this._Sencoded=Array.isArray(sig.S)?sig.S:sig.Sencoded;}cachedProperty(Signature,'S',function S(){return this.eddsa.decodeInt(this.Sencoded());});cachedProperty(Signature,'R',function R(){return this.eddsa.decodePoint(this.Rencoded());});cachedProperty(Signature,'Rencoded',function Rencoded(){return this.eddsa.encodePoint(this.R());});cachedProperty(Signature,'Sencoded',function Sencoded(){return this.eddsa.encodeInt(this.S());});Signature.prototype.toBytes=function toBytes(){return this.Rencoded().concat(this.Sencoded());};Signature.prototype.toHex=function toHex(){return utils.encode(this.toBytes(),'hex').toUpperCase();};module.exports=Signature;/***/},/* 200 *//***/function(module,exports,__webpack_require__){"use strict";// from https://github.com/indutny/self-signed/blob/gh-pages/lib/asn1.js
// Fedor, you are amazing.
var asn1=__webpack_require__(26);exports.certificate=__webpack_require__(211);var RSAPrivateKey=asn1.define('RSAPrivateKey',function(){this.seq().obj(this.key('version').int(),this.key('modulus').int(),this.key('publicExponent').int(),this.key('privateExponent').int(),this.key('prime1').int(),this.key('prime2').int(),this.key('exponent1').int(),this.key('exponent2').int(),this.key('coefficient').int());});exports.RSAPrivateKey=RSAPrivateKey;var RSAPublicKey=asn1.define('RSAPublicKey',function(){this.seq().obj(this.key('modulus').int(),this.key('publicExponent').int());});exports.RSAPublicKey=RSAPublicKey;var PublicKey=asn1.define('SubjectPublicKeyInfo',function(){this.seq().obj(this.key('algorithm').use(AlgorithmIdentifier),this.key('subjectPublicKey').bitstr());});exports.PublicKey=PublicKey;var AlgorithmIdentifier=asn1.define('AlgorithmIdentifier',function(){this.seq().obj(this.key('algorithm').objid(),this.key('none').null_().optional(),this.key('curve').objid().optional(),this.key('params').seq().obj(this.key('p').int(),this.key('q').int(),this.key('g').int()).optional());});var PrivateKeyInfo=asn1.define('PrivateKeyInfo',function(){this.seq().obj(this.key('version').int(),this.key('algorithm').use(AlgorithmIdentifier),this.key('subjectPrivateKey').octstr());});exports.PrivateKey=PrivateKeyInfo;var EncryptedPrivateKeyInfo=asn1.define('EncryptedPrivateKeyInfo',function(){this.seq().obj(this.key('algorithm').seq().obj(this.key('id').objid(),this.key('decrypt').seq().obj(this.key('kde').seq().obj(this.key('id').objid(),this.key('kdeparams').seq().obj(this.key('salt').octstr(),this.key('iters').int())),this.key('cipher').seq().obj(this.key('algo').objid(),this.key('iv').octstr()))),this.key('subjectPrivateKey').octstr());});exports.EncryptedPrivateKey=EncryptedPrivateKeyInfo;var DSAPrivateKey=asn1.define('DSAPrivateKey',function(){this.seq().obj(this.key('version').int(),this.key('p').int(),this.key('q').int(),this.key('g').int(),this.key('pub_key').int(),this.key('priv_key').int());});exports.DSAPrivateKey=DSAPrivateKey;exports.DSAparam=asn1.define('DSAparam',function(){this.int();});var ECPrivateKey=asn1.define('ECPrivateKey',function(){this.seq().obj(this.key('version').int(),this.key('privateKey').octstr(),this.key('parameters').optional().explicit(0).use(ECParameters),this.key('publicKey').optional().explicit(1).bitstr());});exports.ECPrivateKey=ECPrivateKey;var ECParameters=asn1.define('ECParameters',function(){this.choice({namedCurve:this.objid()});});exports.signature=asn1.define('signature',function(){this.seq().obj(this.key('r').int(),this.key('s').int());});/***/},/* 201 *//***/function(module,exports,__webpack_require__){var asn1=__webpack_require__(26);var inherits=__webpack_require__(1);var api=exports;api.define=function define(name,body){return new Entity(name,body);};function Entity(name,body){this.name=name;this.body=body;this.decoders={};this.encoders={};};Entity.prototype._createNamed=function createNamed(base){var named;try{named=__webpack_require__(202).runInThisContext('(function '+this.name+'(entity) {\n'+'  this._initNamed(entity);\n'+'})');}catch(e){named=function named(entity){this._initNamed(entity);};}inherits(named,base);named.prototype._initNamed=function initnamed(entity){base.call(this,entity);};return new named(this);};Entity.prototype._getDecoder=function _getDecoder(enc){enc=enc||'der';// Lazily create decoder
if(!this.decoders.hasOwnProperty(enc))this.decoders[enc]=this._createNamed(asn1.decoders[enc]);return this.decoders[enc];};Entity.prototype.decode=function decode(data,enc,options){return this._getDecoder(enc).decode(data,options);};Entity.prototype._getEncoder=function _getEncoder(enc){enc=enc||'der';// Lazily create encoder
if(!this.encoders.hasOwnProperty(enc))this.encoders[enc]=this._createNamed(asn1.encoders[enc]);return this.encoders[enc];};Entity.prototype.encode=function encode(data,enc,/* internal */reporter){return this._getEncoder(enc).encode(data,reporter);};/***/},/* 202 *//***/function(module,exports,__webpack_require__){var indexOf=__webpack_require__(203);var Object_keys=function Object_keys(obj){if(_keys2.default)return(0,_keys2.default)(obj);else{var res=[];for(var key in obj){res.push(key);}return res;}};var forEach=function forEach(xs,fn){if(xs.forEach)return xs.forEach(fn);else for(var i=0;i<xs.length;i++){fn(xs[i],i,xs);}};var defineProp=function(){try{Object.defineProperty({},'_',{});return function(obj,name,value){(0,_defineProperty2.default)(obj,name,{writable:true,enumerable:false,configurable:true,value:value});};}catch(e){return function(obj,name,value){obj[name]=value;};}}();var globals=['Array','Boolean','Date','Error','EvalError','Function','Infinity','JSON','Math','NaN','Number','Object','RangeError','ReferenceError','RegExp','String','SyntaxError','TypeError','URIError','decodeURI','decodeURIComponent','encodeURI','encodeURIComponent','escape','eval','isFinite','isNaN','parseFloat','parseInt','undefined','unescape'];function Context(){}Context.prototype={};var Script=exports.Script=function NodeScript(code){if(!(this instanceof Script))return new Script(code);this.code=code;};Script.prototype.runInContext=function(context){if(!(context instanceof Context)){throw new TypeError("needs a 'context' argument.");}var iframe=document.createElement('iframe');if(!iframe.style)iframe.style={};iframe.style.display='none';document.body.appendChild(iframe);var win=iframe.contentWindow;var wEval=win.eval,wExecScript=win.execScript;if(!wEval&&wExecScript){// win.eval() magically appears when this is called in IE:
wExecScript.call(win,'null');wEval=win.eval;}forEach(Object_keys(context),function(key){win[key]=context[key];});forEach(globals,function(key){if(context[key]){win[key]=context[key];}});var winKeys=Object_keys(win);var res=wEval.call(win,this.code);forEach(Object_keys(win),function(key){// Avoid copying circular objects like `top` and `window` by only
// updating existing context properties or new properties in the `win`
// that was only introduced after the eval.
if(key in context||indexOf(winKeys,key)===-1){context[key]=win[key];}});forEach(globals,function(key){if(!(key in context)){defineProp(context,key,win[key]);}});document.body.removeChild(iframe);return res;};Script.prototype.runInThisContext=function(){return eval(this.code);// maybe...
};Script.prototype.runInNewContext=function(context){var ctx=Script.createContext(context);var res=this.runInContext(ctx);forEach(Object_keys(ctx),function(key){context[key]=ctx[key];});return res;};forEach(Object_keys(Script.prototype),function(name){exports[name]=Script[name]=function(code){var s=Script(code);return s[name].apply(s,[].slice.call(arguments,1));};});exports.createScript=function(code){return exports.Script(code);};exports.createContext=Script.createContext=function(context){var copy=new Context();if((typeof context==='undefined'?'undefined':(0,_typeof3.default)(context))==='object'){forEach(Object_keys(context),function(key){copy[key]=context[key];});}return copy;};/***/},/* 203 *//***/function(module,exports){var indexOf=[].indexOf;module.exports=function(arr,obj){if(indexOf)return arr.indexOf(obj);for(var i=0;i<arr.length;++i){if(arr[i]===obj)return i;}return-1;};/***/},/* 204 *//***/function(module,exports,__webpack_require__){var inherits=__webpack_require__(1);function Reporter(options){this._reporterState={obj:null,path:[],options:options||{},errors:[]};}exports.Reporter=Reporter;Reporter.prototype.isError=function isError(obj){return obj instanceof ReporterError;};Reporter.prototype.save=function save(){var state=this._reporterState;return{obj:state.obj,pathLen:state.path.length};};Reporter.prototype.restore=function restore(data){var state=this._reporterState;state.obj=data.obj;state.path=state.path.slice(0,data.pathLen);};Reporter.prototype.enterKey=function enterKey(key){return this._reporterState.path.push(key);};Reporter.prototype.exitKey=function exitKey(index){var state=this._reporterState;state.path=state.path.slice(0,index-1);};Reporter.prototype.leaveKey=function leaveKey(index,key,value){var state=this._reporterState;this.exitKey(index);if(state.obj!==null)state.obj[key]=value;};Reporter.prototype.path=function path(){return this._reporterState.path.join('/');};Reporter.prototype.enterObject=function enterObject(){var state=this._reporterState;var prev=state.obj;state.obj={};return prev;};Reporter.prototype.leaveObject=function leaveObject(prev){var state=this._reporterState;var now=state.obj;state.obj=prev;return now;};Reporter.prototype.error=function error(msg){var err;var state=this._reporterState;var inherited=msg instanceof ReporterError;if(inherited){err=msg;}else{err=new ReporterError(state.path.map(function(elem){return'['+(0,_stringify2.default)(elem)+']';}).join(''),msg.message||msg,msg.stack);}if(!state.options.partial)throw err;if(!inherited)state.errors.push(err);return err;};Reporter.prototype.wrapResult=function wrapResult(result){var state=this._reporterState;if(!state.options.partial)return result;return{result:this.isError(result)?null:result,errors:state.errors};};function ReporterError(path,msg){this.path=path;this.rethrow(msg);};inherits(ReporterError,Error);ReporterError.prototype.rethrow=function rethrow(msg){this.message=msg+' at: '+(this.path||'(shallow)');if(Error.captureStackTrace)Error.captureStackTrace(this,ReporterError);if(!this.stack){try{// IE only adds stack when thrown
throw new Error(this.message);}catch(e){this.stack=e.stack;}}return this;};/***/},/* 205 *//***/function(module,exports,__webpack_require__){var Reporter=__webpack_require__(27).Reporter;var EncoderBuffer=__webpack_require__(27).EncoderBuffer;var DecoderBuffer=__webpack_require__(27).DecoderBuffer;var assert=__webpack_require__(7);// Supported tags
var tags=['seq','seqof','set','setof','objid','bool','gentime','utctime','null_','enum','int','objDesc','bitstr','bmpstr','charstr','genstr','graphstr','ia5str','iso646str','numstr','octstr','printstr','t61str','unistr','utf8str','videostr'];// Public methods list
var methods=['key','obj','use','optional','explicit','implicit','def','choice','any','contains'].concat(tags);// Overrided methods list
var overrided=['_peekTag','_decodeTag','_use','_decodeStr','_decodeObjid','_decodeTime','_decodeNull','_decodeInt','_decodeBool','_decodeList','_encodeComposite','_encodeStr','_encodeObjid','_encodeTime','_encodeNull','_encodeInt','_encodeBool'];function Node(enc,parent){var state={};this._baseState=state;state.enc=enc;state.parent=parent||null;state.children=null;// State
state.tag=null;state.args=null;state.reverseArgs=null;state.choice=null;state.optional=false;state.any=false;state.obj=false;state.use=null;state.useDecoder=null;state.key=null;state['default']=null;state.explicit=null;state.implicit=null;state.contains=null;// Should create new instance on each method
if(!state.parent){state.children=[];this._wrap();}}module.exports=Node;var stateProps=['enc','parent','children','tag','args','reverseArgs','choice','optional','any','obj','use','alteredUse','key','default','explicit','implicit','contains'];Node.prototype.clone=function clone(){var state=this._baseState;var cstate={};stateProps.forEach(function(prop){cstate[prop]=state[prop];});var res=new this.constructor(cstate.parent);res._baseState=cstate;return res;};Node.prototype._wrap=function wrap(){var state=this._baseState;methods.forEach(function(method){this[method]=function _wrappedMethod(){var clone=new this.constructor(this);state.children.push(clone);return clone[method].apply(clone,arguments);};},this);};Node.prototype._init=function init(body){var state=this._baseState;assert(state.parent===null);body.call(this);// Filter children
state.children=state.children.filter(function(child){return child._baseState.parent===this;},this);assert.equal(state.children.length,1,'Root node can have only one child');};Node.prototype._useArgs=function useArgs(args){var state=this._baseState;// Filter children and args
var children=args.filter(function(arg){return arg instanceof this.constructor;},this);args=args.filter(function(arg){return!(arg instanceof this.constructor);},this);if(children.length!==0){assert(state.children===null);state.children=children;// Replace parent to maintain backward link
children.forEach(function(child){child._baseState.parent=this;},this);}if(args.length!==0){assert(state.args===null);state.args=args;state.reverseArgs=args.map(function(arg){if((typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))!=='object'||arg.constructor!==Object)return arg;var res={};(0,_keys2.default)(arg).forEach(function(key){if(key==(key|0))key|=0;var value=arg[key];res[value]=key;});return res;});}};//
// Overrided methods
//
overrided.forEach(function(method){Node.prototype[method]=function _overrided(){var state=this._baseState;throw new Error(method+' not implemented for encoding: '+state.enc);};});//
// Public methods
//
tags.forEach(function(tag){Node.prototype[tag]=function _tagMethod(){var state=this._baseState;var args=Array.prototype.slice.call(arguments);assert(state.tag===null);state.tag=tag;this._useArgs(args);return this;};});Node.prototype.use=function use(item){assert(item);var state=this._baseState;assert(state.use===null);state.use=item;return this;};Node.prototype.optional=function optional(){var state=this._baseState;state.optional=true;return this;};Node.prototype.def=function def(val){var state=this._baseState;assert(state['default']===null);state['default']=val;state.optional=true;return this;};Node.prototype.explicit=function explicit(num){var state=this._baseState;assert(state.explicit===null&&state.implicit===null);state.explicit=num;return this;};Node.prototype.implicit=function implicit(num){var state=this._baseState;assert(state.explicit===null&&state.implicit===null);state.implicit=num;return this;};Node.prototype.obj=function obj(){var state=this._baseState;var args=Array.prototype.slice.call(arguments);state.obj=true;if(args.length!==0)this._useArgs(args);return this;};Node.prototype.key=function key(newKey){var state=this._baseState;assert(state.key===null);state.key=newKey;return this;};Node.prototype.any=function any(){var state=this._baseState;state.any=true;return this;};Node.prototype.choice=function choice(obj){var state=this._baseState;assert(state.choice===null);state.choice=obj;this._useArgs((0,_keys2.default)(obj).map(function(key){return obj[key];}));return this;};Node.prototype.contains=function contains(item){var state=this._baseState;assert(state.use===null);state.contains=item;return this;};//
// Decoding
//
Node.prototype._decode=function decode(input,options){var state=this._baseState;// Decode root node
if(state.parent===null)return input.wrapResult(state.children[0]._decode(input,options));var result=state['default'];var present=true;var prevKey=null;if(state.key!==null)prevKey=input.enterKey(state.key);// Check if tag is there
if(state.optional){var tag=null;if(state.explicit!==null)tag=state.explicit;else if(state.implicit!==null)tag=state.implicit;else if(state.tag!==null)tag=state.tag;if(tag===null&&!state.any){// Trial and Error
var save=input.save();try{if(state.choice===null)this._decodeGeneric(state.tag,input,options);else this._decodeChoice(input,options);present=true;}catch(e){present=false;}input.restore(save);}else{present=this._peekTag(input,tag,state.any);if(input.isError(present))return present;}}// Push object on stack
var prevObj;if(state.obj&&present)prevObj=input.enterObject();if(present){// Unwrap explicit values
if(state.explicit!==null){var explicit=this._decodeTag(input,state.explicit);if(input.isError(explicit))return explicit;input=explicit;}var start=input.offset;// Unwrap implicit and normal values
if(state.use===null&&state.choice===null){if(state.any)var save=input.save();var body=this._decodeTag(input,state.implicit!==null?state.implicit:state.tag,state.any);if(input.isError(body))return body;if(state.any)result=input.raw(save);else input=body;}if(options&&options.track&&state.tag!==null)options.track(input.path(),start,input.length,'tagged');if(options&&options.track&&state.tag!==null)options.track(input.path(),input.offset,input.length,'content');// Select proper method for tag
if(state.any)result=result;else if(state.choice===null)result=this._decodeGeneric(state.tag,input,options);else result=this._decodeChoice(input,options);if(input.isError(result))return result;// Decode children
if(!state.any&&state.choice===null&&state.children!==null){state.children.forEach(function decodeChildren(child){// NOTE: We are ignoring errors here, to let parser continue with other
// parts of encoded data
child._decode(input,options);});}// Decode contained/encoded by schema, only in bit or octet strings
if(state.contains&&(state.tag==='octstr'||state.tag==='bitstr')){var data=new DecoderBuffer(result);result=this._getUse(state.contains,input._reporterState.obj)._decode(data,options);}}// Pop object
if(state.obj&&present)result=input.leaveObject(prevObj);// Set key
if(state.key!==null&&(result!==null||present===true))input.leaveKey(prevKey,state.key,result);else if(prevKey!==null)input.exitKey(prevKey);return result;};Node.prototype._decodeGeneric=function decodeGeneric(tag,input,options){var state=this._baseState;if(tag==='seq'||tag==='set')return null;if(tag==='seqof'||tag==='setof')return this._decodeList(input,tag,state.args[0],options);else if(/str$/.test(tag))return this._decodeStr(input,tag,options);else if(tag==='objid'&&state.args)return this._decodeObjid(input,state.args[0],state.args[1],options);else if(tag==='objid')return this._decodeObjid(input,null,null,options);else if(tag==='gentime'||tag==='utctime')return this._decodeTime(input,tag,options);else if(tag==='null_')return this._decodeNull(input,options);else if(tag==='bool')return this._decodeBool(input,options);else if(tag==='objDesc')return this._decodeStr(input,tag,options);else if(tag==='int'||tag==='enum')return this._decodeInt(input,state.args&&state.args[0],options);if(state.use!==null){return this._getUse(state.use,input._reporterState.obj)._decode(input,options);}else{return input.error('unknown tag: '+tag);}};Node.prototype._getUse=function _getUse(entity,obj){var state=this._baseState;// Create altered use decoder if implicit is set
state.useDecoder=this._use(entity,obj);assert(state.useDecoder._baseState.parent===null);state.useDecoder=state.useDecoder._baseState.children[0];if(state.implicit!==state.useDecoder._baseState.implicit){state.useDecoder=state.useDecoder.clone();state.useDecoder._baseState.implicit=state.implicit;}return state.useDecoder;};Node.prototype._decodeChoice=function decodeChoice(input,options){var state=this._baseState;var result=null;var match=false;(0,_keys2.default)(state.choice).some(function(key){var save=input.save();var node=state.choice[key];try{var value=node._decode(input,options);if(input.isError(value))return false;result={type:key,value:value};match=true;}catch(e){input.restore(save);return false;}return true;},this);if(!match)return input.error('Choice not matched');return result;};//
// Encoding
//
Node.prototype._createEncoderBuffer=function createEncoderBuffer(data){return new EncoderBuffer(data,this.reporter);};Node.prototype._encode=function encode(data,reporter,parent){var state=this._baseState;if(state['default']!==null&&state['default']===data)return;var result=this._encodeValue(data,reporter,parent);if(result===undefined)return;if(this._skipDefault(result,reporter,parent))return;return result;};Node.prototype._encodeValue=function encode(data,reporter,parent){var state=this._baseState;// Decode root node
if(state.parent===null)return state.children[0]._encode(data,reporter||new Reporter());var result=null;// Set reporter to share it with a child class
this.reporter=reporter;// Check if data is there
if(state.optional&&data===undefined){if(state['default']!==null)data=state['default'];else return;}// Encode children first
var content=null;var primitive=false;if(state.any){// Anything that was given is translated to buffer
result=this._createEncoderBuffer(data);}else if(state.choice){result=this._encodeChoice(data,reporter);}else if(state.contains){content=this._getUse(state.contains,parent)._encode(data,reporter);primitive=true;}else if(state.children){content=state.children.map(function(child){if(child._baseState.tag==='null_')return child._encode(null,reporter,data);if(child._baseState.key===null)return reporter.error('Child should have a key');var prevKey=reporter.enterKey(child._baseState.key);if((typeof data==='undefined'?'undefined':(0,_typeof3.default)(data))!=='object')return reporter.error('Child expected, but input is not object');var res=child._encode(data[child._baseState.key],reporter,data);reporter.leaveKey(prevKey);return res;},this).filter(function(child){return child;});content=this._createEncoderBuffer(content);}else{if(state.tag==='seqof'||state.tag==='setof'){// TODO(indutny): this should be thrown on DSL level
if(!(state.args&&state.args.length===1))return reporter.error('Too many args for : '+state.tag);if(!Array.isArray(data))return reporter.error('seqof/setof, but data is not Array');var child=this.clone();child._baseState.implicit=null;content=this._createEncoderBuffer(data.map(function(item){var state=this._baseState;return this._getUse(state.args[0],data)._encode(item,reporter);},child));}else if(state.use!==null){result=this._getUse(state.use,parent)._encode(data,reporter);}else{content=this._encodePrimitive(state.tag,data);primitive=true;}}// Encode data itself
var result;if(!state.any&&state.choice===null){var tag=state.implicit!==null?state.implicit:state.tag;var cls=state.implicit===null?'universal':'context';if(tag===null){if(state.use===null)reporter.error('Tag could be ommited only for .use()');}else{if(state.use===null)result=this._encodeComposite(tag,primitive,cls,content);}}// Wrap in explicit
if(state.explicit!==null)result=this._encodeComposite(state.explicit,false,'context',result);return result;};Node.prototype._encodeChoice=function encodeChoice(data,reporter){var state=this._baseState;var node=state.choice[data.type];if(!node){assert(false,data.type+' not found in '+(0,_stringify2.default)((0,_keys2.default)(state.choice)));}return node._encode(data.value,reporter);};Node.prototype._encodePrimitive=function encodePrimitive(tag,data){var state=this._baseState;if(/str$/.test(tag))return this._encodeStr(data,tag);else if(tag==='objid'&&state.args)return this._encodeObjid(data,state.reverseArgs[0],state.args[1]);else if(tag==='objid')return this._encodeObjid(data,null,null);else if(tag==='gentime'||tag==='utctime')return this._encodeTime(data,tag);else if(tag==='null_')return this._encodeNull();else if(tag==='int'||tag==='enum')return this._encodeInt(data,state.args&&state.reverseArgs[0]);else if(tag==='bool')return this._encodeBool(data);else if(tag==='objDesc')return this._encodeStr(data,tag);else throw new Error('Unsupported tag: '+tag);};Node.prototype._isNumstr=function isNumstr(str){return /^[0-9 ]*$/.test(str);};Node.prototype._isPrintstr=function isPrintstr(str){return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(str);};/***/},/* 206 *//***/function(module,exports,__webpack_require__){var constants=__webpack_require__(93);exports.tagClass={0:'universal',1:'application',2:'context',3:'private'};exports.tagClassByName=constants._reverse(exports.tagClass);exports.tag={0x00:'end',0x01:'bool',0x02:'int',0x03:'bitstr',0x04:'octstr',0x05:'null_',0x06:'objid',0x07:'objDesc',0x08:'external',0x09:'real',0x0a:'enum',0x0b:'embed',0x0c:'utf8str',0x0d:'relativeOid',0x10:'seq',0x11:'set',0x12:'numstr',0x13:'printstr',0x14:'t61str',0x15:'videostr',0x16:'ia5str',0x17:'utctime',0x18:'gentime',0x19:'graphstr',0x1a:'iso646str',0x1b:'genstr',0x1c:'unistr',0x1d:'charstr',0x1e:'bmpstr'};exports.tagByName=constants._reverse(exports.tag);/***/},/* 207 *//***/function(module,exports,__webpack_require__){var decoders=exports;decoders.der=__webpack_require__(94);decoders.pem=__webpack_require__(208);/***/},/* 208 *//***/function(module,exports,__webpack_require__){var inherits=__webpack_require__(1);var Buffer=__webpack_require__(0).Buffer;var DERDecoder=__webpack_require__(94);function PEMDecoder(entity){DERDecoder.call(this,entity);this.enc='pem';};inherits(PEMDecoder,DERDecoder);module.exports=PEMDecoder;PEMDecoder.prototype.decode=function decode(data,options){var lines=data.toString().split(/[\r\n]+/g);var label=options.label.toUpperCase();var re=/^-----(BEGIN|END) ([^-]+)-----$/;var start=-1;var end=-1;for(var i=0;i<lines.length;i++){var match=lines[i].match(re);if(match===null)continue;if(match[2]!==label)continue;if(start===-1){if(match[1]!=='BEGIN')break;start=i;}else{if(match[1]!=='END')break;end=i;break;}}if(start===-1||end===-1)throw new Error('PEM section not found for: '+label);var base64=lines.slice(start+1,end).join('');// Remove excessive symbols
base64.replace(/[^a-z0-9\+\/=]+/gi,'');var input=new Buffer(base64,'base64');return DERDecoder.prototype.decode.call(this,input,options);};/***/},/* 209 *//***/function(module,exports,__webpack_require__){var encoders=exports;encoders.der=__webpack_require__(95);encoders.pem=__webpack_require__(210);/***/},/* 210 *//***/function(module,exports,__webpack_require__){var inherits=__webpack_require__(1);var DEREncoder=__webpack_require__(95);function PEMEncoder(entity){DEREncoder.call(this,entity);this.enc='pem';};inherits(PEMEncoder,DEREncoder);module.exports=PEMEncoder;PEMEncoder.prototype.encode=function encode(data,options){var buf=DEREncoder.prototype.encode.call(this,data);var p=buf.toString('base64');var out=['-----BEGIN '+options.label+'-----'];for(var i=0;i<p.length;i+=64){out.push(p.slice(i,i+64));}out.push('-----END '+options.label+'-----');return out.join('\n');};/***/},/* 211 *//***/function(module,exports,__webpack_require__){"use strict";// from https://github.com/Rantanen/node-dtls/blob/25a7dc861bda38cfeac93a723500eea4f0ac2e86/Certificate.js
// thanks to @Rantanen
var asn=__webpack_require__(26);var Time=asn.define('Time',function(){this.choice({utcTime:this.utctime(),generalTime:this.gentime()});});var AttributeTypeValue=asn.define('AttributeTypeValue',function(){this.seq().obj(this.key('type').objid(),this.key('value').any());});var AlgorithmIdentifier=asn.define('AlgorithmIdentifier',function(){this.seq().obj(this.key('algorithm').objid(),this.key('parameters').optional());});var SubjectPublicKeyInfo=asn.define('SubjectPublicKeyInfo',function(){this.seq().obj(this.key('algorithm').use(AlgorithmIdentifier),this.key('subjectPublicKey').bitstr());});var RelativeDistinguishedName=asn.define('RelativeDistinguishedName',function(){this.setof(AttributeTypeValue);});var RDNSequence=asn.define('RDNSequence',function(){this.seqof(RelativeDistinguishedName);});var Name=asn.define('Name',function(){this.choice({rdnSequence:this.use(RDNSequence)});});var Validity=asn.define('Validity',function(){this.seq().obj(this.key('notBefore').use(Time),this.key('notAfter').use(Time));});var Extension=asn.define('Extension',function(){this.seq().obj(this.key('extnID').objid(),this.key('critical').bool().def(false),this.key('extnValue').octstr());});var TBSCertificate=asn.define('TBSCertificate',function(){this.seq().obj(this.key('version').explicit(0).int(),this.key('serialNumber').int(),this.key('signature').use(AlgorithmIdentifier),this.key('issuer').use(Name),this.key('validity').use(Validity),this.key('subject').use(Name),this.key('subjectPublicKeyInfo').use(SubjectPublicKeyInfo),this.key('issuerUniqueID').implicit(1).bitstr().optional(),this.key('subjectUniqueID').implicit(2).bitstr().optional(),this.key('extensions').explicit(3).seqof(Extension).optional());});var X509Certificate=asn.define('X509Certificate',function(){this.seq().obj(this.key('tbsCertificate').use(TBSCertificate),this.key('signatureAlgorithm').use(AlgorithmIdentifier),this.key('signatureValue').bitstr());});module.exports=X509Certificate;/***/},/* 212 *//***/function(module,exports){module.exports={"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"/***/};},/* 213 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){// adapted from https://github.com/apatil/pemstrip
var findProc=/Proc-Type: 4,ENCRYPTED\n\r?DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)\n\r?\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?/m;var startRegex=/^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----\n/m;var fullRegex=/^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?-----END \1-----$/m;var evp=__webpack_require__(35);var ciphers=__webpack_require__(50);module.exports=function(okey,password){var key=okey.toString();var match=key.match(findProc);var decrypted;if(!match){var match2=key.match(fullRegex);decrypted=new Buffer(match2[2].replace(/\r?\n/g,''),'base64');}else{var suite='aes'+match[1];var iv=new Buffer(match[2],'hex');var cipherText=new Buffer(match[3].replace(/\r?\n/g,''),'base64');var cipherKey=evp(password,iv.slice(0,8),parseInt(match[1],10)).key;var out=[];var cipher=ciphers.createDecipheriv(suite,cipherKey,iv);out.push(cipher.update(cipherText));out.push(cipher.final());decrypted=Buffer.concat(out);}var tag=key.match(startRegex)[1];return{tag:tag,data:decrypted};};/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 214 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){// much of this based on https://github.com/indutny/self-signed/blob/gh-pages/lib/rsa.js
var BN=__webpack_require__(2);var EC=__webpack_require__(5).ec;var parseKeys=__webpack_require__(38);var curves=__webpack_require__(96);function verify(sig,hash,key,signType,tag){var pub=parseKeys(key);if(pub.type==='ec'){// rsa keys can be interpreted as ecdsa ones in openssl
if(signType!=='ecdsa'&&signType!=='ecdsa/rsa')throw new Error('wrong public key type');return ecVerify(sig,hash,pub);}else if(pub.type==='dsa'){if(signType!=='dsa')throw new Error('wrong public key type');return dsaVerify(sig,hash,pub);}else{if(signType!=='rsa'&&signType!=='ecdsa/rsa')throw new Error('wrong public key type');}hash=Buffer.concat([tag,hash]);var len=pub.modulus.byteLength();var pad=[1];var padNum=0;while(hash.length+pad.length+2<len){pad.push(0xff);padNum++;}pad.push(0x00);var i=-1;while(++i<hash.length){pad.push(hash[i]);}pad=new Buffer(pad);var red=BN.mont(pub.modulus);sig=new BN(sig).toRed(red);sig=sig.redPow(new BN(pub.publicExponent));sig=new Buffer(sig.fromRed().toArray());var out=padNum<8?1:0;len=Math.min(sig.length,pad.length);if(sig.length!==pad.length)out=1;i=-1;while(++i<len){out|=sig[i]^pad[i];}return out===0;}function ecVerify(sig,hash,pub){var curveId=curves[pub.data.algorithm.curve.join('.')];if(!curveId)throw new Error('unknown curve '+pub.data.algorithm.curve.join('.'));var curve=new EC(curveId);var pubkey=pub.data.subjectPrivateKey.data;return curve.verify(hash,sig,pubkey);}function dsaVerify(sig,hash,pub){var p=pub.data.p;var q=pub.data.q;var g=pub.data.g;var y=pub.data.pub_key;var unpacked=parseKeys.signature.decode(sig,'der');var s=unpacked.s;var r=unpacked.r;checkValue(s,q);checkValue(r,q);var montp=BN.mont(p);var w=s.invm(q);var v=g.toRed(montp).redPow(new BN(hash).mul(w).mod(q)).fromRed().mul(y.toRed(montp).redPow(r.mul(w).mod(q)).fromRed()).mod(p).mod(q);return v.cmp(r)===0;}function checkValue(b,q){if(b.cmpn(0)<=0)throw new Error('invalid sig');if(b.cmp(q)>=q)throw new Error('invalid sig');}module.exports=verify;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 215 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var elliptic=__webpack_require__(5);var BN=__webpack_require__(2);module.exports=function createECDH(curve){return new ECDH(curve);};var aliases={secp256k1:{name:'secp256k1',byteLength:32},secp224r1:{name:'p224',byteLength:28},prime256v1:{name:'p256',byteLength:32},prime192v1:{name:'p192',byteLength:24},ed25519:{name:'ed25519',byteLength:32},secp384r1:{name:'p384',byteLength:48},secp521r1:{name:'p521',byteLength:66}};aliases.p224=aliases.secp224r1;aliases.p256=aliases.secp256r1=aliases.prime256v1;aliases.p192=aliases.secp192r1=aliases.prime192v1;aliases.p384=aliases.secp384r1;aliases.p521=aliases.secp521r1;function ECDH(curve){this.curveType=aliases[curve];if(!this.curveType){this.curveType={name:curve};}this.curve=new elliptic.ec(this.curveType.name);this.keys=void 0;}ECDH.prototype.generateKeys=function(enc,format){this.keys=this.curve.genKeyPair();return this.getPublicKey(enc,format);};ECDH.prototype.computeSecret=function(other,inenc,enc){inenc=inenc||'utf8';if(!Buffer.isBuffer(other)){other=new Buffer(other,inenc);}var otherPub=this.curve.keyFromPublic(other).getPublic();var out=otherPub.mul(this.keys.getPrivate()).getX();return formatReturnValue(out,enc,this.curveType.byteLength);};ECDH.prototype.getPublicKey=function(enc,format){var key=this.keys.getPublic(format==='compressed',true);if(format==='hybrid'){if(key[key.length-1]%2){key[0]=7;}else{key[0]=6;}}return formatReturnValue(key,enc);};ECDH.prototype.getPrivateKey=function(enc){return formatReturnValue(this.keys.getPrivate(),enc);};ECDH.prototype.setPublicKey=function(pub,enc){enc=enc||'utf8';if(!Buffer.isBuffer(pub)){pub=new Buffer(pub,enc);}this.keys._importPublic(pub);return this;};ECDH.prototype.setPrivateKey=function(priv,enc){enc=enc||'utf8';if(!Buffer.isBuffer(priv)){priv=new Buffer(priv,enc);}var _priv=new BN(priv);_priv=_priv.toString(16);this.keys._importPrivate(_priv);return this;};function formatReturnValue(bn,enc,len){if(!Array.isArray(bn)){bn=bn.toArray();}var buf=new Buffer(bn);if(len&&buf.length<len){var zeros=new Buffer(len-buf.length);zeros.fill(0);buf=Buffer.concat([zeros,buf]);}if(!enc){return buf;}else{return buf.toString(enc);}}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 216 *//***/function(module,exports,__webpack_require__){exports.publicEncrypt=__webpack_require__(217);exports.privateDecrypt=__webpack_require__(218);exports.privateEncrypt=function privateEncrypt(key,buf){return exports.publicEncrypt(key,buf,true);};exports.publicDecrypt=function publicDecrypt(key,buf){return exports.privateDecrypt(key,buf,true);};/***/},/* 217 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var parseKeys=__webpack_require__(38);var randomBytes=__webpack_require__(22);var createHash=__webpack_require__(23);var mgf=__webpack_require__(97);var xor=__webpack_require__(98);var bn=__webpack_require__(2);var withPublic=__webpack_require__(99);var crt=__webpack_require__(53);var constants={RSA_PKCS1_OAEP_PADDING:4,RSA_PKCS1_PADDIN:1,RSA_NO_PADDING:3};module.exports=function publicEncrypt(public_key,msg,reverse){var padding;if(public_key.padding){padding=public_key.padding;}else if(reverse){padding=1;}else{padding=4;}var key=parseKeys(public_key);var paddedMsg;if(padding===4){paddedMsg=oaep(key,msg);}else if(padding===1){paddedMsg=pkcs1(key,msg,reverse);}else if(padding===3){paddedMsg=new bn(msg);if(paddedMsg.cmp(key.modulus)>=0){throw new Error('data too long for modulus');}}else{throw new Error('unknown padding');}if(reverse){return crt(paddedMsg,key);}else{return withPublic(paddedMsg,key);}};function oaep(key,msg){var k=key.modulus.byteLength();var mLen=msg.length;var iHash=createHash('sha1').update(new Buffer('')).digest();var hLen=iHash.length;var hLen2=2*hLen;if(mLen>k-hLen2-2){throw new Error('message too long');}var ps=new Buffer(k-mLen-hLen2-2);ps.fill(0);var dblen=k-hLen-1;var seed=randomBytes(hLen);var maskedDb=xor(Buffer.concat([iHash,ps,new Buffer([1]),msg],dblen),mgf(seed,dblen));var maskedSeed=xor(seed,mgf(maskedDb,hLen));return new bn(Buffer.concat([new Buffer([0]),maskedSeed,maskedDb],k));}function pkcs1(key,msg,reverse){var mLen=msg.length;var k=key.modulus.byteLength();if(mLen>k-11){throw new Error('message too long');}var ps;if(reverse){ps=new Buffer(k-mLen-3);ps.fill(0xff);}else{ps=nonZero(k-mLen-3);}return new bn(Buffer.concat([new Buffer([0,reverse?1:2]),ps,new Buffer([0]),msg],k));}function nonZero(len,crypto){var out=new Buffer(len);var i=0;var cache=randomBytes(len*2);var cur=0;var num;while(i<len){if(cur===cache.length){cache=randomBytes(len*2);cur=0;}num=cache[cur++];if(num){out[i++]=num;}}return out;}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 218 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(Buffer){var parseKeys=__webpack_require__(38);var mgf=__webpack_require__(97);var xor=__webpack_require__(98);var bn=__webpack_require__(2);var crt=__webpack_require__(53);var createHash=__webpack_require__(23);var withPublic=__webpack_require__(99);module.exports=function privateDecrypt(private_key,enc,reverse){var padding;if(private_key.padding){padding=private_key.padding;}else if(reverse){padding=1;}else{padding=4;}var key=parseKeys(private_key);var k=key.modulus.byteLength();if(enc.length>k||new bn(enc).cmp(key.modulus)>=0){throw new Error('decryption error');}var msg;if(reverse){msg=withPublic(new bn(enc),key);}else{msg=crt(enc,key);}var zBuffer=new Buffer(k-msg.length);zBuffer.fill(0);msg=Buffer.concat([zBuffer,msg],k);if(padding===4){return oaep(key,msg);}else if(padding===1){return pkcs1(key,msg,reverse);}else if(padding===3){return msg;}else{throw new Error('unknown padding');}};function oaep(key,msg){var n=key.modulus;var k=key.modulus.byteLength();var mLen=msg.length;var iHash=createHash('sha1').update(new Buffer('')).digest();var hLen=iHash.length;var hLen2=2*hLen;if(msg[0]!==0){throw new Error('decryption error');}var maskedSeed=msg.slice(1,hLen+1);var maskedDb=msg.slice(hLen+1);var seed=xor(maskedSeed,mgf(maskedDb,hLen));var db=xor(maskedDb,mgf(seed,k-hLen-1));if(compare(iHash,db.slice(0,hLen))){throw new Error('decryption error');}var i=hLen;while(db[i]===0){i++;}if(db[i++]!==1){throw new Error('decryption error');}return db.slice(i);}function pkcs1(key,msg,reverse){var p1=msg.slice(0,2);var i=2;var status=0;while(msg[i++]!==0){if(i>=msg.length){status++;break;}}var ps=msg.slice(2,i-1);var p2=msg.slice(i-1,i);if(p1.toString('hex')!=='0002'&&!reverse||p1.toString('hex')!=='0001'&&reverse){status++;}if(ps.length<8){status++;}if(status){throw new Error('decryption error');}return msg.slice(i);}function compare(a,b){a=new Buffer(a);b=new Buffer(b);var dif=0;var len=a.length;if(a.length!==b.length){dif++;len=Math.min(a.length,b.length);}var i=-1;while(++i<len){dif+=a[i]^b[i];}return dif;}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/},/* 219 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(process){var path=__webpack_require__(9);var fs=__webpack_require__(!function webpackMissingModule(){var e=new Error("Cannot find module \"fs\"");e.code='MODULE_NOT_FOUND';throw e;}());function Mime(){// Map of extension -> mime type
this.types=(0,_create2.default)(null);// Map of mime type -> extension
this.extensions=(0,_create2.default)(null);}/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * @param map (Object) type definitions
 */Mime.prototype.define=function(map){for(var type in map){var exts=map[type];for(var i=0;i<exts.length;i++){if(process.env.DEBUG_MIME&&this.types[exts]){console.warn(this._loading.replace(/.*\//,''),'changes "'+exts[i]+'" extension type from '+this.types[exts]+' to '+type);}this.types[exts[i]]=type;}// Default extension is the first one we encounter
if(!this.extensions[type]){this.extensions[type]=exts[0];}}};/**
 * Load an Apache2-style ".types" file
 *
 * This may be called multiple times (it's expected).  Where files declare
 * overlapping types/extensions, the last file wins.
 *
 * @param file (String) path of file to load.
 */Mime.prototype.load=function(file){this._loading=file;// Read file and split into lines
var map={},content=fs.readFileSync(file,'ascii'),lines=content.split(/[\r\n]+/);lines.forEach(function(line){// Clean up whitespace/comments, and split into fields
var fields=line.replace(/\s*#.*|^\s*|\s*$/g,'').split(/\s+/);map[fields.shift()]=fields;});this.define(map);this._loading=null;};/**
 * Lookup a mime type based on extension
 */Mime.prototype.lookup=function(path,fallback){var ext=path.replace(/.*[\.\/\\]/,'').toLowerCase();return this.types[ext]||fallback||this.default_type;};/**
 * Return file extension associated with a mime type
 */Mime.prototype.extension=function(mimeType){var type=mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();return this.extensions[type];};// Default instance
var mime=new Mime();// Define built-in types
mime.define(__webpack_require__(220));// Default type
mime.default_type=mime.lookup('bin');//
// Additional API specific to the default instance
//
mime.Mime=Mime;/**
 * Lookup a charset based on mime type.
 */mime.charsets={lookup:function lookup(mimeType,fallback){// Assume text types are utf8
return /^text\//.test(mimeType)?'UTF-8':fallback;}};module.exports=mime;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4));/***/},/* 220 *//***/function(module,exports){module.exports={"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mdp"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/font-woff":["woff"],"application/font-woff2":["woff2"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/prs.cww":["cww"],"application/pskc+xml":["pskcxml"],"application/rdf+xml":["rdf"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/voicexml+xml":["vxml"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["dmg"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-otf":["otf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-ttf":["ttf","ttc"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["iso"],"application/x-java-jnlp-file":["jnlp"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdownload":["exe","dll","com","bat","msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["wmf","wmz","emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-nzb":["nzb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["rar"],"application/x-research-info-systems":["ris"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["obj"],"application/x-ustar":["ustar"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt"],"application/x-xfig":["fig"],"application/x-xliff+xml":["xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp4":["mp4a","m4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/webm":["weba"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-wav":["wav"],"audio/xm":["xm"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"font/opentype":["otf"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/g3fax":["g3"],"image/gif":["gif"],"image/ief":["ief"],"image/jpeg":["jpeg","jpg","jpe"],"image/ktx":["ktx"],"image/png":["png"],"image/prs.btif":["btif"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/tiff":["tiff","tif"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/webp":["webp"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["ico"],"image/x-mrsid-image":["sid"],"image/x-pcx":["pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/rfc822":["eml","mime"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.vtu":["vtu"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["x3db","x3dbz"],"model/x3d+vrml":["x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee"],"text/css":["css"],"text/csv":["csv"],"text/hjson":["hjson"],"text/html":["html","htm"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/prs.lines.tag":["dsc"],"text/richtext":["rtx"],"text/sgml":["sgml","sgm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/vtt":["vtt"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["markdown","md","mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-pascal":["p","pas"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/webm":["webm"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]/***/};},/* 221 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global,process){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var formatRegExp=/%[sdj%]/g;exports.format=function(f){if(!isString(f)){var objects=[];for(var i=0;i<arguments.length;i++){objects.push(inspect(arguments[i]));}return objects.join(' ');}var i=1;var args=arguments;var len=args.length;var str=String(f).replace(formatRegExp,function(x){if(x==='%%')return'%';if(i>=len)return x;switch(x){case'%s':return String(args[i++]);case'%d':return Number(args[i++]);case'%j':try{return(0,_stringify2.default)(args[i++]);}catch(_){return'[Circular]';}default:return x;}});for(var x=args[i];i<len;x=args[++i]){if(isNull(x)||!isObject(x)){str+=' '+x;}else{str+=' '+inspect(x);}}return str;};// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate=function(fn,msg){// Allow for deprecating things in the process of starting up.
if(isUndefined(global.process)){return function(){return exports.deprecate(fn,msg).apply(this,arguments);};}if(process.noDeprecation===true){return fn;}var warned=false;function deprecated(){if(!warned){if(process.throwDeprecation){throw new Error(msg);}else if(process.traceDeprecation){console.trace(msg);}else{console.error(msg);}warned=true;}return fn.apply(this,arguments);}return deprecated;};var debugs={};var debugEnviron;exports.debuglog=function(set){if(isUndefined(debugEnviron))debugEnviron=process.env.NODE_DEBUG||'';set=set.toUpperCase();if(!debugs[set]){if(new RegExp('\\b'+set+'\\b','i').test(debugEnviron)){var pid=process.pid;debugs[set]=function(){var msg=exports.format.apply(exports,arguments);console.error('%s %d: %s',set,pid,msg);};}else{debugs[set]=function(){};}}return debugs[set];};/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 *//* legacy: obj, showHidden, depth, colors*/function inspect(obj,opts){// default options
var ctx={seen:[],stylize:stylizeNoColor};// legacy...
if(arguments.length>=3)ctx.depth=arguments[2];if(arguments.length>=4)ctx.colors=arguments[3];if(isBoolean(opts)){// legacy...
ctx.showHidden=opts;}else if(opts){// got an "options" object
exports._extend(ctx,opts);}// set default options
if(isUndefined(ctx.showHidden))ctx.showHidden=false;if(isUndefined(ctx.depth))ctx.depth=2;if(isUndefined(ctx.colors))ctx.colors=false;if(isUndefined(ctx.customInspect))ctx.customInspect=true;if(ctx.colors)ctx.stylize=stylizeWithColor;return formatValue(ctx,obj,ctx.depth);}exports.inspect=inspect;// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors={'bold':[1,22],'italic':[3,23],'underline':[4,24],'inverse':[7,27],'white':[37,39],'grey':[90,39],'black':[30,39],'blue':[34,39],'cyan':[36,39],'green':[32,39],'magenta':[35,39],'red':[31,39],'yellow':[33,39]};// Don't use 'blue' not visible on cmd.exe
inspect.styles={'special':'cyan','number':'yellow','boolean':'yellow','undefined':'grey','null':'bold','string':'green','date':'magenta',// "name": intentionally not styling
'regexp':'red'};function stylizeWithColor(str,styleType){var style=inspect.styles[styleType];if(style){return'\x1B['+inspect.colors[style][0]+'m'+str+'\x1B['+inspect.colors[style][1]+'m';}else{return str;}}function stylizeNoColor(str,styleType){return str;}function arrayToHash(array){var hash={};array.forEach(function(val,idx){hash[val]=true;});return hash;}function formatValue(ctx,value,recurseTimes){// Provide a hook for user-specified inspect functions.
// Check that value is an object with an inspect function on it
if(ctx.customInspect&&value&&isFunction(value.inspect)&&// Filter out the util module, it's inspect function is special
value.inspect!==exports.inspect&&// Also filter out any prototype objects using the circular check.
!(value.constructor&&value.constructor.prototype===value)){var ret=value.inspect(recurseTimes,ctx);if(!isString(ret)){ret=formatValue(ctx,ret,recurseTimes);}return ret;}// Primitive types cannot have properties
var primitive=formatPrimitive(ctx,value);if(primitive){return primitive;}// Look up the keys of the object.
var keys=(0,_keys2.default)(value);var visibleKeys=arrayToHash(keys);if(ctx.showHidden){keys=(0,_getOwnPropertyNames2.default)(value);}// IE doesn't make error fields non-enumerable
// http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
if(isError(value)&&(keys.indexOf('message')>=0||keys.indexOf('description')>=0)){return formatError(value);}// Some type of object without properties can be shortcutted.
if(keys.length===0){if(isFunction(value)){var name=value.name?': '+value.name:'';return ctx.stylize('[Function'+name+']','special');}if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}if(isDate(value)){return ctx.stylize(Date.prototype.toString.call(value),'date');}if(isError(value)){return formatError(value);}}var base='',array=false,braces=['{','}'];// Make Array say that they are Array
if(isArray(value)){array=true;braces=['[',']'];}// Make functions say that they are functions
if(isFunction(value)){var n=value.name?': '+value.name:'';base=' [Function'+n+']';}// Make RegExps say that they are RegExps
if(isRegExp(value)){base=' '+RegExp.prototype.toString.call(value);}// Make dates with properties first say the date
if(isDate(value)){base=' '+Date.prototype.toUTCString.call(value);}// Make error with message first say the error
if(isError(value)){base=' '+formatError(value);}if(keys.length===0&&(!array||value.length==0)){return braces[0]+base+braces[1];}if(recurseTimes<0){if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}else{return ctx.stylize('[Object]','special');}}ctx.seen.push(value);var output;if(array){output=formatArray(ctx,value,recurseTimes,visibleKeys,keys);}else{output=keys.map(function(key){return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array);});}ctx.seen.pop();return reduceToSingleString(output,base,braces);}function formatPrimitive(ctx,value){if(isUndefined(value))return ctx.stylize('undefined','undefined');if(isString(value)){var simple='\''+(0,_stringify2.default)(value).replace(/^"|"$/g,'').replace(/'/g,"\\'").replace(/\\"/g,'"')+'\'';return ctx.stylize(simple,'string');}if(isNumber(value))return ctx.stylize(''+value,'number');if(isBoolean(value))return ctx.stylize(''+value,'boolean');// For some reason typeof null is "object", so special case here.
if(isNull(value))return ctx.stylize('null','null');}function formatError(value){return'['+Error.prototype.toString.call(value)+']';}function formatArray(ctx,value,recurseTimes,visibleKeys,keys){var output=[];for(var i=0,l=value.length;i<l;++i){if(hasOwnProperty(value,String(i))){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,String(i),true));}else{output.push('');}}keys.forEach(function(key){if(!key.match(/^\d+$/)){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,key,true));}});return output;}function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){var name,str,desc;desc=(0,_getOwnPropertyDescriptor2.default)(value,key)||{value:value[key]};if(desc.get){if(desc.set){str=ctx.stylize('[Getter/Setter]','special');}else{str=ctx.stylize('[Getter]','special');}}else{if(desc.set){str=ctx.stylize('[Setter]','special');}}if(!hasOwnProperty(visibleKeys,key)){name='['+key+']';}if(!str){if(ctx.seen.indexOf(desc.value)<0){if(isNull(recurseTimes)){str=formatValue(ctx,desc.value,null);}else{str=formatValue(ctx,desc.value,recurseTimes-1);}if(str.indexOf('\n')>-1){if(array){str=str.split('\n').map(function(line){return'  '+line;}).join('\n').substr(2);}else{str='\n'+str.split('\n').map(function(line){return'   '+line;}).join('\n');}}}else{str=ctx.stylize('[Circular]','special');}}if(isUndefined(name)){if(array&&key.match(/^\d+$/)){return str;}name=(0,_stringify2.default)(''+key);if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){name=name.substr(1,name.length-2);name=ctx.stylize(name,'name');}else{name=name.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");name=ctx.stylize(name,'string');}}return name+': '+str;}function reduceToSingleString(output,base,braces){var numLinesEst=0;var length=output.reduce(function(prev,cur){numLinesEst++;if(cur.indexOf('\n')>=0)numLinesEst++;return prev+cur.replace(/\u001b\[\d\d?m/g,'').length+1;},0);if(length>60){return braces[0]+(base===''?'':base+'\n ')+' '+output.join(',\n  ')+' '+braces[1];}return braces[0]+base+' '+output.join(', ')+' '+braces[1];}// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar){return Array.isArray(ar);}exports.isArray=isArray;function isBoolean(arg){return typeof arg==='boolean';}exports.isBoolean=isBoolean;function isNull(arg){return arg===null;}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null;}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==='number';}exports.isNumber=isNumber;function isString(arg){return typeof arg==='string';}exports.isString=isString;function isSymbol(arg){return(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='symbol';}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0;}exports.isUndefined=isUndefined;function isRegExp(re){return isObject(re)&&objectToString(re)==='[object RegExp]';}exports.isRegExp=isRegExp;function isObject(arg){return(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='object'&&arg!==null;}exports.isObject=isObject;function isDate(d){return isObject(d)&&objectToString(d)==='[object Date]';}exports.isDate=isDate;function isError(e){return isObject(e)&&(objectToString(e)==='[object Error]'||e instanceof Error);}exports.isError=isError;function isFunction(arg){return typeof arg==='function';}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==='boolean'||typeof arg==='number'||typeof arg==='string'||(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='symbol'||// ES6 symbol
typeof arg==='undefined';}exports.isPrimitive=isPrimitive;exports.isBuffer=__webpack_require__(222);function objectToString(o){return Object.prototype.toString.call(o);}function pad(n){return n<10?'0'+n.toString(10):n.toString(10);}var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];// 26 Feb 16:19:34
function timestamp(){var d=new Date();var time=[pad(d.getHours()),pad(d.getMinutes()),pad(d.getSeconds())].join(':');return[d.getDate(),months[d.getMonth()],time].join(' ');}// log is just a thin wrapper to console.log that prepends a timestamp
exports.log=function(){console.log('%s - %s',timestamp(),exports.format.apply(exports,arguments));};/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */exports.inherits=__webpack_require__(223);exports._extend=function(origin,add){// Don't do anything if add isn't an object
if(!add||!isObject(add))return origin;var keys=(0,_keys2.default)(add);var i=keys.length;while(i--){origin[keys[i]]=add[keys[i]];}return origin;};function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(6),__webpack_require__(4));/***/},/* 222 *//***/function(module,exports){module.exports=function isBuffer(arg){return arg&&(typeof arg==='undefined'?'undefined':(0,_typeof3.default)(arg))==='object'&&typeof arg.copy==='function'&&typeof arg.fill==='function'&&typeof arg.readUInt8==='function';};/***/},/* 223 *//***/function(module,exports){if(typeof _create2.default==='function'){// implementation from standard node.js 'util' module
module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=(0,_create2.default)(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}});};}else{// old school shim for old browsers
module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function TempCtor(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor();ctor.prototype.constructor=ctor;};}/***/},/* 224 *//***/function(module,exports){/*!
 * forwarded
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 */module.exports=forwarded;/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 *
 * @param {Object} req
 * @api public
 */function forwarded(req){if(!req){throw new TypeError('argument req is required');}// simple header parsing
var proxyAddrs=(req.headers['x-forwarded-for']||'').split(/ *, */).filter(Boolean).reverse();var socketAddr=req.connection.remoteAddress;var addrs=[socketAddr].concat(proxyAddrs);// return all addresses
return addrs;}/***/},/* 225 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(module){(function(){var expandIPv6,ipaddr,ipv4Part,ipv4Regexes,ipv6Part,ipv6Regexes,matchCIDR,root;ipaddr={};root=this;if(typeof module!=="undefined"&&module!==null&&module.exports){module.exports=ipaddr;}else{root['ipaddr']=ipaddr;}matchCIDR=function matchCIDR(first,second,partSize,cidrBits){var part,shift;if(first.length!==second.length){throw new Error("ipaddr: cannot match CIDR for objects with different lengths");}part=0;while(cidrBits>0){shift=partSize-cidrBits;if(shift<0){shift=0;}if(first[part]>>shift!==second[part]>>shift){return false;}cidrBits-=partSize;part+=1;}return true;};ipaddr.subnetMatch=function(address,rangeList,defaultName){var k,len,rangeName,rangeSubnets,subnet;if(defaultName==null){defaultName='unicast';}for(rangeName in rangeList){rangeSubnets=rangeList[rangeName];if(rangeSubnets[0]&&!(rangeSubnets[0]instanceof Array)){rangeSubnets=[rangeSubnets];}for(k=0,len=rangeSubnets.length;k<len;k++){subnet=rangeSubnets[k];if(address.match.apply(address,subnet)){return rangeName;}}}return defaultName;};ipaddr.IPv4=function(){function IPv4(octets){var k,len,octet;if(octets.length!==4){throw new Error("ipaddr: ipv4 octet count should be 4");}for(k=0,len=octets.length;k<len;k++){octet=octets[k];if(!(0<=octet&&octet<=255)){throw new Error("ipaddr: ipv4 octet should fit in 8 bits");}}this.octets=octets;}IPv4.prototype.kind=function(){return'ipv4';};IPv4.prototype.toString=function(){return this.octets.join(".");};IPv4.prototype.toByteArray=function(){return this.octets.slice(0);};IPv4.prototype.match=function(other,cidrRange){var ref;if(cidrRange===void 0){ref=other,other=ref[0],cidrRange=ref[1];}if(other.kind()!=='ipv4'){throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");}return matchCIDR(this.octets,other.octets,8,cidrRange);};IPv4.prototype.SpecialRanges={unspecified:[[new IPv4([0,0,0,0]),8]],broadcast:[[new IPv4([255,255,255,255]),32]],multicast:[[new IPv4([224,0,0,0]),4]],linkLocal:[[new IPv4([169,254,0,0]),16]],loopback:[[new IPv4([127,0,0,0]),8]],carrierGradeNat:[[new IPv4([100,64,0,0]),10]],"private":[[new IPv4([10,0,0,0]),8],[new IPv4([172,16,0,0]),12],[new IPv4([192,168,0,0]),16]],reserved:[[new IPv4([192,0,0,0]),24],[new IPv4([192,0,2,0]),24],[new IPv4([192,88,99,0]),24],[new IPv4([198,51,100,0]),24],[new IPv4([203,0,113,0]),24],[new IPv4([240,0,0,0]),4]]};IPv4.prototype.range=function(){return ipaddr.subnetMatch(this,this.SpecialRanges);};IPv4.prototype.toIPv4MappedAddress=function(){return ipaddr.IPv6.parse("::ffff:"+this.toString());};IPv4.prototype.prefixLengthFromSubnetMask=function(){var cidr,i,k,octet,stop,zeros,zerotable;zerotable={0:8,128:7,192:6,224:5,240:4,248:3,252:2,254:1,255:0};cidr=0;stop=false;for(i=k=3;k>=0;i=k+=-1){octet=this.octets[i];if(octet in zerotable){zeros=zerotable[octet];if(stop&&zeros!==0){return null;}if(zeros!==8){stop=true;}cidr+=zeros;}else{return null;}}return 32-cidr;};return IPv4;}();ipv4Part="(0?\\d+|0x[a-f0-9]+)";ipv4Regexes={fourOctet:new RegExp("^"+ipv4Part+"\\."+ipv4Part+"\\."+ipv4Part+"\\."+ipv4Part+"$",'i'),longValue:new RegExp("^"+ipv4Part+"$",'i')};ipaddr.IPv4.parser=function(string){var match,parseIntAuto,part,shift,value;parseIntAuto=function parseIntAuto(string){if(string[0]==="0"&&string[1]!=="x"){return parseInt(string,8);}else{return parseInt(string);}};if(match=string.match(ipv4Regexes.fourOctet)){return function(){var k,len,ref,results;ref=match.slice(1,6);results=[];for(k=0,len=ref.length;k<len;k++){part=ref[k];results.push(parseIntAuto(part));}return results;}();}else if(match=string.match(ipv4Regexes.longValue)){value=parseIntAuto(match[1]);if(value>0xffffffff||value<0){throw new Error("ipaddr: address outside defined range");}return function(){var k,results;results=[];for(shift=k=0;k<=24;shift=k+=8){results.push(value>>shift&0xff);}return results;}().reverse();}else{return null;}};ipaddr.IPv6=function(){function IPv6(parts){var i,k,l,len,part,ref;if(parts.length===16){this.parts=[];for(i=k=0;k<=14;i=k+=2){this.parts.push(parts[i]<<8|parts[i+1]);}}else if(parts.length===8){this.parts=parts;}else{throw new Error("ipaddr: ipv6 part count should be 8 or 16");}ref=this.parts;for(l=0,len=ref.length;l<len;l++){part=ref[l];if(!(0<=part&&part<=0xffff)){throw new Error("ipaddr: ipv6 part should fit in 16 bits");}}}IPv6.prototype.kind=function(){return'ipv6';};IPv6.prototype.toString=function(){var compactStringParts,k,len,part,pushPart,state,stringParts;stringParts=function(){var k,len,ref,results;ref=this.parts;results=[];for(k=0,len=ref.length;k<len;k++){part=ref[k];results.push(part.toString(16));}return results;}.call(this);compactStringParts=[];pushPart=function pushPart(part){return compactStringParts.push(part);};state=0;for(k=0,len=stringParts.length;k<len;k++){part=stringParts[k];switch(state){case 0:if(part==='0'){pushPart('');}else{pushPart(part);}state=1;break;case 1:if(part==='0'){state=2;}else{pushPart(part);}break;case 2:if(part!=='0'){pushPart('');pushPart(part);state=3;}break;case 3:pushPart(part);}}if(state===2){pushPart('');pushPart('');}return compactStringParts.join(":");};IPv6.prototype.toByteArray=function(){var bytes,k,len,part,ref;bytes=[];ref=this.parts;for(k=0,len=ref.length;k<len;k++){part=ref[k];bytes.push(part>>8);bytes.push(part&0xff);}return bytes;};IPv6.prototype.toNormalizedString=function(){var part;return function(){var k,len,ref,results;ref=this.parts;results=[];for(k=0,len=ref.length;k<len;k++){part=ref[k];results.push(part.toString(16));}return results;}.call(this).join(":");};IPv6.prototype.match=function(other,cidrRange){var ref;if(cidrRange===void 0){ref=other,other=ref[0],cidrRange=ref[1];}if(other.kind()!=='ipv6'){throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");}return matchCIDR(this.parts,other.parts,16,cidrRange);};IPv6.prototype.SpecialRanges={unspecified:[new IPv6([0,0,0,0,0,0,0,0]),128],linkLocal:[new IPv6([0xfe80,0,0,0,0,0,0,0]),10],multicast:[new IPv6([0xff00,0,0,0,0,0,0,0]),8],loopback:[new IPv6([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new IPv6([0xfc00,0,0,0,0,0,0,0]),7],ipv4Mapped:[new IPv6([0,0,0,0,0,0xffff,0,0]),96],rfc6145:[new IPv6([0,0,0,0,0xffff,0,0,0]),96],rfc6052:[new IPv6([0x64,0xff9b,0,0,0,0,0,0]),96],'6to4':[new IPv6([0x2002,0,0,0,0,0,0,0]),16],teredo:[new IPv6([0x2001,0,0,0,0,0,0,0]),32],reserved:[[new IPv6([0x2001,0xdb8,0,0,0,0,0,0]),32]]};IPv6.prototype.range=function(){return ipaddr.subnetMatch(this,this.SpecialRanges);};IPv6.prototype.isIPv4MappedAddress=function(){return this.range()==='ipv4Mapped';};IPv6.prototype.toIPv4Address=function(){var high,low,ref;if(!this.isIPv4MappedAddress()){throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");}ref=this.parts.slice(-2),high=ref[0],low=ref[1];return new ipaddr.IPv4([high>>8,high&0xff,low>>8,low&0xff]);};return IPv6;}();ipv6Part="(?:[0-9a-f]+::?)+";ipv6Regexes={"native":new RegExp("^(::)?("+ipv6Part+")?([0-9a-f]+)?(::)?$",'i'),transitional:new RegExp("^((?:"+ipv6Part+")|(?:::)(?:"+ipv6Part+")?)"+(ipv4Part+"\\."+ipv4Part+"\\."+ipv4Part+"\\."+ipv4Part+"$"),'i')};expandIPv6=function expandIPv6(string,parts){var colonCount,lastColon,part,replacement,replacementCount;if(string.indexOf('::')!==string.lastIndexOf('::')){return null;}colonCount=0;lastColon=-1;while((lastColon=string.indexOf(':',lastColon+1))>=0){colonCount++;}if(string.substr(0,2)==='::'){colonCount--;}if(string.substr(-2,2)==='::'){colonCount--;}if(colonCount>parts){return null;}replacementCount=parts-colonCount;replacement=':';while(replacementCount--){replacement+='0:';}string=string.replace('::',replacement);if(string[0]===':'){string=string.slice(1);}if(string[string.length-1]===':'){string=string.slice(0,-1);}return function(){var k,len,ref,results;ref=string.split(":");results=[];for(k=0,len=ref.length;k<len;k++){part=ref[k];results.push(parseInt(part,16));}return results;}();};ipaddr.IPv6.parser=function(string){var k,len,match,octet,octets,parts;if(string.match(ipv6Regexes['native'])){return expandIPv6(string,8);}else if(match=string.match(ipv6Regexes['transitional'])){parts=expandIPv6(match[1].slice(0,-1),6);if(parts){octets=[parseInt(match[2]),parseInt(match[3]),parseInt(match[4]),parseInt(match[5])];for(k=0,len=octets.length;k<len;k++){octet=octets[k];if(!(0<=octet&&octet<=255)){return null;}}parts.push(octets[0]<<8|octets[1]);parts.push(octets[2]<<8|octets[3]);return parts;}}return null;};ipaddr.IPv4.isIPv4=ipaddr.IPv6.isIPv6=function(string){return this.parser(string)!==null;};ipaddr.IPv4.isValid=function(string){var e;try{new this(this.parser(string));return true;}catch(error1){e=error1;return false;}};ipaddr.IPv4.isValidFourPartDecimal=function(string){if(ipaddr.IPv4.isValid(string)&&string.match(/^\d+(\.\d+){3}$/)){return true;}else{return false;}};ipaddr.IPv6.isValid=function(string){var e;if(typeof string==="string"&&string.indexOf(":")===-1){return false;}try{new this(this.parser(string));return true;}catch(error1){e=error1;return false;}};ipaddr.IPv4.parse=ipaddr.IPv6.parse=function(string){var parts;parts=this.parser(string);if(parts===null){throw new Error("ipaddr: string is not formatted like ip address");}return new this(parts);};ipaddr.IPv4.parseCIDR=function(string){var maskLength,match;if(match=string.match(/^(.+)\/(\d+)$/)){maskLength=parseInt(match[2]);if(maskLength>=0&&maskLength<=32){return[this.parse(match[1]),maskLength];}}throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");};ipaddr.IPv4.subnetMaskFromPrefixLength=function(prefix){var j,octets;if(prefix<0||prefix>32){throw new Error('ipaddr: invalid prefix length');}octets=Array(4).fill(0);j=0;while(j<Math.floor(prefix/8)){octets[j]=255;j++;}octets[Math.floor(prefix/8)]=Math.pow(2,prefix%8)-1<<8-prefix%8;return new ipaddr.IPv4(octets);};ipaddr.IPv4.broadcastAddressFromCIDR=function(string){var error,i,ipInterface,octets,subnetMask;try{ipInterface=ipaddr.IPv4.parseCIDR(string)[0];subnetMask=this.subnetMaskFromPrefixLength([ipaddr.IPv4.parseCIDR(string)[1]]);octets=[];i=0;while(i<4){octets.push(parseInt(ipInterface.octets[i],10)|parseInt(subnetMask.octets[i],10)^255);i++;}return new ipaddr.IPv4(octets);}catch(error1){error=error1;throw new Error('ipaddr: the address does not have IPv4 CIDR format');}};ipaddr.IPv4.networkAddressFromCIDR=function(string){var error,i,ipInterface,octets,subnetMask;try{ipInterface=ipaddr.IPv4.parseCIDR(string)[0];subnetMask=this.subnetMaskFromPrefixLength([ipaddr.IPv4.parseCIDR(string)[1]]);octets=[];i=0;while(i<4){octets.push(parseInt(ipInterface.octets[i],10)&parseInt(subnetMask.octets[i],10));i++;}return new ipaddr.IPv4(octets);}catch(error1){error=error1;throw new Error('ipaddr: the address does not have IPv4 CIDR format');}};ipaddr.IPv6.parseCIDR=function(string){var maskLength,match;if(match=string.match(/^(.+)\/(\d+)$/)){maskLength=parseInt(match[2]);if(maskLength>=0&&maskLength<=128){return[this.parse(match[1]),maskLength];}}throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");};ipaddr.isValid=function(string){return ipaddr.IPv6.isValid(string)||ipaddr.IPv4.isValid(string);};ipaddr.parse=function(string){if(ipaddr.IPv6.isValid(string)){return ipaddr.IPv6.parse(string);}else if(ipaddr.IPv4.isValid(string)){return ipaddr.IPv4.parse(string);}else{throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");}};ipaddr.parseCIDR=function(string){var e;try{return ipaddr.IPv6.parseCIDR(string);}catch(error1){e=error1;try{return ipaddr.IPv4.parseCIDR(string);}catch(error1){e=error1;throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");}}};ipaddr.fromByteArray=function(bytes){var length;length=bytes.length;if(length===4){return new ipaddr.IPv4(bytes);}else if(length===16){return new ipaddr.IPv6(bytes);}else{throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");}};ipaddr.process=function(string){var addr;addr=this.parse(string);if(addr.kind()==='ipv6'&&addr.isIPv4MappedAddress()){return addr.toIPv4Address();}else{return addr;}};}).call(this);/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(41)(module));/***/},/* 226 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var accepts=__webpack_require__(227);var deprecate=__webpack_require__(12)('express');var isIP=__webpack_require__(!function webpackMissingModule(){var e=new Error("Cannot find module \"net\"");e.code='MODULE_NOT_FOUND';throw e;}()).isIP;var typeis=__webpack_require__(235);var http=__webpack_require__(43);var fresh=__webpack_require__(100);var parseRange=__webpack_require__(101);var parse=__webpack_require__(19);var proxyaddr=__webpack_require__(102);/**
 * Request prototype.
 * @public
 */var req=(0,_create2.default)(http.IncomingMessage.prototype);/**
 * Module exports.
 * @public
 */module.exports=req;/**
 * Return request header.
 *
 * The `Referrer` header field is special-cased,
 * both `Referrer` and `Referer` are interchangeable.
 *
 * Examples:
 *
 *     req.get('Content-Type');
 *     // => "text/plain"
 *
 *     req.get('content-type');
 *     // => "text/plain"
 *
 *     req.get('Something');
 *     // => undefined
 *
 * Aliased as `req.header()`.
 *
 * @param {String} name
 * @return {String}
 * @public
 */req.get=req.header=function header(name){if(!name){throw new TypeError('name argument is required to req.get');}if(typeof name!=='string'){throw new TypeError('name must be a string to req.get');}var lc=name.toLowerCase();switch(lc){case'referer':case'referrer':return this.headers.referrer||this.headers.referer;default:return this.headers[lc];}};/**
 * To do: update docs.
 *
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single MIME type string
 * such as "application/json", an extension name
 * such as "json", a comma-delimited list such as "json, html, text/plain",
 * an argument list such as `"json", "html", "text/plain"`,
 * or an array `["json", "html", "text/plain"]`. When a list
 * or array is given, the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     req.accepts('html');
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     req.accepts('html');
 *     // => "html"
 *     req.accepts('text/html');
 *     // => "text/html"
 *     req.accepts('json, text');
 *     // => "json"
 *     req.accepts('application/json');
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     req.accepts('image/png');
 *     req.accepts('png');
 *     // => undefined
 *
 *     // Accept: text/*;q=.5, application/json
 *     req.accepts(['html', 'json']);
 *     req.accepts('html', 'json');
 *     req.accepts('html, json');
 *     // => "json"
 *
 * @param {String|Array} type(s)
 * @return {String|Array|Boolean}
 * @public
 */req.accepts=function(){var accept=accepts(this);return accept.types.apply(accept,arguments);};/**
 * Check if the given `encoding`s are accepted.
 *
 * @param {String} ...encoding
 * @return {String|Array}
 * @public
 */req.acceptsEncodings=function(){var accept=accepts(this);return accept.encodings.apply(accept,arguments);};req.acceptsEncoding=deprecate.function(req.acceptsEncodings,'req.acceptsEncoding: Use acceptsEncodings instead');/**
 * Check if the given `charset`s are acceptable,
 * otherwise you should respond with 406 "Not Acceptable".
 *
 * @param {String} ...charset
 * @return {String|Array}
 * @public
 */req.acceptsCharsets=function(){var accept=accepts(this);return accept.charsets.apply(accept,arguments);};req.acceptsCharset=deprecate.function(req.acceptsCharsets,'req.acceptsCharset: Use acceptsCharsets instead');/**
 * Check if the given `lang`s are acceptable,
 * otherwise you should respond with 406 "Not Acceptable".
 *
 * @param {String} ...lang
 * @return {String|Array}
 * @public
 */req.acceptsLanguages=function(){var accept=accepts(this);return accept.languages.apply(accept,arguments);};req.acceptsLanguage=deprecate.function(req.acceptsLanguages,'req.acceptsLanguage: Use acceptsLanguages instead');/**
 * Parse Range header field, capping to the given `size`.
 *
 * Unspecified ranges such as "0-" require knowledge of your resource length. In
 * the case of a byte range this is of course the total number of bytes. If the
 * Range header field is not given `undefined` is returned, `-1` when unsatisfiable,
 * and `-2` when syntactically invalid.
 *
 * When ranges are returned, the array has a "type" property which is the type of
 * range that is required (most commonly, "bytes"). Each array element is an object
 * with a "start" and "end" property for the portion of the range.
 *
 * The "combine" option can be set to `true` and overlapping & adjacent ranges
 * will be combined into a single range.
 *
 * NOTE: remember that ranges are inclusive, so for example "Range: users=0-3"
 * should respond with 4 users when available, not 3.
 *
 * @param {number} size
 * @param {object} [options]
 * @param {boolean} [options.combine=false]
 * @return {number|array}
 * @public
 */req.range=function range(size,options){var range=this.get('Range');if(!range)return;return parseRange(size,range,options);};/**
 * Return the value of param `name` when present or `defaultValue`.
 *
 *  - Checks route placeholders, ex: _/user/:id_
 *  - Checks body params, ex: id=12, {"id":12}
 *  - Checks query string params, ex: ?id=12
 *
 * To utilize request bodies, `req.body`
 * should be an object. This can be done by using
 * the `bodyParser()` middleware.
 *
 * @param {String} name
 * @param {Mixed} [defaultValue]
 * @return {String}
 * @public
 */req.param=function param(name,defaultValue){var params=this.params||{};var body=this.body||{};var query=this.query||{};var args=arguments.length===1?'name':'name, default';deprecate('req.param('+args+'): Use req.params, req.body, or req.query instead');if(null!=params[name]&&params.hasOwnProperty(name))return params[name];if(null!=body[name])return body[name];if(null!=query[name])return query[name];return defaultValue;};/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains the give mime `type`.
 *
 * Examples:
 *
 *      // With Content-Type: text/html; charset=utf-8
 *      req.is('html');
 *      req.is('text/html');
 *      req.is('text/*');
 *      // => true
 *
 *      // When Content-Type is application/json
 *      req.is('json');
 *      req.is('application/json');
 *      req.is('application/*');
 *      // => true
 *
 *      req.is('html');
 *      // => false
 *
 * @param {String|Array} types...
 * @return {String|false|null}
 * @public
 */req.is=function is(types){var arr=types;// support flattened arguments
if(!Array.isArray(types)){arr=new Array(arguments.length);for(var i=0;i<arr.length;i++){arr[i]=arguments[i];}}return typeis(this,arr);};/**
 * Return the protocol string "http" or "https"
 * when requested with TLS. When the "trust proxy"
 * setting trusts the socket address, the
 * "X-Forwarded-Proto" header field will be trusted
 * and used if present.
 *
 * If you're running behind a reverse proxy that
 * supplies https for you this may be enabled.
 *
 * @return {String}
 * @public
 */defineGetter(req,'protocol',function protocol(){var proto=this.connection.encrypted?'https':'http';var trust=this.app.get('trust proxy fn');if(!trust(this.connection.remoteAddress,0)){return proto;}// Note: X-Forwarded-Proto is normally only ever a
//       single value, but this is to be safe.
proto=this.get('X-Forwarded-Proto')||proto;return proto.split(/\s*,\s*/)[0];});/**
 * Short-hand for:
 *
 *    req.protocol === 'https'
 *
 * @return {Boolean}
 * @public
 */defineGetter(req,'secure',function secure(){return this.protocol==='https';});/**
 * Return the remote address from the trusted proxy.
 *
 * The is the remote address on the socket unless
 * "trust proxy" is set.
 *
 * @return {String}
 * @public
 */defineGetter(req,'ip',function ip(){var trust=this.app.get('trust proxy fn');return proxyaddr(this,trust);});/**
 * When "trust proxy" is set, trusted proxy addresses + client.
 *
 * For example if the value were "client, proxy1, proxy2"
 * you would receive the array `["client", "proxy1", "proxy2"]`
 * where "proxy2" is the furthest down-stream and "proxy1" and
 * "proxy2" were trusted.
 *
 * @return {Array}
 * @public
 */defineGetter(req,'ips',function ips(){var trust=this.app.get('trust proxy fn');var addrs=proxyaddr.all(this,trust);// reverse the order (to farthest -> closest)
// and remove socket address
addrs.reverse().pop();return addrs;});/**
 * Return subdomains as an array.
 *
 * Subdomains are the dot-separated parts of the host before the main domain of
 * the app. By default, the domain of the app is assumed to be the last two
 * parts of the host. This can be changed by setting "subdomain offset".
 *
 * For example, if the domain is "tobi.ferrets.example.com":
 * If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
 * If "subdomain offset" is 3, req.subdomains is `["tobi"]`.
 *
 * @return {Array}
 * @public
 */defineGetter(req,'subdomains',function subdomains(){var hostname=this.hostname;if(!hostname)return[];var offset=this.app.get('subdomain offset');var subdomains=!isIP(hostname)?hostname.split('.').reverse():[hostname];return subdomains.slice(offset);});/**
 * Short-hand for `url.parse(req.url).pathname`.
 *
 * @return {String}
 * @public
 */defineGetter(req,'path',function path(){return parse(this).pathname;});/**
 * Parse the "Host" header field to a hostname.
 *
 * When the "trust proxy" setting trusts the socket
 * address, the "X-Forwarded-Host" header field will
 * be trusted.
 *
 * @return {String}
 * @public
 */defineGetter(req,'hostname',function hostname(){var trust=this.app.get('trust proxy fn');var host=this.get('X-Forwarded-Host');if(!host||!trust(this.connection.remoteAddress,0)){host=this.get('Host');}if(!host)return;// IPv6 literal support
var offset=host[0]==='['?host.indexOf(']')+1:0;var index=host.indexOf(':',offset);return index!==-1?host.substring(0,index):host;});// TODO: change req.host to return host in next major
defineGetter(req,'host',deprecate.function(function host(){return this.hostname;},'req.host: Use req.hostname instead'));/**
 * Check if the request is fresh, aka
 * Last-Modified and/or the ETag
 * still match.
 *
 * @return {Boolean}
 * @public
 */defineGetter(req,'fresh',function(){var method=this.method;var res=this.res;var status=res.statusCode;// GET or HEAD for weak freshness validation only
if('GET'!==method&&'HEAD'!==method)return false;// 2xx or 304 as per rfc2616 14.26
if(status>=200&&status<300||304===status){return fresh(this.headers,{'etag':res.get('ETag'),'last-modified':res.get('Last-Modified')});}return false;});/**
 * Check if the request is stale, aka
 * "Last-Modified" and / or the "ETag" for the
 * resource has changed.
 *
 * @return {Boolean}
 * @public
 */defineGetter(req,'stale',function stale(){return!this.fresh;});/**
 * Check if the request was an _XMLHttpRequest_.
 *
 * @return {Boolean}
 * @public
 */defineGetter(req,'xhr',function xhr(){var val=this.get('X-Requested-With')||'';return val.toLowerCase()==='xmlhttprequest';});/**
 * Helper function for creating a getter on an object.
 *
 * @param {Object} obj
 * @param {String} name
 * @param {Function} getter
 * @private
 */function defineGetter(obj,name,getter){(0,_defineProperty2.default)(obj,name,{configurable:true,enumerable:true,get:getter});}/***/},/* 227 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var Negotiator=__webpack_require__(228);var mime=__webpack_require__(103);/**
 * Module exports.
 * @public
 */module.exports=Accepts;/**
 * Create a new Accepts object for the given req.
 *
 * @param {object} req
 * @public
 */function Accepts(req){if(!(this instanceof Accepts)){return new Accepts(req);}this.headers=req.headers;this.negotiator=new Negotiator(req);}/**
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string
 * such as "application/json", the extension name
 * such as "json" or an array `["json", "html", "text/plain"]`. When a list
 * or array is given the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     this.types('html');
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     this.types('html');
 *     // => "html"
 *     this.types('text/html');
 *     // => "text/html"
 *     this.types('json', 'text');
 *     // => "json"
 *     this.types('application/json');
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     this.types('image/png');
 *     this.types('png');
 *     // => undefined
 *
 *     // Accept: text/*;q=.5, application/json
 *     this.types(['html', 'json']);
 *     this.types('html', 'json');
 *     // => "json"
 *
 * @param {String|Array} types...
 * @return {String|Array|Boolean}
 * @public
 */Accepts.prototype.type=Accepts.prototype.types=function(types_){var types=types_;// support flattened arguments
if(types&&!Array.isArray(types)){types=new Array(arguments.length);for(var i=0;i<types.length;i++){types[i]=arguments[i];}}// no types, return all requested types
if(!types||types.length===0){return this.negotiator.mediaTypes();}// no accept header, return first given type
if(!this.headers.accept){return types[0];}var mimes=types.map(extToMime);var accepts=this.negotiator.mediaTypes(mimes.filter(validMime));var first=accepts[0];return first?types[mimes.indexOf(first)]:false;};/**
 * Return accepted encodings or best fit based on `encodings`.
 *
 * Given `Accept-Encoding: gzip, deflate`
 * an array sorted by quality is returned:
 *
 *     ['gzip', 'deflate']
 *
 * @param {String|Array} encodings...
 * @return {String|Array}
 * @public
 */Accepts.prototype.encoding=Accepts.prototype.encodings=function(encodings_){var encodings=encodings_;// support flattened arguments
if(encodings&&!Array.isArray(encodings)){encodings=new Array(arguments.length);for(var i=0;i<encodings.length;i++){encodings[i]=arguments[i];}}// no encodings, return all requested encodings
if(!encodings||encodings.length===0){return this.negotiator.encodings();}return this.negotiator.encodings(encodings)[0]||false;};/**
 * Return accepted charsets or best fit based on `charsets`.
 *
 * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
 * an array sorted by quality is returned:
 *
 *     ['utf-8', 'utf-7', 'iso-8859-1']
 *
 * @param {String|Array} charsets...
 * @return {String|Array}
 * @public
 */Accepts.prototype.charset=Accepts.prototype.charsets=function(charsets_){var charsets=charsets_;// support flattened arguments
if(charsets&&!Array.isArray(charsets)){charsets=new Array(arguments.length);for(var i=0;i<charsets.length;i++){charsets[i]=arguments[i];}}// no charsets, return all requested charsets
if(!charsets||charsets.length===0){return this.negotiator.charsets();}return this.negotiator.charsets(charsets)[0]||false;};/**
 * Return accepted languages or best fit based on `langs`.
 *
 * Given `Accept-Language: en;q=0.8, es, pt`
 * an array sorted by quality is returned:
 *
 *     ['es', 'pt', 'en']
 *
 * @param {String|Array} langs...
 * @return {Array|String}
 * @public
 */Accepts.prototype.lang=Accepts.prototype.langs=Accepts.prototype.language=Accepts.prototype.languages=function(languages_){var languages=languages_;// support flattened arguments
if(languages&&!Array.isArray(languages)){languages=new Array(arguments.length);for(var i=0;i<languages.length;i++){languages[i]=arguments[i];}}// no languages, return all requested languages
if(!languages||languages.length===0){return this.negotiator.languages();}return this.negotiator.languages(languages)[0]||false;};/**
 * Convert extnames to mime.
 *
 * @param {String} type
 * @return {String}
 * @private
 */function extToMime(type){return type.indexOf('/')===-1?mime.lookup(type):type;}/**
 * Check if mime is valid.
 *
 * @param {String} type
 * @return {String}
 * @private
 */function validMime(type){return typeof type==='string';}/***/},/* 228 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Cached loaded submodules.
 * @private
 */var modules=(0,_create2.default)(null);/**
 * Module exports.
 * @public
 */module.exports=Negotiator;module.exports.Negotiator=Negotiator;/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */function Negotiator(request){if(!(this instanceof Negotiator)){return new Negotiator(request);}this.request=request;}Negotiator.prototype.charset=function charset(available){var set=this.charsets(available);return set&&set[0];};Negotiator.prototype.charsets=function charsets(available){var preferredCharsets=loadModule('charset').preferredCharsets;return preferredCharsets(this.request.headers['accept-charset'],available);};Negotiator.prototype.encoding=function encoding(available){var set=this.encodings(available);return set&&set[0];};Negotiator.prototype.encodings=function encodings(available){var preferredEncodings=loadModule('encoding').preferredEncodings;return preferredEncodings(this.request.headers['accept-encoding'],available);};Negotiator.prototype.language=function language(available){var set=this.languages(available);return set&&set[0];};Negotiator.prototype.languages=function languages(available){var preferredLanguages=loadModule('language').preferredLanguages;return preferredLanguages(this.request.headers['accept-language'],available);};Negotiator.prototype.mediaType=function mediaType(available){var set=this.mediaTypes(available);return set&&set[0];};Negotiator.prototype.mediaTypes=function mediaTypes(available){var preferredMediaTypes=loadModule('mediaType').preferredMediaTypes;return preferredMediaTypes(this.request.headers.accept,available);};// Backwards compatibility
Negotiator.prototype.preferredCharset=Negotiator.prototype.charset;Negotiator.prototype.preferredCharsets=Negotiator.prototype.charsets;Negotiator.prototype.preferredEncoding=Negotiator.prototype.encoding;Negotiator.prototype.preferredEncodings=Negotiator.prototype.encodings;Negotiator.prototype.preferredLanguage=Negotiator.prototype.language;Negotiator.prototype.preferredLanguages=Negotiator.prototype.languages;Negotiator.prototype.preferredMediaType=Negotiator.prototype.mediaType;Negotiator.prototype.preferredMediaTypes=Negotiator.prototype.mediaTypes;/**
 * Load the given module.
 * @private
 */function loadModule(moduleName){var module=modules[moduleName];if(module!==undefined){return module;}// This uses a switch for static require analysis
switch(moduleName){case'charset':module=__webpack_require__(229);break;case'encoding':module=__webpack_require__(230);break;case'language':module=__webpack_require__(231);break;case'mediaType':module=__webpack_require__(232);break;default:throw new Error('Cannot find module \''+moduleName+'\'');}// Store to prevent invoking require()
modules[moduleName]=module;return module;}/***/},/* 229 *//***/function(module,exports,__webpack_require__){"use strict";/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=preferredCharsets;module.exports.preferredCharsets=preferredCharsets;/**
 * Module variables.
 * @private
 */var simpleCharsetRegExp=/^\s*([^\s;]+)\s*(?:;(.*))?$/;/**
 * Parse the Accept-Charset header.
 * @private
 */function parseAcceptCharset(accept){var accepts=accept.split(',');for(var i=0,j=0;i<accepts.length;i++){var charset=parseCharset(accepts[i].trim(),i);if(charset){accepts[j++]=charset;}}// trim accepts
accepts.length=j;return accepts;}/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */function parseCharset(str,i){var match=simpleCharsetRegExp.exec(str);if(!match)return null;var charset=match[1];var q=1;if(match[2]){var params=match[2].split(';');for(var i=0;i<params.length;i++){var p=params[i].trim().split('=');if(p[0]==='q'){q=parseFloat(p[1]);break;}}}return{charset:charset,q:q,i:i};}/**
 * Get the priority of a charset.
 * @private
 */function getCharsetPriority(charset,accepted,index){var priority={o:-1,q:0,s:0};for(var i=0;i<accepted.length;i++){var spec=specify(charset,accepted[i],index);if(spec&&(priority.s-spec.s||priority.q-spec.q||priority.o-spec.o)<0){priority=spec;}}return priority;}/**
 * Get the specificity of the charset.
 * @private
 */function specify(charset,spec,index){var s=0;if(spec.charset.toLowerCase()===charset.toLowerCase()){s|=1;}else if(spec.charset!=='*'){return null;}return{i:index,o:spec.i,q:spec.q,s:s};}/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */function preferredCharsets(accept,provided){// RFC 2616 sec 14.2: no header = *
var accepts=parseAcceptCharset(accept===undefined?'*':accept||'');if(!provided){// sorted list of all charsets
return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);}var priorities=provided.map(function getPriority(type,index){return getCharsetPriority(type,accepts,index);});// sorted list of accepted charsets
return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority){return provided[priorities.indexOf(priority)];});}/**
 * Compare two specs.
 * @private
 */function compareSpecs(a,b){return b.q-a.q||b.s-a.s||a.o-b.o||a.i-b.i||0;}/**
 * Get full charset string.
 * @private
 */function getFullCharset(spec){return spec.charset;}/**
 * Check if a spec has any quality.
 * @private
 */function isQuality(spec){return spec.q>0;}/***/},/* 230 *//***/function(module,exports,__webpack_require__){"use strict";/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=preferredEncodings;module.exports.preferredEncodings=preferredEncodings;/**
 * Module variables.
 * @private
 */var simpleEncodingRegExp=/^\s*([^\s;]+)\s*(?:;(.*))?$/;/**
 * Parse the Accept-Encoding header.
 * @private
 */function parseAcceptEncoding(accept){var accepts=accept.split(',');var hasIdentity=false;var minQuality=1;for(var i=0,j=0;i<accepts.length;i++){var encoding=parseEncoding(accepts[i].trim(),i);if(encoding){accepts[j++]=encoding;hasIdentity=hasIdentity||specify('identity',encoding);minQuality=Math.min(minQuality,encoding.q||1);}}if(!hasIdentity){/*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */accepts[j++]={encoding:'identity',q:minQuality,i:i};}// trim accepts
accepts.length=j;return accepts;}/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */function parseEncoding(str,i){var match=simpleEncodingRegExp.exec(str);if(!match)return null;var encoding=match[1];var q=1;if(match[2]){var params=match[2].split(';');for(var i=0;i<params.length;i++){var p=params[i].trim().split('=');if(p[0]==='q'){q=parseFloat(p[1]);break;}}}return{encoding:encoding,q:q,i:i};}/**
 * Get the priority of an encoding.
 * @private
 */function getEncodingPriority(encoding,accepted,index){var priority={o:-1,q:0,s:0};for(var i=0;i<accepted.length;i++){var spec=specify(encoding,accepted[i],index);if(spec&&(priority.s-spec.s||priority.q-spec.q||priority.o-spec.o)<0){priority=spec;}}return priority;}/**
 * Get the specificity of the encoding.
 * @private
 */function specify(encoding,spec,index){var s=0;if(spec.encoding.toLowerCase()===encoding.toLowerCase()){s|=1;}else if(spec.encoding!=='*'){return null;}return{i:index,o:spec.i,q:spec.q,s:s};};/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */function preferredEncodings(accept,provided){var accepts=parseAcceptEncoding(accept||'');if(!provided){// sorted list of all encodings
return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);}var priorities=provided.map(function getPriority(type,index){return getEncodingPriority(type,accepts,index);});// sorted list of accepted encodings
return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority){return provided[priorities.indexOf(priority)];});}/**
 * Compare two specs.
 * @private
 */function compareSpecs(a,b){return b.q-a.q||b.s-a.s||a.o-b.o||a.i-b.i||0;}/**
 * Get full encoding string.
 * @private
 */function getFullEncoding(spec){return spec.encoding;}/**
 * Check if a spec has any quality.
 * @private
 */function isQuality(spec){return spec.q>0;}/***/},/* 231 *//***/function(module,exports,__webpack_require__){"use strict";/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=preferredLanguages;module.exports.preferredLanguages=preferredLanguages;/**
 * Module variables.
 * @private
 */var simpleLanguageRegExp=/^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;/**
 * Parse the Accept-Language header.
 * @private
 */function parseAcceptLanguage(accept){var accepts=accept.split(',');for(var i=0,j=0;i<accepts.length;i++){var langauge=parseLanguage(accepts[i].trim(),i);if(langauge){accepts[j++]=langauge;}}// trim accepts
accepts.length=j;return accepts;}/**
 * Parse a language from the Accept-Language header.
 * @private
 */function parseLanguage(str,i){var match=simpleLanguageRegExp.exec(str);if(!match)return null;var prefix=match[1],suffix=match[2],full=prefix;if(suffix)full+="-"+suffix;var q=1;if(match[3]){var params=match[3].split(';');for(var i=0;i<params.length;i++){var p=params[i].split('=');if(p[0]==='q')q=parseFloat(p[1]);}}return{prefix:prefix,suffix:suffix,q:q,i:i,full:full};}/**
 * Get the priority of a language.
 * @private
 */function getLanguagePriority(language,accepted,index){var priority={o:-1,q:0,s:0};for(var i=0;i<accepted.length;i++){var spec=specify(language,accepted[i],index);if(spec&&(priority.s-spec.s||priority.q-spec.q||priority.o-spec.o)<0){priority=spec;}}return priority;}/**
 * Get the specificity of the language.
 * @private
 */function specify(language,spec,index){var p=parseLanguage(language);if(!p)return null;var s=0;if(spec.full.toLowerCase()===p.full.toLowerCase()){s|=4;}else if(spec.prefix.toLowerCase()===p.full.toLowerCase()){s|=2;}else if(spec.full.toLowerCase()===p.prefix.toLowerCase()){s|=1;}else if(spec.full!=='*'){return null;}return{i:index,o:spec.i,q:spec.q,s:s};};/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */function preferredLanguages(accept,provided){// RFC 2616 sec 14.4: no header = *
var accepts=parseAcceptLanguage(accept===undefined?'*':accept||'');if(!provided){// sorted list of all languages
return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);}var priorities=provided.map(function getPriority(type,index){return getLanguagePriority(type,accepts,index);});// sorted list of accepted languages
return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority){return provided[priorities.indexOf(priority)];});}/**
 * Compare two specs.
 * @private
 */function compareSpecs(a,b){return b.q-a.q||b.s-a.s||a.o-b.o||a.i-b.i||0;}/**
 * Get full language string.
 * @private
 */function getFullLanguage(spec){return spec.full;}/**
 * Check if a spec has any quality.
 * @private
 */function isQuality(spec){return spec.q>0;}/***/},/* 232 *//***/function(module,exports,__webpack_require__){"use strict";/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */module.exports=preferredMediaTypes;module.exports.preferredMediaTypes=preferredMediaTypes;/**
 * Module variables.
 * @private
 */var simpleMediaTypeRegExp=/^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;/**
 * Parse the Accept header.
 * @private
 */function parseAccept(accept){var accepts=splitMediaTypes(accept);for(var i=0,j=0;i<accepts.length;i++){var mediaType=parseMediaType(accepts[i].trim(),i);if(mediaType){accepts[j++]=mediaType;}}// trim accepts
accepts.length=j;return accepts;}/**
 * Parse a media type from the Accept header.
 * @private
 */function parseMediaType(str,i){var match=simpleMediaTypeRegExp.exec(str);if(!match)return null;var params=(0,_create2.default)(null);var q=1;var subtype=match[2];var type=match[1];if(match[3]){var kvps=splitParameters(match[3]).map(splitKeyValuePair);for(var j=0;j<kvps.length;j++){var pair=kvps[j];var key=pair[0].toLowerCase();var val=pair[1];// get the value, unwrapping quotes
var value=val&&val[0]==='"'&&val[val.length-1]==='"'?val.substr(1,val.length-2):val;if(key==='q'){q=parseFloat(value);break;}// store parameter
params[key]=value;}}return{type:type,subtype:subtype,params:params,q:q,i:i};}/**
 * Get the priority of a media type.
 * @private
 */function getMediaTypePriority(type,accepted,index){var priority={o:-1,q:0,s:0};for(var i=0;i<accepted.length;i++){var spec=specify(type,accepted[i],index);if(spec&&(priority.s-spec.s||priority.q-spec.q||priority.o-spec.o)<0){priority=spec;}}return priority;}/**
 * Get the specificity of the media type.
 * @private
 */function specify(type,spec,index){var p=parseMediaType(type);var s=0;if(!p){return null;}if(spec.type.toLowerCase()==p.type.toLowerCase()){s|=4;}else if(spec.type!='*'){return null;}if(spec.subtype.toLowerCase()==p.subtype.toLowerCase()){s|=2;}else if(spec.subtype!='*'){return null;}var keys=(0,_keys2.default)(spec.params);if(keys.length>0){if(keys.every(function(k){return spec.params[k]=='*'||(spec.params[k]||'').toLowerCase()==(p.params[k]||'').toLowerCase();})){s|=1;}else{return null;}}return{i:index,o:spec.i,q:spec.q,s:s};}/**
 * Get the preferred media types from an Accept header.
 * @public
 */function preferredMediaTypes(accept,provided){// RFC 2616 sec 14.2: no header = */*
var accepts=parseAccept(accept===undefined?'*/*':accept||'');if(!provided){// sorted list of all types
return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);}var priorities=provided.map(function getPriority(type,index){return getMediaTypePriority(type,accepts,index);});// sorted list of accepted types
return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority){return provided[priorities.indexOf(priority)];});}/**
 * Compare two specs.
 * @private
 */function compareSpecs(a,b){return b.q-a.q||b.s-a.s||a.o-b.o||a.i-b.i||0;}/**
 * Get full type string.
 * @private
 */function getFullType(spec){return spec.type+'/'+spec.subtype;}/**
 * Check if a spec has any quality.
 * @private
 */function isQuality(spec){return spec.q>0;}/**
 * Count the number of quotes in a string.
 * @private
 */function quoteCount(string){var count=0;var index=0;while((index=string.indexOf('"',index))!==-1){count++;index++;}return count;}/**
 * Split a key value pair.
 * @private
 */function splitKeyValuePair(str){var index=str.indexOf('=');var key;var val;if(index===-1){key=str;}else{key=str.substr(0,index);val=str.substr(index+1);}return[key,val];}/**
 * Split an Accept header into media types.
 * @private
 */function splitMediaTypes(accept){var accepts=accept.split(',');for(var i=1,j=0;i<accepts.length;i++){if(quoteCount(accepts[j])%2==0){accepts[++j]=accepts[i];}else{accepts[j]+=','+accepts[i];}}// trim accepts
accepts.length=j+1;return accepts;}/**
 * Split a string of parameters.
 * @private
 */function splitParameters(str){var parameters=str.split(';');for(var i=1,j=0;i<parameters.length;i++){if(quoteCount(parameters[j])%2==0){parameters[++j]=parameters[i];}else{parameters[j]+=';'+parameters[i];}}// trim parameters
parameters.length=j+1;for(var i=0;i<parameters.length;i++){parameters[i]=parameters[i].trim();}return parameters;}/***/},/* 233 *//***/function(module,exports,__webpack_require__){/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 *//**
 * Module exports.
 */module.exports=__webpack_require__(234);/***/},/* 234 *//***/function(module,exports){module.exports={"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana"},"application/3gpp-ims+xml":{"source":"iana"},"application/a2l":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana"},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","extensions":["atomsvc"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana"},"application/bacnet-xdd+zip":{"source":"iana"},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana"},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana"},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/cbor":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana"},"application/ccxml+xml":{"source":"iana","extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana"},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana"},"application/cellml+xml":{"source":"iana"},"application/cfw":{"source":"iana"},"application/clue_info+xml":{"source":"iana"},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana"},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana"},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana"},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana"},"application/cstadata+xml":{"source":"iana"},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","extensions":["mpd"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana"},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana"},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/docbook+xml":{"source":"apache","extensions":["dbk"]},"application/dskpp+xml":{"source":"iana"},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/emergencycalldata.comment+xml":{"source":"iana"},"application/emergencycalldata.control+xml":{"source":"iana"},"application/emergencycalldata.deviceinfo+xml":{"source":"iana"},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana"},"application/emergencycalldata.serviceinfo+xml":{"source":"iana"},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana"},"application/emergencycalldata.veds+xml":{"source":"iana"},"application/emma+xml":{"source":"iana","extensions":["emma"]},"application/emotionml+xml":{"source":"iana"},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana"},"application/epub+zip":{"source":"iana","extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana"},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false,"extensions":["woff"]},"application/font-woff2":{"compressible":false,"extensions":["woff2"]},"application/framework-attributes+xml":{"source":"iana"},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geoxacml+xml":{"source":"iana"},"application/gml+xml":{"source":"iana","extensions":["gml"]},"application/gpx+xml":{"source":"apache","extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana"},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana"},"application/ibe-pkg-reply+xml":{"source":"iana"},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana"},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana"},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana"},"application/kpml-response+xml":{"source":"iana"},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana"},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana"},"application/lost+xml":{"source":"iana","extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana"},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","extensions":["mads"]},"application/manifest+json":{"charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana"},"application/mathml-presentation+xml":{"source":"iana"},"application/mbms-associated-procedure-description+xml":{"source":"iana"},"application/mbms-deregister+xml":{"source":"iana"},"application/mbms-envelope+xml":{"source":"iana"},"application/mbms-msk+xml":{"source":"iana"},"application/mbms-msk-response+xml":{"source":"iana"},"application/mbms-protection-description+xml":{"source":"iana"},"application/mbms-reception-report+xml":{"source":"iana"},"application/mbms-register+xml":{"source":"iana"},"application/mbms-register-response+xml":{"source":"iana"},"application/mbms-schedule+xml":{"source":"iana"},"application/mbms-user-service-description+xml":{"source":"iana"},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana"},"application/media_control+xml":{"source":"iana"},"application/mediaservercontrol+xml":{"source":"iana","extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","extensions":["meta4"]},"application/mets+xml":{"source":"iana","extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mmt-usd+xml":{"source":"iana"},"application/mods+xml":{"source":"iana","extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana"},"application/mrb-publish+xml":{"source":"iana"},"application/msc-ivr+xml":{"source":"iana"},"application/msc-mixer+xml":{"source":"iana"},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana"},"application/n-triples":{"source":"iana"},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana"},"application/news-groupinfo":{"source":"iana"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana"},"application/nss":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p2p-overlay+xml":{"source":"iana"},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana"},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana"},"application/pidf-diff+xml":{"source":"iana"},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","extensions":["pls"]},"application/poc-settings+xml":{"source":"iana"},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana"},"application/provenance+xml":{"source":"iana"},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.hpub+zip":{"source":"iana"},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana"},"application/pskc+xml":{"source":"iana","extensions":["pskcxml"]},"application/qsig":{"source":"iana"},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf"]},"application/reginfo+xml":{"source":"iana","extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","extensions":["rld"]},"application/rfc+xml":{"source":"iana"},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana"},"application/rls-services+xml":{"source":"iana","extensions":["rs"]},"application/route-apd+xml":{"source":"iana"},"application/route-s-tsid+xml":{"source":"iana"},"application/route-usd+xml":{"source":"iana"},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana"},"application/samlmetadata+xml":{"source":"iana"},"application/sbml+xml":{"source":"iana","extensions":["sbml"]},"application/scaip+xml":{"source":"iana"},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/sep+xml":{"source":"iana"},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","extensions":["shf"]},"application/sieve":{"source":"iana"},"application/simple-filter+xml":{"source":"iana"},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","extensions":["srx"]},"application/spirits-event+xml":{"source":"iana"},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","extensions":["grxml"]},"application/sru+xml":{"source":"iana","extensions":["sru"]},"application/ssdl+xml":{"source":"apache","extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","extensions":["ssml"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/tei+xml":{"source":"iana","extensions":["tei","teicorpus"]},"application/thraud+xml":{"source":"iana","extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/trig":{"source":"iana"},"application/ttml+xml":{"source":"iana"},"application/tve-trigger":{"source":"iana"},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana"},"application/urc-ressheet+xml":{"source":"iana"},"application/urc-targetdesc+xml":{"source":"iana"},"application/urc-uisocketdesc+xml":{"source":"iana"},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana"},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana"},"application/vnd.3gpp-prose+xml":{"source":"iana"},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana"},"application/vnd.3gpp.bsf+xml":{"source":"iana"},"application/vnd.3gpp.gmop+xml":{"source":"iana"},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana"},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana"},"application/vnd.3gpp.mid-call+xml":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana"},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana"},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana"},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana"},"application/vnd.3gpp.ussd+xml":{"source":"iana"},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana"},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","extensions":["mpkg"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avistar+xml":{"source":"iana"},"application/vnd.balsamiq.bmml+xml":{"source":"iana"},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana"},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana"},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","extensions":["wbs"]},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana"},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana"},"application/vnd.cybank":{"source":"iana"},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume-movie":{"source":"iana"},"application/vnd.desmume.movie":{"source":"apache"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana"},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana"},"application/vnd.dvb.notif-container+xml":{"source":"iana"},"application/vnd.dvb.notif-generic+xml":{"source":"iana"},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana"},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana"},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana"},"application/vnd.dvb.notif-init+xml":{"source":"iana"},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana"},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana"},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana"},"application/vnd.eszigno3+xml":{"source":"iana","extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana"},"application/vnd.etsi.asic-e+zip":{"source":"iana"},"application/vnd.etsi.asic-s+zip":{"source":"iana"},"application/vnd.etsi.cug+xml":{"source":"iana"},"application/vnd.etsi.iptvcommand+xml":{"source":"iana"},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana"},"application/vnd.etsi.iptvprofile+xml":{"source":"iana"},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana"},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana"},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana"},"application/vnd.etsi.iptvservice+xml":{"source":"iana"},"application/vnd.etsi.iptvsync+xml":{"source":"iana"},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana"},"application/vnd.etsi.mcid+xml":{"source":"iana"},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana"},"application/vnd.etsi.pstn+xml":{"source":"iana"},"application/vnd.etsi.sci+xml":{"source":"iana"},"application/vnd.etsi.simservs+xml":{"source":"iana"},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana"},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana"},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana"},"application/vnd.gov.sk.e-form+zip":{"source":"iana"},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana"},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana"},"application/vnd.imagemeter.image+zip":{"source":"iana"},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana"},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana"},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana"},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana"},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana"},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana"},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana"},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana"},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana"},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","extensions":["lasxml"]},"application/vnd.liberty-request+xml":{"source":"iana"},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","extensions":["lbe"]},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana"},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana"},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana"},"application/vnd.marlin.drm.license+xml":{"source":"iana"},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana"},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana"},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana"},"application/vnd.ms-printing.printticket+xml":{"source":"apache"},"application/vnd.ms-printschematicket+xml":{"source":"iana"},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana"},"application/vnd.nokia.iptv.config+xml":{"source":"iana"},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana"},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana"},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana"},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana"},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana"},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana"},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana"},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana"},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana"},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana"},"application/vnd.oipf.spdlist+xml":{"source":"iana"},"application/vnd.oipf.ueprofile+xml":{"source":"iana"},"application/vnd.oipf.userprofile+xml":{"source":"iana"},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana"},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana"},"application/vnd.oma.bcast.imd+xml":{"source":"iana"},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana"},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana"},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana"},"application/vnd.oma.bcast.sprov+xml":{"source":"iana"},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana"},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana"},"application/vnd.oma.cab-pcc+xml":{"source":"iana"},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana"},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana"},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana"},"application/vnd.oma.group-usage-list+xml":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana"},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana"},"application/vnd.oma.poc.final-report+xml":{"source":"iana"},"application/vnd.oma.poc.groups+xml":{"source":"iana"},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana"},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana"},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana"},"application/vnd.oma.xcap-directory+xml":{"source":"iana"},"application/vnd.omads-email+xml":{"source":"iana"},"application/vnd.omads-file+xml":{"source":"iana"},"application/vnd.omads-folder+xml":{"source":"iana"},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana"},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml-template":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"apache","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml-template":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"apache","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml-template":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"apache","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana"},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana"},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana"},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana"},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana"},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos+xml":{"source":"iana"},"application/vnd.paos.xml":{"source":"apache"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana"},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana"},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana"},"application/vnd.radisys.msml+xml":{"source":"iana"},"application/vnd.radisys.msml-audit+xml":{"source":"iana"},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana"},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana"},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana"},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana"},"application/vnd.radisys.msml-conf+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana"},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana"},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.software602.filler.form+xml":{"source":"iana"},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana"},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana"},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana"},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana"},"application/vnd.wv.ssp+xml":{"source":"iana"},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana"},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","extensions":["vxml"]},"application/vq-rtcpxr":{"source":"iana"},"application/watcherinfo+xml":{"source":"iana"},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-otf":{"source":"apache","compressible":true,"extensions":["otf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-ttf":{"source":"apache","compressible":true,"extensions":["ttf","ttc"]},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"apache","extensions":["der","crt","pem"]},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana"},"application/xaml+xml":{"source":"apache","extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana"},"application/xcap-caps+xml":{"source":"iana"},"application/xcap-diff+xml":{"source":"iana","extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana"},"application/xcap-error+xml":{"source":"iana"},"application/xcap-ns+xml":{"source":"iana"},"application/xcon-conference-info+xml":{"source":"iana"},"application/xcon-conference-info-diff+xml":{"source":"iana"},"application/xenc+xml":{"source":"iana","extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache"},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana"},"application/xmpp+xml":{"source":"iana"},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","extensions":["xpl"]},"application/xslt+xml":{"source":"iana","extensions":["xslt"]},"application/xspf+xml":{"source":"apache","extensions":["xspf"]},"application/xv+xml":{"source":"iana","extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana"},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana"},"application/yin+xml":{"source":"iana","extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana"},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana"},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/otf":{"compressible":true,"extensions":["otf"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana"},"image/emf":{"source":"iana"},"image/fits":{"source":"iana"},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana"},"image/jp2":{"source":"iana"},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jpm":{"source":"iana"},"image/jpx":{"source":"iana"},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana"},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana"},"image/tiff":{"source":"iana","compressible":false,"extensions":["tiff","tif"]},"image/tiff-fx":{"source":"iana"},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana"},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana"},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana"},"image/vnd.valve.source.texture":{"source":"iana"},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana"},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana"},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana"},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana"},"message/global-delivery-status":{"source":"iana"},"message/global-disposition-notification":{"source":"iana"},"message/global-headers":{"source":"iana"},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana"},"model/3mf":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/vnd.collada+xml":{"source":"iana","extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana"},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana"},"model/vnd.parasolid.transmit.binary":{"source":"iana"},"model/vnd.parasolid.transmit.text":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.valve.source.compiled-map":{"source":"iana"},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana"},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana"},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana","compressible":false},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/hjson":{"extensions":["hjson"]},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/slim":{"extensions":["slim","slm"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana"},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vp8":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}/***/};},/* 235 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * type-is
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var typer=__webpack_require__(236);var mime=__webpack_require__(103);/**
 * Module exports.
 * @public
 */module.exports=typeofrequest;module.exports.is=typeis;module.exports.hasBody=hasbody;module.exports.normalize=normalize;module.exports.match=mimeMatch;/**
 * Compare a `value` content-type with `types`.
 * Each `type` can be an extension like `html`,
 * a special shortcut like `multipart` or `urlencoded`,
 * or a mime type.
 *
 * If no types match, `false` is returned.
 * Otherwise, the first `type` that matches is returned.
 *
 * @param {String} value
 * @param {Array} types
 * @public
 */function typeis(value,types_){var i;var types=types_;// remove parameters and normalize
var val=tryNormalizeType(value);// no type or invalid
if(!val){return false;}// support flattened arguments
if(types&&!Array.isArray(types)){types=new Array(arguments.length-1);for(i=0;i<types.length;i++){types[i]=arguments[i+1];}}// no types, return the content type
if(!types||!types.length){return val;}var type;for(i=0;i<types.length;i++){if(mimeMatch(normalize(type=types[i]),val)){return type[0]==='+'||type.indexOf('*')!==-1?val:type;}}// no matches
return false;}/**
 * Check if a request has a request body.
 * A request with a body __must__ either have `transfer-encoding`
 * or `content-length` headers set.
 * http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3
 *
 * @param {Object} request
 * @return {Boolean}
 * @public
 */function hasbody(req){return req.headers['transfer-encoding']!==undefined||!isNaN(req.headers['content-length']);}/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains any of the give mime `type`s.
 * If there is no request body, `null` is returned.
 * If there is no content type, `false` is returned.
 * Otherwise, it returns the first `type` that matches.
 *
 * Examples:
 *
 *     // With Content-Type: text/html; charset=utf-8
 *     this.is('html'); // => 'html'
 *     this.is('text/html'); // => 'text/html'
 *     this.is('text/*', 'application/json'); // => 'text/html'
 *
 *     // When Content-Type is application/json
 *     this.is('json', 'urlencoded'); // => 'json'
 *     this.is('application/json'); // => 'application/json'
 *     this.is('html', 'application/*'); // => 'application/json'
 *
 *     this.is('html'); // => false
 *
 * @param {String|Array} types...
 * @return {String|false|null}
 * @public
 */function typeofrequest(req,types_){var types=types_;// no body
if(!hasbody(req)){return null;}// support flattened arguments
if(arguments.length>2){types=new Array(arguments.length-1);for(var i=0;i<types.length;i++){types[i]=arguments[i+1];}}// request content type
var value=req.headers['content-type'];return typeis(value,types);}/**
 * Normalize a mime type.
 * If it's a shorthand, expand it to a valid mime type.
 *
 * In general, you probably want:
 *
 *   var type = is(req, ['urlencoded', 'json', 'multipart']);
 *
 * Then use the appropriate body parsers.
 * These three are the most common request body types
 * and are thus ensured to work.
 *
 * @param {String} type
 * @private
 */function normalize(type){if(typeof type!=='string'){// invalid type
return false;}switch(type){case'urlencoded':return'application/x-www-form-urlencoded';case'multipart':return'multipart/*';}if(type[0]==='+'){// "+json" -> "*/*+json" expando
return'*/*'+type;}return type.indexOf('/')===-1?mime.lookup(type):type;}/**
 * Check if `expected` mime type
 * matches `actual` mime type with
 * wildcard and +suffix support.
 *
 * @param {String} expected
 * @param {String} actual
 * @return {Boolean}
 * @private
 */function mimeMatch(expected,actual){// invalid type
if(expected===false){return false;}// split types
var actualParts=actual.split('/');var expectedParts=expected.split('/');// invalid format
if(actualParts.length!==2||expectedParts.length!==2){return false;}// validate type
if(expectedParts[0]!=='*'&&expectedParts[0]!==actualParts[0]){return false;}// validate suffix wildcard
if(expectedParts[1].substr(0,2)==='*+'){return expectedParts[1].length<=actualParts[1].length+1&&expectedParts[1].substr(1)===actualParts[1].substr(1-expectedParts[1].length);}// validate subtype
if(expectedParts[1]!=='*'&&expectedParts[1]!==actualParts[1]){return false;}return true;}/**
 * Normalize a type and remove parameters.
 *
 * @param {string} value
 * @return {string}
 * @private
 */function normalizeType(value){// parse the type
var type=typer.parse(value);// remove the parameters
type.parameters=undefined;// reformat it
return typer.format(type);}/**
 * Try to normalize a type and remove parameters.
 *
 * @param {string} value
 * @return {string}
 * @private
 */function tryNormalizeType(value){try{return normalizeType(value);}catch(err){return null;}}/***/},/* 236 *//***/function(module,exports){/*!
 * media-typer
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * RegExp to match *( ";" parameter ) in RFC 2616 sec 3.7
 *
 * parameter     = token "=" ( token | quoted-string )
 * token         = 1*<any CHAR except CTLs or separators>
 * separators    = "(" | ")" | "<" | ">" | "@"
 *               | "," | ";" | ":" | "\" | <">
 *               | "/" | "[" | "]" | "?" | "="
 *               | "{" | "}" | SP | HT
 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
 * qdtext        = <any TEXT except <">>
 * quoted-pair   = "\" CHAR
 * CHAR          = <any US-ASCII character (octets 0 - 127)>
 * TEXT          = <any OCTET except CTLs, but including LWS>
 * LWS           = [CRLF] 1*( SP | HT )
 * CRLF          = CR LF
 * CR            = <US-ASCII CR, carriage return (13)>
 * LF            = <US-ASCII LF, linefeed (10)>
 * SP            = <US-ASCII SP, space (32)>
 * SHT           = <US-ASCII HT, horizontal-tab (9)>
 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
 * OCTET         = <any 8-bit sequence of data>
 */var paramRegExp=/; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g;var textRegExp=/^[\u0020-\u007e\u0080-\u00ff]+$/;var tokenRegExp=/^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/;/**
 * RegExp to match quoted-pair in RFC 2616
 *
 * quoted-pair = "\" CHAR
 * CHAR        = <any US-ASCII character (octets 0 - 127)>
 */var qescRegExp=/\\([\u0000-\u007f])/g;/**
 * RegExp to match chars that must be quoted-pair in RFC 2616
 */var quoteRegExp=/([\\"])/g;/**
 * RegExp to match type in RFC 6838
 *
 * type-name = restricted-name
 * subtype-name = restricted-name
 * restricted-name = restricted-name-first *126restricted-name-chars
 * restricted-name-first  = ALPHA / DIGIT
 * restricted-name-chars  = ALPHA / DIGIT / "!" / "#" /
 *                          "$" / "&" / "-" / "^" / "_"
 * restricted-name-chars =/ "." ; Characters before first dot always
 *                              ; specify a facet name
 * restricted-name-chars =/ "+" ; Characters after last plus always
 *                              ; specify a structured syntax suffix
 * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
 * DIGIT =  %x30-39             ; 0-9
 */var subtypeNameRegExp=/^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/;var typeNameRegExp=/^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/;var typeRegExp=/^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;/**
 * Module exports.
 */exports.format=format;exports.parse=parse;/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @api public
 */function format(obj){if(!obj||(typeof obj==='undefined'?'undefined':(0,_typeof3.default)(obj))!=='object'){throw new TypeError('argument obj is required');}var parameters=obj.parameters;var subtype=obj.subtype;var suffix=obj.suffix;var type=obj.type;if(!type||!typeNameRegExp.test(type)){throw new TypeError('invalid type');}if(!subtype||!subtypeNameRegExp.test(subtype)){throw new TypeError('invalid subtype');}// format as type/subtype
var string=type+'/'+subtype;// append +suffix
if(suffix){if(!typeNameRegExp.test(suffix)){throw new TypeError('invalid suffix');}string+='+'+suffix;}// append parameters
if(parameters&&(typeof parameters==='undefined'?'undefined':(0,_typeof3.default)(parameters))==='object'){var param;var params=(0,_keys2.default)(parameters).sort();for(var i=0;i<params.length;i++){param=params[i];if(!tokenRegExp.test(param)){throw new TypeError('invalid parameter name');}string+='; '+param+'='+qstring(parameters[param]);}}return string;}/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @api public
 */function parse(string){if(!string){throw new TypeError('argument string is required');}// support req/res-like objects as argument
if((typeof string==='undefined'?'undefined':(0,_typeof3.default)(string))==='object'){string=getcontenttype(string);}if(typeof string!=='string'){throw new TypeError('argument string is required to be a string');}var index=string.indexOf(';');var type=index!==-1?string.substr(0,index):string;var key;var match;var obj=splitType(type);var params={};var value;paramRegExp.lastIndex=index;while(match=paramRegExp.exec(string)){if(match.index!==index){throw new TypeError('invalid parameter format');}index+=match[0].length;key=match[1].toLowerCase();value=match[2];if(value[0]==='"'){// remove quotes and escapes
value=value.substr(1,value.length-2).replace(qescRegExp,'$1');}params[key]=value;}if(index!==-1&&index!==string.length){throw new TypeError('invalid parameter format');}obj.parameters=params;return obj;}/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @api private
 */function getcontenttype(obj){if(typeof obj.getHeader==='function'){// res-like
return obj.getHeader('content-type');}if((0,_typeof3.default)(obj.headers)==='object'){// req-like
return obj.headers&&obj.headers['content-type'];}}/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */function qstring(val){var str=String(val);// no need to quote tokens
if(tokenRegExp.test(str)){return str;}if(str.length>0&&!textRegExp.test(str)){throw new TypeError('invalid parameter value');}return'"'+str.replace(quoteRegExp,'\\$1')+'"';}/**
 * Simply "type/subtype+siffx" into parts.
 *
 * @param {string} string
 * @return {Object}
 * @api private
 */function splitType(string){var match=typeRegExp.exec(string.toLowerCase());if(!match){throw new TypeError('invalid media type');}var type=match[1];var subtype=match[2];var suffix;// suffix after last +
var index=subtype.lastIndexOf('+');if(index!==-1){suffix=subtype.substr(index+1);subtype=subtype.substr(0,index);}var obj={type:type,subtype:subtype,suffix:suffix};return obj;}/***/},/* 237 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer,setImmediate){/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var contentDisposition=__webpack_require__(70);var deprecate=__webpack_require__(12)('express');var encodeUrl=__webpack_require__(28);var escapeHtml=__webpack_require__(29);var http=__webpack_require__(43);var isAbsolute=__webpack_require__(14).isAbsolute;var onFinished=__webpack_require__(39);var path=__webpack_require__(9);var statuses=__webpack_require__(30);var merge=__webpack_require__(32);var sign=__webpack_require__(238).sign;var normalizeType=__webpack_require__(14).normalizeType;var normalizeTypes=__webpack_require__(14).normalizeTypes;var setCharset=__webpack_require__(14).setCharset;var cookie=__webpack_require__(239);var send=__webpack_require__(46);var extname=path.extname;var mime=send.mime;var resolve=path.resolve;var vary=__webpack_require__(240);/**
 * Response prototype.
 * @public
 */var res=(0,_create2.default)(http.ServerResponse.prototype);/**
 * Module exports.
 * @public
 */module.exports=res;/**
 * Module variables.
 * @private
 */var charsetRegExp=/;\s*charset\s*=/;/**
 * Set status `code`.
 *
 * @param {Number} code
 * @return {ServerResponse}
 * @public
 */res.status=function status(code){this.statusCode=code;return this;};/**
 * Set Link header field with the given `links`.
 *
 * Examples:
 *
 *    res.links({
 *      next: 'http://api.example.com/users?page=2',
 *      last: 'http://api.example.com/users?page=5'
 *    });
 *
 * @param {Object} links
 * @return {ServerResponse}
 * @public
 */res.links=function(links){var link=this.get('Link')||'';if(link)link+=', ';return this.set('Link',link+(0,_keys2.default)(links).map(function(rel){return'<'+links[rel]+'>; rel="'+rel+'"';}).join(', '));};/**
 * Send a response.
 *
 * Examples:
 *
 *     res.send(new Buffer('wahoo'));
 *     res.send({ some: 'json' });
 *     res.send('<p>some html</p>');
 *
 * @param {string|number|boolean|object|Buffer} body
 * @public
 */res.send=function send(body){var chunk=body;var encoding;var len;var req=this.req;var type;// settings
var app=this.app;// allow status / body
if(arguments.length===2){// res.send(body, status) backwards compat
if(typeof arguments[0]!=='number'&&typeof arguments[1]==='number'){deprecate('res.send(body, status): Use res.status(status).send(body) instead');this.statusCode=arguments[1];}else{deprecate('res.send(status, body): Use res.status(status).send(body) instead');this.statusCode=arguments[0];chunk=arguments[1];}}// disambiguate res.send(status) and res.send(status, num)
if(typeof chunk==='number'&&arguments.length===1){// res.send(status) will set status message as text string
if(!this.get('Content-Type')){this.type('txt');}deprecate('res.send(status): Use res.sendStatus(status) instead');this.statusCode=chunk;chunk=statuses[chunk];}switch(typeof chunk==='undefined'?'undefined':(0,_typeof3.default)(chunk)){// string defaulting to html
case'string':if(!this.get('Content-Type')){this.type('html');}break;case'boolean':case'number':case'object':if(chunk===null){chunk='';}else if(Buffer.isBuffer(chunk)){if(!this.get('Content-Type')){this.type('bin');}}else{return this.json(chunk);}break;}// write strings in utf-8
if(typeof chunk==='string'){encoding='utf8';type=this.get('Content-Type');// reflect this in content-type
if(typeof type==='string'){this.set('Content-Type',setCharset(type,'utf-8'));}}// populate Content-Length
if(chunk!==undefined){if(!Buffer.isBuffer(chunk)){// convert chunk to Buffer; saves later double conversions
chunk=new Buffer(chunk,encoding);encoding=undefined;}len=chunk.length;this.set('Content-Length',len);}// populate ETag
var etag;var generateETag=len!==undefined&&app.get('etag fn');if(typeof generateETag==='function'&&!this.get('ETag')){if(etag=generateETag(chunk,encoding)){this.set('ETag',etag);}}// freshness
if(req.fresh)this.statusCode=304;// strip irrelevant headers
if(204===this.statusCode||304===this.statusCode){this.removeHeader('Content-Type');this.removeHeader('Content-Length');this.removeHeader('Transfer-Encoding');chunk='';}if(req.method==='HEAD'){// skip body for HEAD
this.end();}else{// respond
this.end(chunk,encoding);}return this;};/**
 * Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ user: 'tj' });
 *
 * @param {string|number|boolean|object} obj
 * @public
 */res.json=function json(obj){var val=obj;// allow status / body
if(arguments.length===2){// res.json(body, status) backwards compat
if(typeof arguments[1]==='number'){deprecate('res.json(obj, status): Use res.status(status).json(obj) instead');this.statusCode=arguments[1];}else{deprecate('res.json(status, obj): Use res.status(status).json(obj) instead');this.statusCode=arguments[0];val=arguments[1];}}// settings
var app=this.app;var replacer=app.get('json replacer');var spaces=app.get('json spaces');var body=stringify(val,replacer,spaces);// content-type
if(!this.get('Content-Type')){this.set('Content-Type','application/json');}return this.send(body);};/**
 * Send JSON response with JSONP callback support.
 *
 * Examples:
 *
 *     res.jsonp(null);
 *     res.jsonp({ user: 'tj' });
 *
 * @param {string|number|boolean|object} obj
 * @public
 */res.jsonp=function jsonp(obj){var val=obj;// allow status / body
if(arguments.length===2){// res.json(body, status) backwards compat
if(typeof arguments[1]==='number'){deprecate('res.jsonp(obj, status): Use res.status(status).json(obj) instead');this.statusCode=arguments[1];}else{deprecate('res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead');this.statusCode=arguments[0];val=arguments[1];}}// settings
var app=this.app;var replacer=app.get('json replacer');var spaces=app.get('json spaces');var body=stringify(val,replacer,spaces);var callback=this.req.query[app.get('jsonp callback name')];// content-type
if(!this.get('Content-Type')){this.set('X-Content-Type-Options','nosniff');this.set('Content-Type','application/json');}// fixup callback
if(Array.isArray(callback)){callback=callback[0];}// jsonp
if(typeof callback==='string'&&callback.length!==0){this.charset='utf-8';this.set('X-Content-Type-Options','nosniff');this.set('Content-Type','text/javascript');// restrict callback charset
callback=callback.replace(/[^\[\]\w$.]/g,'');// replace chars not allowed in JavaScript that are in JSON
body=body.replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');// the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
// the typeof check is just to reduce client error noise
body='/**/ typeof '+callback+' === \'function\' && '+callback+'('+body+');';}return this.send(body);};/**
 * Send given HTTP status code.
 *
 * Sets the response status to `statusCode` and the body of the
 * response to the standard description from node's http.STATUS_CODES
 * or the statusCode number if no description.
 *
 * Examples:
 *
 *     res.sendStatus(200);
 *
 * @param {number} statusCode
 * @public
 */res.sendStatus=function sendStatus(statusCode){var body=statuses[statusCode]||String(statusCode);this.statusCode=statusCode;this.type('txt');return this.send(body);};/**
 * Transfer the file at the given `path`.
 *
 * Automatically sets the _Content-Type_ response header field.
 * The callback `callback(err)` is invoked when the transfer is complete
 * or when an error occurs. Be sure to check `res.sentHeader`
 * if you wish to attempt responding, as the header and some data
 * may have already been transferred.
 *
 * Options:
 *
 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
 *   - `root`     root directory for relative filenames
 *   - `headers`  object of headers to serve with file
 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
 *
 * Other options are passed along to `send`.
 *
 * Examples:
 *
 *  The following example illustrates how `res.sendFile()` may
 *  be used as an alternative for the `static()` middleware for
 *  dynamic situations. The code backing `res.sendFile()` is actually
 *  the same code, so HTTP cache support etc is identical.
 *
 *     app.get('/user/:uid/photos/:file', function(req, res){
 *       var uid = req.params.uid
 *         , file = req.params.file;
 *
 *       req.user.mayViewFilesFrom(uid, function(yes){
 *         if (yes) {
 *           res.sendFile('/uploads/' + uid + '/' + file);
 *         } else {
 *           res.send(403, 'Sorry! you cant see that.');
 *         }
 *       });
 *     });
 *
 * @public
 */res.sendFile=function sendFile(path,options,callback){var done=callback;var req=this.req;var res=this;var next=req.next;var opts=options||{};if(!path){throw new TypeError('path argument is required to res.sendFile');}// support function as second arg
if(typeof options==='function'){done=options;opts={};}if(!opts.root&&!isAbsolute(path)){throw new TypeError('path must be absolute or specify root to res.sendFile');}// create file stream
var pathname=encodeURI(path);var file=send(req,pathname,opts);// transfer
sendfile(res,file,opts,function(err){if(done)return done(err);if(err&&err.code==='EISDIR')return next();// next() all but write errors
if(err&&err.code!=='ECONNABORTED'&&err.syscall!=='write'){next(err);}});};/**
 * Transfer the file at the given `path`.
 *
 * Automatically sets the _Content-Type_ response header field.
 * The callback `callback(err)` is invoked when the transfer is complete
 * or when an error occurs. Be sure to check `res.sentHeader`
 * if you wish to attempt responding, as the header and some data
 * may have already been transferred.
 *
 * Options:
 *
 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
 *   - `root`     root directory for relative filenames
 *   - `headers`  object of headers to serve with file
 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
 *
 * Other options are passed along to `send`.
 *
 * Examples:
 *
 *  The following example illustrates how `res.sendfile()` may
 *  be used as an alternative for the `static()` middleware for
 *  dynamic situations. The code backing `res.sendfile()` is actually
 *  the same code, so HTTP cache support etc is identical.
 *
 *     app.get('/user/:uid/photos/:file', function(req, res){
 *       var uid = req.params.uid
 *         , file = req.params.file;
 *
 *       req.user.mayViewFilesFrom(uid, function(yes){
 *         if (yes) {
 *           res.sendfile('/uploads/' + uid + '/' + file);
 *         } else {
 *           res.send(403, 'Sorry! you cant see that.');
 *         }
 *       });
 *     });
 *
 * @public
 */res.sendfile=function(path,options,callback){var done=callback;var req=this.req;var res=this;var next=req.next;var opts=options||{};// support function as second arg
if(typeof options==='function'){done=options;opts={};}// create file stream
var file=send(req,path,opts);// transfer
sendfile(res,file,opts,function(err){if(done)return done(err);if(err&&err.code==='EISDIR')return next();// next() all but write errors
if(err&&err.code!=='ECONNABORT'&&err.syscall!=='write'){next(err);}});};res.sendfile=deprecate.function(res.sendfile,'res.sendfile: Use res.sendFile instead');/**
 * Transfer the file at the given `path` as an attachment.
 *
 * Optionally providing an alternate attachment `filename`,
 * and optional callback `callback(err)`. The callback is invoked
 * when the data transfer is complete, or when an error has
 * ocurred. Be sure to check `res.headersSent` if you plan to respond.
 *
 * This method uses `res.sendfile()`.
 *
 * @public
 */res.download=function download(path,filename,callback){var done=callback;var name=filename;// support function as second arg
if(typeof filename==='function'){done=filename;name=null;}// set Content-Disposition when file is sent
var headers={'Content-Disposition':contentDisposition(name||path)};// Resolve the full path for sendFile
var fullPath=resolve(path);return this.sendFile(fullPath,{headers:headers},done);};/**
 * Set _Content-Type_ response header with `type` through `mime.lookup()`
 * when it does not contain "/", or set the Content-Type to `type` otherwise.
 *
 * Examples:
 *
 *     res.type('.html');
 *     res.type('html');
 *     res.type('json');
 *     res.type('application/json');
 *     res.type('png');
 *
 * @param {String} type
 * @return {ServerResponse} for chaining
 * @public
 */res.contentType=res.type=function contentType(type){var ct=type.indexOf('/')===-1?mime.lookup(type):type;return this.set('Content-Type',ct);};/**
 * Respond to the Acceptable formats using an `obj`
 * of mime-type callbacks.
 *
 * This method uses `req.accepted`, an array of
 * acceptable types ordered by their quality values.
 * When "Accept" is not present the _first_ callback
 * is invoked, otherwise the first match is used. When
 * no match is performed the server responds with
 * 406 "Not Acceptable".
 *
 * Content-Type is set for you, however if you choose
 * you may alter this within the callback using `res.type()`
 * or `res.set('Content-Type', ...)`.
 *
 *    res.format({
 *      'text/plain': function(){
 *        res.send('hey');
 *      },
 *
 *      'text/html': function(){
 *        res.send('<p>hey</p>');
 *      },
 *
 *      'appliation/json': function(){
 *        res.send({ message: 'hey' });
 *      }
 *    });
 *
 * In addition to canonicalized MIME types you may
 * also use extnames mapped to these types:
 *
 *    res.format({
 *      text: function(){
 *        res.send('hey');
 *      },
 *
 *      html: function(){
 *        res.send('<p>hey</p>');
 *      },
 *
 *      json: function(){
 *        res.send({ message: 'hey' });
 *      }
 *    });
 *
 * By default Express passes an `Error`
 * with a `.status` of 406 to `next(err)`
 * if a match is not made. If you provide
 * a `.default` callback it will be invoked
 * instead.
 *
 * @param {Object} obj
 * @return {ServerResponse} for chaining
 * @public
 */res.format=function(obj){var req=this.req;var next=req.next;var fn=obj.default;if(fn)delete obj.default;var keys=(0,_keys2.default)(obj);var key=keys.length>0?req.accepts(keys):false;this.vary("Accept");if(key){this.set('Content-Type',normalizeType(key).value);obj[key](req,this,next);}else if(fn){fn();}else{var err=new Error('Not Acceptable');err.status=err.statusCode=406;err.types=normalizeTypes(keys).map(function(o){return o.value;});next(err);}return this;};/**
 * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
 *
 * @param {String} filename
 * @return {ServerResponse}
 * @public
 */res.attachment=function attachment(filename){if(filename){this.type(extname(filename));}this.set('Content-Disposition',contentDisposition(filename));return this;};/**
 * Append additional header `field` with value `val`.
 *
 * Example:
 *
 *    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
 *    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
 *    res.append('Warning', '199 Miscellaneous warning');
 *
 * @param {String} field
 * @param {String|Array} val
 * @return {ServerResponse} for chaining
 * @public
 */res.append=function append(field,val){var prev=this.get(field);var value=val;if(prev){// concat the new and prev vals
value=Array.isArray(prev)?prev.concat(val):Array.isArray(val)?[prev].concat(val):[prev,val];}return this.set(field,value);};/**
 * Set header `field` to `val`, or pass
 * an object of header fields.
 *
 * Examples:
 *
 *    res.set('Foo', ['bar', 'baz']);
 *    res.set('Accept', 'application/json');
 *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
 *
 * Aliased as `res.header()`.
 *
 * @param {String|Object} field
 * @param {String|Array} val
 * @return {ServerResponse} for chaining
 * @public
 */res.set=res.header=function header(field,val){if(arguments.length===2){var value=Array.isArray(val)?val.map(String):String(val);// add charset to content-type
if(field.toLowerCase()==='content-type'){if(Array.isArray(value)){throw new TypeError('Content-Type cannot be set to an Array');}if(!charsetRegExp.test(value)){var charset=mime.charsets.lookup(value.split(';')[0]);if(charset)value+='; charset='+charset.toLowerCase();}}this.setHeader(field,value);}else{for(var key in field){this.set(key,field[key]);}}return this;};/**
 * Get value for header `field`.
 *
 * @param {String} field
 * @return {String}
 * @public
 */res.get=function(field){return this.getHeader(field);};/**
 * Clear cookie `name`.
 *
 * @param {String} name
 * @param {Object} [options]
 * @return {ServerResponse} for chaining
 * @public
 */res.clearCookie=function clearCookie(name,options){var opts=merge({expires:new Date(1),path:'/'},options);return this.cookie(name,'',opts);};/**
 * Set cookie `name` to `value`, with the given `options`.
 *
 * Options:
 *
 *    - `maxAge`   max-age in milliseconds, converted to `expires`
 *    - `signed`   sign the cookie
 *    - `path`     defaults to "/"
 *
 * Examples:
 *
 *    // "Remember Me" for 15 minutes
 *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
 *
 *    // save as above
 *    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
 *
 * @param {String} name
 * @param {String|Object} value
 * @param {Object} [options]
 * @return {ServerResponse} for chaining
 * @public
 */res.cookie=function(name,value,options){var opts=merge({},options);var secret=this.req.secret;var signed=opts.signed;if(signed&&!secret){throw new Error('cookieParser("secret") required for signed cookies');}var val=(typeof value==='undefined'?'undefined':(0,_typeof3.default)(value))==='object'?'j:'+(0,_stringify2.default)(value):String(value);if(signed){val='s:'+sign(val,secret);}if('maxAge'in opts){opts.expires=new Date(Date.now()+opts.maxAge);opts.maxAge/=1000;}if(opts.path==null){opts.path='/';}this.append('Set-Cookie',cookie.serialize(name,String(val),opts));return this;};/**
 * Set the location header to `url`.
 *
 * The given `url` can also be "back", which redirects
 * to the _Referrer_ or _Referer_ headers or "/".
 *
 * Examples:
 *
 *    res.location('/foo/bar').;
 *    res.location('http://example.com');
 *    res.location('../login');
 *
 * @param {String} url
 * @return {ServerResponse} for chaining
 * @public
 */res.location=function location(url){var loc=url;// "back" is an alias for the referrer
if(url==='back'){loc=this.req.get('Referrer')||'/';}// set location
return this.set('Location',encodeUrl(loc));};/**
 * Redirect to the given `url` with optional response `status`
 * defaulting to 302.
 *
 * The resulting `url` is determined by `res.location()`, so
 * it will play nicely with mounted apps, relative paths,
 * `"back"` etc.
 *
 * Examples:
 *
 *    res.redirect('/foo/bar');
 *    res.redirect('http://example.com');
 *    res.redirect(301, 'http://example.com');
 *    res.redirect('../login'); // /blog/post/1 -> /blog/login
 *
 * @public
 */res.redirect=function redirect(url){var address=url;var body;var status=302;// allow status / url
if(arguments.length===2){if(typeof arguments[0]==='number'){status=arguments[0];address=arguments[1];}else{deprecate('res.redirect(url, status): Use res.redirect(status, url) instead');status=arguments[1];}}// Set location header
address=this.location(address).get('Location');// Support text/{plain,html} by default
this.format({text:function text(){body=statuses[status]+'. Redirecting to '+address;},html:function html(){var u=escapeHtml(address);body='<p>'+statuses[status]+'. Redirecting to <a href="'+u+'">'+u+'</a></p>';},default:function _default(){body='';}});// Respond
this.statusCode=status;this.set('Content-Length',Buffer.byteLength(body));if(this.req.method==='HEAD'){this.end();}else{this.end(body);}};/**
 * Add `field` to Vary. If already present in the Vary set, then
 * this call is simply ignored.
 *
 * @param {Array|String} field
 * @return {ServerResponse} for chaining
 * @public
 */res.vary=function(field){// checks for back-compat
if(!field||Array.isArray(field)&&!field.length){deprecate('res.vary(): Provide a field name');return this;}vary(this,field);return this;};/**
 * Render `view` with the given `options` and optional callback `fn`.
 * When a callback function is given a response will _not_ be made
 * automatically, otherwise a response of _200_ and _text/html_ is given.
 *
 * Options:
 *
 *  - `cache`     boolean hinting to the engine it should cache
 *  - `filename`  filename of the view being rendered
 *
 * @public
 */res.render=function render(view,options,callback){var app=this.req.app;var done=callback;var opts=options||{};var req=this.req;var self=this;// support callback function as second arg
if(typeof options==='function'){done=options;opts={};}// merge res.locals
opts._locals=self.locals;// default callback to respond
done=done||function(err,str){if(err)return req.next(err);self.send(str);};// render
app.render(view,opts,done);};// pipe the send file stream
function sendfile(res,file,options,callback){var done=false;var streaming;// request aborted
function onaborted(){if(done)return;done=true;var err=new Error('Request aborted');err.code='ECONNABORTED';callback(err);}// directory
function ondirectory(){if(done)return;done=true;var err=new Error('EISDIR, read');err.code='EISDIR';callback(err);}// errors
function onerror(err){if(done)return;done=true;callback(err);}// ended
function onend(){if(done)return;done=true;callback();}// file
function onfile(){streaming=false;}// finished
function onfinish(err){if(err&&err.code==='ECONNRESET')return onaborted();if(err)return onerror(err);if(done)return;setImmediate(function(){if(streaming!==false&&!done){onaborted();return;}if(done)return;done=true;callback();});}// streaming
function onstream(){streaming=true;}file.on('directory',ondirectory);file.on('end',onend);file.on('error',onerror);file.on('file',onfile);file.on('stream',onstream);onFinished(res,onfinish);if(options.headers){// set headers on successful transfer
file.on('headers',function headers(res){var obj=options.headers;var keys=(0,_keys2.default)(obj);for(var i=0;i<keys.length;i++){var k=keys[i];res.setHeader(k,obj[k]);}});}// pipe
file.pipe(res);}/**
 * Stringify JSON, like JSON.stringify, but v8 optimized.
 * @private
 */function stringify(value,replacer,spaces){// v8 checks arguments.length for optimizing simple call
// https://bugs.chromium.org/p/v8/issues/detail?id=4730
return replacer||spaces?(0,_stringify2.default)(value,replacer,spaces):(0,_stringify2.default)(value);}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer,__webpack_require__(18).setImmediate);/***/},/* 238 *//***/function(module,exports,__webpack_require__){/**
 * Module dependencies.
 */var crypto=__webpack_require__(72);/**
 * Sign the given `val` with `secret`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */exports.sign=function(val,secret){if('string'!=typeof val)throw new TypeError("Cookie value must be provided as a string.");if('string'!=typeof secret)throw new TypeError("Secret string must be provided.");return val+'.'+crypto.createHmac('sha256',secret).update(val).digest('base64').replace(/\=+$/,'');};/**
 * Unsign and decode the given `val` with `secret`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */exports.unsign=function(val,secret){if('string'!=typeof val)throw new TypeError("Signed cookie string must be provided.");if('string'!=typeof secret)throw new TypeError("Secret string must be provided.");var str=val.slice(0,val.lastIndexOf('.')),mac=exports.sign(str,secret);return sha1(mac)==sha1(val)?str:false;};/**
 * Private
 */function sha1(str){return crypto.createHash('sha1').update(str).digest('hex');}/***/},/* 239 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 * @public
 */exports.parse=parse;exports.serialize=serialize;/**
 * Module variables.
 * @private
 */var decode=decodeURIComponent;var encode=encodeURIComponent;var pairSplitRegExp=/; */;/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */var fieldContentRegExp=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */function parse(str,options){if(typeof str!=='string'){throw new TypeError('argument str must be a string');}var obj={};var opt=options||{};var pairs=str.split(pairSplitRegExp);var dec=opt.decode||decode;for(var i=0;i<pairs.length;i++){var pair=pairs[i];var eq_idx=pair.indexOf('=');// skip things that don't look like key=value
if(eq_idx<0){continue;}var key=pair.substr(0,eq_idx).trim();var val=pair.substr(++eq_idx,pair.length).trim();// quoted values
if('"'==val[0]){val=val.slice(1,-1);}// only assign once
if(undefined==obj[key]){obj[key]=tryDecode(val,dec);}}return obj;}/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */function serialize(name,val,options){var opt=options||{};var enc=opt.encode||encode;if(typeof enc!=='function'){throw new TypeError('option encode is invalid');}if(!fieldContentRegExp.test(name)){throw new TypeError('argument name is invalid');}var value=enc(val);if(value&&!fieldContentRegExp.test(value)){throw new TypeError('argument val is invalid');}var str=name+'='+value;if(null!=opt.maxAge){var maxAge=opt.maxAge-0;if(isNaN(maxAge))throw new Error('maxAge should be a Number');str+='; Max-Age='+Math.floor(maxAge);}if(opt.domain){if(!fieldContentRegExp.test(opt.domain)){throw new TypeError('option domain is invalid');}str+='; Domain='+opt.domain;}if(opt.path){if(!fieldContentRegExp.test(opt.path)){throw new TypeError('option path is invalid');}str+='; Path='+opt.path;}if(opt.expires){if(typeof opt.expires.toUTCString!=='function'){throw new TypeError('option expires is invalid');}str+='; Expires='+opt.expires.toUTCString();}if(opt.httpOnly){str+='; HttpOnly';}if(opt.secure){str+='; Secure';}if(opt.sameSite){var sameSite=typeof opt.sameSite==='string'?opt.sameSite.toLowerCase():opt.sameSite;switch(sameSite){case true:str+='; SameSite=Strict';break;case'lax':str+='; SameSite=Lax';break;case'strict':str+='; SameSite=Strict';break;default:throw new TypeError('option sameSite is invalid');}}return str;}/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */function tryDecode(str,decode){try{return decode(str);}catch(e){return str;}}/***/},/* 240 *//***/function(module,exports,__webpack_require__){"use strict";/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module exports.
 */module.exports=vary;module.exports.append=append;/**
 * Regular expression to split on commas, trimming spaces
 * @private
 */var ARRAY_SPLIT_REGEXP=/ *, */;/**
 * RegExp to match field-name in RFC 7230 sec 3.2
 *
 * field-name    = token
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 */var FIELD_NAME_REGEXP=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;/**
 * Append a field to a vary header.
 *
 * @param {String} header
 * @param {String|Array} field
 * @return {String}
 * @public
 */function append(header,field){if(typeof header!=='string'){throw new TypeError('header argument is required');}if(!field){throw new TypeError('field argument is required');}// get fields array
var fields=!Array.isArray(field)?parse(String(field)):field;// assert on invalid field names
for(var j=0;j<fields.length;j++){if(!FIELD_NAME_REGEXP.test(fields[j])){throw new TypeError('field argument contains an invalid header name');}}// existing, unspecified vary
if(header==='*'){return header;}// enumerate current values
var val=header;var vals=parse(header.toLowerCase());// unspecified vary
if(fields.indexOf('*')!==-1||vals.indexOf('*')!==-1){return'*';}for(var i=0;i<fields.length;i++){var fld=fields[i].toLowerCase();// append value (case-preserving)
if(vals.indexOf(fld)===-1){vals.push(fld);val=val?val+', '+fields[i]:fields[i];}}return val;}/**
 * Parse a vary header into an array.
 *
 * @param {String} header
 * @return {Array}
 * @private
 */function parse(header){return header.trim().split(ARRAY_SPLIT_REGEXP);}/**
 * Mark that a request is varied on a header field.
 *
 * @param {Object} res
 * @param {String|Array} field
 * @public
 */function vary(res,field){if(!res||!res.getHeader||!res.setHeader){// quack quack
throw new TypeError('res argument is required');}// get existing header
var val=res.getHeader('Vary')||'';var header=Array.isArray(val)?val.join(', '):String(val);// set new header
if(val=append(header,field)){res.setHeader('Vary',val);}}/***/},/* 241 *//***/function(module,exports,__webpack_require__){"use strict";/* WEBPACK VAR INJECTION */(function(Buffer){/*!
 * serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 *//**
 * Module dependencies.
 * @private
 */var encodeUrl=__webpack_require__(28);var escapeHtml=__webpack_require__(29);var parseUrl=__webpack_require__(19);var resolve=__webpack_require__(9).resolve;var send=__webpack_require__(46);var url=__webpack_require__(40);/**
 * Module exports.
 * @public
 */module.exports=serveStatic;module.exports.mime=send.mime;/**
 * @param {string} root
 * @param {object} [options]
 * @return {function}
 * @public
 */function serveStatic(root,options){if(!root){throw new TypeError('root path required');}if(typeof root!=='string'){throw new TypeError('root path must be a string');}// copy options object
var opts=(0,_create2.default)(options||null);// fall-though
var fallthrough=opts.fallthrough!==false;// default redirect
var redirect=opts.redirect!==false;// headers listener
var setHeaders=opts.setHeaders;if(setHeaders&&typeof setHeaders!=='function'){throw new TypeError('option setHeaders must be function');}// setup options for send
opts.maxage=opts.maxage||opts.maxAge||0;opts.root=resolve(root);// construct directory listener
var onDirectory=redirect?createRedirectDirectoryListener():createNotFoundDirectoryListener();return function serveStatic(req,res,next){if(req.method!=='GET'&&req.method!=='HEAD'){if(fallthrough){return next();}// method not allowed
res.statusCode=405;res.setHeader('Allow','GET, HEAD');res.setHeader('Content-Length','0');res.end();return;}var forwardError=!fallthrough;var originalUrl=parseUrl.original(req);var path=parseUrl(req).pathname;// make sure redirect occurs at mount
if(path==='/'&&originalUrl.pathname.substr(-1)!=='/'){path='';}// create send stream
var stream=send(req,path,opts);// add directory handler
stream.on('directory',onDirectory);// add headers listener
if(setHeaders){stream.on('headers',setHeaders);}// add file listener for fallthrough
if(fallthrough){stream.on('file',function onFile(){// once file is determined, always forward error
forwardError=true;});}// forward errors
stream.on('error',function error(err){if(forwardError||!(err.statusCode<500)){next(err);return;}next();});// pipe
stream.pipe(res);};}/**
 * Collapse all leading slashes into a single slash
 * @private
 */function collapseLeadingSlashes(str){for(var i=0;i<str.length;i++){if(str[i]!=='/'){break;}}return i>1?'/'+str.substr(i):str;}/**
 * Create a minimal HTML document.
 *
 * @param {string} title
 * @param {string} body
 * @private
 */function createHtmlDocument(title,body){return'<!DOCTYPE html>\n'+'<html lang="en">\n'+'<head>\n'+'<meta charset="utf-8">\n'+'<title>'+title+'</title>\n'+'</head>\n'+'<body>\n'+'<pre>'+body+'</pre>\n'+'</body>\n';}/**
 * Create a directory listener that just 404s.
 * @private
 */function createNotFoundDirectoryListener(){return function notFound(){this.error(404);};}/**
 * Create a directory listener that performs a redirect.
 * @private
 */function createRedirectDirectoryListener(){return function redirect(res){if(this.hasTrailingSlash()){this.error(404);return;}// get original URL
var originalUrl=parseUrl.original(this.req);// append trailing slash
originalUrl.path=null;originalUrl.pathname=collapseLeadingSlashes(originalUrl.pathname+'/');// reformat the URL
var loc=encodeUrl(url.format(originalUrl));var doc=createHtmlDocument('Redirecting','Redirecting to <a href="'+escapeHtml(loc)+'">'+escapeHtml(loc)+'</a>');// send redirect response
res.statusCode=301;res.setHeader('Content-Type','text/html; charset=UTF-8');res.setHeader('Content-Length',Buffer.byteLength(doc));res.setHeader('Content-Security-Policy',"default-src 'self'");res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Location',loc);res.end(doc);};}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(0).Buffer);/***/}]/******/);
//# sourceMappingURL=bundle.js.map