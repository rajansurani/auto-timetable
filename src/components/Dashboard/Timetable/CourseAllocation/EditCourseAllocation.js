import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { addCourseAllocation, fetchCourses, fetchFaculties, updateCourseAllocationById } from "../../../../database/dataAccess";


function EditCourseAllocation(props) {
	const [courseCode, setCourseCode] = useState(props.courseAllocation.courseCode);
	const [courseCoordinator, setCourseCoordinator] = useState(props.courseAllocation.courseCoordinator);
	const [batchName, setBatchName] = useState(props.courseAllocation.batchName);
    const [numberOfBatch, setNumberOfBatch] = useState(props.courseAllocation.numberOfBatch);
	const [theoryFaculty, setTheoryFaculty] = useState(props.courseAllocation.theoryFaculty);
	const [batchAFaculty, setBatchAFaculty] = useState(props.courseAllocation.batchAFaculty);
	const [batchBFaculty, setBatchBFaculty] = useState(props.courseAllocation.batchBFaculty);
	const [batchCFaculty, setBatchCFaculty] = useState(props.courseAllocation.batchCFaculty);

    const [batchList, setBatchList] = useState(props.timetable.batches);
    const [courseList, setCourseList] = useState([]);
    const [facultyList, setFacultyList] = useState([]);

    useEffect(()=>{
        fetchCourses().then((courses)=>{
            setCourseList(courses);
        })
        fetchFaculties().then((faculties)=>{
            setFacultyList(faculties);
        })
    },[]);

	const handleCourseAllocationEdit = () => {
		let editedCourseAllocation = {
			courseCode: courseCode,
			courseCoordinator: courseCoordinator,
			batchName: batchName,
            numberOfBatch: numberOfBatch,
			theoryFaculty: theoryFaculty,
			batchAFaculty: batchAFaculty,
			batchBFaculty: batchBFaculty,
			batchCFaculty: batchCFaculty,
            timetableVersionName : props.timetable.timetableVersionName
		};
        if(props.addCourseAllocation){
            addCourseAllocation(editedCourseAllocation).then(()=>{
                props.closeDialog();
            })
        }else{
            editedCourseAllocation.allocationId = props.courseAllocation.allocationId
            updateCourseAllocationById(editedCourseAllocation).then(() => {
                props.closeDialog();
            });
        }
		
	};

	return (
		<Modal show={true} onHide={props.closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Add/Update Course Allocation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					
					<Form.Group as={Row} className="mb-3" controlId="textCourseName">
						<Form.Label column sm="2">
							Batch Name
						</Form.Label>
						<Form.Select aria-label="Select Batch" defaultValue='' value={batchName} onChange={(e)=>setBatchName(e.target.value)}>
                                {
                                    batchList.map((batch,index)=>(
                                        <option value={batch}>{batch}</option>
                                    ))
                                }
                        </Form.Select>
					</Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="textCourseCode">
						<Form.Label column sm="2">
							Course Code
						</Form.Label>
                        <Form.Select column sm= "4" aria-label="Select Course" defaultValue='' value={courseCode} onChange={(e)=>setCourseCode(e.target.value)}>
                                {
                                    courseList.map((course,index)=>(
                                        <option value={course.courseCode}>{course.courseCode}</option>
                                    ))
                                }
                        </Form.Select>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="textTheorySession">
						<Form.Label column sm="2">
							Course Coordinator
						</Form.Label>
						<Form.Select aria-label="Select Course Coordinator" defaultValue='' value={courseCoordinator} onChange={(e)=>setCourseCoordinator(e.target.value)}>
                                {
                                    facultyList.map((faculty,index)=>(
                                        <option value={faculty.facultyCode}>{faculty.facultyCode}</option>
                                    ))
                                }
                        </Form.Select>
					</Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="textCourseCredit">
						<Form.Label column sm="2">
							Number of Batch
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="number"
								placeholder=""
								value={numberOfBatch}
								onChange={(e) => {
									setNumberOfBatch(e.target.value);
								}}
							/>
						</Col>
					</Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="textTheorySession">
						<Form.Label column sm="2">
							Theory Faculty
						</Form.Label>
						<Form.Select aria-label="Select Faculty" defaultValue='' value={theoryFaculty} onChange={(e)=>setTheoryFaculty(e.target.value)}>
                                {
                                    facultyList.map((faculty,index)=>(
                                        <option value={faculty.facultyCode}>{faculty.facultyCode}</option>
                                    ))
                                }
                        </Form.Select>
					</Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="textPracticalSession">
						<Form.Label column sm="2">
							Batch A Faculty
						</Form.Label>
						<Form.Select aria-label="Select Faculty" defaultValue='' value={batchAFaculty} onChange={(e)=>setBatchAFaculty(e.target.value)}>
                                {
                                    facultyList.map((faculty,index)=>(
                                        <option value={faculty.facultyCode}>{faculty.facultyCode}</option>
                                    ))
                                }
                        </Form.Select>
					</Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="textPracticalSession">
						<Form.Label column sm="2">
							Batch B Faculty
						</Form.Label>
						<Form.Select aria-label="Select Faculty" defaultValue='' value={batchBFaculty} onChange={(e)=>setBatchBFaculty(e.target.value)}>
                                {
                                    facultyList.map((faculty,index)=>(
                                        <option value={faculty.facultyCode}>{faculty.facultyCode}</option>
                                    ))
                                }
                        </Form.Select>
					</Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="textPracticalSession">
						<Form.Label column sm="2">
							Batch C Faculty
						</Form.Label>
						<Form.Select aria-label="Select Faculty" defaultValue='' value={batchCFaculty} onChange={(e)=>setBatchCFaculty(e.target.value)}>
                                {
                                    facultyList.map((faculty,index)=>(
                                        <option value={faculty.facultyCode}>{faculty.facultyCode}</option>
                                    ))
                                }
                        </Form.Select>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.closeDialog}>
					Close
				</Button>
				<Button variant="primary" onClick={handleCourseAllocationEdit}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditCourseAllocation;
