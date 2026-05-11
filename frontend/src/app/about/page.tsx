'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Card } from '@/components/world/card';
import { CardList } from '@/components/world/card-list';

function About() {
  return (
    <Card className='p-4 flex flex-col w-full animate-zoom-in'>
      <h1>About</h1>
      <div className='flex flex-col gap-1 w-full'>
        <h2>Author</h2>
        <Card className='w-full p-3 gap-2'>
          <Avatar className='size-18 self-center'>
            <AvatarImage src='/sotaro_profile.jpg' alt='Sotaro' />
            <AvatarFallback>Sotaro</AvatarFallback>
          </Avatar>
          <span className='text-xl self-center -mt-1'>Sotaro Shirai</span>
          <p style={{ whiteSpace: 'pre-line' }}>
            {`🥷 Web developer, borned in Japan 🇯🇵, lives in Germany 🥨.
              👨‍🎓 Studied computer science at Stuttgart Technical University of Applied Science (DE: Hochschule für Technik Stuttgart).
              
              My favorite word is "Learning by doing" — I learn best when I actually build something, not just by reading or watching videos. This is the main reason why I built this web service. Actually country information is a good size to experiment with - not too big, not too small, and there are many interesting public APIs to get data from.
              
              I also love traveling to know new places and people, so digging into data about countries is just fun for me 😉.
            `}
          </p>
        </Card>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <h2>Technologies in this web service</h2>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 items-stretch w-full'>
          <CardList
            title='Frontend'
            items={[
              'React',
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
              'shadcn/ui',
              'Material UI',
            ]}
          />
          <CardList
            title='Backend'
            items={['Spring Boot', 'Maven', 'PostgresSQL']}
          />
          <CardList
            title='Testing'
            items={['Jest', 'Playwright', 'JUnit5', 'Mockito']}
          />
          <CardList
            title='DevOps'
            items={[
              'Docker',
              'GitHub Actions',
              'Amazon Lightsail',
              'nginx',
              'Ubuntu',
            ]}
          />
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <h2>Upcoming Features</h2>
        <Card className='p-3'>
          <ul>
            <li>📈 Visualize data e.g. chart and graph</li>
            <li>✨ Integrate economic data from public APIs</li>
            <li>
              ⚛️ <s>Migration from React to Next.js</s>
              <span className='text-quiet'>
                {' '}
                ... Now running in Next.js&apos;s SSG mode
              </span>
            </li>
            <li>
              ✅ <s>End2End Test</s>{' '}
              <span className='text-quiet'> ... Done</span>
            </li>
          </ul>
        </Card>
      </div>
    </Card>
  );
}

export default About;
