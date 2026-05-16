'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { useSidebar } from '@/components/custom/sidebar';
import { Card } from '@/components/world/card';
import { CardBadges } from '@/components/world/card-badges';
import { PageBackground } from '@/components/world/page-background';
import {
  MonitorSmartphoneIcon,
  ContainerIcon,
  SquareTerminalIcon,
  DatabaseIcon,
  BugOffIcon,
  NotebookTextIcon,
} from 'lucide-react';
import { useEffect } from 'react';

function AuthorPage() {
  const { state, stateMobile, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (stateMobile === 'expanded' || state === 'expanded') {
      toggleSidebar();
    }
  }, []);

  return (
    <PageBackground>
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-10 p-4 animate-zoom-in'>
        <h1 className='self-start'>Author</h1>

        <section className='flex w-full flex-col'>
          <div className='grid grid-cols-1 items-start gap-3 sm:gap-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-center'>
            <div>
              <h2 className='font-bold text-gradient'>Hi, I&#39;m Sotaro</h2>
              <p className='text-lg leading-relaxed text-gray-700 dark:text-gray-200'>
                {`passionate web developer to build a user-centric application. I believe that the best solution is achieved by communication and iteration.
                Borned in Japan 🇯🇵, living in Germany 🇩🇪.
                `}
              </p>
            </div>

            <div className='flex flex-col items-center gap-2 md:mt-10'>
              <Avatar className='size-25 self-center border-2 border-teal-500 dark:border-teal-600'>
                <AvatarImage src='/sotaro_profile.jpg' alt='Sotaro' />
                <AvatarFallback>Sotaro</AvatarFallback>
              </Avatar>
              <span className='-mt-1 self-center whitespace-nowrap text-xl font-bold text-gray-500 dark:text-gray-300'>
                Sotaro Shirai
              </span>
            </div>
          </div>
        </section>

        <section className='flex w-full flex-col gap-2'>
          <h2>Skills</h2>
          <div className='grid w-full grid-cols-2 sm:grid-cols-3 items-stretch gap-3'>
            <CardBadges
              icon={<MonitorSmartphoneIcon />}
              title='Frontend'
              items={[
                'React',
                'Next.js',
                'Tailwind CSS',
                'shadcn/ui',
                'Material UI',
              ]}
            />
            <CardBadges
              icon={<SquareTerminalIcon />}
              title='Backend'
              items={[
                'Java',
                'Spring Boot',
                'Maven',
                'REST',
                'OpenAPI',
                'Microservice',
              ]}
            />
            <CardBadges
              icon={<BugOffIcon />}
              title='Tests'
              items={['Jest', 'Playwright', 'JUnit5', 'Mockito']}
            />
            <CardBadges
              icon={<DatabaseIcon />}
              title='Databases'
              items={['PostgreSQL', 'MySQL', 'Neo4j']}
            />
            <CardBadges
              icon={<ContainerIcon />}
              title='DevOps'
              items={['Docker', 'GitHub Actions', 'nginx', 'Linux']}
            />
            <CardBadges
              icon={<NotebookTextIcon />}
              title='Tools/Approaches'
              items={['Agile', 'Scrum', 'Kanban', 'Git', 'Jira']}
            />
          </div>
        </section>
        <section className='flex w-full flex-col gap-2'>
          <h2>Why I built this App</h2>
          <Card className='w-full p-3 gap-2'>
            <p className='whitespace-pre-line'>
              {`The main reason is "Learning by doing" — I learn best by hands-on experience, not just by reading or watching videos. Actually country information is a good size to experiment with - not too big, not too small, and there are many interesting public APIs to get data from.
              
              I also love traveling to know new places and people, so digging into data about countries is just fun for me 😉.
            `}
            </p>
          </Card>
        </section>
        <section>
          <div className='flex flex-col gap-2 w-full'>
            <h2>Upcoming Features</h2>
            <Card className='p-3'>
              <ul>
                <li>📈 Visualize data more e.g. chart and graph</li>
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
        </section>
      </div>
    </PageBackground>
  );
}

export default AuthorPage;
