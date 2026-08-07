import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/custom/dialog';
import { Button } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import { GitBranchIcon } from 'lucide-react';
import { useState } from 'react';

function VersionInfo() {
  const [open, setOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className='flex items-center gap-2 w-full'>
          <GitBranchIcon className={cn('size-5 mr-2')} />
          <span className='text-lg'>Version</span>
        </div>
      </DialogTrigger>
      <DialogContent className='w-[400px]'>
        <DialogHeader>
          <DialogTitle>Version Info</DialogTitle>
          <DialogDescription>
            Details about the current version
          </DialogDescription>
        </DialogHeader>
        <div className='flex gap-2 justify-end'>
          <DialogClose asChild>
            <Button variant='secondary'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='submit'>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

VersionInfo.displayName = 'VersionInfo';
export { VersionInfo };
