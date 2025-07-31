const HeroSection = () => {
	return (
		<section className="bg-gray-900 py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-4xl mx-auto">
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
						Boostez vos ventes immobilières
					</h1>
					<p className="text-xl md:text-2xl text-gray-300 mb-12">
						Grâce aux simulateurs les plus puissants du marché
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
						<button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl">
							RÉSERVEZ VOTRE DÉMO AUJOURD'HUI
						</button>
						<button className="border-2 border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
							PRENDRE RDV
						</button>
					</div>

					<p className="text-gray-400 text-sm">
						Boostez vos ventes dès demain
					</p>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;