import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import ProtectedPage from '../components/ProtectedPage';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import MarkdownPresenter from '../components/shared/MarkdownPresenter';
import { isNil, throttle } from 'lodash-es';
import { AUTOSAVE_CONTENT } from '../constants/localStorage';
import {
    CreateArticleData,
    createArticleMutation,
    createArticleSchema,
} from '../queries/article';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CREATE_ARTICLE_MUTATION } from '../constants/query';
import useArticleStore from '../stores/article';
import { shallow } from 'zustand/shallow';

const throttledStoreContent = throttle((content: string) => {
    localStorage.setItem(AUTOSAVE_CONTENT, content);
}, 2000);

const PREVIEW_TAB_INDEX = 1;
const EditorPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [markdown, setMarkdown] = useState('');
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        watch,
        setValue,
    } = useForm<CreateArticleData>({
        resolver: zodResolver(createArticleSchema),
    });
    const watchedBody = watch('body');
    const setArticle = useArticleStore((state) => state.setArticle, shallow);

    const saveArticle = useMutation({
        mutationKey: [CREATE_ARTICLE_MUTATION],
        mutationFn: async (articleData: CreateArticleData) =>
            createArticleMutation(articleData),
        onSuccess: ({ data }) => {
            setArticle(data);
            localStorage.removeItem(AUTOSAVE_CONTENT);
            navigate('/article/' + data.id, {
                state: data,
            });
        },
        onError: ({
            response: { data },
        }: {
            response: { data: { code: string } };
        }) => {
            toast({
                title: t(`errors.${data.code}`),
                status: 'error',
            });
        },
    });

    useEffect(() => {
        const autosaveContent = localStorage.getItem(AUTOSAVE_CONTENT);
        if (isNil(autosaveContent)) {
            return;
        }
        setValue('body', autosaveContent);
    }, []);

    useEffect(() => {
        if (isNil(watchedBody)) {
            return;
        }
        throttledStoreContent(watchedBody);
    }, [watchedBody]);

    const handleSubmitArticle = (values: CreateArticleData) => {
        saveArticle.mutate(values);
    };

    return (
        <ProtectedPage>
            <Flex
                flexDirection="column"
                width="full"
                height="full"
                gap={4}
                padding={8}
                alignItems="center"
            >
                <form
                    onSubmit={handleSubmit(handleSubmitArticle)}
                    style={{
                        width: '100%',
                    }}
                >
                    <Flex flexDirection="column" gap={4} alignItems="center">
                        <FormControl
                            isInvalid={
                                !isNil(errors.body) || !isNil(errors.title)
                            }
                        >
                            <Input
                                placeholder={
                                    t(
                                        'pages.editor.article_title_placeholder'
                                    ) || undefined
                                }
                                {...register('title')}
                            />
                            <FormErrorMessage>
                                {!isNil(errors.title) && errors.title.message}
                            </FormErrorMessage>
                            <Tabs
                                onChange={(index) => {
                                    if (index === PREVIEW_TAB_INDEX) {
                                        setMarkdown(watchedBody);
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
                                            height={'30rem'}
                                            {...register('body')}
                                        />
                                        <FormErrorMessage>
                                            {!isNil(errors.body) &&
                                                errors.body.message}
                                        </FormErrorMessage>
                                    </TabPanel>
                                    <TabPanel>
                                        <MarkdownPresenter
                                            markdown={markdown}
                                        />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </FormControl>
                        <Button isLoading={isSubmitting} type="submit">
                            {t('pages.editor.submit')}
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </ProtectedPage>
    );
};

export default EditorPage;
