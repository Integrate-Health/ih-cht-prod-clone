/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */

const {
  getMostRecentReport,
  isFormArraySubmittedInWindow,
  isExist,
  isTrue,
  pregnancyForms,
  isAlive,
  getField,
  getFollowUpCount,
  R_Date,
  isValidDate,
  addDays,
  isPregnancyForm,
  isPregnancyFollowUpForm,
  isNotDeleted,
  isPregnant,
  isChildUnder5,
  getAgeInMonths,
  getAgeInDays,
  isVaccinAgeLimit
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
//   return isExist(result) ? result.events : null;
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
  if (isExist(priorityData)) {
    return { level: isExist(priorityData.priority_level) ? priorityData.priority_level : ``, label: priorityData.priority_label };
  }
  return { level: ``, label: ``};
}


function canApplies(contact, report, formNames) {
  const isPerson = contact.contact && contact.contact.type === `person`;
  // const isPerson = contact.contact && contact.contact.type === `person` && user.parent.type !== `district_hospital`;
  var isForm = report.form === formNames;
  if (Array.isArray(formNames)) {
    isForm = formNames.includes(report.form);
  }
  
  return isTrue(isPerson) && isTrue(isForm) && isNotDeleted(contact, report) && isAlive(contact);
}


// vaccination Followup
function getVaccinationConfig(c){
  var content = [];
  var vaccinationArray = [];
  var priority_label = `vaccination.followup.1`;
  var source_id;
  var isEmpty = false;

  var vaccinal_status_BCG;
  var vaccinal_status_VPO_0;
  var vaccinal_status_DTC_B1;
  var vaccinal_status_VPO_1;
  var vaccinal_status_pneumo_1;
  var vaccinal_status_rota_1;
  var vaccinal_status_DTC_B2;
  var vaccinal_status_VPO_2;
  var vaccinal_status_pneumo_2;
  var vaccinal_status_rota_2;
  var vaccinal_status_DTC_B3;
  var vaccinal_status_VPO_3;
  var vaccinal_status_pneumo_3;
  var vaccinal_status_vpi;
  var vaccinal_status_RR1;
  var vaccinal_status_VAA;
  var vaccinal_status_vit_A;
  var vaccinal_status_RR2;
  var vaccinal_status_MEG;

  var reportedDate;
  var task_to_perform;
  var resheduleTask = false;

  const r = getMostRecentReport(c.reports, [`vaccination_followup`]);

  if(isExist(r)) {
    source_id = r._id;
    if(isExist(r.fields)) {
      if(isExist(getField(r, `s_today_task`))) {
        task_to_perform = getField(r, `s_today_task.s_task_to_perform`);
      }
      if(isExist(getField(r, `s_vaccinal_status`)) && task_to_perform !== `close_out`) {
        if (isExist(getField(r, `group_review`))) {
          resheduleTask = getField(r, `group_review.has_vaccin_not_done`) === `yes` && task_to_perform === `follow_up`;
          reportedDate = new Date(r.reported_date);
        }
        if(isExist(getField(r, `s_vaccinal_status.s_one_day`))){
          vaccinal_status_BCG = getField(r, `s_vaccinal_status.s_one_day.s_vaccinal_status_BCG`);
          vaccinal_status_VPO_0 = getField(r, `s_vaccinal_status.s_one_day.s_vaccinal_status_VPO_0`);
        }
        if(isExist(getField(r, `s_vaccinal_status.s_six_weeks`))){
          vaccinal_status_DTC_B1 = getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_DTC_B1`);
          vaccinal_status_VPO_1 = getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_VPO_1`);
          vaccinal_status_pneumo_1 = getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_pneumo_1`);
          vaccinal_status_rota_1 = getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_rota_1`);
        }
        if(isExist(getField(r, `s_vaccinal_status.s_ten_weeks`))){
          vaccinal_status_DTC_B2 = getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_DTC_B2`);
          vaccinal_status_VPO_2 = getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_VPO_2`);
          vaccinal_status_pneumo_2 = getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_pneumo_2`);
          vaccinal_status_rota_2 = getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_rota_2`);
        }
        if(isExist(getField(r, `s_vaccinal_status.s_forteen_weeks`))){
          vaccinal_status_DTC_B3 = getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_DTC_B3`);
          vaccinal_status_VPO_3 = getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_VPO_3`);
          vaccinal_status_pneumo_3 = getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_pneumo_3`);
          vaccinal_status_vpi = getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_vpi`);
        }
        if(isExist(getField(r, `s_vaccinal_status.s_nine_months`))){
          vaccinal_status_RR1 = getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_RR1`);
          vaccinal_status_VAA = getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_VAA`);
          vaccinal_status_vit_A = getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_vit_A`);
        }
        if(isExist(getField(r, `s_vaccinal_status.s_fifty_months`))){
          vaccinal_status_RR2 = getField(r, `s_vaccinal_status.s_fifty_months.s_vaccinal_status_RR2`);
          vaccinal_status_MEG = getField(r, `s_vaccinal_status.s_fifty_months.s_vaccinal_status_MEG`);
        }

        

        //###########################################################
        
        if (getAgeInDays(c) >= 0) {
          if(vaccinal_status_BCG !== `yes`) vaccinationArray.push(`vaccinal_status_BCG`);
          if(vaccinal_status_VPO_0 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_0`);
        }
        if (getAgeInDays(c) >= 42) {
          if(vaccinal_status_DTC_B1 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B1`);
          if(vaccinal_status_VPO_1 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_1`);
          if(vaccinal_status_pneumo_1 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_1`);
          if(vaccinal_status_rota_1 !== `yes`) vaccinationArray.push(`vaccinal_status_rota_1`);
        }
        if (getAgeInDays(c) >= 70) {
          if(vaccinal_status_DTC_B2 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B2`);
          if(vaccinal_status_VPO_2 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_2`);
          if(vaccinal_status_pneumo_2 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_2`);
          if(vaccinal_status_rota_2 !== `yes`) vaccinationArray.push(`vaccinal_status_rota_2`);
        }
        if (getAgeInDays(c) >= 98) {
          if(vaccinal_status_DTC_B3 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B3`);
          if(vaccinal_status_VPO_3 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_3`);
          if(vaccinal_status_pneumo_3 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_3`);
          if(vaccinal_status_vpi !== `yes`) vaccinationArray.push(`vaccinal_status_vpi`);
        }
        if (getAgeInMonths(c) >= 9) {
          if(vaccinal_status_RR1 !== `yes`) vaccinationArray.push(`vaccinal_status_RR1`);
          if(vaccinal_status_VAA !== `yes`) vaccinationArray.push(`vaccinal_status_VAA`);
          if(vaccinal_status_vit_A !== `yes`) vaccinationArray.push(`vaccinal_status_vit_A`);
        }
        if (getAgeInMonths(c) >= 15) {
          if(vaccinal_status_RR2 !== `yes`) vaccinationArray.push(`vaccinal_status_RR2`);
          if(vaccinal_status_MEG !== `yes`) vaccinationArray.push(`vaccinal_status_MEG`);
          
        }
      }
    }
  } else {
    isEmpty = true;
  }
  
  if (vaccinationArray.length > 0) {
    if(vaccinationArray.length === 1) {
      priority_label = `Suivi vaccinal ( ` + vaccinationArray[0].replace(`vaccinal_status_`, ``) + ` )`;
    } else {
      priority_label = `multiple.vaccination.followup`;
    }
  }

  content.push({
    source: `task`, 
    source_id: source_id, 
    contact: c.contact, 
    t_vaccinal_status_BCG: vaccinal_status_BCG,
    t_vaccinal_status_VPO_0: vaccinal_status_VPO_0,
    t_vaccinal_status_DTC_B1: vaccinal_status_DTC_B1,
    t_vaccinal_status_VPO_1: vaccinal_status_VPO_1,
    t_vaccinal_status_pneumo_1: vaccinal_status_pneumo_1,
    t_vaccinal_status_rota_1: vaccinal_status_rota_1,
    t_vaccinal_status_DTC_B2: vaccinal_status_DTC_B2,
    t_vaccinal_status_VPO_2: vaccinal_status_VPO_2,
    t_vaccinal_status_pneumo_2: vaccinal_status_pneumo_2,
    t_vaccinal_status_rota_2: vaccinal_status_rota_2,
    t_vaccinal_status_DTC_B3: vaccinal_status_DTC_B3,
    t_vaccinal_status_VPO_3: vaccinal_status_VPO_3,
    t_vaccinal_status_pneumo_3: vaccinal_status_pneumo_3,
    t_vaccinal_status_vpi: vaccinal_status_vpi,
    t_vaccinal_status_RR1: vaccinal_status_RR1,
    t_vaccinal_status_VAA: vaccinal_status_VAA,
    t_vaccinal_status_vit_A: vaccinal_status_vit_A,
    t_vaccinal_status_RR2: vaccinal_status_RR2,
    t_vaccinal_status_MEG: vaccinal_status_MEG,
    t_task_to_perform: task_to_perform
  });

  const resolvedIf = (vaccinationArray.length === 0 && !isEmpty) || task_to_perform === `close_out` || isVaccinAgeLimit(c);

  return {nextVisitDate: reportedDate, resheduleTask: resheduleTask, resolvedIf: resolvedIf, priority_label:priority_label, displayIf: vaccinationArray.length > 0, content:content[0]};    
}

// Newborn Followup
function getNewbornConfig(c, r){
  var content = [];
  var nextDate;
  var isFound = false;
  var priority_label = `newborn.followup`;
  var eventIndex;
  const follow_up_count = getFollowUpCount(r);
  const has_danger_signs = getField(r, `has_danger_signs`);


  if(getField(r, `close_out`) !== `true`) {
    var pnc1date = getField(r, `s_pnc.s_pnc_1_date`) ? new Date(getField(r, `s_pnc.s_pnc_1_date`)) : ``;
    var pnc2Date = getField(r, `s_pnc.s_pnc_2_date`) ? new Date(getField(r, `s_pnc.s_pnc_2_date)`)) : ``;
    
    if (follow_up_count === 1 && has_danger_signs === `true`){
      isFound = true;
      priority_label = `newborn.danger.signs.followup`;
      eventIndex = 0;
      nextDate = new Date(r.reported_date);
    } else if (follow_up_count === 2 && pnc1date !== ``) {
      isFound = true;
      priority_label = `newborn.followup.2`;
      eventIndex = 1;
      nextDate = pnc1date;
    } else if (follow_up_count === 3 && pnc2Date !== ``) {
      isFound = true;
      priority_label = `newborn.followup.3`;
      eventIndex = 2;
      nextDate = pnc2Date;
    }
  }

  if (isFound === true) {
    content.push({
      source: `task`, 
      source_id: r._id, 
      contact: c.contact, 
      t_has_danger_signs: has_danger_signs,
      t_follow_up_count: follow_up_count
    });
  }
  return {nextVisitDate: nextDate, eventIndex: eventIndex, priority_label: priority_label, displayIf: isFound && content.length > 0, content:content.length > 0 ? content[0] : {}};    
}

// Pcime Treatment Followup
function getPcimeTreatmentFollowUpConfig(c, r) {
  var content = [];
  const treatForDiarrhea = getField(r, `has_diarrhea`);
  const treatForFever = getField(r, `has_fever`);
  const treatForPneumonia = getField(r, `has_pneumonia`);
  const hasBeenReferred = getField(r, `s_have_you_refer_child`);
  const accompaniment = getField(r, `accompaniment`) ? getField(r, `accompaniment`) : false;
  var treats = [];
  if(treatForFever === `true` ) treats.push(`fever`);
  if(treatForDiarrhea === `true`) treats.push(`diarrhea`);
  if(treatForPneumonia === `true`) treats.push(`pneumonia`);
  const resp_rate = getField(r, `s_cough_cold`) && getField(r, `s_cough_cold.s_cough_cold_breathing_freq`) ? getField(r, `s_cough_cold.s_cough_cold_breathing_freq`) : ``;
  
  var oldTemperature = ``;
  var oldWeight = ``;
  var childBrachialPerimeter = ``;

  if(isExist(getField(r, `s_constant`))) {
    if (isExist(getField(r, `s_constant.s_constant_child_temperature`))) {
      oldTemperature = getField(r, `s_constant.s_constant_child_temperature`);
    }
    if (isExist(getField(r, `s_constant.s_constant_child_weight`))) {
      oldWeight = getField(r, `s_constant.s_constant_child_weight`);
    }
    if (isExist(getField(r, `s_constant.s_constant_child_brachial_perimeter`))) {
      childBrachialPerimeter = getField(r, `s_constant.s_constant_child_brachial_perimeter`);
    }

  }
  
  var follow_up_type = getField(r, `followup_type`);
  var newest_pcime_c_followup_report = getMostRecentReport(c.reports, [`pcime_c_followup`]);
  var canTriggerReferralFollowup = newest_pcime_c_followup_report && newest_pcime_c_followup_report.fields && newest_pcime_c_followup_report._id === r._id;
  var condition_worsen = getField(r, `disease_progress.s_condition_worsen`);
  var state_improved = getField(r, `disease_progress.s_state_improved`);
  var referralConditions = ((getField(r, `has_danger_signs`) === `true` || hasBeenReferred === `yes`) && canTriggerReferralFollowup === true );
  const has_been_referred = accompaniment === `true` || hasBeenReferred === `yes`;
  const has_malnutrition = getField(r, `has_malnutrition`) === `true`;
  const newestMalnutrition = getMostRecentReport(c.reports, [`malnutrition_followup`]);
  const was_referred_for_malnutrition = newestMalnutrition !== null && getField(newestMalnutrition, `referral`) === `true` || getField(r, `referral`) === `true`;

  var isFound = false;
  var eventIndex;
  var priority_label = `pcime.followup`;
  const follow_up_count = getFollowUpCount(r);
  const reportedDate = new Date(r.reported_date);
  const malaria_fever = getField(r, `fever_with_malaria`);
      
  if (r.form === `pcime_c_asc` || r.form === `pcime_c_followup`) {
    if (follow_up_count === 1 && r.form === `pcime_c_asc`) eventIndex = 0;
    if (follow_up_count === 2 && r.form === `pcime_c_followup`) eventIndex = 1;
    if (eventIndex === 0 || eventIndex === 1) {
      if(treats.length > 0) {
        isFound = true;
        follow_up_type = treats.length === 1 ? `${treats[0]}` : `multiple`;
        priority_label = treats.length === 1 ? `treatment.${treats[0]}` :`treatment.multiple`;
        var tdrGiven;
        if (r.form === `pcime_c_asc`) {
          if (isExist(getField(r, `s_fever_child_TDR`))) {
            if (isExist(getField(r, `s_fever_child_TDR.s_fever_child_TDR_result`))) {
              tdrGiven = getField(r, `s_fever_child_TDR.s_fever_child_TDR_result`);
              // return tdrGiven === `positive` || tdrGiven === `negative`;
            }
          }
        }

        if(priority_label === `treatment.fever` && (tdrGiven === `positive` || malaria_fever === `true`)){
          priority_label = `treatment.malaria.fever`;
        }

        if (r.form === `pcime_c_followup`) {
          if(r.fields && getField(r, `danger_signs.s_continue_followup`) === `yes`) {
            if (condition_worsen === `no` && state_improved === `no` && follow_up_count === 2 && referralConditions === false) {
              oldTemperature = getField(r, `temperature.s_temperature`);
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
      t_follow_up_type: follow_up_type, 
      t_follow_up_count: follow_up_count, 
      t_treat_for_diarrhea: treatForDiarrhea, 
      t_treat_for_fever: treatForFever, 
      t_treat_for_pneumonia: treatForPneumonia, 
      t_has_been_referred: has_been_referred === true ? `yes` : `no`, 
      t_has_been_malnutrition_referred: was_referred_for_malnutrition === true ? `yes` : `no`, 
      t_has_malnutrition: has_malnutrition === true ? `yes` : `no`, 
      t_non_malaria_fever: getField(r, `non_malaria_fever`), 
      t_malaria_fever: malaria_fever, 
      t_resp_rate: resp_rate, 
      t_last_visit_temperature: oldTemperature,
      t_last_visit_weight: oldWeight,
      t_last_visit_child_brachial_perimeter: childBrachialPerimeter
    });
  }

  return {nextVisitDate: reportedDate, eventIndex: eventIndex, priority_label: priority_label, displayIf: isFound && content.length > 0, content:content.length > 0 ? content[0] : {}};    
}

// Referal Followup
function getReferalFollowUpConfig(c, r) {
  var content = [], treats = [], oldTemperature = ``, oldWeight = ``, childBrachialPerimeter = ``;
  var isFound = false, eventIndex = 1, priority_label = `pcime.referal`, reportedDate = fackDate;
  const hasBeenReferred = getField(r, `s_have_you_refer_child`);
  const accompaniment = getField(r, `accompaniment`) ? getField(r, `accompaniment`) : false;
  if(getField(r, `has_fever`) === `true` ) treats.push(`fever`);
  if(getField(r, `has_diarrhea`) === `true`) treats.push(`diarrhea`);
  if(getField(r, `has_pneumonia`) === `true`) treats.push(`pneumonia`);
  if(isExist(getField(r, `s_constant`))) {
    if (isExist(getField(r, `s_constant.s_constant_child_temperature`))) oldTemperature = getField(r, `s_constant.s_constant_child_temperature`);
    if (isExist(getField(r, `s_constant.s_constant_child_weight`))) oldWeight = getField(r, `s_constant.s_constant_child_weight`);
    if (isExist(getField(r, `s_constant.s_constant_child_brachial_perimeter`))) childBrachialPerimeter = getField(r, `s_constant.s_constant_child_brachial_perimeter`);
  }
  const newest_pcime_c_followup_report = getMostRecentReport(c.reports, [`pcime_c_followup`]);
  const canTriggerReferralFollowup = newest_pcime_c_followup_report && newest_pcime_c_followup_report.fields && newest_pcime_c_followup_report._id === r._id;
  const condition_worsen = getField(r, `disease_progress.s_condition_worsen`);
  const state_improved = getField(r, `disease_progress.s_state_improved`);
  const referralConditions = ((getField(r, `has_danger_signs`) === `true` || hasBeenReferred === `yes`) && canTriggerReferralFollowup === true );
  const newestMalnutrition = getMostRecentReport(c.reports, [`malnutrition_followup`]);
  const was_referred_for_malnutrition = newestMalnutrition !== null && getField(newestMalnutrition, `referral`) === `true` || getField(r, `referral`) === `true`;
  const def1 = r.form === `pcime_c_asc` && treats.length === 0 && (accompaniment === `true` || hasBeenReferred === `yes` || was_referred_for_malnutrition === true);
  const def2 = r.form === `pcime_c_followup` && treats.length === 0 && (referralConditions === true || (condition_worsen ===`yes` || (condition_worsen===`no` && state_improved===`no` && followupCount === 2)) ||  state_improved===`no`);
  const def3 = r.form === `pcime_c_referral` && getField(r, `referal`) === `true`;
  const def4 = r.form === `malnutrition_followup` && getField(r, `referral`) === `true`;
  
  if(def1 || def2 || def3 || def4) {
    isFound = true;
    eventIndex = 0;
    reportedDate = new Date(r.reported_date);
    content.push({
      source: `task`, 
      source_id: r._id, 
      contact: c.contact, 
      t_follow_up_type: `referral`, 
      t_follow_up_count: getFollowUpCount(r),
      t_last_weight: oldWeight,
      t_last_pb: childBrachialPerimeter,
      t_last_temperature: oldTemperature 
    });
  }

  return {nextVisitDate: reportedDate, eventIndex: eventIndex, priority_label: priority_label, displayIf: isFound && content.length > 0, content:content.length > 0 ? content[0] : {}};    
}

// Pcime Malnutrition Followup
function getPcimeTreatmentMalnutritionConfig(c, r){
  var isFound = false;
  var content = [];
  var priority_label = `malnutrition.followup.1`;
  const reportedDate = new Date(r.reported_date);
  var eventIndex = getFollowUpCount(r) - 1;
  var atpe_given_quantity = 0;

  if (r.form === `pcime_c_asc` && getField(r, `has_malnutrition`) === `true` && eventIndex === 0) {
    isFound = true;
    if (isExist(getField(r, `group_review`))) {
      if (isExist(getField(r, `group_review.r_nutritional_treatment`))) {
        const dt1 = getField(r, `group_review.r_nutritional_treatment.s_atpe_given_quantity`);
        if (isExist(dt1)) {
          atpe_given_quantity = dt1;
        }
      }
    }
  } else if (r.form === `malnutrition_followup` && eventIndex > 0 && eventIndex < 7) {
    isFound = true;
    priority_label = `malnutrition.followup.${eventIndex + 1}`;
    if (isExist(getField(r, `s_atpe_quantity`))) {
      const dt2 = getField(r, `s_atpe_quantity.s_atpe_given_quantity`);
      if (isExist(dt2)) {
        atpe_given_quantity = dt2;
      }
    }

  }
    
  if (isFound) {
    content.push({
      source: `task`, 
      source_id: r._id, 
      contact: c.contact, 
      t_follow_up_type: `malnutrition`, 
      t_follow_up_count: getFollowUpCount(r), 
      t_weight_from_assessment: getField(r, `s_constant.s_constant_child_weight`), 
      t_pb_from_assessment: getField(r, `s_constant.s_constant_child_brachial_perimeter`), 
      t_assessment_date: isValidDate(reportedDate) ? reportedDate.toISOString() : ``,
      t_atpe_given_quantity: atpe_given_quantity
    });
  }

  return {nextVisitDate: reportedDate, eventIndex: eventIndex, priority_label: priority_label, displayIf: isFound && content.length > 0, content:content.length > 0 ? content[0] : {}};    
}

// Postnatal Followup
function getPostnatalConfig(c, r) {
  var isFound = false;
  var content = [];
  var nextPNCVisit = fackDate;
  var followUpCount = parseInt(getField(r, `follow_up_count`), 10);
  var eventIndex;
  var priority_label;
  var child_alive = 0;
  var close_out;
  
  if(!isPregnant(c, c.reports, r) && isExist(r.fields)) {
    eventIndex = 0;
    if (r.form === `delivery` && getField(r, `has_delivered`) === `true` && isExist(getField(r, `s_delivery`))) {
      isFound = true;
      priority_label = `postnatal.followup.1`;
      var deliveryDate = new Date(getField(r, `s_delivery.s_delivery_date`));
      var delivery_dif = parseInt(getField(r, `s_delivery.c_delivery_dif`), 10);

      if (isExist(getField(r, `s_delivery.s_child_alive_rest`))) {
        child_alive = getField(r, `s_delivery.s_child_alive_rest`);
      }


      if (delivery_dif >= 7) {
        eventIndex = 1;
        if(getField(r, `s_delivery.s_pnc_today`) === `no` ){
          nextPNCVisit = new Date(getField(r, `s_delivery.s_next_pnc`));
        }else if (getField(r, `s_delivery.s_pnc_today`) === `yes`){
          nextPNCVisit = new Date(r.reported_date);
        }
      } else {
        nextPNCVisit = deliveryDate;
      }
    } else if(r.form === `postnatal_followup` && followUpCount > 0 && followUpCount < 3) {
      close_out = getField(r, `close_out`);
      if (close_out !== `true`) {
        isFound = true;
        priority_label = `postnatal.followup.${followUpCount + 1}`;
        if (isExist(getField(r, `s_child_alive`))) {
          child_alive = getField(r, `s_child_alive`);
        }
        if (isExist(getField(r, `usp_follow_up_visit`))) {
          if (isExist(getField(r, `usp_follow_up_visit.date_next_visit_mother_newborn`))) {
            nextPNCVisit = new Date(getField(r, `usp_follow_up_visit.date_next_visit_mother_newborn`));
          }
        } else {
          nextPNCVisit = new Date();
        }
      }
    } 
  }

  if(isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_count: getFollowUpCount(r), 
      t_delivery_date: isValidDate(deliveryDate) ? deliveryDate.toISOString().substring(0, 10) : ``,
      t_child_alive: child_alive,
      t_close_out: close_out
    });
  }

  return {nextVisitDate: nextPNCVisit, eventIndex: eventIndex, priority_label: priority_label, displayIf: isFound && content.length > 0, content:content.length > 0 ? content[0] : {}};    
} 

// Prenatal Followup
function  getPrenatalConfig(c, r){
  var isFound = false;
  var content = [];
  var nextVisitDate = fackDate;
  var t_anc_visit;
  var t_follow_up_type;
  var priority_label = `treatment.prenatal`;
  var eventIndex;

  if(isPregnant(c, c.reports, r) && isExist(r.fields)) {
    eventIndex = 0;
    
    if (isPregnancyFollowUpForm(r) && isExist(getField(r, `reschedule_task`))) {
      if (getField(r, `reschedule_task.is_woman_available`) === `no`) {
        if (getField(r, `reschedule_task.s_date_to_reschedule`) !== ``) {
          isFound = true;
          eventIndex = 1;
          nextVisitDate = new Date(getField(r, `reschedule_task.s_date_to_reschedule`));
        }
      }

      if (getField(r, `reschedule_task.is_woman_available`) === `yes` && isExist(getField(r, `s_today_task`))) {
        if (getField(r, `s_today_task.s_task_to_perform`) !== `close_out`) {
          
          if(isExist(getField(r, `s_vad_1`))) {
            isFound = true;
            nextVisitDate = isExist(getField(r, `s_vad_1.s_anc_next_anc`)) ? new Date(getField(r, `s_vad_1.s_anc_next_anc`)) : new Date(getField(r, `s_vad_1.s_anc_1_date`));
          } else if(isExist(getField(r, `s_vad_2`))) {
            if (isExist(getField(r, `s_vad_2.s_anc_2_date`))) {
              isFound = true;
              nextVisitDate = new Date(getField(r, `s_vad_2.s_anc_2_date`));
            }
          } else if(isExist(getField(r, `s_vad_3`))) {
            if (isExist(getField(r, `s_vad_3.s_anc_3_date`))) {
              isFound = true;
              nextVisitDate = new Date(getField(r, `s_vad_3.s_anc_3_date`));
            }
          } else if(isExist(getField(r, `s_vad_4`))){
            if (isExist(getField(r, `s_vad_4.s_anc_4_date`))) {
              isFound = true;
              nextVisitDate = new Date(getField(r, `s_vad_4.s_anc_4_date`));
            }
          }
        }
      }

    } else  if (isPregnancyForm(r)) {
      var followupSelectedDate = isExist(getField(r, `next_anc_visit_follow_up_date`)) ? new Date(getField(r, `next_anc_visit_follow_up_date`)) : new Date(getField(r, `next_visit`));
      var urineTest, whyNotUrineTest, first_prenatal_followup_today;

      if (isExist(getField(r, `s_reg_pregnancy_screen`))) {
        if (isExist(getField(r, `s_reg_pregnancy_screen.s_reg_urine_result`))) {
          urineTest = getField(r, `s_reg_pregnancy_screen.s_reg_urine_result`);
        } 
        if (isExist(getField(r, `s_reg_pregnancy_screen.s_reg_why_urine_test_not_done`))) {
          whyNotUrineTest = getField(r, `s_reg_pregnancy_screen.s_reg_why_urine_test_not_done`);
        }
      }

      if (isExist(getField(r, `s_reg_pregnancy`))) {
        if (isExist(getField(r, `s_reg_pregnancy.first_prenatal_followup_today`))) {
          first_prenatal_followup_today = getField(r, `s_reg_pregnancy.first_prenatal_followup_today`);
        }
      }

      if(isExist(first_prenatal_followup_today) && isExist(getField(r, `s_vad_1`))) {
        isFound = true;
        nextVisitDate = isExist(getField(r, `s_vad_1.s_anc_next_anc`)) ? new Date(getField(r, `s_vad_1.s_anc_next_anc`)) : new Date(getField(r, `s_vad_1.s_anc_1_date`));
        t_anc_visit = getField(r, `s_vad_1.s_anc_1_visit`) === `yes` ? getField(r, `s_vad_1.s_anc_number`) + 1 : 1;
        t_follow_up_type = `prenatal-followup`;
    
      } else if ((urineTest === `positive` || whyNotUrineTest === `already_pregnant`) && isExist(followupSelectedDate) && followupSelectedDate !== `Invalid Date`) {
        isFound = true;
        eventIndex = 2;
        nextVisitDate = followupSelectedDate;
      } 
    } 
  } 

  if(isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_count: getFollowUpCount(r),
      t_follow_up_type: t_follow_up_type,
      t_anc_visit: t_anc_visit
    });
  }

  return {nextVisitDate: nextVisitDate, eventIndex: eventIndex, priority_label: priority_label, displayIf: isFound && content.length > 0, content:content.length > 0 ? content[0] : {}};    
}

function getFamilyPlanningFirstFollowupConfig(c, r) {
  var isFound = false;
  var content = [];
  var dateOfFpStart = fackDate;
  const reportedDate = new Date(r.reported_date);
  var chosen_fp_method;
  var followUpCount = 0;
  var priority_label;
  var eventIndex;
  
  if (!isPregnant(c, c.reports, r) && isExist(r.fields)) {
    dateOfFpStart = new Date(r.reported_date);

    if (isPregnancyForm(r)) {
      var newestFpFollowupRenewalReport = getMostRecentReport(c.reports, [`fp_follow_up_renewal`]);
      var newestFpFollowupDangerSignCheck = getMostRecentReport(c.reports, [`fp_followup_danger_sign_check`]);
      var newestPregnancyAndFPReport = getMostRecentReport(c.reports, pregnancyForms);
      var latestPregnancyAndFPTimestamp = isExist(newestPregnancyAndFPReport) ? new Date(newestPregnancyAndFPReport.reported_date) : null;
      var newestFpFollowupRenewalTimestamp = isExist(newestFpFollowupRenewalReport) ? new Date(newestFpFollowupRenewalReport.reported_date) : null;
      var newestFpDangerSignsCheckTimestamp = isExist(newestFpFollowupDangerSignCheck) ? new Date(newestFpFollowupDangerSignCheck.reported_date) : null;
      var FpScheduleGenerate = true;
      chosen_fp_method = getField(r, `chosen_fp_method`);

      if(newestFpFollowupDangerSignCheck) {
        if (isExist(newestFpFollowupDangerSignCheck.fields)) {
          if (isExist(newestFpFollowupDangerSignCheck.fields.s_side_effects)) {
            if (newestFpFollowupDangerSignCheck.fields.s_side_effects.s_missing_pills === `major` && newestFpFollowupDangerSignCheck.fields.s_side_effects.s_pregnancy_result === `negative`) {
              chosen_fp_method = `oral_combination_pill`;
            }
          }
        }
      } else if(isExist(getField(r, `prev_fp_method`))){
        if(isExist(getField(r, `s_fam_plan_screen`))){
          if(getField(r, `s_fam_plan_screen.s_want_other_method`) === `no`){
            if (isExist(getField(r, `s_fam_plan_screen.s_previous_method`))) {
              if (isExist(getField(r, `s_fam_plan_screen.s_previous_method.s_ren_prev_method`))) {
                chosen_fp_method = getField(r, `s_fam_plan_screen.s_previous_method.s_ren_prev_method`);
              }
            }
          }
        }
      }

      if (isExist(newestFpDangerSignsCheckTimestamp) && isExist(latestPregnancyAndFPTimestamp)) {
        if (newestFpDangerSignsCheckTimestamp > latestPregnancyAndFPTimestamp) {
          if (isExist(newestFpFollowupDangerSignCheck)) {
            if (isExist(newestFpFollowupDangerSignCheck.fields)) {
              if (isExist(newestFpFollowupDangerSignCheck.fields.continue_with_fp)) {
                if (newestFpFollowupDangerSignCheck.fields.continue_with_fp === `no`) {
                  FpScheduleGenerate = false;
                }
              }
            }
          }
        }
      }

      if (isExist(newestFpFollowupRenewalTimestamp)) {
        if (newestFpFollowupRenewalTimestamp > reportedDate) {
          if (isExist(newestFpFollowupRenewalReport)) {
            if (isExist(newestFpFollowupRenewalReport.fields)) {
              if (isExist(newestFpFollowupRenewalReport.fields.checklist1)) {
                if (isExist(newestFpFollowupRenewalReport.fields.checklist1.s_renew_method)) {
                  if(newestFpFollowupRenewalReport.fields.checklist1.s_renew_method === `no`) {
                    FpScheduleGenerate = false;
                  }
                }
              }
            }
          }
        }
      } 
      
      if (isExist(newestFpFollowupRenewalTimestamp) && isExist(latestPregnancyAndFPTimestamp)) {
        if (newestFpFollowupRenewalTimestamp > latestPregnancyAndFPTimestamp) {
          if (isExist(newestFpFollowupRenewalReport)) {
            if (isExist(newestFpFollowupRenewalReport.fields)) {
              if (isExist(newestFpFollowupRenewalReport.fields.stop_fp)) {
                if (newestFpFollowupRenewalReport.fields.stop_fp === `yes`) {
                  FpScheduleGenerate = false;
                }
              }
            }
          }
        }
      }        
      
      if (isExist(newestPregnancyAndFPReport) && FpScheduleGenerate === true){
        if (r.reported_date === newestPregnancyAndFPReport.reported_date) {
          if(isExist(getField(r, `start_method`))) {
            if (isExist(getField(r, `start_method.s_ren_start_date_fam_plan`))) {
              dateOfFpStart = new Date(getField(r, `start_method.s_ren_start_date_fam_plan`));
            }
            if (isExist(getField(r, `start_method.s_scheduled_start_date`))) {
              dateOfFpStart = new Date(getField(r, `start_method.s_scheduled_start_date`));
            }
          }

          if (chosen_fp_method === `oral_combination_pill`) {
            isFound = true;
            priority_label = `oral.combination.pill`;
            eventIndex = 0;
          } else if (chosen_fp_method === `injectible`) {
            isFound = true;
            priority_label = `injectible`;
            eventIndex = 1;
          }
        }
      } 
    } else if(r.form === `fp_followup_danger_sign_check` && isExist(getField(r, `fp_method`)) && isExist(getField(r, `s_side_effects`))) {
      if (getField(r, `s_side_effects.s_woman_new_packet`) ===`yes`) {
        dateOfFpStart = new Date(r.reported_date);
        chosen_fp_method = getField(r, `fp_method`);

        if (chosen_fp_method === `oral_combination_pill`) {
          isFound = true;
          priority_label = `oral.combination.pill`;
          eventIndex = 0;
        } else if (chosen_fp_method === `injectible`) {
            isFound = true;
            priority_label = `injectible`;
            eventIndex = 1;
        }
      }
    } else if(r.form === `fp_follow_up_renewal` && isExist(getField(r, `fp_method`)) && getField(r, `stop_fp`) === `no` && isExist(getField(r, `checklist1`)) && isExist(getField(r, `s_side_effects`))) {
      if(getField(r, `checklist1.s_renew_method`) === `yes` && getField(r, `s_side_effects.s_woman_new_packet`) ===`yes`) {
        followUpCount = getFollowUpCount(r);
        dateOfFpStart = new Date(r.reported_date);
        chosen_fp_method = getField(r, `fp_method`);
  
        if (chosen_fp_method === `oral_combination_pill`) {
          isFound = true;
          priority_label = `oral.combination.pill`;
          eventIndex = 0;
        } else if (chosen_fp_method === `injectible`) {
          isFound = true;
          priority_label = `injectible`;
          eventIndex = 1;
        }
      }
    }
  }

    if (isFound) {
        content.push({
        source: `task`,
        source_id: r._id,
        contact: c.contact,
        t_follow_up_count: followUpCount,
        t_fp_method: chosen_fp_method
        });
    }

  return {eventIndex:eventIndex, nextVisitDate: dateOfFpStart, followUpCount:followUpCount, priority_label: priority_label, displayIf: isFound && content.length > 0, content:content.length > 0 ? content[0] : {}};
}

function getFamilyPlanningFollowupConfig(c, r) {
  var isFound = false;
  var content = [];
  var followUpCount = 1;
  var priority_label;
  var eventIndex;
  var renewDate = new Date(r.reported_date);
  var chosen_fp_method = getField(r, `fp_method`);

 if (!isPregnant(c, c.reports, r) && isExist(r.fields)) {
  if(r.form === `fp_follow_up_renewal`){
    if ((isExist(getField(r, `fp_method`)) && getField(r, `stop_fp`) === `no` && getField(r, `checklist1.s_renew_method`) === `yes`) === false) {
      followUpCount = getFollowUpCount(r);
      var date = getField(r, `checklist1.when_renew_method`);
      var splits = date.split(`/`);
      date = splits[1] +`/` + splits[0] + `/` + splits[2];
      renewDate = new Date(date);
      if (chosen_fp_method === `oral_combination_pill`) {
        isFound = true;
        eventIndex = 1;
        priority_label = `oral.combination.pill`;
      }
      if (chosen_fp_method === `injectible`) {
        isFound = true;
        eventIndex = 3;
        priority_label = `injectible`;
      }
    }
  } else if (isPregnancyForm(r)){
    var newestFpFollowupRenewalReport = getMostRecentReport(c.reports, [`fp_follow_up_renewal`]);
    var newestFpFollowupRenewalTimestamp = isExist(newestFpFollowupRenewalReport) ? new Date(newestFpFollowupRenewalReport.reported_date) : null;
    var rdate = new Date(r.reported_date);

    if (newestFpFollowupRenewalTimestamp === null || newestFpFollowupRenewalTimestamp !==null && newestFpFollowupRenewalTimestamp < rdate) {
      
    if(isExist(getField(r, `start_method`))) {
      if (isExist(getField(r, `start_method.s_ren_start_date_fam_plan`)) || isExist(getField(r, `start_method.s_scheduled_start_date`))) {
        if (isExist(getField(r, `start_method.s_ren_start_date_fam_plan`))) {
          renewDate = new Date(getField(r, `start_method.s_ren_start_date_fam_plan`));
        }
        if (isExist(getField(r, `start_method.s_scheduled_start_date`))) {
          renewDate = new Date(getField(r, `start_method.s_scheduled_start_date`));
        }

        if (chosen_fp_method === `oral_combination_pill`) {
          isFound = true;
          priority_label = `oral.combination.pill`;
          eventIndex = 0;
        } else if (chosen_fp_method === `injectible`) {
          isFound = true;
          priority_label = `injectible`;
          eventIndex = 2;
        }
      }
    }

  }
  } 
  
  
  // else if(r.form === `fp_followup_danger_sign_check` && isExist(getField(r, `fp_method`)) && getField(r, `s_side_effects.s_woman_new_packet`) !==`yes`){
  //   if (chosen_fp_method === `oral_combination_pill`) {
  //     isFound = true;
  //     eventIndex = 0;
  //     priority_label = `oral.combination.pill`;
  //   }

  //   if (chosen_fp_method === `injectible`) {
  //     isFound = true;
  //     eventIndex = 2;
  //     priority_label = `injectible`;
  //   }
  // }
}

  if (isFound) {
    content.push({
      source: `task`,
      source_id: r._id,
      contact: c.contact,
      t_follow_up_count: followUpCount,
      t_fp_method: chosen_fp_method
    });
  }

  return {nextVisitDate: renewDate, eventIndex: eventIndex, priority_label: priority_label, displayIf: isFound && content.length > 0, content:content.length > 0 ? content[0] : {}};
}






module.exports = {
  getPriority,
  canApplies, 
  getNewbornConfig,
  getPcimeTreatmentFollowUpConfig,
  getReferalFollowUpConfig,
  getPcimeTreatmentMalnutritionConfig,
  getPostnatalConfig,
  getPrenatalConfig,
  getFamilyPlanningFirstFollowupConfig,
  getFamilyPlanningFollowupConfig,
  getVaccinationConfig,
  isFormArraySubmittedInWindow,
  getMostRecentReport,
  R_Date,
  isPregnant,
  addDays,
  isChildUnder5,
  getAgeInMonths,
  getAgeInDays,
  fackDate
};
