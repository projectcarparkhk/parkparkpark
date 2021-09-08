import {
  createStyles,
  FormControl,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core'
import React from 'react'
import { StyledText } from '../../components/StyledText'
import { useRouter } from 'next/router'
import translations from '../../locales'
import { withStyles } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import { IconButton } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import UndecoratedLink from '../UndecoratedLink'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    backgroundColor: '#333',
    padding: theme.spacing(3, 2),
  },
  label: {
    color: 'hsla(0,0%,100%,.7)',
  },
  aboutContainer: {
    color: 'hsla(0,0%,100%,.7)',
    margin: theme.spacing(2, 0),
  },
  separator: {
    color: 'hsla(0,0%,100%,.7)',
    margin: theme.spacing(0, 1),
  },
  iconsContainer: {
    margin: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  button: { backgroundColor: '#707070', margin: theme.spacing(2) },
  icon: { color: '#333' },
  copyright: {
    color: 'hsla(0,0%,100%,.7)',
  },
}))

const Footer = () => {
  const classes = useStyles()
  const router = useRouter()

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    router.push(`${router.query.slug}`, `${router.query.slug}`, {
      locale: event.target.value as string,
    })
  }

  const fallbackLocale = router.locale || 'zh'

  const { aboutParkLabel, termsLabel } = translations[fallbackLocale]

  const StyledButton = withStyles(() =>
    createStyles({
      root: {
        padding: '6px',
      },
    })
  )(IconButton)

  const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
      root: {
        'label + &': {
          marginTop: theme.spacing(3),
        },
      },
      input: {
        position: 'relative',
        backgroundColor: 'hsla(0,0%,100%,.06)',
        fontSize: 14,
        color: 'hsla(0,0%,100%,.7)',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
          borderRadius: 4,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
    })
  )(InputBase)

  return (
    <div className={classes.footer}>
      <FormControl variant="filled" fullWidth>
        <Select
          input={<BootstrapInput />}
          value={router.locale}
          onChange={handleSelectChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="zh">繁體中文</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.aboutContainer}>
        <UndecoratedLink href="/about">
          <StyledText size="subtitle2" inline>
            {aboutParkLabel}
          </StyledText>
        </UndecoratedLink>
        <StyledText size="subtitle2" inline className={classes.separator}>
          |
        </StyledText>
        <UndecoratedLink href="/terms">
          <StyledText size="subtitle2" inline>
            {termsLabel}
          </StyledText>
        </UndecoratedLink>
      </div>
      <div className={classes.iconsContainer}>
        <StyledButton className={classes.button}>
          <InstagramIcon className={classes.icon} />
        </StyledButton>
        <StyledButton className={classes.button}>
          <FacebookIcon className={classes.icon} />
        </StyledButton>
        <StyledButton className={classes.button}>
          <WhatsAppIcon className={classes.icon} />
        </StyledButton>
      </div>
      <StyledText size="subtitle2" className={classes.copyright}>
        © 2021 ParkParkPark. All Rights Reserved.
      </StyledText>
    </div>
  )
}

export default Footer
