var Byte = (function () {
    function Byte(num) {
        var _this = this;
        this.byte = [false, false, false, false, false, false, false, false];
        this.toNumber = function () { return parseInt(_this.toString(), 2); };
        if (num < 0 || num > 255)
            throw new Error("The byte type can only contain values from 0 to 255");
        var sNumber = num.toString(2).padStart(8, '0');
        this.byte = this.byte.map(function (value, index) {
            return sNumber[index] == '0' ? false : true;
        });
    }
    Byte.prototype.bitAnd = function (byte2) {
        this.byte.forEach(function (item, index) {
            byte2.byte[index] = item && byte2.byte[index];
        });
        return byte2;
    };
    Byte.prototype.bitOr = function (byte2) {
        this.byte.forEach(function (item, index) {
            byte2.byte[index] = item || byte2.byte[index];
        });
        return byte2;
    };
    Byte.prototype.bitNot = function () {
        var byte2 = new Byte(0);
        this.byte.forEach(function (item, index) {
            byte2.byte[index] = !item;
        });
        return byte2;
    };
    Byte.prototype.toString = function () {
        var num = "";
        this.byte.forEach(function (item) {
            num += item ? "1" : "0";
        });
        return num;
    };
    return Byte;
}());
export { Byte };
