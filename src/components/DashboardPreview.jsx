import { Star } from 'lucide-react';

const DashboardPreview = () => {
	return (
		<div className="relative">
			<div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-2xl">
				<div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-600">
					<div className="flex items-center justify-between mb-4">
						<h4 className="font-semibold text-white">simulio</h4>
						<div className="flex space-x-1">
							<div className="w-2 h-2 bg-red-400 rounded-full"></div>
							<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
							<div className="w-2 h-2 bg-green-400 rounded-full"></div>
						</div>
					</div>

					<div className="grid grid-cols-4 gap-2 mb-4">
						{Array.from({ length: 16 }).map((_, i) => (
							<div
								key={i}
								className={`h-12 rounded ${
									i < 4 ? 'bg-purple-400' :
									i < 8 ? 'bg-purple-500' :
									i < 12 ? 'bg-green-400' :
									'bg-yellow-400'
								}`}
							></div>
						))}
					</div>

					<div className="flex items-center justify-between text-sm text-gray-300">
						<span>Simulation en cours...</span>
						<div className="flex items-center">
							<Star className="w-4 h-4 text-yellow-400 mr-1" />
							<span>4.9/5</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPreview;