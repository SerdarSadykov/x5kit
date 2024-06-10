import { makeUiStyles } from '../../theme'

export const useStyles = makeUiStyles(
  (theme) => ({
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spaces.x4,
    },
    leftArrow: { marginRight: 'auto' },
    rightArrow: { marginLeft: 'auto' },
    dropdowns: {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, 0)',
      display: 'flex',
      zIndex: 9,
      '& > [dropdown-disabled]:first-child': {
        marginRight: theme.spaces.x4,
      },
    },
  }),
  'calendar-header',
)
