import { DISEASES, TAGS } from "Constants/global.constants";

export const GetHistoryResults = (age, sex, race, tags, disease) => {
  console.log("GetHistoryResults", age, sex, race, tags, disease);
  if (!age || !sex || !race || !disease || !tags) {
    return [];
  }

  const isWhite = race === "white";
  const isBlack = race === "black";
  const isHispanic = race === "hispanic";
  const isFemale = sex === "Female";
  let results;
  // Cataract
  if (disease === DISEASES.cat) {
    results = [
      isFemale &&
        age >= 70 &&
        `You are ${age} years old ${race} ${sex}. Which means you are in the ${
          isWhite ? "highly " : ""
        }risky category`,
      !isFemale &&
        age >= 75 &&
        `You are ${age} years old ${race} ${sex}. Which means you are in the ${
          isWhite ? "highly " : ""
        }risky category`,
      tags[TAGS.cigarette] && "Smoking and cataract has a correlation.*",
      tags[TAGS.steroids] &&
        "The long-term use of steroids increases the risk of developing cataract.*",
    ];
  } else if (disease === DISEASES.gl) {
    // Glaucoma
    results = [
      age >= 70 &&
        `You are ${age} years old ${race} ${sex}. Which means you are in the ${
          isBlack || isHispanic ? "highly " : ""
        }risky category`,
      tags[TAGS.steroids] &&
        "The long-term use of steroids increases the risk of developing glaucoma.*",
    ];
  } else if (disease === DISEASES.dr) {
    // Diabetic Retinopathy
    results = [
      isFemale &&
        age >= 75 &&
        `You are ${age} years old ${race} ${sex}. Which means you are in the ${
          isWhite || isHispanic ? "highly " : ""
        }risky category`,
      !isFemale &&
        age >= 65 &&
        `You are ${age} years old ${race} ${sex}. Which means you are in the ${
          isHispanic ? "highly " : ""
        }risky category`,
      tags[TAGS.highHaemoglobin] &&
        "High haemoglobin A1C puts some individuals at a higher risk for developing DR.*",
      tags[TAGS.highBloodPressure] &&
        "High blood pressure puts some individuals at a higher risk for developing DR.*",
      tags[TAGS.inconsistentSugarBloods] &&
        "Inconsistent blood sugar level may indicate diabetics which is associated with a significantly increased risk of DR.*",
    ];
  }
  return results.filter(Boolean);
};

export const GetReferences = (tags, disease) => {
  if (!tags || !disease) {
    return [];
  }
  let refs;
  // Cataract
  if (disease === DISEASES.cat) {
    refs = [
      tags[TAGS.cigarette] &&
        "Ye J, He J, Wang C, Wu H, Shi X, Zhang H, et al. Smoking and risk of age-related cataract: a meta-analysis. Invest Ophthalmol Vis Sci. 2012;53(7):3885–95.",
      tags[TAGS.steroids] &&
        "James ER. The etiology of steroid cataract. Journal of Ocular Pharmacology and Therapeutics. 2007;23(5):403-20.",
    ];
  } else if (disease === DISEASES.gl) {
    // Glaucoma
    refs = [
      tags[TAGS.steroids] &&
        "Renfro L, Snow JS. Ocular effects of topical and systemic steroids. Dermatologic Clinics. 1992;10(3):505–12.",
    ];
  } else if (disease === DISEASES.dr) {
    // Diabetic Retinopathy
    refs = [
      tags[TAGS.highHaemoglobin] &&
        "Yau J, Rogers S, Kawasaki R, Lamoureux E, Kowalski J, Bek T, et al. Global prevalence and major risk factors of diabetic retinopathy. Diabetes Care. 2012;35:556–64.",
      // tags[TAGS.highBloodPressure] &&
      //   "Yau J, Rogers S, Kawasaki R, Lamoureux E, Kowalski J, Bek T, et al. Global prevalence and major risk factors of diabetic retinopathy. Diabetes Care. 2012;35:556–64.",
      // tags[TAGS.inconsistentSugarBloods] &&
      //   "Yau J, Rogers S, Kawasaki R, Lamoureux E, Kowalski J, Bek T, et al. Global prevalence and major risk factors of diabetic retinopathy. Diabetes Care. 2012;35:556–64.",
    ];
  }
  return refs.filter(Boolean);
};
