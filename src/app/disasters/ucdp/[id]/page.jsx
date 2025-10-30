import { summarizeWithGemini } from "@/actions/gemini";
import { getUCDPConflict, getUCDPEvents } from "@/actions/ucdp";
import UCDPConflictMap from '@/components/ucdp/UCDPConflictMap';
import Link from 'next/link';

export default async function UCDPDisasterPage({ params }) {
    const { id } = await params;
    // Fetch conflict metadata and its events in parallel when possible
    const conflictData = await getUCDPConflict(id);

    const aiSummary = await summarizeWithGemini(conflictData["EntityDescription"] || 'No description available.', 150);

    console.log("Conflict Data: ", conflictData);
  
    // Try to determine a Dyad or Conflict filter for events
    const dyadIds = conflictData["Dyads"] ? conflictData["Dyads"].map(d => d.Id).join(',') : "";

    // Fetch events for the conflict. Use Dyad if available, otherwise try Conflict filter.
    let eventsResp = null;
    try {
        if (dyadIds) {
            eventsResp = await getUCDPEvents("25.0.9", { Dyad: dyadIds, pagesize: 1000 });
        } else {
            // fallback: fetch events by conflict name
            const name = conflictData?.Name || conflictData?.name || '';
            eventsResp = await getUCDPEvents("25.0.9", { q: name, pagesize: 1000 });
        }
    } catch (err) {
        console.error('Error fetching UCDP events', err);
    }
  
    const events = eventsResp?.events || [];
  
    // compute severity as total deaths across events
    const totalDeaths = events.reduce((sum, e) => {
        const da = Number(e.deaths_a) || 0;
        const db = Number(e.deaths_b) || 0;
        const dc = Number(e.deaths_civilians) || 0;
        const du = Number(e.deaths_unknown) || 0;
        return sum + da + db + dc + du;
    }, 0);
  
    // severity banding (simple heuristic)
    const severity = totalDeaths >= 10000 ? 'Extreme' : totalDeaths >= 1000 ? 'Severe' : totalDeaths >= 100 ? 'Moderate' : totalDeaths >= 1 ? 'Low' : 'Negligible';
  
    // compute center from events
    const coords = events
        .map(e => ({ lat: Number(e.latitude), lon: Number(e.longitude) }))
        .filter(c => isFinite(c.lat) && isFinite(c.lon));
  
    const center = coords.length > 0 ? {
        lat: coords.reduce((s, c) => s + c.lat, 0) / coords.length,
        lon: coords.reduce((s, c) => s + c.lon, 0) / coords.length,
    } : null;
  
    // render
    return (
        <div className="max-w-6xl mx-auto p-6 mt-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{conflictData["EntityName"] || 'Unknown conflict'}</h1>
                    <div className="text-sm text-gray-500 mt-1">ID: <span className="text-gray-700">{id}</span></div>
                </div>
            </div>
  
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-white rounded-lg p-6 shadow-lg border-1 border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Summary</h3>
                        <div className="text-sm text-gray-700">
                            <div className="mt-1"><strong>Actors Involved:</strong> {conflictData["Actors"] ? conflictData["Actors"].map(actor => actor["Name"]).join(', ') : 'N/A'}</div>
                            <div className="mt-1"><strong>Countries Involved:</strong> {conflictData["Countries"] ? conflictData["Countries"].map(country => country["Name"]).join(', ') : 'N/A'}</div>
                            <div className="mt-1"><strong>Severity:</strong> {severity}</div>
                            <div className="mt-1"><strong>Total events:</strong> {events.length}</div>
                            <div className="mt-1"><strong>Estimated deaths:</strong> {totalDeaths}</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-lg border-1 border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Conflict Description</h3>
                        <div className="text-sm text-gray-700">
                            { aiSummary ? aiSummary : 'No summary available.' }
                        </div>
                    </div>

                                        <div className="bg-white rounded-lg p-6 shadow-lg border-1 border-gray-200">
                        <h3 className="text-lg font-semibold mb-3">Ways to Help</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Support those affected by this conflict through humanitarian organizations and peace-building initiatives.
                        </p>
                        <div className="space-y-3">
                            <a 
                                href="https://google.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                            >
                                <div>
                                    <div className="text-sm font-medium text-blue-600">Donate to Humanitarian Relief</div>
                                    <div className="text-xs text-gray-500">Provide emergency aid to affected communities</div>
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
                                    <div className="text-sm font-medium text-blue-600">Support Peace Organizations</div>
                                    <div className="text-xs text-gray-500">Fund conflict resolution and mediation efforts</div>
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
                                    <div className="text-sm font-medium text-blue-600">Advocate for Policy Change</div>
                                    <div className="text-xs text-gray-500">Contact representatives about conflict prevention</div>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>

                            <Link 
                                href={`/submit-volunteer-opportunity?type=ucdp&id=${id}`}
                                className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                            >
                                <div>
                                    <div className="text-sm font-medium text-blue-600">Submit Volunteer Opportunity</div>
                                    <div className="text-xs text-gray-500">Add your organization to help with conflict relief</div>
                                </div>
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* <div className="bg-white rounded-lg p-6 shadow-lg border-1 border-gray-200">
                        <h3 className="text-lg font-semibold mb-3">Volunteer Organizations</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Connect with organizations working to provide relief and support for those affected by this conflict.
                        </p>
                        <div className="space-y-3">
                            <Link 
                                href={`/submit-volunteer-opportunity?type=ucdp&id=${id}`}
                                className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                            >
                                <div>
                                    <div className="text-sm font-medium text-blue-600">Submit Volunteer Opportunity</div>
                                    <div className="text-xs text-gray-500">Add your organization to help with conflict relief</div>
                                </div>
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </Link>
                        </div>
                    </div> */}
  
                    <div className="bg-white rounded-lg p-6 shadow-lg border-1 border-gray-200">
                        <h3 className="text-lg font-semibold mb-3">Events</h3>
                        {events.length === 0 ? (
                            <div className="text-gray-500 italic">No events found for this conflict.</div>
                        ) : (
                            <div className="space-y-3 overflow-y-scroll max-h-96">
                                {events.slice(0, 200).map(e => {
                                    const deaths = (Number(e.deaths_a)||0) + (Number(e.deaths_b)||0) + (Number(e.deaths_civilians)||0) + (Number(e.deaths_unknown)||0);
                                    return (
                                        <div key={e.id} className="p-3 rounded border bg-white">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-sm font-semibold">{e.source_headline || `Event ${e.id}`}</div>
                                                    <div className="text-xs text-gray-500">Type: {e.type_of_violence || 'Unknown'}</div>
                                                    <div className="text-xs text-gray-500">Date: {new Date(e.date_start).toLocaleDateString() + " - " + new Date(e.date_end).toLocaleDateString()}</div>
                                                    <div className="text-xs text-gray-500">Source: {e.source_office || 'Unknown'}</div>
                                                </div>
                                                <div className="text-right text-sm text-gray-600">
                                                    <div>Deaths: <span className="font-semibold text-gray-800">{deaths}</span></div>
                                                    <div className="text-xs text-gray-500">Event ID: {e.id}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {events.length > 200 && <div className="text-sm text-gray-500">Showing first 200 events for performance — there are {events.length} events total.</div>}
                            </div>
                        )}
                    </div>


                </div>
  
                <div>
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                        <h3 className="text-lg font-semibold mb-3">Map</h3>
                        <UCDPConflictMap events={events} center={center} />
                        <div className="mt-3 text-sm text-gray-500">
                            {center ? `Map center: ${center.lat.toFixed(4)}, ${center.lon.toFixed(4)}` : 'No valid coordinates available.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
