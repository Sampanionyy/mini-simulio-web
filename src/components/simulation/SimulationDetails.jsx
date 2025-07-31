import { format } from 'date-fns';

const SimulationDetails = ({ simulation }) => {
    return (
        <div className="text-gray-300 text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <div><strong>Prix du bien :</strong> {simulation.prix_bien} €</div>
                <div><strong>Frais de notaire :</strong> {simulation.frais_notaire} €</div>
                <div><strong>Garantie bancaire :</strong> {simulation.garantie_bancaire} €</div>
                <div><strong>Frais d'agence :</strong> {simulation.frais_agence} €</div>
                <div><strong>Apport :</strong> {simulation.apport} %</div>
                <div><strong>Total à financer :</strong> {simulation.total_financer} €</div>
                <div><strong>Taux d'intérêt :</strong> {simulation.taux_interet} %</div>
                <div><strong>Taux assurance :</strong> {simulation.taux_assurance} %</div>
            </div>
            <div>
                <div><strong>Assurance totale :</strong> {simulation.assurance_total} €</div>
                <div><strong>Intérêts totaux :</strong> {simulation.interets_total} €</div>
                <div><strong>Salaire minimum :</strong> {simulation.salaire_minimum} €</div>
                <div><strong>Durée (années) :</strong> {simulation.duree_annees}</div>
                <div><strong>Mois de début :</strong> {simulation.mois_debut}</div>
                <div><strong>Année de début :</strong> {simulation.annee_debut}</div>
                <div><strong>Date acquisition :</strong> {format(new Date(simulation.date_acquisition), 'dd/MM/yyyy')}</div>
                <div><strong>Date financement :</strong> {format(new Date(simulation.date_financement), 'dd/MM/yyyy')}</div>
                <div><strong>Revalorisation bien :</strong> {simulation.revalorisation_bien} %</div>
                <div><strong>Travaux :</strong> {simulation.travaux} €</div>
            </div>
        </div>
    );
};

export default SimulationDetails;
