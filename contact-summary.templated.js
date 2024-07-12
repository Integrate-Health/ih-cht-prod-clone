/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
const { getPcimeConstantsValue } = require(`./contact-summary-extras`);

const {
  isAlive,
  getMostRecentReport,
  getField,
  notNull,
  isPregnant,
  isDelivery,
  getMostRecentVaccinationData,
  isNewDelivery,
  getDateInFormat,
  isReportValid,
} = require(`./utils`);

const thisContact = contact;
const thisLineage = lineage;
const allReports = reports;
const isPersonAlive = isAlive(thisContact, allReports);
const isActivePregnate = isPregnant(allReports);
const isDeliveryPerson = isDelivery(allReports);
const isNewDeliveryPerson = isNewDelivery(allReports);
const deathReport = getMostRecentReport(allReports, [`death_report`]);
const pcimeConstance = getPcimeConstantsValue(allReports);
const vaccination = getMostRecentVaccinationData(thisContact, allReports);


function isFamilyPerson() {
  try {
    if (notNull(thisLineage)) {
      if (notNull(thisContact.parent)) {
        return (
          thisLineage[0].type === `clinic` &&
          thisLineage[0]._id === thisContact.parent._id
        );
      }
      return thisLineage[0].type === `clinic`;
    }
  } catch (error) {
    return false;
  }
  return false;
}

function isHighRisk(report) {
  return true;
}

var context = {
  alive: isPersonAlive,
  muted: false,
  // muted: !isTrue(thisContact.muted),
  is_family_person: isFamilyPerson(),
  show_pregnancy_form: !isActivePregnate,
  show_delivery_form: !isNewDeliveryPerson,
  show_women_emergency_form: isActivePregnate || isDeliveryPerson,

  t_vaccinal_status_BCG: vaccination.t_vaccinal_status_BCG,
  t_vaccinal_status_VPO_0: vaccination.t_vaccinal_status_VPO_0,
  t_vaccinal_status_DTC_B1: vaccination.t_vaccinal_status_DTC_B1,
  t_vaccinal_status_VPO_1: vaccination.t_vaccinal_status_VPO_1,
  t_vaccinal_status_pneumo_1: vaccination.t_vaccinal_status_pneumo_1,
  t_vaccinal_status_rota_1: vaccination.t_vaccinal_status_rota_1,
  t_vaccinal_status_DTC_B2: vaccination.t_vaccinal_status_DTC_B2,
  t_vaccinal_status_VPO_2: vaccination.t_vaccinal_status_VPO_2,
  t_vaccinal_status_pneumo_2: vaccination.t_vaccinal_status_pneumo_2,
  t_vaccinal_status_rota_2: vaccination.t_vaccinal_status_rota_2,
  t_vaccinal_status_DTC_B3: vaccination.t_vaccinal_status_DTC_B3,
  t_vaccinal_status_VPO_3: vaccination.t_vaccinal_status_VPO_3,
  t_vaccinal_status_pneumo_3: vaccination.t_vaccinal_status_pneumo_3,
  t_vaccinal_status_vpi: vaccination.t_vaccinal_status_vpi,
  t_vaccinal_status_RR1: vaccination.t_vaccinal_status_RR1,
  t_vaccinal_status_VAA: vaccination.t_vaccinal_status_VAA,
  t_vaccinal_status_vit_A: vaccination.t_vaccinal_status_vit_A,
  t_vaccinal_status_RR2: vaccination.t_vaccinal_status_RR2,
  t_vaccinal_status_MEG: vaccination.t_vaccinal_status_MEG,
};

var aliveFields = [
  // { appliesToType: `person`, label: `patient_id`, value: thisContact.patient_id, width: 4 },
  // { appliesToType: `person`, label: `person.field.alternate_phone`, value: thisContact.phone_alternate, width: 4 },
  {
    appliesToType: `person`,
    appliesIf: () => notNull(thisContact.date_of_birth),
    label: `contact.age`,
    value: thisContact.date_of_birth,
    width: 4,
    filter: `age`,
  },
  {
    appliesToType: `person`,
    appliesIf: () => notNull(thisContact.sex),
    label: `contact.sex`,
    value: `contact.sex.${thisContact.sex}`,
    translate: true,
    width: 4,
  },
  {
    appliesToType: `person`,
    appliesIf: () =>
      notNull(thisContact.phone) || notNull(thisContact.phone_alternate),
    label: `person.field.phone`,
    value: `${thisContact.phone} \n ${thisContact.phone_alternate}`,
    width: 4,
  },
  {
    appliesToType: `person`,
    appliesIf: () => notNull(thisContact.external_id),
    label: `contact.external_id`,
    value: thisContact.external_id,
    width: 4,
  },
  {
    appliesToType: `person`,
    appliesIf: () => notNull(thisLineage),
    label: `contact.parent`,
    value: thisLineage,
    filter: `lineage`,
  },
  {
    appliesToType: `person`,
    appliesIf: () => notNull(thisContact.notes),
    label: `contact.notes`,
    value: thisContact.notes,
    width: 12,
  },
  // { appliesToType: `!person`, label: `contact`, value: thisContact.contact && thisContact.contact.name, width: 4 },
  // { appliesToType: `!person`, label: `contact.phone`, value: thisContact.contact && thisContact.contact.phone, width: 4 },
  {
    appliesToType: `!person`,
    appliesIf: () =>
      thisContact.type !== `clinic` && notNull(thisContact.external_id),
    label: `contact.external_id`,
    value: thisContact.external_id,
    width: 4,
  },
  {
    appliesToType: `!person`,
    appliesIf: () => notNull(thisContact.notes),
    label: `contact.notes`,
    value: thisContact.notes,
    width: 12,
  },
  {
    appliesToType: `!person`,
    appliesIf: () => notNull(thisContact.parent) && notNull(thisLineage),
    label: `contact.parent`,
    value: thisLineage,
    filter: `lineage`,
  },
];

