import React from 'react';
import Layout from '@theme-original/Navbar/Layout';
import type LayoutType from '@theme/Navbar/Layout';
import type {WrapperProps} from '@docusaurus/types';
import CategoryBar from '@site/src/components/CategoryBar';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): React.ReactNode {
  return (
    <>
      <Layout {...props} />
      <CategoryBar />
    </>
  );
}
