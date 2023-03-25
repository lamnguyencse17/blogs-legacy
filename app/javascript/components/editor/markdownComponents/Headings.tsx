import { Center, Heading } from '@chakra-ui/react';
import { HeadingComponent } from 'react-markdown/lib/ast-to-react';

const headingConfigs = {
    h1: {
        as: 'h1',
        size: '4xl',
    },
    h2: {
        as: 'h2',
        size: '3xl',
    },
    h3: {
        as: 'h3',
        size: '2xl',
    },
    h4: {
        as: 'h4',
        size: 'xl',
    },
    h5: {
        as: 'h5',
        size: 'lg',
    },
    h6: {
        as: 'h6',
        size: 'md',
    },
};

const HeadingComponents: { [key: string]: HeadingComponent } = Object.keys(
    headingConfigs
).reduce((acc, key) => {
    const config = headingConfigs[key];
    if (key === 'h1') {
        acc[key] = ({ children }) => (
            <Center>
                <Heading as={config.as} size={config.size}>
                    {children}
                </Heading>
            </Center>
        );
    } else {
        acc[key] = ({ children }) => (
            <Heading as={config.as} size={config.size}>
                {children}
            </Heading>
        );
    }
    return acc;
}, {});

export default HeadingComponents;
