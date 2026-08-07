import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';
import type { CommitInfo } from '@/model/commit-info';
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

interface VersionInfoDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function VersionInfoDialog({ open, onOpenChange }: VersionInfoDialogProps) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['commit'],
    queryFn: () => api.get<CommitInfo>(`/commit`).then((res) => res.data),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='w-[400px]'>
        <DialogHeader className='flex items-center'>
          <DialogTitle>Version Info</DialogTitle>
          <DialogDescription className='sr-only'>
            Information about the last commit
          </DialogDescription>
        </DialogHeader>
        {isPending ? (
          <span className='pl-2'>Loading...</span>
        ) : isError ? (
          <span className='pl-2'>
            Error loading version info. {error?.message}
          </span>
        ) : data ? (
          <div className='flex flex-col space-y-2'>
            <div>
              <span>Branch: </span>
              <span className='font-mono text-sm'>{data.branch}</span>
            </div>
            <div>
              <span>Hash: </span>
              <span className='font-mono text-sm'>{data.shortCommitId}</span>
            </div>
            <div>
              <span>Time: </span>
              <span className='font-mono text-sm'>{data.buildTime}</span>
            </div>
            <span className='font-mono text-sm'>{data.shortCommitMessage}</span>
          </div>
        ) : (
          <span className='pl-2'>No version info available</span>
        )}
        <br />
        <div className='flex gap-2 justify-end'>
          <DialogClose asChild>
            <Button variant='secondary'>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

VersionInfoDialog.displayName = 'VersionInfoDialog';
export { VersionInfoDialog };
