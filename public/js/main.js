year = document.getElementById("year").value;
console.log(year);
let selection = document.getElementById("year");
selection.addEventListener("change", loadSeason);

function loadSeason(e) {
	let years = e.target.value;
	// console.log(years);

	function getSeason() {
		year = document.getElementById("year").value;
		// console.log(year);
		// function getYear() {
		// 	year = document.getElementById("year").value;
		// 	return year;
		// }

		fetch(`http://ergast.com/api/f1/${year}/results/1.json`)
			.then((res) => res.json()) // parse response as JSON
			.then((data) => {
				console.log(data);
				document.querySelectorAll("raceOption").innerHTML = "";
				document.querySelector(".race-name").innerHTML = "";
				document.querySelector(".driver-name").innerHTML = "";
				document.querySelector(".constructor-name").innerHTML = "";
				for (let i = 0; i < data.MRData.RaceTable.Races.length; i++) {
					//shows all races for the season
					const raceName = document.querySelector(".race-name");
					const raceNameDiv = document.createElement("div");
					raceNameDiv.innerHTML = `${data.MRData.RaceTable.Races[i].raceName}`;
					raceName.appendChild(raceNameDiv);

					//shows all races for the season in dropdown for more detailed race stats
					const raceDropDown = document.querySelector(".race");
					const raceDropDownDiv = document.createElement("option");
					raceDropDownDiv.innerHTML = `${data.MRData.RaceTable.Races[i].raceName}`;
					raceDropDownDiv.classList.add("raceOption");
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
		fetch(`http://ergast.com/api/f1/${year}/fastest/1/results.json`)
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
		fetch(`http://ergast.com/api/f1/${year}/driverStandings.json`)
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
		fetch(`http://ergast.com/api/f1/${year}/constructorStandings.json`)
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
