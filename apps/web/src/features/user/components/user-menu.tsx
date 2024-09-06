'use client';

import { UserRound } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from '@repo/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@repo/ui/dropdown-menu';

import { User } from '@app/user/types/user.types';
import { getUserImageUrl } from '@app/user/utils/user.utils';

type HomeUserNavProps = {
  user: User;
};

function UserAvatar({
  image,
  name,
  ...props
}: { image: string | null; name: string } & AvatarProps) {
  return (
    <Avatar {...props}>
      {image ? (
        <AvatarImage alt="Picture" src={image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <UserRound className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export default function UserMenu({ user }: HomeUserNavProps) {
  const name = user.name;
  const imageUrl = getUserImageUrl(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar image={imageUrl} name={user.email} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="mb-2 flex items-center justify-start gap-2 border-b p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{name}</p>
            {user.email && (
              <p className="w-[200px] truncate text-sm text-slate-500">{user.email}</p>
            )}
          </div>
        </div>
        <DropdownMenuItem
          className="hover:bg-slate-100"
          onClick={async () => {
            await signOut({ redirect: true, callbackUrl: '/auth' });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
