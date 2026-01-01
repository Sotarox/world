import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Region, RegionType, useRegionFilter } from '@/store/RegionFilterStore';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';

const formSchema = z.object({
  regions: z
    .array(z.enum(Region))
    .min(1, 'At least one region must be selected'),
});

export function CountryFilter() {
  const regions = useRegionFilter((s) => s.regions);
  const setRegions = useRegionFilter((s) => s.setRegions);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { regions: [...regions] },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setRegions(data.regions as RegionType[]);
    toast.success('Regions updated!');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type='button' aria-label='Open filter dialog'>
          Filter
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Region Filter</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2'>
            {Region.map((region) => (
              <Controller
                key={region}
                name='regions'
                control={form.control}
                render={({ field }) => (
                  <label className='flex items-center gap-2'>
                    <Checkbox
                      checked={field.value?.includes(region)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, region]);
                        } else {
                          field.onChange(
                            field.value.filter((r: string) => r !== region)
                          );
                        }
                      }}
                    />
                    {region}
                  </label>
                )}
              />
            ))}
          </div>
          {form.formState.errors.regions && (
            <div className='text-red-500 text-sm mt-2'>
              {form.formState.errors.regions.message}
            </div>
          )}
          <button type='submit' className='mt-4 btn btn-primary'>
            Save
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
