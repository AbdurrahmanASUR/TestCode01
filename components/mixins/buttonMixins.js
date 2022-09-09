export const buttonMixins = theme => {
  return {
    height: 35,
    width: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.standard,
    }),
    '& > *': {
      transition: theme.transitions.create(['all'], {
        duration: 600,
      }),
    },
    '&:hover': {
      background: theme.palette.secondary.main,
      '& > *': {
        color: theme.palette.background.default,
      },
    },
  }
}
