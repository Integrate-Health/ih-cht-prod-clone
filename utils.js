/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-env es6 */

const today = getDateMS(Date.now());
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MAX_DAYS_IN_PREGNANCY = 42 * 7; // 42 weeks = 294 days

function isChws(thisUser) {
  return notNull(thisUser.parent) && thisUser.role === `chw`;
  //  return thisUser.parent && thisUser.parent.contact_type === 'chw_area';
}

function isSupervisor(thisUser) {
  return notNull(thisUser.parent) && thisUser.role === `chw_supervisor`;
}

function previousDate(dateObj, format = `en`, withHour = true) {
  var now = dateObj instanceof Date ? dateObj : new Date(dateObj);

  var y = now.getFullYear();
  var m = String(now.getMonth()).padStart(2, `0`);
  var d = String(now.getDate()).padStart(2, `0`);
  var h = String(now.getHours()).padStart(2, `0`);
  var mm = String(now.getMinutes()).padStart(2, `0`);
  var s = String(now.getSeconds()).padStart(2, `0`);

  if (m === `00`) {
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

  var m = String(now.getMonth() + 1).padStart(2, `0`);
  var d = String(day !== 0 ? day : now.getDate()).padStart(2, `0`);
  var y = now.getFullYear();
  var h = now.getHours();
  var mm = String(now.getMinutes()).padStart(2, `0`);
  var s = String(now.getSeconds()).padStart(2, `0`);
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
  return (
    isGreaterOrEqual(dateToCompare, start) && isLessOrEqual(dateToCompare, end)
  );
}

function startEnd21and20Date(lang = `en`) {
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
  return String(d.getDate()).padStart(2, `0`);
}

function isBetween21and20(date) {
  var betweenDate = startEnd21and20Date();
  return (
    isGreaterOrEqual(date, betweenDate.start_date) &&
    isLessOrEqual(date, betweenDate.end_date)
  );
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

function isFormBetween21and20(report, ArrayformName) {
  if (ArrayformName.includes(report.form)) {
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
  const t = getField(report, `follow_up_count`);
  return notNull(t) ? parseInt(getField(report, `follow_up_count`), 10) : 0;
}

function R_Date(dueDate, event, end = false) {
  if (end === true) {
    return addDays(dueDate, event.end + 1).getTime();
  }
  return addDays(dueDate, -event.start).getTime();
}

function getHouseholdId(contact) {
  if (contact.contact && contact.contact.type === `clinic`) {
    return contact.contact._id;
  } else {
    return contact.contact.parent && contact.contact.parent._id;
  }
}

function isPatient(contact) {
  return (
    contact.contact &&
    contact.contact.type === `person` &&
    contact.contact.parent &&
    contact.contact.parent.parent &&
    contact.contact.parent.parent.parent
  );
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
  return [`pregnancy_family_planning`].includes(report.form);
}

function isPregnancyFollowUpForm(report) {
  return [`prenatal_followup`].includes(report.form);
}

function isPostnatalFollowUpForm(report) {
  return [`postnatal_followup`].includes(report.form);
}

function getChildPatologiePromptitude(report, patologie, promptInfo) {
  if (!isBetween21and20(report.reported_date)) {
    return false;
  }

  if ([`pcime_c_asc`].includes(report.form)) {
    // paludisme
    if (patologie === `paludisme`) {
      if (getChildPatologie(report, patologie) === true) {
        if (notNull(getField(report, `within_24h`)) && promptInfo === `24h`)
          return getField(report, `within_24h`) === `true`;
        if (notNull(getField(report, `within_48h`)) && promptInfo === `48h`)
          return getField(report, `within_48h`) === `true`;
        if (notNull(getField(report, `within_72h`)) && promptInfo === `72h`)
          return getField(report, `within_72h`) === `true`;
        if (notNull(getField(report, `beyond_72h`)) && promptInfo === `>72h`)
          return getField(report, `beyond_72h`) === `true`;
      }
    }

    // toux & rhume
    if (patologie === `toux_rhume`) {
      if (getChildPatologie(report, patologie) === true) {
        if (notNull(getField(report, `within_24h`)) && promptInfo === `24h`)
          return getField(report, `within_24h`) === `true`;
        if (notNull(getField(report, `within_48h`)) && promptInfo === `48h`)
          return getField(report, `within_48h`) === `true`;
        if (notNull(getField(report, `within_72h`)) && promptInfo === `72h`)
          return getField(report, `within_72h`) === `true`;
        if (notNull(getField(report, `beyond_72h`)) && promptInfo === `>72h`)
          return getField(report, `beyond_72h`) === `true`;
      }
    }

    // pneumonia
    if (patologie === `pneumonia`) {
      if (getChildPatologie(report, patologie) === true) {
        if (notNull(getField(report, `within_24h`)) && promptInfo === `24h`)
          return getField(report, `within_24h`) === `true`;
        if (notNull(getField(report, `within_48h`)) && promptInfo === `48h`)
          return getField(report, `within_48h`) === `true`;
        if (notNull(getField(report, `within_72h`)) && promptInfo === `72h`)
          return getField(report, `within_72h`) === `true`;
        if (notNull(getField(report, `beyond_72h`)) && promptInfo === `>72h`)
          return getField(report, `beyond_72h`) === `true`;
      }
    }

    // diarrhee
    if (patologie === `diarrhea`) {
      if (getChildPatologie(report, patologie) === true) {
        if (notNull(getField(report, `within_24h`)) && promptInfo === `24h`)
          return getField(report, `within_24h`) === `true`;
        if (notNull(getField(report, `within_48h`)) && promptInfo === `48h`)
          return getField(report, `within_48h`) === `true`;
        if (notNull(getField(report, `within_72h`)) && promptInfo === `72h`)
          return getField(report, `within_72h`) === `true`;
        if (notNull(getField(report, `beyond_72h`)) && promptInfo === `>72h`)
          return getField(report, `beyond_72h`) === `true`;
      }
    }

    // malnutrition
    if (patologie === `malnutrition`) {
      if (getChildPatologie(report, patologie) === true) {
        if (notNull(getField(report, `within_24h`)) && promptInfo === `24h`)
          return getField(report, `within_24h`) === `true`;
        if (notNull(getField(report, `within_48h`)) && promptInfo === `48h`)
          return getField(report, `within_48h`) === `true`;
        if (notNull(getField(report, `within_72h`)) && promptInfo === `72h`)
          return getField(report, `within_72h`) === `true`;
        if (notNull(getField(report, `beyond_72h`)) && promptInfo === `>72h`)
          return getField(report, `beyond_72h`) === `true`;
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
      if (notNull(getField(report, `has_simple_malaria`)))
        return getField(report, `has_simple_malaria`) === `true`;
    }

    // toux & rhume
    if (patologie === `toux_rhume`) {
      if (notNull(getField(report, `has_cough_cold`)))
        return getField(report, `has_cough_cold`) === `true`;
    }

    // pneumonia
    if (patologie === `pneumonia`) {
      if (notNull(getField(report, `has_pneumonia`)))
        return getField(report, `has_pneumonia`) === `true`;
    }

    // diarrhee
    if (patologie === `diarrhea`) {
      if (notNull(getField(report, `has_diarrhea`)))
        return getField(report, `has_diarrhea`) === `true`;
    }

    // malnutrition
    if (patologie === `malnutrition`) {
      if (notNull(getField(report, `has_malnutrition`)))
        return getField(report, `has_malnutrition`) === `true`;
    }
  }
  return false;
}

function notNull(data) {
  const isEmpty = Array.isArray(data) ? data.length === 0 : false;
  return (
    data !== null &&
    data !== `` &&
    data !== undefined &&
    typeof data !== undefined &&
    isEmpty === false
  );
}

function isTrue(data) {
  return notNull(data) && (data === true || data === `true` || data === `yes`);
}

const isReportValid = function (r) {
  if (r) {
    if (r.form && r.fields && r.reported_date && !r.deleted) {
      return true;
    }
  }
  return false;
};

function getMostRecentReport(reports, forms) {
  var result;
  reports.forEach(function (r) {
    // if (forms.indexOf(r.form) >= 0 && !r.deleted && (!result || r.reported_date > result.reported_date)) {
    //   result = r;
    // }
    if (
      isReportValid(r) &&
      forms.includes(r.form) &&
      (!result || r.reported_date > result.reported_date)
    ) {
      result = r;
    }
  });
  return result;
}

function isFormArraySubmittedInWindow(
  reports,
  formArray,
  start,
  end,
  excludeReport,
  count
) {
  var found = false,
    reportCount = 0;
  if (typeof formArray === `string`) {
    formArray = [formArray];
  }
  reports.forEach(function (report) {
    if (
      formArray.includes(report.form) &&
      report.reported_date >= start &&
      report.reported_date <= end &&
      (excludeReport ? report._id !== excludeReport._id : true)
    ) {
      found = true;
      if (count) reportCount++;
    }
  });
  return count ? reportCount >= count : found;
}

function isFormArraySubmittedInWindowExcludeLastReport(
  reports,
  formArray,
  start,
  end,
  count
) {
  var found = false,
    reportCount = 0;
  if (typeof formArray === `string`) {
    formArray = [formArray];
  }

  const lastReport = getMostRecentReport(reports, formArray);

  reports.forEach(function (report) {
    if (
      formArray.includes(report.form) &&
      report.reported_date >= start &&
      report.reported_date <= end &&
      (lastReport ? report._id !== lastReport._id : true)
    ) {
      found = true;
      if (count) reportCount++;
    }
  });
  return notNull(count) ? reportCount >= count : found;
}

const getLMPDateFromPregnancy = function (report) {
  return (
    isPregnancyForm(report) && getDateMS(getField(report, `g_lmp_date_8601`))
  );
};

function getSubsequentPregnancyFollowUps(allReports, report) {
  const subsequentVisits = allReports.filter(function (visit) {
    var lmpDate = getLMPDateFromPregnancy(report);
    if (!lmpDate) {
      //LMP Date is not available, use reported date
      lmpDate = report.reported_date;
    }
    return (
      isPregnancyFollowUpForm(visit) &&
      visit.reported_date > report.reported_date &&
      visit.reported_date < addDays(lmpDate, MAX_DAYS_IN_PREGNANCY)
    );
  });
  return subsequentVisits;
}

function getSubsequentPregnancies(contact, refReport) {
  return contact.reports.filter(function (report) {
    return (
      isPregnancyForm(report) && report.reported_date > refReport.reported_date
    );
  });
}

function getSubsequentDeliveries(contact, refReport, withinLastXDays) {
  return contact.reports.filter(function (report) {
    return (
      [`delivery`].includes(report.form) &&
      report.reported_date > refReport.reported_date &&
      (!withinLastXDays ||
        refReport.reported_date >= today - withinLastXDays * MS_IN_DAY)
    );
  });
}

function isDelivery(reports) {
  const lastReport = getMostRecentReport(reports, [
    `pregnancy_family_planning`,
    `delivery`,
    `postnatal_followup`,
  ]);
  if (isReportValid(lastReport)) {
    if ([`delivery`, `postnatal_followup`].includes(lastReport.form)) {
      return true;
    }
  }
  return false;
}

function isPregnancyTerminatedByAbortionOrMiscarriage(allReports, report) {
  const followUps = getSubsequentPregnancyFollowUps(allReports, report);
  const latestFollowup = getMostRecentReport(followUps, [`prenatal_followup`]);
  const field = getField(latestFollowup, `s_close_out.s_why_close_out`);
  return latestFollowup && (field === `abortion` || field === `miscarriage`);
}

function notDeleted(contact, report) {
  if (notNull(report)) {
    return !isTrue(contact.contact.deleted) && !isTrue(report.deleted);
  } else if (notNull(contact)) {
    return !isTrue(contact.contact.deleted);
  }
  return false;
}

function isAlive(contact, reports) {
  if (notNull(contact) && notNull(contact.date_of_death)) {
    return false;
  }

  const lastReport = getMostRecentReport(reports, [
    `death_report`,
    `undo_death_report`,
  ]);
  if (isReportValid(lastReport)) {
    if (lastReport.form === `death_report`) {
      return false;
    } else if (lastReport.form === `undo_death_report`) {
      return true;
    }
  }
  return true;
}

function isPregnant(reports) {
  const lastReport = getMostRecentReport(reports, [
    `pregnancy_family_planning`,
    `prenatal_followup`,
    `delivery`,
    `postnatal_followup`,
  ]);
  if (isReportValid(lastReport)) {
    if ([`delivery`, `postnatal_followup`].includes(lastReport.form)) {
      return false;
    } else if (lastReport.form === `prenatal_followup`) {
      return getField(lastReport, `close_out`) !== `true`;
    } else if (lastReport.form === `pregnancy_family_planning`) {
      const pregnant_1 =
        getField(lastReport, `s_reg_pregnancy_screen.s_reg_urine_result`) ===
        `positive`;
      const pregnant_2 =
        getField(
          lastReport,
          `s_reg_pregnancy_screen.s_reg_why_urine_test_not_done`
        ) === `already_pregnant`;
      return (isTrue(pregnant_1) || isTrue(pregnant_2)) === true;
    }
  }
  return false;
}

function isNewDelivery(allReports) {
  const newestDeliveryReport = getMostRecentReport(allReports, [`delivery`]);
  if (notNull(newestDeliveryReport)) {
    return (
      addDays(newestDeliveryReport.reported_date, 60).getTime >=
      new Date().getTime
    );
  }
  return false;
}

function isActiveFamilyPlanning(contact, report, method = `all`) {
  if (!isPregnant(c.reports)) {
    var isFound = false;
    const r = getMostRecentReport(contact.reports, [
      `fp_follow_up_renewal`,
      `fp_followup_danger_sign_check`,
      `pregnancy_family_planning`,
    ]);

    if (isReportValid(r)) {
      const chosen_fp_method = getField(r, `fp_method`);

    if (r.form === `fp_followup_danger_sign_check`) {
      if (notNull(getField(r, `s_side_effects`))) {
        isFound =
          r.fields.continue_with_fp === `yes` &&
          r.fields.s_side_effects.s_pregnancy_result !== `positive`;
      }
    } else if (r.form === `fp_follow_up_renewal`) {
      if (notNull(r.fields.checklist1)) {
        isFound =
          r.fields.checklist1.s_renew_method === `yes` &&
          r.fields.stop_fp !== `yes`;
      }
    } else if (r.form === `pregnancy_family_planning`) {
      if (
        notNull(r.fields.s_fam_plan_screen) &&
        notNull(r.fields.family_planning_reg)
      ) {
        isFound =
          r.fields.s_fam_plan_screen.s_have_counsel_on_planning === `yes` &&
          r.fields.family_planning_reg.s_chw_usp === `yes`;
      }
    }

    return isFound && (method === `all` ? true : chosen_fp_method === method) === true;
    }
  }

  return false;
}

// vaccination
function getMostRecentVaccinationData(contact, reports) {
  const r = getMostRecentReport(reports, [`vaccination_followup`]);

  const v0 = r ? notNull(getField(r, `s_vaccinal_status.s_one_day`)) : false;
  const v1 = r ? notNull(getField(r, `s_vaccinal_status.s_six_weeks`)) : false;
  const v2 = r ? notNull(getField(r, `s_vaccinal_status.s_ten_weeks`)) : false;
  const v3 = r
    ? notNull(getField(r, `s_vaccinal_status.s_forteen_weeks`))
    : false;
  const v4 = r
    ? notNull(getField(r, `s_vaccinal_status.s_nine_months`))
    : false;
  const v5 = r
    ? notNull(getField(r, `s_vaccinal_status.s_fifty_months`))
    : false;

  return {
    t_vaccinal_status_BCG:
      v0 === true
        ? getField(r, `s_vaccinal_status.s_one_day.s_vaccinal_status_BCG`)
        : undefined,
    t_vaccinal_status_VPO_0:
      v0 === true
        ? getField(r, `s_vaccinal_status.s_one_day.s_vaccinal_status_VPO_0`)
        : undefined,

    t_vaccinal_status_DTC_B1:
      v1 === true
        ? getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_DTC_B1`)
        : undefined,
    t_vaccinal_status_VPO_1:
      v1 === true
        ? getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_VPO_1`)
        : undefined,
    t_vaccinal_status_pneumo_1:
      v1 === true
        ? getField(
            r,
            `s_vaccinal_status.s_six_weeks.s_vaccinal_status_pneumo_1`
          )
        : undefined,
    t_vaccinal_status_rota_1:
      v1 === true
        ? getField(r, `s_vaccinal_status.s_six_weeks.s_vaccinal_status_rota_1`)
        : undefined,

    t_vaccinal_status_DTC_B2:
      v2 === true
        ? getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_DTC_B2`)
        : undefined,
    t_vaccinal_status_VPO_2:
      v2 === true
        ? getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_VPO_2`)
        : undefined,
    t_vaccinal_status_pneumo_2:
      v2 === true
        ? getField(
            r,
            `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_pneumo_2`
          )
        : undefined,
    t_vaccinal_status_rota_2:
      v2 === true
        ? getField(r, `s_vaccinal_status.s_ten_weeks.s_vaccinal_status_rota_2`)
        : undefined,

    t_vaccinal_status_DTC_B3:
      v3 === true
        ? getField(
            r,
            `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_DTC_B3`
          )
        : undefined,
    t_vaccinal_status_VPO_3:
      v3 === true
        ? getField(
            r,
            `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_VPO_3`
          )
        : undefined,
    t_vaccinal_status_pneumo_3:
      v3 === true
        ? getField(
            r,
            `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_pneumo_3`
          )
        : undefined,
    t_vaccinal_status_vpi:
      v3 === true
        ? getField(r, `s_vaccinal_status.s_forteen_weeks.s_vaccinal_status_vpi`)
        : undefined,

    t_vaccinal_status_RR1:
      v4 === true
        ? getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_RR1`)
        : undefined,
    t_vaccinal_status_VAA:
      v4 === true
        ? getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_VAA`)
        : undefined,
    t_vaccinal_status_vit_A:
      v4 === true
        ? getField(r, `s_vaccinal_status.s_nine_months.s_vaccinal_status_vit_A`)
        : undefined,

    t_vaccinal_status_RR2:
      v5 === true
        ? getField(r, `s_vaccinal_status.s_fifty_months.s_vaccinal_status_RR2`)
        : undefined,
    t_vaccinal_status_MEG:
      v5 === true
        ? getField(r, `s_vaccinal_status.s_fifty_months.s_vaccinal_status_MEG`)
        : undefined,
  };

  // //###########################################################

  // if (getAgeInDays(c) >= 0) {
  //   if (vaccinal_status_BCG !== `yes`) vaccinationArray.push(`vaccinal_status_BCG`);
  //   if (vaccinal_status_VPO_0 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_0`);
  // }
  // if (getAgeInDays(c) >= 42) {
  //   if (vaccinal_status_DTC_B1 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B1`);
  //   if (vaccinal_status_VPO_1 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_1`);
  //   if (vaccinal_status_pneumo_1 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_1`);
  //   if (vaccinal_status_rota_1 !== `yes`) vaccinationArray.push(`vaccinal_status_rota_1`);
  // }
  // if (getAgeInDays(c) >= 70) {
  //   if (vaccinal_status_DTC_B2 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B2`);
  //   if (vaccinal_status_VPO_2 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_2`);
  //   if (vaccinal_status_pneumo_2 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_2`);
  //   if (vaccinal_status_rota_2 !== `yes`) vaccinationArray.push(`vaccinal_status_rota_2`);
  // }
  // if (getAgeInDays(c) >= 98) {
  //   if (vaccinal_status_DTC_B3 !== `yes`) vaccinationArray.push(`vaccinal_status_DTC_B3`);
  //   if (vaccinal_status_VPO_3 !== `yes`) vaccinationArray.push(`vaccinal_status_VPO_3`);
  //   if (vaccinal_status_pneumo_3 !== `yes`) vaccinationArray.push(`vaccinal_status_pneumo_3`);
  //   if (vaccinal_status_vpi !== `yes`) vaccinationArray.push(`vaccinal_status_vpi`);
  // }
  // if (getAgeInMonths(c) >= 9) {
  //   if (vaccinal_status_RR1 !== `yes`) vaccinationArray.push(`vaccinal_status_RR1`);
  //   if (vaccinal_status_VAA !== `yes`) vaccinationArray.push(`vaccinal_status_VAA`);
  //   if (vaccinal_status_vit_A !== `yes`) vaccinationArray.push(`vaccinal_status_vit_A`);
  // }
  // if (getAgeInMonths(c) >= 15) {
  //   if (vaccinal_status_RR2 !== `yes`) vaccinationArray.push(`vaccinal_status_RR2`);
  //   if (vaccinal_status_MEG !== `yes`) vaccinationArray.push(`vaccinal_status_MEG`);
  // }
}

function getTaskStart(eventPosition, listOfMap, defaultValue = 4) {
  // listOfMap => [{index:2, value:5}, {index:1, value:3}];
  if (Array.isArray(listOfMap)) {
    for (let i = 0; i < listOfMap.length; i++) {
      const m = listOfMap[i];
      if (eventPosition === m.index) {
        return m.value;
      }
    }
  }
  return defaultValue;
}

function isActiveOralCombinationPillFamilyPlanning(contact, report) {
  return isActiveFamilyPlanning(contact, report, `oral_combination_pill`);
}

function isActiveInjectibleFamilyPlanning(contact, report) {
  return isActiveFamilyPlanning(contact, report, `injectible`);
}
 
function getAgeInMilliseconds(contact) {
  if (notNull(contact.contact.date_of_birth)) {
    const birthDate = new Date(contact.contact.date_of_birth);
    const ageInMs = new Date(Date.now() - birthDate.getTime());
    return ageInMs;
  }
  return null;
}

function getAgeInYear(contact, withUtc = true) {
  var ageInMs = DateUtils.getAgeInMilliseconds(contact);
  if (ageInMs !== null) {
    const year = withUtc ? ageInMs.getUTCFullYear() : ageInMs.getFullYear();
    return Math.abs(year - 1970);
    // return Math.round(ageInMs.getTime() / (1000 * 60 * 60 * 24 *365));
  }
  return null;
}

function getAgeInMonths(contact, round = false) {
  var ageInMs = getAgeInMilliseconds(contact);
  if (ageInMs !== null) {
    const ageInMonth = ageInMs.getTime() / (1000 * 60 * 60 * 24 * 30);
    return round ? Math.round(ageInMonth) : ageInMonth;
    // return (Math.abs(ageInMs.getFullYear() - 1970) * 12) + ageInMs.getMonth();
  }
  return null;
}

function hasAvailableStock(contact, reports) {
  return true;
}

function isChildUnder5(contact) {
  var childAge = getAgeInMonths(contact);
  if (childAge !== null) {
    return childAge < 60;
  }
  return false;
}

function getAgeInDays(contact) {
  // var days = (new Date() - new Date(1995, 11, 4)) / (1000 * 60 * 60 * 24);
  var ageInMs = getAgeInMilliseconds(contact);
  if (notNull(ageInMs)) {
    return ageInMs / (1000 * 60 * 60 * 24);
  }
  return null;
}

function isVaccinAgeLimit(contact) {
  var age = getAgeInDays(contact);
  return age !== null && age < 517;
}

function canApplies(contact, report, formNames) {
  const isPerson = contact.contact && contact.contact.type === `person`;
  // const isPerson = contact.contact && contact.contact.type === `person` && user.parent.type !== `district_hospital`;
  var isForm = report.form === formNames;
  if (Array.isArray(formNames)) {
    isForm = formNames.includes(report.form);
  }

  return (
    isTrue(isPerson) &&
    isTrue(isForm) &&
    notDeleted(contact, report) &&
    isAlive(contact.contact, contact.reports)
  );
}

function MaxVal(arrayData) {
  return Math.max(...arrayData);
  // //--------------------------------------------
  // // return Math.max.apply(null, arrayData);
  // //--------------------------------------------
  // var al = arrayData.length;
  // m = arrayData[al - 1];
  // while (al--) {
  //   if (arrayData[al] > m) {
  //     m = arrayData[al];
  //   }
  // }
  // return m;
}

module.exports = {
  today,
  MS_IN_DAY,
  MAX_DAYS_IN_PREGNANCY,
  getChildPatologie,
  getChildPatologiePromptitude,
  previousDate,
  getDateInFormat,
  isBetween21and20,
  isFormBetween21and20,
  toDateString,
  getTimeForMidnight,
  isAlive,
  getField,
  getFollowUpCount,
  R_Date,
  getHouseholdId,
  isPatient,
  getDateMS,
  isValidDate,
  addDays,
  canApplies,
  MaxVal,
  isReportValid,
  hasAvailableStock,
  getTaskStart,
  isDelivery,
  isPregnancyForm,
  isPregnancyFollowUpForm,
  isPostnatalFollowUpForm,
  getMostRecentReport,
  isFormArraySubmittedInWindow,
  isFormArraySubmittedInWindowExcludeLastReport,
  getLMPDateFromPregnancy,
  getSubsequentPregnancyFollowUps,
  getSubsequentPregnancies,
  getSubsequentDeliveries,
  isPregnancyTerminatedByAbortionOrMiscarriage,
  notNull,
  isTrue,
  notDeleted,
  isPregnant,
  isActiveFamilyPlanning,
  isActiveOralCombinationPillFamilyPlanning,
  isActiveInjectibleFamilyPlanning,
  isNewDelivery,
  getMostRecentVaccinationData,
  isChildUnder5,
  getAgeInMonths,
  getAgeInDays,
  isVaccinAgeLimit,
  isChws,
  isSupervisor,
  startEnd21and20Date,
  isGreaterOrEqual,
  isLessOrEqual,
};
