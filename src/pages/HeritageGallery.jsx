import React, { useState } from "react";
import { ethnicData } from "./ethnicData";

export default function HeritageGallery() {
  const [popupData, setPopupData] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Heritage Gallery</h1>

      {/* Ethnic Sections */}
      {ethnicData.map((ethnic, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{ethnic.ethnic}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ethnic.data.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl shadow hover:shadow-lg bg-white cursor-pointer transition"
                onClick={() => setPopupData(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Popup / Modal */}
      {popupData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setPopupData(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-2">{popupData.name}</h2>
            <p className="text-gray-700 mb-4">{popupData.description}</p>
            <img
              src={popupData.image}
              alt={popupData.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            {/* AR 3D Model Viewer */}
            {popupData.arModel && (
              <model-viewer
                src={popupData.arModel.glb}
                ios-src={popupData.arModel.usdz}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                style={{ width: "100%", height: "400px" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
