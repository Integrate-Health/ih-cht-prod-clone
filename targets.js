/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */
const {
  isDeathMonthly,
  hasAllVisitActionsMonthly,
  isConsultationAndFollowupMonthly,
  isConsultationMonthly,
  isFollowupMonthly,
  isPcimeReferalFollowupMonthly,
  toDateString,
  isBetween21and20,
  isTotalPcimeCMonthly,
  isTotalPcimeCFollowupMonthly,
  isPregnantMonthly,
  isPregnancyUrineTestMonthly,
  isFeverTdrGivenMonthly,
  isFormBetween21and20,
  isPregnant,
  isActiveFamilyPlanning,
  isActiveOralCombinationPillFamilyPlanning,
  isActiveInjectibleFamilyPlanning,
  isAlive
} = require(`./targets-extras`);

const {getChildPatologie, getChildPatologiePromptitude } = require(`./utils`);
// const {getChildPatologie, getChildPatologiePromptitude, getDateInFormat, startEnd21and20Date } = require(`./utils`);

// const periode = startEnd21and20Date('fr');
// const label = `${periode.start_date} au ${periode.end_date}`;
const label = `21 au 20`;
 

module.exports = [

  {
    id: `deaths-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.death_monthly`,
    // subtitle_translation_key: `targets.death_monthly.subtitle`,
    subtitle_translation_key: label,
    // percentage_count_translation_key: ``,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    // appliesToType: [`person`],
    appliesIf: function (c, r) {
      return isDeathMonthly(c, r);
    },
    dhis: {
      dataSet: `VMuFODsyWAO`,
      dataElement: `kB0ZBFisD0e`,
    },
    aggregate:true
  },  

  {
    id: `consultation-followup-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.consultation_and_followup_monthly`,
    // subtitle_translation_key: `targets.consultation_and_followup_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isConsultationAndFollowupMonthly(r);
    },
    aggregate:true
  },

  // {
  //   id: `consultation-monthly`,
  //   type: `count`,
  //   icon: `clinic-lg`,
  //   translation_key: `targets.consultation_monthly`,
  //   // subtitle_translation_key: `targets.consultation_monthly.subtitle`,
  //   subtitle_translation_key: label,
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `reports`,
  //   appliesIf: function (c, r) {
  //     return isConsultationMonthly(r);
  //   },
  //   aggregate:true
  // },

  // {
  //   id: `followup-monthly`,
  //   type: `count`,
  //   icon: `clinic-lg`,
  //   translation_key: `targets.followup_monthly`,
  //   // subtitle_translation_key: `targets.followup_monthly.subtitle`,
  //   subtitle_translation_key: label,
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `reports`,
  //   appliesIf: function (c, r) {
  //     return isFollowupMonthly(r);
  //   },
  //   aggregate:true
  // },

  {
    id: `active-research-monthly`,
    type: `count`,
    icon: `home-visit`,
    translation_key: `targets.active_research_monthly`,
    // subtitle_translation_key: `targets.active_research_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isFormBetween21and20(r, `home_visit`);
    },
    aggregate:true
  },

  {
    id: `home-actions-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.all_visit_actions_monthly`,
    // subtitle_translation_key: `targets.all_visit_actions_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: 180,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && hasAllVisitActionsMonthly(r);
    },
    aggregate:true
  },

  {
    id: `child-paludisme-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.child_paludisme_monthly`,
    // subtitle_translation_key: `targets.child_paludisme_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && getChildPatologie(r, `paludisme`);
    },
    aggregate:true
  },

  {
    id: `child-toux_rhume-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.child_toux_rhume_monthly`,
    // subtitle_translation_key: `targets.child_toux_rhume_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && getChildPatologie(r, `toux_rhume`);
    },
    aggregate:true
  },

  {
    id: `child-pneumonia-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.child_pneumonia_monthly`,
    // subtitle_translation_key: `targets.child_pneumonia_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && getChildPatologie(r, `pneumonia`);
    },
    aggregate:true
  },

  {
    id: `child-diarrhea-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.child_diarrhea_monthly`,
    // subtitle_translation_key: `targets.child_diarrhea_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && getChildPatologie(r, `diarrhea`);
    },
    aggregate:true
  },

  {
    id: `child-malnutrition-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.child_malnutrition_monthly`,
    // subtitle_translation_key: `targets.child_malnutrition_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && getChildPatologie(r, `malnutrition`);
    },
    aggregate:true
  },


  
