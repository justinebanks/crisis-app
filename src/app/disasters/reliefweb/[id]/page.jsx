import { getRWDisasterByID, getRWReportsByDisasterID } from "@/actions/reliefweb";
import DisasterMap from '@/components/reliefweb/DisasterMap';
import Link from "next/link";
import { summarizeWithGemini, getImagesWithGemini } from "@/actions/gemini";

export default async function ReliefWebDisasterPage({ params }) {
    const { id } = await params;

    // Fetch disaster and reports in parallel
    const [disasterResp, reportsResp] = await Promise.all([
        getRWDisasterByID(id),
        getRWReportsByDisasterID(id)
    ]);

    const disaster = disasterResp?.data?.[0]?.fields || null;
    const reports = reportsResp?.data || [];

    const aiSummary = await summarizeWithGemini(disaster?.description || '', 150);
    // const aiImages = await getImagesWithGemini(disaster?.description || '', 6);
    // console.log("AI Images: ", aiImages);

    // Try to resolve coordinates from known Response shapes
    let lat = null;
    let lon = null;
    const country = disaster?.country?.[0];
    if (country?.location?.lat && country?.location?.lon) {
        lat = country.location.lat;
        lon = country.location.lon;
    } else if (disaster?.location?.[0]?.lat && disaster?.location?.[0]?.lon) {
        lat = disaster.location[0].lat;
        lon = disaster.location[0].lon;
    }

    return (
        <div className="max-w-6xl mx-auto mt-8 p-6">
            <div className="flex items-start justify-between gap-5">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-bold">{disaster?.name || 'Unknown disaster'}</h1>
                        <div className="text-sm text-gray-500 mt-1">
                            {disaster?.country?.map(c => c.name).join(', ') || 'Country unknown'} • {disaster?.type[0].name || 'Type unknown'}
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        <div>Disaster ID: <strong className="text-gray-700">{id}</strong></div>
                    </div>
                </div>

                {/* <div>
                    <h3 className="text-lg font-semibold mb-2">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {aiImages.map((img, index) => (
                            <div key={index} className="aspect-w-16 aspect-h-9">
                                <img src={img} alt={`Disaster image ${index + 1}`} className="object-cover rounded-lg shadow-md" />
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg p-6 shadow-lg border-1 border-gray-200">
                            <h3 className="text-lg font-semibold mb-2">Overview</h3>
                            {disaster?.description && aiSummary ? (
                                <p className="text-gray-800 text-sm leading-relaxed">{aiSummary}</p>
                            ) : (
                                <p className="text-gray-500 text-sm italic">No description available.</p>
                            )}

                            <div className="mt-4 text-sm text-gray-600">
                                <div><strong>Start date:</strong> {new Date(disaster?.date.created).toLocaleString() || 'Unknown'}</div>
                                <div className="mt-1"><strong>Status:</strong> {disaster?.status || 'Unknown'}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg mt-5 border-1 border-gray-200">
                            <h3 className="text-lg font-semibold mb-3">Ways to Help</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Make a difference by supporting disaster relief efforts and helping affected communities recover.
                            </p>
                            <div className="space-y-3">
                                <a 
                                    href="https://google.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                                >
                                    <div>
                                        <div className="text-sm font-medium text-blue-600">Emergency Relief Donations</div>
                                        <div className="text-xs text-gray-500">Provide immediate aid for food, water, and shelter</div>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                                <a 
                                    href="https://google.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                                >
                                    <div>
                                        <div className="text-sm font-medium text-blue-600">Volunteer for Recovery</div>
                                        <div className="text-xs text-gray-500">Join local efforts to help rebuild communities</div>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                                <a 
                                    href="https://google.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                                >
                                    <div>
                                        <div className="text-sm font-medium text-blue-600">Support Preparedness Programs</div>
                                        <div className="text-xs text-gray-500">Fund disaster prevention and early warning systems</div>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>

                                <Link 
                                    href={`/submit-volunteer-opportunity?type=reliefweb&id=${id}`}
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
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg mt-5 border-1 border-gray-200">
                            <h3 className="text-lg font-semibold mb-3">Reports <span className="text-sm text-gray-500">({reports.length})</span></h3>
                            <div className="grid gap-3">
                                {reports.length === 0 && <div className="text-gray-500 italic">No reports found for this disaster.</div>}
                                {reports.map((r) => {
                                    const f = r.fields || {};
                                    const title = f.title || f.source_headline || 'Untitled report';
                                    const source = f.source?.name || f.source || 'Unknown source';
                                    const date = f.date || f.posted || f.created || '';
                                    const url = f.url?.[0]?.href || f.url || f.source_url || null;

                                    return (
                                        <div key={r.id} className="border-l-4 border-red-500 p-3 bg-gradient-to-r from-white to-gray-50 rounded hover:border-y-1 hover:border-r-1 hover:bg-gray-200 hover:border-black">
                                            <div className="text-sm font-semibold">{title}</div>
                                            <div className="text-xs text-gray-500">{source} • {date}</div>
                                            {url && (
                                                <div className="mt-2">
                                                    <Link className="text-sm text-blue-600 hover:underline" href={url} target="_blank" rel="noreferrer">Read report</Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    <div>
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-3">Location</h3>
                            <div className="h-72 md:h-96">
                                <DisasterMap lat={lat} lon={lon} title={disaster?.name} />
                            </div>
                            <div className="mt-3 text-sm text-gray-500">
                                {lat && lon ? (
                                    <span>Coordinates: {lat.toFixed ? lat.toFixed(4) : lat}, {lon.toFixed ? lon.toFixed(4) : lon}</span>
                                ) : (
                                    <span className="italic text-gray-500">Coordinates not available</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

