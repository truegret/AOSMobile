selShipToName.innerHTML = '<b>Shipping To: </b>Dickinson+Associates';
selShipToAddr1.innerHTML = 'One North LaSalle Street';
selShipToCity.innerHTML = 'Chicago';
selShipToStateAndPostal.innerHTML = 'IL, 60602';

// Database creation and management section
var msg = '';
var results = document.getElementById('results'); 
var resultsSearchPopup = document.getElementById('resultsSearchPopup');
var resultsCustomers = document.getElementById('resultsCustomers'); 
var resultsProducts = document.getElementById('resultsProducts'); 
var resultsPricing = document.getElementById('resultsPricing'); 
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
//ShipTo
var db = openDatabase("AccountsBook", "1.0", "Accounts Book", 300000);
var dataset;

createTable(createStatement);

/*
*/
// Create tables
var createAOSCustomers = "CREATE TABLE IF NOT EXISTS AOS_Customers (nAOSShipToAcctID INTEGER PRIMARY KEY AUTOINCREMENT, sShipToID INTEGER, sShipToAcctName1 INTEGER, sShipToAcctName2 TEXT, sShipToAcctAddr1 TEXT, sShipToAcctCity TEXT, sShipToAcctState TEXT, sShipToAcctCounty TEXT, sShipToAcctPostal TEXT, sShipToAcctCountry TEXT, sSoldToAcctPayTerms TEXT, sSoldToAcctPricingTierDesc TEXT, sShipToAcctShippingCond TEXT, bSoldToAcctCompDelivery INTEGER, bSoldToAcctDisplayNoBackOrder INTEGER, nSoldToAcctFreightChargeMeth INTEGER, sShippingMethod TEXT, sSPName1 TEXT, sSPName2 TEXT, sSPAddr1 TEXT, sSPCity TEXT, sSPRegion TEXT, sSPPostal TEXT)";
var createAOSProducts = "CREATE TABLE IF NOT EXISTS AOS_Products (nAOSProductsID INTEGER PRIMARY KEY AUTOINCREMENT, sSKU TEXT, sDescription TEXT, sBaseUOM TEXT, sItemEntryQTY INTEGER, sPricingPerUnit TEXT, sProductURL TEXT, sGSAIndicator TEXT)";
var createAOSPricing = "CREATE TABLE IF NOT EXISTS AOS_Pricing (nAOSPricingID INTEGER PRIMARY KEY AUTOINCREMENT, sMaterialNumber TEXT, nListPrice REAL, sCommissionLevelHigh TEXT, nPriceHigh REAL, sCommisionLevelMid TEXT, nPriceMid REAL, sCommissionLevelLow TEXT, nPriceLow REAL)";

// Insert into tables
var insertAOSCustomers = "INSERT INTO AOS_Customers (sShipToID, sShipToAcctName1, sShipToAcctName2, sShipToAcctAddr1, sShipToAcctCity, sShipToAcctState, sShipToAcctCounty, sShipToAcctPostal, sShipToAcctCountry, sSoldToAcctPayTerms, sSoldToAcctPricingTierDesc, sShipToAcctShippingCond, bSoldToAcctCompDelivery, bSoldToAcctDisplayNoBackOrder, nSoldToAcctFreightChargeMeth, sShippingMethod, sSPName1, sSPName2, sSPAddr1, sSPCity, sSPRegion, sSPPostal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var insertAOSProducts = "INSERT INTO AOS_Products (sSKU, sDescription, sBaseUOM, sItemEntryQTY, sPricingPerUnit, sProductURL, sGSAIndicator) VALUES (?, ?, ?, ?, ?, ?, ?)";
var insertAOSPricing = "INSERT INTO AOS_Pricing (sMaterialNumber, nListPrice, sCommissionLevelHigh, nPriceHigh, sCommisionLevelMid, nPriceMid, sCommissionLevelLow, nPriceLow) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Select ALL from tables
selectAOSCustomersALL = "SELECT * FROM AOS_Customers ORDER BY sShipToID ASC";
selectAOSProductsALL = "SELECT * FROM AOS_Products";
selectAOSPricingALL = "SELECT * FROM AOS_Pricing";

// Select Customer records
selectAOSCustomers = "SELECT 'ShipToName','ShipToAddr1', 'ShipToCity', 'ShipToState', 'ShipToZipPostal' FROM AOS_Customers ORDER BY sShipToID ASC";


// Create tables
createAOSTable(createAOSCustomers);
createAOSTable(createAOSProducts);
createAOSTable(createAOSPricing);

// Drop tables
var dropAOSCustomer = "DROP TABLE AOS_Customers";
var dropAOSProducts = "DROP TABLE AOS_Products";
var dropAOSPricing = "DROP TABLE AOS_Pricing";

/*
*/

function onError(tx, error) {
	alert('Diagnostics Message:\n' + error.message + '\n' + msg);
}

