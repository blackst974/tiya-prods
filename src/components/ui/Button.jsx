import { Link } from 'react-router-dom';

export default function Button({
  to,
  href,
  variant = 'primary',
  size,
  arrow = false,
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, size ? `btn--${size}` : '', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span>{children}</span>
      {arrow && <span className="btn__arrow" aria-hidden="true">→</span>}
    </>
  );

  if (to) {
    return <Link to={to} className={classes} {...rest}>{content}</Link>;
  }
  if (href) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return <button type="button" className={classes} {...rest}>{content}</button>;
}
