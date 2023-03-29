import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FunctionComponent, lazy, Suspense } from 'react';
import HeadingComponents from './markdownComponents/Headings';
import ListComponents from './markdownComponents/List';
import LoadingFallback from '../LoadingFallback';
import Link from './markdownComponents/Link';
import { isNil } from 'lodash-es';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
const Code = lazy(() => import('./markdownComponents/Code'));

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
                code: (props: CodeProps) => (
                    <Suspense
                        fallback={
                            <LoadingFallback fullPage={isNil(props.inline)} />
                        }
                    >
                        <Code {...props} />
                    </Suspense>
                ),
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownPresenter;
