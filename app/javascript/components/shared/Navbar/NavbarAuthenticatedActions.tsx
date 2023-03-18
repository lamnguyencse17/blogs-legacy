import { type UserData } from '../../../stores/user';
import { type FunctionComponent } from 'react';
import {
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavbarAuthenticatedActionsProps {
  user: UserData;
}

const NavbarAuthenticatedActions: FunctionComponent<
  NavbarAuthenticatedActionsProps
> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <Popover closeOnBlur isLazy>
      <PopoverTrigger>
        <IconButton aria-label={'menu'} icon={<HamburgerIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">{user.username}</PopoverHeader>
        <PopoverArrow />
        <PopoverBody flexDirection="column">
          <LinkBox>
            <Link as={RouterLink} to="/logout">
              <LinkOverlay>
                <Text>{t('navbar_items.logout')}</Text>
              </LinkOverlay>
            </Link>
          </LinkBox>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarAuthenticatedActions;
