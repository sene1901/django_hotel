// import React, { useEffect, useState } from "react";
// import HotelCard from "../components/HotelCard";
// import AjoutHotelModal from "../components/AjoutModalHotel";
// import { getHotels, deleteHotel } from "../api/api";

// const HotelList = () => {
//   const [hotels, setHotels] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedHotel, setSelectedHotel] = useState(null); 
//   const [search, setSearch] = useState(""); 

//   // Récupérer la liste des hôtels
//   const fetchHotels = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getHotels();
//       setHotels(response.data);
//     } catch (err) {
//       console.error("Erreur chargement hôtels:", err);
//       setError("Impossible de charger les hôtels");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHotels();
//   }, []);

//   // Supprimer un hôtel
//   const handleDelete = async (id) => {
//     if (!confirm("Supprimer cet hôtel ?")) return;

//     try {
//       await deleteHotel(id);
//       fetchHotels(); // rafraîchir après suppression
//     } catch (err) {
//       console.error("Erreur suppression:", err);
//       alert("Impossible de supprimer cet hôtel");
//     }
//   };

//   // Modifier un hôtel
//   const handleEdit = (hotel) => {
//     setSelectedHotel(hotel);
//     setOpenModal(true);
//   };

//   // Filtrer les hôtels selon le texte de recherche
//   const filteredHotels = hotels.filter((hotel) =>
//     hotel.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen">
//       <div className="flex-1">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4 bg-white px-6 py-6">
//           <h2 className="font-semibold text-gray-700">
//             Hôtels <span className="text-gray-400">{filteredHotels.length}</span>
//           </h2>

//           <div className="flex gap-3">
//             {/* Barre de recherche */}
//             <input
//               type="text"
//               placeholder="Rechercher par nom"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-3 py-1.5 border rounded-md text-sm"
//             />

//             <button
//               onClick={() => {
//                 setSelectedHotel(null);
//                 setOpenModal(true);
//               }}
//               className="bg-white text-gray-800 px-4 py-2 rounded-md border"
//             >
//               Créer un nouvel hôtel
//             </button>
//           </div>
//         </div>

//         {/* Modal ajout/modification */}
//         {openModal && (
//           <AjoutHotelModal
//             hotel={selectedHotel}
//             onClose={() => setOpenModal(false)}
//             onSuccess={fetchHotels}
//           />
//         )}

//         {/* Loading/Error */}
//         {loading && <p className="px-6 text-gray-500">Chargement...</p>}
//         {error && <p className="px-6 text-red-500">{error}</p>}

//         {/* Liste des hôtels filtrés */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 justify-items-center">
//           {filteredHotels.map((hotel) => (
//             <HotelCard
//               key={hotel.id}
//               image={hotel.image_url || hotel.image}
//               name={hotel.name}
//               description={hotel.description}
//               prix={hotel.prix}
//               onDelete={() => handleDelete(hotel.id)}
//               onEdit={() => handleEdit(hotel)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelList;




import React, { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import AjoutHotelModal from "../components/AjoutModalHotel";
import { getHotels, deleteHotel } from "../api/api";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Récupérer la liste des hôtels
  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getHotels();
      setHotels(response.data);
    } catch (err) {
      console.error("Erreur chargement hôtels:", err);
      setError("Impossible de charger les hôtels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Supprimer un hôtel
  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet hôtel ?")) return;

    try {
      await deleteHotel(id);
      fetchHotels(); // rafraîchir après suppression
    } catch (err) {
      console.error("Erreur suppression:", err);
      alert("Impossible de supprimer cet hôtel");
    }
  };

  // Modifier un hôtel
  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setOpenModal(true);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 bg-white px-6 py-6">
          <h2 className="font-semibold text-gray-700">
            Hôtels <span className="text-gray-400">{hotels.length}</span>
          </h2>

          <button
            onClick={() => {
              setSelectedHotel(null);
              setOpenModal(true);
            }}
            className="bg-white text-gray-800 px-4 py-2 rounded-md border"
          >
            Créer un nouvel hôtel
          </button>
        </div>

        {/* Modal ajout/modification */}
        {openModal && (
          <AjoutHotelModal
            hotel={selectedHotel}
            onClose={() => setOpenModal(false)}
            onSuccess={fetchHotels}
          />
        )}

        {/* Loading/Error */}
        {loading && <p className="px-6 text-gray-500">Chargement...</p>}
        {error && <p className="px-6 text-red-500">{error}</p>}

        {/* Liste des hôtels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 justify-items-center">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              image={hotel.image_url || hotel.image}
              name={hotel.name}
              description={hotel.description}
              prix={hotel.prix}
              onDelete={() => handleDelete(hotel.id)}
              onEdit={() => handleEdit(hotel)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelList;