
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
import { frontmatterPlugin } from '@mdxeditor/editor/plugins/frontmatter';
import { linkPlugin } from '@mdxeditor/editor/plugins/link';
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog';
import { imagePlugin } from '@mdxeditor/editor/plugins/image';
import { tablePlugin } from '@mdxeditor/editor/plugins/table';
import { markdownShortcutPlugin } from '@mdxeditor/editor/plugins/markdown-shortcut';

import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';
// components/mdx-editor/index.js
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect'
import { InsertTable } from '@mdxeditor/editor/plugins/toolbar/components/InsertTable'
import { CreateLink } from '@mdxeditor/editor/plugins/toolbar/components/CreateLink'
import { InsertThematicBreak } from '@mdxeditor/editor/plugins/toolbar/components/InsertThematicBreak'
import { ListsToggle } from '@mdxeditor/editor/plugins/toolbar/components/ListsToggle'


import dynamic from "next/dynamic";

export const MDXEditor = dynamic(
    () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
    { ssr: false }
);




export const plugins = [
    linkPlugin(),
    linkDialogPlugin(),
    headingsPlugin(),
    imagePlugin(),
    tablePlugin(),
    quotePlugin(),
    listsPlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    frontmatterPlugin(),

    toolbarPlugin({ 
        toolbarContents: () => <>
            <UndoRedo/>
            <BoldItalicUnderlineToggles/>
            <BlockTypeSelect/>
            <CreateLink/>
            <InsertThematicBreak/>
            <ListsToggle/>
            <InsertTable/>

    </> }),
];