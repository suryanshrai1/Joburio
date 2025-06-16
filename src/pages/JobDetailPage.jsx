import React from 'react';
import { useParams } from 'react-router-dom';

const jobData = {
  1: {
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote',
    description: 'Develop UI components using React.',
    requirements: '2+ years experience, HTML, CSS, JavaScript',
    about: 'Tech Corp is a leading remote-first company.'
  },
  2: {
    title: 'Backend Developer',
    company: 'Dev Solutions',
    location: 'Bangalore',
    description: 'Build and maintain APIs using Node.js.',
    requirements: '3+ years experience, Node.js, MongoDB',
    about: 'Dev Solutions is a tech consulting firm based in India.'
  }
};

export default function JobDetailPage() {
  const { jobId } = useParams();
  const job = jobData[jobId];

  if (!job) return <p className="p-6 text-red-500 text-center">Job not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 max-w-2xl w-full rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{job.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{job.company} • {job.location}</p>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Job Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Requirements</h2>
          <p className="text-gray-700">{job.requirements}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">About Company</h2>
          <p className="text-gray-700">{job.about}</p>
        </div>
      </div>
    </div>
  );
}
