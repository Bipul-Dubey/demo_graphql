import Header from "@/components/Header";

export default function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="py-2 flex-1">{children}</div>
    </div>
  );
}
