import React from "react";
import DashCard from "../components/DashCard";
import {
  FileText,
  MessageCircle,
  Users,
  Mail,
  Hotel,
  Layers,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-full">

      {/* Title block */}
      <div className="bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl  text-gray-800">
           Bienvenue sur RED Product
        </h1>

        <p className="text-gray-500 mt-1">
        
            Lorem ipsum dolor sit amet consectetur
        
        </p>
      </div>

      {/* Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <DashCard
            icon={<FileText size={18} />}
            value="125"
            label="Formulaires"
            description="Je ne sais pas quoi mettre"
            color="bg-[#A88ADD]"
          />

          <DashCard
            icon={<MessageCircle size={18} />}
            value="40"
            label="Messages"
            description="Je ne sais pas quoi mettre"
            color="bg-[#0CC2AA]"
          />

          <DashCard
            icon={<Users size={18} />}
            value="600"
            label="Utilisateurs"
            description="Je ne sais pas quoi mettre"
            color="bg-yellow-500"
          />

          <DashCard
            icon={<Mail size={18} />}
            value="25"
            label="E-mails"
            description="Je ne sais pas quoi mettre"
            color="bg-red-500"
          />

          <DashCard
            icon={<Hotel size={18} />}
            value="40"
            label="Hôtels"
            description="Je ne sais pas quoi mettre"
            color="bg-[#9C27B0]"
          />

          <DashCard
            icon={<Layers size={18} />}
            value="02"
            label="Entités"
            description="Je ne sais pas quoi mettre"
            color="bg-[#1565C0]"
          />

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
