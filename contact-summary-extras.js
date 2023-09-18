/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
const { getMostRecentReport, notNull, isReportValid } = require(`./utils`);

function getPcimeConstantsValue(allReports) {
  var result = [];
  const lastReport = getMostRecentReport(allReports, [
    `pcime_c_asc`,
    `usp_pcime_followup`,
  ]);
  var pb, weight, temperature, applyIf;

  if (isReportValid(lastReport) && notNull(lastReport.fields.s_constant)) {
      pb = lastReport.fields.s_constant.s_constant_child_brachial_perimeter;
      weight = lastReport.fields.s_constant.s_constant_child_weight;
      temperature = lastReport.fields.s_constant.s_constant_child_temperature;
      // applyIf = !notNull(pb) && !notNull(weight) && !notNull(temperature) ? false : true;
  }
  return { appliesIf: true, pb: pb, weight: weight, temperature: temperature };
}

module.exports = {
  getPcimeConstantsValue,
};

// function getSubsequentVisits(reports, report) {
//   var subsequentVisits = reports.filter(function (r2) {
//     return (
//       r2.form === `prenatal_followup` &&
//       r2.reported_date > report.reported_date &&
//       r2.fields.reschedule_task.s_want_to_reschedule === `no`
//       // &&
//       // (r2.fields.input.contact._id || r2.fields.patient_id) ===
//       //   (report.fields.input.contact._id || report.fields.patient_id)
//     );
//   });
//   return subsequentVisits;
// }

// function isPregnant(c, report) {
//   var pregnancy,
//     pregnancyDate,
//     today = new Date();
//   //Subtract 45 weeks from today to get cutoff date for earliest possible LMP of someone who is still pregnant
//   var lmp_45wks = new Date();
//   lmp_45wks.setDate(today.getDate() - 315);
//   var edd;
//   if (report.form === `pregnancy_family_planning`) {
//     if (!report.fields.s_reg_pregnancy_screen) {
//       if (
//         report.fields.s_reg_pregnancy_screen.s_reg_why_urine_test_not_done ===
//           `already_pregnant` ||
//         report.fields.s_reg_pregnancy_screen.s_reg_urine_result === `positive`
//       ) {
//         var lmp = new Date(report.fields.lmp_date);
//         return true;
//       }
//       return false;
//     }
//     return false;
//   }
//   if (report.form === `delivery` && r2.reported_date > report.reported_date) {
//     return true;
//   }
//   return false;
// }

// function isPregnant(c, reports) {
//   var pregnancy;
//   var pregnancyDate;
//   var today = new Date();
//   //Subtract 45 weeks from today to get cutoff date for earliest possible LMP of someone who is still pregnant
//   var lmp_45wks = new Date();
//   lmp_45wks.setDate(today.getDate() - 315);
//   var edd;
//   if (
//     report.form === `pregnancy_family_planning` &&
//     report.fields.s_reg_pregnancy_screen
//   ) {
//     const fsc = report.fields.s_reg_pregnancy_screen;
//     if (
//       fsc.s_reg_why_urine_test_not_done === `already_pregnant` ||
//       fsc.s_reg_urine_result === `positive`
//     ) {
//       var lmp = new Date(report.fields.lmp_date);
//       var subsequentDeliveries = reports.filter(function (r2) {
//         return (
//           r2.form === `delivery` && r2.reported_date > report.reported_date
//         );
//       });
//       if (subsequentDeliveries.length > 0 || lmp < lmp_45wks) {
//         return false;
//       }
//       edd = report.fields.edd;
//       if (!pregnancy || pregnancyDate < report.reported_date) {
//         pregnancyDate = report.reported_date;
//         return true;
//       }
//       return false;
//     }
//     return false;
//   }
//   return false;
// }
