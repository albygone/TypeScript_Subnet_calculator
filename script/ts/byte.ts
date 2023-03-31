export class Byte {
	private byte = [false, false, false, false, false, false, false, false];

	constructor(num: number) {
		if(num < 0 || num > 255)
			throw new Error("The byte type can only contain values from 0 to 255");

		const sNumber = num.toString(2).padStart(8, '0')

		this.byte = this.byte.map((value, index) => {
			return sNumber[index] == '0' ? false : true;
		})
	}

	//#region bitwise operations

	bitAnd (byte2: Byte): Byte{
		this.byte.forEach((item, index) => {
			byte2.byte[index] = item && byte2.byte[index]
		});
		return byte2;
	} 
	
	bitOr (byte2: Byte): Byte {

		this.byte.forEach((item, index) => {
			byte2.byte[index] = item || byte2.byte[index]
		});
		return byte2;
	} 

	bitNot (): Byte {
		const byte2 = new Byte(0);

		this.byte.forEach((item, index) => {
			byte2.byte[index] = !item;
		});

		return byte2;
	}

	//#endregion

	//#region parsing

	toNumber = (): number => parseInt(this.toString(), 2);

	toString(): string {
		let num = "";

		this.byte.forEach((item) => {
			num += item ? "1" : "0";
		})
		
		return num;
	}

	//#endregion
}
