import React, { useState, useEffect } from "react";
import { GalleryThumbnails, View, Users, X } from "lucide-react";
import { ethnicData } from "../data/ethnicData";
import '@google/model-viewer';

// Import the Model Viewer library. This script must be loaded in your public/index.html
// for the component to work. For a real project, you'd use a package manager.
// For this example, we assume it's already available globally.
// <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>

export const HeritageGallery = ({
  selectedEthnic,
  onExhibitSelect,
  onNavigate,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const exhibits =
    (selectedEthnic && ethnicData[selectedEthnic.id]?.exhibits) || [];
  const allCategories = [
    "All",
    ...new Set(exhibits.map((item) => item.category)),
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeArModel, setActiveArModel] = useState(null); // New state to hold the AR model details

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedEthnic, activeCategory]);

  const filteredExhibits =
    activeCategory === "All"
      ? exhibits
      : exhibits.filter((exhibit) => exhibit.category === activeCategory);

  const handleExhibitClick = (exhibit) => {
    if (exhibit.arEnabled && exhibit.arModelUrl) {
      // If AR is enabled and a model URL exists, activate AR mode
      setActiveArModel(exhibit);
    } else {
      // Otherwise, proceed to the regular exhibit view
      onExhibitSelect(exhibit);
    }
  };

  // If a model is active for AR, render the Model Viewer component
  if (activeArModel) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <button
          onClick={() => setActiveArModel(null)}
          className="absolute top-8 right-8 text-white hover:text-red-500 z-50 transition-colors"
        >
          <X size={48} />
        </button>
        <div className="flex-1">
          <model-viewer
            src={activeArModel.arModelUrl}
            alt={activeArModel.title}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            touch-action="pan-y"
            poster="https://placehold.co/1000x1000/000000/FFF?text=Loading+AR+Model"
            className="w-full h-full"
          >
            <div
              slot="ar-button"
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 p-4 rounded-full bg-[#A24936] text-white font-bold cursor-pointer hover:bg-red-800 transition-colors shadow-lg"
            >
              Start AR 🚀
            </div>
            <div
              slot="hotspot-1"
              data-position="0 1 0"
              data-normal="-1 0 0"
              data-visibility-attribute="visible"
            >
              <div className="tooltip">
                <p>Drag to move the model</p>
              </div>
            </div>
          </model-viewer>
        </div>
      </div>
    );
  }

  // The rest of the component remains the same
  if (!selectedEthnic) {
    return (
      <div className="p-8 pt-24 min-h-screen text-white flex flex-col justify-center items-center text-center">
        <GalleryThumbnails className="w-24 h-24 text-stone-500 mb-4" />
        <h2 className="text-3xl font-serif font-bold text-stone-300 mb-2">
          The Heritage Gallery is Vast
        </h2>
        <p className="text-lg text-stone-400 mb-6 max-w-md">
          Please select an ethnic group to view their unique cultural artifacts.
        </p>
        <button
          onClick={() => onNavigate("landing")}
          className="bg-[#A24936] hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
        >
          Select an Ethnic Group
        </button>
      </div>
    );
  }

  return (
    <div
      className="p-8 pt-24 min-h-screen text-white"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/pua.png')`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-serif font-bold text-stone-900 mb-4 text-center">
          The Heritage Gallery:{" "}
          <span className="text-[#D3A625]">{selectedEthnic.name}</span>
        </h2>
        <p className="text-xl text-stone-500 mb-8 text-center">
          Explore the sights and sounds of the {selectedEthnic.name} legacy.
        </p>
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold transition-colors cursor-pointer ${
                activeCategory === category
                  ? "bg-[#D3A625] text-black"
                  : "bg-stone-700 text-stone-200 hover:bg-stone-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-stone-800 rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="w-full h-56 bg-stone-700"></div>
                  <div className="p-5">
                    <div className="h-4 bg-stone-700 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-stone-700 rounded w-3/4"></div>
                  </div>
                </div>
              ))
            : filteredExhibits.map((exhibit) => (
                <div
                  key={exhibit.id}
                  onClick={() => handleExhibitClick(exhibit)}
                  className="bg-stone-800 rounded-lg overflow-hidden shadow-lg hover:shadow-[#D3A625]/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                >
                  <div className="relative">
                    <img
                      src={exhibit.imageUrl}
                      alt={exhibit.title}
                      className="w-full h-56 object-cover"
                    />
                    {/* Check if arEnabled and arModel exist for this exhibit */}
                    {exhibit.arEnabled && exhibit.arModel && (
                      <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-full">
                        <model-viewer
                          src={exhibit.arModel.src}
                          ios-src={exhibit.arModel.iosSrc}
                          alt={exhibit.arModel.alt}
                          ar
                          ar-modes="webxr scene-viewer quick-look"
                          camera-controls
                          shadow-intensity="1"
                          style={{ width: '40px', height: '40px' }} // Adjust size for the button
                        >
                          <button
                            slot="ar-button"
                            className="bg-black/50 p-2 rounded-full cursor-pointer" // Style the button
                            style={{ position: 'absolute', top: 0, right: 0 }}
                          >
                            <View className="text-white" size={24} />
                          </button>
                        </model-viewer>
                      </div>
                    )}
                    {/* The rest of the code is unchanged */}
                    {(exhibit.arEnabled || exhibit.type === "vr") && !exhibit.arModel && (
                      <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-full">
                        <View className="text-white" size={24} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-[#D3A625] font-semibold">
                      {exhibit.category}
                    </p>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#D3A625] transition-colors mt-1">
                      {exhibit.title}
                    </h4>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};