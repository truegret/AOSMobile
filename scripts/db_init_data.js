selShipToName.innerHTML = '<b>Shipping To: </b>Dickinson+Associates';
selShipToAddr1.innerHTML = 'One North LaSalle Street';
selShipToCity.innerHTML = 'Chicago';
selShipToStateAndPostal.innerHTML = 'IL, 60602';

// Database creation and management section
var msg = '';
var results = document.getElementById('results'); 
var id = document.getElementById('id');
var ShipToName = document.getElementById('ShipToName');  
var ShipToAddr1 = document.getElementById('ShipToAddr1');  
var ShipToCity = document.getElementById('ShipToCity');
var ShipToState = document.getElementById('ShipToState');
var ShipToZipPostal = document.getElementById('ShipToZipPostal');

var createStatement = "CREATE TABLE IF NOT EXISTS ShipToAccts (id INTEGER PRIMARY KEY AUTOINCREMENT, ShipToName TEXT, ShipToAddr1 TEXT, ShipToCity TEXT, ShipToState TEXT, ShipToZipPostal TEXT)";
var selectAllStatement = "SELECT * FROM ShipToAccts ORDER BY ShipToName ASC";
var selectRecordStatement = "SELCECT * FROM ShipToAccts WHERE id = ?";
var insertStatement = "INSERT INTO ShipToAccts (ShipToName, ShipToAddr1, ShipToCity, ShipToState, ShipToZipPostal) VALUES (?, ?, ?, ?, ?)";
var updateStatement = "UPDATE ShipToAccts SET ShipToName = ?, ShipToAddr1 = ?, ShipToCity = ?, ShipToState = ?, ShipToZipPostal = ? WHERE id = ?";
var deleteStatement = "DELETE FROM ShipToAccts WHERE id=?";
var dropStatement = "DROP TABLE ShipToAccts";
var db = openDatabase("AccountsBook", "1.0", "Accounts Book", 300000);
var dataset;
createTable(createStatement);

/*
*/
// Create tables
var createAOSCustomers = "CREATE TABLE IF NOT EXISTS AOS_Customers (nAOSShipToAcctID INTEGER PRIMARY KEY AUTOINCREMENT, sShipToID INTEGER, sShipToAcctName1 INTEGER, sShipToAcctName2 TEXT, sShipToAcctAddr1 TEXT, sShipToAcctCity TEXT, sShipToAcctState TEXT, sShipToAcctCounty TEXT, sShipToAcctPostal TEXT, sShipToAcctCountry TEXT, sSoldToAcctPayTerms TEXT, sSoldToAcctPricingTierDesc TEXT, sShipToAcctShippingCond TEXT, bSoldToAcctCompDelivery INTEGER, bSoldToAcctDisplayNoBackOrder INTEGER, nSoldToAcctFreightChargeMeth INTEGER, sShippingMethod TEXT, sSPName1 TEXT, sSPName2 TEXT, sSPAddr1 TEXT, sSPCity TEXT, sSPRegion TEXT, sSPPostal TEXT)";
var createAOSProducts = "CREATE TABLE IF NOT EXISTS AOS_Products (nAOSProductsID INTEGER PRIMARY KEY AUTOINCREMENT, sSKU TEXT, sDescription TEXT, sBaseUOM TEXT, sItemEntryQTY INTEGER, sPricingPerUnit TEXT, sProductURL TEXT, sGSAIndicator TEXT)";
var createAOSPricing = "CREATE TABLE IF NOT EXISTS AOS_Pricing (nAOSPricingID INTEGER PRIMARY KEY AUTOINCREMENT, sMaterialNumber TEXT, nListPrice NUMERIC, sCommissionLevelHigh TEXT, nPriceHigh NUMERIC, sCommisionLevelMid TEXT, nPriceMid NUMERIC, sCommissionLevelLow TEXT, nPriceLow NUMERIC)";

