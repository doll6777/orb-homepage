import TreatmentPage from '../TreatmentPage';
import { makeTreatmentMetadata, treatments } from '../treatment-data';

const treatment = treatments.autonomicQeeg;

export const metadata = makeTreatmentMetadata(treatment);

export default function AutonomicQeegPage() {
  return <TreatmentPage treatment={treatment} />;
}
