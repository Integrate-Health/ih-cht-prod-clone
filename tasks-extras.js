/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */

const {
  getMostRecentReport,
  isFormArraySubmittedInWindow,
  notNull,
  getField,
  getFollowUpCount,
  R_Date,
  isValidDate,
  addDays,
  isPregnancyForm,
  isPregnancyFollowUpForm,
  isPregnant,
  isChildUnder5,
  getAgeInMonths,
  getAgeInDays,
  isReportValid,
} = require(`./utils`);


const fackDate = new Date(`2000-01-01`);

// function getShedules(mapid){
//   const tasks = require(`./tasks`);
//   var result;
//   tasks.forEach((task) => {
//     if(task.name === mapid) {
//       result = task;
//     }
//   });
//   return notNull(result) ? result.events : null;
// }

// function getEvent(event, id, days, start, end) {
//    return {
//     id: `${event.id}-${id}`,
//     days: event.days + (days),
//     start: event.start + (start),
//     end: event.end + (end),
//   };
// }

function getPriority(priorityData) {
  // level : `high`, `medium`
  if (notNull(priorityData)) {
    return {
      level: notNull(priorityData.priority_level)
        ? priorityData.priority_level
        : ``,
      label: priorityData.priority_label,
    };
  }
  return { level: ``, label: `` };
}

// // vaccination Followup
// function getVaccinationConfig(c){
//   var content = [];
//   var vaccinationArray = [];
//   var priority_label = `vaccination.followup.1`;
//   var source_id;
//   var isEmpty = false;

//   var vaccinal_status_BCG;
//   var vaccinal_status_VPO_0;
//   var vaccinal_status_DTC_B1;
//   var vaccinal_status_VPO_1;
//   var vaccinal_status_pneumo_1;
//   var vaccinal_status_rota_1;
//   var vaccinal_status_DTC_B2;
//   var vaccinal_status_VPO_2;
//   var vaccinal_status_pneumo_2;
//   var vaccinal_status_rota_2;
//   var vaccinal_status_DTC_B3;
//   var vaccinal_status_VPO_3;
//   var vaccinal_status_pneumo_3;
//   var vaccinal_status_vpi;
//   var vaccinal_status_RR1;
//   var vaccinal_status_VAA;
//   var vaccinal_status_vit_A;
//   var vaccinal_status_RR2;
//   var vaccinal_status_MEG;

//   var reportedDate;
//   var task_to_perform;
//   var resheduleTask = false;

//   const r = getMostRecentReport(c.reports, [`vaccination_followup`]);

//   if(notNull(r)) {
//     source_id = r._id;
//     if(notNull(r.fields)) {
//       if(notNull(getField(r, `s_today_task`))) {
//         task_to_perform = getField(r, `s_today_task.s_task_to_perform`);
//       }
//       if(notNull(getField(r, `s_vaccinal_status`)) && task_to_perform !== `close_out`) {
//         if (notNull(getField(r, `group_review`))) {
//           resheduleTask = getField(r, `group_review.has_vaccin_not_done`) === `yes` && task_to_perform === `follow_up`;
//           reportedDate = new Date(r.reported_date);
//         }
//         if(notNull(getField(r, `s_vaccinal_status.s_one_day`))){
//           vaccinal_status_BCG = getField(r, `s_vaccinal_status.s_one_day.s_vaccinal_status_BCG`);
//           vaccinal_status_VPO_0 = getField(r, `s_vaccinal_status.s_one_day.s_vaccinal_status_VPO_0`);
//         }
//         if(notNull(getField(r, `s_vaccinal_status.s_six_weeks`))){
//           vaccinal_status_DTC_B1 = getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_DTC_B1`);
//           vaccinal_status_VPO_1 = getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_VPO_1`);
//           vaccinal_status_pneumo_1 = getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_pneumo_1`);
//           vaccinal_status_rota_1 = getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_rota_1`);
//         }
//         if(notNull(getField(r, `s_vaccinal_status.s_ten_weeks`))){
//           vaccinal_status_DTC_B2 = getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_DTC_B2`);
//           vaccinal_status_VPO_2 = getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_VPO_2`);
//           vaccinal_status_pneumo_2 = getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_pneumo_2`);
//           vaccinal_status_rota_2 = getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_rota_2`);
//         }
//         if(notNull(getField(r, `s_vaccinal_status.s_forteen_weeks`))){
//           vaccinal_status_DTC_B3 = getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_DTC_B3`);
//           vaccinal_status_VPO_3 = getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_VPO_3`);
//           vaccinal_status_pneumo_3 = getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_pneumo_3`);
//           vaccinal_status_vpi = getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_vpi`);
//         }
//         if(notNull(getField(r, `s_vaccinal_status.s_nine_months`))){
//           vaccinal_status_RR1 = getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_RR1`);
//           vaccinal_status_VAA = getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_VAA`);
//           vaccinal_status_vit_A = getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_vit_A`);
//         }
//         if(notNull(getField(r, `s_vaccinal_status.s_fifty_months`))){
//           vaccinal_status_RR2 = getField(r, `s_vaccinal_status.s_fifty_months.s_vaccinal_status_RR2`);
//           vaccinal_status_MEG = getField(r, `s_vaccinal_status.s_fifty_months.s_vaccinal_status_MEG`);
//         }

