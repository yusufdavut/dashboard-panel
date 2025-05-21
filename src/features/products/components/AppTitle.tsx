export default function AppTitle({ title }: { title: string }) {
  return (
    <h1 className="text-5xl font-black mb-10 relative text-[#183B4E] before:absolute before:w-24 before:h-2 before:bg-[#183B4E]/50 before:left-0 before:-bottom-4">
      {title}
    </h1>
  );
}
