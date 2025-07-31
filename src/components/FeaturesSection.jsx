import { CheckCircle, TrendingUp, Users, Building, Star } from 'lucide-react';
import DashboardPreview from './DashboardPreview';

const FeaturesSection = () => {
	const features = [
		{
			icon: <CheckCircle className="w-6 h-6 text-green-400" />,
			title: "Validez vos chiffres sans attendre un courtier",
			description: "Gagnez du temps et accélérez le processus de vente."
		},
		{
			icon: <Building className="w-6 h-6 text-purple-400" />,
			title: "Projetez vos clients comme jamais auparavant",
			description: "Rendez l'immobilier concret avec des simulations précises et visuelles."
		},
		{
			icon: <TrendingUp className="w-6 h-6 text-green-400" />,
			title: "Augmentez vos revenus de 65 %",
			description: "Une solution qui transforme vos prospects en clients signés."
		},
		{
			icon: <Users className="w-6 h-6 text-purple-400" />,
			title: "Prêt à l'usage pour un junior",
			description: "Les nouveaux conseillers prennent une assise immédiate grâce à Simulio."
		}
	];

	return (
		<section className="py-20 bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-8">
						{features.map((feature, index) => (
							<div key={index} className="flex items-start space-x-4">
								<div className="flex-shrink-0 mt-1">
									{feature.icon}
								</div>
								<div>
									<h3 className="text-lg font-semibold text-white mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-400">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>

					<DashboardPreview />
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;