import React from 'react';

const ServicePageSkeleton = () => {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      
      {/* --- HERO SKELETON --- */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center bg-gray-200 overflow-hidden">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <div className="h-10 md:h-14 bg-gray-300 rounded-lg w-3/4 mx-auto mb-4" />
          <div className="h-10 md:h-14 bg-gray-300 rounded-lg w-1/2 mx-auto mb-8" />
          <div className="h-1.5 w-24 bg-gray-300 rounded-full mx-auto" />
        </div>
      </section>

      {/* --- CONTENT SKELETON --- */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        
        {/* Heading */}
        <div className="mt-20 mb-10">
          <div className="h-8 md:h-10 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="h-1 w-12 bg-gray-200 rounded-full" />
        </div>

        {/* Text */}
        <div className="space-y-4 mb-16">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>

        {/* List Items */}
        <div className="space-y-6 mb-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-5 h-5 bg-gray-200 rounded-full mr-4 shrink-0" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="relative w-full my-16 h-64 md:h-96 bg-gray-200 rounded-2xl" />

        {/* FAQs */}
        <div className="space-y-4 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl w-full border border-gray-200" />
          ))}
        </div>

        {/* Button */}
        <div className="mt-16 mb-20 text-center flex justify-center">
          <div className="h-16 w-64 bg-gray-200 rounded-full" />
        </div>

      </div>
    </div>
  );
};

export default ServicePageSkeleton;