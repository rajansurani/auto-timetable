import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
	addCourseAllocation,
	addSlotAllocation,
	fetchClassrooms,
	fetchCourses,
	fetchFaculties,
	updateCourseAllocationById,
    updateSlotAllocationById,
} from "../../../../database/dataAccess";

function EditSlotAllocation(props) {
	const [courseCode, setCourseCode] = useState(
		props.slotAllocation.courseCode
	);
	const [batchName, setBatchName] = useState(props.slotAllocation.batchName);
	const [practicalBatch, setPracticalBatch] = useState(
		props.slotAllocation.practicalBatch
	);
	const [facultyCode, setFacultyCode] = useState(
		props.slotAllocation.facultyCode
	);
	const [startTime, setStartTime] = useState(props.slotAllocation.startTime);
	const [endTime, setEndTime] = useState(props.slotAllocation.endTime);
	const [classroom, setClassroom] = useState(props.slotAllocation.classroom);
	const [day, setDay] = useState(props.slotAllocation.day);

	const [batchList, setBatchList] = useState(props.timetable.batches);
	const [courseList, setCourseList] = useState([]);
	const [classroomList, setClassroomList] = useState([]);
	const [facultyList, setFacultyList] = useState([]);
	const daysList = ['Mon','Tue','Wed','Thu','Fri','Sat'];

	useEffect(() => {
		fetchCourses().then((courses) => {
			setCourseList(courses);
		});
        fetchFaculties().then((faculties) => {
			setFacultyList(faculties);
		});
        fetchClassrooms().then((classrooms) => {
			setClassroomList(classrooms);
		});
	}, []);

	const handleSlotAllocationEdit = () => {
		let editedSlotAllocation = {
			batchName: batchName,
			courseCode: courseCode,
			facultyCode: facultyCode,
			practicalBatch: practicalBatch,
			classroom: classroom,
			startTime: startTime,
			endTime: endTime,
            day:day,
			timetableVersionName: props.timetable.timetableVersionName,
		};
		if (props.addSlotAllocation) {
			addSlotAllocation(editedSlotAllocation).then(() => {
				props.closeDialog();
			});
		} else {
			editedSlotAllocation.allocationId = props.slotAllocation.allocationId;
			updateSlotAllocationById(editedSlotAllocation).then(() => {
				props.closeDialog();
			});
		}
	};

	return (
		<Modal show={true} onHide={props.closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Add/Update Slot Allocation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} className="mb-3" controlId="textCourseName">
						<Form.Label column sm="2">
							Batch Name
						</Form.Label>
						<Form.Select
							aria-label="Select Batch"
							defaultValue=""
							value={batchName}
							onChange={(e) => setBatchName(e.target.value)}>
							{batchList.map((batch, index) => (
								<option value={batch}>{batch}</option>
							))}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="textCourseCode">
						<Form.Label column sm="2">
							Course Code
						</Form.Label>
						<Form.Select
							column
							sm="4"
							aria-label="Select Course"
							defaultValue=""
							value={courseCode}
							onChange={(e) => setCourseCode(e.target.value)}>
							{courseList.map((course, index) => (
								<option value={course.courseCode}>{course.courseCode}</option>
							))}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="textTheorySession">
						<Form.Label column sm="2">
							Faculty
						</Form.Label>
						<Form.Select
							aria-label="Select Faculty"
							defaultValue=""
							value={facultyCode}
							onChange={(e) => setFacultyCode(e.target.value)}>
							{facultyList.map((faculty, index) => (
								<option value={faculty.facultyCode}>
									{faculty.facultyCode}
								</option>
							))}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="textCourseCredit">
						<Form.Label column sm="2">
							Practical Batch
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="text"
								placeholder=""
								value={practicalBatch}
								onChange={(e) => {
									setPracticalBatch(e.target.value);
								}}
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="textTheorySession">
						<Form.Label column sm="2">
							Classroom
						</Form.Label>
						<Form.Select
							aria-label="Select Classroom"
							defaultValue=""
							value={classroom}
							onChange={(e) => setClassroom(e.target.value)}>
							{classroomList.map((c, index) => (
								<option value={c.classroomName}>
									{c.classroomName}
								</option>
							))}
						</Form.Select>
					</Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="textTheorySession">
						<Form.Label column sm="2">
							Day
						</Form.Label>
						<Form.Select
							aria-label="Select Day"
							defaultValue=""
							value={day}
							onChange={(e) => setDay(e.target.value)}>
							{daysList.map((d, index) => (
								<option value={d}>
									{d}
								</option>
							))}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="textCourseCredit">
						<Form.Label column sm="2">
							Start Time
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="text"
								placeholder=""
								value={startTime}
								onChange={(e) => {
									setStartTime(e.target.value);
								}}
							/>
						</Col>
					</Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="textCourseCredit">
						<Form.Label column sm="2">
							End Time
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="text"
								placeholder=""
								value={endTime}
								onChange={(e) => {
									setEndTime(e.target.value);
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
				<Button variant="primary" onClick={handleSlotAllocationEdit}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditSlotAllocation;
