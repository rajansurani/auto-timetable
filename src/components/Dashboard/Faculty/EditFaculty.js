import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { updateFacultyByCode } from "../../../database/dataAccess";

function EditFaculty(props){
    const [facultyCode, setFacultyCode] = useState(props.faculty.facultyCode);
	const [facultyName, setFacultyName] = useState(props.faculty.facultyName);

    const handleFacultyEdit = () => {
		let editedFaculty = {
			facultyCode: facultyCode,
			facultyName: facultyName,
			assignedSubjects: props.faculty.assignedSubjects ? props.faculty.assignedSubjects : [],
		};
		updateFacultyByCode(editedFaculty).then(() => {
			props.closeDialog();
		});
	};


    return(
        
        <Modal show={true} onHide={props.closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>Add/Update Faculty</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					
					<Form>
						<Form.Group as={Row} className="mb-3" controlId="textFacultyCode">
							<Form.Label column sm="2">
								Faculty Code
							</Form.Label>
							{
								props.addFaculty ? 
								(
									<Col sm="10">
										<Form.Control
											type="text"
											placeholder=""
											value={facultyCode}
											onChange={(e) => {
												setFacultyCode(e.target.value);
											}}
										/>
									</Col>
								):
								(
									<Col sm="10">
										<Form.Control
											plaintext
											readOnly
											defaultValue={facultyCode}
										/>
									</Col>
								)
							}
							
						</Form.Group>

						<Form.Group as={Row} className="mb-3" controlId="textFacultyName">
							<Form.Label column sm="2">
								Faculty Name
							</Form.Label>
							<Col sm="10">
								<Form.Control
									type="text"
									placeholder=""
									value={facultyName}
									onChange={(e) => {
										setFacultyName(e.target.value);
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
					<Button variant="primary" onClick={handleFacultyEdit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
    );
}

export default EditFaculty;