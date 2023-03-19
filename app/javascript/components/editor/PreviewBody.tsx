import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FunctionComponent } from 'react';

type PreviewBodyProps = {
    markdown: string | null;
};
const PreviewBody: FunctionComponent<PreviewBodyProps> = ({ markdown }) => {
    if (!markdown) {
        return <></>;
    }
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    );
};

export default PreviewBody;
