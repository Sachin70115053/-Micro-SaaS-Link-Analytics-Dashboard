import React from 'react';

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
      {/* Left Side Image */}
      <div className="md:w-1/2 w-full">
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQEBZoV9l77LcA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714598042215?e=1749686400&v=beta&t=kQUiFWs70uFFEHsF5xJl1oKV77ow8vt1kl0alJn-GSw"
          alt="Sachin Kumar Yadav"
          className="rounded-2xl w-full shadow-xl"
        />
      </div>

      {/* Right Side Text */}
      <div className="md:w-1/2 w-full text-gray-800">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-lg leading-relaxed mb-4 text-justify">
          Hey! I'm <strong>Sachin Kumar Yadav</strong>, a Computer Science and Engineering student at IIIT Pune (Batch 2022–2026). Passionate about solving real-world problems with technology, I specialize in building full-stack applications using <strong>React.js</strong>, <strong>Node.js</strong>, <strong>MongoDB</strong>, and <strong>TypeScript</strong>.
        </p>
        <p className="text-lg leading-relaxed mb-4 text-justify">
          I've interned as a Web Developer at BlueCS and worked as a Code Reviewer for <strong>GeeksforGeeks</strong>. My portfolio includes a job portal with analytics, a LinkedIn automation bot, and various freelance projects. I'm a proactive learner with over 550+ coding problems solved across LeetCode, GFG, Codeforces, and CodeChef.
        </p>
        <p className="text-lg leading-relaxed mb-4 text-justify">
          I'm also a 3⭐ Coder on CodeChef, a finalist in AI-based hackathons, and love building tools that enhance productivity. I enjoy collaborating with passionate teams, contributing to open-source, and exploring cloud infrastructure and cybersecurity.
        </p>
        <a
          href="https://www.linkedin.com/in/sachin-kumar-yadav-766859297"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
        >
          View My LinkedIn
        </a>
      </div>
    </section>
  );
};

export default AboutUs;
