import React from "react";

const DashCard = ({ icon, value, label, description, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
      
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

    </div>
  );
};

export default DashCard;