// promptitude ..........

// {
//   id: `child-promptitude-24-paludisme-monthly`,
//   type: `count`,
//   icon: `clinic-lg`,
//   translation_key: `targets.child_promptitude_24_paludisme_monthly`,
//   // subtitle_translation_key: `targets.child_promptitude_24_paludisme_monthly.subtitle`,
//   subtitle_translation_key: label,
//   // context: `user.role == 'chw'`,
//   goal: -1,
//   appliesTo: `reports`,
//   appliesIf: function (c, r) {
//     return isAlive(c) && getChildPatologiePromptitude(r, `paludisme`, '24h');
//   },
//   aggregate:true
// },
// {
//   id: `child-promptitude-24-toux_rhume-monthly`,
//   type: `count`,
//   icon: `clinic-lg`,
//   translation_key: `targets.child_promptitude_24_toux_rhume_monthly`,
//   // subtitle_translation_key: `targets.child_promptitude_24_toux_rhume_monthly.subtitle`,
//   subtitle_translation_key: label,
//   // context: `user.role == 'chw'`,
//   goal: -1,
//   appliesTo: `reports`,
//   appliesIf: function (c, r) {
//     return isAlive(c) && getChildPatologiePromptitude(r, `toux_rhume`, '24h');
//   },
//   aggregate:true
// },
// {
//   id: `child-promptitude-24-pneumonia-monthly`,
//   type: `count`,
//   icon: `clinic-lg`,
//   translation_key: `targets.child_promptitude_24_pneumonia_monthly`,
//   // subtitle_translation_key: `targets.child_promptitude_24_pneumonia_monthly.subtitle`,
//   subtitle_translation_key: label,
//   // context: `user.role == 'chw'`,
//   goal: -1,
//   appliesTo: `reports`,
//   appliesIf: function (c, r) {
//     return isAlive(c) && getChildPatologiePromptitude(r, `pneumonia`, '24h');
//   },
//   aggregate:true
// },
// {
//   id: `child-promptitude-24-diarrhea-monthly`,
//   type: `count`,
//   icon: `clinic-lg`,
//   translation_key: `targets.child_promptitude_24_diarrhea_monthly`,
//   // subtitle_translation_key: `targets.child_promptitude_24_diarrhea_monthly.subtitle`,
//   subtitle_translation_key: label,
//   // context: `user.role == 'chw'`,
//   goal: -1,
//   appliesTo: `reports`,
//   appliesIf: function (c, r) {
//     return isAlive(c) && getChildPatologiePromptitude(r, `diarrhea`, '24h');
//   },
//   aggregate:true
// },
// {
//   id: `child-promptitude-24-malnutrition-monthly`,
//   type: `count`,
//   icon: `clinic-lg`,
//   translation_key: `targets.child_promptitude_24_malnutrition_monthly`,
//   // subtitle_translation_key: `targets.child_promptitude_24_malnutrition_monthly.subtitle`,
//   subtitle_translation_key: label,
//   // context: `user.role == 'chw'`,
//   goal: -1,
//   appliesTo: `reports`,
//   appliesIf: function (c, r) {
//     return isAlive(c) && getChildPatologiePromptitude(r, `malnutrition`, '24h');
//   },
//   aggregate:true
// },



  {
    id: `child-tdr-given-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.child_tdr_given_monthly`,
    // subtitle_translation_key: `targets.child_tdr_given_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isFeverTdrGivenMonthly(r);
    },
    aggregate:true
  },

  {
    id: `positive-tdr-given-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.child_positive_tdr_given_monthly`,
    // subtitle_translation_key: `targets.child_positive_tdr_given_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isFeverTdrGivenMonthly(r, `positive`);
    },
    aggregate:true
  },

  // {
  //   id: `negative-tdr-given-monthly`,
  //   type: `count`,
  //   icon: `clinic-lg`,
  //   translation_key: `targets.child_negative_tdr_given_monthly`,
  ////   subtitle_translation_key: `targets.child_negative_tdr_given_monthly.subtitle`,
  //   subtitle_translation_key: label,
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `reports`,
  //   appliesIf: function (c, r) {
  //     return isAlive(c) && isFeverTdrGivenMonthly(r, `negative`);
  //   },
  //   aggregate:true
  // },


  {
    id: `active-family-planning`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.active_family_planning`,
    subtitle_translation_key: `targets.active_family_planning.subtitle`,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isActiveFamilyPlanning(c, r);
    },
    aggregate:true
  },

  // {
  //   id: `active-oral-combination-pill-familyp-planning`,
  //   type: `count`,
  //   icon: `clinic-lg`,
  //   translation_key: `targets.active_oral_combination_pill_family_planning`,
  //   // subtitle_translation_key: `targets.active_oral_combination_pill_family_planning.subtitle`,
  //   subtitle_translation_key: '*',
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `reports`,
  //   appliesIf: function (c, r) {
  //     return isAlive(c) && isActiveOralCombinationPillFamilyPlanning(c, r);
  //   },
  //   aggregate:true
  // },
  // {
  //   id: `active-injectible-familyp-planning`,
  //   type: `count`,
  //   icon: `clinic-lg`,
  //   translation_key: `targets.active_injectible_familyp_planning`,
  //   // subtitle_translation_key: `targets.active_injectible_familyp_planning.subtitle`,
  //   subtitle_translation_key: '*',
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `reports`,
  //   appliesIf: function (c, r) {
  //     return isAlive(c) && isActiveInjectibleFamilyPlanning(c, r);
  //   },
  //   aggregate:true
  // },

  // {
  //   id: `home-visits-per-family-monthly`,
  //   icon: `home-visit`,
  //   type: `count`,
  //   goal: -1,
  //   translation_key: `targets.home_visits_per_family_monthly`,
  //   // subtitle_translation_key: `targets.home_visits_per_family_monthly.subtitle`,
  //   subtitle_translation_key: label,
  //   // context: `user.role === 'chw'`,
  //   date: `reported`,
  //   appliesTo: `reports`, //`contacts`
  //   // appliesToType: [`person`, `clinic`],
  //   appliesIf: function (c, r) {
  //     return isAlive(c) && isBetween21and20(r.reported_date);
  //   },
  //   idType: (c, r) => {
  //     // Determines the target ids which will be in the group.
  //     // eg. 'family1~2000-02-15' and 'family1~2000-02-16'
  //     const householdVisitDates = new Set(c.reports.map((report) => toDateString(report.reported_date)));
  //     var familyId = c.contact.parent._id;
  //     if (c.contact.type === `clinic`) {
  //       familyId = c.contact._id;
  //     }

  //     return Array.from(householdVisitDates).map((date) => {
  //       return `${familyId}~${date}`;
  //     });
  //   },
  //   groupBy: function (c, r) {
  //     if (c.contact.type === `clinic`) {
  //        return c.contact._id;
  //     }
  //     return c.contact.parent._id;
  //   },
  //   passesIfGroupCount: { gte: 1 },
  //   aggregate:true
  // },

  // {
  //   id: `number-of-family-registered`,
  //   icon: `home-visit`,
  //   type: `count`,
  //   goal: -1,
  //   translation_key: `targets.number_of_family_registered`,
  //   subtitle_translation_key: `targets.number_of_family_registered.subtitle`,
  //   // context: `user.role === 'chw'`,
  //   date: `reported`,
  //   appliesTo: `contacts`,
  //   // appliesToType: [`clinic`],
  //   appliesIf: function (c, r) {
  //     return isAlive(c) && c.contact.type === `clinic`;
  //   },
  //   groupBy: function (c, r) {
  //     return c.contact._id;
  //   },
  //   passesIfGroupCount: { gte: 1 },
  //   aggregate:true
  // },

  // {
  //   id: `total_vad_pcime_c-visit-monthly`,
  //   type: `count`,
  //   icon: `pcime_c-visit`,
  //   translation_key: `targets.total_vad_pcime_c_monthly`,
  //   // subtitle_translation_key: `targets.total_vad_pcime_c_monthly.subtitle`,
  //   subtitle_translation_key: label,
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `reports`,
  //   appliesIf: function (c, r) {
  //     return isAlive(c) && isTotalPcimeCMonthly(r);
  //   },
  //   aggregate:true
  // },

  // {
  //   id: `total_vad_pcime_c_followup-visit-monthly`,
  //   type: `count`,
  //   icon: `pcime_c-visit`,
  //   translation_key: `targets.total_vad_pcime_c_followup_monthly`,
  //   // subtitle_translation_key: `targets.total_vad_pcime_c_followup_monthly.subtitle`,
  //   subtitle_translation_key: label,
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `reports`,
  //   appliesIf: function (c, r) {
  //     return isAlive(c) && isTotalPcimeCFollowupMonthly(r);
  //   },
  //   aggregate:true
  // },

  {
    id: `total_pregnancy_registered-monthly`,
    type: `count`,
    icon: `pcime_c-visit`,
    translation_key: `targets.total_pregnancy_registered_monthly`,
    // subtitle_translation_key: `targets.total_pregnancy_registered_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isPregnantMonthly(r);
    },
    aggregate:true
  },

  {
    id: `pregnancy_active_registered-monthly`,
    type: `count`,
    icon: `pcime_c-visit`,
    translation_key: `targets.pregnancy_active_registered_monthly`,
    // subtitle_translation_key: `targets.pregnancy_active_registered_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isPregnant(c, c.reports) && isBetween21and20(r.reported_date);
    },
    aggregate:true
  },

  // {
  //   id: `active-pregnancy`,
  //   type: `count`,
  //   icon: `clinic-lg`,
  //   translation_key: `targets.active_pregnancy`,
  ////   subtitle_translation_key: `targets.active_pregnancy.subtitle`,
  //   subtitle_translation_key: label,
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `reports`,
  //   appliesIf: function (c, r) {
  //     return isAlive(c) && isPregnant(c, c.reports);
  //   },
  //   aggregate:true
  // },


  {
    id: `total_pregnancy_urine_test-monthly`,
    type: `count`,
    icon: `pcime_c-visit`,
    translation_key: `targets.total_pregnancy_urine_test_monthly`,
    // subtitle_translation_key: `targets.total_pregnancy_urine_test_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isPregnancyUrineTestMonthly(r);
    },
    aggregate:true
  },

  {
    id: `total_prenatal_followup-monthly`,
    type: `count`,
    icon: `home-visit`,
    translation_key: `targets.total_prenatal_followup_monthly`,
    // subtitle_translation_key: `targets.total_prenatal_followup_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isFormBetween21and20(r, `prenatal_followup`);
    },
    aggregate:true
  },

  {
    id: `total_postnatal_followup-monthly`,
    type: `count`,
    icon: `home-visit`,
    translation_key: `targets.total_postnatal_followup_monthly`,
    // subtitle_translation_key: `targets.total_postnatal_followup_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isAlive(c) && isFormBetween21and20(r, `postnatal_followup`);
    },
    aggregate:true
  },

  {
    id: `pcime_referal-monthly`,
    type: `count`,
    icon: `clinic-lg`,
    translation_key: `targets.pcime_referal_followup_monthly`,
    // subtitle_translation_key: `targets.pcime_referal_followup_monthly.subtitle`,
    subtitle_translation_key: label,
    // context: `user.role == 'chw'`,
    goal: -1,
    appliesTo: `reports`,
    appliesIf: function (c, r) {
      return isPcimeReferalFollowupMonthly(r);
    },
    aggregate:true
  },






  // {
  //   id: `coverage-rate-households`,
  //   type: `percent`,
  //   icon: `clinic-lg`,
  //   translation_key: `targets.coverage_rate_households`,
  ////   subtitle_translation_key: `targets.coverage_rate_households.subtitle`,
  //   subtitle_translation_key: label,
  //   // context: `user.role == 'chw'`,
  //   goal: -1,
  //   appliesTo: `contacts`,
  //   // appliesToType: [`person`],
  //   appliesIf: function (c, r) {
  //     return c.contact.type === 'clinic' || (c.contact.type === `person` && c.contact.parent.type === 'clinic');
  //   },
  //   idType: (c, r) => {
  //     if (c.contact.type === `clinic`) {
  //       return c.contact._id;
  //     }
  //     return c.contact.parent._id;
  //   },
  //   passesIf: function (c, r) {
  //     var found = 0;
  //     for (let i = 0; i < home_actions_forms.length; i++) {
  //       const h = home_actions_forms[i];
  //       console.log(`${found}: ${h} : ${c} : ${c.report}`);
  //       if (isExist(getMostRecentReport(c.report, [h]))) {
  //         return found++;
  //       }
  //     }
  //     return found > 0;

      
  //     // return home_actions_forms.includes(r.form) && r.reported_date >= getMostRecentReport(c.reports, r.form).reported_date;
  //   },
  //   aggregate:true
  // },  

  






