import {
    Flex,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Textarea,
} from '@chakra-ui/react';
import ProtectedPage from '../components/ProtectedPage';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import PreviewBody from '../components/editor/PreviewBody';

const PREVIEW_TAB_INDEX = 1;
const EditorPage = () => {
    const { t } = useTranslation();
    const [markdown, setMarkdown] = useState('');
    const bodyEditorRef = useRef<HTMLTextAreaElement>(null);

    return (
        <ProtectedPage>
            <Flex
                flexDirection="column"
                width="full"
                height="full"
                gap={4}
                padding={8}
            >
                <Input
                    placeholder={
                        t('pages.editor.article_title_placeholder') || undefined
                    }
                />
                <Tabs
                    onChange={(index) => {
                        if (index === PREVIEW_TAB_INDEX) {
                            if (bodyEditorRef && bodyEditorRef.current) {
                                setMarkdown(bodyEditorRef.current.value);
                            }
                        }
                    }}
                >
                    <TabList>
                        <Tab>{t('pages.editor.write')}</Tab>
                        <Tab>{t('pages.editor.preview')}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Textarea
                                placeholder={
                                    t(
                                        'pages.editor.article_body_placeholder'
                                    ) || undefined
                                }
                                ref={bodyEditorRef}
                                height={'30rem'}
                            />
                        </TabPanel>
                        <TabPanel>
                            <PreviewBody markdown={markdown} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </ProtectedPage>
    );
};

export default EditorPage;
