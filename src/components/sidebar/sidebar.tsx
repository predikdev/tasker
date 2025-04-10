import {
  LayoutGrid,
  Inbox,
  CalendarDays,
  Calendar,
  Settings,
} from 'lucide-react';
import { Button } from '../ui/button';
import { getUserData } from '@/lib/getUserData';

export default async function sidebar() {
  const data = await getUserData();
  if (!data?.session) {
    return;
  }
  const userData = data?.userData || {};
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
