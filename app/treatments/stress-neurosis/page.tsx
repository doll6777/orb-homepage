import TreatmentPage from '../TreatmentPage';
import { makeTreatmentMetadata, treatments } from '../treatment-data';

const treatment = treatments.stressNeurosis;

export const metadata = makeTreatmentMetadata(treatment);

export default function StressNeurosisPage() {
  return <TreatmentPage treatment={treatment} />;
}
