import { css } from '@stitches/core'
// import { styled } from '@stitches/react'
// import { AuthProviders } from '../../types'

const buttonDefaultStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '6px',
  fontSize: '13px',
  padding: '10px 15px',
  cursor: 'pointer',
  borderWidth: '1px',
  borderStyle: 'solid',
  width: '100%',

  variants: {
    color: {
      default: {
        backgroundColor: 'white',
        color: 'gray',
        borderColor: 'lightgray',
        '&:hover': {
          backgroundColor: '#f8f8f8',
        },
      },
      primary: {
        backgroundColor: 'hsl(153 60.0% 53.0%)',
        borderColor: 'hsl(153 60.0% 45.0%)',
      },
    },
  },
})

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  icon?: React.ReactNode
  color?: 'default' | 'primary'
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'default',
  ...props
}) => {
  return (
    <button {...props} className={buttonDefaultStyles({ color: color })}>
      {props.icon}
      {children}
    </button>
  )
}

export { Button }
