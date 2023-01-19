/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */

const today = getDateMS(Date.now());
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MAX_DAYS_IN_PREGNANCY = 42 * 7;  // 42 weeks = 294 days
const pregnancyForms = [`pregnancy_family_planning`];
const deliveryForms = [`delivery`];
const prenatalForms = [`prenatal_followup`];
const postnatalForms = [`postnatal_followup`];

function isChws(thisUser) {
  return isExist(thisUser.parent) && thisUser.role === `chw`;
  //  return thisUser.parent && thisUser.parent.contact_type === 'chw_area';
}

function isSupervisor(thisUser) {
  return isExist(thisUser.parent) && thisUser.role === `chw_supervisor`;
}

function previousDate(dateObj, format = `en`, withHour = true) {
  var now = dateObj instanceof Date ? dateObj : new Date(dateObj);

  var y = now.getFullYear();
  var m = String(now.getMonth()).padStart(2, '0');
  var d = String(now.getDate()).padStart(2, '0');
  var h = String(now.getHours()).padStart(2, '0');
  var mm = String(now.getMinutes()).padStart(2, '0');
  var s = String(now.getSeconds()).padStart(2, '0');

  if (m === '00') {
    return new Date(`${y - 1}-12-${d} ${h}:${mm}:${s}`);
  } else {
    return new Date(`${y}-${m}-${d} ${h}:${mm}:${s}`);
  }

  // var tempDateObj = new Date(dateObj);
  // if (tempDateObj.getMonth) {
  //   tempDateObj.setMonth(tempDateObj.getMonth() - 1);
  // } else {
  //   tempDateObj.setYear(tempDateObj.getYear() - 1);
  //   tempDateObj.setMonth(12);
  // }
  // return tempDateObj;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  // or 
  // return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

function getDateInFormat(dateObj, day = 0, format = `en`, withHour = false) {
  // var newDateObj = isNumber(dateObj) ? dateObj*1000 : dateObj;
  var now = dateObj instanceof Date ? dateObj : new Date(dateObj);

  var m = String(now.getMonth() + 1).padStart(2, '0');
  var d = String(day !== 0 ? day : now.getDate()).padStart(2, '0');
  var y = now.getFullYear();
  var h = now.getHours();
  var mm = String(now.getMinutes()).padStart(2, '0');
  var s = String(now.getSeconds()).padStart(2, '0');
  // var mm = now.getMinutes() < 10 ? `0` + now.getMinutes() : now.getMinutes();
  // var s = now.getSeconds() < 10 ? `0` + now.getSeconds() : now.getSeconds();
  if (withHour === true) {
    if (format === `fr`) {
      return `${d}/${m}/${y} ${h}:${mm}:${s}`;
    }
    return `${y}-${m}-${d} ${h}:${mm}:${s}`;
  } else {
    if (format === `fr`) {
      return `${d}/${m}/${y}`;
    }
    return `${y}-${m}-${d}`;
  }
}

function isGreater(d1, d2) {
  try {
    const date1 = d1 instanceof Date ? d1.getTime() : new Date(d1).getTime();
    const date2 = d2 instanceof Date ? d2.getTime() : new Date(d2).getTime();
    if (date1 > date2) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

function isGreaterOrEqual(d1, d2) {
  try {
    const date1 = d1 instanceof Date ? d1.getTime() : new Date(d1).getTime();
    const date2 = d2 instanceof Date ? d2.getTime() : new Date(d2).getTime();
    if (date1 >= date2) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

function isLess(d1, d2) {
  try {
    const date1 = d1 instanceof Date ? d1.getTime() : new Date(d1).getTime();
    const date2 = d2 instanceof Date ? d2.getTime() : new Date(d2).getTime();
    if (date1 < date2) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

function isLessOrEqual(d1, d2) {
  try {
    const date1 = d1 instanceof Date ? d1.getTime() : new Date(d1).getTime();
    const date2 = d2 instanceof Date ? d2.getTime() : new Date(d2).getTime();
    if (date1 <= date2) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

function isEqual(d1, d2) {
  try {
    const date1 = d1 instanceof Date ? d1.getTime() : new Date(d1).getTime();
    const date2 = d2 instanceof Date ? d2.getTime() : new Date(d2).getTime();
    if (date1 === date2) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

function isBetween(start, dateToCompare, end) {
  if (isGreaterOrEqual(dateToCompare, start) && isLessOrEqual(dateToCompare, end)) return true;
  return false;
}

function startEnd21and20Date(lang = 'en') {
  const now = new Date();

  var prev, end;
  if (now.getDate() < 21) {
    prev = getDateInFormat(previousDate(now), 21, lang);
    end = getDateInFormat(now, 20, lang);
  } else {
    prev = getDateInFormat(now, 21, lang);
    end = getDateInFormat(now, parseInt(lastDayOfMonth(now)), lang);
  }
  return { start_date: prev, end_date: end };
}

function lastDayOfMonth(dateObj) {
  var date = dateObj instanceof Date ? dateObj : new Date(dateObj);
  var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return String(d.getDate()).padStart(2, '0');
}

function isBetween21and20(date) {
  var betweenDate = startEnd21and20Date();
  return isGreaterOrEqual(date, betweenDate.start_date) && isLessOrEqual(date, betweenDate.end_date);
}

// function isBetween21and20(date) {
//   const now = new Date();
//   const nowDay = now.getDate();
//   var prev, end;
//   var given = getDateInFormat(date);

//   if (nowDay < 21) {
//     prev = getDateInFormat(previousDate(Date.parse(now)), 21);
//     end = getDateInFormat(Date.parse(now), 20);
//   } else {
//     prev = getDateInFormat(Date.parse(now), 21);
//     end = getDateInFormat(Date.parse(now), 31);
//   }
//   const prevDate = new Date(prev);
//   const givendate = new Date(given);
//   const endDay = new Date(end);

//   // console.log(`${prevDate}  |  ${givendate}  |  ${endDay}`);
//   const isValid = givendate >= prevDate && givendate <= endDay;

//   if (isValid === false) {
//     console.log({
//       'prevDate': prev,
//       'givendate': given,
//       'endDay': end
//     });
//   }

//   return isValid;
// }

function isFormBetween21and20(report, formName) {
  if (formName === report.form) {
    return isBetween21and20(report.reported_date);
  }
  return false;
}

function toDateString(date) {
  return getDateInFormat(date);
}

function getTimeForMidnight(d) {
  const date = new Date(d);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function getField(report, fieldPath) {
  return [`fields`, ...(fieldPath || ``).split(`.`)].reduce(
    (prev, fieldName) => {
      if (prev === undefined) return report;
      return prev[fieldName];
    },
    report
  );
}

function getFollowUpCount(report) {
  return (getField(report, `follow_up_count`) ? parseInt(getField(report, `follow_up_count`), 10) : 0) + 1;
}

function R_Date(dueDate, event, end = false) {
  if (end === true) {
    return addDays(dueDate, event.end + 1).getTime();
  }
  return addDays(dueDate, -event.start).getTime();
}

function getHouseholdId(contact) {
  return contact.contact && contact.contact.type === `clinic` ? contact.contact._id : contact.contact.parent && contact.contact.parent._id;
}

function isPatient(contact) {
  return contact.contact && contact.contact.type === `person` && contact.contact.parent && contact.contact.parent.parent && contact.contact.parent.parent.parent;
}

function getDateMS(d) {
  if (typeof d === `string`) {
    if (d === ``) {
      return null;
    }
    d = getDateISOLocal(d);
  }
  return getTimeForMidnight(d).getTime();
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function addDays(date, days) {
  const result = getTimeForMidnight(new Date(date));
  result.setDate(result.getDate() + days);
  return result;
}

function isPregnancyForm(report) {
  return pregnancyForms.includes(report.form);
}

function isPregnancyFollowUpForm(report) {
  return prenatalForms.includes(report.form);
}

function isPostnatalFollowUpForm(report) {
  return postnatalForms.includes(report.form);
}

function isDeliveryForm(report) {
  return deliveryForms.includes(report.form);
}

function getChildPatologiePromptitude(report, patologie, promptInfo) {
  if (!isBetween21and20(report.reported_date)) {
    return false;
  }

  if ([`pcime_c_asc`].includes(report.form)) {
    // paludisme
    if (patologie === `paludisme`) {
      if (getChildPatologie(report, patologie) === true) {
        if (isExist(getField(report, `within_24h`)) && promptInfo === '24h') return getField(report, `within_24h`) === `true`;
        if (isExist(getField(report, `within_48h`)) && promptInfo === '48h') return getField(report, `within_48h`) === `true`;
        if (isExist(getField(report, `within_72h`)) && promptInfo === '72h') return getField(report, `within_72h`) === `true`;
        if (isExist(getField(report, `beyond_72h`)) && promptInfo === '>72h') return getField(report, `beyond_72h`) === `true`;
      }
    }

    // toux & rhume
    if (patologie === `toux_rhume`) {
      if (getChildPatologie(report, patologie) === true) {
        if (isExist(getField(report, `within_24h`)) && promptInfo === '24h') return getField(report, `within_24h`) === `true`;
        if (isExist(getField(report, `within_48h`)) && promptInfo === '48h') return getField(report, `within_48h`) === `true`;
        if (isExist(getField(report, `within_72h`)) && promptInfo === '72h') return getField(report, `within_72h`) === `true`;
        if (isExist(getField(report, `beyond_72h`)) && promptInfo === '>72h') return getField(report, `beyond_72h`) === `true`;
      }
    }

    // pneumonia
    if (patologie === `pneumonia`) {
      if (getChildPatologie(report, patologie) === true) {
        if (isExist(getField(report, `within_24h`)) && promptInfo === '24h') return getField(report, `within_24h`) === `true`;
        if (isExist(getField(report, `within_48h`)) && promptInfo === '48h') return getField(report, `within_48h`) === `true`;
        if (isExist(getField(report, `within_72h`)) && promptInfo === '72h') return getField(report, `within_72h`) === `true`;
        if (isExist(getField(report, `beyond_72h`)) && promptInfo === '>72h') return getField(report, `beyond_72h`) === `true`;
      }
    }

    // diarrhee
    if (patologie === `diarrhea`) {
      if (getChildPatologie(report, patologie) === true) {
        if (isExist(getField(report, `within_24h`)) && promptInfo === '24h') return getField(report, `within_24h`) === `true`;
        if (isExist(getField(report, `within_48h`)) && promptInfo === '48h') return getField(report, `within_48h`) === `true`;
        if (isExist(getField(report, `within_72h`)) && promptInfo === '72h') return getField(report, `within_72h`) === `true`;
        if (isExist(getField(report, `beyond_72h`)) && promptInfo === '>72h') return getField(report, `beyond_72h`) === `true`;
      }
    }

    // malnutrition
    if (patologie === `malnutrition`) {
      if (getChildPatologie(report, patologie) === true) {
        if (isExist(getField(report, `within_24h`)) && promptInfo === '24h') return getField(report, `within_24h`) === `true`;
        if (isExist(getField(report, `within_48h`)) && promptInfo === '48h') return getField(report, `within_48h`) === `true`;
        if (isExist(getField(report, `within_72h`)) && promptInfo === '72h') return getField(report, `within_72h`) === `true`;
        if (isExist(getField(report, `beyond_72h`)) && promptInfo === '>72h') return getField(report, `beyond_72h`) === `true`;
      }
    }

  }
  return false;
}


function getChildPatologie(report, patologie) {
  if (!isBetween21and20(report.reported_date)) {
    return false;
  }
  if ([`pcime_c_asc`].includes(report.form)) {
    // paludisme
    if (patologie === `paludisme`) {
      if (isExist(getField(report, `has_simple_malaria`))) return getField(report, `has_simple_malaria`) === `true`;
    }

    // toux & rhume
    if (patologie === `toux_rhume`) {
      if (isExist(getField(report, `has_cough_cold`))) return getField(report, `has_cough_cold`) === `true`;
    }

    // pneumonia
    if (patologie === `pneumonia`) {
      if (isExist(getField(report, `has_pneumonia`))) return getField(report, `has_pneumonia`) === `true`;
    }

    // diarrhee
    if (patologie === `diarrhea`) {
      if (isExist(getField(report, `has_diarrhea`))) return getField(report, `has_diarrhea`) === `true`;
    }

    // malnutrition
    if (patologie === `malnutrition`) {
      if (isExist(getField(report, `has_malnutrition`))) return getField(report, `has_malnutrition`) === `true`;
    }
  }
  return false;
}

function isExist(data) {
  const isEmpty = Array.isArray(data) ? data.length === 0 : false;
  return data !== null && data !== '' && data !== undefined && typeof data !== undefined && isEmpty === false;
}

function isTrue(data) {
  return isExist(data) && (data === true || data === `true` || data === `yes`);
}

function getMostRecentReport(reports, form) {
  var result = null;
  // if(Array.isArray(form)) formArray = form[0];
  reports.forEach(function (r) {
    // if (formArray.includes(report.formArray) {}
    if (form.indexOf(r.form) >= 0 && !r.deleted && (!result || r.reported_date > result.reported_date)) {
      result = r;
    }
  });
  return result;
}

function isFormArraySubmittedInWindow(reports, formArray, start, end, count) {
  var found = false, reportCount = 0;
  if (typeof formArray === 'string') {
    formArray = [formArray];
  }
  reports.forEach(function (report) {
    if (formArray.includes(report.form) && report.reported_date >= start && report.reported_date <= end) {
      found = true;
      if (count) reportCount++;
    }
  });
  return isExist(count) ? reportCount >= count : found;
}

function isFormArraySubmittedInWindowExcludingThisReport(reports, formArray, start, end, exReport, count) {
  var found = false;
  var reportCount = 0;
  reports.forEach(function (report) {
    if (formArray.includes(report.form)) {
      if (report.reported_date >= start && report.reported_date <= end && report._id !== exReport._id) {
        found = true;
        if (count) {
          reportCount++;
        }
      }
    }
  });
  return count ? reportCount >= count : found;
}

const getLMPDateFromPregnancy = function (report) {
  return isPregnancyForm(report) &&
    getDateMS(getField(report, `g_lmp_date_8601`));
};

function getSubsequentPregnancyFollowUps(allReports, report) {
  const subsequentVisits = allReports.filter(function (visit) {
    var lmpDate = getLMPDateFromPregnancy(report);
    if (!lmpDate) { //LMP Date is not available, use reported date
      lmpDate = report.reported_date;
    }
    return isPregnancyFollowUpForm(visit) &&
      visit.reported_date > report.reported_date &&
      visit.reported_date < addDays(lmpDate, MAX_DAYS_IN_PREGNANCY);
  });
  return subsequentVisits;
}

function getSubsequentPregnancies(contact, refReport) {
  return contact.reports.filter(function (report) {
    return isPregnancyForm(report) && report.reported_date > refReport.reported_date;
  });
}

function getSubsequentDeliveries(contact, refReport, withinLastXDays) {
  return contact.reports.filter(function (deliveryReport) {
    return isDeliveryForm(deliveryReport) &&
      deliveryReport.reported_date > refReport.reported_date &&
      (!withinLastXDays || refReport.reported_date >= (today - withinLastXDays * MS_IN_DAY));
  });
}

function isPregnancyTerminatedByAbortionOrMiscarriage(allReports, report) {
  const followUps = getSubsequentPregnancyFollowUps(allReports, report);
  const latestFollowup = getMostRecentReport(followUps, prenatalForms);
  const field = getField(latestFollowup, `s_close_out.s_why_close_out`);
  return latestFollowup && (field === `abortion` || field === `miscarriage`);
}

function isPregnancyTerminatedByAnyRaison(allReports, report) {
  const followUps = getSubsequentPregnancyFollowUps(allReports, report);
  if (isExist(followUps)) {
    const latestFollowup = getMostRecentReport(followUps, prenatalForms);
    if (isExist(latestFollowup)) {
      if (isExist(getField(latestFollowup, `s_close_out`))) {
        if (isExist(getField(latestFollowup, `s_close_out.s_why_close_out`))) {
          return true;
        }
      }
    }
  }
  return false;
}

function isNotDeleted(contact, report) {
  if (isExist(report)) {
    return !isTrue(contact.contact.deleted) && !isTrue(report.deleted);
  } else if (isExist(contact)) {
    return !isTrue(contact.contact.deleted);
  }
  return false;
}

function isAlive(contact) {
  if (isExist(contact)) {
    if (isExist(contact.contact)) {
      return !contact.contact.date_of_death;
    }
    return !contact.date_of_death;
  }
  return false;
}

function isAliveByReports(allReports) {
  var isFind = true;
  const isDeathFormSubmited = getMostRecentReport(allReports, [`death_report`]);
  const isUndoDeathFormSubmited = getMostRecentReport(allReports, [`undo_death_report`]);
  if (isExist(isUndoDeathFormSubmited) && isExist(isDeathFormSubmited)) {
    isFind = isDeathFormSubmited.reported_date < isUndoDeathFormSubmited.reported_date;
    // if (isExist(isDeathFormSubmited.fields)) {
    //   if (isExist(isDeathFormSubmited.fields.s_death)) {
    //     isFind = isDeathFormSubmited.reported_date < isUndoDeathFormSubmited.reported_date;
    //   }
    // }
  } else if (isExist(isDeathFormSubmited)) {
    isFind = false;
    // if (isExist(isDeathFormSubmited.fields)) {
    //   if (isExist(isDeathFormSubmited.fields.s_death)) {
    //     isFind = true;
    //   }
    // }
  }
  return isFind;
}

function isActivePregnancy(thisContact, allReports, report) {
  // if (thisContact.type !== 'person' || !isAlive(thisContact)) return false; 
  const newestPrenatalReport = getMostRecentReport(allReports, prenatalForms);
  const newestDeliveryReport = getMostRecentReport(allReports, deliveryForms);
  const newestPregnancyAndFPReport = getMostRecentReport(allReports, pregnancyForms);
  // const pregDate = today - MAX_DAYS_IN_PREGNANCY * MS_IN_DAY;
  // const isDelivery6MonthAgo = getSubsequentDeliveries(contact, report, 6 * 7);

  if (isExist(newestPregnancyAndFPReport)) {
    var isPreg = false;
    if (isExist(getField(newestPregnancyAndFPReport, `s_reg_pregnancy_screen`))) {
      const pregnant_1 = getField(newestPregnancyAndFPReport, `s_reg_pregnancy_screen.s_reg_urine_result`) === `positive`;
      const pregnant_2 = getField(newestPregnancyAndFPReport, `s_reg_pregnancy_screen.s_reg_why_urine_test_not_done`) === `already_pregnant`;
      isPreg = isTrue(pregnant_1) || isTrue(pregnant_2);
    }
    if (isPreg === true) {
      if (isExist(newestPrenatalReport)) {
        return newestPrenatalReport.reported_date > newestPregnancyAndFPReport.reported_date;
      } else if (isExist(newestDeliveryReport)) {
        return newestPregnancyAndFPReport.reported_date > newestDeliveryReport.reported_date;
      }
      return true;
    }
  }
  return isExist(newestPrenatalReport) && !isPregnancyTerminatedByAnyRaison(allReports, report);
}

function isPregnant(thisContact, allReports, custumReport = null) {
  if (isExist(custumReport)) {
    return isActivePregnancy(thisContact, allReports, custumReport);
  }
  return isExist(allReports.filter((report) => isActivePregnancy(thisContact, allReports, report)));
}

function isDelivery(allReports) {
  const newestDeliveryReport = getMostRecentReport(allReports, deliveryForms);
  const newestPregnancyAndFPReport = getMostRecentReport(allReports, pregnancyForms);
  const newestPostnatalReport = getMostRecentReport(allReports, postnatalForms);

  if (isExist(newestPregnancyAndFPReport) && isExist(newestDeliveryReport)) {
    if (isExist(newestPostnatalReport)) {
      return newestDeliveryReport.reported_date < newestPostnatalReport.reported_date && newestDeliveryReport.reported_date > newestPregnancyAndFPReport.reported_date;
    }
    return newestDeliveryReport.reported_date > newestPregnancyAndFPReport.reported_date;
  }
  return false;
}

function isNewDelivery(allReports) {
  const newestDeliveryReport = getMostRecentReport(allReports, deliveryForms);
  if (isExist(newestDeliveryReport)) {
    return (addDays(newestDeliveryReport.reported_date, 60).getTime) >= (new Date().getTime);
  }
  return false;
}

function isActiveFamilyPlanning(contact, report, method = `all`) {
  const c = contact;
  const r = report;
  var isFound = false;
  var chosen_fp_method;

  if (isPregnancyForm(r)) {
    var newestFpFollowupRenewalReport = getMostRecentReport(c.reports, [`fp_follow_up_renewal`]);
    var newestFpFollowupDangerSignCheck = getMostRecentReport(c.reports, [`fp_followup_danger_sign_check`]);
    var newestPregnancyAndFPReport = getMostRecentReport(c.reports, pregnancyForms);
    var reportedDate = new Date(r.reported_date);
    var latestPregnancyAndFPTimestamp;
    var newestFpFollowupRenewalTimestamp;
    var newestFpDangerSignsCheckTimestamp;
    if (isExist(newestPregnancyAndFPReport)) {
      latestPregnancyAndFPTimestamp = new Date(newestPregnancyAndFPReport.reported_date);
    }

    if (isExist(newestFpFollowupRenewalReport)) {
      newestFpFollowupRenewalTimestamp = new Date(newestFpFollowupRenewalReport.reported_date);
    }

    if (isExist(newestFpFollowupDangerSignCheck)) {
      newestFpDangerSignsCheckTimestamp = new Date(newestFpFollowupDangerSignCheck.reported_date);
    }

    var FpScheduleGenerate = true;
    chosen_fp_method = getField(r, `chosen_fp_method`);

    if (newestFpFollowupDangerSignCheck) {
      if (isExist(newestFpFollowupDangerSignCheck.fields)) {
        if (isExist(newestFpFollowupDangerSignCheck.fields.s_side_effects)) {
          if (newestFpFollowupDangerSignCheck.fields.s_side_effects.s_missing_pills === `major` && newestFpFollowupDangerSignCheck.fields.s_side_effects.s_pregnancy_result === `negative`) {
            chosen_fp_method = `oral_combination_pill`;
          }
        }
      }
    } else if (isExist(getField(r, `prev_fp_method`))) {
      if (isExist(getField(r, `s_fam_plan_screen`))) {
        if (getField(r, `s_fam_plan_screen.s_want_other_method`) === `no`) {
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
                if (newestFpFollowupRenewalReport.fields.checklist1.s_renew_method === `no`) {
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

    if (isExist(newestPregnancyAndFPReport) && FpScheduleGenerate === true) {
      if (r.reported_date === newestPregnancyAndFPReport.reported_date) {
        isFound = method === `all` ? true : method === chosen_fp_method;
      }
    }
  } else if (isExist(getField(r, `fp_method`))) {
    chosen_fp_method = getField(r, `fp_method`);
    if (r.form === `fp_followup_danger_sign_check` || (r.form === `fp_follow_up_renewal` && getField(r, `stop_fp`) === `no` && getField(r, `checklist1.s_renew_method`) === `yes` && getField(r, `s_side_effects.s_woman_new_packet`) === `yes`)) {
      if (method === `all`) {
        isFound = true;
      } else {
        isFound = method === chosen_fp_method;
      }
    }
  }

  return isFound && !isPregnant(c, c.reports);
}

function isActiveOralCombinationPillFamilyPlanning(contact, report) {
  return isActiveFamilyPlanning(contact, report, `oral_combination_pill`);
}

function isActiveInjectibleFamilyPlanning(contact, report) {
  return isActiveFamilyPlanning(contact, report, `injectible`);
}

function getAgeInMilliseconds(contact) {
  if (isExist(contact.contact.date_of_birth)) {
    if (isExist(contact.contact.date_of_birth)) {
      const birthDate = new Date(c.contact.date_of_birth);
      const ageInMs = new Date(Date.now() - birthDate.getTime());
      return ageInMs;
    }
  }
  return null;
}

function isChildUnder5(contact) {
  var ageInMs = getAgeInMilliseconds(contact);
  if (isExist(ageInMs)) {
    var ageInMonths = (Math.abs(ageInMs.getFullYear() - 1970) * 12) + ageInMs.getMonth();
    return ageInMonths < 60;
  }
  return null;
}

function getAgeInMonths(contact) {
  var ageInMs = getAgeInMilliseconds(contact);
  if (isExist(ageInMs)) {
    return (Math.abs(ageInMs.getFullYear() - 1970) * 12) + ageInMs.getMonth();
  }
  return null;
}

function getAgeInDays(contact) {
  // var days = (new Date() - new Date(1995, 11, 4)) / (1000 * 60 * 60 * 24);
  var ageInMs = getAgeInMilliseconds(contact);
  if (isExist(ageInMs)) {
    return ageInMs / (1000 * 60 * 60 * 24);
  }
  return null;
}

function isVaccinAgeLimit(contact) {
  var age = getAgeInDays(contact);
  console.log(`age: ${age}`);
  return age !== null && age < 730;
}

module.exports = {
  today,
  MS_IN_DAY,
  MAX_DAYS_IN_PREGNANCY,
  pregnancyForms,
  deliveryForms,
  prenatalForms,
  postnatalForms,
  getChildPatologie,
  getChildPatologiePromptitude,
  previousDate,
  getDateInFormat,
  isBetween21and20,
  isFormBetween21and20,
  toDateString,
  getTimeForMidnight,
  isAlive,
  isAliveByReports,
  getField,
  getFollowUpCount,
  R_Date,
  getHouseholdId,
  isPatient,
  getDateMS,
  isValidDate,
  addDays,
  isPregnancyForm,
  isPregnancyFollowUpForm,
  isPostnatalFollowUpForm,
  isDeliveryForm,
  getMostRecentReport,
  isFormArraySubmittedInWindow,
  isFormArraySubmittedInWindowExcludingThisReport,
  getLMPDateFromPregnancy,
  getSubsequentPregnancyFollowUps,
  getSubsequentPregnancies,
  getSubsequentDeliveries,
  isPregnancyTerminatedByAbortionOrMiscarriage,
  isExist,
  isTrue,
  isPregnancyTerminatedByAnyRaison,
  isNotDeleted,
  isPregnant,
  isActiveFamilyPlanning,
  isActiveOralCombinationPillFamilyPlanning,
  isActiveInjectibleFamilyPlanning,
  isDelivery,
  isNewDelivery,
  isChildUnder5,
  getAgeInMonths,
  getAgeInDays,
  isVaccinAgeLimit,
  isChws,
  isSupervisor,
  startEnd21and20Date,
  isGreaterOrEqual,
  isLessOrEqual
};


