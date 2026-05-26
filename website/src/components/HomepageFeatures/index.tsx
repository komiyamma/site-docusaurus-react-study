import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {
  getModuleLabel,
  getReactIndexId,
  getReactStudyId,
  reactModules,
  type ReactModule,
} from '@site/src/data/reactModules';
import styles from './styles.module.css';

type HomepageFeaturesProps = {
  CategorySvg: React.ComponentType<React.ComponentProps<'svg'>>;
};

function Feature({
  module,
  CategorySvg,
}: {
  module: ReactModule;
} & HomepageFeaturesProps) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <Link to={`/docs/${getReactStudyId(module.start)}`}>
            <CategorySvg className={styles.featureSvg} role="img" />
          </Link>
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{module.title}</Heading>
          <p>
            {getModuleLabel(module)}を第{module.start}章から第{module.end}章までで学びます。
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures({
  CategorySvg,
}: HomepageFeaturesProps): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.intro}>
          <Heading as="h1">挫折しない React 入門</Heading>
          <p>コンポーネント、Hooks、状態管理、テスト、AI連携まで進む全290章の教材です。</p>
          <Link className="button button--primary button--lg" to={`/docs/${getReactIndexId()}`}>
            ロードマップを見る
          </Link>
        </div>
        <div className="row">
          {reactModules.map((module) => (
            <Feature key={module.title} module={module} CategorySvg={CategorySvg} />
          ))}
        </div>
      </div>
    </section>
  );
}
