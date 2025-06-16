import React from 'react';
import { useNavigate } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Dev Solutions',
    location: 'Bangalore'
  },
];

export default function JobListPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Job Openings</h1>
      <div className="grid gap-6 max-w-3xl mx-auto">
        {jobs.map((job) => (
          <div key={job.id} className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{job.company} • {job.location}</p>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded font-medium"
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}