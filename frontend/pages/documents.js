import Head from 'next/head';
import Layout from '../components/Layout';

export default function Documents() {
  const documents = [
    {
      id: 1,
      name: 'Project Charter.pdf',
      type: 'PDF',
      size: '2.4 MB',
      project: 'Crop Monitoring System',
      uploadedDate: 'Jan 15, 2024',
      uploadedBy: 'Abdul Ghafoor',
    },
    {
      id: 2,
      name: 'Budget Allocation.xlsx',
      type: 'Excel',
      size: '1.1 MB',
      project: 'Lab Construction',
      uploadedDate: 'Jan 20, 2024',
      uploadedBy: 'Dr. Muhammad Ilyas',
    },
    {
      id: 3,
      name: 'Technical Specifications.docx',
      type: 'Word',
      size: '3.7 MB',
      project: 'Seed Testing Lab Upgrade',
      uploadedDate: 'Jan 25, 2024',
      uploadedBy: 'Mr. Khalid Hussain',
    },
    {
      id: 4,
      name: 'Site Survey Photos.zip',
      type: 'Archive',
      size: '15.2 MB',
      project: 'Lab Construction',
      uploadedDate: 'Feb 1, 2024',
      uploadedBy: 'Dr. Muhammad Ilyas',
    },
    {
      id: 5,
      name: 'Equipment List.csv',
      type: 'CSV',
      size: '0.3 MB',
      project: 'Seed Testing Lab Upgrade',
      uploadedDate: 'Feb 5, 2024',
      uploadedBy: 'Mr. Khalid Hussain',
    },
  ];

  const fileTypes = [
    { id: 'all', name: 'All Files' },
    { id: 'pdf', name: 'PDF Files' },
    { id: 'excel', name: 'Excel Files' },
    { id: 'word', name: 'Word Files' },
    { id: 'images', name: 'Images' },
    { id: 'archive', name: 'Archives' },
  ];

  return (
    <Layout>
      <Head>
        <title>Documents | Project Portal System</title>
        <meta name="description" content="Document Management System" />
      </Head>

      <div className="space-y-6">
        <div className="pb-5 border-b border-gray-200">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Documents</h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage project documents and files.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Document Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Filters</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="file-type" className="block text-sm font-medium text-gray-700">
                      File Type
                    </label>
                    <select
                      id="file-type"
                      name="file-type"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      {fileTypes.map((type) => (
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
                    <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">
                      Upload Date
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

          {/* Document List */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {documents.map((document) => (
                  <li key={document.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12 rounded-md bg-indigo-100 flex items-center justify-center">
                          {document.type === 'PDF' && (
                            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                          {document.type === 'Excel' && (
                            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                          {document.type === 'Word' && (
                            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                          {document.type === 'Archive' && (
                            <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                          )}
                          {document.type === 'CSV' && (
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{document.name}</p>
                          <p className="text-sm text-gray-500 truncate">{document.project}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <p className="text-sm text-gray-500">{document.size}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0 text-right">
                          <p className="text-sm font-medium text-gray-900">{document.uploadedDate}</p>
                          <p className="text-sm text-gray-500">{document.uploadedBy}</p>
                        </div>
                        <div className="ml-6 flex space-x-4">
                          <button
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                            onClick={() => alert(`Downloading ${document.name}`)}
                          >
                            Download
                          </button>
                          <button
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                            onClick={() => alert(`Deleting ${document.name}`)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upload Area */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Document</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, Word, Excel, ZIP up to 50MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}