// var data = [{'name':'resistor','value':'1k','quanity':10},{'name':'capacitor','value':'1k','quanity':10}]
var data=[];
var path = require('path');
var nw = require('nw.gui');
var dataFile = path.join(nw.App.dataPath,'data.json');

function loadData(){
	var fs = require('fs');
	try{
		data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
	}catch(e){
		console.log("No prev data found.");
	}
	searchInventory("");	// Populate new entry
}

function searchInventory(searchText){
	
	var noOfResult = 0;
	var table = document.getElementById("tableInventory").getElementsByTagName('tbody')[0];
	for (var i = table.rows.length - 1; i >= 0; i--) {
		table.deleteRow(0);
	}

	for (var i = data.length - 1; i >= 0; i--) {
		if(data[i].name.search(new RegExp(searchText.value, "i")) != -1) {
			
			var row = table.insertRow(noOfResult);
			row.setAttribute("onclick", "fillDetailsForUpdate("+i+");");
			row.setAttribute("data-target", "#exampleModal");
			row.setAttribute("data-toggle", "modal");
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			cell1.innerHTML = noOfResult+1;
			cell2.innerHTML = data[i].name;
			cell3.innerHTML = data[i].value;
			cell4.innerHTML = data[i].quanity;
			noOfResult += 1;
		}
	}
}

function saveData(){
	var inputFields = document.getElementById("dataFrom").getElementsByTagName("input");
	var name = inputFields[0].value;
	var value = inputFields[1].value;
	var quanity = inputFields[2].value;
	var index = -1;
	index = parseInt(inputFields[3].value);

	if (name == "" || value == "" || quanity == ""){
		return false;
	}else{
		if(index != -1){
			data[index] = {'name':name,'value':value, 'quanity':parseInt(quanity)}
		}else{
			data.push({'name':name,'value':value, 'quanity':parseInt(quanity)})
		}		
	}
	var fs = require('fs');
	var json = JSON.stringify(data);
	fs.writeFileSync(dataFile, json, 'utf8');
	searchInventory("");	// Populate new entry
	$('#exampleModal').modal('hide');
}

function deleteData(){
	var inputFields = document.getElementById("dataFrom").getElementsByTagName("input");
	var index = -1;
	index = parseInt(inputFields[3].value);

	if(index != -1){
		data.splice(index, 1);
	}else{
		return;
	}		

	var fs = require('fs');
	var json = JSON.stringify(data);
	fs.writeFileSync(dataFile, json, 'utf8');
	searchInventory("");	// Populate new entry
	resetDetailsForUpdate();	
	$('#exampleModal').modal('hide');
}

function fillDetailsForUpdate(index){
	document.getElementById("dataFromName").value=data[index]['name'];
	document.getElementById("dataFromValue").value=data[index]['value'];
	document.getElementById("dataFromQty").value=data[index]['quanity'];
	document.getElementById("dataFromindex").value=index;
	
}

function resetDetailsForUpdate(){
	document.getElementById("dataFromName").value="";
	document.getElementById("dataFromValue").value="";
	document.getElementById("dataFromQty").value="";
	document.getElementById("dataFromindex").value="-1";
}

function openNav(targetId){
	var mainBody = document.getElementById("mainBody");
	var navMenu = document.getElementById(targetId);
	if(mainBody.style.marginTop == "100vh"){
		mainBody.style.marginTop = "0vh";
		mainBody.style.opacity = "1";
		var navMenus = document.getElementsByClassName('menu');
		for (var i = navMenus.length - 1; i >= 0; i--) {
			navMenus[i].style.width="0%";
		}
	}else{
		mainBody.style.marginTop = "100vh";
		mainBody.style.opacity = "0.2";
		navMenu.style.width = "102%";
		navMenu.style.marginTop = "0vh";
		navMenu.style.opacity = "1";
	}
	
}

function showMenu(targetId, selfId){
	var navMenu = document.getElementById(targetId);
	if(navMenu.style.width == "102%"){
		navMenu.style.width = "0%";
		var mainBody = document.getElementById(selfId);
		mainBody.style.marginTop = "0vh";
		mainBody.style.opacity = "1";
	}else{
		navMenu.style.width = "102%";
		var mainBody = document.getElementById(selfId);
		mainBody.style.marginTop = "100vh";
		mainBody.style.opacity = "0.2";
	}
	
}