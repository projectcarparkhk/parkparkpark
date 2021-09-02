import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { StyledText } from '../../components/StyledText'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import translations from '../../locales'
import { PriceDetail } from '../../types/api/CarparkResponse'
import {
  parseDayData,
  parseHourData,
  parseTimeData,
} from '../../utils/parseData'
interface IProps {
  priceDetails: PriceDetail[]
}

const useStyles = makeStyles((theme: Theme) => ({
  tableTitle: {
    padding: theme.spacing(0.5, 1),
    minWidth: '25%',
  },
  tableCell: {
    padding: theme.spacing(0.5, 1),
  },
}))

const PriceDetailTable = ({ priceDetails }: IProps) => {
  const classes = useStyles()
  const {locale} = useRouter();
  const fallbackLocale = locale || 'zh';
  const {
    priceDetailsDayLabel,
    priceDetailsTimeLabel,
    priceDetailsHourLabel,
    priceDetailsPriceLabel,
  } = translations[fallbackLocale]

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {priceDetails.map((detail) => (
            <TableRow key={`${detail.day}_${detail.hr}_${detail.price}`}>
              <TableCell className={classes.tableCell}>
                <StyledText size="body1">
                  {parseDayData(detail.day, fallbackLocale as SupportedLanguages)}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="body1">
                  {parseTimeData(detail.time, fallbackLocale as SupportedLanguages)}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="body1">
                  {parseHourData(detail.hr, fallbackLocale as SupportedLanguages)}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="body1">{`$ ${detail.price}`}</StyledText>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PriceDetailTable
