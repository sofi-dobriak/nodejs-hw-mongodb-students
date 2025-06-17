import { studentsCollection } from '../db/models/students';
import { QueryParams } from '../types/pagination';
import { Student } from '../types/student';
import { calculatePaginationData } from '../utils/calculatePaginationData';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}: QueryParams) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = studentsCollection.find();

  if (filter.gender) {
    studentsQuery.where('gender').equals(filter.gender);
  }

  if (filter.maxAge) {
    studentsQuery.where('maxAge').lte(filter.maxAge);
  }

  if (filter.minAge) {
    studentsQuery.where('minAge').gte(filter.minAge);
  }

  if (filter.maxAvgMark) {
    studentsQuery.where('maxAge').lte(filter.maxAvgMark);
  }

  if (filter.minAvgMark) {
    studentsQuery.where('minAge').gte(filter.minAvgMark);
  }

  const [studentsCount, students] = await Promise.all([
    studentsCollection.find().merge(studentsQuery).countDocuments(),
    studentsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(studentsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = async (studentId: string) => {
  const student = await studentsCollection.findById(studentId).lean();
  return student;
};

export const createStudent = async (payload: Student) => {
  const student = await studentsCollection.create(payload);
  return student;
};

export const deleteStudent = async (studentId: string) => {
  const student = await studentsCollection.findOneAndDelete({ _id: studentId });
  return student;
};

export const updateStudent = async (
  studentId: string,
  payload: Student,
  options = {},
) => {
  const rawResult = await studentsCollection.findByIdAndUpdate(
    { _id: studentId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
