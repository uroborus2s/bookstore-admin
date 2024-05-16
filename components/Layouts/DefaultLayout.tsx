'use client';
import { type ReactNode, useState } from 'react';
import { AdminSidebar } from '@/components/Sidebar/admin-sidebar';
import Header from '@/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function DefaultLayout({ children }: { children: ReactNode }) {
  // 侧边栏是否展开
  const [collapsed, setCollapsed] = useState(false);
  // 侧边拦手机模式是否显示
  const [toggled, setToggled] = useState(false);
  // 是否满足手机模式
  const [broken, setBroken] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <AdminSidebar
          collapsed={collapsed}
          toggled={toggled}
          setToggled={setToggled}
          setBroken={setBroken}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header
            broken={broken}
            setToggled={setToggled}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </QueryClientProvider>
  );
}