// reference_femmes_pf
// reference_pcime
// reference_femmes_enceinte_postpartum


// `total_suivi_pcime_c`
// `total_vad_femmes_enceinte`
// `total_vad_femmes_postpartum`
// `total_recherche_active`
// `total_vad_family_planning`
// `reference_femmes_pf`
// `reference_pcime`
// `reference_femmes_enceinte_postpartum`
// `total_diarrhee_pcime_soins`
// `total_paludisme_pcime_soins`
// `total_pneumonie_pcime_soins`
// `total_malnutrition_pcime_soins`
// `prompt_diarrhee_24h_pcime_soins`
// `prompt_diarrhee_48h_pcime_soins`
// `prompt_diarrhee_72h_pcime_soins`
// `prompt_paludisme_24h_pcime_soins`
// `prompt_paludisme_48h_pcime_soins`
// `prompt_paludisme_72h_pcime_soins`
// `prompt_pneumonie_24h_pcime_soins`
// `prompt_pneumonie_48h_pcime_soins`
// `prompt_pneumonie_72h_pcime_soins`
// `total_vad_femmes_enceintes_NC`
// `total_vad_femme_postpartum_NC`
// `total_test_de_grossesse_domicile`









//   {
//     id: 'percentage-contacts-with-cough-this-month',
//     type: 'percent',
//     icon: 'icon-cough',
//     goal: -1,
//     translation_key: 'targets.assessments.percentage.cough.title',
// //    subtitle_translation_key: 'targets.this_month.subtitle',
  //   subtitle_translation_key: label,
