export default function ParallelLayout({
  children,
  assignments,
  notifications,
  quiz,
}: {
  children: React.ReactNode;
  assignments: React.ReactNode;
  notifications: React.ReactNode;
  quiz: React.ReactNode;
}) {
  return (
    <div className="max-w-[1024px] w-full mx-auto">
      {children}
      <div className="grid grid-cols-3 gap-4">
        <div className="border  col-span-3 h-[300px] p-4">{assignments}</div>
        <div className="border col-span-2 h-[300px] p-4">{notifications}</div>
        <div className="border col-span-1 h-[300px] p-4">{quiz}</div>
      </div>
    </div>
  );
}
