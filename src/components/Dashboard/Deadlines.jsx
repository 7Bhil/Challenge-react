import React from 'react';
import { Calendar } from 'lucide-react';

const Deadlines = ({ expanded = false }) => {
  const deadlines = [
    { title: "Challenge React Native", date: "2024-09-25", status: "urgent" },
    { title: "Hackathon IA", date: "2024-10-02", status: "warning" },
    { title: "Contest Full Stack", date: "2024-10-15", status: "normal" }
  ];

  if (expanded) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r">
              <p className="font-medium text-gray-900 text-sm md:text-base">{deadline.title}</p>
              <p className="text-xs md:text-sm text-gray-500">{deadline.date}</p>
              <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                deadline.status === 'urgent' ? 'bg-red-100 text-red-700' :
                deadline.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {deadline.status === 'urgent' ? 'Urgent' :
                 deadline.status === 'warning' ? 'Attention' : 'Normal'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar className="mr-2 text-red-500" size={20} />
        Prochaines Deadlines
      </h3>
      <div className="space-y-4">
        {deadlines.map((deadline, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-3">
            <p className="font-medium text-gray-900 text-sm md:text-base">{deadline.title}</p>
            <p className="text-xs md:text-sm text-gray-500">{deadline.date}</p>
            <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
              deadline.status === 'urgent' ? 'bg-red-100 text-red-700' :
              deadline.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {deadline.status === 'urgent' ? 'Urgent' :
               deadline.status === 'warning' ? 'Attention' : 'Normal'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deadlines;