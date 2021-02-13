import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { IconButton, Snackbar, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import CheckIcon from '@material-ui/icons/Check'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 15,
      paddingRight: 10
    },
    content: {
      flex: '1 0 auto'

    },
    cover: {
      width: 151
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  })
)

type TProps = {
  openProps: boolean
  closeProps: Function
};

const myName = `anyName_${(Math.random()).toFixed(4)}`

export default function helloModal ({ openProps, closeProps }: TProps) {
  const classes = useStyles()
  const [open, setOpen] = useState(openProps)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [name, setName] = useState(myName)

  const handleClose = () => {
    if (name === null || name === '') {
      setOpenSnackbar(true)
      return
    }
    setOpen(false)
    closeProps(name)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClose()
    }
  }

  return (
    <div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          Check display-name
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
      >
        <Card className={classes.root} style={{ boxShadow: 'none', height: 160 }}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="subtitle2" color="textSecondary">
                  * This App save Anything Information
                  <br/>
                  ** Please Input display-name
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <TextField
                  id="outlined-basic"
                  label="Input display-name"
                  variant="outlined"
                  autoFocus={true}
                  value={name}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                />
                <IconButton type="button" aria-label="submit" onClick={handleClose}>
                  <CheckIcon />
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://material-ui.com/static/images/cards/live-from-space.jpg"
              title="Image From material-ui.com"
            />
          </Card>
      </Dialog>
    </div>
  )
}

helloModal.defaultProps = {
  openProps: true,
  closeProps: undefined
}
