import React from 'react';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import { MDXProvider } from '@mdx-js/react';
import DocsNav from 'components/DocsNav';
import Link from 'next/link';
import CodeBlock from './CodeBlock';

const components = {
  a: props => {
    if (props.href.startsWith('/') || props.href.startsWith('#')) {
      return (
        <Link href={props.href}>
          <a {...props} />
        </Link>
      );
    } else {
      return <a target="_blank" {...props} />;
    }
  },
  pre: props => <div {...props} />,
  code: props => <CodeBlock {...props} />
};

const TOCItem = ({ item }) => {
  const [level, name, href] = item;
  const indent = level => {
    switch (level) {
      case 2:
        return 'pl-4';

      default:
        return '';
    }
  };

  return (
    <li className={`mb-2 hang ${indent(level)}`}>
      <a href={href}>{name}</a>
    </li>
  );
};

const TOC = ({ items = [] }) => {
  if (items.length == 0) return <></>;

  return (
    <div>
      <h5 className="pb-3 text-xs uppercase text-gray-600 font-bold tracking-wider">
        On this page
      </h5>
      <ul className="text-gray-700 text-sm">
        {items.map(item => (
          <TOCItem key={item[2]} item={item} />
        ))}
      </ul>
    </div>
  );
};

const PrevLink = props => {
  return (
    <Link href={props.path}>
      <a className="block flex-grow" rel="prev">
        <div className="pb-1 text-sm text-gray-600 font-semibold">Previous</div>
        <div className="text-xl text-indigo-600 font-semibold">
          {props.label}
        </div>
      </a>
    </Link>
  );
};

const NextLink = props => {
  return (
    <Link href={props.path}>
      <a className="block flex-grow text-right" rel="next">
        <div className="pb-1 text-sm text-gray-600 font-semibold">Next</div>
        <div className="text-xl text-indigo-600 font-semibold">
          {props.label}
        </div>
      </a>
    </Link>
  );
};

const Breadcrumb = props => {
  return (
    <Link href={props.path}>
      <a className="text-base font-semibold text-gray-600" rel={props.rel}>
        {props.label}
      </a>
    </Link>
  );
};

const Breadcrumbs = props => {
  if (!props.breadcrumbs) return <></>;

  const links = props.breadcrumbs.map(props => {
    return (
      <li key={props.path}>
        <Breadcrumb {...props} />
      </li>
    );
  });

  return <ol className="docs-breadcrumbs">{links}</ol>;
};

const DocumentFooter = ({ prev, next }) => {
  if (!prev && !next) return <></>;
  return (
    <div className="flex my-8 py-6 border-t">
      {prev ? <PrevLink {...prev} /> : ''}
      {next ? <NextLink {...next} /> : ''}
    </div>
  );
};

export default meta => ({ children }) => {
  return (
    <MDXProvider components={components}>
      <div>
        <main>
          <HeadMatter title={meta.title} description={meta.description} />
          <div className="border-b">
            <Header />
          </div>
          <div className="mx-auto px-6 pt-6 pb-12 container sm:flex">
            <div className="flex-shrink-0 relative pb-12 sm:w-32 lg:w-40">
              <div className="pt-8 sm:sticky sm:top-0">
                <DocsNav />
              </div>
            </div>
            <div className="flex flex-grow min-w-0">
              <div className="pt-8 sm:ml-16 lg:mr-16 flex-grow min-w-0">
                <Breadcrumbs breadcrumbs={meta.breadcrumbs} />
                <div className="markdown">{children}</div>
                <DocumentFooter prev={meta.prev} next={meta.next} />
              </div>
              <div className="flex-shrink-0 hidden lg:block relative w-48">
                <div className="pt-8 sticky top-0">
                  <TOC items={meta.toc} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MDXProvider>
  );
};
