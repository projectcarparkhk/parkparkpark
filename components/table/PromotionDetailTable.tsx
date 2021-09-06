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
import { StyledText } from '../StyledText'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import translations from '../../locales'
import { parseDayDetailData, parseTimeData } from '../../utils/parseData'
import { PromotionDetail } from '../../types/api/PostResponse'
interface IProps {
  promotionDetails: PromotionDetail[]
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
  table: { overflowX: 'scroll' },
}))

const PromotionDetailTable = ({ promotionDetails }: IProps) => {
  const classes = useStyles()
  const { locale } = useRouter()
  const fallbackLocale = locale || 'zh'
  const {
    promotionConditionLabel,
    promotionDayLabel,
    promotionDiningLabel,
    promotionHrLabel,
    promotionMovieLabel,
    promotionSpendingLabel,
    promotionTimeLabel,
    hourLabel,
  } = translations[fallbackLocale]
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableTitle}>
              <StyledText size="h6">{promotionDayLabel}</StyledText>
            </TableCell>
            <TableCell className={classes.tableTitle}>
              <StyledText size="h6">{promotionTimeLabel}</StyledText>
            </TableCell>
            <TableCell className={classes.tableTitle}>
              <StyledText size="h6">{promotionHrLabel}</StyledText>
            </TableCell>
            <TableCell className={classes.tableTitle}>
              <StyledText size="h6">{promotionSpendingLabel}</StyledText>
            </TableCell>
            <TableCell className={classes.tableTitle}>
              <StyledText size="h6">{promotionMovieLabel}</StyledText>
            </TableCell>
            <TableCell className={classes.tableTitle}>
              <StyledText size="h6">{promotionDiningLabel}</StyledText>
            </TableCell>
            <TableCell className={classes.tableTitle}>
              <StyledText size="h6">{promotionConditionLabel}</StyledText>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promotionDetails.map((detail: PromotionDetail) => (
            <TableRow key={`${detail.day}_${detail.time}_${detail.hr}`}>
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
                  {`${detail.hr} ${hourLabel}`}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">
                  {detail.spending ? `$${detail.spending}` : ''}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">{detail.movie}</StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">
                  {detail.dining ? `$${detail.dining}` : ''}
                </StyledText>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">{detail.condition}</StyledText>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PromotionDetailTable
