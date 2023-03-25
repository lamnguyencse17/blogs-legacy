import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FunctionComponent } from 'react';
import { Link } from '@chakra-ui/react';
import HeadingComponents from './markdownComponents/Headings';
import ListComponents from './markdownComponents/List';

type PreviewBodyProps = {
    markdown: string | null;
};
const PreviewBody: FunctionComponent<PreviewBodyProps> = ({ markdown }) => {
    if (!markdown) {
        return <></>;
    }
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                ...HeadingComponents,
                ...ListComponents,
                a: ({ children, href }) => (
                    <Link href={href} isExternal>
                        {children}
                    </Link>
                ),
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default PreviewBody;
