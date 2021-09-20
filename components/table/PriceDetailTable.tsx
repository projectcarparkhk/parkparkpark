import { makeStyles, TableCell, TableRow, Theme } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { StyledText } from '../../components/StyledText'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import translations from '../../locales'
import { PriceDetail } from '../../types/api/CarparkResponse'
import {
  parseDayDetailData,
  parseHourData,
  parseTimeData,
} from '../../utils/parseTableData'
import DataTable from './DataTable'
interface IProps {
  priceDetails: PriceDetail[]
}

const useStyles = makeStyles((theme: Theme) => ({
  tableTitle: {
    padding: theme.spacing(0.7, 1.5),
    whiteSpace: 'nowrap',
  },
  tableCell: {
    padding: theme.spacing(0.7, 1.5),
    whiteSpace: 'nowrap',
  },
}))

const PriceDetailTable = ({ priceDetails }: IProps) => {
  const classes = useStyles()
  const { locale } = useRouter()
  const fallbackLocale = locale || 'zh'
  const {
    priceDetailsDayLabel,
    priceDetailsTimeLabel,
    priceDetailsHourLabel,
    priceDetailsPriceLabel,
  } = translations[fallbackLocale]

  return (
    <DataTable
      headerRow={
        <>
          <TableCell className={classes.tableTitle}>
            <StyledText size="h6">{priceDetailsDayLabel}</StyledText>
          </TableCell>
          <TableCell className={classes.tableTitle}>
            <StyledText size="h6">{priceDetailsTimeLabel}</StyledText>
          </TableCell>
          <TableCell className={classes.tableTitle}>
            <StyledText size="h6">{priceDetailsHourLabel}</StyledText>
          </TableCell>
          <TableCell className={classes.tableTitle}>
            <StyledText size="h6">{priceDetailsPriceLabel}</StyledText>
          </TableCell>
        </>
      }
      dataRows={
        <>
          {priceDetails.map((detail) => (
            <TableRow key={`${detail.day}_${detail.hr}_${detail.price}`}>
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">
                  {parseDayDetailData(
                    detail.day,
                    fallbackLocale as SupportedLanguages
                  )}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">
                  {parseTimeData(
                    detail.time,
                    fallbackLocale as SupportedLanguages
                  )}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">
                  {parseHourData(
                    detail.hr,
                    fallbackLocale as SupportedLanguages
                  )}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">{`$ ${detail.price}`}</StyledText>
              </TableCell>
            </TableRow>
          ))}
        </>
      }
    />
  )
}

export default PriceDetailTable
