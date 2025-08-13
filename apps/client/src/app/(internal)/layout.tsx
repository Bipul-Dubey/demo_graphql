import Header from "@/components/Header";

export default function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-3">
      <Header />
      {children}
    </div>
  );
}
