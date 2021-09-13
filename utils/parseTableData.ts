import {
  durationTranslations,
  SupportedLanguages,
} from '../constants/SupportedLanguages'
import translations from '../locales'

export const parseDayDetailData = (
  dayString: string,
  locale: SupportedLanguages
) => {
  const {
    priceDetailsAllDaysLabel,
    toLabel,
    orLabel,
    monLabel,
    tueLabel,
    wedLabel,
    thuLabel,
    friLabel,
    satLabel,
    sunLabel,
    weekLabel,
    holidayLabel,
  } = translations[locale]

  const carparkDayField: { [key: string]: string } = {
    all: priceDetailsAllDaysLabel,
    to: toLabel,
    or: orLabel,
    mon: monLabel,
    tue: tueLabel,
    wed: wedLabel,
    thu: thuLabel,
    fri: friLabel,
    sat: satLabel,
    sun: sunLabel,
    week: weekLabel,
    h: holidayLabel,
  }

  if (dayString === 'all') {
    return carparkDayField[dayString]
  }
  const or = dayString.split(',')
  let parsedDays = carparkDayField.week
  or.forEach((subString, i) => {
    if (subString.includes('-')) {
      const days = subString.split('-')
      days.forEach((day, j) => {
        parsedDays += carparkDayField[day]
        if (j !== days.length - 1) {
          parsedDays += carparkDayField.to
        }
      })
    } else {
      parsedDays += carparkDayField[subString]
    }
    if (i !== or.length - 1) {
      parsedDays += carparkDayField.or
    }
  })
  return parsedDays
}

export const parseTimeData = (
  timeString: string,
  locale: SupportedLanguages
) => {
  const {
    allTimesLabel,
    beforeTimeEnterLabelPre,
    afterTimeEnterLabelPre,
    beforeTimeEnterLabelPost,
    afterTimeEnterLabelPost,
  } = translations[locale]
  const carparkTimeField: { [key: string]: string } = {
    all: allTimesLabel,
  }
  if (timeString === 'all') {
    return carparkTimeField[timeString]
  }
  if (timeString.includes('>')) {
    return (
      beforeTimeEnterLabelPre +
      timeString.replace('>', '') +
      ' ' +
      afterTimeEnterLabelPost
    )
  }
  if (timeString.includes('<')) {
    return (
      afterTimeEnterLabelPre +
      timeString.replace('<', '') +
      ' ' +
      beforeTimeEnterLabelPost
    )
  }
  return timeString
}

export const parseHourData = (
  hourString: string,
  locale: SupportedLanguages
) => {
  const carparkHourFields: { [key: string]: string } = {
    '0.5': durationTranslations['0.5'][locale],
    '1': durationTranslations['1'][locale],
    '1.5': durationTranslations['1.5'][locale],
    '2': durationTranslations['2'][locale],
  }
  return carparkHourFields[hourString]
}
