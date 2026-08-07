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

interface VersionInfoProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function VersionInfo({ open, onOpenChange }: VersionInfoProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
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
