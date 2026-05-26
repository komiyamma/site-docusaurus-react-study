import React from 'react';
import PrimaryMenu from '@theme-original/Navbar/MobileSidebar/PrimaryMenu';
import type PrimaryMenuType from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import type {WrapperProps} from '@docusaurus/types';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {categories} from '@site/src/components/CategoryBar';
import {getModuleNumberFromPath} from '@site/src/data/reactModules';
import styles from './styles.module.css';

type Props = WrapperProps<typeof PrimaryMenuType>;

export default function PrimaryMenuWrapper(props: Props): React.ReactNode {
  const {pathname} = useLocation();
  const moduleNumber = getModuleNumberFromPath(pathname);
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <>
      <div className={styles.categorySection}>
        <div className={styles.categorySectionTitle}>カテゴリ</div>
        <ul className="menu__list">
          {categories.map((cat) => {
            const isActive =
              moduleNumber !== null && moduleNumber >= cat.start && moduleNumber <= cat.end;

            return (
              <li key={cat.sidebarId} className="menu__list-item">
                <Link
                  to={cat.path}
                  className={`menu__link ${isActive ? 'menu__link--active' : ''}`}
                  onClick={() => mobileSidebar.toggle()}
                >
                  {cat.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <hr className={styles.divider} />

      <PrimaryMenu {...props} />
    </>
  );
}
