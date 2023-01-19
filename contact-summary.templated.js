/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
const { getPcimeConstantsValue } = require(`./contact-summary-extras`);

const { isAlive, getMostRecentReport, getField, isExist, isPregnant, isAliveByReports, isDelivery, isNewDelivery } = require(`./utils`);

const thisContact = contact;
const thisLineage = lineage;
const allReports = reports;
const isPersonAlive = isAlive(thisContact); //isAliveByReports(allReports)
const isActivePregnate = isPregnant(thisContact, allReports);
const isDeliveryPerson = isDelivery(allReports);
const isNewDeliveryPerson = isNewDelivery(allReports);
const deathReport = getMostRecentReport(allReports, [`death_report`]);
const pcimeConstance = getPcimeConstantsValue(allReports);

function isFamilyPerson() {
  try {
    if (isExist(thisLineage)) {
      if (isExist(thisContact.parent)) {
        return thisLineage[0].type === `clinic` && thisLineage[0]._id === thisContact.parent._id;
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
  isFamilyPerson: isFamilyPerson(),
  show_pregnancy_form: !isActivePregnate,
  show_delivery_form: !isNewDeliveryPerson,
  show_women_emergency_form: isActivePregnate || isDeliveryPerson
};
 
var fields = [
  // { appliesToType: `person`, label: `patient_id`, value: thisContact.patient_id, width: 4 },
  // { appliesToType: `person`, label: `person.field.alternate_phone`, value: thisContact.phone_alternate, width: 4 },
  { appliesToType: `person`, appliesIf: () => isExist(thisContact.date_of_birth), label: `contact.age`, value: thisContact.date_of_birth, width: 4, filter: `age` }, 
  { appliesToType: `person`, appliesIf: () => isExist(thisContact.sex), label: `contact.sex`, value: `contact.sex.${thisContact.sex}`, translate: true, width: 4 }, 
  { appliesToType: `person`, appliesIf: () => isExist(thisContact.phone) || isExist(thisContact.phone_alternate), label: `person.field.phone`, value: `${thisContact.phone} \n ${thisContact.phone_alternate}`, width: 4 }, 
  { appliesToType: `person`, appliesIf: () => isExist(thisContact.external_id), label: `contact.external_id`, value: thisContact.external_id, width: 4 }, 
  { appliesToType: `person`, appliesIf: () => isExist(thisLineage), label: `contact.parent`, value: thisLineage, filter: `lineage` }, 
  { appliesToType: `person`, appliesIf: () => isExist(thisContact.notes), label: `contact.notes`, value: thisContact.notes, width: 12 }, 
  // { appliesToType: `!person`, label: `contact`, value: thisContact.contact && thisContact.contact.name, width: 4 }, 
  // { appliesToType: `!person`, label: `contact.phone`, value: thisContact.contact && thisContact.contact.phone, width: 4 },
  { appliesToType: `!person`, appliesIf: () => thisContact.type !== 'clinic' && isExist(thisContact.external_id), label: `contact.external_id`, value: thisContact.external_id, width: 4 }, 
  { appliesToType: `!person`, appliesIf: () => isExist(thisContact.notes), label: `contact.notes`, value: thisContact.notes, width: 12 }, 
  { appliesToType: `!person`, appliesIf: () => isExist(thisContact.parent) && isExist(thisLineage), label: `contact.parent`, value: thisLineage, filter: `lineage` } 
];

// if (thisContact.short_name) fields.unshift({ appliesToType: `person`, label: `contact.short_name`, value: thisContact.short_name, width: 4 });

var cards = [
  {
    label: `contact.profile.death.title`,
    appliesToType: `person`,
    appliesIf: () => !isPersonAlive,
    fields: function () {
      var dateOfDeath, placeOfDeath, data = [];
      if (deathReport) {
        placeOfDeath = getField(deathReport, `death_place`);
        if(isExist(placeOfDeath)) {
          data.push({ label: `contact.profile.death.place`, value: placeOfDeath, translate: true, width: 6 });
        }
        if (isExist(getField(deathReport, `s_death`))) {
          dateOfDeath = getField(deathReport, `s_death.s_death_date`);
        }
      } else if (thisContact.date_of_death){
        dateOfDeath = thisContact.date_of_death;
      }
      if(isExist(dateOfDeath)) {
        data.push({ label: `contact.profile.death.date`, value: dateOfDeath, filter:`simpleDate`, translate: true, width: 6 });
      }
      return data;
    }
  },

  {
    label: `contact.patient.constants`,
    appliesToType: `person`,
    appliesIf:function () {
      return isPersonAlive && pcimeConstance.appliesIf;
    },
    fields: function () {
      var data = [];
      if(isExist(pcimeConstance.pb)) data.push({ label: `contact.patient.pb`, value: pcimeConstance.pb, translate: true, width: 5, icon: (r) => isHighRisk(r) ? 'risk' : ''});
      if(isExist(pcimeConstance.temperature)) data.push({ label: `contact.patient.temperature`, value: pcimeConstance.temperature, translate: true, width: 4 });
      if(isExist(pcimeConstance.weight)) data.push({ label: `contact.patient.weight`, value: pcimeConstance.weight, translate: true, width: 3 });
      return data;
    }
  },

  // {
  //   label: `label.pregnancy`,
  //   appliesToType: `person`,
  //   appliesIf: function (report) {
  //     return isPregnant(c, reports);
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
  fields: fields
};

