
"use client";

import { useState } from 'react';

export default function SubmitNewCrisisPage() {
    const [formData, setFormData] = useState({
        // Basic Crisis Information
        crisisName: '',
        crisisType: '',
        severity: '',
        status: 'ongoing',
        description: '',
        
        // Location Information
        country: '',
        region: '',
        city: '',
        latitude: '',
        longitude: '',
        
        // Timeline Information
        startDate: '',
        endDate: '',
        
        // Impact Information
        peopleAffected: '',
        casualties: '',
        displacement: '',
        economicImpact: '',
        
        // Source Information
        reporterName: '',
        reporterEmail: '',
        reporterOrganization: '',
        sources: '',
        
        // Additional Information
        urgencyLevel: 'medium',
        needsAssessment: '',
        reliefEfforts: '',
        contactInfo: '',
        additionalNotes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

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

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Crisis Submitted Successfully!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for reporting this crisis. Our team will review the information and add it to our crisis tracking system to help coordinate relief efforts.
                    </p>
                    <div className="space-y-3">
                        <Link 
                            href="/explore"
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Explore Crisis Map
                        </Link>
                        <Link 
                            href="/"
                            className="block w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <Link 
                                href="/explore"
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Crisis Map
                            </Link>
                            <div className="text-sm text-gray-500">
                                Step {currentStep} of {totalSteps}
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Submit New Crisis</h1>
                        <p className="text-gray-600 mt-2">
                            Help us track and respond to crises worldwide by providing detailed information about an ongoing or recent crisis.
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Basic Info</span>
                                <span>Location</span>
                                <span>Timeline</span>
                                <span>Impact</span>
                                <span>Review</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Step 1: Basic Crisis Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Crisis Information</h2>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="crisisName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Crisis Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="crisisName"
                                            name="crisisName"
                                            required
                                            value={formData.crisisName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Hurricane Maria, Conflict in Region X"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="crisisType" className="block text-sm font-medium text-gray-700 mb-1">
                                            Crisis Type *
                                        </label>
                                        <select
                                            id="crisisType"
                                            name="crisisType"
                                            required
                                            value={formData.crisisType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select crisis type</option>
                                            <option value="natural_disaster">Natural Disaster</option>
                                            <option value="armed_conflict">Armed Conflict</option>
                                            <option value="humanitarian_emergency">Humanitarian Emergency</option>
                                            <option value="health_crisis">Health Crisis/Epidemic</option>
                                            <option value="environmental_crisis">Environmental Crisis</option>
                                            <option value="food_security">Food Security Crisis</option>
                                            <option value="displacement">Displacement Crisis</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                                            Severity Level *
                                        </label>
                                        <select
                                            id="severity"
                                            name="severity"
                                            required
                                            value={formData.severity}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select severity</option>
                                            <option value="low">Low</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="high">High</option>
                                            <option value="severe">Severe</option>
                                            <option value="extreme">Extreme</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Status *
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            required
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="ongoing">Ongoing</option>
                                            <option value="recent">Recent (Last 30 days)</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="monitoring">Under Monitoring</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Crisis Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Provide a detailed description of the crisis, including what happened, when it started, and current situation..."
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location Information */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Location Information</h2>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                            Country *
                                        </label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            required
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Country name"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                                            Region/State/Province
                                        </label>
                                        <input
                                            type="text"
                                            id="region"
                                            name="region"
                                            value={formData.region}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Regional information"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                            City/Area
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Specific city or area affected"
                                        />
                                    </div>
                                </div>
                                
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Geographic Coordinates</h3>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Provide approximate coordinates for the center of the affected area. You can use Google Maps or similar tools to find coordinates.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                                                Latitude *
                                            </label>
                                            <input
                                                type="number"
                                                id="latitude"
                                                name="latitude"
                                                required
                                                step="any"
                                                min="-90"
                                                max="90"
                                                value={formData.latitude}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="e.g., 40.7128"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                                                Longitude *
                                            </label>
                                            <input
                                                type="number"
                                                id="longitude"
                                                name="longitude"
                                                required
                                                step="any"
                                                min="-180"
                                                max="180"
                                                value={formData.longitude}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="e.g., -74.0060"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Timeline Information */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Timeline Information</h2>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date *
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            required
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">When did this crisis begin?</p>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date (if applicable)
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Leave blank if ongoing</p>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700 mb-1">
                                            Urgency Level *
                                        </label>
                                        <select
                                            id="urgencyLevel"
                                            name="urgencyLevel"
                                            required
                                            value={formData.urgencyLevel}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="low">Low - Stable situation</option>
                                            <option value="medium">Medium - Requires monitoring</option>
                                            <option value="high">High - Immediate attention needed</option>
                                            <option value="critical">Critical - Emergency response required</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Impact Information */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Impact Assessment</h2>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="peopleAffected" className="block text-sm font-medium text-gray-700 mb-1">
                                            People Affected (estimated)
                                        </label>
                                        <input
                                            type="number"
                                            id="peopleAffected"
                                            name="peopleAffected"
                                            min="0"
                                            value={formData.peopleAffected}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Number of people affected"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="casualties" className="block text-sm font-medium text-gray-700 mb-1">
                                            Casualties (if known)
                                        </label>
                                        <input
                                            type="number"
                                            id="casualties"
                                            name="casualties"
                                            min="0"
                                            value={formData.casualties}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Number of casualties"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="displacement" className="block text-sm font-medium text-gray-700 mb-1">
                                            Displaced People
                                        </label>
                                        <input
                                            type="number"
                                            id="displacement"
                                            name="displacement"
                                            min="0"
                                            value={formData.displacement}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Number of displaced people"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="economicImpact" className="block text-sm font-medium text-gray-700 mb-1">
                                            Economic Impact (USD)
                                        </label>
                                        <input
                                            type="number"
                                            id="economicImpact"
                                            name="economicImpact"
                                            min="0"
                                            value={formData.economicImpact}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Estimated economic impact"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="needsAssessment" className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Needs Assessment
                                    </label>
                                    <textarea
                                        id="needsAssessment"
                                        name="needsAssessment"
                                        rows={3}
                                        value={formData.needsAssessment}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="What are the most urgent needs? (food, water, shelter, medical care, etc.)"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="reliefEfforts" className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Relief Efforts
                                    </label>
                                    <textarea
                                        id="reliefEfforts"
                                        name="reliefEfforts"
                                        rows={3}
                                        value={formData.reliefEfforts}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="What relief efforts are currently underway? Which organizations are involved?"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 5: Source Information & Review */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Source Information & Review</h2>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="reporterName"
                                            name="reporterName"
                                            required
                                            value={formData.reporterName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Full name"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="reporterEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="reporterEmail"
                                            name="reporterEmail"
                                            required
                                            value={formData.reporterEmail}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label htmlFor="reporterOrganization" className="block text-sm font-medium text-gray-700 mb-1">
                                            Organization/Affiliation
                                        </label>
                                        <input
                                            type="text"
                                            id="reporterOrganization"
                                            name="reporterOrganization"
                                            value={formData.reporterOrganization}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Organization name (if applicable)"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="sources" className="block text-sm font-medium text-gray-700 mb-1">
                                        Information Sources
                                    </label>
                                    <textarea
                                        id="sources"
                                        name="sources"
                                        rows={3}
                                        value={formData.sources}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="List your sources of information (news articles, government reports, personal observation, etc.)"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Information for Follow-up
                                    </label>
                                    <textarea
                                        id="contactInfo"
                                        name="contactInfo"
                                        rows={2}
                                        value={formData.contactInfo}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Additional contact information or preferred contact method"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Notes
                                    </label>
                                    <textarea
                                        id="additionalNotes"
                                        name="additionalNotes"
                                        rows={3}
                                        value={formData.additionalNotes}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Any additional information that might be helpful..."
                                    />
                                </div>
                                
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex">
                                        <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                                            <p className="text-sm text-yellow-700 mt-1">
                                                All crisis submissions will be reviewed by our team before being added to the crisis tracking system. We may contact you for additional information or verification.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-6 py-2 rounded-md transition-colors ${
                                    currentStep === 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Previous
                            </button>
                            
                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-6 py-2 rounded-md transition-colors ${
                                        isSubmitting 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    } text-white`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Crisis Report'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}