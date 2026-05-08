'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Card } from '@/components/shadcn/card';

const paragraphClassName = 'text-2xl';
const listTitleClassName = 'text-lg font-medium text-slate-900';
const liClassName = 'list-disc list-inside text-slate-700';

function About() {
  return (
    <div className='p-4 animate-in fade-in zoom-in-90 duration-300 flex flex-col gap-6'>
      <Card className='p-4 animate-in fade-in zoom-in-90 duration-300'>
        <h1>About</h1>
        <div className='flex flex-col gap-1 w-full'>
          <span className={paragraphClassName}>Author</span>
          <Card className='w-full p-3'>
            <Avatar className='size-18 self-center'>
              <AvatarImage src='/sotaro_profile.jpg' alt='Sotaro' />
              <AvatarFallback>Sotaro</AvatarFallback>
            </Avatar>
            <p className='self-center'>Sotaro Shirai</p>
            <p style={{ whiteSpace: 'pre-line' }}>
              {`🥷 Web developer, borned in Japan 🇯🇵, lives in Stuttgart, Germany 🥨.`}
            </p>
          </Card>
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <span className={paragraphClassName}>
            Technologies in this web service
          </span>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 items-stretch'>
            <Card className='px-3 py-2 gap-2'>
              <span className={listTitleClassName}>Frontend</span>
              <ul className={liClassName}>
                <li>React</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>shadcn/ui</li>
                <li>Material UI</li>
              </ul>
            </Card>
            <Card className='p-3'>
              <span className={listTitleClassName}>Backend</span>
              <ul className={liClassName}>
                <li>Spring Boot</li>
                <li>Maven</li>
                <li>PostgresSQL</li>
              </ul>
            </Card>
            <Card className='p-3'>
              <span className={listTitleClassName}>Testing</span>
              <ul className={liClassName}>
                <li>Jest</li>
                <li>Playwright</li>
                <li>JUnit5</li>
                <li>Mockito</li>
              </ul>
            </Card>
            <Card className='p-3'>
              <span className={listTitleClassName}>DevOps</span>
              <ul className={liClassName}>
                <li>Docker</li>
                <li>GitHub Actions</li>
                <li>Amazon Lightsail</li>
                <li>nginx</li>
                <li>Ubuntu</li>
              </ul>
            </Card>
          </div>
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <span className={paragraphClassName}>Upcoming Features</span>
          <Card className='p-3'>
            <ul>
              <li>
                ⚛️ <s>Migration from React to Next.js</s>
                <span className='text-quiet'>
                  {' '}
                  ... Now running in Next.js&apos;s SSG mode
                </span>
              </li>
              <li>🗺️ Map by OpenLayers or Leaflet</li>
              <li>✨ More data from public APIs</li>
              <li>
                ✅ <s>End2End Test</s>{' '}
                <span className='text-quiet'> ... Done</span>
              </li>
            </ul>
          </Card>
        </div>
      </Card>
    </div>
  );
}

export default About;
