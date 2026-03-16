import { BRIDGE_LEAD_GUIDES } from '@/lib/data/bridge-content';

export function BridgeLeadGuides() {
  return (
    <section className="w-full bg-[#F7F7F7] py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-3xl font-bold uppercase tracking-wide text-gray-900 md:text-4xl">
          Bridge Campus Lead Guides
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {BRIDGE_LEAD_GUIDES.map((guide) => (
            <div key={guide.name} className="text-center">
              <p className="text-base font-bold text-gray-900">{guide.name}</p>
              <p className="mt-1 text-sm text-gray-500">{guide.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
