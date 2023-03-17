import { type UserData } from '../../../stores/user';
import { type FunctionComponent } from 'react';
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

interface NavbarAuthenticatedActionsProps {
  user: UserData;
}

const NavbarAuthenticatedActions: FunctionComponent<
  NavbarAuthenticatedActionsProps
> = ({ user }) => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <IconButton aria-label={'menu'} icon={<HamburgerIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">{user.username}</PopoverHeader>
        <PopoverArrow />
        <PopoverBody>Logout</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarAuthenticatedActions;