//         //###########################################################

//         if (getAgeInDays(c) >= 0) {
//           if(vaccinal_status_BCG !== `yes`) vaccinationArray.push(`vaccinal_status_BCG`);
//           if(vaccinal_status_VPO_0 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_0`);
//         }
//         if (getAgeInDays(c) >= 42) {
//           if(vaccinal_status_DTC_B1 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B1`);
//           if(vaccinal_status_VPO_1 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_1`);
//           if(vaccinal_status_pneumo_1 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_1`);
//           if(vaccinal_status_rota_1 !== `yes`) vaccinationArray.push(`vaccinal_status_rota_1`);
//         }
//         if (getAgeInDays(c) >= 70) {
//           if(vaccinal_status_DTC_B2 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B2`);
//           if(vaccinal_status_VPO_2 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_2`);
//           if(vaccinal_status_pneumo_2 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_2`);
//           if(vaccinal_status_rota_2 !== `yes`) vaccinationArray.push(`vaccinal_status_rota_2`);
//         }
//         if (getAgeInDays(c) >= 98) {
//           if(vaccinal_status_DTC_B3 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B3`);
//           if(vaccinal_status_VPO_3 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_3`);
//           if(vaccinal_status_pneumo_3 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_3`);
//           if(vaccinal_status_vpi !== `yes`) vaccinationArray.push(`vaccinal_status_vpi`);
//         }
//         if (getAgeInMonths(c) >= 9) {
//           if(vaccinal_status_RR1 !== `yes`) vaccinationArray.push(`vaccinal_status_RR1`);
//           if(vaccinal_status_VAA !== `yes`) vaccinationArray.push(`vaccinal_status_VAA`);
//           if(vaccinal_status_vit_A !== `yes`) vaccinationArray.push(`vaccinal_status_vit_A`);
//         }
//         if (getAgeInMonths(c) >= 15) {
//           if(vaccinal_status_RR2 !== `yes`) vaccinationArray.push(`vaccinal_status_RR2`);
//           if(vaccinal_status_MEG !== `yes`) vaccinationArray.push(`vaccinal_status_MEG`);

//         }
//       }
//     }
//   } else {
//     isEmpty = true;
//   }

//   if (vaccinationArray.length > 0) {
//     if(vaccinationArray.length === 1) {
//       priority_label = `Suivi vaccinal ( ` + vaccinationArray[0].replace(`vaccinal_status_`, ``) + ` )`;
//     } else {
//       priority_label = `multiple.vaccination.followup`;
//     }
//   }

//   content.push({
//     source: `task`,
//     source_id: source_id,
//     contact: c.contact,
//     t_vaccinal_status_BCG: vaccinal_status_BCG,
//     t_vaccinal_status_VPO_0: vaccinal_status_VPO_0,
//     t_vaccinal_status_DTC_B1: vaccinal_status_DTC_B1,
//     t_vaccinal_status_VPO_1: vaccinal_status_VPO_1,
//     t_vaccinal_status_pneumo_1: vaccinal_status_pneumo_1,
//     t_vaccinal_status_rota_1: vaccinal_status_rota_1,
//     t_vaccinal_status_DTC_B2: vaccinal_status_DTC_B2,
//     t_vaccinal_status_VPO_2: vaccinal_status_VPO_2,
//     t_vaccinal_status_pneumo_2: vaccinal_status_pneumo_2,
//     t_vaccinal_status_rota_2: vaccinal_status_rota_2,
//     t_vaccinal_status_DTC_B3: vaccinal_status_DTC_B3,
//     t_vaccinal_status_VPO_3: vaccinal_status_VPO_3,
//     t_vaccinal_status_pneumo_3: vaccinal_status_pneumo_3,
//     t_vaccinal_status_vpi: vaccinal_status_vpi,
//     t_vaccinal_status_RR1: vaccinal_status_RR1,
//     t_vaccinal_status_VAA: vaccinal_status_VAA,
//     t_vaccinal_status_vit_A: vaccinal_status_vit_A,
//     t_vaccinal_status_RR2: vaccinal_status_RR2,
//     t_vaccinal_status_MEG: vaccinal_status_MEG,
//     t_task_to_perform: task_to_perform
//   });

//   const resolvedIf = (vaccinationArray.length === 0 && !isEmpty) || task_to_perform === `close_out` || !isVaccinAgeLimit(c);

//   return {nextVisitDate: reportedDate, resheduleTask: resheduleTask, resolvedIf: resolvedIf, priority_label:priority_label, displayIf: vaccinationArray.length > 0, content:content[0]};
// }

// Newborn Followup

