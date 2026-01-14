import Head from 'next/head';
import Layout from '../components/Layout';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      projectCode: 'PW-PROJ-001',
      projectName: 'Monitoring of Crops through Satellite Technology (Phase-II)',
      sector: 'Agriculture',
      location: 'All Over National',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      budget: 5000000,
      projectDirector: 'Abdul Ghafoor',
    },
    {
      id: 2,
      projectCode: 'PW-PROJ-002',
      projectName: 'Construction of Office and Laboratory Buildings of Animal Quarantine Department, Karachi',
      sector: 'Agriculture',
      location: 'Karachi',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      budget: 3500000,
      projectDirector: 'Dr. Muhammad Ilyas',
    },
    {
      id: 3,
      projectCode: 'PW-PROJ-003',
      projectName: 'Upgradation and Accreditation of Seed Testing Laboratory, FSC&RD, Karachi',
      sector: 'Production Sector',
      location: 'Karachi',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      budget: 2800000,
      projectDirector: 'Mr. Khalid Hussain',
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Projects | Project Portal System</title>
        <meta name="description" content="Project Management Portal" />
      </Head>

      <div className="space-y-6">
        <div className="pb-5 border-b border-gray-200">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all projects in the system including their details and status.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Project Code
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Sector
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Location
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Project Director
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {project.projectCode}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {project.projectName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {project.sector}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {project.location}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            project.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : project.status === 'Completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {project.projectDirector}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}