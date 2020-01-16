import React, { useState, useEffect } from 'react';
import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import { useDefaultSite } from 'utils/default-site';
import { useSiteData } from 'data/site';
import { useViewerData } from 'data/viewer';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const copyIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
`;

interface Props {
  className: string;
  trim: boolean;
  children: string;
}

const CodeBlock: React.FC<Props> = ({ children, className, trim }) => {
  const language = className.replace(/language-/, '') as Language;
  const siteId = useDefaultSite();
  const { siteData } = useSiteData(siteId);
  const { viewerData } = useViewerData();
  const [code, setCode] = useState(children);

  useEffect(() => {
    let newCode = children;

    if (siteId) {
      newCode = newCode.replace(/\{your-site-id\}/g, siteId);
    }

    if (siteData && siteData.status == 'ok') {
      newCode = newCode.replace(/<your-deploy-key>/g, siteData.site.deployKey);
    }

    if (viewerData && viewerData.status == 'ok') {
      newCode = newCode.replace(
        /\{your-email-address\}/g,
        viewerData.viewer.email
      );
    }

    setCode(newCode);
  }, [siteId, siteData, viewerData]);

  return (
    <div className="code-block relative">
      <Highlight {...defaultProps} theme={null} code={code} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={className}>
            {tokens.map((line, i) => {
              if (trim && i === tokens.length - 1) return <></>;

              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>

      <CopyToClipboard text={code}>
        <button className="absolute top-0 right-0 flex p-3 text-gray-300">
          <span dangerouslySetInnerHTML={{ __html: copyIcon }} />
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CodeBlock;