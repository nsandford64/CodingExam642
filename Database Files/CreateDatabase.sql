SET search_path TO 'CodingExam';

DROP TABLE IF EXISTS "CodingExam".CourseInstructor;
DROP TABLE IF EXISTS "CodingExam".StudentExam;
DROP TABLE IF EXISTS "CodingExam".QuestionAnswer;
DROP TABLE IF EXISTS "CodingExam".ExamQuestion;
DROP TABLE IF EXISTS "CodingExam".QuestionType;
DROP TABLE IF EXISTS "CodingExam".StudentResponse;
DROP TABLE IF EXISTS "CodingExam".Student;
DROP TABLE IF EXISTS "CodingExam".Exam;
DROP TABLE IF EXISTS "CodingExam".Instructor;
DROP TABLE IF EXISTS "CodingExam".Course;

CREATE TABLE "CodingExam".Instructor
(
	InstructorID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	CanvasInstructorID VARCHAR(60) NOT NULL,
	UNIQUE(CanvasInstructorID)
);

CREATE TABLE "CodingExam".Course
(
	CourseID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	CanvasCourseID VARCHAR(60) NOT NULL,
	UNIQUE(CanvasCourseID)
);

CREATE TABLE "CodingExam".CourseInstructor
(
	CourseID INT NOT NULL REFERENCES "CodingExam".Course(CourseID),
	InstructorID INT NOT NULL REFERENCES "CodingExam".Instructor(InstructorID),
	PRIMARY KEY(CourseID, InstructorID)
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
	CorrectAnswer INT NOT NULL
);

CREATE TABLE "CodingExam".Student
(
	StudentID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	CanvasStudentID VARCHAR(60) NOT NULL,
	UNIQUE(CanvasStudentID)
);

CREATE TABLE "CodingExam".StudentExam
(
	StudentID INT NOT NULL REFERENCES "CodingExam".Student(StudentID),
	ExamID INT NOT NULL REFERENCES "CodingExam".Exam(ExamID),
	ScoredPoints INT,
	ExamScorePercent INT,
	PRIMARY KEY (StudentID, ExamID)
);

CREATE TABLE "CodingExam".StudentResponse
(
	StudentResponseID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	StudentID INT NOT NULL REFERENCES "CodingExam".Student(StudentID),
	IsTextResponse BOOLEAN NOT NULL,
	TextResponse VARCHAR(300), 
	AnswerResponse INT
	--need to add check constraint for bool value
);











