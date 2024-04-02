import { Helmet } from 'react-helmet-async';

interface IMeta {
  title: string;
  canonical?: string;
  description?: string;
  alternate?: string;
  robots?: {
    name?: string;
    index: 'index' | 'noindex';
    follow: 'follow' | 'nofollow';
  };
}
const Meta = ({ title, description, canonical, alternate, robots }: IMeta) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {alternate ? <link rel="alternate" href={alternate} /> : null}
      {robots ? <meta name={robots.name || 'robots'} content={`${robots.index}, ${robots.follow}`} /> : null}
      {description ? <meta name="description" content={description} /> : null}
    </Helmet>
  );
};

export default Meta;
