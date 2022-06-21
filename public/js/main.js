year = document.getElementById("year").value;
console.log(year);
let yearSelection = document.getElementById("year");
yearSelection.addEventListener("change", loadSeason);

let raceSelection = document.getElementById("race");
raceSelection.addEventListener("change", getRace);

const modal = document.querySelector(".modal");
modal.style.display = "none";

function loadSeason(e) {
	let years = e.target.value;

	modal.style.display = "none";

	function getSeason() {
		year = document.getElementById("year").value;

		fetch(`https://ergast.com/api/f1/${year}/results/1.json`)
			.then((res) => res.json()) // parse response as JSON
			.then((data) => {
				console.log(data);

				// shows all races for the season in dropdown for more detailed race stats
				const raceDropDownOptions = document.querySelectorAll(".raceOption");
				raceDropDownOptions.forEach((option) => {
					option.remove();
				});

				const raceData = data.MRData.RaceTable.Races;

				document.querySelector(".race-name").innerHTML = "";
				document.querySelector(".driver-name").innerHTML = "";
				document.querySelector(".constructor-name").innerHTML = "";
				for (let i = 0; i < data.MRData.RaceTable.Races.length; i++) {
					//shows all races for the season
					const raceName = document.querySelector(".race-name");
					const raceNameDiv = document.createElement("div");
					raceNameDiv.innerHTML = `${raceData[i].raceName}`;
					raceName.appendChild(raceNameDiv);

					const raceDropDown = document.querySelector(".race");
					const raceDropDownDiv = document.createElement("option");
					raceDropDownDiv.innerHTML = `${raceData[i].raceName}`;
					raceDropDownDiv.classList.add("raceOption");
					raceDropDownDiv.setAttribute("value", [i + 1]);
					raceDropDown.appendChild(raceDropDownDiv);

					//shows winning driver
					const driverName = document.querySelector(".driver-name");
					const driverNameDiv = document.createElement("div");
					driverNameDiv.innerHTML =
						`${raceData[i].Results[0].Driver.givenName}` + ` ${raceData[i].Results[0].Driver.familyName}`;
					driverName.appendChild(driverNameDiv);

					//shows winning constructor
					const constructorName = document.querySelector(".constructor-name");
					const constructorNameDiv = document.createElement("div");
					constructorNameDiv.innerHTML = `${raceData[i].Results[0].Constructor.name}`;
					constructorName.appendChild(constructorNameDiv);
				}
			})
			.catch((err) => {
				console.log(`error ${err}`);
			});
	}
	getSeason();

	// function getFastestLap() {
	// 	fetch(`https://ergast.com/api/f1/${year}/fastest/1/results.json`)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			// console.log(data)
	// 			document.querySelector(".fastest-lap-name").innerHTML = "";
	// 			for (let i = 0; i < data.MRData.RaceTable.Races.length; i++) {
	// 				//shows fastest lap driver
	// 				const fastestLapName =
	// 					document.querySelector(".fastest-lap-name");
	// 				const fastestLapNameDiv = document.createElement("div");
	// 				fastestLapNameDiv.innerHTML =
	// 					`${data.MRData.RaceTable.Races[i].Results[0].Driver.givenName} ` +
	// 					`${data.MRData.RaceTable.Races[i].Results[0].Driver.familyName}`;
	// 				fastestLapName.appendChild(fastestLapNameDiv);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(`error ${err}`);
	// 		});
	// }
	// getFastestLap();

	function getDriverStandings() {
		fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				document.querySelector(".driver-standings").innerHTML = "";
				document.querySelector(".driver-standings-points").innerHTML = "";

				const driver = data.MRData.StandingsTable.StandingsLists[0];

				for (let i = 0; i < driver.DriverStandings.length; i++) {
					//shows driver standings for season
					const driverStandingsName = document.querySelector(".driver-standings");
					const driverStandingsNameDiv = document.createElement("div");
					driverStandingsNameDiv.innerHTML =
						`${driver.DriverStandings[i].Driver.givenName} ` +
						`${driver.DriverStandings[i].Driver.familyName}`;
					driverStandingsName.appendChild(driverStandingsNameDiv);

					//shows driver points for season
					const pointsStanding = document.querySelector(".driver-standings-points");
					const pointsStandingDiv = document.createElement("div");
					pointsStandingDiv.innerHTML = `${driver.DriverStandings[i].points} `;
					pointsStanding.appendChild(pointsStandingDiv);
				}
			})
			.catch((err) => {
				console.log(`error ${err}`);
			});
	}
	getDriverStandings();

	function getConstructorStandings() {
		fetch(`https://ergast.com/api/f1/${year}/constructorStandings.json`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				document.querySelector(".constructor-standings").innerHTML = "";
				document.querySelector(".constructor-standings-points").innerHTML = "";

				const constructor = data.MRData.StandingsTable.StandingsLists[0];

				for (let i = 0; i < constructor.ConstructorStandings.length; i++) {
					//shows constructor standings
					const constructorStanding = document.querySelector(".constructor-standings");
					const constructorStandingDiv = document.createElement("div");
					constructorStandingDiv.innerHTML = `${constructor.ConstructorStandings[i].Constructor.name}`;
					constructorStanding.appendChild(constructorStandingDiv);

					//shows constructor points
					const constructorStandingPoints = document.querySelector(".constructor-standings-points");
					const constructorStandingPointsDiv = document.createElement("div");
					constructorStandingPointsDiv.innerHTML = `${constructor.ConstructorStandings[i].points}`;
					constructorStandingPoints.appendChild(constructorStandingPointsDiv);
				}
			})
			.catch((err) => {
				console.log(`error ${err}`);
			});
	}
	getConstructorStandings();
}
function getRace(e) {
	let raceID = parseInt(e.target.value);
	console.log(raceID);

	modal.style.display = "flex";

	fetch(`https://ergast.com/api/f1/${year}/${raceID}/results.json`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			document.querySelector(".driver-race-standings").innerHTML = "";
			document.querySelector(".driver-race-points").innerHTML = "";
			document.querySelector(".driver-race-constructor").innerHTML = "";
			document.querySelector(".driver-race-time").innerHTML = "";

			const raceData = data.MRData.RaceTable.Races[0];
			
			//show circuit layout
			// console.log(data.MRData.RaceTable.Races[0].Circuit.circuitId);
			const circuit = document.querySelector(".circuit-layout");
			circuit.src = `/img/${raceData.Circuit.circuitId}.png`;

			for (i = 0; i < raceData.Results.length; i++) {
				//shows driver race standing
				const driverRaceStandings = document.querySelector(".driver-race-standings");
				const driverRaceStandingsDiv = document.createElement("div");
				driverRaceStandingsDiv.innerHTML =
					`${raceData.Results[i].Driver.givenName} ` +
					`${raceData.Results[i].Driver.familyName}`;
				driverRaceStandings.appendChild(driverRaceStandingsDiv);
				//shows driver constructor
				const driverConstructor = document.querySelector(".driver-race-constructor");
				const driverConstructorDiv = document.createElement("div");
				driverConstructorDiv.innerHTML = raceData.Results[i].Constructor.name;
				driverConstructor.appendChild(driverConstructorDiv);

				//shows driver race points
				const driverRacePoints = document.querySelector(".driver-race-points");
				const driverRacePointsDiv = document.createElement("div");
				driverRacePointsDiv.innerHTML = `${raceData.Results[i].points} PTS`;
				driverRacePoints.appendChild(driverRacePointsDiv);

				//show driver time
				const driverRaceTime = document.querySelector(".driver-race-time");
				const driverRaceTimeDiv = document.createElement("div");
				if ((driverRaceTimeDiv.innerHTML = raceData.Results[i].hasOwnProperty("Time"))) {
					driverRaceTimeDiv.innerHTML = raceData.Results[i].Time.time;
				} else if (raceData.Results[i].status.includes("Lap")) {
					// driverRaceTimeDiv.innerHTML = 'DNF'
					driverRaceTimeDiv.innerHTML = `${raceData.Results[i].status}`;
				} else {
					driverRaceTimeDiv.innerHTML = `DNF: ${raceData.Results[i].status}`;
				}
				driverRaceTime.appendChild(driverRaceTimeDiv);
			}
		});
}
const button = document.querySelector(".close-modal");
button.onclick = function () {
	modal.style.display = "none";
};
