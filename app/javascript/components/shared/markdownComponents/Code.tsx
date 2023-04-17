import { isNil, unescape } from 'lodash-es';
import { FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const parseLanguage = (className?: string) => {
    if (isNil(className)) {
        return 'text';
    }
    const [_, language = 'text'] = className && className.split('-');
    return language;
};

const Code: FunctionComponent<CodeProps> = ({
    className,
    children,
    inline,
}) => {
    const language = parseLanguage(className);
    console.log(renderToStaticMarkup(<>{children}</>));
    return (
        <SyntaxHighlighter
            language={language}
            style={dark}
            customStyle={{
                display: isNil(inline) ? undefined : 'inline',
                padding: '0.2em',
            }}
        >
            {unescape(renderToStaticMarkup(<>{children}</>))}
        </SyntaxHighlighter>
    );
};

export default Code;
