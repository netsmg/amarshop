module.exports = {
  button: (mixin, variant = 'primary') => ({
    'display': 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    'padding': '0.75rem 1.5rem',
    'border-radius': '0.5rem',
    'font-weight': '600',
    'transition': 'all 150ms ease',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    ...(variant === 'primary' && {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      '&:hover:not(:disabled)': {
        backgroundColor: 'var(--color-primary-dark)'
      }
    }),
    ...(variant === 'secondary' && {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-text)',
      '&:hover:not(:disabled)': {
        backgroundColor: 'var(--color-secondary-dark)'
      }
    })
  })
};