if (thisContact.short_name) {
  aliveFields.unshift({
    appliesToType: `person`,
    label: `contact.short_name`,
    value: thisContact.short_name,
    width: 4,
  });
}

var deathFields = [
  {
    appliesToType: `person`,
    appliesIf: () => !isPersonAlive,
    label: `contact.person.death`,
    value: ``,
    width: 6,
  },
];

var cards = [
  {
    label: `contact.profile.death.title`,
    appliesToType: `person`,
    appliesIf: () => !isPersonAlive,
    fields: function () {
      var dateOfDeath;
      var placeOfDeath;
      var data = [];

      if (isReportValid(deathReport)) {
        placeOfDeath = getField(deathReport, `death_place`);
        if (notNull(placeOfDeath)) {
          data.push({
            label: `contact.profile.death.place`,
            value: placeOfDeath,
            translate: true,
            width: 6,
          });
        }
        if (notNull(getField(deathReport, `s_death`))) {
          dateOfDeath = getField(deathReport, `s_death.s_death_date`);
        }
      } else if (thisContact.date_of_death) {
        dateOfDeath = thisContact.date_of_death;
      }
      if (notNull(dateOfDeath)) {
        data.push({
          label: `contact.profile.death.date`,
          value: getDateInFormat(dateOfDeath, 0, `fr`),
          // filter: `simpleDate`,
          translate: true,
          width: 6,
        });
      }
      return data;
    },
  },

  {
    label: `contact.patient.constants`,
    appliesToType: `person`,
    appliesIf: function () {
      return isPersonAlive && pcimeConstance.appliesIf;
    },
    fields: function () {
      var data = [];
      if (notNull(pcimeConstance.pb))
        data.push({
          label: `contact.patient.pb`,
          value: pcimeConstance.pb,
          translate: true,
          width: 5,
          icon: (r) => (isHighRisk(r) ? `risk` : ``),
        });
      if (notNull(pcimeConstance.temperature))
        data.push({
          label: `contact.patient.temperature`,
          value: pcimeConstance.temperature,
          translate: true,
          width: 4,
        });
      if (notNull(pcimeConstance.weight))
        data.push({
          label: `contact.patient.weight`,
          value: pcimeConstance.weight,
          translate: true,
          width: 3,
        });
      return data;
    },
    modifyContext: function (ctx, r) {
      // ctx.form_uuid = r._id;
      ctx.t_vaccinal_status_BCG = vaccination.t_vaccinal_status_BCG;
      ctx.t_vaccinal_status_VPO_0 = vaccination.t_vaccinal_status_VPO_0;
      ctx.t_vaccinal_status_DTC_B1 = vaccination.t_vaccinal_status_DTC_B1;
      ctx.t_vaccinal_status_VPO_1 = vaccination.t_vaccinal_status_VPO_1;
      ctx.t_vaccinal_status_pneumo_1 = vaccination.t_vaccinal_status_pneumo_1;
      ctx.t_vaccinal_status_rota_1 = vaccination.t_vaccinal_status_rota_1;
      ctx.t_vaccinal_status_DTC_B2 = vaccination.t_vaccinal_status_DTC_B2;
      ctx.t_vaccinal_status_VPO_2 = vaccination.t_vaccinal_status_VPO_2;
      ctx.t_vaccinal_status_pneumo_2 = vaccination.t_vaccinal_status_pneumo_2;
      ctx.t_vaccinal_status_rota_2 = vaccination.t_vaccinal_status_rota_2;
      ctx.t_vaccinal_status_DTC_B3 = vaccination.t_vaccinal_status_DTC_B3;
      ctx.t_vaccinal_status_VPO_3 = vaccination.t_vaccinal_status_VPO_3;
      ctx.t_vaccinal_status_pneumo_3 = vaccination.t_vaccinal_status_pneumo_3;
      ctx.t_vaccinal_status_vpi = vaccination.t_vaccinal_status_vpi;
      ctx.t_vaccinal_status_RR1 = vaccination.t_vaccinal_status_RR1;
      ctx.t_vaccinal_status_VAA = vaccination.t_vaccinal_status_VAA;
      ctx.t_vaccinal_status_vit_A = vaccination.t_vaccinal_status_vit_A;
      ctx.t_vaccinal_status_RR2 = vaccination.t_vaccinal_status_RR2;
      ctx.t_vaccinal_status_MEG = vaccination.t_vaccinal_status_MEG;
    },
  },

  // {
  //   label: `label.pregnancy`,
  //   appliesToType: `person`,
  //   appliesIf: function (report) {
  //     return isPregnant(allReports);
  //   },
  //   fields: [
  //     {
  //       label: `Visits`,
  //       value: `label.visits.of`,
  //       translate: true,
  //       context: {
  //         count:function (report) {
  //           return getSubsequentVisits(allReports, report).length;
  //         },
  //         total: 4,
  //       },
  //     },
  //   ],
  // },
];

module.exports = {
  context: context,
  cards: cards,
  fields: isPersonAlive ? aliveFields : deathFields,
};
