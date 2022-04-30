import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './firebaseConfig';
import 'firebase/compat/firestore'


export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();

export const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

export const signoutUser = async() =>{
  try {
    await auth.signOut();
    console.log("Signout","Successful")
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

export function fetchFaculties() {
  return new Promise((resolve, reject) => {
      let db = firebase.firestore();
      let query;
      query = db.collection("faculty").orderBy('facultyCode');
      query.get().then((snapshot) => {
          let faculties = [];
          snapshot.forEach((doc) => {
              let obj = doc.data();
              obj.id = doc.id;
              faculties.push(obj);
          });
          resolve(faculties);
      });
  });
}

export function deleteFacultyByCode(facultyCode){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("faculty").doc(facultyCode).delete().then(() =>{
      resolve();
    })
  });
}

export function updateFacultyByCode(faculty){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("faculty").doc(faculty.facultyCode).set(faculty).then(()=>{
      resolve();
    })
  });
}

export function fetchClassrooms() {
  return new Promise((resolve, reject) => {
      let db = firebase.firestore();
      let query;
      query = db.collection("classroom").orderBy('classroomName');
      query.get().then((snapshot) => {
          let classrooms = [];
          snapshot.forEach((doc) => {
              let obj = doc.data();
              obj.id = doc.id;
              classrooms.push(obj);
          });
          resolve(classrooms);
      });
  });
}

export function deleteClassroomByName(classroomName){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("classroom").doc(classroomName).delete().then(() =>{
      resolve();
    })
  });
}

export function updateClassroomByName(classroom){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("classroom").doc(classroom.classroomName).set(classroom).then(()=>{
      resolve();
    })
  });
}

export function fetchCourses() {
  return new Promise((resolve, reject) => {
      let db = firebase.firestore();
      let query;
      query = db.collection("course").orderBy('courseCode');
      query.get().then((snapshot) => {
          let courses = [];
          snapshot.forEach((doc) => {
              let obj = doc.data();
              obj.id = doc.id;
              courses.push(obj);
          });
          resolve(courses);
      });
  });
}

export function deleteCourseByCode(courseCode){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("course").doc(courseCode).delete().then(() =>{
      resolve();
    })
  });
}

export function updateCourseByCode(course){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("course").doc(course.courseCode).set(course).then(()=>{
      resolve();
    })
  });
}

export function fetchBatches() {
  return new Promise((resolve, reject) => {
      let db = firebase.firestore();
      let query;
      query = db.collection("batch").orderBy('batchName');
      query.get().then((snapshot) => {
          let batches = [];
          snapshot.forEach((doc) => {
              let obj = doc.data();
              obj.id = doc.id;
              batches.push(obj);
          });
          resolve(batches);
      });
  });
}

export function deleteBatchByName(batchName){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("batch").doc(batchName).delete().then(() =>{
      resolve();
    })
  });
}

export function updateBatchByName(batch){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("batch").doc(batch.batchName).set(batch).then(()=>{
      resolve();
    })
  });
}

export function fetchTimetables() {
  return new Promise((resolve, reject) => {
      let db = firebase.firestore();
      let query;
      query = db.collection("timetable").orderBy('timetableVersionName');
      query.get().then((snapshot) => {
          let timetables = [];
          snapshot.forEach((doc) => {
              let obj = doc.data();
              obj.id = doc.id;
              timetables.push(obj);
          });
          resolve(timetables);
      });
  });
}
export function fetchTimetableByVersion(version) {
  return new Promise((resolve, reject) => {
      let db = firebase.firestore();
      let query;
      query = db.collection("timetable").doc(version);
      query.get().then((snapshot) => {
          resolve(snapshot.data());
      });
  });
}

export function deleteTimetableByVersion(version){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("timetable").doc(version).delete().then(() =>{
      resolve();
    })
  });
}

export function updateTimetableByVersion(timetable){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("timetable").doc(timetable.timetableVersionName).set(timetable).then(()=>{
      resolve();
    })
  });
}

export function fetchCourseAllocation(version) {
  return new Promise((resolve, reject) => {
      let db = firebase.firestore();
      let query;
      query = db.collection("courseAllocation").where("timetableVersionName","==",version);
      query.get().then((snapshot) => {
          let allocations = [];
          snapshot.forEach((doc) => {
              let obj = doc.data();
              obj.allocationId = doc.id;
              allocations.push(obj);
          });
          resolve(allocations);
      });
  });
}

export function deleteCourseAllocationById(allocationId){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("courseAllocation").document(allocationId).delete().then(() =>{
      resolve();
    })
  });
}

export function addCourseAllocation(allocation){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("courseAllocation").doc().set(allocation).then(()=>{
      resolve();
    })
  });
}

export function updateCourseAllocationById(allocation){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("courseAllocation").doc(allocation.allocationId).set(allocation).then(()=>{
      resolve();
    })
  });
}

export function fetchSlotAllocation(version) {
  return new Promise((resolve, reject) => {
      let db = firebase.firestore();
      let query;
      query = db.collection("slotAllocation").where("timetableVersionName","==",version);
      query.get().then((snapshot) => {
          let allocations = [];
          snapshot.forEach((doc) => {
              let obj = doc.data();
              obj.allocationId = doc.id;
              allocations.push(obj);
          });
          resolve(allocations);
      });
  });
}

export function deleteSlotAllocationById(allocationId){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("slotAllocation").document(allocationId).delete().then(() =>{
      resolve();
    })
  });
}

export function addSlotAllocation(allocation){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("slotAllocation").doc().set(allocation).then(()=>{
      resolve();
    })
  });
}

export function updateSlotAllocationById(allocation){
  return new Promise((resolve, reject)=>{
    let db = firebase.firestore();
    db.collection("slotAllocation").doc(allocation.allocationId).set(allocation).then(()=>{
      resolve();
    })
  });
}