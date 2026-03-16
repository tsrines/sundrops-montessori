import type { Metadata } from 'next';
import { BridgeHero } from '@/components/bridge/bridge-hero';
import { BridgeProgramCards } from '@/components/bridge/bridge-program-cards';
import { BridgeInfoGrid } from '@/components/bridge/bridge-info-grid';
import { BridgeAdmin } from '@/components/bridge/bridge-admin';
import { BridgeLeadGuides } from '@/components/bridge/bridge-lead-guides';

export const metadata: Metadata = {
  title: 'Bridge Campus | Sundrops Montessori',
  description:
    'Our flagship campus in Mt Pleasant serves children from 6 weeks through 10th grade. The Bridge Campus features purpose-built Montessori classrooms, outdoor learning gardens, and a welcoming community for families in the East Cooper area.',
};

export default function BridgeCampusPage() {
  return (
    <>
      <BridgeHero />
      <BridgeProgramCards />
      <BridgeInfoGrid />
      <BridgeAdmin />
      <BridgeLeadGuides />
    </>
  );
}