function getNewbornConfig(c, r) {
  var content = [];
  var nextVisitDate;
  var isFound = false;
  var priority_label = `newborn.followup`;
  var eventIndex;
  const follow_up_count = getFollowUpCount(r);
  const has_danger_signs = getField(r, `has_danger_signs`);

  if (getField(r, `close_out`) !== `true`) {
    const v1 = getField(r, `s_pnc.s_pnc_1_date`);
    const v2 = getField(r, `s_pnc.s_pnc_2_date`);
    var pnc1date = notNull(v1) ? v1 : ``;
    var pnc2Date = notNull(v2) ? v2 : ``;

    if (follow_up_count === 1 && has_danger_signs === `true`) {
      isFound = true;
      priority_label = `newborn.danger.signs.followup`;
      eventIndex = 0;
      nextVisitDate = addDays(new Date(r.reported_date), 1);
    } else if (follow_up_count === 2 && pnc1date !== ``) {
      isFound = true;
      priority_label = `newborn.followup.2`;
      eventIndex = 1;
      nextVisitDate = addDays(new Date(pnc1date), 7);
    } else if (follow_up_count === 3 && pnc2Date !== ``) {
      isFound = true;
      priority_label = `newborn.followup.3`;
      eventIndex = 2;
      nextVisitDate = addDays(new Date(pnc2Date), 14);
    }
  }

  if (isFound === true) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_has_danger_signs: has_danger_signs,
      t_follow_up_count: follow_up_count + 1,
    });
  }

  return {
    nextVisitDate: nextVisitDate,
    eventIndex: eventIndex,
    priority_label: priority_label,
    displayIf: isFound && content.length > 0,
    content: content.length > 0 ? content[0] : {},
  };
}

// Pcime Treatment Followup
function getPcimeTreatmentFollowUpConfig(c, r) {
  var content = [];
  var treats = [];
  var follow_up_count;
  var treatForDiarrhea;
  var treatForFever;
  var treatForPneumonia;
  var has_been_referred;
  var malnutrition_referred;
  var has_malnutrition;
  var treatForCoughCold;
  var malaria_fever;
  var hasBeenReferred;
  var accompaniment = false;
  var nextVisitDate = fackDate;
  var oldTemperature = ``;
  var oldWeight = ``;
  var childBrachialPerimeter = ``;
  var resp_rate = ``;
  var follow_up_type;
  var isFound = false;
  var eventIndex;
  var priority_label = `pcime.followup`;
  var tdrGiven;

  if (isReportValid(r)) {
    follow_up_type = getField(r, `followup_type`);
    treatForDiarrhea = getField(r, `has_diarrhea`);
    treatForFever = getField(r, `has_fever`);
    treatForPneumonia = getField(r, `has_pneumonia`);
    hasBeenReferred = getField(r, `s_have_you_refer_child`);
    treatForCoughCold = getField(r, `has_cough_cold`);
    const accompnt = getField(r, `accompaniment`);
    if (notNull(accompnt)) accompaniment = accompnt;
    if (treatForFever === `true`) treats.push(`fever`);
    if (treatForDiarrhea === `true`) treats.push(`diarrhea`);
    if (treatForPneumonia === `true`) treats.push(`pneumonia`);
    if (treatForCoughCold === `true`) treats.push(`cough_cold`);

    if (notNull(getField(r, `s_cough_cold`))) {
      const respRate = getField(r, `s_cough_cold.s_cough_cold_breathing_freq`);
      if (notNull(respRate)) resp_rate = respRate;
    }

    if (notNull(getField(r, `s_constant`))) {
      const t1 = getField(r, `s_constant.s_constant_child_temperature`);
      const t2 = getField(r, `s_constant.s_constant_child_weight`);
      const t3 = getField(r, `s_constant.s_constant_child_brachial_perimeter`);
      if (notNull(t1)) oldTemperature = t1;
      if (notNull(t2)) oldWeight = t2;
      if (notNull(t3)) childBrachialPerimeter = t3;
    }

    has_been_referred = accompaniment === `true` || hasBeenReferred === `yes`;
    has_malnutrition = getField(r, `has_malnutrition`) === `true`;
    const newestMalnutrition = getMostRecentReport(c.reports, [
      `malnutrition_followup`,
    ]);
    const ref2 = getField(newestMalnutrition, `referral`) === `true`;
    const ref3 = getField(r, `referral`) === `true`;
    malnutrition_referred = (newestMalnutrition !== null && ref2) || ref3;
    follow_up_count = getFollowUpCount(r) + 1;
    malaria_fever = getField(r, `fever_with_malaria`);

    const r1 = r.form === `pcime_c_asc`;
    const r2 = r.form === `usp_pcime_followup`;
    const r3 = r.form === `pcime_c_followup`;
    const r4 = notNull(getField(r, `s_fever_child_TDR`));
    if (r1 || r2 || r3) {
      if (follow_up_count === 1 && (r1 || r2)) eventIndex = 0;
      if (follow_up_count === 2 && r3) eventIndex = 1;
      if (eventIndex === 0 || eventIndex === 1) {
        if (treats.length > 0) {
          isFound = true;
          if (treats.length === 1) {
            follow_up_type = `${treats[0]}`;
            priority_label = `treatment.${treats[0]}`;
          } else {
            follow_up_type = `multiple`;
            priority_label = `treatment.multiple`;
          }

          if ((r1 || r2) && r4) {
            const tdr0 = getField(
              r,
              `s_fever_child_TDR.s_fever_child_TDR_result`
            );
            if (notNull(tdr0)) tdrGiven = tdr0;
          }

          if (
            priority_label === `treatment.fever` &&
            (tdrGiven === `positive` || malaria_fever === `true`)
          ) {
            priority_label = `treatment.malaria.fever`;
          }

          if (r.form === `pcime_c_followup`) {
            if (getField(r, `danger_signs.s_continue_followup`) === `yes`) {
              const condition_worsen = getField(
                r,
                `disease_progress.s_condition_worsen`
              );
              const state_improved = getField(
                r,
                `disease_progress.s_state_improved`
              );
              const lastReport = getMostRecentReport(c.reports, [
                `pcime_c_followup`,
              ]);
              const canTriggerRefFollowup =
                isReportValid(lastReport) && lastReport._id === r._id;
              const ref1 =
                getField(r, `has_danger_signs`) === `true` ||
                hasBeenReferred === `yes`;
              const referralConditions =
                ref1 === true && canTriggerRefFollowup === true;
              if (
                condition_worsen === `no` &&
                state_improved === `no` &&
                follow_up_count === 2 &&
                referralConditions === false
              ) {
                oldTemperature = getField(r, `temperature.s_temperature`);
              }
            }
          }
        }
      }
    }

    nextVisitDate = addDays(new Date(r.reported_date), 1);
  }

  if (isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_type: follow_up_type,
      t_follow_up_count: follow_up_count,
      t_treat_for_diarrhea: treatForDiarrhea,
      t_treat_for_fever: treatForFever,
      t_treat_for_pneumonia: treatForPneumonia,
      t_has_been_referred: has_been_referred === true ? `yes` : `no`,
      t_has_been_malnutrition_referred:
        malnutrition_referred === true ? `yes` : `no`,
      t_has_malnutrition: has_malnutrition === true ? `yes` : `no`,
      t_has_cough_cold: treatForCoughCold === true ? `yes` : `no`,
      t_non_malaria_fever: getField(r, `non_malaria_fever`),
      t_malaria_fever: malaria_fever,
      t_resp_rate: resp_rate,
      t_last_visit_temperature: oldTemperature,
      t_last_visit_weight: oldWeight,
      t_last_visit_child_brachial_perimeter: childBrachialPerimeter,
    });
  }

  return {
    nextVisitDate: nextVisitDate,
    priority_label: priority_label,
    displayIf: isFound && content.length > 0,
    content: content.length > 0 ? content[0] : {},
  };
}

