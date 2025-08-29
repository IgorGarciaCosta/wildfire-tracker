export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-600 z-50">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        {/* ícone planeta (emoji ou SVG) */}
        <span className="text-xl">🪐</span>

        {/* título */}
        <h1 className="text-lg font-semibold text-white">
          Natural&nbsp;Disaster&nbsp;Tracker&nbsp;
          <span className="text-sm font-normal opacity-80">
            (Powered&nbsp;by&nbsp;NASA)
          </span>
        </h1>
      </div>
    </header>
  );
}
