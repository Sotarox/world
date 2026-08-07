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

interface VersionInfoProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function VersionInfo({ open, onOpenChange }: VersionInfoProps) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['commit'],
    queryFn: () => api.get<CommitInfo>(`/commit`).then((res) => res.data),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='w-[400px]'>
        <DialogHeader>
          <DialogTitle>Version Info</DialogTitle>
          <DialogDescription>
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
          <div className='space-y-2'>
            <div>Branch: {data.branch}</div>
            <div>ID: {data.shortCommitId}</div>
            <div>Build Time: {data.buildTime}</div>
            <div>Message: {data.shortCommitMessage}</div>
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

VersionInfo.displayName = 'VersionInfo';
export { VersionInfo };