function showALLAOSRecords() {
	// Customers
//	resultsCustomers.innerHTML = '';
//	resultsProducts.innerHTML = '';
//	resultsPricing.innerHTML = '';
//	showAllAOSCustomers();
	// Pricing
//	showAllAOSPricing();
	// Products
//	showAllAOSProducts();
}

function showAllAOSCustomers() {
	strSQL = '';
	// Customers table
	strSQL = selectAOSCustomersALL;
	db.transaction(function(tx) {
		tx.executeSql(strSQL, [], function(tx, result) {
		dataset = result.rows;
		resultsCustomers.innerHTML = '';
		resultsCustomers.innerHTML += '<hr></br><b>Customers:<b><br>';
		for (var i = 0, item = null; i < dataset.length; i++) {
			item = dataset.item(i);
			resultsCustomers.innerHTML += '<li>' + item['nAOSShipToAcctID'] + ') ' + item['sShipToID'] + ' ' + item['sShipToAcctName1'] + ' ' + item['sShipToAcctName2'] + ' ' + item['sShipToAcctAddr1'] + ' ' + item['sShipToAcctCity'] + ' ' + item['sShipToAcctState'] + ' ' + item['sShipToAcctCounty'] + ' ' + item['sShipToAcctPostal'] + ' ' + item['sShipToAcctCountry'] + ' ' + item['sSoldToAcctPayTerms'] + ' ' + item['sSoldToAcctPricingTierDesc'] + ' ' + item['sShipToAcctShippingCond'] + ' ' + item['bSoldToAcctCompDelivery'] + ' ' + item['bSoldToAcctDisplayNoBackOrder'] + ' ' + item['nSoldToAcctFreightChargeMeth'] + ' ' + item['sShippingMethod'] + ' ' + item['sSPName1'] + ' ' + item['sSPName2'] + ' ' + item['sSPAddr1'] + ' ' + item['sSPCity'] + ' ' + item['sSPRegion'] + ' ' + item['sSPPostal'] + '</li>';
			}
		});
	});
	showRecords();
}

function showAllAOSProducts() {
	//Products table
	strSQL = selectAOSProductsALL;
	db.transaction(function(tx) {
		tx.executeSql(strSQL, [], function(tx, result) {
		dataset = result.rows;
		resultsProducts.innerHTML = '';
		resultsProducts.innerHTML += '<hr></br><b>Products:<b><br>';
		for (var i = 0, item = null; i < dataset.length; i++) {
			item = dataset.item(i);
			resultsProducts.innerHTML += '<li>' + item['nAOSProductsID'] + ') ' + item['sSKU'] + ' ' + item['sDescription'] + ' ' + item['sBaseUOM'] + ' ' + item['sItemEntryQTY'] + ' ' + item['sPricingPerUnit'] + ' ' + item['sProductURL'] + ' ' + item['sGSAIndicator'] + '</li>';
			}
		});
	});
	showRecords();
}

