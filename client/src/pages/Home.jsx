// // client/src/pages/Home.jsx
// import React from 'react';

// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Home = () => {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   return (
//     <div className="text-center py-20">
//       <h1 className="text-4xl font-bold text-purple-700 mb-6">
//         URL Shortener with Analytics
//       </h1>
//       <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//         Create short links, track clicks, and analyze traffic with our powerful 
//         URL shortening service. Perfect for marketers, developers, and content 
//         creators.
//       </p>
//       <div className="space-x-4">
//         {isAuthenticated ? (
//           <Link
//             to="/dashboard"
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Go to Dashboard
//           </Link>
//         ) : (
//           <Link
//             to="/login"
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Get Started
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
// client/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <section className="min-h-screen bg-[#f7f8fa] font-sans px-6 lg:px-20 py-12 flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
      {/* Left content */}
      <div className="text-center lg:text-left max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
          Elevate Your Links with
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
            Smart URL Shortening
          </span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Manage, analyze and share your links like a pro. Shorten URLs, track performance, and impress your audience with sleek, shareable links.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Get Started
            </Link>
          )}
          <Link
            to="/about"
            className="bg-gray-100 text-purple-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right image with animation */}
      <div className="w-full lg:w-[50%] flex justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2024/05/20/13/28/ai-generated-8775234_1280.png"
          alt="Professional illustration"
          className="w-[90%] max-w-xs sm:max-w-md md:max-w-lg animate-float transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Home;
