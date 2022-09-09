const HeadShareCardMarkup = props => {
  let domain
  let url
  if (typeof window !== 'undefined') {
    domain = window.location.hostname
    url = window.location.href.split('?')[0]
  }
  return (
    <>
      <meta name="description" content={props.description} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={domain} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </>
  )
}

export default HeadShareCardMarkup