//     percentage_count_translation_key: 'targets.assessments.percentage.with.cough',
//     appliesTo: 'reports',
//     appliesToType: ['assessment'],
//     appliesIf: function (contact) {
//       return isPatient(contact);
//     },
//     passesIf: function(contact, report) {
//       return getField(report, 'group_assessment.cough') === 'yes';
//     },
//     idType: 'contact',
//     date: 'reported'
//   },
//   {
//     id: 'households-with-assessments-this-month',
//     type: 'count',
//     icon: 'icon-household',
//     goal: 2,
//     translation_key: 'targets.households.with.assessments.title',
// //    subtitle_translation_key: 'targets.this_month.subtitle',
  //   subtitle_translation_key: label,
//     appliesTo: 'reports',
//     appliesToType: ['assessment'],
//     date: 'reported',
//     emitCustom: (emit, original, contact) => {
//       const householdId = getHouseholdId(contact);
//       emit(Object.assign({}, original, {
//         _id: householdId,
//         pass: true
//       }));
//     }
//   },
//   {
//     id: 'households-with-gt2-assessments-this-month',
//     type: 'percent',
//     icon: 'icon-household',
//     goal: 60,
//     translation_key: 'targets.households.with.gt2.assessments.title',
// //    subtitle_translation_key: 'targets.all_time.subtitle',
  //   subtitle_translation_key: label,
