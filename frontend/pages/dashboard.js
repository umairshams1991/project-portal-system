import Head from 'next/head';
import Layout from '../components/Layout';

export default function Dashboard() {
  // Mock data for dashboard
  const stats = [
    { name: 'Total Projects', value: '24', change: '+2%', changeType: 'positive' },
    { name: 'Active Projects', value: '18', change: '+5%', changeType: 'positive' },
    { name: 'Completed Projects', value: '6', change: '+10%', changeType: 'positive' },
    { name: 'Pending Reports', value: '8', change: '-3%', changeType: 'negative' },
  ];

  const projects = [
    {
      id: 1,
      projectCode: 'PW-PROJ-001',
      projectName: 'Crop Monitoring System',
      status: 'Active',
      progress: 65,
      deadline: 'Dec 31, 2024',
      budget: 'PKR 5,000,000',
    },
    {
      id: 2,
      projectCode: 'PW-PROJ-002',
      projectName: 'Lab Construction',
      status: 'Active',
      progress: 40,
      deadline: 'Jun 30, 2024',
      budget: 'PKR 3,500,000',
    },
    {
      id: 3,
      projectCode: 'PW-PROJ-003',
      projectName: 'Seed Testing Lab Upgrade',
      status: 'Active',
      progress: 25,
      deadline: 'Sep 30, 2024',
      budget: 'PKR 2,800,000',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Abdul Ghafoor',
      action: 'submitted monthly report',
      project: 'Crop Monitoring System',
      time: '2 hours ago',
    },
    {
      id: 2,
      user: 'Dr. Muhammad Ilyas',
      action: 'updated project milestone',
      project: 'Lab Construction',
      time: '4 hours ago',
    },
    {
      id: 3,
      user: 'Mr. Khalid Hussain',
      action: 'uploaded new document',
      project: 'Seed Testing Lab Upgrade',
      time: '1 day ago',
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Dashboard | Project Portal System</title>
        <meta name="description" content="Project Management Dashboard" />
      </Head>

      <div className="space-y-6">
        {/* Stats Overview */}
        <div>
          <h2 className="text-lg font-medium text-gray-900">Overview</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Projects</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Current active projects and their status</p>
            </div>
            <ul className="divide-y divide-gray-200">
              {projects.map((project) => (
                <li key={project.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-indigo-600 truncate">{project.projectCode}</div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                          project.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : project.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="mr-6 text-sm text-gray-900 truncate">{project.projectName}</div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {project.deadline}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                        {project.budget}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest updates from the system</p>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <li key={activity.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user} <span className="font-normal text-gray-700">{activity.action}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          for <span className="font-medium text-gray-900">{activity.project}</span>
                        </p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Milestones</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Important deadlines in the next 30 days</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Phase I Completion</p>
                  <p className="text-sm text-gray-500">Crop Monitoring System - Due in 5 days</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Foundation Laying</p>
                  <p className="text-sm text-gray-500">Lab Construction - Due in 12 days</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Equipment Installation</p>
                  <p className="text-sm text-gray-500">Seed Testing Lab Upgrade - Due in 20 days</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}