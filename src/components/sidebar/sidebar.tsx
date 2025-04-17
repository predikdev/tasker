import {
  Home,
  Inbox,
  CalendarDays,
  Sun,
  Settings,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '../ui/button';
import { getUserData } from '@/lib/getUserData';
import { getUserProjects } from '@/lib/getUserProjects';

export default async function sidebar() {
  const data = await getUserData();
  const projects = await getUserProjects();
  if (!data?.session) {
    return;
  }
  const userData = data?.userData || {};
  const userProjects = projects?.userProject || [];

  return (
    <aside className='p-2'>
      <div className='sidebar-wrapper | w-full h-full min-w-[276px] flex flex-col border-1 rounded-md border-foreground/15'>
        <div className='top-section | px-6 py-4 '>
          <div className='logo font-bold'>TASKER</div>
        </div>
        <div className='menu | p-4 text-sm'>
          <ul className='flex flex-col'>
            <li className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400 hover:cursor-pointer'>
              <Home size={18} />
              <a href='/dashboard'>Dashboard</a>
            </li>
            <li className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400 hover:cursor-pointer'>
              <Inbox size={18} />
              <a href='/inbox'>Inbox</a>
            </li>
            <li className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400 hover:cursor-pointer'>
              <Sun size={18} />
              <a href='/today'>Today</a>
            </li>
            <li className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400 hover:cursor-pointer'>
              <CalendarDays size={18} />
              <a href='/upcoming'>Upcoming</a>
            </li>
          </ul>
        </div>
        <div className='projects | p-4 flex-1/2 text-sm'>
          <div className='flex items-center justify-between text-foreground/50'>
            <span>Projects</span>
            <ChevronDown strokeWidth={2} />
          </div>
          <ul className='flex flex-col gap-2 mt-2'>
            {userProjects.map((project) => (
              <li key={project.id}>
                <a
                  href={`/projects/${project.slug}`}
                  className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400'
                >
                  <span className='rounded-full h-2 w-2 bg-foreground'></span>
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='logout | w-full flex items-center justify-between p-4 text-sm'>
          <p>{userData.username}</p>
          <form action='/api/auth/logout'>
            <Button type='submit' className='hover:cursor-pointer text-sm'>
              Logout
            </Button>
          </form>
          <a href='/profile' className='p-1 hover:rotate-180'>
            <Settings />
          </a>
        </div>
      </div>
    </aside>
  );
}
