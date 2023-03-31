import { Ip } from "./Ip";
import { Byte } from "./byte";

export class IpCalculator{

    static calculateResults = (hostIp: Ip, maskIp: Ip): string[][] => 
        [
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

    static createIp = (_byte1: number, _byte2: number, _byte3: number, _byte4: number) => 
        new Ip(new Byte(_byte1), new Byte(_byte2), new Byte(_byte3), new Byte(_byte4));
}