import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {
  getModuleLabel,
  getModuleNumberFromPath,
  getModuleSidebarId,
  getReactStudyId,
  reactModules,
} from '@site/src/data/reactModules';
import styles from './styles.module.css';

type CategoryItem = {
  label: string;
  sidebarId: string;
  path: string;
  start: number;
  end: number;
};

export const categories: CategoryItem[] = reactModules.map((module, index) => ({
  label: getModuleLabel(module),
  sidebarId: getModuleSidebarId(index),
  path: `/docs/${getReactStudyId(module.start)}`,
  start: module.start,
  end: module.end,
}));

function isActiveCategory(pathname: string, category: CategoryItem): boolean {
  const moduleNumber = getModuleNumberFromPath(pathname);
  return moduleNumber !== null && moduleNumber >= category.start && moduleNumber <= category.end;
}

export default function CategoryBar(): React.ReactNode {
  const {pathname} = useLocation();

  return (
    <div className={styles.categoryBar}>
      <div className={styles.categoryBarInner}>
        {categories.map((cat) => {
          const isActive = isActiveCategory(pathname, cat);

          return (
            <Link
              key={cat.sidebarId}
              to={cat.path}
              className={`${styles.categoryLink} ${isActive ? styles.categoryLinkActive : ''}`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
