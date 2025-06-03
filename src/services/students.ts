import { studentsCollection } from '../db/models/students';

export const getAllStudents = async () => {
  const students = await studentsCollection.find();
  return students;
};

export const getStudentById = async (studentId: string) => {
  const student = await studentsCollection.findById(studentId).lean();
  return student;
};