//     appliesTo: 'contacts',
//     appliesToType: ['person', 'clinic'], //Need the total number of households as denominator
//     date: 'now',
//     emitCustom: (emit, original, contact) => {
//       const householdId = getHouseholdId(contact);
//       if (isPatient(contact)) {
//         if (contact.reports.some(report => report.form === 'assessment')) {
//           emit(Object.assign({}, original,targetInstance = {
//             _id: householdId, //Emits a passing target instance with the household ID as the target instance ID
//             pass: true
//           }));
//         }
//       }
//       if(contact.contact && contact.contact.type === 'clinic') { //This represents the denominator, which is the total number of households
//         emit(Object.assign({}, original,targetInstance = {
//           _id: householdId,
//           pass: false, //Set to false so that it is counted in the denominator
//         }));
//       }
//     },
//     groupBy: (contact) => getHouseholdId(contact),
//     passesIfGroupCount: { gte: 2 },
//   }

];



  // {
  //   id: `home-visits-per-family`,
  //   type: `count`,
  //   icon: `home-visit`,
  //   translation_key: `targets.home_visits_per_family`,
  ////   subtitle_translation_key: `targets.home_visits_per_family.subtitle`,
  //   subtitle_translation_key: label,
  //   context: `user.role == 'chw'`,
  //   date: `reported`,
  //   goal: 150,
  //   appliesTo: `contacts`,
  //   appliesToType: [`person`],
  //   appliesIf: function (c, r) {
  //     return hasAllVisitActionsMonthly(r);
  //   },
  // },


  // {
  //   id: `births-last-month`,
  //   type: `count`,
  //   icon: `icon-infant`,
  //   translation_key: `targets.births.title.last`,
  // //  subtitle_translation_key: `targets.last_month.subtitle`,
  //   subtitle_translation_key: label,
  //   goal: -1,
  //   appliesTo: `contacts`,
  //   appliesToType: [`person`],
  //   appliesIf: (contact) => !!contact,
  //   date: (contact) => contact.contact.date_of_birth,
  //   dhis: {
  //     dataSet: `VMuFODsyWaO`,
  //     dataElement: `kB0ZBFisE0e`,
  //   },
  // },

  // // BIRTHS THIS MONTH
  // {
  //   id: `births-this-month`,
  //   type: `count`,
  //   icon: `infant`,
  //   goal: -1,
  //   translation_key: `targets.births.title`,
  // //  subtitle_translation_key: `targets.this_month.subtitle`,
  //   subtitle_translation_key: label,
  //   appliesTo: `reports`,
  //   appliesIf: isHealthyDelivery,
  //   date: `reported`,
  // },

  // // % DELIVERIES ALL TIME WITH 1+ VISITS
  // {
  //   id: `delivery-with-min-1-visit`,
  //   type: `percent`,
  //   icon: `nurse`,
  //   goal: 100,
  //   translation_key: `targets.delivery_1_visit.title`,
  ////   subtitle_translation_key: `targets.all_time.subtitle`,
  //   subtitle_translation_key: label,
  //   appliesTo: `reports`,
  //   idType: `report`,
  //   appliesIf: isHealthyDelivery,
  //   passesIf: function (c, r) {
  //     var visits = countReportsSubmittedInWindow(
  //       c.reports,
  //       antenatalForms,
  //       r.reported_date - MAX_DAYS_IN_PREGNANCY * MS_IN_DAY,
  //       r.reported_date
  //     );
  //     return visits > 0;
  //   },
  //   date: `now`,
  // },
