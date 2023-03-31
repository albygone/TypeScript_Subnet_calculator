import { Ip } from "./Ip";
import { Byte } from "./byte";
var IpCalculator = (function () {
    function IpCalculator() {
    }
    IpCalculator.calculateResults = function (hostIp, maskIp) {
        return [
            [
                "",
                "Decimale",
                "Binario"
            ],
            [
                "Ip inserito",
                hostIp.toString(),
                hostIp.toBinaryString()
            ],
            [
                "Netmask cisco format",
                maskIp.toCiscoString(),
                maskIp.toBinaryString()
            ],
            [
                "Wild card mask",
                maskIp.bitNot().toString(),
                maskIp.bitNot().toBinaryString()
            ],
            [
                "Ip broadcast",
                hostIp.bitOr(maskIp.bitNot()).toString(),
                hostIp.bitOr(maskIp.bitNot()).toBinaryString()
            ],
            [
                "Ip rete",
                hostIp.bitAnd(maskIp).toString(),
                hostIp.bitAnd(maskIp).toBinaryString()
            ],
            [
                "Numero reti",
                Ip.getAvailableSubNets(hostIp.bitOr(maskIp.bitNot()), hostIp.bitAnd(maskIp)).toString(),
                ""
            ],
        ];
    };
    IpCalculator.createIp = function (_byte1, _byte2, _byte3, _byte4) {
        return new Ip(new Byte(_byte1), new Byte(_byte2), new Byte(_byte3), new Byte(_byte4));
    };
    return IpCalculator;
}());
export { IpCalculator };
