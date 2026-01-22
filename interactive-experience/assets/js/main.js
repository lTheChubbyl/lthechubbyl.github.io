window.onload = function () {
	// tabela 1

	let nizImena = ["Pera Perić", "Mika Mikić", "Laza Lazić"];
	let nizBrojeviIndeksa = ["1/21", "2/21", "3/21"];
	let divTabela01 = document.querySelector("#tabela-01");
	let tabela01 = `<table class="table">`;

	for (let i = 0; i < nizBrojeviIndeksa.length; i++) {
		tabela01 += `<tr>
                        <td>${nizImena[i]}</td>
                        <td>${nizBrojeviIndeksa[i]}</td>
                    </tr>`;
	}
	tabela01 += "</table>";
	divTabela01.innerHTML = tabela01;

	// tabela 2

	let tableTag01 = document.createElement("table");
	tableTag01.setAttribute("class", "table");

	for (let i = 0; i < nizImena.length; i++) {
		let trTag = document.createElement("tr");

		// let tdTag01 = document.createElement("td");
		// let sadrzajTdTag01 = document.createTextNode(nizImena[i]);
		// tdTag01.appendChild(sadrzajTdTag01);

		// let tdTag02 = document.createElement("td");
		// let sadrzajTdTag02 = document.createTextNode(nizBrojeviIndeksa[i]);
		// tdTag02.appendChild(sadrzajTdTag02);

		// trTag.appendChild(tdTag01);
		// trTag.appendChild(tdTag02);

		// tableTag01.appendChild(trTag);

		for (let j = 0; j < 2; j++) {
			let tdTag = document.createElement("td");

			if (j % 2 == 0) {
				var sadrzajTd = document.createTextNode(nizImena[i]);
			} else {
				var sadrzajTd = document.createTextNode(nizBrojeviIndeksa[i]);
			}

			tdTag.appendChild(sadrzajTd);
			trTag.appendChild(tdTag);
		}

		tableTag01.appendChild(trTag);
	}
	document.querySelector("#tabela-02").appendChild(tableTag01);

	// ***********************************
	// tajmeri

	setInterval(ispisiVreme, 1000);
	function ispisiVreme() {
		let objDate = new Date();
		let formatZaIspis = `<p>${objDate.getHours()}.${objDate.getMinutes()}.${objDate.getSeconds()}</p>`;
		document.querySelector("#blok-vreme-01").innerHTML = formatZaIspis;
	}

	setTimeout(ispisiVreme2, 1000);
	function ispisiVreme2() {
		let objDate = new Date();
		document.querySelector("#blok-vreme-02").innerHTML =
			objDate.toLocaleTimeString();
		setTimeout(ispisiVreme2, 1000);
	}

	// progress bar

	stampajJednocifrenBroj("#prviBroj");
	stampajJednocifrenBroj("#drugiBroj");

	var brojac = 1;
	var progressBar = document.querySelector("#bar");
	document
		.querySelector("#btnOdgovor")
		.addEventListener("click", function () {
			let prviBroj = document.querySelector("#prviBroj").innerHTML;
			let drugiBroj = document.querySelector("#drugiBroj").innerHTML;

			let zbir = parseInt(prviBroj) + parseInt(drugiBroj);

			let odgovorPolje = document.querySelector("#tbZbir");

			// if(odgovorPolje.value == ""){
			//     odgovorPolje.classList.add("greska");
			// }
			// else{
			//     odgovorPolje.classList.remove("greska");

			//     if(zbir != odgovorPolje.value){
			//         odgovorPolje.classList.add("greska");
			//     }
			//     else{
			//         odgovorPolje.classList.remove("greska");

			//         if(brojac < 6){
			//             progressBar.value = brojac;
			//             document.querySelector("#brojOdgovora").innerHTML = brojac;
			//             brojac++;

			//             document.querySelector("#prviBroj").innerHTML = jednocifrenBroj();
			//             document.querySelector("#drugiBroj").innerHTML = jednocifrenBroj();
			//             odgovorPolje.value = "";
			//         }
			//         if(brojac > 5){
			//             document.querySelector("#btnOdgovor").setAttribute("disabled", "disabled");
			//             document.querySelector("#tbZbir").setAttribute("disabled", "disabled");
			//         }
			//     }
			// }

			// optimizovaniji kod
			if (odgovorPolje.value == "" || zbir != odgovorPolje.value) {
				odgovorPolje.classList.add("greska");
			} else {
				odgovorPolje.classList.remove("greska");

				if (brojac < 6) {
					progressBar.value = brojac;
					document.querySelector("#brojOdgovora").innerHTML = brojac;
					brojac++;

					stampajJednocifrenBroj("#prviBroj");
					stampajJednocifrenBroj("#drugiBroj");
					// ako se cesto koristi "ciscenje" polja, bolje napraviti funkciju
					// odgovorPolje.value = "";
					ocistiPolje(odgovorPolje);
				}
				if (brojac > 5) {
					// document.querySelector("#btnOdgovor").setAttribute("disabled", "disabled");
					// document.querySelector("#tbZbir").setAttribute("disabled", "disabled");
					// ili funkcija koja setuje disabled
					onemoguciElement("#btnOdgovor");
					onemoguciElement("#tbZbir");

					document.querySelector("#poruka").innerHTML =
						"Imate 5 tačnih odgovora, došli ste do kraja.";
					document
						.querySelector("#poruka")
						.classList.remove("d-none");
				}
			}
		});
};
function jednocifrenBroj() {
	let broj = Math.floor(Math.random() * 10);
	return broj;
}
function stampajJednocifrenBroj(el) {
	document.querySelector(el).innerHTML = jednocifrenBroj();
}
function ocistiPolje(polje) {
	polje.value = "";
}
function onemoguciElement(el) {
	document.querySelector(el).setAttribute("disabled", "disabled");
}