// Referal Followup
function getReferalFollowUpConfig(c, r) {
  var content = [],
    treats = [],
    oldTemperature = ``,
    oldWeight = ``,
    childBrachialPerimeter = ``;
  var isFound = false;
  var eventIndex = 1;
  var priority_label = `pcime.referal`;
  var nextVisitDate = fackDate;
  const hasBeenReferred = getField(r, `s_have_you_refer_child`);
  const accompaniment = getField(r, `accompaniment`)
    ? getField(r, `accompaniment`)
    : false;
  if (getField(r, `has_fever`) === `true`) treats.push(`fever`);
  if (getField(r, `has_diarrhea`) === `true`) treats.push(`diarrhea`);
  if (getField(r, `has_pneumonia`) === `true`) treats.push(`pneumonia`);

  if (notNull(getField(r, `s_constant`))) {
    const t1 = getField(r, `s_constant.s_constant_child_temperature`);
    const t2 = getField(r, `s_constant.s_constant_child_weight`);
    const t3 = getField(r, `s_constant.s_constant_child_brachial_perimeter`);
    if (notNull(t1)) oldTemperature = t1;
    if (notNull(t2)) oldWeight = t2;
    if (notNull(t3)) childBrachialPerimeter = t3;
  }

  const lastReport = getMostRecentReport(c.reports, [`pcime_c_followup`]);
  const canTriggerRefFollowup =
    isReportValid(lastReport) && lastReport._id === r._id;
  const condition_worsen = getField(r, `disease_progress.s_condition_worsen`);
  const state_improved = getField(r, `disease_progress.s_state_improved`);
  const referralConditions =
    (getField(r, `has_danger_signs`) === `true` || hasBeenReferred === `yes`) &&
    canTriggerRefFollowup === true;
  const newestMalnutrition = getMostRecentReport(c.reports, [
    `malnutrition_followup`,
  ]);
  const was_referred_for_malnutrition =
    (newestMalnutrition !== null &&
      getField(newestMalnutrition, `referral`) === `true`) ||
    getField(r, `referral`) === `true`;
  const def1 =
    (r.form === `pcime_c_asc` || r.form === `usp_pcime_followup`) &&
    treats.length === 0 &&
    (accompaniment === `true` ||
      hasBeenReferred === `yes` ||
      was_referred_for_malnutrition === true);
  const def2 =
    r.form === `pcime_c_followup` &&
    treats.length === 0 &&
    (referralConditions === true ||
      condition_worsen === `yes` ||
      (condition_worsen === `no` &&
        state_improved === `no` &&
        followupCount === 2) ||
      state_improved === `no`);
  const def3 =
    r.form === `pcime_c_referral` && getField(r, `referal`) === `true`;
  const def4 =
    r.form === `malnutrition_followup` && getField(r, `referral`) === `true`;

  if (def1 || def2 || def3 || def4) {
    isFound = true;
    eventIndex = 0;
    nextVisitDate = addDays(new Date(r.reported_date), 1);

    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_type: `referral`,
      t_follow_up_count: getFollowUpCount(r) + 1,
      t_last_weight: oldWeight,
      t_last_pb: childBrachialPerimeter,
      t_last_temperature: oldTemperature,
    });
  }

  return {
    nextVisitDate: nextVisitDate,
    eventIndex: eventIndex,
    priority_label: priority_label,
    displayIf: isFound && content.length > 0,
    content: content.length > 0 ? content[0] : {},
  };
}

