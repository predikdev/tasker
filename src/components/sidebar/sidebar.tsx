import {
  LayoutGrid,
  Inbox,
  CalendarDays,
  Calendar,
  Settings,
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
    <aside>
      <div className='sidebar-wrapper | w-full h-full min-w-[276px] flex flex-col  border-r-2'>
        <div className='top-section | p-4 '>
          <div className='logo'>TASKER</div>
        </div>
        <div className='menu | p-4 '>
          <ul className='flex flex-col'>
            <li className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400 hover:cursor-pointer'>
              <LayoutGrid size={18} />
              <a href='/dashboard'>Dashboard</a>
            </li>
            <li className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400 hover:cursor-pointer'>
              <Inbox size={18} />
              <a href='/inbox'>Inbox</a>
            </li>
            <li className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400 hover:cursor-pointer'>
              <Calendar size={18} />
              <a href='/today'>Today</a>
            </li>
            <li className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400 hover:cursor-pointer'>
              <CalendarDays size={18} />
              <a href='/upcoming'>Upcoming</a>
            </li>
          </ul>
        </div>
        <div className='projects | p-4 flex-1/2'>
          <h4>Projects</h4>
          <ul className='flex flex-col gap-2 mt-2'>
            {userProjects.map((project) => (
              <li key={project.id}>
                <a
                  href={`/projects/${project.slug}`}
                  className='flex items-center gap-2 p-2 rounded-md hover:bg-blue-400'
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='logout | w-full flex items-center justify-between p-4 '>
          <p>{userData.username}</p>
          <form action='/api/auth/logout'>
            <Button type='submit' className='hover:cursor-pointer'>
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
