import { Byte } from './byte.js';
var Ip = (function () {
    function Ip(_byte1, _byte2, _byte3, _byte4) {
        var _this = this;
        this.bitOr = function (secondIp) { return new Ip(_this.byte1.bitOr(secondIp.byte1), _this.byte2.bitOr(secondIp.byte2), _this.byte3.bitOr(secondIp.byte3), _this.byte4.bitOr(secondIp.byte4)); };
        this.bitAnd = function (secondIp) { return new Ip(_this.byte1.bitAnd(secondIp.byte1), _this.byte2.bitAnd(secondIp.byte2), _this.byte3.bitAnd(secondIp.byte3), _this.byte4.bitAnd(secondIp.byte4)); };
        this.bitNot = function () { return new Ip(_this.byte1.bitNot(), _this.byte2.bitNot(), _this.byte3.bitNot(), _this.byte4.bitNot()); };
        this.toString = function () {
            return "".concat(_this.byte1.toNumber(), ".").concat(_this.byte2.toNumber(), ".").concat(_this.byte3.toNumber(), ".").concat(_this.byte4.toNumber());
        };
        this.toBinaryString = function () {
            return "".concat(_this.byte1.toString(), ".").concat(_this.byte2.toString(), ".").concat(_this.byte3.toString(), ".").concat(_this.byte4.toString());
        };
        this.byte1 = _byte1;
        this.byte2 = _byte2;
        this.byte3 = _byte3;
        this.byte4 = _byte4;
    }
    Ip.getAvailableHosts = function (subnet) {
        var aus = subnet.bitNot();
        return ((aus.byte1.bitOr(new Byte(255)).toNumber()) *
            (aus.byte2.bitOr(new Byte(255)).toNumber()) *
            (aus.byte3.bitOr(new Byte(255)).toNumber()) *
            (aus.byte4.bitOr(new Byte(255)).toNumber())) - 1;
    };
    Ip.getAvailableSubNets = function (broadcastIp, networkIp) {
        var arr = new Uint8Array([
            parseInt(broadcastIp.toBinaryString().split(".").join(""), 2),
            parseInt(networkIp.toBinaryString().split(".").join(""), 2)
        ]);
        return ((arr[0] - arr[1]) / 256);
    };
    Ip.prototype.toCiscoString = function () {
        var bitString = this.toBinaryString().split(".").join("");
        var i = 0;
        while (bitString[i] == '1' && i < bitString.length)
            i++;
        return "".concat(this.toString(), "/").concat(i);
    };
    return Ip;
}());
export { Ip };