// Pcime Malnutrition Followup
function getPcimeTreatmentMalnutritionConfig(c, r) {
  var isFound = false;
  var content = [];
  var priority_label = ``;
  var eventIndex = getFollowUpCount(r);
  var nextVisitDate = fackDate;
  var atpe_given_quantity = 0;
  var oldTemperature;
  var oldWeight;
  var childBrachialPerimeter;
  priority_label = `malnutrition.followup.${eventIndex}`;

  if (
    r.form === `pcime_c_asc` &&
    getField(r, `has_malnutrition`) === `true` &&
    eventIndex === 1
  ) {
    isFound = true;
    nextVisitDate = addDays(new Date(r.reported_date), 7);
    priority_label = `malnutrition.followup.1`;
    if (notNull(getField(r, `group_review`))) {
      if (notNull(getField(r, `group_review.r_nutritional_treatment`))) {
        const dt1 = getField(
          r,
          `group_review.r_nutritional_treatment.s_atpe_given_quantity`
        );
        if (notNull(dt1)) {
          atpe_given_quantity = dt1;
        }
      }
    }
  } else if (
    r.form === `malnutrition_followup` &&
    eventIndex > 1 &&
    eventIndex < 7
  ) {
    priority_label = `malnutrition.followup.${eventIndex - 1}`;
    isFound = true;
    if (eventIndex === 6 || eventIndex === 7) {
      nextVisitDate = addDays(new Date(r.reported_date), 14);
    } else {
      nextVisitDate = addDays(new Date(r.reported_date), 7);
    }
    if (notNull(getField(r, `s_atpe_quantity`))) {
      const dt2 = getField(r, `s_atpe_quantity.s_atpe_given_quantity`);
      if (notNull(dt2)) {
        atpe_given_quantity = dt2;
      }
    }
  }

  if (notNull(getField(r, `s_constant`))) {
    const t1 = getField(r, `s_constant.s_constant_child_temperature`);
    const t2 = getField(r, `s_constant.s_constant_child_weight`);
    const t3 = getField(r, `s_constant.s_constant_child_brachial_perimeter`);
    if (notNull(t1)) oldTemperature = t1;
    if (notNull(t2)) oldWeight = t2;
    if (notNull(t3)) childBrachialPerimeter = t3;
  }


  if (isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_type: `malnutrition`,
      t_follow_up_count: eventIndex + 1,
      t_temperature_from_assessment: oldTemperature,
      t_weight_from_assessment: oldWeight,
      t_pb_from_assessment: childBrachialPerimeter,
      t_assessment_date: isValidDate(nextVisitDate)
        ? nextVisitDate.toISOString()
        : ``,
      t_atpe_given_quantity: atpe_given_quantity,
    });
  }

  return {
    nextVisitDate: nextVisitDate,
    eventIndex: eventIndex,
    priority_label: priority_label,
    displayIf: isFound && content.length > 0,
    content: content.length > 0 ? content[0] : {},
  };
}

