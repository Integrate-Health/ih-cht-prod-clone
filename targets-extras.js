/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */
 
const {
  isExist,
  isAlive,
  getField,
  isPregnant,
  isActiveFamilyPlanning,
  isActiveOralCombinationPillFamilyPlanning,
  isActiveInjectibleFamilyPlanning,
  isBetween21and20,
  isFormBetween21and20,
  getMostRecentReport,
  toDateString,
  getDateInFormat
} = require(`./utils`);


const home_actions_forms = [
  // `vaccination_followup`,
  `pcime_c_asc`,
  `pcime_c_referral`,
  `pcime_c_followup`,
  `malnutrition_followup`,
  `pregnancy_family_planning`,
  `delivery`,
  `prenatal_followup`,
  `postnatal_followup`,
  `newborn_followup`,
  `home_visit`,
  `women_emergency_followup`,
  `fp_followup_danger_sign_check`,
  `fp_follow_up_renewal`
];
const consultations_followup_forms = [
  `pcime_c_asc`,
  `pregnancy_family_planning`,
  `delivery`,
  `pcime_c_followup`,
  `pcime_c_referral`,
  `malnutrition_followup`,
  `prenatal_followup`,
  `postnatal_followup`,
  `newborn_followup`,
  `women_emergency_followup`,
  `fp_followup_danger_sign_check`,
  `fp_follow_up_renewal`
];
const consultations_forms = [
  `pcime_c_asc`, 
  `pregnancy_family_planning`,
  `delivery`
];
const followup_forms = [
  `pcime_c_followup`,
  `pcime_c_referral`,
  `malnutrition_followup`,
  `prenatal_followup`,
  `postnatal_followup`,
  `newborn_followup`,
  `women_emergency_followup`,
  `fp_followup_danger_sign_check`,
  `fp_follow_up_renewal`
];
const pcime_consulattions_forms = [
  `pcime_c_asc`
];
const pcime_referal_forms = [
  `pcime_c_referral`
];
const all_child_forms = [
  `pcime_c_asc`,
  `pcime_c_followup`,
  `newborn_followup`,
  `malnutrition_followup`
];
const child_followup_forms = [
  `pcime_c_followup`,
  `newborn_followup`,
  `malnutrition_followup`
];



function getQualityMonitoringCount(reports) {
  return reports.filter((r) => r.form === `chv_quality_monitoring`).length;
}

function isDeathMonthly(contact, report) {
  if (isExist(contact)) {
    if (isExist(contact.contact)) {
      if(isExist(contact.contact.date_of_death)){
        return isBetween21and20(contact.contact.date_of_death);
      }
    }
  }

  // if (report.form === `death_report` && report.fields.s_death !== undefined) {
  //   return isBetween21and20(report.reported_date);
  // }
  return false;
}

function hasAllVisitActionsMonthly(report) {
  
  if (home_actions_forms.includes(report.form)) {
    return isBetween21and20(report.reported_date);
  }
  return false;
}

function isConsultationAndFollowupMonthly(report) {
  // if (consultations_forms.includes(report.form) || followup_forms.includes(report.form)) {
  //   return isBetween21and20(report.reported_date);
  // }
  if (consultations_followup_forms.includes(report.form)) {
    return isBetween21and20(report.reported_date);
  }
  return false;
}

function isConsultationMonthly(report) {
  if (consultations_forms.includes(report.form)) {
    return isBetween21and20(report.reported_date);
  }
  return false;
}

function isFollowupMonthly(report) {
  if (followup_forms.includes(report.form)) {
    if (isBetween21and20(report.reported_date)) {
      return true;
    } else {
      console.log(getDateInFormat(report.reported_date));
      return false;
    }
  }
  return false;
}

function isFeverTdrGivenMonthly(report, type=`all`) {
  if (pcime_consulattions_forms.includes(report.form) && isBetween21and20(report.reported_date)) {
    if (isExist(getField(report, `s_fever_child_TDR`))) {
      if (isExist(getField(report, `s_fever_child_TDR.s_fever_child_TDR_result`))) {
        const tdrGiven = getField(report, `s_fever_child_TDR.s_fever_child_TDR_result`);
        if (type === `positive`) return tdrGiven === `positive`;
        if (type === `negative`) return tdrGiven === `negative`;
        return tdrGiven === `positive` || tdrGiven === `negative`;
      }
    }
  }
  return false;
}

function isPcimeReferalFollowupMonthly(report) {
  if (pcime_referal_forms.includes(report.form)) {
    return isBetween21and20(report.reported_date);
  }
  return false;
}

function isTotalPcimeCMonthly(report) {
  if (all_child_forms.includes(report.form)) {
    return isBetween21and20(report.reported_date);
  }
  return false;
}

function isTotalPcimeCFollowupMonthly(report) {
  if (child_followup_forms.includes(report.form)) {
    return isBetween21and20(report.reported_date);
  }
  return false;
}

function isPregnantMonthly(report){
  if (report.form === `pregnancy_family_planning` && isExist(getField(report, `s_reg_pregnancy_screen`))) {
    const pregnant_1 = getField(report, `s_reg_pregnancy_screen.s_reg_urine_result`) === `positive`;
    const pregnant_2 = getField(report, `s_reg_pregnancy_screen.s_reg_why_urine_test_not_done`) === `already_pregnant`;
    if (isBetween21and20(report.reported_date) === true) {
      return  pregnant_1 === true || pregnant_2 === true;
    }
  }
  return false;
}

function isPregnancyUrineTestMonthly(report){
  if (report.form === `pregnancy_family_planning`) {
    return getField(report, `s_reg_pregnancy_screen.s_reg_urine_test`) === `yes`;
  } else if(report.form === `fp_follow_up_renewal`){
    const preg = getField(report, `s_side_effects.s_pregnancy_result`);
    return preg === `positive` || preg === `negative`;
  }
  return false;

  
}



module.exports = {
  isBetween21and20,
  toDateString,
  isFormBetween21and20,
  isDeathMonthly,
  hasAllVisitActionsMonthly,
  isConsultationAndFollowupMonthly,
  isConsultationMonthly,
  isFollowupMonthly,
  isPcimeReferalFollowupMonthly,
  isTotalPcimeCMonthly,
  isTotalPcimeCFollowupMonthly,
  isPregnantMonthly,
  isPregnancyUrineTestMonthly,
  isFeverTdrGivenMonthly,
  isPregnant,
  isActiveFamilyPlanning,
  isActiveOralCombinationPillFamilyPlanning,
  isActiveInjectibleFamilyPlanning,
  isAlive,
  getMostRecentReport,
  home_actions_forms
};
