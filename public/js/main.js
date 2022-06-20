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
				const raceDropDownOptions =
					document.querySelectorAll(".raceOption");
				raceDropDownOptions.forEach((option) => {
					option.remove();
				});

				document.querySelector(".race-name").innerHTML = "";
				document.querySelector(".driver-name").innerHTML = "";
				document.querySelector(".constructor-name").innerHTML = "";
				for (let i = 0; i < data.MRData.RaceTable.Races.length; i++) {
					//shows all races for the season
					const raceName = document.querySelector(".race-name");
					const raceNameDiv = document.createElement("div");
					raceNameDiv.innerHTML = `${data.MRData.RaceTable.Races[i].raceName}`;
					raceName.appendChild(raceNameDiv);

					const raceDropDown = document.querySelector(".race");
					const raceDropDownDiv = document.createElement("option");
					raceDropDownDiv.innerHTML = `${data.MRData.RaceTable.Races[i].raceName}`;
					raceDropDownDiv.classList.add("raceOption");
					raceDropDownDiv.setAttribute("value", [i + 1]);
					raceDropDown.appendChild(raceDropDownDiv);

					//shows winning driver
					const driverName = document.querySelector(".driver-name");
					const driverNameDiv = document.createElement("div");
					driverNameDiv.innerHTML =
						`${data.MRData.RaceTable.Races[i].Results[0].Driver.givenName}` +
						` ${data.MRData.RaceTable.Races[i].Results[0].Driver.familyName}`;
					driverName.appendChild(driverNameDiv);

					//shows winning constructor
					const constructorName =
						document.querySelector(".constructor-name");
					const constructorNameDiv = document.createElement("div");
					constructorNameDiv.innerHTML = `${data.MRData.RaceTable.Races[i].Results[0].Constructor.name}`;
					constructorName.appendChild(constructorNameDiv);
				}
			})
			.catch((err) => {
				console.log(`error ${err}`);
			});
	}
	getSeason();

	function getFastestLap() {
		fetch(`https://ergast.com/api/f1/${year}/fastest/1/results.json`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				document.querySelector(".fastest-lap-name").innerHTML = "";
				for (let i = 0; i < data.MRData.RaceTable.Races.length; i++) {
					//shows fastest lap driver
					const fastestLapName =
						document.querySelector(".fastest-lap-name");
					const fastestLapNameDiv = document.createElement("div");
					fastestLapNameDiv.innerHTML =
						`${data.MRData.RaceTable.Races[i].Results[0].Driver.givenName} ` +
						`${data.MRData.RaceTable.Races[i].Results[0].Driver.familyName}`;
					fastestLapName.appendChild(fastestLapNameDiv);
				}
			})
			.catch((err) => {
				console.log(`error ${err}`);
			});
	}
	getFastestLap();

	function getDriverStandings() {
		fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				document.querySelector(".driver-standings").innerHTML = "";
				document.querySelector(".driver-standings-points").innerHTML =
					"";
				for (
					let i = 0;
					i <
					data.MRData.StandingsTable.StandingsLists[0].DriverStandings
						.length;
					i++
				) {
					//shows driver standings for season
					const driverStandingsName =
						document.querySelector(".driver-standings");
					const driverStandingsNameDiv =
						document.createElement("div");
					driverStandingsNameDiv.innerHTML =
						`${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName} ` +
						`${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName}`;
					driverStandingsName.appendChild(driverStandingsNameDiv);

					//shows driver points for season
					const pointsStanding = document.querySelector(
						".driver-standings-points"
					);
					const pointsStandingDiv = document.createElement("div");
					pointsStandingDiv.innerHTML = `${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points} `;
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
				document.querySelector(
					".constructor-standings-points"
				).innerHTML = "";
				for (
					let i = 0;
					i <
					data.MRData.StandingsTable.StandingsLists[0]
						.ConstructorStandings.length;
					i++
				) {
					//shows constructor standings
					const constructorStanding = document.querySelector(
						".constructor-standings"
					);
					const constructorStandingDiv =
						document.createElement("div");
					constructorStandingDiv.innerHTML = `${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].Constructor.name}`;
					constructorStanding.appendChild(constructorStandingDiv);

					//shows constructor points
					const constructorStandingPoints = document.querySelector(
						".constructor-standings-points"
					);
					const constructorStandingPointsDiv =
						document.createElement("div");
					constructorStandingPointsDiv.innerHTML = `${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].points}`;
					constructorStandingPoints.appendChild(
						constructorStandingPointsDiv
					);
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
	// const modal = document.querySelector('.modal');

	modal.style.display = "flex";

	document.querySelector(".title-bar").innerHTML = "";
	document.querySelector(".results-field").innerHTML = "";

	fetch(`https://ergast.com/api/f1/${year}/${raceID}/results.json`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			document.querySelector(".driver-race-standings").innerHTML = "";
			document.querySelector(".driver-race-points").innerHTML = "";
			// document.querySelector(".constructor-race-results").innerHTML = "";

			//show circuit layout
			console.log(data.MRData.RaceTable.Races[0].Circuit.circuitId);
			const circuit = document.querySelector(".circuit-layout");
			circuit.src = `/img/${data.MRData.RaceTable.Races[0].Circuit.circuitId}.png`;

			for (
				i = 0;
				i < data.MRData.RaceTable.Races[0].Results.length;
				i++
			) {
				//shows driver race standing
				const driverRaceStandings = document.querySelector(
					".driver-race-standings"
				);
				const driverRaceStandingsDiv = document.createElement("div");
				driverRaceStandingsDiv.innerHTML =
					`${data.MRData.RaceTable.Races[0].Results[i].Driver.givenName} ` +
					`${data.MRData.RaceTable.Races[0].Results[i].Driver.familyName}`;
				driverRaceStandings.appendChild(driverRaceStandingsDiv);
				//shows driver race points
				const driverRacePoints = document.querySelector(
					".driver-race-points"
				);
				const driverRacePointsDiv = document.createElement("div");
				driverRacePointsDiv.innerHTML =
					`${data.MRData.RaceTable.Races[0].Results[i].points} PTS`;
				driverRacePoints.appendChild(driverRacePointsDiv);

				//shows driver constructor
				const driverConstructor = document.querySelector(
					".driver-race-constructor"
				);
				const driverConstructorDiv = document.createElement("div");
				driverConstructorDiv.innerHTML =
					data.MRData.RaceTable.Races[0].Results[i].Constructor.name;
				driverConstructor.appendChild(driverConstructorDiv);
			}
		});
}
window.onclick = function (e) {
	if (e.target == modal) {
		modal.style.display = "none";
	}
};
