import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {
  getModuleSidebarId,
  getReactIndexId,
  getReactStudyId,
  reactModules,
} from './src/data/reactModules';

function generateModuleDocs(start: number, end: number) {
  return Array.from({length: end - start + 1}, (_, index) => ({
    type: 'doc' as const,
    id: getReactStudyId(start + index),
  }));
}

const moduleSidebars = Object.fromEntries(
  reactModules.map((module, index) => [
    getModuleSidebarId(index),
    [
      {
        type: 'category' as const,
        label: module.title,
        collapsible: false,
        collapsed: false,
        items: generateModuleDocs(module.start, module.end),
      },
    ],
  ]),
);

const sidebars: SidebarsConfig = {
  reactIndexSidebar: [{type: 'doc', id: getReactIndexId()}],
  ...moduleSidebars,
};

export default sidebars;
