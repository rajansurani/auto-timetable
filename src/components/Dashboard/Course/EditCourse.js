import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { updateCourseByCode } from "../../../database/dataAccess";
import EditClassroom from "../Classroom/EditClassroom";

function EditCourse(props) {
	const [courseCode, setCourseCode] = useState(props.course.courseCode);
	const [courseName, setCourseName] = useState(props.course.courseName);
    const [courseCredit, setCourseCredit] = useState(props.course.courseCredit);
	const [theorySession, setTheorySession] = useState(props.course.theorySession);
	const [practicalSession, setPracticalSession] = useState(props.course.practicalSession);

	const handleCourseEdit = () => {
		let editedCourse = {
			courseCode: courseCode,
			courseName: courseName,
            courseCredit: courseCredit,
			theorySession: theorySession,
			practicalSession: practicalSession,
		};
		updateCourseByCode(editedCourse).then(() => {
			props.closeDialog();
		});
	};

	return (
		<Modal show={true} onHide={props.closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Add/Update Course</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} className="mb-3" controlId="textCourseCode">
						<Form.Label column sm="2">
							Course Code
						</Form.Label>
						{props.addCourse ? (
							<Col sm="10">
								<Form.Control
									type="text"
									placeholder=""
									value={courseCode}
									onChange={(e) => {
										setCourseCode(e.target.value);
									}}
								/>
							</Col>
						) : (
							<Col sm="10">
								<Form.Control plaintext readOnly defaultValue={courseCode} />
							</Col>
						)}
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="textCourseName">
						<Form.Label column sm="2">
							Course Name
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="text"
								placeholder=""
								value={courseName}
								onChange={(e) => {
									setCourseName(e.target.value);
								}}
							/>
						</Col>
					</Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="textCourseCredit">
						<Form.Label column sm="2">
							Course Credit
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="number"
								placeholder=""
								value={courseCredit}
								onChange={(e) => {
									setCourseCredit(e.target.value);
								}}
							/>
						</Col>
					</Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="textTheorySession">
						<Form.Label column sm="2">
							Theory Session
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="number"
								placeholder=""
								value={theorySession}
								onChange={(e) => {
									setTheorySession(e.target.value);
								}}
							/>
						</Col>
					</Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="textPracticalSession">
						<Form.Label column sm="2">
							Pracitcal Session
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="number"
								placeholder=""
								value={practicalSession}
								onChange={(e) => {
									setPracticalSession(e.target.value);
								}}
							/>
						</Col>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.closeDialog}>
					Close
				</Button>
				<Button variant="primary" onClick={handleCourseEdit}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditCourse;
