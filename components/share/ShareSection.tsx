import { makeStyles, Theme } from '@material-ui/core'
import React, { memo } from 'react'
import { StyledText } from '../../components/StyledText'
import { useRouter } from 'next/router'
import translations from '../../locales'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import LinkIcon from '@material-ui/icons/Link'
import FacebookIcon from '@material-ui/icons/Facebook'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { FacebookShareButton, WhatsappShareButton } from 'react-share'
import { useGetWindow } from '../../hooks/useGetWindow'

const useStyles = makeStyles((theme: Theme) => ({
  subSection: {
    margin: theme.spacing(2, 0),
  },
  infoTitle: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  shareContainer: {
    display: 'flex',
    alignItem: 'center',
  },
  shareBtnContainer: {
    display: 'flex',
    alignItem: 'center',
  },
  shareBtn: {
    ...theme.typography.h4,
    '&:hover': {
      color: theme.palette.grey[400],
    },
    marginRight: theme.spacing(2),
  },
  shareText: { display: 'flex', alignItems: 'center' },
}))

const ShareSection = () => {
  const classes = useStyles()
  const router = useRouter()
  const fallbackLocale = (router.locale as SupportedLanguages) || 'zh'
  const { shareLabel } = translations[fallbackLocale]

  const windowObj = useGetWindow()
  return (
    <div className={classes.subSection}>
      <div className={classes.shareContainer}>
        <div className={classes.shareText}>
          <StyledText
            bold
            inline
            size="subtitle1"
            className={classes.infoTitle}
          >
            {shareLabel}
          </StyledText>
        </div>
        <div className={classes.shareBtnContainer}>
          <LinkIcon
            className={classes.shareBtn}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}
          />
          <FacebookShareButton
            children={<FacebookIcon className={classes.shareBtn} />}
            url={windowObj ? windowObj.location.href : ''}
          />
          <WhatsappShareButton
            children={<WhatsAppIcon className={classes.shareBtn} />}
            url={windowObj ? windowObj.location.href : ''}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(ShareSection)
