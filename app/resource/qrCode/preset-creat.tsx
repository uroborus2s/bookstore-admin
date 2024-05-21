import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  classifications,
  type QrCodeProjectFormPO,
  qrCodeProjectFormSchema,
  statuses,
} from '@/data/resource/schema';
import { postQrcodeProjectData } from '@/data/resource/fetch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { queryNames } from '@/data/constant';

export function PresetCreateQRCodePro() {
  const form = useForm<QrCodeProjectFormPO>({
    resolver: zodResolver(qrCodeProjectFormSchema),
  });

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newQrCodeProject: QrCodeProjectFormPO) => {
      return postQrcodeProjectData(newQrCodeProject).then((data) => ({
        id: data.data,
        ...newQrCodeProject,
      }));
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData([queryNames.QRCodeProjectQuery, 1, 10], data);
      setOpen(false);
    },
  });

  function onSubmit(data: QrCodeProjectFormPO) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          新增二维码项目
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] max-w-md">
        <DialogHeader>
          <DialogTitle>新增二维码项目</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <div className="grid grid-cols-2 gap-2"></div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                添加二维码信息
              </span>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>项目名称</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入项目名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sourceOrigin"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>来源分类</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择来源分类" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classifications.map((cla, index) => (
                        <SelectItem key={index} value={cla.value}>
                          {cla.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bookNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>关联图书</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入图书名称关键字" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>备注</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dtcodeStatus"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>状态</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择状态" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status, index) => (
                        <SelectItem key={index} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="itemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>序号</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入项目编号" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">保存</Button>
              <DialogClose asChild>
                <Button variant="ghost">取消</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
