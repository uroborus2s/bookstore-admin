import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
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
import {
  fetchBookCategory,
  fetchBookStatuses,
  postBookData,
} from '@/data/book/fetch';
import { bookFormSchema, BookFormSchemaPO } from '@/data/book/schema';
import { queryNames } from '@/data/constant';

export function PresetCreateBook() {
  const form = useForm<BookFormSchemaPO>({
    resolver: zodResolver(bookFormSchema),
  });

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newBook: BookFormSchemaPO) => {
      return postBookData(newBook).then((data) => ({
        id: data.data,
        ...newBook,
      }));
    },
    onSuccess: (data, variables) => {
      console.log(data);
      queryClient.setQueryData([queryNames.BookQuery, 1, 10], data);
      setOpen(false);
    },
  });

  function onSubmit(data: BookFormSchemaPO) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          新增图书
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>新增图书</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <div className="grid grid-cols-2 gap-2"></div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                添加图书信息
              </span>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-h-4/5"
          >
            <FormField
              control={form.control}
              name="bookName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>图书名称</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入图书名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <fieldset className="flex items-stretch w-full gap-2">
              <FormField
                control={form.control}
                name="bookNo"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel>图书编号</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入图书编号" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookSeq"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>顺序号</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入排序号" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <fieldset className="flex items-stretch w-full gap-2">
              <FormField
                control={form.control}
                name="bookCategory"
                render={({ field }) => (
                  <FormItem className="min-w-48">
                    <FormLabel>图书分类</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择图书分类" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fetchBookCategory().map((category, index) => (
                          <SelectItem key={index} value={category.value}>
                            {category.label}
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
                name="bookStatus"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>图书状态</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择图书状态" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fetchBookStatuses().map((status, index) => (
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
            </fieldset>
            <fieldset className="flex w-full gap-1">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>学段</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入学段" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>年级</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入年级" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>学科</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入学科" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <fieldset className="flex w-full gap-1">
              <FormField
                control={form.control}
                name="edition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>版本</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入版本" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>册次</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入册次" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="auditedYear"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>图书审定年份</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入审定年份" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <FormField
              control={form.control}
              name="publishUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>出版单位</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入出版单位" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="intro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>简介</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="请输入图书简介" />
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
