--Copyright 2022 under MIT License
SET search_path TO 'CodingExam';

DROP TABLE IF EXISTS "CodingExam".CourseUser;
DROP TABLE IF EXISTS "CodingExam".StudentExam;
DROP TABLE IF EXISTS "CodingExam".StudentResponse;
DROP TABLE IF EXISTS "CodingExam".QuestionAnswer;
DROP TABLE IF EXISTS "CodingExam".ExamQuestion;
DROP TABLE IF EXISTS "CodingExam".QuestionType;
DROP TABLE IF EXISTS "CodingExam".Student;
DROP TABLE IF EXISTS "CodingExam".Exam;
DROP TABLE IF EXISTS "CodingExam".Users;
DROP TABLE IF EXISTS "CodingExam".Course;

CREATE TABLE "CodingExam".Users
(
	UserID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	CanvasUserID VARCHAR(60) NOT NULL,
	UNIQUE(CanvasUserID)
);

CREATE TABLE "CodingExam".Course
(
	CourseID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	CanvasCourseID VARCHAR(60) NOT NULL,
	UNIQUE(CanvasCourseID)
);

CREATE TABLE "CodingExam".CourseUser
(
	CourseID INT NOT NULL REFERENCES "CodingExam".Course(CourseID),
	UserID INT NOT NULL REFERENCES "CodingExam".Users(UserID),
	PRIMARY KEY(CourseID, UserID)
);

CREATE TABLE "CodingExam".Exam
(
	ExamID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	CourseID INT NOT NULL REFERENCES "CodingExam".Course(CourseID),
	CanvasExamID VARCHAR(60) NOT NULL,
	TotalPoints INT NOT NULL,
	UNIQUE(CanvasExamID)
);

CREATE TABLE "CodingExam".QuestionType
(
	QuestionTypeID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	QuestionType VARCHAR(30) NOT NULL
);

CREATE TABLE "CodingExam".ExamQuestion
(
	QuestionID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	QuestionText VARCHAR(300) NOT NULL,
	HasCorrectAnswers BOOLEAN NOT NULL,
	QuestionType INT NOT NULL REFERENCES "CodingExam".QuestionType(QuestionTypeID),
	ExamID INT NOT NULL REFERENCES "CodingExam".Exam(ExamID)
	--might need something for multiple answer and checking that it has one related row in the question answer table
);

CREATE TABLE "CodingExam".QuestionAnswer
(
	AnswerID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	QuestionID INT NOT NULL REFERENCES "CodingExam".ExamQuestion(QuestionID),
	CorrectAnswer BOOLEAN NOT NULL,
	AnswerText VARCHAR(30) NOT NULL
);

CREATE TABLE "CodingExam".StudentResponse
(
	StudentResponseID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	IsTextResponse BOOLEAN NOT NULL,
	TextResponse VARCHAR(300), 
	AnswerResponse INT,
	QuestionID INT NOT NULL REFERENCES "CodingExam".ExamQuestion(QuestionID)
	--need to add check constraint for bool value
);

INSERT INTO "CodingExam".Users(CanvasUserID)
VALUES ('abcdefg1234567');

INSERT INTO "CodingExam".Course(CanvasCourseID)
VALUES ('abcdef123456');

INSERT INTO "CodingExam".CourseUser(CourseID, UserID)
VALUES (1, 1);

INSERT INTO "CodingExam".Exam(CourseID, CanvasExamID, TotalPoints)
VALUES (1, '12345abcde', 1);

INSERT INTO "CodingExam".QuestionType(QuestionType)
VALUES ('True or False');

INSERT INTO "CodingExam".ExamQuestion(QuestionText, HasCorrectAnswers, QuestionType, ExamID)
VALUES ('What''s the best programming language?', TRUE, 1, 1);

INSERT INTO "CodingExam".QuestionAnswer(QuestionID, CorrectAnswer, AnswerText)
VALUES (1, TRUE, 'C#'), (1, TRUE, 'C'), (1, TRUE, 'TypeScript'), (1, TRUE, 'Fortran');
