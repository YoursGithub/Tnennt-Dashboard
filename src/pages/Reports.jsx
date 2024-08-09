import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ReportDashboard from "../components/Reportitems";

const Reports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sampleReports = [
    { id: 1, name: "John Doe", content: "Completed the quarterly financial report. This report includes detailed analysis of our Q2 performance, highlighting key metrics and areas for improvement. We've seen significant growth in...", timestamp: "10:30 AM" },
    { id: 2, name: "Jane Smith", content: "Updated the marketing strategy document. The new strategy focuses on expanding our digital presence and leveraging social media platforms to reach a wider audience. We've outlined specific tactics for...", timestamp: "Yesterday, 3:45 PM" },
    { id: 3, name: "Mike Johnson", content: "Submitted the project progress report. The team has made substantial progress on the main deliverables. We're currently ahead of schedule and under budget. Key achievements include...", timestamp: "Aug 8, 2:15 PM" },
  ];

  return (
    <>
      <div className='flex'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-10 py-8">
              <ReportDashboard reports={sampleReports} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Reports;