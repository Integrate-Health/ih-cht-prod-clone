/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */

const {
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
  getPriority,
  isFormArraySubmittedInWindow,
  getMostRecentReport,
  R_Date,
  isPregnant,
  addDays,
  isChildUnder5,
  fackDate,
} = require(`./tasks-extras`);

const { isExist, isAlive, isTrue, isChws, isVaccinAgeLimit } = require(`./utils`);

module.exports = [
  {
    name: `vaccination-followup`,
    icon: `immunization`,
    title: `child.vaccination.followup`,
    appliesTo: `contacts`,
    // appliesToType: [`person`],
    contactLabel: (c) => c.contact.name,
    appliesIf: function (c) {
      return isChws(user) && isVaccinAgeLimit(c) && isAlive(c) && !isTrue(c.contact.deleted) && c.contact.type === `person`;
    },
    actions: [
      {
        type: `report`,
        form: `vaccination_followup`,
        label: `vaccination.followup`,
        // Pass content that will be used within the task form
        modifyContent: function (content, c) {
          const cst = getVaccinationConfig(c).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.contact = cst.contact;
          content.t_vaccinal_status_BCG = cst.t_vaccinal_status_BCG;
          content.t_vaccinal_status_VPO_0 = cst.t_vaccinal_status_VPO_0;
          content.t_vaccinal_status_DTC_B1 = cst.t_vaccinal_status_DTC_B1;
          content.t_vaccinal_status_VPO_1 = cst.t_vaccinal_status_VPO_1;
          content.t_vaccinal_status_pneumo_1 = cst.t_vaccinal_status_pneumo_1;
          content.t_vaccinal_status_rota_1 = cst.t_vaccinal_status_rota_1;
          content.t_vaccinal_status_DTC_B2 = cst.t_vaccinal_status_DTC_B2;
          content.t_vaccinal_status_VPO_2 = cst.t_vaccinal_status_VPO_2;
          content.t_vaccinal_status_pneumo_2 = cst.t_vaccinal_status_pneumo_2;
          content.t_vaccinal_status_rota_2 = cst.t_vaccinal_status_rota_2;
          content.t_vaccinal_status_DTC_B3 = cst.t_vaccinal_status_DTC_B3;
          content.t_vaccinal_status_VPO_3 = cst.t_vaccinal_status_VPO_3;
          content.t_vaccinal_status_pneumo_3 = cst.t_vaccinal_status_pneumo_3;
          content.t_vaccinal_status_vpi = cst.t_vaccinal_status_vpi;
          content.t_vaccinal_status_RR1 = cst.t_vaccinal_status_RR1;
          content.t_vaccinal_status_VAA = cst.t_vaccinal_status_VAA;
          content.t_vaccinal_status_vit_A = cst.t_vaccinal_status_vit_A;
          content.t_vaccinal_status_RR2 = cst.t_vaccinal_status_RR2;
          content.t_vaccinal_status_MEG = cst.t_vaccinal_status_MEG;
          content.t_task_to_perform = cst.t_task_to_perform;
        },
      },
    ],
    events: [
      {
        id: `vaccination-followup-x`,
        // days: 1,
        start: 0,
        end: 0,
        dueDate: function (event, c) {
          return new Date(Date.now());
          //##################################
          // const elm = getVaccinationConfig(c);
          // const mrr = getMostRecentReport(c.reports, [`vaccination_followup`]);
          // const now = new Date(Date.now());
          // if (isExist(mrr) && isExist(elm.nextVisitDate) && elm.resheduleTask) {
          //   const nextVisitDate = addDays((new Date(elm.nextVisitDate)), 7);
          //   if (nextVisitDate >= now) return nextVisitDate;
          // }
          // return now;
          //#################################
          // const dob = new Date(c.contact.date_of_birth);
          // const dta = 1826 - getAgeInDays(c);
          // if (dta > 0) return new Date(addDays(dob, dta));
          // return fackDate;
        }
      }
    ],
    priority: (c) => getPriority(getVaccinationConfig(c)),

    resolvedIf: function (c, r, event, dueDate) {
      const elm = getVaccinationConfig(c);
      // const mrr = getMostRecentReport(c.reports, [`vaccination_followup`]);
      // var isResolve = false;
      // if (isExist(mrr) && isExist(elm.nextVisitDate) && elm.resheduleTask) {
      //   const nextVisitDate = addDays((new Date(elm.nextVisitDate)), 7);
      //   if (nextVisitDate >= (new Date(Date.now()))) {
      //     isResolve = isFormArraySubmittedInWindow(c.reports, [`vaccination_followup`], addDays(dueDate, -2).getTime(), addDays(dueDate, 0).getTime());
      //   }
      // }
      return elm.resolvedIf;
    },
  },
  {
    name: `newborn-followup`,
    icon: `newborn`,
    title: `newborn.followup`,
    appliesTo: `reports`,
    // appliesToType: [`newborn_followup`],
    contactLabel: (c, r) => c.contact.name,
    appliesIf: function (c, r){
      return isChws(user) && (isChildUnder5(c) && canApplies(c, r, [`newborn_followup`]) && getNewbornConfig(c, r).displayIf);
    },
    actions: [
      {
        type: `report`,
        form: `newborn_followup`,
        label: `newborn.followup`,
        // Pass content that will be used within the task form
        modifyContent: function (content, c, r, event) {
          const cst = getNewbornConfig(c, r).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.contact = cst.contact;
          content.t_has_danger_signs = cst.t_has_danger_signs;
          content.t_follow_up_count = cst.t_follow_up_count;
        },
      },
    ],
    events: [0, 1, 2].map(eventPosition => ({
      id: `newborn-followup-${eventPosition}`,
      // days: 7,
      start: eventPosition === 0 ? 0 : 3,
      end: eventPosition === 0 ? 1 : 3,
      dueDate: function (event, c, r) {
        const elm = getNewbornConfig(c, r);
        if (elm.eventIndex === 0 && eventPosition === 0) return new Date(addDays(elm.nextVisitDate, 1));
        if (elm.eventIndex === 1 && eventPosition === 1) return new Date(addDays(elm.nextVisitDate, 7));
        if (elm.eventIndex === 2 && eventPosition === 2) return new Date(addDays(elm.nextVisitDate, 14));
        return fackDate;
      }
    })),
    priority: (c, r) => getPriority(getNewbornConfig(c, r)),
    resolvedIf: function (c, r, event, dueDate) {
      return (
        isFormArraySubmittedInWindow(
          c.reports,
          [`newborn_followup`],
          R_Date(dueDate, event),
          R_Date(dueDate, event, true)
        )
      );
    },
  },
  {
    name: `pcime-treatment-followup`,
    icon: `treatment`,
    title: `pcime.followup`,
    appliesTo: `reports`,
    // appliesToType: [`pcime_c_asc`, `pcime_c_followup`],
    appliesIf: function (c, r) {
      return isChws(user) && (isChildUnder5(c) && canApplies(c, r, [`pcime_c_asc`, `pcime_c_followup`]) && getPcimeTreatmentFollowUpConfig(c, r).displayIf);
    },
    contactLabel: (c, r) => c.contact.name,
    actions: [
      {
        type: `report`,
        form: `pcime_c_followup`,
        label: `pcime.followup`,
        modifyContent: function (content, c, r, event) {
          const cst = getPcimeTreatmentFollowUpConfig(c, r).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.contact = cst.contact;
          content.t_follow_up_type = cst.t_follow_up_type;
          content.t_follow_up_count = cst.t_follow_up_count;
          content.t_treat_for_diarrhea = cst.t_treat_for_diarrhea;
          content.t_treat_for_fever = cst.t_treat_for_fever;
          content.t_treat_for_pneumonia = cst.t_treat_for_pneumonia;
          content.t_has_been_referred = cst.t_has_been_referred;
          content.t_non_malaria_fever = cst.t_non_malaria_fever;
          content.t_malaria_fever = cst.t_malaria_fever;
          content.t_resp_rate = cst.t_resp_rate;
          content.t_last_visit_temperature = cst.t_last_visit_temperature;
          content.t_last_visit_weight = cst.t_last_visit_weight;
          content.t_last_visit_child_brachial_perimeter = cst.t_last_visit_child_brachial_perimeter;
          content.t_has_been_malnutrition_referred = cst.t_has_been_malnutrition_referred;
          content.t_has_malnutrition = cst.t_has_malnutrition;
          
        },
      },
    ],
    events: [0, 1].map(eventPosition => ({
      id: `pcime-treatment-followup-${eventPosition}`,
      // days: 7,
      start: eventPosition === 0 ? 0 : 1,
      end: eventPosition === 0 ? 2 : 3,
      dueDate: function (event, c, r) {
        const elm = getPcimeTreatmentFollowUpConfig(c, r);
        if (elm.eventIndex === 0 && eventPosition === 0) return new Date(addDays(elm.nextVisitDate, 1));
        if (elm.eventIndex === 1 && eventPosition === 1) return new Date(addDays(elm.nextVisitDate, 2));
        return fackDate;
      }
    })),
    priority: (c, r) => getPriority(getPcimeTreatmentFollowUpConfig(c, r)),
    resolvedIf: function (c, r, event, dueDate) {
      return (
        isFormArraySubmittedInWindow(
          c.reports,
          [`pcime_c_followup`],
          R_Date(dueDate, event),
          R_Date(dueDate, event, true)
        )
      );
    },
  },
  {
    name: `pcime-referal-followup`,
    icon: `treatment`,
    title: `referal.followup`,
    appliesTo: `reports`,
    // appliesToType: [`pcime_c_asc`, `pcime_c_followup`],
    appliesIf: function (c, r) {
      return isChws(user) && (isChildUnder5(c) && canApplies(c, r, [`pcime_c_asc`, `pcime_c_followup`, `pcime_c_referral`, `malnutrition_followup`]) && getReferalFollowUpConfig(c, r).displayIf);
    },
    contactLabel: (c, r) => c.contact.name,
    actions: [
      {
        type: `report`,
        form: `pcime_c_referral`,
        label: `referal.followup`,
        modifyContent: function (content, c, r, event) {
          const cst = getReferalFollowUpConfig(c, r).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.contact = cst.contact;
          content.t_follow_up_type = cst.t_follow_up_type;
          content.t_follow_up_count = cst.t_follow_up_count;
          content.t_last_weight = cst.t_last_weight;
          content.t_last_pb = cst.t_last_pb;
          content.t_last_temperature = cst.t_last_temperature;
        },
      },
    ],
    events: [0].map(eventPosition => ({
      id: `pcime-referal-followup-${eventPosition}`,
      // days: 7,
      start: 0,
      end: 2,
      dueDate: function (event, c, r) {
        const elm = getReferalFollowUpConfig(c, r);
        if (elm.eventIndex === 0 && eventPosition === 0) return new Date(addDays(elm.nextVisitDate, 1));
        return fackDate;
      }
    })),
    priority: (c, r) => getPriority(getReferalFollowUpConfig(c, r)),
    resolvedIf: function (c, r, event, dueDate) {
      return (
        isFormArraySubmittedInWindow(
          c.reports,
          [`pcime_c_referral`],
          R_Date(dueDate, event),
          R_Date(dueDate, event, true)
        )
      );
    },
  },
  {
    name: `treatment-malnutrition-followup`,
    icon: `followup`,
    title: `malnutrition.followup`,
    appliesTo: `reports`,
    // appliesToType: [`pcime_c_asc`, `malnutrition_followup`],
    contactLabel: (c, r) => c.contact.name,
    appliesIf: function (c, r) {
      return isChws(user) && (isChildUnder5(c) && canApplies(c, r, [`pcime_c_asc`, `malnutrition_followup`]) && getPcimeTreatmentMalnutritionConfig(c, r).displayIf);
    },
    actions: [
      {
        type: `report`,
        form: `malnutrition_followup`,
        label: `malnutrition.followup`,
        modifyContent: function (content, c, r, event) {
          const cst = getPcimeTreatmentMalnutritionConfig(c, r).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.contact = cst.contact;
          content.t_follow_up_type = cst.t_follow_up_type;
          content.t_follow_up_count = cst.t_follow_up_count;
          content.t_weight_from_assessment = cst.t_weight_from_assessment;
          content.t_pb_from_assessment = cst.t_pb_from_assessment;
          content.t_assessment_date = cst.t_assessment_date;
          content.t_atpe_given_quantity = cst.t_atpe_given_quantity;
        },
      },
    ],

    events: [0, 1, 2, 3, 4, 5, 6].map(eventPosition => ({
      id: `malnutrition-followup-${eventPosition}`,
      // days: 14,
      start: eventPosition === 0 ? 0 : 1,
      end: eventPosition < 4 ? 3 : 2,
      dueDate: function (event, c, r) {
        const elm = getPcimeTreatmentMalnutritionConfig(c, r);
        if (elm.eventIndex === 0 && eventPosition === 0) return new Date(addDays(elm.nextVisitDate, 1));
        if (elm.eventIndex === 1 && eventPosition === 1) return new Date(addDays(elm.nextVisitDate, 7));
        if (elm.eventIndex === 2 && eventPosition === 2) return new Date(addDays(elm.nextVisitDate, 14));
        if (elm.eventIndex === 3 && eventPosition === 3) return new Date(addDays(elm.nextVisitDate, 21));
        if (elm.eventIndex === 4 && eventPosition === 4) return new Date(addDays(elm.nextVisitDate, 28));
        if (elm.eventIndex === 5 && eventPosition === 5) return new Date(addDays(elm.nextVisitDate, 42));
        if (elm.eventIndex === 6 && eventPosition === 6) return new Date(addDays(elm.nextVisitDate, 56));
        return fackDate;
      }
    })),
    priority: (c, r) => getPriority(getPcimeTreatmentMalnutritionConfig(c, r)),
    resolvedIf: function (c, r, event, dueDate) {
      var newestMalnutritionCloseOutField = false;
      const newestMalnutrition = getMostRecentReport(c.reports, [`malnutrition_followup`]);
      if (isExist(newestMalnutrition) && isExist(newestMalnutrition.fields)) {
        newestMalnutritionCloseOutField = newestMalnutrition.fields.close_out === `true`;
      }
      
      return ( 
        newestMalnutritionCloseOutField || isFormArraySubmittedInWindow(
          c.reports,
          [`malnutrition_followup`],
          R_Date(dueDate, event),
          R_Date(dueDate, event, true)
        )
      );
    },
  },
  {
    name: `postnatal-followup`,
    icon: `newborn`,
    title: `postnatal.followup`,
    appliesTo: `reports`,
    // appliesToType: [`delivery`, `postnatal_followup`],
    contactLabel: (c, r) => c.contact.name,
    appliesIf: function (c, r){
      return isChws(user) && (!isPregnant(c, c.reports, r) && canApplies(c, r, [`delivery`, `postnatal_followup`]) && getPostnatalConfig(c, r).displayIf);
    },
    actions: [
      {
        type: `report`,
        form: `postnatal_followup`,
        label: `postnatal.followup`,
        // Pass content that will be used within the task form
        modifyContent: function (content, c, r, event) {
          const cst = getPostnatalConfig(c, r).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.event_id = cst.event_id;
          content.contact = cst.contact;
          content.t_delivery_date = cst.t_delivery_date;
          content.t_follow_up_count = cst.t_follow_up_count;
          content.t_child_alive = cst.t_child_alive;
          content.t_close_out = cst.t_close_out;
        },
      },
    ],
    events: [0, 1].map(eventPosition => ({
      id: `postnatal-followup-${eventPosition}`,
      // days: 7,
      start: eventPosition === 0 ? 3 : 0,
      end: 5,
      dueDate: function (event, c, r) {
        const elm = getPostnatalConfig(c, r);
        if (elm.eventIndex === 0 && eventPosition === 0) return new Date(addDays(elm.nextVisitDate, 7));
        if (elm.eventIndex === 1 && eventPosition === 1) return new Date(addDays(elm.nextVisitDate, 0));
        return fackDate;
      }
    })),
    priority: (c, r) => getPriority(getPostnatalConfig(c, r)),
    resolvedIf: function (c, r, event, dueDate) {
      return (
        isPregnant(c, c.reports, r) ||
        isFormArraySubmittedInWindow(
          c.reports,
          [`postnatal_followup`],
          R_Date(dueDate, event),
          R_Date(dueDate, event, true)
        )
      );
    },
  },
  {
    name: `prenatal-followup`,
    icon: `pregnant`,
    title: `prenatal.followup`,
    appliesTo: `reports`,
    // appliesToType: [`prenatal_followup`, `pregnancy_family_planning`],
    contactLabel: (c, r) => c.contact.name,
    appliesIf: function (c, r) {
      return isChws(user) && (
        isPregnant(c, c.reports, r) &&
        canApplies(c, r, [`prenatal_followup`, `pregnancy_family_planning`]) &&
        getPrenatalConfig(c, r).displayIf
      );
    },
    actions: [
      {
        type: `report`,
        form: `prenatal_followup`,
        label: `prenatal.followup`,
        // Pass content that will be used within the task form
        modifyContent: function (content, c, r, event) {
          const cst = getPrenatalConfig(c, r).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.event_id = cst.event_id;
          content.contact = cst.contact;
          content.t_follow_up_count = cst.t_follow_up_count;
          content.t_anc_visit = cst.t_anc_visit;
          content.t_follow_up_type = cst.t_follow_up_type;
        },
      },
    ],
    events: [0, 1, 2].map(eventPosition => ({
      id: `prenatal-followup-${eventPosition}`,
      // days: 7,
      start: eventPosition === 1 ? 0 : 4,
      end: eventPosition === 2 ? 10 : 5,
      dueDate: function (event, c, r) {
        const elm = getPrenatalConfig(c, r);
        if (elm.eventIndex === 0 && eventPosition === 0) return new Date(addDays(elm.nextVisitDate, 7));
        if (elm.eventIndex === 1 && eventPosition === 1) return new Date(addDays(elm.nextVisitDate, 0));
        if (elm.eventIndex === 2 && eventPosition === 2) return new Date(addDays(elm.nextVisitDate, 0));
        return fackDate;
      }
    })),
    priority: (c, r) => getPriority(getPrenatalConfig(c, r)),
    resolvedIf: function (c, r, event, dueDate) {
      return (
        !isPregnant(c, c.reports, r) ||
        isFormArraySubmittedInWindow(
          c.reports,
          [`prenatal_followup`],
          R_Date(dueDate, event),
          R_Date(dueDate, event, true)
        )
      );
    },
  },
  {
    name: `fp-followup-danger-sign-check`,
    icon: `treatment`,
    title: `fp.followup.danger.sign.check`,
    appliesTo: `reports`,
    // appliesToType: [`pregnancy_family_planning`, `fp_followup_danger_sign_check`, `fp_follow_up_renewal`],
    contactLabel: (c, r) => c.contact.name,
    appliesIf: function (c, r) {
      return isChws(user) && (
        !isPregnant(c, c.reports, r) &&
        canApplies(c, r, [
          `pregnancy_family_planning`,
          `fp_followup_danger_sign_check`,
          `fp_follow_up_renewal`,
        ]) &&
        getFamilyPlanningFirstFollowupConfig(c, r).displayIf
      );
    },
    actions: [
      {
        type: `report`,
        form: `fp_followup_danger_sign_check`,
        label: `fp.followup.danger.sign.check`,
        // Pass content that will be used within the task form
        modifyContent: function (content, c, r, event) {
          const cst = getFamilyPlanningFirstFollowupConfig(c, r).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.contact = cst.contact;
          content.t_fp_method = cst.t_fp_method;
          content.t_follow_up_count = cst.t_follow_up_count;
        },
      },
    ],
    events: [0, 1].map(eventPosition => ({
      id: `danger-signs-check-${eventPosition}`,
      // days: 7,
      start: 4,
      end: 10,
      dueDate: function (event, c, r) {
        const elm = getFamilyPlanningFirstFollowupConfig(c, r);
        if (elm.eventIndex === 0 && eventPosition === 0 && elm.priority_label === `oral.combination.pill`) return new Date(addDays(elm.nextVisitDate, 7));
        if (elm.eventIndex === 1 && eventPosition === 1 && elm.priority_label === `injectible`) return new Date(addDays(elm.nextVisitDate, 30));
        return fackDate;
      }
    })),
    priority: (c, r) => getPriority(getFamilyPlanningFirstFollowupConfig(c, r)),
    resolvedIf: function (c, r, event, dueDate) {
      return (
        isPregnant(c, c.reports, r) ||
        isFormArraySubmittedInWindow(
          c.reports,
          [`fp_followup_danger_sign_check`],
          R_Date(dueDate, event),
          R_Date(dueDate, event, true)
        )
      );
    },
  },
  {
    name: `family-planning-followup`,
    icon: `treatment`,
    title: `fp.followup`,
    appliesTo: `reports`,
    // appliesToType: [`fp_followup_danger_sign_check`, `fp_follow_up_renewal`],
    contactLabel: (c, r) => c.contact.name,
    appliesIf: function (c, r) {
      return isChws(user) && (
        !isPregnant(c, c.reports, r) &&
        canApplies(c, r, [
          `fp_followup_danger_sign_check`,
          `fp_follow_up_renewal`,
        ]) &&
        getFamilyPlanningFollowupConfig(c, r).displayIf
      );
    },
    actions: [
      {
        type: `report`,
        form: `fp_follow_up_renewal`,
        label: `fp.followup`,
        modifyContent: function (content, c, r, event) {
          const cst = getFamilyPlanningFollowupConfig(c, r).content;
          content.source = cst.source;
          content.source_id = cst.source_id;
          content.contact = cst.contact;
          content.t_fp_method = cst.t_fp_method;
          content.t_follow_up_count = cst.t_follow_up_count;
        },
      },
    ],
    events: [0, 1, 2, 3].map(eventPosition => ({
      id: `fp-follow-up-renewal-${eventPosition}`,
      // days: 7,
      start: 4,
      end: 10,
      dueDate: function (event, c, r) {
        const elm = getFamilyPlanningFollowupConfig(c, r);
        if (elm.eventIndex === 0 && eventPosition === 0 && elm.priority_label === `oral.combination.pill`) return new Date(addDays(elm.nextVisitDate, 19));
        if (elm.eventIndex === 1 && eventPosition === 1 && elm.priority_label === `oral.combination.pill`) return new Date(addDays(elm.nextVisitDate, 28));
        if (elm.eventIndex === 2 && eventPosition === 2 && elm.priority_label === `injectible`) return new Date(addDays(elm.nextVisitDate, 60));
        if (elm.eventIndex === 3 && eventPosition === 3 && elm.priority_label === `injectible`) return new Date(addDays(elm.nextVisitDate, 90));
        return fackDate;
      }
    })),
    priority: (c, r) => getPriority(getFamilyPlanningFollowupConfig(c, r)),
    resolvedIf: function (c, r, event, dueDate) {
      return (
        isPregnant(c, c.reports, r) ||
        isFormArraySubmittedInWindow(
          c.reports,
          [`fp_follow_up_renewal`],
          R_Date(dueDate, event),
          R_Date(dueDate, event, true)
        )
      );
    },
  },
];

