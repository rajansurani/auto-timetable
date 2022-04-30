import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { updateClassroomByName } from "../../../database/dataAccess";

function EditClassroom(props){
    const [classroomName, setClassroomName] = useState(props.classroom.classroomName);
	const [classroomType, setClassroomType] = useState(props.classroom.classroomType);
	const [classroomCapacity, setClassroomCapacity] = useState(props.classroom.classroomCapacity);

    const handleClassroomEdit = () => {
		let editedClassroom = {
			classroomName: classroomName,
			classroomType: classroomType ===""? 'Theory' : classroomType,
			classroomCapacity: classroomCapacity,
		};
		updateClassroomByName(editedClassroom).then(() => {
			props.closeDialog();
		});
	};


    return(
        
        <Modal show={true} onHide={props.closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>Add/Update Classroom</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					
					<Form>
						<Form.Group as={Row} className="mb-3" controlId="textClassroomName">
							<Form.Label column sm="2">
								Classroom Name
							</Form.Label>
							{
								props.addClassroom ? 
								(
									<Col sm="10">
										<Form.Control
											type="text"
											placeholder=""
											value={classroomName}
											onChange={(e) => {
												setClassroomName(e.target.value);
											}}
										/>
									</Col>
								):
								(
									<Col sm="10">
										<Form.Control
											plaintext
											readOnly
											defaultValue={classroomName}
										/>
									</Col>
								)
							}
							
						</Form.Group>

						<Form.Group as={Row} className="mb-3" controlId="selectorClassroomType">
                            <Form.Label column sm="2">
								Classroom Type
							</Form.Label>
                            <Col sm="10">
                                <Form.Select aria-label="Select Classroom Type" defaultValue='Thoery' value={classroomType} onChange={(e)=>setClassroomType(e.target.value)}>
                                    <option value="Theory">Theory</option>
                                    <option value="Computer Lab">Computer Lab</option>
                                    <option value="IoT Lab">IoT Lab</option>
                                    <option value="Chemical Lab">Chemical Lab</option>
                                </Form.Select>
                            </Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3" controlId="textClassroomcapacity">
                            <Form.Label column sm="2">
								Classroom Capacity
							</Form.Label>
                            <Col sm="10">
										<Form.Control
											type="number"
											placeholder=""
											value={classroomCapacity}
											onChange={(e) => {
												setClassroomCapacity(e.target.value);
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
					<Button variant="primary" onClick={handleClassroomEdit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
    );
}

export default EditClassroom;