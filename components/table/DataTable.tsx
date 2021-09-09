import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import React, { ReactNode } from 'react'

interface IProps {
  headerRow: ReactNode
  dataRows: ReactNode
}

const useStyles = makeStyles(() => ({
  table: { overflowX: 'scroll' },
}))

const DataTable = ({ headerRow, dataRows }: IProps) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>{headerRow}</TableRow>
        </TableHead>
        <TableBody>{dataRows}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
