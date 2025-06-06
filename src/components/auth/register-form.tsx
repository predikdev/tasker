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

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6 min-w-md', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Registration</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action='/api/auth/register' method='post'>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='display-name'>Display name</Label>
                <Input
                  id='display-name'
                  type='display-name'
                  name='display-name'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id='password' type='password' name='password' required />
              </div>
              <Button type='submit' className='w-full'>
                Register
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <a href='/login' className='underline underline-offset-4'>
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
