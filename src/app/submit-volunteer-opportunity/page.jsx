"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SubmitVolunteerOpportunityPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type'); // 'reliefweb' or 'ucdp'
    const id = searchParams.get('id'); // disaster/conflict ID
    
    const [formData, setFormData] = useState({
        organizationName: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        description: '',
        volunteersNeeded: '',
        location: '',
        startDate: '',
        endDate: '',
        skills: '',
        requirements: '',
        contactPerson: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
        }, 2000);
    };

    const crisisType = type === 'reliefweb' ? 'disaster' : 'conflict';
    const backUrl = type === 'reliefweb' ? `/disasters/reliefweb/${id}` : `/disasters/ucdp/${id}`;

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Successful!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for submitting your volunteer opportunity. Our team will review it and make it available to help with this {crisisType}.
                    </p>
                    <div className="space-y-3">
                        <Link 
                            href={backUrl}
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Back to {crisisType === 'disaster' ? 'Disaster' : 'Conflict'} Page
                        </Link>
                        <Link 
                            href="/explore"
                            className="block w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
                        >
                            Explore More Crises
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-6">
                        <Link 
                            href={backUrl}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center mb-4"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to {crisisType === 'disaster' ? 'Disaster' : 'Conflict'} Page
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Submit Volunteer Opportunity</h1>
                        <p className="text-gray-600 mt-2">
                            Help connect volunteers with relief efforts for this {crisisType}. Please provide details about your organization and the volunteer opportunity.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Organization Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Organization Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="organizationName"
                                        name="organizationName"
                                        required
                                        value={formData.organizationName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your organization name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Person *
                                    </label>
                                    <input
                                        type="text"
                                        id="contactPerson"
                                        name="contactPerson"
                                        required
                                        value={formData.contactPerson}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Contact person name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="contactEmail"
                                        name="contactEmail"
                                        required
                                        value={formData.contactEmail}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="contact@organization.org"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactPhone"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                                        Organization Website
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://www.organization.org"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Volunteer Opportunity Details */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Volunteer Opportunity Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Opportunity Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Describe the volunteer opportunity, tasks involved, and how it helps with relief efforts..."
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="volunteersNeeded" className="block text-sm font-medium text-gray-700 mb-1">
                                            Number of Volunteers Needed
                                        </label>
                                        <input
                                            type="number"
                                            id="volunteersNeeded"
                                            name="volunteersNeeded"
                                            min="1"
                                            value={formData.volunteersNeeded}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="10"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            required
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="City, State/Country or 'Remote'"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                                        Required Skills/Experience
                                    </label>
                                    <textarea
                                        id="skills"
                                        name="skills"
                                        rows={3}
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="List any specific skills, certifications, or experience required..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Requirements
                                    </label>
                                    <textarea
                                        id="requirements"
                                        name="requirements"
                                        rows={3}
                                        value={formData.requirements}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Age restrictions, background checks, physical requirements, etc..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Crisis Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Crisis Information</h3>
                            <div className="text-sm text-gray-600">
                                <div><strong>Type:</strong> {crisisType === 'disaster' ? 'Natural Disaster' : 'Armed Conflict'}</div>
                                <div><strong>Crisis ID:</strong> {id}</div>
                                <div><strong>Data Source:</strong> {type === 'reliefweb' ? 'ReliefWeb' : 'UCDP'}</div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4">
                            <Link
                                href={backUrl}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2 rounded-md transition-colors ${
                                    isSubmitting 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Opportunity'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}