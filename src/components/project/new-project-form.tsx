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

export default async function createNewProject({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6 min-w-md', className)}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Create new project</CardTitle>
          <CardDescription>Use this form to create new project</CardDescription>
        </CardHeader>
        <CardContent>
          <form action='/api/projects/create' method='post'>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='project-name'>Project name</Label>
                <Input id='project-name' type='text' name='project-name' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='project-desc'>Description</Label>
                <Input id='project-desc' type='text' name='project-desc' />
              </div>
              <Button type='submit' className='w-full'>
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
