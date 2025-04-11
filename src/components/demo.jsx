import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";
// import { db } from "./firebase"; // your Firestore config

const allCourses = [
  {
    curriculumData: [
      { id: '1', name: 'lecture-1' },
      { id: '2', name: 'lecture-2' }
    ],
    landingPageData: {
      courseId: '1234',
      description: 'Tailwind CSS is a utility-first CSS framework...',
      level: '1',
      price: '20',
      primaryLanguage: 'English',
      title: 'Fundamentals of Tailwincss'
    },
    settingsData: {
      imageURL: '/lms-react-app/images/tailwindcss.webp'
    }
  }
];

console.log("uploadCourses triggered")

const uploadCourses = async () => {

  try {
    const coursesCollection = collection(firebaseDb, "courses"); // "courses" is the collection name

    for (const course of allCourses) {
      await addDoc(coursesCollection, course);
    }

    console.log("Courses uploaded successfully!");
  } catch (error) {
    console.error("Error uploading courses:", error);
  }

}

uploadCourses();