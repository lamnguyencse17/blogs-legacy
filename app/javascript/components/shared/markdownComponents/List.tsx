import { ListItem, OrderedList, UnorderedList } from '@chakra-ui/react';

const ListComponents = {
    ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
    ol: ({ children }) => <OrderedList>{children}</OrderedList>,
    li: ({ children }) => <ListItem>{children}</ListItem>,
};

export default ListComponents;
