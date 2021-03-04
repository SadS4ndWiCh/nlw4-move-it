import NextLink from 'next/link';

export function Link({ to, children, ...rest }) {
  return (
    <NextLink href={to} {...rest}>
      <a>
        { children }
      </a>
    </NextLink>
  )
}