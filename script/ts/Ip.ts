import { Byte } from './byte.js';

export class Ip {
    byte1: Byte;
    byte2: Byte;
    byte3: Byte;
    byte4: Byte;

    //#region static

    static getAvailableHosts(subnet: Ip): number {
        const aus = subnet.bitNot();
        return (
            (aus.byte1.bitOr(new Byte(255)).toNumber()) * 
            (aus.byte2.bitOr(new Byte(255)).toNumber()) * 
            (aus.byte3.bitOr(new Byte(255)).toNumber()) *
            (aus.byte4.bitOr(new Byte(255)).toNumber())) - 1;
    }

    static getAvailableSubNets(broadcastIp: Ip, networkIp: Ip): number{
        const arr: Uint8Array = new Uint8Array([
            parseInt(broadcastIp.toBinaryString().split(".").join(""), 2),
            parseInt(networkIp.toBinaryString().split(".").join(""), 2)
        ]);

        return((arr[0] - arr[1]) / 256);
    }

    //#endregion

    constructor(_byte1: Byte, _byte2: Byte, _byte3: Byte, _byte4: Byte){
        this.byte1 = _byte1;
        this.byte2 = _byte2;
        this.byte3 = _byte3;
        this.byte4 = _byte4;
    }

    //#region bitwise operations

    bitOr = (secondIp: Ip): Ip => new Ip(
            this.byte1.bitOr(secondIp.byte1),
            this.byte2.bitOr(secondIp.byte2),
            this.byte3.bitOr(secondIp.byte3),
            this.byte4.bitOr(secondIp.byte4)
        );
    

    bitAnd = (secondIp: Ip): Ip => new Ip(
            this.byte1.bitAnd(secondIp.byte1),
            this.byte2.bitAnd(secondIp.byte2),
            this.byte3.bitAnd(secondIp.byte3),
            this.byte4.bitAnd(secondIp.byte4)
        );
    

    bitNot = (): Ip => new Ip(
            this.byte1.bitNot(),
            this.byte2.bitNot(),
            this.byte3.bitNot(),
            this.byte4.bitNot()
        );

    //#endregion
    
    //#region parsing
    
    toCiscoString(): string{
        const bitString = this.toBinaryString().split(".").join("");
        
        let i = 0;
        
        while(bitString[i] == '1' && i < bitString.length)
            i++;
        
        return `${this.toString()}/${i}`;
    }
    
    toString = (): string => 
        `${this.byte1.toNumber()}.${this.byte2.toNumber()}.${this.byte3.toNumber()}.${this.byte4.toNumber()}`;
    
    
    toBinaryString = (): string => 
        `${this.byte1.toString()}.${this.byte2.toString()}.${this.byte3.toString()}.${this.byte4.toString()}`;

    //#endregion
}