// Postnatal Followup
function getPostnatalConfig(c, r) {
  var isFound = false;
  var content = [];
  var nextPNCVisit = fackDate;
  var followUpCount = parseInt(getField(r, `follow_up_count`), 10);
  var priority_label;
  var child_alive = 0;
  var close_out;
  var deliveryDate;

  if (!isPregnant(c.reports)) {
    if (isReportValid(r)) {
      if (
        r.form === `delivery` &&
        getField(r, `has_delivered`) === `true` &&
        notNull(getField(r, `s_delivery`))
      ) {
        deliveryDate = new Date(getField(r, `s_delivery.s_delivery_date`));
        var delivery_dif = parseInt(
          getField(r, `s_delivery.c_delivery_dif`),
          10
        );

        if (notNull(getField(r, `s_delivery.s_child_alive_rest`))) {
          child_alive = getField(r, `s_delivery.s_child_alive_rest`);
        }

        if (delivery_dif >= 7) {
          isFound = true;
          priority_label = `postnatal.followup.1`;
          if (getField(r, `s_delivery.s_pnc_today`) === `no`) {
            nextPNCVisit = new Date(getField(r, `s_delivery.s_next_pnc`));
          } else if (getField(r, `s_delivery.s_pnc_today`) === `yes`) {
            nextPNCVisit = new Date(r.reported_date);
          }
        } else {
          isFound = true;
          priority_label = `postnatal.followup.1`;
          nextPNCVisit = addDays(deliveryDate, 7 - delivery_dif);
        }
      } else if (
        r.form === `postnatal_followup` &&
        followUpCount > 0 &&
        followUpCount < 3 &&
        notNull(getField(r, `reschedule_task`))
      ) {
        close_out = getField(r, `close_out`);

        const w_available = getField(r, `reschedule_task.is_woman_available`);
        if (w_available === `no`) {
          const rescheduleDate = getField(
            r,
            `reschedule_task.s_date_to_reschedule`
          );
          if (
            rescheduleDate !== `` &&
            rescheduleDate !== null &&
            rescheduleDate !== `null`
          ) {
            isFound = true;
            priority_label = `postnatal.followup.${followUpCount}`;
            nextPNCVisit = new Date(rescheduleDate);
          }
        } else if (w_available === `yes` && close_out !== `true`) {
          if (notNull(getField(r, `s_child_alive`))) {
            child_alive = getField(r, `s_child_alive`);
          }
          if (notNull(getField(r, `usp_follow_up_visit`))) {
            if (
              notNull(
                getField(
                  r,
                  `usp_follow_up_visit.date_next_visit_mother_newborn`
                )
              )
            ) {
              isFound = true;
              priority_label = `postnatal.followup.${followUpCount + 1}`;
              var newDate = new Date(
                getField(
                  r,
                  `usp_follow_up_visit.date_next_visit_mother_newborn`
                )
              );
              nextPNCVisit = addDays(newDate, 7);
            }
          }
        }
      }
    }
  }

  if (isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_count: getFollowUpCount(r) + 1,
      t_delivery_date: isValidDate(deliveryDate)
        ? deliveryDate.toISOString().substring(0, 10)
        : ``,
      t_child_alive: child_alive,
      t_close_out: close_out,
    });
  }

  return {
    close_out: close_out,
    nextVisitDate: nextPNCVisit,
    priority_label: priority_label,
    displayIf: isFound && content.length > 0,
    content: content.length > 0 ? content[0] : {},
  };
}

