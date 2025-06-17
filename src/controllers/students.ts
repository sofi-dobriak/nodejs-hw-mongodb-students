import { RequestHandler } from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams';
import { parseSortParams } from '../utils/parseSortParams';
import { parseFilterParams } from '../utils/parseFilterParams';

export const getStudentsController: RequestHandler = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController: RequestHandler = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found student!',
    data: student,
  });
};

export const createStudentController: RequestHandler = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a student!',
    data: student,
  });
};

export const upsertStudentController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body, { upsert: true });

  if (!result) {
    return next(createHttpError(404, 'Student not found'));
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Successfully upserted a student!',
    data: result.student,
  });
};

export const patchStudentController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body);

  if (!result) {
    return next(createHttpError(404, 'Student not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a student!',
    data: result.student,
  });
};

export const deleteStudentController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId);

  if (!student) {
    return next(createHttpError(404, 'Student not found'));
  }

  res.status(204).send();
};
