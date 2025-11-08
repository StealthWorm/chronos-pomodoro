import { Link } from "react-router"

type RouterLinkProps = React.ComponentProps<'a'> & {
  children: React.ReactNode;
  href: string;
}

export function RouterLink({ href, children, ...props }: RouterLinkProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  )
}