import Link from "next/link";

interface CachingLayoutProps {
  children?: React.ReactNode;
}
export default function CachingLayout({ children }: CachingLayoutProps) {
  return (
    <div className="max-w-[1240px] w-full mx-auto mt-5">
      <nav className="py-2">
        <ul className="flex list-none gap-5">
          <li>
            <Link href={"/caching/parallel"}>Parallel</Link>
          </li>
          <li>
            <Link href={"/caching/sequential"}>Sequential</Link>
          </li>
        </ul>
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
};