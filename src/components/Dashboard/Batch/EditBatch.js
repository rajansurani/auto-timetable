import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { updateBatchByName} from "../../../database/dataAccess";

function EditBatch(props){
    const [batchName, setBatchName] = useState(props.batch.batchName);
	const [batchSize, setbatchSize] = useState(props.batch.batchSize);

    const handleBatchEdit = () => {
		let editedbatch = {
			batchName: batchName,
			batchSize: batchSize,
		};
		updateBatchByName(editedbatch).then(() => {
			props.closeDialog();
		});
	};


    return(
        
        <Modal show={true} onHide={props.closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>Add/Update Batch</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					
					<Form>
						<Form.Group as={Row} className="mb-3" controlId="textBatchName">
							<Form.Label column sm="2">
								Batch Name
							</Form.Label>
							{
								props.addBatch ? 
								(
									<Col sm="10">
										<Form.Control
											type="text"
											placeholder=""
											value={batchName}
											onChange={(e) => {
												setBatchName(e.target.value);
											}}
										/>
									</Col>
								):
								(
									<Col sm="10">
										<Form.Control
											plaintext
											readOnly
											defaultValue={batchName}
										/>
									</Col>
								)
							}
							
						</Form.Group>

						<Form.Group as={Row} className="mb-3" controlId="textBatchSize">
                            <Form.Label column sm="2">
								Batch Size
							</Form.Label>
                            <Col sm="10">
										<Form.Control
											type="number"
											placeholder=""
											value={batchSize}
											onChange={(e) => {
												setbatchSize(e.target.value);
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
					<Button variant="primary" onClick={handleBatchEdit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
    );
}

export default EditBatch;