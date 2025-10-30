import Link from "next/link";
import DisasterMap from '@/components/reliefweb/DisasterMap';
import { communityCrisisData } from "@/actions/community-crisis-data";

export default async function CommunityDisasterPage({ params }) {
    const { id } = await params;
    
    // Find the crisis data by ID
    const crisis = communityCrisisData.find(c => c.id === parseInt(id));
    
    if (!crisis) {
        return (
            <div className="max-w-6xl mx-auto mt-8 p-6">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-gray-900">Crisis Not Found</h1>
                    <p className="text-gray-600 mt-2">The community-reported crisis you're looking for doesn't exist.</p>
                    <Link 
                        href="/explore"
                        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Back to Crisis Map
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-8 p-6">
            <div className="flex items-start justify-between gap-5">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Community Reported
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold">{crisis.name}</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        {crisis.country} • Community Crisis
                    </div>
                </div>
                <div className="text-sm text-gray-500">
                    <div>Crisis ID: <strong className="text-gray-700">{id}</strong></div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-2">
                    <div className="bg-white rounded-lg p-6 shadow-lg border-1 border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Crisis Description</h3>
                        <p className="text-gray-800 text-sm leading-relaxed">{crisis.description}</p>
                        
                        <div className="mt-4 text-sm text-gray-600">
                            <div><strong>Location:</strong> {crisis.country}</div>
                            <div className="mt-1"><strong>Coordinates:</strong> {crisis.lat}, {crisis.lon}</div>
                            <div className="mt-1"><strong>Source:</strong> Community Submission</div>
                            <div className="mt-1"><strong>Status:</strong> Active Crisis</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-lg mt-5 border-1 border-gray-200">
                        <h3 className="text-lg font-semibold mb-3">Ways to Help</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Support those affected by this crisis through volunteer opportunities and aid organizations working in the area.
                        </p>
                        
                        {crisis.volunteerOpportunities && crisis.volunteerOpportunities.length > 0 ? (
                            <div className="space-y-3">
                                {crisis.volunteerOpportunities.map((opportunity) => (
                                    <a 
                                        key={opportunity.id}
                                        href={opportunity.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                                    >
                                        <div>
                                            <div className="text-sm font-medium text-blue-600">{opportunity.organization}</div>
                                            <div className="text-xs text-gray-500">{opportunity.description}</div>
                                        </div>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                ))}
                                
                                <Link 
                                    href={`/submit-volunteer-opportunity?type=community&id=${id}`}
                                    className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                                >
                                    <div>
                                        <div className="text-sm font-medium text-blue-600">Submit Volunteer Opportunity</div>
                                        <div className="text-xs text-gray-500">Add your organization to help with relief efforts</div>
                                    </div>
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-3">
                                        No volunteer opportunities have been submitted for this crisis yet. Be the first to add your organization's relief efforts.
                                    </p>
                                    <Link 
                                        href={`/submit-volunteer-opportunity?type=community&id=${id}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Submit Volunteer Opportunity
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-lg mt-5 border-1 border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold">Community Impact</h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Community Reported</span>
                        </div>
                        <div className="text-sm text-gray-700">
                            <p className="mb-3">
                                This crisis was reported by community members and is being tracked to coordinate relief efforts and support.
                            </p>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <div className="flex items-start">
                                    <svg className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h4 className="text-sm font-medium text-yellow-800">Community Submission</h4>
                                        <p className="text-xs text-yellow-700 mt-1">
                                            This information comes from community reports. If you have additional information about this crisis, please submit an update or contact local authorities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Link 
                                    href="/submit-new-crisis"
                                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Report a Crisis
                                </Link>
                                <span className="text-xs text-gray-400">•</span>
                                <Link 
                                    href="/explore"
                                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    View All Crises
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-3">Location</h3>
                        <div className="h-72 md:h-96">
                            <DisasterMap lat={crisis.lat} lon={crisis.lon} title={crisis.name} />
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            <span>Coordinates: {crisis.lat}, {crisis.lon}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                            Location provided by community submission
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-lg mt-5">
                        <h3 className="text-lg font-semibold mb-3">Crisis Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Type:</span>
                                <span className="text-gray-900">Community Crisis</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Source:</span>
                                <span className="text-gray-900">Community Report</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="text-green-700 font-medium">Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Volunteers:</span>
                                <span className="text-gray-900">{crisis.volunteerOpportunities?.length || 0} opportunities</span>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <Link 
                                href="/explore"
                                className="block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                            >
                                View All Crises
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}