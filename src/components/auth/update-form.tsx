import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useEffect, useState } from 'react';

type Props = {
  session: any;
  userData: {
    email?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
  };
};

export function UpdateForm({
  session,
  userData,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & Props) {
  return (
    <div className={cn('flex flex-col gap-6 min-w-md', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>
            Update for: {userData.username}
          </CardTitle>
          <CardDescription>Use this form to update your data</CardDescription>
        </CardHeader>
        <CardContent>
          <form action='/api/auth/update' method='post'>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='display-name'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  name='username'
                  defaultValue={userData.username}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='first_name'>First name</Label>
                <Input
                  id='first_name'
                  type='text'
                  name='first_name'
                  defaultValue={userData.first_name}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='last_name'>Last name</Label>
                <Input
                  id='last_name'
                  type='text'
                  name='last_name'
                  defaultValue={userData.last_name}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  defaultValue={userData.email}
                />
              </div>
              <Button type='submit' className='w-full'>
                Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