// Prenatal Followup
function getPrenatalConfig(c, r) {
  var isFound = false;
  var content = [];
  var nextVisitDate = fackDate;
  var t_anc_visit;
  var t_follow_up_type;
  var priority_label = `treatment.prenatal`;
  var eventIndex;
  var close_out = false;

  if (isPregnant(c.reports) && isReportValid(r)) {
    if (isPregnancyFollowUpForm(r) && notNull(getField(r, `reschedule_task`))) {

      close_out = getField(r, `s_today_task.s_task_to_perform`) === `close_out`;

      const w_available = getField(r, `reschedule_task.is_woman_available`);

      if (w_available === `no`) {
        const rescheduleDate = getField(
          r,
          `reschedule_task.s_date_to_reschedule`
        );
        if (
          rescheduleDate !== `` &&
          rescheduleDate !== null &&
          rescheduleDate !== `null`
        ) {
          isFound = true;
          eventIndex = 1;
          nextVisitDate = new Date(rescheduleDate);
        }
      } else if (w_available === `yes` && close_out !== true) {
        if (notNull(getField(r, `s_vad_1`))) {
          isFound = true;
          eventIndex = 0;
          if (notNull(getField(r, `s_vad_1.s_anc_next_anc`))) {
            nextVisitDate = new Date(getField(r, `s_vad_1.s_anc_next_anc`));
          } else {
            nextVisitDate = new Date(getField(r, `s_vad_1.s_anc_1_date`));
          }
        } else if (notNull(getField(r, `s_vad_2`))) {
          if (notNull(getField(r, `s_vad_2.s_anc_2_date`))) {
            isFound = true;
            eventIndex = 0;
            nextVisitDate = new Date(getField(r, `s_vad_2.s_anc_2_date`));
          }
        } else if (notNull(getField(r, `s_vad_3`))) {
          if (notNull(getField(r, `s_vad_3.s_anc_3_date`))) {
            isFound = true;
            eventIndex = 0;
            nextVisitDate = new Date(getField(r, `s_vad_3.s_anc_3_date`));
          }
        } else if (notNull(getField(r, `s_vad_4`))) {
          if (notNull(getField(r, `s_vad_4.s_anc_4_date`))) {
            isFound = true;
            eventIndex = 0;
            nextVisitDate = new Date(getField(r, `s_vad_4.s_anc_4_date`));
          }
        }
      }
    } else if (isPregnancyForm(r)) {
      var urineTest, whyNotUrineTest, first_prenatal_followup_today;

      if (notNull(getField(r, `s_reg_pregnancy_screen`))) {
        if (notNull(getField(r, `s_reg_pregnancy_screen.s_reg_urine_result`))) {
          urineTest = getField(r, `s_reg_pregnancy_screen.s_reg_urine_result`);
        }
        if (
          notNull(
            getField(r, `s_reg_pregnancy_screen.s_reg_why_urine_test_not_done`)
          )
        ) {
          whyNotUrineTest = getField(
            r,
            `s_reg_pregnancy_screen.s_reg_why_urine_test_not_done`
          );
        }
      }

      if (notNull(getField(r, `s_reg_pregnancy`))) {
        if (
          notNull(getField(r, `s_reg_pregnancy.first_prenatal_followup_today`))
        ) {
          first_prenatal_followup_today = getField(
            r,
            `s_reg_pregnancy.first_prenatal_followup_today`
          );
        }
      }

      if (
        notNull(first_prenatal_followup_today) &&
        notNull(getField(r, `s_vad_1`))
      ) {
        isFound = true;
        eventIndex = 0;
        if (notNull(getField(r, `s_vad_1.s_anc_next_anc`))) {
          nextVisitDate = new Date(getField(r, `s_vad_1.s_anc_next_anc`));
        } else {
          nextVisitDate = new Date(getField(r, `s_vad_1.s_anc_1_date`));
        }

        t_anc_visit =
          getField(r, `s_vad_1.s_anc_1_visit`) === `yes`
            ? getField(r, `s_vad_1.s_anc_number`) + 1
            : 1;
        t_follow_up_type = `prenatal-followup`;
      } else if (
        urineTest === `positive` ||
        whyNotUrineTest === `already_pregnant`
      ) {
        var followupSelectedDate;
        const d1 = getField(r, `next_anc_visit_follow_up_date`);
        if (notNull(d1)) {
          followupSelectedDate = new Date(d1);
        } else {
          followupSelectedDate = new Date(getField(r, `next_visit`));
        }
        if (
          notNull(followupSelectedDate) &&
          followupSelectedDate !== `Invalid Date`
        ) {
          isFound = true;
          eventIndex = 1;
          nextVisitDate = followupSelectedDate;
        }
      }
    }
  }

  const finalNextVisitDate =
    eventIndex === 0 ? addDays(nextVisitDate, 7) : nextVisitDate;

  if (isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_count: getFollowUpCount(r) + 1,
      t_follow_up_type: t_follow_up_type,
      t_anc_visit: t_anc_visit,
      t_close_out: `${close_out}`,
    });
  }

  return {
    nextVisitDate: finalNextVisitDate,
    close_out: `${close_out}`,
    priority_label: priority_label,
    displayIf: isFound && content.length > 0,
    content: content.length > 0 ? content[0] : {},
  };
}

function getFamilyPlanningFirstFollowupConfig(c, r) {
  var isFound = false;
  var content = [];
  var nextVisitDate = fackDate;
  var chosen_fp_method;
  var followUpCount = 0;
  var priority_label;
  var eventIndex;

  if (!isPregnant(c.reports) && isReportValid(r)) {
    chosen_fp_method = getField(r, `fp_method`);
    // chosen_fp_method = getField(r, `chosen_fp_method`);
    if (
      r.form === `fp_followup_danger_sign_check` &&
      notNull(chosen_fp_method) &&
      notNull(getField(r, `s_side_effects`)) &&
      getField(r, `s_side_effects.s_woman_new_packet`) === `yes`
    ) {
      isFound = true;
      const dateFP = new Date(r.reported_date);

      if (chosen_fp_method === `oral_combination_pill`) {
        priority_label = `oral.combination.pill`;
        nextVisitDate = addDays(dateFP, 7);
      } else if (chosen_fp_method === `injectible`) {
        priority_label = `injectible`;
        nextVisitDate = addDays(dateFP, 30);
      }
    } else if (
      r.form === `fp_follow_up_renewal` &&
      notNull(chosen_fp_method) &&
      getField(r, `stop_fp`) === `no` &&
      notNull(getField(r, `checklist1`)) &&
      notNull(getField(r, `s_side_effects`)) &&
      getField(r, `checklist1.s_renew_method`) === `yes` &&
      getField(r, `s_side_effects.s_woman_new_packet`) === `yes`
    ) {
      isFound = true;
      followUpCount = getFollowUpCount(r);
      const dateFP = new Date(r.reported_date);

      if (chosen_fp_method === `oral_combination_pill`) {
        priority_label = `oral.combination.pill`;
        nextVisitDate = addDays(dateFP, 7);
      } else if (chosen_fp_method === `injectible`) {
        priority_label = `injectible`;
        nextVisitDate = addDays(dateFP, 30);
      }
    } else if (
      r.form === `pregnancy_family_planning` &&
      notNull(getField(r, `start_method`))
    ) {
      chosen_fp_method = getField(r, `chosen_fp_method`);
      const lastReport = getMostRecentReport(c.reports, [
        `fp_follow_up_renewal`,
      ]);
      const v0 = notNull(lastReport)
        ? new Date(lastReport.reported_date) < new Date(r.reported_date)
        : true;
      if (v0 === true) {
        const v1 = getField(r, `start_method.s_ren_start_date_fam_plan`);
        const v2 = getField(r, `start_method.s_scheduled_start_date`);
        if (notNull(v1) || notNull(v2)) {
          renewDate = notNull(v1) ? new Date(v1) : new Date(v2);
          isFound = true;
          if (chosen_fp_method === `oral_combination_pill`) {
            priority_label = `oral.combination.pill`;
            nextVisitDate = addDays(renewDate, 7);
          } else if (chosen_fp_method === `injectible`) {
            priority_label = `injectible`;
            nextVisitDate = addDays(renewDate, 30);
          }
        }
      }
    }
  }

  if (isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_count: followUpCount + 1,
      t_fp_method: chosen_fp_method,
    });
  }

  return {
    eventIndex: eventIndex,
    nextVisitDate: nextVisitDate,
    priority_label: priority_label,
    displayIf: isFound && content.length > 0,
    content: content.length > 0 ? content[0] : {},
  };
}

