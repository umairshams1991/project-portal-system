import Head from 'next/head';
import Layout from '../components/Layout';

export default function Reports() {
  const reports = [
    {
      id: 1,
      title: 'Monthly Progress Report - January 2024',
      type: 'Monthly',
      project: 'Crop Monitoring System',
      date: 'Jan 31, 2024',
      status: 'Approved',
      author: 'Abdul Ghafoor',
    },
    {
      id: 2,
      title: 'Monthly Progress Report - January 2024',
      type: 'Monthly',
      project: 'Lab Construction',
      date: 'Jan 31, 2024',
      status: 'Pending',
      author: 'Dr. Muhammad Ilyas',
    },
    {
      id: 3,
      title: 'Quarterly Review - Q4 2023',
      type: 'Quarterly',
      project: 'Seed Testing Lab Upgrade',
      date: 'Dec 31, 2023',
      status: 'Approved',
      author: 'Mr. Khalid Hussain',
    },
    {
      id: 4,
      title: 'Milestone Completion Report',
      type: 'Milestone',
      project: 'Crop Monitoring System',
      date: 'Nov 15, 2023',
      status: 'Approved',
      author: 'Abdul Ghafoor',
    },
  ];

  const reportTypes = [
    { id: 'monthly', name: 'Monthly Reports' },
    { id: 'quarterly', name: 'Quarterly Reports' },
    { id: 'annual', name: 'Annual Reports' },
    { id: 'custom', name: 'Custom Reports' },
  ];

  return (
    <Layout>
      <Head>
        <title>Reports | Project Portal System</title>
        <meta name="description" content="Project Reporting System" />
      </Head>

      <div className="space-y-6">
        <div className="pb-5 border-b border-gray-200">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
              <p className="mt-2 text-sm text-gray-700">
                Generate and manage project reports in various formats.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Generate New Report
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Report Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Filters</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">
                      Report Type
                    </label>
                    <select
                      id="report-type"
                      name="report-type"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>All Types</option>
                      {reportTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                      Project
                    </label>
                    <select
                      id="project"
                      name="project"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>All Projects</option>
                      <option>Crop Monitoring System</option>
                      <option>Lab Construction</option>
                      <option>Seed Testing Lab Upgrade</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>All Statuses</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">
                      Date Range
                    </label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                      <input
                        type="date"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Report List */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <li key={report.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-indigo-600 truncate">
                          {report.title}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                            report.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : report.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6 text-sm text-gray-900 truncate">
                            <span className="text-gray-500">Type:</span> {report.type}
                          </div>
                          <div className="text-sm text-gray-900 truncate">
                            <span className="text-gray-500">Project:</span> {report.project}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span>Author: {report.author}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span>Date: {report.date}</span>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                            onClick={() => alert(`Downloading ${report.title}`)}
                          >
                            Download
                          </button>
                          <button
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                            onClick={() => alert(`Viewing ${report.title}`)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Report Generation Options */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Generate New Report</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <button
                    className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    onClick={() => alert('Generating PDF report')}
                  >
                    <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-900">PDF</div>
                    <div className="text-xs text-gray-500">Portable Document Format</div>
                  </button>

                  <button
                    className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    onClick={() => alert('Generating Excel report')}
                  >
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-900">Excel</div>
                    <div className="text-xs text-gray-500">Spreadsheet Format</div>
                  </button>

                  <button
                    className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    onClick={() => alert('Generating Word report')}
                  >
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-900">Word</div>
                    <div className="text-xs text-gray-500">Document Format</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}