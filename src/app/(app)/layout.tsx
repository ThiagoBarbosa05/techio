import { Header } from '@/components/header'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#EFF2F4]">
      <Header />

      <main className="flex flex-1 w-full flex-col md:max-w-[1180px] md:mx-auto">
        {children}
      </main>
    </div>
  )
}