// Insert into tables
var insertAOSCustomers = "INSERT INTO AOS_Customers (sShipToID, sShipToAcctName1, sShipToAcctName2, sShipToAcctAddr1, sShipToAcctCity, sShipToAcctState, sShipToAcctCounty, sShipToAcctPostal, sShipToAcctCountry, sSoldToAcctPayTerms, sSoldToAcctPricingTierDesc, sShipToAcctShippingCond, bSoldToAcctCompDelivery, bSoldToAcctDisplayNoBackOrder, nSoldToAcctFreightChargeMeth, sShippingMethod, sSPName1, sSPName2, sSPAddr1, sSPCity, sSPRegion, sSPPostal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var insertAOSProducts = "INSERT INTO AOS_Products (sSKU, sDescription, sBaseUOM, sItemEntryQTY, sPricingPerUnit, sProductURL, sGSAIndicator) VALUES (?, ?, ?, ?, ?, ?, ?)";
var insertAOSPricing = "INSERT INTO AOS_Pricing (sMaterialNumber, nListPrice, sCommissionLevelHigh, nPriceHigh, sCommisionLevelMid, nPriceMid, sCommissionLevelLow, nPriceLow) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Select ALL from tables
selectAOSCustomersALL = "SELECT * FROM AOS_Customers ORDER BY sShipToID ASC";
selectAOSProductsALL = "SELECT * FROM AOS_Products ORDER BY nAOSProductsID ASC";
selectAOSPricingALL = "SELECT * FROM AOS_Pricing ORDER BY sMaterialNumber ASC";

// Create tables
createAOSTable(createAOSCustomers);
createAOSTable(createAOSProducts);
createAOSTable(createAOSPricing);
/*
*/

function onError(tx, error) {
	alert('Diagnostics Message:\n' + error.message + '\n' + msg);
}

function showRecords() {
	results.innerHTML = '';
	db.transaction(function(tx) {
		tx.executeSql(selectAllStatement, [], function(tx, result) {
		dataset = result.rows;
		results.innerHTML += '';
		for (var i = 0, item = null; i < dataset.length; i++) {
			item = dataset.item(i);
			results.innerHTML += '<li>' + item['ShipToName'] + ' ' + item['ShipToAddr1'] + ' ' + item['ShipToCity'] + ' ' + item['ShipToState'] + ', ' + item['ShipToZipPostal'] + ' <a href="#" onclick="selectRecord('+i+')"><img valign="top" align="center" title="Select this record" src="./images/icon-sel_256x256.png" alt="select record" width="16" /></a> ' + ' <a href="#" onclick="loadRecord('+i+')"><img valign="top" align="center" title="Edit this record" src="./images/icon-edit_256x256.png" alt="edit record" width="16" /></a> ' + ' <a href="#" onclick="deleteRecord('+item['id']+')"><img valign="top" align="center" title="Delete this record" src="./images/icon-del_256x256.png" alt="delete record" width="16" /></a></li>';
			}
		});
	});
}

function createTable(tblName) {
	msg = 'createTable: ' + tblName;
	db.transaction(function(tx) {
		tx.executeSql(tblName, [], showRecords, onError);
	});
}

function createAOSTable(tblName) { 
	msg = 'createAOSTable: ' + tblName;
	db.transaction(function(tx) {
	tx.executeSql(tblName, [], resetForm, onError);
	});
}

function insertRecord() {
	msg = 'insertRecord';
	db.transaction(function(tx) {
		tx.executeSql(insertStatement, [ShipToName.value, ShipToAddr1.value, ShipToCity.value, ShipToState.value, ShipToZipPostal.value], loadAndReset, onError);
	});
}

