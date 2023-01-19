/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */
module.exports = {
  run_every_days: 7,
  cron: `0 22 * * fri`,
  fn: function (userCtx, contact, reports) {
    var filteredReports = [];
    function add_if_not_filtered(ids) {
      for (i = 0; i < ids.length; i++) { 
        if (!filteredReports.includes(ids[i])) { 
          filteredReports.push(ids[i]); 
        } 
      }
    }
    
    //Purging time frames
    const old30 = Date.now() - 1000 * 60 * 60 * 24 * 30;
    const old40 = Date.now() - 1000 * 60 * 60 * 24 * 40;
    const old60 = Date.now() - 1000 * 60 * 60 * 24 * 60;
    const old90 = Date.now() - 1000 * 60 * 60 * 24 * 90;
    const old120 = Date.now() - 1000 * 60 * 60 * 24 * 120;
    const old180 = Date.now() - 1000 * 60 * 60 * 24 * 180;
    const old365 = Date.now() - 1000 * 60 * 60 * 24 * 365;
    const old2year = Date.now() - 1000 * 60 * 60 * 24 * 365 * 2;

    // ########## Rules ##########

    //Home visit
    add_if_not_filtered(reports.filter((r) => r.form === `home_visit` && r.reported_date < old40).map((r) => r._id));

    //Delivery
    add_if_not_filtered(reports.filter((r) => r.form === `delivery` && r.reported_date < old90).map((r) => r._id));

    //Postnatal Followup
    add_if_not_filtered(reports.filter((r) => r.form === `postnatal_followup` && r.reported_date < old90).map((r) => r._id));

    //Newborn Followup
    add_if_not_filtered(reports.filter((r) => r.form === `newborn_followup` && r.reported_date < old40).map((r) => r._id));

    //Death report
    add_if_not_filtered(reports.filter((r) => r.form === `death_report` && r.reported_date < old40).map((r) => r._id));

    //Pregnancy family planning
    add_if_not_filtered(reports.filter((r) => r.form === `pregnancy_family_planning` && r.reported_date < old180).map((r) => r._id));

    //Prenatal followup
    add_if_not_filtered(reports.filter((r) => r.form === `prenatal_followup` && r.reported_date < old365).map((r) => r._id));

    //Pregnancy family planning
    add_if_not_filtered(reports.filter((r) => r.form === `women_emergency_followup` && r.reported_date < old40).map((r) => r._id));

    //PCIME Asc
    add_if_not_filtered(reports.filter((r) => r.form === `pcime_c_asc` && r.reported_date < old40).map((r) => r._id));

    //PCIME followup
    add_if_not_filtered(reports.filter((r) => r.form === `pcime_c_followup` && r.reported_date < old40).map((r) => r._id));

    //PCIME C Referral
    add_if_not_filtered(reports.filter((r) => r.form === `pcime_c_referral` && r.reported_date < old40).map((r) => r._id));

    //FP follow up
    add_if_not_filtered(reports.filter((r) => r.form === `fp_followup_danger_sign_check` && r.reported_date < old40).map((r) => r._id));

    // Malnutrition follow up
    add_if_not_filtered(reports.filter((r) => r.form === `malnutrition_followup` && r.reported_date < old40).map((r) => r._id));

    //FP follow up referral
    add_if_not_filtered(reports.filter((r) => r.form === `fp_follow_up_renewal` && r.reported_date < old180).map((r) => r._id));

    // Drug stock In
    add_if_not_filtered(reports.filter(r => r.form === 'stock_in' && r.reported_date < old60).map(r => r._id));

    // Undo Death Report
    add_if_not_filtered(reports.filter(r => r.form === 'undo_death_report' && r.reported_date < old30).map(r => r._id));

    // Vaccination followup
    add_if_not_filtered(reports.filter(r => r.form === 'vaccination_followup' && r.reported_date < old2year).map(r => r._id));

    return filteredReports;
  },
};
