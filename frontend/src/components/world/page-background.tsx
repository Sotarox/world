const mapMaskStyle = {
  WebkitMaskImage: "url('/dotted-world-map.svg')",
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center top',
  WebkitMaskSize: 'min(980px, 110vw) auto',
  maskImage: "url('/dotted-world-map.svg')",
  maskRepeat: 'no-repeat',
  maskPosition: 'center top',
  maskSize: 'min(980px, 110vw) auto',
} as const;

interface PageBackgroundProps {
  children: React.ReactNode;
  showMap?: boolean;
}

function PageBackground({ children, showMap = false }: PageBackgroundProps) {
  return (
    <div className='relative isolate'>
      {/* Background */}
      <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute inset-0 overflow-hidden bg-gradient-to-b from-transparent via-teal-50/40 to-transparent dark:via-slate-900/30' />
        {showMap && (
          <div
            className='absolute left-0 right-0 top-0 h-[420px] md:h-[520px] bg-teal-700/20 dark:bg-sky-100/12'
            style={mapMaskStyle}
          />
        )}
        {/* Grid */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(20,45,80,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,45,80,0.11)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70 [mask-image:radial-gradient(ellipse_at_55%_20%,black_42%,transparent_95%)] dark:bg-[linear-gradient(to_right,rgba(180,220,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,220,255,0.12)_1px,transparent_1px)]' />
      </div>
      {children}
    </div>
  );
}

PageBackground.displayName = 'PageBackground';
export { PageBackground };
