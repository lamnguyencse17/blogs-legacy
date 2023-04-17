import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FunctionComponent } from 'react';
import HeadingComponents from './markdownComponents/Headings';
import ListComponents from './markdownComponents/List';
import Link from './markdownComponents/Link';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import Code from './markdownComponents/Code';

type MarkdownPresenterProps = {
    markdown: string | null;
};
const MarkdownPresenter: FunctionComponent<MarkdownPresenterProps> = ({
    markdown,
}) => {
    if (!markdown) {
        return <></>;
    }
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                ...HeadingComponents,
                ...ListComponents,
                a: Link,
                code: Code,
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownPresenter;
