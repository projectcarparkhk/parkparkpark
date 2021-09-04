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
import {
  parseDayDetailData,
  parseHourData,
  parseTimeData,
} from '../../utils/parseData'
import { PromotionDetail } from '../../types/api/PostResponse'
interface IProps {
  promotionDetails: PromotionDetail[]
}

const useStyles = makeStyles((theme: Theme) => ({
  tableTitle: {
    padding: theme.spacing(0.5, 1),
    whiteSpace: 'nowrap'
  },
  tableCell: {
    padding: theme.spacing(0.5, 1),
    whiteSpace: 'nowrap'

  },
  table: { overflowX: 'scroll' }
}))

const PromotionDetailTable = ({ promotionDetails }: IProps) => {
  const classes = useStyles()
  const { locale } = useRouter()
  const fallbackLocale = locale || 'zh'
  console.log(promotionDetails)
  const hasData = promotionDetails.length > 0
  const headers = hasData ? Object.keys(promotionDetails[0]) : []
  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        aria-label="simple table"
        className={classes.table}
      >
        <TableHead>
          <TableRow>
            {/* {headers.map((key) => (
              <TableCell key={key} className={classes.tableTitle}>
                <StyledText size="h6">
                  {translations[fallbackLocale][`promotion_${key}_label`]}
                </StyledText>
              </TableCell>
            ))} */}
            <TableCell  className={classes.tableTitle}>
                <StyledText size="h6">
                  {}
                </StyledText>
              </TableCell>
              <TableCell  className={classes.tableTitle}>
                <StyledText size="h6">
                  {}
                </StyledText>
              </TableCell>
              <TableCell  className={classes.tableTitle}>
                <StyledText size="h6">
                  {}
                </StyledText>
              </TableCell>
              <TableCell  className={classes.tableTitle}>
                <StyledText size="h6">
                  {}
                </StyledText>
              </TableCell>
              <TableCell  className={classes.tableTitle}>
                <StyledText size="h6">
                  {}
                </StyledText>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promotionDetails.map((detail: PromotionDetail) => (
            <TableRow key={`${detail.day}_${detail.time}_${detail.hr}`}>
              {/* {(Object.keys(detail) as  Array<keyof PromotionDetail>).map((key) => {
                let renderData
                if (key === 'day') {
                  renderData = parseDayDetailData(
                    detail.day,
                    fallbackLocale as SupportedLanguages
                  )
                } else if (key === 'time') {
                  renderData = parseTimeData(
                    detail.time,
                    fallbackLocale as SupportedLanguages
                  )
                } else {
                  renderData = detail[key];

                }
                return (
                  <TableCell className={classes.tableCell}>
                    <StyledText size="subtitle2">{renderData}</StyledText>
                  </TableCell>
                )
              })} */}
              <TableCell className={classes.tableCell}>
                <StyledText size="subtitle2">
                  {parseTimeData(
                    detail.time,
                    fallbackLocale as SupportedLanguages
                  )}
                </StyledText>
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
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PromotionDetailTable
