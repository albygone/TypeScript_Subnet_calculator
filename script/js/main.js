import { IpCalculator } from './IpCalculator';
window.onload = function () {
    document.getElementById('frmInput').addEventListener('submit', function () { return getIps(event); });
};
function getIps(event) {
    event.preventDefault();
    try {
        var txtIp = document.getElementById('txtHostIp');
        var stringIp = txtIp.value.split('.');
        var hostIp = IpCalculator.createIp(parseInt(stringIp[0]), parseInt(stringIp[1]), parseInt(stringIp[2]), parseInt(stringIp[3]));
        txtIp = document.getElementById('txtMaskIp');
        stringIp = txtIp.value.split('.');
        var maskIp = IpCalculator.createIp(parseInt(stringIp[0]), parseInt(stringIp[1]), parseInt(stringIp[2]), parseInt(stringIp[3]));
        createTable(IpCalculator.calculateResults(hostIp, maskIp));
    }
    catch (e) {
        console.warn("Errore durante l'inseimento dei dati " + e);
    }
}
function createTable(results) {
    var table = document.getElementById('resultsTable');
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var tbody = document.createElement('thead');
    table.innerHTML = "";
    results[0].forEach(function (item) {
        var th = document.createElement('th');
        th.innerText = item;
        tr.append(th);
    });
    thead.append(tr);
    results.forEach(function (item, index) {
        if (index === 0)
            return;
        var tr = document.createElement('tr');
        item.forEach(function (subItem) {
            var td = document.createElement('td');
            td.innerText = subItem;
            tr.append(td);
        });
        tbody.append(tr);
    });
    table.append(thead);
    table.append(tbody);
}
