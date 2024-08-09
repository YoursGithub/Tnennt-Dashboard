import React, { useState } from 'react';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const ReportItem = ({ id, name, content, timestamp, onClick }) => (
  <div onClick={() => onClick(id)} className="flex items-center border-b border-gray-200 py-4 hover:bg-gray-50 cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700">
    <div className="w-16 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
      {name.charAt(0)}
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-baseline">
        <h3 className="font-semibold text-lg dark:text-gray-200">{name}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{truncateText(content, 20)}</p>
    </div>
  </div>
);

const DetailedReport = ({ report, onBack }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
    <button onClick={onBack} className="mb-4 flex items-center text-blue-500 hover:text-blue-600">
      <span className="mr-1">←</span> Back to list
    </button>
    <h2 className="text-2xl font-bold mb-2 dark:text-gray-200">{report.name}</h2>
    <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">{report.timestamp}</p>
    <p className="text-gray-700 dark:text-gray-300">{report.content}</p>
  </div>
);

const ReportDashboard = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportClick = (id) => {
    setSelectedReport(reports.find(report => report.id === id));
  };

  const handleBackClick = () => {
    setSelectedReport(null);
  };

  if (selectedReport) {
    return <DetailedReport report={selectedReport} onBack={handleBackClick} />;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-900">
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Reports Dashboard</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 m-10">
        {reports.map((report) => (
          <ReportItem key={report.id} {...report} onClick={handleReportClick} />
        ))}
      </div>
    </div>
  );
};

export default ReportDashboard;