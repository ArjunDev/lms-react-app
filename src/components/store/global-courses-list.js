
const allCourses = [
  {
    curriculumData: [{ id: '1', name: 'lecture-1' }, { id: '2', name: 'lecture-2' }],
    landingPageData: {
      courseId: '1234',
      description: 'Tailwind CSS is a utility-first CSS framework that lets you build custom user interfaces quickly by applying pre-defined classes directly in your HTML or JSX. It focuses on speed, responsiveness, and maintainability without writing custom CSS.',
      level: '1',
      price: '20',
      primaryLanguage: 'English',
      title: 'Fundamentals of Tailwindcss'
    },
    settingsData: { imageURL: '/lms-react-app/images/tailwindcss.webp' }
  },
  {
    curriculumData: [{ id: '2', name: 'lecture-1' }],
    landingPageData: {
      courseId: '12345',
      description: `React.js is a JavaScript library for building fast, interactive user interfaces. It lets you create reusable components, manage UI state efficiently, and update the DOM dynamically using a virtual DOM. It's especially popular for single-page applications (SPAs) and works great with modern front-end tools.`,
      level: '1',
      price: '30',
      primaryLanguage: 'English',
      title: 'Basics of React JS',
      authorName: "ArjunDev",
      publishedDate: "17 April 2025"
    },
    settingsData: { imageURL: '/lms-react-app/images/reactjs.webp' }
  },
  {
    curriculumData: [{ id: '3', name: 'lecture-1' }, { id: '3', name: 'lecture-2' }],
    landingPageData: {
      courseId: '123456',
      description: `JavaScript is a versatile, high-level programming language used primarily to add interactivity and dynamic behavior to websites. It's essential for front-end development, works in all modern browsers, and powers frameworks like React, Vue, and Node.js. It's the backbone of web development alongside HTML and CSS.`,
      level: '1',
      price: '10',
      primaryLanguage: 'English',
      title: 'Fundamentals of JavaScript'
    },
    settingsData: { imageURL: '/lms-react-app/images/javascript.webp' }
  }
];

export default allCourses;