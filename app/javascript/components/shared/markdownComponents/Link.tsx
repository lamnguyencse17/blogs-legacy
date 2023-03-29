import {
    AnchorHTMLAttributes,
    DetailedHTMLProps,
    FunctionComponent,
} from 'react';
import { Link as UiLink } from '@chakra-ui/react';
import { isNil } from 'lodash-es';
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

type LinkProps = Omit<
    DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    >,
    'ref'
> &
    ReactMarkdownProps;

const checkIfExternalLink = (href?: string) => {
    if (isNil(href)) {
        return false;
    }
    return href.includes('http');
};

const Link: FunctionComponent<LinkProps> = ({ children, href }) => {
    return (
        <UiLink
            href={href}
            isExternal={checkIfExternalLink(href)}
            colorScheme="blue"
        >
            {children}
        </UiLink>
    );
};

export default Link;
