import { IpCalculator } from './IpCalculator';

window.onload = () => {
	document.getElementById('frmInput').addEventListener('submit', () => getIps(event));
}

function getIps(event: Event){

	event.preventDefault();

	try {
		let txtIp = <HTMLInputElement>document.getElementById('txtHostIp');
		let stringIp = txtIp.value.split('.');

		const hostIp = IpCalculator.createIp(
			parseInt(stringIp[0]),
			parseInt(stringIp[1]),
			parseInt(stringIp[2]),
			parseInt(stringIp[3]),
		);

		txtIp = <HTMLInputElement>document.getElementById('txtMaskIp');
		stringIp = txtIp.value.split('.');

		const maskIp = IpCalculator.createIp(
			parseInt(stringIp[0]),
			parseInt(stringIp[1]),
			parseInt(stringIp[2]),
			parseInt(stringIp[3]),
		);

		createTable(IpCalculator.calculateResults(hostIp, maskIp));
	} catch(e) {
		console.warn("Errore durante l'inseimento dei dati " + e);
	}
}

function createTable(results: string[][]): void{
	const table = <HTMLTableElement>document.getElementById('resultsTable');
	const thead = <HTMLTableSectionElement>document.createElement('thead');
	const tr = <HTMLTableRowElement>document.createElement('tr');
	const tbody = <HTMLTableSectionElement>document.createElement('thead');
	
	table.innerHTML = "";

	results[0].forEach((item) => {
		const th = <HTMLTableCellElement>document.createElement('th');

		th.innerText = item;
		tr.append(th);
	})

	thead.append(tr);

	results.forEach((item, index) => {
		if(index === 0)
			return;

		const tr = <HTMLTableRowElement>document.createElement('tr');

		item.forEach((subItem) => {
			const td = <HTMLTableCellElement>document.createElement('td');

			td.innerText = subItem;
			tr.append(td);
		})

		tbody.append(tr);
	})

	table.append(thead);
	table.append(tbody);
}