import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { CheckboxIcon } from '../forms/checkboxIcon/CheckboxIcon';

export const MarkDownText: React.FC<{ className?: string; children?: string }> = ({
  className,
  children,
}) => {
  return (
    <div className={classNames('prose prose-gray max-w-none', className)}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p className="text-text-description" {...props} />,

          h1: ({ node, ...props }) => (
            <h1 className="text-4xl text-text-secondary my-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl text-text-secondary my-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl text-text-secondary my-2" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl text-text-secondary my-1" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-lg text-text-secondary my-[6px]" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-base text-text-secondary my-[4px]" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="border-brand-200 rounded-xl border-[1px] my-4" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-2 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4" {...props} />
          ),
          li: ({ node, ...props }) => {
            const isTaskItem = (node?.properties?.className as string[])?.includes(
              'task-list-item',
            );

            return (
              <li
                style={{ color: 'var(--color-text-secondary)' }}
                {...props}
                className={classNames('ml-4 mb-1', isTaskItem ? 'flex items-center gap-x-2' : '')}
              />
            );
          },

          table: ({ node, ...props }) => (
            <table className="w-full border-collapse  my-6" {...props} />
          ),
          thead: ({ node, ...props }) => <thead className="bg-brand-200 text-left" {...props} />,
          th: ({ node, ...props }) => <th className="px-3 py-2  text-text-secondary" {...props} />,
          td: ({ node, ...props }) => (
            <td className="border border-brand-300 px-3 py-2 text-text-secondary" {...props} />
          ),

          strong: ({ node, ...props }) => (
            <strong className="font-bold text-text-secondary" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic text-text-secondary" {...props} />,
          code: ({ node, ...props }) => (
            <code
              className="bg-brand-300 rounded px-1 py-0.5 text-sm font-mono text-text-secondary"
              {...props}
            />
          ),

          pre: ({ node, ...props }) => (
            <pre
              className="bg-brand-300 text-text-secondary rounded-lg p-4 overflow-x-auto my-4"
              {...props}
            />
          ),

          input: ({ type, checked, ...props }) => {
            if (type === 'checkbox') {
              return <CheckboxIcon checked={checked} />;
            }
            return <input className="text-text-secondary" {...props} />;
          },

          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-brand-200 pl-4 italic text-text-secondary my-4"
              {...props}
            />
          ),

          a: ({ href, children, ...props }) => {
            if (href?.startsWith('/')) {
              return (
                <Link to={href} className="text-brand-100 underline" {...props} target="_self">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-100 underline"
                {...props}>
                {children}
              </a>
            );
          },

          img: ({ node, ...props }) => (
            <span className="m-4">
              <img
                className="max-h-full rounded-lg shadow-black shadow-md"
                alt="Картинка"
                {...props}
              />
            </span>
          ),
        }}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
