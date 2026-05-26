import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { WebSiteJsonLd } from '../components/SEO/StructuredData';

const CategorySvg = require('@site/static/img/category.svg').default;

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}>
      <WebSiteJsonLd />
      <main>
        <HomepageFeatures CategorySvg={CategorySvg} />
      </main>
    </Layout>
  );
}