function getFamilyPlanningFollowupConfig(c, r) {
  var isFound = false;
  var content = [];
  var followUpCount = 1;
  var priority_label;
  var eventIndex;
  var renewDate = fackDate;
  var nextVisitDate = fackDate;
  var chosen_fp_method = ``;

  if (!isPregnant(c.reports) && isReportValid(r)) {
    if (r.form === `fp_follow_up_renewal`) {
      chosen_fp_method = getField(r, `fp_method`);

      const v0 = notNull(getField(r, `fp_method`));
      const v1 = getField(r, `stop_fp`) === `no`;
      const v2 = getField(r, `checklist1.s_renew_method`) === `yes`;
      if ((v0 && v1 && v2) === false) {
        followUpCount = getFollowUpCount(r);
        renewDate = new Date(getField(r, `checklist1.s_when_renew_method`));
        if (chosen_fp_method === `oral_combination_pill`) {
          isFound = true;
          nextVisitDate = addDays(renewDate, 28);
          priority_label = `oral.combination.pill`;
        } else if (chosen_fp_method === `injectible`) {
          isFound = true;
          nextVisitDate = addDays(renewDate, 90);
          priority_label = `injectible`;
        }
      }
    } else if (
      r.form === `pregnancy_family_planning` &&
      notNull(getField(r, `start_method`))
    ) {
      chosen_fp_method = getField(r, `chosen_fp_method`);
      const lastReport = getMostRecentReport(c.reports, [
        `fp_follow_up_renewal`,
      ]);
      const v0 = notNull(lastReport)
        ? new Date(lastReport.reported_date) < new Date(r.reported_date)
        : true;
      if (v0 === true) {
        const v1 = getField(r, `start_method.s_ren_start_date_fam_plan`);
        const v2 = getField(r, `start_method.s_scheduled_start_date`);
        if (notNull(v1) || notNull(v2)) {
          renewDate = notNull(v1) ? new Date(v1) : new Date(v2);
          isFound = true;
          if (chosen_fp_method === `oral_combination_pill`) {
            priority_label = `oral.combination.pill`;
            nextVisitDate = addDays(renewDate, 19);
          } else if (chosen_fp_method === `injectible`) {
            priority_label = `injectible`;
            nextVisitDate = addDays(renewDate, 90);
          }
        }
      }
    }
  }

  if (isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_count: followUpCount + 1,
      t_fp_method: chosen_fp_method,
    });
  }

  return {
    nextVisitDate: nextVisitDate,
    eventIndex: eventIndex,
    priority_label: priority_label,
    displayIf: isFound && content.length > 0,
    content: content.length > 0 ? content[0] : {},
  };
}

module.exports = {
  getPriority,
  getNewbornConfig,
  getPcimeTreatmentFollowUpConfig,
  getReferalFollowUpConfig,
  getPcimeTreatmentMalnutritionConfig,
  getPostnatalConfig,
  getPrenatalConfig,
  getFamilyPlanningFirstFollowupConfig,
  getFamilyPlanningFollowupConfig,
  // getVaccinationConfig,
  isFormArraySubmittedInWindow,
  getMostRecentReport,
  R_Date,
  isPregnant,
  isChildUnder5,
  getAgeInMonths,
  getAgeInDays,
  fackDate,
};
