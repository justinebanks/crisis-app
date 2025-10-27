import { summarizeWithGemini } from "@/actions/gemini";
import { getUCDPConflict, getUCDPEvents } from "@/actions/ucdp";
import UCDPConflictMap from '@/components/UCDPConflictMap';

export default async function UCDPDisasterPage({ params }) {
    const { id } = await params;
    // Fetch conflict metadata and its events in parallel when possible
    const conflictData = await getUCDPConflict(id);

    const aiSummary = await summarizeWithGemini(conflictData["EntityDescription"] || 'No description available.', 150);

    console.log("Conflict Data: ", conflictData);
  
    // Try to determine a Dyad or Conflict filter for events
    const dyadId = conflictData["Dyads"].map(d => d.Id).join(',');

    // Fetch events for the conflict. Use Dyad if available, otherwise try Conflict filter.
    let eventsResp = null;
    try {
        if (dyadId) {
            eventsResp = await getUCDPEvents("25.0.9", { Dyad: dyadId, pagesize: 1000 });
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
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Summary</h3>
                        <div className="text-sm text-gray-700">
                            <div className="mt-1"><strong>Involved:</strong> {conflictData["Actors"].map(actor => actor["Name"]).join(', ') || 'N/A'}</div>
                            <div className="mt-1"><strong>Severity:</strong> {severity}</div>
                            <div className="mt-1"><strong>Total events:</strong> {events.length}</div>
                            <div className="mt-1"><strong>Estimated deaths:</strong> {totalDeaths}</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Conflict Description</h3>
                        <div className="text-sm text-gray-700">
                            { aiSummary }
                        </div>
                    </div>
  
                    <div className="bg-white rounded-lg p-6 shadow-lg">
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
