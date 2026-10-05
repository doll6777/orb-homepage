import TreatmentPage from '../TreatmentPage';
import { makeTreatmentMetadata, treatments } from '../treatment-data';

const treatment = treatments.weightMetabolism;

export const metadata = makeTreatmentMetadata(treatment);

export default function WeightMetabolismPage() {
  return <TreatmentPage treatment={treatment} />;
}