function showAllAOSPricing() {
	//Pricing table
	strSQL = selectAOSPricingALL;
	db.transaction(function(tx) {
		tx.executeSql(strSQL, [], function(tx, result) {
		dataset = result.rows;
		resultsPricing.innerHTML = '';
		resultsPricing.innerHTML += '<hr><br><b>Pricing:<b><br>';
		for (var i = 0, item = null; i < dataset.length; i++) {
			item = dataset.item(i);
			resultsPricing.innerHTML += '<li>' + item['nAOSPricingID'] + ') ' + item['sMaterialNumber'] + ' ' + item['nListPrice'] + ' ' + item['sCommissionLevelHigh'] + ' ' + item['nPriceHigh'] + ' ' + item['sCommisionLevelMid'] + ' ' + item['nPriceMid'] + ' ' + item['sCommissionLevelLow'] + ' ' + item['nPriceLow'] + '</li>';
			}
		});
	});
	showRecords();
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

function dropAOSTables() {
	msg = 'dropAOSTables:';
	db.transaction(function(tx) {
		tx.executeSql(dropAOSCustomer, [], showRecords, onError);
	});
	db.transaction(function(tx) {
		tx.executeSql(dropAOSProducts, [], showRecords, onError);
	});
	db.transaction(function(tx) {
		tx.executeSql(dropAOSPricing, [], showRecords, onError);
	});
	resetForm();
}

function insertAOSRecord(tblName) {
	msg = 'insertAOSRecord - table: ' + tblName;
	db.transaction(function(tx) {
		switch(tblName)
		{
		case 'AOS_Customers':
		// sShipToID, sShipToAcctName1, sShipToAcctName2, sShipToAcctAddr1, sShipToAcctCity, sShipToAcctState, sShipToAcctCounty, sShipToAcctPostal, sShipToAcctCountry, sSoldToAcctPayTerms, sSoldToAcctPricingTierDesc, sShipToAcctShippingCond, bSoldToAcctCompDelivery, bSoldToAcctDisplayNoBackOrder, nSoldToAcctFreightChargeMeth, sShippingMethod, sSPName1, sSPName2, sSPAddr1, sSPCity, sSPRegion, sSPPostal
			tx.executeSql(insertAOSCustomers, ['100293448', 'Dickinson+Associates', 'Unavailable', '1 North LaSalle Stree', 'Chicago', 'IL', 'OHare', '60602', 'USofA', 'Net 30', 'Tier 2', 'Unknown', 0, 0, 32, 'Ground', 'sSPName1', 'sSPName2', 'sSPAddr1', 'sSPCity', 'sSPRegion', 'sSPPostal'], showAllAOSCustomers, onError);
			break;
		case 'AOS_Products':
		// sSKU, sDescription, sBaseUOM, sItemEntryQTY, sPricingPerUnit, sProductURL, sGSAIndicator
			tx.executeSql(insertAOSProducts, ['100069423356', 'SanDisk 32GB Cruze USB Flash Drive', 'EA', 6, '17.95', 'http://www.lawsonproducts.com', 'sGSAIndicator'], showAllAOSProducts, onError);
			break;
		case 'AOS_Pricing':
		// sMaterialNumber, nListPrice, sCommissionLevelHigh, nPriceHigh, sCommisionLevelMid, nPriceMid, sCommissionLevelLow, nPriceLow
			tx.executeSql(insertAOSPricing, ['sMaterialNumber', 185.99, 'sCommissionLevelHigh', 200.95, 'sCommisionLevelMid', 180.29, 'sCommissionLevelLow', 170.33], showAllAOSPricing, onError);
			break;
		default:
			alert('Unknown table name on INSERT');
		}
	});
}

function showRecords() {
	results.innerHTML = '';
	db.transaction(function(tx) {
	tx.executeSql(selectAllStatement, [], function(tx, result) {
		dataset = result.rows;
		results.innerHTML = '';
		results.innerHTML += '<hr/><br><b>Editable Customers:<b><br>';
		for (var i = 0, item = null; i < dataset.length; i++) {
			item = dataset.item(i);
			results.innerHTML += 
			'<li>' + item['ShipToName'] + ' ' + item['ShipToAddr1'] + ' ' + item['ShipToCity'] + ' ' + item['ShipToState'] + ', ' + item['ShipToZipPostal'] + ' <a href="#" onclick="selectRecord('+i+')"><img valign="top" align="center" title="Select this record" src="./images/icon-sel_256x256.png" alt="select record" width="16" /></a> ' + ' <a href="#" onclick="loadRecord('+i+')"><img valign="top" align="center" title="Edit this record" src="./images/icon-edit_256x256.png" alt="edit record" width="16" /></a> ' + ' <a href="#" onclick="deleteRecord('+item['id']+')"><img valign="top" align="center" title="Delete this record" src="./images/icon-del_256x256.png" alt="delete record" width="16" /></a></li>';
			}
		});
	});
}

function dropTable() {
	msg = 'dropTable';
	db.transaction(function(tx) {
		tx.executeSql(dropStatement, [], showRecords, onError);
	});
	resetForm();
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

function insertRecord() {
	msg = 'insertRecord';
	db.transaction(function(tx) {
		tx.executeSql(insertStatement, [ShipToName.value, ShipToAddr1.value, ShipToCity.value, ShipToState.value, ShipToZipPostal.value], loadAndReset, onError);
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

function loadAndResetAOS() {
	resetAOSForm();
	showALLAOSRecords();
}

function resetForm() {
	ShipToName.value = '';
	ShipToAddr1.value = '';
	ShipToCity.value = '';
	ShipToState.value = '';
	ShipToZipPostal.value = '';
	id.value = '';
}

function resetSearchPopupForm() {
	searchShipToName.value = '';
	searchShipToAddr1.value = '';
	searchShipToCity.value = '';
	searchShipToState.value = '';
	searchShipToZipPostal.value = '';
	searchid.value = '';
}

function resetAOSForm() {
	// Table data
	resultsCustomers.innerHTML = '';
	resultsPricing.innerHTML = '';
	resultsProducts.innerHTML = '';
}

$(document).ready(function() {
	$("button[rel]").overlay();
});	

$(document).ready(function() {
	$("img[rel]").overlay();
});	   

// Experimenting with toggles.  jquery has a toggle function but doesn't see to be working
$('#target').toggle(function() {
	alert('First handler for target.toggle() called.');
	var control = document.getElementById('initData');
}, function() {
	alert('Second handler for target.toggle() called.');
	var control = document.getElementById('initData');
});

$(document).ready(function() {
	$('#target2').click(function() {
		var control = document.getElementById('initData');
		if(control.style.visibility == "visible" || control.style.visibility == "")
			control.style.visibility = "hidden";
		else 
			control.style.visibility = "visible";
        });
});
