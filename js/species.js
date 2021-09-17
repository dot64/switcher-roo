function speciesLoadList() {
	var areSettingsLocked = localStorage.getItem("Settings_Locked");
	if (areSettingsLocked === "Yes") {
		return;
	}
	else {
		document.getElementById("speciesCurrentContainer").style.display= 'none';
		document.getElementById("speciesSearch").style.display= 'none';
		document.getElementById("speciesCategorySelectorContainer").style.display= 'block';
		document.getElementById('speciesContainer').style.width = "80%";
	}
}

function goBackFromCategoryList() {
	document.getElementById("speciesCurrentContainer").style.display= 'block';
	document.getElementById("speciesSearch").style.display= 'block';
	document.getElementById("speciesCategorySelectorContainer").style.display= 'none';
	document.getElementById('speciesContainer').style.width = "70%";
}

function closeCategoryMenu() {
	document.getElementById("speciesCategorySelectorContainer").style.display = "none";
	document.getElementById("speciesSelectorMostPopular").style.display = "none";
	document.getElementById("speciesSelectorCustom").style.display = "none";
	document.getElementById("speciesSelectorAvian").style.display = "none";
	document.getElementById("speciesSelectorBovine").style.display = "none";
	document.getElementById("speciesSelectorCanine").style.display = "none";
	document.getElementById("speciesSelectorCervine").style.display = "none";
	document.getElementById("speciesSelectorEquine").style.display = "none";
	document.getElementById("speciesSelectorFeline").style.display = "none";
	document.getElementById("speciesSelectorFictional").style.display = "none";
	document.getElementById("speciesSelectorHybrid").style.display = "none";
	document.getElementById("speciesSelectorLagomorph").style.display = "none";
	document.getElementById("speciesSelectorMarsupial").style.display = "none";
	document.getElementById("speciesSelectorMustelid").style.display = "none";
	document.getElementById("speciesSelectorReptile").style.display = "none";
	document.getElementById("speciesSelectorRodent").style.display = "none";
	document.getElementById("speciesSelectorUngulate").style.display = "none";	
}

function setSpeciesTo(Species) {
	document.getElementById('speciesCurrent').innerHTML = Species;
	localStorage.setItem("Slot0_Species", Species);
	closeCategoryMenu();
	goBackFromCategoryList();
	if (controlsessionactive === "Yes") {
		conn.send({firstParam: "manipulateOption", secondParam: "Species", thirdParam: Species});
	}
	
	var charVizEnabled = localStorage.getItem("CharViz_Enabled");	
	if (charVizEnabled === "Yes") {
		var pickerEnabled = localStorage.getItem("Character_Part_And_Pattern_Picker_Enabled");	
		var setNatColorScheme = localStorage.getItem("CharViz_Set_Natural_Color_Scheme");
		var firstTime = localStorage.getItem("First_Time_Setting_Color"); // This is needed, cause when user for the first time launches CharViz would see only blank lineart
		if (setNatColorScheme === "Yes" || firstTime != "No") {
			setNaturalColorScheme(Species);
			localStorage.setItem("First_Time_Setting_Color", "No");
		}
		if (pickerEnabled != "Yes") {
			saveCharacterPartPreset(Species);
			initializeCharViz();
		}		
	}
	showProcessingAnimation();
}

function setSpeciesToCustom(x) {
	var Species = document.getElementById("speciesEntryCustom" + x).innerHTML;
	setSpeciesTo(Species);
}

function loadCustomSpeciesOnStartup() {
	var x;
	for (x = 1; x < 11; x++) {
		var species = localStorage.getItem("Custom_Species_Slot" + x);
		if (species === null) { species = "Empty" }
		document.getElementById("customSpeciesName" + x).innerHTML = "Slot " + x + " - " + species;
		document.getElementById("speciesEntryCustom" + x).innerHTML = species;
	}
}

function setCustomSpecies(x) {
	var species = document.getElementById("customSpeciesSlot" + x + "TextField").value;
	localStorage.setItem("Custom_Species_Slot" + x, species);
	document.getElementById("customSpeciesName" + x).innerHTML = "Slot " + x + " - " + species;
	document.getElementById("speciesEntryCustom" + x).innerHTML = species;
}

function switchToCustomSpeciesSet(x) {
	if (x == 1) {
		document.getElementById("customSpeciesSet1Container").style.display = "block";
		document.getElementById("customSpeciesSet2Container").style.display = "none";
	}
	else {
		document.getElementById("customSpeciesSet1Container").style.display = "none";
		document.getElementById("customSpeciesSet2Container").style.display = "block";
	}
}

function speciesGoToCategory(x) {
	// Hide the elements	
	document.getElementById("speciesCategorySelectorContainer").style.display = 'none';
	var i;
	for (i = 1; i < 19; i++) {
		document.getElementById("speciesSelector" + i).style.display = 'none';
	}
	
	// Show the desired element
	document.getElementById("speciesSelector" + x).style.display = 'block';
}

function speciesGoBackFromCategory() {
	var i;
	for (i = 1; i < 19; i++) {
		document.getElementById("speciesSelector" + i).style.display = 'none';
	}
	
	document.getElementById("speciesCategorySelectorContainer").style.display= 'block';
}