function insertAOSRecord(tblName) {
	msg = 'insertAOSRecord - table: ' + tblName;
	db.transaction(function(tx) {
		switch(tblName)
		{
		case 'AOS_Customers':
		// sShipToID, sShipToAcctName1, sShipToAcctName2, sShipToAcctAddr1, sShipToAcctCity, sShipToAcctState, sShipToAcctCounty, sShipToAcctPostal, sShipToAcctCountry, sSoldToAcctPayTerms, sSoldToAcctPricingTierDesc, sShipToAcctShippingCond, bSoldToAcctCompDelivery, bSoldToAcctDisplayNoBackOrder, nSoldToAcctFreightChargeMeth, sShippingMethod, sSPName1, sSPName2, sSPAddr1, sSPCity, sSPRegion, sSPPostal
			tx.executeSql(insertAOSCustomers, ['100293448', 'Dickinson+Associates', 'Unavailable', '1 North LaSalle Stree', 'Chicago', 'IL', 'OHare', '60602', 'USofA', 'Net 30', 'Tier 2', 'Unknown', 0, 0, 32, 'Ground', 'sSPName1', 'sSPName2', 'sSPAddr1', 'sSPCity', 'sSPRegion', 'sSPPostal'], loadAndReset, onError);
			break;
		case 'AOS_Products':
		// sSKU, sDescription, sBaseUOM, sItemEntryQTY, sPricingPerUnit, sProductURL, sGSAIndicator
			tx.executeSql(insertAOSProducts, ['100069423356', 'SanDisk 32GB Cruze USB Flash Drive', 'EA', 6, '17.95', 'http://www.lawsonproducts.com', 'sGSAIndicator'], loadAndReset, onError);
			break;
		case 'AOS_Pricing':
		// sMaterialNumber, nListPrice, sCommissionLevelHigh, nPriceHigh, sCommisionLevelMid, nPriceMid, sCommissionLevelLow, nPriceLow
			tx.executeSql(insertAOSPricing, ['sMaterialNumber', 185.00, 'sCommissionLevelHigh', 200.00, 'sCommisionLevelMid', 180.00, 'sCommissionLevelLow', 170.00], loadAndReset, onError);
			break;
		default:
			alert('Unknown table name on INSERT');
		}
	});
}

function loadRecord(i) {
	var item = dataset.item(i); 
	ShipToName.value = item['ShipToName'];
	ShipToAddr1.value = item['ShipToAddr1'];
	ShipToCity.value = item['ShipToCity'];
	ShipToState.value = item['ShipToState'];
	ShipToZipPostal.value = item['ShipToZipPostal'];
	id.value = item['id']; 
}

function updateRecord() {
	msg = 'updateRecord';
	db.transaction(function(tx) {
		tx.executeSql(updateStatement, [ShipToName.value, ShipToAddr1.value, ShipToCity.value, ShipToState.value, ShipToZipPostal.value, id.value], loadAndReset, onError);
	}); 
}

function deleteRecord(id) {
	msg = 'deleteRecord - id: ' + id;
	db.transaction(function(tx) {
		tx.executeSql(deleteStatement, [id], showRecords, onError);
	});
	resetForm();
}

function selectRecord(i) {
	var item = dataset.item(i); 
	selShipToName.innerHTML = '<b>Shipping To: </b>' + item['ShipToName'];
	selShipToAddr1.innerHTML = item['ShipToAddr1'];
	selShipToCity.innerHTML = item['ShipToCity'];
	selShipToStateAndPostal.innerHTML = item['ShipToState'] + ', ' + item['ShipToZipPostal'];
	id.value = item['id']; 
}

function dropTable() {
	msg = 'dropTable';
	db.transaction(function(tx) {
		tx.executeSql(dropStatement, [], showRecords, onError);
	});
	resetForm();
}

function loadAndReset() {
	resetForm();
	showRecords();
}

function resetForm() {
	ShipToName.value = '';
	ShipToAddr1.value = '';
	ShipToCity.value = '';
	ShipToState.value = '';
	ShipToZipPostal.value = '';
	id.value = '';
}

$(document).ready(function() {
	$("button[rel]").overlay();
});	

$(document).ready(function() {
	$("img[rel]").overlay();
});	   
