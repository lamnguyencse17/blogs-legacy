import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    authenticateUserQuery,
    type LoginFormData,
    loginSchema,
} from '../queries/auth';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useUserStore, { type UserData } from '../stores/user';
import { AUTH_TOKEN } from '../constants/localStorage';
import { addAuthorizationHeader } from '../utils/axios';

const LoginPage = () => {
    const setUser = useUserStore((state) => state.setUser);
    const toast = useToast();
    const { t } = useTranslation();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const loginQuery = useMutation({
        mutationFn: async (loginData: LoginFormData) =>
            authenticateUserQuery(loginData),
        onSuccess: ({ data }) => {
            localStorage.setItem(AUTH_TOKEN, data.token);
            addAuthorizationHeader(data.token);
            setUser(data.user as unknown as UserData);
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

    const onSubmit = (values) => {
        loginQuery.mutate(values);
    };

    return (
        <Center>
            <Box w="50%">
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Flex direction="column" alignItems="center">
                        <FormControl
                            isInvalid={errors.email != null || errors.password != null}
                        >
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                placeholder="Email"
                                {...register('email')}
                                type="email"
                                isInvalid={!(errors.email == null)}
                            />
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>

                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="password"
                                placeholder="Password"
                                {...register('password')}
                                type="password"
                                isInvalid={!(errors.password == null)}
                            />
                            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                        </FormControl>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
              Submit
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Center>
    );
};

export default LoginPage;
