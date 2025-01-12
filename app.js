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
  if (day === "tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let day = tomorrow.getDate();
    let month = tomorrow.getMonth() + 1; // Les mois sont indexés à partir de 0
    let year = tomorrow.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  } else {
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

module.exports = { getDate, getColor, getTomorrow };
