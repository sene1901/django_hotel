import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const HotelCard = ({ image, name, description, prix, onDelete, onEdit }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden w-[240px] cursor-pointer group transition">
      {/* Image */}
      <img
        src={image || "/default-hotel.jpg"}
        alt={name}
        className="w-full h-48 object-cover"
      />

      {/* Contenu */}
      <div className="p-4">
        <p className="text-sm text-[#8D4B38]">{description}</p>
        <h3 className="text-lg font-bold text-gray-800 mt-1">{name}</h3>
        <p className="text-base font-medium text-gray-700 mt-2">{prix} XOF par nuit</p>
      </div>

      {/* Icônes Modifier / Supprimer (apparition au hover) */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <PencilIcon
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="w-6 h-6 text-yellow-500 hover:text-yellow-600 cursor-pointer"
        />
        <TrashIcon
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default HotelCard;
