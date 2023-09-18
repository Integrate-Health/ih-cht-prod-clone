/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */

module.exports = {
  text_expression: 'at 11 pm on Friday',
  cron: `0 23 * * SUN`,
  // cron: `0 22 * * FRI`,
  // "text_expression": "at 1:00 am on Sun",
  // cron: '0 1 * * SUN',
  run_every_days: 7,
  fn: function (userCtx, contact, reports, messages) {
   
    //Purging time frames
    const old30 = Date.now() - (1000 * 60 * 60 * 24 * 30);
    const old40 = Date.now() - (1000 * 60 * 60 * 24 * 40);
    const old60 = Date.now() - (1000 * 60 * 60 * 24 * 60);
    const old90 = Date.now() - (1000 * 60 * 60 * 24 * 90);
    const old120 = Date.now() - (1000 * 60 * 60 * 24 * 120);
    const old180 = Date.now() - (1000 * 60 * 60 * 24 * 180);
    const old365 = Date.now() - (1000 * 60 * 60 * 24 * 365);
    const old518 = Date.now() - (1000 * 60 * 60 * 24 * 518);
    const old2year = Date.now() - (1000 * 60 * 60 * 24 * 365 * 2);
    const USER_ROLES = ['supervisors_manager','chw_supervisor', 'chw'];
    

    if (userCtx.roles.includes("supervisors_manager") || userCtx.roles.includes("chw_supervisor")) {
      // const allDocsToPurge = reports.filter(r => r.reported_date < old30).map(r => r._id);
      // return [...allDocsToPurge];
      return [];
    }
      
    if (userCtx.roles.includes("chw")) {
      
      // ########## Rules ##########
      // const UndoDeathReportToPurge = reports.filter(r => r.form === 'undo_death_report' && r.reported_date < old30).map(r => r._id);
      // const DeathReportToPurge = reports.filter((r) => r.form === `death_report` && r.reported_date < old40).map((r) => r._id);

      const homeVisitToPurge = reports.filter((r) => r.form === `home_visit` && r.reported_date < old40).map((r) => r._id);
      const NewbornFollowupToPurge = reports.filter((r) => r.form === `newborn_followup` && r.reported_date < old40).map((r) => r._id);
      const womenEmergencyFollowupToPurge = reports.filter((r) => r.form === `women_emergency_followup` && r.reported_date < old40).map((r) => r._id);
      const PcimeChwToPurge = reports.filter((r) => r.form === `pcime_c_asc` && r.reported_date < old40).map((r) => r._id);
      const PcimeFollowupToPurge = reports.filter((r) => r.form === `pcime_c_followup` && r.reported_date < old40).map((r) => r._id);
      const UspPcimeFollowupToPurge = reports.filter((r) => r.form === `usp_pcime_followup` && r.reported_date < old40).map((r) => r._id);
      const PcimeReferralToPurge = reports.filter((r) => r.form === `pcime_c_referral` && r.reported_date < old40).map((r) => r._id);
      const FPfollowUpToPurge = reports.filter((r) => r.form === `fp_followup_danger_sign_check` && r.reported_date < old40).map((r) => r._id);
      const MalnutritionFollowUpToPurge = reports.filter((r) => r.form === `malnutrition_followup` && r.reported_date < old40).map((r) => r._id);
      const DrugStockInToPurge = reports.filter(r => r.form === 'stock_in' && r.reported_date < old60).map(r => r._id);
      const DeliveryToPurge = reports.filter((r) => r.form === `delivery` && r.reported_date < old90).map((r) => r._id);
      const PostnatalFollowupToPurge = reports.filter((r) => r.form === `postnatal_followup` && r.reported_date < old90).map((r) => r._id);
      const PregnancyFamilyPlanningToPurge = reports.filter((r) => r.form === `pregnancy_family_planning` && r.reported_date < old180).map((r) => r._id);
      const FPfollowUpRenewalToPurge = reports.filter((r) => r.form === `fp_follow_up_renewal` && r.reported_date < old180).map((r) => r._id);
      const PrenatalFollowupToPurge = reports.filter((r) => r.form === `prenatal_followup` && r.reported_date < old365).map((r) => r._id);
      const VaccinationFollowupToPurge = reports.filter(r => r.form === 'vaccination_followup' && r.reported_date < old518).map(r => r._id);

      // const messagesToPurge = messages.filter(m => m.reported_date < old120).map(m => m._id);

      return [
        ...homeVisitToPurge, 
        ...DeliveryToPurge,
        ...PostnatalFollowupToPurge,
        ...NewbornFollowupToPurge,
        ...PregnancyFamilyPlanningToPurge,
        ...PrenatalFollowupToPurge,
        ...womenEmergencyFollowupToPurge,
        ...PcimeChwToPurge,
        ...PcimeFollowupToPurge,
        ...UspPcimeFollowupToPurge,
        ...PcimeReferralToPurge,
        ...FPfollowUpToPurge,
        ...MalnutritionFollowUpToPurge,
        ...FPfollowUpRenewalToPurge,
        ...DrugStockInToPurge,
        ...VaccinationFollowupToPurge
      ];
      // ...UndoDeathReportToPurge,
      // ...DeathReportToPurge,
    } 

    if(!userCtx.roles.some(role => USER_ROLES.includes(role))) {
      return [];
    }
  
  },
};

