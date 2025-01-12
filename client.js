const tempoAPI = "https://www.api-couleur-tempo.fr/api/jourTempo/today";
const tempoAPITomorrow =
  "https://www.api-couleur-tempo.fr/api/jourTempo/tomorrow";

async function getColor() {
  try {
    // Appel à l'API pour récupérer le jour Tempo de demain
    const response = await fetch(tempoAPI, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données Tempo");
    }

    // Récupérer la réponse JSON
    const tempoData = await response.json();
    console.log("Données Tempo reçues:", tempoData); // Ajout de log pour vérifier les données reçues
    let tempoDay = tempoData.codeJour; // Supposons que la réponse contient un champ 'codeJour'
    const today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    // Format the date as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    if (!tempoDay) {
      throw new Error("Erreur lors de la récupération du jour Tempo");
    }

    if (tempoDay == "2") {
      tempoDay = "⚪️ Blanc";
    } else if (tempoDay == "1") {
      tempoDay = "🔵 Bleu";
    } else if (tempoDay == "3") {
      tempoDay = "🔴 Rouge";
    }
    console.log(`Aujourd'hui (${formattedDate}) Tempo EDF: ${tempoDay}`);
    return tempoDay;
  } catch (error) {
    console.error("Erreur lors de la récupération des données Tempo:", error);
  }
}

async function getTomorrow() {
  try {
    // Appel à l'API pour récupérer le jour Tempo de demain
    const response = await fetch(tempoAPITomorrow, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données Tempo");
    }

    const tempoData = await response.json();
    console.log("Données Tempo reçues:", tempoData); // Ajout de log pour vérifier les données reçues
    let tempoDay = tempoData.codeJour; // Supposons que la réponse contient un champ 'codeJour'
    const today = new Date();

    // Calculer la date de demain
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let day = tomorrow.getDate();
    let month = tomorrow.getMonth() + 1; // Les mois sont indexés à partir de 0
    let year = tomorrow.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    // Format the date as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;
    console.log(`Demain est le ${formattedDate}`);

    if (!tempoDay) {
      throw new Error("Erreur lors de la récupération du jour Tempo");
    }

    if (tempoDay == "2") {
      tempoDay = "⚪️ Blanc";
    } else if (tempoDay == "1") {
      tempoDay = "🔵 Bleu";
    } else if (tempoDay == "3") {
      tempoDay = "🔴 Rouge";
    }
    console.log(`Demain (${formattedDate}): ${tempoDay}`);
    return tempoDay;
  } catch (error) {
    console.error("Erreur:", error);
  }
}

function getDate(day) {
  if (day == "tomorrow") {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    let day = tomorrow.getDate();
    let month = tomorrow.getMonth() + 1; // Les mois sont indexés à partir de 0
    let year = tomorrow.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  } else if (day == "today") {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; // Les mois sont indexés à partir de 0
    let year = today.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}

async function loadColor() {
  tempoColorToday = await getColor();
  tempoColorTomorrow = await getTomorrow();
  document.getElementById("h1").innerHTML =
    "Aujourd'hui (" + getDate("today") + "): " + tempoColorToday;
  document.getElementById("h2").innerHTML =
    "Demain (" + getDate("tomorrow") + "): " + tempoColorTomorrow;
}

async function loadHistory() {
  try {
    const response = await fetch("/getHistory");
    const data = await response.json();
    const historyContainer = document.querySelector(".history-container");

    data.forEach((entry) => {
      const p = document.createElement("p");
      p.textContent = `Date: ${entry.date}, Couleur: ${entry.color}`;
      historyContainer.appendChild(p);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error);
  }
}
loadColor();
loadHistory();
